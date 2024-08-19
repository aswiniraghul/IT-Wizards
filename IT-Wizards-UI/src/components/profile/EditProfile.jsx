import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../src/EditProfile.css";
import { USERS_API } from "../../env/config";
import AddressForm from '../../components/AddressForm';

const EditProfile = () => {
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    userName: "",
    mailId: "",
    userPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("user");
        const response = await axios.get(`${USERS_API}/${userId}`);
        setUserData(response.data);
      } catch (error) {
        setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleFocus = (e) => {
    if (e.target.name === "userPassword") {
      setUserData((prevUserData) => ({
        ...prevUserData,
        userPassword: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userId = localStorage.getItem("user");
      await axios.put(`${USERS_API}/${userId}`, userData);
      setLoading(false);
      setSuccess("Changes updated successfully.");
    } catch (error) {
      setLoading(false);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleDelete = async () => {
    setShowDeleteModal(false);
    setLoading(true);
    try {
      const userId = localStorage.getItem("user");
      await axios.delete(`${USERS_API}/${userId}`);
      localStorage.removeItem("user");
      setLoading(false);
      setSuccess("Profile deleted successfully.");
      navigate("/");
      window.location.reload();
    } catch (error) {
      setLoading(false);
      setError("Failed to delete profile. Please try again.");
    }
  };

  return (
    <>
    
      <div className="container mt-4">
        <h2 className="edit-profile-heading">Edit Profile</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="userName" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control form-field"
                id="userName"
                name="userName"
                value={userData.userName}
                onChange={handleChange}
                required
                disabled
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="mailId" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control form-field"
                id="mailId"
                name="mailId"
                value={userData.mailId}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control form-field"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control form-field"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control form-field"
              id="password"
              name="userPassword"
              value={userData.userPassword}
              onChange={handleChange}
              onFocus={handleFocus}
              required
            />
          </div>
          <div className="font-extrabold underline pb-3 pt-6">Address Info</div>
          <AddressForm />
          <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="btn btn-danger ms-2 mt-4"
            onClick={() => setShowDeleteModal(true)}
            disabled={loading}
          >
            Delete Profile
          </button>
        </form>
      </div>

      <div
        className={`modal fade ${showDeleteModal ? "show" : ""}`}
        style={{ display: showDeleteModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden={!showDeleteModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowDeleteModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete your profile? This action cannot
              be undone.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;