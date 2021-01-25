import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signupUser } from '../../store/session';
import './SignupFormPage.css';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ inputErrors, setInputErrors ] = useState([]);

  useEffect(() => {
    const errors = [];

    if(username && username.length < 4) errors.push('Username must have more than 4 characters');
    if(username.length > 30) errors.push('Username must have less than 30 characters');
    if(email && email.length < 3) errors.push('E-mail must have more than 3 characters');
    if(email.length > 256) errors.push('E-mail must have less than 256 characters');
    if(confirmPassword && confirmPassword !== password) errors.push("Your password doesn't match");

    setInputErrors(errors);

  }, [username, email, confirmPassword]);

  if (sessionUser) return (
    <Redirect to='/' />
  )

  const handleSubmit = async (e) => {
    e.preventDefault();

    return dispatch(signupUser({ username, email, password }))
      .catch((res) => {
        if (res.data && res.data.errors) setInputErrors(res.data.errors);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {inputErrors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username
        <input
          type='text'
          placeholder='Enter your username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        E-mail
        <input
          type='search'
          placeholder='Enter your e-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type='password'
          placeholder='Confirm your password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type='submit'>Sign-In</button>
    </form>
  );
};

export default SignupFormPage;
