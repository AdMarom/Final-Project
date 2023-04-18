import registryData from "./registryData.json";
import Gift from "../../components/Gift";
import PageHeader from "../../components/PageHeader";
import RegistryLinks from "../../components/RegistryLinks";
import auth from "../../utils/auth";


const Portfolio = () => {

// if user is not logged in they will not be able to view this page 
  if (!auth.loggedIn()) {
    return (
      <h1 className="d-flex flex-row justify-content-center">
        Access Denied!, please log in{" "}
      </h1>
    );
  }

  // This code creates a reusable GiftList component that can render a dynamic list of Gift components based on the data provided in the registryData array.
  const GiftList = () =>
    registryData.map((registry, i) => (
      <Gift
        key={i}
        id={registry.id}
        gift={registry.gift}
        experiences={registry.experiences}
        image={registry.image}
        color={registry.bgcolor}
        learnMore={registry.learnMore}
        give={registry.give}
        text={registry.text}
      />
    ));


// if logged in return this section with pageheader, giftlist, and registrylinks components
  return (
    <section className="portfolio">
      <PageHeader title="Registry" description="Thank you for viewing our" />
      <div className="row">
        <GiftList />
        <RegistryLinks />
      </div>
    </section>
  );
};

export default Portfolio;
