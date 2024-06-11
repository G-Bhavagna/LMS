import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adduser, getUserById, updateUser } from '../../services/AdminService';

const AddOrUpdateuser = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((response) => {
          setUser(response.data);
          setUserName(response.data.username);
          setUserEmail(response.data.email);
          setUserPassword(response.data.password);
          setUserRole(response.data.role);
          setUserPhone(response.data.phone);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [userId]);

  const handleSaveOrUpdate = (event) => {
    event.preventDefault();
    const userData = {
      username: userName,
      email: userEmail,
      password: userPassword,
      role: userRole,
      phone: userPhone,
    };
    if (userId) {
      updateUser(userId, userData)
        .then(() => {
          navigate('/'); // Redirect to user list page or another relevant page
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    } else {
      adduser(userData)
        .then(() => {
          navigate('/'); // Redirect to user list page or another relevant page
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
    console.log('User:', userData);
  };

  return (
    <div>
      <h2>{userId ? 'Update User' : 'Add User'}</h2>
      <form onSubmit={handleSaveOrUpdate}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
            className="form-control"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {userId ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default AddOrUpdateuser;
