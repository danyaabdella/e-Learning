// import '../styles/footer.css';

// export default function Footer () {
//     return (
//       <footer className="footer">
//         <div className="whole-div">
//           <p>E-learning platform - All rights reserved.</p>
//         </div>
//       </footer>
 
import React from 'react';
import Image from 'next/image';
import '../styles/footer.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footer_container">
      <div className="footer_small_container">
        <div>
          <Image src="/logo.png" alt="Logo" height={100} width={100} />
          <p className="paragraph">
            lorem isprm white text 
          </p>
          <div className="flex items-center space-x-4 mt-6">
            {/* Social media icons or other content can be added here */}
          </div>
        </div>
        <div>
          <h1 className="footer_heading">Popular</h1>
          <p className="footer_link">web development</p>
          <p className="footer_link">UI UX</p>
          <p className="footer_link">Hacking</p>
          <p className="footer_link">Marketing</p>
        </div>
        <div>
          <h1 className="footer_heading">Quick link</h1>
          <Link href={'/courses'} className="footer_link">Courses</Link><br/>
          <Link href={'/'} className="footer_link">Insructor</Link><br/>
          <Link href={'/'} className="footer_link">Privacy Police</Link><br/>
        </div>
        <div>
          <h1 className="footer_heading">Subscribe our Newsletter</h1>
          <input type="text" placeholder='Enter your email' className="emailInput-field"/>
          <button className="subscribeBtn">
            Subscribe
          </button>
        </div>
      </div>
      <p className="copyright">Copyright 2024</p>
    </div>
  );
};

export default Footer;

  