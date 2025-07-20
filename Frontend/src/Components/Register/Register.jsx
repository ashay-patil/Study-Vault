import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  <form onSubmit={handleSubmit}>
    <div style={{ marginBottom: 12 }}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </label>
    </div>
    <div style={{ marginBottom: 12 }}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </label>
    </div>
    <div style={{ marginBottom: 12 }}>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </label>
    </div>
    <button type="submit" disabled={loading} style={{ padding: 8, width: '100%' }}>
      {loading ? 'Registering...' : 'Register'}
    </button>
    {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
    {success && <div style={{ color: 'green', marginTop: 12 }}>{success}</div>}
  </form>
);

const OtpForm = ({
  otp,
  setOtp,
  otpLoading,
  handleOtpSubmit,
  otpStatus,
}) => (
  <form onSubmit={handleOtpSubmit}>
    <div style={{ marginBottom: 12 }}>
      <label>
        Enter OTP:
        <input
          type="text"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </label>
    </div>
    <button type="submit" disabled={otpLoading} style={{ padding: 8, width: '100%' }}>
      {otpLoading ? 'Verifying OTP...' : 'Verify OTP'}
    </button>
    {otpStatus && (
      <div style={{ color: otpStatus.includes('success') ? 'green' : 'red', marginTop: 12 }}>
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
      setOtpStatus('An error occurred during OTP verification.');
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
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 24 }}>
      <h2>Register</h2>
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
        />
      )}
    </div>
  );
};

export default Register;

