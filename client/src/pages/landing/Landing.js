//import information from files needed
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Navigate, useParams } from "react-router-dom";
import landingImage from "../../images/landingd&b.jpg";
import Auth from "../../utils/auth";
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

// This landing page will be the first page that the user will see when visiting website
const Landing = ({ name, tagline }) => {
  
  //css styling
  const styles = {
    landing: {
      height: "calc(100% - 93px)",
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      marginLeft: "30px",
    },

    landingImage: {
      position: "absolute",
      bottom: "0",
      opacity: "0",
      // mixBlendMode: "lighten",
      height: "80%",
    },
    
    //test
    textContainer: {
      display: "flex",
      flexDirection: "column",
      letterSpacing: "1px",
      textAlign: "center",
      zIndex: "1",
      color: "#fff",
      textShadow: "1px 1px 3px #000",
    },

    name: {
      color: "#fff",
      fontWeight: "700",
      marginTop: "-100px",
      paddingBottom: "28px",
    },
  };

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  // const { loading, data } = useQuery(profileId ? QUERY_ME, {
  // }:null);
  
  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  // const profile = data?.me || data?.profile || {};

  //if logged in already go to this page 
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/" />;
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!profile?.name) {
  //   return (
  //     <h4>
  //       You need to be logged in to see your profile page. Use the navigation
  //       links above to sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <section className="landing" style={styles.landing}>
      <div className="textContainer" style={styles.textContainer}>
        <motion.h1
          className="name"
          style={styles.name}
          ref={ref}
          initial={{ y: "-10vw", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: "-10vw", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {name}
        </motion.h1>
        <motion.p
          className="description"
          ref={ref}
          initial={{ y: "10vw", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: "10vw", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {tagline}
        </motion.p>
      </div>
      <div className="image-container">
        <motion.img
          className="landingImage"
          ref={ref}
          initial={{ y: "10vw", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 0.4 } : { y: "10vw", opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={styles.landingImage}
          src={landingImage}
          alt=""
        />
      </div>
    </section>
  );
};

export default Landing;
