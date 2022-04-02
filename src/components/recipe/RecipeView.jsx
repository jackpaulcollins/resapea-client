import React from 'react';
import { useLocation } from 'react-router-dom'
import SubNav from '../SubNav'
import CommentSection from '../comments/CommentSection'

const RecipeView = (props) => {
  const location = useLocation();
  const { recipe } = location.state

  const renderIngredients = () => {
    if (recipe) {
      return recipe.recipe_ingredients.map((i, index) => {
        return <li key={index}>{i.measurement_unit_quantity} {i.measurement_unit_type} {i.ingredient_name}</li>
      })
    }
  }

  const renderInsctructions = () => {
    if (recipe.instructions) {
      recipe.instructions.sort((a, b) => {
        if (a.position > b.position) {
          return 1
        } else {
          return -1
        }
      })
      return recipe.instructions.map((i, index) => {
        return <li key={index}>{i.content}</li>
      })
    }
  }

  return (
    <div className="flex-col">
      <div className="flex w-screen justify-center mt-20 rounded">
        <div className="w-1/2 shadow-lg bg-purple-200 rounded">
          <div className="flex justify-center items-baseline rounded">
            <h1 className="text-xl pt-2">{recipe.name}</h1>
            <p className="text-xs ml-2 gray-200">{recipe.genre}</p>
          </div>
          <div className="flex-row w-full bg-indigo-50 shadow-lg">
            <div className="flex flex-col m-auto items-start w-11/12 mt-2 bg-indigo-10 p-5">
              <div className="text-xl mb-3">Ingredients</div>
              <ul className="list ml-2 border-b-2 divide-y">{renderIngredients()}</ul>
              <div className="text-xl mt-4 mb-3">Instructions</div>
              <ul className="list ml-2 divide-y">{renderInsctructions()}</ul>
            </div>
            <div className="mt-1 ml-2">
              <SubNav recipe={recipe} currentUser={props.currentUser}/>
           </div>
          </div>
        </div>
      </div>
      <CommentSection recipeId={recipe.id} userId={props.currentUser.id} />
    </div>
  )
}

export default RecipeView;