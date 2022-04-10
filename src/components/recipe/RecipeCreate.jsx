import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { API_ROOT } from '../../apiRoot';
import InstructionsInputList from '../forms/InstructionsInputList';
import IngredientsDetailsInputList from '../forms/IngredientsDetailsInputList';
import PlusIcon from '../icons/plusIcon'


const RecipeCreate = (props) => {
  const { currentUser } = props;
  const navigate = useNavigate();
  const [ recipeName, setRecipeName ] = useState('')
  const [ recipeGenre, setRecipeGenre ]= useState('')
  const [ instructions, setInstructions ] = useState([])
  const [ ingredients, setIngredients ] = useState([])

  async function handleSubmit(e) {
    e.preventDefault();

    //short circuit if instructions and ingredients haven't beed added
    if (ingredients.length === 0 || instructions.length === 0){
      alert("ingredients and instructions are required")
      return
    }

    const body = { 
      recipe: {
        user_id: currentUser.id,
        name: recipeName,
        genre: recipeGenre,
        recipe_ingredients_attributes: ingredients,
        instructions_attributes: instructions
      }
    }

    fetch(`${API_ROOT}/api/recipes`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200){
        alert('Recipe created!')
        navigate('/')
      }
    });
  }

  const removeIngredientFromIngredientsArray = () => {
    const tmp = ingredients.slice(0, -1)
    setIngredients(tmp)
  }

  const updateIngredientInIngredientsArray = (key, position, value) => {
    const tmp = ingredients
    tmp[position][key] = value;
    setIngredients(tmp);
  };

  // const setPosition = () => {
  //   instructions.length === 0 ? 
  // }

  const addElementToRecipeIngredientsOrInstructionsArray = (e, typeOfAdd) => {
    e.preventDefault();
    if (typeOfAdd === "ing") {
      setIngredients((prevIngredients) => [...prevIngredients, {}]);
    } else {
      setInstructions((prevInstructions) => [...prevInstructions, { position: instructions.length + 1}]);
    }
  };

  const updateInstructionInInstructionsArray = (position, value) => {
    const tmp = instructions
    tmp[position].content = value
    setInstructions(tmp)
  };

  const removeInstructionFromInstructionsArray = () => {
    const tmp = instructions.slice(0, -1)
    setInstructions(tmp)
  }

  return (
    <div className="flex w-screen justify-center mt-20">
      <div className="w-1/2 rounded-lg shadow-lg bg-white">
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <h5 className="text-center mt-2 text-xl">Create Your Recipe</h5>
            <div className="form-group flex mt-3 mb-6 place-content-around items-baseline">
              <div>
                <label className="mr-2 form-label inline-block mb-2 text-gray-700">Recipe Title</label>
                <input
                  type="text"
                  name="recipeTitle"
                  onChange={(e) => setRecipeName(e.target.value)}
                  required
                  className="form-control
                  w-max
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  mr-2
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="title"
                  aria-describedby="recipeTitle" placeholder="descriptive title.."/>
                </div>
                <div>
                  <label className="mr-2 form-label inline-block mb-2 text-gray-700">Genre</label>
                  <input
                    type="text"
                    name="recipeTitle"
                    onChange={(e) => setRecipeGenre(e.target.value)}
                    required
                    className="form-control
                    w-max
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    ml-2
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="genre"
                    aria-describedby="recipeGenre" placeholder="Italian, vegan, etc.."/>
                </div>
            </div>
          </div>
          <div>
            <div className="p-5">
              <p>Ingredients</p>
              <IngredientsDetailsInputList ingredients={ingredients}
                                                  addElementToRecipeIngredientsOrInstructionsArray={addElementToRecipeIngredientsOrInstructionsArray}
                                                  removeIngredientFromIngredientsArray={removeIngredientFromIngredientsArray}
                                                  updateIngredientInIngredientsArray={updateIngredientInIngredientsArray}
                                                  addElementToRecipeIngredientsOrInstructionsArray={addElementToRecipeIngredientsOrInstructionsArray} 
              />
              <div className="mt-3 mb-3">
                <button className="text-blue-400" onClick={(e)=> addElementToRecipeIngredientsOrInstructionsArray(e, "ing")}><PlusIcon/></button>
              </div>
            </div>
          </div>
          <div>
            <div className="p-5">
              <p>Instructions</p>
              <InstructionsInputList instructions={instructions}
                                    addElementToRecipeIngredientsOrInstructionsArray={addElementToRecipeIngredientsOrInstructionsArray}
                                    removeInstructionFromInstructionsArray={removeInstructionFromInstructionsArray}
                                    updateInstructionInInstructionsArray={updateInstructionInInstructionsArray}
              />           
              <div className="mt-3 mb-3">
                <button className="text-blue-400" onClick={(e)=> addElementToRecipeIngredientsOrInstructionsArray(e, "ins")}><PlusIcon/></button>
              </div>
            </div>
          </div>
          <div className="mb-5 ml-3">
            <button type="submit" className="
              mr-10
              mt-5
              px-6
              py-2.5
              bg-blue-600
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-blue-700 hover:shadow-lg
              focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg
              transition
              duration-150
              ease-in-out"
              >Submit</button>
            </div>
        </form>
      </div>
      
    </div>
  )
}

export default RecipeCreate;