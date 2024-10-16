
'use client';  // This directive ensures the component runs on the client-side
import '../styles/globals.css';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'; 
import { FaStar } from 'react-icons/fa';
import { BsQuote} from 'react-icons/bs';
 import Slider from '@/Components/Slider';
import '../styles/styles.css'; // Assuming styles are in styles.css


const Page = () => {
  const [courses, setCourses] = useState([]);
  const [partners, setPartners] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); 
  const router = useRouter();
  const sliderRef = useRef(null);
  useEffect(() => {
    fetchCourses();
    fetchPartners();
    fetchTestimonials();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses'); // Assuming your API has a limit query parameter
      const approvedCourses = response.data.filter(course => course.ishome);

      setCourses(approvedCourses);
    
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchPartners = async () => {
    try {
      const response = await axios.get('/api/partners'); // Fetch partners from your API
      setPartners(response.data);
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
  };
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('/api/testimonial?limit=3'); // Adjust API endpoint as needed
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };


  const handleCourseClick = () => {
    const user = localStorage.getItem('token'); // Assuming you store user data in sessionStorage

    if (user) {
      router.push(`/courses`);
    } else {
      router.push('/signup');
    }
  };

  // const prevSlide = () => {
  //   setCurrentSlide((prev) => (prev === 0 ? partners.length - 1 : prev - 1));
  // };

  // Function to handle next slide
  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev === partners.length - 1 ? 0 : prev + 1));
  // };

  return (
    <>
    
    <div className="container">
    <div className="right">
      <h1 className='header1'>Don't limit your <span className='spanner'>education</span><br></br>to place</h1>
      
    </div>  
    <div className="left">
      <Image src="/image.png" alt="E-learning" width={600} height={400} className="mx" /> {/* Centered using mx-auto */}
    </div>
   
</div>
{/* <div   
  className='bg-Image' >
    <p className='paragraph'>
        An electronic learning platform is an integrated set of interactive online services that provide trainers, 
        learners, and others involved in education with information, tools, and resources to support and enhance 
        education delivery and management. One type of eLearning software is a learning management system (LMS).
      </p> 
</div> */}
    
<div className="course-div">
<h1 className="course-heading">Popular Courses</h1>
<div className="course-list">
  {courses.map((course) => (
    <div onClick={handleCourseClick} key={course.id} className="course-item">
      <div
        // style={{
        //   backgroundImage: course.image ? `url(${course.image})` : 'none',
        //   backgroundSize: 'cover', 
        //   backgroundPosition: 'center',
        //   backgroundRepeat: 'no-repeat',
        //   height: '150px', // Ensure height is sufficient to show the image
        // }}
      >
        <Image src={course.image}
              alt={course.courseName}
              width={400}
              height={400}
              className='image'/>
      </div>
      <div className='price-div'>
        <h1 className="coursePrice">
            {course.coursePrice}
        </h1>
        <div className="course-info"></div>
      <span className='course-title'>{course.courseCategory}</span>
      <span className='course-description'>{course.instructor}</span>
      </div>
      <h1 className = "courseName">{course.courseName}</h1>
      <div className='div-div-star'>
        <div className='div-star'>
          <FaStar className="star"/>
          <FaStar className="star"/>
          <FaStar className="star"/>
          <FaStar className="star"/>
          <FaStar className="star"/>
        </div>
      </div>
      {/* <h3 className="course-title">{course.courseName}</h3>
      <p className="text-description">{course.courseCode}</p>
      <p className="text-description">Instructor: {course.instructor}</p> */}
    </div>
  ))}
</div>
</div>
{/* Partners Carousel */}
{/* <h2 className="course-heading">Our Partners</h2>
<div className="partner-slider">
  
   Slider Container 
  <div className='container'>
  <button onClick={prevSlide} className="custom-button custom-button-prev">←</button>
  <button onClick={nextSlide} className="custom-button custom-button-next">→</button>

  <div className="slider-container" ref={sliderRef}>
    {partners.map((partner, index) => (
      <div
        key={partner.id}
        className={`slider-item ${index === currentSlide ? 'active' : ''}`}
      >
        <img src={partner.img} alt={partner.fullName} className="partner-img mx-auto" />  Center image 
        <h3 className="partner-name">{partner.fullName}</h3>
        <p className="partner-description">{partner.description}</p>
      </div>
    ))}
  </div>
  </div>
</div> */}
<div className='partner-heading'>
  <div className='partner-section'>
      { /*text-field */}
      <div className='partner-slider'>
        <div className='partner-item '>
          <div className='partner-quote'>
            <BsQuote className="quote"/>
          </div>
          <h1 className='partner-text'>
            Our partners
          </h1>
        </div>
      </div>
      
      <div className=' partner-slide'>
         <Slider/> 
      </div>
  </div>
</div>
    {/* Testimonial components */}
    <h2 className="testimonial-heading ">Testimonials</h2>
      <div className="testimonial-list ">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-item ">
            <img className="testimonial-img" src={testimonial.img} alt={`${testimonial.name}'s image`} />
            <p className="testimonial-message">{testimonial.message}</p>
            <p className="testimonial-name">{testimonial.name}</p>
            
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;



