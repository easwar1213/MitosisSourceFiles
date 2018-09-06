import React, { Component } from 'react';

// CSS
import '../Style/style.css';

// Bootstrap Component
import { Grid } from 'react-bootstrap';

// Material UI Component
import Paper from 'material-ui/Paper';

// Image
import NoCmpLogo from '../img/No_Image.png';

// API Calling Method
import axios from 'axios';

// Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

const style = {
  float: 'right',
};

var emailresult;

class TC extends Component {
  constructor(props) {
    super(props);
    
    /* Field State Values Initialization */
    this.state = {
      EmpCompanyName: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      SignedBy: '',
      Name: '',
      Signature: NoCmpLogo,
      UseridState:""
    };
  }

  componentDidMount() {
    emailresult = localStorage.getItem('applicant_email');
    console.log(emailresult)
    this.setState({ UseridState: emailresult});
    this.handleBenQusUSAuto(this);
  }

  // Handle Event
  handleBenQusUSAuto() {
    const thisObj = this;
    const BenQusAutoAPIUrl = 'https://h3p6kv0ve0.execute-api.us-west-2.amazonaws.com/Dev/GPA_TermsAndConditionDatas_Lambda';
    const BenQusAutoJSONData = JSON.stringify({
      QueryName: 'Read',
      UserID: emailresult,
    });
    console.log(BenQusAutoJSONData);
    const AxiosHeaderConfig = {
      headers: {
        // accept: 'application/json',
        'Access-Control-Request-Headers': '*',
        'Access-Control-Request-Method': '*',
        'Content-Type': 'application/json;charset=UTF-8',
        // "Access-Control-Allow-Origin": "*",
      },
    };
    axios({
      method: 'POST',
      url: BenQusAutoAPIUrl,
      data: BenQusAutoJSONData,
      // headers:AxiosHeaderConfig,

    }).then(({ data }) => {
      for (let i = 0; i < data.length; i++) {
        thisObj.setState({ FirstName: data[i].FirstName });
        thisObj.setState({ MiddleName: data[i].MiddleName });
        thisObj.setState({ LastName: data[i].LastName });
        thisObj.setState({ Date: data[i].DateOfSigned });
        thisObj.setState({ SignedBy: data[i].SignedBy });
        thisObj.setState({ Name: data[i].SignedByName });
        thisObj.setState({ Signature: data[i].Signature });
      }
    }).catch(() => {

    });
  }

