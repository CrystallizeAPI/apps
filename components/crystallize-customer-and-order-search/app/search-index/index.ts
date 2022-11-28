import FlexSearch from "flexsearch";

import type {
  CrystallizeCustomer,
  CrystallizeOrder,
  CrystallizeProduct,
} from "~/graph/types";

function getPaymentStatus(order: CrystallizeOrder): PaymentStatus | null {
  const [payment] = order.payment;
  if (payment) {
    const status = payment.properties?.find(
      (p) => p.property === "Payment status"
    )?.value;
    if (status) {
      const value = status.toLowerCase();

      return {
        title: value[0].toUpperCase() + value.substring(1),
        value,
      };
    }
  }
  return null;
}

const fieldRecords = {
  "record:firstName": "on first name",
  "record:lastName": "on last name",
  "record:phone": "on phone number",
  "record:email": "on email",
  "record:addresses[]:city": "on city",
  "record:addresses[]:postalCode": "on postal code",
  "record:addresses[]:street": "on street",
  "record:addresses[]:streetNumber": "on streetNumber",
};

export type FieldRecord = keyof typeof fieldRecords;

function createIndex({ customers }: { customers: CrystallizeCustomer[] }) {
  // @ts-expect-error
  const index = new FlexSearch.Document({
    id: "id",
    tag: "tag",
    tokenize: "full",
    index: Object.keys(fieldRecords),
    bool: "and",
  });

  customers.forEach((customer) => {
    if (!index.contain(customer.identifier)) {
      index.add({
        id: customer.identifier,
        record: customer,
        tag: [CustomersAll],
      });
    }
  });

  return index;
}

export type IndexItem = {
  id: string;
  tag: string[];
  record: CrystallizeCustomer;
};

export type SearchAction =
  | {
      type: "set-query";
      query: string;
    }
  | {
      type: "set-payment-status";
      paymentStatus: string;
    }
  | {
      type: "set-customer-status";
      customerStatus: string;
    }
  | {
      type: "select-subset";
      subsetField: string;
    }
  | {
      type: "filter-products";
      id: string;
    }
  | {
      type: "filter-products-reset";
    };

export type SearchResult = {
  hits: number;
  customers: CrystallizeCustomer[];
  subsets: {
    field: FieldRecord;
    title: string;
    hits: number;
  }[];
};

export const CustomersAll = "__cs_all";
export const CustomersWithOrders = "__cs_has-orders";
export const CustomersWithoutOrders = "__cs_no-orders";
export const CustomersWithoutIncompleteData = "__cs_incomplete_data";

export const PaymentStatusAll = "__ps_all";

export type SearchState = {
  query: string;
  index?: any;
  result?: SearchResult;
  customers: CrystallizeCustomer[];
  products: CrystallizeProduct[];
  customerStatus:
    | typeof CustomersAll
    | typeof CustomersWithOrders
    | typeof CustomersWithoutOrders
    | typeof CustomersWithoutIncompleteData;
  paymentStatus?: typeof PaymentStatusAll | string;
  allPossiblePaymentStatuses: PaymentStatus[];
  selectedSubset?: string;
  selectedProducts: CrystallizeProduct["id"][];
};

export type PaymentStatus = {
  title: string;
  value: string;
};

type SearchEngineResultSet = {
  tag?: string;
  field?: FieldRecord;
  result: CrystallizeCustomer["identifier"][];
};

export function getDefaultSearchState({
  customers,
  products,
}: {
  customers: CrystallizeCustomer[];
  products: CrystallizeProduct[];
}): SearchState {
  return search({
    query: "",
    customers,
    products,
    result: {
      hits: 0,
      customers: [],
      subsets: [],
    },
    customerStatus: CustomersAll,
    paymentStatus: PaymentStatusAll,
    allPossiblePaymentStatuses: [],
    selectedProducts: [],
  });
}

