import React, { Component } from 'react';
import { Row, Col, Card, Button, Form, Spinner, ToggleButton, ToggleButtonGroup, Alert } from 'react-bootstrap';
import {Typeahead,asyncContainer  } from 'react-bootstrap-typeahead';
import avatar from '../../assets/images/avatar.svg';
import fever from '../../assets/images/fever.png';
import dryCough from '../../assets/images/dry-cough.png';
import sneezing from '../../assets/images/sneezing.png';
import shortBreath from '../../assets/images/short-breath.png';
import notes from '../../assets/images/notes.svg';
import * as OnSiteSurveyService from './OnSiteSurveyService';
import BaseUrl from '../../Service/BaseUrl';

const AsyncTypeahead = asyncContainer(Typeahead);
var CloneSymptoms = [];
var selectUserId = '';
var selectUserCode = '';

class OnSiteSurvey extends Component {
	constructor(props) {
		super(props);
		this.state = {            
            temperature:'',
            employeeCodeList:[],
            userDetails:[],
            Symptoms:[{fever:false},
                    {drycough:false},
                    {sneezing:false},
                    {shortofbreath:false}],
            symptomsFever:false,
            symptomsdrycough:false,
            symptomssneezing:false,
            symptomsshortofbreath:false,
            scan : '',
            scanned : '',
            ppeflag:false,
            ppeValue:2,
            submintEntryHealthCheckFormMsg:false,
            loader:false,
            scanCardloader:true,
            employeListloader:false,
            isErrorTemperature:'',
            verifyFormClass:'survey-form',
            checkbooxGroupClass:'checkboox-group',
            userDetailsFirstName:'',
            userDetailsLastName:'',
            multiple:'',
            options:[]
        };        
        // this.getEmployeeCodeList();
        this.getScancount();       
	}
	componentDidMount(){
        var ele = document.getElementById('temp');
        ele.onkeypress = function(e) {
            if(isNaN(this.value+""+String.fromCharCode(e.charCode)))
                return false;
        }
        ele.onpaste = function(e){
            e.preventDefault();
        }             		          
    }
    getEmployeeCodeList=(e)=>{
        var SearchCode = e;
        OnSiteSurveyService.getEmployeeCodeList(SearchCode).then(Response => {                       
            debugger;
            if(Response.status.message === 'Search Users are available'){
                debugger;
                if(Response.data.length === 0){     
                    this.setState({employeeCodeList:[]})               
                }else{
                    this.setState({employeeCodeList:Response.data})
                }
            }
            // this.setState({employeeCodeList:Response.data});
            // this.setState({employeListloader:false});
        });
    }
    userCodeSearch=(query)=>{
        var SearchCode = query;
        debugger;
        OnSiteSurveyService.getEmployeeCodeList(SearchCode).then(Response => {                       
            debugger;
            if(Response.data.length === 0){     
                this.setState({options:[]})               
            }else{
                this.setState({options:Response.data})
            }
        });
    }

