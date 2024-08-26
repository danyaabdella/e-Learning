'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/partners.css';
import SideBar from '@/Components/SideBar';

const TestimonialPage = () => {
    const [testimonials, setTestmonials] = useState([]);


  useEffect(() => {
    fetchTestmonial();
  }, []);

  const fetchTestmonial = async () => {
    try {
      const response = await axios.get('/api/testimonial');
      setTestmonials(response.data);
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
  };

  return (
    <>
       <SideBar/>
       <div className="partner-page-container"> 
       <div className="partners-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="partner-card">
            <img src={testimonial.img} alt={testimonial.name} className="partner-logo" />
            <h3 className="partner-name">{testimonial.name}</h3>
            <p className="partner-description">{testimonial.message}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};
export default TestimonialPage;