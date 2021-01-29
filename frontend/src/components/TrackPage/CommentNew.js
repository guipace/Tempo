import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const CommentNew = ({track, sessionUser}) => {
    const dispatch = useDispatch();

    const [ content, setContent ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = {
            content,
            userId: sessionUser.id,
            trackId: track.id,
        }

        // const trackDispatch = await dispatch(newTrack(newComment))
    };

    return (
        <>
            <div className='self-center	pl-10 pr-10 pt-10'>
                <form onSubmit={handleSubmit} className="flex flex-row border-independence items-center rounded-lg">
                    <img src={track.User.avatarUrl} alt='User' className='h-10 w-10 mr-4 rounded-full'></img>
                    <textarea
                            placeholder='Post a comment'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="appearance-none flex-grow px-2 py-2 h-10 mr-4 rounded shadow"
                    />
                    <button type='submit' className="bg-mandarin hover:bg-mandarin-dark text-white font-bold py-2 px-4 rounded">Comment</button>
                </form>
            </div>
        </>
    );
}

export default CommentNew;
