import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginIQ from '../pages/LoginIQ';
import Main from '../pages/Main';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={LoginIQ} />
            <Route exact path="/main" component={Main} />
        </Switch>
    );
    
}