import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginFormPage.css';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [ credential, setCredential ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ inputErrors, setInputErrors ] = useState([]);

    if (sessionUser) return (
        <Redirect to='/' />
    )

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInputErrors([]);

        return dispatch(login({ credential, password }))
            .catch((res) => {
                if (res.data && res.data.errors) setInputErrors(res.data.errors);
            });
    };

    return (
        <div className="w-screen mx-auto h-screen flex flex-col justify-center items-center bg-background2 bg-center bg-cover">
            <form onSubmit={handleSubmit} className="px-8 py-4 w-1/3 mb-4 border-t-8 border-independence rounded-lg shadow-lg bg-white bg-opacity-90">
                <h1 className="block text-2xl text-space-cadet my-2 text-center">Log-in to Tempo</h1>
                <ul id="login-errors" className="block my-2 text-center text-red-600 font-bold">
                    {inputErrors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label className="block font-bold text-space-cadet mb-2">
                    Username or E-mail
                    <input
                        type='text'
                        placeholder='Enter your username or e-mail'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
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
                        className="block appearance-none w-full hover:border-grey px-2 py-2 rounded shadow"
                    />
                </label>
                <button type='submit' className="bg-mandarin hover:bg-red-800 text-white font-bold py-2 px-4 rounded">Sign-In</button>
            </form>
            <div className="">Don't have an account? Click here to join Tempo.</div>
        </div>
    );
}

export default LoginFormPage;
