import React, { Component } from 'react';

//Bootstrap Component
import { Row, Col, Button } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

//API Calling Method
import axios from 'axios';

//Notification
import Notifications, { notify } from 'react-notify-toast';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Month Picker
import * as Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

//Routing
import history from '../Routing/history';

var emailresult;

class PrivatePensionQuestionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BtnNameState: "Save",
            EmployeeIdentificationNoState: '',
            LocationState: '',
            USSocialSecurityNoState: '',
            BeginDateState: '',
            EndDateState: '',
            isValidLocation: false,
            isValidBeginDate: false,
            isValidEndDate: false,
            hUSSocialSecurityNo: true,
        }
    }

    //Handle Event
    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        this.handleChangeAutopopulated(this);
    };

    handleChangeEmployeeIdentificationNo(event) {
        this.setState({ EmployeeIdentificationNoState: event.target.value });
    };

    handleChangeLocation(event) {
        this.setState({ LocationState: event.target.value });
    };

    handleChangeUSSocialSecurityNo(event) {
        this.setState({ USSocialSecurityNoState: event.target.value });
    };

    handleChangeBeginDate(date) {
        this.setState({ BeginDateState: Datetime.moment(date).format("YYYY") });
    };

    handleChangevalidatedatestart(current) {
        var yesterday = Datetime.moment().subtract(0, 'year');
        return current.isBefore(yesterday);
    };

    handleChangeEndDate(date) {
        this.setState({ EndDateState: Datetime.moment(date).format("YYYY") });
    };

    handleChangevalidatedateend(current) {
        var currentmonth = Datetime.moment().subtract(0, 'year');
        var Startmonth = Datetime.moment(this.state.BeginDateState, 'YYYY');
        var valid = false;
        if (current.isAfter(Startmonth) && current.isBefore(currentmonth)) {
            valid = true;
        }
        return valid;
    };

    //Validation Function
    handleValidateForm(e) {
        let validForm = false;
        let validlocationForm = false;
        let validBeginDateForm = false;
        let validEndDateForm = false;

        if (this.state.LocationState != "") {
            this.setState({ isValidLocation: false });
            validlocationForm = true;
        }
        else {
            this.setState({ isValidLocation: true });
            validlocationForm = false;
        }
        if (this.state.BeginDateState != "") {
            this.setState({ isValidBeginDate: false });
            validBeginDateForm = true;
        }
        else {
            this.setState({ isValidBeginDate: true });
            validBeginDateForm = false;
        }
        if (this.state.EndDateState != "") {
            this.setState({ isValidEndDate: false });
            validEndDateForm = true;
        }
        else {
            this.setState({ isValidEndDate: true });
            validEndDateForm = false;
        }
        if (validlocationForm && validBeginDateForm && validEndDateForm) {
            validForm = true
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Save Function
    handlePensionSave(event) {
        var thisObj = this;
        let PensionAPIURL = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let PensionJSONData = JSON.stringify({
            QueryName: "PrivatePensionSave",
            UserID: emailresult,
            EmployeeIdentificationNumber: this.state.EmployeeIdentificationNoState,
            WorkLocation: this.state.LocationState,
            USSocialSecurityNo: this.state.USSocialSecurityNoState,
            BeginYear: this.state.BeginDateState,
            EndYear: this.state.EndDateState,
        });

        let AxiosHeaderConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        };

        var isValid = this.handleValidateForm(this);
        if (isValid) {
            axios({
                method: "POST",
                url: PensionAPIURL,
                data: PensionJSONData,
                // headers:AxiosHeaderConfig,

            }).then((data) => {
                notify.show("Your Information Saved Successfully", "success", 3000);
                //this.handlePrivatePensionletterGenerate(this);
            }).catch((err) => {

            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }

    //****privatepensionletter generation******//////
    handlePrivatePensionletterGenerate(event) {
        let Saveforecastdata = "";
        //send Forecastletter mail 
        let GeneralInputData1 = {
            UserID: this.state.UserIDState,
            QueryName: "GenInfo",
        }

        let GeneralDataURLForecast = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let SaveForecastLetterURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";

        SaveDataAPICallMailSend(GeneralDataURLForecast, GeneralInputData1)
            .then((data) => {
                //var lang;
                var DocType = "Privateletter";
                console.log("data1", data);
                var Forecastdata = "";
                console.log("GenForecastdata::", data);
                data.map((item, key) => {
                    console.log("new1::", Forecastdata);
                    Saveforecastdata = {
                        "html": "This is test Data",
                        "countryCode": this.state.CountryState,
                        "language": "en",
                        "DocCategory": DocType,
                        "params": {
                            "empId": this.state.UserIDState,//"spurthi.n@mitosistech.com",
                            "forecastdata": {
                                "citizenship": [item.CountryOfCitizenship],
                                "FirstandanyMiddleNames": [item.firstName + "" + item.middleName],
                                "LastName": [item.lastName],
                                "Anyothersurnames": [item.othersurnames],
                                "Nationalnumber": [item.ninumber],
                                "dob": [item.dateofbirth],
                                "yearsincountry": [item.yearsincountry],
                                "Addressincountry": [item.ResAddress],
                                "refid": [item.ForecastEmpID],
                                "refnumber": [item.ForecastEmpID],
                                //"RecipientAddressLine1":[item.address],
                                //  "RecipientAddressLine2":[item.address],
                                //  "RecipientAddressLine3":[item.address],
                                //  "RecipientAddressLine4":[item.address],
                                //  "RecipientAddressLine5":[item.address],

                            }
                        }
                    };
                    console.log("Saveforecastdata---->", Saveforecastdata);
                });
                SaveDataAPICallMailSend(SaveForecastLetterURL, Saveforecastdata)
                    .then((data) => {
                        console.log("Forecast letter saved in s3 buckets", data);
                        notify.show("Forecast letter successfully Generated", "success", 3000);

                        let ForecastDocumentApi = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
                        let ForecastDocumentInput =
                        {
                            QueryName: "ForecastDocGen",
                            UserID: this.state.UserIDState,
                        };
                        console.log("ForecastDocumentInput", JSON.stringify(ForecastDocumentInput));

                        SaveDataAPICallMailSend(ForecastDocumentApi, ForecastDocumentInput)
                            .then((data) => {
                                console.log("Document ID generated link stored in DB", data);
                                let AppDocUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
                                let AppDocTrackData = {
                                    QueryName: "ForecastDocGenAppDocTracking",
                                    UserID: this.state.UserIDState,
                                    DocumentID: data[0].DocumentID,
                                    DocumentCode: data[0].ForecastEmpID,
                                    CountryCode: this.state.CountryState,
                                    IsSend: "NR",
                                    IsReceived: "NR",
                                    SendDate: new Date(),
                                    DocumentDownloadLink: "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/" + this.state.UserIDState + "/" + DocType + "_" + "en" + ".pdf.pdf",
                                }
                                console.log("AppDocTrackData", JSON.stringify(AppDocTrackData));

                                // Forecast Letter Link Save In DB.
                                //let ForecastURL = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda"
                                // let ForecastURL = " https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda"
                                // let DocumentName = this.state.DocumentNameState == 62 ? "FCL" : "poa"
                                // let ForecastInput = {
                                //     "QueryName": "UpdateDocumentLink",
                                //     UserID: this.state.UserIDState,
                                //     AppDocTrackID: this.state.AppDocTrackID,
                                //     // DocumentID: DocumentName+"_en.pdf",
                                //     // CountryCode: this.state.CountryState,
                                //     DownloadDocLink: "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/" + this.state.UserIDState + "/" + "FCL_en.pdf.pdf"
                                // }
                                SaveDataAPICallMailSend(AppDocUrl, AppDocTrackData)
                                    .then((data) => {
                                        console.log("FCL letter Link saved in DB", data);
                                        //  this.setState({ ConditionState: "disable" });
                                    }).catch((err) => {
                                        console.log(err);
                                    });

                                // End. 

                                //     SaveDataAPICallMailSend(StatusURL1, StatusInput1)
                                //         .then((data) => {
                                //             console.log("FCL letter sent status tracking saved in DB", data);
                                //             this.setState({ ConditionState: "disable" });
                                //         }).catch((err) => {
                                //             console.log(err);
                                //         });
                                // }).catch((err) => {
                                //     console.log("error sending email");
                            });
                    }).catch((err) => {
                        console.log(err);
                    });
            }).catch((err) => {
                console.log(err);
            });

    }














    //Redirect to Dashboard
    handleRedirect(event) {
        history.push('/ApplicantDashboard');
    }

    //Autopopulate Function
    handleChangeAutopopulated(e) {
        var thisObj = this;
        let UserID;
        let PensionAutopopulatedAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let PensionAutopopulatedJSONData = JSON.stringify({
            QueryName: "PrivatePensionAutoPopulate",
            UserID: emailresult,
        });
        let AxiosHeaderConfig = {
            headers: {
                // accept: 'application/json',
                // "Access-Control-Request-Headers": "*",
                // "Access-Control-Request-Method": "*",
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Origin": "*",
            }
        };
        axios({
            method: "POST",
            url: PensionAutopopulatedAPIUrl,
            data: PensionAutopopulatedJSONData,
            //headers:AxiosHeaderConfig,

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ResCountry == "US" && data[i].PersonalIDNum != "") {
                    thisObj.setState({ hUSSocialSecurityNo: true });
                }
                else if (data[i].ResCountry == "US") {
                    thisObj.setState({ hUSSocialSecurityNo: false });
                }
            }
        }).catch((err) => {

        })
    }

    //Page rendering
    render() {
        return (
            <div>
                <Paper zDepth={1} className="CommonDiv">
                    <h2 className="legendtitle">Private Pension Questionnaire</h2>
                    <div className="fieldstyle">

                        <Row className="show-grid" className="overall">
                            <Col xs={12} md={12}>
                                <Col xs={12} md={12} className="input-fileds align-fileds">
                                    <label>What your Employee Identification Number (EIN) while employed with (if known)</label>
                                    <TextField hintText="Enter your Employee Identification Number"
                                        value={this.state.EmployeeIdentificationNoState}
                                        onChange={this.handleChangeEmployeeIdentificationNo.bind(this)}
                                    />
                                </Col>
                                <Col xs={12} md={12} className="input-fileds align-fileds">
                                    <label>What location did the work occur while at  (City / State / Province / Country)<span className="manatoryfield">*</span></label>
                                    <TextField hintText="Enter your work location"
                                        value={this.state.LocationState}
                                        onChange={this.handleChangeLocation.bind(this)}
                                        errorText={this.state.isValidLocation ? "Please enter your Location" : null}
                                    />
                                </Col>
                                <Col xs={12} md={12} className="input-fileds align-fileds" hidden={this.state.hUSSocialSecurityNo}>
                                    <label>Please provide your U.S. Social Security Number for identification to  in their United States offices</label>
                                    <TextField hintText="Enter your U.S Social Security Number"
                                        value={this.state.USSocialSecurityNoState}
                                        onChange={this.handleChangeUSSocialSecurityNo.bind(this)}
                                    />
                                </Col>
                                <Col xs={12} md={12} className="input-fileds align-fileds" >
                                    <label>When did you work for ?</label>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                        <label>Beginning Year</label>
                                        <div className="StartOfCountryDatepicker">
                                            <Datetime
                                                value={this.state.BeginDateState}
                                                inputProps={{ placeholder: 'Select the Begin Year' }}
                                                dateFormat="YYYY"
                                                onChange={this.handleChangeBeginDate.bind(this)}
                                                isValidDate={this.handleChangevalidatedatestart.bind(this)}
                                                timeFormat={false}
                                            />
                                        </div>
                                        <span className="validationmsg ">{this.state.isValidBeginDate ? "Please Select Your Beginning Date" : null}</span>
                                    </Col>
                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                        <label>Ending Year</label>
                                        <div className="StartOfCountryDatepicker">
                                            <Datetime
                                                value={this.state.EndDateState}
                                                inputProps={{ placeholder: 'Select the End Year' }}
                                                dateFormat="YYYY"
                                                onChange={this.handleChangeEndDate.bind(this)}
                                                isValidDate={this.handleChangevalidatedateend.bind(this)}
                                                timeFormat={false}
                                            />
                                        </div>
                                        <span className="validationmsg ">{this.state.isValidEndDate ? "Please Select Your Ending Date" : null}</span>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} className="input-fields">
                                        <Button onClick={this.handlePensionSave.bind(this)} className="RQ-Add" >{this.state.BtnNameState}</Button>
                                        <Notifications />
                                    </Col>
                                </Col>
                            </Col>
                        </Row>
                    </div>
                </Paper>
            </div>
        )
    }
    handleReset(event) {
        this.setState({
            BtnNameState: "Save",
            EmployeeIdentificationNoState: '',
            LocationState: '',
            USSocialSecurityNoState: '',
            BeginDateState: '',
            EndDateState: '',
            isValidLocation: false,
            isValidBeginDate: false,
            isValidEndDate: false,
        });
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
                //console.log("DATA ", err);
                reject(err);
            });
    })
    return promise;
}
export default PrivatePensionQuestionnaire;