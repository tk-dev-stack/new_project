import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashbord from '../Dashbord/Dashbord'
import CleanlinessAndSanitization from '../CleanlinessAndSanitization/CleanlinessAndSanitization';
import EmployeeHealth from '../EmployeeHealth/EmployeeHealth';
import CourseDetails from '../TraningAndAwareness/CourseDetails/CourseDetails';
import NewsAndUpdates from '../NewsAndUpdates/NewsAndUpdates';
import TraningAndAwareness from '../TraningAndAwareness/TraningAndAwareness';

class HomeRouting extends Component {   
    render() {
        return (
            <Switch>
                <Route exact path='/home/dashbord' component={Dashbord} />
                <Route exact path='/home/employeehealth' component={EmployeeHealth} />
                <Route exact path='/home/cleansanitization' component={CleanlinessAndSanitization}/>
                <Route exact path='/home/traningawareness' component={TraningAndAwareness}/>
                <Route exact path='/home/coursedetails' component={CourseDetails}/>
                <Route exact path='/home/newsandupdates' component={NewsAndUpdates}/>
                <Redirect from="/home" to="/home/dashboard" />
            </Switch>
        )
    }
}

export default HomeRouting
