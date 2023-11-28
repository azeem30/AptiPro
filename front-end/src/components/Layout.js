import React from 'react'
import '../styles/background.css'

export default function Layout({children}) {
  return (
    <div className='common-background'>
      {children}
    </div>
  )
}
