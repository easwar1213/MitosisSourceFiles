import React, { Component } from 'react';
import { Row, Col, Grid, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import GPALogo from '../img/logo_white.png';
import Paper from 'material-ui/Paper/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PasswordField from 'material-ui-password-field';
import SvgIcon from 'material-ui/SvgIcon';
import RaisedButton from 'material-ui/RaisedButton';
import RemoveRedEye from 'material-ui/svg-icons/action/dashboard';
import VerifyIcon from '../img/VerifyIcon.png';
import '../Style/style.css';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, AmazonCognitoIdentity } from 'amazon-cognito-identity-js';
import axios from 'axios';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Google Address Auto Complete
import Geosuggest from 'react-geosuggest';

/* User Pool Access Details */
const poolData = {
    UserPoolId: 'us-west-2_UQwin8iAX',//'us-west-2_kG2V3FBcu', // Your user pool id here
    ClientId: '6ha6cqggmhffua9cpmkvllpner',//'4apkr7thetvm981irp8ohsjj1t', // Your client id here 4gjka5ag6svfp0f3c4i2a1r8oo
    identityID: "us-west-2:dd399bd5-2f55-4972-b1d6-146351a7f1bd",//"us-west-2:746c750e-7185-4675-84c1-95186baed362",//"us-west-2:e2caf986-8e5b-4c17-abe1-362efe0c8960",
    region: "us-west-2",
};

const styles = {
    margin: 20,
};

const TitleItems = [
    <MenuItem value={"Mr."} key={1} primaryText={`Mr.`} />,
    <MenuItem value={"Mrs."} key={2} primaryText={`Mrs.`} />,
    <MenuItem value={"Miss."} key={3} primaryText={`Miss.`} />,
    <MenuItem value={"Ms."} key={4} primaryText={`Ms.`} />,
    <MenuItem value={"Dr."} key={5} primaryText={`Dr.`} />
];

const SuffixItems = [
    <MenuItem value={"Jr."} key={1} primaryText={`Jr.`} />,
    <MenuItem value={"Sr."} key={2} primaryText={`Sr.`} />,
    <MenuItem value={"I"} key={3} primaryText={`I`} />,
    <MenuItem value={"II"} key={4} primaryText={`II`} />,
    <MenuItem value={"III"} key={5} primaryText={`III`} />,
    <MenuItem value={"IV"} key={5} primaryText={`IV`} />
];

const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);
const DayItems = [];
for (let i = 1; i < 32; i++) {
    DayItems.push(<MenuItem value={i} key={i} primaryText={i} />);
}

const MonthItems = [
    <MenuItem value={"January"} key={1} primaryText={"January"} />,
    <MenuItem value={"February"} key={2} primaryText={"February"} />,
    <MenuItem value={"March"} key={3} primaryText={"March"} />,
    <MenuItem value={"April"} key={4} primaryText={"April"} />,
    <MenuItem value={"May"} key={5} primaryText={"May"} />,
    <MenuItem value={"June"} key={6} primaryText={"June"} />,
    <MenuItem value={"July"} key={7} primaryText={"July"} />,
    <MenuItem value={"August"} key={8} primaryText={"August"} />,
    <MenuItem value={"September"} key={9} primaryText={"September"} />,
    <MenuItem value={"October"} key={10} primaryText={"October"} />,
    <MenuItem value={"November"} key={11} primaryText={"November"} />,
    <MenuItem value={"December"} key={12} primaryText={"December"} />,
];

const YearItems = [];
for (let i = 1930; i < 2019; i++) {
    YearItems.push(<MenuItem value={i} key={i} primaryText={i} />);
}

class AdminLoginSetup extends Component {
    constructor() {
        super();
        /* Field State Values Initialization */
        this.state = {
            search: "",
            value: null,
            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            SSNumberState: "",
            PhoneNumState: "",
            MailingAddressState: "",
            EmailState: "",
            ConfirmEmailState: "",
            PasswordState: "",
            ConfirmPasswordState: "",
            validationError: {},
            isValidPhoneNum: false,
            isValidSSNumber: false,
            isValidPwdFormat: false,
            isValidCPwdFormat: false,
            isValidPwdMatch: false,
            code: '',
            showValidMsg: false,
            value: null,
            OTPPopupOpen: false,
            LoginPopupOpen: false,
        }
    }
    /* Form Fields Binding Values Handling Events*/
    handleChangeFirstName(e) {
        this.setState({ FirstNameState: e.target.value });
    }

