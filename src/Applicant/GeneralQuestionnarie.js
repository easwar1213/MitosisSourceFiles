import React, { Component } from 'react';
import PropTypes from "prop-types";

//Bootstrap Component
import { Row, Col, Panel, Button } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import { Checkbox } from 'material-ui';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
//AWS User Pool
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

//Notification Alert
import Notifications, { notify } from 'react-notify-toast';

//API Calling Method
import axios from 'axios';

//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Google Address Auto Complete
import Geosuggest from 'react-geosuggest';
import Moment from 'react-moment';
import { join } from 'path';

var moment = require('moment')

/* User Pool Access Details */
const poolData = {
    UserPoolId: 'us-west-2_wgkaBUmz5',//'us-west-2_kG2V3FBcu', // Your user pool id here
    ClientId: '3ocb7u0422dhf9c38vacc0kfv3',//'4apkr7thetvm981irp8ohsjj1t', // Your client id here 4gjka5ag6svfp0f3c4i2a1r8oo
    identityID: "us-west-2:2cae3c46-6f2b-40dd-a059-5313e2b8b23b",//"us-west-2:746c750e-7185-4675-84c1-95186baed362",//"us-west-2:e2caf986-8e5b-4c17-abe1-362efe0c8960",
    region: "us-west-2",
};

const InquiryItems = [
    <MenuItem value={"Retirement Benefits"} key={1} primaryText={`Retirement Benefits`} />,
    <MenuItem value={"Previous Employer Benefits"} key={2} primaryText={`Previous Employer Benefits`} />,
    <MenuItem value={"Survivor Benefits"} key={3} primaryText={`Survivor Benefits`} />
];

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

