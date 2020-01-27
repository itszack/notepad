import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../../actions/userAction';

class LogoutPage extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return <Redirect to="/"></Redirect>;
    }
}

LogoutPage.propTypes = {
    logout: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    users: state.users,
});

export default connect(mapStateToProps, { logout })(LogoutPage);
