import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { API_ROOT } from '../apiRoot';
import LogoIcon from '../components/icons/LogoIcon';

export default function NavigationBar(props) {
  const { user, logout } = props;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [queryString, setQueryString] = useState("");

  const isLoggedIn = user.id ? true : false;

  const handleLogoutClick = () => {
    logout()
    navigate("/")
  }

  async function handleSubmit(e){
    e.preventDefault();
    const body = { recipe: { query_string: queryString }}
    fetch(`${API_ROOT}/api/recipes_query`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        const recipes = JSON.parse(data.data)
        navigate('search-results', { state: { recipes: recipes, currentUserId: user.id, queryString: queryString }})
      }
      });
  }
  

  const loggedInLinks = () => {
    if (isLoggedIn) {
      return (
        <div>
          <Link
            to={`/user/${user.id}/`}
            className=" hover:bg-green-200 text-green-700 px-3 py-2 rounded-md text-sm font-medium"
            >
            {user.username}
          </Link>

           <button
            onClick={() => handleLogoutClick()}
            className="text-green-700 hover:bg-green-200 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Logout
         </button>
      </div>
      )
    } else {
      return (
        <div>
          <button
            onClick={() => navigate('/login')}
            className=" hover:bg-green-200 text-green-700 px-3 py-2 rounded-md text-sm font-medium"
            >
            Login
          </button>

           <button
            onClick={() => navigate('/register')}
            className="text-green-700 hover:bg-green-200 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Sign up
         </button>
    </div>
      )
    }
  }

  return (
    <div>
      <nav className="bg-green-100">
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button className="mt-1" onClick={() => navigate('/')}>
                  <LogoIcon />
                </button>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {loggedInLinks()}
                  <div className="flex items-center justify-center bg-green-50">
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <div className="relative text-gray-600 focus-within:text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                          <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                          </button>
                        </span>
                        <input onChange={e => setQueryString(e.target.value)}type="search" name="q" className="py-2 text-sm text-blue bg-green-50 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search by name" autoComplete="off"/>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {() => (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {loggedInLinks()}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}
