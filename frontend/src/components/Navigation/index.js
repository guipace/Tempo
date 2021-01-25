import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from './ProfileButton';
import './Navigation.css';

export default function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if(sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to='/login'>Sign-in</NavLink>
                <NavLink to='/signup'>Register</NavLink>
            </>
        );
    }

    return(
        <nav className="w-screen fixed grid grid-cols-8 content-center shadow space-x-4 h-10 bg-gray-300">
            <div className="col-span-1 grid grid-cols-2">
                <span className="text-center font-bold tracking-widest">TEMPO</span>
                <NavLink exact to='/' className="text-center"><i className="fas fa-home"></i> Home</NavLink>
            </div>
            <div  className="col-span-6">
                <form>
                    <input
                        className="w-full pl-1"
                        type='text'
                        placeholder='Search'
                    />
                </form>
            </div>
            <div className="col-span-1 grid grid-cols-2">
                {isLoaded && sessionLinks}
            </div>
        </nav>
    );
}
