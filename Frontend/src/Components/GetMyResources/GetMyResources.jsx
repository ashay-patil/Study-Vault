import React, { useEffect, useState } from 'react';
import axios from 'axios';


const GetMyResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchMyResources = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMsg('You must be logged in to view your resources.');
          setLoading(false);
          return;
        }
        const res = await axios.get(
          'http://localhost:3000/api/v1/resources/protected/get-my-resources',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("res.data",res.data);
        if (res.data !== null) {
          setResources(res.data);
        } else {
          setErrorMsg(res.data.msg || 'Failed to fetch your resources. Try again later');
        }
      } catch (err) {
        setErrorMsg(
          err.response?.data?.message ||
            'Failed to fetch your resources. Try again later'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyResources();
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>My Uploaded Resources</h2>
      {loading && <div style={{ textAlign: 'center' }}>Loading...</div>}
      {errorMsg && (
        <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
          {errorMsg}
        </div>
      )}
      {!loading && !errorMsg && resources.length === 0 && (
        <div style={{ textAlign: 'center', color: '#888' }}>
          You have not uploaded any resources yet.
        </div>
      )}
      <div>
        {resources.map((resource) => (
          <div
            key={resource._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: '1rem',
              marginBottom: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <h3 style={{ margin: 0 }}>{resource.title}</h3>
            <div style={{ color: '#555', marginBottom: 8 }}>
              <b>Subject:</b> {resource.subject} &nbsp; | &nbsp;
              <b>Semester:</b> {resource.semester}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Description:</b> {resource.description}
            </div>
            <div>
              <b>Uploaded By:</b> {resource.uploadedByEmail}
            </div>
            {resource.pdfUrl && (
              <a
                href={resource.pdfUrl}
                target="_blank"
                style={{
                  display: 'inline-block',
                  marginTop: 8,
                  color: '#1976d2',
                  textDecoration: 'underline',
                }}
              >
                View PDF
              </a>
            )}
            <div style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
              Uploaded: {new Date(resource.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetMyResources;