import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { API_ROOT } from '../../apiRoot';

const UserPanel = () => {
  const [ user, setUser ] = useState(undefined)
  const [ userRecipes, setUserRecipes ] = useState(undefined)
  useEffect(() => {
    fetchUser()
  }, [])

  const params = useParams();

  async function fetchUser() {
    const body = { user: { user_id: params.id }}
    fetch(`${API_ROOT}/api/user`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        const userRecipes = JSON.parse(data.data.recipes)
        setUser(data.user)
        setUserRecipes(userRecipes)
      } else if (data.status === 500 ) {
        console.log(data)
      } 
    });
  }

  console.log(userRecipes)

  return (
    <div className="flex flex-col w-full items-center">
      <div className="mt-5 border-t border-gray-200 w-2/3">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Username</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{}</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Email address</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">{}</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default UserPanel;