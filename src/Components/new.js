import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import CompanyLogo from '../img/logo.png';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PowerSetting from 'material-ui/svg-icons/action/power-settings-new';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col, Button } from 'react-bootstrap';
// import TermsAndConditionCN from './TermsAndConditionCN';
// import TermsAndConditionDU from './TermsAndConditionDU';
// import TermsAndConditionES from './TermsAndConditionES';
// import TermsAndConditionGE from './TermsAndConditionGE';
// import TermsAndConditionKR from './TermsAndConditionKR';
// import TermsAndConditionNR from './TermsAndConditionNR';
// import TermsAndConditionPR from './TermsAndConditionPR';
import '../Style/style.css';
import SignaturePad from 'react-signature-pad';
import * as jsPDF from 'jspdf';
import createHistory from 'history/createBrowserHistory';
import S3FSFileUpload from './S3FSFileUpload';
import * as aws from 'aws-sdk';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, AmazonCognitoIdentity } from 'amazon-cognito-identity-js';
import { CognitoIdentityCredentials } from 'aws-sdk';
import axios from 'axios';



const history = createHistory();
const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

class TermsAndConditionPDF extends Component {
    constructor(props) {
    super(props);
    this.state = {
        ischecked: false,
    }
    }
    
 handleCheck() {
    if (this.state.ischecked == false || this.state.ischecked == '') {
        this.setState({
            ischecked: true 
        });
        // this.handleScrollClick(this);
    }
    else {
        this.setState({
            ischecked: false
        });
        // this.handleScrollUpClick(this);
    }
 }
 canBeSubmitted(e) {
    const { ischecked } = this.state;
   
    return ( ischecked == true);
    }   
    
 render() {
 const isEnabled = this.canBeSubmitted();
 
 return (
 

    <Grid>
        <Row>
            <div className="divToPrint1">
            <div className="TC-header">
            <h3> TERMS &amp; CONDITIONS</h3>
            </div>
            
                <Col xs={10} md={11}>
                    <Col xs={8} md={12}> 
                        <p>&emsp;&emsp;These documents set out the terms under which our firm will provide international pension research services to you. You should read through these documents and if there are any matters on which you require clarification, we will be happy to explain them in more detail. </p><br></br><p>&emsp;&emsp;These terms will remain in force and shall apply to any business services provided to you now, or in the future. Should our firm change any of its business terms at a future date, we will advise you in writing in advance of the changes</p> <br></br>
                        <Col xs={8} md={12}>
                            <p>&emsp;&emsp;As an overview only, and not as a full or complete description, the Terms &amp; Conditions for our services to you include:</p>
                        </Col><br></br>
                        <Col xs={12} md={12}>
                            <ul>
                                <li>The Agreement is between Global Pension Associates LLC ("GPA") and You (the "Applicant").</li>
                                <li><span>GPA will assist the Applicant by searching, locating, and assisting the Applicant to obtain additional retirement benefits from country and/or private pension providers ("Pension Providers") based on employment and residence time of the Applicant outside of the Applicant's home country.</span></li>
                                <li>The Applicant agrees to and shall indemnify <b>{this.state.FirstName} {this.state.MiddleName} {this.state.LastName}</b>.including their subsidiaries, related companies, and historical entities, from all claims related to benefits received or not received by the Applicant.</li>
                                <li>If GPA obtains no benefits for the Applicant, there will be no charge or fee to the Applicant.</li>
                                <li>GPA makes no guarantees or assurances that benefits can or will be obtained for the Applicant.</li>
                                <li>If GPA obtains benefits for the Applicant, the Applicant will pay a one-time fee equal to the first two months of pension benefits received by the Applicant. Payment is due within ninety (90) days of the first receipt of benefits.</li>
                                <li>GPA, <b>{this.state.FirstName} {this.state.MiddleName} {this.state.LastName}</b>., Pension Providers, and their agents and employees are not able to, and do not, provide tax, legal, or financial advice to the Applicant.</li>
                                <li>GPA is not liable for the accuracy of information provided by the Applicant or Pension Providers.</li>
                            </ul>
                        </Col>
                    </Col>
                </Col>
                </div>
            <div className="TC-Checkbox" >
            
                <Col xs={12} md={12}>
                    <Col md={6} className="Checkalign">
                        <Checkbox label="I have read and agree to the Terms and Conditions. " value={this.state.ischecked} onClick={this.handleCheck.bind(this)} style={styles.checkbox} />
                    </Col>

                {/* <a href='/WelcomePage'> <RaisedButton label="Continue" disabled={true} primary={true} disabled={!this.state.code} /></a> */}
                    <Col md={6} className="Checkalign1">
                        <Button className="TC-button" disabled={!isEnabled} onClick={this.pdfToHTML}>CONTINUE </Button>
                    </Col>
                </Col>
            
            </div>
            
            </Row>
    </Grid>

    
   
 );
 }
}
export default TermsAndConditionPDF;

