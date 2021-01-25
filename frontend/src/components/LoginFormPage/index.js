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
        <div className="w-screen mx-auto h-screen flex justify-center items-center bg-background2 bg-center bg-cover">
            <form onSubmit={handleSubmit} className="w-1/3 flex flex-col border shadow-lg bg-white bg-opacity-90">
                <h1 className="text-2xl font-thin mb-6 mt-2 text-center">Log-in to Tempo</h1>
                <ul id="login-errors">
                    {inputErrors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Sign-in Credential
                    <input
                        type='text'
                        placeholder='Enter your username or e-mail'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
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
                <button type='submit'>Sign-In</button>
            </form>
        </div>
    );
}

export default LoginFormPage;
