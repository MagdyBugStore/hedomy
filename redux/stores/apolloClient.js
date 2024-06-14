import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const GRAPHQL_ENDPOINT = 'https://egyptstore.onrender.com/graphql';

// Create a custom HTTP link for handling the GraphQL endpoint
const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });

// Create an auth link to include the token in the request headers
const authLink = setContext((_, { headers }) => {
  // Get the token from wherever you have stored it (e.g., localStorage, Redux store, etc.)
  const authToken = localStorage.getItem('authToken');

  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '', // Add the token to the Authorization header
    },
  };
});


export  const apolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
});
export const apolloClient_token = new ApolloClient({
  link: ApolloLink.from([authLink,httpLink]),
  cache: new InMemoryCache(),
});
