'use client';

import { useState } from 'react';

const Documentation = () => {
  const [cv, setCv] = useState(null);
  const [degree, setDegree] = useState(null);
  const [message, setMessage] = useState('');

  const handleCvUpload = (e) => setCv(e.target.files[0]);
  const handleDegreeUpload = (e) => setDegree(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve email from localStorage
    const email = localStorage.getItem('Email');
    if (!email) {
      setMessage('Email not found in localStorage. Please log in.');
      return;
    }

    if (!cv || !degree) {
      setMessage('Please upload both CV and Degree files.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('cv', cv);
    formData.append('degree', degree);

    try {
      const response = await fetch('/api/documentation', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Documentation uploaded successfully.');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error uploading documentation:', error);
      setMessage('An error occurred while uploading documentation.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="documentation-form">
      <h2 className="profile-heading">Upload Documentation</h2>
      <div className="doc-div">
        <label className="doc-label">Upload CV</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleCvUpload} className="doc-input-field" />
      </div>
      <div className="doc-div">
        <label className="doc-label">Upload Degree</label>
        <input type="file" accept=".pdf,.jpg,.png" onChange={handleDegreeUpload} className="doc-input-field" />
      </div>
      <button type="submit" className="documentation-button">
        Submit
      </button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Documentation;
