import React from 'react'

function ErrorMessage({error}) {
  return (
    <p className='text-xs text-red-800 mt-2'>{error}</p>
  )
}

export default ErrorMessage