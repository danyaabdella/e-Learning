'use client';
import { useState, useEffect } from 'react';
import '../../../styles/course.css';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();

  const [activeSection, setActiveSection] = useState('image');
  const [overview, setOverview] = useState('');
  const [requirements, setRequirements] = useState('');
  const [chapters, setChapters] = useState([{ title: '', video: null, document: null }]); // Changed to store file objects
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (courseId) {
      fetchData();
      fetchCourse();
        }
  }, [courseId]);
  const fetchCourse = async () => {
    try {
      // Pass courseId as a query parameter
      const response = await axios.get(`/api/chapter?courseId=${courseId}`);
  
      const updatedChapters = response.data.map(chapter => ({
        ...chapter,
        video: chapter.videos ,  // Ensure video URL is set correctly
        document: chapter.documents , // Ensure document URL is set correctly
      }));
      
      setChapters(updatedChapters || [{ title: '', video: null, document: null }]);
      } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/courses`);
      const courses = response.data;
      const filteredCourse = courses.find(course => course._id === courseId);

      setCourse(filteredCourse);
      setOverview(filteredCourse.overview || ''); // Update overview state
      setRequirements(filteredCourse.requirement || ''); // Update requirements state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  const handleSectionChange = (section) => setActiveSection(section);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setIsDirty(true);
  };

  const handleChapterChange = (index, field, e) => {
    // const file = e.target.files[0];
    // if (file && file.size > 20 * 1024 * 1024 * 1024) { // Check if the file exceeds 10MB
    //   alert('File size exceeds 10MB limit.');
    //   return;
    // }
    const updatedChapters = chapters.map((chapter, chapterIndex) => (
      chapterIndex === index
        ? { 
            ...chapter, 
            [field]: field === 'video' || field === 'document' 
              ? e.target.files[0] // For file input (video/document)
              : e.target.value // For text input (title)
          }
        : chapter
    ));
    console.log('Updated Chapters:', updatedChapters); // Debug log for chapter updates
    setChapters(updatedChapters);
    setIsDirty(true);
  };
  

  const addChapter = () => {
    setChapters([...chapters, { title: '', video: null, document: null }]);
    setIsDirty(true);
  };

 
    const removeChapter = async (index) => {
      try {
        const chapterId = chapters[index]._id; // Assuming each chapter has an `_id`
        await axios.delete(`/api/chapter/?_id=${chapterId}`); // Deleting chapter from the server
        setChapters(chapters.filter((_, chapterIndex) => chapterIndex !== index));
        setIsDirty(true);
      } catch (error) {
        console.error('Error removing chapter:', error);
      }
    };
   
  const moveChapter = (index, direction) => {
    const newChapters = [...chapters];
    const [movedChapter] = newChapters.splice(index, 1);
    newChapters.splice(index + direction, 0, movedChapter);
    setChapters(newChapters);
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsLoading(true); // Show loading spinner
    setMessage('');
    try {
      for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i];
        if (!chapter.video) {
          alert(`Video is required for chapter ${i + 1}`);
          throw new Error(`Video is required for chapter ${i + 1}`);
        }
      }
      const chapterPromises = chapters.map(async (chapter, index) => {
        const formData = new FormData();
    
        formData.append('courseId', courseId);
        formData.append('title', chapter.title);
  
        // Append video if it's a valid file
        if (chapter.video && chapter.video instanceof File) {
          formData.append('video', chapter.video);
        }
        if (chapter.document && chapter.document instanceof File) {
          formData.append('document', chapter.document);
        }
  
        if (chapter._id) {
          // If chapter exists, use PUT method
          const response = await axios.put(`/api/chapter?_id=${chapter._id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          return response.data.chapterId; // Return the chapter ID
        } else {
          // If it's a new chapter, use POST method
          const response = await axios.post('/api/chapter', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          return response.data.chapterId; // Get the chapter ID from response
        }
      });
  
      const chapterIds = await Promise.all(chapterPromises);
      
  
      // Now update the main course with the chapterIds, overview, and requirement
      await axios.put(`/api/courseId/`, {
        courseId,
        overview,
        requirement: requirements,
        chapters: chapterIds, // Send the array of chapter IDs
      });
  
      setIsDirty(false);
      fetchData(); // Refresh course data
      setMessage('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving course:', error);
      setMessage('Error saving changes.');
    } finally {
      setIsLoading(false); // Hide loading spinner
    };
  };
  const addQuiz = (chapterId) => {
    router.push(`/myQuiz/${chapterId}`);
  }
  

  return (
    <div className="course-container">
      <div className={`course-circular-section ${activeSection !== 'image' ? 'minimized' : ''}`}>
        <div className="course-image">
          <img src={course?.image} alt="Course Image" /> 
        </div>
      </div>
      {/* Course Name */}
      <h1 className="course-name">{course?.courseName}</h1>

      {/* Icons with clickable transitions */}
      <div className="course-icon-grid">
        <div className="course-icon" onClick={() => handleSectionChange('image')}>
          <i className="fas fa-home"></i>
          <p>Home</p>
        </div>
        <div className="course-icon" onClick={() => handleSectionChange('overview')}>
          <i className="fas fa-info-circle"></i>
          <p>Overview</p>
        </div>
        <div className="course-icon" onClick={() => handleSectionChange('requirements')}>
          <i className="fas fa-list-alt"></i>
          <p>Requirements</p>
        </div>
        <div className="course-icon" onClick={() => handleSectionChange('chapters')}>
          <i className="fas fa-book"></i>
          <p>Chapters</p>
        </div>
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div className="course-form">
          <label htmlFor="overview" className="course-label">Overview</label>
          <textarea
            id="overview"
            value={overview}
            onChange={handleInputChange(setOverview)}
            className="course-input"
          />
        </div>
      )}

      {/* Requirements Section */}
      {activeSection === 'requirements' && (
        <div className="course-form">
          <label htmlFor="requirements" className="course-label">Requirements</label>
          <textarea
            id="requirements"
            value={requirements}
            onChange={handleInputChange(setRequirements)}
            className="course-input"
          />
        </div>
      )}

      {/* Chapters Section */}
      {activeSection === 'chapters' && (
        <div className="chapter-card-container">
          {chapters.map((chapter, index) => (
            <div key={index} className="chapter-card">
              <h3 className="chapter-title">Chapter {index + 1}</h3>
              <label htmlFor={`title-${index}`} className="chapter-section">Title</label>
              <input
                type="text"
                id={`title-${index}`}
                value={chapter ? chapter.title : ''}
                onChange={(e) => handleChapterChange(index, 'title', e)} // Pass event object here
                className="chapter-input"
              />

               {/* Video Input and Preview */}
              <label htmlFor={`video-${index}`} className="chapter-section">Video</label>
              <input
                type="file"
                id={`video-${index}`}
                accept="video/*"
                onChange={(e) => handleChapterChange(index, 'video', e)}
                className="chapter-input"
              />
              {chapter.video && (
                <video controls className="chapter-video-preview">
                  <source src={chapter.video instanceof File ? URL.createObjectURL(chapter.video) : chapter.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {/* Render local file preview if video is a File object, otherwise render the server URL */}

              {/* Document Input and Preview */}
              <label htmlFor={`document-${index}`} className="chapter-section">Document</label>
              <input
                type="file"
                id={`document-${index}`}
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => handleChapterChange(index, 'document', e)}
                className="chapter-input"
              />
              {chapter.document && (
                <a
                  href={chapter.document instanceof File ? URL.createObjectURL(chapter.document) : chapter.document}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chapter-document-link"
                >
                  View Document
                </a>
              )}
              
              <button className='quizBtn' onClick={()=>addQuiz(chapter._id)}>
                Add quiz
              </button>
              
              <button onClick={() => removeChapter(index)} className="chapter-remove-btn">
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
              <button
                onClick={() => moveChapter(index, -1)}
                className="chapter-move-btn-left"
                disabled={index === 0}
              >
                &lt;-
              </button>
              <button
                onClick={() => moveChapter(index, 1)}
                className="chapter-move-btn-right"
                disabled={index === chapters.length - 1}
              >
                -&gt;
              </button>
            </div>
          ))}
          <button onClick={addChapter} className="chapter-add-btn">+ Add Chapter</button>
        </div>
      )}

      <div className="flex">
        {/* Submit Button */}
        {isDirty && (
          <div className='flexbox'>
            <button onClick={handleSave} className="course-submit-btn" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save All Changes'}
            </button>
          </div>
        )}
      </div>
      {/* Display success or error message */}
      {message && <p className="course-message">{message}</p>}
    
    </div>
  );
};

export default CourseDetail;
