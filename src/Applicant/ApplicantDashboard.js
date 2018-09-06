import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../img/logo_white.png';
import { Grid, Row, Col, Button, Tooltip, Table, Alert, OverlayTrigger, ButtonToolbar, Panel, PanelGroup, Modal } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ReactFileReader from 'react-file-reader';
import SweetAlert from 'sweetalert2-react';
import ResidencyIcon from '../img/residency-que.png';
import PersonalDetailsImg from '../img/Login_bg_v1.jpg';
import SampleCmplogo from '../img/SampleCmplogo.png';
import country_1 from '../img/country_1.png';
import country_2 from '../img/country_2.png';
import country_3 from '../img/country_3.png';
import country_4 from '../img/country_4.png';
import NoImg from '../img/No_Image.png';
import company from '../img/offices-buildings.png';
import country from '../img/planet-land.png';
import Moment from 'react-moment';
//import csv from 'csvtojson';
import { blue500, red500, greenA200, blue200 } from 'material-ui/styles/colors';
//import '../style.css';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, AmazonCognitoIdentity } from 'amazon-cognito-identity-js';
//import '../style.css';
import { fade } from 'material-ui/utils/colorManipulator';
import createHistory from 'history/createBrowserHistory';
import SvgIcon from 'material-ui/SvgIcon';
import RemoveRedEye from 'material-ui/svg-icons/action/dashboard';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import Download from '@axetroy/react-download';
import '../Style/common-1.css';
import '../Style/bootstrap-grid.min.css';
import '../Style/style_new.css';
import '../Style/style.css';

import { Flex } from 'react-flex-material';
//Routing
import history from '../Routing/history';
//Notification 
import Notifications, { notify } from 'react-notify-toast';
//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import GeneralSummary from './GeneralSummary';
import MainResidencySummary from './ResidencySummaryNew';
import SubResidencySummary from './ResidencySummary';
import BenefitsSummary from './BenefitsSummary';
import {
    austriaCountry, belgiumCountry, handleGermanyAgeEligiblity, netherlandsCountry,
    brazilCountry, irelandCountry, portugalCountry, allowToEditBeneficiaryQuestions,
    getCurrentAge
} from './CountryPensionAgeHelper';

const table2Options = {
    sizePerPage: 15,
};

const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);
var moment = require('moment');
var emailresult;
let loopcount = 0;

var EligibleCountries = [];


