import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { uploadImage, createNote } from '../../actions/noteAction';
import noteValidator from '../../validators/noteValidator';
import imageValidator from '../../validators/imageValidator';
import isEmpty from '../../helpers/isEmpty';

class NoteAddPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            image: '',
            uid: '',
            messages: '',
            errors: {},
        };
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onUpload = e => {
        const { errors } = this.state;

        const image = e.target.files[0];
        this.setState(() => ({ image }));

        const error = imageValidator({ image, errors });

        this.setState({ errors: error });

        if (isEmpty(error)) {
            const data = this.props.uploadImage(image);
            data.on(
                'state_changed',
                snapshot => {
                    console.log(`Uploading ${image.name}...`);
                },
                error => {
                    console.log('Error is ', error);
                },
                () => {
                    data.snapshot.ref.getDownloadURL().then(downloadUrl => {
                        this.setState({ image: downloadUrl });
                    });
                }
            );
        }
    };

    onSubmit = e => {
        e.preventDefault();

        const { title, body, image } = this.state;
        const { user } = this.props.users;

        const error = noteValidator(this.state);

        const note = {
            title: title,
            body: body,
            image: image,
            uid: user.uid,
        };

        this.setState({ errors: error });

        if (isEmpty(error)) {
            const message = 'Note successfully created!';
            this.setState({ messages: message });

            this.props.createNote(note);
            this.setState({ title: '', body: '' });
        }
    };

    render() {
        const { title, body, image, messages, errors } = this.state;

        return (
            <div className="container-fluid m-3">
                <h1 className="text-success">Add Your Notes</h1>
                <hr></hr>

                {messages && (
                    <div className="text-center text-danger">{messages}</div>
                )}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            className={classnames('form-control', {
                                'is-invalid': errors.title,
                            })}
                            placeholder="Title"
                            value={title}
                            onChange={this.onChange}
                        ></input>
                        {errors.title && (
                            <div className="invalid-feedback">
                                {errors.title}
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <textarea
                            name="body"
                            className={classnames('form-control', {
                                'is-invalid': errors.body,
                            })}
                            placeholder="Body"
                            rows="3"
                            value={body}
                            onChange={this.onChange}
                        ></textarea>
                        {errors.body && (
                            <div className="invalid-feedback">
                                {errors.body}
                            </div>
                        )}
                    </div>
                    <div className="form-group row">
                        <div className="col-md-3 form-group">
                            <input
                                type="file"
                                name="image"
                                className={classnames('form-control-file', {
                                    'is-invalid': errors.image,
                                })}
                                onChange={this.onUpload}
                            ></input>
                            {errors.image && (
                                <div className="invalid-feedback">
                                    {errors.image}
                                </div>
                            )}
                        </div>
                        <div className="col-md-6">
                            {image ? (
                                <img
                                    src={image}
                                    style={{ maxWidth: '30%', height: 'auto' }}
                                    alt="user_image"
                                />
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-outline-success btn-lg"
                    >
                        Add Note
                    </button>
                </form>
            </div>
        );
    }
}

NoteAddPage.propTypes = {
    uploadImage: PropTypes.func.isRequired,
    createNote: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    notes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    users: state.users,
    notes: state.notes,
});

export default connect(mapStateToProps, { uploadImage, createNote })(
    NoteAddPage
);
