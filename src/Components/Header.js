import React from 'react'
import Logo from '@/Components/Logo';
import Navbar from './Navbar';
import '../styles/nav.css';
const Header = () => {
  return (
    <header className='header'>
        <Logo/>
        <Navbar/>
    </header>
  )
}

export default Header