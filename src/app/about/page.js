'use client'
import '../../styles/contactAndheading.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AboutPage() {

    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState([]);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
            const response = await axios.get('/api/aboutcontent'); // Adjust the API endpoint as needed
            const data = response.data;
    
            setImageUrl(data.img || '');
            setContent(data.content || []);
            } catch (error) {
            console.error('Error fetching data', error);
            }
        };
    
        fetchAbout();
    }, []);

    
    return (
        <div className="about-container">
            <div className="about-header">
                <div className="text">
                    <h2 className="about-heading">About Us</h2>
                    <p className="about-description">
                        Welcome to our e-learning platform, where education meets innovation.
                    </p>
                </div>

                <div className="about-image-container">
                    <div className="about-image-container2">
                        <Image src={imageUrl} alt="E-Learning" className="about-image" width={300} height={300}/>
                    </div>
                    <div className="about-content">
                        {content.map((item, index) => (
                        <div key={index} className="about-content-section">
                            {item.title && (
                            <h3 className="about-content-heading">{item.title}</h3>
                            )}
                            {item.description && (
                            <p className="about-content-paragraph">{item.description}</p>
                            )}
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
