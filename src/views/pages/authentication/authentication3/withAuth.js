import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../../AuthContext';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
    const WithAuth = (props) => {
        const { token } = useContext(AuthContext);
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            if (!token) {
                // Redirect to the login page if the token is not present
                navigate('/'); // Replace '/' with the URL of your login page
            } else {
                setLoading(false);
            }
        }, [token, navigate]);

        if (loading) {
            // Show a loading screen or spinner while checking the token
            return <div>Loading...</div>;
        } else {
            return <WrappedComponent {...props} />;
        }
    };

    return WithAuth;
};

export default withAuth;
