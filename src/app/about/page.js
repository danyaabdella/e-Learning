import '../../styles/contactAndheading.css';
import Image from 'next/image';

export default function AboutPage() {
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
                        <Image src="/about.png" alt="E-Learning" className="about-image" width={600} height={400}/>
                    </div>
                    <div className="about-content">
                        <h3 className="about-content-heading">What is E-Learning?</h3>
                        <p className="about-content-paragraph">
                            E-Learning is an integrated set of interactive online services that provides trainers, learners, and others involved in education with information, tools, and resources to support and enhance education delivery and management. One type of e-learning software is a learning management system (LMS).
                        </p>
                        <p className="about-content-paragraph">
                            Our platform offers a wide range of courses and learning materials designed to help you enhance your skills and knowledge at your own pace, anytime and anywhere.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
