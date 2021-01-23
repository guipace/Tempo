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
        <form onSubmit={handleSubmit}>
            <ul>
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
    );
}

export default LoginFormPage;
