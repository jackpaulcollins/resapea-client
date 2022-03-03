import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './auth/Login'
import Registration from './auth/Registration';
import SubmitForgotPassword from './auth/SubmitForgotPassword'
import Home from '../components/Home'
import { API_ROOT } from '../apiRoot'


const App = () => {

  useEffect(() => {
    isLoggedIn()
  },[]);

  const [ loggedIn, setLoggedIn ] = useState('NOT_LOGGED_IN');
  const [ user, setUser ] = useState({});

  async function isLoggedIn() {
    fetch(`${API_ROOT}/api/logged_in`)
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

  const handleLogin = (data) => {
    setLoggedIn("LOGGED_IN")
    setUser(data.user)
  }

  console.log(loggedIn, user)

  return(
    <div>
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
                <SubmitForgotPassword />
              } 
        />
      </Routes>
    </div>
  );
}

export default App;