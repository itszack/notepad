import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setCurrentUser } from '../../actions/userAction';
import { getNotes } from '../../actions/noteAction';
import PreLoader from '../../helpers/preloader';

class Loader extends Component {
    componentDidMount() {
        const { users, notes, setCurrentUser, getNotes } = this.props;
        
        if (users.isLoading === true) {
            setCurrentUser();
        }

        if (notes.isLoading === true) {
            getNotes();
        }
    }

    render() {
        const { users, notes, children } = this.props;

        if (users.isLoading === false && notes.isLoading === false) {
            return <div>{children}</div>;
        } else {
            return <PreLoader></PreLoader>;
        }
    }
}

Loader.propTypes = {
    setCurrentUser: PropTypes.func.isRequired,
    getNotes: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    notes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    users: state.users,
    notes: state.notes,
});

export default connect(mapStateToProps, { setCurrentUser, getNotes })(
    withRouter(Loader)
);
