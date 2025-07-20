import React from 'react'

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    background: '#222',
    color: '#fff',
  };

  const linksStyle = {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: 16,
    padding: '6px 12px',
    borderRadius: 4,
    transition: 'background 0.2s',
  };

  const linkActiveStyle = {
    background: '#444',
  };

  return (
    <nav style={navStyle}>
      <div style={linksStyle}>
        <Link to="/" style={linkStyle} activeStyle={linkActiveStyle}>
          Home
        </Link>
        <Link to="/getAllResources" style={linkStyle} activeStyle={linkActiveStyle}>
          All Resources
        </Link>
        <Link to="/getMyResources" style={linkStyle} activeStyle={linkActiveStyle}>
          My Resources
        </Link>
        <Link to="/createResource" style={linkStyle} activeStyle={linkActiveStyle}>
          Create Resource
        </Link>
      </div>
      <div>
        {user ? (
          <span>
            Welcome, <b>{user.name || user.email || 'User'}</b>
          </span>
        ) : (
          <span onClick={() => handleNavigate('/login')}>Login</span>
        )}
      </div>
    </nav>
  );
};


export default Navbar