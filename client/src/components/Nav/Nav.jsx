import React, { useState, useEffect } from 'react';
import './Nav.css';
import { Link, useHistory } from 'react-router-dom';
import AuthService from "../../services/AuthService";

const Nav = ({ userInSession, setUser }) => {

  const [show, handleShow] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();
 
  useEffect(() => {
    setLoggedInUser(userInSession);
  }, [userInSession]);

  
  const logoutUser = () => {
    service
      .logout()
      .then(() => {
        setLoggedInUser(null);
        setUser(null);
      })
      .catch((err) => console.error(err));
  };

  const history = useHistory();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, [])

  

  return loggedInUser ? (
    <div className={`nav ${show && 'nav-white'}`}>
      <div className="nav-contents">

        <img onClick={() => history.push("/watch")}
          className="nav-logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="netflix-logo" />
        
        <Link to="/chat">
          <button className="chat-button">Chat</button>
        </Link>
        
        <Link to="/profile" >
          <img
            className="nav-profile"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="avatar-logo" />
        </Link>

        <Link to="/">
          <button className="signout-button" onClick={() => logoutUser()}>Sign Out</button>
        </Link>

      </div>
    </div>
  ) : (
      <div className={`nav ${show && 'nav-white'}`}>
        <div className="nav-contents">

          <img onClick={() => history.push("/watch")}
            className="nav-logo"
            src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="netflix-logo" />

        </div>
      </div>
  )
}

export default Nav;
