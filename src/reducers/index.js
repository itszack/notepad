import { combineReducers } from 'redux';

import userReducer from './userReducer';
import noteReducer from './noteReducer';

export default combineReducers({ users: userReducer, notes: noteReducer });
