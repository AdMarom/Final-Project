import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import { QUERY_POSTS, QUERY_USERS } from "../../utils/queries";
import { useState } from "react";
import auth from "../../utils/auth";
export function AddComment({ postId }) {
  const [commentForm, setCommentForm] = useState({
    commentAuthor: "",
    commentText: "",
    postId: postId,
  });

  // const [addComment, { error }] = useMutation(ADD_COMMENT);

  const [addComment, { error, data }] = useMutation(ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      try {
        const { users } = cache.readQuery({ query: QUERY_USERS });

        cache.writeQuery({
          query: QUERY_USERS,
          data: { users: [...users, addComment] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleChange = (e) => {
    setCommentForm({ ...commentForm, commentText: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = auth.loggedIn() ? auth.getToken() : null;
    if (!token) {
      return false;
    }

    if (commentForm.commentText === "") {
      return;
    }

    try {
      const { data } = await addComment({
        variables: {
          ...commentForm,
          commentAuthor: auth.getProfile().data.username,
        },
      });
    } catch (err) {
      console.error(err);
    }
    setCommentForm({
      ...commentForm,
      commentText: "",
    });
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder="enter comment here..."
          onChange={handleChange}
          value={commentForm.commentText}
        />
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}
