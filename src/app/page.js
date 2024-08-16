'use client'
import Image from 'next/image';
import '../styles/styles.css';


const Page = () => {
  
  return (
    <>
      
      <div className="container">
        <div className="left">
          <Image src="/image.png" alt="E-learning" width={600} height={400} />
        </div>
        <div className="right">
          <p>An electronic learning platform is an integrated set of interactive online services that provide trainers, 
            learners, and others involved in education with information, tools, and resources to support and enhance 
            education delivery and management.One type of eLearning software is a learning management system (LMS).</p>
        </div>
      </div>
    </>
  );
};

export default Page;




