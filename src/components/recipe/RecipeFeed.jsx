import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { API_ROOT } from '../../apiRoot'
import UpvoteIcon from '../icons/UpvoteIcon'
import DownvoteIcon from '../icons/DownvoteIcon'

const RecipeFeed = () => {
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
      return (
        <div>
          <ul className="divide-y divide-gray-200 w-2/3">
            {recipes.map((recipe) => (
              <Link key={recipe.id} to={`/recipe/${recipe.id}`} state={{ recipe: recipe }}>
                <li className="py-4 w-fit ml-20 mr-20">
                  <div className="flex items-center space-x-3">
                    <div className="align-middle">
                      <button><UpvoteIcon /></button>
                      <p>23</p>
                      <button><DownvoteIcon /></button>
                    </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{recipe.name}</h3>
                          <p className="text-sm text-gray-500">Ingredients: {recipe.recipe_ingredients.length}</p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <p>
                            {recipe.genre}
                          </p>
                          <p>
                            Comments: 0
                          </p>
                        </div>
                      </div>
                  </div>
                </li>
              </Link>
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