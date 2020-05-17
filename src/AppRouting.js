import React, { Component } from 'react'
import {HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Components/Login/Login';
import AuthGuard from './AuthGuard';
import Home from './Components/Home/Home';

const PrivateRoute = ({ component: Home, ...rest }) => 
(
    <Route {...rest} render={props =>
        AuthGuard.getAuth() == 'true' ? (
        <Home {...props} />
    ) : (<Redirect from='/' to='/login'/>)
    }
    />
) 

 class AppRouting extends Component {
    render() {
        return (
                <Switch>
                    <HashRouter>
                        <PrivateRoute path="/home" component={Home}/>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/' component={Login} /> 
                        <Redirect from='/' to='/login'/>
                    </HashRouter>                 
                </Switch>                     
        )
    }
}

export default AppRouting
