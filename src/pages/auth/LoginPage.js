import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginWithGoogle } from '../../actions/userAction';

class LoginPage extends Component {
    componentDidMount() {
        const { isAuthenticated } = this.props.users;

        if (isAuthenticated) {
            this.props.history.push('/', {
                from: this.props.location,
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps, prevState) {
        if (nextProps.users.isAuthenticated) {
            nextProps.history.push('/');
        }
    }

    onClick = e => {
        this.props.loginWithGoogle();
    };

    render() {
        return (
            <div className="container-fluid text-center">
                <h1 className="text-success">Create an account</h1>
                <button
                    type="button"
                    className="btn btn-outline-success btn-lg"
                    onClick={this.onClick}
                >
                    <i className="fab fa-google fa-lg">
                        &nbsp;Login with google
                    </i>
                </button>
            </div>
        );
    }
}

LoginPage.propTypes = {
    loginWithGoogle: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    users: state.users,
});

export default connect(mapStateToProps, { loginWithGoogle })(LoginPage);
