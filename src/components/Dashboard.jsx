import React from 'react';
import RecipeFeed from './recipe/RecipeFeed'
import { useNavigate } from "react-router-dom";

const Dashboard = props => {
  const navigate = useNavigate();
  const determineAddRecipeButtonAction = () => {
    if (props.loggedIn === "NOT_LOGGED_IN") {
      alert("Please sign up or login to create a recipe!")
    } else {
      navigate('/create-recipe')
    }
  }

  if (props.loggedIn) {
    return (
      <div className="flex-row">
        <div className="ml-4 mt-4 mb-3">
          <button 
            onClick={determineAddRecipeButtonAction}
            className=" hover:bg-green-200 bg-green-300 text-green-800 px-3 py-2 rounded-md text-sm font-medium">
            Add a Recipe!
          </button>
        </div>
        <div>
          <RecipeFeed />
        </div>
      </div>
    )
  } else {
    return (
      <div className="">Welcome, please Login on Register</div>
    )
  }
}

export default Dashboard;