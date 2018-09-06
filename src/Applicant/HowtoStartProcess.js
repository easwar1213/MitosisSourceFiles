import React from "react";

//Bootstrap Component
import { Row, Col, Button } from 'react-bootstrap';

//Material UI Component
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
//API Calling Method
import axios from 'axios';
//Routing
import history from '../Routing/history';
var emailresult;
class Example extends React.Component {

    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
    }

    handleAppProcessFlowUpdate(event) {
        let AppProFlowAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify({
            QueryName: "ApplicantProcessFlowTrackingUpdateHTS",
            UserID: emailresult,
            HowToStart: "C"
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
            history.push('/GeneralQuestionnarie');

        }).catch((err) => {

        })
    }
    //Redirect to General Questionnaire
    handleNavPage(e) {
        history.push('/GeneralQuestionnarie');
    }

    //Page Rendering
    render() {
        return (
            <div>
                <Paper zDepth={1} className="CommonDiv">
                    <div>
                        <div id="divToPrint" >
                            <Row className="show-grid">
                                <Col xs={12} md={12}>
                                    <p className="StepperHeading"><b>How to Start the Process</b></p>
                                    {/* <h4 className="HeadingColr">ARE YOU ELIGIBLE FOR A FOREIGN PENSION?</h4> */}
                                    <p className="StepperHeading1"><b>Social Security Benefits and Previous Employer Pensions</b></p>
                                    <p>____________________________________________________________________________________________________________________________________________</p>
                                    <p><u><b>The Process:  </b></u></p>
                                    <ul>
                                        <li>GPA will send a Pension eligibility request letter to any applicable foreign countries where you have lived or worked (at your request).  This does not include country of citizenship in regards to public pensions, such as Social Security except in cases where a form might allow for multiple requests.</li>
                                        <li>We also assist in locating possible private pensions you may be eligible for (from previous employers – domestically & overseas, including your country of citizenship).</li>

                                        <li>There are 3 questionnaires to step you through the process:</li>
                                        <ol type="1">
                                            <li><b> General Questionnaire </b>- basic questions you generally know without reference.</li>
                                            <li><b> Residence Questionnaire</b> – See the checklist below to help you gather the answers to these questions (if you do not know exact answers, it’s generally acceptable to approximate).</li>
                                            <li><b> Benefits Questionnaire </b>– based on your residence history, you will be asked questions specific to each country and their application process. Depending on your Date of Birth, this questionnaire may not be provided until close to time of retirement, in case of any changes you may have. However an eligibility request letter may still be sent to determine expectations and options.</li>
                                        </ol>
                                    </ul>
                                    <p><b>Questions:</b></p>
                                    <ul>
                                        <li>A checklist and question list are provided to help you know what answers you will need.</li><br />
                                        <ul>
                                            <li><b>The Social Security / National Insurance number</b> you had in each country you resided (OPTIONAL). This is your unique number to identify you in each country, may be called a social security number, national insurance number, etc., depending on the country.</li>
                                            <li><b> Approximate</b> dates when you resided in each country (arrival and departure – approximate).</li>
                                            <li>Address where you <b>resided</b> for the longest time in each country (If unknown, city and country is acceptable).</li>
                                            <ul>
                                                <li>NO Gaps in time - Try not to leave any gaps in time (even unemployment). This is because your residence is an important part of benefits approval in many places. </li>
                                                <li>Start with your first residence from the age of 18.</li>
                                            </ul>
                                            <li>List your employers in each country <b>if</b> you would like to check for possible Employer Pensions you may be eligible for.</li>
                                        </ul>
                                        <li>Depending on the countries you resided, different questions will be asked. This is based on the application process of each country.</li>
                                    </ul>
                                    <p className="StepperHeading2"><u><b>Residence / Employment Info List</b></u></p>
                                    <p><b>Country 1:</b>_________________________	Foreign residence Social / National Insurance number (if Known) ­­­­­­­­­___________________ _____________________________________________</p>
                                    <p>Approx. Arrival Date (month optional): ________________________ Approx. Departure Date (month optional): ______________ _____________________________________</p>
                                    <p>Personal Address where you lived the longest (City & Country minimally):_________________________________ ___________________________</p>
                                    <p>Name of Employer 1 in this country:   __________________________________________________________________</p>
                                    <p>Name(s) of other Employer(s) in this country:</p>
                                    <p>_________________________________________________________________________________</p>
                                    <br />
                                    <p><b>Country 2:</b> _________________________	Foreign residence Social / National Insurance number (if Known) ­­­­­­­­­_________________________</p>
                                    <p>Approx. Arrival Date: ________________________ Approx. Departure Date: _________________________</p>
                                    <p> Personal Address where you lived the longest (City & Country minimally):____________________________________________________________</p>
                                    <p>Name of Employer 1 in this country:   __________________________________________________________________</p>
                                    <p>Name(s) of other Employer(s) in this country: _________________________________________________________________________________</p>
                                    <br />
                                    <p><b>Country 3:</b> _________________________	Foreign residence Social / National Insurance number (if Known) ­­­­­­­­­_________________________</p>
                                    <p>Approx. Arrival Date: ________________________ Approx. Departure Date: _________________________</p><br />
                                    <p>Personal Address where you lived the longest (City & Country minimally):____________________________________________________________</p>
                                    <p>Name of Employer 1 in this country:   __________________________________________________________________</p>
                                    <p>Name(s) of other Employer(s) in this country: _________________________________________________________________________________</p>
                                    <br />
                                    <p><b>Documents:</b>  Some Documents may be required by the respective countries when requesting a forecast of future benefits, and/or at the time of application for benefits:</p>
                                    <ul>
                                        <li><b>Communication approvals </b></li>
                                        <ul>
                                            <li>The following items allow us to communicate on your behalf.  We do not charge fees for this, and we do not handle any monetary benefits you may receive.</li>
                                            <li>Limited Power of Attorney signed and notarized for each country, plus extra original for GPA records.</li>
                                            <li>Authority to represent / communicate – some countries also require a governmental form to allow third parties to communicate on your behalf.</li>
                                        </ul>
                                        <li><b>Life documents:</b> When it is time to send your application for benefits many countries require originals or copies of:</li>
                                        <ul>
                                            <li>Birth Certificates</li>
                                            <li>Marriage Certificates</li>
                                            <ul>
                                                <li>These are only needed at time of application, approximately 3 months from eligible age of retirement for each country. </li>
                                            </ul>
                                        </ul>
                                        <li><b>Financial Institution Information</b></li>
                                        <ul>
                                            <li>Benefits are generally sent via direct deposit.  For a country to send your benefits, many require your bank information (account/routing numbers, address, etc.).  </li>
                                            <li>Some countries ask for bank information on the application, and some have a separate bank form to use.</li>
                                            <li>If you do not feel comfortable giving your bank information, you may wish to start a separate account so you feel more secure. </li>
                                            <li>We sometimes email you the deposit forms, so you can complete. At times, your financial institution is required to provide certification as well. Once completed, you can mail to our office. (This is only needed at the time of application when you reach or are near retirement age).</li>
                                        </ul>
                                    </ul>
                                    <p>For other questions, you may wish to visit our Customer Support section.</p>
                                </Col>
                                <div className="PrintOption">
                                    <p><u><b>Please feel free to print this out as a guideline</b></u></p>
                                    <RaisedButton className="printbutton" label="PRINT" primary={true} onClick={() => window.open("https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/template/questions/howtostart.pdf", "_blank")} />
                                </div>
                                <Button type="submit" onClick={this.handleAppProcessFlowUpdate.bind(this)} className="RegButton2">Next</Button>
                            </Row>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}
export default Example;