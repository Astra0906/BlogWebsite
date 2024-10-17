import React, { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaClipboardList, FaPlusCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import LogoutBtn from './Logout';
import './Header.css';
import Logo from '../Logo';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { name: 'Home', slug: '/', icon: <FaHome />, active: true },
        { name: 'Posts', slug: '/all-posts', icon: <FaClipboardList />, active: true },
        { name: 'Add Post', slug: '/add-post', icon: <FaPlusCircle />, active: authStatus },
    ];

    const navLog = [
        { name: 'Home', slug: '/', icon: <FaHome />, active: true },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'Signup', slug: '/signup', active: !authStatus },
    ];

    const linkClass = ({ isActive }) =>
        isActive ? 'nav-item text-teal-300' : 'nav-item hover:text-teal-300';

    return (
        <>
            <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <Logo/>

                <nav className="hidden lg:flex space-x-6">
                    {authStatus && navItems.map(
                        (item) =>
                            item.active && (
                                <NavLink
                                    key={item.slug}
                                    to={item.slug}
                                    className={linkClass}
                                >
                                    <div className="flex items-center space-x-2">
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </div>
                                </NavLink>
                            )
                    )}
                    {!authStatus && navLog.map(
                        (item) =>
                            item.active && (
                                <NavLink
                                    key={item.slug}
                                    to={item.slug}
                                    className={linkClass}
                                >
                                    <div className="flex items-center space-x-2">
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </div>
                                </NavLink>
                            )
                    )}


                    {authStatus ? (
                        <LogoutBtn />
                    ) : 
                    null}
                </nav>

                <div className="lg:hidden">
                    <button onClick={toggleSidebar}>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </header>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
                    <div className="absolute left-0 top-0 w-64 h-full bg-white p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-2xl font-bold text-teal-500">BlogSite</div>
                            <button onClick={toggleSidebar}>
                                <FaTimes size={24} className="text-teal-500" />
                            </button>
                        </div>

                        <nav className="flex flex-col space-y-4">
                            {navItems.map(
                                (item) =>
                                    item.active && (
                                        <NavLink
                                            key={item.slug}
                                            to={item.slug}
                                            className={linkClass}
                                            onClick={toggleSidebar}
                                        >
                                            <div className="flex items-center space-x-2">
                                                {item.icon}
                                                <span>{item.name}</span>
                                            </div>
                                        </NavLink>
                                    )
                            )}

                            {authStatus && (
                                <>
                                    <NavLink
                                        to="/profile"
                                        className={linkClass}
                                        onClick={toggleSidebar}
                                    >
                                        Profile
                                    </NavLink>
                                    <NavLink
                                        to="/my-posts"
                                        className={linkClass}
                                        onClick={toggleSidebar}
                                    >
                                        My Posts
                                    </NavLink>
                                    <LogoutBtn />
                                </>
                            )}

                            {!authStatus &&
                                navLog.map(
                                    (item) =>
                                        item.active && (
                                            <NavLink
                                                key={item.slug}
                                                to={item.slug}
                                                className={linkClass}
                                                onClick={toggleSidebar}
                                            >
                                                {item.name}
                                            </NavLink>
                                        )
                                )}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
