import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { LOGIN_API } from "../../env/config";

const Login = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [userPassword, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    
    const disableNavigation = (event) => {
      event.preventDefault();
      window.history.pushState(null, null, window.location.href);
    };

    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", disableNavigation);

    return () => {
      window.removeEventListener("popstate", disableNavigation);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !userPassword) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(LOGIN_API, { userName, userPassword });

      localStorage.setItem("user", response.data.userName);
      localStorage.setItem("userRole", response.data.loginRole);

      setLoading(false);
      setUserName("");
      setPassword("");
      setError("");
      window.location.reload(navigate("/"))
      setAuthenticated(true);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="mb-4 fw-bold display-6">Welcome to B.R.E.W.S</h1>
      <div className="card shadow-sm" style={{ width: "400px" }}>
        <div className="card-body">
          <h2 className="text-center mb-4 fw-bold">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={userPassword}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
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
                "Login"
              )}
            </button>
          </form>
          <div className="text-center mt-2">
            <p>
              Don't have an account? <a href="/api/users/signup" className="link-primary text-decoration-underline">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
