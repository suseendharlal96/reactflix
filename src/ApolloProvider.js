import React from "react";
import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

import App from "./App";

const ApolloProvider = () => {
  const httpLink = createHttpLink({
    uri: "https://shop-graphql.herokuapp.com/",
  });

  const authLink = setContext(() => ({
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}` || "",
    },
  }));

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <Provider client={client}>
      <App />
    </Provider>
  );
};

export default ApolloProvider;
