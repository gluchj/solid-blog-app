import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

/*
 * UI component renders when internal nav page not found
 */
const Error404 = () => {
  return (
    <div>
      <h1>404</h1>
      <h3>Hmmm...that pages doesn't seem to exist</h3>
      <Button component={Link} to='/' size="small" color="primary">
        Back
      </Button>
    </div>
  )
}

export default Error404