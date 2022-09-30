import Link from 'next/link'
import React from 'react'

const PageError = () => {
  return (
    <div>
        <h1>404: PageError</h1>
        <p>Go back to <Link href='/'><a>Home Page</a></Link></p>
    </div>
  )
}

export default PageError;
