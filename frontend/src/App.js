import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import LandingPage from './components/LandingPage';
import Navigation from './components/Navigation';
import Player from './components/Player';
import Footer from './components/Footer';
import Upload from './components/Upload';
import TrackPage from './components/TrackPage';
import UserPage from './components/User';
import { restoreUser } from './store/session';
import EditTrack from './components/Edit/EditTrack';

function App() {
  const dispatch = useDispatch();
  const currentTrack = useSelector(state => state.player.currentTrack);
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <div className='flex flex-col h-screen'>
      <Navigation isLoaded={isLoaded}/>
      {/* <div id='placeholder-for-navbar' className='h-10'></div> */}
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/upload'>
            <Upload />
          </Route>
          <Route path='/user/:username'>
            <UserPage />
          </Route>
          <Route exact path={`/tracks/:id(\\d+)`}>
            <TrackPage />
          </Route>
          <Route path={`/tracks/:id(\\d+)/edit`}>
            <EditTrack />
          </Route>
          <Route>
            <h1 className='text-2xl'>PAGE NOT FOUND</h1>
          </Route>
        </Switch>
      )}
      <Footer />
      {currentTrack && <Player />}
    </div>
  );
}

export default App;
