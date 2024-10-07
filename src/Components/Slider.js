// 'use client'
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import axios from 'axios';
import '../styles/slider.css';  // Importing the Tailwind CSS styles
import { FaStar } from 'react-icons/fa';

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1324 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1324, min: 764 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 764, min: 0 },
      items: 1
    }
};

const Slider = () => {
    const [partners, setPartners] = useState([]);
    
    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const response = await axios.get('/api/partners'); // Fetch partners from your API
            setPartners(response.data);
        } catch (error) {
            console.error('Error fetching partners:', error);
        }
    };

    return (
        <Carousel 
            additionalTransfrom={0}
            arrows={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            centerMode={false}
            infinite={true}
            responsive={responsive}
            itemClass='item'
        >
            {partners.map((partner) => (
                <div key={partner.id}>
                    <div className='item'>
                        <div className='height'>
                            <Image
                                src={partner.img}
                                alt="Partner Image"
                                width={400}
                                height={400}
                                className="width"
                            />
                        </div>
                        <div className='div-container'>
                            {/* <div className='div-star'>
                                <FaStar className='star'/>
                                <FaStar className='star'/>
                                <FaStar className='star'/>
                                <FaStar className='star'/>
                            </div> */}
                            <p className='div-description'>
                                {partner.description}
                            </p>
                            <div className="div-name">
                                <h1 className="name">{partner.fullName}</h1>
                                <p></p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Slider;
