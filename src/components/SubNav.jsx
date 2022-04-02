import React from 'react';
import { Link } from 'react-router-dom'

const SubNav = (props) => {

  const maybeRenderEditLink = () => {
    if (props.currentUser.id === props.recipe.user_id) {
      return (
        <div>
          <Link 
                    to= {`/recipe/${props.recipe.id}/edit`}
                    state={{ recipe: props.recipe }}>
            <button className="
              mb-1
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
              ease-in-out">
              edit
            </button>
          </Link>
        </div>
      )
    }
  }

  return (
    <div>
    {maybeRenderEditLink()}
    </div>
  )
}

export default SubNav;