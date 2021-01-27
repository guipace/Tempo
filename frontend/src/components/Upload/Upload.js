import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getGenres, removeGenres } from '../../store/ui';
import { newTrack } from '../../store/track';

const Upload = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const genres = useSelector(state => state.ui.genres);
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ genreId, setGenreId ] = useState('');
    const [ imageUrl, setImageUrl ] = useState('');
    const [ trackFile, setTrackFile ] = useState(null);
    const [ inputErrors, setInputErrors ] = useState([]);

    // TODO: COMPLETE VALIDATION ERRORS
    useEffect(() => {
        const errors = [];

        if(title.length > 30) errors.push('Title must have 30 or fewer characters');
        if(imageUrl.length > 100) errors.push('Image URL must have 100 or fewer characters');

        setInputErrors(errors);

    }, [title, imageUrl]);

    useEffect(() => {
        dispatch(getGenres());

        return dispatch(removeGenres());
    }, [dispatch]);

    if (!sessionUser) return (
        <Redirect to='/login' />
    )

    const handleSubmit = async (e) => {
        e.preventDefault();

        // VALID FILE EXTENSIONS
        // WAV, FLAC, AIFF, ALAC, OGG, MP2, MP3, AAC, AMR, WMA

        const track = {
            title,
            description,
            imageUrl,
            trackFile,
            userId: sessionUser.id,
            genreId,
        }

        console.log('HANDLESUBMIT', trackFile, track);

        dispatch(newTrack(track))
            .catch((res) => {
                if (res.data && res.data.errors) setInputErrors(res.data.errors);
            });

        // TODO: REDIRECT TO NEW TRACK
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
                    value={genreId}
                    onChange={(e) => setGenreId(e.target.value)}
                    required
                    className="block appearance-none w-full px-2 py-2 rounded shadow"
                >
                    <option value="" disabled hidden>Choose genre</option>
                    {genres.map((genre) => {
                        return (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        )
                    })}
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
                    onChange={(e) => setTrackFile(e.target.files[0])}
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