const MaritalStatusItems = [
    <MenuItem value={"S"} key={1} primaryText={`Single`} />,
    <MenuItem value={"M"} key={2} primaryText={`Married`} />,
    <MenuItem value={"C"} key={3} primaryText={`Civil Partnership`} />,
    <MenuItem value={"D"} key={4} primaryText={`Divorced`} />,
    <MenuItem value={"W"} key={5} primaryText={`Widowed`} />,
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

const MCDWYearItems = [];

const CountryItems = [];

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

const newstyle = {
    marginTop: 10,
}

var emailresult;

var passwordresult;

class GeneralQuestionnarie extends Component {
    constructor(props) {
        super(props);
        var Params = new URLSearchParams(document.location.search);
        var varUserID = Params.get("UserID");
        this.handleLoadCountry(this);
        if (Params == null || Params == "") {
            //this.handleReadClientCompany(this);
            this.handlePoolDataLoad(this);
        }
        else {
            this.handleGenQusEdit(this);
        }
        /* Field State Values Initialization */
        this.state = {
            //State Values
            search: "",
            psearch: "",
            value: "",
            BtnNameState: "Save",
            PPanelTitleState: "",
            InquiryState: "",
            RBenefitsState: false,
            PBenefitsState: false,
            SBenefitsState: false,
            AreYouState: "",
            GenderState: "",
            PGenderState: "",
            TitleState: "",
            PTitleState: "",
            FirstNameState: "",
            PFirstNameState: "",
            MiddleNameState: "",
            PMiddleNameState: "",
            LastNameState: "",
            PLastNameState: "",
            SuffixState: "",
            PSuffixState: "",
            BirthNameState: "",
            MaidenNameState: "",
            DOBStateChange: "",
            PDOBStateChange: "",
            DMCWDStateChange: "",
            DayState: "",
            PDayState: "",
            MCDWDayState: "",
            MonthState: "",
            PMonthState: "",
            MCDWMonthState: "",
            YearState: "",
            PYearState: "",
            MCDWYearState: "",
            CountryState: "",
            PCountryState: "",
            MailingAddressState: "",
            PMailingAddressState: "",
            PhoneNumState: "",
            HomeNumState: "",
            MaritalStatusState: "",
            //Empty Validation
            isValidInquiry: false,
            isValidAreYou: false,
            isValidGender: false,
            isValidPGender: false,
            isValidTitle: false,
            isValidPTitle: false,
            isValidFirstName: false,
            isValidPFirstName: false,
            isValidLastName: false,
            isValidPLastName: false,
            isValidDay: false,
            isValidPDay: false,
            isValidMCDWDay: false,
            isValidMonth: false,
            isValidPMonth: false,
            isValidMCDWMonth: false,
            isValidYear: false,
            isValidPYear: false,
            isValidMCDWYear: false,
            isValidCountry: false,
            isValidPCountry: false,
            isValidMailingAddress: false,
            isValidPMailingAddress: false,
            isValidPhoneNum: false,
            isValidMaritalStatus: false,
            isValidDateOfBirth: false,
            isValidPDateOfBirth: false,
            isValidDateOfMCWD: false,
            //Format Validation
            isValidFormatFirstName: false,
            isValidFormatPFirstName: false,
            isValidFormatLastName: false,
            isValidFormatPLastName: false,
            isValidFormatDay: false,
            isValidFormatPDay: false,
            isValidFormatMCDWDay: false,
            isValidFormatMonth: false,
            isValidFormatPMonth: false,
            isValidFormatMCDWMonth: false,
            isValidFormatYear: false,
            isValidFormatPYear: false,
            isValidFormatMCDWYear: false,
            isValidFormatMailingAddress: false,
            isValidFormatPMailingAddress: false,
            isValidFormatPhoneNum: false,
            isValidFormatHomeNum: false,

            //Valid Return
            validRInquiryForm: null,
            validRAreYouForm: null,
            validRGenderForm: null,
            validRTitleForm: null,
            validRFNameForm: null,
            validRLNameForm: null,
            validRDOBMonthForm: null,
            validRDOBDayForm: null,
            validRDOBYearForm: null,
            validRCountryForm: null,
            validRAddressForm: null,
            validRPhoneNumForm: null,
            validRMCDWMonthForm: null,
            validRMCDWDayForm: null,
            validRMCDWYearForm: null,
            validRPGenderForm: null,
            validRPTitleForm: null,
            validRPFNameForm: null,
            validRPLNameForm: null,
            validRPDOBMonthForm: null,
            validRPDOBDayForm: null,
            validRPDOBYearForm: null,
            validRPCountryForm: null,
            validRPAddressForm: null,
            validationError: {},
            showValidMsg: false,
        }
        // this.handleSelectSuggest= this.handleSelectSuggest.bind(this);
        // this.handlePSelectSuggest = this.handlePSelectSuggest.bind(this);
    }

    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        passwordresult = localStorage.getItem('applicant_password');
    }

    //Handle Event

    //Edit Function
    handleGenQusEdit(event) {

        emailresult = localStorage.getItem('applicant_email');
        var thisObj = this;
        let UserID;
        let DasboardSummaryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var data = {
            QueryName: "GeneralQuestionnariesEdit",
            UserID: emailresult,
        }
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: DasboardSummaryAPIUrl,
            data: JSON.stringify(data),
            headers: AxiosHeaderConfig,
        }).then(({ data }) => {
            thisObj.setState({ BtnNameState: "Update" });
            for (var i = 0; i < data.length; i++) {
                if (data[i].InquiryAbout == "Retirement Benefits") {
                    thisObj.setState({ RBenefitsState: true });
                }
                else if (data[i].InquiryAbout == "Retriement Benefits,Previous Employer Benefits") {
                    thisObj.setState({ RBenefitsState: true });
                    thisObj.setState({ PBenefitsState: true });
                }
                else if (data[i].InquiryAbout == "Previous Employer Benefits,Survivor Benefits") {
                    thisObj.setState({ PBenefitsState: true });
                    thisObj.setState({ SBenefitsState: true });
                }
                else if (data[i].InquiryAbout == "Retriement Benefits,Previous Employer Benefits,Survivor Benefits") {
                    thisObj.setState({ RBenefitsState: true });
                    thisObj.setState({ PBenefitsState: true });
                    thisObj.setState({ SBenefitsState: true });
                }
                thisObj.setState({ AreYouState: data[i].AreYou });
                thisObj.setState({ GenderState: data[i].Gender });
                thisObj.setState({ TitleState: data[i].Title });
                thisObj.setState({ FirstNameState: data[i].FirstName });
                thisObj.setState({ MiddleNameState: data[i].MiddleName });
                thisObj.setState({ LastNameState: data[i].LastName });
                thisObj.setState({ SuffixState: data[i].Suffix });
                thisObj.setState({ UserIdState: data[i].UserID });
                thisObj.setState({ BirthNameState: data[i].BirthName });
                thisObj.setState({ MaidenNameState: data[i].MaidenName });
                // var dateOfBirth = new Date(data[i].DOB);
                // thisObj.setState({ DOBStateChange: dateOfBirth });
                thisObj.setState({ DayState: data[i].DOB_Day });
                thisObj.setState({ MonthState: data[i].DOB_Month });
                thisObj.setState({ YearState: data[i].DOB_Year });
                thisObj.setState({ CountryState: data[i].CountryOfCitizenship });
                thisObj.setState({ MailingAddressState: data[i].MailingAddress });
                thisObj.setState({ PhoneNumState: data[i].PhoneNum });
                thisObj.setState({ HomeNumState: data[i].HomeNum });
                thisObj.setState({ MaritalStatusState: data[i].MaritalStatus });
                console.log(this.state.DOBStateChange);
                if (data[i].MaritalStatus == "S") {
                    thisObj.setState({ PModalEnableState: false });
                    thisObj.setState({ PartnerInfoShow: true });
                }
                else {
                    if (data[i].MaritalStatus == "M") {
                        thisObj.setState({ PPanelTitleState: "Date of Marriage" });
                        thisObj.setState({ PModalEnableState: true });
                        thisObj.setState({ PartnerInfoShow: false });
                    }
                    else if (data[i].MaritalStatus == "C") {
                        thisObj.setState({ PPanelTitleState: "Date of Civil Partnetship" });
                        thisObj.setState({ PModalEnableState: true });
                        thisObj.setState({ PartnerInfoShow: false });
                    }
                    else if (data[i].MaritalStatus == "D") {
                        thisObj.setState({ PPanelTitleState: "Date of Divorced" });
                        thisObj.setState({ PModalEnableState: true });
                        thisObj.setState({ PartnerInfoShow: false });
                    }
                    else if (data[i].MaritalStatus == "W") {
                        thisObj.setState({ PPanelTitleState: "Date of Windowed" });
                        thisObj.setState({ PModalEnableState: true });
                        thisObj.setState({ PartnerInfoShow: false });
                    }
                    else {
                        thisObj.setState({ PModalEnableState: false });
                        thisObj.setState({ PartnerInfoShow: true });
                    }
                }
                // var dateOfDMCWD = new Date(data[i].DMCWD);
                // thisObj.setState({ DMCWDStateChange: dateOfDMCWD  });
                // var dateOfPartnerBirth = new Date(data[i].PDOB);
                // thisObj.setState({ PDOBStateChange: dateOfPartnerBirth });
                thisObj.setState({ MCDWDayState: data[i].DOMCDW_Day });
                thisObj.setState({ MCDWMonthState: data[i].DOMCDW_Month });
                thisObj.setState({ MCDWYearState: data[i].DOMCDW_Year });
                thisObj.setState({ PGenderState: data[i].PGender });
                thisObj.setState({ PTitleState: data[i].PTitle });
                thisObj.setState({ PFirstNameState: data[i].PFirstName });
                thisObj.setState({ PMiddleNameState: data[i].PMiddleName });
                thisObj.setState({ PLastNameState: data[i].PLastName });
                thisObj.setState({ PSuffixState: data[i].PSuffix });
                thisObj.setState({ PDayState: data[i].PDOB_Day });
                thisObj.setState({ PMonthState: data[i].PDOB_Month });
                thisObj.setState({ PYearState: data[i].PDOB_Year });
                thisObj.setState({ PCountryState: data[i].PCountryOfCitizenship });
                thisObj.setState({ PMailingAddressState: data[i].PMailingAddress });
            }
        this.handleMCDWYear(this);
        }).catch((err) => {

        });
    }

    handleReadClientCompany(event) {
        var thisObj = this;
        let ReadCliCompanyAPIUrl = "https://cx1y9bpqe2.execute-api.us-west-2.amazonaws.com/Dev/GPA_ReadClientCompanyDatas_Lambda";
        var JSONData = JSON.stringify({
            QueryName: "GQ",
            UserID: emailresult
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
                thisObj.state.MonthState = data[i].DOB_Month;
                thisObj.state.DayState = data[i].DOB_Day;
                thisObj.state.YearState = data[i].DOB_Year;
            }
        }).catch((err) => {

        });
    }

    handleChangeInquiry = (event, index, value) => {
        if (value == "Survivor Benefits") {
            this.setState({ AreYouState: "R" });
        }
        else if (value == "Retirement Benefits,Survivor Benefits" || value == "Survivor Benefits,Retirement Benefits") {
            this.setState({ AreYouState: "R" });
        }
        else if (value == "Retirement Benefits,Previous Employer Benefits,Survivor Benefits" || value == "Retirement Benefits,Survivor Benefits,Previous Employer Benefits" || value == "Survivor Benefits,Retirement Benefits,Previous Employer Benefits" || value == "Survivor Benefits,Previous Employer Benefits,Retirement Benefits" || value == "Previous Employer Benefits,Retirement Benefits,Survivor Benefits" || value == "Previous Employer Benefits,Survivor Benefits,Retirement Benefits") {
            this.setState({ AreYouState: "R" });
        }
        else if (value == "Previous Employer Benefits,Survivor Benefits" || value == "Survivor Benefits,Previous Employer Benefits") {
            this.setState({ AreYouState: "R" });
        }
        else {
            this.setState({ AreYouState: "C" });
        }
        this.setState({ InquiryState: value });
    };

    handleChangeRBenefits(e) {
        if (e.target.checked == true) {
            this.setState({ RBenefitsState: "Retirement Benefits" });
        } else {
            this.setState({ RBenefitsState: "" });
        }
    };

    handleChangePBenefits(e) {
        if (e.target.checked == true) {
            this.setState({ PBenefitsState: "Previous Employer Benefits" });
        } else {
            this.setState({ PBenefitsState: "" });
        }
    };

    handleChangeSBenefits(e) {
        if (e.target.checked == true) {
            this.setState({ SBenefitsState: "Survivor Benefits" });
        } else {
            this.setState({ SBenefitsState: "" });
        }
    };

    handleChangeAreYou(e) {
        this.setState({ AreYouState: e.target.value });
    }

    handleChangeGender(e) {
        this.setState({ GenderState: e.target.value });
    }

    handleChangePGender(e) {
        this.setState({ PGenderState: e.target.value });
    }

    handleChangeTitle = (event, index, value) => {
        this.setState({ TitleState: value });
    };

    handleChangePTitle = (event, index, value) => {
        this.setState({ PTitleState: value });
    };

    handleChangeFirstName(e) {
        this.setState({ FirstNameState: e.target.value });
    }

    handleChangePFirstName(e) {
        this.setState({ PFirstNameState: e.target.value });
    }

    handleChangeMiddleName(e) {
        this.setState({ MiddleNameState: e.target.value });
    }

    handleChangePMiddleName(e) {
        this.setState({ PMiddleNameState: e.target.value });
    }

    handleChangeLastName(e) {
        this.setState({ LastNameState: e.target.value });
    }

    handleChangePLastName(e) {
        this.setState({ PLastNameState: e.target.value });
    }

    handleChangeSuffix = (event, index, value) => {
        this.setState({ SuffixState: value });
    };

    handleChangeBirthName(e) {
        this.setState({ BirthNameState: e.target.value });
    }

    handleChangeMaidenName(e) {
        this.setState({ MaidenNameState: e.target.value });
    }

    handleChangeDay = (event, index, value) => {
        this.setState({ DayState: value });
    };

    handleChangePDay = (event, index, value) => {
        this.setState({ PDayState: value });
    };

    handleChangeMCDWDay = (event, index, value) => {
        this.setState({ MCDWDayState: value });
    };

    handleChangeMonth = (event, index, value) => {
        this.setState({ MonthState: value });
    };

    handleChangePMonth = (event, index, value) => {
        this.setState({ PMonthState: value });
    };

    handleChangeMCDWMonth = (event, index, value) => {
        this.setState({ MCDWMonthState: value });
    };

    handleChangeYear = (event, index, value) => {
        this.setState({ YearState: value }, () => { this.handleMCDWYear(this) });
    };

    handleMCDWYear(e) {
        var MCDWYear = parseInt(this.state.YearState) + 15;
        MCDWYearItems.length = 0;
        for (let i = MCDWYear; i < 2019; i++) {
            MCDWYearItems.push(<MenuItem value={i.toString()} key={i.toString()} primaryText={i.toString()} />);
        }
    }
    handleChangePYear = (event, index, value) => {
        this.setState({ PYearState: value });
    };

    handleChangeMCDWYear = (event, index, value) => {
        this.setState({ MCDWYearState: value });
    };

    handleChangePSuffix = (event, index, value) => {
        this.setState({ PSuffixState: value });
    };

    handleChangeCountry = (event, index, value) => {
        this.setState({ CountryState: value });
    };

    handleChangePCountry = (event, index, value) => {
        this.setState({ PCountryState: value });
    };


    // handleSelectSuggest(suggest) {
    //     this.setState({ search: "", MailingAddressState: suggest.formatted_address });
    // };

    // handlePSelectSuggest(suggest) {
    //     this.setState({ psearch: "", PMailingAddressState: suggest.formatted_address })
    // };

    // handleChangeMailingAddress(e) {
    //     this.setState({ search: e.target.value, MailingAddressState: e.target.value })
    // };

    // handleChangePMailingAddress(e) {
    //     this.setState({ psearch: e.target.value, PMailingAddressState: e.target.value })
    // };

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

    handleChangeDateOfBirth = (e, date) => {
        this.setState({ DOBStateChange: date });
    }

    handleChangeMCDWDate = (e, date) => {
        this.setState({ DMCWDStateChange: date });
    }
    handleChangePartnerDateOfBirth = (e, date) => {
        this.setState({ PDOBStateChange: date });
    }

    handleChangeMaritalStatus = (event, index, value) => {
        this.setState({ MaritalStatusState: value });
        if (value == "S") {
            this.setState({
                PPanelTitleState: "",
                PGenderState: "",
                PTitleState: "",
                PFirstNameState: "",
                PMiddleNameState: "",
                PLastNameState: "",
                PSuffixState: "",
                PDOBStateChange: "",
                DMCWDStateChange: "",
                PCountryState: "",
                PMailingAddressState: ""
            });
        }
        else if (value == "M") {
            this.setState({ PPanelTitleState: "Date of Marriage" });
            this.setState({ PMailingAddressState: this.state.MailingAddressState });
            this.setState({ DMCWDStateChange: "" });
            this.setState({ PDOBStateChange: "" });

        }
        else if (value == "C") {
            this.setState({ PPanelTitleState: 'Date of Civil Partnership' });
            this.setState({ PMailingAddressState: this.state.MailingAddressState });
            this.setState({ DMCWDStateChange: "" });
            this.setState({ PDOBStateChange: "" });
        }
        else if (value == "D") {
            this.setState({ PPanelTitleState: 'Date of Divorce' });
            this.setState({ PMailingAddressState: this.state.MailingAddressState });
            this.setState({ DMCWDStateChange: "" });
            this.setState({ PDOBStateChange: "" });
        }
        else if (value == "W") {
            this.setState({ PPanelTitleState: 'Date of Death' });
            this.setState({ PMailingAddressState: this.state.MailingAddressState });
            this.setState({ DMCWDStateChange: "" });
            this.setState({ PDOBStateChange: "" });
        }
        else {
            this.setState({ PPanelTitleState: "" });
            this.setState({ PGenderState: "" });
        }
    };

    //Validation Function
    handleValidateForm(event) {
        const { validationError } = this.state;
        let validForm = false;
        var validInquiryForm = false;
        var validAreYouForm = false;
        var validGenderForm = false;
        var validTitleForm = false;
        var validFNameForm = false;
        var validLNameForm = false;
        var validDOBMonthForm = false;
        var validDOBDayForm = false;
        var validDOBYearForm = false;
        var validCountryForm = false;
        var validAddressForm = true;
        var validPhoneNumForm = false;
        var validMCDWMonthForm = false;
        var validMCDWDayForm = false;
        var validMCDWYearForm = false;
        var validPGenderForm = false;
        var validPTitleForm = false;
        var validPFNameForm = false;
        var validPLNameForm = false;
        var validPDOBMonthForm = false;
        var validPDOBDayForm = false;
        var validPDOBYearForm = false;
        var validPCountryForm = false;
        var validPAddressForm = false;
        var validDateOfBirthForm = false;
        var validPartnerDateOfBirthForm = false;
        var validDMCWDDateForm = false;
        var validMartialForm = false;

        if (this.state.RBenefitsState != "" || this.state.PBenefitsState != "" || this.state.SBenefitsState != "") {
            this.setState({ isValidInquiry: false });
            validInquiryForm = true;
        } else {
            this.setState({ isValidInquiry: true });
            validInquiryForm = false;
        }

        if (this.state.AreYouState != "") {
            this.setState({ isValidAreYou: false });
            validAreYouForm = true;
        }
        else {
            this.setState({ isValidAreYou: true });
            validAreYouForm = false;
        }

        if (this.state.GenderState != "") {
            this.setState({ isValidGender: false });
            validGenderForm = true;
        }
        else {
            this.setState({ isValidGender: true });
            validGenderForm = false;
        }

        if (this.state.TitleState != "") {
            this.setState({ isValidTitle: false });
            validTitleForm = true;
        }
        else {
            this.setState({ isValidTitle: true });
            validTitleForm = false;
        }

        if (this.state.FirstNameState.length > 0) {
            this.setState({ isValidFirstName: false });
            validFNameForm = true;
        }
        else {
            this.setState({ isValidFirstName: true });
            validFNameForm = false;
        }

        if (this.state.LastNameState.length > 0) {
            this.setState({ isValidLastName: false });
            validLNameForm = true;
        }
        else {
            this.setState({ isValidLastName: true });
            validLNameForm = false;
        }

        if (this.state.MonthState != "") {
            this.setState({ isValidMonth: false });
            validDOBMonthForm = true;
        }
        else {
            this.setState({ isValidMonth: true });
            validDOBMonthForm = false;
        }

        if (this.state.DayState != "") {
            this.setState({ isValidDay: false });
            validDOBDayForm = true;
        }
        else {
            this.setState({ isValidDay: true });
            validDOBDayForm = false;
        }

        if (this.state.YearState != "") {
            this.setState({ isValidYear: false });
            validDOBYearForm = true;
        }
        else {
            this.setState({ isValidYear: true });
            validDOBYearForm = false;
        }

        if (this.state.CountryState != "") {
            this.setState({ isValidCountry: false });
            validCountryForm = true;
        }
        else {
            this.setState({ isValidCountry: true });
            validCountryForm = false;
        }

        if (this.state.MailingAddressState != "") {
            this.setState({ isValidMailingAddress: false });
            validAddressForm = true;
        }
        else {
            this.setState({ isValidMailingAddress: true });
            validAddressForm = false;
        }

        if (this.state.PhoneNumState.length > 0 && this.state.PhoneNumState.length > 9) {
            this.setState({ isValidPhoneNum: false });
            validPhoneNumForm = true;
        }
        else {
            this.setState({ isValidPhoneNum: true });
            validPhoneNumForm = false;
        }

        if (this.state.DOBStateChange != "") {
            this.setState({ isValidDateOfBirth: false });
            validDateOfBirthForm = true;
        }
        else {
            this.setState({ isValidDateOfBirth: true });
            validDateOfBirthForm = false;
        }

        if (this.state.MaritalStatusState != "") {
            this.setState({ isValidMaritalStatus: false });
            validMartialForm = true;
        }
        else {
            this.setState({ isValidMaritalStatus: true });
            validMartialForm = false;
        }
        if (this.state.MaritalStatusState != "Single") {

            if (this.state.PDOBStateChange != "") {
                this.setState({ isValidPDateOfBirth: false });
                validPartnerDateOfBirthForm = true;
            }
            else {
                this.setState({ isValidPDateOfBirth: true });
                validPartnerDateOfBirthForm = false;
            }

            if (this.state.DMCWDStateChange != "") {
                this.setState({ isValidDateOfMCWD: false });
                validDMCWDDateForm = true;
            }
            else {
                this.setState({ isValidDateOfMCWD: true });
                validDMCWDDateForm = false;
            }

            if (this.state.MCDWMonthState != "") {
                this.setState({ isValidMCDWMonth: false });
                validMCDWMonthForm = true;
            }
            else {
                this.setState({ isValidMCDWMonth: true });
                validMCDWMonthForm = false;
            }

            if (this.state.MCDWDayState != "") {
                this.setState({ isValidMCDWDay: false });
                validMCDWDayForm = true;
            }
            else {
                this.setState({ isValidMCDWDay: true });
                validMCDWDayForm = false;
            }

            if (this.state.MCDWYearState != "") {
                this.setState({ isValidMCDWYear: false });
                validMCDWYearForm = true;
            }
            else {
                this.setState({ isValidMCDWYear: true });
                validMCDWYearForm = false;
            }

            if (this.state.PGenderState != "") {
                this.setState({ isValidPGender: false });
                validPGenderForm = true;
            }
            else {
                this.setState({ isValidPGender: true });
                validPGenderForm = false;
            }

            if (this.state.PTitleState != "") {
                this.setState({ isValidPTitle: false });
                validPTitleForm = true;
            }
            else {
                this.setState({ isValidPTitle: true });
                validPTitleForm = false;
            }

            if (this.state.PFirstNameState.length > 0) {
                this.setState({ isValidPFirstName: false });
                validPFNameForm = true;
            }
            else {
                this.setState({ isValidPFirstName: true });
                validPFNameForm = false;
            }

            if (this.state.PLastNameState.length > 0) {
                this.setState({ isValidPLastName: false });
                validPLNameForm = true;
            }
            else {
                this.setState({ isValidPLastName: true });
                validPLNameForm = false;
            }

            if (this.state.PMonthState != "") {
                this.setState({ isValidPMonth: false });
                validPDOBMonthForm = true;
            }
            else {
                this.setState({ isValidPMonth: true });
                validPDOBMonthForm = false;
            }

            if (this.state.PDayState != "") {
                this.setState({ isValidPDay: false });
                validPDOBDayForm = true;
            }
            else {
                this.setState({ isValidPDay: true });
                validPDOBDayForm = false;
            }

            if (this.state.PYearState != "") {
                this.setState({ isValidPYear: false });
                validPDOBYearForm = true;
            }
            else {
                this.setState({ isValidPYear: true });
                validPDOBYearForm = false;
            }

            if (this.state.PCountryState != "") {
                this.setState({ isValidPCountry: false });
                validPCountryForm = true;
            }
            else {
                this.setState({ isValidPCountry: true });
                validPCountryForm = false;
            }

            if (this.state.PMailingAddressState != "") {
                this.setState({ isValidPMailingAddress: false });
                validPAddressForm = true;
            }
            else {
                this.setState({ isValidPMailingAddress: true });
                validPAddressForm = false;
            }
        }

        if (this.state.MaritalStatusState != "S") {
            if (validAreYouForm && validGenderForm && validTitleForm && validFNameForm && validLNameForm && validCountryForm && validPhoneNumForm && validPGenderForm && validPTitleForm && validPFNameForm && validPLNameForm && validPCountryForm && validMartialForm && validDOBMonthForm
                && validDOBYearForm && validDOBDayForm && validPDOBDayForm && validPDOBMonthForm && validPDOBYearForm && validMCDWMonthForm && validMCDWDayForm && validMCDWYearForm) {
                validForm = true;
            }
            else {
                validForm = false;
            }
        }
        else {
            if (validAreYouForm && validGenderForm && validTitleForm && validFNameForm && validLNameForm && validCountryForm && validPhoneNumForm && validMartialForm && validDOBMonthForm && validDOBYearForm && validDOBDayForm) {
                validForm = true;
            }
            else {
                validForm = false;
            }

        }

        return validForm;
    }


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

    //Flow Update Function
    handleAppProcessFlowUpdate(event) {
        let AppProFlowAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify({
            QueryName: "ApplicantProcessFlowTrackingUpdateGQ",
            UserID: emailresult,
            GenQus: "C"
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
            history.push('/ApplicantDashboard');

        }).catch((err) => {

        })
    }

    //Save Function
    handleGenQusSave(event) {
        var Params = new URLSearchParams(document.location.search);
        var varUserID = Params.get("UserID");
        //var QueryName = "Save";
        var QueryName = "GeneralQuestionnariesSave";
        if (Params == null || Params == "") {
            //QueryName = "Save";
            QueryName = "GeneralQuestionnariesSave";
        }
        else {
            QueryName = "GeneralQuestionnariesUpdate";
        }
        var thisObj = this;
        // var dateOfBirthObj = moment(this.state.DOBStateChange).toString();
        // var partnerDOB =  moment(this.state.PDOBStateChange).toString();
        // var DMCWDate =  moment(this.state.DMCWDStateChange).toString();
        //let GenQusAPIUrl = "https://eud3w2oapg.execute-api.us-west-2.amazonaws.com/Dev/gpa-genqussave-lambda";
        let GenQusAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let GenQusJSONData = JSON.stringify({
            QueryName: QueryName,
            UserID: emailresult,
            InquiryAbout: this.state.RBenefitsState + ',' + this.state.PBenefitsState + ',' + this.state.SBenefitsState,
            AreYou: this.state.AreYouState,
            Gender: this.state.GenderState,
            Title: this.state.TitleState,
            FirstName: this.state.FirstNameState,
            MiddleName: this.state.MiddleNameState,
            LastName: this.state.LastNameState,
            Suffix: this.state.SuffixState,
            BirthName: this.state.BirthNameState,
            MaidenName: this.state.MaidenNameState,
            DOB_Day: this.state.DayState,
            DOB_Month: this.state.MonthState,
            DOB_Year: this.state.YearState,
            CountryOfCitizenship: this.state.CountryState,
            MailingAddress: this.state.MailingAddressState,
            GoogleAdrsCountry: this.state.GoogleAdrsCountry,
            PhoneNum: this.state.PhoneNumState,
            HomeNum: this.state.HomeNumState,
            MaritalStatus: this.state.MaritalStatusState,
            DOB_Marri_Death_Divorce_Day: this.state.MCDWDayState,
            DOB_Marri_Death_Divorce_Month: this.state.MCDWMonthState,
            DOB_Marri_Death_Divorce_Year: this.state.MCDWYearState,
            P_Gender: this.state.PGenderState,
            P_Title: this.state.PTitleState,
            P_FirstName: this.state.PFirstNameState,
            P_MiddleName: this.state.PMiddleNameState,
            P_LastName: this.state.PLastNameState,
            P_Suffix: this.state.PSuffixState,
            P_DOB_Day: this.state.PDayState,
            P_DOB_Month: this.state.PMonthState,
            P_DOB_Year: this.state.PYearState,
            P_CountryOfCitizenship: this.state.PCountryState,
            P_MailingAddress: this.state.PMailingAddressState,
            GenQusStatus: "C"
            // DOB: dateOfBirthObj,
            // PDOB: partnerDOB,
            // DMCWD: DMCWDate
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

        var isValid = this.handleValidateForm(this);
        if (isValid) {
            axios({
                method: "POST",
                url: GenQusAPIUrl,
                data: GenQusJSONData,
                // headers:AxiosHeaderConfig,

            }).then((data) => {
                //if (QueryName == "Save") 
                let valid = false;
                if (QueryName == "GeneralQuestionnariesSave") {
                    notify.show("Your Personal Information Saved Successfully", "success", 3000);
                    thisObj.handleAppProcessFlowUpdate(this);
                }
                else {
                    notify.show("Your Personal Information Updated Successfully", "success", 3000);
                    valid = true;
                }
                if (valid) {
                    history.push('/ApplicantDashboard');
                }

            }).catch((err) => {

            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }

    }

    handlePoolDataLoad(event) {
        emailresult = localStorage.getItem('applicant_email');
        passwordresult = localStorage.getItem('applicant_password');
        var authenticationData = {
            Username: emailresult,
            Password: passwordresult,
        };

        var authenticationDetails = new AuthenticationDetails(authenticationData);

        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username: emailresult,
            Pool: userPool
        };

        var cognitoUser = new CognitoUser(userData);
        var thisObj = this;
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {

                cognitoUser.getUserAttributes(function (err, result) {
                    if (err) {
                        return;
                    }
                    for (var i = 0; i < result.length; i++) {

                        if (result[i].getName() == "name") {
                            thisObj.setState({ TitleState: result[i].getValue() });
                        }

                        if (result[i].getName() == "given_name") {
                            thisObj.setState({ FirstNameState: result[i].getValue() });
                        }

                        if (result[i].getName() == "middle_name") {
                            thisObj.setState({ MiddleNameState: result[i].getValue() });
                        }

                        if (result[i].getName() == "family_name") {
                            thisObj.setState({ LastNameState: result[i].getValue() });
                        }

                        if (result[i].getName() == "nickname") {
                            thisObj.setState({ SuffixState: result[i].getValue() });
                        }

                        if (result[i].getName() == "profile") {
                            thisObj.setState({ PhoneNumState: result[i].getValue() });
                        }

                        if (result[i].getName() == "locale") {
                            thisObj.setState({ HomeNumState: result[i].getValue() });
                        }
                    }
                });
            },
            onFailure: function (err) {

            },
        });

    }

    //Page Rendering
    render() {
        const { search, psearch, value, MailingAddressState, PMailingAddressState } = this.state
        const google = window.google;

        return (
            <div >
                <Paper zDepth={1} className="CommonDiv">
                    <Col xs={12} md={12} style={newstyle}>
                        <h4 className="StepperHeading">General Questionnaire</h4>
                        {/* <Panel eventKey="1" defaultExpanded={true}>
                            <Panel.Heading>
                                <Panel.Title>Employee Information</Panel.Title>
                            </Panel.Heading>
                            <Panel.Body > */}
                        <Paper>
                            <h2 className="legendtitle">Employee Information</h2>
                            <div className="fieldstyle">
                                <Row className="show-grid">
                                    <Col xs={12} md={12} className="PanelText">
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={2} className="input-fileds labelalign">
                                                <label><span><b>Are You<span className="manatoryfield">*</span> :</b></span></label>
                                            </Col>

                                            <Col xs={12} md={6} className="Radio_button">
                                                <RadioButtonGroup onChange={this.handleChangeAreYou.bind(this)} valueSelected={this.state.AreYouState} style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <RadioButton
                                                        value="C"
                                                        disabled={this.state.AreYouState == "R"}
                                                        label="Current Employee"
                                                        style={styles.radioButton}
                                                    />
                                                    <RadioButton
                                                        value="R"
                                                        disabled={this.state.AreYouState == "R"}
                                                        label="Retired"
                                                        style={styles.radioButton}
                                                    />
                                                </RadioButtonGroup >
                                                <span className="validationmsg">{this.state.isValidAreYou ? "Please Choose Your Employee Type" : null}</span>
                                            </Col>

                                            <Col xs={12} md={4}></Col>

                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={2} className="input-fileds labelalign">
                                                <label><b>Gender<span className="manatoryfield">*</span> :</b></label>
                                            </Col>
                                            <Col xs={12} md={6} className="Radio_button">
                                                <RadioButtonGroup valueSelected={this.state.GenderState} onChange={this.handleChangeGender.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <RadioButton
                                                        value="M"
                                                        label="Male"
                                                        style={styles.radioButton}
                                                    />
                                                    <RadioButton
                                                        value="F"
                                                        label="Female"
                                                        style={styles.radioButton}
                                                    />
                                                </RadioButtonGroup >
                                                <span className="validationmsg">{this.state.isValidGender ? "Please Choose Your Gender" : null}</span>
                                            </Col>
                                            <Col xs={12} md={4}></Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                <label>Title<span className="manatoryfield">*</span></label>
                                                <SelectField
                                                    value={this.state.TitleState}
                                                    hintText="Select Your Title"
                                                    onChange={this.handleChangeTitle}
                                                    maxHeight={200}
                                                    errorText={this.state.isValidTitle ? "Please Select Your Title" : null}
                                                >
                                                    {TitleItems}
                                                </SelectField>
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>First Name<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Your First Name"
                                                    value={this.state.FirstNameState}
                                                    onChange={this.handleChangeFirstName.bind(this)}
                                                    errorText={this.state.isValidFirstName ? "Please Enter Your First Name" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>Middle Name</label>
                                                <TextField hintText="Enter Your Middle Name"
                                                    value={this.state.MiddleNameState}
                                                    onChange={this.handleChangeMiddleName.bind(this)}
                                                />
                                            </Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Last Name<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Your Last Name"
                                                    value={this.state.LastNameState}
                                                    onChange={this.handleChangeLastName.bind(this)}
                                                    errorText={this.state.isValidLastName ? "Please Enter Your Last Name" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Suffix</label>
                                                <SelectField
                                                    value={this.state.SuffixState}
                                                    hintText="Select Your Suffix"
                                                    onChange={this.handleChangeSuffix}
                                                    maxHeight={200}
                                                >
                                                    {SuffixItems}
                                                </SelectField>
                                            </Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={5} className="input-fileds align-fileds">
                                                <label>Birth Name (if different from your current name)</label>
                                                <TextField hintText="Enter Your Birth Name"
                                                    value={this.state.BirthNameState}
                                                    onChange={this.handleChangeBirthName.bind(this)}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>Maiden Name</label>
                                                <TextField hintText="Enter Your Maiden Name"
                                                    value={this.state.MaidenNameState}
                                                    onChange={this.handleChangeMaidenName.bind(this)}
                                                />
                                            </Col>
                                            {/* <Col xs={12} md={3} className="input-fileds align-fileds">
                                            <label>Date Of Birth<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter Your Date Of Birth" locale="en-US"
                                                firstDayOfWeek={0} 
                                                value={this.state.DOBStateChange} 
                                                onChange={this.handleChangeDateOfBirth}  
                                                errorText={this.state.isValidDateOfBirth ? "Please Select Your Date Of Birth" : null} />
                                            </Col> */}
                                        </Col>

                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>DOB(Month)<span className="manatoryfield">*</span></label>
                                                <SelectField
                                                    value={this.state.MonthState}
                                                    hintText="Select Your DOB(Month)"
                                                    onChange={this.handleChangeMonth}
                                                    maxHeight={200}
                                                    errorText={this.state.isValidMonth ? "Please Select Your DOB(Month)" : null}
                                                >
                                                    {MonthItems}
                                                </SelectField>
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>DOB(Day)<span className="manatoryfield">*</span></label>
                                                <SelectField
                                                    value={this.state.DayState}
                                                    hintText="Select Your DOB(Day) "
                                                    onChange={this.handleChangeDay}
                                                    maxHeight={200}
                                                    errorText={this.state.isValidDay ? "Please Select Your DOB(Day)" : null}
                                                >
                                                    {DayItems}
                                                </SelectField>
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>DOB(Year)<span className="manatoryfield">*</span></label>
                                                <SelectField
                                                    value={this.state.YearState}
                                                    hintText="Select Your DOB(Year)"
                                                    onChange={this.handleChangeYear}
                                                    maxHeight={200}
                                                    errorText={this.state.isValidYear ? "Please Select Your DOB(Year)" : null}
                                                >
                                                    {YearItems}
                                                </SelectField>
                                            </Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                <label>Country of Citizenship<span className="manatoryfield">*</span></label>
                                                <SelectField
                                                    maxHeight={300}
                                                    hintText="Select Your Country of Citizenship"
                                                    value={this.state.CountryState}
                                                    onChange={this.handleChangeCountry}
                                                >
                                                    {CountryItems}
                                                </SelectField>
                                                <span className="validationmsg">{this.state.isValidCountry ? "Please Select Your Country of Citizenship" : null}</span>
                                            </Col>
                                            <Col xs={12} md={8} className="input-fileds align-fileds">
                                                <label>Current Mailing Address<span className="manatoryfield">*</span></label>
                                                <Geosuggest
                                                    placeholder="Current Mailing Address"
                                                    initialValue={this.state.MailingAddressState}
                                                    onSuggestSelect={this.onSuggestSelect.bind(this)}
                                                    onChange={this.handleChangeMailingAddress}
                                                    value={this.state.MailingAddressState}
                                                    location={new google.maps.LatLng("", "")}
                                                    radius="20"
                                                />
                                                <span className="validationmsg">{this.state.isValidMailingAddress ? "Please Choose Your Mailing Address" : null}</span>
                                            </Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                <label>Mobile Phone Number<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Your Mobile Phone Number"
                                                    value={this.state.PhoneNumState}
                                                    onChange={this.handleChangePhoneNum.bind(this)}
                                                    errorText={this.state.isValidPhoneNum ? "Please Enter Your Mobile Phone Number" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                <label>Home Phone Number</label>
                                                <TextField hintText="Enter Your Home Phone Number"
                                                    value={this.state.HomeNumState}
                                                    onChange={this.handleChangeHomeNum.bind(this)}
                                                    errorText={this.state.isValidPhoneNum ? "Please Enter Your Home Phone Number" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                <label>Marital Status<span className="manatoryfield">*</span></label>
                                                <SelectField
                                                    value={this.state.MaritalStatusState}
                                                    hintText="Select Your Marital Status"
                                                    onChange={this.handleChangeMaritalStatus}
                                                    maxHeight={200}
                                                    errorText={this.state.isValidMaritalStatus ? "Please Select Martial Status" : null}
                                                >
                                                    {MaritalStatusItems}
                                                </SelectField>
                                            </Col>
                                        </Col>
                                    </Col>
                                </Row>
                            </div>
                        </Paper>
                        <div>
                            {(this.state.MaritalStatusState == "M" || this.state.MaritalStatusState == "C" || this.state.MaritalStatusState == "D" || this.state.MaritalStatusState == "W") ?
                                // <Panel eventKey="2" className="PartnerDetails" defaultExpanded={true}>
                                //     <Panel.Heading >
                                //         <Panel.Title toggle>About Spouse/Partner</Panel.Title>
                                //     </Panel.Heading>
                                //     <Panel.Body collapsible>
                                <Paper>
                                    <h2 className="legendtitle">About Spouse/Partner</h2>
                                    <div className="fieldstyle">
                                        <Row className="show-grid">
                                            <Col xs={12} md={12} className="PanelText">
                                                {/* <Col xs={12} md={12}>
                                                <label><span className="DOM">{this.state.PPanelTitleState}<span className="manatoryfield">*</span></span></label>
                                                </Col> */}
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={2} className="input-fileds labelalign">
                                                        <label><b>Spouse Gender<span className="manatoryfield">*</span> :</b></label>
                                                    </Col>
                                                    <Col xs={12} md={3} className="Radio_button">
                                                        <RadioButtonGroup valueSelected={this.state.PGenderState} onChange={this.handleChangePGender.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                            <RadioButton
                                                                value="M"
                                                                label="Male"
                                                                style={styles.radioButton}
                                                            />
                                                            <RadioButton
                                                                value="F"
                                                                label="Female"
                                                                style={styles.radioButton}
                                                            />
                                                        </RadioButtonGroup >
                                                        <span className="validationmsg">{this.state.isValidPGender ? "Please Choose Your Partner Gender" : null}</span>
                                                    </Col>

                                                </Col>
                                                <Col xs={12} md={12}>
                                                  <Col xs={12} md={12}>
                                                         <label><span className="DOM">{this.state.PPanelTitleState}</span></label>
                                                </Col>
                                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                                        <label>Month <span className="manatoryfield">*</span></label>
                                                        <SelectField
                                                            value={this.state.MCDWMonthState}
                                                            hintText="Select Your Month"
                                                            onChange={this.handleChangeMCDWMonth}
                                                            maxHeight={200}
                                                            errorText={this.state.isValidMCDWMonth ? "Please Select Your Month" : null}
                                                        >
                                                            {MonthItems}
                                                        </SelectField>
                                                    </Col>
                                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                                        <label>Day<span className="manatoryfield">*</span></label>
                                                        <SelectField
                                                            value={this.state.MCDWDayState}
                                                            hintText="Select Your Day"
                                                            onChange={this.handleChangeMCDWDay}
                                                            maxHeight={200}
                                                            errorText={this.state.isValidMCDWDay ? "Please Select Your Day" : null}
                                                        >
                                                            {DayItems}
                                                        </SelectField>
                                                    </Col>
                                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                                        <label>Year<span className="manatoryfield">*</span></label>
                                                        <SelectField
                                                            value={this.state.MCDWYearState}
                                                            hintText="Select Your Year"
                                                            onChange={this.handleChangeMCDWYear}
                                                            maxHeight={200}
                                                            errorText={this.state.isValidMCDWYear ? "Please Select Your Year" : null}
                                                        >
                                                            {MCDWYearItems}
                                                        </SelectField>
                                                    </Col>
                                                </Col>
                                                {/* <Col xs={12} md={12}>
                                                    <Col xs={12} md={2} className="input-fileds labelalign">
                                                        <label><b>Spouse Gender<span className="manatoryfield">*</span> :</b></label>
                                                    </Col>
                                                    <Col xs={12} md={4} className="Radio_button">
                                                        <RadioButtonGroup valueSelected={this.state.PGenderState} onChange={this.handleChangePGender.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                            <RadioButton
                                                                value="M"
                                                                label="Male"
                                                                style={styles.radioButton}
                                                            />
                                                            <RadioButton
                                                                value="F"
                                                                label="Female"
                                                                style={styles.radioButton}
                                                            />
                                                        </RadioButtonGroup >
                                                        <span className="validationmsg">{this.state.isValidPGender ? "Please Choose Your Partner Gender" : null}</span>
                                                    </Col>
                                                    <Col xs={12} md={4}></Col>
                                                </Col> */}
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                        <label>Title<span className="manatoryfield">*</span></label>
                                                        <SelectField
                                                            value={this.state.PTitleState}
                                                            hintText="Select Your Partner Title"
                                                            onChange={this.handleChangePTitle}
                                                            maxHeight={200}
                                                            errorText={this.state.isValidPTitle ? "Please Select Your Partner Title" : null}
                                                        >
                                                            {TitleItems}
                                                        </SelectField>
                                                    </Col>
                                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                                        <label>First Name<span className="manatoryfield">*</span></label>
                                                        <TextField hintText="Enter Your Partner First Name"
                                                            value={this.state.PFirstNameState}
                                                            onChange={this.handleChangePFirstName.bind(this)}
                                                            errorText={this.state.isValidPFirstName ? "Please Enter Your Partner First Name" : null}
                                                        />
                                                    </Col>
                                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                                        <label>Middle Name</label>
                                                        <TextField hintText="Enter Your Partner Middle Name"
                                                            value={this.state.PMiddleNameState}
                                                            onChange={this.handleChangePMiddleName.bind(this)}
                                                        />
                                                    </Col>
                                                </Col>
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                                        <label>Last Name<span className="manatoryfield">*</span></label>
                                                        <TextField hintText="Enter Your Partner Last Name"
                                                            value={this.state.PLastNameState}
                                                            onChange={this.handleChangePLastName.bind(this)}
                                                            errorText={this.state.isValidLastName ? "Please Enter Your Partner Last Name" : null}
                                                        />
                                                    </Col>
                                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                                        <label>Suffix</label>
                                                        <SelectField
                                                            value={this.state.PSuffixState}
                                                            hintText="Select Your Suffix"
                                                            onChange={this.handleChangePSuffix}
                                                            maxHeight={200}
                                                        >
                                                            {SuffixItems}
                                                        </SelectField>
                                                    </Col>
                                                    {/* <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Partner Date Of Birth<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Your Partner Date Of Birth" locale="en-US"
                                                        firstDayOfWeek={0} 
                                                        value={this.state.PDOBStateChange} 
                                                        onChange={this.handleChangePartnerDateOfBirth}  
                                                        errorText={this.state.isValidPDateOfBirth ? "Please Select Your Partner Date Of Birth" : null} />
                                                    </Col> */}
                                                </Col>
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                                        <label>DOB(Month)<span className="manatoryfield">*</span></label>
                                                        <SelectField
                                                            value={this.state.PMonthState}
                                                            hintText="Select Your Partner DOB(Month)"
                                                            onChange={this.handleChangePMonth}
                                                            maxHeight={200}
                                                            errorText={this.state.isValidPMonth ? "Please Select Your Partner DOB(Month)" : null}
                                                        >
                                                            {MonthItems}
                                                        </SelectField>
                                                    </Col>
                                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                                        <label>DOB(Day)<span className="manatoryfield">*</span></label>
                                                        <SelectField
                                                            value={this.state.PDayState}
                                                            hintText="Select Your Partner DOB(Day)"
                                                            onChange={this.handleChangePDay}
                                                            maxHeight={200}
                                                            errorText={this.state.isValidPDay ? "Please Select Your Partner DOB(Day)" : null}
                                                        >
                                                            {DayItems}
                                                        </SelectField>
                                                    </Col>
                                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                                        <label>DOB(Year)<span className="manatoryfield">*</span></label>
                                                        <SelectField
                                                            value={this.state.PYearState}
                                                            hintText="Select Your Partner DOB(Year)"
                                                            onChange={this.handleChangePYear}
                                                            maxHeight={200}
                                                            errorText={this.state.isValidPYear ? "Please Select Your Partner DOB(Year)" : null}
                                                        >
                                                            {YearItems}
                                                        </SelectField>
                                                    </Col>
                                                </Col>
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                        <label>Country of Citizenship<span className="manatoryfield">*</span></label>
                                                        <SelectField
                                                            maxHeight={300}
                                                            value={this.state.PCountryState}
                                                            hintText="Select Your Partner Country of Citizenship"
                                                            onChange={this.handleChangePCountry}
                                                        >
                                                            {CountryItems}
                                                        </SelectField>
                                                        <span className="validationmsg">{this.state.isValidPCountry ? "Please Select Your Partner Country of Citizenship" : null}</span>
                                                    </Col>
                                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                                        <label>Current Mailing Address<span className="manatoryfield">*</span></label>
                                                        <Geosuggest
                                                            placeholder="Current Mailing Address"
                                                            initialValue={this.state.PMailingAddressState}
                                                            onChange={this.handleChangePMailingAddress}
                                                            onSuggestSelect={this.handleSuggestPMailingAddress.bind(this)}
                                                            value={this.state.PMailingAddressState}
                                                            location={new google.maps.LatLng("", "")}
                                                            radius="20"
                                                        />
                                                        <span className="validationmsg">{this.state.isValidPMailingAddress ? "Please Choose Your Partner Mailing Address" : null}</span>
                                                    </Col>
                                                </Col>
                                            </Col>
                                        </Row>
                                        {/* </Panel.Body>
                                    </Panel> */}
                                    </div>
                                </Paper>
                                : ''}
                        </div>
                        {/* </Panel.Body> */}

                        <Col xs={12} md={12}>
                            <Col xs={12} md={12} className="input-fields">
                                <Button onClick={this.handleGenQusSave.bind(this)} className="RQ-Add" >{this.state.BtnNameState}</Button>
                                <Notifications />
                            </Col>
                        </Col>
                        {/* </Panel> */}
                    </Col>

                </Paper>
            </div>
        );
    }
    onSuggestSelect(suggest) {
        if (suggest) {
            console.log(suggest.description);
            console.log(suggest);
            this.setState({ MailingAddressState: suggest.description });
            var len = suggest.gmaps.address_components.length;
            for (let i = 0; i < len; i++) {
                console.log(suggest.gmaps.address_components[i].types[0]);
                if (suggest.gmaps.address_components[i].types[0] == 'country') {
                    this.setState({ GoogleAdrsCountry: suggest.gmaps.address_components[i].short_name });
                    break;
                }
            }
            //alert(this.state.GoogleAdrsCountry);
            //this.setState({ MailingAddressState: suggest.description });
        }
    };

    handleChangeMailingAddress = (value) => {
        this.setState({ MailingAddressState: value });
    };

    handleChangePMailingAddress = (value) => {
        this.setState({ PMailingAddressState: value });
    };

    handleSuggestPMailingAddress(suggest) {
        if (suggest) {
            this.setState({ PMailingAddressState: suggest.description });
        }
    };
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





export default connect(mapReducerStateToProps, mapDispatchToProps)(GeneralQuestionnarie);