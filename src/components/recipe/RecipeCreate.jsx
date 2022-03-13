import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import MeasurementInput from '../forms/MeasurementInput'
import { API_ROOT } from '../../apiRoot'
import InstructionsInput from '../forms/InstructionsInput';

const RecipeCreate = props => {
  const navigate = useNavigate();
  const [ recipeTitle, setRecipeTitle ] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    alert('hi');

    return

   const body = { }

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

      }
    });
  }


  return (
    <div className="items-center h-screen">
      <div className="p-6 rounded-lg shadow-lg bg-white w-1/2 flex-grow justify-center">
        <form onSubmit={e => handleSubmit(e)}>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Recipe Title</label>
            <input
              type="text"
              name="recipeTitle"
              value={recipeTitle}
              onChange={e => setRecipeTitle(e.target.value)}
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
              aria-describedby="recipeTitle" placeholder="Title"/>
          </div>
          <div>
            <p>Ingredients</p>
            <MeasurementInput />
            <div className="mt-3 mb-3">
              <p className="text-blue-400">+ ingredient</p>
            </div>
          </div>
          <div>
            <InstructionsInput />
          </div>
          <button type="submit" className="
            mt-5
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
        </form>
      </div>
    </div>
  )
}

export default RecipeCreate;