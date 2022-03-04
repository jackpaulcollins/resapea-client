import React, { useState, useEffect } from 'react';
import { API_ROOT } from '../../apiRoot'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
  useEffect(() => {
    setToken(
      params.token.split("=")[1].toString()
    )
  },[]);

  const [ password, setPassword ] = useState('');
  //const [ passwordConfirmation, setPasswordConfirmation  ] = useState('');
  const [ token, setToken ] = useState('');
  const params = useParams();

  async function handleSubmit(e) {
    e.preventDefault();

   const body = { 
                  token: token,
                  password: password
                }

    fetch(`${API_ROOT}/api/reset_password`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => console.log(data));
  }
  
  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form onSubmit={e => handleSubmit(e)}>
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
          {/* <div className="form-group mb-6">
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
          </div> */}
          <div>
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
          </div>
      </form>
    </div>
    );
  }

export default ResetPassword;