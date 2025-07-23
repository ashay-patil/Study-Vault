import React from 'react';
import './Home.css';
const Home = () => {
  return (
    <div className='home-container'>
      <h1 className='home-title'>
        Welcome to Study Vault : The Resource Sharing Platform!
      </h1>
      <p className='home-description'>
        This platform is designed to help students and educators share, discover, and review academic resources such as notes, PDFs, and study materials.
      </p>
      <ul className='home-list'>
        <li>Browse resources by subject and semester.</li>
        <li>Upload your own study materials to help others.</li>
        <li>View and download PDFs shared by the community.</li>
        <li>Leave reviews and ratings to help others find the best resources.</li>
        <li>All resources are moderated for quality and relevance.</li>
      </ul>
      <p className='home-description'>
        Get started by browsing resources or uploading your own!
      </p>
    </div>
  );
};

export default Home;