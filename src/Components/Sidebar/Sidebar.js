import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
				  	<li><NavLink to="/home/dashbord" ><span className="have-icon"><img src={dashboardIcon}/></span></NavLink></li>
				  	<li><NavLink to="/home/employeehealth"><span className="have-icon"><img src={empHealth}/></span></NavLink></li>
					<li><NavLink to="/home/cleansanitization"><span className="have-icon"><img src={cleanSan}/></span></NavLink></li>
				  	<li><NavLink to="/home/traningawareness"><span className="have-icon"><img src={trainAware}/></span></NavLink></li>
					<li><NavLink to="/home/newsandupdates"><span className="have-icon"><img src={newsUpdates}/></span></NavLink></li>					
				</ul>
			  </div>
			</div>			
		);
	}
}

export default Sidebar;