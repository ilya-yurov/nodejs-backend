import {gql} from "@apollo/client";

export const GET_ONE_USER_QUERY = gql`
    query getOneUser($id: ID!) {
        getUser(id: $id) {
            id, username
        }
    }
`;
