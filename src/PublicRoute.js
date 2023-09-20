import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Replace with your own authentication check

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated && restricted ? (
                    window.history.back() // Redirect to previous page if already logged in
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PublicRoute;
