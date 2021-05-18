import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const LandingPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    // TODO: Load recent tracks into Redux
  }, [])

  if (!sessionUser) {
    return (<Redirect to='/login' />)
  }

  return (
    <div className='mt-10 flex-1'>
      <div className='h-40 bg-gradient-to-t from-white via-independence to-space-cadet'></div>
        <h1 className='mx-10 text-4xl text-mandarin pl-5 py-2 bg-gradient-to-r from-silver via-white to-white rounded'>Recently Uploaded Tracks</h1>
        <div className='px-5'>
          {/* {targetUser.Tracks.map((track => <TrackCard key={track.id} track={track}/>))} */}
        </div>
    </div>
  )
}

export default LandingPage;
