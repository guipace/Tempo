import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

export default function ProfileButton({ user }) {
    const dispatch = useDispatch();
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
            <div onClick={openMenu} className="flex justify-center items-center text-silver hover:bg-independence hover:text-white">
                <i class="fas fa-user-astronaut" />
            </div>
            <div className="flex justify-center items-center text-silver">
                <span>{`Hi, ${user.firstName}!`}</span>
            </div>
            {showMenu && (
                <ul className="profile-dropdown fixed top-10 bg-space-cadet text-silver">
                    <li className="p-2">{`Username: ${user.username}`}</li>
                    <li className="p-2">{`E-mail: ${user.email}`}</li>
                    <li onClick={logoutUser} className="p-2 hover:bg-independence hover:text-white">Log Out</li>
                </ul>
            )}
        </>
    );
}
