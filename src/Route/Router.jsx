import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Home from '../Pages/Home/Home';
import {ProtectRoute} from '../Components/Auth/ProtectRoute';

function router() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path={"/"} component={Login} exact/>
                    <ProtectRoute path={"/home"} component={Home} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default router