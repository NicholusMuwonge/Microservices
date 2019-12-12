import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import UnderProduction from './UderProduction';
import App from './App';
import Login from './Login/Login';
import Signup from './Signup/Signup';


const Routes =() => (
    
    <BrowserRouter >
    <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route component={UnderProduction} />
    </Switch>
    </BrowserRouter>
    
);


export default Routes;
