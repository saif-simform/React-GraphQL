import React from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const PORT = process.env.PORT || 4000;

const client = new ApolloClient({
  uri: `http://localhost:${PORT}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
