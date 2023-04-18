import NavLinks from "./NavLinks";
import logo from "../images/DBLogo.png";
import Auth from "../utils/auth"
import Login from "./Login";
import { Link } from "react-router-dom";

//the header component
const Header = () => {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };




  return (
    <header className="header">
      <img className="logo" src={logo} alt="logo" />
      <NavLinks />
      {/* <div>
        

        {Auth.loggedIn() ? (
         <button className="btn btn-lg btn-light m-2" onClick={logout}>
                        Logout
                      </button>
       
        ):(
         
          <Link className="btn btn-lg btn-primary m-2" to="/login">
            Login
          </Link>
        
          )}
        </div> */}
    
    </header>  
  );
};
export default Header;
