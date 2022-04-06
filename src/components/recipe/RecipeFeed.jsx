import React, { useEffect, useState } from 'react';
import { API_ROOT } from '../../apiRoot';
import RecipeLineItemForFeed from './RecipeLineItemForFeed';


const RecipeFeed = (props) => {
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    fetch(`${API_ROOT}/api/recipes`)
    .then(response => response.json())
    .then(data => {
      setRecipes(JSON.parse(data.data))
      });
  }

  const renderRecipes = () => {
    if (recipes) {
      console.log(recipes)
      return (
        <div className="w-full flex flex-col items-center">
          <ul className="w-2/3 divide-y-2 divide-gray-200">
            {recipes.map((recipe) => (
              <RecipeLineItemForFeed key={recipe.id} recipe={recipe} currentUserId={props.currentUserId} votes={recipe.votes} />
            ))}
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          ...loading
        </div>
      )
    }
  }

  return (
    <div>
      {renderRecipes()}
    </div>
  )
}


export default RecipeFeed;