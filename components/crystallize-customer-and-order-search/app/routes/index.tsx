import { useEffect, useMemo } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import debounce from "lodash.debounce";
import { useImmerReducer } from "use-immer";

import {
  getAllOrdersForTenant,
  getAllCustomersForTenant,
  getTenantId,
  getProductsFromOrders,
} from "./../graph/query";

import {
  FieldRecord,
  getDefaultSearchState,
  searchIndexReducer,
} from "~/search-index";
import { SearchFilters } from "~/components/filters";
import { Results } from "~/components/results";

export const loader: LoaderFunction = async ({ request }) => {
  const tenantId = getTenantId(request);
  if (!tenantId) {
    return json(
      {
        authorized: false,
        customers: [],
        products: [],
      },
      { status: 403 }
    );
  }
  const [orders, customers] = await Promise.all([
    getAllOrdersForTenant(tenantId),
    getAllCustomersForTenant(tenantId),
  ]);

  const products = await getProductsFromOrders(tenantId, orders);

  return json({
    authorized: true,
    customers: customers.map((customer) => ({
      ...customer,
      orders: orders.filter(
        (order) => order.customer?.identifier == customer.identifier
      ),
    })),
    products,
  });
};

export default function Index() {
  const { customers, products, authorized } = useLoaderData();

  const [state, dispatch] = useImmerReducer(
    searchIndexReducer,
    getDefaultSearchState({ customers, products })
  );

  function setSubset(subsetField: FieldRecord | "all") {
    dispatch({
      type: "select-subset",
      subsetField,
    });
  }

  const debouncedQueryChange = useMemo(
    () =>
      debounce(
        (e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({ type: "set-query", query: e.target.value }),
        300
      ),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      debouncedQueryChange.cancel();
    };
  }, [debouncedQueryChange]);

  if (!authorized) {
    return (
      <div className="mx-auto max-w-[1200px] py-10 px-6 h-screen flex justify-center items-center">
        I refuse to start. I'm not loaded in a familiar, Crystallize context
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] py-10 px-6">
      <h1 className="text-xl text-black font-bold mb-2">
        Customer & Order search
      </h1>
      <div className="flex flex-row bg-white shadow-md rounded-md overflow-hidden mb-2">
        <input
          className="bg-white border-border  px-8 py-4 w-full"
          placeholder="Search for customer delivery address, name, email, phone"
          onChange={debouncedQueryChange}
          autoFocus
        />
      </div>

      <SearchFilters state={state} setSubset={setSubset} dispatch={dispatch} />
      <Results result={state.result} />
    </div>
  );
}
