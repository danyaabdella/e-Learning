'use client'
import { useEffect, useRef, useState } from 'react';
import CourseNav from '@/Components/CourseNav';
import '../../styles/certificate.css';
import html2canvas from 'html2canvas';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

const Certificate = ({ name, course, date }) => {
  const [certificates, setCertificate] = useState('');
  const [profile, setProfile] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const certificateRefs = useRef([]);

  useEffect(()=>{
    fetchCertificate();
    fetchProfile();
  },[])

  const fetchCertificate = async() => {
    const userId = localStorage.getItem('userId');
    const response = await axios.get(`api/certificate?userId=${userId}`);
    setCertificate(response.data);
  }
  const fetchProfile = async() => {
    try {
      //setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const storedEmail = localStorage.getItem('Email');
      const response = await axios.get(`/api/profile?email=${storedEmail}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
      
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  
  

  const handleDownload = (name, index) => {
     const certificateElement = certificateRefs.current[index]?.querySelector('.certificate-box');

    if(certificateElement) {
      html2canvas(certificateElement, { scale: 2 }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `certificate_${name}.png`;
        link.click();
      });
    } else {
      console.error('certificate element not found');
    }
    
    
  };

  if (isLoading) {
    return <div className="spinner">
            <div className="spinnerCircle"></div>
          </div>
  }

  return (
    <>
    <CourseNav/>      
    <div className="certificates-container">
        {certificates.length > 0 ? (
          certificates.map((certificate, index) => (
            <div
              className="certificate-container"
              ref={(el) => (certificateRefs.current[index] = el)}               
              key={index}
            >
              

              <div className="certificate-box">
                <div
                  onClick={() =>
                    handleDownload(`${profile.firstName}_${certificate?.courseId?.courseName}`, index)
                  }
                  className="download-icon"
                  title="Download"
                >
                  <i className="fa-solid fa-file-arrow-down"></i>
                </div>
                {/* Certificate Header */}
                <div className="certificate-header">
                  <h1 className="certificate-title">Certificate of Completion</h1>
                  <h2 className="certificate-subtitle">This certificate is proudly presented to</h2>
                </div>

                {/* User's Name */}
                <div className="certificate-name">
                  <h1 className="certificate-name-text">{profile.firstName} {profile.lastName}</h1>
                </div>

                {/* Certificate Body */}
                <div className="certificate-body">
                  <p className="certificate-course">for your Outstanding Achievement in</p>
                  <h2 className="certificate-course-title">
                    {certificate?.courseId?.courseName || 'Course not available'}
                  </h2>
                </div>

                {/* Date and Signature */}
                <div className="certificate-footer">
                  <div className="textLeft">
                    <p className="certificate-footer-text">Date:</p>
                    <p className="certificate-footer-signature">
                      {certificate.completionDate ? new Date(certificate.completionDate).toLocaleDateString() : 'Date not available'}
                    </p>
                  </div>
                  <div className="textRight">
                    <p className="certificate-footer-text">Signature:</p>
                    <p className="certificate-footer-signature">_________________</p>
                  </div>
                </div>

                {/* Seal or Badge */}
                <div className="certificate-seal">
                  <img src="/seal.png" alt="Seal" className="seal-image" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No certificates available.</p>
        )}
      </div>
    
    </>
  );
};

export default Certificate;
