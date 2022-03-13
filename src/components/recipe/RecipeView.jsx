import React from 'react';
import { useLocation } from 'react-router-dom'

const RecipeView = props => {

  const location = useLocation();
  const { recipe } = location.state
  console.log(recipe)

  const renderIngredients = () => {
    if (recipe) {
      return recipe.ingredients.map(ingredient => {
        return (
                  <li key={ingredient.id}>{ingredient.name}</li>
                )
      })
    }
  }

  return (
    <div>
      <p className="text-3xl">
        {recipe.name}
      </p>
      <div>
        <ul className="list-disc list-inside">
        {renderIngredients()}
        </ul>
      </div>
    </div>
  )
}

export default RecipeView;