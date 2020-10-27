import { gql } from "@apollo/client";

export const authFragment = gql`
  fragment authFragment on User {
    email
    token
    id
  }
`;
