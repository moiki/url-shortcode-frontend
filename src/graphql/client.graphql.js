import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import configHelper from "../helpers/config.helper";

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: configHelper.graphql_uri_dev,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const GraphQLClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default GraphQLClient