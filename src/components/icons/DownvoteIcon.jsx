import React from 'react'

export function DownvoteIcon(props) {
  const { user_voted_on_resource, user_vote_value } = props.userVote ? props.userVote : {}

  const fillColor = () => {
    if (user_voted_on_resource && user_vote_value === -1) {
      return "purple"
    } else {
      return "none"
    }
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={fillColor()} fillOpacity={0.2} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
    </svg>
  )
}
export default DownvoteIcon