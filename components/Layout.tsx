import React from 'react'
import Footer from './Footer';
import Header from './Header'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='content'>
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default Layout;
