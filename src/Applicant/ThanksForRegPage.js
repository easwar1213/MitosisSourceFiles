import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import '../Style/style.css';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import CompanyLogo from '../img/logo.png';
import HeaderTop from '../Components/HeaderTop';
import Menubar from '../Components/PreMenu';
import axios from 'axios';

import {Flex} from 'react-flex-material';

//Routing
import history from '../Routing/history';

//Redux Data
import {connect} from 'react-redux';
import * as Action from '../Store/Action';

var varAppEmail;

class ThanksForReg extends Component { 
    constructor(props) {
        super(props);          
    this.state = {
        AppEmailState:"",
    };   
    var Params = new URLSearchParams(document.location.search);
    varAppEmail = Params.get("PAppEmail");          
}

handleNav(e){
    //this.handleAppProcessFlowSave(this);
    history.push('/Login');
}

handleAppProcessFlowSave(event) {
    let AppProFlowAPIUrl = "https://qxredca9lk.execute-api.us-west-2.amazonaws.com/Dev/GPA_AppProcessFlowDatas_Lambda";
    let JSONData = JSON.stringify({
        QueryName: "Save",
        UserID: varAppEmail
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
        
    }).catch((err) => {

    })
}

    render() {        
        return (
            <div>
            <HeaderTop/>
            <Flex layout="row" className="topheader">                  

                        <Flex flex="none">                           
                                <img src={CompanyLogo} alt="Company Logo" width="130" height="57" className="CompanyIcons1" />                         
                        </Flex> 
                </Flex>
            <Row >
                <Col md={12}>
                    <Paper zDepth={1} className="WelcomeDiv">
                        <div className="Headeralign">
                        <h3 className="WelcomeHeader1">
                            Thanks for Signing up!
                        </h3>
                        <div className="ContentAlign">
                            <p>A confirmation email has been sent to <b>{varAppEmail}</b> </p>
                            <p>Click to confirmation link in the email to activate your account</p>


                                   ----------------------------------------------------------
                            <p>If you don't see it, chances are it made its way into  your spam folder</p>
                                   ----------------------------------------------------------
                            {/* <p>Still did not get it <span className="LinkColor">Resend mail</span></p><br/> */}
                            <p>After successfully confirmed your email,please <span className="LinkColor" onClick={this.handleNav.bind(this)}>Click here...</span> to login</p>
                        </div>                                      
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

export default connect(mapReducerStateToProps,mapDispatchToProps)(ThanksForReg);