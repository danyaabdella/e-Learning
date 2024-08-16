// UpdateForm.js
import React from 'react';
import '../styles/dash.css';
import '../styles/auth.css';
const UpdateForm = ({ updatingCourse, setShowUpdateForm, setUpdatingCourse }) => {
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/courses', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id:updatingCourse._id, ...updatingCourse}),
      });
      if (res.ok) {
        setUpdatingCourse(null);
        setShowUpdateForm(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="updateForm">
      <div className="div2">
        <h2 className="upHeading">Update Course</h2>
        <form onSubmit={handleSaveChanges}>
          <label className="HL">
            Course Name:
            <input
              type="text"
              value={updatingCourse.courseName}
              onChange={(e) =>
                setUpdatingCourse({ ...updatingCourse, courseName: e.target.value })
              }
              required
              className="HI"
            />
          </label>
          <label className="HL">
            Course Code:
            <input
              type="text"
              value={updatingCourse.courseCode}
              onChange={(e) =>
                setUpdatingCourse({ ...updatingCourse, courseCode: e.target.value })
              }
              required
              className="HI"
            />
          </label>
          <label className="HL">
            Instructor Name:
            <input
              type="text"
              value={updatingCourse.instructor}
              onChange={(e) =>
                setUpdatingCourse({ ...updatingCourse, instructor: e.target.value })
              }
              required
              className="HI"
            />
          </label>
          <button type= "submit" className="upSave" >
            Save Changes
          </button>
          <button
           
            className="upCancel"
            onClick={() => {
              setUpdatingCourse(null);
              setShowUpdateForm(false);
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;