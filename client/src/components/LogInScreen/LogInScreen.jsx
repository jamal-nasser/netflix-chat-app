import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import './LogInScreen.css';
import { Link } from 'react-router-dom';


class LogInScreen extends Component {
  
  state = { email: "", password: "", errorMessage: "" };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    this.service
      .login(email, password)
      .then((response) => {

        this.setState({ email: "", password: "" });
        this.props.setUser(response);
      })
      .catch((error) => {
        if (error.response.data) {
          const { message } = error.response.data;
          this.setState({ ...this.state, errorMessage: message });
        }

        console.error(error);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    return (

         <div className="loginScreen">
      <div className="loginScreen-background">
        <div className="loginScreen-gradient" />
      </div>
      <div className="loginScreen-body">
          <form onSubmit={this.handleFormSubmit}>

            <h1>Sign In</h1>
            
            <input name="email" type="email" placeholder="Email" autocomplete="username" value={this.state.email} onChange={(e) => this.handleChange(e)} />

            <input name="password" type="password" placeholder="Password" autocomplete="current-password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
            
            <div>{this.state.errorMessage && <span>{this.state.errorMessage}</span>}</div>

            
              <button className="loginScreen-button" type="submit" value="login" >Sign In</button>
            
  
          <h4>
            <span className="loginScreen-gray">New to Netflix? </span>
            <span className="loginScreen-link" > <Link to="/signup" style={{ color: '#fff'}} >Sign up now.</Link> </span>
          </h4>
        </form>
      </div>

    </div>
    )
  }
}

export default LogInScreen;

