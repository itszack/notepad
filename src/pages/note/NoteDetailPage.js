import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteNote } from '../../actions/noteAction';
import isEmpty from '../../helpers/isEmpty';

class NoteDetailPage extends Component {
    onDelete = _id => e => {
        this.props.deleteNote(_id);
        this.props.history.push('/');
    };

    render() {
        const { notes } = this.props.notes;
        const { _id } = this.props.match.params;

        const creatorDOM = (
            <>
                <button type="button" className="btn btn-outline-success">
                    <Link to={`/note/${_id}/edit`} className="text-success">
                        Update Note
                    </Link>
                </button>
                &nbsp;
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={this.onDelete(_id)}
                >
                    Delete Note
                </button>
            </>
        );

        const nonCreatorDOM = <></>;

        const noteWithoutImage = (
            <div className="card-body">
                <h5 className="card-title">{notes[_id].title}</h5>
                <p className="card-text">{notes[_id].body}</p>
                {notes[_id].uid === this.props.users.user.uid
                    ? creatorDOM
                    : nonCreatorDOM}
            </div>
        );

        const noteWithImage = (
            <>
                <img
                    src={notes[_id].image}
                    className="card-img-top img-fluid img-thumbnail"
                    alt={notes[_id].image.name}
                ></img>
                <div className="card-body">
                    <h5 className="card-title">{notes[_id].title}</h5>
                    <p className="card-text">{notes[_id].body}</p>
                    {notes[_id].uid === this.props.users.user.uid
                        ? creatorDOM
                        : nonCreatorDOM}
                </div>
            </>
        );

        return (
            <div className="card text-success m-3">
                {isEmpty(notes[_id].image) ? noteWithoutImage : noteWithImage}
            </div>
        );
    }
}

NoteDetailPage.propTypes = {
    deleteNote: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    notes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    users: state.users,
    notes: state.notes,
});

export default connect(mapStateToProps, { deleteNote })(NoteDetailPage);
