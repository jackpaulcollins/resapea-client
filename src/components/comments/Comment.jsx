import React, { useState } from 'react';
import { API_ROOT } from '../../apiRoot';

const Comment = (props) => {
  const [ editContent, setEditContent ] = useState(false)
  const [ comment, setComment ] = useState(props.comment.content)

  async function handleSubmit(e) {
    e.preventDefault();

    const body = { 
      comment: {
        content: comment
      }
    }

    fetch(`${API_ROOT}/api/comments/${props.comment.id}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'put',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200){
        setEditContent(false)
        props.triggerCommentRefetch();
      }
    });
  }

  async function deleteComment() {
    fetch(`${API_ROOT}/api/comments/${props.comment.id}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'delete',
      credentials: 'include',
      withCredentials: true,
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200){
        props.triggerCommentRefetch();
      }
    });
  }


  function timeSince(date) {

    var seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  const editButtonToggle = () => {
    if (!editContent) {
      setEditContent(true)
    } else {
      setEditContent(false)
    }
  }

  const renderEditButtonText = () => {
    if (!editContent) {
      return <p>Edit</p>
    } else {
      return <p>Cancel</p>
    }
  }

  const maybeRenderEditAndDeleteButtons = () => {
    if (props.comment.user.id === props.userId) {
      return (
        <div>
          <button onClick={editButtonToggle} className="text-xs mr-2">{renderEditButtonText()}</button>
          <button onClick={deleteComment} className={`text-xs ${editContent ? "hidden" : ""}`}>Delete</button>
        </div>
      )
    } else {
      return null
    }
  }

  const renderContentOrEdit = () => {
    if (!editContent) {
      return (
        <div className="w-full h-full pl-2 pt-1 pb-2">
          {props.comment.content}
        </div>
      )
    } else {
      return (
        <form onSubmit={e => handleSubmit(e)} className="flex flex-wrap">
          <div className="w-full">
              <textarea onChange={(e) => setComment(e.target.value)} defaultValue={comment} className="rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
          </div>
          <div className="w-full md:w-full flex items-start md:w-full">
            <div>
              <input type='submit' value='Edit' className="
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
        </form>
      )
    }
  }

  return (
    <div className="w-1/3 flex flex-col items-center shadow-lg rounded border mb-3">
      <div className="flex flex-row w-full justify-between pl-2 pr-3">
        <div>
          {maybeRenderEditAndDeleteButtons()}
        </div>
        <div className="text-l text-indigo-800">
        {`u/${props.comment.user.username}`}
        </div>
        <div className="text-xs">
        {`${timeSince(props.comment.created_at)} ago`}
        </div>
      </div>
      <div className="w-full h-full p-2 bg-indigo-100">
        {renderContentOrEdit()}
      </div>
    </div>
  )
}

export default Comment;
