import firebase from 'firebase';

import variables from '../configs/variables';

const firebaseConfig = {
    apiKey: variables.apiKey,
    authDomain: variables.authDomain,
    databaseURL: variables.databaseURL,
    projectId: variables.projectId,
    storageBucket: variables.storageBucket,
    messagingSenderId: variables.messagingSenderId,
    appId: variables.appId,
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const database = firebase.database().ref('/notes');

export const storage = firebase.storage().ref('/notepad_image');
