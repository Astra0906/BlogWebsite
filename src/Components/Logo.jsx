import React from 'react';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Logo = ({ className = "" }) => {
    const navigate = useNavigate();

    return (
        <div
            className={`flex items-center space-x-2 cursor-pointer ${className}`}
            onClick={() => navigate('/')}
        >
            <FaHome size={28} className="text-white" />
            <span className="text-xl font-cmax font-bold  text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                BlogSite
            </span>
        </div>
    );
    
};

export default Logo;
