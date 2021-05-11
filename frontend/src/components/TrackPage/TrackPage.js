import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getTrack } from '../../store/track';
import TrackMainInfo from './TrackMainInfo';
import TrackComments from './TrackComments';
import UserCard from './UserCard';
import CommentNew from './CommentNew';
import CommentEdit from './CommentEdit';


const TrackPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const storeTrack = useSelector(state => state.track.track);
    const sessionUser = useSelector(state => state.session.user);
    const [ editActive, setEditActive ] = useState(false);
    const [ updatedComment, setUpdatedComment ] = useState('');
    const [ updatedCommentId, setUpdatedCommentId ] = useState('');

    //HIT BACKEND ROUTE TO LOAD TRACK INTO STORE
    useEffect(() => {
        dispatch(getTrack(id));
    }, [id, dispatch]);

    if (!sessionUser) return (
        <Redirect to='/login' />
    )

    return (
        <>
            {storeTrack && (
                <div className='mt-10 flex-1'>
                    <TrackMainInfo track={storeTrack}/>
                    <div className='grid grid-cols-2'>
                        <UserCard track={storeTrack}/>
                        {editActive ? <CommentEdit setEditActive={setEditActive} updatedComment={updatedComment} setUpdatedComment={setUpdatedComment} updatedCommentId={updatedCommentId} setUpdatedCommentId={setUpdatedCommentId} track={storeTrack} sessionUser={sessionUser}/> : <CommentNew track={storeTrack} sessionUser={sessionUser}/>}
                    </div>
                    <div className='grid grid-cols-2'>
                    <div className='px-16 py-5'>
                        <p>{storeTrack.description}</p>
                    </div>
                        <TrackComments setUpdatedComment={setUpdatedComment} setUpdatedCommentId={setUpdatedCommentId} setEditActive={setEditActive} track={storeTrack} sessionUser={sessionUser}/>
                    </div>
                </div>
            )}
        </>
    );
}

export default TrackPage;
