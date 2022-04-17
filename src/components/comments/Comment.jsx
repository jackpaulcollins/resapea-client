import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { API_ROOT } from '../../apiRoot';
import { timeSince } from '../../functions'
import UpvoteIcon from '../icons/UpvoteIcon'
import DownvoteIcon from '../icons/DownvoteIcon'

const Comment = (props) => {
  const { comment, triggerCommentRefetch, currentUserId, votes } = props;
  const [ editContent, setEditContent ] = useState(false)
  const [ commentContent, setCommentContent ] = useState(comment.content)
  const [ initialVoteCount ] = useState(comment.total_points)
  const [ newVoteCount, setNewVoteCount ] = useState(undefined)
  const [ userVotedOnResource, setUserVotedOnResource ] = useState(undefined)

  useEffect(() => {
    const vote = votes.filter(vote => vote.user_id === currentUserId)
    if (vote.length === 1) {
      setUserVotedOnResource({ user_voted_on_resource: true, user_vote_value: vote[0].vote_type })
    }
   }, [props, currentUserId, votes])

  async function handleSubmit(e) {
    e.preventDefault();
    const body = { 
      comment: {
        content: commentContent
      }
    }
    fetch(`${API_ROOT}/api/comments/${comment.id}`, {
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
        triggerCommentRefetch();
      }
    });
  }

  async function deleteComment() {
    fetch(`${API_ROOT}/api/comments/${comment.id}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'delete',
      credentials: 'include',
      withCredentials: true,
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200){
        triggerCommentRefetch();
      }
    });
  }

  async function fetchVotes() {
    const body = { resource: {voteable_type: "Comment" }}
    fetch(`${API_ROOT}/api/fetch_votes/${comment.id}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        setNewVoteCount(data.vote_count)
        setUserVotedOnResource({
          user_voted_on_resource: data.user_voted_on_resource,
          user_vote_value: data.user_vote_value
        })
      } else if (data.status === 500 ) {
        alert("Please login or sign up to vote")
      } 
    });
  }

  async function upVote(id) {
    const body = { 
      resource: {
        voteable_type: "Comment",
        voteable_id: id,
        vote_type: 1
      }
    }
    fetch(`${API_ROOT}/api/votes`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        fetchVotes()
      } else if (data.status === 500 ) {
        alert("Please login or sign up to vote")
      } 
    });
  }

  async function downVote(id) {
    const body = { 
      resource: {
        voteable_type: "Comment",
        voteable_id: id,
        vote_type: -1
      }
    }
    fetch(`${API_ROOT}/api/votes`, {
      headers: {'Content-Type': 'application/json'},
      method: 'post',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 200) {
        fetchVotes()
      } else if (data.status === 500 ) {
        alert("Please login or sign up to vote")
      } 
      });
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
    if (comment.user.id === currentUserId) {
      return (
        <div>
          <button onClick={editButtonToggle} className="text-xs mr-2">{renderEditButtonText()}</button>
          <button onClick={deleteComment} className={`text-xs ${editContent ? "hidden" : ""}`}>Delete</button>
        </div>
      )
    } else {
      return (
        <div className="flex flex-row">
          <button onClick={() => upVote(comment.id)}>
            <UpvoteIcon userVote={userVotedOnResource}/>
          </button>
           <span>{newVoteCount !== undefined ? newVoteCount : initialVoteCount}</span>
           <button onClick={() => downVote(comment.id)}>
            <DownvoteIcon userVote={userVotedOnResource}/>
          </button>
        </div>
      )
    }
  }

  const renderContentOrEdit = () => {
    if (!editContent) {
      return (
        <div className="w-full h-full pl-2 pt-1 pb-2">
          {comment.content}
        </div>
      )
    } else {
      return (
        <form onSubmit={e => handleSubmit(e)} className="flex flex-wrap">
          <div className="w-full">
              <textarea onChange={(e) => setCommentContent(e.target.value)} defaultValue={commentContent} className="rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
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
        <Link to={`/user/${comment.user.id}/`}>
          {`u/${comment.user.username}`}
        </Link>
        </div>
        <div className="text-xs">
        {`${timeSince(comment.created_at)} ago`}
        </div>
      </div>
      <div className="w-full h-full p-2 bg-gray-100">
        {renderContentOrEdit()}
      </div>
    </div>
  )
}

export default Comment;
