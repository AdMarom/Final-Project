import { color, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

//This page displays a table for all the guest and their RSVP status

const DashboardInfo = ({ userData }) => {
  console.log(userData);

  const [ref, inView] = useInView({
    threshold: 0.2,

    triggerOnce: true,
  });

  return (
    <div className="aboutContainer container">
      <div className="row">
        <motion.div
          className="personalInfo col-12 col-lg-8"
          ref={ref}
          initial={{ x: "10vw", opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: "10vw", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="contentContainer flex">
            {/* style={{'width':'100%','alignItems':'center', 'justifyContent': 'center'}} */}

            <div  >
              <table
                id="guests_table"
                className="table"
                style={{'width':'1200px', 'height':'auto', 'backgroundColor':'white', 'borderRadius':'5px', 'alignItems':'center', 'justifyContent': 'center', 'fontFamily': 'futura',}}
              >
                {/* // style={{'width':'100%', 'backgroundColor':'rgba(255, 255, 255, 0.513)', 'borderRadius':'3px', 'alignItems':'center', 'justifyContent': 'center'}} */}
                <thead>
                  <th>Guest</th>
                  <th>Email</th>
                  <th>Wedding Party</th>
                  <th>RSVP Response</th>
                  <th>No. of Guests</th>
                  <th>No. of Children</th>
                  <th>Special Food</th>
                  <th>Food Allergy</th>
                </thead>
                <tbody>
                  {userData.map((item) => (
                    <>
                      {item.couple ? (
                        <>
                          <tr></tr>
                        </>
                      ) : (
                        <tr>
                          <td>{item.username}</td>
                          {/* <td>{item.email}</td> */}
                          <td>
                          <a href="mailto:{item.email}" style={{'color':'black'}}> {item.email} </a>
                          </td>
                          {item.weddingparty ? <td>Yes</td> : <td>No</td>}
                          {item.rsvp ? (
                            <>
                              <td>{item.rsvp.response}</td>
                              <td>{item.rsvp.guests}</td>
                              <td>{item.rsvp.children}</td>
                              <td>{item.rsvp.specialFood}</td>
                              <td>{item.rsvp.foodAllergy}</td>
                            </>
                          ) : (
                            <>
                              <td>No</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                              <td>-</td>
                            </>
                          )}
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardInfo;
