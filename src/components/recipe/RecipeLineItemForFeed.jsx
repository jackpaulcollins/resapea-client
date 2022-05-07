import React, { useEffect, useState } from "react";
import UpvoteIcon from "../icons/UpvoteIcon";
import DownvoteIcon from "../icons/DownvoteIcon";
import CameraIcon from "../icons/CameraIcon";
import { API_ROOT } from "../../apiRoot";
import { Link } from "react-router-dom";

// Tech Specs:
// Since  the original page load has vote data we should have the initial count be based on props.
// We should also populate the up/down icons based on this prop data if the user has previously
// voted on the given recipe.

// if a user then interacts with the vote we should then send an AJAX request to update the vote for
// just that recipe. Then, the server should return the upvoted vote count which is displayed.
// Also, the up/down vote icon should then reflect whether the user has voted

const RecipeLineItemForFeed = (props) => {
  const { recipe, votes, currentUserId } = props;
  const [initialVoteCount] = useState(recipe.total_points);
  const [newVoteCount, setNewVoteCount] = useState(undefined);
  const [userVotedOnResource, setUserVotedOnResource] = useState(undefined);

  useEffect(() => {
    const vote = votes.filter((vote) => vote.user_id === currentUserId);
    if (vote.length === 1) {
      setUserVotedOnResource({
        user_voted_on_resource: true,
        user_vote_value: vote[0].vote_type,
      });
    }
  }, [props]);

  async function fetchVotes() {
    const body = { resource: { voteable_type: "Recipe" } };
    fetch(`${API_ROOT}/api/fetch_votes/${recipe.id}`, {
      headers: { "Content-Type": "application/json" },
      method: "post",
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setNewVoteCount(data.vote_count);
          setUserVotedOnResource({
            user_voted_on_resource: data.user_voted_on_resource,
            user_vote_value: data.user_vote_value,
          });
        } else if (data.status === 500) {
          alert("Please login or sign up to vote");
        }
      });
  }

  async function upVote(id) {
    const body = {
      resource: {
        voteable_type: "Recipe",
        voteable_id: id,
        vote_type: 1,
      },
    };
    fetch(`${API_ROOT}/api/votes`, {
      headers: { "Content-Type": "application/json" },
      method: "post",
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          fetchVotes();
        } else if (data.status === 500) {
          alert("Please login or sign up to vote");
        }
      });
  }

  async function downVote(id) {
    const body = {
      resource: {
        voteable_type: "Recipe",
        voteable_id: id,
        vote_type: -1,
      },
    };
    fetch(`${API_ROOT}/api/votes`, {
      headers: { "Content-Type": "application/json" },
      method: "post",
      credentials: "include",
      withCredentials: true,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          fetchVotes();
        } else if (data.status === 500) {
          alert("Please login or sign up to vote");
        }
      });
  }

  const maybeRenderCameraIcon = () => {
    if (recipe.photo_url) {
      return (
        <div>
          <CameraIcon />
        </div>
      );
    }
  };

  const maybeRenderCompatibilities = () => {
    if (recipe.compatibilities) {
      return recipe.compatibilities.map((c, i) => {
        return (
          <div key={i}>
            <span
              className="
                    text-xs 
                    ml-1
                    bg-gray-200
                    rounded
                    p-1
                    "
            >
              {c}
            </span>
          </div>
        );
      });
    }
  };

  return (
    <li className="flex flex-row py-2 content-between w-full">
      <div className="flex flex-col w-2/12 items-center">
        <button onClick={() => upVote(recipe.id)}>
          <UpvoteIcon userVote={userVotedOnResource} />
        </button>
        <p>{newVoteCount !== undefined ? newVoteCount : initialVoteCount}</p>
        <button onClick={() => downVote(recipe.id)}>
          <DownvoteIcon userVote={userVotedOnResource} />
        </button>
      </div>
      <div className="flex flex-col w-full items-between space-x-3">
        <Link to={`/recipe/${recipe.id}`} state={{ recipe: recipe }}>
          <div className="flex flex-row justify-between mb-3">
            <div className="flex flex-row">
              <h3 className="text-xl font-medium mr-3">{recipe.name}</h3>
              {maybeRenderCameraIcon()}
            </div>
            <div className="flex flex-row">{maybeRenderCompatibilities()}</div>
            <div>
              <p className="text-sm text-gray-500">
                Ingredients: {recipe.recipe_ingredients.length}
              </p>
            </div>
          </div>
          <div className=" flex flex-row justify-between text-sm text-gray-500">
            <p>{recipe.genre}</p>
            <p>Comments: {recipe.comments.length}</p>
          </div>
          <span className="text-xs">{`u/${recipe.user.username}`}</span>
        </Link>
      </div>
    </li>
  );
};

export default RecipeLineItemForFeed;
