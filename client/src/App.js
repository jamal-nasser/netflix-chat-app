import React, { useState } from 'react';
import './App.css';
import HomeScreen from '../src/components/HomeScreen/HomeScreen';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUpScreen from '../src/components/SignUpScreen/SignUpScreen';
import LogInScreen from '../src/components/LogInScreen/LogInScreen';
import WatchScreen from '../src/components/WatchScreen/WatchScreen';
import Profile from './components/ProfileScreen/ProfileScreen';
import AuthService from './services/AuthService';
import SearchBar from './components/SearchBar/SearchBar';
import WatchList from './components/WatchList/WatchList';
import Chat from './components/Chat/Chat';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
import Nav from './components/Nav/Nav';

function App() {
  
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  
  const fetchUserFromBE = () => {
    if (loggedInUser === null) {
      service
        .isLoggedIn()
        .then((response) => {
          setLoggedInUser(response);
        })
        .catch((err) => {
          
          console.log(err);
          setLoggedInUser(false);
        });
    }
  };

 
  const setTheUserToGlobalState = (userObj) => setLoggedInUser(userObj);

  
  fetchUserFromBE();

  return loggedInUser ? (
    <div className="app">
      <Nav userInSession={loggedInUser} setUser={setTheUserToGlobalState}  />
    <Switch>
      <Route path="/signup" render={() => <Redirect to="/profile"/>} />

      <Route path="/login" render={() => <Redirect  to="/watch" />} />

        <ProtectedRoute path="/watch" user={loggedInUser} component={WatchScreen} />
       
        <ProtectedRoute path="/search" user={loggedInUser}  component={SearchBar} />

        <ProtectedRoute path="/profile" setUser={setTheUserToGlobalState} user={loggedInUser}  component={Profile} />

        <ProtectedRoute path="/chat" user={loggedInUser}  component={Chat} />
        
        <ProtectedRoute exact path="/watchlist" user={loggedInUser}  render={() => <WatchList setUser={loggedInUser} />}  />

      {/* <Route exact path="/" component={HomeScreen} /> */}
    </Switch>

  </div>
  ) : (
      <div className="app">
        <Nav userInSession={loggedInUser} setUser={setTheUserToGlobalState}  />
    <Switch>
      <Route path="/signup" render={() => <SignUpScreen setUser={setTheUserToGlobalState} />} />

      <Route path="/login" render={() => <LogInScreen setUser={setTheUserToGlobalState} />} />

          <ProtectedRoute path="/watch" user={loggedInUser} />

          <ProtectedRoute path="/profile" user={loggedInUser}  />

          <ProtectedRoute path="/chat" user={loggedInUser} component={Chat} />

          <ProtectedRoute path="/search" user={loggedInUser} component={SearchBar} />
          
          <ProtectedRoute exact path="/watchlist" user={loggedInUser} render={() => <WatchList setUser={setTheUserToGlobalState} />} />

      <Route exact path="/" component={HomeScreen} />
    </Switch>

  </div>);
}

export default App;
