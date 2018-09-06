import React, { Component } from 'react';
import {  Row, Col,  Button } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import logo from '../img/logo_white.png';
import '../Style/style.css';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';


import history from '../Routing/history';

/* User Pool Access Details */
const poolData = {
    UserPoolId: 'us-west-2_UQwin8iAX',//'us-west-2_kG2V3FBcu', // Your user pool id here
    ClientId: '6ha6cqggmhffua9cpmkvllpner',//'4apkr7thetvm981irp8ohsjj1t', // Your client id here 4gjka5ag6svfp0f3c4i2a1r8oo
    identityID: "us-west-2:dd399bd5-2f55-4972-b1d6-146351a7f1bd",//"us-west-2:746c750e-7185-4675-84c1-95186baed362",//"us-west-2:e2caf986-8e5b-4c17-abe1-362efe0c8960",
    region: "us-west-2",
};

class AdminForgotPassword extends Component {
	constructor() {
		super();
		this.state = {
			EmailID: "",
			VerificationCode: "",
			NewPassword: "",
			ConfirmPassword: "",
			errMailID: false,
			errValidMailID: false,
			errCode: false,
			errValidCode: false,
			errNewPwd: false,
			errConfirmPwd: false,
			errValidNewPwd: false,
			errValidConfirmPwd: false,
			codeSendMsg: false,
			codePasswordMsg: false,
		}
	}
	emailHandle(event) {
		this.setState({ EmailID: event.target.value });

	}

	handleKeyPress(event) {
		if (event.key === 'Enter') {
			//		      this.emailHandle(event);
		}
	}


	verifyCodeHandle(event) {
		const onlyNums = event.target.value.replace(/[^0-9]/g, '');
		if (onlyNums.length < 7) 
		{
			this.setState({ VerificationCode: onlyNums });
			this.setState({ codeSendMsg: false });
			this.setState({ errValidCode: false });
			this.setState({ errCode: false });
		}

		// if(this.state.VerificationCode.length==6)
		// {
		// 	this.handleOTPVerify(this);
		// }
	}
	newPasswordHandle(event) {
		this.setState({ NewPassword: event.target.value });
		this.setState({ errNewPwd: false });
		this.setState({ errValidNewPwd: false });
		if (this.state.NewPassword.length < 6) {
            this.setState({errorMsgweak:true})
            this.setState({errorMsgGood:false})
            this.setState({errorMsgStrong:false})
        }
        else if(this.state.NewPassword.length < 8) {
            this.setState({errorMsgGood:true})
            this.setState({errorMsgStrong:false})
            this.setState({errorMsgweak:false})
        }
        else if(this.state.NewPassword.length > 8) {
            this.setState({errorMsgStrong:true})
            this.setState({errorMsgGood:false})
            this.setState({errorMsgweak:false})
        }
	}
	ConfirmPasswordHandle(event) {
		this.setState({ ConfirmPassword: event.target.value });
		this.setState({ errValidConfirmPwd: false });
		if (this.state.ConfirmPassword.length < 6) {
            this.setState({errorMsgConfiPwdweak:true})
            this.setState({errorMsgConfiPwdGood:false})
            this.setState({errorMsgConfiPwdStrong:false})
        }
        else if(this.state.ConfirmPassword.length < 8) {
            this.setState({errorMsgConfiPwdGood:true})
            this.setState({errorMsgConfiPwdStrong:false})
            this.setState({errorMsgConfiPwdweak:false})
        }
        else if(this.state.ConfirmPassword.length > 8) {
            this.setState({errorMsgConfiPwdStrong:true})
            this.setState({errorMsgConfiPwdGood:false})
            this.setState({errorMsgConfiPwdweak:false})
        }
	}
	validateField(e) {
		var validForm = false;
		var validate_Email = this.state.EmailID;
		if (validate_Email.length > 0) {
			this.setState({ errMailID: false });
			var validid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (validid.test(validate_Email)) {
				this.setState({ errValidMailID: false });
				validForm = true;

			} else {
				this.setState({ errValidMailID: true });
				validForm = false;
			}
		} else {
			this.setState({ errMailID: true });
			validForm = false;
		}
		return validForm
	}
	validateResetPwd(e) {
		var validForm = false;
		var validCode = false;
		var validNewPassword =false;
		var validConfrmPassword =false;
		var code = this.state.VerificationCode;
		var newpassword = this.state.NewPassword;
		var confirmpassword = this.state.ConfirmPassword;
		if (code.length > 0) {
			validCode = true;
			this.setState({ errCode: false });
		} else {
			this.setState({ errCode: true });
			validCode = false;
		}
		if (newpassword.length > 0) {
			this.setState({ errNewPwd: false });
			var validid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
			if (validid.test(newpassword)) {
				this.setState({ errValidNewPwd: false });
				validNewPassword = true;
			} else {
				this.setState({ errValidNewPwd: true });
				validNewPassword = false;
				this.setState({errorMsgGood:false})
                this.setState({errorMsgStrong:false})
                this.setState({errorMsgweak:false})
			}
		}
		else {
			this.setState({ errNewPwd: true });
			validNewPassword = false;
			this.setState({errorMsgGood:false})
            this.setState({errorMsgStrong:false})
            this.setState({errorMsgweak:false})
		}
		if (confirmpassword.length > 0) {
			if (newpassword == confirmpassword) {
				this.setState({ errConfirmPwd: false });
				validConfrmPassword = true;
			} else {
				this.setState({ errConfirmPwd: true });
				validConfrmPassword = false;
				this.setState({errorMsgConfiPwdGood:false})
                this.setState({errorMsgConfiPwdStrong:false})
                this.setState({errorMsgConfiPwdweak:false})
			}
		} else {
			this.setState({ errValidConfirmPwd: true });
		}
       if(validCode && validNewPassword && validConfrmPassword){
		validForm = true;
	   }
		
	   return validForm;
	}
	handleSendVerify(event) {
		var isValid = this.validateField(this);
		event.preventDefault();
		if (isValid) {
			var userPool = new CognitoUserPool(poolData);
			var userData = {
				Username: this.state.EmailID,
				Pool: userPool
			};

			var cognitoUser = new CognitoUser(userData);
			var thisObj = this;
			cognitoUser.forgotPassword({
				onSuccess: function (result) {
					thisObj.setState({ codeSendMsg: true });
					thisObj.setState({ codeFailedMsg: false });
					console.log(result);
				},
				onFailure: function (err) {
					console.log(err);
					thisObj.setState({ codeFailedMsg: true });
				}
			});


		}
		localStorage.setItem("mailID", this.state.EmailID);
	}

