import React from 'react';
import './ProfileScreen.css';
import Nav from '../Nav/Nav';
// import AuthService from '../../services/AuthService';
// import { Link } from 'react-router-dom';


const Profile = ({loggedInUser}) => {

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen-body">
        <h1>Edit profile</h1>
        <div className="profileScreen-info">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="profile-avatar" />
          <div className="profileScreen-details">
            <h2>welcome  {loggedInUser.email}</h2>
            <div className="profileScreen-plans">
              <h3>Plans</h3>

              {/* <Link to="/">
                <button className="profileScreen-signOut" onClick={() => logoutUser()} > Sign Out</button>
              </Link> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
