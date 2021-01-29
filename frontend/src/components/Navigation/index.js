import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from './ProfileButton';

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
                <div className="flex justify-center items-center text-silver hover:bg-independence hover:text-white">
                    <NavLink to='/login' activeClassName="text-mandarin">Sign-in</NavLink>
                </div>
                <div className="flex justify-center items-center text-silver hover:bg-independence hover:text-white">
                    <NavLink to='/signup' activeClassName="text-mandarin">Register</NavLink>
                </div>
            </>
        );
    }

    return(
        <nav className="w-screen fixed grid grid-cols-8 shadow h-10 bg-space-cadet z-10">
            <div className="col-span-1 grid grid-cols-2">
                <div className="flex justify-center items-center">
                    <span className="font-bold text-silver tracking-widest">TEMPO</span>
                </div>
                <div className="flex justify-center items-center text-silver hover:bg-independence hover:text-white">
                    <NavLink exact to='/' activeClassName="text-mandarin"><i className="fas fa-home"></i> Home</NavLink>
                </div>
            </div>
            <div  className="col-span-5 mx-2 grid grid-cols-1">
                <div className="flex justify-center">
                    <form className="w-full flex items-center">
                        <input
                            className="w-full h-5/6 px-1 rounded"
                            type='text'
                            placeholder='Search'
                        />
                    </form>
                </div>
            </div>
            <div className="col-span-2 grid grid-cols-3">
                {isLoaded && sessionLinks}
            </div>
        </nav>
    );
}
