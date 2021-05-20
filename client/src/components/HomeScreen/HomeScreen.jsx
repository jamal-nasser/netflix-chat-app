import React from 'react';
import './HomeScreen.css';
import { Link } from 'react-router-dom';

const HomeScreen = () => {

  return (
    <div className="homeScreen">
      <div className="homeScreen-background">
        <div className="homeScreen-gradient" />
      </div>
      <div className="homeScreen-body">
        <>
          <h1>Unlimited films, TV programmes and more.</h1>
          <h2>Watch anywhere. Cancel at any time.</h2>
          <h3>Ready chat with people who like the same movie like you? <br/> Enter your email to create your account.</h3>
        </>

        <button className="homeScreen-button-one"><Link style={{ textDecoration: 'none', color: '#fff' }} to="/login" >Sign In</Link></button>
        <button className="homeScreen-button-two"><Link style={{ textDecoration: 'none', color: '#e50914' }} to="/signup" >Sign Up</Link> </button>

      </div>
    </div>
  )
}

export default HomeScreen;