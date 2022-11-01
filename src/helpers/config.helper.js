export default {
    graphql_uri_prod: process.env.REACT_APP_REST_DEV_URL,
    graphql_uri_dev: process.env.REACT_APP_REST_DEV_URL || 'http://localhost:5000/graphql',
    node_env: process.env.NODE_ENV
}