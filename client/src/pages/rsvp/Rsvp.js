import PageHeader from "../../components/PageHeader";
import RsvpForm from "../../components/RsvpForm";
import RsvpInfo from "../../components/RsvpInfo";
// import Login from "../../Login"
import { useQuery } from "@apollo/client";
import auth from "../../utils/auth";
import { QUERY_ME } from "../../utils/queries";


const Rsvp = () => {

  // here we will use data from query one user
  const { data } = useQuery(QUERY_ME);

  // if data doesn't exist use empty {}
  const userData = data?.me || {};

  console.log("RSVP...", userData);

  // if user is not logged in they will not be able to view this page 
  if (!auth.loggedIn()) {
    return (
      <h1 className="d-flex flex-row justify-content-center">
        Access Denied!, please log in{" "}
      </h1>
    );
  }

  // return components
  return (
    <section className="contact">
      <PageHeader title="RSVP" description="Please go ahead and" />
      <div className="contactWrap container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <RsvpForm />
          </div>
          <div className="col-12 col-lg-6">
            <RsvpInfo
              name={userData.username}
              email={userData.email}
              rsvp={userData.rsvp}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rsvp;
