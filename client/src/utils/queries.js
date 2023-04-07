import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      rsvp
      reguitryItem
    }
  }
`;

export const GET_ME = gql`
query Me {
  me {
    _id
    username
    email
    bookCount
    rsvp
    reguitryItem
  }
}
`;

export const QUERY_RSVP = gql `
query allrsvps {
    rsvps {
      _id
      guests
      children
      specialFood
      foodAllergy
    }
  }
`;

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
      posts
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      posts
    }
  }
`;
