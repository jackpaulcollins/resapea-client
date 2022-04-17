import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { API_ROOT } from '../../apiRoot';
import InstructionsEditList from '../forms/InstructionsEditList';
import IngredientsDetailsEditList from '../forms/IngredientsDetailsEditList';
import RecipeDelete from './RecipeDelete';
import PlusIcon from '../icons/plusIcon'
import DeleteIcon from '../icons/DeleteIcon';

const RecipeEdit = (props) => {
  const { loggedIn } = props;
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const [ recipe, setRecipe ] = useState({})
  const [ recipeName, setRecipeName ] = useState(undefined)
  const [ recipeGenre, setRecipeGenre ]= useState(undefined)
  const [ instructions, setInstructions ] = useState(undefined)
  const [ ingredients, setIngredients ] = useState(undefined)
  const [ selectedImage, setSelectedImage ] = useState()

  useEffect(() => {
    if (id) {
      fetchRecipeData()
    }
  },[])

  async function fetchRecipeData() {
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
        setIngredients(data.recipe_ingredients)
        setInstructions(data.instructions)
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    //short circuit if instructions and ingredients haven't beed added
    if (ingredients.length === 0 || instructions.length === 0){
      alert("ingredients and instructions are required")
      return
    }
    const body = { 
      recipe: {
        id: recipe.id,
        name: recipeName,
        genre: recipeGenre,
        recipe_ingredients_attributes: ingredients,
        instructions_attributes: instructions,
        picture: selectedImage
      }
    }
    fetch(`${API_ROOT}/api/recipes/${recipe.id}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'put',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200){
        fetchRecipeData();
      }
    });
  }

  async function handleRecipeDelete() {
    const body = { recipe: recipe }
    fetch(`${API_ROOT}/api/recipes/${recipe.id}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'delete',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        alert("Recipe Deleted!");
        navigate('/')
      }
    });
  }

  async function handleRecipePhotoDelete(e) {
    e.preventDefault();
    const body = { recipe: recipe }
    fetch(`${API_ROOT}/api/recipes/photos/${recipe.id}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'delete',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        fetchRecipeData();
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
      setInstructions((prevInstructions) => [...prevInstructions, { position: instructions.length + 1 }]);
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

  const removeOrUpdatePictutre = () => {
    if (recipe.photo_url || selectedImage) {
      return (
        <div className="flex flex-row p-5 justify-center items-center">
            <img className="h-30 w-96 rounded" src={`${recipe.photo_url ? recipe.photo_url : selectedImage}`}></img>
            <span className="text-red-600" 
              onClick={(e) => {
                recipe.photo_url ? handleRecipePhotoDelete(e) :
                setSelectedImage(undefined)    
              }}>
                <div className="ml-2">
                  <DeleteIcon />
                </div>
            </span>
        </div>
      )
    } else {
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
    }
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

  return (
    <div className="flex w-screen justify-center mt-20">
      <div className="w-1/2 rounded-lg shadow-lg bg-white">
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <h5 className="text-center mt-2 text-xl">Change Your Recipe</h5>
            <div className="form-group flex mt-3 mb-6 place-content-around items-baseline">
              <div>
                <label className="mr-2 form-label inline-block mb-2 text-gray-700">Recipe Title</label>
                <input
                  type="text"
                  name="recipeTitle"
                  defaultValue={recipe.name}
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
                    defaultValue={recipe.genre}
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
              <IngredientsDetailsEditList ingredients={ingredients}
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
              <InstructionsEditList instructions={instructions}
                                    addElementToRecipeIngredientsOrInstructionsArray={addElementToRecipeIngredientsOrInstructionsArray}
                                    removeInstructionFromInstructionsArray={removeInstructionFromInstructionsArray}
                                    updateInstructionInInstructionsArray={updateInstructionInInstructionsArray}
              /> 
                                 
              <div className="mt-3 mb-3">
                <button className="text-blue-400" onClick={(e)=> addElementToRecipeIngredientsOrInstructionsArray(e, "ins")}><PlusIcon/></button>
              </div>
            </div>
            <div>
              {removeOrUpdatePictutre()}
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
              <RecipeDelete handleRecipeDelete={handleRecipeDelete}/>
            </div>
        </form>
      </div>
    </div>
  )
}

export default RecipeEdit;