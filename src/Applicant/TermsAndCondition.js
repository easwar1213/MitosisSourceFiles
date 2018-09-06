import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Loader from '../img/loader.gif';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import '../Style/style.css';
import SignaturePad from 'react-signature-pad';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import history from '../Routing/history';
import SweetAlert from 'sweetalert2-react';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

/* User Pool Access Details */
const poolData = {
    UserPoolId: 'us-west-2_wgkaBUmz5', // Your user pool id here
    ClientId: '3ocb7u0422dhf9c38vacc0kfv3',// Your client id here 4gjka5ag6svfp0f3c4i2a1r8oo
    identityID: "us-west-2:2cae3c46-6f2b-40dd-a059-5313e2b8b23b",//"us-west-2:e2caf986-8e5b-4c17-abe1-362efe0c8960",
    region: "us-west-2",
};
var String1 = "Thank You!";
var String2 = "For your records, a copy of your signed Terms and Conditions has been sent to your registered email.";
var CliMsg = String1 + "\r\n" + String2 + "\r\n";

var emailresult;
var passwordresult;

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

class TermsAndCondition extends Component {
    constructor(props) {
        super(props);
        const maxDate = new Date();
        this.state = {
            ischecked: false,
            EmpCompanyName: this.props.UserData.CCompanyID,
            FirstName: "",
            MiddleName:"",
            LastName: "",
            maxDate: maxDate,
            SignedByName: "",
            SignedBy: null,
            countries: null,
            signaturePad: false,
            isValidName: false,
            InvnLinkMsg: false,
            fileUploaderLink: false,

        };
        this.handlePoolDataLoad(this);
        this.pdfToHTML = this.pdfToHTML.bind(this);
    }
    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        passwordresult = localStorage.getItem('applicant_password');
    }
    handleFirstName(e) {
        this.setState({ FirstName: e.target.value });
    }
    handleLastName(e) {
        this.setState({ LastName: e.target.value });
    }
    handleMiddleName(e) {
        this.setState({ MiddleName: e.target.value });
    }
    handleSignedByName(e) {
        var OrgName = this.state.FirstName + " " + this.state.LastName;
        this.setState({ SignedByName: e.target.value });
        if (this.state.SignedByName == OrgName) {
            this.setState({ isValidName: false });
        }
        else {
            this.setState({ isValidName: true });
        }
    }

    handleSignatureClear = (e) => {
        this.signaturePad.clear();
        this.setState({ isEnabled: this.canBeSubmitted(this) });
    }

    handleChangeTitle = (event, index, SignedBy) => this.setState({ SignedBy });

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
                        if (result[i].getName() == "given_name") {
                            thisObj.setState({ FirstName: result[i].getValue() });
                        }

                        if (result[i].getName() == "middle_name") {
                            thisObj.setState({ MiddleName: result[i].getValue() });
                        }

                        if (result[i].getName() == "family_name") {
                            thisObj.setState({ LastName: result[i].getValue() });
                        }

                        thisObj.setState({ SignedByName: thisObj.state.FirstName + " " + thisObj.state.LastName });
                    }
                });
            },
            onFailure: function (err) {
            },
        });
    }

    handleCheck() {
        if (this.state.ischecked == false || this.state.ischecked == '') {
            this.setState({
                ischecked: true
            });
            this.handleScrollClick(this);
        }
        else {
            this.setState({
                ischecked: false
            });
            this.handleScrollUpClick(this);
        }

    }

    handleScrollClick = e => {
        setTimeout(() => (this.node.scrollTop = 10000));
    };


    handleScrollUpClick = e => {
        setTimeout(() => (this.node.scrollTop = 0));
    };


    handleSignatureChange = e => {
        this.setState({ isEnabled: this.canBeSubmitted(this) });
    }


    canBeSubmitted(e) {
        const { FirstName, LastName, SignedByName, signaturePad, SignedBy, ischecked } = this.state;
        return (FirstName.length > 0 && LastName.length > 0 && SignedByName.length > 0
            && SignedBy != null && ischecked == true && this.signaturePad.isEmpty() == false);
    };

    handleAppProcessFlowUpdate(event) {
        let AppProFlowAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify({
            QueryName: "ApplicantProcessFlowTrackingUpdateTC",
            UserID: emailresult,
            TC: "C"
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
            //headers: AxiosHeaderConfig,

        }).then(({ data }) => {
           
            this.setState({ InvnLinkMsg: false });
            this.setState({ fileUploaderLink: true });
        }).catch((err) => {
        })
    }

    handleTermsConditionSavePDF(event) {
        var thisObj = this;
        var data = this.signaturePad.toDataURL();
        var EncodedData = data.split(',');
        var SignatureBase64 = EncodedData[1];
        let TCAPIUrl = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/terms_htmlpdfconv";
        let JSONData = JSON.stringify({
            html: "This is test Data ",                    
            language: "en",  
            DocCategory:"tc",
            params: {
                empId: emailresult,                              
                companyName: this.state.EmpCompanyName,
                firstName: this.state.FirstName,
                middleName: this.state.MiddleName,
                lastName: this.state.LastName,
                signedBy: this.state.SignedBy,
                empSignature: SignatureBase64,
                signedbyname: this.state.SignedByName
            },
        });
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: TCAPIUrl,
            //headers:AxiosHeaderConfig,

        }).then(({ data }) => {
            thisObj.handleSendMail(this);
        }).catch((err) => {

        })
    }

    handleTermsConditionSave(event) {
        var thisObj = this;
        var data = this.signaturePad.toDataURL();
        var EncodedData = data.split(',');
        var SignatureBase64 = EncodedData[1];
        let TCAPIUrl = "https://h3p6kv0ve0.execute-api.us-west-2.amazonaws.com/Dev/GPA_TermsAndConditionDatas_Lambda";
        let JSONData = JSON.stringify({
            QueryName: "Save",
            UserID: emailresult,
            FirstName: this.state.FirstName,
            MiddleName: this.state.MiddleName,
            LastName: this.state.LastName,
            DateOfSigned: this.state.maxDate,
            SignedBy: this.state.SignedBy,
            SignedByName: this.state.SignedByName,
            Signature: SignatureBase64,
            TCStatus: "C",
            MainFolderName: "applicant",
            SubFolderName: emailresult,
            MailDocName: "Signature",
        });
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: TCAPIUrl,
            //headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            thisObj.handleAppProcessFlowUpdate(this);
        }).catch((err) => {

        })
    }


    handleSendMail(event) {
        var thisObj = this;
        let emailSendingApiUrl = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
        var data = {
            MainFolderName: "applicant",
            SubFolderName: emailresult,
            MailDocName: "TC",
            LangCode: "en",
            EmailTo: emailresult,
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
            // headers: header,

        }).then(({ data }) => {
            thisObj.handleTermsConditionSave(this);
        })
            .catch((err) => {

            });
        //end of email        
    }


    pdfToHTML(event, context) {
        this.setState({ InvnLinkMsg: true });
        this.handleTermsConditionSavePDF(this);               
    }

    handleNavAdminPage() {
        this.setState({ fileUploaderLink: false });
        this.setState({ InvnLinkMsg: false });
        history.push('/ApplicantDashboard');
    }

    render() {
        let imagePreview = "";
        if (this.state.InvnLinkMsg) {
            imagePreview = (<div class="loader"><img src={Loader} height="40" /></div>);
        }
        const isEnabled = this.canBeSubmitted();
        const maxDate = new Date();
        return (
            <div id="myId">               
                <Paper zDepth={1} className="TermCondDiv TermsCond">
                    <div id="divtoPDF">
                        <Grid>
                            <div className="TC-header">
                                <h3> TERMS &amp; CONDITIONS</h3>
                            </div>
                            <div className="TC-content" id="divTC" ref={node => this.node = node}>
                                <br></br>
                                <Grid>
                                    <Row >
                                        <Col xs={10} md={11}>
                                            <Col xs={8} md={12}>
                                                <p>&emsp;These documents set out the terms under which our firm will provide international pension research services to you. You should read through these documents and if there are any matters on which you require clarification, we will be happy to explain them in more detail. These terms will remain in force and shall apply to any business services provided to you now, or in the future. Should our firm change any of its business terms at a future date, we will advise you in writing in advance of the changes</p>
                                            </Col>

                                            <Col xs={8} md={12}>
                                                <p>&emsp;As an overview only, and not as a full or complete description, the Terms &amp; Conditions for our services to you include:</p>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <ul>
                                                    <li>The Agreement is between Global Pension Associates LLC ("GPA") and You (the "Applicant").</li>
                                                    <li><span>GPA will assist the Applicant by searching, locating, and assisting the Applicant to obtain additional retirement benefits from country and/or private pension providers ("Pension Providers") based on employment and residence time of the Applicant outside of the Applicant's home country.</span></li>
                                                    <li>The Applicant agrees to and shall indemnify <b>{this.state.EmpCompanyName}</b>.including their subsidiaries, related companies, and historical entities, from all claims related to benefits received or not received by the Applicant.</li>
                                                    <li>If GPA obtains no benefits for the Applicant, there will be no charge or fee to the Applicant.</li>
                                                    <li>GPA makes no guarantees or assurances that benefits can or will be obtained for the Applicant.</li>
                                                    <li>If GPA obtains benefits for the Applicant, the Applicant will pay a one-time fee equal to the first two months of pension benefits received by the Applicant. Payment is due within ninety (90) days of the first receipt of benefits.</li>
                                                    <li>GPA, <b>{this.state.EmpCompanyName}</b>., Pension Providers, and their agents and employees are not able to, and do not, provide tax, legal, or financial advice to the Applicant.</li>
                                                    <li>GPA is not liable for the accuracy of information provided by the Applicant or Pension Providers.</li>
                                                </ul>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <div className="TC-content1" id="test1"><br />
                                                    <h3>Global Pension Associates LLC -- Terms &amp; Conditions</h3>
                                                </div>
                                                <br />
                                            </Col>
                                            <br></br>
                                            <Col xs={12} md={12}>
                                                <p>&emsp;Please read the following Terms and Conditions for using the services of Global Pension Associates LLC ("GPA") and this Software (the "Software"). By using the Software and the information and services available through the Software, you agree to follow and be bound by these Terms and Conditions.If you do not agree to these Terms and Conditions, do not use the Software. GPA owns the Software and reserves the right, at its discretion, to modify these Terms and Conditions at any time and any such modification will be effective immediately upon posting the modification. You should check these Terms and Conditions periodically for modifications. If you use the Software after we post modifications to the Software, then you will be bound by such modifications.</p>
                                                <p>&emsp;These Terms and Conditions are in addition to any other agreements between you and GPA, including any customer or account agreements and any other agreements that govern your use of products, services, content, tools and information available on the Software.</p>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <p><b>Use of the Software</b></p>
                                                <p>&emsp;The Software is intended only for your personal, non-commercial use and display. You may download information from the Software to your computer and print out a hard copy for your personal reference, provided that you agree not to remove any copyright, trademark or other notices contained therein.</p>
                                            </Col>
                                            <br /><br />
                                            <Col xs={12} md={12}>
                                                <p><b>No Recommendations or Advice Provided</b></p>
                                                <p>&emsp;GPA assists applicants with searching, locating and assisting applicants to obtain additional international retirement benefits based on the applicant’s work and employment outside of the applicant’s home country. GPA does not make recommendations oroffer investment advice of any kind.</p>
                                                <p>&emsp;GPA provides the content of the Software for informational, educational and noncommercial purposes only. Although GPA may provide data, information and content relating to international pension services, you should not construe any such information as investment, financial, tax, legal or other advice. You alone will bear the sole responsibility of evaluating the merits and risks associated with the use of any data, information or content on the Software or provided to you by any Pension Provider before making any decisions based on such data, information or content. In exchange for using such data, information or content, you agree not to hold GPA, <b>{this.state.EmpCompanyName}</b> the Pension Providers or their agents, employees, and officers liable for any possible claim for damages arising from any decision you make based on information made available to you by GPA or the Pension Providers, their subsidiaries, related companies, and their historical entities.
</p><p>&emsp;GPA makes no warranties regarding and is not liable for the accuracy of information provided by the Applicant or Pension Providers.
</p>
                                            </Col>
                                            <br />
                                            <Col xs={12} md={12}>
                                                <p><b>Fees</b></p>

                                                <p>&emsp;GPA shall only charge you a fee or charge in the event that it obtains and you receive pension benefits. If GPA obtains benefits for you, you hereby agree to pay a one-time fee equal to the first two months of pension benefits received by you. Payment is due within ninety (90) days of the first receipt of benefits.</p>

                                            </Col>
                                            <Col xs={12} md={12}>
                                                <p><b>Disclaimers and Limitations of Liability</b></p>
                                                <Col xs={11} md={12}>
                                                    <p>You expressly understand and agree that:</p>
                                                    <p>&emsp;Your use of the software is provided on an “as is” and “as available” basis. To the full extent permitted under applicable law, GPA expressly disclaims all warranties of any kind with respect to the software and any products or services available on or through the software, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose and non-infringement. GPA makes no warranty that:</p>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <ol>
                                                    <li>The software will meet your requirements;</li>
                                                    <li>The software will be uninterrupted, timely, secure or free of viruses, errors, worms, date bombs, time bombs or other harmful components;</li>
                                                    <li>The results that may be obtained from the use of the software will be accurate or reliable;</li>
                                                    <li>The quality of any products, services, information or other material purchased or obtained by you through the software will meet your expectations;</li>
                                                    <li>Any errors on the software will be corrected; and</li>
                                                    <li>The data and materials presented or displayed on the software are correct, accurate or reliable. Any content or data downloaded or otherwise obtained through the use of the software is done at your own discretion and risk. You will be solely responsible for any damage to your computer system or loss of data that results from the download of any such content.</li>
                                                </ol>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <p>&emsp;&emsp;You agree that GPA,<b>{this.state.EmpCompanyName}</b>, or any third party engaged in providing services to you on or through the software shall not be responsible or liable for any damages caused by theft, unauthorized access, systems failure, communications line failure or other occurrences beyond the control of GPA or such third parties.</p>
                                                <p>&emsp;&emsp;No advice or information, whether written or oral, whether obtained by you from GPA, from a GPA employee or agent or through or from the software, shall create any warranty not expressly stated in these terms and conditions. GPA will not be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, revenue, income, goodwill, use, data or other intangible losses, resulting from:</p>
                                            </Col>

                                            <Col xs={12} md={12}>


                                                <ol>

                                                    <li>The use of or the inability to use the software;</li>
                                                    <li>The cost of procurement of substitute goods and services resulting from any goods,&emsp; data, &emsp;information or services purchased or obtained or messages received or transactions entered into, through or from the software;</li>
                                                    <li>Access to or alteration of your transmissions or data due to your conduct, inaction or negligence;</li>
                                                    <li>Statements or conduct of any third party; or</li>
                                                    <li>Any other matter relating to the software. </li>
                                                </ol>
                                            </Col>
                                            <br />
                                            <Col xs={12} md={12}>
                                                <p><b>Indemnification</b></p>
                                                <p>&emsp;You agree to indemnify, defend and hold harmless GPA, <b>{this.state.EmpCompanyName}</b>., and any and all Pension Providers, and their affiliates and the officers, directors, employees and agents from and against any and all claims, liabilities, damages, losses or expenses, including attorneys' fees and costs, arising out of or in any way connected with your access to or use of this software and/or your receipt or denial of benefits.
</p>
                                            </Col>
                                            <br />
                                            <Col xs={12} md={12}>
                                                <p><b>Integration and Severability</b></p>
                                                <p> &emsp;If any provision of these Terms and Conditions is deemed unlawful, void or for any reason unenforceable, then that provision will be deemed severable from these Terms and Conditions and will not affect the validity and enforceability of the remaining provisions. These Terms and Conditions represent the entire agreement between GPA and applicant.
</p>
                                            </Col>
                                            <br /><br />
                                            <Col xs={12} md={12}>
                                                <p><b>Third Parties</b></p>
                                                <p>&emsp;Applicant agrees that GPA may communicate with you through email or similar electronic communication, which may include third party information that may be of interest to you. GPA will not share your information, including your name, address, phone number or email, with third parties, other than your pension plan administrators.
</p>
                                            </Col>
                                            <br /><br />
                                            <Col xs={12} md={12}>
                                                <p><b>Applicable Law and Venue</b></p>
                                                <p>&emsp;Unless otherwise specified, GPA controls and operates this Software from our offices within the State of Utah, United States of America. GPA does not claim that materials in this Software are appropriate or available for use in all locations. If you choose to access this Software from other locations, you do so on your own initiative and you are responsible for compliance with any applicable local laws, as set forth above. By visiting this Software, you agree that the laws of the State of Utah, United States of America, without regard to principles of conflict of laws, will govern these Terms and Conditions and any dispute of any sort that might arise between you and GPA or its affiliates.</p>
                                                <p>&emsp; If you take legal action relating to these Terms and Conditions, you agree to file such action only in the Third Judicial Circuit of the State of Utah or the United States District Court for the District of Utah, and you consent and submit to the exclusive personal jurisdiction of those courts for the purposes of litigating any such action.
</p>
                                            </Col>
                                            <br />
                                        </Col>
                                    </Row>
                                </Grid>

                                <Grid className="tc-form-view" id="tc-form-view">
                                    <Row>

                                        <Col md={4}>
                                            <b><label>First Name: {this.state.FirstName}</label></b>
                                        </Col><br />
                                        <Col md={4}>
                                            <b><label>Middle Name: {this.state.MiddleName}</label></b>
                                        </Col><br />
                                        <Col md={4}>
                                            <b><label>Last Name: {this.state.LastName}</label></b>
                                        </Col><br />

                                        <Col md={4}>
                                            <b><label>Current Date: {maxDate.toDateString()}</label></b>
                                        </Col><br />
                                        <Col md={4}>
                                            <b><label>Signed By: {this.state.SignedBy}</label></b>
                                        </Col><br />
                                        <Col md={4}>
                                            <b><label>Name: {this.state.Name}</label></b>
                                        </Col><br /><br />
                                    </Row>
                                </Grid>

                                <Grid className="tc-form" id="tc-form">
                                    <Row className="show-grid">
                                        <Col xs={2} md={1}>
                                        </Col>
                                        <Col xs={12} md={10}>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds" >
                                                    <TextField disabled={true} className="CS-First" hintText="Enter your First Name" floatingLabelText={<span>First Name<span className="manatoryfield">&nbsp;*</span></span>} value={this.state.FirstName} onChange={this.handleFirstName.bind(this)} />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds" >
                                                    <TextField className="CS-Middle"
                                                        disabled={true}
                                                        hintText="Enter your Middle Name"
                                                        floatingLabelText="Middle Name"
                                                        value={this.state.MiddleName}
                                                        onChange={this.handleMiddleName.bind(this)}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds" >
                                                    <TextField disabled={true} className="CS-Last" hintText="Enter your Last Name" floatingLabelText={<span>Last Name<span className="manatoryfield">&nbsp;*</span></span>} value={this.state.LastName} onChange={this.handleLastName.bind(this)} />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}></Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds" >
                                                    <DatePicker className="TC-datepicker" floatingLabelText={<span>Current Date<span className="manatoryfield">&nbsp;*</span></span>}
                                                        disabled={true}
                                                        value={this.state.maxDate}
                                                        locale="en-US"
                                                        firstDayOfWeek={0}

                                                    />
                                                </Col>

                                                <Col xs={12} md={4} className="input-fileds" >
                                                    <SelectField
                                                        className="reg-text"
                                                        value={this.state.SignedBy}
                                                        onChange={this.handleChangeTitle}
                                                        floatingLabelText={<span>Signed By<span className="manatoryfield">&nbsp;*</span></span>} >
                                                        <MenuItem value={"Current Employee"} primaryText="Current Employee" />
                                                        <MenuItem value={"Previous Employee"} primaryText="Previous Employee" />
                                                        <MenuItem value={"Spouse"} primaryText="Spouse" />
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds">
                                                    <TextField hintText="Enter Your Name" floatingLabelText={<span>Name of Person Agreed<span className="manatoryfield">&nbsp;*</span></span>} value={this.state.SignedByName} onChange={this.handleSignedByName.bind(this)} errorText={this.state.isValidName ? "Please Enter Valid Name" : ""} />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="TC-label" >

                                                </Col>
                                                <Col xs={12} md={4}  >
                                                    
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds Sign">
                                                <label className="LblAlign"> <b>Signature</b></label>
                                                    <SignaturePad ref={ref => this.signaturePad = ref} onEnd={this.handleSignatureChange.bind(this)} />
                                                    <Button id="clear" className="ClearBtn" onClick={this.handleSignatureClear.bind(this)}>Clear</Button>

                                                </Col>
                                                <SweetAlert
                                                    show={this.state.fileUploaderLink}
                                                    title="Success"
                                                    text={CliMsg}
                                                    onConfirm={this.handleNavAdminPage.bind(this)}
                                                />
                                                <Col xs={12} md={4} className="input-fileds Sign">
                                                
                                                </Col>
                                            </Col>
                                        </Col>
                                    </Row>
                                </Grid>

                            </div>
                        </Grid>

                    </div>
                    <Grid>

                        <div className="TC-Checkbox" >
                            <Row>
                                <Col xs={12} md={12}>
                                    <Col md={6} className="Checkalign">
                                        <Checkbox label="I have read and agree to the Terms and Conditions. " value={this.state.ischecked} onClick={this.handleCheck.bind(this)} style={styles.checkbox} />
                                    </Col>
                                    <Col md={6} className="Checkalign1 relPosition">
                                        {imagePreview}
                                        <Button className="TCButton " disabled={!isEnabled} onClick={this.pdfToHTML}>CONTINUE </Button>
                                    </Col>
                                </Col>
                            </Row>
                        </div>
                    </Grid>

                </Paper>
            </div>

        );
    }
}

//Redux Store Data
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(TermsAndCondition);
