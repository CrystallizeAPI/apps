import { signal } from "@crystallize/app-signal";
import CustomerIcon from "~/assets/customers.svg";
import OrderIcon from "~/assets/orders.svg";
import type {
  CrystallizeCustomer,
  CrystallizeCustomerLabel,
  CrystallizeOrderLabel,
} from "~/graph/types";

const formatDate = (incomingDate: string) => {
  return new Date(incomingDate).toLocaleDateString("no-NO", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }); // Saturday, September 17, 2016
};

// Handle local dev and server env
if (typeof window === "undefined" || location.origin.includes("localhost")) {
  signal.setContex({
    language: "en",
    origin: "local",
    tenantId: "...",
    tenantIdentifier: "...",
  });
}

function invalidLabelDisplay(
  label: CrystallizeCustomerLabel | CrystallizeOrderLabel
) {
  switch (label) {
    case "missing-address":
      return "No address";
    case "missing-street-number":
      return "No street number";
  }

  const invalidOrderDisplay = invalidOrderLabelDisplay(label);
  if (invalidOrderDisplay) {
    return "Order issue";
  }
}

function invalidOrderLabelDisplay(label: CrystallizeOrderLabel) {
  switch (label) {
    case "incomplete-payment-information":
      return "Payment information is incomplete";
    case "missing-payment-information":
      return "No payment information present";
  }
}

export default function Item({ customer }: { customer: CrystallizeCustomer }) {
  const deliveryAddress = customer.addresses?.find(
    (address) => address.type === "delivery"
  );

  const allLabels: (CrystallizeCustomerLabel | CrystallizeOrderLabel)[] = [];
  allLabels.push(...customer.invalidLabels);

  return (
    <details
      key={customer.identifier}
      className="mb-2 details text-blac cursor-pointer"
    >
      <summary className="flex flex-row relative bg-white shadow-sm rounded-md pl-10 pr-6 py-2 ">
        <div className="w-[20px] absolute left-[15px] arrow flex items-center justify-center">
          &#8595;
        </div>

        <div className="text-black flex flex-col w-4/12">
          <span className="font-medium text-md">
            {customer.firstName} {customer.lastName}
          </span>
          <span className="font-medium text-sm">
            {customer.orders?.length} order(s)
          </span>
        </div>
        <div className="text-black flex flex-col w-3/12">
          <span className="text-sm">{customer.phone}</span>
          <span className="text-sm">{customer.email}</span>
        </div>
        <span className="text-sm text-black w-3/12">
          {!!deliveryAddress && (
            <>
              {`${deliveryAddress?.street} ${
                deliveryAddress?.streetNumber || ""
              }`}
              <br />
              {`${deliveryAddress?.postalCode} ${deliveryAddress?.city}`}
            </>
          )}
        </span>
        {/* <img src={OrderIcon} alt="Go to order" /> */}
        <span className="flex flex-row gap-4 justify-end w-2/12">
          {allLabels.map((label) => (
            <span
              className="mr-3 text-xs rounded bg-black text-white px-2 py-1 w-24 self-center text-center"
              key={label}
            >
              {invalidLabelDisplay(label)}
            </span>
          ))}
          <a
            className="px-2 py-2 bg-grey rounded-md border text-sm border-white flex gap-2 hover:border-black w-12"
            target="_blank"
            rel="noreferrer"
            href={signal.getUrl({
              area: "customer",
              identifier: customer.identifier,
            })}
          >
            <img src={CustomerIcon} alt="Go to customer" />
          </a>
        </span>
      </summary>
      <span className=" bg-[#f7f7f7] py-2 px-6 block shadow-sm border-grey w-full">
        {customer.orders?.map((order) => (
          <div
            key={order.orderId}
            className="flex items-center gap-4 justify-between text-sm my-2 py-2 w-full border-b border-[#dfdfdf]"
          >
            <div className="w-full">
              <span className="text-black flex w-full items-center justify-between gap-4">
                <strong>{formatDate(order.createdAt)}</strong>
                <a
                  className="px-2 py-2 bg-white flex gap-2 rounded-md shadow-md font-medium border border-white hover:border-black"
                  target="_blank"
                  rel="noreferrer"
                  href={signal.getUrl({ area: "order", id: order.orderId })}
                >
                  <img src={OrderIcon} alt="Go to order" /> Go to order
                </a>
              </span>
              {order.cart.map((cartItem, index) => (
                <div key={index} className="flex items-center">
                  <img
                    src={cartItem.imageUrl}
                    alt=""
                    className="w-[50px] block mr-2"
                  />
                  {cartItem.name}
                </div>
              ))}

              <div className="mt-2">
                {order.payment?.[0]?.properties?.map((prop, index) => (
                  <div className="w-full flex" key={index}>
                    <span className="w-[150px]">{prop.property}:</span>{" "}
                    <span>
                      <strong>{prop.value}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </span>
    </details>
  );
}
