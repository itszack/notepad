import { auth, googleAuthProvider } from '../firebase/firebase';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = () => dispatch => {
    auth.onAuthStateChanged(user => {
        if (user) {
            dispatch({
                type: SET_CURRENT_USER,
                payload: user,
            });
        } else {
            dispatch({ type: SET_CURRENT_USER, payload: {} });
        }
    });
};

export const loginWithGoogle = () => dispatch => {
    auth.signInWithPopup(googleAuthProvider);
    setCurrentUser();
};

export const logout = () => dispatch => {
    auth.signOut();
    setCurrentUser({});
};
