import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import invitation from "../pages/reception/Reception-Invitation.pdf";

const ReceptionInfo = ({ name, email, location, availability, brand }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

const styles = {
  text: {
    display: "flex",
    textAlign: "center",
  }

}

  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setDownloading(false);
  }, [downloading]);

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = invitation;
    link.download = "Recption-Invitation.pdf";
    link.onload = () => {
      link.remove();
      setDownloading(false);
    };
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="aboutContainer container">
      <div className="row" style={styles.text} >








        <div className="contentContainer">
          <h5 >To the BEST wedding party EVER!!!! </h5>
          <h4>Come celebrate with us with food, booze and bad dance moves!!!</h4>
          <br></br>
          <br></br>

          <div className="contentDescription">
            <h5> Reception Dinner </h5>
            <h5>6PM - 7:30PM</h5>
            <br></br>

            <h4> Starter </h4>
            <p>Mini Crab Cakes with a Spicy Remoulade Sauce</p>
            <p>Grilled Tuna Tartare with Avocado
              and Wasabi Cream</p>
            <p>Vegan Potato Pastry</p>
            <br></br>

            <h4> Main </h4>
            <p>
              <p>Grilled Swordfish with a Herb and Citrus Marinade</p>
              <p>Vegan/Vegetarian Option: Grilled Portobello Mushroom
              with Balsamic Glaze</p>
            </p>
            <br></br>

            <h4> Dessert/Cake Cutting </h4>
            <p>
              <p>Wedding Cake</p>
              <p>Seasonal Fruit Platter</p>
              <p>Dairy Free Gelato</p>
            </p>

            <br></br>

            <h5>Speeches</h5>
            <h5> 7:30 - 8PM </h5>
            <br></br>
            <p> Father of the Bride </p>
            <p> Best Man </p>
            <p> Maid of Honor </p>

          <br></br>

          <h5>Party</h5>
          <h5>8PM - 11PM</h5>
          <p> Let's dance!</p>
          </div>
          <br></br>
          <br></br>

          <div className="infoContainer">
            <div className="row">
              <div className="col-12 col-md-6 info">
                <span>Who are we:</span>
                <p>Dave & Buster</p>
              </div>
              <div className="col-12 col-md-6 info">
                <span>Email:</span>
                <p>
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 info">
                <span>Location:</span>
                <p>{location}</p>
              </div>
              <div className="col-12 col-md-6 info">
                <span>Date:</span>
                <p>{availability}</p>
              </div>
            </div>
          </div>
          <div>
          <div className="buttonContainer">
            <button className="btn downloadCV" onClick={handleDownload} disabled={downloading}>
              {downloading ? "Downloading..." : "Download Invitation"}
            </button>{" "}
          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReceptionInfo;
