'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/instructor.css'
import Image from 'next/image';

export default function instructorPage () {
    const [instructors, setInstructors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        fetchInstructors()
    },[])
    const fetchInstructors = async() => {
        try{
            const response = await axios.get('api/instructors');
            setInstructors(response.data);
        }catch(error) {
            setError('failed to fetch instructors profile');
        }finally {
            setIsLoading(false);
        }
        
    }

    if(isLoading) {
        return (
            <div className='spinner'>
                <div className='spinnerCircle'></div>
            </div>
        )
    }
    return (
        <div className="container">
            <h1 className="textTitle">Instructors</h1>

            {error && <p className="errorText">{error}</p>}

            {instructors.length === 0 ? (
                <p>No instructors found.</p>
            ) : (
                <div className="gridContainer">
                {instructors.map((instructor) => (
                    <div key={instructor._id} className="card">
                    <Image
                        src={instructor.avatar ? instructor.avatar : '/default-avatar.png'}
                        alt="Instructor Avatar"
                        className="avatar"
                        height={300}
                        width={300}
                        unoptimized
                    />
                    {console.log('i',instructor.firstName)}
                    <h2 className="instructorName">
                        {instructor.firstName} {instructor.lastName}
                    </h2>
                    <p className="instructorDetails">{instructor.email}</p>
                    <p className="instructorDetails">{instructor.jobTitle}</p>
                    <p className="instructorDetails">{instructor.location}</p>
                    <p className="instructorDetails">{instructor.bio}</p>
                    </div>
                ))}
                </div>    
            )}
        </div>
    )
}