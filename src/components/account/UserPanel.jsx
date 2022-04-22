import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { API_ROOT } from '../../apiRoot';
import ReactPaginate from 'react-paginate';
import RecipeLineItemForFeed from '../../components/recipe/RecipeLineItemForFeed'

const UserPanel = (props) => {
  const [ user, setUser ] = useState(undefined)
  const [ userRecipes, setUserRecipes ] = useState(undefined)
  const [ activeUpdate, setActiveUpdate ] = useState("")
  const [ username, setUsername ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ formErrorState, setFormErrorState ] = useState({ isError: false});
  const [ pageCount, setPageCount ] = useState(0);
  const [ currentPage, setCurrentPage ] = useState(1)
  const { currentUser, refreshUser } = props;
  const params = useParams();

  useEffect(() => {
    fetchUser()
  }, [currentPage])

  async function fetchUser() {
    const body = { user: { user_id: params.id, page: currentPage }}
    fetch(`${API_ROOT}/api/users`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        const user = data.data.user
        const userRecipes = JSON.parse(data.data.recipes)
        setUser({ id: user.id, username: user.username, email: user.email })
        setUserRecipes(userRecipes)
        setPageCount(data.data.pages)
      }
    });
  }

  async function handleSubmit(e, type) {
    e.preventDefault();
    let body = {}
    type === "username" ?  body = { user: { username: username }} : body = { user: { email: email}}
    fetch(`${API_ROOT}/api/users/${user.id}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'put',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        refreshUser()
        setActiveUpdate(false)
      } else if (data.status === 500) {
        setFormErrorState({
          isError: true,
          message: data.errors
        });
      }
    });
  }  
  
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1)
  };


  const renderRecipes = () => {
    if (userRecipes) {
      const username = currentUser.id === user.id ? currentUser.username : user.username
      return (
        <div className="w-full flex flex-col">
          <span className="self-start mb-10">Recipes by {username}</span>
          <ul className="w-2/3 divide-y-2 divide-gray-200">
            {userRecipes.map((recipe) => (
              <RecipeLineItemForFeed key={recipe.id} recipe={recipe} currentUserId={currentUser.id} votes={recipe.votes} />
            ))}
          </ul>
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

  const formOrDisplayUsername = () => {
    if (activeUpdate === "username") {
      return (
        <div className="flex flex-col">
          <form onSubmit={e => handleSubmit(e, "username")}>
            <div className="form-group">
              <input 
                type="text" 
                name="username"
                required
                defaultValue={currentUser.username}
                onChange={e => setUsername(e.target.value)}
                className="form-control
                h-2/3
                w-1/3
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
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email"
                aria-describedby="updateUserName"/>
            </div>
            <div className="flex flex-row mt-2">
              <button className="
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
                >
                submit
              </button>
              <span onClick={() => setActiveUpdate("")}
                     className="
                     ml-4
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
                     hover:bg-red-800 hover:shadow-lg
                     focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
                     active:bg-red-800 active:shadow-lg
                     transition
                     duration-150
                     ease-in-out"
              >
                cancel
              </span>
            </div>
            {formError()}
          </form>
        </div>
      )
    } else {
      if (currentUser && user) {
        if (currentUser.id === user.id) {
          return (
            <span className="flex-grow">{currentUser.username}</span>
          )
        } else {
          return (
            <span className="flex-grow">{user.username}</span>
          )
        }
      }
    }
  }

  const formOrDisplayEmail = () => {
    if (activeUpdate === "email") {
      return (
        <div className="flex flex-col">
          <form onSubmit={e => handleSubmit(e, "email")}>
            <div className="form-group">
              <input 
                type="email" 
                name="username"
                required
                placeholder={currentUser.email}
                onChange={e => setEmail(e.target.value)}
                className="form-control
                h-2/3
                w-2/5
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
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email"
                aria-describedby="updateUserName"/>
            </div>
            <div className="flex flex-row mt-2">
              <button className="
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
                >
                submit
              </button>
              <span onClick={() => setActiveUpdate("")}
                     className="
                     ml-4
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
                     hover:bg-red-800 hover:shadow-lg
                     focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
                     active:bg-red-800 active:shadow-lg
                     transition
                     duration-150
                     ease-in-out"
              >
                cancel
              </span>
            </div>
            {formError()}
          </form>
        </div>
      )
    } else {
      if (currentUser && user) {
        if (currentUser.id === user.id) {
        return (
          <span className="flex-grow">{currentUser.email}</span>
        )
      } else {
          return (
            <span className="flex-grow">{user.email}</span>
          )
        }
      }
    }
  }

  const maybeShowUpdateButton = (updateType) => {
    if (currentUser.id === user.id){
      if (!activeUpdate){
        return (
          <button type="button"
                  onClick={() => setActiveUpdate(updateType)}
                  className="bg-white 
                            rounded-md 
                            font-medium 
                            text-indigo-600 
                            hover:text-indigo-500 
                            focus:outline-none 
                            focus:ring-2 
                            focus:ring-offset-2 
                            focus:ring-indigo-500"
          >Update</button>
        )
      }
    } 
  }

  const formError = () => {
    if (formErrorState.isError){
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline">{formErrorState.message}.</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <button
            className="absolute bg-transparent text-2xl leading-none right-0 top-0 mt-2 mr-6 outline-none focus:outline-none"
            onClick={() => setFormErrorState(false)}
          ><span>x</span></button>
          </span>
        </div>
      )
    }
  }

  const maybeShowEmail = () => {
    if (user && currentUser.id === user.id) {
      return (
        <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-gray-500">Email address</dt>
          <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <span className="flex-grow">{formOrDisplayEmail(user ? user.email : "")}</span>
            <span className="ml-4 flex-shrink-0">
              { user ? maybeShowUpdateButton("email") : "loading.."}
            </span>
        </dd>
      </div>
      )
    }
  }

  if (currentUser.id) {
    return (
      <div className="flex flex-col w-full items-center">
        <div className="mt-5 w-2/3">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">{formOrDisplayUsername(user ? user.username : "")}</span>
                <span className="ml-4 flex-shrink-0">
                  { user ? maybeShowUpdateButton("username") : "loading.."}
                </span>
              </dd>
            </div>
            {maybeShowEmail()}
          </dl>
        </div>
        <div>
        </div>
        <div className="flex flex-row w-2/3 mt-20 justify-start">
          {renderRecipes()}
        </div>
        <div className="flex flex-col mt-5 mb-5">
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
      <div className="flex flex-col w-full items-center">
      <div className="mt-5 w-2/3">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Username</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{user ? user.username : ""}</span>
            </dd>
          </div>
        </dl>
      </div>
      <div>
      </div>
      <div className="flex flex-row w-2/3 mt-20 justify-start">
        {renderRecipes()}
      </div>
    </div>
    )
  }
}

export default UserPanel;