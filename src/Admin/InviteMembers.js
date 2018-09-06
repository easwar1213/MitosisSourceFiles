import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ReactFileReader from 'react-file-reader';
import SweetAlert from 'sweetalert2-react';
import * as XLSX from 'xlsx';
import { Flex } from 'react-flex-material';
import BackIcon from 'material-ui/svg-icons/content/reply';

//Routing
import history from '../Routing/history';


//import '../style.css';
import { fade } from 'material-ui/utils/colorManipulator';
import ContentLink from 'material-ui/svg-icons/action/question-answer';
import createHistory from 'history/createBrowserHistory';
import SvgIcon from 'material-ui/SvgIcon';
import RemoveRedEye from 'material-ui/svg-icons/action/dashboard';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import Download from '@axetroy/react-download';
var result1 = [];
var isValid;
var string1 = "email";
var string2 = "sample1@gmail.com";
var string3 = "sample2@gmail.com";
var textToSend = string1 + "\r\n" + string2 + "\r\n" + string3;



const styles = {
    margin: 20,

};
const emailList = [];
const SuffixItems = [];
SuffixItems.push(<MenuItem value={"1"} key={1} primaryText={`Single Member`} />);
SuffixItems.push(<MenuItem value={"2"} key={2} primaryText={`Bulk Member`} />);
const CompanyItems = [];

const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);

const style = {
    paddingLeft: 0,
};

class InviteMembers extends Component {

    constructor() {
        super();        
        this.handleLoadCompany(this);
        this.state = { show: false }
        this.state = {
            value: null,
            result1: [],
            Title: "",           
            EmailID: "",
            countrystate: null,
            statevalue: null,
            citystate: null,
            CountryFlag: "",
            StateSuffix: null,
            CitySuffix: null,
            validationError: {},
            isValidEmail: false,
            isValidMobile: false,
            code: '',
            showValidMsg: false,
            value: null,            
            isValidCountry: false,
            EmailState: "",
            isValidFlag: "",
            Mobileno: "",
            Fileinput: true,
            filename: "",
            showValidEmailMsg: false,
            InvnLinkStatus: "Pending",
            validEmailForm: true
        }
        // this.InvitationLinkCheck(this);
    }
    handleChangeCountry = (event, index, Suffix) => {
        this.setState({ countrystate: Suffix });
    };
    handleChangeState = (event, index, StateSuffix) => {
        this.setState({ statevalue: StateSuffix });
    };
    handleChangeCity = (event, index, CitySuffix) => {
        this.setState({ citystate: CitySuffix });
    };
    handleChangeEmail = (e) => {
        this.setState({ EmailState: e.target.value });    };

