import React, { Component } from 'react';

//CSS
import '../Style/style.css';
import '../Style/Registration.css';

//Bootstrap Component
import { Grid, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

//Logo and Icons
import logo from '../img/logo_white.png';
import VerifyIcon from '../img/VerifyIcon.png';

//AWS User Pool
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, AmazonCognitoIdentity } from 'amazon-cognito-identity-js';

//Password Filed
import PasswordField from 'material-ui-password-field';

//API Calling Method
import axios from 'axios';

//Routing
import history from '../Routing/history';

/* User Pool Access Details */
const poolData = {
    UserPoolId: 'us-west-2_wgkaBUmz5',//'us-west-2_kG2V3FBcu', // Your user pool id here
    ClientId: '3ocb7u0422dhf9c38vacc0kfv3',//'4apkr7thetvm981irp8ohsjj1t', // Your client id here 4gjka5ag6svfp0f3c4i2a1r8oo
    identityID: "us-west-2:2cae3c46-6f2b-40dd-a059-5313e2b8b23b",//"us-west-2:746c750e-7185-4675-84c1-95186baed362",//"us-west-2:e2caf986-8e5b-4c17-abe1-362efe0c8960",
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

const DayItems = [];
for (let i = 1; i < 32; i++) {
    DayItems.push(<MenuItem value={i.toString()} key={i.toString()} primaryText={i.toString()} />);
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
    YearItems.push(<MenuItem value={i.toString()} key={i.toString()} primaryText={i.toString()} />);
}

const CompanyItems = [];

class DirectRegistration extends Component {
    constructor() {
        super();
        this.handleLoadCompany(this);
        /* Field State Values Initialization */
        this.state = {
            value: null,
            EmpCompanyName: "Mitosis",
            TitleState: "",
            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            SuffixState: "",
            DayState: "",
            MonthState: "",
            YearState: "",
            CompanyNameState: "",
            SSNumberState: "",
            PhoneNumState: "",
            HomeNumState: "",
            EmailState: "",
            ConfirmEmailState: "",
            PasswordState: "",
            ConfirmPasswordState: "",
            validationError: {},
            isValidTitle: false,
            isValidFirstName: false,
            isValidLastName: false,
            isValidCompanyName: false,
            isValidSSNumber: false,
            isValidEmail: false,
            isValidConfirmMail: false,
            isValidPassword: false,
            isValidConfirmPassword: false,
            isValidEmailFormat: false,
            isValidConfirmEmailFormat: false,
            isValidEmailMatch: false,
            isValidPasswordFormat: false,
            isValidConfirmPasswordFormat: false,
            isValidPasswordMatch: false,           
            code: '',
            showValidMsg: false,
            showValidSSNumMsg:false,
            showValidDOBMsg:false,
            showValidComMsg:false,
            value: null,
            OTPPopupOpen: false,
            LoginPopupOpen: false,
        }

    }

    /* Form Fields Binding Values Handling Events*/
    handleChangeTitle = (event, index, value) => {
        this.setState({ TitleState: value });
    };

    handleChangeFirstName(e) {
        this.setState({ FirstNameState: e.target.value });
    }

    handleChangeMiddleName(e) {
        this.setState({ MiddleNameState: e.target.value });
    }

    handleChangeLastName(e) {
        this.setState({ LastNameState: e.target.value });
    }

    handleChangeSuffix = (event, index, value) => {
        this.setState({ SuffixState: value });
    };

    handleChangeDay = (event, index, value) => {
        this.setState({ DayState: value });
    };

    handleChangeMonth = (event, index, value) => {
        this.setState({ MonthState: value });
    };

    handleChangeYear = (event, index, value) => {
        this.setState({ YearState: value });
    };

    handleChangeCompanyName(event, index, value) {
        this.setState({ CompanyNameState: value });
    };
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

    handleChangeHomeNum(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ HomeNumState: onlyNums });
        } else if (onlyNums.length === 11) {
            const number = onlyNums.replace(/(\d{3})(\d{4})(\d{4})/, '($1) $2-$3');
            this.setState({ HomeNumState: number });
        }
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

    handleChangeHomeNum(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ HomeNumState: onlyNums });
        } else if (onlyNums.length === 11) {
            const number = onlyNums.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '($1) $2-$3-$4');
            this.setState({ HomeNumState: number });
        }
    }

    handleLoadCompany(event) {
        let LoadCompanyAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            { QueryName: "ClientCompanies" }
        );
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: LoadCompanyAPIUrl,
            headers: AxiosHeaderConfig

        }).then(({ data }) => {
            CompanyItems.length=0;
            for (let i = 0; i < data.length; i++) {
                CompanyItems.push(<MenuItem value={data[i].CompanyCode} key={i} primaryText={data[i].CompanyName} />);
            }

        }).catch((err) => {
            
        })
    }    

    /* Form Fields Validation Handling Event*/
    handleValidateForm(event) {
        this.handleReadClientCompany(this);
        const { validationError } = this.state;
        var validAppDataStatus=false;
        let validForm = false;
        var validTitleForm = false;
        var validFNameForm = false;
        var validLNameForm = false;
        var validCNameForm = false;
        var validSSNumberForm = false;
        var validDOBMonthForm = false;
        var validDOBDayForm = false;
        var validDOBYearForm = false;
        var validMailForm = false;
        var validCMailForm = false;
        var validPwdForm = false;
        var validCPwdForm = false;
        var varValidateEmail = this.state.EmailState;
        var varValidateConfirmEmail = this.state.ConfirmEmailState;
        var varValidatePassword = this.state.PasswordState;
        var varValidateConfirmPassword = this.state.ConfirmPasswordState;

        if (this.state.TitleState != "") {
            validationError['Title'] = false;
            this.setState({ isValidTitle: false });
            validTitleForm = true;
        }
        else {
            validationError['Title'] = true;
            this.setState({ isValidTitle: true });
            validTitleForm = false;
        }

        if (this.state.FirstNameState.length > 0) {
            validationError['First Name'] = false;
            this.setState({ isValidFirstName: false });
            validFNameForm = true;
        }
        else {
            validationError['First Name'] = true;
            this.setState({ isValidFirstName: true });
            validFNameForm = false;
        }

        if (this.state.LastNameState.length > 0) {
            validationError['Last Name'] = false;
            this.setState({ isValidLastName: false });
            validLNameForm = true;
        }
        else {
            validationError['Last Name'] = true;
            this.setState({ isValidLastName: true });
            validLNameForm = false;
        }
        // if (this.state.HomeNumState.length > 0) {
        // validationError['HomeNum'] = false;
        // this.setState({ isValidHomeNum: false });
        // validForm = true;
        // }
        // else {
        // validationError['HomeNum'] = true;
        // this.setState({ isValidHomeNum: true });
        // validForm = false;
        // }
        if (this.state.CompanyNameState.length > 0) {
            validationError['Company Name'] = false;
            this.setState({ isValidCompanyName: false });
            validCNameForm = true;
        }
        else {
            validationError['Company Name'] = true;
            this.setState({ isValidCompanyName: true });
            validCNameForm = false;
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
        if (this.state.MonthState != "") {
            validationError['Month'] = false;
            validDOBMonthForm = true;
        }
        else {
            validationError['Month'] = true;
            validDOBMonthForm = false;
        }

        if (this.state.DayState != "") {
            validationError['Day'] = false;
            validDOBDayForm = true;
        }
        else {
            validationError['Day'] = true;
            validDOBDayForm = false;
        }

        if (this.state.YearState != "") {
            validationError['Year'] = false;
            validDOBYearForm = true;
        }
        else {
            validationError['Year'] = true;
            validDOBYearForm = false;
        }
        if (this.state.EmailState.length > 0) {
            validationError['Email'] = false;
            var varEmailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (varEmailFormat.test(varValidateEmail)) {
                if (varValidateEmail.length > 0 && varValidateConfirmEmail.length > 0 && varValidateEmail == varValidateConfirmEmail) {
                    this.setState({ isValidEmailFormat: false });
                    this.setState({ isValidEmailMatch: false });
                    validMailForm = true;
                }
                else {
                    this.setState({ isValidEmailFormat: false });
                    this.setState({ isValidEmailMatch: true });
                    validMailForm = false;

                }
            }
            else {
                this.setState({ isValidEmailFormat: true });
                this.setState({ isValidEmailMatch: false });
                validMailForm = false;
            }
        }
        else {
            validationError['Email'] = true;
            this.setState({ isValidEmailMatch: false });
            this.setState({ isValidEmailFormat: false });
            this.setState({ isValidEmail: false });
            validMailForm = false;
        }

        if (this.state.ConfirmEmailState.length > 0) {
            validationError['ConfirmEmail'] = false;
            var varEmailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (varEmailFormat.test(varValidateConfirmEmail)) {
                if (varValidateConfirmEmail.length > 0 && varValidateEmail.length > 0 && varValidateEmail == varValidateConfirmEmail) {
                    this.setState({ isValidConfirmEmailFormat: false });
                    this.setState({ isValidEmailMatch: false });
                    validCMailForm = true;
                }
                else {
                    this.setState({ isValidConfirmEmailFormat: false });
                    this.setState({ isValidEmailMatch: true });
                    validCMailForm = false;
                }
            }
            else {
                this.setState({ isValidConfirmEmailFormat: true });
                this.setState({ isValidEmailMatch: false });
                validCMailForm = false;
            }
        }
        else {
            validationError['ConfirmEmail'] = true;
            this.setState({ isValidConfirmEmailFormat: false });
            this.setState({ isValidEmailMatch: false });
            this.setState({ isValidConfirmMail: false });
            validCMailForm = false;
        }

        if (this.state.PasswordState.length > 0) {
            validationError['Password'] = false;
            var varPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
            if (varPasswordFormat.test(varValidatePassword)) {
                if (varValidatePassword.length > 0 && varValidateConfirmPassword.length > 0 && varValidatePassword == varValidateConfirmPassword) {
                    this.setState({ isValidPasswordFormat: false });
                    this.setState({ isValidPasswordMatch: false });
                    validPwdForm = true;
                }
                else {
                    this.setState({ isValidPasswordFormat: false });
                    this.setState({ isValidPasswordMatch: true });
                    validPwdForm = false;
                    this.setState({ errorMsgGood: false })
                    this.setState({ errorMsgStrong: false })
                    this.setState({ errorMsgweak: false })
                }
            }
            else {
                this.setState({ isValidPasswordFormat: true });
                this.setState({ isValidPasswordMatch: false });
                validPwdForm = false;
                this.setState({ errorMsgGood: false })
                this.setState({ errorMsgStrong: false })
                this.setState({ errorMsgweak: false })
            }
        }
        else {
            validationError['Password'] = true;
            this.setState({ isValidPasswordMatch: false });
            this.setState({ isValidPasswordFormat: false });
            this.setState({ isValidPassword: false });
            validPwdForm = false;
        }

        if (this.state.ConfirmPasswordState.length > 0) {
            validationError['ConfirmPassword'] = false;
            var varPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
            if (varPasswordFormat.test(varValidateConfirmPassword)) {
                if (varValidateConfirmPassword.length > 0 && varValidatePassword.length > 0 && varValidatePassword == varValidateConfirmPassword) {
                    this.setState({ isValidConfirmPasswordFormat: false });
                    this.setState({ isValidPasswordMatch: false });
                    validCPwdForm = true;
                }
                else {
                    this.setState({ isValidConfirmPasswordFormat: false });
                    this.setState({ isValidPasswordMatch: true });
                    validCPwdForm = false;
                    this.setState({ errorMsgConfiPwdGood: false })
                    this.setState({ errorMsgConfiPwdStrong: false })
                    this.setState({ errorMsgConfiPwdweak: false })
                }
            }
            else {
                this.setState({ isValidConfirmPasswordFormat: true });
                this.setState({ isValidPasswordMatch: false });
                validCPwdForm = false;
                this.setState({ errorMsgConfiPwdGood: false })
                this.setState({ errorMsgConfiPwdStrong: false })
                this.setState({ errorMsgConfiPwdweak: false })
            }
        }
        else {
            validationError['ConfirmPassword'] = true;
            this.setState({ isValidConfirmPasswordFormat: false });
            this.setState({ isValidPasswordMatch: false });
            this.setState({ isValidConfirmPassword: false });
            validCPwdForm = false;
        }

        if (validTitleForm && validFNameForm && validLNameForm && validCNameForm && validDOBDayForm && validDOBMonthForm && validDOBYearForm && validMailForm && validCMailForm && validPwdForm && validCPwdForm && this.state.showValidSSNumMsg==false && this.state.showValidDOBMsg==false) 
        {
            validForm = true;
        }
        else {

            validForm = false;
        }       

        return validForm;
    }

    handleReadClientCompany(event) {         
        var OrgSSNum="";
        var OrgDOB="";       
        var SSNum=this.state.SSNumberState;
        var DOB=this.state.DayState+" "+this.state.MonthState+" "+this.state.YearState;       
        var thisObj = this;
        let ReadCliCompanyAPIUrl = "https://cx1y9bpqe2.execute-api.us-west-2.amazonaws.com/Dev/GPA_ReadClientCompanyDatas_Lambda";
        var JSONData = JSON.stringify({
            QueryName:"DR",
            CompanyID: thisObj.state.CompanyNameState,
            UserID:thisObj.state.EmailState
        });
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: ReadCliCompanyAPIUrl,
            data: JSONData,
            headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {              
                OrgSSNum=data[i].SSNum;
                if(SSNum==OrgSSNum)
                {
                    thisObj.setState({showValidSSNumMsg:false});
                }
                else{
                    thisObj.setState({showValidSSNumMsg:true});
                }
                OrgDOB=data[i].DOB_Day+" "+data[i].DOB_Month+" "+data[i].DOB_Year;
                if(DOB==OrgDOB)
                {
                    thisObj.setState({showValidDOBMsg:false});
                }
                else{
                    thisObj.setState({showValidDOBMsg:true});
                }
            }          
        }).catch((err) => {
            
        });  
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

    /* Page Rendering */
    render() {
        const { TitleState, SuffixState, DayState, MonthState, YearState } = this.state;
        const tooltip = (
            <Tooltip id="tooltip" >
                Password required at least 1 uppercase and 1 lowercase,1 digit,1 symbol, minimum 8 character's length.
 </Tooltip>
        );
        return (
            <div className="Login-Bg">
                <Row>
                    <Col md={6}>
                        <img src={logo} alt="logo" className="CompanyLogo" width="165" height="70" />
                    </Col>
                    <Col md={2}>

                    </Col>
                    <Col md={3} className="Multilang">
                        <div className="Multilang">
                            <label>Select Language:</label><div id="google_translate_element"></div>
                        </div>
                    </Col>
                </Row>

                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={6}>
                        </Col>
                        <Col xs={12} md={6} className="Reg-Page">
                            <div className="DirectReg">
                            <Col xs={12} md={12}>
                                <h3>DIRECT APPLICANT REGISTRATION</h3>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds">
                                    <SelectField
                                        value={TitleState}
                                        errorText={this.state.validationError["Title"] ? "Please Select Your Title" : ""}
                                        floatingLabelText={<span>Title<span className="manatoryfield">&nbsp;*</span> </span>}
                                        onChange={this.handleChangeTitle}
                                        maxHeight={200}
                                    >
                                        {TitleItems}
                                    </SelectField>
                                </Col>
                                <Col xs={12} md={6} className="input-fileds">
                                    <TextField hintText="Enter Your First Name" errorText={this.state.validationError["First Name"] ? "Please Enter Your First Name" : ""} floatingLabelText={<span>First Name<span className="manatoryfield">*</span></span>}
                                        value={this.state.FirstNameState}
                                        onChange={this.handleChangeFirstName.bind(this)}
                                    />
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds">
                                    <TextField hintText="Enter Your Middle Name" floatingLabelText="Middle Name"
                                        value={this.state.MiddleNameState}
                                        onChange={this.handleChangeMiddleName.bind(this)}
                                    />
                                </Col>
                                <Col xs={12} md={6} className="input-fileds">
                                    <TextField hintText="Enter Your Last Name" errorText={this.state.validationError["Last Name"] ? "Please Enter Your Last Name" : ""} floatingLabelText={<span>Last Name<span className="manatoryfield">*</span></span>}
                                        value={this.state.LastNameState}
                                        onChange={this.handleChangeLastName.bind(this)}
                                    />
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds">
                                    <SelectField
                                        value={SuffixState}
                                        floatingLabelText={<span>Suffix<span className="manatoryfield"></span></span>}
                                        onChange={this.handleChangeSuffix}
                                        maxHeight={200}
                                    >
                                        {SuffixItems}
                                    </SelectField>
                                </Col>
                                <Col xs={12} md={6} className="input-fileds">
                                    <TextField hintText="Enter your Social Security Number" floatingLabelText={<span>Social Security Number<span className="manatoryfield">&nbsp;*</span></span>}
                                        errorText={this.state.validationError["SSNumber"] ? "Please Enter Your Social Security Number" : ""}
                                        value={this.state.SSNumberState}
                                        onChange={this.handleChangeSSNumber.bind(this)}
                                    />
                                    <span className="validationmsg">{this.state.showValidSSNumMsg ? "SSNumber Not Match with Your Information" : ""}</span>
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={12} className="input-fileds" >
                                    <SelectField
                                        floatingLabelText={<span>Company Name<span className="manatoryfield">*</span></span>}
                                        value={this.state.CompanyNameState}
                                        onChange={this.handleChangeCompanyName.bind(this)}
                                        errorText={this.state.validationError["Company Name"] ? "Please Select Your Company Name" : null}
                                    >
                                        {CompanyItems}
                                    </SelectField>
                                    <span className="validationmsg">{this.state.showValidComMsg ? "Selected Company was Not Correct" : ""}</span>
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds">
                                    <SelectField
                                        value={MonthState}
                                        floatingLabelText={<span>DOB(Month)<span className="manatoryfield">*</span></span>}
                                        onChange={this.handleChangeMonth}
                                        maxHeight={200}
                                        errorText={this.state.validationError["Month"] ? "Please Select Your DOB(Month)" : null}
                                    >
                                        {MonthItems}
                                    </SelectField>
                                    <span className="validationmsg">{this.state.showValidDOBMsg ? "Selected DOB Not Match with Your Information" : ""}</span>
                                </Col>
                                <Col xs={12} md={3} className="input-fileds">
                                    <SelectField
                                        value={DayState}
                                        floatingLabelText={<span>DOB(Day)<span className="manatoryfield">*</span></span>}
                                        onChange={this.handleChangeDay}
                                        maxHeight={200}
                                        errorText={this.state.validationError["Day"] ? "Please Select Your DOB(Day)" : null}
                                    >
                                        {DayItems}
                                    </SelectField>
                                </Col>
                                <Col xs={12} md={3} className="input-fileds">
                                    <SelectField
                                        value={YearState}
                                        floatingLabelText={<span>DOB(Year)<span className="manatoryfield">*</span></span>}
                                        onChange={this.handleChangeYear}
                                        maxHeight={200}
                                        errorText={this.state.validationError["Year"] ? "Please Select Your DOB(Year)" : null}
                                    >
                                        {YearItems}
                                    </SelectField>
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds" >
                                    <TextField hintText="Enter Your Mobile Phone Number" floatingLabelText="Mobile Phone Number"
                                        value={this.state.PhoneNumState}
                                        onChange={this.handleChangePhoneNum.bind(this)}
                                    />
                                </Col>
                                <Col xs={12} md={6} className="input-fileds" >
                                    <TextField hintText="Enter Your Home Phone Number" floatingLabelText="Home Phone Number"
                                        value={this.state.HomeNumState}
                                        onChange={this.handleChangeHomeNum.bind(this)}
                                    />
                                </Col>
                            </Col>

                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds">
                                    <TextField hintText="Enter Your Email" errorText={this.state.validationError["Email"] ? " Please Enter Your Email" : ""} floatingLabelText={<span>Email<span className="manatoryfield">*</span></span>}
                                        type="email"
                                        value={this.state.EmailState}
                                        onChange={this.handleChangeEmail.bind(this)}
                                    />
                                    <span className="validationmsg">{this.state.isValidEmailFormat ? "Please Enter the Valid Mail" : ""}</span>
                                    <span className="validationmsg">{this.state.isValidEmailMatch ? " Email doesn't Match" : ""}</span>
                                </Col>
                                <Col xs={12} md={6} className="input-fileds">
                                    <TextField hintText="Enter Your Confirm Email" errorText={this.state.validationError["ConfirmEmail"] ? " Please Enter Your Confirm Email" : ""} floatingLabelText={<span>Confirm Email<span className="manatoryfield">*</span></span>}
                                        type="email"
                                        value={this.state.ConfirmEmailState}
                                        onChange={this.handleChangeConfirmEmail.bind(this)}
                                    />
                                    <span className="validationmsg">{this.state.isValidConfirmEmailFormat ? "Please Enter the Valid Mail" : ""}</span>
                                    <span className="validationmsg">{this.state.isValidEmailMatch ? " Email doesn't Match" : ""}</span>
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds">
                                    <OverlayTrigger placement="top" overlay={tooltip} className="Reg-Tooltip">
                                        {/* <PasswordField floatingLabelText="Password" errorText={this.state.validationError["Password"] ? "Please Enter Your Password" : ""} value={this.state.Password}
 onChange={this.handleChangePassword.bind(this)}
 /> */}
                                        <TextField hintText="Enter Your Password" errorText={this.state.validationError["Password"] ? "Please Enter Your Password" : ""} floatingLabelText={<span>Password<span className="manatoryfield">*</span></span>}
                                            type="password"
                                            value={this.state.PasswordState}
                                            onChange={this.handleChangePassword.bind(this)}
                                        />
                                    </OverlayTrigger>
                                    <span className="validationmsg">{this.state.isValidPasswordFormat ? "Please Enter the Valid Password" : ""}</span>
                                    <span className="validationmsg">{this.state.isValidPasswordMatch ? " Password doesn't Match" : ""}</span>
                                    <span className="validationWeakmsg">{this.state.errorMsgMedium ? <div><span>Medium</span><div className="One"></div></div> : ""}</span>
                                    <span className="validationGoodmsg">{this.state.errorMsgGood ? <div><span>Good</span><div className="Two"></div></div> : ""}</span>
                                    <span className="validationStrongmsg">{this.state.errorMsgStrong ? <div><span>Strong</span><div className="Three"></div></div> : ""}</span>
                                </Col>

                                <Col xs={12} md={6} className="input-fileds">
                                    {/* <PasswordField floatingLabelText="Confirm Password" errorText={this.state.validationError["ConfirmPassword"] ? " Please Enter Your Confirm Password" : ""} value={this.state.Password}
 onChange={this.handleChangeConfirmPassword.bind(this)}
 /> */}
                                    <TextField hintText="Enter Your Confirm Password" errorText={this.state.validationError["ConfirmPassword"] ? " Please Enter Your Confirm Password" : ""} floatingLabelText={<span>Confirm Password<span className="manatoryfield">*</span></span>}
                                        type="password"
                                        value={this.state.ConfirmPasswordState}
                                        onChange={this.handleChangeConfirmPassword.bind(this)}
                                    />
                                    <span className="validationmsg">{this.state.isValidConfirmPasswordFormat ? "Please Enter the Valid Password" : ""}</span>
                                    <span className="validationmsg">{this.state.isValidPasswordMatch ? " Password doesn't Match" : ""}</span>
                                </Col>

                            </Col>
                            <Col xs={12} md={12} style={styles}>
                                <Col md={6}>
                                    <Button onClick={this.handleReset.bind(this)} className="RegButton1" >Reset</Button>
                                </Col>
                                <Col md={6}>
                                    <Button type="submit" className="RegButton1" onClick={this.handleRegistration.bind(this)}>Register</Button><br/><br/>
                                    <span className="validationmsg">{this.state.checkValid ? "This Email already exists in GPA" : ""}</span>                                    

                                    {/* Verification Code Dialog Popup */}
                                    <Dialog
                                        title={
                                            <div className="VerifyDiv">
                                                <div className="gpalogo">
                                                    <img src={logo} alt="GPA Logo" width="170" height="74" />
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
                                                                <img src={logo} alt="GPA Logo" width="170" height="74" />
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
                                        {/* <FlatButton className="Loginbtn1" onClick={this.handleValidateForm.bind(this)} label="Login" keyboardFocused={true} />
 <Button className="RQ-Save" type="submit" onClick={this.handleRegistration.bind(this)}>Register</Button> */}                                        
                                            <FlatButton className="Loginbtn1" label="Login" onClick={this.loginBtnHandle.bind(this)} keyboardFocused={true} />
                                    </Dialog>
                                </Col>
                            </Col>

                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    /* Fields Reset Handle Event */
    handleReset(e) {
        this.setState({
            TitleState: "",
            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            SuffixState: "",
            CompanyNameState: "",
            SSNumberState: "",
            PhoneNumState: "",
            HomeNumState: "",
            EmailState: "",
            ConfirmEmailState: "",
            PasswordState: "",
            ConfirmPasswordState: "",
            errorMsgweak:"",
            errorMsgGood:"",
            errorMsgStrong:"",
            validationError: {},
            isValidTitle: false,
            isValidFirstName: false,
            isValidLastName: false,
            isValidCompanyName: false,
            isValidSSNumber: false,
            isValidEmail: false,
            isValidConfirmMail: false,
            isValidPassword: false,
            isValidConfirmPassword: false,
            isValidEmailFormat: false,
            isValidConfirmEmailFormat: false,
            isValidEmailMatch: false,
            isValidPasswordFormat: false,
            isValidConfirmPasswordFormat: false,
            isValidPasswordMatch: false,
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
            var email = this.state.EmailState;
            var username = this.state.FirstNameState;
            var password = this.state.PasswordState;
            var userEmail = this.state.EmailState;

            var attributeList = [];

            var dataTitle = {
                Name: 'name',
                Value: this.state.TitleState
            };
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
            var dataSuffix = {
                Name: 'nickname',
                Value: this.state.SuffixState
            };

            var dataSSNumber = {
                Name: 'updated_at',
                Value: this.state.SSNumberState
            };

            var dataCompanyName = {
                Name: 'zoneinfo',
                Value: this.state.CompanyNameState
            };

            var dataDateOfBirth = {
                Name: 'preferred_username',
                Value: this.state.DayState + " " + this.state.MonthState + " " + this.state.YearState
            };

            var dataPhoneNum = {
                Name: 'profile',
                Value: this.state.PhoneNumState
            };

            var dataHomeNum = {
                Name: 'locale',
                Value: this.state.HomeNumState
            };

            var dataEmailId = {
                Name: 'email',
                Value: this.state.EmailState
            };

            var dataPassword = {
                Name: 'address',
                Value: this.state.PasswordState
            };


            var attributeTitle = new CognitoUserAttribute(dataTitle);
            var attributeFirstName = new CognitoUserAttribute(dataFirstName);
            var attributeMiddleName = new CognitoUserAttribute(dataMiddleName);
            var attributedataLastName = new CognitoUserAttribute(dataLastName);
            var attributedataSuffix = new CognitoUserAttribute(dataSuffix);
            var attributedataSSNumber = new CognitoUserAttribute(dataSSNumber);
            var attributedataCompanyName = new CognitoUserAttribute(dataCompanyName);
            var attributedataDateOfBirth = new CognitoUserAttribute(dataDateOfBirth);
            var attributedataPhoneNum = new CognitoUserAttribute(dataPhoneNum);
            var attributedataHomeNum = new CognitoUserAttribute(dataHomeNum);
            var attributedataEmail = new CognitoUserAttribute(dataEmailId);
            var attributedataPassword = new CognitoUserAttribute(dataPassword);


            attributeList.push(attributeTitle);
            attributeList.push(attributeFirstName);
            attributeList.push(attributeMiddleName);
            attributeList.push(attributedataLastName);
            attributeList.push(attributedataSuffix);
            attributeList.push(attributedataSSNumber);
            attributeList.push(attributedataCompanyName);
            attributeList.push(attributedataDateOfBirth);
            attributeList.push(attributedataPhoneNum);
            attributeList.push(attributedataHomeNum);
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

    loginBtnHandle(e) {
        history.push('/Login');
    }
}
export default DirectRegistration;