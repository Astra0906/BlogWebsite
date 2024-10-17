import React from 'react';
import authservice from '../../appwrite/auth';
import authSlice, { logout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

const LogoutBtn = ({ onLogout }) => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        authservice.logout().then(
            () => dispatch(logout())
        ).catch(
            () => alert("Logout Failed")
        )
    };

    return (
        <button
            onClick={handleLogout}
            className="rounded-xl bg-blue-400 px-4 py-2 text-white hover:bg-red-600"
        >
            Logout
        </button>
    );
};

export default LogoutBtn;
