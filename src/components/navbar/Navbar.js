import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Navbar extends Component {
    render() {
        const { isAuthenticated } = this.props.users;

        const authLink = (
            <>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-note">
                            Add Note
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout">
                            Logout
                        </Link>
                    </li>
                </ul>
            </>
        );

        const guestLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <Link to="/" className="navbar-brand">
                    Notepad
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                    {isAuthenticated ? authLink : guestLink}
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    users: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    users: state.users,
});

export default connect(mapStateToProps, {})(Navbar);
