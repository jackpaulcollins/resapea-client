import React, { useState } from 'react';
import { API_ROOT } from '../../apiRoot'

const RequestForgotPassword = () => {
  const [ email, setEmail ] = useState('');
  const [ message, setMessage ] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

   const body = { email: email }

    fetch(`${API_ROOT}/api/forgot_password`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        setMessage(data.message)
      }
    });
  }

  const apiMessage = () =>{
    if (message !== ''){
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline">{message}.</span>
        </div>
      )
    }
  }

  
  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form onSubmit={e => handleSubmit(e)}>
        <div className="form-group mb-6">
          <label htmlFor="exampleInputEmail1" className="form-label inline-block mb-2 text-gray-700">Email address</label>
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
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email"
            aria-describedby="emailHelp" placeholder="Enter email"/>
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
          {apiMessage()}
      </form>
    </div>
    );
  }

export default RequestForgotPassword;