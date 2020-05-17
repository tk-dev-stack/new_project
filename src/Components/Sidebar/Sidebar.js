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
			Data: [],
			userGroup:'',
			addClass: false			
		};
	}	
	componentDidMount(){
		this.setState({userGroup:JSON.parse(sessionStorage.LoginUserObject).bcmUserGroupWrapper.userGroup});								
	}
	toggle() {
		this.setState({addClass: !this.state.addClass});
	  }
	render() {
		let boxClass = ["box"];
    if(this.state.addClass) {
      boxClass.push('active');
    }
		return (			
			<div id="sidebar" className={boxClass.join(' ')}>
				<div className={boxClass.join(' ')} onClick={this.toggle.bind(this)} id="toggle">
				<span></span>
				</div>
			  <div className="menu">
			  {
				this.state.userGroup == 'Security' ?(
					<ul className="list-unstyled">											
						<li><NavLink to="/home/onsitesurvey"><span className="have-icon"><img src={empHealth}/></span></NavLink></li>																				  					
					</ul>
				):(
					<ul className="list-unstyled">																	
						<li><NavLink to="/home/dashboard" ><span className="have-icon"><img src={dashboardIcon}/></span></NavLink></li>
						<li><NavLink to="/home/employeehealth"><span className="have-icon"><img src={empHealth}/></span></NavLink></li>
						<li><NavLink to="/home/cleansanitization"><span className="have-icon"><img src={cleanSan}/></span></NavLink></li>
						<li><NavLink to="/home/traningawareness"><span className="have-icon"><img src={trainAware}/></span></NavLink></li>
						<li><NavLink to="/home/newsandupdates"><span className="have-icon"><img src={newsUpdates}/></span></NavLink></li>					
						<li><NavLink to="/home/onsitesurvey"><span className="have-icon"><img src={empHealth}/></span></NavLink></li>																				  					
					</ul>
				)
			  }				
			  </div>
			</div>			
		);
	}
}

export default Sidebar;