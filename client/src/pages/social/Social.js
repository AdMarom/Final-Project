import React from "react";
//import { useState } from "react";
import { useQuery } from "@apollo/client";
import Card from "react-bootstrap/Card";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/ListGroup";
import PageHeader from "../../components/PageHeader";
import { QUERY_POSTS } from "../../utils/queries";
import SocialForm from "./SocialForm";
import { AddComment } from "./AddComment";
import auth from "../../utils/auth";
//import Button from "react-bootstrap/Button";
//import { useMutation } from "@apollo/client";
//import { DELETE_POST } from "../../utils/mutations";
import Like from "./Like";
//import { QUERY_USERS } from "../../utils/queries";
//import CardGroup from "react-bootstrap/CardGroup";
import Actives from "./Actives";

export default function Social() {
  //GETTING ALL THE DATA FROM POST

  //const { data, loading, error } = useQuery(QUERY_POSTS);
  const { data, loading } = useQuery(QUERY_POSTS);


  //const [deletePost] = useMutation(DELETE_POST);
  //GETTING ALL THE DATA FROM POST
  console.log(data, "@@@@@@@@@@@");
  const postData = data?.posts || [];
  console.log(postData);

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
  // const handleDelete = async (postId) => {
  //   console.log(postId);
  //   try {
  //     const { data } = await deletePost({
  //       variables: { postId },
  //     });
  //     window.location.reload();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <section className="about">
      <PageHeader
        title="Social Media"
        description="Our personal page for wedding"
      />
      <div className="d-flex mb-3">
        <SocialForm />
      </div>
      <div className="container-fluid d-flex w-100 justify-content-around flex-wrap testing">
        <Actives />
        <div className="posts-container">
          {postData.length === 0 ? (
            <h1 style={{ color: "white" }}>Be the first to post something!</h1>
          ) : (
            postData.map((post) => {
              return (
                <Card className="card-main">
                  {userEmail === "db@test.com" ? (
                    <i
                      class="delBtn fa-regular fa-trash-can"
                    //  onClick={() => handleDelete(post._id)}
                    ></i>
                  ) : null}
                  <Card.Text className="postText">
                    <h4 className="d-flex justify-content-between">
                      {post.postAuthor} <Like postInfo={post} />
                    </h4>
                    <p> {post.content}</p>
                  </Card.Text>

                  {post.image ? (
                    <Card.Img
                      variant="top"
                      src={post.image}
                      className="post-image"
                    />
                  ) : null}
                  {/* <Card.Text className="postCreate">{post.createdAt}</Card.Text> */}

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
                                {comment.commentAuthor}: {comment.commentText}
                              </ListGroup.Item>
                            );
                          })
                        )}
                      </ListGroup>
                    </div>

                    <div className="like-section">
                      <Card.Subtitle>{post.likes.length} likes</Card.Subtitle>
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
            })
          )}
        </div>
      </div>
    </section>
  );
}