function search(state: SearchState) {
  if (!state.index) {
    let customersToSearchIn = [...state.customers];

    // Filter on customer status
    if (state.customerStatus !== CustomersAll) {
      if (state.customerStatus === CustomersWithoutIncompleteData) {
        customersToSearchIn = customersToSearchIn.filter(
          (c) => c.invalidLabels.length > 0
        );
      } else if (
        [CustomersWithOrders, CustomersWithoutOrders].includes(
          state.customerStatus
        )
      ) {
        customersToSearchIn = customersToSearchIn.filter((c) => {
          const orders = c.orders || [];
          if (state.customerStatus === CustomersWithOrders) {
            return orders.length > 0;
          }
          return orders.length === 0;
        });
      }

      if (state.paymentStatus && state.paymentStatus !== PaymentStatusAll) {
        customersToSearchIn = customersToSearchIn.filter((customer) => {
          const orders = customer.orders || [];

          return orders.some((order) => {
            const paymentStatus = getPaymentStatus(order);
            return paymentStatus?.value === state.paymentStatus;
          });
        });
      }
    }

    // Filter on products
    if (state.selectedProducts.length > 0) {
      customersToSearchIn = customersToSearchIn.filter((customer) => {
        return Boolean(
          customer.orders?.some((order) =>
            order.cart.some((cartItem) => {
              const product = state.products.find((p) =>
                p.variants.some((v) => v.sku === cartItem.sku)
              );
              return product && state.selectedProducts.includes(product.id);
            })
          )
        );
      });
    }

    state.index = createIndex({ customers: customersToSearchIn });

    // Extract all possible payment statuses
    state.allPossiblePaymentStatuses = [];
    state.customers.forEach((customer) => {
      customer.orders?.forEach((order) => {
        const paymentStatus = getPaymentStatus(order);
        if (
          paymentStatus &&
          !state.allPossiblePaymentStatuses.some(
            (p) => p.value === paymentStatus.value
          )
        ) {
          state.allPossiblePaymentStatuses.push(paymentStatus);
        }
      });
    });
  }

  const result: SearchResult = {
    hits: 0,
    customers: [],
    subsets: [],
  };
  if (state.index) {
    const searchEngineResult = state.index.search(state.query, {
      tag: [CustomersAll],
      limit: 10000,
    }) as SearchEngineResultSet[];

    // Reset the selectedSubset if no fields matches it
    if (state.selectedSubset) {
      if (!searchEngineResult.some((r) => r.field === state.selectedSubset)) {
        state.selectedSubset = undefined;
      }
    }

    const customerHits = new Set<CrystallizeCustomer["identifier"]>();

    searchEngineResult.forEach((resultSet) => {
      if (resultSet.field) {
        result.subsets.push({
          field: resultSet.field,
          title: fieldRecords[resultSet.field],
          hits: resultSet.result.length,
        });
      }

      // Count customers
      resultSet.result.forEach((c) => customerHits.add(c));

      // Add customer if it is part of the fields
      if (!state.selectedSubset || state.selectedSubset === resultSet.field) {
        resultSet.result.forEach((customerIdentifier) => {
          const customer = state.customers?.find(
            (c) => c.identifier === customerIdentifier
          );

          if (
            customer &&
            !result.customers.some((c) => c.identifier === customer.identifier)
          ) {
            // Filter out orders with a certain payment status
            let { orders } = customer;
            if (state.customerStatus === CustomersWithOrders) {
              if (orders) {
                if (
                  state.paymentStatus &&
                  state.paymentStatus !== PaymentStatusAll
                ) {
                  orders = orders.filter((order) => {
                    const paymentStatus = getPaymentStatus(order);
                    return paymentStatus?.value === state.paymentStatus;
                  });
                }

                if (orders.length > 0) {
                  result.customers.push({
                    ...customer,
                    orders,
                  });
                }
              }
            } else {
              result.customers.push(customer);
            }
          }
        });
      }
    });

    if (result.subsets.length > 0) {
      result.hits = customerHits.size;
    } else {
      result.hits = result.customers.length;
    }

    // Sort results by latest customer creation date
    result.customers = result.customers.reverse();
  }

  state.result = result;

  return state;
}

export function searchIndexReducer(state: SearchState, action: SearchAction) {
  switch (action.type) {
    case "set-payment-status": {
      state.paymentStatus =
        action.paymentStatus === PaymentStatusAll
          ? undefined
          : action.paymentStatus;

      state.index = null;
      break;
    }
    case "set-query": {
      state.query = action.query;
      break;
    }
    case "set-customer-status": {
      state.customerStatus =
        action.customerStatus as SearchState["customerStatus"];
      state.index = null;
      break;
    }
    case "select-subset": {
      state.selectedSubset =
        action.subsetField === "all" ? undefined : action.subsetField;
      break;
    }
    case "filter-products": {
      const existing = state.selectedProducts.indexOf(action.id);
      if (existing !== -1) {
        state.selectedProducts.splice(existing, 1);
      } else {
        state.selectedProducts.push(action.id);
      }

      state.index = null;
      break;
    }
    case "filter-products-reset": {
      state.selectedProducts = [];
      state.index = null;
      break;
    }
  }

  return search(state);
}
