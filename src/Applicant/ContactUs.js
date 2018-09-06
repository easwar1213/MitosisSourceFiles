import React, { Component } from 'react';

//BootStrap Component
import { Grid, Col, Panel, Row, Button} from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

//Flex
import { Flex } from 'react-flex-material';

//API Calling Methods
import axios from 'axios';

//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Notification
import Notifications, { notify } from 'react-notify-toast';

const CountryItems = [];

var emailresult;

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.handleLoadCountry(this);
        this.handleContactDataAuto(this);
        //Field State Values Initialization
        this.state = {
            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            EmailState: "",
            PasswordState: this.props.LoginData.LPwd,
            MobileNumberState: "",
            SubjectState: "",
            CitizenshipState: "",
            MessageState: "",
            isValidFirstName: false,
            isValidLastName: false,
            isValidEmail: false,
            isValidMobileNumber: false,
            isValidSubject: false,
            isValidCitizenship: false,
            isValidMessage: false,
        }
    }

    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        this.setState({EmailState:emailresult});
    }

    //Handle Event
    handleChangeFirstName(e) {
        this.setState({ FirstNameState: e.target.value });
    };

    handleChangeMiddleName(e) {
        this.setState({ MiddleNameState: e.target.value });
    };

    handleChangeLastName(e) {
        this.setState({ LastNameState: e.target.value });
    };

    handleChangeEmail(e) {
        this.setState({ EmailState: e.target.value });
    };

    handleChangeMobileNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ MobileNumberState: onlyNums });
        }
    };

    handleChangeSubject(e) {
        this.setState({ SubjectState: e.target.value });
    };

    handleChangeCitizenship(e, index, value) {
        this.setState({ CitizenshipState: value });
    };

    handleChangeMessage(e) {
        this.setState({ MessageState: e.target.value });
    };

    //Load Country List Function
    handleLoadCountry(event) {
        let LoadCountryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            { QueryName: "Countries" }
        );
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: LoadCountryAPIUrl,
            headers: AxiosHeaderConfig,
        }).then(({ data }) => {
            CountryItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                CountryItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
            }

        }).catch((err) => {
            
        })
    }

    //Redirect to Dashboard
    handleNavDashboard() {
        history.push('/ApplicantDashboard');
    }

    //Validation Function
    handleValidation(e) {
        var validForm = false;
        var validFirstNameForm = false;
        var validLastNameForm = false;
        var validEmailForm = false;
        var validMobileNumberForm = false;
        var validSubjectForm = false;
        var validCitizenshipForm = false;
        var validMessageForm = false;
        var varValidateEmail = this.state.EmailState;
        if (this.state.FirstNameState.length > 0) {
            this.setState({ isValidFirstName: false });
            validFirstNameForm = true;
        }
        else {
            this.setState({ isValidFirstName: true });
            validFirstNameForm = false;
        }
        if (this.state.LastNameState.length > 0) {
            this.setState({ isValidLastName: false });
            validLastNameForm = true;
        }
        else {
            this.setState({ isValidLastName: true });
            validLastNameForm = false;
        }
        if (this.state.EmailState.length > 0) {
            this.setState({ isValidEmail: false });
            validEmailForm = true;
        }
        else {
            this.setState({ isValidEmail: true });
            validEmailForm = false;
        }
        if (this.state.EmailState.length > 0) {
            var varEmailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            this.setState({ isValidEmail: false });

            if (varEmailFormat.test(varValidateEmail)) {
                if (varValidateEmail.length > 0) {
                    this.setState({ isValidEmailFormat: false });
                    validEmailForm = true;
                }
                else {
                    this.setState({ isValidEmailFormat: false });
                    validEmailForm = false;
                }
            }
            else {
                this.setState({ isValidEmailFormat: true });
                validEmailForm = false;
            }
        }
        else {
            this.setState({ isValidEmail: true });
            this.setState({ isValidEmailFormat: false });
            validEmailForm = false;
        }
        if (this.state.MobileNumberState.length > 0) {
            this.setState({ isValidMobileNumber: false });
            validMobileNumberForm = true;
        }
        else {
            this.setState({ isValidMobileNumber: true });
            validMobileNumberForm = false;
        }
        if (this.state.SubjectState.length > 0) {
            this.setState({ isValidSubject: false });
            validSubjectForm = true;
        }
        else {
            this.setState({ isValidSubject: true });
            validSubjectForm = false;
        }
        if (this.state.CitizenshipState != "") {
            this.setState({ isValidCitizenship: false });
            validCitizenshipForm = true;
        }
        else {
            this.setState({ isValidCitizenship: true });
            validCitizenshipForm = false;
        }
        if (this.state.MessageState != "") {
            this.setState({ isValidMessage: false });
            validMessageForm = true;
        }
        else {
            this.setState({ isValidMessage: true });
            validMessageForm = false;
        }
        if (validFirstNameForm && validLastNameForm && validEmailForm && validMobileNumberForm && validSubjectForm && validCitizenshipForm && validMessageForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Save Function
    handleContactUSSave(event) {
        var thisObj = this;
        //let ContactAPIUrl = "https://z95u0w2el1.execute-api.us-west-2.amazonaws.com/Dev/GPA_DashboardSummary_Lambda";
        let ContactAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let ContactUSJSONData = JSON.stringify({
            //QueryName: "Save",
            QueryName:"ApplicantContactSupportSave",
            AppConSupID: this.state.AppConSupID,
            UserID: this.state.EmailState,
            FirstName: this.state.FirstNameState,
            MiddleName: this.state.MiddleNameState,
            LastName: this.state.LastNameState,
            PhoneNum: this.state.MobileNumberState,
            MailSubject: this.state.SubjectState,
            CountryOfCitizenship: this.state.CitizenshipState,
            Message: this.state.MessageState,
        });
        let AxiosHeaderConfig = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
        };
        var isValid = this.handleValidation(this);
        if (isValid) {
            axios({
                method: "POST",
                url: ContactAPIUrl,
                data: ContactUSJSONData,
                //headers:AxiosHeaderConfig,

            }).then((data) => {                          
                thisObj.handleContactSendMail(this);
            }).catch((err) => {

            })
        }
        else {
            notify.show("Please Fill Mandatory Fields","error",3000);
        }
    }

    //Sending Mail to GPA Admin
    handleContactSendMail(event) {
        var thisObj = this;
        let emailSendingApiUrl = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
        var data = {
            MailDocName: "CS",
            MailSubject:this.state.SubjectState,
            MailContent:this.state.MessageState,
        }
        var header = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: emailSendingApiUrl,
            data: JSON.stringify(data),
        }).then(({ data }) => {
            notify.show("Information Send Succesfully to GPA Executive Contacting Soon","success",3000);
            thisObj.handleReset(this);
        })
        .catch((err) => {
            
        });
    }

    //Auto-Populated Function
    handleContactDataAuto(event) {
        var thisObj = this;
        let UserID;
        let BenQusAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let BenQusAutoJSONData = JSON.stringify({
            QueryName: "Auto",
            UserID: emailresult,
        });
        let AxiosHeaderConfig = {
            headers: {
                // accept: 'application/json',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Origin": "*",
            }
        };
        axios({
            method: "POST",
            url: BenQusAutoAPIUrl,
            data: BenQusAutoJSONData,
            //headers:AxiosHeaderConfig,

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ FirstNameState: data[i].FirstName });
                thisObj.setState({ MiddleNameState: data[i].MiddleName });
                thisObj.setState({ LastNameState: data[i].LastName });
                thisObj.setState({ MobileNumberState : data[i].PhoneNum});
                thisObj.setState({ CitizenshipState: data[i].CountryOfCitizenship });
            }
        }).catch((err) => {
            
        })
    }

    //Page Rendering 
    render() {
        return (
            <div className="main-wrapper">
                <Paper zDepth={1} className="CommonDiv">
                    <h2 className="legendtitle">Customer Support</h2>   
                        <div className="fieldstyle"> 
                            <Grid>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={4} className="input-fileds">
                                        <TextField hintText="Enter Your First Name"
                                            floatingLabelText={<span>First Name <span className="manatoryfield">*</span></span>}
                                            value={this.state.FirstNameState}
                                            onChange={this.handleChangeFirstName.bind(this)}
                                            errorText={this.state.isValidFirstName ? "Please Enter Your First Name" : null}
                                        />
                                    </Col>
                                    <Col xs={12} md={4} className="input-fileds">
                                        <TextField hintText="Enter Your Middle Name"
                                            floatingLabelText={<span>Middle Name</span>}
                                            value={this.state.MiddleNameState}
                                            onChange={this.handleChangeMiddleName.bind(this)}
                                        />
                                    </Col>
                                    <Col xs={12} md={4} className="input-fileds">
                                        <TextField hintText="Enter Your Last Name"
                                            floatingLabelText={<span>Last Name <span className="manatoryfield">*</span></span>}
                                            value={this.state.LastNameState}
                                            onChange={this.handleChangeLastName.bind(this)}
                                            errorText={this.state.isValidLastName ? "Please Enter Your Last Name" : null}
                                        />
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={6} className="input-fileds">
                                        <TextField hintText="Enter Your Email"
                                            floatingLabelText={<span>Email <span className="manatoryfield">*</span></span>}
                                            value={this.state.EmailState}
                                            onChange={this.handleChangeEmail.bind(this)}
                                            errorText={this.state.isValidEmail ? "Please Enter Your Email" : null}
                                        />
                                        <span className="validationmsg">{this.state.isValidEmailFormat ? "Please Enter the Valid Mail" : ""}</span>
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds">
                                        <TextField hintText="Enter Your Mobile Phone Number"
                                            floatingLabelText={<span>Mobile Phone Number <span className="manatoryfield">*</span></span>}
                                            value={this.state.MobileNumberState}
                                            onChange={this.handleChangeMobileNumber.bind(this)}
                                            errorText={this.state.isValidMobileNumber ? "Please Enter Your Mobile Phone Number" : null}
                                        />
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={6} className="input-fileds">
                                        <TextField hintText="Enter Your Subject"
                                            floatingLabelText={<span>Subject <span className="manatoryfield">*</span></span>}
                                            value={this.state.SubjectState}
                                            onChange={this.handleChangeSubject.bind(this)}
                                            errorText={this.state.isValidSubject ? "Please Enter Your Email" : null}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds">
                                        <SelectField
                                            floatingLabelText={<span>Country Of Citizenship <span className="manatoryfield">*</span></span>}
                                            value={this.state.CitizenshipState}
                                            onChange={this.handleChangeCitizenship.bind(this)}
                                            errorText={this.state.isValidCitizenship ? "Please Select Your Country of Citizenship" : null}
                                            maxHeight={200}
                                        >
                                            {CountryItems}
                                        </SelectField>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} className="input-fileds">
                                        <TextField
                                            hintText="Enter Your Message"
                                            floatingLabelText={<span>Message <span className="manatoryfield">*</span></span>}
                                            multiLine={true}
                                            //rows={2}
                                            value={this.state.MessageState}
                                            onChange={this.handleChangeMessage.bind(this)}
                                            errorText={this.state.isValidMessage ? "Please Enter Your Message" : ""}
                                        />
                                    </Col>
                                </Col>
                                <Col xs={12} md={12} className="RegButton">
                                    <Col xs={12} md={10} className="input-fileds">
                                        <Button onClick={this.handleReset.bind(this)} className="ResetButton" >Reset</Button>
                                    </Col>
                                    <Col xs={12} md={2} className="input-fileds">
                                        <Button type="submit" className="RegButton2" onClick={this.handleContactUSSave.bind(this)}>Submit</Button>
                                        <Notifications/>
                                    </Col>
                                </Col>
                            </Grid>
                        </div>
                </Paper>
            </div>
        );
    }

    //Reset Function
    handleReset(e) {
        this.setState({
            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            EmailState: "",
            MobileNumberState: "",
            SubjectState: "",
            CitizenshipState: "",
            MessageState: "",
            isValidFirstName: false,
            isValidLastName: false,
            isValidEmail: false,
            isValidMobileNumber: false,
            isValidSubject: false,
            isValidCitizenship: false,
            isValidMessage: false,
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(ContactUs);