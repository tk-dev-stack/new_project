import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';


class TraningAndAwareness extends Component {
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
                        Traning and Awareness
                    </div>										
				</Row>				 				
			</div>
		);
	}
}

export default TraningAndAwareness;