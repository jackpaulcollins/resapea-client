import React, { useEffect, useState } from 'react';
import { API_ROOT } from '../../apiRoot';
import RecipeLineItemForFeed from './RecipeLineItemForFeed';
import ReactPaginate from 'react-paginate';


const RecipeFeed = (props) => {
  const { currentUserId } = props;
  const [recipes, setRecipes] = useState();
  const [ pageCount, setPageCount ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(1)

  useEffect(() => {
    async function fetchRecipes() {
      const body = { recipe: { page: currentPage }}
      fetch(`${API_ROOT}/api/recipe_feed`, {
        headers: {'Content-Type': 'application/json'},
        method: 'post',
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(body)  
      })
      .then(response => response.json())
      .then(data => {
        setRecipes(JSON.parse(data.data))
        setPageCount(data.pages)
        });
    }
    fetchRecipes()
  }, [currentPage]);


  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1)
  };

  const renderRecipes = () => {
    if (recipes) {
      return (
        <div className="w-full flex flex-col items-center">
          <ul className="w-2/3 divide-y-2 divide-gray-200">
            {recipes.map((recipe) => (
              <RecipeLineItemForFeed key={recipe.id} recipe={recipe} currentUserId={currentUserId} votes={recipe.votes} />
            ))}
          </ul>
          <div className="flex flex-col mt-5">
              <div className="flex flex-row justify-center"id="container">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
              />
              </div>
            </div>
        </div>
      )
    } else {
      return (
        <div>
          ...loading
        </div>
      )
    }
  }

  return (
    <div>
      {renderRecipes()}
    </div>
  )
}


export default RecipeFeed;