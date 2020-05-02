import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';


class CleanlinessAndSanitization extends Component {
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
                     Cleanliness and Sanitization
                    </div>										
				</Row>				 				
			</div>
		);
	}
}

export default CleanlinessAndSanitization;