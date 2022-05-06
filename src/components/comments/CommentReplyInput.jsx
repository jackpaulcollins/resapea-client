import React, { useState } from 'react';
import { API_ROOT } from '../../apiRoot';

const CommentReplyInput = (props) => {
  const { recipeId, parentCommentId, replyingTo, toggleActiveReply, fetchComments } = props;
  const [ comment, setComment ] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();

    const body = { 
      comment: {
        recipe_id: recipeId,
        parent_id: parentCommentId,
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
        toggleActiveReply();
        fetchComments();
      } else if (data.status === 500 && data.message[0] === "User must exist") {
        alert("Please login or signup")
      }
    });
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
        <div className="flex flex-wrap bg-gray-100 pb-2 border-solid border-gray-200 border-t">
          <span className="text-xs ml-1 mt-1">replying to {replyingTo}</span>
          <div className="w-full px-4 mt-4">
              <textarea onChange={(e) => setComment(e.target.value)} className="bg-gray-50 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" required></textarea>
          </div>
          <div className="w-full flex items-start md:w-full px-3">
            <div className="mt-2">
              <button type="submit" className="
                mr-5
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
                >save</button>
                <span className="
                mr-10
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
                ease-in-out">
                  cancel
                </span>
            </div>
          </div>
        </div>
      </form>
  )
}

export default CommentReplyInput;