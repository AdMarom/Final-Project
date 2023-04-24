const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Post = require("./Post");

// import schema from Rsvp.js
const rsvpSchema = require("./Rsvp");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    //if a user is part of the wedding party
    weddingparty: {
      type: Boolean,
    },
    //if the user is the couple getting married
    couple: {
      type: Boolean,
    },
    // set rsvp to be a data that adheres to the rsvpSchema
    rsvp: rsvpSchema,
    //Added posts array
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    profilePic: {
      type: String,
      data: Buffer,
      trim: true,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model("User", userSchema);

module.exports = User;
