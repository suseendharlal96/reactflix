import React from "react";
import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
} from "@apollo/client";

import App from "./App";

const ApolloProvider = () => {
  const client = new ApolloClient({
    uri: "https://shop-graphql.herokuapp.com/",
    cache: new InMemoryCache(),
  });
  return (
    <Provider client={client}>
      <App />
    </Provider>
  );
};

export default ApolloProvider;
