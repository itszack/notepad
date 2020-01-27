import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loader from '../components/common/Loader';
import Navbar from '../components/navbar/Navbar';
import ProtectedRoute from '../ProtectedRoute';
import LoginPage from '../pages/auth/LoginPage';
import LogoutPage from '../pages/auth/LogoutPage';
import NoteListPage from '../pages/note/NoteListPage';
import NoteAddPage from '../pages/note/NoteAddPage';
import NoteDetailPage from '../pages/note/NoteDetailPage';
import NoteEditPage from '../pages/note/NoteEditPage';
import AboutPage from '../pages/about/AboutPage';
import ErrorPage from '../pages/error/ErrorPage';

class Routes extends Component {
    render() {
        return (
            <Loader>
                <Navbar></Navbar>
                <Switch>
                    <Route exact path="/login" component={LoginPage}></Route>
                    <Route exact path="/logout" component={LogoutPage}></Route>
                    <Route exact path="/" component={NoteListPage}></Route>
                    <Route
                        exact
                        path="/note/:_id"
                        component={NoteDetailPage}
                    ></Route>
                    <ProtectedRoute
                        exact
                        path="/note/:_id/edit"
                        component={NoteEditPage}
                    ></ProtectedRoute>
                    <ProtectedRoute
                        exact
                        path="/add-note"
                        component={NoteAddPage}
                    ></ProtectedRoute>
                    <Route exact path="/about" component={AboutPage}></Route>
                    <Route component={ErrorPage}></Route>
                </Switch>
            </Loader>
        );
    }
}

export default Routes;
