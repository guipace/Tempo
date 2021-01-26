import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { signupUser } from '../../store/session';

const Upload = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ genreId, setGenreId ] = useState('');
    const [ imageUrl, setImageUrl ] = useState('');
    const [ awsUrl, setAwsUrl ] = useState('');
    const [ trackFile, setTrackFile ] = useState(null);
    const [ inputErrors, setInputErrors ] = useState([]);

    useEffect(() => {
        const errors = [];

        if(title.length > 30) errors.push('Title must have 30 or fewer characters');
        if(imageUrl.length > 100) errors.push('Image URL must have 100 or fewer characters');

        setInputErrors(errors);

    }, [title, imageUrl]);

    if (!sessionUser) return (
        <Redirect to='/login' />
    )

    // TODO: FINISH HANDLE SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();

        const track = {
            title,
            description,
            imageUrl,
            awsUrl,
            userId: sessionUser.id,
            genreId,
        }

        return dispatch(signupUser({ title }))
            .catch((res) => {
                if (res.data && res.data.errors) setInputErrors(res.data.errors);
            });
    };

    return (
        <div className="w-screen mx-auto h-screen flex flex-col justify-center items-center bg-background2 bg-center bg-cover">
        <form onSubmit={handleSubmit} className="px-8 py-4 w-1/3 mb-4 border-t-8 border-independence rounded-lg shadow-lg bg-white bg-opacity-90">
            <h1 className="block text-2xl text-space-cadet my-2 text-center">Upload a new track</h1>
            <ul id="login-errors" className="block my-2 text-center text-red-600 font-bold">
            {inputErrors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label className="block font-bold text-space-cadet mb-2">
            Title
                <input
                    type='text'
                    placeholder='Enter the title of the track'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="block appearance-none w-full px-2 py-2 rounded shadow"
                />
            </label>
            <label className="block font-bold text-space-cadet mb-2">
            Description
                <textarea
                    placeholder='Enter a description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="block appearance-none w-full px-2 py-2 rounded shadow"
                />
            </label>
            <label className="block font-bold text-space-cadet mb-2">
            Genre
                <select
                    placeholder='Enter a description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="block appearance-none w-full px-2 py-2 rounded shadow"
                >
                    {'TODO: OPTIONS'}
                </select>
            </label>
            <label className="block font-bold text-space-cadet mb-2">
            Track Image
                <input
                    type='text'
                    placeholder='Enter the URL for an image (optional)'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="block appearance-none w-full px-2 py-2 rounded shadow"
                />
            </label>
            <label className="block font-bold text-space-cadet mb-2">
            Audio File
                <input
                    type='file'
                    onChange={(e) => setTrackFile(e.target.value)}
                    required
                    className="block appearance-none w-full bg-white px-2 py-2 rounded shadow"
                />
            </label>
            <div className='my-2 flex justify-around'>
                <button type='submit' className="w-2/6 bg-mandarin hover:bg-mandarin-dark text-white font-bold py-2 px-4 rounded">Upload</button>
            </div>
        </form>
    </div>
    );
};

export default Upload;
