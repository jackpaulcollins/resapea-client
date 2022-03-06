import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './auth/Login';
import Registration from './auth/Registration';
import RequestForgotPassword from './auth/RequestForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Home from '../components/Home';
import NavigationBar from '../components/NavigationBar';
import { API_ROOT } from '../apiRoot';


const App = () => {

  useEffect(() => {
    isLoggedIn()
  });

  const [ loggedIn, setLoggedIn ] = useState('NOT_LOGGED_IN');
  const [ user, setUser ] = useState({});

  async function isLoggedIn() {
    fetch(`${API_ROOT}/api/logged_in`, { credentials: 'include'})
    .then(response => response.json())
    .then(data => {
      if (data.logged_in && loggedIn === "NOT_LOGGED_IN") {
        setLoggedIn("LOGGED_IN")
        setUser(data.user)
      } else if (!data.logged_in && loggedIn === "LOGGED_IN") {
        setLoggedIn("NOT_LOGGED_IN")
        setUser({})
      }
    });
  }

  async function logout() {
    fetch(`${API_ROOT}/api/logout`, {
      method: 'delete',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        setLoggedIn("NOT_LOGGED_IN")
        setUser({})
      }
    });
  }

  const handleLogin = (data) => {
    setLoggedIn("LOGGED_IN")
    setUser(data.user)
  }

  return(
    <div>
      <NavigationBar user={user} logout={logout} />
      <Routes>
        <Route path={"/"} element={<Home />} />
          <Route path={"/login"} 
                element={
                  <Login
                  loggedIn={loggedIn} 
                  handleLogin={handleLogin}  
                  />} 
          />
          <Route path={"/register"}
                element={
                  <Registration 
                  loggedIn={loggedIn} 
                  handleLogin={handleLogin} 
                  />} 
          />
          <Route path={"/forgot_password"}
                element={
                  <RequestForgotPassword />
                } 
          />
          <Route path={"/password_reset/:token"}
                element={
                  <ResetPassword />
                } 
        />
      </Routes>
    </div>
  );
}

export default App;