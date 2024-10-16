'use client';

import { useState } from 'react';
import Link from 'next/link';
import '../styles/sidebar.css';




const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
 
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };




  return (
    <>
      {/* Toggle Button */}
      <button
        className={`sidebar-toggle-button ${isOpen ? 'hidden' : 'block'}`}
        onClick={toggleSidebar}
        style={{ width: '35px', height: '35px' }}
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar-container ${isOpen ? 'sidebar-expanded' : 'sidebar-collapsed'} overflow-hidden hover:w-25`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="sidebar-header">
            <button
              className={`text-white p-2 ${isOpen ? 'block' : 'hidden'}`}
              onClick={toggleSidebar}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          {/* Sidebar Links */}
          <nav className="sidebar-nav">
            <div className={`${isOpen ? 'block' : 'hidden'} `}>
              <Link href='dashboard' className="sidebar-link">
                Dashboard
              </Link>
              <Link href='/student-list' className="sidebar-link">
                Users
              </Link>
              <Link href='/course-list' className="sidebar-link">
                Courses
              </Link>
              <Link href="/partner" className="sidebar-link">
                Partners
              </Link>
              <Link href="/testimonial" className="sidebar-link">
                Testomonial
              </Link>
              <Link href="/aboutcontent" className="sidebar-link">
                ِAbout
              </Link>
           
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideBar;