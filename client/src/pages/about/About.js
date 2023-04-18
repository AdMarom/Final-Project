import AboutUs from "../../components/AboutUs";
import PageHeader from "../../components/PageHeader";
import auth from "../../utils/auth";

const About = ({ name, location, brand, email, availability }) => {

  //auth if user is not logged in they will not be able to view this page
  if (!auth.loggedIn()) {
    return (
      <h1 className="d-flex flex-row justify-content-center">
        Access Denied!, please log in{" "}
      </h1>
    );
  }

  //else return AboutMe and PageHeader components in browser to use
  return (
    <section className="about">
      <PageHeader
        title="About Us"
        description="Thank you for learning a little more"
      />
      <AboutUs
        name={name}
        location={location}
        brand={brand}
        email={email}
        availability={availability}
      />
    </section>
  );
};

export default About;
