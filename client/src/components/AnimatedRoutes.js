import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "../pages/landing/Landing";
import About from "../pages/about/About";
import Registry from "../pages/registry/Registry";
import Rsvp from "../pages/rsvp/Rsvp";
import Social from "../pages/social/Social";
import Reception from "../pages/reception/Reception";
import Dashboard from "../pages/dashboard/Dasboard";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

//animated routes for the nav bar
const AnimatedRoutes = ({ personalDetails }) => {
  const location = useLocation();

  const { data } = useQuery(QUERY_ME);
  console.log(data);

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <Landing
            name={personalDetails.name}
            tagline={personalDetails.tagline}
          />
        }
      />
      <Route
        path="/about"
        element={
          <About
            name={personalDetails.name}
            location={personalDetails.location}
            email={personalDetails.email}
            availability={personalDetails.availability}
            brand={personalDetails.brand}
          />
        }
      />
      <Route path="/rsvp" element={<Rsvp />} />
      <Route path="/registry" element={<Registry />} />
      <Route path="/social" element={<Social />} />
      <Route
        path="/reception"
        element={
          <Reception
            name={personalDetails.name}
            location={personalDetails.location}
            email={personalDetails.email}
            availability={personalDetails.availability}
            brand={personalDetails.brand}
          />
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AnimatedRoutes;
