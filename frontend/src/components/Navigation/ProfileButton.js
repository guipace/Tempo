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
            <button onClick={openMenu}>
            <i class="fas fa-user-astronaut" />
            </button>
            <span>{user.firstName}</span>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logoutUser}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}
