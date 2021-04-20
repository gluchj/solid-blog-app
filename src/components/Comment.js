import { Typography } from '@material-ui/core'
import React from 'react'

/*
 * Comment is a simple UI component that displays a user comment
 * received via props
 */
const Comment = props => {
  const comment = props.comment

  if (!comment)
    return <p>Loading comment...</p>
  return (
    <div className="comment">
      <Typography variant="body1" display="inline" gutterBottom>{comment.text}</Typography>
      <Typography variant="body1" color="primary" display="inline"><i>{" - " + comment.author}</i></Typography>
      <Typography variant="body2" color="textSecondary">{"posted at " + comment.created}</Typography>
    </div>
  )
}

export default Comment