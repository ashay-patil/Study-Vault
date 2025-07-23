import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setSuccess('Login successful!');
        navigate('/');
      } else {
        setError(res.data.msg || 'Login failed');
      }
    } catch (err) {
      setError(err.response.data.msg || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-container'>
      <h2 className='login-title'>Login</h2>
      <form onSubmit={handleSubmit} className='login-form'>
        <div>
          <label className='login-label'>
            Email:
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className='login-label'>
            Password:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={loading} className='login-button'>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div className='login-error'>{error}</div>}
        {success && <div className='login-success'>{success}</div>}
      </form>
      <div className='login-register'>Don't have an account? <Link to="/register">Register</Link></div>
    </div>
  );
}

export default Login
