import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
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
    <div className="w-screen mx-auto h-screen flex flex-col justify-center items-center bg-background2 bg-center bg-cover">
      <form onSubmit={handleSubmit} className="px-8 py-4 w-1/3 mb-4 border-t-8 border-independence rounded-lg shadow-lg bg-white bg-opacity-90">
        <h1 className="block text-2xl text-space-cadet my-2 text-center">Sign-up to Tempo</h1>
        <ul id="login-errors" className="block my-2 text-center text-red-600 font-bold">
          {inputErrors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className="block font-bold text-space-cadet mb-2">
          Username
          <input
            type='text'
            placeholder='Enter your username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="block appearance-none w-full px-2 py-2 rounded shadow"
          />
        </label>
        <label className="block font-bold text-space-cadet mb-2">
          E-mail
          <input
            type='search'
            placeholder='Enter your e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block appearance-none w-full px-2 py-2 rounded shadow"
          />
        </label>
        <label className="block font-bold text-space-cadet mb-2">
          Password
          <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block appearance-none w-full px-2 py-2 rounded shadow"
          />
        </label>
        <label className="block font-bold text-space-cadet mb-2">
          Confirm Password
          <input
            type='password'
            placeholder='Confirm your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="block appearance-none w-full px-2 py-2 rounded shadow"
          />
        </label>
        <button type='submit' className="bg-mandarin hover:bg-mandarin-dark text-white font-bold py-2 px-4 rounded">Sign-In</button>
      </form>
      <div className="p-1 bg-white bg-opacity-80 rounded">
                Already have an account?
                <Link to='/login' className="text-mandarin font-medium hover:font-bold"> Click here to log-in</Link>
            </div>
    </div>
  );
};

export default SignupFormPage;
