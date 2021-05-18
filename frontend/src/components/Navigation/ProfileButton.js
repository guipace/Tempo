import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import { logout } from '../../store/session';

export default function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [ showMenu, setShowMenu ] = useState(false);

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logoutUser = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <>
            <div className="flex justify-center items-center text-silver hover:bg-independence hover:text-white">
                <NavLink exact to='/upload' activeClassName="text-mandarin"><i className="fas fa-plus"></i> Upload</NavLink>
            </div>
            <div className="flex justify-center items-center text-silver">
                <span>{`Hi, ${sessionUser.firstName}!`}</span>
            </div>
            <div onClick={openMenu} className="flex justify-center items-center text-silver hover:bg-independence hover:text-white">
                <i className="fas fa-user-astronaut" />
            </div>
            {showMenu && (
                <ul className="profile-dropdown fixed top-10 right-0 bg-space-cadet text-silver">
                    <Link to={`/user/${sessionUser.username}`}><li className="p-2 hover:bg-independence hover:text-white cursor-pointer">My Profile</li></Link>
                    <li className="p-2">{`Username: ${sessionUser.username}`}</li>
                    <li className="p-2">{`E-mail: ${sessionUser.email}`}</li>
                    <li onClick={logoutUser} className="p-2 hover:bg-independence hover:text-white cursor-pointer">Log Out</li>
                </ul>
            )}
        </>
    );
}
