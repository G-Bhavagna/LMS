import React, { useState } from 'react';
import { adduser } from '../services/UserService';
import './courses/css/RegistrationForm.css';

function RegistrationForm() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState({ username: '', email: '', phone: '', password: '', password2: '' });

  function handleUserName(e) {
    setUserName(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handlePassword2(e) {
    setPassword2(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePhone(e) {
    setPhone(e.target.value);
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    const isValidPhone = /^\d{10}$/;
    const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

    if (username.length < 5) {
      errorsCopy.username = 'Username must be at least 5 characters long';
      valid = false;
    }
    if (!email.includes('@')) {
      errorsCopy.email = 'Email must contain @';
      valid = false;
    }
    if (!phone.match(isValidPhone) || phone.length < 10) {
      errorsCopy.phone = 'Phone must be at least 10 characters long and contain only numbers';
      valid = false;
    }
    if (!password.match(isValidPassword) || !password2.match(isValidPassword) || password !== password2) {
      errorsCopy.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*)';
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function save(e) {
    e.preventDefault();
    if (validateForm()) {
      let user = { username, password, email, phone };
      adduser(user).then((response) => {
        console.log(response.data);
      });
    } else {
      console.log('Invalid');
    }
  }

  return (
    <div className='registration-container'>
      <div className='registration-card'>
        <h3 className='registration-title'>User Registration</h3>
        <form onSubmit={save} className='registration-form'>
          <div className='form-group'>
            <label className='form-label'>Username</label>
            <input
              type='text'
              placeholder='Enter Username'
              value={username}
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              onChange={handleUserName}
            />
            {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
          </div>
          <div className='form-group'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              placeholder='Enter Email'
              value={email}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              onChange={handleEmail}
            />
            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
          </div>
          <div className='form-group'>
            <label className='form-label'>Phone</label>
            <input
              type='text'
              placeholder='Enter Phone'
              value={phone}
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              onChange={handlePhone}
            />
            {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
          </div>
          <div className='form-group'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              placeholder='Enter Password'
              value={password}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              onChange={handlePassword}
            />
            {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
          </div>
          <div className='form-group'>
            <label className='form-label'>Confirm Password</label>
            <input
              type='password'
              placeholder='Confirm Password'
              value={password2}
              className={`form-control ${errors.password2 ? 'is-invalid' : ''}`}
              onChange={handlePassword2}
            />
            {errors.password2 && <div className='invalid-feedback'>{errors.password2}</div>}
          </div>
          <button className='btn-submit' type='submit'>Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
