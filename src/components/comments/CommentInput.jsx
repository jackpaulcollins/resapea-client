import React, { useState } from 'react';
import { API_ROOT } from '../../apiRoot';


const CommentInput = (props) => {
 
  const [ comment, setComment ] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();

    const body = { 
      comment: {
        recipe_id: props.recipeId,
        content: comment
      }
    }

    fetch(`${API_ROOT}/api/comments`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200){
        props.triggerCommentRefetch();
      }
    });
  }

  return (
    <div className="flex rounded mx-auto items-center justify-center shadow-lg  mt-4 mx-8 mb-4 max-w-lg">
      <form onSubmit={e => handleSubmit(e)} className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-2 mt-2">
                <textarea onChange={(e) => setComment(e.target.value)} className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
            </div>
            <div className="w-full md:w-full flex items-start md:w-full px-3">
              <div className="-mr-1">
                <input type='submit' value='Post Comment' className="
                  mr-10
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
                  ease-in-out"/>
              </div>
            </div>
        </div>
      </form>
    </div>
  )
}

export default CommentInput;