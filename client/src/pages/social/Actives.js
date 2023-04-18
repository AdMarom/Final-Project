import ListGroup from "react-bootstrap/esm/ListGroup";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";
import auth from "../../utils/auth";
import { useEffect } from "react";
export default function Actives() {

  const currentUser = auth.getProfile().data.username;

  // here we will use data from query one user
  const { data, loading } = useQuery(QUERY_USERS);
  // if data doesn't exist use empty {}
  const userData = data?.users || {};

  if (loading) return <h1>Loading</h1>;

  console.log(userData);

  // return components
  return (
    <div className="actives">
      <ListGroup>
        <ListGroup.Item className="active">
          <i class="fa-solid fa-users"></i>
        </ListGroup.Item>
        {userData.map((people) => {
          return people.username === currentUser ? (
            <ListGroup.Item>👑 {people.username} </ListGroup.Item>
          ) : (
            <ListGroup.Item>{people.username}</ListGroup.Item>
          );
        })}
        {/* {userData.map((people) => {
          return <ListGroup.Item>{people.username}</ListGroup.Item>;
        })} */}
      </ListGroup>
    </div>
  );
}
