import './CreateResource.css';

import React, { useState } from 'react';
import axios from 'axios';

const CreateResource = () => {
  const [form, setForm] = useState({
    title: '',
    subject: '',
    semester: '',
    description: '',
    pdf: null,
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'pdf') {
      setForm({ ...form, pdf: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const data = new FormData();
      data.append('title', form.title);
      data.append('subject', form.subject);
      data.append('semester', form.semester);
      data.append('description', form.description);
      if (form.pdf) data.append('pdf', form.pdf);

      const res = await axios.post('http://localhost:3000/api/v1/resources/protected/upload-my-resource', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });

      setSuccessMsg('Resource uploaded successfully!');
      setForm({
        title: '',
        subject: '',
        semester: '',
        description: '',
        pdf: null,
      });
    } catch (err) {
      setErrorMsg(err.response.data.msg || 'Failed to upload resource. Try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='create-resource-container'>
      <h2 className='create-resource-title'>
        Upload a New Resource
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className='create-resource-form-group'>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </label>
        </div>
        <div className='create-resource-form-group'>
          <label>
            Subject:
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='create-resource-form-group'>
          <label>
            Semester:
            <input
              type="number"
              name="semester"
              value={form.semester}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='create-resource-form-group'>
          <label>
            Description:
            <textarea 
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
            />
          </label>
        </div>
        <div className='create-resource-form-group'>
          <label>
            PDF File:
            <input
              type="file"
              name="pdf"
              accept="application/pdf"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className='create-resource-button'
        >
          {loading ? 'Uploading...' : 'Upload Resource'}
        </button>
        {successMsg && (
          <div className='create-resource-success-msg'>
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className='create-resource-error-msg'>
            {errorMsg}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateResource;
