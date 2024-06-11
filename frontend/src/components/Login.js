import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../services/UserService';
import './courses/css/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [inactivityTimeout, setInactivityTimeout] = useState(null);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { email, password };
    userLogin(userData)
      .then((response) => {
        setUser(response.data);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        sessionStorage.setItem('userId', response.data.id);
        resetInactivityTimeout(); // Start the inactivity timer after login
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const logoutUser = (reason = 'You have been logged out.') => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userId');
    setUser(null);
    clearInactivityTimeout();
    alert(reason);
    navigate('/login');
  };

  const resetInactivityTimeout = () => {
    if (inactivityTimeout) clearTimeout(inactivityTimeout);
    const timeout = setTimeout(() => {
      logoutUser('You have been logged out due to inactivity.');
    }, 3000000); // Set inactivity timeout to 5 minutes (300000 ms)
    setInactivityTimeout(timeout);
  };

  const clearInactivityTimeout = () => {
    if (inactivityTimeout) clearTimeout(inactivityTimeout);
    setInactivityTimeout(null);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    const resetTimer = () => resetInactivityTimeout();

    events.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearInactivityTimeout();
    };
  }, []);

  useEffect(() => {
    if (!user) {
      clearInactivityTimeout();
    }
  }, [user]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h3 className="login-title">User Login</h3>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              className="form-control"
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              className="form-control"
              onChange={handlePasswordChange}
            />
          </div>
          <button className="btn-submit" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
