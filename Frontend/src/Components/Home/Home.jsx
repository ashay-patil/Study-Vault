import React from 'react';

const Home = () => {
  return (
    <div style={{
      maxWidth: '700px',
      margin: '3rem auto',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 12px #e0e0e0',
      padding: '2.5rem'
    }}>
      <h1 style={{ color: '#1976d2', marginBottom: '1.5rem', textAlign: 'center' }}>
        Welcome to Study Vault : The Resource Sharing Platform!
      </h1>
      <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        This platform is designed to help students and educators share, discover, and review academic resources such as notes, PDFs, and study materials.
      </p>
      <ul style={{ fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
        <li>Browse resources by subject and semester.</li>
        <li>Upload your own study materials to help others.</li>
        <li>View and download PDFs shared by the community.</li>
        <li>Leave reviews and ratings to help others find the best resources.</li>
        <li>All resources are moderated for quality and relevance.</li>
      </ul>
      <p style={{ color: '#555', textAlign: 'center' }}>
        Get started by browsing resources or uploading your own!
      </p>
    </div>
  );
};

export default Home;