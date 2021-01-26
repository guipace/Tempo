import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Upload from './components/Upload';
import { restoreUser } from './store/session';

function App() {
  const dispatch = useDispatch();
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
            {/* TODO: COMPLETE HOME ROUTE */}
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
          <Route path='/user/:id'>
            {/* TODO: COMPLETE ROUTE */}
          </Route>
          <Route path='/track/:id'>
            {/* TODO: COMPLETE ROUTE */}
          </Route>
          <Route>
            <h1>PAGE NOT FOUND</h1>
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
