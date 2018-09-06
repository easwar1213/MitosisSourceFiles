import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import '../Style/style.css';
import { Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';

//Routing
import history from '../Routing/history';

//Redux Data
import {connect} from 'react-redux';
import * as Action from '../Store/Action';

var emailresult;

class WelcomePage extends Component {   

    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
    }

    handleAppProcessFlowRead(event) {
        emailresult = localStorage.getItem('applicant_email');
        let AppProFlowAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify({
            QueryName:"ApplicantProcessFlowTrackingRead",
            UserID: emailresult 
        }); 
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data:JSONData,
            url: AppProFlowAPIUrl,
            //headers:AxiosHeaderConfig,

        }).then(({data}) => {
            let MatchFlag=false;
            if(data.length>0)
            {           
                for (let i = 0; i < data.length; i++) {
                    if(data[i].TC=="C")
                    {     
                        MatchFlag=true;
                    }
                }
                if(MatchFlag)
                {                
                    history.push('/ApplicantDashboard');
                }
                else
                {
                    history.push('/TermsAndCondition');
                }
            }
            else
            {
                history.push('/TermsAndCondition');
            }  
        }).catch((err) => {
            
        })
    }

    handleAppProcessFlowUpdateWel(event) {
        let AppProFlowAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify({
            QueryName:"ApplicantProcessFlowTrackingUpdateWel",
            UserID: emailresult ,
            Welcome:"C"          
        });
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data:JSONData,
            url: AppProFlowAPIUrl,
            //headers:AxiosHeaderConfig,

        }).then(({data}) => {

        }).catch((err) => {

        })
    }

    handleContinue(event){
        this.handleAppProcessFlowUpdateWel(this);
        this.handleAppProcessFlowRead(this);
    }

    render() {        
        return (
            <div>           
            <Row >
                <Col md={12}>
                    <Paper zDepth={1} className="WelcomeDiv">
                        <div className="Welcomedesign">
                        <h3 className="WelcomeHeader">
                            Welcome to Global Pension Associates!
                        </h3>
                        <div className="WelcomeContent">
                        <p>On behalf of Global Pension Associates (GPA) and your employer, GPA is excited to bring you this new no cost service as part of your employer's benefits package. </p>
                        <p>Through our custom secure software and professional expertise, GPA specializes in assisting applicants with potential financial retirement and other related benefits based on employment history and country residency history in more than 50 countries and over 250,000 private pension plans around the world.   We assist in securing a multitude of potential benefits (based on qualifications being met) including, but not limited to:</p>
                    
                        <ul>
                            <li>International Social Security or National Insurance Qualification</li>
                            <li>Corporate Private Pension Plans (Within Both Active and Non-Active/Bankrupt Entities)</li>
                            <li>Country Based Private Pension Plans or Schemes</li>
                            <li>Process Guidance on How to Increase Your Home Country Benefits For Shorter Term Residencies Outside of Your Home Country</li>
                            <li>Process Guidance on Increasing or Obtaining Your International Retirement Benefits with Annual Voluntary Contributions</li>
                            <li>Spousal and Child Pension Benefits</li>
                            <li>Survivor Benefits</li>
                        </ul>
                        
                        <p>Worldwide there are billions of dollars of benefits due to individuals who are mostly unaware that they may be eligible.   Combine the difficulty of completing the already bureaucratic tedious process with the added factor of multiple languages and literally thousands of combinations of potential requirements make this process incredibly complex and time consuming.   </p>

                        <p>We strive to make this process and each step as easy as possible.    Our initial registration process should take no more than 30 minutes to complete.</p>

                        <p>We understand how sensitive some of the data you provide Global Pension Associates is. To best secure your data from unauthorized viewing, we fully encrypt your data at all times. To maintain the privacy of your data, we will not share your information with third parties unless you explicitly allow us to.</p>
                        </div>
                        <Row >
                            <Col xs={12} md={12}>
                                <Button  className="TCButton" onClick={this.handleContinue.bind(this)} >CONTINUE</Button>
                            </Col>
                        </Row>  
                        </div>
                    </Paper>
                </Col>
            </Row>
            </div>
        );
    }
}

/// react redux
const mapReducerStateToProps = (state)=>{
    return{
        LoginData:state.Login_Reducer,
        UserData:state.User_Reducer,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        setUserID:(PLUserID)=>{
            dispatch(Action.setUserID(PLUserID));
        },
        setPassword:(PLPassword)=>{
            dispatch(Action.setPassword(PLPassword));
        },
        setUserName:(PUserName)=>{
            dispatch(Action.setUserName(PUserName));
        },
        setCCompanyID:(PCCompanyID)=>{
            dispatch(Action.setCCompanyID(PCCompanyID));
        },
        setUTCStatus:(PUTCStatus)=>{
            dispatch(Action.setUTCStatus(PUTCStatus));
        }       
    }
}

export default connect(mapReducerStateToProps,mapDispatchToProps)(WelcomePage);
