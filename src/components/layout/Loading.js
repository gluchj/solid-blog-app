import React from 'react'
import { CircularProgress } from '@material-ui/core'

/*
 * renders CircularProgress graphic from material-ui during
 * loading stages thoughout the app
 */
const Loading = () => {
  return (
    <div className="loading">
      <CircularProgress />
    </div>
  )
}

export default Loading