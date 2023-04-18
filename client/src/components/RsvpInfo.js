import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";


//the display of what has been saved for rsvp

const RsvpInfo = ({ name, email, rsvp }) => {

  // const { data } = useQuery(QUERY_ME);

  // const userData = data?.me || data?.User || {};

  // console.log("**RSVPINFO", data);

  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  if(!rsvp)
  return <h4>Please input number of guests</h4>;

  const {response, guests, children, specialFood, foodAllergy} = rsvp;

  return (
    <motion.div
      className="contactInfo"
      ref={ref}
      initial={{ x: "10vw", opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : { x: "10vw", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <h4 className="contentTitle">Your RSVP</h4>
      {/* <p className="infoDescription">Your information</p> */}
      <ul className="listInfo">
        <li>
          <div className="personalContactInfo">
            <span className="infoIcon">
              <i className="icon fa-solid fa-user"></i>{" "}
            </span>
            <div className="mediaWrap">
              <h6 className="infoType">Name:</h6>
              <span className="infoValue">{name}</span>
            </div>
          </div>
        </li>
        <li>
          <div className="personalContactInfo">
            <span className="infoIcon">
              <i className="icon fa-solid fa-envelope "></i>{" "}
            </span>
            <div className="mediaWrap">
              <h6 className="infoType">Email:</h6>
              <span className="infoValue">
                <a href={`mailto:${email}`}>{email}</a>
              </span>
            </div>
          </div>
        </li>
        <li>
          <div className="personalContactInfo">
            <span className="infoIcon">
              <i className="icon fa-solid fa-reply "></i>{" "}
            </span>
            <div className="mediaWrap">
              <h6 className="infoType">Response:</h6>
              <span className="infoValue">{response}</span>
            </div>
          </div>
        </li>
        <li>
          <div className="personalContactInfo">
            <span className="infoIcon">
              <i className="icon fa-solid fa-hashtag"></i>{" "}
            </span>
            <div className="mediaWrap">
              <h6 className="infoType">Number of Guests:</h6>
              <span className="infoValue">{guests}</span>
            </div>
          </div>
        </li>
        <li>
          <div className="personalContactInfo">
            <span className="infoIcon">
              <i className="icon fa-solid fa-child-reaching"></i>{" "}
            </span>
            <div className="mediaWrap">
              <h6 className="infoType">Number of Children: </h6>
              <span className="infoValue">{children}</span>
            </div>
          </div>
        </li>
        <li>
          <div className="personalContactInfo">
            <span className="infoIcon">
              <i className="icon fa-solid fa-burger"></i>{" "}
            </span>
            <div className="mediaWrap">
              <h6 className="infoType">Special Food: </h6>
              <span className="infoValue">{specialFood}</span>
            </div>
          </div>
        </li>
        <li>
          <div className="personalContactInfo">
            <span className="infoIcon">
              <i className="icon fa-solid fa-ban"></i>{" "}
            </span>
            <div className="mediaWrap">
              <h6 className="infoType">Food Allergy: </h6>
              <span className="infoValue">{foodAllergy}</span>
            </div>
          </div>
        </li>
      </ul>
    </motion.div>
  );
};

export default RsvpInfo;
