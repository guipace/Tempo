import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Player from './components/Player';
import Footer from './components/Footer';
import Upload from './components/Upload';
import TrackPage from './components/TrackPage';
import UserPage from './components/User';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
  const currentTrack = useSelector(state => state.player.currentTrack);
  const [ isLoaded, setIsLoaded ] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded}/>
      <div id='placeholder-for-navbar' className='h-10'></div>
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Home />
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
          <Route path={`/tracks/:id(\\d+)`}>
            <TrackPage />
          </Route>
          <Route>
            <h1 className='text-2xl'>PAGE NOT FOUND</h1>
          </Route>
        </Switch>
      )}
      <Footer />
      {currentTrack && <Player />}
    </>
  );
}

export default App;
