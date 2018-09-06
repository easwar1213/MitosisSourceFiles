import React, { Component } from 'react';
import { Grid, Row, Col, FormControl, FormGroup, Button } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import logo from '../img/logo_white.png';
import '../Style/style.css';
import { Flex } from 'react-flex-material';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, AmazonCognitoIdentity } from 'amazon-cognito-identity-js';

import { AWS } from 'aws-sdk';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import history from '../Routing/history';
import Paper from 'material-ui/Paper';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';
/* User Pool Access Details */
const poolData = {
    UserPoolId: 'us-west-2_wgkaBUmz5',//'us-west-2_kG2V3FBcu', // Your user pool id here
    ClientId: '3ocb7u0422dhf9c38vacc0kfv3',//'4apkr7thetvm981irp8ohsjj1t', // Your client id here 4gjka5ag6svfp0f3c4i2a1r8oo
    identityID: "us-west-2:2cae3c46-6f2b-40dd-a059-5313e2b8b23b",//"us-west-2:746c750e-7185-4675-84c1-95186baed362",//"us-west-2:e2caf986-8e5b-4c17-abe1-362efe0c8960",
    region: "us-west-2",
};

var emailresult;

class UserSetting extends Component {
    constructor(props) {
        super(props);
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

    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        this.setState({EmailID:emailresult});
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
        if (onlyNums.length < 7) {
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
            this.setState({ errorMsgweak: true })
            this.setState({ errorMsgGood: false })
            this.setState({ errorMsgStrong: false })
        }
        else if (this.state.NewPassword.length < 8) {
            this.setState({ errorMsgGood: true })
            this.setState({ errorMsgStrong: false })
            this.setState({ errorMsgweak: false })
        }
        else if (this.state.NewPassword.length > 8) {
            this.setState({ errorMsgStrong: true })
            this.setState({ errorMsgGood: false })
            this.setState({ errorMsgweak: false })
        }
    }
    ConfirmPasswordHandle(event) {
        this.setState({ ConfirmPassword: event.target.value });
        this.setState({ errValidConfirmPwd: false });
        if (this.state.ConfirmPassword.length < 6) {
            this.setState({ errorMsgConfiPwdweak: true })
            this.setState({ errorMsgConfiPwdGood: false })
            this.setState({ errorMsgConfiPwdStrong: false })
        }
        else if (this.state.ConfirmPassword.length < 8) {
            this.setState({ errorMsgConfiPwdGood: true })
            this.setState({ errorMsgConfiPwdStrong: false })
            this.setState({ errorMsgConfiPwdweak: false })
        }
        else if (this.state.ConfirmPassword.length > 8) {
            this.setState({ errorMsgConfiPwdStrong: true })
            this.setState({ errorMsgConfiPwdGood: false })
            this.setState({ errorMsgConfiPwdweak: false })
        }
    }

