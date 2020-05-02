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

var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);    
    var chart = this.chart.chart;
    var ctx = chart.ctx;
    var width = chart.width;
    var height = chart.height;
	var fontSize = (height / 114).toFixed(2);	
    ctx.font = 1 + "em Verdana";
    ctx.textBaseline = "middle";
    var text = chart.config.data.text,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

    ctx.fillText(text, textX, textY);
  }
});

const percentage = 66;
class Dashbord extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// Data: [],
			chartManipulationObject:{}			
		};
	}
	componentDidMount(){
		this.initChart();  
	}
	

	initChart=(e)=>{
		var getDummyData = {"Confirmd":1,"Suspected":32,"Stay at Home":53,"Recoved":16,"On Site":1088,"On Leave":64};
		var backgroundColor = ['#72E600','#A6A3A3', '#FB0033','#F47700','#407F00', '#960027', '#cccccc'];
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
			text: 'Total 1254'	
		};
		console.log(ObjMapping);
		this.setState({chartManipulationObject:ObjMapping});
	}
	
	render() {
		return (
			<div className="dashboard-container">			
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
									<div>
										<CircularProgressbar
										value={percentage}
										text={`${percentage}%`}
										strokeWidth={4}
										styles={buildStyles({
											textColor: "#747474",
											pathColor: "#CBCBCB",
											trailColor: "#8C001F"
										})}
										/>
										<span className="progress-label dark-red">COVID Confirmed</span>
									</div>
									<div>
										<CircularProgressbar
										value={percentage}
										text={`${percentage}%`}
										strokeWidth={4}
										styles={buildStyles({
											textColor: "#747474",
											pathColor: "#CBCBCB",
											trailColor: "#ED0016"
										})}
										/>
										<span className="progress-label red">Suspected</span>
									</div>
									<div>
										<CircularProgressbar
										value={percentage}
										text={`${percentage}%`}
										strokeWidth={4}
										styles={buildStyles({
											textColor: "#747474",
											pathColor: "#CBCBCB",
											trailColor: "#E36600"
										})}
										/>
										<span className="progress-label orange">Stay at Home</span>
									</div>
									<div>
										<CircularProgressbar
										value={percentage}
										text={`${percentage}%`}
										strokeWidth={4}
										styles={buildStyles({
											textColor: "#747474",
											pathColor: "#CBCBCB",
											trailColor: "#418600"
										})}
										/>
										<span className="progress-label dark-green">Recovered</span>
									</div>
									<div>
										<CircularProgressbar
										value={percentage}
										text={`${percentage}%`}
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
										value={percentage}
										text={`${percentage}%`}
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
								<ul className="news-list list-unstyled">
									<li className="news read">										
										<h6 className="news-title">Updates on COVID-19</h6>
										<p>With 1,229 fresh cases in the last 24 hours, India's novel coronavirus count has increased to 21,700, according to the latest Ministry of Health...
										</p>
										<span className="news-timing">26 Apr, 9:36 pm</span>
									</li>
									<li className="news unread">										
										<h6 className="news-title">COVID - 19 Precautions</h6>
										<p>With 431 new coroanvirus positive cases in Maharashtra, the total number of confirmed Covid-19 count in the state increased to 5,652 today, ...
										</p>
										<span className="news-timing">26 Apr, 9:36 pm</span>
									</li>
									<li className="news unread">										
										<h6 className="news-title">Compulsory Training on How to wear ...</h6>
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'sLorem Ipsum ...
										</p>
										<span className="news-timing">26 Apr, 9:36 pm</span>
									</li>									
								</ul>				
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
							<Card.Body>							
								<div className="plants plant-1">
									<div className="plant-circle">
										<div className="plant-number">
											Plant <br/> I
										</div>
									</div>
									<div className="plant-data">
										<ul className="list-unstyled plant-data-list">
											<li>
												<span className="label">Overdue</span>
												<span className="value text-danger">21</span>
											</li>
											<li>
												<span className="label">In-Progress</span>
												<span className="value text-warning">08</span>
											</li>
											<li>
												<span className="label">Done</span>
												<span className="value text-success">03</span>
											</li>
										</ul>
									</div>									
								</div>
								<div className="plants plant-2">
									<div className="plant-circle">
										<div className="plant-number">
										Plant <br/> II
										</div>
									</div>
									<div className="plant-data">
										<ul className="list-unstyled plant-data-list">
											<li>
												<span className="label">Overdue</span>
												<span className="value text-danger">21</span>
											</li>
											<li>
												<span className="label">In-Progress</span>
												<span className="value text-warning">08</span>
											</li>
											<li>
												<span className="label">Done</span>
												<span className="value text-success">03</span>
											</li>
										</ul>
									</div>									
								</div>
								<div className="plants plant-3">
									<div className="plant-circle">
										<div className="plant-number">
										Plant <br/> III
										</div>
									</div>
									<div className="plant-data">
										<ul className="list-unstyled plant-data-list">
											<li>
												<span className="label">Overdue</span>
												<span className="value text-danger">21</span>
											</li>
											<li>
												<span className="label">In-Progress</span>
												<span className="value text-warning">08</span>
											</li>
											<li>
												<span className="label">Done</span>
												<span className="value text-success">03</span>
											</li>
										</ul>
									</div>									
								</div>
							</Card.Body>
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
            
		);
	}
}



export default withRouter(Dashbord);