import React from 'react'

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return;
    }
    // Fetch user info
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/auth/get-user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data && res.data.success && res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className='navbar-container'>
      <div className='navbar-links'>
        <Link to="/" className='navbar-link' activeClassName='navbar-link-active'>
          Home
        </Link>
        <Link to="/getAllResources" className='navbar-link' activeClassName='navbar-link-active'>
          All Resources
        </Link>
        <Link to="/getMyResources" className='navbar-link' activeClassName='navbar-link-active'>
          My Resources
        </Link>
        <Link to="/createResource" className='navbar-link' activeClassName='navbar-link-active'>
          Create Resource
        </Link>
      </div>
      <div>
        {user ? (
          <span>
            Welcome, <b>{user.name || user.email || 'User'}</b>
            <button className='navbar-logout' onClick={() => handleLogout()}>Logout</button>
          </span>
        ) : (
          <span className='navbar-login' onClick={() => handleNavigate('/login')}>Login</span>
        )}
      </div>
    </nav>
  );
};


export default Navbar