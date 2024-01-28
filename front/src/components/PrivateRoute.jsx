import { Navigate } from 'react-router-dom';
import { isLogged } from '../helpers/AuthHandler';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ children }) => {
    const logged = isLogged();

    return logged ? children : <Navigate to="/signin" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};