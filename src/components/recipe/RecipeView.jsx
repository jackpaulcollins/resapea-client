import React from 'react';
import { useLocation, Link } from 'react-router-dom'

const RecipeView = (props) => {
  const location = useLocation();
  const { recipe } = location.state

  const maybeRenderEditLink = () => {
    if (props.currentUser.id === recipe.user_id) {
      return (
        <div>
          <Link 
                    to= {`/recipe/${recipe.id}/edit`}
                    state={{ recipe: recipe }}>
            <button>
              edit
            </button>
          </Link>
        </div>
      )
    }
  }

  const renderIngredients = () => {
    if (recipe) {
      return recipe.recipe_ingredients.map((i, index) => {
        return <li key={index}>{i.measurement_unit_quantity}{i.measurement_unit_type}{i.ingredient_name}</li>
      })
    }
  }

  const renderInsctructions = () => {
    if (recipe) {
      return recipe.instructions.map((i, index) => {
        return <li key={index}>{i.content}</li>
      })
    }
  }

  return (
        <div>
          {maybeRenderEditLink()}
          <h3 className="text-lg font-medium text-gray-900">{recipe.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{recipe.genre}</p>
          <div className="text-sm font-medium text-gray-500">Ingredients: </div>
          <ul className="mt-1 text-sm text-gray-900">{renderIngredients()}</ul>
          <ul>{renderInsctructions()}</ul>
        </div>
  )
}

export default RecipeView;