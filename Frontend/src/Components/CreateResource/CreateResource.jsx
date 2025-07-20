

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
      setErrorMsg(
        err.response?.data?.message ||
          'Failed to upload resource. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '2rem auto',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 12px #e0e0e0',
      padding: '2rem'
    }}>
      <h2 style={{ color: '#1976d2', marginBottom: '1.5rem', textAlign: 'center' }}>
        Upload a New Resource
      </h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: '1rem' }}>
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
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Subject:
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Semester:
            <input
              type="number"
              name="semester"
              value={form.semester}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Description:
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            PDF File:
            <input
              type="file"
              name="pdf"
              accept="application/pdf"
              onChange={handleChange}
              required
              style={{ display: 'block', marginTop: '4px' }}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: '#1976d2',
            color: '#fff',
            padding: '10px 24px',
            border: 'none',
            borderRadius: '5px',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Uploading...' : 'Upload Resource'}
        </button>
        {successMsg && (
          <div style={{ color: 'green', marginTop: '1rem', textAlign: 'center' }}>
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>
            {errorMsg}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateResource;
