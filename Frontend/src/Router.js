import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import UnderProduction from './UderProduction';
import App from './App';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import User from './User/User';
import NavBar from './NavBar';
import CreateTask from './Task/CreateTask';


const Routes =() => (
    
    <BrowserRouter >
    <NavBar />
    <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Login}/>
        <Route path='/create-task' component={CreateTask}/>
        <Route path='/users' component={User}/>
        <Route path='/signup' component={Signup}/>
        <Route component={UnderProduction} />
    </Switch>
    </BrowserRouter>
    
);


export default Routes;
