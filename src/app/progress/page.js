'use client';
import CourseNav from '@/Components/CourseNav';
import '../../styles/progressPage.css';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';

const ProgressPage = () => {
    // const router = useRouter();
    // const params = useParams(); 
    const [chapters, setChapters] = useState([]);
    const [course, setCourse] = useState([]);
    const [totalProgress, setTotalProgress] = useState(0); // Total course progress
    const [expandedChapters, setExpandedChapters] = useState({});
    const serchParams = useSearchParams();
    const [chapterProgress, setChapterProgress] = useState({});
    const [userId, setUserId] = useState(null);
    


    // const [courseId, setCourseId] = useState(null);

    const courseId = serchParams.get('courseId');
    useEffect(() => {
        // Ensure localStorage is accessed only on the client side
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem('userId');
            setUserId(storedUserId);
        }
    }, []); 

    useEffect(() => {
        if (courseId && userId) {
            fetchChapterDetails(courseId); // Fetch the course details using courseId
            fetchCourseDetails(courseId);
            // fetchLastWatchedProgress(courseId); 
        }
    }, [courseId, userId]);
    useEffect(() => {
        if (chapters.length > 0 && courseId && userId) {
            fetchCourseProgress(courseId);
        }
    }, [chapters, courseId, userId]);
        

      const fetchCourseProgress = async (courseId) => {
        try {
            const response = await axios.get(`/api/progress?courseId=${courseId}&userId=${userId}`);
            const progressData = response.data.progress;
    
            const updatedChapterProgress = {};
        
            if (Array.isArray(progressData)) {
                chapters.forEach((chapter) => {
                    const chapterProgressItem = progressData.find(p => p.chapterId === chapter._id);
                    updatedChapterProgress[chapter._id] = chapterProgressItem ? (chapterProgressItem.isCompleted ? 100 : 50) : 0;
                });
            } else {
                chapters.forEach((chapter) => {
                    updatedChapterProgress[chapter._id] = 0;
                });
            }

            setChapterProgress(updatedChapterProgress);
            updateOverallProgress(updatedChapterProgress); // Pass the updated progress
        } catch (error) {
            console.error('Error fetching course progress:', error);
        }
      };
    
    const fetchChapterDetails = async (courseId) => {
        try {
            const response = await axios.get(`/api/chapter?courseId=${courseId}`);
            setChapters(response.data); // Ensure you're accessing response data
            fetchCourseProgress(courseId);
        } catch (error) {
            console.error('Error fetching chapter details:', error);
        }
    };

    const fetchCourseDetails  = async(courseId) => {
        try {
            const response = await axios.get(`/api/courses?courseId=${courseId}`);
            setCourse(response.data); // Ensure you're accessing response data
            
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    };
   
    const toggleChapter = (index) => {
        setExpandedChapters((prev) => ({
            ...prev,
            [index]: !prev[index], // Toggle the expanded state for the specific chapter
        }));
    };
    const updateProgress = async (chapterId) => {
        try {
            const response = await axios.post('/api/progress', {
                courseId,
                chapterId,
                userId,
            });
            // console.log('Progress updated:', response.data);
            setChapterProgress(prev => ({
                ...prev,
                [chapterId]: 100, // Assume the chapter is fully completed after action
            }));
            updateOverallProgress({ ...chapterProgress, [chapterId]: 100 });
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };
    
    
    const updateOverallProgress = (updatedChapterProgress) => {
        const totalChapters = chapters.length;
        const totalProgress = Object.values(updatedChapterProgress).reduce((acc, cur) => acc + cur, 0);
        const averageProgress = totalChapters ? Math.floor(totalProgress / totalChapters) : 0;
        setTotalProgress(averageProgress);
    };
    

    const handleVideoPlay = (chapterId) => {
        updateProgress(chapterId);
     };

    

    const handleDocumentDownload = (chapterId) => {
        updateProgress(chapterId);
    };

    return courseId ? (
        <>
            <CourseNav />
            <div className="course-progress">
                <h2 className="header2">{course.courseName}</h2>
                <div className="course-details">
                    <span>Continue where you left off:</span>
                    <h3 className="header3">
                        {/* {chapters.find(ch => ch._id === lastChapterId)?.title || 'Spreadsheets 3: Analyze Data'} */}
                    </h3>
                    {/* <button className="course-resume-btn" onClick={handleResume}>Resume</button> */}
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${totalProgress}%` }}></div>
                    </div>
                    <p className="progress-percent">{totalProgress}%</p>
                </div>
            </div>
            <div className="curriculum-container">
                <div className="curriculum-header">
                    <h2 className="curriculum-title">Curriculum</h2>
                </div>
                {chapters.map((chapter, index) => (
                    <div key={index} className="curriculum-div">
                        <div className="curriculum-progress-circle">{chapterProgress[chapter._id] || 0}%</div>
                        <div className="curriculum-lesson-container">
                            <h3 className="curriculum-lesson-header">{chapter.title}</h3>
                            <div className="lesson-footer">
                                <p className="lesson-status">Chapter {index+1}</p>
                                <button
                                    className="lesson-complete-btn"
                                    onClick={() => toggleChapter(index)} // Toggle expand/collapse
                                >
                                    <i className={`fa fa-caret-${expandedChapters[index] ? 'up' : 'down'}`} aria-hidden="true"></i>
                                </button>
                            </div>
                            {expandedChapters[index] && (
                                <div className="expanded-content">
                                    {/* Conditionally rendered content for the expanded chapter */}
                                    <div className="video-section">
                                        <video  className="video-player" 
                                        id={`video-${chapter._id}`} 
                                        controls 
                                        onPlay={() => handleVideoPlay(chapter._id)}>
                                            <source src={chapter.videos} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className="document-section">
                                        {/* {chapter.documents?.map((doc, docIndex) => ( */}
                                            <a
                                                // key={docIndex}
                                                href={chapter.documents}
                                                className="document-link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => handleDocumentDownload(chapter._id)}
                                            >
                                               Documents
                                            </a>
                                        {/* ))} */}
                                    </div>
                                    <div>
                                        <Link href={`/quiz?chapterId=${chapter._id}`} className='document-link'>Start quiz</Link>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
        ) : (
            <div className="spinner">
                <div className="spinnerCircle"></div>
            </div>
        );
    
};

export default ProgressPage;
