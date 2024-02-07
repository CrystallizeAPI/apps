import type { SearchResult } from "~/search-index";
import ResultItem from "./resultItem";

export function Results({ result }: { result?: SearchResult }) {
  if (!result || result.hits === 0) {
    return null;
  }

  // No need to SSR the whole result list
  if (typeof window === "undefined") {
    result.customers.length = 20;
  }

  return (
    <>
      {result.customers.map((customer) => {
        return <ResultItem key={customer.identifier} customer={customer} />;
      })}
    </>
  );
}
