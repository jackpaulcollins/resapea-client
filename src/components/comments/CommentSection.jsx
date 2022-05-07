import React, { useEffect, useState } from "react";
import { API_ROOT } from "../../apiRoot";
import { colorPicker } from "../../functions";
import Comment from "../comments/Comment";
import CommentInput from "../comments/CommentInput";

const CommentSection = (props) => {
  const { recipeId, userId } = props;
  const [comments, setComments] = useState(undefined);

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    fetch(`${API_ROOT}/api/comments/${recipeId}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      withCredentials: true,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setComments(JSON.parse(data.comments));
        }
      });
  }

  const renderComments = () => {
    if (comments) {
      return comments.map((comment) => {
        return (
          <div className="flex flex-col p-2">
            <Comment
              key={comment.id}
              comment={comment}
              currentUserId={userId}
              recipeId={recipeId}
              votes={comment.votes}
              fetchComments={fetchComments}
              color={colorPicker()}
              replyDepth={100}
            />
          </div>
        );
      });
    } else {
      return "No comments yet, add one!";
    }
  };

  return (
    <div className="flex flex-col w-1/2 h-full">
      <div className="mt-10">
        <CommentInput
          userId={userId}
          recipeId={recipeId}
          fetchComments={fetchComments}
        />
      </div>
      <div className="flex flex-col">{renderComments()}</div>
    </div>
  );
};

export default CommentSection;
