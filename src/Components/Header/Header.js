import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import logo from '../../assets/images/logo-white.svg';
import bellIcon from '../../assets/images/bell.svg';
import searchIcon from '../../assets/images/search.svg';
import userImg from '../../assets/images/user.png';
import { withRouter } from 'react-router-dom';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Data: []			
		};
	}
	
	componentDidMount(){
		
	}

	logout = ()=>{
		this.props.history.push('/login');
		sessionStorage.clear();
	}

	render() {
		return (
				<header className="header navbar fixed-top">
					<a className="navbar-brand logo">
						<img src={logo} />
					</a>
					<button className="navbar-toggler sidebar-toggler d-none" type="button">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="welcome-text">
						<div className="user-name">Hello <i> Kesava,</i></div>
						<div>
						<span className="team-name">Have a nice day at work</span>
						</div>
					</div>									
					<ul className="nav navbar-nav ml-auto">
					<li className="nav-item search">
						<form>
							<input className="form-control" type="text" placeholder="Search" aria-label="Search"/>
							<span className="search-icon"><img src={searchIcon} /></span>
						</form>
					</li>
						<li className="nav-item dropdown notification">
							<a className="nav-link" href="" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<img src={bellIcon} />
								<span className="badge badge-primary">4</span>
							</a>
							<div className="noti-dropdown dropdown-menu dropdown-menu-right" aria-labelledby="dropdown07">
								<div className="noti-container">
									<div className="dropdown-title">
										<h4>Notification</h4>
									</div>
									<ul className="list-unstyled noti-list">
										<li className="row noti">
											<figure className="col profile-pic">
												<div className="pic">

												</div>
											</figure>
											<div className="col noti-details">
												<div className="row">
													<div className="col user-info">
														<h5 className="user-name">Pablo Picasso</h5>
														<small>Management</small>
													</div>
													<div className="col quote-num">
														<h6>Quotation Number : <span>IM2019051855BC</span></h6>
													</div>
												</div>
												<div className="row quote-msg">
													<div className="col">
														<p>This quotation has been <span className="text-success">APPROVED</span>
															from
															Management</p>
													</div>
												</div>
											</div>
										</li>
										<li className="row noti">
											<figure className="col profile-pic">
												<div className="pic">

												</div>
											</figure>
											<div className="col noti-details">
												<div className="row">
													<div className="col user-info">
														<h5 className="user-name">Pablo Picasso</h5>
														<small>Staff</small>
													</div>
													<div className="col quote-num">
														<h6>Quotation Number : <span>IM2019051855BC</span></h6>
													</div>
												</div>
												<div className="row quote-msg">
													<div className="col">
														<p>This quotation has been <span className="text-success">APPROVED</span>
															from
															Management</p>
													</div>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</li>                    
						<li className="nav-item dropdown user-profile">
						<Dropdown>
							<Dropdown.Toggle className="nav-link" id="user-profile">
								<img src={userImg} />
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item  onClick={this.logout}>Logout</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>                       
                    </li>
					
                	</ul>
				</header>			
		);
	}
}

export default withRouter(Header);