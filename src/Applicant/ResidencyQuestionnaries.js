import React, { Component } from 'react';

//Bootstrap Component
import { Col, Row, Button, Modal } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import '../Style/style.css';

//API Calling Methods
import axios from 'axios';

//Routing
import history from '../Routing/history';

//Notification 
import Notifications, { notify } from 'react-notify-toast';

//Google Address Component
import Geosuggest from 'react-geosuggest';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Month Picker
import * as Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

//Moment
var moment = require('moment');

const style = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
        marginTop: 8
    },
};

const CompanyItems = [];

const CountryItems = [];

var emailresult;

const KnowledgeStatusItems = [
    <MenuItem value={"Company no longer in existence and not acquired by another entity"} key={1} primaryText={`Company no longer in existence and not acquired by another entity`} />,
    <MenuItem value={"Company closed their plans"} key={2} primaryText={`Company closed their plans`} />,
    <MenuItem value={"Company acquired from another entity, or merged"} key={3} primaryText={`Company acquired from another entity, or merged`} />,
];

const menuProps = {
    desktop: true,
    disableAutoFocus: true,
};

var  Retrimentdays;

let StatusURL1;
let StatusInput1;

class ResidencyQuestionnaries extends Component {
    constructor(props) {
        super(props);

        // // Modal Popup Script

        // this.handleHide = this.handleHide.bind(this);
        // this.state = {
        // show: false
        // };

        // // End Modal Popup Script
        var Params = new URLSearchParams(document.location.search);
        let EmpCompanyID = Params.get("EmpCompanyID");
        let ResQusCountryID = Params.get("ResQusCountryID");
        console.log("link" + window.location.href);

        console.log(ResQusCountryID);
        if (Params == "" || Params == null) {
            this.handleGetGenQusSummary(this);
        }
        else {
            if ((ResQusCountryID != "" || ResQusCountryID != null) && (EmpCompanyID == "" || EmpCompanyID == null)) {
                //alert("Country")
                this.handleCountryEdit(ResQusCountryID);
            }
            else if ((EmpCompanyID != "" || EmpCompanyID != null) && (ResQusCountryID == "" || ResQusCountryID == null)) {
                //alert("Company")
                this.handleResidencyEdit(EmpCompanyID);
            }

        }

        this.state = {
            search: "",
            value: "",
            //Country State Initialization
            CountryFlag: "CountrySave",
            ResCountryState: "",
            CountryNameState: "",
            ResBeginDateState: "",
            ResEndDateState: "",
            PersonalIDNumState: "",
            CountryStayReason: '',
            ReasonState: "",
            ResAddressState: "",
            ResQuscode: "",
            GetBenefitSpouseState: 'No',
            PPersonalIDNumState: "",
            MaritialStatusState: "",
            isValidResCountry: false,
            isValidResBeginDate: false,
            isValidResEndDate: false,
            isValidPersonalIDNum: false,
            isValidResAddress: false,
            isValidGetBenefitSpouse: false,
            isValidPPersonalIDNum: false,
            isValidFormatPersonalIDNum: false,
            isValidFormatResAddress: false,
            isValidCountryStayReason: false,
            isValidFormatPPersonalIDNum: false,
            isValidReason: false,
            //Company State Initialization
            search1: "",
            CompanyFlag: "CompanySave",
            EmpCompanyID: "",
            BtnName: "Save",
            CompanyBtnName: "Save Company",
            CompanyNameState: "",
            WorkFromDateState: "",
            WorkToDateState: "",
            CmpAddressState: "",
            EntitleGPAContactState: 'No',
            EmployeeClosedPlanState: 'No',
            BestOfKnowledgeState: "",
            ClosedPlanState: "",
            ResQusCountryID: "1",
            ResQusIDState: "",
            tableData: [],
            //Company Validation State Initialization
            isValidCompanyName: false,
            isValidEntitleGPAContact: false,
            isValidFromDate: false,
            isValidToDate: false,
            isValidEmployeeClosedPlan: false,
            isValidBestOfKnowledge: false,
            isValidClosedPlan: false,
            isValidVolContributionOption: false,
            isValidBuyUpOption: false,
            isValidFormatCountryCode: false,
            isValidFormatCountryName: false,
            GenQusSelectedCountry: "",
            GenQusSelectedAddress: "",
            DateOfBirth: "",
            ResQusCountryState: "",
            eligiliblitystate: "",
            isEmptyCompanyName: false,

            EmployeeCompany_ID: "",
            ResidencyQuestionCountry_ID: "",
            //DocumentIdState: 'EMP007UK41',
            DocumentIDstatePOA: "",
            show: false,
            show1: false,
            Countries: [],
            searchText: '',
            PreferredLangState: '',
            viewList: false,
            PrivatepopUp: false,
            // shouldOpenList: false,
            // ResBeginYearState:2012,
            // ResBeginMonthState:1
        }
    }

    // Modal Popup Script
    handleHide() {
        this.setState({ show: false });
    }

