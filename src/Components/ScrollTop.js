'use client'
import React, {useState, useEffect} from 'react';
import {FaArrowUp} from 'react-icons/fa';
import '../styles/scrollToTop.css';


const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() =>{
        const toggleVisibility = () => {
            if(window.scrollY>300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll",toggleVisibility);

        return () => {
            window.removeEventListener("scroll",toggleVisibility);
        }
    },[]);
    const scrollToTop = () => {
        window.scrollTo({
            top:0,
            behavior:"smooth",
        });
    };
  return (
    <div className="div-container">
        {isVisible && (
            <button onClick={scrollToTop} className='btn'>
                <FaArrowUp />
            </button>
        )}
    </div>
  )
}

export default ScrollTop;
