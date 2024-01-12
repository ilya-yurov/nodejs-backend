import {gql} from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
    mutation createUser($input: UserInput) {
        createUser(input: $input) {
            id, username, age
        }
    } 
`;
