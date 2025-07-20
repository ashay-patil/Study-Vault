import React from 'react'

const Footer = () => {
  return (
    <footer
      style={{
        background: '#222',
        color: '#fff',
        padding: '32px 0 16px 0',
        textAlign: 'center',
        marginTop: '3rem',
        borderTop: '1px solid #333',
      }}
    >
      <div style={{ marginBottom: '12px', fontSize: 18, fontWeight: 500 }}>
        Made by a Student for all the Students
      </div>
      <div style={{ marginBottom: '8px', fontSize: 15 }}>
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
      <div style={{ marginBottom: '8px', fontSize: 15 }}>
        Made with <span style={{ color: '#e25555' }}>♥</span> by <b>Ashay Patil</b>
      </div>
      <div style={{ marginBottom: '8px', fontSize: 15 }}>
        Contact: <a href="mailto:ashaypatil2005@gmail.com" style={{ color: '#90caf9', textDecoration: 'underline' }}>ashaypatil2005@gmail.com</a>
      </div>
      <div style={{ fontSize: 15 }}>
        GitHub:&nbsp;
        <a
          href="https://github.com/ashay-patil"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#90caf9', textDecoration: 'underline' }}
        >
          https://github.com/ashay-patil
        </a>
      </div>
    </footer>
  );
};


export default Footer