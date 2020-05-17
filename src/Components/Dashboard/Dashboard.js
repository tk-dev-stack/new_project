import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import {Doughnut,Chart} from 'react-chartjs-2';
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import calendarIcon from '../../assets/images/calendar.svg';
import editIcon from '../../assets/images/edit.svg';
import empIcon from '../../assets/images/pencil.svg';
import teamIcon from '../../assets/images/team.svg';
import originalDoughnutDraw from './ChartController';
import NewAndUpdateCard from './NewAndUpdateCard';
import CleaninessAndSanitization from './CleaninessAndSanitization';
import * as DashboardService from './DashboardService';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {			
			chartManipulationObject:{},
			confirmedValue:'',
			confirmedText:'',
			suspectedValue:'',
			suspectedText:'',
			stayatHomeValue:'',
			stayatHomeText:'',
			recoveredValue:'',
			recoveredText:'',
			onSiteValue:'',
			onSiteText:'',
			OnLeaveValue:'',
			OnLeaveText:'',
			userGroup:'',
			covidStatus:{ Confirmed:1, Suspected:2,StayatHome:3,Recovered:4,OnSite:5}
		};
	}
	componentDidMount(){
		this.setState({userGroup:JSON.parse(sessionStorage.LoginUserObject).bcmUserGroupWrapper.userGroup});	
		this.initChart();  
	}
	initChart=(e)=>{
		DashboardService.getDashboardObject().then(Response => {                       
			// debugger;
			var suspectedCount = Response.data.suspectedCount;
			var confirmedCount = Response.data.confirmedCount;
			var stayAtHomeCount = Response.data.stayAtHomeCount;
			var recoveredCount = Response.data.recoveredCount;
			var onsiteCount = Response.data.onsiteCount;
			var totalVal = suspectedCount+confirmedCount+stayAtHomeCount+recoveredCount+onsiteCount;

			this.setState({			
				confirmedValue:100-parseInt((confirmedCount/totalVal)*100),confirmedText:confirmedCount,
				suspectedValue:100-parseInt((suspectedCount/totalVal)*100),suspectedText:suspectedCount,
				stayatHomeValue:100-parseInt((stayAtHomeCount/totalVal)*100),stayatHomeText:stayAtHomeCount,
				recoveredValue:100-parseInt((recoveredCount/totalVal)*100),recoveredText:recoveredCount,
				onSiteValue:100-parseInt((onsiteCount/totalVal)*100),onSiteText:onsiteCount,
				OnLeaveValue:0,OnLeaveText:0
			});

			var getDummyData = {"Confirmd":confirmedCount,"Suspected":suspectedCount,"Stay at Home":stayAtHomeCount,"Recoved":recoveredCount,"On Site":onsiteCount,"On Leave":0};
			var backgroundColor = ['#72E600','#A6A3A3', '#FB0033','#F47700','#00D225', '#960027'];
			var hoverBackgroundColor = [];
			var lablesName = [];
			var lablesData = [];
					
			for(var i=0;i<Object.keys(getDummyData).length;i++){
				lablesName.push(Object.keys(getDummyData)[i]);
			}
			for(var i=0;i<Object.values(getDummyData).length;i++){
				lablesData.push(Object.values(getDummyData)[i]);
			}
			var ObjMapping = {
				labels: lablesName,
				datasets: [
					{
						data:lablesData,
						backgroundColor: backgroundColor,
						hoverBackgroundColor: hoverBackgroundColor
					}
				],
				text: 'Total '+totalVal	
			};
			console.log(ObjMapping);
			this.setState({chartManipulationObject:ObjMapping});
		});				
	}
	renderRedirect=()=>{
		this.props.history.push("/home/onsitesurvey");
	}
	
	goToEmployeeHealth = (statuscode)=>{
	 console.log(statuscode);
	 this.props.history.push('/home/employeehealth?statuscode='+statuscode);	 
	}


	render() {
		return (
			this.state.userGroup == 'Security' ?(
				<div>{this.renderRedirect()}</div>
			):(
				<div className="dashboard-container dashboard-home">
				<div className="dashboard-section">
				
				<div className="welcome-text">
						<div className="user-name">Hello <i> Kesava,</i></div>
						<div>
						<span className="team-name">Have a nice day at work</span>
						</div>
					</div>
					<Row className="row-1">
						<Col xl="8">
							<Card className="emp-health">
								<Card.Title>
									<div>Employee Health</div>
									<div className="action-icons">
										<span>
											<img src={calendarIcon}/>
										</span>
										<span>
											<img src={empIcon}/>
										</span>
										<span>
											<img src={editIcon}/>
										</span>
									</div>
								</Card.Title>
								<Card.Body>							
									<div className="doughnut-chart">
										<Doughnut data={this.state.chartManipulationObject} width={250} height={250}
										options={{legend:{display:false}}}/>
									</div>
									<div className="progress-circle">
										<div onClick={()=>this.goToEmployeeHealth(this.state.covidStatus.Confirmed)}>
											<CircularProgressbar
											value={this.state.confirmedValue}
											text={`${this.state.confirmedText}`}
											
											strokeWidth={4}
											styles={buildStyles({
												textColor: "#747474",
												pathColor: "#CBCBCB",
												trailColor: "#8C001F"
											})}
											/>
											<span className="progress-label dark-red">COVID Confirmed</span>
										</div>
										<div onClick={()=>this.goToEmployeeHealth(this.state.covidStatus.Suspected)}>
											<CircularProgressbar
											value={this.state.suspectedValue}
											text={`${this.state.suspectedText}`}
											strokeWidth={4}
											styles={buildStyles({
												textColor: "#747474",
												pathColor: "#CBCBCB",
												trailColor: "#ED0016"
											})}
											/>
											<span className="progress-label red">Suspected</span>
										</div>
										<div onClick={()=>this.goToEmployeeHealth(this.state.covidStatus.StayatHome)}>
											<CircularProgressbar
											value={this.state.stayatHomeValue}
											text={`${this.state.stayatHomeText}`}
											strokeWidth={4}
											styles={buildStyles({
												textColor: "#747474",
												pathColor: "#CBCBCB",
												trailColor: "#E36600"
											})}
											/>
											<span className="progress-label orange">Stay at Home</span>
										</div>
										<div onClick={()=>this.goToEmployeeHealth(this.state.covidStatus.Recovered)}>
											<CircularProgressbar
											value={this.state.recoveredValue}
											text={`${this.state.recoveredText}`}
											strokeWidth={4}
											styles={buildStyles({
												textColor: "#747474",
												pathColor: "#CBCBCB",
												trailColor: "#418600"
											})}
											/>
											<span className="progress-label dark-green">Recovered</span>
										</div>
										<div onClick={()=>this.goToEmployeeHealth(this.state.covidStatus.OnSite)}>
											<CircularProgressbar
											value={this.state.onSiteValue}
											text={`${this.state.onSiteText}`}
											strokeWidth={4}
											styles={buildStyles({
												textColor: "#747474",
												pathColor: "#CBCBCB",
												trailColor: "#77E500"
											})}
											/>
											<span className="progress-label green">On Site</span>
										</div>
										<div>
											<CircularProgressbar
											value={this.state.OnLeaveValue}
											text={`${this.state.OnLeaveText}`}
											strokeWidth={4}
											styles={buildStyles({
												textColor: "#747474",
												pathColor: "#CBCBCB",
												trailColor: "#848484"
											})}
											/>
											<span className="progress-label ash">On Leave</span>
										</div>								
									</div>
								</Card.Body>
							</Card>
						</Col>
						<Col xl="4">
							<Card className="news-update">
								<Card.Title>
									<div>News & Update</div>
									<div className="action-icons">
										<span>
											<img src={calendarIcon}/>
										</span>
										<span>
											<img src={editIcon}/>
										</span>
									</div>
								</Card.Title>
								<Card.Body>	
									<NewAndUpdateCard/>		
								</Card.Body>
							</Card>
						</Col>
					</Row>
					<Row className="row-2">
					<Col xl="6">
						<Card className="clean-sanitization">
							<Card.Title>
								<div>Cleanliness & Sanitization</div>
								<div className="action-icons">
									<span>
										<img src={calendarIcon}/>
									</span>
									<span>
										<img src={editIcon}/>
									</span>
								</div>
							</Card.Title>
							<div className="card-body-1">
							<CleaninessAndSanitization/>
							</div>
							
{/* 							
							<Card.Body>	
								
							</Card.Body> */}
						</Card>
					</Col>
					<Col xl="6">
						<Card className="training-awareness">
							<Card.Title>
								<div>Training & Awareness</div>
								<div className="action-icons">
									<span>
										<img src={calendarIcon}/>
									</span>
									<span>
										<img src={editIcon}/>
									</span>
								</div>
							</Card.Title>
							<Card.Body>	
								<div className="active-courses">
									<h6>Active Courses <strong>09</strong></h6>
								</div>
								<h6 className="progress-name">Social Distancing</h6>
								<div className="progress-bar-line">
									<div className="flex-auto">										
										<ProgressBar variant="success" now={40} label={`${40}%`} />
									</div>
									<div className="progress-count">
										1028 <img src={teamIcon}/>
									</div>
								</div>
								<h6 className="progress-name">Hand Sanitization</h6>
								<div className="progress-bar-line">
									<div className="flex-auto">										
										<ProgressBar variant="warning" now={60} label={`${60}%`} />
									</div>
									<div className="progress-count">
										652 <img src={teamIcon}/>
									</div>
								</div>
								<h6 className="progress-name">Know Your Mask</h6>
								<div className="progress-bar-line">
									<div className="flex-auto">										
										<ProgressBar variant="danger" now={80} label={`${80}%`} />
									</div>
									<div className="progress-count">
										564 <img src={teamIcon}/>
									</div>
								</div>								
							</Card.Body>
						</Card>
					</Col>
				</Row>
				</div>
			</div>		
			)
		)		
	}
}



export default withRouter(Dashboard);