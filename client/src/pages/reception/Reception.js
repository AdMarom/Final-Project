import ReceptionInfo from "../../components/ReceptionInfo";
import PageHeader from "../../components/PageHeader";
import auth from "../../utils/auth";

// components need for reception page 

const Reception = ({ name, location, brand, email, availability }) => {

  // if user is not logged in they will not be able to view this page 
  if (!auth.loggedIn()) {
    return (
      <h1 className="d-flex flex-row justify-content-center">
        Access Denied!, please log in{" "}
      </h1>
    );
  }

  // if logged in return this section with pageheader and receptioninfo components
  return (
    <section className="about">
      <PageHeader
        title="Reception"
        description="Let's keep the party going!!"
      />
      <ReceptionInfo
        name={name}
        location={location}
        brand={brand}
        email={email}
        availability={availability}
      />
    </section>
  );
};

export default Reception;
