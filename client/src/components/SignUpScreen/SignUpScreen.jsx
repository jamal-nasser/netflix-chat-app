import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import './SignUpScreen.css';
import { Link } from 'react-router-dom';

class SignUpScreen extends Component {

  state = { email: "", password: "", errorMessage: "" };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    this.service
      .signup(email, password)
      .then((response) => {
        console.log(response)
        this.setState({ email: "", password: "" });
        this.props.setUser(response);
        
      })
      .catch((error) => {
        console.log(error.response.data)
        if (error.response.data) {
          const { message } = error.response.data;
          this.setState({ ...this.state, errorMessage: message });
        }

        console.log(error);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    return (
         <div className="signupScreen">
      <div className="signupScreen-background">
        
        <div className="signupScreen-gradient" />
      </div>
      <div className="signupScreen-body">
          <form onSubmit={this.handleFormSubmit}>
            <h1>Sign Up </h1>
            
            <input name="email" type="email" placeholder="Email" autoComplete="username" value={this.state.email} onChange={(e) => this.handleChange(e)} />

            <input name="password" type="password" placeholder="Password" autoComplete="current-password" value={this.state.password}  onChange={(e) => this.handleChange(e)} />

            <div >{this.state.errorMessage && <p className="errorMessage">{this.state.errorMessage}</p>}</div>

            
            <button className="signupScreen-button" type="submit" value="signup" >Sign Up</button>
            

          <h4>
            <span className="signupScreen-gray">Already a member? </span>
            <span className="signupScreen-link" > <Link to="/login" style={{ color: '#fff' }} >Sign in now.</Link>  </span>
          </h4>
        </form>
      </div>

    </div>
    )
  }
}

export default SignUpScreen;


