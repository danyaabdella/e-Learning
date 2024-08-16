'use client'
import Link from 'next/link';
import '../styles/nav.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false); // State to track if user is admin
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        setIsAdmin(false);
        return;
    }

    fetch('/api/auth/login', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.user && data.user.role === 'admin') {
            setIsAdmin(true);
        } else if(data.user && data.user.role === 'user') {
            setIsUser(true);
        } else {
            setIsAdmin(false);
      }
        
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        setIsAdmin(false);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAdmin(false);
    window.location.href = '/';
  };

  return (
    <nav className="nav">
      <div className="contain">
        <div className="nav-text">
          <Image src="/logo.png" alt="E-learning" width={80} height={50} />
        </div>
        <div className="text-space">
          <Link href='/'>Home</Link>
          <Link href='/courses'>Courses</Link>
          <Link href='/about'>About</Link>
          <Link href='/contact'>Contact</Link>
          {isAdmin ? (
            // If admin, show circular profile icon with dropdown menu
            <div className="profile-icon">
              <div className="circle">
                <i className="fas fa-user" />
              </div>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/adminPage">My Courses</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/accountSetting">Account</Link>
                </li>
                <li>
                  <Link href="#" onClick={handleLogout}>Logout</Link> {/* Pass function reference */}
                </li>
              </ul>
            </div>
          ) : isUser ? (
            // If regular user, show user profile icon with dropdown menu
            <div className="profile-icon">
              <div className="circle">
                <i className="fas fa-user" />
              </div>
              <ul className="dropdown-menu">
                <li>
                  <Link href="/mylearning">My Learning</Link>
                </li>
                <li>
                  <Link href="/wishlist">Wishlist</Link>
                </li>
                <li>
                  <Link href="/account/settings">Account Settings</Link>
                </li>
                <li>
                  <Link href="#" onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          ):(
            // If not admin, show register/signin links
            <Link href="/signup">Register/Signin</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
