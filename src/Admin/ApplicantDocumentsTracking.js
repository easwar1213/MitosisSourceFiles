import React, { Component } from 'react';

//Bootstrap Component
import { Col, Row, Button, Modal, Form, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import EmployeeIcon from 'material-ui/svg-icons/action/description';
import BackIcon from 'material-ui/svg-icons/content/reply';

//CSS
import '../Style/style.css';

//Bootstrap Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

//API Calling Method
import axios from 'axios';

//Flex
import { Flex } from 'react-flex-material';

//Routing
import history from '../Routing/history';

//Notification 
import Notifications, { notify } from 'react-notify-toast';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

// import moment from 'react-moment';
import Moment from 'react-moment';
import { ENGINE_METHOD_DIGESTS } from 'constants';
import {
    austriaCountry, belgiumCountry, handleGermanyAgeEligiblity, netherlandsCountry,
    brazilCountry, irelandCountry, portugalCountry, allowToEditBeneficiaryQuestions,
    getCurrentAge
} from '../Applicant/CountryPensionAgeHelper';

const CountryItems = [];

const DocumentItems = [];

const table2Options = {
    sizePerPage: 15,
};

var moment = require('moment');
var SubFolderName;
var emailresult;
var validForm = false;

function validate(SubjectState, MailContentState) {
    // true means invalid, so our conditions got reversed
    return {
        SubjectState: SubjectState.length === 0,
        MailContentState: MailContentState.length === 0,
    };
}
class ApplicantDocumentsTracking extends Component {
    constructor() {
        super();
        this.handleLoadCountry();
        //Modal Popup

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleVoluntaryEligibleApplicant = this.handleVoluntaryEligibleApplicant.bind(this);
        //this.handleChangePrivatePension = this.handleChangePrivatePension.bind(this);
        //Field State Values Initialization
        this.state = {
            show: false,
            BtnName: "Update",
            DocumentNameState: '',
            CountryState: '',
            GenderState: '',
            DocumentCodeState: '',
            GTAIsSendState: '',
            GTAIsReceivedState: '',
            GTASendDateState: '',
            GTAReceivedDateState: '',
            NoticeDaysState: '',
            GTGIsSendState: '',
            GTGIsReceivedState: '',
            GTGSendDateState: '',
            GTGReceivedDateState: '',
            DocStatusState: '',
            IsActiveState: 'Y',
            UserIDState: '',
            ResponseState: '',
            EligibleState: '',
            VoluntaryContributionState: '',
            tableData: [],
            FileName: "",
            DocumentUploadState: "",
            Fileinput: true,
            ConditionState: "",
            CustomerEmailID: "",
            ApplicantAgeMonth: "",
            ApplicantAge: "",
            GpaApprovedState: "",
            SubjectState: "",
            MailContentState: "",
            GenerateDocumentState: "",
            touched: {
                SubjectState: false,
                MailContentState: false,
            },
        },
            this.handleApplicantDocTrackingRead(this);
        this.handleDocNameRead(this);
    }

    handleLoadCountry(event) {
        let LoadCountryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            { QueryName: "Countries" }
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
            CountryItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                CountryItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
            }

        }).catch((err) => {

        })
    }
    // Modal Popup Scrip

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    //Handle Event
    handleChangeDocName(e, index, value) {
        this.setState({ DocumentNameState: value });
    };

    handleChangeCountry(e, index, value) {
        this.setState({ CountryState: value });
        console.log("Country state", this.state.CountryState);
    };

    handleChangeDocumentCode(e) {
        this.setState({ DocumentCodeState: e.target.value });
    };

    handleChangeGTAIsSend(e, index, value) {
        this.setState({ GTAIsSendState: value });
    };

    handleChangeGTAIsReceived(e, index, value) {
        this.setState({ GTAIsReceivedState: value });
    };

    handleChangeGTASendDate(e, date) {
        this.setState({ GTASendDateState: date });
    };

    handleChangeGTAReceivedDate(e, date) {
        this.setState({ GTAReceivedDateState: date });
    };

    handleChangeNoticeDays(e) {
        this.setState({ NoticeDaysState: e.target.value });
    };

    handleChangeGTGIsSend(e, index, value) {
        this.setState({ GTGIsSendState: value });
    };

    handleChangeGTGIsReceived(e, index, value) {
        this.setState({ GTGIsReceivedState: value }, function () {
            let received_status = this.state.GTGIsReceivedState;
            let thisObj = this;
            console.log('GTGIsReceivedStates:' + this.state.GTGIsReceivedState);
            if (received_status == 'Y') {
                thisObj.setState({ EligibleState: 'Y' })
                thisObj.setState({ EligibleDisabled: true })
                this.handleCheckRetirementAge();
            } else {
                thisObj.setState({ EligibleState: 'N' })
                thisObj.setState({ EligibleDisabled: true })
                // this.handleCheckRetirementAge();
            }
        });
    };

    handleChangeGTGSendDate(e, date) {
        this.setState({ GTGSendDateState: date });
    };

    handleChangeGTGReceivedDate(e, date) {
        this.setState({ GTGReceivedDateState: date });
    };

    handleChangeDocStatus(e, index, value) {
        this.setState({ DocStatusState: value });
    };

    handleChangeEligible(e, index, value) {
        this.setState({ EligibleState: value });
    };

    handleChangeVoluntaryContribution(e, index, value) {
        this.setState({ VoluntaryContributionState: value });
    };
    handleChangeIsActive(e, index, value) {
        this.setState({ IsActiveState: value });
    };

    handleChangeUserID(e) {
        this.setState({ UserIDState: e.target.value });
    };

    handleChangeResponse(e, index, value) {
        this.setState({ ResponseState: value });
    };

    handleChangeGpaIsApproved(e, index, value) {
        this.setState({ GpaApprovedState: value });
    };
    handleChangeDocGenerate(e, index, value) {
        this.setState({ GenerateDocumentState: value })
    }

    handleResendMail(e) {
        let emailSendingApiUrl = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let emaildata = {
            MailDocName: "ResendMail",
            EmailTo: this.state.UserIDState,
            MailSubject: this.state.SubjectState,
            MailContent: this.state.MailContentState,
        }
        SaveDataAPICallMailSend(emailSendingApiUrl, emaildata)
            .then((data) => {
                console.log("Mail Send Successfully", data);
            }).catch((err) => {
                console.log(err);
            });
        // console.log("data::"+data); 
        // alert(JSON.stringify(data));
        // var header = {
        //     "Content-Type": "application/json",
        //     "Access-Control-Request-Headers": "*",
        //     "Access-Control-Request-Method": "*",
        // }
        // axios({
        //     method: "POST",
        //     url: emailSendingApiUrl,
        //     data: JSON.stringify(data),
        // }).then(({ data }) => {
        //     notify.show("Information Send Succesfully to GPA Executive Contacting Soon","success",3000);
        //     alert("success");
        //     this.handleReset(this);
        // })
        // .catch((err) => {
        //     alert("fail");

        // });    

    }

    handleMailContentChange(e) {
        this.setState({ MailContentState: e.target.value });

    }

    handleSubjectChange(e) {
        this.setState({ SubjectState: e.target.value });
    }

    handleToAddressChange(e) {
        this.setState({ ToAddressState: e.target.value });
    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="warning" className="btnStyle" onClick={() => this.handleApplicantDocTrackingEdit(row.AppDocTrackID, row.UserID)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                <Button bsStyle="danger" onClick={() => { if (window.confirm('Delete the Item?')) { this.handleApplicantDocTrackingDelete(row.AppDocTrackID) } }} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></Button>
            </div>
        )
    }
    PrintButton(cell, row, enumObject, rowIndex) {
        let groupExistsInDatabase = false;
        if (row.DocumentDownloadLink != null)   // row.NoticeDays
        {
            return (
                <div>
                    <Button disabled={groupExistsInDatabase} onClick={() => {
                        window.open(row.DocumentDownloadLink, "_blank")
                    }} bsStyle="primary" >Print</Button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Button disabled={!groupExistsInDatabase} onClick={() => this.cellButton(row.DocumentDownloadLink)} bsStyle="primary">Print</Button>
                </div>
            )
        }
    }
    PrintVoluntaryContributeButton(cell, row, enumObject, rowIndex) {
        let groupExistsInDatabase = false;
        if (row.DownloadVolContributeFileLink != null)   // row.NoticeDays
        {
            return (
                <div>
                    <Button disabled={groupExistsInDatabase} onClick={() => {
                        window.open(row.DownloadVolContributeFileLink, "_blank")
                    }} bsStyle="primary" >Print</Button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Button disabled={!groupExistsInDatabase} bsStyle="primary">Print</Button>
                </div>
            )
        }
    }
    PensionButton(cell, row, enumObject, rowIndex) {
        let groupExistsInDatabase = false;
        console.log("row.DownloadPensionAppFileLink", row.DownloadPensionAppFileLink);
        if (row.DownloadPensionAppFileLink != null)   // row.NoticeDays
        {
            return (
                <div>
                    <Button disabled={groupExistsInDatabase} onClick={() => {
                        window.open(row.DownloadPensionAppFileLink, "_blank")
                    }} bsStyle="primary" >Print</Button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Button disabled={!groupExistsInDatabase} onClick={() => this.cellButton(row.DownloadPensionAppFileLink)} bsStyle="primary">Print</Button>
                </div>
            )
        }
    }
    // Bank Form Visibility
    BankButton(cell, row, enumObject, rowIndex) {
        let groupExistsInDatabase = false;
        if (row.DownloadBankFormLink != null)   // row.NoticeDays
        {
            return (
                <div>
                    <Button disabled={groupExistsInDatabase} onClick={() => {
                        window.open(row.DownloadBankFormLink, "_blank")
                    }} bsStyle="primary" >Print</Button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Button disabled={!groupExistsInDatabase} bsStyle="primary">Print</Button>
                </div>
            )
        }
    }
    // End of Bank Form Visibility
    DownloadButton(cell, row, enumObject, rowIndex) {
        let groupExistsInDatabase = false;
        if (row.DocumentDownloadLink != null)   // row.NoticeDays
        {
            return (
                <div>
                    <Button disabled={groupExistsInDatabase} onClick={() => { window.open(row.DocumentDownloadLink, "_blank") }} bsStyle="primary">Print</Button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Button disabled={!groupExistsInDatabase} onClick={() => this.cellButton(row.DocumentDownloadLink)} bsStyle="primary">Process</Button>
                </div>
            )
        }
    }

    ProcessButton(cell, row, enumObject, rowIndex) {
        let groupExistsInDatabase = false;
        if (row.IsReceived == "Yes") {
            return (
                <div>
                    <Button disabled={groupExistsInDatabase} onClick={() => this.handleForecastGenerate(row.UserID)} bsStyle="primary">Process</Button>
                </div>
            );
        }
        else {
            return (<Button disabled={!groupExistsInDatabase} onClick={() => this.handleForecastGenerate(this)} bsStyle="primary">Process</Button>);

        }
    }
    // handleAllMailConditions(event) {
    //     let Saveforecastdata = "";
    //     //send Forecastletter mail 
    //     let GeneralInputData1 = {
    //         UserID: this.state.UserIDState,
    //         QueryName: "GenInfo",
    //     }
    //     let GeneralDataURLForecast = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";

    //     let SaveForecastLetterURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";

    //     SaveDataAPICallMailSend(GeneralDataURLForecast, GeneralInputData1)
    //         .then((data) => {
    //             var Forecastdata = "";
    //             console.log("GenForecastdata::", data);
    //             data.map((item, key) => {
    //                 console.log("new1::", Forecastdata);
    //                 let substring1 = item.ninumber.substr(0, 2);
    //                 let substring2 = item.ninumber.substr(2, 2);
    //                 let substring3 = item.ninumber.substr(4, 2);
    //                 let substring4 = item.ninumber.substr(6, 2);
    //                 let substring5 = item.ninumber.substr(7, 1);
    //                 console.log(typeof ([item.ninumber]));
    //                 Saveforecastdata = {
    //                     "html": "This is test Data",
    //                     "language": "en",
    //                     "DocCategory": "fcl",
    //                     "params": {
    //                         "empId": this.state.UserIDState,//"spurthi.n@mitosistech.com",
    //                         "forecastdata": {
    //                             "NINLetter1": [substring1],
    //                             "NINLetter2": [substring2],
    //                             "NINLetter3": [substring3],
    //                             "NINLetter4": [substring4],
    //                             "NINLetter5": [substring5],
    //                             "Countrycitizenship": [item.Countrycitizenship],
    //                             "FirstName": [item.firstName + "" + item.middleName],
    //                             "CurrentSurname": [item.lastName],
    //                             "OtherSurname": [item.othersurename],
    //                             "DateofBirth": [item.dateofbirth],
    //                             "FullAddress": [item.Countryaddress],
    //                             "maritalstatus": [item.maritalstatus],
    //                             "datemarriagedeath": [item.datemarriagedeath],
    //                             "dateleftcountry": [item.dateleftcountry],
    //                             "TitleDropdown": [item.Title]
    //                         }
    //                     }
    //                 };
    //                 console.log(Saveforecastdata);
    //             });

    //             let ForecastletterURL = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
    //             let ForecastletterURLData = {
    //                 "MainFolderName": "applicant",
    //                 "SubFolderName": event,
    //                 "MailDocName": "FCL",
    //                 "LangCode": "en",
    //                 "EmailTo": event,//"spurthi.n@mitosistech.com"//"easwaran.k@mitosistech.com"
    //             }
    //             let StatusURL1 = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda"
    //             let StatusInput1 = {
    //                 "QueryName": "TrackDoc",
    //                 UserID: this.state.UserIDState,
    //                 DocumentID: 62,
    //                 CountryCode: this.state.CountryState,
    //                 IsSend: "",
    //                 SentDate: "",
    //             }

    //             //Save POA letter auto populated
    //             SaveDataAPICallMailSend(SaveForecastLetterURL, Saveforecastdata)
    //                 .then((data) => {
    //                     console.log("Forecast letter saved in s3 buckets", data);
    //                     notify.show("Forecast letter successfully Generated", "success", 3000);

    //                     SaveDataAPICallMailSend(StatusURL1, StatusInput1)
    //                         .then((data) => {
    //                             console.log("FCL letter sent status tracking saved in DB", data);
    //                             this.setState({ ConditionState: "disable" });
    //                         }).catch((err) => {
    //                             console.log(err);
    //                         });
    //                 }).catch((err) => {
    //                     console.log("error sending email");
    //                 });
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    // }



    handleForecastGenerate(event) {
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
                var lang;
                var addressLine1="";
                var addressLine2="";
                var addressLine3="";
                var addressLine4="";
                var addressLine5="";
                var DocType = "FCL";
                console.log("data1", data);
                var Forecastdata = "";
                console.log("GenForecastdata::", data);
                data.map((item, key) => {
                    console.log("new1::", Forecastdata);
                    if (item.ResCountry == this.state.CountryState) {

                        if (this.state.CountryState == "UK") {
                            lang = "EN"
                            addressLine1 = "Newcastle Pension Centre, Futures Group"
                            addressLine2 = "The Pension Service 9"
                            addressLine3 = "Mail Handling Site A"
                            addressLine4 = "Wolverhampton, WV98 1LU"
                            addressLine5 = "United Kingdom"
                        }
                        else if (this.state.CountryState == "KR") {
                            lang = "KO"
                            addressLine1 = "National Pension Service",
                                addressLine2 = "22nd Floor, 173, Toegyero",
                                addressLine3 = "Namsan Square Bldg",
                                addressLine4 = "Chungmuro 3-ga, Jung-gu",
                                addressLine5 = "Seoul 04554 KOREA"
                        } else if (this.state.CountryState == "AT") {
                            lang = "DE"
                            addressLine1 = "PENSIONSVERSICHERUNGSANSTALT ",
                                addressLine2 = "Friedrich-Hillegeist-Straße 1",
                                addressLine3 = "Postfach 1000",
                                addressLine4 = "1021 Wien",
                                addressLine5 = "Austria"
                        } else if (this.state.CountryState == "BE") {
                            lang = "EN"
                            addressLine1 = "ONSS / Social Security Overseas",
                                addressLine2 = "Service Estimates",
                                addressLine3 = "Place Victor Horta 11",
                                addressLine4 = "1060 Saint-Gilles",
                                addressLine5 = "Brussels,  Belgium"
                        } else if (this.state.CountryState == "BR") {
                            lang = "EN"
                            addressLine1 = "Secretaria de Previdência do Ministério da Fazenda",
                                addressLine2 = "Esplanada dos Ministérios, ",
                                addressLine3 = "Bloco F – sala 917",
                                addressLine4 = "Brasília (DF) – CEP 70.059-905",
                                addressLine5 = "Brazil"
                        } else if (this.state.CountryState == "DE") {
                            lang = "DE"
                            addressLine1 = "Deutsche Rentenversicherung Bund",
                                addressLine2 = "10704 Berlin ",
                                addressLine3 = "Germany "
                        } else if (this.state.CountryState == "PT") {
                            lang = "EN"
                            addressLine1 = "Instituto da Segurança",
                                addressLine2 = "Social, I.P. ",
                                addressLine3 = "Rua Rosa Araújo, 43 ",
                                addressLine4 = "1250-194 Lisboa ",
                                addressLine5 = "PORTUGAL "
                        } else if (this.state.CountryState == "IE") {
                            lang = "EN"
                            addressLine1 = "State Pension (Contributory) Section",
                                addressLine2 = "Social Welfare Services",
                                addressLine3 = "Department of Social Protection",
                                addressLine4 = "College Road",
                                addressLine5 = "Sligo, Ireland"
                        } else if (this.state.CountryState == "NL") {
                            lang = "EN"
                            addressLine1 = "Sociale Verzekeringsbank (SVB)",
                                addressLine2 = "Afdeling AOW/Anw ",
                                addressLine3 = "Postbus 9032",
                                addressLine4 = "6500 JN Nijmegen",
                                addressLine5 = "THE NETHERLANDS"
                        } else if (this.state.CountryState == "NO") {
                            lang = "EN"
                            addressLine1 = "NAV Pensjon",
                                addressLine2 = "PO Box 6600 Etterstad",
                                addressLine3 = "NO-0607 Oslo",
                                addressLine4 = "6500 JN Nijmegen",
                                addressLine5 = "Norway"
                        }
                        Saveforecastdata = {
                            "html": "This is test Data",
                            "countryCode": this.state.CountryState,
                            "language": lang,
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
                                    "RecipientAddressLine1": [addressLine1],
                                    "RecipientAddressLine2": [addressLine2],
                                    "RecipientAddressLine3": [addressLine3],
                                    "RecipientAddressLine4": [addressLine4],
                                    "RecipientAddressLine5": [addressLine5],
                                }
                            }
                        };
                        console.log("Saveforecastdata---->", Saveforecastdata);
                        console.log("Saveforecastdata---->", JSON.stringify(Saveforecastdata));
                    }
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
                            ResCountry: this.state.CountryState,
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
                                    DocumentDownloadLink: "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/" + this.state.UserIDState + "/" + DocType + "_" + this.state.CountryState + "_" + lang + ".pdf.pdf",
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

    // Send Mail Function.



    //Update Function
    handleApplicantDocTrackingUpdate(event) {
        //this.setState({ AppDocTrackID : event});
        var thisObj = this;
        if (this.state.ResponseState == "A") {
            SubFolderName = "applicant";
        }
        else {
            SubFolderName = "gpa";
        }
        // let DocAPIurl = "https://j508jr42tb.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentTracking_Lambda";
        let DocAPIurl = "https://d7dr757y78.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModuleS3_Lambda";
        let DocSaveJSONData = JSON.stringify({
            // QueryName: "Update",
            QueryName: "ApplicantDocumentsTrackingUpdate",
            AppDocTrackID: this.state.AppDocTrackID,
            DocumentID: this.state.DocumentNameState,
            DocumentCode: this.state.DocumentCodeState,
            CountryCode: this.state.CountryState,
            IsSend: this.state.GTAIsSendState,
            IsReceived: this.state.GTAIsReceivedState,
            SendDate: this.state.GTASendDateState,
            ReceivedDate: this.state.GTAReceivedDateState,
            NoticeDays: this.state.NoticeDaysState,
            GTGIsSend: this.state.GTGIsSendState,
            GTGIsReceived: this.state.GTGIsReceivedState,
            GTGSendDate: this.state.GTGSendDateState,
            GTGReceivedDate: this.state.GTGReceivedDateState,
            DocStatus: this.state.DocStatusState,
            Response: this.state.ResponseState,
            Eligible: this.state.EligibleState,
            VoluntaryContribution: this.state.VoluntaryContributionState,
            IsActive: this.state.IsActiveState,
            FileName: this.state.FileName,
            DocumentUploadFile: this.state.DocumentUploadState,
            SubFolderName: SubFolderName,
            UserID: this.state.CustomerEmailID,
            GpaApprovedState: this.state.GpaApprovedState,
            GenerateDocumentState: this.state.GenerateDocumentState
        });
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        console.log("Json Data" + DocSaveJSONData);
        axios({
            method: "POST",
            url: DocAPIurl,
            data: DocSaveJSONData,
            headers: AxiosHeaderConfig,
        }).then((data) => {
            console.log("Json Data" + data);
            notify.show("Updated Successfully", "success", 3000);
            // this.handleVoluntaryEligibleApplicant(this);
            console.log(this.state.VoluntaryContributionState, "vol");
            if (this.state.VoluntaryContributionState == "Y" || this.state.VoluntaryContributionState == "N") {
                //alert("IN");
                this.handleVoluntaryEligibleApplicant(this);

            } else if (this.state.GTAIsReceivedState == "Y" && this.state.GTAIsReceivedState != "") {

                // this.handleChangePrivatePension(this);
            }
            thisObj.handleReset(this);
        }).catch((err) => {
            console.log("failure" + err);
        })
    }

    handleChangePrivatePension(event) {
        emailresult = localStorage.getItem('applicant_email');
        let PrivateURL = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let PrivateData = {
            "MailDocName": "PrivatePOARecevied",
            "EmailTo": this.state.UserIDState,
        }
        let PrivateNotificationSuccessUrl = " https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let PrivateNotificationEligibleData = {
            "QueryName": "PrivatePensionSaveNotificationInfo",
            "UserID": this.state.UserIDState,
            "CountryName": this.state.CountryState,
            "Notification_Msg": "You are Eligible for Private Pension ",
            "ApplicantViewedNotification": "No",
            "Notification_LongMsg": this.state.CountryState + " has notified Global Pension Associates that you are eligible to make private pension ",
            "MailedApplicantDate": new Date(),
            "Private_Notification": "1"
        }

        if (this.state.GTAIsReceivedState == "Y" && this.state.CompanyCode != "") {
            SaveDataAPICallMailSend(PrivateURL, PrivateData)
                .then((data) => {
                    console.log("Private Pension email sent Successfully", data);
                    console.log(data);
                    SaveDataAPICallMailSend(PrivateNotificationSuccessUrl, PrivateNotificationEligibleData)
                        .then((data) => {
                            console.log("Notification Private sent Successfully", data);
                            console.log(data);

                        }).catch((err) => {
                            console.log("error table");
                            console.log(err);
                        });
                }).catch((err) => {
                    console.log("error table");
                    console.log(err);
                });
        }
    }

    //Read Document list Function
    handleDocNameRead(e) {
        // let DocNameAPIUrl = "https://j508jr42tb.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentTracking_Lambda";
        let DocNameAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CJSONData = JSON.stringify(
            {
                // QueryName: "DocNameRead"
                QueryName: "ApplicantDocumentsTrackingDocNameRead"
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
            url: DocNameAPIUrl,
            data: CJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            DocumentItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                DocumentItems.push(<MenuItem value={data[i].DocumentID} key={i} primaryText={data[i].DocumentName} />);
            }
        }).catch((err) => {

        })
    }

    handleSubmit = (evt) => {
        if (!this.canBeSubmitted()) {
            evt.preventDefault();
            return;
        }
        const { SubjectState, MailContentState } = this.state;
        // alert(`Signed up with email: ${SubjectState} MailContentState: ${MailContentState}`);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    //Read Function
    handleApplicantDocTrackingRead(e) {

        // let DocAPIurl = "https://j508jr42tb.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentTracking_Lambda";
        let DocAPIurl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DocReadJSONData = JSON.stringify({
            // QueryName: "Read",
            QueryName: "ApplicantDocumentsTrackingRead",
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

    updateEligiblity() {
        //this.setState({ AppDocTrackID : event});
        var thisObj = this;
        // if(this.state.ResponseState=="A")
        // {
        //     SubFolderName = "applicant";
        // }
        // else
        // {
        //     SubFolderName = "gpa";
        // }   
        console.log('update eligiblity');
        // let DocAPIurl = "https://j508jr42tb.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentTracking_Lambda";
        let DocAPIurl = "https://d7dr757y78.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModuleS3_Lambda";
        let DocSaveJSONData = JSON.stringify({
            // QueryName: "Update",
            QueryName: "ApplicantDocumentsTrackingUpdate",
            AppDocTrackID: this.state.AppDocTrackID,
            DocumentID: this.state.DocumentNameState,
            DocumentCode: this.state.DocumentCodeState,
            CountryCode: this.state.CountryState,
            IsSend: this.state.GTAIsSendState,
            IsReceived: this.state.GTAIsReceivedState,
            SendDate: this.state.GTASendDateState,
            ReceivedDate: this.state.GTAReceivedDateState,
            NoticeDays: this.state.NoticeDaysState,
            GTGIsSend: this.state.GTGIsSendState,
            GTGIsReceived: this.state.GTGIsReceivedState,
            GTGSendDate: this.state.GTGSendDateState,
            GTGReceivedDate: this.state.GTGReceivedDateState,
            DocStatus: this.state.DocStatusState,
            Response: this.state.ResponseState,
            Eligible: this.state.EligibleState,
            IsActive: this.state.IsActiveState,
            FileName: this.state.FileName,
            DocumentUploadFile: this.state.DocumentUploadState,
            SubFolderName: SubFolderName,
            UserID: this.state.CustomerEmailID,
            GpaApprovedState: this.state.GpaApprovedState,
            GenerateDocumentState: this.state.GenerateDocumentState
        });
        console.log("data" + DocSaveJSONData);
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
            notify.show("Updated Successfully", "success", 3000);
            // thisObj.handleReset(this);
        }).catch((err) => {
            console.log("failure");
        })
    }

    norwayCountry(dob) {
        let user_age = new Date(dob);
        let retireAge = {
            Age: 67,
            Month: 0,
            countryCode: "NO",
            country: "NORWAY"
        }
        console.log('retire age:' + retireAge.Age + "." + retireAge.Month);
        return retireAge;
    }

    //Set Korea retirement age 
    krCountry(dob) {
        let user_age = new Date(dob);
        let retireAge = {
            Age: 0,
            Month: 0,
            countryCode: "KR",
            country: "KOREA"
        }
        if (user_age >= new Date("01/01/1953") && user_age <= new Date("12/31/1956")) {
            retireAge.Age = 61;
            retireAge.Month = 0;
        }
        else if (user_age >= new Date("01/01/1957") && user_age <= new Date("12/31/1960")) {
            retireAge.Age = 62;
            retireAge.Month = 0;
        }
        else if (user_age >= new Date("01/01/1961") && user_age <= new Date("12/31/1964")) {
            retireAge.Age = 63;
            retireAge.Month = 0;
        } else if (user_age >= new Date("01/01/1965") && user_age <= new Date("12/31/1968")) {
            retireAge.Age = 64;
            retireAge.Month = 0;
        } else {
            retireAge.Age = 65;
            retireAge.Month = 0;
        }
        return retireAge;
    }
    // Eligibility Checking for round retirement age
    checkEligibleCountry(retireAge) {
        let eligible = false;
        let user_age = this.state.DateOfBirth;
        console.log("DOB", this.state.DateOfBirth);
        let cur_date = moment(new Date()).format('MM/DD/YYYY');
        let userCurrAgeInMonths = parseInt(moment(cur_date).diff(moment(user_age), 'months'));
        let age = parseInt(userCurrAgeInMonths / 12);
        let ageMonth = userCurrAgeInMonths % 12;
        console.log("Retire age", retireAge.Age + "." + retireAge.Month);
        console.log("User current age", age + "." + ageMonth);
        if (retireAge.Month == 0) {
            if ((age < retireAge.Age)) {
                if (age == retireAge.Age - 1) {
                    if (ageMonth > 8) {
                        console.log("Not eligible");
                        return eligible = true;
                    } else {
                        console.log("Eligible");
                        return eligible = false;
                    }
                }
                else {
                    console.log(" Eligible");
                    return eligible = false;
                }
            }
            else {
                console.log("Not eligible");
                return eligible = true;
            }
        } else {
            if (age <= retireAge.Age) {
                if (age == retireAge.Age) {
                    if (ageMonth <= 2) {
                        console.log("Eligible");
                        return eligible = false;
                    }
                    else {
                        console.log("Not Eligible");
                        return eligible = true;
                    }
                }
                else {
                    console.log("Eligible");
                    return eligible = false;
                }

            }
            else {
                console.log("Not eligible");
                return eligible = true;
            }
        }
    }


    checkEligibleNoCountry(retireAge) {
        let eligible = false;
        let dob = this.state.DateOfBirth;
        let user_age = new Date(dob);
        let cur_date = moment(new Date()).format('MM/DD/YYYY');
        let userCurrAgeInMonths = parseInt(moment(cur_date).diff(moment(user_age), 'months'));
        let age = parseInt(userCurrAgeInMonths / 12);
        let ageMonth = userCurrAgeInMonths % 12;

        console.log("user age", age + "." + ageMonth);
        if (retireAge.Month == 0) {
            console.log('inside the');
            if ((age < retireAge.Age)) {
                if (age == retireAge.Age - 1) {
                    if (ageMonth > 8) {
                        return eligible = true;
                    } else {
                        return eligible = false;
                    }
                } else {
                    return eligible = false;
                }
            } else {
                return eligible = false;
            }
        } else {
            return eligible = false;
        }
    }
    denmarkCountry(dob) {
        let user_age = new Date(dob);
        let retireAge = {
            Age: 0,
            Month: 0,
            countryCode: "DK",
            country: "Denmark"
        }
        //Set retirement age for denmark depending upon the applicant DOB 
        if (user_age <= new Date("12/31/1953")) {
            retireAge.Age = 65;
            retireAge.Month = 0;
        }
        else if (user_age >= new Date("01/01/1954") && user_age <= new Date("06/30/1954")) {
            retireAge.Age = 65;
            retireAge.Month = 6;
        }
        else if (user_age >= new Date("07/01/1954") && user_age <= new Date("12/31/1954")) {
            retireAge.Age = 66;
            retireAge.Month = 0;
        } else if (user_age >= new Date("01/01/1955") && user_age <= new Date("06/30/1955")) {
            retireAge.Age = 66;
            retireAge.Month = 6;
        } else if (user_age >= new Date("07/01/1955") && user_age <= new Date("12/31/1962")) {
            retireAge.Age = 67;
            retireAge.Month = 0;
        } else {
            retireAge.Age = 68;
            retireAge.Month = 0;
        }
        console.log("User DOB", this.state.dob);
        console.log("Retire age", retireAge.Age + "." + retireAge.Month);
        return retireAge;
    }

    checkEligibleDkCountry(retireAge) {
        let eligible = false;
        console.log('eligibility checking');
        // console.log("DOB", this.state.DateOfBirth);
        let dob = this.state.DateOfBirth;
        let user_age = new Date(dob);
        console.log('userage:' + user_age);
        let cur_date = moment(new Date()).format('MM/DD/YYYY');
        console.log('currentdate:' + cur_date);
        // let cur_date = "01/06/2019";
        // let cur_date = new Date('04/06/2019');
        let userCurrAgeInMonths = parseInt(moment(cur_date).diff(moment(user_age), 'months'));
        let age = parseInt(userCurrAgeInMonths / 12);
        let ageMonth = userCurrAgeInMonths % 12;
        console.log("User age", age + "." + ageMonth);
        if (retireAge.Month == 0) {
            if ((age < retireAge.Age)) {
                if (age == retireAge.Age - 1) {
                    if (ageMonth > 8) {
                        console.log(" check eligibility true");
                        return eligible = true;
                    } else {
                        console.log("eligibility false");
                        return eligible = false;
                    }
                }
                else {
                    console.log("check eligible");
                    return eligible = false;
                }
            }
            else {
                console.log("not eligible");
                return eligible = false;
            }
        } else {
            if (age <= retireAge.Age) {
                if (age == retireAge.Age) {
                    if (retireAge.Month == 6 && ageMonth > 2) {
                        console.log("Eligible true");
                        return eligible = true;
                    }
                    else {
                        console.log("Not Eligible");
                        return eligible = false;
                    }
                }
                else {
                    console.log("Eligible false");
                    return eligible = false;
                }
            }
            else {
                console.log("Not eligible");
                return eligible = false;
            }
        }
    }

    ukCountry(dob) {
        console.log("UK country");
        let user_age = new Date(dob);
        let retireAge = {
            Age: 0,
            Month: 0,
            countryCode: "UK",
            country: "UNITED KINGDOM"
        }
        if (user_age < new Date("01/06/1954")) {
            retireAge.Age = 65;
            retireAge.Month = 0;
        }
        else if (user_age >= new Date("01/06/1954") && user_age <= new Date("03/05/1954")) {
            retireAge.Age = 65;
            retireAge.Month = 4;
        }
        else if (user_age >= new Date("03/06/1954") && user_age <= new Date("06/05/1954")) {
            retireAge.Age = 65;
            retireAge.Month = 7;
        } else if (user_age >= new Date("06/06/1954") && user_age <= new Date("10/05/1954")) {
            retireAge.Age = 65;
            retireAge.Month = 11;
        } else if (user_age >= new Date("10/06/1954") && user_age <= new Date("04/05/1960")) {
            retireAge.Age = 66;
            retireAge.Month = 0;
        } else if (user_age >= new Date("04/06/1960") && user_age <= new Date("08/05/1960")) {
            retireAge.Age = 66;
            retireAge.Month = 4;
        } else if (user_age >= new Date("08/06/1960") && user_age <= new Date("12/05/1960")) {
            retireAge.Age = 66;
            retireAge.Month = 8;
        } else if (user_age >= new Date("12/06/1960") && user_age <= new Date("04/05/1977")) {
            retireAge.Age = 67;
            retireAge.Month = 0;
        } else if (user_age >= new Date("04/06/1977") && user_age <= new Date("09/05/1977")) {
            retireAge.Age = 67;
            retireAge.Month = 4;
        } else if (user_age >= new Date("09/06/1977") && user_age <= new Date("12/05/1977")) {
            retireAge.Age = 67;
            retireAge.Month = 7;
        } else if (user_age >= new Date("12/06/1977") && user_age <= new Date("04/05/1978")) {
            retireAge.Age = 67;
            retireAge.Month = 11;
        } else {
            retireAge.Age = 68;
            retireAge.Month = 0;
        }
        console.log("Date Of Birth" + dob);
        console.log("Retire age", retireAge.Age + "." + retireAge.Month)
        return retireAge;
    }

    checkEligibleUkCountry(retireAge) {
        let eligible = false;
        console.log('eligibility checking');
        // console.log("DOB", this.state.DateOfBirth);
        let dob = this.state.DateOfBirth;
        let user_age = new Date(dob);
        console.log('userage:' + user_age);
        let cur_date = moment(new Date()).format('MM/DD/YYYY');
        console.log('currentdate:' + cur_date);
        // let cur_date = "01/06/2019";
        // let cur_date = new Date('01/06/2019');
        let userCurrAgeInMonths = parseInt(moment(cur_date).diff(moment(user_age), 'months'));
        let age = parseInt(userCurrAgeInMonths / 12);
        let ageMonth = userCurrAgeInMonths % 12;
        console.log("User age", age + "." + ageMonth);
        if (retireAge.Month == 0) {
            if ((age < retireAge.Age)) {
                if (age == retireAge.Age - 1) {
                    if (ageMonth > 8) {
                        console.log(" check eligibility true");
                        return eligible = true;
                    } else {
                        console.log("eligibility false");
                        return eligible = false;
                    }
                }
                else {
                    console.log("check eligible");
                    return eligible = false;
                }
            }
            else {
                console.log("not eligible");
                return eligible = true;
            }
        } else {
            if (age <= retireAge.Age) {
                if (age == retireAge.Age) {
                    if (retireAge.Month == 4 && ageMonth == 0) {
                        console.log("Eligible true");
                        return eligible = true;
                    } else if (retireAge.Month == 7 && ageMonth > 3) {
                        console.log("Eligible");
                        return eligible = true;
                    } else if (retireAge.Month == 8 && ageMonth > 4) {
                        console.log("Eligible");
                        return eligible = true;
                    } else if (retireAge.Month == 11 && ageMonth > 7) {
                        console.log("Eligible");
                        return eligible = true;
                    }
                    else {
                        console.log("Not Eligible");
                        return eligible = false;
                    }
                }
                else {
                    console.log("Eligible false");
                    return eligible = false;
                }
            }
            else {
                console.log("Not eligible");
                return eligible = false;
            }
        }
    }

    yearcalculation() {
        console.log('year calculation');
        let user_age = new Date('01/01/1954');
        let user_birth_year = new Date('01/01/1954').getFullYear();
        let cur_date = new Date('08/16/2018');
        let cur_year = new Date().getFullYear();
        let leap_year = 0;
        console.log('birthyear:' + user_birth_year);
        console.log('currentyear:' + cur_year);
        console.log('leapyear:' + leap_year);
        for (let i = user_birth_year; i <= cur_year; i++) {
            if (i % 4 == 0) {
                leap_year = leap_year + 1;
            }
        }
        console.log('leap year count:' + leap_year);
    }

    //germany retireage calculation
    handleGermanyAgeEligiblity(country_code, dob){
        console.log("germen country");
        let user_age = new Date(dob);
        let user_birth_year = new Date(dob).getFullYear('YYYY');
        console.log('userbirth year:'+user_birth_year);
        let retireAge = {
            Age: 0,
            Month: 0,
            countryCode: "DE",
            country: "GERMANY"
        }
        if (user_birth_year == 1947) {
            retireAge.Age = 65;
            retireAge.Month = 0;
        }
        else if (user_birth_year == 1948 ) {
            retireAge.Age = 65;
            retireAge.Month = 1;
        }
        else if (user_birth_year == 1949 ) {
            retireAge.Age = 65;
            retireAge.Month = 2;
        }
        else if (user_birth_year == 1950) {
            retireAge.Age = 65;
            retireAge.Month = 3;
        }
        else if (user_birth_year == 1951 ) {
            retireAge.Age = 65;
            retireAge.Month = 4;
        }
        else if (user_birth_year == 1952 ) {
            retireAge.Age = 65;
            retireAge.Month = 5;
        }
        else if (user_birth_year == 1953 ) {
            retireAge.Age = 65;
            retireAge.Month = 6;
        }
        else if (user_birth_year == 1954 ) {
            retireAge.Age = 65;
            retireAge.Month = 7;
        }
        else if (user_birth_year == 1955) {
            retireAge.Age = 65;
            retireAge.Month = 8;
        }
        else if (user_birth_year == 1956) {
            retireAge.Age = 65;
            retireAge.Month = 9;
        }
        else if (user_birth_year == 1957) {
            retireAge.Age = 65;
            retireAge.Month = 10;
        }
        else if (user_birth_year == 1958) {
            retireAge.Age = 65;
            retireAge.Month = 11;
        }
        else if (user_birth_year == 1959) {
            retireAge.Age = 66;
            retireAge.Month = 0;
        }
        else if (user_birth_year == 1960) {
            retireAge.Age = 66;
            retireAge.Month = 2;
        }
        else if (user_birth_year == 1961) {
            retireAge.Age = 66;
            retireAge.Month = 4;
        }
        else if (user_birth_year == 1962) {
            retireAge.Age = 66;
            retireAge.Month = 6;
        }
        else if (user_birth_year == 1963) {
            retireAge.Age = 66;
            retireAge.Month = 8;
        }
        else if (user_birth_year == 1964) {
            retireAge.Age = 66;
            retireAge.Month = 10;
        }
        else if (user_birth_year == 1965) {
            retireAge.Age = 67;
            retireAge.Month = 0;
        }
         else {
            retireAge.Age = 67;
            retireAge.Month = 0;
        }
        console.log("Date Of Birth" + dob);
        console.log("Retire age", retireAge.Age + "." + retireAge.Month)
        return retireAge;
    }

    handleCheckRetirementAge() {
        let thisObj = this;
        // let country_code = thisObj.state.CountryState;
        let country_code = this.state.country_code;
        let date_of_birth = this.state.DateOfBirth;
        // let user_id = this.state.UserIDState;
        let user_id = this.state.User_Id;
        let received_status = this.state.GTGIsReceivedState;

        let Qualify;
        let retireAge = [];
        let user_age = new Date(date_of_birth);
        let gender = thisObj.state.GenderState;
        let currentAge = getCurrentAge(user_age);
        // for (let i = 0; i < country.length; i++) {
        switch (country_code) {       //country[i].country_code
            case "UK":
                retireAge = this.ukCountry(user_age);
                console.log('==retire age=====');
                console.log(retireAge);
                Qualify = this.checkEligibleUkCountry(retireAge);
                console.log('===qualify' + Qualify);
                if (Qualify) {
                    thisObj.setState({ EligibleState: 'Y' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: false })
                } else {
                    thisObj.setState({ EligibleState: 'N' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: true })
                }
                break;
            case "DK":
                retireAge = this.denmarkCountry(user_age);
                console.log('==retire age=====');
                console.log(retireAge);
                Qualify = this.checkEligibleDkCountry(retireAge);
                console.log('===qualify' + Qualify);
                // this.yearcalculation();
                if (Qualify) {
                    thisObj.setState({ EligibleState: 'Y' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: false })
                } else {
                    thisObj.setState({ EligibleState: 'N' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: true })
                }
                break;
            case "NO":
                retireAge = this.norwayCountry(user_age);
                Qualify = this.checkEligibleCountry(retireAge);
                console.log('===qualify' + Qualify);
                // this.yearcalculation();
                if (Qualify) {
                    thisObj.setState({ EligibleState: 'Y' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: false })
                } else {
                    thisObj.setState({ EligibleState: 'N' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: true })
                }
                break;
            case "KR":
                retireAge = this.krCountry(user_age);
                Qualify = this.checkEligibleCountry(retireAge);
                console.log('===qualify' + Qualify);
                // this.yearcalculation();
                if (Qualify) {
                    // thisObj.setState({ EligibleState: 'Y' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: false })
                } else {
                    // thisObj.setState({ EligibleState: 'N' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: true })
                }
                break;
            case "AT":
                retireAge = austriaCountry(gender);
                Qualify = allowToEditBeneficiaryQuestions(retireAge, currentAge);
                if (Qualify) {
                    thisObj.setState({ EligibleState: 'Y' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: false })
                } else {
                    thisObj.setState({ EligibleState: 'N' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: true })
                }
                break;
            case "BE":
                retireAge = belgiumCountry();
                Qualify = allowToEditBeneficiaryQuestions(retireAge, currentAge);
                if (Qualify) {
                    thisObj.setState({ EligibleState: 'Y' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: false })
                } else {
                    thisObj.setState({ EligibleState: 'N' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: true })
                }
                break;
            case "BR":
                retireAge = brazilCountry(gender);
                Qualify = allowToEditBeneficiaryQuestions(retireAge, currentAge);
                if (Qualify) {
                    thisObj.setState({ EligibleState: 'Y' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: false })
                } else {
                    thisObj.setState({ EligibleState: 'N' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: true })
                }
                break;
            case "DE":
                retireAge = this.handleGermanyAgeEligiblity(country_code, user_age);
                Qualify = allowToEditBeneficiaryQuestions(retireAge, currentAge);
                if (Qualify) {
                    thisObj.setState({ EligibleState: 'Y' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: false })
                } else {
                    thisObj.setState({ EligibleState: 'N' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: true })
                }
                break;
            case "IE":
                retireAge = irelandCountry();
                Qualify = allowToEditBeneficiaryQuestions(retireAge, currentAge);
                if (Qualify) {
                    thisObj.setState({ EligibleState: 'Y' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: false })
                } else {
                    thisObj.setState({ EligibleState: 'N' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: true })
                }
                break;
            case "NL":
                retireAge = netherlandsCountry();
                Qualify = allowToEditBeneficiaryQuestions(retireAge, currentAge);
                if (Qualify) {
                    thisObj.setState({ EligibleState: 'Y' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: false })
                } else {
                    thisObj.setState({ EligibleState: 'N' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: true })
                }
                break;
            case "PT":
                retireAge = portugalCountry();
                Qualify = allowToEditBeneficiaryQuestions(retireAge, currentAge);
                if (Qualify) {
                    thisObj.setState({ EligibleState: 'Y' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: false })
                } else {
                    thisObj.setState({ EligibleState: 'N' })
                    // this.updateEligiblity();
                    thisObj.setState({ EligibleDisabled: true })
                }
                break;
            default:
                break
        }
    }

    handleGetGenQusSummary(event) {
        var thisObj = this;
        let UserID;
        // let DasboardSummaryAPIUrl = "https://z95u0w2el1.execute-api.us-west-2.amazonaws.com/Dev/GPA_DashboardSummary_Lambda";
        let DasboardSummaryAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        var data = {
            UserID: this.state.UserIDState,
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
            // console.log(":::", data);
            for (var i = 0; i < data.length; i++) {
                console.log("DOBState:" + data[i].DOB_Day + " " + data[i].DOB_Month + " " + data[i].DOB_Year);
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
                thisObj.setState({ DateOfBirth: thisObj.state.DBOMonth + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year },
                    function () {
                        var kk = new Date(thisObj.state.DBOMonth + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year);
                        console.log("kk::", kk + "||" + data[i].DOB_Day + "-" + thisObj.state.DBOMonth + "-" + data[i].DOB_Year);
                        var bthDate, curDate, days;
                        var ageYears, ageMonths, ageDays;
                        bthDate = new Date(data[i].DOB_Year, thisObj.state.DBOMonth - 1, data[i].DOB_Day);
                        curDate = new Date();
                        if (bthDate > curDate) return;
                        days = Math.floor((curDate - bthDate) / (1000 * 60 * 60 * 24));
                        ageYears = Math.floor(days / 365);
                        ageMonths = Math.floor((days % 365) / 31);
                        thisObj.setState({ ApplicantAgeMonth: ageMonths });
                        thisObj.setState({ ApplicantAge: ageYears }, function () {
                            console.log("Age:", ageYears);
                            console.log("Months:", ageMonths);
                        });
                    }
                );
                let received_status = this.state.GTGIsReceivedState;
                this.setState({ GenderState: data[i].Gender });
                console.log("This is edit function");
                console.log("*************************");

                if (received_status == 'Y') {
                    console.log("Received status YES");
                    thisObj.setState({ EligibleDisabled: true })
                    this.handleCheckRetirementAge();
                } else {
                    console.log("Received status NO");
                    thisObj.setState({ EligibleState: 'N' });
                    thisObj.setState({ EligibleDisabled: true });
                }
            }
        }).catch((err) => {
            console.log("DATA ", err);
        });

    }

    //Edit Function
    handleApplicantDocTrackingEdit(event, UserEmail) {
        this.setState({ AppDocTrackID: event });
        this.setState({ CustomerEmailID: UserEmail });
        var thisObj = this;
        // let DocEditAPIUrl = "https://j508jr42tb.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentTracking_Lambda";
        let DocEditAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DEJSONData = JSON.stringify(
            {
                // QueryName: "Edit",
                QueryName: "ApplicantDocumentsTrackingEdit",
                AppDocTrackID: event
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
                this.setState({ User_Id: data[i].UserID });
                thisObj.setState({ DocumentNameState: data[i].DocumentID });
                thisObj.setState({ DocumentCodeState: data[i].DocumentCode });
                thisObj.setState({ CountryState: data[i].CountryCode });
                this.setState({ country_code: data[i].CountryCode });
                thisObj.setState({ GTAIsSendState: data[i].IsSend });
                thisObj.setState({ GTAIsReceivedState: data[i].IsReceived });
                thisObj.setState({ GTASendDateState: data[i].SentDate });
                thisObj.setState({ GTAReceivedDateState: data[i].ReceivedDate });
                thisObj.setState({ NoticeDaysState: data[i].NoticeDays });
                thisObj.setState({ GTGIsSendState: data[i].GTGIsSend });
                thisObj.setState({ GTGIsReceivedState: data[i].GTGIsReceived });
                thisObj.setState({ GTGSendDateState: data[i].GTGSentDate });
                thisObj.setState({ GTGReceivedDateState: data[i].GTGReceivedDate });
                thisObj.setState({ DocStatusState: data[i].DocStatus });
                thisObj.setState({ EligibleState: data[i].Eligible });
                thisObj.setState({ VoluntaryContributionState: data[i].VolContributeEligibleState });
                thisObj.setState({ ResponseState: data[i].Response });
                thisObj.setState({ IsActiveState: data[i].IsActive });
                thisObj.setState({ GpaApprovedState: data[i].GpaApprovedStatus });
                thisObj.setState({ GenerateDocumentState: data[i].GenerateDocumentState });
            }
            this.handleGetGenQusSummary(this);
        }).catch((err) => {

        })
    }

    //Delete Function
    handleApplicantDocTrackingDelete(event) {
        var thisObj = this;
        // let DocDeleteAPIUrl = "https://j508jr42tb.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentTracking_Lambda";
        let DocDeleteAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DDJSONData = JSON.stringify(
            {
                // QueryName: "Delete",
                QueryName: "ApplicantDocumentsTrackingDelete",
                AppDocTrackID: event
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
            url: DocDeleteAPIUrl,
            data: DDJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            notify.show("Record Deleted SuccessFully", "success", 3000);
            thisObj.handleReset(this);
        }).catch((err) => {

        })
    }

    //File Reader
    handleDocumentUploadChange = (event, index, Suffix) => {
        let varFileReader = new FileReader();
        let UploadFile = event.target.files[0];
        varFileReader.onloadend = () => {
            let varReadFile = varFileReader.result;
            let SplittedFile = varReadFile.split(',');
            this.setState({
                FileName: UploadFile.name,
                DocumentUploadState: SplittedFile[1],
                Fileinput: false
            });
        }
        varFileReader.readAsDataURL(UploadFile)
    };

    //Redirect
    handleNavDashboard() {
        history.push('/AdminDashboard');
    }
    handleVoluntaryEligibleApplicant(event) {
        // alert("handleVOl");
        console.log("handle voluntary data")
        emailresult = localStorage.getItem('applicant_email');
        let ApplicantMailUrl = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let ApplicantMailEligibleData = {
            "MailDocName": "VoluntaryEligibleApplicant",
            "EmailTo": this.state.UserIDState,
            "CountryName": this.state.CountryState,
        }
        // let ApplicantMailUrl = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let ApplicantMailNotEligibleData = {
            "MailDocName": "VoluntaryNotEligibleApplicant",
            "EmailTo": this.state.UserIDState,
            "CountryName": this.state.CountryState,
        }
        let NotificationSuccessUrl = " https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let ApplicantNotificationEligibleData = {
            "QueryName": "DocumentTypesSaveNotificationInfo",
            "UserID": this.state.UserIDState,
            "CountryName": this.state.CountryState,
            "Notification_Msg": "You are Eligible for " + this.state.CountryState + " Voluntary Contribution ",
            "ApplicantViewedNotification": "No",
            "Notification_LongMsg": this.state.CountryState + " has notified Global Pension Associates that you are eligible to make Voluntary Contributions that will allow you to increase pension payout amount at the time of retirement eligibility. To find out more",
            "MailedApplicantDate": new Date(),
            "Voluntary_Notification": "1"
        }
        //  alert(JSON.stringify(ApplicantNotificationEligibleData));
        let ApplicantNotificationNotEligibleData = {
            "QueryName": "DocumentTypesSaveNotificationInfo",
            "UserID": this.state.UserIDState,
            "CountryName": this.state.CountryState,
            "Notification_Msg": "You are Not Eligible for Voluntary Contribution",
            "ApplicantViewedNotification": "No",
            "Notification_LongMsg": this.state.CountryState + "has notified Global Pension Associates that you are not  eligible for the  Voluntary Contribution.",
            "MailedApplicantDate": new Date(),
            "Voluntary_Notification": "0"

        }
        if (this.state.VoluntaryContributionState == "Y" && this.state.CountryState == "UK") {
            let AppDocInsertUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
            let AppDocData = {
                UserID: emailresult,
                QueryName: "AppDocVOCInsert",
                DocumentID: "74",
                CountryCode: this.state.CountryState,
                Issend: "NR",
                IsReceived: "NR"
            } // AppDoc entry for voluntary contribution form.
            SaveDataAPICallMailSend(AppDocInsertUrl, AppDocData)
                .then((data) => {
                    console.log("appdoc record inserted in table", data);
                }).catch((err) => {
                    console.log(err);
                });

            SaveDataAPICallMailSend(ApplicantMailUrl, ApplicantMailEligibleData)
                .then((data) => {
                    console.log("Voluntary  Eligible mail send Successfully", data);
                    notify.show("Voluntary  Eligible mail send Successfully", "success", 3000);
                    console.log("ApplicantNotificationEligibleData", ApplicantNotificationEligibleData);
                    console.log("Url", NotificationSuccessUrl);
                    SaveDataAPICallMailSend(NotificationSuccessUrl, ApplicantNotificationEligibleData)
                        .then((data) => {
                            console.log("Notification Voluntary Eligible Successfully", data);
                            console.log(data);

                        }).catch((err) => {
                            console.log("error table");
                            console.log(err);
                        });
                }).catch((err) => {
                    console.log("error sending email");
                    console.log(err);
                });
        }
        else {

            SaveDataAPICallMailSend(ApplicantMailUrl, ApplicantMailNotEligibleData)
                .then((data) => {
                    notify.show("Voluntary Not Eligible mail send Successfully", "success", 3000);
                    console.log("Voluntary Not Eligible mail send Successfully", data);

                    SaveDataAPICallMailSend(NotificationSuccessUrl, ApplicantNotificationNotEligibleData)
                        .then((data) => {
                            console.log("Notification Voluntary Not Eligible Successfully", data);
                            console.log(data);
                        }).catch((err) => {
                            console.log("error table");
                            console.log(err);
                        });
                }).catch((err) => {
                    console.log("error sending email");
                    console.log(err);
                });
        }


    }
    handleEmailSendEligible(event) {
        let mailSendingUrl = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let EligibleData = {
            "MailDocName": "Qualify",
            "EmailTo": this.state.UserIDState,
        }
        //    let NotEligible = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let NotEligibleData = {
            "MailDocName": "NotQualify",
            "EmailTo": this.state.UserIDState,
        }
        // let OptionEligible = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let optionEligible = {
            "MailDocName": "Option",
            "EmailTo": this.state.UserIDState,
        }
        if (this.state.EligibleState == "Y") {

            SaveDataAPICallMailSend(mailSendingUrl, EligibleData)
                .then((data) => {
                    notify.show("Email send Successfully", "success", 3000);
                    this.handleEnableBF(this);
                }).catch((err) => {
                    console.log("error sending email");

                });
        }
        else if (this.state.EligibleState == "N") {

            SaveDataAPICallMailSend(mailSendingUrl, NotEligibleData)
                .then((data) => {
                    notify.show("Email send Successfully", "success", 3000);
                    this.handleEnableBF(this);

                }).catch((err) => {
                    console.log("error sending email");
                });
        }
        else if (this.state.EligibleState == "O") {

            SaveDataAPICallMailSend(mailSendingUrl, optionEligible)
                .then((data) => {
                    notify.show("Email send Successfully", "success", 3000);
                    this.handleEnableBF(this);

                }).catch((err) => {
                    console.log("error sending email");
                });
        }

    }

    handleEnableBF(e) {
        // let AppProFlowAPIUrl = "https://qxredca9lk.execute-api.us-west-2.amazonaws.com/Dev/GPA_AppProcessFlowDatas_Lambda";
        let AppProFlowAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify({
            // QueryName: "UpdateRQ",
            QueryName: "ApplicantProcessFlowTrackingUpdateRQ",
            UserID: this.state.UserIDState,
            ResQus: "C"
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
            //history.push('/ApplicantDashboard');
        }).catch((err) => {

        })
    }
    //Page Rendering
    handleSubmit = (evt) => {
        if (!this.canBeSubmitted()) {
            evt.preventDefault();
            return;
        }
        const { SubjectState, MailContentState } = this.state;
        //alert(`Signed up with email: ${email} password: ${password}`);
    }

    canBeSubmitted() {
        const errors = validate(this.state.SubjectState, this.state.MailContentState);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }
    render() {
        const errors = validate(this.state.SubjectState, this.state.MailContentState);
        const isDisabled = Object.keys(errors).some(x => errors[x]);

        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;
        };
        const { tableData } = this.state;
        return (
            <div className="main-wrapper">

                <div className="HeaderTile">
                    <Flex className="show-grid" layout="row">
                        <Flex flex="none">
                            <div className="TitleIcon">
                                <h4><span className="TitleIconColor">{<EmployeeIcon />}</span><span className="TitleTexColor">Applicant Documents Tracking</span></h4>
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
                    <h2 className="legendtitle">Applicant Documents Tracking Details </h2>
                    <div className="fieldstyle">

                        <Row>
                            <Col xs={12} md={12}><h4><b>Document Details</b></h4></Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="Document Name"
                                    value={this.state.DocumentNameState}
                                    onChange={this.handleChangeDocName.bind(this)}
                                >
                                    {DocumentItems}
                                </SelectField>
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="Country"
                                    value={this.state.CountryState}
                                    onChange={this.handleChangeCountry.bind(this)}
                                >
                                    {CountryItems}
                                </SelectField>
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <TextField hintText="Enter Your Document Code"
                                    disabled={this.state.BtnName == "Update"}
                                    floatingLabelText={<span>Document Code</span>}
                                    value={this.state.DocumentCodeState}
                                    onChange={this.handleChangeDocumentCode.bind(this)}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12}><h4><b>GPA &harr; Applicant</b></h4></Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="Send"
                                    value={this.state.GTAIsSendState}
                                    onChange={this.handleChangeGTAIsSend.bind(this)}
                                >
                                    <MenuItem value={"Y"} primaryText="Yes" />
                                    <MenuItem value={"N"} primaryText="No" />
                                    <MenuItem value={"NR"} primaryText="Not Required" />
                                </SelectField>
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <DatePicker
                                    locale="en-US"
                                    firstDayOfWeek={0}
                                    floatingLabelText={<span>Send Date</span>}
                                    value={this.state.GTASendDateState}
                                    onChange={this.handleChangeGTASendDate.bind(this)}
                                />
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="Received"
                                    value={this.state.GTAIsReceivedState}
                                    onChange={this.handleChangeGTAIsReceived.bind(this)}
                                >
                                    <MenuItem value={"Y"} primaryText="Yes" />
                                    <MenuItem value={"N"} primaryText="No" />
                                    <MenuItem value={"NR"} primaryText="Not Required" />
                                </SelectField>
                            </Col>
                        </Row>



                        <Row>
                            <Col xs={12} md={4} className="input-fileds">
                                <DatePicker
                                    locale="en-US"
                                    firstDayOfWeek={0}
                                    floatingLabelText={<span>Received Date</span>}
                                    value={this.state.GTAReceivedDateState}
                                    onChange={this.handleChangeGTAReceivedDate.bind(this)}
                                />
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <TextField hintText="Enter Your Notice Days"
                                    floatingLabelText={<span>Notice Days</span>}
                                    value={this.state.NoticeDaysState}
                                    onChange={this.handleChangeNoticeDays.bind(this)}
                                />
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="GPA Approved Status"
                                    value={this.state.GpaApprovedState}
                                    onChange={this.handleChangeGpaIsApproved.bind(this)}
                                >
                                    <MenuItem value={"Y"} primaryText="Yes" />
                                    <MenuItem value={"N"} primaryText="No" />
                                </SelectField>
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="DocumentGenerateState"
                                    value={this.state.GenerateDocumentState}
                                    onChange={this.handleChangeDocGenerate.bind(this)}
                                >
                                    <MenuItem value={"Y"} primaryText="Yes" />
                                    <MenuItem value={"N"} primaryText="No" />
                                    <MenuItem value={"NR"} primaryText="Not Required" />
                                </SelectField>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12}><h4><b>GPA &harr; Government</b></h4></Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="Send"
                                    value={this.state.GTGIsSendState}
                                    onChange={this.handleChangeGTGIsSend.bind(this)}
                                >
                                    <MenuItem value={"Y"} primaryText="Yes" />
                                    <MenuItem value={"N"} primaryText="No" />
                                </SelectField>
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <DatePicker
                                    locale="en-US"
                                    firstDayOfWeek={0}
                                    floatingLabelText={<span>SentDate</span>}
                                    value={this.state.GTGSentDateState}
                                    onChange={this.handleChangeGTGSendDate.bind(this)}
                                />
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="Received"
                                    value={this.state.GTGIsReceivedState}
                                    onChange={this.handleChangeGTGIsReceived.bind(this)}
                                >
                                    <MenuItem value={"Y"} primaryText="Yes" />
                                    <MenuItem value={"N"} primaryText="No" />
                                </SelectField>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={4} className="input-fileds">
                                <DatePicker
                                    locale="en-US"
                                    firstDayOfWeek={0}
                                    floatingLabelText={<span>ReceivedDate</span>}
                                    value={this.state.GTGReceivedDateState}
                                    onChange={this.handleChangeGTGReceivedDate.bind(this)}
                                />
                            </Col>

                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="Document Status"
                                    value={this.state.DocStatusState}
                                    onChange={this.handleChangeDocStatus.bind(this)}
                                >
                                    <MenuItem value={"P"} primaryText="Pending" />
                                    <MenuItem value={"R"} primaryText="Reject" />
                                    <MenuItem value={"C"} primaryText="Completed" />
                                </SelectField>
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="Eligible"
                                    value={this.state.EligibleState}
                                    onChange={this.handleChangeEligible.bind(this)}
                                >
                                    <MenuItem value={"Y"} primaryText="Yes" />
                                    <MenuItem value={"N"} primaryText="No" />
                                    <MenuItem value={"O"} primaryText="Option" />
                                </SelectField>
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="VoluntaryContribution"
                                    value={this.state.VoluntaryContributionState}
                                    onChange={this.handleChangeVoluntaryContribution.bind(this)}
                                >
                                    <MenuItem value={"Y"} primaryText="Yes" />
                                    <MenuItem value={"N"} primaryText="No" />
                                </SelectField>
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="IsActive"
                                    value={this.state.IsActiveState}
                                    onChange={this.handleChangeIsActive.bind(this)}
                                >
                                    <MenuItem value={"Y"} primaryText="Yes" />
                                    <MenuItem value={"N"} primaryText="No" />
                                </SelectField>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={12}><h4><b>Document Upload</b></h4></Col>
                            <Col xs={12} md={4}>
                                <input id="fileupload-example-1" type="file" onChange={this.handleDocumentUploadChange} ref={ref => this.fileInput = ref} />
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <TextField hintText="Enter Your UserID"
                                    disabled={this.state.BtnName == "Update"}
                                    floatingLabelText={<span>UserID</span>}
                                    value={this.state.UserIDState}
                                    onChange={this.handleChangeUserID.bind(this)}
                                />
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="Document Received From"
                                    value={this.state.ResponseState}
                                    onChange={this.handleChangeResponse.bind(this)}
                                >
                                    <MenuItem value={"A"} primaryText="Applicant Response" />
                                    <MenuItem value={"G"} primaryText="Goverment Response" />
                                </SelectField>
                            </Col>
                        </Row>
                        {this.state.GTAIsReceivedState == "Y" && this.state.GpaApprovedState == "N" ?
                            <Row className="PopupModal">
                                <Col xs={12} md={12}>
                                    <a bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                                        Resend Mail
                                </a>
                                </Col>
                            </Row>
                            // <Row>
                            //     <h4><b>Send Notification</b></h4>
                            //     <Col xs={12} md={12}>
                            //         <Button onClick={this.handleResendPOA.bind(this)} bsStyle="primary">Send Mail</Button>
                            //         <Notifications />
                            //     </Col>
                            // </Row>
                            : ""}
                        {this.state.GTAIsReceivedState == "Y" && this.state.DocumentNameState == "39" && this.state.GpaApprovedState == "Y" ?
                            <Row>
                                <h4><b>Forecast Letter Generate</b></h4>
                                <Col xs={12} md={12}>
                                    <Button disabled={this.state.ConditionState == "disable"} onClick={this.handleForecastGenerate.bind(this)} bsStyle="primary">Generate Forecast Letter</Button>
                                    <Notifications />
                                </Col>
                            </Row>
                            : ''}
                        {this.state.EligibleState == "Y" || this.state.EligibleState == "N" || this.state.EligibleState == "O" ?
                            <Row>
                                <h4><b>Eligible</b></h4>
                                <Col xs={12} md={12}>
                                    <Button disabled={this.state.EligibleDisabled} onClick={this.handleEmailSendEligible.bind(this)} bsStyle="primary">Send Notification</Button>
                                    <Notifications />
                                </Col>
                            </Row>
                            : ""}
                        <Row>
                            <div className="RegButton btnContPadd">
                                <Button onClick={this.handleReset.bind(this)} className="ResetButton" >Reset</Button>

                                <Button type="submit" onClick={this.handleApplicantDocTrackingUpdate.bind(this)} className="RegButton2">{this.state.BtnName}</Button>
                                <Notifications />

                            </div>
                        </Row>
                    </div>
                </Paper>

                <Paper zDepth={1} className="AdminDashboardDiv">
                    <h2 className="legendtitle">Applicant Documents Tracking List </h2>
                    <Row className="show-grid" className="AdminDashboardTableDiv">
                        <Col xs={12} md={12} className="noPadding">
                            <BootstrapTable
                                containerStyle={{ width: '100%' }}
                                hover={true}
                                search={true}
                                searchPlaceholder={'search input'}
                                keyField='AppDocTrackID'
                                data={tableData}
                                striped hover
                                pagination={true}
                                options={table2Options}
                                condensed
                            >
                                <TableHeaderColumn row='0' rowSpan='2' dataField="UserID">User ID</TableHeaderColumn>
                                <TableHeaderColumn row='0' rowSpan='2' dataField="DocumentName">Document Name</TableHeaderColumn>
                                <TableHeaderColumn row='0' rowSpan='2' dataField="DocumentCode">Document Code</TableHeaderColumn>
                                <TableHeaderColumn row='0' rowSpan='2' dataField="CountryName">Country</TableHeaderColumn>
                                <TableHeaderColumn row='0' rowSpan='2' dataField="CompanyCode">Company</TableHeaderColumn>
                                <TableHeaderColumn row='0' colSpan='5' headerAlign='center'>GPA &harr; Applicant</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField="IsSend">Send</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField="IsReceived">Received</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField="SendDate">Send Date</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField="ReceivedDate">Received Date</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField="NoticeDays">Notice Days</TableHeaderColumn>
                                <TableHeaderColumn row='0' colSpan='4' headerAlign='center'>GPA &harr; Goverment</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField="GTGIsSend">Send</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField="GTGIsReceived">Received</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField="GTGSendDate">Send Date</TableHeaderColumn>
                                <TableHeaderColumn row='1' dataField="GTGReceivedDate">Received Date</TableHeaderColumn>
                                <TableHeaderColumn row='0' rowSpan='2' dataField="GpaApprovedStatus">Gpa Approved Status</TableHeaderColumn>
                                {/* <TableHeaderColumn row='0' rowSpan='2' dataField="DocStatus">Document Status</TableHeaderColumn> */}
                                <TableHeaderColumn row='0' rowSpan='2' dataField="Eligible">Eligible</TableHeaderColumn>
                                <TableHeaderColumn row='0' rowSpan='2' dataField="Response">Response</TableHeaderColumn>
                                <TableHeaderColumn row='0' rowSpan='2' dataField="IsActive">Active</TableHeaderColumn>
                                <TableHeaderColumn row='0' rowSpan='2' dataField="GenerateDocumentState">GenerateDocumentState</TableHeaderColumn>
                                <TableHeaderColumn row='0' rowSpan='2' dataField='button' dataFormat={this.cellButton.bind(this)}>Action</TableHeaderColumn>
                                <TableHeaderColumn row='0' rowSpan='2' dataField='button' dataFormat={this.DownloadButton.bind(this)}>Print Forecast Letter</TableHeaderColumn>
                                {/* <TableHeaderColumn row='0' rowSpan='2' dataField='button' dataFormat={this.PrintButton.bind(this)}>Pension Application Form</TableHeaderColumn> */}
                                <TableHeaderColumn row='0' rowSpan='2' dataField='button' dataFormat={this.PrintVoluntaryContributeButton.bind(this)}>Print Voluntary Contribution Form</TableHeaderColumn>
                                <TableHeaderColumn row='0' rowSpan='2' dataField='button' dataFormat={this.PensionButton.bind(this)}>Print Pension Form</TableHeaderColumn>
                                <TableHeaderColumn row='0' rowSpan='2' dataField='button' dataFormat={this.BankButton.bind(this)}>Print Bank Form</TableHeaderColumn>
                            </BootstrapTable>
                        </Col>
                    </Row>
                </Paper>

                {/* Modal POPUP Content  */}

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Send Email</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form horizontal onSubmit={this.handleSubmit}>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    To
                    </Col>
                                <Col sm={10}>
                                    <FormControl type="email" disabled={true} placeholder="Email" value={this.state.UserIDState} onChange={this.handleToAddressChange.bind(this)} />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Subject
                    </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Subject" value={this.state.SubjectState} onChange={this.handleSubjectChange.bind(this)} onBlur={this.handleBlur('SubjectState')} />
                                    <span className="validationmsg">{this.state.isValidFormatSubjectState ? "Please Enter Valid MailContent" : null}</span>
                                    <span className="validationmsg">{this.state.isValidSubjectState ? "Please Enter Mail Subject" : null}</span>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Content
                    </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="Content" value={this.state.MailContentState} onChange={this.handleMailContentChange.bind(this)} onBlur={this.handleBlur('MailContentState')} />
                                    <span className="validationmsg">{this.state.isValidFormatMailContentState ? "Please Enter Valid MailContent" : null}</span>
                                    <span className="validationmsg">{this.state.isValidMailContentState ? "Please Enter Mail Content" : null}</span>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <button disabled={isDisabled} type="submit" class="RegButton1 btn btn-default" onClick={this.handleResendMail.bind(this)}>Send</button>
                                </Col>
                            </FormGroup>
                        </Form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal POPUP Content  */}

            </div>
        );
    }

    //Reset Function
    handleReset(e) {
        this.fileInput.value = "";
        this.setState({
            DocumentNameState: '',
            CountryState: '',
            DocumentCodeState: '',
            GTAIsSendState: '',
            GTAIsReceivedState: '',
            GTASendDateState: '',
            GTAReceivedDateState: '',
            NoticeDaysState: '',
            GTGIsSendState: '',
            GTGIsReceivedState: '',
            GTGSendDateState: '',
            GTGReceivedDateState: '',
            VoluntaryContributionState: '',
            DocStatusState: '',
            IsActiveState: 'Y',
            UserIDState: '',
            ResponseState: '',
            ConditionState: "",
            GpaApprovedState: "",
            SubjectState: "",
            MailContentState: "",
            GenerateDocumentState: ""
        })
        this.handleApplicantDocTrackingRead(this);
    }
}

//Promise Function
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
        setResidencyCountry: (Rescountry) => {
            dispatch(Action.setResidencyCountry("Rescountry"));
        },
        setCountryCode: (isPensionProcessCountry) => {
            dispatch(Action.setCountryCode("CountryCode"));
        }

    }
}

export default connect(mapReducerStateToProps, mapDispatchToProps)(ApplicantDocumentsTracking);