	// handleOTPVerify(event) {
	// 	var userPool = new CognitoUserPool(poolData);
	// 		var code = this.state.VerificationCode;
	// 		var userID = this.state.EmailID;
	// 		if (userID == null || userID == "") {
	// 			userID = localStorage.getItem("mailID");
	// 		}
	// 		var userData = {
	// 			Username: userID,
	// 			Pool: userPool
	// 		};
	// 		var thisObj = this;
	// 		var cognitoUser = new CognitoUser(userData);
	// 		cognitoUser.confirmCode(code, {
	// 			onSuccess: () => {
	// 				console.log("success");
	// 				alert("success");
	// 				thisObj.setState({ codePasswordMsg: true });
	// 				thisObj.setState({ errValidCode: false });
	// 			},
	// 			onFailure: err => {
	// 				console.log(err.message);
	// 				thisObj.setState({ codePasswordMsg: false });
	// 				thisObj.setState({ errValidCode: true });
	// 			}
	// 		});
	// }

	handleVerify(event) {
		var isValid = this.validateResetPwd(this);
		if (isValid) {
			var userPool = new CognitoUserPool(poolData);
			var code = this.state.VerificationCode;
			var userID = this.state.EmailID;
			if (userID == null || userID == "") {
				userID = localStorage.getItem("mailID");
			}
			var userData = {
				Username: userID,
				Pool: userPool
			};
			var thisObj = this;
			var newpwd = this.state.ConfirmPassword;
			var cognitoUser = new CognitoUser(userData);
			cognitoUser.confirmPassword(code, newpwd, {
				onSuccess: () => {
					console.log("success");
					thisObj.setState({ codePasswordMsg: true });
					thisObj.setState({ errValidCode: false });
				},
				onFailure: err => {
					console.log(err.message);
					thisObj.setState({ codePasswordMsg: false });
					thisObj.setState({ errValidCode: true });
				}
			});
		}
	}

	handleNavigateLogin(event) {
		history.push('/AdminLogin');
	}

	/*Google Translater*/
	googleTranslateElementInit() {
        new window.google.translate.TranslateElement({
          // here is where you change the language
          pageLanguage: '',includedLanguages: 'de,en,es,fr,it,ja,ko,nl,no,pt,zh-CN', multilanguagePage: true
        }, 'google_translate_element_forgetpwd');
	  }
	  
	  componentDidMount() { 
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '/language.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);  
        window.googleTranslateElementInit = this.googleTranslateElementInit;
    }


