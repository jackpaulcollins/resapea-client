import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { API_ROOT } from '../../apiRoot'

const Login = (props) => {
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ rememberMe, setRememberMe ] = useState(false);
  const [ authErrorState, setAuthErrorState ] = useState({ isError: false})

  useEffect(() => {
    if (props.loggedIn === "LOGGED_IN"){
      navigate("/")
    }
  }, [props.loggedIn, navigate])

  async function handleSubmit(e) {
    e.preventDefault();

   const body = { user: { email: email, password: password, remember_me: rememberMe }}

    fetch(`${API_ROOT}/api/sessions`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      withCredentials: true,
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
          message: data.message
        });
      }
    });
  }


  const authError = () =>{
    if (authErrorState.isError){
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline">{authErrorState.message}.</span>
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
      <div className="p-6 rounded-lg shadow-lg bg-white max-w-none">
        <form onSubmit={e => handleSubmit(e)}>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Email address</label>
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email"
              aria-describedby="emailHelp" placeholder="Enter email"/>
          </div>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Password</label>
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
            <div className="form-group form-check mb-6">
          </div>
          <div className="flex justify-between items-center mb-6">
            <a href="/forgot_password"
              className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Forgot
              password?
            </a>
            <a href="/register"
              className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Sign Up!
            </a>
          </div>
          <div className="flex items-center mb-6">
          <input 
            id="remember-me" 
            name="remember-me" 
            type="checkbox" 
            value={rememberMe}
            onClick={() => setRememberMe(!rememberMe)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
          </input>
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
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

export default Login;