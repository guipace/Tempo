import React, { useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAUser } from '../../store/session';
import UserMainInfo from './UserMainInfo';
import TrackCard from './TrackCard';

const UserPage = () => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const targetUser = useSelector(state => state.session.targetUser);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAUser(username));
        // return dispatch(removeGenres());
    }, [username, dispatch]);

    if (!sessionUser) return (
        <Redirect to='/login' />
    )

    return (
        <>
            {targetUser && (
            <div className='mt-10 flex-1'>
                <UserMainInfo user={targetUser}/>
                <div className='p-10'>
                    <h1 className='text-4xl text-mandarin pl-5 py-2 bg-gradient-to-r from-silver via-white to-white rounded'>Your Tracks</h1>
                    <div className='px-5'>
                        {targetUser.Tracks.map((track => <TrackCard key={track.id} track={track}/>))}
                    </div>
                </div>
            </div>
            )}
        </>
    );
}

export default UserPage;