    handleChangeMiddleName(e) {
        this.setState({ MiddleNameState: e.target.value });
    }

    handleChangeLastName(e) {
        this.setState({ LastNameState: e.target.value });
    }

    handleChangeSSNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            this.setState({ SSNumberState: onlyNums });
        }
    };
    handleChangePhoneNum(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ PhoneNumState: onlyNums });
        }
    }

    handleSelectSuggest(suggest) {
        if(suggest){
            this.setState({ MailingAddressState:suggest.description});
        }
    }

    handleChangeMailingAddress(value) {
        this.setState({ MailingAddressState: value })
    }

    handleChangeEmail(e) {
        this.setState({ EmailState: e.target.value });
    }

    handleChangeConfirmEmail(e) {
        this.setState({ ConfirmEmailState: e.target.value });
    }

    handleChangePassword(e) {
        this.setState({ PasswordState: e.target.value });
        if (this.state.PasswordState.length < 8) {
            this.setState({ errorMsgMedium: false })
            this.setState({ errorMsgGood: false })
            this.setState({ errorMsgStrong: false })
        }
        if (this.state.PasswordState.length > 7 && this.state.PasswordState.length < 9) {
            this.setState({ errorMsgMedium: true })
            this.setState({ errorMsgGood: false })
            this.setState({ errorMsgStrong: false })
        }
        if (this.state.PasswordState.length > 8 && this.state.PasswordState.length < 11) {
            this.setState({ errorMsgMedium: false })
            this.setState({ errorMsgGood: true })
            this.setState({ errorMsgStrong: false })
        }
        if (this.state.PasswordState.length > 10) {
            this.setState({ errorMsgMedium: false })
            this.setState({ errorMsgGood: false })
            this.setState({ errorMsgStrong: true })
        }
    }

    handleChangeConfirmPassword(e) {
        this.setState({ ConfirmPasswordState: e.target.value });
    }
    /* Form Fields Validation Handling Event*/
    handleValidateForm(event) {
        const { validationError } = this.state;
        let validForm = false;
        var validFNameForm = false;
        var validLNameForm = false;
        var validSSNumberForm = false;
        var validPhoneNumForm = false;
        var validAddressForm = true;
        var validEmailForm = false;
        var validCEmailForm = false;
        var validPwdForm = false;
        var validCPwdForm = false;
        var varValidateEmail = this.state.EmailState;
        var varValidateConfirmEmail = this.state.ConfirmEmailState;
        var varValidatePassword = this.state.PasswordState;
        var varValidateConfirmPassword = this.state.ConfirmPasswordState;

        if (this.state.FirstNameState.length > 0) {
            validationError['FirstName'] = false;
            validFNameForm = true;
        }
        else {
            validationError['FirstName'] = true;
            validFNameForm = false;
        }

        if (this.state.LastNameState.length > 0) {
            validationError['LastName'] = false;
            validLNameForm = true;
        }
        else {
            validationError['LastName'] = true;
            this.setState({ isValidLastName: true });
            validLNameForm = false;
        }
        if (this.state.SSNumberState.length > 0) {
            validationError['SSNumber'] = false;
            this.setState({ isValidSSNumber: false });
            validSSNumberForm = true;
        }
        else {
            validationError['SSNumber'] = true;
            this.setState({ isValidSSNumber: true });
            validSSNumberForm = false;
        }
        if (this.state.PhoneNumState.length > 0 && this.state.PhoneNumState.length > 9) {
            validationError['PhoneNum'] = false;
            validPhoneNumForm = true;
        }
        else {
            validationError['PhoneNum'] = true;
            validPhoneNumForm = false;
        }
        if (this.state.MailingAddressState.length > 0) {
            validationError['Address'] = false;
            validAddressForm = true;
        }
        else {
            validationError['Address'] = true;
            validAddressForm = false;
        }
        if (this.state.PhoneNumState.length > 0) {
            if (this.state.PhoneNumState.length > 0 && this.state.PhoneNumState.length > 9) {
                this.setState({ isValidPhoneNum: false });
            }
            else {
                this.setState({ isValidPhoneNum: true });
            }
        }
        else {
            this.setState({ isValidPhoneNum: false });
        }

        if (this.state.EmailState.length > 0) {
            validationError['Email'] = false;
            var varEmailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (this.state.EmailState.length > 0 && this.state.EmailState.length > 7 && varEmailFormat.test(varValidateEmail)) {
                this.setState({ isValidEmailFormat: false });
                validEmailForm = true;
            }
            else {
                this.setState({ isValidEmailFormat: true });
            }
        }
        else {
            validationError['Email'] = true;
            this.setState({ isValidEmailFormat: false });
            this.setState({ isValidEmailMatch: false });
            validEmailForm = false;
        }

        if (this.state.ConfirmEmailState.length > 0) {
            validationError['CEmail'] = false;
            var varEmailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (this.state.ConfirmEmailState.length > 0 && this.state.ConfirmEmailState.length > 7 && varEmailFormat.test(varValidateConfirmEmail)) {
                this.setState({ isValidCEmailFormat: false });
                if (this.state.EmailState == this.state.ConfirmEmailState) {
                    this.setState({ isValidEmailMatch: false });
                    validCEmailForm = true;
                }
                else {
                    this.setState({ isValidEmailMatch: true });
                }
            }
            else {
                this.setState({ isValidCEmailFormat: true });
            }
        }
        else {
            validationError['CEmail'] = true;
            this.setState({ isValidCEmailFormat: false });
            this.setState({ isValidEmailMatch: false });
            validCEmailForm = false;
        }

        if (this.state.PasswordState.length > 0) {
            validationError['Password'] = false;
            var varPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
            if (this.state.PasswordState.length > 0 && this.state.PasswordState.length > 7 && varPasswordFormat.test(varValidatePassword)) {
                this.setState({ isValidPwdFormat: false });
                validPwdForm = true;
            }
            else {
                this.setState({ isValidPwdFormat: true });
            }
        }
        else {
            validationError['Password'] = true;
            this.setState({ isValidPwdFormat: false });
            this.setState({ isValidPwdMatch: false });
            validPwdForm = false;
        }

        if (this.state.ConfirmPasswordState.length > 0) {
            validationError['CPassword'] = false;
            var varPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
            if (this.state.ConfirmPasswordState.length > 0 && this.state.ConfirmPasswordState.length > 7 && varPasswordFormat.test(varValidateConfirmPassword)) {
                this.setState({ isValidCPwdFormat: false });
                if (this.state.PasswordState == this.state.ConfirmPasswordState) {
                    this.setState({ isValidPwdMatch: false });
                    validCPwdForm = true;
                }
                else {
                    this.setState({ isValidPwdMatch: true });
                }
            }
            else {
                this.setState({ isValidCPwdFormat: true });
            }
        }
        else {
            validationError['CPassword'] = true;
            this.setState({ isValidCPwdFormat: false });
            this.setState({ isValidPwdMatch: false });
            validCPwdForm = false;
        }

        if (validFNameForm && validLNameForm && validSSNumberForm && validPhoneNumForm && validAddressForm && validEmailForm && validCEmailForm && validPwdForm && validCPwdForm) {
            validForm = true;
        }
        else {

            validForm = false;
        }

        return validForm;
    }

    /* Popup Dialog Handling Events */
    handleOpenThanksDialog(e) {
        this.verificationCode(this.state.code);
    };

    handleOpenOTPEnterDialog = (e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 7) {
            this.setState({ code: onlyNums });
        }
    };

    render() {
        const { search } = this.state
        const tooltip = (
            <Tooltip id="tooltip" >
                Password required at least 1 uppercase and 1 lowercase,1 digit,1 symbol, minimum 8 character's length.
            </Tooltip>
        );
        const google = window.google;
        return (
            <div>
                <div className="HeaderTile">
                    <Row className="show-grid">
                        <Col xs={6} md={9}>
                            <div className="TitleIcon">
                                <h4><span className="TitleIconColor">{<RemoveRedEye />}</span><span className="TitleTexColor">Admin Login Setup</span></h4>
                            </div>
                        </Col>
                        <Col xs={6} md={3} >
                            <div>
                                <h5><span className="BreadCrumbsClass"><HomeIcon /></span>&nbsp;&nbsp;<b>Home / <a href='#'><span className="ActiveClass">Admin Login Setup</span></a></b></h5>
                            </div>
                        </Col>
                    </Row>
                </div>
                <Paper zDepth={1} className="CommonDiv">
                    <Grid>
                        <Row className="show-grid">
                            <form>
                                <fieldset>
                                    <legend className="legendtitle">ADMIN LOGIN CREATION</legend>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <TextField hintText="Enter Your First Name" floatingLabelText={<span>First Name<span className="manatoryfield">*</span></span>}
                                                value={this.state.FirstNameState}
                                                onChange={this.handleChangeFirstName.bind(this)}
                                                errorText={this.state.validationError["FirstName"] ? "Please Enter Your First Name" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <TextField hintText="Enter Your Middle Name" floatingLabelText="Middle Name"
                                                value={this.state.MiddleNameState}
                                                onChange={this.handleChangeMiddleName.bind(this)}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <TextField hintText="Enter Your Last Name" floatingLabelText={<span>Last Name<span className="manatoryfield">*</span></span>}
                                                value={this.state.LastNameState}
                                                onChange={this.handleChangeLastName.bind(this)}
                                                errorText={this.state.validationError["LastName"] ? "Please Enter Your Last Name" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <TextField hintText="Enter your SSNumber" floatingLabelText={<span>Social Security Number<span className="manatoryfield">&nbsp;*</span></span>}
                                                errorText={this.state.validationError["SSNumber"] ? "Please Enter Your SSNumber" : ""}
                                                value={this.state.SSNumberState}
                                                onChange={this.handleChangeSSNumber.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.showValidSSNumMsg ? "SSNumber Not Match with Your Information" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds" >
                                            <TextField hintText="Enter Your Mobile Phone Number" floatingLabelText={<span>Mobile Phone Number<span className="manatoryfield">&nbsp;*</span></span>}
                                                value={this.state.PhoneNumState}
                                                onChange={this.handleChangePhoneNum.bind(this)}
                                                errorText={this.state.validationError["PhoneNum"] ? "Please Enter Your Mobile Phone Number" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidPhoneNum ? "Please Enter Valid Phone Number" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds">
                                            {/* <ReactGoogleMapLoader
                                                params={{
                                                    key: API_KEY,
                                                    libraries: "places,geocode",
                                                }}
                                                render={googleMaps =>
                                                    googleMaps && (
                                                        <ReactGooglePlacesSuggest
                                                            autocompletionRequest={{ input: search }}
                                                            googleMaps={googleMaps}
                                                            onSelectSuggest={this.handleSelectSuggest.bind(this)}
                                                        >
                                                            <TextField
                                                                value={this.state.MailingAddressState}
                                                                onChange={this.handleChangeMailingAddress.bind(this)}
                                                                hintText="Current Mailing Address"
                                                                floatingLabelText={<span>Current Mailing Address<span className="manatoryfield">*</span></span>}
                                                                errorText={this.state.validationError["Address"] ? "Please Choose Your Current Mailing Address" : null}
                                                            />
                                                        </ReactGooglePlacesSuggest>
                                                    )
                                                }
                                            /> */}
                                            <Geosuggest
                                                placeholder="Current Mailing Address"
                                                initialValue={this.state.MailingAddressState}
                                                onSuggestSelect={this.handleSelectSuggest.bind(this)}
                                                onChange={this.handleChangeMailingAddress.bind(this)}
                                                value={this.state.MailingAddressState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.validationError["Address"] ? "Please Choose Your Mailing Address" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <TextField hintText="Enter Your Email" errorText={this.state.validationError["Email"] ? " Please Enter Your Email" : ""} floatingLabelText={<span>Email<span className="manatoryfield">*</span></span>}
                                                type="email"
                                                value={this.state.EmailState}
                                                onChange={this.handleChangeEmail.bind(this)}
                                                errorText={this.state.validationError["Email"] ? "Please Enter Your Email" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidEmailFormat ? "Please Enter the Valid Mail" : ""}</span>
                                            <span className="validationmsg">{this.state.isValidEmailMatch ? " Email doesn't Match" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <TextField hintText="Enter Your Confirm Email" errorText={this.state.validationError["ConfirmEmail"] ? " Please Enter Your Confirm Email" : ""} floatingLabelText={<span>Confirm Email<span className="manatoryfield">*</span></span>}
                                                type="email"
                                                value={this.state.ConfirmEmailState}
                                                onChange={this.handleChangeConfirmEmail.bind(this)}
                                                errorText={this.state.validationError["CEmail"] ? "Please Enter Your Confirm Email" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidConfirmEmailFormat ? "Please Enter the Valid Mail" : ""}</span>
                                            <span className="validationmsg">{this.state.isValidEmailMatch ? " Email doesn't Match" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <OverlayTrigger placement="top" overlay={tooltip} className="Reg-Tooltip">
                                                <TextField hintText="Enter Your Password" floatingLabelText={<span>Password<span className="manatoryfield">*</span></span>}
                                                    type="password"
                                                    value={this.state.PasswordState}
                                                    onChange={this.handleChangePassword.bind(this)}
                                                    errorText={this.state.validationError["Password"] ? "Please Enter Your Password" : ""}
                                                />
                                            </OverlayTrigger>
                                            <span className="validationmsg">{this.state.isValidPwdFormat ? "Please Enter the Valid Password" : ""}</span>
                                            {/* <span className="validationmsg">{this.state.isValidPasswordMatch ? " Password doesn't Match" : ""}</span> */}
                                            <span className="validationWeakmsg">{this.state.errorMsgMedium ? <div><span>Medium</span><div className="One"></div></div> : ""}</span>
                                            <span className="validationGoodmsg">{this.state.errorMsgGood ? <div><span>Good</span><div className="Two"></div></div> : ""}</span>
                                            <span className="validationStrongmsg">{this.state.errorMsgStrong ? <div><span>Strong</span><div className="Three"></div></div> : ""}</span>

                                        </Col>

                                        <Col xs={12} md={6} className="input-fileds">
                                            <TextField hintText="Enter Your Confirm Password" floatingLabelText={<span>Confirm Password<span className="manatoryfield">*</span></span>}
                                                type="password"
                                                value={this.state.ConfirmPasswordState}
                                                onChange={this.handleChangeConfirmPassword.bind(this)}
                                                errorText={this.state.validationError["CPassword"] ? " Please Enter Your Confirm Password" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidCPwdFormat ? "Please Enter the Valid Password" : ""}</span>
                                            <span className="validationmsg">{this.state.isValidPwdMatch ? " Password doesn't Match" : ""}</span>
                                        </Col>

                                    </Col>
                                    <Col xs={12} md={12} style={styles}>
                                        <Col md={6} xs={6}>
                                            <Button onClick={this.handleReset.bind(this)} className="RegButton1" >Reset</Button>
                                        </Col>
                                        <Col md={6} xs={6}>
                                            <Button type="submit" className="RegButton1" onClick={this.handleRegistration.bind(this)}>Create</Button><br /><br />
                                            <span className="validationmsg">{this.state.checkValid ? "This Email already exists in GPA" : ""}</span>

                                            {/* Verification Code Dialog Popup */}
                                            <Dialog
                                                title={
                                                    <div className="VerifyDiv">
                                                        <div className="gpalogo">
                                                            <img src={GPALogo} alt="GPA Logo" width="170" height="74" />
                                                        </div>
                                                    </div>
                                                }
                                                modal={false}
                                                open={this.state.OTPPopupOpen}
                                                onRequestClose={this.handleClose} >
                                                <p className="Verifymsg">A Verification Code has been sent to your email. Please use this Verification Code to confirm that you are the correct user to proceed.</p>
                                                <TextField className="Verifycode" hintText="Enter Your Verification Code" value={this.state.code} onChange={this.handleOpenOTPEnterDialog.bind(this)} />
                                                <span className="validationmsg incorrectuser">{this.state.showValidMsg ? "Invalid Verification Code" : ""}</span>
                                                <RaisedButton className="Continuebtn" label="Continue" disabled={true} primary={true} onClick={this.handleOpenThanksDialog.bind(this)} disabled={!this.state.code} />
                                            </Dialog>

                                            {/* After Verification Dialog Popup*/}

                                            <Dialog
                                                title={
                                                    <div className="VerifyDiv">
                                                        <div className="gpalogo">
                                                            <Row>
                                                                <Col md={4} >
                                                                    <div className="logo_div">
                                                                        <img src={GPALogo} alt="GPA Logo" width="170" height="74" />
                                                                    </div>
                                                                </Col>
                                                                <Col md={8} >
                                                                    <div className="Thanks_div">
                                                                        <h4>Thanks for your Registration !</h4>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                }
                                                modal={false}
                                                open={this.state.LoginPopupOpen}
                                                onRequestClose={this.handleClose} >
                                                <span>
                                                    <img className="Verifydone" src={VerifyIcon} alt="GPA Logo" width="70" height="70" />
                                                </span>
                                                <p className="Verifymsgdone">Please login by clicking on the link below</p>
                                                <br />
                                                <FlatButton className="Loginbtn1" label="Login" onClick={this.loginBtnHandle.bind(this)} keyboardFocused={true} />
                                            </Dialog>
                                        </Col>
                                    </Col>
                                </fieldset>
                            </form>
                        </Row>
                    </Grid>
                </Paper>
            </div>
        );
    }
    /* Fields Reset Handle Event */
    handleReset(e) {
        this.setState({
            search: "",
            value: null,
            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            SSNumberState: "",
            PhoneNumState: "",
            MailingAddressState: "",
            EmailState: "",
            ConfirmEmailState: "",
            PasswordState: "",
            ConfirmPasswordState: "",
            validationError: {},
            isValidPhoneNum: false,
            isValidSSNumber: false,
            isValidPwdFormat: false,
            isValidCPwdFormat: false,
            isValidPwdMatch: false,
            code: '',
            showValidMsg: false,
            value: null,
            OTPPopupOpen: false,
            LoginPopupOpen: false,
        });
    }

    /* Passing Data to User Pool */
    handleRegistration(event) {
        event.preventDefault();
        var isValid = this.handleValidateForm(this);
        if (isValid == true) {
            var userPool = new CognitoUserPool(poolData);
            console.log(userPool);
            var email = this.state.EmailState;
            var username = this.state.FirstNameState;
            var password = this.state.PasswordState;
            var userEmail = this.state.EmailState;

            var attributeList = [];

            var dataFirstName = {
                Name: 'given_name',
                Value: this.state.FirstNameState
            };
            var dataMiddleName = {
                Name: 'middle_name',
                Value: this.state.MiddleNameState
            };
            var dataLastName = {
                Name: 'family_name',
                Value: this.state.LastNameState
            };
            var dataSSNumber = {
                Name: 'updated_at',
                Value: this.state.SSNumberState
            };
            var dataPhoneNum = {
                Name: 'profile',
                Value: this.state.PhoneNumState
            };
            var dataAddress = {
                Name: 'address',
                Value: this.state.MailingAddressState
            };
            var dataEmailId = {
                Name: 'email',
                Value: this.state.EmailState
            };
            var dataPassword = {
                Name: 'name',
                Value: this.state.PasswordState
            };

            var attributedataFirstName = new CognitoUserAttribute(dataFirstName);
            var attributedataMiddleName = new CognitoUserAttribute(dataMiddleName);
            var attributedataLastName = new CognitoUserAttribute(dataLastName);
            var attributedataSSNumber = new CognitoUserAttribute(dataSSNumber);
            var attributedataPhoneNum = new CognitoUserAttribute(dataPhoneNum);
            var attributedataAddress = new CognitoUserAttribute(dataAddress);
            var attributedataEmail = new CognitoUserAttribute(dataEmailId);
            var attributedataPassword = new CognitoUserAttribute(dataPassword);

            attributeList.push(attributedataFirstName);
            attributeList.push(attributedataMiddleName);
            attributeList.push(attributedataLastName);
            attributeList.push(attributedataSSNumber);
            attributeList.push(attributedataPhoneNum);
            attributeList.push(attributedataAddress);
            attributeList.push(attributedataEmail);
            attributeList.push(attributedataPassword);

            var thisObj = this;

            userPool.signUp(userEmail, password, attributeList, null, function (err, result) {
                if (err) {
                    thisObj.setState({ checkValid: err.message });
                    thisObj.setState({ OTPPopupOpen: false });
                } else {
                    thisObj.setState({ OTPPopupOpen: true });
                }
            });
        }
        else {
            // alert("VFailed");
        }
    }
    popupFun(value) {
        this.setState({ OTPPopupOpen: value });
    }
    /* Verification Code Validation */
    verificationCode(code) {
        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username: this.state.EmailState,
            Pool: userPool
        };
        var thisObj = this;
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.confirmRegistration(code, true, function (err, result) {
            if (err) {
                thisObj.setState({ showValidMsg: err.message });
            } else {
                thisObj.setState({ OTPPopupOpen: false });
                thisObj.handleOpenThanksDialog(this);
                thisObj.setState({ LoginPopupOpen: true });
            }
        });
    }

    loginBtnHandle(event) {
        //history.push('/Login');
    }
}

/// react redux only: on 03/29/2018
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(AdminLoginSetup);