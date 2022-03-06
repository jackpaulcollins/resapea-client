import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { API_ROOT } from '../../apiRoot'

const Registration = (props) => {
  const navigate = useNavigate();
  const [ username, setUsername  ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordConfirmation, setPasswordConfirmation  ] = useState('');
  const [ authErrorState, setAuthErrorState ] = useState({ isError: false})

  async function handleSubmit(e){
    e.preventDefault();
    if (
      ensurePasswordsMeetMinimum(password, passwordConfirmation)
      && ensurePasswordsMatch(password, passwordConfirmation)
      ) {
        const body = {       
          user: {
          email: email,
          username: username,
          password: password,
          passwordConfirmation: passwordConfirmation
        }
      }

    fetch(`${API_ROOT}/api/registrations`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
    if (data.status === 'created' && data.user){
        props.handleLogin(data)
        navigate("/");
      } else
        {
          setAuthErrorState({
            isError: true,
            message: data.errors
          });
        }
      });
    }  
  }

  const ensurePasswordsMatch = (p1, p2) => {
    if ( p1 !== p2) {
      setAuthErrorState({
        isError: true,
        message: `Passwords don't match`
      })
      return false
    } else {
      return true
    }
  }

  const ensurePasswordsMeetMinimum = (p1, p2) => {
    if (p1.length < 6 || p2.length < 6) {
      setAuthErrorState({
        isError: true,
        message: 'Password must be at least six characters'
      })
      return false
    } else {
      return true
    }
  }

  const authError = () =>{
    if (authErrorState.isError){
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline">{authErrorState.message}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <button
            className="absolute bg-transparent text-2xl leading-none right-0 top-0 mt-2 mr-6 outline-none focus:outline-none"
            onClick={() => setAuthErrorState(false)}
          ><span>x</span></button>
          </span>
        </div>
      )
    }
  }

  return (
      <div className="flex justify-center items-center h-screen">
        <div className="p-6 rounded-lg shadow-lg bg-white max-w-sm">
          <form onSubmit={e => handleSubmit(e)}>
          <div className="form-group mb-6">
              <label htmlFor="username" className="form-label inline-block mb-2 text-gray-700">Username</label>
              <input 
                type="text" 
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="form-control
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-describedby="usernameHelp" placeholder="username"/>
            </div>
            <div className="form-group mb-6">
              <label htmlFor="email" className="form-label inline-block mb-2 text-gray-700">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail1"
                aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group mb-6">
              <label htmlFor="password1" className="form-label inline-block mb-2 text-gray-700">Password</label>
              <input 
                type="password"
                name="email"
                value={password}
                onChange={e => setPassword(e.target.value)} 
                className="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword1"
                placeholder="Password"/>
            </div>
            <div className="form-group mb-6">
              <label htmlFor="passwordConfirmation" className="form-label inline-block mb-2 text-gray-700">Password Confirmation</label>
              <input 
                type="password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={e => setPasswordConfirmation(e.target.value)} 
                className="form-control block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="passwordConfirmation"
                placeholder="Password Confirmation"/>
            </div>
              <div className="form-group form-check mb-6">
            </div>
            <div className="flex justify-between items-center mb-6">
              <a href="/login"
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Have an account? Login
              </a>
            </div>
            <button type="submit" className="
              px-6
              py-2.5
              bg-blue-600
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-blue-700 hover:shadow-lg
              focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg
              transition
              duration-150
              ease-in-out">Submit</button>
              {authError()}
          </form>
        </div>
      </div>
    );
  }

export default Registration;