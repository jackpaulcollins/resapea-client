import React from 'react'
import { useLocation } from 'react-router-dom'
import RecipeLineItemForFeed from '../components/recipe/RecipeLineItemForFeed'

const SearchResults = (props) => {
  const location = useLocation();
  const recipes  = location.state.recipes
  const currentUserId = location.state.currentUserId
  console.log(location)

  const renderRecipes = () => {
    if (recipes) {
      return (
        <div className="w-full flex flex-col items-center">
          <ul className="w-2/3 divide-y-2 divide-gray-200">
            {recipes.map((recipe) => (
              <RecipeLineItemForFeed key={recipe.id} recipe={recipe} currentUserId={currentUserId} votes={recipe.votes} />
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

export default SearchResults;