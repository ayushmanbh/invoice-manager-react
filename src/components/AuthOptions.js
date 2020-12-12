import React from 'react'
// import { useHistory } from 'react-router-dom'
import { useGlobalContext } from '../context'
import Logout from './Logout'

const AuthOptions = () => {
  const { user } = useGlobalContext()

  // const history = useHistory()

  return (
    <nav className='auth-options'>
      {
        user.isLoggedIn ? (
          <>
            <img className='profile' src={user.data.imageUrl} alt={user.data.name} />
            <Logout />
          </>
        ) : (
            <>
            </>
          )
      }
    </nav>
  )
}

export default AuthOptions
