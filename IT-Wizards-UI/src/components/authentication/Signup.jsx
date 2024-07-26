import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SIGNUP_API } from '../../env/config';
import { useNavigate } from 'react-router-dom';

const Signup = ({ register }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUsername] = useState('');
  const [mailId, setMailId] = useState('');
  const [userPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !userName ||
      !mailId ||
      !userPassword ||
      !confirmPassword
    ) {
      setError('Please fill in all fields.');
      return;
    }
    if (userPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(SIGNUP_API, {
        firstName,
        lastName,
        userName,
        mailId,
        userPassword,
        loginRole: register === 'admin' ? 'admin' : 'user',
      });
      setLoading(false);
      setFirstName('');
      setLastName('');
      setUsername('');
      setMailId('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      if (register === 'admin') {
        setSuccess('Admin signed up successfully');
      } else {
        setSuccess('User signed up successfully');
      }
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
    navigate('/api/users/signin');
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <div className="card shadow-sm" style={{ width: '600px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4 fw-bold">Sign Up</h2>
          {error !== '' ? (
            <div className="alert alert-danger">{error}</div>
          ) : success ? (
            <div className="alert alert-success">{success}</div>
          ) : (
            <></>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter desired user name"
                  value={userName}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter valid email address"
                  value={mailId}
                  onChange={(e) => setMailId(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={userPassword}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
          <div className="text-center mt-3">
            <p>
              Already have an account?{' '}
              <a href="/api/users/signin" className="link-primary text-decoration-underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
