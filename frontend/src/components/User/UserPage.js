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
            <>
                <UserMainInfo user={targetUser}/>
                <div className=''>
                    <h1 className=''>Your Tracks</h1>
                    {/* <TrackCard user={targetUser}/> */}
                </div>
            </>
            )}
        </>
    );
}

export default UserPage;