    handleHidePrivate() {
        this.setState({ PrivatepopUp: false });
    }
    //Handling Methods
    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        this.handleLoadCountry(this);
        this.handleLoadCompany(this);
        this.getDateofbirth();
    }

    //Country Handle Methods
    handleChangeCountryName(e, index, value) {
        this.setState({ ResCountryState: value }, function () {
            if (this.state.ResCountryState == this.state.GenQusSelectedCountry) {
                this.setState({ ResAddressState: this.state.GenQusSelectedAddress });
            }
            this.checkPersonalIdVal();
        });
        //this.handleLoadCompany(value);
        this.setState({ CountryNameState: e.target.innerText });
    };

    handleChangeResBeginDate(date) {
        this.setState({ ResBeginDateState: Datetime.moment(date).format("MM-YYYY") });
        this.getResEligiblity();
    };

    handleChangevalidatedatestart(current) {
        var yesterday = Datetime.moment().subtract(0, 'month');
        return current.isBefore(yesterday);
    };

    handleChangeResEndDate(date) {
        this.setState({ ResEndDateState: Datetime.moment(date).format("MM-YYYY") });
    };

    handleChangevalidatedateend(current) {
        var currentmonth = Datetime.moment().subtract(0, 'month');
        var Startmonth = Datetime.moment(this.state.ResBeginDateState, 'MM-YYYY');
        var valid = false;
        if (current.isAfter(Startmonth) && current.isBefore(currentmonth)) {
            valid = true;
        }
        return valid;
    };

    handleChangePersonalIDNum(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        let selectedcountry = this.state.ResCountryState;
        let norwayprefix = this.state.prefix;
        if (selectedcountry == 'NO') {
            if (onlyNums.length < 6) {
                this.setState({ PersonalIDNumState: onlyNums });
            }
        }
        else {
            if (onlyNums.length < 12) {
                this.setState({ PersonalIDNumState: onlyNums });
            }
        }
    };

    handleSelectSuggest(suggest) {
        if (suggest) {
            this.setState({ ResAddressState: suggest.description })
        }
    }

    handleResAddress = (value) => {
        this.setState({ ResAddressState: value })
    }

    handleChangeGetBenefitSpouse(e) {
        this.setState({ GetBenefitSpouseState: e.target.value });
    };

    handleChangePPersonalIDNum(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 12) {
            this.setState({ PPersonalIDNumState: onlyNums });
        }
    };

    handleCountryStayReason(event) {
        this.handleAgecalculate(this);
        this.setState({ CountryStayReason: event.target.value });
    };

    handleUpdateInput = (searchText) => {
        let len = searchText.length;
        if (len > 0) {
            this.setState({
                viewList: true
            })
        }
        else {
            this.setState({
                viewList: false
            })
        }
        this.setState({
            searchText: searchText,
        });
    };

    handleChangeReason = (event) => {
        this.setState({ ReasonState: event.target.value });
    };

    //Company Handle Methods
    handleChangeCompanyName(e, index, value) {
        this.setState({ CompanyNameState: value });
    };

    handleSelectCompanySuggest(suggest) {
        if (suggest) {
            this.setState({ CmpAddressState: suggest.description });
        }
    }

    handleCmpAddress = (value) => {
        this.setState({ CmpAddressState: value });
    }

    handleChangeEntitleGPAContact(e) {
        this.setState({ EntitleGPAContactState: e.target.value });
    };

    handleChangeEmployeeClosedPlan(e) {
        this.setState({ EmployeeClosedPlanState: e.target.value });
    };

    handleChangeBestOfKnowledge(e, index, value) {
        this.setState({ BestOfKnowledgeState: value });
    };

    handleChangeClosedPlan(e) {
        this.setState({ ClosedPlanState: e.target.value });
    };

    // handlePreferredLanguage(e, index, value) {
    //     this.setState({ PreferredLangState: value })
    // };

    //Country Entry Field Validation 
    handleCountryValidateForm(e) {
        let validForm = false;
        let CompanyvalidForm = false;
        var validResCountryForm = false;
        var validResBeginDateForm = false;
        var validResEndDateForm = false;
        var validResAddressForm = false;
        var validGetBenefitSpouseForm = false;
        var validPPersonalIDNumForm = false;
        var validCountryStayReason = false;
        var validReasonForm = false;


        if (this.state.ResCountryState != "") {
            this.setState({ isValidResCountry: false });
            validResCountryForm = true;
        }
        else {
            this.setState({ isValidResCountry: true });
            validResCountryForm = false;
        }

        if (this.state.ResBeginDateState != "") {
            this.setState({ isValidResBeginDate: false });
            validResBeginDateForm = true;
        }
        else {
            this.setState({ isValidResBeginDate: true });
            validResBeginDateForm = false;
        }

        if (this.state.ResEndDateState != "") {
            this.setState({ isValidResEndDate: false });
            validResEndDateForm = true;
        }
        else {
            this.setState({ isValidResEndDate: true });
            validResEndDateForm = false;
        }

        if (this.state.ResAddressState != "") {
            this.setState({ isValidResAddress: false });
            validResAddressForm = true;
        }
        else {
            this.setState({ isValidResAddress: true });
            validResAddressForm = false;
        }

        if (this.state.CountryStayReason != "") {
            this.setState({ isValidCountryStayReason: false });
            validCountryStayReason = true;
        }
        else {
            this.setState({ isValidCountryStayReason: true });
            validCountryStayReason = false;
        }

        if (this.state.CountryStayReason == "Other") {
            if (this.state.ReasonState != "") {
                this.setState({ isValidReason: false });
                validReasonForm = true;
            }
            else {
                this.setState({ isValidReason: true });
                validReasonForm = false;
            }
        }
        else {
            this.setState({ isValidReason: false });
            validReasonForm = true;
        }

        if (this.state.MaritialStatusState != "S") {
            if (this.state.GetBenefitSpouseState != "") {
                this.setState({ isValidGetBenefitSpouse: false });
                validGetBenefitSpouseForm = true;
            }
            else {
                this.setState({ isValidGetBenefitSpouse: true });
                validGetBenefitSpouseForm = false;
            }
            if (this.state.GetBenefitSpouseState == 'Yes') {
                if (this.state.PPersonalIDNumState != "") {
                    this.setState({ isValidPPersonalIDNum: false });
                    validPPersonalIDNumForm = true;
                }
                else {
                    this.setState({ isValidPPersonalIDNum: true });
                    validPPersonalIDNumForm = false;
                }
            }
            else {
                this.setState({ isValidPPersonalIDNum: false });
                validPPersonalIDNumForm = true;
            }
        }
        else {
            this.setState({ isValidGetBenefitSpouse: false });
            this.setState({ isValidPPersonalIDNum: false });
            validGetBenefitSpouseForm = true;
            validPPersonalIDNumForm = true;
        }

        if (this.state.CountryStayReason == "Work") {
            this.handleCompanyValidateForm(this);
        }

        if (this.state.MaritialStatusState != 'S') {
            if (validResCountryForm && validResBeginDateForm && validResEndDateForm && validCountryStayReason && validReasonForm && validResAddressForm && validGetBenefitSpouseForm && validPPersonalIDNumForm) {
                validForm = true;
            }
            else {
                validForm = false;
            }
        }
        else {
            if (validResCountryForm && validResBeginDateForm && validResEndDateForm && validResAddressForm && validCountryStayReason && validReasonForm) {
                validForm = true;
            }
            else {
                validForm = false;
            }
        }
        return validForm;
    }

    //Company Entry Field Validation 
    handleCompanyValidateForm(e) {
        let CompanyvalidForm = false;
        var validCompanyNameForm = false;
        var validCompanyAddressForm = false;
        var validEntitleGPAContactForm = false;
        var validEmployeeClosedPlanForm = false;
        var validBestOfKnowledgeForm = false;
        var validClosedPlanForm = false;
        var validCountryStayReason = false;

        if (this.state.CountryStayReason = "Work") {
            this.setState({ isValidCountryStayReason: false });
            validCountryStayReason = true;
        }
        else {
            this.setState({ isValidCountryStayReason: true });
            validCountryStayReason = false;
        }

        if (this.state.searchText != "") {
            this.setState({ isValidCompanyName: false });
            validCompanyNameForm = true;
        }
        else {
            this.setState({ isValidCompanyName: true });
            validCompanyNameForm = false;
        }

        if (this.state.CmpAddressState != "") {
            this.setState({ isValidCmpAddress: false });
            validCompanyAddressForm = true;
        }
        else {
            this.setState({ isValidCmpAddress: true });
            validCompanyAddressForm = false;
        }

        if (this.state.EntitleGPAContactState != "") {
            this.setState({ isValidEntitleGPAContact: false });
            validEntitleGPAContactForm = true;
        }
        else {
            this.setState({ isValidEntitleGPAContact: true });
            validEntitleGPAContactForm = false;
        }

        if (this.state.EmployeeClosedPlanState != "") {
            this.setState({ isValidEmployeeClosedPlan: false });
            validEmployeeClosedPlanForm = true;
        }
        else {
            this.setState({ isValidEmployeeClosedPlan: true });
            validEmployeeClosedPlanForm = false;
        }

        if (this.state.EmployeeClosedPlanState == "Yes") {
            if (this.state.BestOfKnowledgeState != "") {
                this.setState({ isValidBestOfKnowledge: false });
                validBestOfKnowledgeForm = true;
            }
            else {
                this.setState({ isValidBestOfKnowledge: true });
                validBestOfKnowledgeForm = false;
            }

            if (this.state.ClosedPlanState != "") {
                this.setState({ isValidClosedPlan: false });
                validClosedPlanForm = true;
            }
            else {
                this.setState({ isValidClosedPlan: true });
                validClosedPlanForm = false;
            }
        }
        else {
            this.setState({ isValidBestOfKnowledge: false });
            this.setState({ isValidClosedPlan: false });
            validBestOfKnowledgeForm = true;
            validClosedPlanForm = true;
        }

        if (this.state.EmployeeClosedPlanState == 'Y') {
            if (validCompanyNameForm && validCompanyAddressForm && validEntitleGPAContactForm && validEmployeeClosedPlanForm && validBestOfKnowledgeForm && validClosedPlanForm) {
                CompanyvalidForm = true;
            }
            else {
                CompanyvalidForm = false;
            }
        }
        else {
            if (validCompanyNameForm && validCompanyAddressForm && validEntitleGPAContactForm && validEmployeeClosedPlanForm) {
                CompanyvalidForm = true;
            }
            else {
                CompanyvalidForm = false;
            }
        }
        return CompanyvalidForm;
    }

    //Load Country Details
    handleLoadCountry(event) {
        let LoadCountryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            { QueryName: "Countries" }
        );
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: LoadCountryAPIUrl,
            headers: AxiosHeaderConfig

        }).then(({ data }) => {
            CountryItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                CountryItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
            }
        }).catch((err) => {
        })
    }

    //Load Company
    handleLoadCompany(event) {
        var thisObj = this;
        let LoadCountryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            {
                QueryName: "ClientCompaniesCB1",
            }
        );
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: LoadCountryAPIUrl,
            headers: AxiosHeaderConfig,
        }).then(({ data }) => {
            console.log("Data length", data.length)
            let len = data.length;
            console.log("Data", data);
            if (len == 0) {
                thisObj.setState({ isEmptyCompanyName: true });
            } else {
                thisObj.setState({ isEmptyCompanyName: false });
            }
            let data1 = [];
            data.forEach(function (res) {
                data1.push(res.CompanyName);
            })
            this.setState({
                Countries: data1
            })
            console.log("State Countries:", data1)

        }).catch((err) => {
            console.log(err)
        })
    }

    //Summary details
    handleGetGenQusSummary(e) {
        var thisObj = this;
        let UserID;
        let DasboardSummaryAPIUrl = "https://z95u0w2el1.execute-api.us-west-2.amazonaws.com/Dev/GPA_DashboardSummary_Lambda";
        var data = {
            UserID: emailresult,
            QueryName: "Auto"
        }
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: DasboardSummaryAPIUrl,
            data: JSON.stringify(data),
            headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ GenQusSelectedCountry: data[i].CountryOfCitizenship });
                thisObj.setState({ GenQusSelectedAddress: data[i].MailingAddress });
                thisObj.setState({ MaritialStatusState: data[i].MaritalStatus })
            }
        }).catch((err) => {

        });
    }

    //Flow Update Function
    handleAppProcessFlowUpdate(event) {
        // alert("demo");
        emailresult = localStorage.getItem('applicant_email');
        //let AppProFlowAPIUrl = "https://qxredca9lk.execute-api.us-west-2.amazonaws.com/Dev/GPA_AppProcessFlowDatas_Lambda";
        let AppProFlowAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify({
            //QueryName: "UpdateRQ",
            QueryName: "ApplicantProcessFlowTrackingUpdateRQ",
            UserID: emailresult,
            ResQus: "C"
        });
        console.log("appdata" + JSONData);
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: AppProFlowAPIUrl,
            headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            //history.push('/ApplicantDashboard');
        }).catch((err) => {

        })
    }

    handleNavDashboard() {
        history.push('/AdminDashboard');
    }

    checkPersonalIdVal() {
        let countryselect = this.state.ResCountryState;
        console.log('countryselected:' + countryselect);
        console.log('check date of birth:' + this.state.DateOfBirth);
        let dob = this.state.DateOfBirth;
        let user_age = moment(new Date(dob)).format('MM/DD/YYYY');
        // let dayofbirth = new Date(user_age).getDate();
        // let month = new Date(user_age).getMonth();
        let year = new Date(user_age).getYear('YY');

        console.log('year:' + year);
        console.log('tempdate:' + user_age);
        let testday = user_age.split('/');
        let usermonth = testday[0];
        let userday = testday[1];
        console.log('day:' + userday);
        console.log('month:' + usermonth);
        let personalprefix = userday + "" + usermonth + "" + year;
        this.setState({ prefix: personalprefix });
        console.log('prefix:' + personalprefix);

    }

    getDateofbirth() {
        var thisObj = this;
        var emailresult = localStorage.getItem('applicant_email');
        let DasboardSummaryAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        var data = {
            UserID: emailresult,
            // QueryName: "Auto"
            QueryName: "GenQuestAuto"
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
            // console.log(":::", data);
            for (var i = 0; i < data.length; i++) {
                console.log("DOBState:" + data[i].DOB_Day + " " + data[i].DOB_Month + " " + data[i].DOB_Year);
                switch (data[i].DOB_Month) {
                    case "January":
                        thisObj.setState({ DBOMonth: 1 });
                        break;
                    case "February":
                        thisObj.setState({ DBOMonth: 2 });
                        break;
                    case "March":
                        thisObj.setState({ DBOMonth: 3 });
                        break;
                    case "April":
                        thisObj.setState({ DBOMonth: 4 });
                        break;
                    case "May":
                        thisObj.setState({ DBOMonth: 5 });
                        break;
                    case "June":
                        thisObj.setState({ DBOMonth: 6 });
                        break;
                    case "July":
                        thisObj.setState({ DBOMonth: 7 });
                        break;
                    case "August":
                        thisObj.setState({ DBOMonth: 8 });
                        break;
                    case "September":
                        thisObj.setState({ DBOMonth: 9 });
                        break;
                    case "October":
                        thisObj.setState({ DBOMonth: 10 });
                        break;
                    case "November":
                        thisObj.setState({ DBOMonth: 11 });
                        break;
                    case "December":
                        thisObj.setState({ DBOMonth: 12 });
                        break;
                }
                thisObj.setState({ DateOfBirth: thisObj.state.DBOMonth + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year },
                    function () {
                        var kk = new Date(thisObj.state.DBOMonth + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year);
                        console.log("kk::", kk + "||" + data[i].DOB_Day + "-" + thisObj.state.DBOMonth + "-" + data[i].DOB_Year);
                        var bthDate, curDate, days;
                        var ageYears, ageMonths, ageDays;
                        bthDate = new Date(data[i].DOB_Year, thisObj.state.DBOMonth - 1, data[i].DOB_Day);
                        curDate = new Date();
                        if (bthDate > curDate) return;
                        days = Math.floor((curDate - bthDate) / (1000 * 60 * 60 * 24));
                        ageYears = Math.floor(days / 365);
                        ageMonths = Math.floor((days % 365) / 31);
                        thisObj.setState({ ApplicantAgeMonth: ageMonths });
                        thisObj.setState({ ApplicantAge: ageYears }, function () {
                            console.log("Age:", ageYears);
                            console.log("Months:", ageMonths);
                        });
                    }
                );

            }
        }).catch((err) => {
            console.log("DATA ", err);
        });
    }

    getResEligiblity() {
        // alert("save data" + this.state.EmployeeCompany_ID);
        var emailresult = localStorage.getItem('applicant_email');
        var QName = 'GetResData';
        var CountStayDate = 'Work';
        // if (isValid) {
        var thisObj = this;
        let SaveResAPIurl = "https://9yfzqnwuf8.execute-api.us-west-2.amazonaws.com/Dev/GPA_InitialLoad_Lambda";
        let SaveResJSONData = JSON.stringify({
            User_ID: emailresult,
            QueryName: QName,
            CountryStayType: CountStayDate,

        });
        console.log("params" + SaveResJSONData);
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: SaveResAPIurl,
            data: SaveResJSONData,
            headers: AxiosHeaderConfig,

        }).then((data) => {
            console.log('resques details');
            console.log(data);
            var countryeligiblity = {
                "countrylist": [],
            }
            console.log(data.data.length);
            var len = data.data.length;
            for (var i = 0; i < len; i++) {
                console.log('inside');
                var countrycode = data.data[i].ResCountry;
                var cntlslen = countryeligiblity.countrylist.length;
                console.log('country list length:' + cntlslen);
                var date1 = moment(data.data[i].ResCountryBDate, 'MM/YY'),
                    date2 = moment(data.data[i].ResCountryEDate, 'MM/YY');
                var duration = moment.duration(date2.diff(date1));
                var dayscount = duration.asDays();
                countryeligiblity.countrylist.push({ "countrycode": countrycode, "days": dayscount });

            }
            console.log('countrys');
            // console.log(country);
            console.log(countryeligiblity);
            // return countryeligiblity;
            this.setState({ eligiblecountries: countryeligiblity });
        }).catch((err) => {

        })
        // }

    }

    handleAgecalculate(event){
        var moment = require('moment');
        var beingdate = moment(this.state.ResBeginDateState, 'MM-YYYY'),
            enddate = moment(this.state.ResEndDateState, 'MM-YYYY');
        var duration = moment.duration(enddate.diff(beingdate));
        //alert(duration);
        Retrimentdays = duration.asDays();
    }




    handleEligiliblity(event) {
        //alert("check")
        var moment = require('moment');
        var date1 = moment(this.state.ResBeginDateState, 'MM-YYYY'),
            date2 = moment(this.state.ResEndDateState, 'MM-YYYY');
        var duration = moment.duration(date2.diff(date1));
        //alert(duration);
        var dayscount = duration.asDays();
        // alert(dayscount);

        console.log('eligiblity check');
        console.log(this.state.eligiblecountries);
        var checkeligible = [];
        checkeligible = this.state.eligiblecountries;
        var applicant_country = this.state.ResCountryState;
        var len = checkeligible.countrylist.length;
        console.log('applicant country:' + applicant_country);
        console.log('length of checkeligible:' + len);
        if (dayscount >= 364 && this.state.EntitleGPAContactState == "No") {
            // alert("2")
            this.setState({ show: true });

        }

        else if (dayscount < 364 && this.state.EntitleGPAContactState == "No") {
            // alert("nocheck");
            var daysexist = 0;
            var numofdays = dayscount;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    console.log('inside check eligible');
                    console.log('checkeligible country code:' + checkeligible.countrylist[i].countrycode);
                    if (applicant_country == checkeligible.countrylist[i].countrycode) {
                        daysexist = checkeligible.countrylist[i].days;
                        numofdays = numofdays + daysexist;
                        console.log('dayscount if already exist:' + dayscount);
                    }
                }
                console.log('dayscount:' + numofdays);
                if (numofdays >= 364) {
                    this.setState({ show: true });
                } else {
                    this.setState({ show1: true });
                }
            } else {
                this.setState({ show1: true });
            }

            // this.setState({ show1: true });
        }
        else if (dayscount > 364 && this.state.EntitleGPAContactState == "Yes") {
            //alert("new")
            this.setState({ PrivatepopUp: true })
        }


    }

    handlelessthanOneyearMail(event) {
        this.setState({ show1: false });
        let ApplicantNotEligibleResidency = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let ApplicantNotEligbileData = {
            "MailDocName": "ApplicantNotEligible",
            "EmailTo": emailresult,
            "CountryName": this.state.CountryNameState,
        }

        SaveDataAPICallMailSend(ApplicantNotEligibleResidency, ApplicantNotEligbileData)
            .then((data) => {
                console.log("Mail sent succesfully", data);
                notify.show("Residency less than one year mail sent", "success", 3000);
                this.handleRedirect(this);
            }).catch((err) => {
                console.log(err);
            });
    }



    handleCompanyPOAMail(event) {
        this.setState({PrivatepopUp:false});
        emailresult = localStorage.getItem('applicant_email');
        this.setState({ show: false });
        let SavePOAdata = "";
        var CountryPOA = this.state.CountryNameState;
        var BeginDate = this.state.ResBeginDateState;
        var EndDate = this.state.ResEndDateState;
        var MailContent = "We look forward to assisting you with inquiring about potential benefits with " + CountryPOA + " " + "from" + " " + BeginDate + " " + " - " + " " + EndDate + "\t\t\n" + "\n" + "Please find the following document(s) attached, allowing us to communicate on your behalf.  We do not charge fees for this, and we do not handle any monetary benefits you may receive.  Once we receive the document(s) listed, we will be able to send a request for potential benefits eligibility."
            + "\t\t\n\n" + "LIMITED POWER OF ATTORNEY / AUTHORIZATION TO REPRESENT – "
            + "\t\n" + "2 signed and notarized originals" + "\t\n" + "Please note: Each document is specific to a Country or Former Employer and therefore must be printed and notarized separately." + "\t\t\n\n" + "Decisions of eligibility and other related benefits may be based on employment history and country residency history, as well as agreements between countries, vesting rights, and other qualifiers as determined by countries and companies."
            + "\t\t\n" + "Once the above documents are received we will be able to continue assisting you." + "\t\t\n" + "As we need these documents as originals, please mail them to us at the following address:" + "\t\n" + "Global Pension Associates" + "\n" + "Ref #" + "\n" + "P.O. Box 19246" + "\n" + "Sugar Land, Texas  77496" + "\n" + "USA" + "\n\n\t\t" + "Please check your attachments for the necessary document(s)"
        // alert("POA");
        let GeneralDataURL = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let GeneralInputData = {
            UserID: emailresult,
            CountryCode: this.state.ResCountryState,
            //DocumentCode:'ATR',           
            QueryName: "CountryBasedDocumentsStoreDocuments",
        }
        //alert(JSON.stringify(GeneralInputData));

        let POAletterurl = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
        let POAInputData = {
            "MainFolderName": "applicant",
            "SubFolderName": emailresult,
            "MailDocName": "POA",
            "MailContent": MailContent,
            "LangCode": this.props.LoginData.Language,
            "CountryName": this.state.CountryNameState,
            "EmailTo": emailresult,//"spurthi.n@mitosistech.com"//"easwaran.k@mitosistech.com"
        }      

            console.log("PrivateMail"+JSON.stringify(StatusInput1));
        //let GeneralDataURL = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda";


        let SavePOALetterURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";
        console.log("Read::", GeneralInputData)
        SaveDataAPICallMailSend(GeneralDataURL, GeneralInputData)
            .then((data) => {
                var POAdata = "";
                console.log("GenPOAdata::", data);
                data.map((item, key) => {
                    console.log("new::", POAdata)
                    SavePOAdata = {
                        "html": "This is test Data",
                        "language": "en",
                        "DocCategory": "poa",
                        "params": {
                            "empId": emailresult,//"spurthi.n@mitosistech.com",
                            "firstName": [item.FirstName],
                            "middleName": [item.MiddleName],
                            "lastName": [item.LastName],
                            "Documentid": [item.EmpID],
                        }
                    };


                    this.setState({ DocumentIDstatePOA: item.EmpID }, () => { console.log("POAID" + this.state.DocumentIDstatePOA) })


                });

                StatusURL1 = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda"
                StatusInput1 = {
                    "QueryName": "POAMailSendInsert",
                    UserID: emailresult,//"spurthi.n@mitosistech.com",//emailresult,
                    DocumentID: 39,
                    DocumentCode: this.state.DocumentIDstatePOA,
                    CountryCode: this.state.ResCountryState,
                    CompanyCode:this.state.searchText,
                    //CountryCode: this.state.CountryState,
                    IsSend: "Y",
                    SendDate: new Date(), // moment(new Date()).format('DD/MM/YYYY'),
                }

                console.log("SavePOA:" + JSON.stringify(SavePOAdata));
                //alert(this.state.DocumentIDstatePOA);


                //let StatusURL1 = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda";

                //alert(JSON.stringify(StatusInput1));      
                //if (this.state.eligiblestate == "Yes") {
                //Save POA letter auto populated
                SaveDataAPICallMailSend(SavePOALetterURL, SavePOAdata)
                    .then((data) => {
                        console.log("SavePOA1" + JSON.stringify(SavePOAdata));
                        console.log("POA letter saved in s3 buckets", data);
                        SaveDataAPICallMailSend(POAletterurl, POAInputData)
                            .then((data) => {
                                console.log("POA letter sent successfully", data);
                                notify.show("Power of attorney email sent successfully", "success", 3000);
                                SaveDataAPICallMailSend(StatusURL1, StatusInput1)
                                    .then((data) => {
                                        console.log("POA letter sent status tracking saved in DB", data);
                                        this.handleRedirect(this);
                                        // SaveDataAPICallMailSend(NotificationAPIurl,NotificationSaveJSONData)
                                        // .then((data) => {
                                        //     console.log("POA letter stored in Notification page",data);
                                        // }).catch((err) => {
                                        //     console.log(err);
                                        // });                                        
                                    }).catch((err) => {
                                        console.log(err);
                                    });

                            }).catch((err) => {
                            })
                        console.log("sending email  ");
                        // this.handleAppProcessFlowUpdate(this);
                    }).catch((err) => {
                        console.log("error sending email");

                    });
                // }

            }).catch((err) => {

                console.log(err);
            });
    }



    handlePOAMailConditions(event) {        
        emailresult = localStorage.getItem('applicant_email');
        this.setState({ show: false });
        let SavePOAdata = "";
        var CountryPOA = this.state.CountryNameState;
        var BeginDate = this.state.ResBeginDateState;
        var EndDate = this.state.ResEndDateState;
        var MailContent = "We look forward to assisting you with inquiring about potential benefits with " + CountryPOA + " " + "from" + " " + BeginDate + " " + " - " + " " + EndDate + "\t\t\n" + "\n" + "Please find the following document(s) attached, allowing us to communicate on your behalf.  We do not charge fees for this, and we do not handle any monetary benefits you may receive.  Once we receive the document(s) listed, we will be able to send a request for potential benefits eligibility."
            + "\t\t\n\n" + "LIMITED POWER OF ATTORNEY / AUTHORIZATION TO REPRESENT – "
            + "\t\n" + "2 signed and notarized originals" + "\t\n" + "Please note: Each document is specific to a Country or Former Employer and therefore must be printed and notarized separately." + "\t\t\n\n" + "Decisions of eligibility and other related benefits may be based on employment history and country residency history, as well as agreements between countries, vesting rights, and other qualifiers as determined by countries and companies."
            + "\t\t\n" + "Once the above documents are received we will be able to continue assisting you." + "\t\t\n" + "As we need these documents as originals, please mail them to us at the following address:" + "\t\n" + "Global Pension Associates" + "\n" + "Ref #" + "\n" + "P.O. Box 19246" + "\n" + "Sugar Land, Texas  77496" + "\n" + "USA" + "\n\n\t\t" + "Please check your attachments for the necessary document(s)"
        // alert("POA");
        let GeneralDataURL = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let GeneralInputData = {
            UserID: emailresult,
            CountryCode: this.state.ResCountryState,
            //DocumentCode:'ATR',           
            QueryName: "CountryBasedDocumentsStoreDocuments",
        }        

        let POAletterurl = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
        let POAInputData = {
            "MainFolderName": "applicant",
            "SubFolderName": emailresult,
            "MailDocName": "POA",
            "MailContent": MailContent,
            "LangCode": this.props.LoginData.Language,
            "CountryName": this.state.CountryNameState,
            "EmailTo": emailresult,//"spurthi.n@mitosistech.com"//"easwaran.k@mitosistech.com"
        }     

        //let GeneralDataURL = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda";

        let SavePOALetterURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";
        //console.log("Read::", GeneralInputData)        
        SaveDataAPICallMailSend(GeneralDataURL, GeneralInputData)
            .then((data) => {                      
                var POAdata = "";
                console.log("GenPOAdata::", data);
                data.map((item, key) => {
                    console.log("new::", POAdata)
                    SavePOAdata = {
                        "html": "This is test Data",
                        "language": "en",
                        "DocCategory": "poa",
                        "params": {
                            "empId": emailresult,//"spurthi.n@mitosistech.com",
                            "firstName": [item.FirstName],
                            "middleName": [item.MiddleName],
                            "lastName": [item.LastName],
                            "Documentid": [item.EmpID],
                        }
                    };
                    
                    this.setState({ DocumentIDstatePOA: item.EmpID }, () => { console.log(this.state.DocumentIDstatePOA) })


                });

            StatusURL1 = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda"
            StatusInput1 = {
            "QueryName": "CountryBasedDocumentsTrackDoc",
            UserID: emailresult,//"spurthi.n@mitosistech.com",//emailresult,
            DocumentID: 39,
            DocumentCode: this.state.DocumentIDstatePOA,
            CountryCode: this.state.ResCountryState,
            CompanyCode: "",
            IsSend: "Y",
            SendDate: new Date(), // moment(new Date()).format('DD/MM/YYYY'),
        }               

                console.log("SavePOA:" + JSON.stringify(SavePOAdata));
                //alert(this.state.DocumentIDstatePOA);


                //let StatusURL1 = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda";

                //alert(JSON.stringify(StatusInput1));      
                //if (this.state.eligiblestate == "Yes") {
                //Save POA letter auto populated
                SaveDataAPICallMailSend(SavePOALetterURL, SavePOAdata)
                    .then((data) => {
                        console.log("SavePOA1" + JSON.stringify(SavePOAdata));
                        console.log("POA letter saved in s3 buckets", data);
                        SaveDataAPICallMailSend(POAletterurl, POAInputData)
                            .then((data) => {
                                console.log("POA letter sent successfully", data);
                                notify.show("Power of attorney email sent successfully", "success", 3000);
                                SaveDataAPICallMailSend(StatusURL1, StatusInput1)
                                    .then((data) => {
                                        console.log("POA letter sent status tracking saved in DB", data);
                                        this.handleRedirect(this);
                                        // SaveDataAPICallMailSend(NotificationAPIurl,NotificationSaveJSONData)
                                        // .then((data) => {
                                        //     console.log("POA letter stored in Notification page",data);
                                        // }).catch((err) => {
                                        //     console.log(err);
                                        // });                                        
                                    }).catch((err) => {
                                        console.log(err);
                                    });

                            }).catch((err) => {
                            })
                        console.log("sending email  ");
                        // this.handleAppProcessFlowUpdate(this);
                    }).catch((err) => {
                        console.log("error sending email");

                    });
                // }

            }).catch((err) => {

                console.log(err);
            });
    }



    handleRedirect(event) {
        history.push('/ApplicantDashboard');
    }


    handleSaveResidency(e) {
        var emailresult = localStorage.getItem('applicant_email');
        var QName = this.state.BtnName;
        var isValid = this.handleCountryValidateForm(this);
        var selectedcountry = this.state.ResCountryState;
        var norwayprefix = this.state.prefix;
        var personal_id;
        if (selectedcountry == 'NO') {
            personal_id = norwayprefix + "" + this.state.PersonalIDNumState;
            console.log('personal id:' + personal_id);
        } else {
            personal_id = this.state.PersonalIDNumState;
        }
        if (isValid) {
            var thisObj = this;
            let SaveResAPIurl = "https://9yfzqnwuf8.execute-api.us-west-2.amazonaws.com/Dev/GPA_InitialLoad_Lambda";
            let SaveResJSONData = JSON.stringify({
                User_ID: emailresult,
                QueryName: QName,
                CommonData: QName,
                ResidencyQuestionCountry_ID: this.state.ResidencyQuestionCountry_ID,
                EmployeeCompany_ID: this.state.EmployeeCompany_ID,
                Res_Country: this.state.ResCountryState,
                ResCountry_BDate: this.state.ResBeginDateState,
                ResCountry_EDate: this.state.ResEndDateState,
                Personal_IDNum: personal_id,
                Res_Address: this.state.ResAddressState,
                GetBenefit_Spouse: this.state.GetBenefitSpouseState,
                PPersonal_IDNum: this.state.PPersonalIDNumState,
                CountryStay_Date: this.state.CountryStayReason,
                Reason_Stay: this.state.ReasonState,
                Company_Code: this.state.searchText,
                Company_Address: this.state.CmpAddressState,
                ResWork_BDate: "",
                ResWork_EDate: "",
                EntitleGPA_Contact: this.state.EntitleGPAContactState,
                Employee_ClosedPlan: this.state.EmployeeClosedPlanState,
                BestOf_Knowledge: this.state.BestOfKnowledgeState,
                Closed_Plan: this.state.ClosedPlanState,

            });
            console.log("params" + SaveResJSONData);
            let AxiosHeaderConfig = {
                "Content-Type": "application/json",
                // "Access-Control-Request-Headers": "*",
                // "Access-Control-Request-Method": "*",
            }
            axios({
                method: "POST",
                url: SaveResAPIurl,
                data: SaveResJSONData,
                headers: AxiosHeaderConfig,

            }).then((data) => {
                if (this.state.BtnName == "Save") {
                    if (this.state.CountryStayReason == "Work") {
                        notify.show("Saved Country and Company Successfully", "success", 3000);
                        this.handleAppProcessFlowUpdate(this);
                        this.handleEligiliblity(this);
                    }
                    else {
                        notify.show("Saved Country Successfully", "success", 3000);
                        this.handleCountryReset(this);
                    }
                }
                else {
                    notify.show("Update Successfully", "success", 3000);
                    this.handleCountryReset(this);
                }
            }).catch((err) => {

            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }

    handleResidencyEdit(EmpCompanyID) {

        var thisObj = this;
        let ResEditAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var Editdata = JSON.stringify({
            QueryName: "ResidencyEdit",
            EmpCompanyID: EmpCompanyID
        });
        //alert(Editdata)
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: ResEditAPIUrl,
            data: Editdata,
            headers: AxiosHeaderConfig,
        }).then(({ data }) => {
            thisObj.setState({ BtnName: "Update" });
            this.setState({ EmployeeCompany_ID: EmpCompanyID }, () => {

            });
            //alert("success" + JSON.stringify(data))
            for (var i = 0; i < data.length; i++) {

                thisObj.setState({ ResCountryState: data[i].ResCountry });
                // thisObj.setState({ResBeginMonthState: 5});
                // thisObj.setState({ResBeginYearState: 2016});
                thisObj.setState({ ResBeginDateState: data[i].ResCountryBDate });
                thisObj.setState({ ResEndDateState: data[i].ResCountryEDate });
                thisObj.setState({ PersonalIDNumState: data[i].PersonalIDNum });
                thisObj.setState({ ResAddressState: data[i].ResAddress });
                thisObj.setState({ GetBenefitSpouseState: data[i].GetBenefitSpouse });
                if (data[i].GetBenefitSpouse == "Yes") {
                    thisObj.setState({ PPersonalIDNumState: data[i].PPersonalIDNum });
                }
                thisObj.setState({ CountryStayReason: data[i].CountryStayDate });
                if (data[i].CountryStayDate == "Other") {
                    thisObj.setState({ ReasonState: data[i].Reason });
                }
                if (data[i].CountryStayDate == "Work") {
                    thisObj.setState({ searchText: data[i].CompanyCode });
                    thisObj.setState({ CmpAddressState: data[i].CompanyAddress });
                    thisObj.setState({ EntitleGPAContactState: data[i].EntitleGPAContact });
                    thisObj.setState({ ResidencyQuestionCountry_ID: data[i].ResQusCountryID });
                    thisObj.setState({ EmployeeClosedPlanState: data[i].EmployeeClosedPlan });
                    if (data[i].EmployeeClosedPlan == "Yes") {
                        thisObj.setState({ BestOfKnowledgeState: data[i].BestOfKnowledge });
                        thisObj.setState({ ClosedPlanState: data[i].ClosedPlan });
                    }
                }
            }

        }).catch((err) => {
            // alert("Failure")
            console.log(err)
        });
    }

    handleCountryEdit(ResQusCountryID) {
        //alert("entered")
        var thisObj = this;
        let ResCountryEditAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var CountryEditdata = JSON.stringify({
            QueryName: "ResidencyCountryEdit",
            ResQusCountryID: ResQusCountryID
        });
        //alert(CountryEditdata);
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: ResCountryEditAPIUrl,
            data: CountryEditdata,
            headers: AxiosHeaderConfig,
        }).then(({ data }) => {
            console.log("EditDate" + data)
            thisObj.setState({ BtnName: "Update" });
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ ResCountryState: data[i].ResCountry });
                thisObj.setState({ ResBeginDateState: data[i].ResCountryBDate });
                thisObj.setState({ ResEndDateState: data[i].ResCountryEDate });
                thisObj.setState({ PersonalIDNumState: data[i].PersonalIDNum });
                thisObj.setState({ ResAddressState: data[i].ResAddress });
                thisObj.setState({ GetBenefitSpouseState: data[i].GetBenefitSpouse });
                if (data[i].GetBenefitSpouse == "Yes") {
                    thisObj.setState({ PPersonalIDNumState: data[i].PPersonalIDNum });
                }
                thisObj.setState({ CountryStayReason: data[i].CountryStayDate });
                if (data[i].CountryStayDate == "Other") {
                    thisObj.setState({ ReasonState: data[i].Reason });
                }
            }
        }).catch((err) => {
            console.log(err)
        });
    }
    //Rendering Page
    render() {
        const google = window.google;
        const currentcountry = this.state.ResCountryState;
        const prefixid = this.state.prefix;
        let personalprefixid;
        if (currentcountry == 'NO') {
            personalprefixid = <div id="norwayprefix"><div className="Countrylabel" id="norwayconlabel" >{prefixid}</div><div className="Countrylabel1" id="norwayid" ><TextField
                hintText="Enter Your Personal ID Number"
                value={this.state.PersonalIDNumState}
                onChange={this.handleChangePersonalIDNum.bind(this)}
                errorText={this.state.isValidPersonalIDNum ? "Please Enter Your Personal ID Numbers" : ""}
            /></div></div>
        } else {
            personalprefixid = <TextField
                hintText="Enter Your Personal ID Number"
                value={this.state.PersonalIDNumState}
                onChange={this.handleChangePersonalIDNum.bind(this)}
                errorText={this.state.isValidPersonalIDNum ? "Please Enter Your Personal ID Number" : ""}
            />
        }
        return (
            <div className="main-wrapper">
                <Paper zDepth={1} className="AdminDashboardDiv">
                    <div>
                        <h2 className="legendtitle">Residency Details</h2>
                        <div className="fieldstyle">
                            <Row>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12}>
                                        <h4><b>Enter Residency Details for each different period of time you were in country for any Work, Student, Unemployed or Other activity.</b></h4>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={6} className="input-fileds align-fileds" >
                                        <label>Country of Residency<span className="manatoryfield">*</span></label>
                                        <SelectField
                                            maxHeight={300}
                                            hintText="Select the Country of Residency"
                                            value={this.state.ResCountryState}
                                            onChange={this.handleChangeCountryName.bind(this)}
                                            errorText={this.state.isValidResCountry ? "Please Select Your Country of Residency" : null}
                                        >
                                            {CountryItems}
                                        </SelectField>
                                    </Col>
                                    <Col xs={12} md={3} className="align-fileds">
                                        <label className="DatepickerLabel">Start of Country Residency<span className="manatoryfield">*</span></label>
                                        {/* <div className="MonthlyDatePicker">
                                            <MonthPickerInput
                                                value={this.state.ResBeginDateState}
                                                // year={this.state.ResBeginYearState}
                                                // month={this.state.ResBeginMonthState}
                                                onChange={this.handleChangeResBeginDate.bind(this)}
                                                closeOnSelect={true}
                                            />
                                        </div> */}
                                        {/* <Picker
                                            ref="pickAMonth"
                                            years={[2008, 2010, 2011, 2012, 2014, 2015, 2016, 2017]}
                                            value={mvalue}
                                            lang={pickerLang.months}
                                            onChange={this.handleAMonthChange}
                                            onDismiss={this.handleAMonthDissmis}
                                        >
                                            <MonthBox value={makeText(mvalue)} onClick={this.handleClickMonthBox} />
                                        </Picker> */}
                                        <div className="StartOfCountryDatepicker">
                                            <Datetime
                                                value={this.state.ResBeginDateState}
                                                inputProps={{ placeholder: 'Select the Start Month and Year' }}
                                                dateFormat="MM-YYYY"
                                                onChange={this.handleChangeResBeginDate.bind(this)}
                                                isValidDate={this.handleChangevalidatedatestart.bind(this)}
                                                timeFormat={false}
                                            />
                                        </div>
                                        <span className="validationmsg ">{this.state.isValidResBeginDate ? "Please Select Your Start Date" : null}</span>
                                    </Col>
                                    <Col xs={12} md={3} className="align-fileds">
                                        <label className="DatepickerLabel">End of Country Residency<span className="manatoryfield">*</span></label>
                                        {/* <div className="MonthlyDatePicker">
                                            <MonthPickerInput
                                                value={this.state.ResEndDateState}
                                                onChange={this.handleChangeResEndDate.bind(this)}
                                                closeOnSelect={true}
                                            />
                                        </div> */}
                                        <div className="StartOfCountryDatepicker">
                                            <Datetime
                                                value={this.state.ResEndDateState}
                                                inputProps={{ placeholder: 'Select the End Month and Year' }}
                                                dateFormat="MM-YYYY"
                                                onChange={this.handleChangeResEndDate.bind(this)}
                                                isValidDate={this.handleChangevalidatedateend.bind(this)}
                                                timeFormat={false}
                                            />
                                        </div>
                                        <span className="validationmsg ">{this.state.isValidResEndDate ? "Please Select Your End Date" : null}</span>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={8} className="input-fileds align-fileds" >
                                        <label>What is your Personal ID number (Social Security / National Insurance number) in <b className="CountryColor">{this.state.CountryNameState}</b> (if known)</label>
                                        {personalprefixid}
                                        {/* <TextField
                                            hintText="Enter Your Personal ID Number"
                                            value={this.state.PersonalIDNumState}
                                            onChange={this.handleChangePersonalIDNum.bind(this)}
                                            errorText={this.state.isValidPersonalIDNum ? "Please Enter Your Personal ID Number" : ""}
                                        /> */}
                                    </Col>
                                    {/* <Col xs={12} md={4} className="input-fileds align-fileds">
                                        <label>Document Preferred Language<span className="manatoryfield">*</span></label>
                                        <SelectField
                                            hintText="Select the language"
                                            value={this.state.PreferredLangState}
                                            onChange={this.handlePreferredLanguage.bind(this)}
                                            maxHeight={200}
                                        >
                                            {LanguageStaus}
                                        </SelectField>
                                    </Col> */}
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} className="input-fileds">
                                        <h5 className="TopicAlign">Use the permanent address you stayed at the longest from <b className="CountryColor">{this.state.Yearstate}</b> to <b className="CountryColor">{this.state.EndYearstate}</b> while living in <b className="CountryColor">{this.state.CountryNameState}</b>. At a minimum, please provide city and country of residency.</h5>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                        <label>Residency Address<span className="manatoryfield">*</span></label>
                                        <Geosuggest
                                            placeholder="Enter Your Residency Address"
                                            initialValue={this.state.ResAddressState}
                                            onChange={this.handleResAddress}
                                            onSuggestSelect={this.handleSelectSuggest.bind(this)}
                                            value={this.state.ResAddressState}
                                            location={new google.maps.LatLng("", "")}
                                            radius="20"
                                        />
                                        <span className="validationmsg">{this.state.isValidResAddress ? "Please Enter Your Current Residency Address" : null}</span>
                                    </Col>
                                    {this.state.MaritialStatusState != "S" ?
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label>Would you also like us to inquire about potential benefits for your spouse?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup name="radio1" valueSelected={this.state.GetBenefitSpouseState} onChange={this.handleChangeGetBenefitSpouse.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                <RadioButton
                                                    value="Yes"
                                                    label="Yes"
                                                    style={style.radioButton}
                                                />
                                                <RadioButton
                                                    value="No"
                                                    label="No"
                                                    style={style.radioButton}
                                                />
                                            </RadioButtonGroup >
                                        </Col>
                                        : ""}
                                </Col>
                                {this.state.GetBenefitSpouseState == 'Yes' ?
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds align-fileds" >
                                            <label>What is your Spouse’s Personal ID number (Social Security / National Insurance number) in <b className="CountryColor">{this.state.CountryNameState}</b> (if known)</label>
                                            <TextField
                                                hintText="Please Enter Your Spouse’s Personal ID Number"
                                                value={this.state.PPersonalIDNumState}
                                                onChange={this.handleChangePPersonalIDNum.bind(this)}
                                                errorText={this.state.isValidPPersonalIDNum ? "Please Enter Your Spouse Personal ID Number" : ""}
                                            />
                                        </Col>
                                    </Col>
                                    : ''}
                                <Col xs={12} md={12} >
                                    <Col xs={12} md={9} className="Radio_button">
                                        <label>Why were you in <span>{this.state.CountryNameState}</span> during this time<span className="manatoryfield">*</span></label>
                                        <RadioButtonGroup name="RadioStay" valueSelected={this.state.CountryStayReason} onChange={this.handleCountryStayReason.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                            <RadioButton
                                                value="Work"
                                                label="Work"
                                                style={style.radioButton}
                                            />
                                            <RadioButton
                                                value="Student"
                                                label="Student"
                                                style={style.radioButton}
                                            />
                                            <RadioButton
                                                value="Unemployed"
                                                label="Unemployed"
                                                style={style.radioButton}
                                            />

                                            <RadioButton
                                                value="Other"
                                                label="Other"
                                                style={style.radioButton}
                                            />
                                        </RadioButtonGroup >
                                        <span className="validationmsg">{this.state.isValidCountryStayReason ? "Please select Why were you in Country during this time" : null}</span>
                                    </Col>
                                    {this.state.CountryStayReason == "Other" ?
                                        <Col xs={12} md={3} className="input-fileds align-fileds">
                                            <label>Reason For Staying</label>
                                            <TextField
                                                hintText="Enter the reason for staying"
                                                value={this.state.ReasonState}
                                                onChange={this.handleChangeReason.bind(this)}
                                                errorText={this.state.isValidReason ? "Please Enter Your Reason for staying" : ""}
                                            />
                                        </Col>
                                        : ""}
                                </Col>
                            </Row>
                            {this.state.CountryStayReason == "Work" ?
                                <div>
                                    <h2 className="legendtitle">Company Details</h2>
                                    <div className="fieldstyle">
                                        <Row>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12}>
                                                    <h5><b>Enter details about the Company you worked for and if you want Global Pension Associates to contact them about potential benefits you may be entitled to.</b></h5>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Company Name<span className="manatoryfield">*</span></label>
                                                    {/* <AutoComplete
                                                        disabled={this.state.CompanyFlag == "CompanyUpdate"}
                                                        hintText="Type Company Name"
                                                        maxSearchResults={7}
                                                        dataSource={this.state.Countries}
                                                        //menuProps={menuProps}
                                                        filter={AutoComplete.caseInsensitiveFilter}
                                                        searchText={this.state.searchText}
                                                        onNewRequest={this.handleNewRequest}
                                                        value={this.state.CompanyNameState}
                                                        errorText={this.state.isValidCompanyName ? "Please Enter Company Name" : null}
                                                        fullWidth={true}
                                                    /> */}
                                                    <AutoComplete
                                                        maxSearchResults={10}
                                                        listStyle={{ maxHeight: 200, overflow: 'auto' }}
                                                        popoverProps={{ open: this.state.viewList }}
                                                        disabled={this.state.CompanyFlag == "CompanyUpdate"}
                                                        hintText="Type Company Name"
                                                        dataSource={this.state.Countries}
                                                        menuProps={menuProps}
                                                        filter={AutoComplete.caseInsensitiveFilter}
                                                        searchText={this.state.searchText}
                                                        onUpdateInput={this.handleUpdateInput}
                                                        errorText={this.state.isValidCompanyName ? "Please Enter Company Name" : null}
                                                        fullWidth={true}
                                                    />

                                                    <span className="error_msg_align validationmsg ">{this.state.isEmptyCompanyName ? "There is no respective company for selected country" : ""}</span>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Company Address<span className="manatoryfield">*</span></label>
                                                    <Geosuggest
                                                        placeholder="Enter Your Company Address"
                                                        initialValue={this.state.CmpAddressState}
                                                        onChange={this.handleCmpAddress}
                                                        onSuggestSelect={this.handleSelectCompanySuggest.bind(this)}
                                                        value={this.state.CmpAddressState}
                                                        location={new google.maps.LatLng("", "")}
                                                        radius="20"
                                                    />
                                                    <span className="validationmsg">{this.state.isValidCmpAddress ? "Please Enter Your Current Company Address" : null}</span>
                                                </Col>
                                            </Col>
                                            {Retrimentdays >= 365 ?
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="Radio_button">
                                                    <label>Would you like Global Pension Associates to contact this employer about potential pension benefits you may be entitled?<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup name="RadioEntitle" valueSelected={this.state.EntitleGPAContactState} onChange={this.handleChangeEntitleGPAContact.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <RadioButton
                                                            value="Yes"
                                                            label="Yes"
                                                            style={style.radioButton}
                                                        />
                                                        <RadioButton
                                                            value="No"
                                                            label="No"
                                                            style={style.radioButton}
                                                        />
                                                    </RadioButtonGroup >
                                                </Col>
                                            </Col>
                                            :''}
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="Radio_button">
                                                    <label>Are you aware of this employer being no longer in existence, having closed plans, or acquired by another entity?<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup name="RadioPlan" valueSelected={this.state.EmployeeClosedPlanState} onChange={this.handleChangeEmployeeClosedPlan.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <RadioButton
                                                            value="Yes"
                                                            label="Yes"
                                                            style={style.radioButton}
                                                        />
                                                        <RadioButton
                                                            value="No"
                                                            label="No"
                                                            style={style.radioButton}
                                                        />
                                                    </RadioButtonGroup >
                                                </Col>
                                            </Col>
                                            {this.state.EmployeeClosedPlanState == 'Yes' ?
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={8} className="input-fileds align-fileds">
                                                        <label>Best of Your Knowledge<span className="manatoryfield">*</span></label>
                                                        <SelectField
                                                            hintText="Select the best of your knowledge"
                                                            value={this.state.BestOfKnowledgeState}
                                                            onChange={this.handleChangeBestOfKnowledge.bind(this)}
                                                            errorText={this.state.isValidBestOfKnowledge ? "Please Choose Best of Your Knowledge" : ""}
                                                        >
                                                            {KnowledgeStatusItems}
                                                        </SelectField>
                                                    </Col>
                                                    <Col xs={12} md={10} className="input-fileds align-fileds">
                                                        <label>Please provide any details you may be aware of (name of closed plan, when company closed, who acquired them, etc.)</label>
                                                        <TextField
                                                            hintText="Enter Your Closed Plan"
                                                            value={this.state.ClosedPlanState}
                                                            onChange={this.handleChangeClosedPlan.bind(this)}
                                                            errorText={this.state.isValidClosedPlan ? "Please Enter Your Closed Plan Details" : ""}
                                                        />
                                                    </Col>
                                                </Col>
                                                : ''}
                                        </Row>
                                    </div>
                                </div>
                                : ""}
                            <Row>
                                <Col xs={12} md={12} className="RegButton">
                                    <Col xs={12} md={10} className="input-fileds">
                                        <Button onClick={this.handleCountryReset.bind(this)}
                                            className="ResetButton" >Reset</Button>
                                    </Col>
                                    <Col xs={12} md={2} className="input-fileds">
                                        <Button type="submit" onClick={this.handleSaveResidency.bind(this)} className="RegButton1">{this.state.BtnName}</Button>
                                        {/* <Button className="RegButton1" onClick={() => this.setState({ show: true })} >modal</Button> */}
                                        <Notifications />
                                    </Col>
                                </Col>
                            </Row>

                            {/* Modal popup */}

                            <div className="modal-container">

                                <Modal
                                    show={this.state.show}
                                    onHide={this.handleHide}
                                    container={this}
                                    aria-labelledby="contained-modal-title"
                                >
                                    <Modal.Header >
                                        <Modal.Title id="contained-modal-title">
                                            Residency greater than one year
                                    </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        We look forward to assisting you with inquiring about potential benefits with {this.state.CountryNameState}.
                                </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={() => this.handlePOAMailConditions(this)}>Ok</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>

                            <div className="modal-container">

                                <Modal
                                    show={this.state.show1}
                                    onHide={this.handleHide}
                                    container={this}
                                    aria-labelledby="contained-modal-title"
                                >
                                    <Modal.Header >
                                        <Modal.Title id="contained-modal-title">
                                            Residency less than one year
                                    </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        You do not meet the minimum residency requirements. Please check your emails for more detail.
                                </Modal.Body>
                                    <Modal.Footer>
                                        <Button onClick={() => this.handlelessthanOneyearMail(this)}>Ok</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>


                            <div className="modal-container">

                                <Modal
                                    show={this.state.PrivatepopUp}
                                    onHide={this.handleHidePrivate.bind(this)}
                                    container={this}
                                    aria-labelledby="contained-modal-title"
                                >
                                    <Modal.Header >
                                        <Modal.Title id="contained-modal-title">
                                        Previous Employer
                                           
                                     </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    We look forward to assisting you with inquiring about potential benefits with {this.state.searchText} of {this.state.CountryNameState} country;
                                    </Modal.Body>
                                    <Modal.Footer>
    
                                        <Button onClick={() => this.handleCompanyPOAMail(this)}>Ok</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>


                            {/* Modal popup */}

                        </div>
                    </div>
                </Paper>
            </div>
        );
    }

    //Country State Reset
    handleCountryReset(e) {
        this.setState({
            CountryFlag: "CountrySave",
            ResCountryState: "",
            CountryNameState: "",
            ResBeginDateState: "",
            ResEndDateState: "",
            PersonalIDNumState: "",
            ResAddressState: "",
            GetBenefitSpouseState: 'No',
            PPersonalIDNumState: "",
            CountryStayReason: "",
            ReasonState: "",
            MaritialStatusState: "",
            isValidResCountry: false,
            isValidResBeginDate: false,
            isValidResEndDate: false,
            isValidPersonalIDNum: false,
            isValidResAddress: false,
            isValidCountryStayReason: false,
            isValidGetBenefitSpouse: false,
            isValidPPersonalIDNum: false,
            isValidCountryStayReason: false,
            isValidReason: false,
            isValidFormatPersonalIDNum: false,
            isValidFormatResAddress: false,
            isValidFormatPPersonalIDNum: false,
            ResCountryState: "",
            CountryNameState: "",
            BtnName: "Save",
            CompanyNameState: "",
            CmpAddressState: "",
            EntitleGPAContactState: 'No',
            EmployeeClosedPlanState: 'No',
            BestOfKnowledgeState: "",
            ClosedPlanState: "",
            isvalidCountryCode: false,
            isValidResCountry: false,
            isValidCompanyName: false,
            isValidCmpAddress: false,
            isValidEntitleGPAContact: false,
            isValidEmployeeClosedPlan: false,
            isValidBestOfKnowledge: false,
            isValidClosedPlan: false,
            isValidFormatCountryCode: false,
            isValidFormatCountryName: false,
        });
        //this.handleCompanyRead(this);
    }
}

const SaveDataAPICallMailSend = function (mailSendURL, data) {
    var promise = new Promise(function (resolve, reject) {
        axios({
            method: "POST",
            url: mailSendURL,
            data: JSON.stringify(data),

        }).then(({ data }) => {
            // console.log("Deva::", data);
            resolve(data);
        })
            .catch((err) => {
                console.log("DATA ", err);
                reject(err);
            });
    })
    return promise;
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
        },
        setResidencyCountry: (Rescountry) => {
            dispatch(Action.setResidencyCountry(Rescountry));
        }
    }
}

export default connect(mapReducerStateToProps, mapDispatchToProps)(ResidencyQuestionnaries);