import React, { useState, useEffect } from 'react';
import { API_ROOT } from '../../apiRoot'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const paramToken = params.token;

  useEffect(() => {
    setToken(
      paramToken.split("=")[1].toString()
    )
  },[paramToken]);

  const [ password, setPassword ] = useState('');
  const [ passwordConfirmation, setPasswordConfirmation  ] = useState('');
  const [ token, setToken ] = useState('');
  const [ message, setMessage ] = useState({});
  

  async function handleSubmit(e) {
    e.preventDefault();
    if (
          ensurePasswordsMeetMinimum(password, passwordConfirmation)
          && ensurePasswordsMatch(password, passwordConfirmation)
       ) {
      const body = { 
                     token: token,
                     password: password
                   }
   
      fetch(`${API_ROOT}/api/reset_password`, {
        headers: {'Content-Type': 'application/json'},
        method: 'post',
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setMessage({
            status: data.status,
            message: data.message
          });
          setTimeout(() => {navigate('/')}, 1500);
        } else {
          setMessage({
            status: data.status,
            message: data.message
          });
        }
      })
    }
  }

  const ensurePasswordsMatch = (p1, p2) => {
    if ( p1 !== p2) {
      setMessage({
        status: 'error',
        message: `Passwords don't match`
      })
      return false
    } else {
      return true
    }
  }

  const ensurePasswordsMeetMinimum = (p1, p2) => {
    if (p1.length < 6 || p2.length < 6) {
      setMessage({
        status: 'error',
        message: 'Password must be at least six characters'
      })
      return false
    } else {
      return true
    }
  }

  const apiErrorMessage = () =>{
    if (message.status === 500 || message.status === 422){
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline"><p>{message.message}</p></span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          </span>
          <button
            className="absolute bg-transparent text-2xl leading-none right-0 top-0 mt-2 mr-6 outline-none focus:outline-none"
            onClick={() => setMessage({})}
          ><span>x</span></button>
        </div>
      )
    }
  }

  const apiSuccessMessage = () =>{
    if (message.status === 200){
      return (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline"><p>{message.message}</p></span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <button
            className="absolute bg-transparent text-2xl leading-none right-0 top-0 mt-2 mr-6 outline-none focus:outline-none"
            onClick={() => setMessage({})}
          ><span>x</span></button>
          </span>
        </div>
      )
    }
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
                {apiErrorMessage()}
                {apiSuccessMessage()}
          </div>
      </form>
    </div>
    );
  }

export default ResetPassword;