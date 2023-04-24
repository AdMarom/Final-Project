const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const Post = require("../models/Post");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    //get all users
    users: async () => {
      return User.find().populate("posts");
    },
    //get a user with given username
    user: async (parent, { username }) => {
      return User.findOne({ username: username }).populate("posts");
    },
    //get all posts
    posts: async () => {
      return Post.find();
    },
    //get post for a given post id
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
    //get logged in user
    me: async (parent, args, context) => {
      console.log(context);
      if (context.user) {
        console.log(context.user);
        return User.findOne({ _id: context.user._id }).populate("posts");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    //add a user
    addUser: async (parent, { username, email }) => {
      const user = await User.create({ username, email });
      console.log("server adduser ", user);
      const token = signToken(user);
      return { token, user };
    },
    //add a post
    addPost: async (parent, { content, image }, context) => {
      if (context.user) {
        const newPost = await Post.create({ content, image });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: newPost._id } }
        );

        return User;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    //delete a post
    deletePost: async (parent, { postId }) => {
      await Post.findOneAndDelete({ _id: postId });
      return Post;
    },
    //add a comment to a post
    addComment: async (parent, { postId, commentText, commentAuthor }) => {
      return Post.findOneAndUpdate(
        { _id: postId },
        {
          $addToSet: { comments: { commentText, commentAuthor } },
        },
        {
          new: true,
        }
      );
    },
    addProfilePic: async (parent, { profileLink }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: { profilePic: profileLink },
          },
          {
            new: true,
          }
        );
      }
    },
    //login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      // const correctPw = await user.isCorrectPassword(password);

      // if (!correctPw) {
      //   throw new AuthenticationError("Incorrect credentials");
      // }

      const token = signToken(user);

      return { token, user };
    },
    //saveRsvp will return user
    saveRsvp: async (
      parent,
      { response, guests, children, specialFood, foodAllergy },
      context
    ) => {
      console.log("IN SERVER saveRSVP 1");
      console.log(
        "IN SERVER savePRVP",
        response,
        guests,
        children,
        specialFood,
        foodAllergy
      );
      if (context.user) {
        console.log(context.user);
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              rsvp: { response, guests, children, specialFood, foodAllergy },
            },
          },
          { new: true }
        );

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //changeRsvp will return user
    changeRsvp: async (
      parent,
      { response, guests, children, specialFood, foodAllergy }
    ) => {},

    //addRegistryItem will return user
    addRegistryItem: async (parent, { registryItem }, context) => {
      const regItem = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $set: { registryItem } },
        { new: true }
      );
      return regItem;
    },
    //add LIke to a post
    addLike: async (parent, { postId }, context) => {
      if (context.user) {
        const userInfo = context.user.username;
        console.log(userInfo);
        const likedPost = await Post.findOneAndUpdate(
          { _id: postId },
          { $push: { likes: { name: userInfo, userId: context.user._id } } },
          { new: true }
        );
        return likedPost;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
