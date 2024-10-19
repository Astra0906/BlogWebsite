import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Notfound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1200, offset: 50, easing: 'ease-in-out', mirror: true });
        AOS.refresh();
    }, []);

    const goHome = () => navigate('/');

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6 py-12">
            <div className="text-center" data-aos="zoom-in">
                <h1 className="text-9xl font-extrabold text-red-500 mb-4">404</h1>
                <h2 className="text-4xl font-bold mb-6">
                    Page Not Found
                </h2>
                <p className="text-lg mb-8">
                    Oops! The page you are looking for doesn’t exist or has been moved.
                </p>
                <button
                    onClick={goHome}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default Notfound;
