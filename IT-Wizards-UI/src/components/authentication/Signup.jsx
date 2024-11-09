import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SIGNUP_API } from '../../env/config';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const Signup = ({ register }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUsername] = useState('');
  const [mailId, setMailId] = useState('');
  const [userPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');

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

    if (register !== 'admin') {
      if (!streetAddress || !city || !state || !zipcode) {
        setError('Please fill in all fields.');
        return;
      }
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
        ...(register !== 'admin' && {
          streetAddress,
          city,
          state,
          zipcode
        })
      });
      setLoading(false);
      setFirstName('');
      setLastName('');
      setUsername('');
      setMailId('');
      setPassword('');
      setConfirmPassword('');
      setStreetAddress('');
      setCity('');
      setState('');
      setZipcode('');
      setError('');
      setModalType('success');
      setModalMessage(register === 'admin' ? 'Admin signed up successfully!!' : 'User signed up successfully!!');
      setShowModal(true);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalType === 'success') {
      navigate('/api/users/signin');
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <div className="card shadow-sm" style={{ width: '600px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4 fw-bold">Sign Up</h2>
          {error && <div className="alert alert-danger">{error}</div>}
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
            {register !== 'admin' && (
              <>
                <div className="form-group mb-3">
                  <label htmlFor="streetAddress">Street Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="streetAddress"
                    placeholder="Enter street address including Apt# or Unit#"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="Enter state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zipcode"
                      placeholder="Enter zipcode"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                      required
                      pattern="\d{5}"
                      title="Please enter a 5 digit numeric value"
                    />
                  </div>
                </div>
              </>
            )}
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
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header>
          <Modal.Title>{modalType === 'success' ? 'Success' : 'Error'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary btn-block" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Signup;