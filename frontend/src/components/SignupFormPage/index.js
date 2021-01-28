import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login, signupUser } from '../../store/session';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [ username, setUsername ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ websiteUrl, setWebsiteUrl ] = useState('');
  const [ avatarUrl, setAvatarUrl ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ inputErrors, setInputErrors ] = useState([]);

  useEffect(() => {
    const errors = [];

    if(username && username.length < 4) errors.push('Username must have more than 3 characters');
    if(username.length > 30) errors.push('Username must have 30 or fewer characters');
    if(firstName.length > 50) errors.push('First name must have 50 or fewer characters');
    if(lastName.length > 50) errors.push('Last name must have 50 or fewer characters');
    if(email && email.length < 3) errors.push('E-mail must have more than 2 characters');
    if(email.length > 256) errors.push('E-mail must have less than 256 characters');
    if(websiteUrl.length > 500) errors.push('Website URL must have 500 or fewer characters');
    if(avatarUrl.length > 500) errors.push('Avatar URL must have 500 or fewer characters');
    if(confirmPassword && confirmPassword !== password) errors.push("Your password doesn't match");

    setInputErrors(errors);

  }, [username, firstName, lastName, websiteUrl, avatarUrl, email, password, confirmPassword]);

  if (sessionUser) return (
    <Redirect to='/' />
  )

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username,
      firstName,
      lastName,
      email,
      websiteUrl,
      avatarUrl: avatarUrl || '/img/userDefault.png',
      password
    }

    return dispatch(signupUser(user))
      .catch((res) => {
        if (res.data && res.data.errors) setInputErrors(res.data.errors);
      });
  };

  return (
    <div className="w-screen mx-auto h-screen flex flex-col justify-center items-center bg-background2 bg-center bg-cover">
      <form onSubmit={handleSubmit} className="px-8 py-4 w-1/3 mb-4 border-t-8 border-independence rounded-lg shadow-lg bg-white bg-opacity-90">
        <h1 className="block text-2xl text-space-cadet my-2 text-center">Sign-up to <span className="font-bold tracking-widest">TEMPO</span></h1>
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
          First Name
          <input
            type='text'
            placeholder='Enter your first name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="block appearance-none w-full px-2 py-2 rounded shadow"
          />
        </label>
        <label className="block font-bold text-space-cadet mb-2">
          Last Name
          <input
            type='text'
            placeholder='Enter your last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          Website
          <input
            type='text'
            placeholder='Enter your website (optional)'
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="block appearance-none w-full px-2 py-2 rounded shadow"
          />
        </label>
        <label className="block font-bold text-space-cadet mb-2">
          Profile Image
          <input
            type='text'
            placeholder='Enter the URL for an image (optional)'
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
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
        <div className='my-2 flex justify-around'>
                    <button type='submit' className="w-2/6 bg-mandarin hover:bg-mandarin-dark text-white font-bold py-2 px-4 rounded">Register</button>
                    <button type='button' onClick={() => {dispatch(login({ credential: 'DemoUser', password: 'password' }))}} className="w-2/6 bg-mandarin hover:bg-mandarin-dark text-white font-bold py-2 px-4 rounded">Demo User</button>
                </div>
      </form>
      <div className="p-1 bg-white bg-opacity-80 rounded">
                Already have an account?
                <Link to='/login' className="text-mandarin font-medium hover:font-bold"> Click here to log-in</Link>
            </div>
    </div>
  );
};

export default SignupFormPage;
