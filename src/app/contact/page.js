import '../../styles/contactAndheading.css';

export default function Contact() {
    return (
        <div className="contact-container">
            <div className="contact-header">
                <div className="text">
                    <h2 className="contact-heading">Contact Us</h2>
                    <p className="contact-description">
                        We’d love to hear from you! Here’s how you can reach us.
                    </p>
                </div>

                <div className="contact-form">
                    <div>
                        <h3 className="get-in-touch">Contact Information</h3>
                        <p className="contact-description">
                            Feel free to reach out to us through any of the following means:
                        </p>
                        <ul className="contact-list">
                            <li className="contact-info">
                                <strong>Phone:</strong> +123 456 7890
                            </li>
                            <li className="contact-info">
                                <strong>Email:</strong> info@elearningplatform.com
                            </li>
                            <li className="contact-info">
                                <strong>Telegram:</strong> @elearningplatform
                            </li>
                            <li className="contact-info">
                                <strong>Address:</strong> 123 E-Learning St., Knowledge City, EduLand
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="get-in-touch">Get In Touch</h3>
                        <form className="contact-list">
                            <div>
                                <label htmlFor="name" className="label">Name</label>
                                <input type="text" id="name" className="input-field" />
                            </div>
                            <div>
                                <label htmlFor="email" className="label">Email</label>
                                <input type="email" id="email" className="input-field" />
                            </div>
                            <div>
                                <label htmlFor="message" className="label">Message</label>
                                <textarea id="message" rows="4" className="input-field"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="submit-button">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
