import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import loginImg from '../../assets/images/login-img.png';
import loginLogo from '../../assets/images/logo.svg';
import ccpLogo from '../../assets/images/cloudnow-logo.png';
import pwdIcon from '../../assets/images/password.svg';
import emailIcon from '../../assets/images/email.svg';
import axios from 'axios';

import BaseUrl from '../../Service/BaseUrl';
import * as LoginService from '../../Service/LoginService';
import AuthGuard from '../../AuthGuard';

var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			isError: {
				email: '',
				password: ''
			},
			message: ''
		}
	}
	redirectToDashboard = () => {
		this.props.history.push("/home/dashboard");
	};
	redirectToOnsitesurvey = () => {
		this.props.history.push("/home/onsitesurvey");
	};
	componentDidMount() {
		if (AuthGuard.getAuth() == true || AuthGuard.getAuth() == 'true') {
			this.redirectToDashboard();
		}
	}
	emailValidator = (Param) => {
		var returnMsg = '';
		if (mailformat.test(Param)) {
			returnMsg = '';
		} else {
			returnMsg = 'Please enter a valid email id';
		}
		return returnMsg;
	}
	passwordValidator = (Param) => {
		var returnMsg = '';
		if (Param.length < 6) {
			returnMsg = 'Atleast 6 characaters required';
		} else {
			returnMsg = '';
		}
		return returnMsg;
	}
	formValChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		let isError = { ...this.state.isError };
		switch (name) {
			case "email":
				isError.email = this.emailValidator(value)
				break;
			case "password":
				isError.password = this.passwordValidator(value)
				break;
			default:
				break;
		}

		this.setState({
			isError,
			[name]: value
		});
	};
	userlogin = e => {
		e.preventDefault();
		if (this.emailValidator(this.state.email) == '' && this.passwordValidator(this.state.password) == '') {
			var requestData = {
				"emailId": this.state.email,
				"password": this.state.password
			};
			debugger;
			LoginService.onAuthenticate(requestData).then(Response => {
				if (Response.status.success == 'Fail') {
					this.setState({ message: Response.status.message });
					sessionStorage.setItem('isAuthorized',false);
				} else {
					sessionStorage.LoginUserObject = JSON.stringify(Response.data);
					sessionStorage.setItem('isAuthorized',true);
					if(Response.data.bcmUserGroupWrapper.userGroup === 'Security'){
						this.redirectToOnsitesurvey();
					}else{
						this.redirectToDashboard();
					}
				}
			});
		} else {
			let isError = { ...this.state.isError };
			console.log(isError);
			isError.email = this.emailValidator(this.state.email);
			isError.password = this.passwordValidator(this.state.password);
			this.setState({ isError: isError });
		}
	}
	render() {
		const { isError } = this.state;
		return (
			<div className="login-container">
				<Container>
					<Row>
						<Col lg="6">
							<img src={loginImg} className="img-fluid" />
						</Col>
						<Col lg="6">
							<div className="login-logo">
								<img src={loginLogo} className="img-fluid" />
							</div>
							<Form className="login-form" noValidate>
								<Form.Group controlId="username">
									<Form.Control type="text" placeholder="Username" name="email"
										onChange={this.formValChange.bind(this)} value={this.state.email} />
									{isError.email.length > 0 && (
										<Form.Text className="error-msg"> {isError.email} </Form.Text>
									)}
									<div className="input-icon">
										<img src={emailIcon} className="img-fluid" />
									</div>
								</Form.Group>

								<Form.Group controlId="password">
									<Form.Control type="password" name="password" placeholder="Password"
										onChange={this.formValChange.bind(this)} value={this.state.password} />
									{isError.password.length > 0 && (
										<Form.Text className="error-msg">{isError.password}</Form.Text>
									)}									
									<div className="input-icon pwd">
										<img src={pwdIcon} className="img-fluid"/>
									</div>
								</Form.Group>
								{
									this.state.message == ""
										? ''
										: <Form.Text className="error-msg">{this.state.message}</Form.Text>
								}
								<div className="login-btn">
									<Button variant="primary" type="submit" onClick={this.userlogin}>
										Login
									</Button>
								</div>
								<div className="powered-by">
									<p>Powered By</p>
									<img src={ccpLogo} className="img-fluid" />
								</div>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Login;