import React, { useState } from 'react'
import { FormGroup, TextField, Typography, Button } from '@material-ui/core'
import { LoginButton } from '@inrupt/solid-ui-react'

/*
 * Login component renders a simple form used to accept input
 * of the user's identity provider for login. This is passed
 * to the <LoginButton> component imported from solid-ui-react
 * which performs the authentication process
 */
const Login = () => {
  const [ oidcIssuer, setOidcIssuer ] = useState('')

  const handleChange = e => {
    setOidcIssuer(e.target.value)
  }
  
  return (
    <div className="login">
      <FormGroup>
        <TextField
          id="identityProvider"
          variant="outlined"
          placeholder="Identity Provider"
          type="url"
          name="oidcIssuer"
          value={oidcIssuer}
          onChange={handleChange}
        />
        <Typography variant="caption" color="textSecondary" gutterBottom>&nbsp;Example: https://solidcommunity.net</Typography>
        <LoginButton
          oidcIssuer={oidcIssuer}
          redirectUrl={window.location.href}
        >
          <Button variant="contained" color="primary" fullWidth>Log in with Solid</Button>
        </LoginButton>
      </FormGroup>
    </div>
  )
}

export default Login