import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, Authentication = true }) {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (Authentication && !authStatus) {
            // If the route requires authentication but the user is not authenticated, redirect to login.
            navigate('/login');
        } else if (!Authentication && authStatus) {
            // If the user is authenticated but accessing a public route (like login/signup), redirect to home.
            navigate('/');
        } else {
            // If everything is fine, stop loading.
            setLoading(false);
        }
    }, [navigate, authStatus, Authentication]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return <>{children}</>;
}
