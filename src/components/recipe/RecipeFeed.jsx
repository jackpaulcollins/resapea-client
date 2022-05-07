import React, { useEffect, useState } from "react";
import { API_ROOT } from "../../apiRoot";
import RecipeLineItemForFeed from "./RecipeLineItemForFeed";
import ReactPaginate from "react-paginate";
import DropDown from "../forms/DropDown";
import { TagOptions } from "../../TagOptions";
import Loading from "../../components/utilities/Loading";

const RecipeFeed = (props) => {
  const { currentUserId } = props;
  const [recipes, setRecipes] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryString, setQueryString] = useState("");
  const [recipeCompatibilities, setRecipeCompatibilities] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!queryString && !recipeCompatibilities) {
      fetchRecipesForFeed();
    } else if (queryString && !recipeCompatibilities) {
      handleQuerySubmit();
    } else {
      fetchFilteredRecipes();
    }
  }, [currentPage, recipeCompatibilities, queryString]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  async function fetchRecipesForFeed() {
    setLoading(true);
    const body = { recipe: { page: currentPage } };
    fetch(`${API_ROOT}/api/recipe_feed`, {
      headers: { "Content-Type": "application/json" },
      method: "post",
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipes(JSON.parse(data.data));
        setPageCount(data.pages);
      });
    setLoading(false);
  }

  async function handleQuerySubmit(e) {
    setLoading(true);
    if (e) {
      e.preventDefault();
    }
    const body = { recipe: { query_string: queryString, page: currentPage } };
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
          const recipes = JSON.parse(data.data);
          setRecipes(recipes);
          setPageCount(data.pages);
        }
        setLoading(false);
      });
  }

  async function fetchFilteredRecipes() {
    setLoading(true);
    const body = {
      recipe: {
        query_string: queryString,
        compatibilities: recipeCompatibilities,
        filter: true,
        page: currentPage,
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
          const recipes = JSON.parse(data.data);
          setRecipes(recipes);
          setPageCount(data.pages);
        }
        setLoading(false);
      });
  }

  const handleCompatibilitiesChange = (e) => {
    setRecipeCompatibilities(e.map((e) => e.label.toLowerCase()));
  };

  const renderRecipes = () => {
    if (recipes) {
      return (
        <div className="w-2/3">
          <ul className="divide-y-2 divide-gray-200">
            {recipes.map((recipe) => (
              <RecipeLineItemForFeed
                key={recipe.id}
                recipe={recipe}
                currentUserId={currentUserId}
                votes={recipe.votes}
              />
            ))}
          </ul>
          <div className="flex flex-col mt-5 mb-5">
            <div className="flex flex-row justify-center" id="container">
              <ReactPaginate
                className="inline-flex items-center -space-x-px"
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                pageLinkClassName="py-2 
                                   px-3 
                                   leading-tight 
                                   text-gray-500 
                                   bg-white border 
                                   border-gray-300 
                                   hover:bg-gray-100 
                                   hover:text-gray-700 
                                   dark:bg-gray-800 
                                   dark:border-gray-700 
                                   dark:text-gray-400 
                                   dark:hover:bg-gray-700 
                                   dark:hover:text-white
                                  "
                previousClassName="py-2 
                                   px-3 
                                   leading-tight 
                                   text-gray-500 
                                   bg-white 
                                   rounded-l-lg border 
                                   border-gray-300 
                                   hover:bg-gray-100 
                                   hover:text-gray-700 
                                   dark:bg-gray-800 
                                   dark:border-gray-700 
                                   dark:text-gray-400 
                                   dark:hover:bg-gray-700 
                                   dark:hover:text-white"
                nextLinkClassName="py-2 
                                   px-3 
                                   leading-tight 
                                   text-gray-500 
                                   bg-white 
                                   rounded-r-lg border 
                                   border-gray-300 
                                   hover:bg-gray-100 
                                   hover:text-gray-700 
                                   dark:bg-gray-800 
                                   dark:border-gray-700 
                                   dark:text-gray-400 
                                   dark:hover:bg-gray-700 
                                   dark:hover:text-white"
                nextClassName=""
                breakLinkClassName="py-2 
                                    px-3 
                                    leading-tight 
                                    text-gray-500 
                                    bg-white border 
                                    border-gray-300 
                                    hover:bg-gray-100 
                                    hover:text-gray-700 
                                    dark:bg-gray-800 
                                    dark:border-gray-700 
                                    dark:text-gray-400 
                                    dark:hover:bg-gray-700 
                                    dark:hover:text-white"
                containerClassName=""
                activeClassName="text-xl"
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row justify-center w-1/2 mb-10">
        <form onSubmit={(e) => handleQuerySubmit(e)} className="w-2/3">
          <div className="relative text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span>
            <input
              onChange={(e) => setQueryString(e.target.value)}
              type="search"
              name="q"
              className=" w-full py-2 text-sm text-blue rounded-full pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
              placeholder="Search by name, genre, or cuisine type"
              autoComplete="off"
            />
          </div>
        </form>
      </div>
      <div className="flex flex-col mb-20">
        <div>
          <span className="center">
            Filtering based on your dietary needs is easy! Just add some
            compatibilities:
          </span>
          <DropDown
            options={TagOptions}
            isMulti={true}
            useProps={false}
            defaultValue={undefined}
            handleChange={handleCompatibilitiesChange}
          />
        </div>
      </div>
      {loading ? <Loading /> : renderRecipes()}
    </div>
  );
};

export default RecipeFeed;
