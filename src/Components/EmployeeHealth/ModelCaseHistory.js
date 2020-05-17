import React, { Component } from 'react';
import { Row, Col,Table, Modal,Spinner } from 'react-bootstrap';

import videoFile from '../../assets/images/video-file@2x.png';
import doneImg from '../../assets/images/deatils-done@2x.png';
import mediaImg from '../../assets/images/powder-coat-plant.jpg';
import callIcon from '../../assets/images/phone.svg';
import videoIcon from '../../assets/images/video-call.svg';
import mailIcon from '../../assets/images/mail.svg';
import surveyIcon from '../../assets/images/survey.svg';
import fever from '../../assets/images/fever.png';
import userImg from '../../assets/images/Mask-Group-user.png';
import searchIcon from '../../assets/images/search.svg';
import * as EmployeeHealthService from './EmployeeHealthService';

class ModelCaseHistory extends Component{
    constructor(props) {        
        super(props);        
        this.state = {
            modalShow:props.modalShow,
            empData:props.empData,
            userRecordDetails:[],
            totalDaysLeft:'',
            returnDateToWork:'',
            loader:false,
            surveyData:''                      
        }
        // surveyData selectedRow.bcmEmployeeHealthSurveyData
        console.log(props);
        debugger;                           
    }
    setModalHide=()=>{
        this.props.onHide(false);        
    }
    componentDidMount(){
        EmployeeHealthService.empHistoryRecord(this.state.empData.bcmUserId).then(response => {
            if (response.data) {                
                this.setState({totalDaysLeft:response.data.totalDaysLeft,returnDateToWork:response.data.returnDateToWork});
                if(response.data.historyList == null){
                    this.setState({userRecordDetails:[]});
                }else{
                    this.setState({userRecordDetails:response.data.historyList});
                }                              
            }
            this.setState({loader:true});
        });     
    }
    surveyData=(selectedRow,event)=>{
        debugger;        
        if(document.getElementsByName('d-none').length){
            for(var i=0;i<document.getElementsByName('d-none').length;i++){
                document.getElementsByName('d-none')[i].className = 'd-none';
            }
        }
        if(selectedRow.historyDate){
            document.getElementById(selectedRow.historyDate).className = '';
        }
        if(selectedRow.bcmEmployeeHealthSurveyData){
            this.setState({surveyData:selectedRow.bcmEmployeeHealthSurveyData});        
        }        
    }
    render() {
        return(
            <Modal id="caseHistory" show={this.state.modalShow} onHide={this.setModalHide} size="lg" 
            aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                   <Modal.Title id="contained-modal-title-vcenter" className="pl-1">
                   Case History
                   </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {
                    this.state.loader == false ? (
                        <div className="loader">
                            <Spinner animation="grow" variant="dark" />
                        </div>
                ):(
                <div className="whiteBg">
                <div className="caseDetailsContainer">
                <Row className="px-3">
                <Col md="6" xl="6">                
                <Row className="scrollHeader borderRight">                   
                   <Col xl="12" className="userDetails modelUserDetails">
                   <h5 className="name">{this.state.empData.employeeName}</h5>
                   <div className="row user-info">
                       <div className="col-6 user-info-left">
                           <h6>{this.state.empData.bcmUserId}</h6>
                       </div>
                       <div className="col-6 user-info-right">
                       <h6 className="dept">{this.state.empData.department}</h6>
                        <h6 className="desination">{this.state.empData.designation}</h6>                       
                       </div>
                   </div>
                   </Col>
                   <Col xl="12">
                      <div className="emp-tableContainer">
                        <Table striped bordered hover className="emp-table caseHistoryTable mt-2">
                        <tbody>
                            <tr>
                            <td>Status</td>
                            <td>
                                <div className="text-right">
                                    <span className="confirm">{this.state.empData.lastUpdatedStatus}</span>
                                </div>
                            </td>
                            </tr>
                            <tr>
                              <td>Quarantine Days</td>
                              <td>
                                  <div className="option">{this.state.totalDaysLeft}</div>
                              </td>
                            </tr>                         
                            <tr>
                                <td>Health Condition</td>
                                <td>
                                  <div className="option success-color">
                                    {this.state.empData.lastUpdatedCondition}
                                  </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Expected Date of Return</td>
                                <td>
                                    <div className="option">{this.state.returnDateToWork}</div>
                                </td>
                            </tr>                    
                            </tbody>
                       </Table>
                      </div>	
                   </Col>
                </Row>
                
                   </Col>
                   <Col md="6" xl="6">
                       <div className="optionList">
                           <ul className="list">
                              <li><i><img src={callIcon} alt="CallIcon" /></i></li>
                              <li><i><img src={videoIcon} alt="videoIcon" /></i></li>
                              <li><i><img src={mailIcon} alt="mailIcon" /></i></li>
                           </ul>
                       </div>
                       <div>
                       <table class="table table-sm table-bordered">                                             
                       {
                        this.state.userRecordDetails ? (
                            <tbody>
                            <tr>
                                {
                                    this.state.userRecordDetails.map(( Object, index ) => {                                       
                                        return (
                                            <td style={{width: 25}}>
                                            {
                                                Object.symptomIndicator == 'Green' ?
                                                <div class="circle" style={{width: 15,
                                                    height: 15,borderRadius: '50%',
                                                    fontSize:25,backgroundColor: '#9E042E'}}></div>:
                                                    <div class="circle" style={{width: 15,
                                                        height: 15,borderRadius: '50%',
                                                        fontSize:25,backgroundColor: '#4ABF21'}}></div>
                                            }
                                            </td>
                                        )
                                    })                                                                                                       
                                }                           
                            </tr>
                            <tr>
                                {
                                    this.state.userRecordDetails.map(( Object, index ) => {                                       
                                        return (
                                            <td style={{width: 20,fontSize: 10}}>{Object.historyDate}</td>
                                        )
                                    })                                                                                                       
                                }                           
                            </tr>                                                                                                       
                            </tbody>
                            ):null
                        }                                                                     
                     </table>
                       </div>
                   </Col>
                   </Row>
                   </div>
                   <Row>
                   <Col xl="12 caseDetailsContainer">
            <div className="caseDetails">
            {
                this.state.userRecordDetails ? (
                <Table striped  hover className="caseDetailsTable">
                <thead>
                <tr>
                <th>Date</th>
                <th>Health Status</th>
                <th>Condition</th>
                <th>Survey</th>
                </tr>
                </thead>
                <tbody className="caseDetailsTableBody">
                {
                    this.state.userRecordDetails.map(( Object, index ) => {                       
                        return (
                            <>
                            <tr>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <div className="caseDateIcon">
                                            <img  src={mailIcon} alt="caseDateIcon" />
                                        </div>
                                        <div className="caseDate">
                                            <span className="date">{Object.historyDate}</span>
                                            {
                                                // <span className="day">Monday</span>
                                            }
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {
                                        Object.bcmEmployeeHealthSurveyData == null ? null:(
                                        <ul className="healthStatus">                                       
                                            <li className={ 
                                                (
                                                    Object.bcmEmployeeHealthSurveyData.feverSymptomValue === true ?
                                                    'success':'error'
                                                )
                                            }>Fever</li>
                                            <li className={
                                                (
                                                    Object.bcmEmployeeHealthSurveyData.coughSymptomValue === true ?
                                                    'success':'error'
                                                )
                                            }>Cough</li>
                                            <li className={
                                                (
                                                    Object.bcmEmployeeHealthSurveyData.bodyAcheAndPainSymptomValue === true ?
                                                    'success':'error'
                                                )
                                            }>Aches & Pain</li>
                                            <li className={
                                                (
                                                    Object.bcmEmployeeHealthSurveyData.shortnessOfBreathSymptomValue === true ?
                                                    'success':'error'
                                                )
                                            }>Shortness of Breath</li>
                                        </ul>
                                        )     
                                    }                                    
                                </td>
                                <td><span className="success-color">{Object.healthCondition}</span></td>
                                <td><img src={surveyIcon} alt="SurveyIcon"                                
                                onClick={this.surveyData.bind(this,Object)}/></td>
                            </tr>
<tr id={Object.historyDate} className="d-none" name="d-none">
<div className="tableData row align-items-center" style={{marginTop: 10,marginBottom: 10}}>
<div className="col-lg-2 tableDataDetails">
            <p className="big">Temperature</p>
            <p className="degreeCelsius">{this.state.surveyData.feverRecord}<span>&#8451;</span></p>
</div>
<div className="col-lg-4 tableDataDetails">
        <p className="samll">Symptoms</p>
        <div className="fever">
            {
                this.state.surveyData.feverSymptomValue == true?(
                    <div className="feverDetails">
                        <img src={fever} alt="fever" />
                        <p>Fever</p>
                    </div>
                ):null                
            }
            {
                this.state.surveyData.coughSymptomValue == true?(
                    <div className="feverDetails">
                        <img src={fever} alt="fever" />
                        <p>Cough</p>
                    </div>
                ):null                
            }
            {
                this.state.surveyData.bodyAcheAndPainSymptomValue == true?(
                    <div className="feverDetails">
                        <img src={fever} alt="fever" />
                        <p>Body Ache and Pain</p>
                    </div>
                ):null                
            }
            {
                this.state.surveyData.shortnessOfBreathSymptomValue == true?(
                    <div className="feverDetails">
                        <img src={fever} alt="fever" />
                        <p>Shortness Of Breath</p>
                    </div>
                ):null                
            }                                  
        </div>
</div>
<div className="col-lg-3 tableDataDetails">
        <p>Have you left your home in the last 12 hours?</p>
        <p className="highlight">
            {
                this.state.surveyData.leftHomeInLast12Hours == true ? (
                    <span>Yes</span>
                ):(<span>No</span>)
            }
        </p>
</div>
<div className="col-lg-3 tableDataDetails">
        <p>What precautions are you taking ?</p>
        {
            this.state.surveyData.socialDistancingValue == true ? (
                <p className="highlight">Social distancing</p>
            ):null
        }
        {
            this.state.surveyData.stayingAtHome == true ? (
                <p className="highlight">Staying At Home</p>
            ):null
        }
        {
            this.state.surveyData.wearingMask == true ? (
                <p className="highlight">Wearing Mask</p>
            ):null
        }
        {
            this.state.surveyData.washHandsFrequently == true ? (
                <p className="highlight">WashHands Frequently</p>
            ):null
        }                
</div>        
</div>          
</tr>
                            </>
                                                        
                        )
                    })
                }
                </tbody>
                </Table>
                ):null
            }            
                </div>
                </Col>
                </Row>
                </div>
                )
            }
            </Modal.Body>                
        </Modal>
    )
    }
}

export default ModelCaseHistory;