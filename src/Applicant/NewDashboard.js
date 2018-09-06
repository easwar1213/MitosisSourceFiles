import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../img/logo_white.png';
import { Grid, Row, Col, Button, Tooltip, Table, OverlayTrigger, ButtonToolbar, Panel, PanelGroup } from 'react-bootstrap';
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

//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

import GeneralSummary from './GeneralSummary';
import ResidencySummary from './ResidencySummary';
import BenefitsSummary from './BenefitsSummary';

const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);

var emailresult;

class ApplicantDashboard extends Component {
    constructor() {
        super();
        /* Field State Values Initialization */
        this.state = {
            HowToStartStatus: "P",
            GenQusStatus: "P",
            ResQusStatus: "P",
            BenQusPart1Status: "P",
            BenQusPart2Status:"P",
            ApplicantAge: "",
            ApplicantAgeMonth: "",
            DBOMonth: "",
            CountryCode: "",
            Country: "",
            CountryState: "",
            //Mode Setup
            GenQusModelShow: false,
            ResQusModelShow: false,
            BenQusModelShow: false,
            //Page Navigate Setup
            NavHowToStart: "/HowToStartProcess",
            NavGenQus: "/ApplicantDashboard",
            NavResQus: "/ApplicantDashboard",
            NavBenQus: "/ApplicantDashboard",
            //Div Visibility Setup
            GenQusDivVisible: true,
            ResQusDivVisible: true,
            BenQusDivVisible: true,
            //Print Button Visibility Setup
            HowToStartPrintBtnVisible: false,
            GenQusPrintBtnVisible: true,
            ResQusPrintBtnVisible: true,
            BenQusPrintBtnVisible: true,
            //Edit Button Visibility Setup
            GenQusEditBtnVisible: true,
            ResQusEditBtnVisible: true,
            BenQusEditBtnVisible: true,
            //Div Visibility Style Setup
            GenQusDivStyle: "social-box",
            ResQusDivStyle: "social-box",
            BenQusDivStyle: "social-box",
            //Button Visibility Style Setup
            GenQusPrintBtnStyle: "btn btn",
            ResQusPrintBtnStyle: "btn btn",
            BenQusPrintBtnStyle: "btn btn",
            GenQusEditBtnStyle: "btn btn",
            ResQusEditBtnStyle: "btn btn",
            BenQusEditBtnStyle: "btn btn"
        }

    }

    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        this.handleAppProcessFlowRead(this);
    }

    handleAppProcessFlowRead(event) {
        var thisObj = this;
        let AppProFlowAPIUrl = "https://qxredca9lk.execute-api.us-west-2.amazonaws.com/Dev/GPA_AppProcessFlowDatas_Lambda";
        let JSONData = JSON.stringify({
            QueryName: "Read",
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
                        thisObj.setState({ HowToStartStatus: data[i].HowToStart });
                        //GenQus Setup
                        thisObj.setState({ GenQusDivVisible: false });
                        thisObj.setState({ GenQusDivStyle: "social-box twitter" });
                        thisObj.setState({ GenQusPrintBtnVisible: true });
                        thisObj.setState({ GenQusEditBtnVisible: true });
                        thisObj.setState({ GenQusPrintBtnStyle: "btn btn-success" });
                        thisObj.setState({ GenQusEditBtnStyle: "btn btn-warning" });
                        thisObj.setState({ NavGenQus: "/GeneralQuestionnarie" });

                        //GenQus Condition Check
                        if (data[i].GenQus == "C") {
                            //GenQus Setup
                            thisObj.setState({ GenQusStatus: data[i].GenQus });
                            thisObj.setState({ NavGenQus: "/ApplicantDashboard" });
                            thisObj.setState({ GenQusPrintBtnVisible: false });
                            thisObj.setState({ GenQusEditBtnVisible: false });
                            //ResQus Setup
                            thisObj.setState({ ResQusDivVisible: false });
                            thisObj.setState({ ResQusDivStyle: "social-box linkedin" });
                            thisObj.setState({ ResQusPrintBtnVisible: true });
                            thisObj.setState({ ResQusEditBtnVisible: true });
                            thisObj.setState({ ResQusPrintBtnStyle: "btn btn-success" });
                            thisObj.setState({ ResQusEditBtnStyle: "btn btn-warning" });
                            thisObj.setState({ NavResQus: "/ResidencyQuestionnarie" });

                            //ResQus Condition Check
                            if (data[i].ResQus == "C") {
                                //ResQus Setup
                                thisObj.setState({ ResQusStatus: data[i].ResQus });
                                thisObj.setState({ NavResQus: "/ApplicantDashboard" });
                                thisObj.setState({ ResQusPrintBtnVisible: false });
                                thisObj.setState({ ResQusEditBtnVisible: false });
                                //BenQus Setup
                                thisObj.setState({ BenQusDivVisible: false });
                                thisObj.setState({ BenQusDivStyle: "social-box google-plus" });
                                thisObj.setState({ BenQusPrintBtnVisible: true });
                                thisObj.setState({ BenQusEditBtnVisible: true });
                                thisObj.setState({ BenQusPrintBtnStyle: "btn btn-success" });
                                thisObj.setState({ BenQusEditBtnStyle: "btn btn-warning" });
                                thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart1" });

                                //BenQusPart1 Condition Check
                                if (data[i].BenQusPart1 == "C") {
                                    //BenQusPart1 Setup
                                    thisObj.setState({ BenQusPart1Status: data[i].BenQusPart1 });
                                    thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart2" });
                                    thisObj.setState({ BenQusPrintBtnVisible: false });
                                    thisObj.setState({ BenQusEditBtnVisible: false });

                                    //BenQusPart2 Condition Check
                                if (data[i].BenQusPart2 == "C") {
                                    //BenQusPart2 Setup
                                    thisObj.setState({ BenQusPart2Status: data[i].BenQusPart2 });
                                    thisObj.setState({ NavBenQus: "/ApplicantDashboard" });
                                    thisObj.setState({ BenQusPrintBtnVisible: false });
                                    thisObj.setState({ BenQusEditBtnVisible: false });
                                }
                                else {
                                    //BenQusPart2 Setup                          
                                    thisObj.setState({ BenQusPart2Status: data[i].BenQusPart2 });
                                    thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart2" });
                                    thisObj.setState({ BenQusPrintBtnVisible: false });
                                    thisObj.setState({ BenQusEditBtnVisible: false });
                                }
                                }
                                else {
                                    //BenQusPart1 Setup                          
                                    thisObj.setState({ BenQusPart1Status: data[i].BenQusPart1 });
                                    thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart1" });
                                    thisObj.setState({ BenQusPrintBtnVisible: true });
                                    thisObj.setState({ BenQusEditBtnVisible: true });
                                }
                            }
                            else {
                                //ResQus Setup                          
                                thisObj.setState({ ResQusStatus: data[i].ResQus });
                                thisObj.setState({ NavResQus: "/ResidencyQuestionnarie" });
                                thisObj.setState({ ResQusPrintBtnVisible: true });
                                thisObj.setState({ ResQusEditBtnVisible: true });
                                //BenQus Setup
                                thisObj.setState({ BenQusDivVisible: true });
                                thisObj.setState({ BenQusDivStyle: "social-box" });
                                thisObj.setState({ BenQusPrintBtnVisible: true });
                                thisObj.setState({ BenQusEditBtnVisible: true });
                                thisObj.setState({ BenQusPrintBtnStyle: "btn btn" });
                                thisObj.setState({ BenQusEditBtnStyle: "btn btn" });
                                thisObj.setState({ NavBenQus: "/ApplicantDashboard" });
                            }
                        }
                        else {
                            //GenQus Setup                          
                            thisObj.setState({ GenQusStatus: data[i].GenQus });
                            thisObj.setState({ NavGenQus: "/GeneralQuestionnarie" });
                            thisObj.setState({ GenQusPrintBtnVisible: true });
                            thisObj.setState({ GenQusEditBtnVisible: true });
                            //ResQus Setup
                            thisObj.setState({ ResQusDivVisible: true });
                            thisObj.setState({ ResQusDivStyle: "social-box" });
                            thisObj.setState({ ResQusPrintBtnVisible: true });
                            thisObj.setState({ ResQusEditBtnVisible: true });
                            thisObj.setState({ ResQusPrintBtnStyle: "btn btn" });
                            thisObj.setState({ ResQusEditBtnStyle: "btn btn" });
                            thisObj.setState({ NavResQus: "/ApplicantDashboard" });
                        }
                    }
                    else {
                        //HowToStart Setup
                        thisObj.setState({ HowToStartStatus: data[i].HowToStart });
                        //GenQus Setup
                        thisObj.setState({ GenQusDivVisible: true });
                        thisObj.setState({ GenQusDivStyle: "social-box" });
                        thisObj.setState({ GenQusPrintBtnVisible: true });
                        thisObj.setState({ GenQusEditBtnVisible: true });
                        thisObj.setState({ GenQusPrintBtnStyle: "btn btn" });
                        thisObj.setState({ GenQusEditBtnStyle: "btn btn" });
                        thisObj.setState({ NavGenQus: "/ApplicantDashboard" });
                    }

                }
            }
            // else {
            //     thisObj.setState({ NavHowToStart: "/HowToStartProcess" });
            //     thisObj.setState({ HowToStartPrintBtnVisible: true });       
            //     thisObj.setState({ NavGenQus: "/ApplicantDashboard" });
            //     thisObj.setState({ GenQusPrintBtnVisible: true });
            //     thisObj.setState({ GenQusEditBtnVisible: true });
            //     thisObj.setState({ ResQusDivVisible: true });
            //     thisObj.setState({ NavResQus: "/ApplicantDashboard" });
            //     thisObj.setState({ ResQusPrintBtnVisible: true });
            //     thisObj.setState({ ResQusEditBtnVisible: true });
            //     thisObj.setState({ BenQusDivVisible: true });
            //     thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart1" });
            //     thisObj.setState({ BenQusPrintBtnVisible: true });
            //     thisObj.setState({ BenQusEditBtnVisible: true });
            // }
        }).catch((err) => {
            // alert("Please Fill Mandatory Fields");
        })
    }
    handleOpenGenQusModel() {
        this.setState({ GenQusModelShow: true });
    }
    handleOpenResQusModel() {
        this.setState({ ResQusModelShow: true });
    }
    handleOpenBenQusModel() {
        this.setState({ BenQusModelShow: true });
    }
    handleEditGenQus() {
        history.push('/GeneralQuestionnarie?UserID=' + emailresult);
    }
    handleEditBenQus(e) {
        history.push('/BenefitsQuestionnariePart1?UserID=007');
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
        history.push(this.state.NavBenQus);
    }

    render() {
        let GenQusModelHide = () => this.setState({ GenQusModelShow: false });
        let ResQusModelHide = () => this.setState({ ResQusModelShow: false });
        let BenQusModelHide = () => this.setState({ BenQusModelShow: false });
        return (
            <div>
                <Paper zDepth={1} className="CommonDiv1">
                    <Grid>
                        <Col md={12} xs={12}>
                            <div className="NewDesign">
                                <h3>Steps to follows</h3>
                                <div class="row">
                                    <div class="col-md-3 col-sm-6">
                                        <li class="steps__item" disabled={false}>
                                            <div class="social-box facebook" id="facebookDiv" onClick={this.handleNavHowToStart.bind(this)}>
                                                <h4>How to Start the Process</h4>
                                                <i class="fa fa-hourglass-start"></i>
                                                <button type="button" disabled={this.state.HowToStartPrintBtnVisible} class="btn btn-success PrintBtn">Print</button>
                                            </div>
                                        </li>
                                    </div>

                                    {/* <div class="col-md-3 col-sm-6">
                                        <li class="steps__item" disabled={this.state.GenQusDivVisible}>
                                            <div class={this.state.GenQusDivStyle} id="TwitterDiv" onClick={this.handleNavGenQus.bind(this)}>
                                                <h4>General Questionnaires</h4>
                                                <i class="fa fa-venus-mars"></i>
                                                <ul>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.GenQusPrintBtnVisible} class={this.state.GenQusPrintBtnStyle} onClick={() => window.open("https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/Documents/genqus.pdf", "_blank")}>Print</button></strong>
                                                    </li>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.GenQusEditBtnVisible} class={this.state.GenQusEditBtnStyle}>Edit</button></strong>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </div> */}

                                    <div class="col-md-3 col-sm-6">
                                        <li class="steps__item" disabled={this.state.GenQusDivVisible}>
                                            <div class={this.state.GenQusDivStyle} id="TwitterDiv" onClick={this.handleNavGenQus.bind(this)}>
                                                <h4>General Questionnaires</h4>
                                                <i class="fa fa-venus-mars"></i>
                                            </div>
                                            <div class="social-box1">
                                                <ul>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.GenQusPrintBtnVisible} class={this.state.GenQusPrintBtnStyle} onClick={() => window.open("https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/Documents/genqus.pdf", "_blank")}>Print</button></strong>
                                                    </li>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.GenQusEditBtnVisible} class={this.state.GenQusEditBtnStyle}>Edit</button></strong>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </div>

                                    <div class="col-md-3 col-sm-6">
                                        <li class="steps__item" disabled={this.state.ResQusDivVisible}>
                                            <div class={this.state.ResQusDivStyle} id="LinkedInDiv" onClick={this.handleNavResQus.bind(this)}>
                                                <h4>Residency Questionnaire</h4>
                                                <i class="fa fa-home"></i>
                                            </div>
                                            <div class="social-box1">
                                                <ul>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.ResQusPrintBtnVisible} class={this.state.ResQusPrintBtnStyle} onClick={() => window.open("https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/Documents/resqus.pdf", "_blank")}>Print</button></strong>
                                                    </li>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.ResQusEditBtnVisible} class={this.state.ResQusEditBtnStyle}>Edit</button></strong>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </div>

                                    <div class="col-md-3 col-sm-6">
                                        <li class="steps__item" disabled={this.state.BenQusDivVisible}>
                                            <div class={this.state.BenQusDivStyle} id="GooglePlusDiv" onClick={this.handleNavBenQus.bind(this)}>
                                                <h4>Benefits Questionnaire</h4>
                                                <i class="fa fa-suitcase"></i>
                                            </div>
                                            <div class="social-box1">
                                                <ul>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.BenQusPrintBtnVisible} class={this.state.BenQusPrintBtnStyle} onClick={() => window.open("https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/Documents/benqus.pdf", "_blank")}>Print</button></strong>
                                                    </li>
                                                    <li>
                                                        <strong><button type="button" disabled={this.state.BenQusEditBtnVisible} class={this.state.BenQusEditBtnStyle}>Edit</button></strong>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </div>

                                </div>
                            </div>


                            {/* <ButtonToolbar>
                            <div className="demo">
                                <h2 style={{ textAlign: "center", color: " #0780c3", marginLeft: 60, marginTop: -20 }}> <b>STEP'S TO FOLLOW PENSION PROCESS</b></h2>
                               
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="main-timeline" >
                                            <div className="timeline" onClick={this.handleNavHowToStart.bind(this)}>
                                                <div className="timeline-content">
                                                    <span className="mt-icon fa fa-hourglass-start hvr-pop"></span>
                                                    <h3 className="title"><font><font>How to Start the Process</font></font></h3>
                                                </div>
                                            </div>
                                            <div className="timeline">
                                                <div className="timeline-content">
                                                    <span disabled={this.state.GenQusDivVisible} className="mt-icon hvr-pop fa fa-venus-mars" onClick={this.handleNavGenQus.bind(this)}></span>
                                                    <h3 className="title"><font><font>General Questionnaire</font></font></h3>
                                                    <div className="ButtonGrp">
                                                        <Button disabled={this.state.GenQusPrintBtnVisible} className="btn btn-success" onClick={this.handleOpenGenQusModel.bind(this)}><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View</Button>
                                                        <GeneralSummary show={this.state.GenQusModelShow} onHide={GenQusModelHide} />
                                                        <Button disabled={this.state.GenQusEditBtnVisible} type="button" className="btn btn-warning" onClick={this.handleEditGenQus.bind(this)} style={{ float: "right" }}><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="timeline">
                                                <div className="timeline-content" >
                                                    <img disabled={this.state.ResQusDivVisible} src={ResidencyIcon} alt="Residence Questions" width="50" height="40" className=" mt-icon hvr-pop" onClick={this.handleNavResQus.bind(this)} />
                                                    <h3 className="title"><font><font>Residency Questionnaire</font></font></h3>
                                                    <div className="ButtonGrp">
                                                        <Button disabled={this.state.ResQusPrintBtnVisible} className="btn btn-success" onClick={this.handleOpenResQusModel.bind(this)}><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View</Button>
                                                        <ResidencySummary show={this.state.ResQusModelShow} onHide={ResQusModelHide} />
                                                        <Button disabled={this.state.ResQusEditBtnVisible} type="button" className="btn btn-warning" style={{ float: "right" }}><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;Edit</Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="timeline">
                                                <div className="timeline-content">
                                                    <span disabled={this.state.BenQusDivVisible} className="mt-icon hvr-pop fa fa-suitcase" onClick={this.handleNavBenQus.bind(this)}></span>
                                                    <h3 className="title"><font><font>Benefits Questionnaire</font></font></h3>
                                                    <div className="ButtonGrp">
                                                        <Button disabled={this.state.BenQusPrintBtnVisible} className="btn btn-success" onClick={this.handleOpenBenQusModel.bind(this)}><i className="fa fa-eye" aria-hidden="true"></i>&nbsp;View</Button>
                                                        <BenefitsSummary show={this.state.BenQusModelShow} onHide={BenQusModelHide} />
                                                        <Button disabled={this.state.BenQusEditBtnVisible} type="button" className="btn btn-warning" style={{ float: "right" }}><i className="fa fa-pencil" aria-hidden="false"></i>&nbsp;Edit</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ButtonToolbar> */}
                        </Col>
                    </Grid>
                </Paper>

                <Paper zDepth={1} className="CommonDiv1">
                    <Grid>
                        <Col md={12} xs={12}>
                            <Col md={6} xs={6}>
                                <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="1">
                                    <Panel eventKey="1">
                                        <Panel.Heading>
                                            <Panel.Title toggle>Personal Summary</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible className="PanelBody">
                                            <Col md={3} xs={6}>
                                                <div className="PersonalImg">
                                                    <img src={PersonalDetailsImg} alt="Person Image" />
                                                </div>
                                            </Col>
                                            <Col md={9} xs={6}>
                                                <Table responsive>
                                                    <tbody>
                                                        <tr>
                                                            <td>First Name</td>
                                                            <td className="textBlue">Mark</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Last Name</td>
                                                            <td className="textBlue">John</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Nationality</td>
                                                            <td className="textBlue">Indian</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Date of Birth</td>
                                                            <td className="textBlue">19.03.1932</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Spouse Name</td>
                                                            <td className="textBlue">Merly Anganda</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                                <button type="button" class="btn btn-primary ReadMoreBtn">Read More</button>
                                            </Col>
                                        </Panel.Body>
                                    </Panel>
                                </PanelGroup>
                            </Col>
                            <Col md={6} xs={6}>
                                <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="2">
                                    <Panel eventKey="2">
                                        <Panel.Heading>
                                            <Panel.Title toggle>Employment History</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible className="PanelBody">
                                            <Table responsive>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="Cmplogo">
                                                                <img src={SampleCmplogo} alt="Person Image" />
                                                            </div>
                                                        </td>
                                                        <td>Company Name</td>
                                                        <td>1988 - 1998</td>
                                                        <td>12 years</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="Cmplogo">
                                                                <img src={SampleCmplogo} alt="Person Image" />
                                                            </div>
                                                        </td>
                                                        <td>Company Name</td>
                                                        <td>1988 - 1998</td>
                                                        <td>12 years</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="Cmplogo">
                                                                <img src={SampleCmplogo} alt="Person Image" />
                                                            </div>
                                                        </td>
                                                        <td>Company Name</td>
                                                        <td>1988 - 1998</td>
                                                        <td>12 years</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="Cmplogo">
                                                                <img src={SampleCmplogo} alt="Person Image" />
                                                            </div>
                                                        </td>
                                                        <td>Company Name</td>
                                                        <td>1988 - 1998</td>
                                                        <td>12 years</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <button type="button" class="btn btn-primary ReadMoreBtn">Read More</button>
                                        </Panel.Body>
                                    </Panel>
                                </PanelGroup>
                            </Col>
                            <Col md={6} xs={6}>
                                <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="3">
                                    <Panel eventKey="3">
                                        <Panel.Heading>
                                            <Panel.Title toggle>Residency History</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible className="PanelBody">
                                            <Table responsive>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="Cmplogo">
                                                                <img src={country_1} alt="Person Image" />
                                                            </div>
                                                        </td>
                                                        <td>Georgia</td>
                                                        <td>1988 - 1998</td>
                                                        <td>12 years</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="Cmplogo">
                                                                <img src={country_2} alt="Person Image" />
                                                            </div>
                                                        </td>
                                                        <td>Malaysia</td>
                                                        <td>1988 - 1998</td>
                                                        <td>12 years</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="Cmplogo">
                                                                <img src={country_3} alt="Person Image" />
                                                            </div>
                                                        </td>
                                                        <td>Philippines</td>
                                                        <td>1988 - 1998</td>
                                                        <td>12 years</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="Cmplogo">
                                                                <img src={country_4} alt="Person Image" />
                                                            </div>
                                                        </td>
                                                        <td>Russia</td>
                                                        <td>1988 - 1998</td>
                                                        <td>12 years</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <button type="button" class="btn btn-primary ReadMoreBtn">Read More</button>
                                        </Panel.Body>
                                    </Panel>
                                </PanelGroup>
                            </Col>
                            <Col md={6} xs={6}>
                                <PanelGroup accordion id="accordion-uncontrolled-example" defaultActiveKey="4">
                                    <Panel eventKey="4">
                                        <Panel.Heading>
                                            <Panel.Title toggle>Benefits History</Panel.Title>
                                        </Panel.Heading>
                                        <Panel.Body collapsible className="PanelBody">
                                            <Table responsive>
                                                <tbody>
                                                    <tr>
                                                        <td>Home Address</td>
                                                        <td className="textBlue">Sanfransisco, America.</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Place of Birth</td>
                                                        <td className="textBlue">USA.</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Your Employer's Name</td>
                                                        <td className="textBlue">Mitosis Pvt</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Industry List</td>
                                                        <td className="textBlue">Computer/Software</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Industry List</td>
                                                        <td className="textBlue">Computer/Software</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                            <button type="button" class="btn btn-primary ReadMoreBtn">Read More</button>
                                        </Panel.Body>
                                    </Panel>
                                </PanelGroup>
                            </Col>
                        </Col>
                    </Grid>
                </Paper>
            </div>
        );
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(ApplicantDashboard);



