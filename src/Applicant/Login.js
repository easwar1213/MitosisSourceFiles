import React, { Component } from 'react';

//CSS
import '../Style/style.css';

//Logo Image
import logo from '../img/logo_white.png';

//Material UI Component
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Username from 'material-ui/svg-icons/communication/email';

//Bootstrap Component
import { Grid, Row, Col, Checkbox, Button } from 'react-bootstrap';

//AWS User Pool
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

//API Calling Methods
import axios from 'axios';

//Routing
import history from '../Routing/history';

//Password Filed
import PasswordField from 'material-ui-password-field';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

import ApplicantDashboard from './ApplicantDashboard';
var lan = "en";
var emailresult;
var nameresult;
var passwordresult;

/* User Pool Access Details */
const poolData = {
    UserPoolId: 'us-west-2_wgkaBUmz5',// Your user pool id here
    ClientId: '3ocb7u0422dhf9c38vacc0kfv3', // Your client id here 4gjka5ag6svfp0f3c4i2a1r8oo
    identityID: "us-west-2:2cae3c46-6f2b-40dd-a059-5313e2b8b23b",//"us-west-2:e2caf986-8e5b-4c17-abe1-362efe0c8960",
    region: "us-west-2",
};




function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function removeCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

const focusUsernameInputField = input => {
    input.focus('aa');
  };

class Login extends Component {
    constructor() {
        super();
        //Field State Values Initialization    
        this.state = {
            UserName: "",
            Password: "",
            errUserName: false,
            errPassword: false,
            loginFailed: false,
            errorLogin: false,
            checkValid: "",
            ischecked: false,
            RTCStatus: "",
            RUserId: "",
            lang: ""
        }
    }

    //Handle Event
    usernameHandle(event) {
        this.setState({ UserName: event.target.value });


    }
    passwordHandle(event) {
        this.setState({ Password: event.target.value });

    }
    checkCookie() {

        var user = getCookie("username");
        if (user) {
            this.state.UserName = user;
        }
    }
    

