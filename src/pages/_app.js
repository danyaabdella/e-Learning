import React from 'react';
import Link from 'next/link';
 import '@/styles/global.css'; // Import global styles if you have any

 function MyApp({ Component, ...pageProps }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to To-Do List</h1>
        <div style={styles.buttonContainer}>
          <Link href="../auth/signin">
            <button style={styles.button}>Sign In</button>
          </Link>
          <Link href="../auth/signup">
            <button style={styles.button}>Sign Up</button>
          </Link>
          <Link href="/auth/reset-password">
            <button style={styles.button}>Reset Password</button>
          </Link>
        </div>
      </div>
      <Component {...pageProps} />
    </div>
  );
}
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f4',
    },
    card: {
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#fff',
      textAlign: 'center',
    },
    title: {
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#0070f3',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };
  export default MyApp;
