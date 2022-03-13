import React from 'react';
import RecipeFeed from './recipe/RecipeFeed'

const Dashboard = props => {

  if (props.loggedIn) {
    return (
      <div>
        <div className="">
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