    googleTranslateElementInit() {
        let thisObj = this;
        new window.google.translate.TranslateElement({
            // here is where you change the language
            pageLanguage: '', includedLanguages: 'de,en,es,fr,it,ja,ko,nl,no,pt,zh-CN', defaultLanguage: 'en', multilanguagePage: true
        }, 'google_translate_element_login');
        var translated = document.getElementById("google_translate_element_login");

        var select = document.querySelector("select.goog-te-combo");
        select.onchange = function () {
            lan = select.options[select.selectedIndex].value;
        }
    }


    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        nameresult = localStorage.getItem('applicant_name');
        passwordresult = localStorage.getItem('applicant_password');
        if (emailresult != "") {
            localStorage.setItem('applicant_email', "");
        }
        if (nameresult != "") {
            localStorage.setItem('applicant_name', "");
        }
        if (passwordresult != "") {
            localStorage.setItem('applicant_password', "");
        }
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '/language.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = this.googleTranslateElementInit;

    }   
    

    /* Rendering Page */
    render() {
        this.checkCookie();

        return (
            <div className="Login-Bg">
                <Row>
                    <Col md={6} xs={6} sm={6}>
                        <a href="http://gpa-hosting.s3-website-us-west-2.amazonaws.com/Home/"><img src={logo} alt="logo" className="CompanyLogo" width="165" height="70" /></a>
                    </Col>

                    <Col md={6} xs={6} sm={6}>
                        <div className="Multilang">
                            <label className="hide-xs">Select Language:</label>
                            <div className="GoogleTrans" id="google_translate_element_login"></div>
                        </div>
                    </Col>
                </Row>
                <MuiThemeProvider>
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={7}></Col>
                            <Col xs={12} md={5} className="LoginPage">
                                <h3>APPLICANT LOGIN</h3>
                                <Col xs={12} md={12} className="input-fileds">
                                    <Username style={{ position: 'absolute', right: 30, top: 35, width: 20, height: 20, color: '#a8a7aa' }} />
                                    <TextField hintText="Enter Your User ID(Email)" floatingLabelText="User ID(Email)" type="email" maxLength="55"
                                        errorText={this.state.errUserName ? "Please Enter Your User ID(Email)" : null}
                                        value={this.state.UserName}
                                        onChange={this.usernameHandle.bind(this)}                                        
                                        onKeyPress={event => {
                                            if (event.key === 'Enter') {                                              
                                              this.loginSubmit();
                                            }
                                          }}
                                          autoFocus
                                    />
                                </Col>
                                <Col xs={12} md={12} className="input-fileds">
                                    <PasswordField floatingLabelText="Password" 
                                    errorText={this.state.errPassword ? "Please Enter Your Password" : null} 
                                    value={this.state.Password}
                                    onChange={this.passwordHandle.bind(this)} maxLength="55" onKeyPress={event => {
                                            if (event.key === 'Enter') {                                              
                                              this.loginSubmit();
                                            }
                                        }}
                                    />
                                </Col>

                                <span className="validationmsg">{this.state.errorLogin ? "Invalid Username or Password" : null}</span>
                                <Col xs={6} md={6} className="kepSign">
                                    <Checkbox inline value={this.state.ischecked} onClick={this.handleCheck.bind(this)} >Keep me signed in</Checkbox>
                                </Col>
                                <Col xs={6} md={6} className="kepSign">
                                    <a href="/ForgotPassword"><p className="forgotpwd">Forgot Password?</p></a>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col md={3}></Col>
                                    <Col md={4} className="text-center">
                                        <Button type="submit" className="LoginButton" value={this.state.ischecked} onClick={this.loginSubmit.bind(this)}>LOGIN</Button>
                                        <span>{this.state.loginFailed ? "Please enter validCredentials" : null}</span>
                                    </Col>
                                    <Col md={4}></Col>
                                    <Col md={12}>
                                        <Col md={2}></Col>
                                        <Col md={8}>
                                            <span className="validationmsg incorrectuser">{this.state.checkValid ? "Invalid UserName or Password " : null}</span>
                                        </Col>
                                        <Col md={2}></Col>
                                    </Col>
                                </Col>
                            </Col>
                        </Row>
                    </Grid>
                </MuiThemeProvider>
            </div>
        );
    }

    handleCheck() {
        if (this.state.ischecked == false || this.state.ischecked == '') {
            this.setState({
                ischecked: true
            });
        }
        else {
            this.setState({
                ischecked: false
            });

        }

    }


    loginSubmit() {
        this.setState({
            lang: lan
        }, () => { this.props.setLang(this.state.lang); });

        var var_password = this.state.Password.length;
        var validCheck = false;

        if (this.state.UserName.length > 0) {
            this.setState({ errUserName: false });
            validCheck = true;
        } else {
            this.setState({ errUserName: true });
            validCheck = false;
        }

        if (var_password > 0) {
            this.setState({ errPassword: false });
            validCheck = true;
        } else {
            this.setState({ errPassword: true });
            validCheck = false;
        }

        if (validCheck) {
            this.setState({ errPassword: false });
            this.signUpLogin(this);
        }

        if (this.state.ischecked) {
            this.setState({ ischecked: true });
            setCookie("username", this.state.UserName, 30);                     
        }
        else {
            this.setState({ ischecked: false });
            clearListCookies();

        }
    }

    handleReadClientCompany(event) {

        var thisObj = this;
        let UserID;

        let ReadCliCompanyAPIUrl = "https://cx1y9bpqe2.execute-api.us-west-2.amazonaws.com/Dev/GPA_ReadClientCompanyDatas_Lambda";
        var JSONData = JSON.stringify({
            QueryName: "TC",
            UserID: thisObj.props.LoginData.LUserID,

        });

        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: ReadCliCompanyAPIUrl,
            headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.props.setCCompanyID(data[i].CompanyName);
            }

        }).catch((err) => {

        });
    }

    handleAppProcessFlowRead(event) {
        let AppProFlowAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify({
            QueryName: "ApplicantProcessFlowTrackingRead",
            UserID: this.props.LoginData.LUserID
        });
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: AppProFlowAPIUrl,
            headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            let ShowTCFlag = false;
            let ShowDBFlag = false;
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].Welcome == "C") {
                        ShowTCFlag = true;
                    }
                    if (data[i].TC == "C") {
                        ShowDBFlag = true;
                    }
                }
                if (ShowTCFlag && ShowDBFlag) {
                    history.push('/ApplicantDashboard');
                }
                else if (ShowTCFlag) {
                    history.push('/TermsAndCondition');
                }
                else {
                    history.push('/WelcomePage');
                }
            }
            else {
                history.push('/WelcomePage');
            }
        }).catch((err) => {

        })
    }

    signUpLogin(e) {
        var authenticationData = {
            Username: this.state.UserName,
            Password: this.state.Password,
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);

        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username: this.state.UserName,
            Pool: userPool
        };
        this.props.setUserID(this.state.UserName);
        this.props.setPassword(this.state.Password);
        var thisObj = this;
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {

                localStorage.setItem('applicant_email', result.idToken.payload.email);
                localStorage.setItem('applicant_name', result.idToken.payload.given_name);
                localStorage.setItem('applicant_password', result.idToken.payload.address.formatted);
                thisObj.handleReadClientCompany(thisObj);
                cognitoUser.getUserAttributes(function (err, result) {
                    if (err) {
                        return;
                    }
                    for (var i = 0; i < result.length; i++) {

                        if (result[i].getName() == "given_name") {
                            thisObj.props.setUserName(result[i].getValue());
                        }
                    }
                });

                thisObj.handleAppProcessFlowRead(this);

            },
            onFailure: function (err) {
                thisObj.setState({ checkValid: err.message });
            },
        });
    }

    callAfterLogin(t) {

        if (t == 2) {
            if (this.state.checkValid) {
                history.push('/Registration');
                this.setState({ errorLogin: false });
            }
            else {
                this.setState({ errorLogin: true });
            }
        }
    }
    redirectHandle(e) {
        history.push('/ForgotPassword');
    }
}
const buildLogins = (username, jwtToken, config) => {
    const loginDomain = `cognito-idp.${config.region}.amazonaws.com`;
    const loginUrl = `${loginDomain}/${config.UserPoolId}`;
    const creds = {
        IdentityPoolId: config.identityID,
        Logins: {

        },
        LoginId: username, // https://github.com/aws/aws-sdk-js/issues/609
    };
    creds.Logins[loginUrl] = jwtToken;
    return creds;
};
function clearListCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var spcook = cookies[i].split("=");
        deleteCookie(spcook[0]);
    }
    function deleteCookie(cookiename) {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        var expires = ";expires=" + d;
        var name = cookiename;
        var value = "";
        document.cookie = name + "=" + value + expires + "; path=/acc/html";
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
        setLang: (PLanguage) => {
            dispatch(Action.setLang(PLanguage));
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(Login, ApplicantDashboard);


