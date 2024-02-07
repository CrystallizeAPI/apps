import { GraphQLClient } from "graphql-request";

export const getClient = (): GraphQLClient => {
  return new GraphQLClient("https://pim.crystallize.com/graphql", {
    headers: {
      "X-Crystallize-Access-Token-Id": process.env.CRYSTALLIZE_ACCESS_TOKEN_ID,
      "X-Crystallize-Access-Token-Secret":
        process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET,
    } as HeadersInit,
  });
};
