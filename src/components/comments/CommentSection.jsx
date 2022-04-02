import React, { useEffect, useState } from 'react';
import { API_ROOT } from '../../apiRoot';
import Comment from '../comments/Comment'
import CommentInput from '../comments/CommentInput'


const CommentSection = (props) => {
 
  const [ comments, setComments ] = useState(undefined)

  useEffect(() => {
    fetchComments()
  }, [])

  async function fetchComments() {
    fetch(`${API_ROOT}/api/comments/${props.recipeId}`, {
      headers: {'Content-Type': 'application/json'},
      method: 'get',
      credentials: 'include',
      withCredentials: true,
    })
    .then(response => response.json())
    .then(data => {
      if (data){
        setComments(JSON.parse(data.comments))
      }
    });
  }

  const renderComments = () => {
    if (comments) {
      return comments.map((comment, index) => {
        return <Comment key={index} comment={comment} userId={props.userId} recipeId={props.recipeId} triggerCommentRefetch={fetchComments} />
      })
    } else {
      return "No comments yet, add one!"
    }
  }

  return (
    <div>
      <CommentInput userId={props.userId} recipeId={props.recipeId} triggerCommentRefetch={fetchComments}/>
      <div className="flex flex-col w-full items-center justify-evenly">
        {renderComments()}
      </div>
    </div>
  )
}

export default CommentSection;