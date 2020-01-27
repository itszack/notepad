import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { users } = rest;

    return (
        <Route
            {...rest}
            render={props => {
                if (users.isAuthenticated) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/not-found',
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        ></Route>
    );
};

ProtectedRoute.propTypes = {
    users: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    users: state.users,
});

export default connect(mapStateToProps, {})(ProtectedRoute);
