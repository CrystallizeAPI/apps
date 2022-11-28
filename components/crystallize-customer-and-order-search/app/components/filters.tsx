import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";

import {
  CustomersAll,
  CustomersWithOrders,
  CustomersWithoutIncompleteData,
  CustomersWithoutOrders,
  FieldRecord,
  PaymentStatusAll,
  SearchAction,
  SearchState,
} from "~/search-index";
import { ExportButton } from "./export-button";

export function SearchFilters({
  state,
  setSubset,
  dispatch,
}: {
  state: SearchState;
  setSubset: (s: FieldRecord | "all") => void;
  dispatch: React.Dispatch<SearchAction>;
}) {
  if (!state.result?.subsets) {
    return null;
  }

  return (
    <>
      <div className="mb-4 flex gap-3">
        <div className="bg-white  flex pl-4 rounded-md shadow-sm overflow-hidden">
          <span className="py-3 mr-2 text-black text-sm">Customers</span>
          <select
            className=" text-black ml-2 pl-2 mr-2 text-sm border-border border-l"
            onChange={(e) =>
              dispatch({
                type: "set-customer-status",
                customerStatus: e.target.value,
              })
            }
          >
            <option value={CustomersAll}>All</option>
            <option value={CustomersWithOrders}>with orders</option>
            <option value={CustomersWithoutOrders}>with no orders</option>
            <option value={CustomersWithoutIncompleteData}>
              with incomplete data
            </option>
          </select>
        </div>

        <div
          className={`flex pl-4${
            state.customerStatus !== CustomersWithOrders
              ? " opacity-25 pointer-events-none	"
              : ""
          }`}
        >
          <h3 className="flex items-center pr-2">Orders with</h3>
          <div
            className={`flex items-center pl-4 bg-white rounded-md shadow-sm overflow-hidden ${
              state.customerStatus !== CustomersWithOrders ? " opacity-25" : ""
            }`}
          >
            <span className="py-3 mr-2 text-black text-sm">Payment status</span>
            <select
              className=" text-black ml-2 pl-2 mr-2 text-sm border-border border-l"
              onChange={(e) =>
                dispatch({
                  type: "set-payment-status",
                  paymentStatus: e.target.value,
                })
              }
              disabled={state.customerStatus === CustomersWithoutOrders}
            >
              <option value={PaymentStatusAll}>All</option>
              {state.allPossiblePaymentStatuses.map((paymentStatus) => (
                <option key={paymentStatus.value} value={paymentStatus.value}>
                  {paymentStatus.title}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`bg-white flex ml-2 px-4 rounded-md shadow-sm overflow-hidden`}
          >
            <Popover.Root>
              <Popover.Trigger asChild>
                <button
                  className="IconButton flex text-sm items-center gap-3"
                  aria-label="Select products"
                >
                  Including{" "}
                  {state.selectedProducts.length &&
                  state.selectedProducts.length !== state.products.length
                    ? state.selectedProducts.length
                    : "all"}{" "}
                  product
                  {state.selectedProducts.length === 1 ? "" : "s"}
                  <MixerHorizontalIcon />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="PopoverContent bg-white p-4 shadow-md rounded-md"
                  align="start"
                  alignOffset={-15}
                  sideOffset={5}
                >
                  <div className="flex flex-col gap-4 min-w-[200px]">
                    <div className="flex justify-between items-center">
                      <p className="Text text-sm font-bold text-black">
                        Products
                      </p>
                      <Popover.Close
                        className="PopoverClose"
                        aria-label="Close"
                      >
                        <Cross2Icon />
                      </Popover.Close>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <Checkbox.Root
                        className="CheckboxRoot bg-grey h-6 w-6 text-center items-center justify-center flex rounded-md"
                        checked={
                          state.selectedProducts.length === 0 ||
                          state.selectedProducts.length ===
                            state.products.length
                        }
                        onCheckedChange={(e) =>
                          dispatch({
                            type: "filter-products-reset",
                          })
                        }
                        id="filter-products-all"
                      >
                        <Checkbox.Indicator className=" CheckboxIndicator">
                          <CheckIcon />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label
                        className="Label text-md"
                        htmlFor="filter-products-all"
                      >
                        All
                      </label>
                    </div>

                    <div className="block h-[1px] bg-black/25" />

                    {state.products.map((product) => (
                      <div
                        className="flex flex-row items-center gap-2"
                        key={product.id}
                      >
                        <Checkbox.Root
                          className="CheckboxRoot bg-grey h-6 w-6 text-center items-center justify-center flex rounded-md"
                          checked={state.selectedProducts.includes(product.id)}
                          id={product.id}
                          onCheckedChange={(e) =>
                            dispatch({
                              type: "filter-products",
                              id: product.id,
                            })
                          }
                        >
                          <Checkbox.Indicator className=" CheckboxIndicator">
                            <CheckIcon />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label className="Label text-md" htmlFor={product.id}>
                          {product.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex flex-row gap-2">
          <button
            onClick={() => setSubset("all")}
            className={`px-4 py-2 text-sm rounded-md ${
              !state.selectedSubset
                ? "text-black bg-white shadow-sm font-bold"
                : "border border-[#dfdfdf] text-black hover:bg-white hover:border-white"
            }`}
          >
            All results ({state.result?.hits})
          </button>

          {state.result.subsets.map((subset) => {
            return (
              <button
                onClick={() => setSubset(subset.field)}
                key={subset.field}
                className={`px-4 py-2 text-sm rounded-md ${
                  state.selectedSubset === subset.field
                    ? "text-black bg-white shadow-sm font-bold"
                    : "border border-[#dfdfdf] text-black hover:bg-white hover:border-white"
                }`}
              >
                {subset.title}{" "}
                <strong className="text-xs">({subset.hits})</strong>
              </button>
            );
          })}
        </div>
        <div className="flex flex-row gap-2">
          <ExportButton state={state} />
        </div>
      </div>
    </>
  );
}
