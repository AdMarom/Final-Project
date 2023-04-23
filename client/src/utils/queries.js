import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  {
    users {
      _id
      username
      email
      weddingparty
      couple
      rsvp {
        response
        guests
        children
        specialFood
        foodAllergy
      }
      profilePic
      posts {
        _id
        content
        image
        comments {
          commentText
          commentAuthor
        }
        likes {
          name
          userId
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      weddingparty
      couple
      profilePic
      rsvp {
        response
        guests
        children
        specialFood
        foodAllergy
      }
      posts {
        content
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  {
    posts {
      _id
      content
      image
      createdAt
      likes {
        name
      }
      comments {
        commentText
        commentAuthor
      }
    }
  }
`;
