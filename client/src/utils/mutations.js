import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_RSVP = gql`
  mutation SaveRsvp(
    $response: String!
    $guests: Int!
    $children: Int!
    $specialFood: String
    $foodAllergy: String
  ) {
    saveRsvp(
      response: $response
      guests: $guests
      children: $children
      specialFood: $specialFood
      foodAllergy: $foodAllergy
    ) {
      username
      email
    }
  }
`;

export const CHANGE_RSVP = gql`
  mutation ChangeRsvp(
    $response: String!
    $guests: Int!
    $children: Int!
    $specialFood: String
    $foodAllergy: String
  ) {
    changeRsvp(
      response: $response
      guests: $guests
      children: $children
      specialFood: $specialFood
      foodAllergy: $foodAllergy
    ) {
      _id
      email
      username
    }
  }
`;

export const ADD_REGISTRY_ITEM = gql`
  mutation AddRegistryItem($registryItem: String) {
    addRegistryItem(registryItem: $registryItem) {
      username
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($content: String!, $image: String) {
    addPost(content: $content, image: $image) {
      username
      profilePic
      email
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $commentText: String!
    $commentAuthor: String!
    $postId: String!
  ) {
    addComment(
      postId: $postId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      comments {
        commentText
        commentAuthor
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId) {
      content
    }
  }
`;

export const ADD_LIKE = gql`
  mutation addLike($postId: String!) {
    addLike(postId: $postId) {
      content
    }
  }
`;

export const ADD_PROFILEPIC = gql`
  mutation addProfilePic($profileLink: String!) {
    addProfilePic(profileLink: $profileLink) {
      username
      profilePic
    }
  }
`;
