import React from 'react'
import { useHistory } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login'
import { useGlobalContext } from '../context'

const Logout = () => {
  const { setUser } = useGlobalContext()
  const history = useHistory()
  const onLogoutSuccess = () => {
    setUser({
      isLoggedIn: false,
      data: undefined
    })
    history.push('/')
  }
  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_CLIENT_ID}
      render={renderProps => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign out</button>
      )}
      onLogoutSuccess={onLogoutSuccess}
    ></GoogleLogout>
  )
}

export default Logout
