import { ADD_LIKE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import { QUERY_POSTS, QUERY_USERS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import auth from "../../utils/auth";
import Button from "react-bootstrap/esm/Button";
export default function Like({ postInfo }) {
  console.log(postInfo, " LIKES");
  //GETTING THE CURRENT USER ID
  const currentUserId = auth.getProfile().data._id;

  const [disable, setDisable] = useState(false);
  const [addLike, { error, data }] = useMutation(ADD_LIKE, {
    update(cache, { data: { addLike } }) {
      try {
        const { users } = cache.readQuery({ query: QUERY_USERS });

        cache.writeQuery({
          query: QUERY_USERS,
          data: { users: [...users, addLike] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  useEffect(() => {
    //START WITH AN EMPTY ARRAY
    const arrayIds = [];

    //PUSH ALL THE USER IDS FROM LIKE DATA
    postInfo.likes.forEach((like) => {
      arrayIds.push(like.userId);
    });
    //IF ONE OF THE IDS MATCHES THE ID OF THE CURRENT USER
    //SET THE BUTTON TO "LIKED"
    for (let i = 0; i < arrayIds.length; i++) {
      if (arrayIds[i] === currentUserId) {
        setDisable(true);
      }
    }
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(e.target.value);

    try {
      const { data } = await addLike({
        variables: {
          postId: postInfo._id,
        },
      });
      setDisable(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {disable ? (
        <i class="fa-solid fa-heart fa-beat"></i>
      ) : (
        <i onClick={handleClick} class="fa-regular fa-heart "></i>
      )}
    </>
  );
}
