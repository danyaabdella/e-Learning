'use client';

import { useState } from 'react';

const Documentation = () => {
  const [cv, setCv] = useState(null);
  const [degree, setDegree] = useState(null);

  const handleCvUpload = (e) => setCv(e.target.files[0]);
  const handleDegreeUpload = (e) => setDegree(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle file upload logic
  };

  return (
    <form onSubmit={handleSubmit} className="documentation-form">
      <h2 className="profile-heading">Upload Documentation</h2>
      <div className="doc-div">
        <label className="doc-label">Upload CV</label>
        <input type="file" onChange={handleCvUpload} className="doc-input-field" />
      </div>
      <div className="doc-div">
        <label className="doc-label">Upload Degree</label>
        <input type="file" onChange={handleDegreeUpload} className="doc-input-field" />
      </div>
      <button type="submit" className="documentation-button">
        Submit
      </button>
    </form>
  );
};

export default Documentation;
