import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isEmpty from '../../helpers/isEmpty';
import Preloader from '../../helpers/preloader';

class NoteListPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            notesPerPage: 3,
        };
    }

    onClick = e => {
        this.setState({ currentPage: Number(e.target.id) });
    };

    render() {
        const { notes, isLoading } = this.props.notes;
        const { currentPage, notesPerPage } = this.state;

        const indexOfLastNote = currentPage * notesPerPage;
        const indexOfFirstNote = indexOfLastNote - notesPerPage;
        const currentNotes = Object.entries(notes || {}).slice(
            indexOfFirstNote,
            indexOfLastNote
        );

        const beforeLoading = <Preloader></Preloader>;

        const notFound = (
            <div className="container-fluid">
                <p className="text-center text-success m-3">
                    Oops! No note found.
                </p>
            </div>
        );

        const noteWithImage = note => (
            <div className="row">
                <div className="col-sm-4">
                    <img
                        src={note[1].image}
                        className="img-fluid img-thumbnail"
                        alt={note[1].image_name}
                    ></img>
                </div>
                <div className="col-sm-8">
                    <div className="card-body">
                        <Link to={`/note/${note[0]}`} className="text-success">
                            <h5 className="card-title">{note[1].title}</h5>
                        </Link>
                        <p className="card-text">{note[1].body}</p>
                    </div>
                </div>
            </div>
        );

        const noteWithoutImage = note => (
            <div className="card-body">
                <Link to={`/note/${note[0]}`} className="text-success">
                    <h5 className="card-title">{note[1].title}</h5>
                </Link>
                <p className="card-text">{note[1].body}</p>
            </div>
        );

        const afterLoading = !isEmpty(currentNotes)
            ? _.map(currentNotes, (note, key) => (
                  <div className="card text-success m-3" key={key}>
                      {isEmpty(note[1].image)
                          ? noteWithoutImage(note)
                          : noteWithImage(note)}
                  </div>
              ))
            : notFound;

        const pageNumbers = [];
        let i = 1;
        const noteLength = Math.ceil(
            Object.keys(notes || {}).length / notesPerPage
        );
        for (i; i <= noteLength; i++) {
            pageNumbers.push(i);
        }

        const pagination = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    className="page-item page-link list-group-item-success"
                    onClick={this.onClick}
                >
                    {number}
                </li>
            );
        });

        return (
            <>
                {isLoading === true ? beforeLoading : afterLoading}
                <ul
                    id="page-numbers"
                    className="pagination justify-content-center"
                >
                    {pagination}
                </ul>
            </>
        );
    }
}

NoteListPage.propTypse = {
    notes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    notes: state.notes,
});

export default connect(mapStateToProps, {})(NoteListPage);
