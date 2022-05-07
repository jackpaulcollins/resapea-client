import React from "react";

const RecipeDelete = (props) => {
  const { handleRecipeDelete } = props;

  const deleteRecipe = () => {
    handleRecipeDelete();
  };
  return (
    <button
      onClick={deleteRecipe}
      className="
    mt-5
    px-6
    py-2.5
    bg-red-600
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
    >
      Delete
    </button>
  );
};

export default RecipeDelete;
