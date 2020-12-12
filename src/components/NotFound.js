import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='page'>
      <div className="not-found-page">
        <h2>404 not found</h2>
        <Link className='btn' to='/'>Back to home</Link>
      </div>
    </div>
  )
}

export default Error
