import React from 'react'
import '../styles/nav.css';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className='image'>
        <Image src="/logo.png" alt="E-learning" height={50} width={50}  />
    </div>
  )
}

export default Logo