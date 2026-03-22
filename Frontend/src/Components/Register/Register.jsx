import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
const RegisterForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  handleSubmit,
  error,
  success,
}) => (
  <form onSubmit={handleSubmit} className='register-form'>
    <div>
      <label className='register-label'>
        Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
    </div>
    <div>
      <label className='register-label'>
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
      <label className='register-label'>
        Password:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
    </div>
    <button type="submit" disabled={loading} className='register-button'>
      {loading ? 'Registering...' : 'Register'}
    </button>
    {error && <div className='register-error'>{error}</div>}
    {success && <div className='register-success'>{success}</div>}
  </form>
);

const OtpForm = ({
  otp,
  setOtp,
  otpLoading,
  handleOtpSubmit,
  otpStatus,
  handleResendOtp,
  resendOtpLoading,
}) => (
  <form onSubmit={handleOtpSubmit} className='register-form'>
    <div>
      <label className='register-label'>
        Enter OTP:
        <input
          type="text"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
        />
      </label>
    </div>
    <div className="resend-otp">
      <button type="button" onClick={handleResendOtp} disabled={resendOtpLoading} className='register-button'>
        Resend OTP
      </button>
    </div>
    <button type="submit" disabled={otpLoading} className='register-button'>
      {otpLoading ? 'Verifying OTP...' : 'Verify OTP'}
    </button>
    {otpStatus && (
      <div className='register-otp-status'>
        {otpStatus}
      </div>
    )}
  </form>
);

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otp, setOtp] = useState('');
  const [otpStatus, setOtpStatus] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendOtpLoading, setResendOtpLoading] = useState(false);

  const navigate = useNavigate();
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    setOtpStatus('');
    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/verify-otp', {
        email,
        otp,
      });
      if (res.data.success) {
        setOtpStatus('OTP verified successfully! You can now log in.');
        navigate('/login');
      } else {
        setOtpStatus(res.data.msg || 'OTP verification failed');
      }
    } catch (err) {
      setOtpStatus(err.response.data.msg || 'An error occurred during OTP verification.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/register', {
        email,
        password,
      });
      if (res.data.success) {
        setSuccess('OTP sent to your email');
      } else {
        setError(res.data.msg || 'Registration failed');
      }
    } catch (err) {
      setError(err.response.data.msg || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendOtpLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/v1/auth/resend-otp', { email });
      if (res.data.success) {
        setSuccess('OTP resent to your email');
        alert("OTP resent to your email");
      } else {
        setError(res.data.msg || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError(err.response.data.msg || 'An error occurred. Please try again.');
    } finally {
      setResendOtpLoading(false);
    }
  };

  return (
    <div className='register-container'>
      <h2 className='register-title'>Register</h2>
      {!success ? (
        <RegisterForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          handleSubmit={handleSubmit}
          error={error}
          success={success}
        />
      ) : (
        <OtpForm
          otp={otp}
          setOtp={setOtp}
          otpLoading={otpLoading}
          handleOtpSubmit={handleOtpSubmit}
          otpStatus={otpStatus}
          handleResendOtp={handleResendOtp}
          resendOtpLoading={resendOtpLoading}
        />
      )}
    </div>
  );
};

export default Register;

