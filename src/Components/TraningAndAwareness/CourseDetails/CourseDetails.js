import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';

class CourseDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Data: []				
		};
	}
	componentDidMount(){		
	}
    
	render() {
		return (
			<div className="dashboard-container">		
                <Row>
                    <div>
                        Course Details
                    </div>										
				</Row>				 				
			</div>
		);
	}
}

export default CourseDetails;