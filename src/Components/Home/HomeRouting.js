import React, { Component } from 'react'
import Dashboard from '../Dashboard/Dashboard';
import { Switch, Route, Redirect } from 'react-router-dom';
import CleanlinessAndSanitization from '../CleanlinessAndSanitization/CleanlinessAndSanitization';
import EmployeeHealth from '../EmployeeHealth/EmployeeHealth';
import CourseDetails from '../TraningAndAwareness/CourseDetails/CourseDetails';
import NewsAndUpdates from '../NewsAndUpdates/NewsAndUpdates';
import TraningAndAwareness from '../TraningAndAwareness/TraningAndAwareness';
import OnSiteSurvey from '../OnSiteSurvey/OnSiteSurvey';

class HomeRouting extends Component {
    constructor(props) {
        super(props);
        this.state = {			
			userGroup:''			
		};       
    }
    componentDidMount(){
		this.setState({userGroup:JSON.parse(sessionStorage.LoginUserObject).bcmUserGroupWrapper.userGroup});								
	}
    render() {
        return (
            <Switch>
            {
				this.state.userGroup == 'Security' ?(
                    <React.Fragment>  
                        <Route exact path='/home/onsitesurvey' component={OnSiteSurvey}/>
                        <Redirect from="/home" to="/home/onsitesurvey" /> 
                    </React.Fragment>   
                ):(
                    <React.Fragment>
                        <Route exact path='/home/dashboard' render={() => (<Dashboard />)} />
                        <Route exact path='/home/employeehealth' component={EmployeeHealth} />
                        <Route exact path='/home/cleansanitization' component={CleanlinessAndSanitization}/>
                        <Route exact path='/home/traningawareness' component={TraningAndAwareness}/>
                        <Route exact path='/home/coursedetails' component={CourseDetails}/>
                        <Route exact path='/home/newsandupdates' component={NewsAndUpdates}/>
                        <Route exact path='/home/onsitesurvey' component={OnSiteSurvey}/> 
                        <Redirect from="/home" to="/home/dashboard" />
                    </React.Fragment>   
                )
            }                          
            </Switch>
        )
    }
}

export default HomeRouting
