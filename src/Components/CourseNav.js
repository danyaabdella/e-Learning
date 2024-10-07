import React from 'react'
import '../styles/learning.css';

const CourseNav = () => {
  return (
    <div>
        <header className="header">
            <div className="logo-div">E-learning</div>
            <nav className="nav-links">
                <a href="/mylearning" className="nav-item">Home</a>
                <a href="/transcript" className="nav-item">Transcript</a>
            </nav>
            {/* <div className="avatar">
            DA
            </div> */}
        </header>
  </div>
  )
}

export default CourseNav;