    validateResetPwd(e) {
        var validForm = false;
        var validCode = false;
        var validNewPassword = false;
        var validConfrmPassword = false;
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
                this.setState({ errorMsgGood: false })
                this.setState({ errorMsgStrong: false })
                this.setState({ errorMsgweak: false })
            }
        }
        else {
            this.setState({ errNewPwd: true });
            validNewPassword = false;
            this.setState({ errorMsgGood: false })
            this.setState({ errorMsgStrong: false })
            this.setState({ errorMsgweak: false })
        }
        if (confirmpassword.length > 0) {
            if (newpassword == confirmpassword) {
                this.setState({ errConfirmPwd: false });
                validConfrmPassword = true;
            } else {
                this.setState({ errConfirmPwd: true });
                validConfrmPassword = false;
                this.setState({ errorMsgConfiPwdGood: false })
                this.setState({ errorMsgConfiPwdStrong: false })
                this.setState({ errorMsgConfiPwdweak: false })
            }
        } else {
            this.setState({ errValidConfirmPwd: true });
        }
        if (validCode && validNewPassword && validConfrmPassword) {
            validForm = true;
        }

        return validForm;
    }
    handleSendVerify(event) {
        event.preventDefault();
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
                
                thisObj.setState({ VerificationCode: '' });
                thisObj.setState({ NewPassword: '' });
                thisObj.setState({ ConfirmPassword: '' });

            },
            onFailure: function (err) {
               
                thisObj.setState({ codeFailedMsg: true });
            }
        });
        localStorage.setItem("mailID", this.state.EmailID);
    }

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
                    
                    thisObj.setState({ codePasswordMsg: true });
                    thisObj.setState({ errValidCode: false });
                },
                onFailure: err => {

                    thisObj.setState({ codePasswordMsg: false });
                    thisObj.setState({ errValidCode: true });
                }
            });
            thisObj.handleReset(this);
        }
    }

    handleNavigateLogin(event) {
        history.push('/Login');
    }

    render() {
        return (
            <div>
                    <Paper zDepth={1} className="CommonDiv">
                        <h2 className="legendtitle">User Setting</h2>   
                        <div className="fieldstyle">
                            <Row className="show-grid">
                                <Col xs={12} md={12} className="input-fileds">
                                    <TextField hintText="Enter Your Email ID" floatingLabelText="Email ID" type="text"
                                        errorText={this.state.errMailID ? "Please Enter Your Email ID" : null}
                                        value={this.state.EmailID}
                                        onChange={this.emailHandle.bind(this)}
                                        disabled
                                    />
                                </Col>
                                <Col md={12} >
                                    <Button className="SendBtn" onClick={this.handleSendVerify.bind(this)} >Send Verfication Code</Button>
                                </Col>
                                <span className="validationSuccessmsg">{this.state.codeSendMsg ? "Verification code has been sent to your mail" : null}</span>
                            </Row>
                        </div>
                    </Paper>

                    <Paper zDepth={1} className="CommonDiv">
                        <h2 className="legendtitle">Change Password</h2>   
                            <div className="fieldstyle">
                                <Row className="show-grid">
                                    <Col xs={12} md={12} className="input-fileds" >
                                        <TextField hintText="Enter Your Verfication Code" floatingLabelText="Verfication Code"
                                            errorText={this.state.errCode ? "Please Enter Your Verification Code" : null}
                                            value={this.state.VerificationCode}
                                            onChange={this.verifyCodeHandle.bind(this)}
                                        />
                                        <span className="validationmsg">{this.state.errValidCode ? "Invalid Verification Code" : null}</span>
                                    </Col>
                                    <Col xs={12} md={12} className="input-fileds">
                                        {/* <PasswordField floatingLabelText="New Password" errorText={this.state.validationError["Password"] ? "Please Enter Your New Password" : ""} value={this.state.Password}
                                                    onChange={this.newPasswordHandle.bind(this)}
                                            /> */}
                                        <TextField hintText="Enter Your New Password" floatingLabelText="New Password" type="password"
                                            errorText={this.state.errNewPwd ? "Please Enter Your New Password" : null}
                                            value={this.state.NewPassword}
                                            onChange={this.newPasswordHandle.bind(this)}

                                        />
                                        <span className="validationWeakmsg">{this.state.errorMsgweak ? <div><span>Week</span><div className="One"></div></div> : ""}</span>
                                        <span className="validationGoodmsg">{this.state.errorMsgGood ? <div><span>Good</span><div className="Two"></div></div> : ""}</span>
                                        <span className="validationStrongmsg">{this.state.errorMsgStrong ? <div><span>Strong</span><div className="Three"></div></div> : ""}</span>
                                    </Col>
                                    <Col xs={12} md={12} className="input-fileds">
                                        <TextField hintText="Enter Your Confirm Password" floatingLabelText="Confirm Password" type="password"
                                            errorText={this.state.errValidConfirmPwd ? "Please Enter Your Confirm Password" : null}
                                            value={this.state.ConfirmPassword}
                                            onChange={this.ConfirmPasswordHandle.bind(this)}
                                        />
                                        <span className="validationmsg">{this.state.errValidNewPwd ? "Invalid Password" : null}</span>
                                        <span className="validationmsg">{this.state.errConfirmPwd ? "Your Password does not Match" : null}</span> 
                                    </Col>
                                    <Col md={12}>
                                        <Button className="RegButton1" onClick={this.handleVerify.bind(this)}>Update</Button>
                                    </Col>
                                    <span className="validationSuccessmsg">{this.state.codePasswordMsg ? "Your Password has been Changed" : null}</span>
                                </Row>
                            </div>
                    </Paper>
            </div>
        );
    }
    handleReset(e) {
        this.setState({
            EmailID: "",
            VerificationCode: "",
            NewPassword: "",
            ConfirmPassword: "",
            errMailID: false,
            errValidMailID: false,
            errCode: false,
            //errValidCode: false,
            errNewPwd: false,
            errConfirmPwd: false,
            errValidNewPwd: false,
            errValidConfirmPwd: false,
            codeSendMsg: false,
            codeFailedMsg: false,
            codePasswordMsg: false,
            errorMsgweak: false,
            errorMsgGood: false,
            errorMsgStrong: false,

        });
    }
}
/// react redux
const mapReducerStateToProps = (state) => {
    return {
        LoginData: state.Login_Reducer,
        UserData: state.User_Reducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserID: (PLUserID) => {
            dispatch(Action.setUserID(PLUserID));
        },
        setPassword: (PLPassword) => {
            dispatch(Action.setPassword(PLPassword));
        },
        setUserName: (PUserName) => {
            dispatch(Action.setUserName(PUserName));
        },
        setCCompanyID: (PCCompanyID) => {
            dispatch(Action.setCCompanyID(PCCompanyID));
        },
        setUTCStatus: (PUTCStatus) => {
            dispatch(Action.setUTCStatus(PUTCStatus));
        }
    }
}

export default connect(mapReducerStateToProps, mapDispatchToProps)(UserSetting);