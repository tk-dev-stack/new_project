import React, { Component } from 'react';
import dashboardIcon from '../../assets/images/dashboard.svg';
import empHealth from '../../assets/images/emp-health.svg';
import cleanSan from '../../assets/images/cleanliness.svg';
import trainAware from '../../assets/images/training.svg';
import newsUpdates from '../../assets/images/news.svg';

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Data: []			
		};
	}	
	componentDidMount(){		
	}
	menuRedirect=(menuKey)=>{
		// if(menuKey == 'dashbord'){
		// 	this.props.history.push("/dashbord");
		// }
		if(menuKey == 'employeehealth'){
			// this.props.history.push("/employeehealth");
			// this.props.router.push('/employeehealth');
		}
		// if(menuKey == 'cleansanitization'){
		// 	this.props.history.push("/cleansanitization");
		// }
		// if(menuKey == 'traningawareness'){
		// 	this.props.history.push("/traningawareness");
		// }
		// if(menuKey == 'coursedetails'){
		// 	this.props.history.push("/coursedetails");
		// }
		// if(menuKey == 'newsandupdates'){
		// 	this.props.history.push("/newsandupdates");	
		// }		
	}
	render() {
		return (			
			<div className="sidebar">
			  <div className="menu">
				<ul className="list-unstyled">
				  	<li><a href="/home/dashbord" className="active"><span className="have-icon"><img src={dashboardIcon}/></span></a></li>
				  	<li><a href="/home/employeehealth"><span className="have-icon"><img src={empHealth}/></span></a></li>
					<li><a href="/home/cleansanitization"><span className="have-icon"><img src={cleanSan}/></span></a></li>
				  	<li><a href="/home/traningawareness"><span className="have-icon"><img src={trainAware}/></span></a></li>
					<li><a href="/home/newsandupdates"><span className="have-icon"><img src={newsUpdates}/></span></a></li>					
				</ul>
			  </div>
			</div>			
		);
	}
}

export default Sidebar;