import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar, Form, Modal, Button } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';

import socialDistancing from '../../assets/images/social-distancing.png';
import handSanitization from '../../assets/images/hand-sanitization.png';
import knowYourMask from '../../assets/images/know-your-mask.png';
import coronaVirus from '../../assets/images/corona-virus-symptoms.png';
import CourseDetails from './CourseDetails/CourseDetails';


const percentage = 66;


const options = [
	{ value: 'one', label: 'Suresh Krishnan' },
	{ value: 'two', label: 'Sivaraman' },
	{ value: 'three', label: 'Option One' },
	{ value: 'four', label: 'Rajesh Prasad' },
	{ value: 'five', label: 'Baskar Biju' },
	{ value: 'six', label: 'Sarath Krishnan' },
	{ value: 'seven', label: 'Gowtham P' },
	{ value: 'eight', label: 'Hari Ram' },
	{ value: 'nine', label: 'Anandha Krishnan' },
	{ value: 'ten', label: 'Marimuthu' },


];

class TraningAndAwareness extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Data: [],
			modalShow: false,
			modalShow_One: false,

		};
	}
	state = {
		selected: ['one'],
	};

	onChange = (selected) => {
		this.setState({ selected });
	};

	componentDidMount() {
	}
	setModalShow = (e) => {
		this.setState({
			modalShow: e
		})
	}
	setModalShowOne = (e) => {
		this.setState({
			modalShow_one: e
		})
	}
	onHide = () => {
		this.setState({
			modalShow: false
		})
	}
	render() {
		const { selected } = this.state;
		return (
			<div className="dashboard-container training-awareness">

				<div className="dashboard-section">
					<div className="welcome-text">
						<div className="pageTitle training-header">
							<h2>Training & Awareness</h2>
							<div className="training-option" onClick={() => this.setModalShowOne(true)}>

							</div>
						</div>
					</div>

					<Row className="h-100">
						{/* Course Summary */}
						<Col md="12" xl="3 course-summary">
							<Card>
								<Card.Body>
									<div className="total-courses">
										<h3>Total Courses <span>09</span></h3>
									</div>
									<div className="progress-circle">
										<div>
											<CircularProgressbar
												value={percentage}
												text={`${percentage}%`}
												strokeWidth={4}
												styles={buildStyles({
													textColor: "#9A9A9A",
													pathColor: "#CBCBCB",
													trailColor: "#00D225"
												})}
											/>
											<span className="progress-label">Completed</span>
										</div>
										<div>
											<CircularProgressbar
												value={percentage}
												text={`${percentage}%`}
												strokeWidth={4}
												styles={buildStyles({
													textColor: "#9A9A9A",
													pathColor: "#CBCBCB",
													trailColor: "#F47700"
												})}
											/>
											<span className="progress-label">In-Progress</span>
										</div>
										<div>
											<CircularProgressbar
												value={percentage}
												text={`${percentage}%`}
												strokeWidth={4}
												styles={buildStyles({
													textColor: "#9A9A9A",
													pathColor: "#CBCBCB",
													trailColor: "#FB0033"
												})}
											/>
											<span className="progress-label">Yet to Start</span>
										</div>
									</div>
								</Card.Body>
							</Card>
						</Col>
						{/* Course List */}

						<Col md="12" xl="9 course-list">
							<Row className="m-0">
								<Col sm="6" md="4" xl="4">
									<Card>
										<Card.Img variant="top" src={socialDistancing} />
										<Card.Body>
											<Card.Title>Social Distancing</Card.Title>
											<Card.Text>
												Some quick example text to build on the card title and make up.
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>
								<Col sm="6" md="4" xl="4">
									<Card>
										<Card.Img variant="top" src={handSanitization} />
										<Card.Body>
											<Card.Title>hand Sanitization</Card.Title>
											<Card.Text>
												Some quick example text to build on the card title and make up.
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>
								<Col sm="6" md="4" xl="4">
									<Card>
									<Card.Img variant="top" src={knowYourMask} />
										<Card.Body>
											<Card.Title>Know Your Mask</Card.Title>
											<Card.Text>
												Some quick example text to build on the card title and make up.
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>
								<Col sm="6" md="4" xl="4">
									<Card>
										<Card.Img variant="top" src={knowYourMask} />
										<Card.Body>
											<Card.Title>Know Your Mask</Card.Title>
											<Card.Text>
												Some quick example text to build on the card title and make up.
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>

								<Col sm="6" md="4" xl="4">
									<Card>
										<Card.Img variant="top" src={coronaVirus} />
										<Card.Body>
											<Card.Title>Corona Virus Symtoms</Card.Title>
											<Card.Text>
												Some quick example text to build on the card title and make up.
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>
								<Col sm="6" md="4" xl="4">
									<Card>
										<Card.Img variant="top" src={socialDistancing} />
										<Card.Body>
											<Card.Title>Social Distancing</Card.Title>
											<Card.Text>
												Some quick example text to build on the card title and make up.
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>
								<Col sm="6" md="4" xl="4">
									<Card>
										<Card.Img variant="top" src={coronaVirus} />
										<Card.Body>
											<Card.Title>Corona Virus Symtoms</Card.Title>
											<Card.Text>
												Some quick example text to build on the card title and make up.
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>
								<Col sm="6" md="4" xl="4">
									<Card>
										<Card.Img variant="top" src={handSanitization} />
										<Card.Body>
											<Card.Title>hand Sanitization</Card.Title>
											<Card.Text>
												Some quick example text to build on the card title and make up.
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>
								<Col sm="6" md="4" xl="4">
									<Card>
										<Card.Img variant="top" src={knowYourMask} />
										<Card.Body>
											<Card.Title>Know Your Mask</Card.Title>
											<Card.Text>
												Some quick example text to build on the card title and make up.
											</Card.Text>
										</Card.Body>
									</Card>
								</Col>


							</Row>
						</Col>
					</Row>


					{/*  AddPlant*/}
					<Modal id="dualListBox"
						show={this.state.modalShow_One}
						onHide={() => { this.setModalShowOne(false) }}
						size="md"
						aria-labelledby="contained-modal-title-vcenter"
						centered
					>
						<Modal.Header closeButton>
							<Modal.Title id="contained-modal-title-vcenter">

								<div className="modal-box w-50">

									<Form.Group controlId="exampleForm.ControlSelect1" className="row mb-4 align-items-center mr-0">
										<Form.Label className="col-lg-3 mb-0 pb-0 courseName">Course</Form.Label>
										<Form.Control as="select" className="col-lg-9 pb-2 modal-box-select pl-0">
											<option>Hand Sanitization</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
										</Form.Control>
									</Form.Group>
									<div className="ListBox">
										<Form.Group controlId="exampleForm.ControlSelect1">
											<Form.Control as="select">
												<option>Human Resource</option>
												<option>2</option>
												<option>3</option>
												<option>4</option>
												<option>5</option>
											</Form.Control>
										</Form.Group>
										<DualListBox
											options={options}
											selected={selected}
											onChange={this.onChange}
										/>
										<div className="btn-container text-center">
											<Button variant="secondary" className="cancel-btn">Cancel</Button>
											<Button variant="success" className="assign-btn">Assign</Button>
										</div>
									</div>
								</div>

							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
						</Modal.Body>
					</Modal>

				</div>
			</div>
		);
	}
}

export default TraningAndAwareness;