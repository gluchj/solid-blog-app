import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    marginRight: 20,
  },
})

/*
 * NavButtons renders menu options (react-router links) for
 * internal application navigation
 */
const NavButtons = () => {
  const classes = useStyles()

  return (
  <div>
    <Button className={classes.button} component={Link} to='/' size="small" color="primary">My Posts</Button>
    <Button className={classes.button} component={Link} to='/search_posts' size="small" color="primary">Search Posts</Button>
    <Button className={classes.button} component={Link} to='/add_post' size="small" color="primary">Add Post</Button>
    <Divider/>
  </div>
  )
}

export default NavButtons