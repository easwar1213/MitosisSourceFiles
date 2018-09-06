import React, { Component } from 'react';
import { Col, Panel, Row, Button, Grid } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import '../Style/style.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import { Flex } from 'react-flex-material';
import EmployeeIcon from 'material-ui/svg-icons/action/description';
import SvgIcon from 'material-ui/SvgIcon';
import BackIcon from 'material-ui/svg-icons/content/reply';
import Checkbox from 'material-ui/Checkbox';
// import QRCode from 'qrcode.react';
//import QRCode from 'qrcode-svg';
import QRCode from 'qrcode';
//var QRCode = require('qrcode.react');
//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';
//Routing
import history from '../Routing/history';
// import TextToImage from 'reactjs-text-to-image';
const CountryItems = [
    <MenuItem value={"CA"} primaryText="Canada" />,
    <MenuItem value={"DK"} primaryText="Denmark" />,
    <MenuItem value={"FR"} primaryText="France" />,
    <MenuItem value={"IT"} primaryText="Italy" />,
    <MenuItem value={"JP"} primaryText="Japan" />,
    <MenuItem value={"QC"} primaryText="Quebec" />,
    <MenuItem value={"UK"} primaryText="United Kingdom" />,
    <MenuItem value={"US"} primaryText="United States of America" />
];
const table2Options = {
    sizePerPage: 5,
};
const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);
class ApplicantDocGatheringTracking extends Component {
    constructor() {
        super();
        this.state = {
            UserIDState: "",
            CountryState: "",
            FinalStatusState: "",
            AppDocGatherTrackID: "",
            tableData: [],
            StatusChecked: false,
            OverallDocumentStatus: "",
            ApplicantAge: "",
            ApplicantAgeMonth: "",
            DateOfBirth: "",
            QRImages: "",
            editedImgUrl: "",

        }
        this.handleApplicantDocTrackingRead(this);
    }
    handleChangeUserID(e) {
        this.setState({ UserIDState: e.target.value });
    };
    handleChangeCountry(e, index, value) {
        this.setState({ CountryState: value });
    };
    handleChangeFinalStatus(e, index, value) {
        this.setState({ FinalStatusState: value })
    }
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="warning" className="btnStyle" onClick={() => this.handleApplicantDocTrackingEdit(row.AppDocGatherTrackID)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
            </div>
        )
    }
    ProcessButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button onClick={() => this.handlerProceedData(row.DocFinalStatus)} className="BtnColor" >Procced</Button>
            </div>
        )
    }
    CheckboxButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Checkbox onClick={this.handlerChecked.bind(this)} />
            </div>
        )
    }
    handlerProceedData(e) {
        this.setState({ OverallDocumentStatus: e });
        let thisObj = this;
        let mailSendURL = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
        let QrCodeSendData = {
            "MainFolderName": "applicant",
            "SubFolderName": this.props.LoginData.LUserID,//"pitchaimuthu.k@mitosistech.com",
            "MailDocName": "PAF",
            "LangCode": "en",
            "EmailTo": this.props.LoginData.LUserID,// "pitchaimuthu.k@mitosistech.com"//this.props.LoginData.LUserID,//'pitchaimuthu.k@mitosistech.com'//this.props.LoginData.LUserID//"easwaran.k@mitosistech.com"
        }
        //
        //qr code converter:
        let QrCodeConvertURL = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/terms_htmlpdfconv";
        let QrCodeConvert = {
            "html": "Data",
            "language": "en",
            "DocCategory": "paf",
            "FCLType": "Pre",
            "params": {
                "empId": this.props.LoginData.LUserID,//"pitchaimuthu.k@mitosistech.com",
                "companyName": "GPA",
                "ninumber": "5485647454",
                "qrcode": thisObj.state.editedImgUrl,
                "Countrycitizenship": "India",
                "firstName": "Easwaran",
                "middleName": "K",
                "lastName": "Kittusamy",
                "othersurnames": "Tamil",
                "dateofbirth": "13-Jan-1991",
                "maritalstatus": "Single",
                "datemarriagedeath": "Sep-17",
                "Countryaddress": "Chennai",
                "dateleftcountry": "Sep-15",
                "signedBy": "Current Employer",
                "empSignature": "",
                "signedbyname": "Easwaran Kittusamy"
            }
            // "html": "Data",
            // "language": "en",
            // "DocCategory": "paf", 
            // params: {
            //     "empId": "pitchaimuthu.k@mitosistech.com",       
            //     "qrcode": this.state.editedImgUrl,    
            //     "firstName": "Easwaran",
            //     "middleName": "K",
            //     "lastName": "Kittusamy",    
            //     "dateofbirth": "13-Jan-1991"    
            // },
        };
        let foreCastMailSendURL = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
        let foreCastMailInputData = {
            "MainFolderName": "applicant",
            "SubFolderName": this.props.LoginData.LUserID,//"pitchaimuthu.k@mitosistech.com",
            "MailDocName": "FCL",
            "FCLType": "Pre",
            "LangCode": "en",
            "EmailTo": this.props.LoginData.LUserID,//"pitchaimuthu.k@mitosistech.com"
        }
        // let notificationURL = " https://7cfdm4rp0k.execute-api.us-west-2.amazonaws.com/dev/NotificationUpdate_Lambda";
        let notificationURL = " https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        //let notificationURL = "https://cahqhoss7a.execute-api.us-west-2.amazonaws.com/Dev/GPA_DocumentType_Lambda";
        /*let notificationData = {
            QueryName: "SaveNotificationInfo",
            Notification_Msg: "We have sent you mail with Forecast letter",
            UserID: this.props.LoginData.LUserID,//"alagumuthu.v@mitosistech.com",
            MailedApplicantDate: new Date(),
            ApplicantViewedNotification: "No"
        }*/
        let notificationData = {
            // QueryName: "InsertNotificationTable",
            QueryName: "InsertNotificationTable",
            UserID: "alagumuthu.v@mitosistech.com",
            EventFormType: "Pension Application",
            Description: "Pension Application has been sent in your mail",
            Send_Date: new Date(),
            Notification_Send_Date: "",
            Is_Response: "No",
            Is_Viewed: "No",
            IsReceived_DocumentOrNot: "No",
        }
        let notEligibleApplicant = {
            UserID: this.props.LoginData.LUserID,
            MailDocName: "ApplicantDeniedMail",
        }
        //Update Notification table data
        //  let notificationURL
        // var data=thisObj.handlerConvertQRCode("pitchaimuthu.k@mitosistech.com");
        // var EncodedData = data.split(',');
        // var SignatureBase64 = EncodedData[1];
        //if(e=="Completed" && this.state.StatusChecked==true){
        if (thisObj.state.StatusChecked == true) {
            if (e == "Completed") {
                // here need to change the condition from less than to greater than on both conditions...
                //if (thisObj.state.ApplicantAge >= 65 && thisObj.state.ApplicantAgeMonth < 6) {
                if (thisObj.state.ApplicantAge <= 65) {

                    //Pension application send mail here. if the applicant approved to receive benefits...
                    CallAPIFunc(QrCodeConvertURL, QrCodeConvert)
                        .then((data) => {
                            console.log("Identity:", data);
                            CallAPIFunc(mailSendURL, QrCodeSendData)
                                .then((data) => {
                                    console.log("Forcast letter func:", data);
                                    console.log("Forcast letter was sent successfully");
                                    // update the notification to about sending mailed to application informations here
                                    CallAPIFunc(notificationURL, notificationData)
                                        .then((data) => {
                                            console.log("notification func:", data);
                                            //updated notification table with this user data
                                            console.log("updated notification table with this user data");
                                        }).catch((err) => {
                                            console.log("updated notification table with this user data failed");
                                        })
                                }).catch((err) => {
                                    console.log("Forcast letter was sent failed");
                                });
                        }).catch((err) => {

                        })
                    // below else method we have to send application denied..meaning not eligible.
                }
                else {
                    CallAPIFunc(mailSendURL, notEligibleApplicant)
                        .then((data) => {
                            console.log("second part first func:", data);
                            console.log("Send fore cast letter to applicant with not eligible ");
                        }).catch((err) => {
                        })
                }
                //
                // let GeneralDataURL = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
                let GeneralDataURL = "https://qdrjxmko84.execute-api.us-west-2.amazonaws.com/default/GPA_ApplicantModule_Lambda";
                let GeneralInputData = {
                    UserID: "mariraj.a@mitosistech.com",//this.props.LoginData.LUserID
                    QueryName: "GenInfo",
                }
                let ForecastLetterURl = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/terms_htmlpdfconv";
                var PreOrPostLetter = "";

                if (thisObj.state.ApplicantAge >= !65 && thisObj.state.ApplicantAgeMonth <= !6) {
                    PreOrPostLetter = "Pre";
                } else {
                    PreOrPostLetter = "Post";
                }
                CallAPIFunc(GeneralDataURL, GeneralInputData)
                    .then((data) => {
                        let ForecastLetterData = "";
                        data.map((item, key) => {
                            ForecastLetterData = {
                                "html": "Data",
                                "language": "en",
                                "DocCategory": "fcl",
                                "FCLType": PreOrPostLetter,
                                "params": {
                                    "empId": this.props.LoginData.LUserID,//"pitchaimuthu.k@mitosistech.com",
                                    "ninumber": item.ninumber,
                                    "Countrycitizenship": item.Countrycitizenship,
                                    "firstName": item.firstName,
                                    "middleName": item.middleName,
                                    "lastName": item.lastName,
                                    "othersurnames": "Tamil",
                                    "dateofbirth": item.dateofbirth,
                                    "maritalstatus": item.maritalstatus,
                                    "datemarriagedeath": item.datemarriagedeath,
                                    "Countryaddress": item.Countryaddress,
                                    "dateleftcountry": item.dateleftcountry
                                }
                            }
                        })
                        if (thisObj.state.ApplicantAge >= 65 && thisObj.state.ApplicantAgeMonth <= 6) {
                            // here the send mail with error forecast letter to eligible 
                            CallAPIFunc(ForecastLetterURl, ForecastLetterData)
                                .then((data) => {
                                    console.log("second part 2 func:", data);
                                    console.log("Forcast letter was sent successfully");
                                    // need to update in notification table with mailed to application 
                                    // need to send the forecast letter to applicant
                                    //  foreCastMailSendURL = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
                                    //let foreCastMailInputData
                                    CallAPIFunc(foreCastMailSendURL, foreCastMailInputData)
                                        .then((data) => {
                                            console.log("sending forecast letter to applicant was successfuly completed", data);
                                        }).catch((error) => {
                                            console.log("An error while sending forecast letter to applicant", error);
                                        })
                                }).catch((err) => {
                                    console.log("Forcast letter was sent failed");
                                })
                        } else if (thisObj.state.ApplicantAge >= 65 && thisObj.state.ApplicantAgeMonth < 6) {
                            // if this condition is satisfied then we need to send bilateral form else need to send with error messages
                            CallAPIFunc(mailSendURL, QrCodeSendData)
                                .then((data) => {
                                    console.log("Bilateral form sending successfully", data);
                                }).catch((err) => {
                                    console.log("Bilateral form sending with errors", err);
                                })
                        }
                        else {
                            CallAPIFunc(mailSendURL, QrCodeSendData)
                                .then((data) => {
                                    console.log("Applicant Not eligible due to no.of years send mail successfully", data);
                                }).catch((err) => {
                                    console.log("Applicant Not eligible due to no.of years send failed ", err);
                                })
                        }
                        // console.log(ForecastLetterData);
                    }).catch((err) => {
                        console.log("connection failed");
                    })
            }
        }
    }
    handlerConvertQRCode(UserID) {
        return (
            <div>

                {/* //  <QRCode  value={"Pitchaimuthu.k@mitosistech.com"}/> */}
            </div>
        )
    }
    // handlerConvertQRCodeToImage(UserID) {
    //     this.handleGetGenQusSummary();
    //     let k= this.handlerConvertQRCode();      
    //     return(
    //         <div>
    //         {/* //   <TextToImage  name="dsd" x="0" y="10"/> */}
    //         </div>

    //      )
    //  }
    /* getAge(dateString) {
         var today = new Date();
         var birthDate = new Date(dateString);
         var age = today.getFullYear() - birthDate.getFullYear();
         let monthYear=[];
         var m = today.getMonth() - birthDate.getMonth();
         if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
           age--;
           m--;
         }
         let oldMonth = birthDate.getMonth()+1;
         let curMonth =today.getMonth()+1;
         let months="";
         if(oldMonth==curMonth){
             months = Math.abs(m);
         }else{
             months = Math.abs(m)+1;
         }
         monthYear.push(age);
         monthYear.push(months); 
         console.log("Month:",months);
         return monthYear;
     }*/
    componentDidMount() {
        let thisObj = this;
        //let age = this.getAge("10/13/1991");
        //console.log("age:",age);
        this.handleGetGenQusSummary();
        let k = thisObj.handlerConvertQRCode();
        //let svg = new QRCode("Hello World!");
        let userid = this.props.LoginData.LUserID;
        QRCode.toDataURL(userid, function (err, url) {
            // console.log("33:",url);
            var EncodedData = url.split(',');
            var SignatureBase64 = EncodedData[1];
            //console.log("55:",SignatureBase64);
            thisObj.setState({ editedImgUrl: SignatureBase64 });
        })
        //  this.TestHandler();
    }
    //    TestHandler(){
    //        let url="https://v8rlokd4gh.execute-api.us-west-2.amazonaws.com/dev/NotificationUpdate_Lambda";
    //        let data={
    //         "QueryName":"GetNotificationTableData",
    //             UserID:"alagumuthu.v@mitosistech.com",
    //        }
    //     CallAPIFunc(url,data)
    //     .then((data)=>{
    //         console.log("New TestAPI",data);
    //     }).catch((err)=>{
    //         console.log("New TestAPI Error",err);
    //     })
    //    }
    handleGetGenQusSummary(event) {
        var thisObj = this;
        let UserID;
        // let DasboardSummaryAPIUrl = "https://z95u0w2el1.execute-api.us-west-2.amazonaws.com/Dev/GPA_DashboardSummary_Lambda";
        let DasboardSummaryAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        var data = {
            UserID: this.props.LoginData.LUserID,
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
            console.log(":::", data);
            for (var i = 0; i < data.length; i++) {
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
                thisObj.setState({ DateOfBirth: data[i].DOB_Day + "/" + thisObj.state.DBOMonth + "/" + data[i].DOB_Year },
                    function () {
                        var kk = new Date(thisObj.state.DBOMonth + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year); //thisObj.dateString2Date("12/10/2015");//data[i].DOB_Day+"/"+thisObj.state.DBOMonth+"/"+data[i].DOB_Year);
                        var now = new Date();
                        var past = new Date(thisObj.state.DBOMonth + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year);
                        var nowYear = now.getFullYear();
                        var pastYear = kk.getFullYear();
                        var age = nowYear - pastYear;
                        var currentMonth = now.getMonth() + 1;
                        var oldMonth = kk.getMonth() + 1;
                        //alert(currentMonth-oldMonth);
                        thisObj.setState({ ApplicantAgeMonth: currentMonth - oldMonth });
                        thisObj.setState({ ApplicantAge: age }, function () {
                            console.log("Age:", age);
                        });
                    }
                );
            }
        }).catch((err) => {
            console.log("DATA ", err);
        });
    }
    handlerChecked(e) {
        // alert("test");
        // alert(e.target.checked);
        this.setState({ StatusChecked: e.target.checked });
    }
    handleApplicantDocTrackingUpdate(event) {
        var thisObj = this;
        // let DocAPIurl = "https://j508jr42tb.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentTracking_Lambda";
        let DocAPIurl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DocSaveJSONData = JSON.stringify({
            // QueryName: "ADGUpdate",
            QueryName: "ApplicantDocumentsGatherTrackingUpdate",
            AppDocGatherTrackID: this.state.AppDocGatherTrackID,
            UserID: this.state.UserIDState,
            CountryCode: this.state.CountryState,
            DocFinalStatus: this.state.FinalStatusState,
        });
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: DocAPIurl,
            data: DocSaveJSONData,
            headers: AxiosHeaderConfig,

        }).then((data) => {
            alert("Updated Successfully");
            thisObj.handleReset(this);
        }).catch((err) => {

        })
    }
    handleApplicantDocTrackingRead(e) {
        // let DocAPIurl = "https://j508jr42tb.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentTracking_Lambda";
        let DocAPIurl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DocReadJSONData = JSON.stringify({
            // QueryName: "ADGRead",
            QueryName: "ApplicantDocumentsGatherTrackingRead",
        });
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: DocAPIurl,
            data: DocReadJSONData,
            headers: AxiosHeaderConfig,

        }).then((data) => {
            this.setState({ tableData: data.data });
        }).catch((err) => {

        })
    }
    handleApplicantDocTrackingEdit(event) {
        // alert("Entered", event)
        this.setState({ AppDocGatherTrackID: event });
        var thisObj = this;
        // let DocEditAPIUrl = "https://j508jr42tb.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentTracking_Lambda";
        let DocEditAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DEJSONData = JSON.stringify(
            {
                QueryName: "ApplicantDocumentsGatherTrackingEdit",
                AppDocGatherTrackID: event
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
            url: DocEditAPIUrl,
            data: DEJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ UserIDState: data[i].UserID });
                thisObj.setState({ CountryState: data[i].CountryCode });
                thisObj.setState({ FinalStatusState: data[i].DocFinalStatus });

            }
        }).catch((err) => {
            console.log(err)
        })
    }
    handleNavDashboard() {
        history.push('/AdminDashboard');
    }
    render() {
        const { tableData } = this.state;
        return (
            <div className="main-wrapper">
                <div className="HeaderTile">
                    <Flex className="show-grid" layout="row">
                        <Flex flex="none">
                            <div className="TitleIcon">
                                <h4><span className="TitleIconColor">{<EmployeeIcon />}</span><span className="TitleTexColor">Applicant Documents Gathering</span></h4>
                            </div>
                        </Flex>
                        <Flex flex layout align="end center">
                            <div>
                                <h5><span className="BreadCrumbsClass"><BackIcon /></span>&nbsp;&nbsp;<b><span onClick={this.handleNavDashboard.bind(this)} className="ActiveClass">Home / Dashboard</span></b></h5>
                            </div>
                        </Flex>
                    </Flex>
                </div>
                <Paper zDepth={1} className="AdminDashboardDiv">

                    <h2 className="legendtitle">Applicant Documents Gathering Details </h2>
                    <div className="fieldstyle">

                        <Row>
                            <Col xs={12} md={4} className="input-fileds">
                                <TextField hintText="Enter Your Notice Days"
                                    floatingLabelText={<span>UserID</span>}
                                    value={this.state.UserIDState}
                                    onChange={this.handleChangeUserID.bind(this)}
                                    disabled
                                //errorText={this.state.isValidPHandBookNum ? "Please Enter Your Spouse Hand Book Number" : ""}
                                />
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="Country"
                                    value={this.state.CountryState}
                                    onChange={this.handleChangeCountry.bind(this)}
                                    disabled
                                //errorText={this.state.isValidCountry ? "Please Select Your Country" : null}
                                >
                                    {CountryItems}
                                </SelectField>
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="Final Status"
                                    value={this.state.FinalStatusState}
                                    onChange={this.handleChangeFinalStatus.bind(this)}
                                //errorText={this.state.isValidDOCName ? "Please Select Your Document" : null}
                                >
                                    <MenuItem value={"P"} primaryText="Pending" />
                                    <MenuItem value={"C"} primaryText="Completed" />
                                    <MenuItem value={"R"} primaryText="Rejected" />
                                </SelectField>
                            </Col>
                        </Row>
                        <div className="RegButton btnContPadd">
                            <Button onClick={this.handleReset.bind(this)} className="ResetButton" >Reset</Button>

                            <Button type="submit" onClick={this.handleApplicantDocTrackingUpdate.bind(this)} className="RegButton2">Update</Button>

                        </div>
                    </div>
                </Paper>
                <Paper zDepth={1} className="AdminDashboardDiv">

                    <h2 className="legendtitle">Applicant Documents Gathering List </h2>
                    <Row className="show-grid" className="AdminDashboardTableDivParDiv">
                        <Col xs={12} md={12} className="noPadding">
                            <BootstrapTable
                                containerStyle={{ width: '100%' }}
                                hover={true}
                                search={true}
                                searchPlaceholder={'search input'}
                                keyField='AppDocGatherTrackID'
                                data={tableData}
                                striped hover
                                pagination={true}
                                options={table2Options}
                                condensed
                            >
                                <TableHeaderColumn width={"5%"} dataField="checkbox" dataFormat={this.CheckboxButton.bind(this)} >Select</TableHeaderColumn>
                                <TableHeaderColumn dataField="UserID">User ID</TableHeaderColumn>
                                <TableHeaderColumn dataField="CountryName">Country</TableHeaderColumn>
                                <TableHeaderColumn width={"15%"} dataField="DocFinalStatus">Final Status</TableHeaderColumn>
                                <TableHeaderColumn width={"7%"} dataField='button' dataFormat={this.cellButton.bind(this)}>Edit</TableHeaderColumn>
                                <TableHeaderColumn width={"10%"} dataField='button' dataFormat={this.ProcessButton.bind(this)}>Action</TableHeaderColumn>
                            </BootstrapTable>
                        </Col>
                        {/* {this.state.QRImages} */}
                    </Row>

                </Paper>
            </div>
        );
    }
    handleReset(e) {
        this.setState({
            UserIDState: "",
            CountryState: "",
            FinalStatusState: "",
        })
        this.handleApplicantDocTrackingRead(this);
    }
}
const CallAPIFunc = function (api_url, input_data) {
    var promise = new Promise(function (resolve, reject) {
        axios({
            method: "POST",
            url: api_url,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
                "x-api-key": "IvhNJZJVUi45h7ia3HXVOzhBf8e8yDZ9nKV7Ycf4"
            },
            data: JSON.stringify(input_data),
        }).then(({ data }) => {
            resolve(data);
        }).catch((err) => {
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
        setUserName: (PUserName) => {
            dispatch(Action.setUserName(PUserName));
        },
        setCCompanyID: (PCCompanyID) => {
            dispatch(Action.setCCompanyID(PCCompanyID));
        },
        setUTCStatus: (PUTCStatus) => {
            dispatch(Action.setUTCStatus(PUTCStatus));
        },
        setCompanyName: (Company) => {
            dispatch(Action.setCompanyName(Company));
        },
        setResidencyMove: (isMoveRec) => {
            dispatch(Action.setResidencyMove(isMoveRec));
        }
    }
}
export default connect(mapReducerStateToProps, mapDispatchToProps)(ApplicantDocGatheringTracking);
//export default ApplicantDocGatheringTracking;