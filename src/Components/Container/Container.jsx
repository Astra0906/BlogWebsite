import React from 'react'

const Container = ({children}) => {
  return (
    <div className='w-full min-h-[65vh] max-w-7xl mx-auto px-4'>{children}</div>
  )
}

export default Container