const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    weddingparty: Boolean
    couple: Boolean
    posts: [Post]
    registryItem: String
    rsvp: Rsvp
    profilePic: String
  }
  type Comment {
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Post {
    _id: ID
    content: String
    createdAt: String
    image: String
    comments: [Comment]
    likes: [Like]
  }

  type Like {
    name: String
    userId: String
  }

  type Rsvp {
    response: String!
    guests: Int!
    children: Int!
    specialFood: String
    foodAllergy: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    posts: [Post]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!): Auth
    addPost(content: String!, image: String): User
    addComment(
      postId: String!
      commentText: String!
      commentAuthor: String!
    ): Post
    saveRsvp(
      response: String!
      guests: Int!
      children: Int!
      specialFood: String
      foodAllergy: String
    ): User
    changeRsvp(
      response: String!
      guests: Int!
      children: Int!
      specialFood: String
      foodAllergy: String
    ): User
    addRegistryItem(registryItem: String, userId: ID): User
    deletePost(postId: String): Post
    addLike(postId: String): Post
    addProfilePic(profileLink: String): User
  }
`;

module.exports = typeDefs;
