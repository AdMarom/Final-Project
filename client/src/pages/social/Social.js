import React from "react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import PageHeader from "../../components/PageHeader";
import { QUERY_USERS } from "../../utils/queries";
import SocialForm from "./SocialForm";
import { AddComment } from "./AddComment";
import auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../utils/mutations";
import Like from "./Like";

import Actives from "./Actives";
import Profile from "./Profile";

export default function Social() {
  //GETTING ALL THE DATA FROM POST
  const { data, loading, error } = useQuery(QUERY_USERS);

  const [deletePost] = useMutation(DELETE_POST);
  //GETTING ALL THE DATA FROM POST

  const userData = data?.users || [];
  console.log(userData);

  // THIS WILL PREVENT USERS WHO ARE NOT LOGGED IN, TO HAVE ACCESS TO THE URL ENDPOINTS
  if (!auth.loggedIn()) {
    return (
      <h1 className="d-flex flex-row justify-content-center">
        Access Denied!, please log in{" "}
      </h1>
    );
  }

  //CURRENT USER'S EMAIL

  const userEmail = auth.getProfile().data.email;

  if (loading)
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  const handleDelete = async (postId) => {
    console.log(postId);
    try {
      const { data } = await deletePost({
        variables: { postId },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="about w-100">
      <PageHeader
        title="Social Media"
        description="Our personal page for wedding"
      />

      <div className="d-flex mb-3 w-100 flex-wrap">
        <Profile />;
        <div className="w-75 border">
          {userData.map((user) => {
            return (
              <div
                className="d-flex flex-wrap flex-row-reverse justify-content-center
            "
              >
                {user.posts.map((post) => {
                  return (
                    <Card style={{ width: "18rem" }} className="m-1">
                      {userEmail === "db@test.com" ? (
                        <i
                          class="delBtn fa-regular fa-trash-can"
                          onClick={() => handleDelete(post._id)}
                        ></i>
                      ) : null}

                      <Card.Header>
                        <Card.Img
                          className="rounded"
                          variant="top"
                          style={{ width: "50px", height: "50px" }}
                          src={user.profilePic}
                        />{" "}
                        {user.username}
                      </Card.Header>

                      <Card.Body>
                        {post.image ? <Card.Img src={post.image} /> : null}
                        <Card.Title>{post.content}</Card.Title>
                      </Card.Body>
                      {/* COMMENTS AND LIKES */}
                      <Card.Body>
                        <div className="comment-section">
                          <Card.Text>Comments</Card.Text>
                          <ListGroup
                            variant="flush"
                            className="overflow-auto"
                            style={{ height: "7rem" }}
                          >
                            {post.comments.length === 0 ? (
                              <Card.Text>"be the first to comment.."</Card.Text>
                            ) : (
                              post.comments.map((comment) => {
                                return (
                                  <ListGroup.Item className="commentText">
                                    {comment.commentAuthor}:{" "}
                                    {comment.commentText}
                                  </ListGroup.Item>
                                );
                              })
                            )}
                          </ListGroup>
                        </div>

                        <div className="like-section">
                          <Card.Subtitle>
                            {post.likes.length} <Like postInfo={post} />
                          </Card.Subtitle>
                          <div className="likers overflow-auto">
                            {post.likes
                              ? post.likes.map((like) => {
                                  return (
                                    <ListGroup.Item className="fst-italic">
                                      {like.name}
                                    </ListGroup.Item>
                                  );
                                })
                              : null}
                          </div>
                        </div>

                        <AddComment postId={post._id} postLikes={post.likes} />
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
