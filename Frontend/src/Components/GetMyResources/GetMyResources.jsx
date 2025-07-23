import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './GetMyResources.css';

const GetMyResources = () => {
  const navigate = useNavigate();
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

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this resource?");
    if(!confirm) return;
    try {
      const {data} = await axios.delete(`http://localhost:3000/api/v1/resources/protected/delete-my-resource/${id}`,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("data",data);
      const newResources = await axios.get('http://localhost:3000/api/v1/resources/protected/get-my-resources',{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setResources(newResources.data);
    } catch (err) {
      console.log("err",err);
      setErrorMsg(err.response?.data?.message || 'Failed to delete resource. Try again later');
    }
  }
  return (
    <div className='get-my-resources-container'>
      <h2 className='get-my-resources-title'>My Uploaded Resources</h2>
      {loading && <div className='get-my-resources-loading'>Loading...</div>}
      {errorMsg && (
        <div className='get-my-resources-error'>
          {errorMsg}
        </div>
      )}
      {!loading && !errorMsg && resources.length === 0 && (
        <div className='get-my-resources-no-resources'>
          You have not uploaded any resources yet.
        </div>
      )}
      <div className='get-my-resources-grid'>
        {resources.map((resource) => (
          <div
            key={resource._id}
            className='get-my-resources-resource'
          >
            <h3 className='get-my-resources-resource-title'>{resource.title}</h3>
            <div className='get-my-resources-resource-subject'>
              <b>Subject:</b> {resource.subject} &nbsp; | &nbsp;
              <b>Semester:</b> {resource.semester}
            </div>
            <div className='get-my-resources-resource-description'>
              <b>Description:</b> {resource.description}
            </div>
            <div>
              <b>Uploaded By:</b> {resource.uploadedByEmail}
            </div>
            {resource.pdfUrl && (
              <a
                href={resource.pdfUrl}
                target="_blank"
                className='get-my-resources-resource-pdf'
              >
                View PDF
              </a>
            )}
            <div className='get-my-resources-resource-uploaded'>
              Uploaded: {new Date(resource.createdAt).toLocaleString()}
            </div>
            <div className="get-my-resources-update">
              <button className="get-my-resources-update-btn" onClick={()=>{
                navigate(`/update-resource/${resource._id}`);
              }}>Edit Resource</button>
            </div>
            <div className="get-my-resources-delete">
              <button className="get-my-resources-delete-btn" onClick={()=>{handleDelete(resource._id)
              }}>Delete Resource</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetMyResources;