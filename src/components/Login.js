import React from 'react'
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { useGlobalContext } from '../context'

const Login = () => {
  const { setUser } = useGlobalContext()

  const history = useHistory()

  const onSuccess = (response) => {
    setUser({
      isLoggedIn: true,
      data: response.profileObj
    })
    history.push('/dashboard')
  }

  const onFailure = (response) => {
    console.log('[Login Failed] response: ', response);
    alert('Something went wrong. Try again :(')
    history.push('/')
  }
  return (
    <div className='page'>
      <div className="full-page-info">
        <h2>All your Invoices at one place.</h2>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Sign In with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      </div>
    </div>
  )
}

export default Login
