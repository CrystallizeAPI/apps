import { saveAs } from "file-saver";

import { SearchState } from "~/search-index";

type ExportProps = {
  state: SearchState;
};

export function ExportButton({ state }: ExportProps) {
  const rows = state.result?.customers;
  const exportFile: string[][] = [];

  function downloadFileExport() {
    if (rows && rows.length > 0) {
      // Extract all possible payment properties so that we can
      // create one column for each
      const paymentProperties = new Set<string>();
      rows.forEach((customer) => {
        customer.orders?.forEach((order) => {
          const payment = order.payment[0];
          if (payment) {
            payment.properties.forEach(({ property }) => {
              paymentProperties.add(property);
            });
          }
        });
      });

      // Add headers
      const fixedHeaders = [
        "Customer first name",
        "Customer last name",
        "Customer email",
        "Customer phone",
        "Customer address",
        "Customer city",
      ];
      const dynamicPaymentProperties: string[] = [];
      if (paymentProperties.size > 0) {
        fixedHeaders.push("Order id", "Order date");
      }
      paymentProperties.forEach((property) =>
        dynamicPaymentProperties.push(property)
      );

      const headers = [...fixedHeaders, ...dynamicPaymentProperties];
      exportFile.push(headers);

      // Add each data row
      rows.forEach((customer) => {
        const orders = [...(customer.orders || [])];
        if (orders.length === 0) {
          // @ts-expect-error
          orders.push(null);
        }
        orders.forEach((order) => {
          const row: string[] = [];

          row.length = headers.length;
          row.fill("");

          function add(key: string, value: string) {
            const index = headers.indexOf(key);
            if (index !== -1) {
              row[index] = value;
            }
          }

          const address = customer.addresses[0] || {};
          add("Customer first name", customer.firstName);
          add("Customer last name", customer.lastName);
          add("Customer email", customer.email);
          add("Customer phone", customer.phone);
          add("Customer address", `${address.street} ${address.streetNumber}`);
          add("Customer city", `${address.postalCode} ${address.city}`);

          if (order) {
            add("Order id", order.orderId);
            add("Order date", order.createdAt);

            const payment = order.payment[0];
            if (payment) {
              payment.properties.forEach(({ property, value }) => {
                add(property, value);
              });
            }
          }

          exportFile.push(row);
        });
      });

      saveAs(
        new Blob(
          [exportFile.reduce((agg, row) => agg + row.join(",") + "\n", "")],
          {
            type: "text/csv;charset=utf-8",
          }
        ),
        `crystallize-customers-and-orders-${new Date().toISOString()}.csv`
      );
    }
  }

  return (
    <button
      onClick={downloadFileExport}
      type="button"
      disabled={!rows || rows.length === 0}
      className="px-4 py-2 text-sm rounded-md text-black bg-white shadow-sm"
    >
      Export
    </button>
  );
}
