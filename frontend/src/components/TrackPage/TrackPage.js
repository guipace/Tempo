import React, { useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getTrack } from '../../store/track';
import TrackMainInfo from './TrackMainInfo';
import TrackComments from './TrackComments';
import UserCard from './UserCard';
import CommentNew from './CommentNew';


const TrackPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const storeTrack = useSelector(state => state.track.track);
    const sessionUser = useSelector(state => state.session.user);

    //HIT BACKEND ROUTE TO LOAD TRACK INTO STORE
    useEffect(() => {
        dispatch(getTrack(id));
        // return dispatch(removeGenres());
    }, [id, dispatch]);

    if (!sessionUser) return (
        <Redirect to='/login' />
    )

    return (
        <>
            {storeTrack && (
                <>
                    <TrackMainInfo track={storeTrack}/>
                    <div className='grid grid-cols-2'>
                        <UserCard track={storeTrack}/>
                        <CommentNew track={storeTrack} sessionUser={sessionUser}/>
                    </div>
                    <div className='grid grid-cols-2'>
                    <div className='px-16 py-5'>
                        <p>{storeTrack.description}</p>
                    </div>
                        <TrackComments track={storeTrack}/>
                    </div>
                </>
            )}
        </>
    );
}

export default TrackPage;
