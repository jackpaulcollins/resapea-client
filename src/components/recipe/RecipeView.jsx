import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate, Link } from "react-router-dom";
import { API_ROOT } from '../../apiRoot';
import { timeSince } from '../../functions'
import SubNav from '../SubNav'
import CommentSection from '../comments/CommentSection'

const RecipeView = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [ recipe, setRecipe] = useState()
  const { currentUser } = props;
  const { id } = params;

  useEffect(()=> {
    if (id) {
      fetchRecipe() 
    }
  }, [])

  async function fetchRecipe() {
    const body = { recipe: { id: id } }
    fetch(`${API_ROOT}/api/recipes/${id}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        data = JSON.parse(data.recipe)
        setRecipe(data)
      } else {
        navigate('/')
      }
    })
  }

  const renderIngredients = () => {
    if (recipe) {
      return recipe.recipe_ingredients.map((i, index) => {
        return <li key={index}>{i.measurement_unit_quantity} {i.measurement_unit_type} {i.ingredient_name}</li>
      })
    }
  }

  const renderInstructions = () => {
    if (recipe) {
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

  const maybeRenderPhoto = () => {
    if (recipe.photo_url) {
      return (
      <div className="flex flex-col w-1/3 m-auto">
        <img className="aspect-auto rounded" src={`${recipe.photo_url}`}></img>
      </div>
      )
    }
  }

  const maybeRenderCompatibilities = () => {
    if (recipe.compatibilities) {
      return recipe.compatibilities.map ((c, i) => {
        return (
          <div key={i}>
            <span className="
                    text-xs 
                    ml-1
                    bg-gray-200
                    rounded
                    p-1
                    "
            >
                {c}
            </span>
          </div>
        )
      })
    }
  }
  
  if (recipe) {
    return (
      <div className="flex-col">
      <div className="flex w-screen justify-center mt-20 rounded">
        <div className="w-1/2 shadow-lg rounded shadow-lg">
          <div className="flex justify-between items-baseline rounded">
            <div className="flex flex-col ml-2 mb-3">
              <h1 className="text-xl pt-2">{recipe ? recipe.name : '..loading'}</h1>
              <p className="text-xs ml-2 gray-200">{recipe ? recipe.genre : '..loading'}</p>
            </div>
            <div className="flex flex-row">
              {maybeRenderCompatibilities()}
            </div>
            <div className="flex flex-col">
              <div className="justify-end text-xs">
                created by <Link
                              to={`/user/${recipe.user.id}/`}
                              className="hover:bg-blue-200 text-blue-500 p-0.5 rounded-md text-sm font-medium mr-3">
                              {recipe.user.username}
                          </Link>
              </div>
              <div className="text-xs">
                {timeSince(recipe.created_at)} ago
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-row w-full">
            <div className="flex flex-col m-auto items-start w-1/3 mt-2 bg-indigo-10">
              <div className="text-xl mb-3">Ingredients<span className="text-xs">:</span></div>
              <ul className="list ml-2 border-b border-blue-200 divide-y divide-blue-200">{renderIngredients()}</ul>
              <div className="text-xl mt-4 mb-3">Instructions<span className="text-xs">:</span></div>
              <ul className="list ml-2 border-b border-blue-200 divide-y divide-blue-200">{renderInstructions()}</ul>
            </div>
            {maybeRenderPhoto()}
            </div>
            <div className="mt-10 ml-2">
              <SubNav recipe={recipe} currentUser={currentUser}/>
            </div>
        </div>
      </div>
      <CommentSection recipeId={recipe.id} userId={currentUser.id} />
    </div>
    )
  } else 
  return (
    ""
  )
}

export default RecipeView;