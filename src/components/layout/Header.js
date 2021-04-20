import React from 'react'
import { Typography } from '@material-ui/core'

/*
 * UI component renders app title and tagline message
 */
const Header = () => {
  return (
    <div className="header">
      <h1>Blog</h1>
      <Typography variant="body2" color="textSecondary" component="p">
        A Social Media platform where YOU control your data
      </Typography>
    </div>
  )
}

export default Header