  // Page Rendering
  render() {
    const { Signature } = this.state;
    let imagePreview = '';
    if (Signature) {
      imagePreview = (<img src={this.state.Signature} />);
    } else {
      imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div >
        <Paper zDepth={1} className="CommonDiv">
          <Grid>
            <div className="TC-content1">
              <h3> TERMS &amp; CONDITIONS</h3>
            </div >
            <p>&emsp;These documents set out the terms under which our firm will provide international pension research services to you. You should read through these documents and if there are any matters on which you require clarification, we will be happy to explain them in more detail. These terms will remain in force and shall apply to any business services provided to you now, or in the future. Should our firm change any of its business terms at a future date, we will advise you in writing in advance of the changes</p>
            <p>&emsp;As an overview only, and not as a full or complete description, the Terms &amp; Conditions for our services to you include:</p>
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
            <div className="TC-content1" id="test1">
              <h3>Global Pension Associates LLC -- Terms &amp; Conditions</h3>
            </div >
            <p>&emsp;Please read the following Terms and Conditions for using the services of Global Pension Associates LLC ("GPA") and this Software (the "Software"). By using the Software and the information and services available through the Software, you agree to follow and be bound by these Terms and Conditions.If you do not agree to these Terms and Conditions, do not use the Software. GPA owns the Software and reserves the right, at its discretion, to modify these Terms and Conditions at any time and any such modification will be effective immediately upon posting the modification. You should check these Terms and Conditions periodically for modifications. If you use the Software after we post modifications to the Software, then you will be bound by such modifications.</p>
            <p>&emsp;These Terms and Conditions are in addition to any other agreements between you and GPA, including any customer or account agreements and any other agreements that govern your use of products, services, content, tools and information available on the Software.</p>
            <p><b>Use of the Software</b></p>
            <p>&emsp;The Software is intended only for your personal, non-commercial use and display. You may download information from the Software to your computer and print out a hard copy for your personal reference, provided that you agree not to remove any copyright, trademark or other notices contained therein.</p>
            <p><b>No Recommendations or Advice Provided</b></p>
            <p>&emsp;GPA assists applicants with searching, locating and assisting applicants to obtain additional international retirement benefits based on the applicant’s work and employment outside of the applicant’s home country. GPA does not make recommendations oroffer investment advice of any kind.</p>
            <p>&emsp;GPA provides the content of the Software for informational, educational and noncommercial purposes only. Although GPA may provide data, information and content relating to international pension services, you should not construe any such information as investment, financial, tax, legal or other advice. You alone will bear the sole responsibility of evaluating the merits and risks associated with the use of any data, information or content on the Software or provided to you by any Pension Provider before making any decisions based on such data, information or content. In exchange for using such data, information or content, you agree not to hold GPA, <b>{this.state.EmpCompanyName}</b> the Pension Providers or their agents, employees, and officers liable for any possible claim for damages arising from any decision you make based on information made available to you by GPA or the Pension Providers, their subsidiaries, related companies, and their historical entities.</p>
            <p>&emsp;GPA makes no warranties regarding and is not liable for the accuracy of information provided by the Applicant or Pension Providers.</p>
            <p><b>Fees</b></p>
            <p>&emsp;GPA shall only charge you a fee or charge in the event that it obtains and you receive pension benefits. If GPA obtains benefits for you, you hereby agree to pay a one-time fee equal to the first two months of pension benefits received by you. Payment is due within ninety (90) days of the first receipt of benefits.</p>
            <p><b>Disclaimers and Limitations of Liability</b></p>
            <p>You expressly understand and agree that:</p>
            <p>&emsp;Your use of the software is provided on an “as is” and “as available” basis. To the full extent permitted under applicable law, GPA expressly disclaims all warranties of any kind with respect to the software and any products or services available on or through the software, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose and non-infringement. GPA makes no warranty that:</p>
            <ol>
              <li>The software will meet your requirements;</li>
              <li>The software will be uninterrupted, timely, secure or free of viruses, errors, worms, date bombs, time bombs or other harmful components;</li>
              <li>The results that may be obtained from the use of the software will be accurate or reliable;</li>
              <li>The quality of any products, services, information or other material purchased or obtained by you through the software will meet your expectations;</li>
              <li>Any errors on the software will be corrected; and</li>
              <li>The data and materials presented or displayed on the software are correct, accurate or reliable. Any content or data downloaded or otherwise obtained through the use of the software is done at your own discretion and risk. You will be solely responsible for any damage to your computer system or loss of data that results from the download of any such content.</li>
            </ol>
            <p>&emsp;&emsp;You agree that GPA,<b>{this.state.EmpCompanyName}</b>, or any third party engaged in providing services to you on or through the software shall not be responsible or liable for any damages caused by theft, unauthorized access, systems failure, communications line failure or other occurrences beyond the control of GPA or such third parties.</p>
            <p>&emsp;&emsp;No advice or information, whether written or oral, whether obtained by you from GPA, from a GPA employee or agent or through or from the software, shall create any warranty not expressly stated in these terms and conditions. GPA will not be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, revenue, income, goodwill, use, data or other intangible losses, resulting from:</p>
            <ol>
              <li>The use of or the inability to use the software;</li>
              <li>The cost of procurement of substitute goods and services resulting from any goods,&emsp; data, &emsp;information or services purchased or obtained or messages received or transactions entered into, through or from the software;</li>
              <li>Access to or alteration of your transmissions or data due to your conduct, inaction or negligence;</li>
              <li>Statements or conduct of any third party; or</li>
              <li>Any other matter relating to the software. </li>
            </ol>
            <p><b>Indemnification</b></p>
            <p>&emsp;You agree to indemnify, defend and hold harmless GPA, <b>{this.state.EmpCompanyName}</b>., and any and all Pension Providers, and their affiliates and the officers, directors, employees and agents from and against any and all claims, liabilities, damages, losses or expenses, including attorneys' fees and costs, arising out of or in any way connected with your access to or use of this software and/or your receipt or denial of benefits.</p>
            <p><b>Integration and Severability</b></p>
            <p> &emsp;If any provision of these Terms and Conditions is deemed unlawful, void or for any reason unenforceable, then that provision will be deemed severable from these Terms and Conditions and will not affect the validity and enforceability of the remaining provisions. These Terms and Conditions represent the entire agreement between GPA and applicant.</p>
            <p><b>Third Parties</b></p>
            <p>&emsp;Applicant agrees that GPA may communicate with you through email or similar electronic communication, which may include third party information that may be of interest to you. GPA will not share your information, including your name, address, phone number or email, with third parties, other than your pension plan administrators.</p>
            <p><b>Applicable Law and Venue</b></p>
            <p>&emsp;Unless otherwise specified, GPA controls and operates this Software from our offices within the State of Utah, United States of America. GPA does not claim that materials in this Software are appropriate or available for use in all locations. If you choose to access this Software from other locations, you do so on your own initiative and you are responsible for compliance with any applicable local laws, as set forth above. By visiting this Software, you agree that the laws of the State of Utah, United States of America, without regard to principles of conflict of laws, will govern these Terms and Conditions and any dispute of any sort that might arise between you and GPA or its affiliates.</p>
            <p>&emsp; If you take legal action relating to these Terms and Conditions, you agree to file such action only in the Third Judicial Circuit of the State of Utah or the United States District Court for the District of Utah, and you consent and submit to the exclusive personal jurisdiction of those courts for the purposes of litigating any such action.</p>
          </Grid>
          <Grid className="TCEdit">
            <b><label>First Name: {this.state.FirstName}</label></b>
            <br />
            <b><label>Middle Name: {this.state.MiddleName}</label></b>
            <br />
            <b><label>Last Name: {this.state.LastName}</label></b>
            <br />
            <b><label>Current Date: {this.state.Date}</label></b>
            <br />
            <b><label>Signed By: {this.state.SignedBy}</label></b>
            <br />
            <b><label>Name: {this.state.Name}</label></b>
            <br />
            <div style={style}>
              <label>Signature</label>
              <br />
              <div className="imgPreview">
                {imagePreview}
              </div >
            </div >
          </Grid>
        </Paper>
      </div >
    );
  }
}

// redux
const mapReducerStateToProps = state => ({
  LoginData: state.Login_Reducer,
  UserData: state.User_Reducer,
});

const mapDispatchToProps = dispatch => ({
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
  },
});

export default connect(mapReducerStateToProps, mapDispatchToProps)(TC);
