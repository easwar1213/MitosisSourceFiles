import React, { Component } from 'react';

//Image
import GPALogo from '../img/logo_white.png';
import NoCmpLogo from '../img/No_Image.png';
import VerifyIcon from '../img/VerifyIcon.png';

//Bootstrap Component
import { Grid, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

//AWS User Pool
import { CognitoUserPool, CognitoUserAttribute} from 'amazon-cognito-identity-js';

//Flex
import {Flex} from 'react-flex-material';

//Styles
import '../Style/style.css';
import '../Style/Registration.css';

//API Calling Method
import axios from 'axios';

//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

/* User Pool Access Details */
const poolData = {
    UserPoolId: 'us-west-2_wgkaBUmz5',// Your user pool id here
    ClientId: '3ocb7u0422dhf9c38vacc0kfv3',// Your client id here 4gjka5ag6svfp0f3c4i2a1r8oo
    identityID: "us-west-2:2cae3c46-6f2b-40dd-a059-5313e2b8b23b",//"us-west-2:e2caf986-8e5b-4c17-abe1-362efe0c8960",
    region: "us-west-2",
};

const styles = {
    margin: 10,
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

class Registration extends Component {
    constructor() {
        super();
        /* Field State Values Initialization */
        this.state = {
            value: null,
            CompanyLogo: NoCmpLogo,
            CompanyNameState: "",
            TitleState: "",
            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            SuffixState: "",
            PhoneNumState: "",
            HomeNumState: "",
            EmailState: "",
            ConfirmEmailState: "",
            PasswordState: "",
            ConfirmPasswordState: "",
            isValidCompanyName:false,
            isValidTitle: false,
            isValidFirstName: false,
            isValidLastName: false,
            isValidEmail: false,
            isValidCEmail: false,
            isValidPassword: false,
            isValidCPassword: false,            
            isValidFormatFirstName: false,
            isValidFormatLastName: false,
            isValidFormatPhoneNum: false,
            isValidFormatHomeNum: false,
            isValidFormatPassword:false,
            isValidFormatCPassword:false,
            isValidPwdMatch:false,
            validRFNameForm:null,
            validRLNameForm:null,
            errorMsgMedium:false,
            errorMsgGood:false,
            errorMsgStrong:false,           
            showValidMsg: false,
            value: null           
        }
        this.handleReadClientCompany(this);
    }

    //Handle Event
    handleReadClientCompany(event) {
        var Params = new URLSearchParams(document.location.search);
        var varCompanyID = Params.get("CompanyID");
        var varEmployeeID = Params.get("EmployeeID");
        var thisObj = this;
        let ReadCliCompanyAPIUrl = "https://cx1y9bpqe2.execute-api.us-west-2.amazonaws.com/Dev/GPA_ReadClientCompanyDatas_Lambda";
        var JSONData = JSON.stringify({
            QueryName: "AR",
            CompanyID: varCompanyID,
            EmployeeID: varEmployeeID
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
            //headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ CompanyNameState: data[i].CompanyName });
                thisObj.props.setCCompanyID(data[i].CompanyName);
                thisObj.setState({ CompanyLogo: data[i].CompanyLogo });
                thisObj.setState({ FirstNameState: data[i].EmpFirstName });
                thisObj.setState({ MiddleNameState: data[i].EmpMiddleName });
                thisObj.setState({ LastNameState: data[i].EmpLastName });
                thisObj.setState({ EmailState: data[i].Email });
                thisObj.setState({ ConfirmEmailState: data[i].Email });
                thisObj.setState({ PhoneNumState: data[i].PhoneNum });
                thisObj.setState({ HomeNumState: data[i].HomeNum });
            }
        }).catch((err) => {
            
        });
    }

    /* Form Fields Binding Values Handling Events*/
    handleChangeTitle = (event, index, value) => {
        this.setState({ TitleState: value });
    };

    handleChangeFirstName(e) {
        this.setState({ FirstNameState: e.target.value},()=>{this.handleValidationFirstName(this);}); 
    }

    handleValidationFirstName(){
        if (this.state.FirstNameState.length > 0) {
            this.setState({ isValidFirstName: false });
            if (this.state.FirstNameState.length > 0 && this.state.FirstNameState.length > 2) {
                this.setState({ isValidFormatFirstName: false });                
                this.setState({validRFNameForm:true});
            }
            else{
                this.setState({ isValidFormatFirstName: true });
                this.setState({ isValidFirstName: false });
            }            
        }
        else {
            this.setState({ isValidFirstName: true });
            this.setState({ isValidFormatFirstName: false });
            this.setState({validRFNameForm:false});
        }
    }

    handleChangeMiddleName(e) {
        this.setState({ MiddleNameState: e.target.value });
    }

    handleChangeLastName(e) {
        this.setState({ LastNameState: e.target.value },()=>{this.handleValidationLastName(this);}); 
    }

    handleValidationLastName(){
        if (this.state.LastNameState.length > 0) {            
            this.setState({ isValidLastName: false });
            if (this.state.LastNameState.length > 0 && this.state.LastNameState.length > 2) {
                this.setState({ isValidFormatLastName: false });                
                this.setState({validRLNameForm:true});
            }
            else{
                this.setState({ isValidFormatLastName: true });
                this.setState({ isValidLastName: false });
            }   
        }
        else {
            this.setState({ isValidLastName: true });
            this.setState({ isValidFormatLastName: false });                
            this.setState({validRLNameForm:false});
        }
    }

    handleChangeSuffix = (event, index, value) => {
        this.setState({ SuffixState: value });
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

    handleAppProcessFlowSave(event) {
        let AppProFlowAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify({
            QueryName: "ApplicantProcessFlowTrackingSave",
            UserID: this.state.EmailState
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
            history.push('/ThanksForRegPage?PAppEmail='+this.state.EmailState);
           
        }).catch((err) => {
            
        })
    }

    /* Form Fields Validation Handling Event*/
    handleValidateForm(event) {
        let validForm = false;
        var validCompanyNameForm = false;        
        var validTitleForm = false;
        var validFNameForm = false;
        var validLNameForm = false;
        var validEmailForm = false;
        var validCEmailForm = false;       
        var validPwdForm = false;
        var validCPwdForm = false;        
        var varValidatePassword = this.state.PasswordState;
        var varValidateConfirmPassword = this.state.ConfirmPasswordState;

        if (this.state.CompanyNameState != "") {
            this.setState({ isValidCompanyName: false });
            validCompanyNameForm = true;
        }
        else {            
            this.setState({ isValidCompanyName: true });
            validCompanyNameForm = false;
        }

        if (this.state.TitleState != "") {
            this.setState({ isValidTitle: false });
            validTitleForm = true;
        }
        else {
            this.setState({ isValidTitle: true });
            validTitleForm = false;
        }

        if (this.state.validRFNameForm==true) {
            this.setState({ isValidFirstName: false });
            validFNameForm = true;          
        }
        else if (this.state.validRFNameForm==false) {
            this.setState({ isValidFirstName: true });
            validFNameForm = false;          
        }
        else{
            if (this.state.FirstNameState.length > 0) {                
                this.setState({ isValidFirstName: false });
                validFNameForm = true; 
            }
            else{
                this.setState({ isValidFirstName: true });
                validFNameForm = false; 
            }               
        }

        if (this.state.validRLNameForm==true) {
            this.setState({ isValidLastName: false });
            validLNameForm = true;          
        }
        else if (this.state.validRLNameForm==false) {
            this.setState({ isValidLastName: true });
            validLNameForm = false;          
        } 
        else{
            if (this.state.LastNameState.length > 0) {
                this.setState({ isValidLastName: false });
                
                validLNameForm = true; 
            }
            else{
                this.setState({ isValidLastName: true });
                validLNameForm = false; 
            }               
        }       
        
        if (this.state.PhoneNumState.length > 0) {
            if (this.state.PhoneNumState.length > 0 && this.state.PhoneNumState.length > 9) {
                this.setState({ isValidFormatPhoneNum: false });
            }
            else {
                this.setState({ isValidFormatPhoneNum: true });
            }
        }
        else {
            this.setState({ isValidFormatPhoneNum: false });
        }

        if (this.state.HomeNumState.length > 0) {
            if (this.state.HomeNumState.length > 0 && this.state.HomeNumState.length > 9) {
                this.setState({ isValidFormatHomeNum: false });
            }
            else {
                this.setState({ isValidFormatHomeNum: true });
            }
        }
        else {
            this.setState({ isValidFormatHomeNum: false });
        }

        if (this.state.EmailState.length > 0) {
            this.setState({ isValidEmail: false });           
            validEmailForm = true;
        }
        else {
            this.setState({ isValidEmail: true });           
            validEmailForm = false;
        }

        if (this.state.ConfirmEmailState.length > 0) {
            this.setState({ isValidCEmail: false }); 
            validCEmailForm = true;            
        }
        else {
            this.setState({ isValidCEmail: true }); 
            validCEmailForm = false;
        }

        if (this.state.PasswordState.length > 0) {                        
            this.setState({ isValidPassword: false });   
            var varPasswordFormat = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            '';
            if (this.state.PasswordState.length > 0 && this.state.PasswordState.length > 7 && varPasswordFormat.test(varValidatePassword)) 
            {
                this.setState({ isValidFormatPassword: false });   
                validPwdForm = true;             
            }
            else {
                this.setState({ isValidFormatPassword: true });
                this.setState({ isValidPassword: false });   
            }  
        }
        else {
            this.setState({ isValidPassword: true });             
            this.setState({ isValidFormatPassword: false });
            validPwdForm = false;
        }

        if (this.state.ConfirmPasswordState.length > 0) {                        
            this.setState({ isValidCPassword: false });   
            var varPasswordFormat = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            if (this.state.ConfirmPasswordState.length > 0 && this.state.ConfirmPasswordState.length > 7 && varPasswordFormat.test(varValidateConfirmPassword)) 
            {
                this.setState({ isValidFormatCPassword: false });
                if(this.state.PasswordState==this.state.ConfirmPasswordState)
                {
                    this.setState({ isValidPwdMatch: false });
                    validCPwdForm = true;
                }
                else
                {
                    this.setState({ isValidPwdMatch: true });
                    this.setState({ isValidCPassword: false }); 
                }
            }
            else {
                this.setState({ isValidFormatCPassword: true });
                this.setState({ isValidCPassword: false }); 
                this.setState({ isValidPwdMatch: false });
            }  
        }
        else {
            this.setState({ isValidCPassword: true });         
            this.setState({ isValidFormatCPassword: false });
            this.setState({ isValidPwdMatch: false });
            validCPwdForm = false;
        }        

        if (validCompanyNameForm && validTitleForm && validFNameForm && validLNameForm && validEmailForm && validCEmailForm && validPwdForm && validCPwdForm) {
            validForm = true;
        }
        else {

            validForm = false;
        }

        return validForm;
    }   

    /*Google Translater*/
    googleTranslateElementInit() {
        new window.google.translate.TranslateElement({
          // here is where you change the language
          pageLanguage: '',includedLanguages: 'de,en,es,fr,it,ja,ko,nl,no,pt,zh-CN',defaultLanguage: 'en', multilanguagePage: true
        }, 'google_translate_element_regsiter');
      }

      componentDidMount() { 
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '/language1.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);  
        window.googleTranslateElementInit = this.googleTranslateElementInit;
      }

    /* Page Rendering */
    render() {
        const tooltip = (
            <Tooltip id="tooltip" >
                Password required at least 1 uppercase and 1 lowercase,1 digit,1 symbol, minimum 8 character's length.
            </Tooltip>
        );
        return (
            <div className="Login-Bg">
                <Row>
                    <Col md={6} xs={6} sm={6}>
                    <a href="http://gpa-hosting.s3-website-us-west-2.amazonaws.com/Home/"><img src={GPALogo} alt="logo" className="CompanyLogo" width="165" height="70" /></a>
                    </Col>
                    
                    <Col md={6} xs={6} sm={6}>
                        <div className="Multilang">
                            <label className="hide-xs" >Select Language:</label>
                            <div className="GoogleTrans" id="google_translate_element_regsiter"></div>
                        </div>
                    </Col>
                </Row>

                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={6}>
                        </Col>
                        <Col xs={12} md={6} className="Reg-Page ">
                            <div className="RegPage-header">
                            <div  className="noPadding">
                                <Flex layout="row">
                                <Flex flex className="noPadding">
                                    <p>Current Employer : <span className="EmpcmpName">{this.state.CompanyNameState}</span></p>
                                    <span className="validationmsg">{this.state.isValidCompanyName ? "Company Name Must to Register" : ""}</span>
                                </Flex>
                                <Flex flex="none" className="CompanyLogoNew noPadding">
                                    <p className="cmpylogotxt"><img src={this.state.CompanyLogo} alt="CurcmpLogo" /></p>
                                </Flex>
                                </Flex>
                            </div>
                            </div>
                            <Row>
                            <Col xs={12} md={12}>
                                <h3>APPLICANT REGISTRATION</h3>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds">
                                    <SelectField floatingLabelText={<span>Title<span className="manatoryfield">&nbsp;*</span> </span>}
                                        value={this.state.TitleState}
                                        onChange={this.handleChangeTitle}
                                        errorText={this.state.isValidTitle ? "Please Select Your Title" : ""}
                                        maxHeight={200}
                                    >
                                        {TitleItems}
                                    </SelectField>
                                </Col>
                                <Col xs={12} md={6}></Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds">
                                    <TextField hintText="Enter Your First Name" floatingLabelText={<span>First Name<span className="manatoryfield">*</span></span>}
                                        value={this.state.FirstNameState}
                                        onChange={this.handleChangeFirstName.bind(this)}
                                        errorText={this.state.isValidFirstName? "Please Enter Your First Name" : ""}
                                    />
                                    <span className="validationmsg">{this.state.isValidFormatFirstName ? "Please Enter the Valid First Name" : ""}</span>
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
                                        errorText={this.state.isValidLastName ? "Please Enter Your Last Name" : ""}
                                    />
                                    <span className="validationmsg">{this.state.isValidFormatLastName ? "Please Enter the Valid Last Name" : ""}</span>
                                </Col>
                                <Col xs={12} md={6} className="input-fileds">
                                    <SelectField floatingLabelText={<span>Suffix<span className="manatoryfield"></span></span>}
                                        value={this.state.SuffixState}                                        
                                        onChange={this.handleChangeSuffix}
                                        maxHeight={200}
                                    >
                                        {SuffixItems}
                                    </SelectField>

                                </Col>
                            </Col>

                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds" >
                                    <TextField hintText="Enter Your Mobile Phone Number" floatingLabelText="Mobile Phone Number"
                                        value={this.state.PhoneNumState}
                                        onChange={this.handleChangePhoneNum.bind(this)}
                                        errorText={this.state.isValidFormatPhoneNum ? "Please Enter Valid Phone Number" : ""}
                                    />
                                </Col>
                                <Col xs={12} md={6} className="input-fileds" >
                                    <TextField hintText="Enter Your Home Phone Number" floatingLabelText="Home Phone Number"
                                        value={this.state.HomeNumState}
                                        onChange={this.handleChangeHomeNum.bind(this)}
                                        errorText={this.state.isValidFormatHomeNum ? "Please Enter Valid Home Num" : ""}
                                    />
                                </Col>
                            </Col>

                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds">
                                    <TextField disabled={true} hintText="Enter Your Email" floatingLabelText={<span>Email<span className="manatoryfield">*</span></span>}
                                        type="email"
                                        value={this.state.EmailState}
                                        onChange={this.handleChangeEmail.bind(this)}
                                        errorText={this.state.isValidEmail ? "Please Enter Your Email" : ""}
                                    />
                                </Col>
                                <Col xs={12} md={6} className="input-fileds">
                                    <TextField disabled={true} hintText="Enter Your Confirm Email" floatingLabelText={<span>Confirm Email<span className="manatoryfield">*</span></span>}
                                        type="email"
                                        value={this.state.ConfirmEmailState}
                                        onChange={this.handleChangeConfirmEmail.bind(this)}
                                        errorText={this.state.isValidCEmail ? "Please Enter Your Confirm Email" : ""}
                                    />
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds">
                                    <OverlayTrigger placement="top" overlay={tooltip} className="Reg-Tooltip">                                        
                                        <TextField hintText="Enter Your Password" floatingLabelText={<span>Password<span className="manatoryfield">*</span></span>}
                                            type="password"
                                            value={this.state.PasswordState}
                                            onChange={this.handleChangePassword.bind(this)}
                                            errorText={this.state.isValidPassword? "Please Enter Your Password" : ""}
                                        />
                                    </OverlayTrigger>
                                    <span className="validationmsg">{this.state.isValidFormatPassword ? "Please Enter the Valid Password" : ""}</span>
                                    <span className="validationWeakmsg">{this.state.errorMsgMedium ? <div><span>Password Strength:<span>Medium</span></span><div className="One"></div></div> : ""}</span>
                                    <span className="validationGoodmsg">{this.state.errorMsgGood ? <div><span>Password Strength:<span>Good</span></span><div className="Two"></div></div> : ""}</span>
                                    <span className="validationStrongmsg">{this.state.errorMsgStrong ? <div><span>Password Strength:<span>Strong</span></span><div className="Three"></div></div> : ""}</span>

                                </Col>

                                <Col xs={12} md={6} className="input-fileds">                                   
                                    <TextField hintText="Enter Your Confirm Password" floatingLabelText={<span>Confirm Password<span className="manatoryfield">*</span></span>}
                                        type="password"
                                        value={this.state.ConfirmPasswordState}
                                        onChange={this.handleChangeConfirmPassword.bind(this)}
                                        errorText={this.state.isValidCPassword? " Please Enter Your Confirm Password" : ""}
                                    />
                                    <span className="validationmsg">{this.state.isValidFormatCPassword ? "Please Enter the Valid Password" : ""}</span>
                                    <span className="validationmsg">{this.state.isValidPwdMatch ? " Password doesn't Match" : ""}</span>                                   
                                </Col>

                            </Col>
                            <Col xs={12} md={12} className="RegButtons">
                                <Col md={6} xs={6}>
                                    <Button onClick={this.handleReset.bind(this)} className="RegButton1 resetBtn" >Reset</Button>
                                </Col>
                                <Col md={6} xs={6}>
                                    <Button type="submit" className="RegButton1 regBtn" onClick={this.handleRegistration.bind(this)}>Register</Button><br/><br/>
                                    <span className="validationmsg">{this.state.checkValid ? "This Email already exists in GPA" : ""}</span>                                                                        
                                </Col>
                            </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    /* Fields Reset Handle Event */
    handleReset(e) {
        this.setState({
            value: null,
            TitleState: "",
            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            SuffixState: "",
            PhoneNumState: "",
            HomeNumState: "",                        
            PasswordState: "",
            ConfirmPasswordState: "",
            isValidCompanyName:false,
            isValidTitle: false,
            isValidFirstName: false,
            isValidLastName: false,
            isValidEmail: false,
            isValidCEmail: false,
            isValidPassword: false,
            isValidCPassword: false,            
            isValidFormatFirstName: false,
            isValidFormatLastName: false,
            isValidFormatPhoneNum: false,
            isValidFormatHomeNum: false,
            isValidFormatPassword:false,
            isValidFormatCPassword:false,
            isValidPwdMatch:false,
            errorMsgMedium:false,
            errorMsgGood:false,
            errorMsgStrong:false,           
            showValidMsg: false,
            value: null            
        });
    }   

    /* Passing Data to User Pool */
    handleRegistration(event) {
        event.preventDefault();
        var isValid = this.handleValidateForm(this);
        if (isValid == true) {
            var userPool = new CognitoUserPool(poolData);
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

            var dataEmailId = {
                Name: 'email',
                Value: this.state.EmailState
            };

            var dataPassword = {
                Name: 'address',
                Value: this.state.PasswordState
            };

            var dataPhoneNum = {
                Name: 'profile',
                Value: this.state.PhoneNumState
            };

            var dataHomeNum = {
                Name: 'locale',
                Value: this.state.HomeNumState
            };

            var attributedataTitle = new CognitoUserAttribute(dataTitle);
            var attributedataFirstName = new CognitoUserAttribute(dataFirstName);
            var attributedataMiddleName = new CognitoUserAttribute(dataMiddleName);
            var attributedataLastName = new CognitoUserAttribute(dataLastName);
            var attributedataSuffix = new CognitoUserAttribute(dataSuffix);
            var attributedataEmail = new CognitoUserAttribute(dataEmailId);
            var attributedataPassword = new CognitoUserAttribute(dataPassword);
            var attributedataPhoneNum = new CognitoUserAttribute(dataPhoneNum);
            var attributedataHomeNum = new CognitoUserAttribute(dataHomeNum);

            attributeList.push(attributedataTitle);
            attributeList.push(attributedataFirstName);
            attributeList.push(attributedataMiddleName);
            attributeList.push(attributedataLastName);
            attributeList.push(attributedataSuffix);
            attributeList.push(attributedataPassword);
            attributeList.push(attributedataEmail);
            attributeList.push(attributedataPhoneNum);
            attributeList.push(attributedataHomeNum);

            var thisObj = this;

            userPool.signUp(userEmail, password, attributeList, null, function (err, result) {
                if (err) {
                     
                    thisObj.setState({ checkValid: err.message });                   
                } else {
                    thisObj.handleAppProcessFlowSave(thisObj);
                }
            });
        }
        else
        {
        
        }
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(Registration);