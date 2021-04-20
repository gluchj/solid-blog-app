import React, { useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { useSession, CombinedDataProvider, Text, LogoutButton } from '@inrupt/solid-ui-react'

/*
 * Navbar component renders a navigation bar at the top of
 * the app window. If user is logged in (determined by session var)
 * shows additional greeting text and contains menu options. 
 * Currently only "logout" option is functional and is handled by
 * solid-react-ui <LogoutButton> component. It removes auth token
 * from browser storage
 */
const Navbar = () => {
  const { session } = useSession()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null);

  // expands menu anchor element
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  // hides menu when clicked off of
  const handleClose = () => {
    setAnchorEl(null)
  }

  // navigates to profile **NOT YET IMPLEMENTED**
  const handleProfile = () => {
    setAnchorEl(null)
    history.push('/')
  };

  // navigates to about **NOT YET IMPLEMENTED**
  const handleAbout = () => {
    setAnchorEl(null)
    history.push('/')
  };

  /* 
   * closes menu on clicking of logout, acutal logout functionality 
   * provided by solid-ui-react <LogoutButton> component 
   */
  const handleLogout = () => {
    setAnchorEl(null)
    //history.push('/')
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{flexGrow: 1}}>BlogPod</Typography>
        { session.info.isLoggedIn ? (
          <CombinedDataProvider datasetUrl={session.info.webId} thingUrl={session.info.webId}>
            <span>Welcome,&nbsp;</span>
            <Text properties={[
              "http://www.w3.org/2006/vcard/ns#fn"
            ]}/>
            <IconButton aria-label="upload picture" component="span" onClick={handleClick}>
              <AccountCircle style={{fill: "white"}}/>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem> 
              <MenuItem onClick={handleAbout}>About</MenuItem>
              <LogoutButton><MenuItem onClick={handleLogout}>Logout</MenuItem></LogoutButton>
            </Menu>
          </CombinedDataProvider>
        ) : (
          <Fragment>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Register</Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar