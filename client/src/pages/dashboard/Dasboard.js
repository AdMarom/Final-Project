//import components and query
import DashboardInfo from "../../components/DashboardInfo";
import PageHeader from "../../components/PageHeader";
import { QUERY_USERS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import auth from "../../utils/auth";

const Dashboard = () => {

  // here we will use data from query multiple users
  const { data } = useQuery(QUERY_USERS);

  // if not a single object then use [] list option
  const userData = data?.users || [];
  console.log(userData);

  // if user is not logged in they will not be able to view this page 
  if (!auth.loggedIn()) {
    return (
      <h1 className="d-flex flex-row justify-content-center">
        Access Denied!, please log in{" "}
      </h1>
    );
  }

  //return PageHeader & DashboardsInfo components in browser to use
  return (
    <section className="about">
      <PageHeader
        title="The Couple's Dashboard"
        description="Here are all the pesky little details..."
      />

      <DashboardInfo userData={userData} />
    </section>
  );
};

export default Dashboard;
