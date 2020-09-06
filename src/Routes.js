import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Login from './component/Login';
import Register from './component/Register';
import Dashboard from './component/dashboard/Dashboard';

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
        </Router>
    )
}