    handleLoadCompany(event) {
        let LoadCountryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            { QueryName: "InviteMembersClientCompanies" }
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
            CompanyItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                CompanyItems.push(<MenuItem value={data[i].CompanyCode} key={i} primaryText={data[i].CompanyName} />);
            }

        }).catch((err) => {
            console.log(err);
        })
    }    

    handleReadClientCompany(event) {         
        this.setState({ validEmailForm:true }, ()=>{ var isValid = this.handleValidateForm(this); 
            if (isValid) {           
                var actualEmail = this.state.EmailState;
                var thisObj = this;           
                var CallAPIData = function (api_url, api_inputdata) {
                    var promise = new Promise(function (resolve, reject) {
                        axios({
                            method: "POST",
                            url: api_url,
                            data: api_inputdata,
                            //headers: AxiosHeaderConfig,
                        }).then(({ data }) => {                            
                            resolve(data);                        
                        }).catch((error) => {
                            reject(error);
                        })
                    })
                    return promise;
                }
    
                let ReadCliCompanyAPIUrl = "https://hxka7dtm3m.execute-api.us-west-2.amazonaws.com/dev/invitemember";
                var JSONDataSendMail = JSON.stringify({
                    EmailList: this.state.EmailState != "" ? this.state.EmailState : result1
                });
                let AxiosHeaderConfig = {
                    "Content-Type": "application/json",
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*",
                }
                // check the status
                let LoadCountryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
                let JSONData = JSON.stringify(
                    {
                        QueryName: "InviteStatus",
                        Email: this.state.EmailState,
                    }
                );               
                let ReadValidCompAPIUrl = "https://cx1y9bpqe2.execute-api.us-west-2.amazonaws.com/Dev/GPA_ReadClientCompanyDatas_Lambda";
                var CompJSONData = JSON.stringify({
                    QueryName:"IM",
                    CompanyID: thisObj.state.statevalue,
                    UserID:thisObj.state.EmailState
                });
                CallAPIData(ReadValidCompAPIUrl, CompJSONData)
                .then((data) => {
                    if(data.length>0)
                {                    
                var isValid = this.handleValidateForm(this);            
                if(isValid){                   
                CallAPIData(LoadCountryAPIUrl, JSONData)
                    .then((data) => {                        
                        if (data[0].InviteStatus == "C") {                        
                            this.setState({ InvnLinkStatus: "Confirmed" });
                            this.setState({ validEmailForm: false }); 
                            this.setState({ showValidEmailMsg: false });
                        }                                           
                        var isValid = this.handleValidateForm(this);
                        if(isValid){                            
                        CallAPIData(ReadCliCompanyAPIUrl, JSONDataSendMail)
                            .then(() => {                            
                                thisObj.setState({ InvnLinkMsg: true });
                                thisObj.setState({ countrystate: "" });
                                thisObj.setState({ statevalue: "" });
                                thisObj.setState({ EmailState: "" });
                            }).catch(() => {
                                thisObj.setState({ InvnLinkMsg: true });
                                thisObj.setState({ countrystate: "" });
                                thisObj.setState({ statevalue: "" });
                                thisObj.setState({ EmailState: "" });
                            })
                        }
                    }).catch((error) => {    
                    })
                }
            }
            else{            
                thisObj.setState({showValidEmailMsg:true});            
            }  
            }).catch(() => {
                    
            })              
            }        
        });
    }
   

    handleValidateForm(event) {        
        let validForm = false;
        var validCForm = false;
        var validSForm = false;
        var validEForm = false;
        var validFForm = false;

        if (this.state.countrystate != null) {
            this.setState({ isValidCountry: false });
            validCForm = true;
        }
        else {
            this.setState({ isValidCountry: true });
        }
        if (this.state.statevalue != null) {
            this.setState({ isValidState: false });
            validSForm = true;
        }
        else {
            this.setState({ isValidState: true });
        }
        if (this.state.Fileinput != true) {
            this.setState({ isValidFile: false })
            validFForm = true
        }
        else {
            this.setState({ isValidFile: true })
        }
        if (this.state.EmailState.length > 0) {
            this.setState({ isValidEmailState: false });
            validEForm = true;
        }
        else {
            this.setState({ isValidEmailState: true });
        }
        // if (validEForm == true) {
        //     let InvnLinkStatus1 = this.InvitationLinkCheck(this);
        //     if (InvnLinkStatus1 == "Confirmed") {
        //         validEForm = false;
        //     }
        // }
        if (this.state.countrystate == 2) {
            if (validCForm && validSForm && validFForm) {
                validForm = true;
            }
            else {
                validForm = false;
            }
        }
        else {        
            if (validCForm && validSForm && validEForm && this.state.validEmailForm) {
                validForm = true;
            }
            else {
                validForm = false;
            }
        }        
        return validForm;
        
    }

    handleNavDashboard() {
        history.push('/AdminDashboard');
    }


    handleFiles = files => {
        //var name = f.name;
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            // alert(bstr);
            const wb = XLSX.read(bstr, { type: 'binary' });
            // alert(JSON.stringify(wb));
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

            var lines = data.split("\n");
            result1.length = 0;
            // var headers = lines[0].split(",");
            for (var i = 1; i < lines.length; i++) {
                if (lines[i] == "") { continue; }
                result1.push(lines[i]);
            }
            /* Update state */
        };        
        reader.readAsBinaryString(files[0]);
        this.setState({ Fileinput: false, filename: files[0].name, isValidFile: false });
    }


    // handleFiles = files => {
    //     var reader = new FileReader();
    //     reader.onload = function (e) {
    //         var content = reader.result;                       
    //         var lines = content.split("\n");
    //        // var headers = lines[0].split(",");
    //         for (var i = 1; i < lines.length; i++) {
    //             if (lines[i] == "") { continue; }                              
    //             result1.push(lines[i]);
    //         }
    //      }         
    //     reader.readAsText(files[0]);
    //     this.setState({ Fileinput:false,filename:files[0].name,isValidFile:false });
    // }

    render() {
        const { statevalue, countrystate, citystate } = this.state;
        return (
            <div className="main-wrapper">
                <div className="HeaderTile">                   
                    <Flex className="show-grid" layout="row">
                        <Flex flex="none">
                            <div className="TitleIcon">
                                <h4><span className="TitleIconColor">{<ContentLink />}</span><span className="TitleTexColor">Invite Members</span></h4>
                            </div>
                        </Flex>
                        <Flex flex layout align="end center">
                            <div>
                                <h5><span className="BreadCrumbsClass"><BackIcon /></span>&nbsp;&nbsp;<b><span onClick={this.handleNavDashboard.bind(this)} className="ActiveClass">Home / Dashboard</span></b></h5>
                            </div>
                        </Flex>
                    </Flex>                  
                </div>
              
                <Paper zDepth={1} className="CommonDiv">
                    <h2 className="legendtitle">Invite Members</h2>   
                        <div className="fieldstyle">
                        <Col md={12} xs={12} className="ClientReg">                          
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} className="input-fileds">
                                        <SelectField
                                            value={countrystate}
                                            floatingLabelText={<span>Type<span className="manatoryfield">&nbsp;*</span></span>}
                                            onChange={this.handleChangeCountry}
                                            maxHeight={200}
                                        >

                                            {SuffixItems}
                                        </SelectField>
                                        <span className="validationmsg">{this.state.isValidCountry ? "Please Select Your Type" : null}</span>
                                    </Col>
                                    <Col xs={12} md={12} className="input-fileds">
                                        <SelectField
                                            value={statevalue}
                                            floatingLabelText={<span>Business<span className="manatoryfield">&nbsp;*</span></span>}
                                            onChange={this.handleChangeState}
                                            maxHeight={200}
                                        >
                                            {CompanyItems}
                                        </SelectField>
                                        <span className="validationmsg">{this.state.isValidState ? "Please Select Your Company " : null}</span>
                                    </Col>

                                </Col>

                                <Col xs={12} md={12}>
                                    {(countrystate == 1) ?
                                        <Col xs={12} md={12} className="input-fileds">
                                            <TextField hintText="Enter your Email" floatingLabelText={<span>Email<span className="manatoryfield">&nbsp;*</span></span>}
                                                name="Address"
                                                type="email"
                                                value={this.state.EmailState}
                                                onChange={this.handleChangeEmail.bind(this)}
                                            />                                                
                                            <span className="validationmsg">{this.state.isValidEmailState ? "Please Enter Your Email" : ""}</span>
                                            <span className="validationmsg">{this.state.showValidEmailMsg ? "Company Information Not Match with Your Information" : ""}</span>                                                                
                                            <span className="validationmsg">{this.state.validEmailForm == false ? "Invitation Link has been already Sent to this Customer." : ""}</span>
                                            {/* <span className="validationmsg">{(this.state.validEmailForm && this.state.showValidEmailMsg) ? "Company Information Not Match with Your Information" : ""}</span>
                                            <span className="validationmsg">{(this.state.validEmailForm && this.state.showValidEmailMsg && this.state.isValidEmailState) ? "Company Information Not Match with Your Information" : ""}</span> */}
                                        </Col> : ''}
                                    {(countrystate == 2) ?
                                        <Col xs={12} md={12} className="input-fileds">
                                            <ReactFileReader handleFiles={this.handleFiles.bind(this)} fileTypes={'.xlsx,.csv,.txt'}>
                                                <RaisedButton className="UploadBtn" label="Upload File" labelPosition="before" style={styles.button} containerElement="label">
                                                    <span className="validationmsg">{this.state.isValidFile ? "Please Select The File" : null}</span>
                                                    <div id="targetLayer">{this.state.filename}</div>
                                                </RaisedButton>
                                            </ReactFileReader>

                                        </Col> : ''}
                                    {(countrystate == 2) ?
                                        <Col xs={12} md={2} className="input-fileds">
                                            <Download file="sample.csv" content={textToSend}>
                                                <Button type="button" className="DownloadBtn">Download Sample File</Button>
                                            </Download>
                                        </Col> : ''}
                                    <Col xs={12} md={12} className="RegButton" style={styles}>
                                        <Button type="submit" className="RegButton1">Invite</Button>
                                    </Col>
                                    {/* <span className="validationSuccessmsg">{this.state.InvnLinkMsg ? "Invitation Link has been sent Successfully" : null}</span> */}
                                    <SweetAlert
                                        show={this.state.InvnLinkMsg}
                                        title="Success"
                                        text="Invitation Link has been sent Successfully !"
                                        onConfirm={() => this.setState({ InvnLinkMsg: false })}
                                    />
                                </Col>
                                </form>
                            </Col>
                        </div> 
                    
                </Paper>                
            </div>

        );
    }  

    handleSubmit(event) {
        event.preventDefault();
        var IsvalidUrl;
        var thisObj = this;
        this.state.countrystate == 1 ? IsvalidUrl = this.handleReadClientCompany(this) : null;
        var isValid = this.handleValidateForm(this);
        if (isValid) {
            if (this.state.countrystate == 2) {
                let clientRegAPIUrl = "https://7jfchop1yd.execute-api.us-west-2.amazonaws.com/dev/";
                let clientRegJSONData = JSON.stringify({
                    EmailList: this.state.EmailState != "" ? this.state.EmailState : result1

                });
                let AxiosHeaderConfig = {
                    headers: {
                        accept: 'application/json',
                        "Access-Control-Request-Headers": "*",
                        "Access-Control-Request-Method": "*",
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Access-Control-Allow-Origin": "*",
                    }
                };
                axios({
                    method: "POST",
                    url: clientRegAPIUrl,
                    data: clientRegJSONData
                }).then((data) => {
                    thisObj.setState({ InvnLinkMsg: true });
                    thisObj.setState({ countrystate: "" });
                    thisObj.setState({ statevalue: "" });
                    thisObj.setState({ EmailState: "" });
                }).catch((err) => {
                    thisObj.setState({ InvnLinkMsg: true });
                    thisObj.setState({ countrystate: "" });
                    thisObj.setState({ statevalue: "" });
                    thisObj.setState({ EmailState: "" });
                })
            }
        }
    }
}
export default InviteMembers;


