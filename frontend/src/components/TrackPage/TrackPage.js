import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getTrack } from '../../store/track';
import TrackMainInfo from './TrackMainInfo';
import TrackDescription from './TrackDescription';
import TrackComments from './TrackComments';


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
    // debugger;
    return (
        <>
            {storeTrack && (
            <>
                <TrackMainInfo track={storeTrack} user={sessionUser}/>
                <div className='grid grid-cols-2'>
                    <TrackDescription track={storeTrack}/>
                    <TrackComments track={storeTrack}/>
                </div>
            </>
            )}
        </>
    );
}

export default TrackPage;
