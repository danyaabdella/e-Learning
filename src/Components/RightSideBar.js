// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

// const RightSideBar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`right-sidebar-container ${isOpen ? 'right-sidebar-expanded' : 'right-sidebar-collapsed'}`}>
//       {/* Toggle Button */}
//       <button
//         className={`right-sidebar-toggle-button -left-3 ${isOpen ? 'hidden' : 'block'}`}
//         onClick={toggleSidebar}
//       >
//         <HiChevronRight className="h-6 w-6" />
//       </button>
//       <button
//         className={`right-sidebar-toggle-button right-0 ${isOpen ? 'block' : 'hidden'}`}
//       >
//         <HiChevronLeft className="h-6 w-6" />
//       </button>

//       {/* Content */}
//       <div className={`right-sidebar-content ${isOpen ? 'block' : 'hidden'}`}>
//         <div className="right-sidebar-message">
//           <h3 className="right-sidebar-message-title">Message 1</h3>
//           <p className="right-sidebar-message-text">This is the first message. Add any details you want here.</p>
//           <Link href="/action1">
//             <span className="right-sidebar-action-button">
//               Action 1
//             </span>
//           </Link>
//         </div>

//         <div className="right-sidebar-message">
//           <h3 className="right-sidebar-message-title">Message 2</h3>
//           <p className="right-sidebar-message-text">This is the second message. Include relevant information here.</p>
//           <Link href="/action2">
//             <span className="right-sidebar-action-button">
//               Action 2
//             </span>
//           </Link>
//         </div>

        
//       </div>
//     </div>
//   );
// };

// export default RightSideBar;
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import '../styles/sidebar.css';  // Import the CSS file

const RightSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`right-sidebar-container ${isOpen ? 'right-sidebar-expanded' : 'right-sidebar-collapsed'}`}>
      {/* Toggle Button */}
      <button
        className={`right-sidebar-toggle-button ${isOpen ? 'right-sidebar-expanded' : 'right-sidebar-collapsed'}`}
        onClick={toggleSidebar}
      >
        {isOpen ? <HiChevronLeft className="h-6 w-6" /> : <HiChevronRight className="h-6 w-6" />}
      </button>

      {/* Content */}
      <div className={`right-sidebar-content ${isOpen ? 'block' : 'hidden'}`}>
        <div className="right-sidebar-message">
          <h3 className="right-sidebar-message-title">Message 1</h3>
          <p className="right-sidebar-message-text">This is the first message. Add any details you want here.</p>
          <Link href="/action1">
            <span className="right-sidebar-action-button">Action 1</span>
          </Link>
        </div>

        <div className="right-sidebar-message">
          <h3 className="right-sidebar-message-title">Message 2</h3>
          <p className="right-sidebar-message-text">This is the second message. Include relevant information here.</p>
          <Link href="/action2">
            <span className="right-sidebar-action-button">Action 2</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
