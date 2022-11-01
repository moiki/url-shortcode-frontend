import {gql} from "@apollo/client";

export const GET_ME = gql`
query {
    Me {
        username
        email
    }
}
`

export const EXEC_LOGIN = gql`
    query ($email: String! $password: String!) {
        Login(email: $email password: $password) {
            username
            token
        }
    }
`

export const GET_URL_TABLE = gql`
    query ($page: Int! $perPage: Int!){
        result: ListUrls(page: $page perPage: $perPage) {
            docs {
                original_url
                short_url
                visits_quantity
            }
            total
        }
    }
`;

export const SAVE_URL = gql`
    mutation SaveUrl($url: String!){
        SaveUrl(url: $url)
    }
`