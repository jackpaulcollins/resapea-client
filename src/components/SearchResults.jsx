import { React, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import RecipeLineItemForFeed from "../components/recipe/RecipeLineItemForFeed";
import DropDown from "../components/forms/DropDown";
import { TagOptions } from "../TagOptions";
import { API_ROOT } from "../apiRoot";

const SearchResults = () => {
  const location = useLocation();
  const [recipes, setRecipes] = useState(location.state.recipes);
  const queryString = location.state.queryString;
  const currentUserId = location.state.currentUserId;
  const [recipeCompatibilities, setRecipeCompatibilities] = useState(undefined);

  const handleCompatibilitiesChange = (e) => {
    setRecipeCompatibilities(e.map((e) => e.label.toLowerCase()));
  };

  useEffect(() => {
    if (recipeCompatibilities) {
      fetchFilteredRecipes();
    }
  }, [recipeCompatibilities, queryString]);

  async function fetchFilteredRecipes() {
    const body = {
      recipe: {
        query_string: queryString,
        compatibilities: recipeCompatibilities,
        filter: true,
      },
    };
    fetch(`${API_ROOT}/api/recipes_query`, {
      headers: { "Content-Type": "application/json" },
      method: "post",
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          data = JSON.parse(data.data);
          setRecipes(data);
        }
      });
  }

  const renderRecipes = () => {
    if (recipes) {
      return (
        <div className="w-full flex flex-col items-center">
          <ul className="w-2/3 divide-y-2 divide-gray-200">
            {recipes.map((recipe) => (
              <RecipeLineItemForFeed
                key={recipe.id}
                recipe={recipe}
                currentUserId={currentUserId}
                votes={recipe.votes}
              />
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            ...No{" "}
            <strong>
              {recipeCompatibilities} {queryString}
            </strong>{" "}
            Recipes found. You should{" "}
            <Link
              to={currentUserId ? "/create-recipe" : "/"}
              className=" hover:bg-green-200 text-green-700 rounded-md text-s font-medium"
            >
              create one!
            </Link>
          </p>
        </div>
      );
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 mb-10 w-5/6">
        <p>
          Filtering based on your dietary needs is easy! Just add some
          compatibilities:
        </p>
        <DropDown
          options={TagOptions}
          isMulti={true}
          useProps={false}
          defaultValue={undefined}
          handleChange={handleCompatibilitiesChange}
        />
      </div>
      {renderRecipes()}
    </div>
  );
};

export default SearchResults;
