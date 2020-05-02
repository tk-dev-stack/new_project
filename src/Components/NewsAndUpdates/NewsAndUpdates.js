import React, { Component } from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';

class NewsAndUpdates extends Component {
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
                        News and Updates
                    </div>										
				</Row>				 				
			</div>
		);
	}
}

export default NewsAndUpdates;