import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './UpdateMyResource.css';
const UpdateMyResource = () => {
    const {id} = useParams();
    const [form, setForm] = useState({
        title: '',
        subject: '',
        semester: '',
        description: '',
        pdf: null,
      });
      const [loading, setLoading] = useState(false);
      const [errorMsg, setErrorMsg] = useState('');
      const [successMsg, setSuccessMsg] = useState('');

    useEffect(()=>{
        const fetchResource = async () => {
            setLoading(true);
            try {
                const {data} = await axios.get(`http://localhost:3000/api/v1/resources/public/get-single-resource/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setForm({
                    title: data.title,
                    subject: data.subject,
                    semester: data.semester,
                    description: data.description,
                });
                console.log(data);
            } catch (error) {
                console.log(error);
                setErrorMsg(error.response.data.message);
            }finally{
                setLoading(false);
            }
        }
        fetchResource();
    },[])

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if(name === 'pdf'){
            setForm({...form, pdf: files[0]});
        }else{
            setForm({...form, [name]: value});
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', form.title);
            formData.append('subject', form.subject);
            formData.append('semester', form.semester);
            formData.append('description', form.description);
            formData.append('pdf', form.pdf);
            const {data} = await axios.put(`http://localhost:3000/api/v1/resources/protected/update-my-resource/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log(data);
            setSuccessMsg("Resource updated successfully");
        } catch (error) {
            console.log(error);
            setErrorMsg("Resource update failed");
        }finally{
            setLoading(false);
        }
        }
    
  return (
    <div className='update-my-resource-container'>
        <h2 className='update-my-resource-title'>Update Resource</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className='update-my-resource-form-group'>
                <label>Title</label>
                <input type="text" name="title" value={form.title} onChange={handleChange} placeholder='Title' />
            </div>
            <div className='update-my-resource-form-group'>
                <label>Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} placeholder='Subject' />
            </div>
            <div className='update-my-resource-form-group'>
                <label>Semester</label>
                <input type="number" name="semester" value={form.semester} onChange={handleChange} placeholder='Semester' />
            </div>
            <div className='update-my-resource-form-group'>
                <label>Description</label>
                <input type="text" name="description" value={form.description} onChange={handleChange} placeholder='Description' />
            </div>
            <div className='update-my-resource-form-group'>
                <label>PDF</label>
                <input type="file" name="pdf" onChange={handleChange} placeholder='PDF' />
            </div>
            <button type="submit" disabled={loading} className='update-my-resource-button'>{loading ? 'Updating...' : 'Update'}</button>
        </form>
        {errorMsg && <div className='update-my-resource-error-msg'>{errorMsg}</div>}
        {successMsg && <div className='update-my-resource-success-msg'>{successMsg}</div>}
    </div>
  )
}

export default UpdateMyResource