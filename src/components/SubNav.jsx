import React from 'react';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../apiRoot';

const SubNav = (props) => {
  const { currentUser, recipe } = props;

  async function emailRecipeToUser() {
    const body = { recipe: { recipe_id: recipe.id, user_id: currentUser.id }}
    fetch(`${API_ROOT}/api/recipes_mailer`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      });
  }

  const maybeRenderEditLink = () => {
    if (currentUser.id === recipe.user_id)  {
      return (
        <div>
          <Link to={`/recipe/${recipe.id}/edit`}>
            <span>
              edit
            </span>
          </Link>
        </div>
      )
    }
  }

  return (
    <div className="
          font-helvitca 
          uppercase 
          text-xs 
          text-gray-800 
          underline 
          font-semibold
          flex flex-row
          justify-around"
    >
      {maybeRenderEditLink()}
      <span onClick={emailRecipeToUser}>email yourself</span>
    </div>
  )
}

export default SubNav;