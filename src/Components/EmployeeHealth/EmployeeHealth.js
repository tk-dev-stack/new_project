import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

class EmployeeHealth extends Component {
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
                        Employee Health
                    </div>										
				</Row>				 				
			</div>
		);
	}
}

export default EmployeeHealth;