	render() {
		return (
			<div className="Login-Bg">
				<Row>
					<Col md={6}>
						<img src={logo} alt="logo" className="CompanyLogo" width="165" height="70" />
					</Col>
					<Col md={2}>

					</Col>
					<Col md={3}>
						<div className="Multilang">
							<label>Select Language:</label><div className="GoogleTrans" id="google_translate_element_forgetpwd"></div>
						</div>
					</Col>
				</Row>

				{/* <Grid> */}
				<Row className="show-grid">
					<Col md={6} xs={12}></Col>
					<Col xs={12} md={5} className="input-fileds FR-Page">
						<form>
							<fieldset>
								<legend className="legendtitle">Verify Email</legend>
								<Row className="show-grid">
									<Col xs={12} md={12} className="FR-Fields">
										<TextField hintText="Enter Your Email Id" floatingLabelText="Email Id" type="text"
											errorText={this.state.errMailID ? "Please Enter Your Email Id" : null}
											value={this.state.EmailID}
											onKeyPress={this.handleKeyPress} onChange={this.emailHandle.bind(this)}

										/>
										<span className="validationmsg">{this.state.errValidMailID ? "Please enter the valid mail" : null}</span>
										<span className="validationmsg">{this.state.codeFailedMsg ? "Please enter the valid mail  2" : null}</span>
									</Col>
									<Col md={12} >
										<Button className="forgetpwd" type='Submit' onClick={this.handleSendVerify.bind(this)} >Send Verfication Code</Button>
									</Col>
									<span className="validationSuccessmsg">{this.state.codeSendMsg ? "Verification code has been sent to your mail" : null}</span>
								</Row>
							</fieldset>
						</form><br />

						<form>
							<fieldset>
								<legend className="legendtitle">Change Password</legend>
								<Row className="show-grid">
									<Col xs={12} md={12} className="FR-Fields" >
										<TextField hintText="Enter Your Verfication Code" floatingLabelText="Verfication Code"
											errorText={this.state.errCode ? "Please Enter Your Verification Code" : null}
											value={this.state.VerificationCode}
											onChange={this.verifyCodeHandle.bind(this)}
										/>
										<span className="validationmsg">{this.state.errValidCode ? "Invalid Verification Code" : null}</span>
									</Col>
									<Col xs={12} md={12} className="FR-Fields">
									{/* <PasswordField floatingLabelText="New Password" errorText={this.state.validationError["Password"] ? "Please Enter Your New Password" : ""} value={this.state.Password}
                                        onChange={this.newPasswordHandle.bind(this)}
                                /> */}
										<TextField hintText="Enter Your New Password" floatingLabelText="New Password" type="password"
											errorText={this.state.errNewPwd ? "Please Enter Your New Password" : null}
											value={this.state.NewPassword}
											onChange={this.newPasswordHandle.bind(this)}
										/>
										<span className="validationWeakmsg">{this.state.errorMsgweak ? " Password is weak" : ""}</span>
                                        <span className="validationGoodmsg">{this.state.errorMsgGood ? " Password is good" : ""}</span>
                                        <span className="validationStrongmsg">{this.state.errorMsgStrong ? " Password is strong" : ""}</span>
									</Col>
									<Col xs={12} md={12} className="FR-Fields">
									 {/* <PasswordField floatingLabelText="Confirm Password" errorText={this.state.validationError["ConfirmPassword"] ? " Please Enter Your Confirm Password" : ""} value={this.state.Password}
                                        onChange={this.ConfirmPasswordHandle.bind(this)}
                                /> */}
										<TextField hintText="Enter Your Confirm Password" floatingLabelText="Confirm Password" type="password"
										errorText={this.state.errValidConfirmPwd ? "Please Enter Your Confirm Password" : null}
											value={this.state.ConfirmPassword}
											onChange={this.ConfirmPasswordHandle.bind(this)}
										/>
										<span className="validationmsg">{this.state.errConfirmPwd ? "Your Password does not Match" : null}</span>
										{/* <span className="validationmsg">{this.state.errValidConfirmPwd ? "Please enter the password" : null}</span> */}
										<span className="validationWeakmsg">{this.state.errorMsgConfiPwdweak ? " Password is weak" : ""}</span>
                                    	<span className="validationGoodmsg">{this.state.errorMsgConfiPwdGood ? " Password is good" : ""}</span>
                                    	<span className="validationStrongmsg">{this.state.errorMsgConfiPwdStrong ? " Password is strong" : ""}</span>
									</Col>
									<Col md={12}>
										<Button className="forgetpwd" onClick={this.handleVerify.bind(this)}>Set New Password</Button>
									</Col>
									<span className="validationSuccessmsg">{this.state.codePasswordMsg ? "Your Password has been Changed" : null}</span>
								</Row>

							</fieldset>

							<Row>
								<Col xs={12} md={12}>
									<div className="LoginUserBtn">
										<Button className="LoginButton" onClick={this.handleNavigateLogin.bind(this)} >Back To Login</Button>
									</div>
								</Col>
							</Row>
						</form>
					</Col>
				</Row>
				{/* </Grid> */}
			</div>
		);
	}	
}

export default AdminForgotPassword;
