import { database, storage } from '../firebase/firebase';
import { GET_NOTES } from './types';

export const getNotes = () => dispatch => {
    database.on('value', snapshot => {
        dispatch({ type: GET_NOTES, payload: snapshot.val() });
    });
};

export const createNote = note => dispatch => {
    database.push(note);
};

export const uploadImage = image => dispatch => {
    const upload = storage.child(Date.now() + '-' + image.name).put(image);
    return upload;
};

export const updateNote = (_id, note) => dispatch => {
    database.child(_id).update(note);
};

export const deleteNote = _id => dispatch => {
    database.child(_id).remove();
};