    submintEntryHealthCheck = (e) =>{
        e.preventDefault();       
        if(this.state.temperature == ''){            					
			this.setState({ isErrorTemperature: 'Please enter a temperature' });
        }else{
            this.setState({verifyFormClass:'survey-form verify'});
            this.setState({checkbooxGroupClass:'checkboox-group mouse-block'});
        }        
    }
    editEntryHealthCheck=()=>{        
        this.setState({verifyFormClass:'survey-form'});
        this.setState({checkbooxGroupClass:'checkboox-group'});       
    }
    verifyedEntryHealthCheck=()=>{        
        this.enterHealthCheckRequest();
        this.editEntryHealthCheck();
        document.getElementById('empId').value = "0";
        this.formReset();                
    }
    formReset=()=>{        
        document.getElementById('name').value = '';
        document.getElementById('department').value = ''; 
        this.setState({userDetailsFirstName:''});
        this.setState({userDetailsLastName:''});        
        this.setState({temperature:''});
        this.setState({ppeValue:2});
        document.getElementsByName('selectGroup')[0].getElementsByTagName('label')[0].className = 'btn btn-primary';
        document.getElementsByName('selectGroup')[0].getElementsByTagName('label')[1].className = 'btn btn-primary';
        document.getElementsByName('selectGroup')[0].getElementsByTagName('label')[2].className = 'btn btn-primary';
        document.getElementsByName('selectGroup')[0].getElementsByTagName('label')[3].className = 'btn btn-primary';
    }
    enterHealthCheckRequest(){
        var RequestObject = {
            "achesPain": this.state.symptomsFever,
            "anyContactWithCovidPositive": true,
            "coughSymtomValue": this.state.symptomsdrycough,
            "employeeId": selectUserCode,
            "feverSymtomValue": this.state.temperature,
            "providePpeForSiteEmployees": this.state.ppeflag,
            "shortnessOfBreathValue": this.state.symptomsshortofbreath
        }
        OnSiteSurveyService.submitEntryHealthCheckDetails(RequestObject).then(Response => {
            if(Response.status.success == 'SUCCESS'){               
                this.setState({submintEntryHealthCheckFormMsg:true});      
                this.getScancount();
            }
        });
    }
    getScancount=()=>{        
        OnSiteSurveyService.getScancount().then(Response => {       
            this.setState({scan:Response.data.totalLeftForToday});
            this.setState({scanned:Response.data.scannedToday});
            this.setState({submintEntryHealthCheckFormMsg:false});
            this.setState({scanCardloader:false});            
        });        
    }
    selectEmp=(e)=>{       
        if(e.length === 0){
            this.formReset(); 
        }else{
            selectUserId = e[0].bcmUserId;
            selectUserCode = e[0].userCode;
            this.getUserDetails(selectUserId);
        }        
    }
    selectAsyncTypeahead=(e)=>{
        if(e.length === 0){
            this.formReset();            
        }else{
            this.formReset();
            selectUserId = e[0].bcmUserId;
            selectUserCode = e[0].userCode;
            this.getUserDetails(selectUserId);
        }       
    }
    getUserDetails=(userId)=>{
        OnSiteSurveyService.getUserDetails(userId).then(Response => {                       
            this.setState({userDetails:Response.data});
            this.setState({userDetailsFirstName:Response.data.firstName});
            this.setState({userDetailsLastName:Response.data.lastName});           
        });
    }
    selectSymptoms=(SelectSymIndex,data)=>{
        if(SelectSymIndex == '1'){
            if(this.state.symptomsFever == true){
                this.setState({symptomsFever:false});   
            }
            if(this.state.symptomsFever == false){
                this.setState({symptomsFever:true})
            }            
        }
        if(SelectSymIndex == '2'){
            if(this.state.symptomsdrycough == true){
                this.setState({symptomsdrycough:false});   
            }
            if(this.state.symptomsdrycough == false){
                this.setState({symptomsdrycough:true})
            } 
        }
        if(SelectSymIndex == '3'){
            if(this.state.symptomssneezing == true){
                this.setState({symptomssneezing:false});   
            }
            if(this.state.symptomssneezing == false){
                this.setState({symptomssneezing:true})
            } 
        }
        if(SelectSymIndex == '4'){
            if(this.state.symptomsshortofbreath == true){
                this.setState({symptomsshortofbreath:false});   
            }
            if(this.state.symptomsshortofbreath == false){
                this.setState({symptomsshortofbreath:true})
            } 
        }
    }
    singleArrayRemove(array, value){
        var index = array.indexOf(value);
        if (index > -1) array.splice(index, 1);
        return array;
    }
    ppeEvent=(e)=>{      
        this.setState({ppeflag: ( e == 1 ? false:true)});
        this.setState({ppeValue:e});        
    }
    temperatureChangeEvent=e=>{
        // const re = /^[0-9\b]+$/;
        // if (e.target.value == '' || re.test(e.target.value)) {
        //    this.setState({temperature: e.target.value});
        // }
        this.setState({temperature: e.target.value});
    }
    temperatureValidator = (Param) => {
		var returnMsg = '';
		if (Param == '') {
			returnMsg = 'Please enter a temperature';
		}else{
            returnMsg = '';
        }
		return returnMsg;
    }
    render() {
        return (
            <div className="dashboard-container onsite-survey">
            {/* Notification Alerts */}
                <Alert show={this.state.submintEntryHealthCheckFormMsg} variant="success" dismissible>
                    <p className="mb-0">
                    Health survey completed succesfully
                    </p>
                </Alert>
                <div className="dashboard-section">
                <div className="welcome-text">
				<div className="pageTitle">
				<h2>Survey Status</h2>
				</div>
			</div>
                <Row className="row-1 h-100">
                    <Col xl="4">
                        <Card className="survey-status">
                            <Card.Title>
                                <div>Survey Status</div>								
                            </Card.Title>
                            <Card.Body>
                            {
                                this.state.scanCardloader === true ? (
                                    <div className="loader">
                                        <Spinner animation="grow" variant="dark" />
                                    </div>
                                ):null
                            }							
                                <div className="status-count">
                                    <div className="yet-to-scan">
                                        <span className="count-label">Yet to Scan</span>
                                        <span className="count-value">
                                            {this.state.scan}
                                        </span>
                                    </div>
                                    <div className="scanned">
                                        <span className="count-label">Scanned</span>
                                        <span className="count-value">
                                            {this.state.scanned}
                                        </span>
                                    </div>
                                </div>                                        
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl="8">
                        <Card className="entry-health-check">                             
                            <Card.Title>
                                <div>Entry Health Check</div>
                                <div className="action-icons">
                                    <span>
                                    {
                                        new Date().toDateString()
                                    }
                                    </span>									
                                </div>
                            </Card.Title>
                            <Card.Body>
                            {
                                this.state.employeListloader === true ? (
                                    <div className="loader">
                                        <Spinner animation="grow" variant="dark" />
                                    </div>
                                ):null
                            }	                            
                                <Form className={this.state.verifyFormClass}  id="messageForm"
                                name="messageForm"  noValidate>
                                    <div className="row">
                                        <div className="col basic-field">                                      
                                            <Form.Group controlId="empId">                                                
                                                
                                                {
                                                    // <Typeahead
                                                    // id="basic-typeahead-example" labelKey="userCode"               
                                                    // options={this.state.employeeCodeList} 
                                                    // onChange={this.getEmployeeCodeList.bind(this)} placeholder="Choose employee code"        
                                                    // />
                                                }

                                        <AsyncTypeahead
                                            id="async-example"                                                
                                            labelKey="userCode"                                            
                                            onSearch={this.userCodeSearch}
                                            options={this.state.options}
                                            placeholder="Search employee code"
                                            onChange={this.selectAsyncTypeahead.bind(this)}
                                            renderMenuItemChildren={(option, props) => (
                                                <span>{option.userCode}</span>
                                                )}
                                            />
                                            
                                            </Form.Group>
                                            <Form.Group controlId="name">
                                                <Form.Control type="text" placeholder="Name" 
                                                value={                                                    
                                                    this.state.userDetailsFirstName ?
                                                    ( this.state.userDetailsFirstName +' '+this.state.userDetailsLastName):null
                                                } readOnly/>
                                            </Form.Group>
                                            <Form.Group controlId="department">
                                                <Form.Control type="text" placeholder="Department"
                                                value={this.state.userDetails.department} readOnly />
                                            </Form.Group>                                            
                                        </div>                                        
                                        <div className="col verify-view">
                                            <div className="label">Employee ID</div>
                                            <div className="value">{selectUserCode}</div>
                                            <div className="label">Name</div>
                                            <div className="value">
                                            {                                                    
                                                this.state.userDetailsFirstName ?
                                                ( this.state.userDetailsFirstName +' '+this.state.userDetailsLastName):null
                                            }
                                            </div>
                                            <div className="label">Department</div>
                                            <div className="value">
                                            {
                                                this.state.userDetails.department
                                            }
                                            </div>
                                            <div className="label">Temperature</div>
                                            <div className="value temp">{this.state.temperature} °C</div>
                                        </div>
                                        <div className="col emp-profile">
                                            <div className="profile-pic">
                                                <img src={avatar} className="img-fluid"/>
                                            </div>                                            
                                        </div>
                                    </div>
                                    <Form.Group className="temp-field" controlId="temp">
                                        <Form.Control type="text" placeholder="Temperature" name="temperature"
                                        value={this.state.temperature}
                                        onChange={this.temperatureChangeEvent.bind(this)}
                                        maxLength={4}
                                        />
                                        {
                                            this.state.isErrorTemperature != '' ? (
                                                <Form.Text className="error-msg">
                                                    {this.state.isErrorTemperature}
                                                </Form.Text>
                                            ):null                                    
                                        }
                                    </Form.Group> 
                                    <Form.Group name="selectGroup" className={this.state.checkbooxGroupClass}>   
                                        <ToggleButtonGroup type="checkbox" defaultValue={[]}>
                                            <ToggleButton value={1} onClick={this.selectSymptoms.bind(this,1)}>
                                                <div className="check-img">
                                                    <img src={fever}/>
                                                </div>
                                                <div className="check-text">
                                                    Fever
                                                </div>                                            
                                            </ToggleButton>
                                            <ToggleButton value={2} onClick={this.selectSymptoms.bind(this,2)}>
                                                <div className="check-img">
                                                    <img src={dryCough}/>
                                                </div>
                                                <div className="check-text">
                                                    Dry Cough
                                                </div>                                             
                                            </ToggleButton>
                                            <ToggleButton value={3} onClick={this.selectSymptoms.bind(this,3)}>
                                                <div className="check-img">
                                                    <img src={sneezing}/>
                                                </div>
                                                <div className="check-text">
                                                    Sneezing
                                                </div>
                                            </ToggleButton>
                                            <ToggleButton value={4} onClick={this.selectSymptoms.bind(this,4)}>
                                                <div className="check-img">
                                                    <img src={shortBreath}/>
                                                </div>
                                                <div className="check-text">
                                                    Short of Breath
                                                </div> 
                                            </ToggleButton>
                                        </ToggleButtonGroup>  
                                    </Form.Group> 
                                    <Form.Group className="radio-group">
                                        <ToggleButtonGroup type="radio" name="ppegiven" value={this.state.ppeValue} 
                                        onChange={this.ppeEvent.bind(this)}>
                                            <span className="mr-3">  Has PPE been given to the employee?</span>
                                            <ToggleButton className="ml-5 mr-3" value={1}>Yes</ToggleButton>
                                            <ToggleButton value={2}>No</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Form.Group> 
                                    <Form.Group className="text-center submit-btn">
                                    {
                                        this.state.userDetails.length == 0 ? null :(
                                            <Button variant="outline-primary" type="submit" 
                                            onClick={this.submintEntryHealthCheck}>
                                               Verify 
                                            </Button>
                                        )
                                    }                                                                                                 
                                    </Form.Group>
                                    <Form.Group className="verify-btn text-center">                                                         
                                        <Button variant="outline-primary" type="button" onClick={this.editEntryHealthCheck}>
                                            Edit
                                        </Button>
                                        <Button variant="primary" type="button" onClick={this.verifyedEntryHealthCheck}>
                                             Submit
                                        </Button>
                                    </Form.Group>                              
                                </Form>
                                    <div className="notes">
                                        <span>
                                            <img src={notes} />
                                        </span>
                                        <p>
                                            Please remind the employee to wash their hands before entering the premises
                                        </p>
                                    </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>		
           
                </div>
            </div>
		);
	}
}


export default OnSiteSurvey;