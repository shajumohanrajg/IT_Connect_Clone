// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const WithAuth = (WrappedComponent) => {
//     const navigate = useNavigate();
//     const WithAuthComponent = (props) => {
//         useEffect(() => {
//             // Perform authentication check or other logic here
//             const token = localStorage.getItem('token');

//             // Redirect if not authenticated
//             if (!token) {
//                 // You can redirect to a login page or any other route
//                 navigate('/');
//                 //props.history.push('/login');
//             }
//         }, []);

//         return <WrappedComponent {...props} />;
//     };

//     return WithAuthComponent;
// };

// export default WithAuth;

//import React, { useEffect } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
    const WithAuth = (props) => {
        //const history = useHistory();
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);
        useEffect(() => {
            const authToken = localStorage.getItem('token');

            if (!authToken) {
                // Redirect to login page if authToken is not present
                navigate('/'); // Replace '/login' with the URL of your login page
            } else {
                setLoading(false);
            }
        }, [navigate]);

        if (loading) {
            // Show a loading screen or spinner while checking the authentication token
            return <div>Loading...</div>;
        } else {
            return <WrappedComponent {...props} />;
        }
    };

    return WithAuth;
};

export default withAuth;
