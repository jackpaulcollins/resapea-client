import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { API_ROOT } from '../../apiRoot';
import InstructionsInputList from '../forms/InstructionsInputList';
import IngredientsDetailsInputList from '../forms/IngredientsDetailsInputList';
import PlusIcon from '../icons/plusIcon'
import DeleteIcon from '../icons/DeleteIcon';
import DropDown from '../forms/DropDown'
import { GenreOptions } from '../../GenreOptions'
import { CuisineOptions } from '../../CuisineOptions'
import { TagOptions } from '../../TagOptions'

const RecipeCreate = (props) => {
  const { currentUser } = props;
  const navigate = useNavigate();
  const [ recipeName, setRecipeName ] = useState('')
  const [ recipeGenre, setRecipeGenre ]= useState(undefined)
  const [ recipeCuisine, setRecipeCuisine ] = useState(undefined)
  const [ recipeCompatibilities, setRecipeCompatibilities ] = useState([])
  const [ instructions, setInstructions ] = useState([])
  const [ ingredients, setIngredients ] = useState([])
  const [ selectedImage, setSelectedImage ] = useState()

  async function handleSubmit(e) {
    e.preventDefault();

    //short circuit if instructions and ingredients haven't beed added
    if ( ingredients.length === 0 || 
         instructions.length === 0 ||
         !recipeGenre || !recipeCuisine)
    {
      alert("ingredients, instructions, genre, and cuisine are required")
      return
    }

    const body = { 
      recipe: {
        user_id: currentUser.id,
        name: recipeName,
        genre: recipeGenre,
        cuisine: recipeCuisine,
        compatibilities: recipeCompatibilities,
        recipe_ingredients_attributes: ingredients,
        instructions_attributes: instructions,
        picture: selectedImage
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

  const handleFileRead = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    setSelectedImage(base64)
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }
  
  const selectedImageOrForm = () => {
    if (!selectedImage) {
      return (
        <div className="flex items-center justify-center bg-grey-lighter mb-5">
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a Photo!</span>
            <input
                className="hidden"
                type="file"
                accept="image/*"
                multiple={false}
                name="picture"
                onChange={(e) => {
                  handleFileRead(e)
                }}
            />
          </label>
      </div>
      )

    } else {
    return (
      <div className="flex flex-row p-5 justify-center items-center">
        <img className="h-30 w-96 rounded" src={`${selectedImage}`}></img>
        <div
          className="bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-2 ml-5 outline-none focus:outline-none"
          onClick={() => setSelectedImage(undefined)}
          >
          <div className="text-red-600 ml-2">
            <DeleteIcon />
          </div>
        </div>
      </div>
      )
    }
  }

  const handleGenreChange = (e) => {
    setRecipeGenre(e.label)
  }

  const handleCuisineChange = (e) => {
    setRecipeCuisine(e.label)
  }

  const handleCompatibilitiesChange = (e) => {
    setRecipeCompatibilities(e.map(e => e.label))
  }

  return (
    <div className="flex w-screen justify-center mt-20">
      <div className="w-1/2 rounded-lg shadow-lg bg-white p-5">
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <h5 className="text-center mt-2 text-xl">Create Your Recipe</h5>
            <div className="form-group flex mt-3 mb-6 justify-center">
              <div className="mt-10 flex flex-row items-center w-5/6">
                <label className="mr-2 form-label">Title:</label>
                <input
                  type="text"
                  name="recipeTitle"
                  onChange={(e) => setRecipeName(e.target.value)}
                  required
                  className="form-control
                  w-full
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
            </div>
            <div className="mt-12 flex flex-row justify-around ml-2">
              <div className="flex flex-row w-1/2 items-center">
              Genre:
              <div className="w-2/3 ml-2">
                <DropDown options={GenreOptions} required={true} value={recipeGenre} handleChange={handleGenreChange}/>
              </div>
              </div>
              <div className="flex flex-row w-1/2 items-center">
              Cuisine:
              <div className="w-2/3 ml-2">
                <DropDown options={CuisineOptions} required={true} handleChange={handleCuisineChange}/>
              </div>
              </div>
            </div>
            <div className="mt-10">
              Tags (optional):
              <DropDown options={TagOptions} isMulti={true} handleChange={handleCompatibilitiesChange}/>
            </div>
          </div>
          <div className="mt-10">
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
          {selectedImageOrForm()}
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