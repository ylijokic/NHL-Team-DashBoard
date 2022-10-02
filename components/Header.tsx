import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <nav>
        <div className='logo'>
            <h1>NHL Dashboard</h1>
        </div>
        <Link href='/'><a>Home</a></Link>
        <Link href='/teams'><a>Teams</a></Link>
    </nav>
  )
}

export default Header;
