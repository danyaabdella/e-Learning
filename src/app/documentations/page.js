'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DocumentationPage() {
  const router = useRouter();
  const [email, setEmail] = useState(null); // State for the email query param
  const [documentation, setDocumentation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract query params manually using URLSearchParams
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get('email');
      setEmail(emailParam); // Set the email state
    }
  }, []);

  // Fetch the documentation when the email is available
  useEffect(() => {
    if (!email) return;

    const fetchDocumentation = async () => {
      try {
        const response = await axios.get(`/api/documentation?email=${email}`);
        setDocumentation(response.data);
      } catch (error) {
        console.error('Error fetching documentation:', error);
        setError('Error fetching documentation. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentation();
  }, [email]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!documentation) {
    return <p>No documentation found.</p>;
  }

  return (
    <div>
      <h1>Documentation for {email}</h1>
      <p>CV: <a href={documentation.cv} target="_blank" rel="noopener noreferrer">View CV</a></p>
      {console.log('console doc', documentation.cv)}
      <p>Degree: <a href={documentation.degree} target="_blank" rel="noopener noreferrer">View Degree</a></p>
    </div>
  );
}
