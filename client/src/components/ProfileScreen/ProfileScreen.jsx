import React from 'react';
import './ProfileScreen.css';

const Profile = ({loggedInUser}) => {

  return (
    <div className="profileScreen">

      <div className="profileScreen-body">
        <h1>Profile</h1>
        <div className="profileScreen-info">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="profile-avatar" />
          <div className="profileScreen-details">
            <h2>welcome  {loggedInUser.email}</h2>
            <div className="profileScreen-plans">
              <h3>Enjoy watching your favorite movie.</h3>
              

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
