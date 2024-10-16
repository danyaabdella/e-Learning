'use client'
import Image from 'next/image'; // Import for using Next.js Image component
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/learning.css';
import axios from 'axios';
import CourseNav from '@/Components/CourseNav';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true); // For general loading state
  const [progress, setProgress] = useState(0); // Simulated progress value
  const [profile, setProfile] = useState('');
  const [courses, setCourses] = useState('');
  const [error, setError] = useState('');
  const [chaptersCompleted, setChaptersCompleted] = useState(0);
  const [coursesCompleted, setCoursesCompleted] = useState(0);
  const router = useRouter();
  const userId = profile?.userId?._id;
  const handleCourseClick = (courseId) => {
    // Navigate to the progress page with the courseId
    router.push(`/progress?courseId=${courseId}`);
  };
  useEffect(()=>{
    fetchUserProfile();
  },[]);
  useEffect(() => {
    if(userId) {
      fetchEnrolledCourses();
      }
  },[userId])
  
  
  useEffect(() => {
    if (userId ) { // Ensure userId exists before calling the function
      console.log('user:', userId);
      countChaptersCompleted();
    }
  }, [userId]);

  
  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
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
  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User is not authenticated');
        return;
      }

      const email = localStorage.getItem('Email');

      const response = await fetch(`/api/enroll?email=${email}`, {
        method:'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      const enrolledCourses = data.data || [];
      let completedCoursesCount = 0; 
      // Iterate over courses and check completion status for each course
      const coursesWithCompletionStatus = await Promise.all(
        enrolledCourses.map(async (enrollment) => {
          const courseId = enrollment.courseId[0]._id; // Assuming courseId is an array
          const totalChapters = enrollment.courseId[0].chapters.length;
          const completedChapters = await fetchCompletedChapters(courseId);
          const calculation =
          totalChapters > 0
            ? Math.floor((completedChapters / totalChapters) * 100)
            : 0;

          setProgress(calculation);
          const isCourseCompleted = await checkCourseCompletion(courseId);
          
          if (isCourseCompleted) {
            completedCoursesCount++;
            await updateCourseCompletionStatus(courseId);
          }

          // Calculate quiz score for each course
          const quizScore = await fetchQuizScore(courseId);
          const totalQuestions = await fetchTotalQuestions(courseId);
          
          const quizCompletionPercent = totalQuestions > 0
          ? (quizScore / totalQuestions) * 100
          : 0;
          if(isCourseCompleted && quizCompletionPercent >= 80) {
            await createTranscript(userId, courseId, quizScore);
          }

          return {
            ...enrollment,
            isCompleted: isCourseCompleted, // Add isCompleted field to each course
          };
        })
      );
      setCoursesCompleted(completedCoursesCount);
      setCourses(coursesWithCompletionStatus);
      // setIsLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Error fetching courses. Please try again later.');
      // setIsLoading(false);
    }
  };

  const fetchQuizScore = async (courseId) => {
    try {
      const response = await axios.get(`/api/progress?courseId=${courseId}&userId=${userId}`);
      const progressess = response.data.progress;

      let totalQuizScore = 0;
      progressess.forEach(progress =>{
        totalQuizScore +=progress.quizScore;
      })
      return totalQuizScore; // Return the quiz score for the course
    } catch (error) {
      console.error('Error fetching quiz score:', error);
      return 0; // Default quiz score if there's an error
    }
  };

  const fetchTotalQuestions = async (courseId) => {
    try {
      const response = await axios.get(`/api/chapter?courseId=${courseId}`);
      const chapters = response.data;  // Assume response is the array of chapters (as per your example)

    // Calculate the total number of quiz questions across all chapters
    let totalQuestions = 0;

    chapters.forEach(chapter => {
      totalQuestions += chapter.quiz.length;  // Add the length of each chapter's quiz array
    });

    return totalQuestions; 
    
    } catch (error) {
      console.error(`Error fetching total questions for course ${courseId}:`, error);
      return 0; // Return 0 if there's an error
    }
  };

  const createTranscript = async (userId, courseId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User is not authenticated');
        return;
      }
  
      const response = await fetch(`/api/certificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, courseId,}),
                               
      });
  
      if (!response.ok) {
        throw new Error('Failed to create transcript');
      }
  
      const data = await response.json();
      console.log('Transcript created successfully:', data);
    } catch (error) {
      console.error('Error creating transcript:', error);
    }
  };
  

  const updateCourseCompletionStatus = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('User is not authenticated');
        return;
      }
  
      const response = await fetch(`/api/enroll`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId,
          isCompleted: true,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update course completion status');
      }
  
      const data = await response.json();
      console.log('Course completion status updated successfully:', data);
    } catch (error) {
      console.error('Error updating course completion status:', error);
    }
  };
  
  const countChaptersCompleted = async () => {
    try {
      const response = await axios.get(`api/count/chaptersCompleted?userId=${userId}`);
      setChaptersCompleted(response.data.completedChapters.length);
      
      // Update state for displaying in UI
    } catch (error) {
      console.error('Error counting completed chapters:', error);
    }
  };
  const fetchCompletedChapters = async (courseId) => {
    try {
      const response = await axios.get(`/api/count/chaptersCompleted?userId=${userId}&courseId=${courseId}`);
      const chapters =  response.data.completedChapters.length; // Return the number of completed chapters
      return chapters;
    } catch (error) {
      console.error(`Error fetching completed chapters for course ${courseId}:`, error);
      return 0; // Return 0 if there's an error
    }
  };
   // Function to check if a specific course is completed
   const checkCourseCompletion = async (courseId) => {
    try {
      const response = await axios.get(`/api/count/courseCompleted?userId=${userId}&courseId=${courseId}`);
      return response.data.isCompleted; // Return true if the course is completed
    } catch (error) {
      console.error(`Error checking if course ${courseId} is completed:`, error);
      return false;
    }
  };
  return (
    <div className="page-div">
      {/* Navbar */}
      <CourseNav />
      {isLoading? (
        <div className="spinner">
          <div className="spinnerCircle"></div>
        </div>
        ):(
          
          <div className="main-content">
          <div className="grid-layout">
            {/* Welcome Message and Course Progress */}
            <div className="welcome-div">
              <div className="welcome-card">
                <h2 className="header2">Welcome {profile.firstName}</h2>
                {courses.length > 0 ?(
                  courses.map((enrollment, index)=>(
                    <div key={index} className="course-div" onClick={() => handleCourseClick(enrollment.courseId[0]._id)}>
                  <Image
                    src={enrollment.courseId[0].image || '/placeholder.jpg'}  // Replace with actual image path
                    alt="Course Image"
                    className="course-img"
                    width={400}
                    height={400}
                  />
                  <div className="progress-div">
                    <h3 className="header3">{enrollment.courseId[0].courseName}</h3>
                    <div className="progress-div-div">
                      <div className="flexbox">
                        <div>
                          <span className="progress-span">
                            Progress
                          </span>
                        </div>
                      </div>
                      <div className="progress-bar">

                        <div
                          style={{ width: `${progress}%` }}
                          className="progress-bar-filled"
                        ></div>
                      </div>
                      <p className="completion-percent">{progress}% completed</p>
                    </div>
                    <a href="#" className="view-link">View All</a>
                  </div>
                </div>
                  ))
                ):(
                  <p className="no-courses-text">You have not enrolled in any courses yet.</p>
                )}
                
              </div>
            </div>

            {/* Statistics Panel */}
            <div className="stat-list">
              <ul>
                {[
                  // { title: 'Concepts Viewed', value: 119, icon: '📄' },
                  { title: 'Chapters Viewed', value: chaptersCompleted, icon: '📚' },
                  { title: 'Quizzes Completed', value: 0, icon: '💬' },
                  { title: 'Programs Completed', value: coursesCompleted, icon: '🎓' },
                  // { title: 'Projects Passed', value: 0, icon: '🔨' },
                ].map((stat, index) => (
                  <li
                    key={index}
                    className="stat-item"
                  >
                    <span className="flex items-center space-x-3">
                      <span className="stat-title">{stat.icon}</span>
                      <span>{stat.title}</span>
                    </span>
                    <span className="stat-value">{stat.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
       
        )}
      
    </div>
  );
}
