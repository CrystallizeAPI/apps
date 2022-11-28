import { gql } from "graphql-request";

import decodeCrystallizeSignature from "~/core.server/decodeCrystallizeSignature";
import { getClient } from "./client";
import type {
  CrystallizeCartItem,
  CrystallizeCustomer,
  CrystallizeCustomerLabel,
  CrystallizeCustomerSearchNode,
  CrystallizeOrder,
  CrystallizeProduct,
} from "./types";

const orderPageQuery = gql`
  query ($tenantId: ID!) {
    order {
      getMany(tenantId: $tenantId, first: 100000) {
        pageInfo {
          totalNodes
          endCursor
        }
        edges {
          node {
            orderId: id
            createdAt
            cart {
              imageUrl
              name
              sku
              subTotal {
                currency
                net
                gross
              }
            }

            payment {
              ... on CustomPayment {
                properties {
                  value
                  property
                }
                provider
              }
            }

            customer {
              identifier
            }
          }
        }
      }
    }
  }
`;

const customerPageQuery = gql`
  query ($tenantId: ID!) {
    customer {
      getMany(tenantId: $tenantId, first: 100000) {
        pageInfo {
          totalNodes
          endCursor
        }
        edges {
          node {
            addresses {
              type
              city
              country
              postalCode
              street
              streetNumber
            }
            email
            identifier
            phone
            firstName
            lastName
          }
        }
      }
    }
  }
`;

const getProductsFromSkuQuery = `
  query GET_PRODUCTS_FROM_SKU ($tenantId: ID!, $skus: [String!]) {
    product {
      getVariants(
        tenantId: $tenantId
        skus: $skus
        language: "no"
      ) {
        product {
          id
          name
          variants {
            sku
          }
        }
      }
    }
  }
`;

export function getTenantId(request: Request) {
  // Local dev
  if (process.env.CRYSTALLIZE_TENANT_ID) {
    return process.env.CRYSTALLIZE_TENANT_ID;
  }

  const url = new URL(request.url);
  const signature = url.searchParams.get("crystallizeSignature") || "";
  const signaturePayload = decodeCrystallizeSignature(signature);
  return signaturePayload?.tenantId;
}

export const getAllOrdersForTenant = async (
  tenantId: string
): Promise<CrystallizeOrder[]> => {
  try {
    const res = await getClient().request(orderPageQuery, { tenantId });

    return (res.order.getMany?.edges || []).map((e: any) => e.node);
  } catch (e) {
    console.log(e);
  }

  return [];
};

function includeCustomerLabels(
  customer: CrystallizeCustomer
): CrystallizeCustomer {
  const invalidLabels: CrystallizeCustomerLabel[] = [];
  if (!customer.addresses[0]) {
    invalidLabels.push("missing-address");
  } else if (!customer.addresses[0].streetNumber) {
    invalidLabels.push("missing-street-number");
  }
  customer.invalidLabels = invalidLabels;

  return customer;
}

export const getAllCustomersForTenant = async (
  tenantId: string
): Promise<CrystallizeCustomer[]> => {
  try {
    const res = await getClient().request(customerPageQuery, { tenantId });
    return res.customer.getMany?.edges?.map(
      (e: CrystallizeCustomerSearchNode) => includeCustomerLabels(e.node)
    );
  } catch (e) {
    console.log(e);
  }

  return [];
};

export const getProductsFromOrders = async (
  tenantId: string,
  orders: CrystallizeOrder[]
): Promise<CrystallizeProduct[]> => {
  const skus: Set<CrystallizeCartItem["sku"]> = new Set();
  orders.forEach((order) =>
    (order.cart || []).forEach((cartItem) => skus.add(cartItem.sku))
  );

  const products: Map<string, CrystallizeProduct> = new Map();

  try {
    const res = await getClient().request(getProductsFromSkuQuery, {
      tenantId,
      skus: Array.from(skus),
    });
    res.product.getVariants?.forEach((e: any) =>
      products.set(e.product.id, e.product)
    );
  } catch (e) {
    console.log(e);
  }

  return Array.from(products.values());
};
