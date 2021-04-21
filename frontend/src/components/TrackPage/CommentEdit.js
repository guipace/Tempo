import React from 'react';
import { useDispatch } from 'react-redux';
import { editComment } from '../../store/track';

const CommentEdit = ({track, sessionUser, setEditActive, updatedComment, setUpdatedComment, updatedCommentId, setUpdatedCommentId }) => {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(editComment(track.id, updatedCommentId, updatedComment));
        setEditActive(false);
    };

    return (
        <>
            {track.User &&
            <>
                <div className='self-center	pl-10 pr-10 pt-10'>
                    <form onSubmit={handleSubmit} className="flex flex-row border-independence items-center rounded-lg">
                        <img src={sessionUser.avatarUrl} alt='User' className='h-10 w-10 mr-4 rounded-full'></img>
                        <textarea
                                placeholder='Post a comment'
                                value={updatedComment}
                                onChange={(e) => setUpdatedComment(e.target.value)}
                                required
                                className="appearance-none flex-grow px-2 py-2 h-10 mr-4 rounded shadow"
                        />
                        <button type='submit' className="bg-mandarin hover:bg-mandarin-dark text-white font-bold py-2 px-4 rounded">Update</button>
                    </form>
                </div>
            </>
            }
        </>
    );
}

export default CommentEdit;
