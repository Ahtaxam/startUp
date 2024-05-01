import React from 'react'

function Button({children, onClick}) {
  return (
    <button className='bg-[#00215E] p-2 m-4 text-white rounded ' onClick={onClick}>{children}</button>
  )
}

export default Button