class ApplicantDashboard extends Component {
    constructor() {
        super();
        /* Field State Values Initialization */
        this.state = {
            //Summary Progress
            //General Summary
            ProfileImgState: NoImg,
            FirstNameState: "",
            LastNameState: "",
            DOBState: "",
            CitizenshipState: "",
            EmployeeTypeState: "",
            CountryCodeState: "",
            GenderState: "",
            //Residency Summary
            ResCountryFlagState: NoImg,
            CompanyIconState: company,
            CountryIconState: country,
            ResCountryNameState: "",
            ResCountryState: "",
            ResQusIDState: "",
            tableData: [],
            tableData2: [],
            DocumenttableData: [],
            Part2Summarytable: [],
            //Benfits Summary
            CompanyLogoState: NoImg,
            HomeAddressState: "",
            PlaceOfBirthState: "",
            CompanyNameState: "",

            IndustryNameState: "",
            EligibleCountryFlagState: NoImg,
            EligibleCountryState: "Country Name",
            //Dashboard Progress
            HowToStartStatus: "P",
            GenQusStatus: "P",
            ResQusStatus: "P",
            BenQusPart1Status: "P",
            BenQusPart2Status: "P",
            ApplicantAge: "",
            ApplicantAgeMonth: "",
            DBOMonth: "",
            CountryCode: "",
            Country: "",
            CountryState: "",
            //age calcualtion 
            ageYears: "",
            ageMonths: "",

            CountryNames: "",
            //Mode Setup
            GenQusModelShow: false,
            ResQusModelShow: false,
            MainResQusModelShow: false,
            BenQusModelShow: false,
            //Page Navigate Setup
            NavHowToStart: "/HowToStartProcess",
            NavGenQus: "/ApplicantDashboard",
            NavResQus: "/ApplicantDashboard",
            NavBenQus: "/ApplicantDashboard",
            //Div Visibility Setup
            HowToStartDivVisible: false,
            GenQusDivVisible: true,
            ResQusDivVisible: true,
            BenQusDivVisible: true,
            //Print Button Visibility Setup
            HowToStartPrintBtnVisible: false,
            GenQusPrintBtnVisible: false,
            ResQusPrintBtnVisible: false,
            BenQusPrintBtnVisible: false,
            //Edit Button Visibility Setup
            GenQusEditBtnVisible: true,
            ResQusEditBtnVisible: true,
            BenQusEditBtnVisible: true,
            //View Button Visibility Setup
            GenQusViewBtnVisible: true,
            ResQusViewBtnVisible: true,
            BenQusPart1ViewBtnVisible: true,
            BenQusPart2ViewBtnVisible: true,
            //View Div Visibility Setup
            GenQusViewDivVisible: true,
            ResQusCountryViewDivVisible: true,
            ResQusEmployeeViewDivVisible: true,
            BenQusPart1ViewDivVisible: true,
            BenQusPart2ViewDivVisible: true,
            BenQusViewBtnVisible: true,
            //Div Visibility Style Setup
            GenQusDivStyle: "social-box ",
            ResQusDivStyle: "social-box ",
            BenQusDivStyle: "social-box ",
            //Button Visibility Style Setup
            GenQusPrintBtnStyle: "btn btn-success",
            ResQusPrintBtnStyle: "btn btn-success",
            BenQusPrintBtnStyle: "btn btn-success",
            GenQusEditBtnStyle: "btn btn",
            ResQusEditBtnStyle: "btn btn",
            BenQusEditBtnStyle: "btn btn",
            TemptableData: [],
            eligiblestate: "",
            isEnabled: "",
            //Document Status
            POAsentState: "Not Sent",
            POAReceivedState: "Not Received",
            DLsentState: "Not Sent",
            DLReceivedState: "Not Received",
            FCLsentState: "Not Sent",
            FCLReceivedState: "Not Received",
            PLsentState: "Not Sent",
            PLReceivedState: "Not Received",
            BLFsentState: "Not Sent",
            BLFReceivedState: "Not Received",
            DocumentIDstate: "",
            //Company Summary
            CompanyState: "",
            WorkFromDateState: "",
            WorkToDateState: "",
            CmpAddressState: "",
            EntitleGPAContactState: "",
            EmployeeClosedPlanState: "",
            BestOfKnowledgeState: "",
            ClosedPlanState: "",
            SelectedCountry: "",
            modalShow: "",
            dashboard_msg: "",
            isDisabled: false,
            DocName: "",
            volcontributemodal: "",
            //Eligible Country
            Eligible_Countries: [],
            BenefitCountrypopup: '',
            BenefitComplete: '',
            Countryvalue: '',
            BQP2AnsStatus: 'P',
            DisabledSate: [],
        }
        this.handleClose = this.handleClose.bind(this);

    }

    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        this.handleAppGenQusSummary(this);
        this.handleAppProcessFlowRead(this);
        this.handleAppResQusSummary(this);
        this.handleAppResQusEmp(this);
        this.handleAppBenQusSummary(this);
        this.handleDocumentStatus(this);
        this.handleDocumentStatusRead(this);
        console.log("Redux===>", this.props.LoginData.Language);
    }
    handleClose() {
        this.setState({ modalShow: false });
    }

    handleAppProcessFlowRead(event) {
        var thisObj = this;
        //let AppProFlowAPIUrl = "https://qxredca9lk.execute-api.us-west-2.amazonaws.com/Dev/GPA_AppProcessFlowDatas_Lambda";
        let AppProFlowAPIUrl = " https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify({
            QueryName: "ApplicantProcessFlowTrackingRead",
            UserID: emailresult
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
            console.log(data);
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].HowToStart == "C") {
                        //HowToStart Setup
                        thisObj.setState({ NavHowToStart: "/ApplicantDashboard" });
                        thisObj.setState({ HowToStartStatus: data[i].HowToStart });
                        thisObj.setState({ HowToStartDivVisible: true });
                        //GenQus Setup
                        thisObj.setState({ GenQusDivVisible: false });
                        thisObj.setState({ GenQusDivStyle: "social-box box2" });
                        thisObj.setState({ GenQusEditBtnVisible: true });
                        thisObj.setState({ GenQusEditBtnStyle: "btn btn-warning" });
                        thisObj.setState({ NavGenQus: "/GeneralQuestionnarie" });

                        //GenQus Condition Check
                        if (data[i].GenQus == "C") {
                            thisObj.handleAppGenQusSummary(thisObj);
                            //GenQus Setup
                            thisObj.setState({ GenQusStatus: data[i].GenQus });
                            thisObj.setState({ NavGenQus: "/ApplicantDashboard" });
                            thisObj.setState({ GenQusEditBtnVisible: false });
                            //thisObj.setState({ GenQusViewDivVisible: false });
                            thisObj.setState({ GenQusDivVisible: true });
                            thisObj.setState({ GenQusViewBtnVisible: false });

                            //ResQus Setup
                            thisObj.setState({ ResQusDivVisible: false });
                            thisObj.setState({ ResQusDivStyle: "social-box box3" });
                            thisObj.setState({ ResQusEditBtnVisible: true });
                            thisObj.setState({ ResQusEditBtnStyle: "btn btn-warning" });
                            thisObj.setState({ NavResQus: "/ResidencyQuestionnaries" });


                            //ResQus Condition Check
                            if (data[i].ResQus == "C") {
                                thisObj.handleAppResQusSummary(thisObj);
                                thisObj.checkeligibility(thisObj);
                                // //ResQus Setup
                                // thisObj.setState({ ResQusStatus: data[i].ResQus });
                                // thisObj.setState({ NavResQus: "/ApplicantDashboard" });
                                // thisObj.setState({ ResQusEditBtnVisible: false });
                                // thisObj.setState({ ResQusCountryViewDivVisible: true });
                                // thisObj.setState({ ResQusEmployeeViewDivVisible: true });
                                // thisObj.setState({ ResQusViewBtnVisible: false });
                                // //BenQus Setup
                                // thisObj.setState({ BenQusDivVisible: false });
                                // thisObj.setState({ BenQusDivStyle: "social-box box4" });
                                // thisObj.setState({ BenQusEditBtnVisible: true });
                                // thisObj.setState({ BenQusEditBtnStyle: "btn btn-warning" });
                                //thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart1" });

                                //BenQusPart1 Condition Check
                                if (data[i].BenQusPart1 == "C") {
                                    thisObj.setState({ BenefitComplete: data[i].BensQusPart1 })
                                    thisObj.handleAppBenQusSummary(thisObj);
                                    //BenQusPart1 Setup
                                    thisObj.setState({ BenQusPart1Status: data[i].BenQusPart1 });
                                    thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart2" });
                                    thisObj.setState({ BenQusEditBtnVisible: false });
                                    thisObj.setState({ BenQusPart1ViewDivVisible: true });
                                    thisObj.setState({ BenQusPart1ViewBtnVisible: false });

                                    // //BenQusPart2 Condition Check
                                    // if (data[i].BenQusPart2 == "C") {
                                    //     //BenQusPart2 Setup
                                    //     thisObj.setState({ BenQusPart2Status: data[i].BenQusPart2 });
                                    //     thisObj.setState({ NavBenQus: "/ApplicantDashboard" });
                                    //     thisObj.setState({ BenQusEditBtnVisible: false });
                                    //     thisObj.setState({ BenQusPart2ViewDivVisible: true });
                                    //     thisObj.setState({ BenQusPart2ViewBtnVisible: false });
                                    // }
                                    // else {
                                    //     //BenQusPart2 Setup 
                                    //     thisObj.setState({ BenQusPart2Status: data[i].BenQusPart2 });
                                    //     thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart2" });
                                    //     thisObj.setState({ BenQusEditBtnVisible: false });
                                    //     thisObj.setState({ BenQusPart2ViewDivVisible: false });
                                    //     thisObj.setState({ BenQusPart2ViewBtnVisible: true });
                                    // }
                                }
                                else {
                                    //BenQusPart1 Setup 
                                    //thisObj.setState({ BenQusPart1Status: data[i].BenQusPart1 });
                                    //thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart1" });
                                    //thisObj.setState({ BenQusEditBtnVisible: true });
                                    //thisObj.setState({ BenQusPart1ViewDivVisible: false });
                                    //thisObj.setState({ BenQusPart1ViewBtnVisible: true });
                                    if (this.state.isDisabled == true) {

                                        thisObj.setState({ BenQusPart1Status: data[i].BenQusPart1 });
                                        thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart1" });
                                        thisObj.setState({ BenQusEditBtnVisible: true });
                                        thisObj.setState({ BenQusPart1ViewDivVisible: false });
                                        thisObj.setState({ BenQusPart1ViewBtnVisible: true });

                                    }
                                }
                            }
                            else {
                                // ResQus Setup 
                                thisObj.setState({ ResQusStatus: data[i].ResQus });
                                thisObj.setState({ NavResQus: "/ResidencyQuestionnaries" });
                                thisObj.setState({ ResQusEditBtnVisible: true });
                                thisObj.setState({ ResQusCountryViewDivVisible: false });
                                thisObj.setState({ ResQusEmployeeViewDivVisible: false });
                                thisObj.setState({ ResQusViewBtnVisible: true });
                                //BenQus Setup
                                thisObj.setState({ BenQusDivVisible: true });
                                thisObj.setState({ BenQusDivStyle: "social-box" });
                                thisObj.setState({ BenQusEditBtnVisible: true });
                                thisObj.setState({ BenQusEditBtnStyle: "btn btn" });
                                thisObj.setState({ NavBenQus: "/ApplicantDashboard" });
                            }
                        }
                        else {
                            //GenQus Setup 
                            thisObj.setState({ GenQusStatus: data[i].GenQus });
                            thisObj.setState({ NavGenQus: "/GeneralQuestionnarie" });
                            thisObj.setState({ GenQusEditBtnVisible: true });
                            thisObj.setState({ GenQusViewDivVisible: false });
                            thisObj.setState({ GenQusViewBtnVisible: true });
                            //ResQus Setup
                            thisObj.setState({ ResQusDivVisible: true });
                            thisObj.setState({ ResQusDivStyle: "social-box" });
                            thisObj.setState({ ResQusEditBtnVisible: true });
                            thisObj.setState({ ResQusEditBtnStyle: "btn btn" });
                            thisObj.setState({ NavResQus: "/ApplicantDashboard" });
                        }
                    }
                    else {
                        //HowToStart Setup
                        thisObj.setState({ HowToStartStatus: data[i].HowToStart });
                        //thisObj.setState({ HowToStartDivVisible: true });
                        thisObj.setState({ HowToStartDivVisible: false });
                        //GenQus Setup
                        thisObj.setState({ GenQusDivVisible: true });
                        thisObj.setState({ GenQusDivStyle: "social-box" });
                        thisObj.setState({ GenQusEditBtnVisible: true });
                        thisObj.setState({ GenQusEditBtnStyle: "btn btn" });
                        thisObj.setState({ NavGenQus: "/ApplicantDashboard" });
                    }

                }
            }
            // else {
            // thisObj.setState({ NavHowToStart: "/HowToStartProcess" });
            // thisObj.setState({ HowToStartPrintBtnVisible: true }); 
            // thisObj.setState({ NavGenQus: "/ApplicantDashboard" });
            // thisObj.setState({ GenQusPrintBtnVisible: true });
            // thisObj.setState({ GenQusEditBtnVisible: true });
            // thisObj.setState({ ResQusDivVisible: true });
            // thisObj.setState({ NavResQus: "/ApplicantDashboard" });
            // thisObj.setState({ ResQusPrintBtnVisible: true });
            // thisObj.setState({ ResQusEditBtnVisible: true });
            // thisObj.setState({ BenQusDivVisible: true });
            // thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart1" });
            // thisObj.setState({ BenQusPrintBtnVisible: true });
            // thisObj.setState({ BenQusEditBtnVisible: true });
            // }
        }).catch((err) => {

        })
    }

    // Benefits Questionnarie Enable/Disabled functionality
    // Benefits Questionnarie Enable/Disabled functionality
    checkeligibility() {
        console.log("Eligible");
        let data = this.state.tableData;
        console.log("this.state.tableData ---->", this.state.tableData);
        let country = [];
        for (let i = 0; i < data.length; i++) {
            country.push(data[i].ResCountry)
        }
        for (let i = 0; i < country.length; i++) {
            this.handleReadEligible(country[i]);
        }
    }


    handleReadEligible(country) {
        console.log("Entry of API");
        let Docurl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let DocIDData = {
            QueryName: "OpenBF2EligibleCountry",
            CountryCode: country,
            UserID: emailresult,//emailresult,
        };
        console.log("DocIDData", JSON.stringify(DocIDData));
        SaveDataAPICallMailSend(Docurl, DocIDData)
            .then((data) => {
                console.log("Success----->", data);
                for (let i = 0; i < data.length; i++) {
                    if (data[i].Eligible == "Y" || data[i].Eligible == "O") {
                        this.eligiblityCountry(data[i].CountryCode);
                        break;
                    }
                }
                this.benQusEnableDisable();
            }).catch((err) => {
                console.log(err);
            });
    }

    eligiblityCountry(CountryCode) {
        let Qualify;
        let thisObj = this;
        let user_age = this.state.DOBState;
        let retireAge = [];
        let currentAge = getCurrentAge(user_age);
        let gender = this.state.GenderState

        switch (CountryCode) {
            case "UK":
                retireAge = this.ukCountry(user_age);
                Qualify = this.checkEligibleUkCountry(retireAge);
                if (Qualify == true)
                    this.state.Eligible_Countries.push({ Country_id: "UK", Name: "United Kingdom", AnsStatus: this.state.BQP2AnsStatus });
                EligibleCountries.push({ Country_id: "UK", Name: "United Kingdom", AnsStatus: this.state.BQP2AnsStatus });
                thisObj.setState({
                    isDisabled: Qualify,
                });
                break;
            case "KR":
                retireAge = this.krCountry(user_age);
                Qualify = this.checkEligibleCountry(retireAge);
                if (Qualify == true)
                    this.state.Eligible_Countries.push({ Country_id: "KR", Name: "South Korea", AnsStatus: this.state.BQP2AnsStatus });
                EligibleCountries.push({ Country_id: "KR", Name: "South Korea", AnsStatus: this.state.BQP2AnsStatus });
                thisObj.setState({
                    isDisabled: Qualify,
                });
                break;
            case "NO":
                retireAge = this.norwayCountry(user_age);
                Qualify = this.checkEligibleNoCountry(retireAge);
                if (Qualify == true)
                    this.state.Eligible_Countries.push({ Country_id: "NO", Name: "Norway", AnsStatus: this.state.BQP2AnsStatus });
                EligibleCountries.push({ Country_id: "NO", Name: "Norway", AnsStatus: this.state.BQP2AnsStatus });
                thisObj.setState({
                    isDisabled: Qualify,
                });
                break;
            case "AT":
                retireAge = austriaCountry(gender);
                Qualify = allowToEditBeneficiaryQuestions(retireAge, currentAge);
                if (Qualify == true)
                    this.state.Eligible_Countries.push({ Country_id: "AT", Name: "Austria", AnsStatus: this.state.BQP2AnsStatus });
                EligibleCountries.push({ Country_id: "AT", Name: "Austria", AnsStatus: this.state.BQP2AnsStatus });
                thisObj.setState({
                    isDisabled: Qualify,
                });
                break;
            case "BE":
                retireAge = belgiumCountry();
                Qualify = allowToEditBeneficiaryQuestions(retireAge, currentAge);
                if (Qualify == true)
                    this.state.Eligible_Countries.push({ Country_id: "BE", Name: "Belgium", AnsStatus: this.state.BQP2AnsStatus });
                EligibleCountries.push({ Country_id: "BE", Name: "Belgium", AnsStatus: this.state.BQP2AnsStatus });
                thisObj.setState({
                    isDisabled: Qualify,
                });

                break;
            case "BR":
                retireAge = brazilCountry(gender);
                Qualify = allowToEditBeneficiaryQuestions(retireAge, currentAge);
                if (Qualify == true)
                    this.state.Eligible_Countries.push({ Country_id: "BR", Name: "Brazil", AnsStatus: this.state.BQP2AnsStatus });
                EligibleCountries.push({ Country_id: "BR", Name: "Brazil", AnsStatus: this.state.BQP2AnsStatus });
                thisObj.setState({
                    isDisabled: Qualify,
                });

                break;
            case "DE":
                Qualify = handleGermanyAgeEligiblity(CountryCode, user_age);
                if (Qualify == true)
                    this.state.Eligible_Countries.push({ Country_id: "DE", Name: "Germany", AnsStatus: this.state.BQP2AnsStatus });
                EligibleCountries.push({ Country_id: "DE", Name: "Germany", AnsStatus: this.state.BQP2AnsStatus });
                thisObj.setState({
                    isDisabled: Qualify,
                });

                break;
            case "IE":
                retireAge = irelandCountry();
                Qualify = allowToEditBeneficiaryQuestions(retireAge, currentAge);
                if (Qualify == true)
                    this.state.Eligible_Countries.push({ Country_id: "IE", Name: "Ireland", AnsStatus: this.state.BQP2AnsStatus });
                EligibleCountries.push({ Country_id: "IE", Name: "Ireland", AnsStatus: this.state.BQP2AnsStatus });
                thisObj.setState({
                    isDisabled: Qualify,
                });

                break;
            case "NL":
                retireAge = netherlandsCountry();
                Qualify = allowToEditBeneficiaryQuestions(retireAge, currentAge);
                if (Qualify == true)
                    this.state.Eligible_Countries.push({ Country_id: "NL", Name: "Netherlands", AnsStatus: this.state.BQP2AnsStatus });
                EligibleCountries.push({ Country_id: "NL", Name: "Netherlands", AnsStatus: this.state.BQP2AnsStatus });
                thisObj.setState({
                    isDisabled: Qualify,
                });

                break;
            case "PT":
                retireAge = portugalCountry();
                Qualify = allowToEditBeneficiaryQuestions(retireAge, currentAge);
                if (Qualify == true)
                    this.state.Eligible_Countries.push({ Country_id: "PT", Name: "Portugal", AnsStatus: this.state.BQP2AnsStatus });
                EligibleCountries.push({ Country_id: "PT", Name: "Portugal", AnsStatus: this.state.BQP2AnsStatus });
                thisObj.setState({
                    isDisabled: Qualify,
                });
                this.benQusEnableDisable(Qualify);
                break;
            default:
                break;
        }
        this.handleBenQusPart2Summary(this);
    }

    benQusEnableDisable() {
        var thisObj = this;
        var count = this.state.Eligible_Countries.length;
        if (count != 0) {
            thisObj.setState({ NavResQus: "/ResidencyQuestionnaries", });
            thisObj.setState({ BenQusDivVisible: false });
            thisObj.setState({ BenQusDivStyle: "social-box box4" });
            thisObj.setState({ BenQusEditBtnVisible: true });
            // thisObj.setState({ BenQusViewBtnVisible: false });
            thisObj.setState({ BenQusEditBtnStyle: "btn btn-warning" });
            thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart1" });
        }
        else {
            thisObj.setState({ NavResQus: "/ResidencyQuestionnaries" });
            thisObj.setState({ ResQusEditBtnVisible: true });
            thisObj.setState({ ResQusCountryViewDivVisible: false });
            thisObj.setState({ ResQusEmployeeViewDivVisible: false });
            thisObj.setState({ ResQusViewBtnVisible: true });
            thisObj.setState({ NavBenQus: "/ApplicantDashboard" });
        }
    }

    // Residency Questionnarie Edit Lockout functionality
    handleCheckRetirementAge(country_code) {
        let Qualify;
        let thisObj = this;
        let user_age = this.state.DOBState;
        let retireAge = [];
        let ECountry = this.state.Eligible_Countries;
        console.log("Eligible countries", ECountry);
        let result = ECountry.findIndex(x => x.Country_id == country_code);

        if (result != -1) {
            switch (country_code) {
                case "UK":
                    retireAge = this.ukCountry(user_age);
                    Qualify = this.checkEligibleUkCountry(retireAge);
                    thisObj.setState({
                        isDisabled: Qualify,
                    });
                    break;
                case "KR":
                    retireAge = this.krCountry(user_age);
                    Qualify = this.checkEligibleCountry(retireAge);
                    thisObj.setState({
                        isDisabled: Qualify,
                    });
                    break;
                case "DK":
                    retireAge = this.denmarkCountry(user_age);
                    Qualify = this.checkEligibleCountry(retireAge);
                    thisObj.setState({
                        isDisabled: Qualify
                    });
                    break;
                case "BE":
                    retireAge = this.belgiumCountry(user_age);
                    Qualify = this.checkEligibleCountry(retireAge);
                    thisObj.setState({
                        isDisabled: Qualify
                    });
                    break;
                case "JP":
                    retireAge = this.japanCountry(user_age);
                    Qualify = this.checkEligibleCountry(retireAge);
                    thisObj.setState({
                        isDisabled: Qualify
                    });
                    break;
                case "AU":
                    retireAge = this.auCountry(user_age);
                    Qualify = this.checkEligibleCountry(retireAge);
                    thisObj.setState({
                        isDisabled: Qualify
                    });
                    break;
                case "NO":
                    retireAge = this.norwayCountry(user_age);
                    Qualify = this.checkEligibleCountry(retireAge);
                    thisObj.setState({
                        isDisabled: Qualify
                    });
                    break;
                default:
                    break;
            }
        } else {
            thisObj.setState({
                isDisabled: false
            });
        }
    }

    //Set retirement age for United kingdom depending upon the applicant DOB
    ukCountry(dob) {
        console.log("UK country");
        let user_age = new Date(dob);
        let retireAge = {
            Age: 0,
            Month: 0,
            countryCode: "UK",
            country: "UNITED KINGDOM"
        }
        if (user_age < new Date("01/06/1954")) {
            retireAge.Age = 65;
            retireAge.Month = 0;
        }
        else if (user_age >= new Date("01/06/1954") && user_age <= new Date("03/05/1954")) {
            retireAge.Age = 65;
            retireAge.Month = 4;
        }
        else if (user_age >= new Date("03/06/1954") && user_age <= new Date("06/05/1954")) {
            retireAge.Age = 65;
            retireAge.Month = 7;
        } else if (user_age >= new Date("06/06/1954") && user_age <= new Date("10/05/1954")) {
            retireAge.Age = 65;
            retireAge.Month = 11;
        } else if (user_age >= new Date("10/06/1954") && user_age <= new Date("04/05/1960")) {
            retireAge.Age = 66;
            retireAge.Month = 0;
        } else if (user_age >= new Date("04/06/1960") && user_age <= new Date("08/05/1960")) {
            retireAge.Age = 66;
            retireAge.Month = 4;
        } else if (user_age >= new Date("08/06/1960") && user_age <= new Date("12/05/1960")) {
            retireAge.Age = 66;
            retireAge.Month = 8;
        } else if (user_age >= new Date("12/06/1960") && user_age <= new Date("04/05/1977")) {
            retireAge.Age = 67;
            retireAge.Month = 0;
        } else if (user_age >= new Date("04/06/1977") && user_age <= new Date("09/05/1977")) {
            retireAge.Age = 67;
            retireAge.Month = 4;
        } else if (user_age >= new Date("09/06/1977") && user_age <= new Date("12/05/1977")) {
            retireAge.Age = 67;
            retireAge.Month = 7;
        } else if (user_age >= new Date("12/06/1977") && user_age <= new Date("04/05/1978")) {
            retireAge.Age = 67;
            retireAge.Month = 11;
        } else {
            retireAge.Age = 68;
            retireAge.Month = 0;
        }
        console.log("Retire age", retireAge.Age + "." + retireAge.Month);
        return retireAge;
    }

    //Set retirement age for denmark depending upon the applicant DOB
    denmarkCountry(dob) {
        let user_age = new Date(dob);
        let retireAge = {
            Age: 0,
            Month: 0,
            countryCode: "DK",
            country: "Denmark"
        }
        if (user_age <= new Date("12/31/1953")) {
            retireAge.Age = 65;
            retireAge.Month = 0;
        }
        else if (user_age >= new Date("01/01/1954") && user_age <= new Date("06/30/1954")) {
            retireAge.Age = 65;
            retireAge.Month = 6;
        }
        else if (user_age >= new Date("07/01/1954") && user_age <= new Date("12/31/1954")) {
            retireAge.Age = 66;
            retireAge.Month = 0;
        } else if (user_age >= new Date("01/01/1955") && user_age <= new Date("06/30/1955")) {
            retireAge.Age = 66;
            retireAge.Month = 6;
        } else if (user_age >= new Date("07/01/1955") && user_age <= new Date("12/31/1962")) {
            retireAge.Age = 67;
            retireAge.Month = 0;
        } else {
            retireAge.Age = 68;
            retireAge.Month = 0;
        }
        return retireAge;
    }

    //Set Korea retirement age 
    krCountry(dob) {
        let user_age = new Date(dob);
        let retireAge = {
            Age: 0,
            Month: 0,
            countryCode: "KR",
            country: "KOREA"
        }
        if (user_age >= new Date("01/01/1953") && user_age <= new Date("12/31/1956")) {
            retireAge.Age = 61;
            retireAge.Month = 0;
        }
        else if (user_age >= new Date("01/01/1957") && user_age <= new Date("12/31/1960")) {
            retireAge.Age = 62;
            retireAge.Month = 0;
        }
        else if (user_age >= new Date("01/01/1961") && user_age <= new Date("12/31/1964")) {
            retireAge.Age = 63;
            retireAge.Month = 0;
        } else if (user_age >= new Date("01/01/1965") && user_age <= new Date("12/31/1968")) {
            retireAge.Age = 64;
            retireAge.Month = 0;
        } else {
            retireAge.Age = 65;
            retireAge.Month = 0;
        }
        return retireAge;
    }

    //Belgium country
    belgiumCountry(dob) {
        let retireAge = {
            Age: 65,
            Month: 0,
            countryCode: "BE",
            country: "BELGIUM"
        }
        return retireAge;
    }

    //France country
    franceCountry(dob) {
        let retireAge = {
            Age: 65,
            Month: 0,
            countryCode: "FR",
            country: "FRANCE"
        }
        return retireAge;
    }

    //Japan country
    japanCountry(dob) {
        let retireAge = {
            Age: 65,
            Month: 0,
            countryCode: "JP",
            country: "JAPAN"
        }
        return retireAge;

    }

    //Australia Country
    auCountry(dob) {
        let retireAge = {
            Age: 45,
            Month: 0,
            countryCode: "AU",
            country: "AUSTRALIA"
        }
        return retireAge;
    }

    //Norway Country
    norwayCountry(dob) {
        let retireAge = {
            Age: 67,
            Month: 0,
            CountryCode: "NO",
            country: "NORWAY"
        }
        return retireAge;
    }

    //Eligibility Checking for UK country
    checkEligibleUkCountry(retireAge) {
        let eligible = false;
        console.log("DOB", this.state.DOBState);
        let user_age = this.state.DOBState;
        let cur_date = moment(new Date()).format('MM/DD/YYYY');
        let userCurrAgeInMonths = parseInt(moment(cur_date).diff(moment(user_age), 'months'));
        let age = parseInt(userCurrAgeInMonths / 12);
        let ageMonth = userCurrAgeInMonths % 12;
        console.log("User age", age + "." + ageMonth);
        if (retireAge.Month == 0) {
            if ((age < retireAge.Age)) {
                if (age == retireAge.Age - 1) {
                    if (ageMonth > 8) {
                        console.log(" not eligible");
                        return eligible = true;
                    } else {
                        console.log("Eligible");
                        return eligible = false;
                    }
                }
                else {
                    console.log(" eligible");
                    return eligible = false;
                }
            }
            else {
                console.log("not eligible");
                return eligible = true;
            }
        } else {
            if (age <= retireAge.Age) {
                if (age == retireAge.Age) {
                    if (retireAge.Month == 4 && ageMonth == 0) {
                        console.log("Eligible");
                        return eligible = false;
                    } else if (retireAge.Month == 7 && ageMonth <= 3) {
                        console.log("Eligible");
                        return eligible = false;
                    } else if (retireAge.Month == 8 && ageMonth <= 4) {
                        console.log("Eligible");
                        return eligible = false;
                    } else if (retireAge.Month == 11 && ageMonth <= 7) {
                        console.log("Eligible");
                        return eligible = false;
                    }
                    else {
                        console.log("Not Eligible");
                        return eligible = true;
                    }
                }
                else {
                    console.log("Eligible");
                    return eligible = false;
                }
            }
            else {
                console.log("Not eligible");
                return eligible = true;
            }
        }
    }

    // Eligibility Checking for round retirement age
    checkEligibleCountry(retireAge) {
        let eligible = false;
        let user_age = this.state.DOBState;
        console.log("DOB", this.state.DOBState);
        let cur_date = moment(new Date()).format('MM/DD/YYYY');
        let userCurrAgeInMonths = parseInt(moment(cur_date).diff(moment(user_age), 'months'));
        let age = parseInt(userCurrAgeInMonths / 12);
        let ageMonth = userCurrAgeInMonths % 12;
        console.log("Retire age", retireAge.Age + "." + retireAge.Month);
        console.log("User current age", age + "." + ageMonth);
        if (retireAge.Month == 0) {
            if ((age < retireAge.Age)) {
                if (age == retireAge.Age - 1) {
                    if (ageMonth > 8) {
                        console.log("Not eligible");
                        return eligible = true;
                    } else {
                        console.log("Eligible");
                        return eligible = false;
                    }
                }
                else {
                    console.log(" Eligible");
                    return eligible = false;
                }
            }
            else {
                console.log("Not eligible");
                return eligible = true;
            }
        } else {
            if (age <= retireAge.Age) {
                if (age == retireAge.Age) {
                    if (ageMonth <= 2) {
                        console.log("Eligible");
                        return eligible = false;
                    }
                    else {
                        console.log("Not Eligible");
                        return eligible = true;
                    }
                }
                else {
                    console.log("Eligible");
                    return eligible = false;
                }

            }
            else {
                console.log("Not eligible");
                return eligible = true;
            }
        }
    }

    checkEligibleNoCountry(retireAge) {
        let eligible = false;
        let dob = this.state.DOBState;
        let user_age = new Date(dob);
        let cur_date = moment(new Date()).format('MM/DD/YYYY');
        let userCurrAgeInMonths = parseInt(moment(cur_date).diff(moment(user_age), 'months'));
        let age = parseInt(userCurrAgeInMonths / 12);
        let ageMonth = userCurrAgeInMonths % 12;

        console.log("user age", age + "." + ageMonth);
        if (retireAge.Month == 0) {
            console.log('inside the');
            if ((age < retireAge.Age)) {
                if (age == retireAge.Age - 1) {
                    if (ageMonth > 8) {
                        return eligible = true;
                    } else {
                        return eligible = false;
                    }
                } else {
                    return eligible = false;
                }
            } else {
                return eligible = false;
            }
        } else {
            return eligible = false;
        }
    }

    handleDocumentStatusRead(e) {

        let VolContributeAPIurl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let VolContributeJSONData = "";
        VolContributeJSONData = {
            UserID: emailresult,
            QueryName: "VoluntaryContributeStatus"
        }

        SaveDataAPICallMailSend(VolContributeAPIurl, VolContributeJSONData)
            .then((data) => {
                console.log("voluntary contribution status::", data);
                // let QueryString = data[0].VolContributeForm == "C" ? "DashboardDocumentsTrackingRead" : "DashboardPendingDocumentsTrackingRead";
                //let QueryString = "DashboardDocumentsTrackingRead";
                let QueryString = data[0].VolContributeForm == "C" ? "DashboardPendingDocumentsTrackingRead" : "DashboardDocumentsTrackingRead";
                let DocumentStatusInput = {
                    UserID: emailresult,
                    QueryName: QueryString
                }
                console.log(JSON.stringify(DocumentStatusInput));
                SaveDataAPICallMailSend(VolContributeAPIurl, DocumentStatusInput)
                    .then((data) => {
                        this.setState({ DocumenttableData: data });
                        console.log("Document Table Data", data);
                    }).catch((err) => {
                        console.log(err);
                    });
            }).catch((err) => {
                console.log(err);
            });

        // // let DocAPIurl = "https://j508jr42tb.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentTracking_Lambda";
        // let DocAPIurl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        // let DocReadJSONData = JSON.stringify({
        //     // QueryName: "Read",
        //     QueryName: "DashboardDocumentsTrackingRead",
        //     UserID: emailresult, //"mark@markweitner.com",
        // });
        // console.log("DocReadJSONData", DocReadJSONData);
        // let AxiosHeaderConfig = {
        //     "Content-Type": "application/json",
        //     "Access-Control-Request-Headers": "*",
        //     "Access-Control-Request-Method": "*",
        // }
        // axios({
        //     method: "POST",
        //     url: DocAPIurl,
        //     data: DocReadJSONData,
        //     //headers: AxiosHeaderConfig,

        // }).then((data) => {
        //     console.log("DOC Table Data", data.data);
        //     this.setState({ DocumenttableData: data.data });
        // }).catch((err) => {

        // })
    }


    handleAppGenQusSummary(event) {
        var thisObj = this;
        let UserID;
        // let AppGenQusSumAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let AppGenQusSumAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let AppGenQusSumAutoJSONData = JSON.stringify({
            QueryName: "GenQusSum",
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
            url: AppGenQusSumAutoAPIUrl,
            data: AppGenQusSumAutoJSONData,
            //headers:AxiosHeaderConfig, 
        }).then(({ data }) => {
            console.log("DATA==>" + data);
            for (var i = 0; i < data.length; i++) {
                //General Summary
                thisObj.setState({ ProfileImgState: data[i].ProfileImg });
                thisObj.setState({ FirstNameState: data[i].FirstName });
                thisObj.setState({ LastNameState: data[i].LastName });
                thisObj.setState({ DOBState: data[i].DOB_Day + " " + data[i].DOB_Month + " " + data[i].DOB_Year });
                // thisObj.setState({ DOBState: data[i].DOB });

                thisObj.setState({ CountryCodeState: data[i].CountryCode });
                thisObj.setState({ GenderState: data[i].Gender });
                thisObj.setState({ CitizenshipState: data[i].CountryOfCitizenship });
                thisObj.setState({ EmployeeTypeState: data[i].EmployeeType });
            }
            //thisObj.handleAppProcessFlowRead(thisObj);
        }).catch((err) => {
        })
    }

    handleAppResQusSummary(event) {
        var thisObj = this;
        let UserID;
        //let AppResQusSumAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let AppResQusSumAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let AppResQusSumAutoJSONData = JSON.stringify({
            QueryName: "ResQusSum",
            UserID: emailresult,
            DocumentID: 54
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
            url: AppResQusSumAutoAPIUrl,
            data: AppResQusSumAutoJSONData,
            //headers:AxiosHeaderConfig, 
        }).then(({ data }) => {
            thisObj.setState({ tableData: data });
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ ResCountryState: data[i].ResCountry });
                thisObj.setState({ eligiblestate: data[i].Eligiliblity });
                // if(data[i].Eligiliblity=="Yes"){
                //     this.setState({isEnabled:false})
                //     alert(this.state.isEnabled);
                //    }
                //    else{
                //        this.setState({isEnabled:true})
                //        alert(this.state.isEnabled);
                //    }
                //thisObj.props.setResidencyCountry(data[i].ResCountry);
            }
            //thisObj.props.setResidencyCountry(data);
        }).catch((err) => {
            console.log(err);
        })
        // this.setState({isEnabled:"false"});
    }

    handleAppResQusEmp(event) {
        var thisObj = this;
        let UserID;
        //let AppResQusEmpAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let AppResQusEmpAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let AppResQusEmpAutoJSONData = JSON.stringify({
            QueryName: "ResQusEmp",
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
            url: AppResQusEmpAutoAPIUrl,
            data: AppResQusEmpAutoJSONData,
            //headers:AxiosHeaderConfig, 
        }).then(({ data }) => {
            thisObj.setState({ tableData2: data });

        }).catch((err) => {
            console.log(err);
        })
    }

    handleAppBenQusSummary(event) {
        var thisObj = this;
        let UserID;
        //let AppBenQusSumAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let AppBenQusSumAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let AppBenQusSumAutoJSONData = JSON.stringify({
            QueryName: "BenQusSum",
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
            url: AppBenQusSumAutoAPIUrl,
            data: AppBenQusSumAutoJSONData,
            //headers:AxiosHeaderConfig, 
        }).then(({ data }) => {
            //console.log("data" + data);
            for (var i = 0; i < data.length; i++) {
                //Benfits Summary 
                thisObj.setState({ HomeAddressState: data[i].HomeAddress });
                thisObj.setState({ PlaceOfBirthState: data[i].PlaceOfBirth });
                thisObj.setState({ CompanyNameState: data[i].CompanyCode });
                thisObj.setState({ IndustryNameState: data[i].IndustryName });
                thisObj.setState({ EligibleCountryFlagState: data[i].EligibleCountryFlag });
                thisObj.setState({ EligibleCountryState: data[i].EligibleCountry });
            }
        }).catch((err) => {
        })
    }

    handleBenQusPart2Summary(event) {
        var thisObj = this;
        let UserID;
        //let AppBenQusSumAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let AppBenQusPart2SumAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let AppBenQusPart2SumAutoJSONData = JSON.stringify({
            QueryName: "BenQusPart2Summary",
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
            url: AppBenQusPart2SumAutoAPIUrl,
            data: AppBenQusPart2SumAutoJSONData,
            //headers:AxiosHeaderConfig, 
        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ Part2Summarytable: data });
            }

            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < EligibleCountries.length; j++) {
                    if (data[i].CountryCode == EligibleCountries[j].Country_id) {
                        EligibleCountries[j].AnsStatus = data[i].BQP2AnsStatus;
                    }
                }
            }

            console.log("Disable", this.state.DisabledSate)
        }).catch((err) => {
            console.log(err)
        })
    }


    handleDocumentStatus(e) {
        var thisObj = this;
        let UserID;
        //let DocStatusAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let DocStatusAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let DocStatusJSONData = JSON.stringify({
            QueryName: "StatusInfo",
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
            url: DocStatusAPIUrl,
            data: DocStatusJSONData,
            //headers:AxiosHeaderConfig, 
        }).then(({ data }) => {
            //console.log("data" + data);
            for (var i = 0; i < data.length; i++) {
                //Benfits Summary 
                if (data[i].DocumentName == "Power Of Attorney" && data[i].IsSend == "Y") {
                    thisObj.setState({ POAsentState: "Sent" });
                }
                else if (data[i].DocumentName == "Power Of Attorney" && data[i].IsReceived == "Y") {
                    thisObj.setState({ POAReceivedState: "Received" });
                }
                if (data[i].DocumentName == "Decision Letter" && data[i].IsSend == "Y") {
                    thisObj.setState({ DLsentState: "Sent" });
                }
                else if (data[i].DocumentName == "Decision Letter" && data[i].IsReceived == "Y") {
                    thisObj.setState({ DLReceivedState: "Received" });
                }
                if (data[i].DocumentName == "Forecast Letter" && data[i].IsSend == "Y") {
                    thisObj.setState({ FCLsentState: "Sent" });
                }
                else if (data[i].DocumentName == "Forecast Letter" && data[i].IsReceived == "Y") {
                    thisObj.setState({ FCLReceivedState: "Received" });
                }
                if (data[i].DocumentName == "Pension Letter" && data[i].IsSend == "Y") {
                    thisObj.setState({ PLsentState: "Sent" });
                }
                else if (data[i].DocumentName == "Pension Letter" && data[i].IsReceived == "Y") {
                    thisObj.setState({ PLReceivedState: "Received" });
                }
                if (data[i].DocumentName == "Bilateral From" && data[i].IsSend == "Y") {
                    thisObj.setState({ BLFsentState: "Sent" });
                }
                else if (data[i].DocumentName == "Bilateral From" && data[i].IsReceived == "Y") {
                    thisObj.setState({ BLFReceivedState: "Received" });
                }
            }
        }).catch((err) => {
        })
    }
    handleOpenGenQusModel() {
        this.setState({ GenQusModelShow: true });
    }
    handleOpenResQusModel(ResCountry, ResQusID) {
        this.handleCheckRetirementAge(ResCountry);
        this.setState({ ResQusModelShow: true }, () => {
            this.handleCountryRead(ResCountry, ResQusID);
        });
    }
    handleOpenResQusEmpModel(EmpCompanyID) {
        this.setState({ ResQusEmpModelShow: true }, () => {
            this.handleCompanyRead(EmpCompanyID);
        });
    }
    hanleOpenManiResQusModel() {
        this.setState({ MainResQusModelShow: true });
    }
    handleOpenBenQusModel() {
        this.setState({ BenQusModelShow: true });
    }
    handleEditGenQus() {
        history.push('/GeneralQuestionnarie?UserID=' + emailresult);
    }
    handleEditBenQus(e) {
        history.push('/BenefitsQuestionnariePart1?UserID=' + emailresult);
    }
    handleEditBenQusUK(e) {
        history.push('/BenefitsQuestionnariePart2?CountryCode=' + "UK");
    }
    handleNavHowToStart(event) {
        history.push(this.state.NavHowToStart);
    }
    handleNavGenQus(event) {
        history.push(this.state.NavGenQus);
    }
    handleNavResQus(event) {
        history.push(this.state.NavResQus);
    }
    handleNavBenQus(event) {
        if (this.state.ResQusEditBtnVisible == "true") {
            history.push(this.state.NavBenQus);
        }
        else {
            this.setState({ BenefitCountrypopup: true });
        }
    }

    ProcessButton(cell, row, enumObject, rowIndex) {
        let groupExistsInDatabase = false;
        for (var group in this.state.eligiblestate) {
            if (row.Eligiliblity == "Yes") {
                return (
                    <div>
                        <Button disabled={!groupExistsInDatabase} bsStyle="info" className="btnStyle" onClick={() => this.handlebenefitredirect(row.Country_id)} title="Process">Process</Button>
                    </div>);

            }
            else {
                <div>
                    <Button disabled={groupExistsInDatabase} bsStyle="info" className="btnStyle" onClick={() => this.handlebenefitredirect(row.Country_id)} title="Process">Process</Button>
                </div>

            }
        }
    }


    BenefitProcess(cell, row, enumObject, rowIndex) {
        let groupExistsInDatabase = false;
        if (row.AnsStatus == 'C') {
            return (
                <div>
                    <Button disabled={!groupExistsInDatabase} bsStyle="info" className="btnStyle" onClick={() => this.handlebenefitredirect(row.Country_id, row.Name)} title="Process">Process</Button>
                </div>);
        }
        else {
            return (
                <div>
                    <Button disabled={groupExistsInDatabase} bsStyle="info" className="btnStyle" onClick={() => this.handlebenefitredirect(row.Country_id, row.Name)} title="Process">Process</Button>
                </div>
            );
        }
    }
    handlebenefitredirect(event, Name) {
        if (this.state.BenefitComplete == "") {
            history.push('/BenefitsQuestionnariePart1?CountryCode=' + event + '&CountryName=' + Name);
        }
        else {
            history.push('/BenefitsQuestionnariePart2?CountryCode=' + event + '&Mode=N');
        }
    }

    imageFormatter(cell, row) {
        return ("<img src='" + row.ResCountryFlag + "'/>")
    }
    ViewButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <a className="anchorView" onClick={() => this.handleOpenResQusModel(row.ResCountry, row.ResQusID)}> {row.ResCountryName} </a>
                <MainResidencySummary TestData={this.state.TemptableData} CountryselectedName={this.state.SelectedCountry} show={this.state.ResQusModelShow} onHide={() => this.setState({ ResQusModelShow: false })} />
            </div>
        )
    }
    StatusButton(cell, row, enumObject, rowIndex) {
        // console.log(row);
        return (
            <div>
                <Button bsStyle="info" className="btnStyle" onClick={() => this.handleApplicantDocTrackingEdit(row)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
            </div>
        )

    }

    CountryimageFormatter(cell, row) {
        return ("<img src='" + row.CountryFlag + "'/>")
    }
    CountryEdit(cell, row, enumObject, rowIndex) {

        let groupExistsInDatabase = false;
        if (row.BQP2CompStatus == "C") {
            groupExistsInDatabase = !groupExistsInDatabase;
        }
        return (
            <div>
                <Button disabled={groupExistsInDatabase} bsStyle="warning" className="btnStyle"
                    onClick={() => this.handleBenQusPart2Edit(row)}
                    title="Edit">Edit</Button>
            </div>
        )
    }
    handleBenQusPart2Edit(row) {
        history.push('/BenefitsQuestionnariePart2?CountryCode=' + row.CountryCode + '&Mode=E' + '&BenQusCNIGPAID=' + row.BenQusCNIGPAID + '&CountryName=' + row.CountryName + '&DocumentCode=' + row.DocumentCode);
    }

    CompanySums(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <a onClick={() => this.handleOpenResQusEmpModel(row.EmpCompanyID)}>{row.CompanyCode}</a>
                {/* <CompanySummary TestData={this.state.Companytable} show={this.state.ResQusEmpModelShow} onHide={() => this.setState({ ResQusEmpModelShow: false })} /> */}
            </div>
        )
    }

    handleApplicantDocTrackingEdit(docObject) {
        this.setState({ DocName: docObject.DocumentName });
        if (docObject.DocumentID != '74') {
            this.setState({ volcontributemodal: 0 });
        }
        // power of attorney generation.
        if (docObject.DocumentID == 39) {
            if ((docObject.IsApplicantReceived == "Yes") && (docObject.IsGPAReceived == "Yes") && (docObject.GTGIsSend == "Y") && (docObject.GTGIsReceived == "Y")) {
                this.setState({
                    dashboard_msg: "test msg",
                    modalShow: true
                });
            }
            else if ((docObject.IsApplicantReceived == "Yes") && (docObject.IsGPAReceived == "Yes") && (docObject.GTGIsSend == "Y") && (docObject.GTGIsReceived == "N")) {
                this.setState({
                    dashboard_msg: "We have received your signed notarized Power Of Attorney document for the country" + "\t" + docObject.CountryName + "and we have sent to the government and we will get back to you once the country response is received",
                    modalShow: true
                });
            }
            else if ((docObject.IsApplicantReceived == "Yes") && (docObject.IsGPAReceived == "Yes") && (docObject.GTGIsSend == "N") && (docObject.GTGIsReceived == "N")) {
                this.setState({
                    dashboard_msg: "We have received your signed notarized Power Of Attorney document for the country" + "\t" + docObject.CountryName + " and we will send to the government once process is completed",
                    modalShow: true
                });
            }
            else if ((docObject.IsApplicantReceived == "Yes") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "N") && (docObject.GTGIsReceived == "N")) {
                this.setState({
                    dashboard_msg: "We have not received your signed Power Of Attorney document for the country" + "\t" + docObject.CountryName + ", can you please send the document with notarized signed copy",
                    modalShow: true
                });
            }
        }
        // forecast letter generation.            
        else if (docObject.DocumentID == 62) {
            console.log("docObject", docObject);
            if ((docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "Y") && (docObject.GTGIsReceived == "Y")) {
                this.setState({
                    dashboard_msg: "We have received country response for the country " + "\t" + docObject.CountryName + "\t" + "and have mailed the country response to your mail",
                    modalShow: true
                });
            }
            else if ((docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "Y") && (docObject.GTGIsReceived == "N")) {
                this.setState({
                    dashboard_msg: "We have generated your forecast letter for the country" + "\t" + docObject.CountryName + " and we have sent to the government and we will get back to you once the country response is received",
                    modalShow: true
                });
            }
            else if ((docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "N") && (docObject.GTGIsReceived == "N")) {
                this.setState({
                    dashboard_msg: "We have generated your forecast letter for the country" + "\t" + docObject.CountryName + " and we will send to the government once process is completed",
                    modalShow: true
                });
            }
        }
        // voluntary contribution form.
        else if (docObject.DocumentID == 74) {
            console.log("DOC Object::" + JSON.stringify(docObject));
            if (docObject.VolContributeForm == "P") {

                this.setState({
                    volcontributemodal: 1,
                    dashboard_msg: docObject.Notification_LongMsg,
                    modalShow: true
                });

            }
            else if ((docObject.VolContributeForm == "C") && (docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "Y") && (docObject.GTGIsReceived == "Y")) {
                this.setState({
                    dashboard_msg: "test msg",
                    modalShow: true
                });
            }
            else if ((docObject.VolContributeForm == "C") && (docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "Y") && (docObject.GTGIsReceived == "N")) {
                this.setState({
                    dashboard_msg: "We have generated your voluntary contribution form for the country" + "\t" + docObject.CountryName + " and we have sent to the government and we will get back to you once the country response is received",
                    modalShow: true
                });
            }
            else if ((docObject.VolContributeForm == "C") && (docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "N") && (docObject.GTGIsReceived == "N")) {
                this.setState({
                    dashboard_msg: "We have generated your voluntary contribution form for the country" + "\t" + docObject.CountryName + " and we will send to the government once process is completed",
                    modalShow: true
                });
            }
        }
        // pension application.
        else if (docObject.DocumentID == 75) {
            if ((docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "Y") && (docObject.GTGIsReceived == "Y")) {
                this.setState({
                    dashboard_msg: "test msg",
                    modalShow: true
                });
            }
            else if ((docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "Y") && (docObject.GTGIsReceived == "N")) {
                this.setState({
                    dashboard_msg: "We have generated your pension application form for the country" + "\t" + docObject.CountryName + " and we have sent to the government and we will get back to you once the country response is received",
                    modalShow: true
                });
            }
            else if ((docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "N") && (docObject.GTGIsReceived == "N")) {
                this.setState({
                    dashboard_msg: "We have generated your pension application for the country" + "\t" + docObject.CountryName + " and we will send to the government once process is completed",
                    modalShow: true
                });
            }
        } else if (docObject.DocumentID == 77) {
            if ((docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "Y") && (docObject.GTGIsReceived == "Y")) {
                this.setState({
                    dashboard_msg: "test msg",
                    modalShow: true
                });
            }
            else if ((docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "Y") && (docObject.GTGIsReceived == "N")) {
                this.setState({
                    dashboard_msg: "We have generated your lump sum application form for the country" + "\t" + docObject.CountryName + " and we have sent to the government and we will get back to you once the country response is received",
                    modalShow: true
                });
            }
            else if ((docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "N") && (docObject.GTGIsReceived == "N")) {
                this.setState({
                    dashboard_msg: "We have generated your lump sum application for the country" + "\t" + docObject.CountryName + " and we will send to the government once process is completed",
                    modalShow: true
                });
            }
        }

        //Bank form
        else if (docObject.DocumentID == 76) {
            if ((docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "Y") && (docObject.GTGIsReceived == "Y")) {
                this.setState({
                    dashboard_msg: "test msg",
                    modalShow: true
                });
            }
            else if ((docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "Y") && (docObject.GTGIsReceived == "N")) {
                this.setState({
                    dashboard_msg: "We have generated your Bank  application form for the country" + "\t" + docObject.CountryName + " and we have sent to the government and we will get back to you once the country response is received",
                    modalShow: true
                });
            }
            else if ((docObject.IsApplicantReceived == "Not Required") && (docObject.IsGPAReceived == "Not Required") && (docObject.GTGIsSend == "N") && (docObject.GTGIsReceived == "N")) {
                this.setState({
                    dashboard_msg: "We have generated your Bank  application form for the country" + "\t" + docObject.CountryName + " and we will send to the government once process is completed",
                    modalShow: true
                });
            }
        }
    }
    CompanySum(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button onClick={() => this.handleOpenResQusEmpModel(row.EmpCompanyID)}>View</Button>
                {/* <CompanySummary TestData={this.state.Companytable} show={this.state.ResQusEmpModelShow} onHide={() => this.setState({ ResQusEmpModelShow: false })} /> */}
            </div>
        )
    }
    handleEligibilitycheck(event) {

        if (this.state.eligiblestate == "Yes") {
            this.setState({ isEnabled: false })
            //alert(this.state.isEnabled);
        }
        else {
            this.setState({ isEnabled: true })
            //alert(this.state.isEnabled);
        }

    }
    ProcessButton(cell, row, enumObject, rowIndex) {
        let groupExistsInDatabase = false;
        for (var group in this.state.eligiblestate) {
            if (row.Eligiliblity == "Yes") {
                return (
                    <div>
                        <Button disabled={groupExistsInDatabase} onClick={() => this.handleAllMailConditions(row.ResCountry)} bsStyle="primary">Process</Button>
                        <Notifications />
                    </div>);

            }
            else {
                return (<Button disabled={!groupExistsInDatabase} onClick={() => this.handleAllMailConditions(row.ResCountry)} bsStyle="primary">Process</Button>);

            }
        }
    }
    LinkButton(cell, row, enumObject, rowIndex) {
        return (
            <button type="button" class={this.state.ResQusPrintBtnStyle} onClick={() => window.open(row.DecisionLetterLink, "_blank")}>Print</button>
        )
    }

    handleAllMailConditions(event) {
        let SavePOAdata = "";
        let GeneralInputData = {
            UserID: emailresult,
            CountryCode: event,
            //DocumentCode:'ATR',            
            QueryName: "StoreDocuments",
        }
        // alert(JSON.stringify(GeneralInputData));

        let GeneralDataURL = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda";

        let SavePOALetterURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";
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
                    this.setState({ DocumentIDstate: item.EmpID })
                    //alert(this.state.DocumentIDstate);

                });
                //alert(JSON.stringify(SavePOAdata))  ;
                let POAletterurl = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
                let POAInputData = {
                    "MainFolderName": "applicant",
                    "SubFolderName": emailresult,
                    "MailDocName": "POA",
                    "LangCode": "en",
                    "EmailTo": emailresult,//"spurthi.n@mitosistech.com"//"easwaran.k@mitosistech.com"
                }

                let StatusURL1 = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda"
                let StatusInput1 = {
                    "QueryName": "TrackDoc",
                    UserID: emailresult,//"spurthi.n@mitosistech.com",//this.props.LoginData.LUserID,
                    DocumentID: 39,
                    DocumentCode: this.state.DocumentIDstate,
                    CountryCode: event,
                    //CountryCode: this.state.CountryState,
                    IsSend: "Y",
                    SendDate: moment(new Date()).format('DD/MM/YYYY'),
                }
                if (this.state.eligiblestate == "Yes") {
                    //Save POA letter auto populated
                    SaveDataAPICallMailSend(SavePOALetterURL, SavePOAdata)
                        .then((data) => {
                            console.log("POA letter saved in s3 buckets", data);
                            SaveDataAPICallMailSend(POAletterurl, POAInputData)
                                .then((data) => {
                                    console.log("POA letter sent successfully", data);
                                    notify.show("Power of attorney email sent successfully", "success", 3000);
                                    SaveDataAPICallMailSend(StatusURL1, StatusInput1)
                                        .then((data) => {
                                            console.log("POA letter sent status tracking saved in DB", data);
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
                            //this.handleAppProcessFlowUpdate(this);  
                        }).catch((err) => {
                            console.log("error sending email");
                            console.log("Read::", SavePOAdata)
                        });
                }

            }).catch((err) => {
                console.log(err);
            });
    }
    //Flow Update Function
    handleAppProcessFlowUpdate(event) {
        //let AppProFlowAPIUrl = "https://qxredca9lk.execute-api.us-west-2.amazonaws.com/Dev/GPA_AppProcessFlowDatas_Lambda";
        let AppProFlowAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify({
            //QueryName: "UpdateRQ",
            QueryName: "ApplicantProcessFlowTrackingUpdateRQ",
            UserID: emailresult,
            ResQus: "C"
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
            //history.push('/ApplicantDashboard');
        }).catch((err) => {

        })
    }
    // handleCountryRead(ResCountry, ResQusID) {
    //     var thisObj = this;
    //     //let CountryAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
    //     let CountryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
    //     let CJSONData = JSON.stringify(
    //         {
    //             QueryName: "ResRead",
    //             ResQusID: ResQusID,
    //             ResCountry: ResCountry,
    //         });
    //     let AxiosHeaderConfig = {
    //         headers: {
    //             // accept: 'application/json',
    //             "Access-Control-Request-Headers": "*",
    //             "Access-Control-Request-Method": "*",
    //             'Content-Type': 'application/json;charset=UTF-8',
    //             // "Access-Control-Allow-Origin": "*",
    //         }
    //     };
    //     axios({
    //         method: "POST",
    //         url: CountryAPIUrl,
    //         data: CJSONData

    //     }).then(({ data }) => {
    //         thisObj.setState({ TemptableData: data });
    //         for (var i = 0; i < data.length; i++) {
    //             thisObj.setState({ SelectedCountry: data[i].CountryName });
    //         }
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }

    handleCountryRead(ResCountry, ResQusID) {
        var thisObj = this;
        //let CountryAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let CountryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let CJSONData = JSON.stringify(
            {
                QueryName: "ResRead",
                ResQusID: ResQusID,
                ResCountry: ResCountry,
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
            url: CountryAPIUrl,
            data: CJSONData

        }).then(({ data }) => {
            thisObj.setState({ TemptableData: data });
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ SelectedCountry: data[i].CountryName });
            }
            for (let i = 0; i < this.state.TemptableData.length; i++) {
                this.state.TemptableData[i]['disabled'] = this.state.isDisabled;
            }
            thisObj.setState({ isDisabled: false });
        }).catch((err) => {
            console.log(err)
        })
    }

    handleCompanyRead(event) {
        var thisObj = this;
        //let DasboardSummaryAPIUrl = "https://s54tz3kyzh.execute-api.us-west-2.amazonaws.com/Dev/GPA_ResQusDatas_Lambda";
        let DasboardSummaryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var Empdata = JSON.stringify({
            QueryName: "CompanySummary",
            EmpCompanyID: event,
        });
        console.log(Empdata);
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: DasboardSummaryAPIUrl,
            data: Empdata,
            headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ CompanyState: data[i].CompanyCode });
                thisObj.setState({ CmpAddressState: data[i].CompanyAddress })
                thisObj.setState({ EntitleGPAContactState: data[i].EntitleGPAContact });
                thisObj.setState({ EmployeeClosedPlanState: data[i].EmployeeClosedPlan });
                thisObj.setState({ BestOfKnowledgeState: data[i].BestOfKnowledge });
                thisObj.setState({ ClosedPlanState: data[i].ClosedPlan });
            }

        }).catch((err) => {
            console.log("DATA ", err);
        });
    }
    render() {
        let GenQusModelHide = () => this.setState({ GenQusModelShow: false });
        let ResQusModelHide = () => this.setState({ ResQusModelShow: false });
        let MainResQusModelHide = () => this.setState({ MainResQusModelShow: false });
        let BenQusModelHide = () => this.setState({ BenQusModelShow: false });
        const { tableData, tableData2, DocumenttableData, Part2Summarytable } = this.state;


        //const isEnabled = this.handleEligibilitycheck(this);
        return (
            <div className="mainContainer">
                {/* <Paper zDepth={1} className="CommonDiv1">
                    <Grid>
                        <Col md={9}>
                        </Col>
                        <Col md={12} xs={12}>
                            <div className="NewDesign">
                                <h3>Steps to follows</h3>
                                <div class="row">
                                    <div class="col-md-3 col-sm-6">
                                        <li class="steps__item" disabled={false}>
                                            <div class="social-box facebook" id="facebookDiv" onClick={this.handleNavHowToStart.bind(this)}>
                                                <h4>How to Start the Process Details</h4>
                                                <i class="fa fa-hourglass-start"></i>
                                            </div>
                                            <div class="social-box1">
                                                <button type="button" disabled={this.state.HowToStartPrintBtnVisible} class="btn btn-success PrintBtn" onClick={() => window.open("https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/template/questions/howtostart.pdf", "_blank")}>Print</button>
                                            </div>
                                        </li>
                                    </div>

                                    <div class="col-md-3 col-sm-6">
                                        <li class="steps__item" disabled={this.state.GenQusDivVisible}>
                                            <div class={this.state.GenQusDivStyle} id="TwitterDiv" onClick={this.handleNavGenQus.bind(this)}>
                                                <h4>General Questionnaire <br/>Details</h4>
                                                <i class="fa fa-venus-mars"></i>
                                            </div>
                                            <div class="social-box1">
                                                <ul>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.GenQusPrintBtnVisible} class={this.state.GenQusPrintBtnStyle} onClick={() => window.open("https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/template/questions/genqus.pdf", "_blank")}>Print</button></strong>
                                                    </li>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.GenQusEditBtnVisible} class={this.state.GenQusEditBtnStyle} onClick={this.handleEditGenQus.bind(this)}>Edit</button></strong>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </div>

                                    <div class="col-md-3 col-sm-6">
                                        <li class="steps__item" disabled={this.state.ResQusDivVisible}>
                                            <div class={this.state.ResQusDivStyle} id="LinkedInDiv" onClick={this.handleNavResQus.bind(this)}>
                                                <h4>Residency & Employment Questionnaire Details</h4>
                                                <i class="fa fa-home"></i>
                                            </div>
                                            <div class="social-box1">
                                                <ul>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.ResQusPrintBtnVisible} class={this.state.ResQusPrintBtnStyle} onClick={() => window.open("https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/template/questions/resqus.pdf", "_blank")}>Print</button></strong>
                                                    </li>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.ResQusEditBtnVisible} class={this.state.ResQusEditBtnStyle} onClick={this.hanleOpenManiResQusModel.bind(this)}>Edit</button></strong>
                                                        <SubResidencySummary show={this.state.MainResQusModelShow} onHide={MainResQusModelHide} />
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </div>

                                    <div class="col-md-3 col-sm-6">
                                        <li class="steps__item" disabled={this.state.BenQusDivVisible}>
                                            <div class={this.state.BenQusDivStyle} id="GooglePlusDiv" onClick={this.handleNavBenQus.bind(this)}>
                                                <h4>Benefits Questionnaire <br/>Details</h4>
                                                <i class="fa fa-suitcase"></i>
                                            </div>
                                            <div class="social-box1">
                                                <ul>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.BenQusPrintBtnVisible} class={this.state.BenQusPrintBtnStyle} onClick={() => window.open("https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/template/questions/benqus.pdf", "_blank")}>Print</button></strong>
                                                    </li>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.BenQusEditBtnVisible} class={this.state.BenQusEditBtnStyle} onClick={this.handleEditBenQus.bind(this)}>Edit</button></strong>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Grid>
                </Paper> */}
                <Row className="row-padd">
                    <Col xs={12} md={12}>
                        <div zDepth={1} className="StepsfollowDiv">
                            <h3 className="stepHeading">Steps to follows</h3>
                            <div className="grid-cont">
                                <div className="row-padd">
                                    <div class="col-md-3 col-sm-6">
                                        <li class="steps__item" disabled={this.state.HowToStartDivVisible}>
                                            <div class="db-gridbox">
                                                <div class="social-box box1" id="facebookDiv" onClick={this.handleNavHowToStart.bind(this)}>
                                                    <div className="gridhead">
                                                        <div className="gridIcon"><i class="fa fa-hourglass-start"></i></div>
                                                        <div className="gridHading"><h4>How to Start the Process Details</h4></div>
                                                    </div>
                                                </div>
                                                <div class="social-box1">
                                                    <button type="button" disabled={this.state.HowToStartPrintBtnVisible} class="btn btn-success PrintBtn" onClick={() => window.open("https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/template/questions/howtostart.pdf", "_blank")}>
                                                        <i class="fa fa-eye" aria-hidden="true" />View</button>
                                                </div>
                                            </div>
                                        </li>
                                    </div>

                                    <div class="col-md-3 col-sm-6">
                                        <li class="steps__item" disabled={this.state.GenQusDivVisible}>
                                            <div class="db-gridbox">
                                                <div class={this.state.GenQusDivStyle} id="TwitterDiv" onClick={this.handleNavGenQus.bind(this)}>
                                                    <div className="gridhead">
                                                        <div className="gridIcon"><i class="fa fa-venus-mars"></i></div>
                                                        <div className="gridHading"><h4>General Questionnaire <br />Details</h4></div>
                                                    </div>
                                                </div>
                                                <div class="social-box1">

                                                    <button type="button" disabled={this.state.GenQusPrintBtnVisible} class="PrintBtn" class={this.state.GenQusPrintBtnStyle} onClick={this.handleOpenGenQusModel.bind(this)}><i class="fa fa-eye" aria-hidden="true" />View</button>
                                                    <button type="button" disabled={this.state.GenQusEditBtnVisible} class={this.state.GenQusEditBtnStyle} onClick={this.handleEditGenQus.bind(this)}><i class="fa fa-pencil" aria-hidden="true" />Edit</button>
                                                </div>
                                            </div>
                                        </li>
                                    </div>

                                    <div class="col-md-3 col-sm-6">
                                        <li class="steps__item" disabled={this.state.ResQusDivVisible}>
                                            <div class="db-gridbox">
                                                <div class={this.state.ResQusDivStyle} id="LinkedInDiv" onClick={this.handleNavResQus.bind(this)}>
                                                    <div className="gridhead">
                                                        <div className="gridIcon"><i class="fa fa-home"></i></div>
                                                        <div className="gridHading"><h4>Residency & Employment Questionnaire Details</h4></div>
                                                    </div>
                                                </div>
                                                <div class="social-box1">
                                                    <button type="button" disabled={this.state.ResQusPrintBtnVisible} class={this.state.ResQusPrintBtnStyle} onClick={() => window.open("https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/template/questions/resqus.pdf", "_blank")}>
                                                        <i class="fa fa-eye" aria-hidden="true" />View</button>
                                                    <button type="button" disabled={this.state.ResQusEditBtnVisible} class={this.state.ResQusEditBtnStyle} onClick={this.hanleOpenManiResQusModel.bind(this)}>
                                                        <i class="fa fa-pencil" aria-hidden="true" />Edit</button>
                                                    <SubResidencySummary show={this.state.MainResQusModelShow} onHide={MainResQusModelHide} />
                                                </div>
                                            </div>
                                        </li>
                                    </div>

                                    <div class="col-md-3 col-sm-6">
                                        <li class="steps__item" disabled={this.state.BenQusDivVisible}>
                                            <div class="db-gridbox">
                                                <div class={this.state.BenQusDivStyle} id="GooglePlusDiv" onClick={this.state.BenQusDivVisible ? "" : this.handleNavBenQus.bind(this)}>
                                                    <div className="gridhead">
                                                        <div className="gridIcon"><i class="fa fa-suitcase"></i></div>
                                                        <div className="gridHading"><h4>Benefits Questionnaire <br />Details</h4></div>
                                                    </div>
                                                </div>
                                                <div class="social-box1">
                                                    <button type="button" disabled={this.state.BenQusViewBtnVisible} class={this.state.BenQusPrintBtnStyle} onClick={this.handleOpenBenQusModel.bind(this)}>
                                                        <i class="fa fa-eye" aria-hidden="true" />View</button>
                                                    <button type="button" disabled={this.state.BenQusEditBtnVisible} class={this.state.BenQusEditBtnStyle} onClick={this.handleEditBenQus.bind(this)}>
                                                        <i class="fa fa-pencil" aria-hidden="true" />Edit</button>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="row-padd">
                    {/* Personal Summary */}

                    <Col xs={12} md={6}>
                        <Paper zDepth={1} className="DashboardDiv">
                            <h2 className="legendtitle">Personal Summary</h2>
                            <div className="fieldstyle DashboardContent">
                                <Flex layout="row">
                                    <Col md={3} xs={6}>
                                        <div className="PersonalImg">
                                            <img src={this.state.ProfileImgState} alt="Person Image" />
                                        </div>
                                    </Col>
                                    <Col md={9} xs={6}>
                                        <Table responsive>
                                            <tbody>
                                                <tr>
                                                    <td>First Name</td>
                                                    <td className="textBlue">{this.state.FirstNameState}</td>
                                                </tr>
                                                <tr>
                                                    <td>Last Name</td>
                                                    <td className="textBlue">{this.state.LastNameState}</td>
                                                </tr>
                                                <tr>
                                                    <td>Date of Birth</td>
                                                    <td className="textBlue">{this.state.DOBState}</td>
                                                </tr>
                                                <tr>
                                                    <td>Citizenship</td>
                                                    <td className="textBlue">{this.state.CitizenshipState}</td>
                                                </tr>
                                                <tr>
                                                    <td>Employee Type</td>
                                                    <td className="textBlue">{this.state.EmployeeTypeState}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <button type="button" class="btn btn-primary ReadMoreBtn" disabled={this.state.GenQusViewBtnVisible} onClick={this.handleOpenGenQusModel.bind(this)}>Read More</button>
                                        <GeneralSummary show={this.state.GenQusModelShow} onHide={GenQusModelHide} />
                                    </Col>
                                </Flex>
                            </div>
                        </Paper>
                    </Col>

                    {/* Personal Summary */}

                    {/* Document Status */}

                    <Col xs={12} md={6}>
                        <Paper zDepth={1} className="DashboardDiv1">
                            {/* <h2 className="legendtitle">Notifications,Status and Updates <span className="Notifysmall">(click on each row to see more detail)</span></h2> */}
                            <h2 className="legendtitle">Notifications,Status and Updates</h2>
                            <div className="fieldstyle DashboardContent">
                                {/* <Table responsive>
                                    <thead>
                                        <tr>
                                            <th><b>Document Name</b></th>
                                            <th className="textCenter"><b>Company</b></th>
                                            <th className="textCenter"><b>Country</b></th>
                                            <th><b>Status</b></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Power of Attorney</td>
                                            <td className="textBlue">
                                                <div class="dropdown">
                                                    <a class=" dropdown-toggle" data-toggle="dropdown"><img src={this.state.CompanyIconState} width="18" /></a>
                                                    <ul class="dropdown-menu">
                                                        <li><a href="#">HTML</a></li>
                                                        <li><a href="#">CSS</a></li>
                                                        <li><a href="#">JavaScript</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                            <td className="textCenter"><a ><img src={this.state.CountryIconState} width="18" /></a></td>
                                            <td className="textBlue">{this.state.POAsentState}</td>
                                        </tr> */}
                                {/* <tr>
                                            <td>Decision Letter</td>
                                            <td className="textBlue">{this.state.DLsentState}</td>
                                            <td className="textBlue">{this.state.DLReceivedState}</td>
                                        </tr> */}
                                {/* <tr>
                                            <td>Forecast Letter</td>
                                            <td className="textBlue">{this.state.FCLsentState}</td>
                                            <td className="textBlue">{this.state.FCLReceivedState}</td>
                                        </tr> */}
                                {/*<tr>
                                            <td>Pension Letter</td>
                                            <td className="textBlue">{this.state.PLsentState}</td>
                                            <td className="textBlue">{this.state.PLReceivedState}</td>
                                        </tr>*/}
                                {/*<tr>
                                            <td>Bilateral From</td>
                                            <td className="textBlue">{this.state.BLFsentState}</td>
                                            <td className="textBlue">{this.state.BLFReceivedState}</td>
                                        </tr>*/}
                                {/* </tbody>
                                </Table> */}
                                <BootstrapTable
                                    className="AdminDashboardTableDivParDiv "
                                    containerStyle={{ width: '100%' }}
                                    hover={true}
                                    keyField='AppDocTrackID'
                                    data={DocumenttableData}
                                    striped hover
                                    condensed
                                >
                                    <TableHeaderColumn dataField="DocumentName">Activity</TableHeaderColumn>
                                    <TableHeaderColumn dataField="CountryName">Country</TableHeaderColumn>
                                    {/* <TableHeaderColumn dataField="IsApplicantReceived">Applicant Received?</TableHeaderColumn>
                                    <TableHeaderColumn dataField="IsGPAReceived">GPA Received?</TableHeaderColumn> */}
                                    <TableHeaderColumn dataField='button' dataFormat={this.StatusButton.bind(this)}>Action Required?</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        </Paper>
                    </Col>

                    {/* Document Status */}
                </Row>
                <Row className="row-padd">
                    {/* Residency History */}

                    <Col xs={12} md={6}>
                        <Paper zDepth={1} className="DashboardDiv1">
                            <h2 className="legendtitle">Residency History</h2>
                            <div className="fieldstyle DashboardContent">
                                <Flex layout="row">
                                    <BootstrapTable className="AdminDashboardTableDivParDiv imgLogoresize"
                                        containerStyle={{ width: '100%' }}
                                        hover={true}
                                        keyField='ResCountry'
                                        data={tableData}
                                        striped hover
                                        condensed
                                    >
                                        <TableHeaderColumn width={"3%"} dataField="ResCountryFlag" dataFormat={this.imageFormatter.bind(this)}>Flag</TableHeaderColumn>
                                        <TableHeaderColumn width={"9%"} dataField="ResCountryName" dataFormat={this.ViewButton.bind(this)}>Country Name </TableHeaderColumn>
                                        <TableHeaderColumn width={"7%"} dataField="ResCountryBDate" >Date Begin</TableHeaderColumn>
                                        <TableHeaderColumn width={"7%"} dataField="ResCountryEDate" >Date End</TableHeaderColumn>
                                    </BootstrapTable>
                                </Flex>
                            </div>
                        </Paper>
                    </Col>

                    {/* Residency History */}
                    {/* Employement History */}

                    <Col xs={12} md={6}>
                        <Paper zDepth={1} className="DashboardDiv">
                            <h2 className="legendtitle">Employment History</h2>
                            <div className="fieldstyle DashboardContent">
                                <Flex layout="row">
                                    <BootstrapTable className="AdminDashboardTableDivParDiv "
                                        containerStyle={{ width: '100%' }}
                                        hover={true}
                                        keyField='CompanyName'
                                        data={tableData2}
                                        striped hover
                                        condensed
                                    >
                                        <TableHeaderColumn width={"6%"} dataField="CompanyCode" dataFormat={this.CompanySums.bind(this)} >Company Name</TableHeaderColumn>
                                        <TableHeaderColumn width={"5%"} dataField="CountryName" >CountryName</TableHeaderColumn>
                                        <TableHeaderColumn width={"5%"} dataField="ResCountryBDate" >ResBegindata</TableHeaderColumn>
                                        <TableHeaderColumn width={"5%"} dataField="ResCountryEDate" >ResEnddate</TableHeaderColumn>
                                        <TableHeaderColumn width={"4%"} dataField="CountryStayDate" >Reason</TableHeaderColumn>
                                        {/* <TableHeaderColumn width={"4%"} dataField="button" dataFormat={this.CompanySum.bind(this)}>View</TableHeaderColumn> */}
                                    </BootstrapTable>
                                </Flex>
                            </div>
                        </Paper>
                    </Col>

                    {/* Employement History */}


                </Row>

                <Row className="row-padd">
                    {/* Benefits Part1 History */}

                    <Col xs={12} md={6}>
                        <Paper zDepth={1} className="DashboardDiv1">
                            <h2 className="legendtitle">General Benefits History</h2>
                            <div className="fieldstyle DashboardContent">
                                <Table responsive>
                                    <tbody>
                                        <tr>
                                            <td>Home Address</td>
                                            <td className="textBlue">{this.state.HomeAddressState}</td>
                                        </tr>
                                        <tr>
                                            <td>Place of Birth</td>
                                            <td className="textBlue">{this.state.PlaceOfBirthState}</td>
                                        </tr>
                                        <tr>
                                            <td>Your Employer's Name</td>
                                            <td className="textBlue">{this.state.CompanyNameState}</td>
                                        </tr>
                                        <tr>
                                            <td>Industry List</td>
                                            <td className="textBlue">{this.state.IndustryNameState}</td>
                                        </tr>
                                        <tr>
                                            <td>Eligible Country</td>
                                            <td className="textBlue">{this.state.EligibleCountryState}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <button type="button" class="btn btn-primary ReadMoreBtn" disabled={this.state.BenQusPart1ViewBtnVisible} onClick={this.handleOpenBenQusModel.bind(this)}>Read More</button>
                                <BenefitsSummary show={this.state.BenQusModelShow} onHide={BenQusModelHide} />
                            </div>
                        </Paper>
                    </Col>

                    {/* Benefits Part1 History */}
                    {/* Benefits Part2 History */}

                    <Col xs={12} md={6}>
                        <Paper zDepth={1} className="DashboardDiv">
                            <h2 className="legendtitle">Country Benefits History</h2>
                            <div className="fieldstyle DashboardContent">

                                <Flex layout="row">
                                    <BootstrapTable className="AdminDashboardTableDivParDiv imgLogoresize"
                                        containerStyle={{ width: '100%' }}
                                        hover={true}
                                        keyField='CountryCode'
                                        data={Part2Summarytable}
                                        striped hover
                                        condensed
                                    >
                                        <TableHeaderColumn width={"3%"} dataField="CountryFlag" dataFormat={this.CountryimageFormatter.bind(this)}>Flag</TableHeaderColumn>
                                        <TableHeaderColumn width={"9%"} dataField="CountryName" >Country Name</TableHeaderColumn>
                                        <TableHeaderColumn width={"4%"} dataField="button" dataFormat={this.CountryEdit.bind(this)}>Action</TableHeaderColumn>
                                    </BootstrapTable>
                                </Flex>
                                {/* <Table responsive>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="Cmplogo">
                                                    <img src={this.state.EligibleCountryFlagState} alt="Person Image" />
                                                </div>
                                            </td>
                                            <td>{this.state.EligibleCountryState}</td>
                                            <td></td>
                                            <td></td>
                                            <td><strong><button type="button" class={this.state.BenQusEditBtnStyle} onClick={this.handleEditBenQusUK.bind(this)} disabled >Edit</button></strong></td>
                                        </tr>
                                    </tbody>

                                </Table> */}
                            </div>
                        </Paper>
                    </Col>

                    {/* Benefits Part2 History */}



                </Row>

                {/* <Paper zDepth={1} className="CommonDiv1">
                    <Grid>
                        <Col md={12} xs={12}>
                            <Col md={6} xs={6}>
                                <Panel eventKey="1" defaultExpanded={this.state.GenQusViewDivVisible}>
                                    <Panel.Heading>
                                        <Panel.Title toggle>Personal Summary</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible className="PanelBody">
                                        <Col md={3} xs={6}>
                                            <div className="PersonalImg">
                                                <img src={this.state.ProfileImgState} alt="Person Image" />
                                            </div>
                                        </Col>
                                        <Col md={9} xs={6}>
                                            <Table responsive>
                                                <tbody>
                                                    <tr>
                                                        <td>First Name</td>
                                                        <td className="textBlue">{this.state.FirstNameState}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Last Name</td>
                                                        <td className="textBlue">{this.state.LastNameState}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date of Birth</td>
                                                        <td className="textBlue">{this.state.DOBState}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Citizenship</td>
                                                        <td className="textBlue">{this.state.CitizenshipState}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Employee Type</td>
                                                        <td className="textBlue">{this.state.EmployeeTypeState}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <button type="button" class="btn btn-primary ReadMoreBtn" disabled={this.state.GenQusViewBtnVisible} onClick={this.handleOpenGenQusModel.bind(this)}>Read More</button>
                                            <GeneralSummary show={this.state.GenQusModelShow} onHide={GenQusModelHide} />
                                        </Col>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col md={6} xs={6}>
                                <Panel eventKey="3" defaultExpanded={this.state.ResQusEmployeeViewDivVisible}>
                                    <Panel.Heading>
                                        <Panel.Title toggle>Residency History</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible className="PanelBody">
                                        <BootstrapTable className="AdminDashboardTableDivParDiv imgLogoresize"
                                            containerStyle={{ width: '100%' }}
                                            hover={true}
                                            keyField='ResCountry'
                                            data={tableData}
                                            striped hover
                                            condensed
                                        >
                                            <TableHeaderColumn width={"3%"} dataField="ResCountryFlag" dataFormat={this.imageFormatter.bind(this)}>Flag</TableHeaderColumn>
                                            <TableHeaderColumn width={"10%"} dataField="ResCountryName" dataFormat={this.ViewButton.bind(this)}>Country Name </TableHeaderColumn>
                                            <TableHeaderColumn width={"5%"} dataField="Eligiliblity" >Eligibility</TableHeaderColumn>
                                            <TableHeaderColumn width={"7%"} dataField='button' dataFormat={this.ProcessButton.bind(this)}>Pension Process</TableHeaderColumn>
                                            <TableHeaderColumn width={"5%"} dataField='button' dataFormat={this.LinkButton.bind(this)}>View</TableHeaderColumn>
                                        </BootstrapTable>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col md={6} xs={6}>
                                <Panel eventKey="4" defaultExpanded={this.state.BenQusPart1ViewDivVisible}>
                                    <Panel.Heading>
                                        <Panel.Title toggle>Benefits Part1 History</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible className="PanelBody">
                                        <Table responsive>
                                            <tbody>
                                                <tr>
                                                    <td>Home Address</td>
                                                    <td className="textBlue">{this.state.HomeAddressState}</td>
                                                </tr>
                                                <tr>
                                                    <td>Place of Birth</td>
                                                    <td className="textBlue">{this.state.PlaceOfBirthState}</td>
                                                </tr>
                                                <tr>
                                                    <td>Your Employer's Name</td>
                                                    <td className="textBlue">{this.state.CompanyNameState}</td>
                                                </tr>
                                                <tr>
                                                    <td>Industry List</td>
                                                    <td className="textBlue">{this.state.IndustryNameState}</td>
                                                </tr>
                                                <tr>
                                                    <td>Eligible Country</td>
                                                    <td className="textBlue">{this.state.EligibleCountryState}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        <button type="button" class="btn btn-primary ReadMoreBtn" disabled={this.state.BenQusPart1ViewBtnVisible} onClick={this.handleOpenBenQusModel.bind(this)}>Read More</button>
                                        <BenefitsSummary show={this.state.BenQusModelShow} onHide={BenQusModelHide} />
                                    </Panel.Body>
                                </Panel>
                            </Col>
                            <Col md={6} xs={6}>
                                <Panel eventKey="4" defaultExpanded={this.state.BenQusPart2ViewDivVisible}>
                                    <Panel.Heading>
                                        <Panel.Title toggle>Benefits Part2 History</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible className="PanelBody">
                                        <Table responsive>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="Cmplogo">
                                                            <img src={this.state.EligibleCountryFlagState} alt="Person Image" />
                                                        </div>
                                                    </td>
                                                    <td>{this.state.EligibleCountryState}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td><strong><button type="button" class={this.state.BenQusEditBtnStyle} >Edit</button></strong></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Panel.Body>
                                </Panel>
                            </Col>
                        </Col>
                    </Grid>
                </Paper> */}

                {/* <Paper zDepth={1} className="CommonDiv1">
                    <h2 className="legendtitle">Document Status</h2>
                    <div className="fieldstyle">
                        <Flex layout="row">
                            <Flex flex="50">
                                <Row>
                                    <Col xs={12} md={2}></Col>
                                    <Col xs={12} md={8}>
                                        <Table responsive>
                                            <thead>
                                                <tr>
                                                    <td><b>Document Name</b></td>
                                                    <td><b>Sent</b></td>
                                                    <td><b>Received</b></td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Power of Attorney</td>
                                                    <td className="textBlue">{this.state.POAsentState}</td>
                                                    <td className="textBlue">{this.state.POAReceivedState}</td>
                                                </tr>
                                                <tr>
                                                    <td>Decision Letter</td>
                                                    <td className="textBlue">{this.state.DLsentState}</td>
                                                    <td className="textBlue">{this.state.DLReceivedState}</td>
                                                </tr>
                                                <tr>
                                                    <td>Forecast Letter</td>
                                                    <td className="textBlue">{this.state.FCLsentState}</td>
                                                    <td className="textBlue">{this.state.FCLReceivedState}</td>
                                                </tr>
                                                <tr>
                                                    <td>Pension Letter</td>
                                                    <td className="textBlue">{this.state.PLsentState}</td>
                                                    <td className="textBlue">{this.state.PLReceivedState}</td>
                                                </tr>
                                                <tr>
                                                    <td>Bilateral From</td>
                                                    <td className="textBlue">{this.state.BLFsentState}</td>
                                                    <td className="textBlue">{this.state.BLFReceivedState}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col xs={12} md={2}></Col>
                                </Row>
                            </Flex>
                            <Flex flex="50">
                                <Row>
                                </Row>
                            </Flex>
                        </Flex>
                    </div>
                </Paper> */}
                <div>
                    <Modal show={this.state.BenefitCountrypopup} onHide={() => this.setState({ BenefitCountrypopup: false })}>
                        <Modal.Header closeButton>
                            <Modal.Title>Eligible Benefits Country</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <BootstrapTable className="AdminDashboardTableDivParDiv "
                                containerStyle={{ width: '100%' }}
                                hover={true}
                                keyField='Country_id'
                                data={EligibleCountries}
                                striped hover
                                condensed
                            >
                                <TableHeaderColumn width={"4%"} dataField="Name" >Eligible Country</TableHeaderColumn>
                                <TableHeaderColumn width={"4%"} dataField="button" dataFormat={this.BenefitProcess.bind(this)}>Action</TableHeaderColumn>
                            </BootstrapTable>
                        </Modal.Body>
                    </Modal>
                </div>
                <div>
                    <Modal
                        show={this.state.ResQusEmpModelShow}
                        onHide={() => this.setState({ ResQusEmpModelShow: false })}
                        dialogClassName="custom-modal"
                        bsSize="large"
                        className="ModalAlign"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">Company Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="ModalScroll">
                            <Row className="show-grid">
                                <Col xs={12} md={12}>
                                    <p className="HeaderText">Company Information</p>
                                </Col>
                                <Col xs={12} md={12} className="ModalText">
                                    <Col xs={12} md={12}>
                                        <p><label>Employer's Name</label>    :      {this.state.CompanyState}</p>
                                    </Col>

                                    <Col xs={12} md={12}>
                                        <p><label>Employer's Address</label>           :      {this.state.CmpAddressState}</p>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <p><label>Would you like GPA to contact this employer about potential pension benefits you may be entitled?  </label>       :      {this.state.EntitleGPAContactState}</p>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <p><label>Are you aware of this employer being no longer in existence, having closed plans, or acquired by another entity?</label>      :      {this.state.EmployeeClosedPlanState}</p>
                                    </Col>
                                    {(this.state.EmployeeClosedPlanState != "No") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <p><label>Please select to the best of your knowledge</label>        :      {this.state.BestOfKnowledgeState}</p>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <p><label>Please provide any details you may be aware of (name of closed plan, when company closed, who acquired them, etc.)</label>         :      {this.state.ClosedPlanState}</p>
                                            </Col>
                                        </div>
                                        : ""}
                                </Col>
                            </Row>
                        </Modal.Body>
                    </Modal>
                    {/* { Document Status Model} */}
                    {this.state.volcontributemodal == 1 ?
                        <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.DocName} Document Status</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>

                                <h4>{"UK has notified Global Pension Associates that you are eligible to make Voluntary Contributions that will allow you to increase pension payout amount at the time of retirement eligibility. To find out more"} <a onClick={() => this.setState({ modalShow: false }, () => history.push('/VoluntaryContribution'))}>Please Click here..</a></h4>

                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={this.handleClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                        :
                        <Modal show={this.state.modalShow} onHide={() => this.setState({ modalShow: false })}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.DocName} Document Status</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>

                                <h4>{this.state.dashboard_msg}</h4>

                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={this.handleClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    }
                </div>
            </div>
        );
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
            dispatch(Action.setResidencyCountry("Rescountry"));
            // dispatch(Action.setResidencyCountry(Rescountry));
        },
        setCountryCode: (isPensionProcessCountry) => {
            dispatch(Action.setCountryCode("CountryCode"));
            // dispatch(Action.setResidencyCountry(Rescountry));
        }

    }
}

export default connect(mapReducerStateToProps, mapDispatchToProps)(ApplicantDashboard);