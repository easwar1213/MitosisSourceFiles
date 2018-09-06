import React, { Component } from 'react';
//Bootstrap Component
import { Row, Col, Panel, Button } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { Checkbox } from 'material-ui';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

//API Calling Method
import axios from 'axios';

//Singature Pad
import SignaturePad from 'react-signature-pad';


//Notification
import Notifications, { notify } from 'react-notify-toast';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';
import Geosuggest from 'react-geosuggest';
//Routing
import history from '../Routing/history';
import { format } from 'url';
import BenQusSKBankForm from './BenQusSKBankForm'
// import areIntlLocalesSupported from 'intl-locales-supported';
// import persianUtils from 'material-ui-persian-date-picker-utils';

var emailresult;
var moment = require('moment');
let DateTimeFormat;
let ModeEdit;
let country_code;
// if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
//     DateTimeFormat = global.Intl.DateTimeFormat;
// } else {
//     const IntlPolyfill = require('intl');
//     DateTimeFormat = IntlPolyfill.DateTimeFormat;
//     require('intl/locale-data/jsonp/fr');
//     require('intl/locale-data/jsonp/fa-IR');
// }

const style = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};


class BenQusSouthKorean extends Component {
    constructor(props) {
        super(props);

        //Field State Values Initialization
        this.state = {
            name: "",
            registrationNo: "",
            telHome: "",
            telMobile: "",
            mailingAddress: "",
            email: "",
            documentChecked: "",
            emailChecked: "",
            docEmailchecked: "",
            financialIns: "",
            formDate: "",
            accountNo: "",
            stateOfWork: "",
            income: "",
            incomeCategory: "",
            additionalName: "",
            residentRegNo: "",
            relationship: "",
            FPensionYesChecked: false,
            FPension: "",
            FPNation: "",
            FPPeriodStart: "",
            lived: "",
            livedNation: "",
            livedPeroidStart: "",
            livedPeroidEnd: "",
            livedDate: "",
            agentName: "Global Pension Associates",
            agentRegistNo: "",
            agentTelephone: "1-281-616-6890",
            agentMobile: "",
            agentRelationship: "Authorized Representative",
            agentMailingAddress: "PO Box 19246, Sugar Land, TX  77496",
            verifiedBeneficiry: "",
            chiefOfficial: "",
            accept: "",
            acceptance: "",
            FPPeriodEnd: "",
            Non_Work: "",
            Work: "",
            SalWork: "",
            SelfEmp: "",
            lastName: "",
            FPNo: "",
            FPYes: "",
            LivedYes: "",
            LivedNo: "",
            DOBState: '',
            retireAge: '',
            retireDate: '',
            bankFormShow: true,
            isChecked1: '',
            isChecked2: '',


            isValidIncome: false,
            isValidFormDate: false,
            isValidAdditionalName: false,
            isValidResidentRegNo: false,
            isValidRelationship: false,
            isValidLivedDate: false,
            isValidSignature: false,
            isValidSign: false,
            isValidFPPeriodEnd: false,
            isValidAccept: false,
            isValidAcceptance: false
        }
    }
    //Handle Event
    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        var Params = new URLSearchParams(document.location.search);
        var Mode = Params.get("Mode");
        ModeEdit = Mode;
        console.log("ModeEdit------>", ModeEdit);
        let Countryvalue = Params.get("CountryCode");
        country_code = Countryvalue;
        if (Params != null || Params != "") {
            if (Mode != null || Mode != "") {
                if (Mode == "E" && Countryvalue == "KR") {
                    this.handleBenQusKRAuto(this);
                    this.handleBenQusKREdit(this);
                }
                else {
                    this.handleBenQusKRAuto(this);
                    this.handleAppGenQusSummary(this);
                }
            }
            else {
                this.handleBenQusKRAuto(this);
                this.handleAppGenQusSummary(this);
            }
        }
        else {
            this.handleBenQusKRAuto(this);
            this.handleAppGenQusSummary(this);
        }

    }

    handlerUpdate() {
        let isValid = this.validateFormField();
        if (isValid) {
            let benQusKRData = {
                QueryName: "BenefitsQuestionnariesPart2Update",
                UserID: emailresult,
                AppAnsInJsonObj:
                {
                    Name: this.state.name,
                    RegistrationNo: this.state.registrationNo,
                    TelHome: this.state.telHome,
                    TelMobile: this.state.telMobile,
                    MailingAddress: this.state.mailingAddress,
                    Email: this.state.email,
                    DocumentChecked: this.state.documentChecked,
                    EmailChecked: this.state.emailChecked,
                    DocEmailchecked: this.state.docEmailchecked,
                    FinancialIns: this.state.financialIns,
                    FormDate: this.state.formDate,
                    AccountNo: this.state.accountNo,
                    StateOfWork: this.state.stateOfWork,
                    Income: this.state.income,
                    IncomeCategory: this.state.incomeCategory,
                    AdditionalName: this.state.additionalName,
                    ResidentRegNo: this.state.residentRegNo,
                    Relationship: this.state.relationship,
                    FPensionYesChecked: this.state.FPensionYesChecked,
                    FPension: this.state.FPension,
                    FPNation: this.state.FPNation,
                    FPPeriodStart: this.state.FPPeriodStart,
                    Lived: this.state.lived,
                    LivedNation: this.state.livedNation,
                    LivedPeroidStart: this.state.livedPeroidStart,
                    LivedPeroidEnd: this.state.livedPeroidEnd,
                    LivedDate: this.state.livedDate,
                    AgentName: this.state.agentName,
                    AgentRegistNo: this.state.agentRegistNo,
                    AgentTelephone: this.state.agentTelephone,
                    AgentMobile: this.state.agentMobile,
                    AgentRelationship: this.state.agentRelationship,
                    AgentMailingAddress: this.state.agentMailingAddress,
                    VerifiedBeneficiry: this.state.verifiedBeneficiry,
                    ChiefOfficial: this.state.chiefOfficial,
                    Accept: this.state.accept,
                    Acceptance: this.state.acceptance,
                    FPPeriodEnd: this.state.FPPeriodEnd,
                    LastName: this.state.lastName,
                },
                CountryCode: "KR",
                BQP2AnsStatus: "C",
            }
            let countryApiUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
            console.log("Data2", JSON.stringify(benQusKRData));
            axios({
                method: "POST",
                url: countryApiUrl,
                data: JSON.stringify(benQusKRData),

            }).then(({ data }) => {
                notify.show("Updated Successfully", "success", 3000);
                history.push('/ApplicantDashboard');
            }).catch((err) => {
                console.log("Error", err);
            });


        }
    }

    handleAppGenQusSummary(event) {
        var thisObj = this;
        let AppGenQusSumAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let AppGenQusSumAutoJSONData = JSON.stringify({
            QueryName: "GenQusSum",
            UserID: emailresult,
        });
        let AxiosHeaderConfig = {
            headers: {
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
                'Content-Type': 'application/json;charset=UTF-8',
            }
        };
        axios({
            method: "POST",
            url: AppGenQusSumAutoAPIUrl,
            data: AppGenQusSumAutoJSONData,
        }).then(({ data }) => {
            console.log("DATA********>" + JSON.stringify(data));
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ DOBState: data[i].DOB_Day + " " + data[i].DOB_Month + " " + data[i].DOB_Year }, () => {
                    console.log("DOB", this.state.DOBState);
                    var DOB = this.state.DOBState;
                    console.log("Retirement age-->")
                    this.setState({ retireAge: this.krCountry(this.state.DOBState) },
                        () => {
                            console.log("Retire age---->", this.state.retireAge);
                            var retireAge = this.state.retireAge;
                            var d = new Date(DOB);
                            var year = d.getFullYear();
                            var month = d.getMonth();
                            var day = d.getDate();
                            var c = new Date(year + retireAge, month, day);
                            let RDate = moment(new Date(c)).format('DD/MM/YYYY');
                            var cc = RDate;
                            console.log("Date new", RDate);
                            this.setState({
                                livedDate: c,
                                formDate: new Date()
                            }, () => { console.log("Lived date", this.state.livedDate) })
                        });
                });
            }
        }).catch((err) => {
        })
    }

    handleBenQusKREdit(e) {
        var thisObj = this;
        let DataURLPension = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var dataURL = {
            QueryName: "Pensiondata1",
            UserID: emailresult,
            CountryCode: "KR",
            PensionFormType: "OAP"
        }
        // alert(JSON.stringify(dataURL))
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: DataURLPension,
            data: JSON.stringify(dataURL),
            headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            console.log('Data for Edit', JSON.stringify(data));
            this.setState({ showloader: false });
            data.map((item, key) => {
                let JSONData = JSON.parse(item.AppAnsInJsonObj);
                let imgURL1 = JSONData.Signature1Base64;
                let imgURL2 = JSONData.Signature2Base64;
                this.signaturePad1.fromDataURL(imgURL1),
                    this.signaturePad2.fromDataURL(imgURL2),
                    thisObj.setState({
                        income: JSONData.Income,
                        additionalName: JSONData.AdditionalName,
                        residentRegNo: JSONData.ResidentRegNo,
                        relationship: JSONData.Relationship,
                        livedDate: new Date(JSONData.LivedDate),
                        formDate: new Date(JSONData.FormDate),
                        isChecked1: JSONData.Accept,
                        isChecked2: JSONData.Acceptance,
                    });
            }
            );
        }).catch((err) => {

        });
    }

    krCountry(dob) {
        let user_age = new Date(dob);
        let age;

        if (user_age >= new Date("01/01/1953") && user_age <= new Date("12/31/1956")) {
            age = 61;
        }
        else if (user_age >= new Date("01/01/1957") && user_age <= new Date("12/31/1960")) {
            age = 62;
        }
        else if (user_age >= new Date("01/01/1961") && user_age <= new Date("12/31/1964")) {
            age = 63;
        } else if (user_age >= new Date("01/01/1965") && user_age <= new Date("12/31/1968")) {
            age = 64;
        } else {
            age = 65;
        }
        return age;
    }
    handleChangeIncome = (event) => {
        this.setState({ income: event.target.value });
    };

    handleChangeAdditionalName = (event) => {
        this.setState({ additionalName: event.target.value });
    };
    handleChangeResidentRegNo = (event) => {
        this.setState({ residentRegNo: event.target.value });
    };
    handleChangeRelationship = (event) => {
        this.setState({ relationship: event.target.value });
    };
    handlerWorkedLivedDate = (event, date) => {
        this.setState({ livedDate: date });
    };
    handlerFormDate = (event, date) => {
        this.setState({ formDate: date });
    };

    handleChangeAccept = (event) => {
        if (event.target.checked == true) {
            this.setState({
                accept: true,
                isChecked1: true
            });
        }
        else {
            this.setState({
                accept: false,
                isChecked1: false
            });
        }
    };
    handleChangeAcceptance = (event) => {
        if (event.target.checked == true) {
            this.setState({
                acceptance: true,
                isChecked2: true
            });
        }
        else {
            this.setState({
                acceptance: false,
                isChecked2: false
            });
        }
    };
    handleSignatureClear = (event) => {
        this.signaturePad1.clear();
    };
    handleSignatureClear2 = (event) => {
        this.signaturePad2.clear();
    };

    validateFormField() {
        var ValidIncome = false;
        var ValidAdditionalName = false;
        var ValidResidentRegNo = false;
        var ValidRelationship = false;
        var ValidLivedDate = false;
        var ValidAccept = false;
        var ValidFormDate = false;
        var validSignatureForm = false;
        var validSignature = false;
        var ValidAcceptance = false;
        var isSuccessValid = false;

        // Income
        if (this.state.income != "") {
            this.setState({ isValidIncome: false });
            ValidIncome = true;
        } else {
            this.setState({ isValidIncome: true });
            ValidIncome = false;
        }
        // Pension Additional name
        if (this.state.additionalName != "") {
            this.setState({ isValidAdditionalName: false });
            ValidAdditionalName = true;
        } else {
            this.setState({ isValidAdditionalName: true });
            ValidAdditionalName = false;
        }

        // Resident register number
        if (this.state.residentRegNo != "") {
            this.setState({ isValidResidentRegNo: false });
            ValidResidentRegNo = true;
        } else {
            this.setState({ isValidResidentRegNo: true });
            ValidResidentRegNo = false;
        }

        // Relationship
        if (this.state.relationship != "") {
            this.setState({ isValidRelationship: false });
            ValidRelationship = true;
        } else {
            this.setState({ isValidRelationship: true });
            ValidRelationship = false;
        }

        // Benifit Choosen date
        if (this.state.livedDate != "") {
            this.setState({ isValidLivedDate: false });
            ValidLivedDate = true;
        } else {
            this.setState({ isValidLivedDate: true });
            ValidLivedDate = false;
        }
        //Accept
        if (this.state.accept != "") {
            this.setState({ isValidAccept: false });
            ValidAccept = true;
        } else {
            this.setState({ isValidAccept: true });
            ValidAccept = false;
        }

        //Form Date
        if (this.state.formDate != "") {
            this.setState({ isValidFormDate: false });
            ValidFormDate = true;
        } else {
            this.setState({ isValidFormDate: true });
            ValidFormDate = false;
        }
        //Signature pad 1
        if (this.signaturePad1.isEmpty()) {
            this.setState({ isValidSignature: true });
            validSignatureForm = false;
        }
        else {
            this.setState({ isValidSignature: false });
            validSignatureForm = true;
        }
        //Acceptance
        if (this.state.acceptance != "") {
            this.setState({ isValidAcceptance: false });
            ValidAcceptance = true;
        } else {
            this.setState({ isValidAcceptance: true });
            ValidAcceptance = false;
        }

        //Signature 2
        if (this.signaturePad2.isEmpty()) {
            this.setState({ isValidSign: true });
            validSignature = false;
        }
        else {
            this.setState({ isValidSign: false });
            validSignature = true;
        }

        if (ValidIncome == true && ValidAdditionalName == true && ValidResidentRegNo == true && ValidRelationship == true &&
            ValidLivedDate == true && ValidAccept == true && ValidFormDate == true && validSignatureForm == true && validSignature == true && ValidAcceptance == true) {
            isSuccessValid = true;
        }
        else {
            isSuccessValid = false;
        }
        return isSuccessValid;
    }

    // Save Pension Data.
    handleSavePensionData(e) {
        let SavePensiondata = "";
        let PensionFormID = {
            UserID: emailresult,
            QueryName: "Pensiondata",
        }
        let DataURLPension = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let SaveDataFormURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";

        SaveDataAPICallMailSend(DataURLPension, PensionFormID)
            .then((data) => {
                console.log("Pension Data", JSON.stringify(data));
                data.map((item, key) => {
                    let JSONData = JSON.parse(item.AppAnsInJsonObj);
                    // let d = new Date([JSONData.LivedDate]);
                    // let fd = new Date([JSONData.FormDate]);
                    // console.log("Lived Date", d);
                    // var day = d.getDate();
                    // var month = d.getMonth();
                    // var year = d.getFullYear();
                    // var newDate = day + "/" + month + "/" + year;
                    // var day1 = fd.getDate();
                    // var month1 = fd.getMonth();
                    // var year1 = fd.getFullYear();
                    // var newDate1 = day1 + "/" + month1 + "/" + year1;
                    // console.log("New date", newDate);
                    // console.log(d.getUTCHours()); // Hours
                    // console.log(d.getUTCMinutes());
                    // console.log(d.getUTCSeconds());
                    // console.log(d.getFullYear());
                    // console.log(d.getMonth());
                    // console.log(d.getDate());

                    SavePensiondata = ({
                        "html": "This is test Data",
                        "language": "en",
                        "DocCategory": "pafKorea",
                        "params": {
                            "empId": emailresult,
                            "pensiondata": {
                                "Name": [JSONData.Name],
                                "ResidentregistrationNo": [JSONData.RegistrationNo],
                                "TelHome": [JSONData.TelHome],
                                "TelMobile": [JSONData.TelMobile],
                                "MailingAddress": [JSONData.MailingAddress],
                                "EMail": [JSONData.Email],
                                "DocumentCorrespondance": [JSONData.DocumentChecked],
                                "EmailCorrespondence": [JSONData.EmailChecked],
                                "DocumentandEmailCorrespondence": [JSONData.DocEmailchecked],
                                "FinancialInstitution": [JSONData.FinancialIns],
                                "DateOAP": [JSONData.FormDate],
                                "AccountNo": [JSONData.AccountNo],
                                "StateofWork": [this.state.Work],
                                "NonWork": [this.state.Non_Work],
                                "AverageIncome": [JSONData.Income],
                                "IncomeCategory": [JSONData.IncomeCategory],
                                "Salariedworker": [this.state.SalWork],
                                "SelfEmployed": [this.state.SelfEmp],
                                "Name1": [JSONData.AdditionalName],
                                "ResidencyNo1": [JSONData.ResidentRegNo],
                                "RelationShipToBeneficiary1": [JSONData.Relationship],
                                "ForeignPensionNo": [this.state.FPNo],
                                "ForeignPensionYes": [this.state.FPYes],
                                "FPensionYesChecked": [JSONData.FPensionYesChecked],
                                "FPension": [JSONData.FPension],
                                "NationEntitlement": [JSONData.FPNation],
                                "FPBeginDate": [JSONData.FPPeriodStart],
                                "Lived": [JSONData.Lived],
                                "LiveAbroad": [this.state.LivedNo],
                                "LiveAbroadYes": [this.state.LivedYes],
                                "LiveAbroadEntitlement": [JSONData.LivedNation],
                                "LiveAbroadBeginDate": [JSONData.LivedPeroidStart],
                                "LiveAbroadEndDate": [JSONData.LivedPeroidEnd],
                                "BenefitsChoosenDate": [JSONData.LivedDate],
                                "AgentName": [JSONData.AgentName],
                                "ResidentRegistrationNo": [JSONData.AgentRegistNo],
                                "TelHome1": [JSONData.AgentTelephone],
                                "TelMobile2": [JSONData.AgentMobile],
                                "RelationshiptoBeneficiary": [JSONData.AgentRelationship],
                                "MailingAddress2": [JSONData.AgentMailingAddress],
                                "Verifiedbeneficiary": [JSONData.VerifiedBeneficiry],
                                'VerifiedrelevantChief': [JSONData.ChiefOfficial],
                                "Accept": [JSONData.Accept],
                                "Acceptance": [JSONData.Acceptance],
                                'FPEndDate': [JSONData.FPPeriodEnd],
                                "LastName": [JSONData.LastName],
                                "ApplicantSignature": [JSONData.Signature1Base64],
                                "ApplicantSignature2": [JSONData.Signature2Base64]
                            }
                        }
                    });
                }); // data.map end tag
                SaveDataAPICallMailSend(SaveDataFormURL, SavePensiondata)
                    .then((data) => {
                        notify.show("Your Pension application generated Successfully", "success", 3000);
                        console.log("Pension application saved in s3 buckets", data);
                        this.handlePensionDocId(this);
                    })
            }).catch((err) => {
                console.log(err);
            });
    }

    handlePensionDocId(e) {
        let Docurl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DocIDData = {
            QueryName: "PensionIdGenQuery",
            UserID: emailresult,
            docId: "KPF",
        };
        SaveDataAPICallMailSend(Docurl, DocIDData)
            .then((data) => {
                console.log("Successfully generated document ID", data);
                this.handleAppDocTrackEntry(data[0].PensionEmpID, data[0].DocumentID);
            }).catch((err) => {
                console.log(err);
            });
    }

    handleAppDocTrackEntry(PensionEmpID, DocID) {
        let Docurl = " https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DocIDData = {
            QueryName: "PensionFormAppDocTrackingInsert",
            UserID: emailresult,//"spurthi.n@mitosistech.com",            
            DocumentID: DocID,
            DocumentCode: PensionEmpID,
            CountryCode: country_code,//this.state.CountryCode,            
            SendDate: new Date(),
            DownloadPensionAppFileLink: "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/" + emailresult + "/" + "paf_korea_en.pdf",
        };
        console.log(JSON.stringify(DocIDData));
        SaveDataAPICallMailSend(Docurl, DocIDData)
            .then((data) => {
                console.log("Successfully inserted in AppDoc Table.", data);
                // this.handleRedirect(this);
            }).catch((err) => {
                console.log(err);
            });
    }

    handleRedirect(event) {
        history.push('/ApplicantDashboard');
    }

    //Auto-Populated Function
    handleBenQusKRAuto(event) {
        var thisObj = this;
        console.log("Email result", emailresult);
        let BenQusAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusAutoJSONData = JSON.stringify({
            QueryName: "BQ2Auto",
            UserID: emailresult,
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
            url: BenQusAutoAPIUrl,
            data: BenQusAutoJSONData,
            //headers:AxiosHeaderConfig,

        }).then(({ data }) => {
            console.log("Auto Populate", data);
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ name: data[i].FirstName });
                thisObj.setState({ lastName: data[i].LastName });
                thisObj.setState({ registrationNo: data[i].ResQusID });
                thisObj.setState({ telMobile: data[i].PhoneNum });
                thisObj.setState({ telHome: data[i].HomeNum });
                thisObj.setState({ mailingAddress: data[i].MailingAddress });

                thisObj.setState({ agentRegistNo: data[i].PersonalIDNum });
                thisObj.setState({ FPNation: data[i].CountryCode });

                if (data[i].CountryStayDate == 'Work') {
                    thisObj.setState({ Work: true });
                }
                else {
                    thisObj.setState({ Non_Work: true })
                }
                if (data[i].ResCountry == "KR" && data[i].CountryStayDate == "Work") {
                    thisObj.setState({ SalWork: true });
                }
                else {
                    thisObj.setState({ SalWork: '' });
                }
                thisObj.setState({ FPNation: data[i].CountryCode });

            }
        }).catch((err) => {

        })
    }

    //Page Rendering
    render() {
        let DateTimeFormat = global.Intl.DateTimeFormat;
        const google = window.google;
        return (
            <div>
                <Col xs={12} md={12}>
                    <Panel eventKey="1" defaultExpanded={true}>
                        <Panel.Heading>
                            <Panel.Title toggle>SouthKorean Form</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Row className="show-grid" className="overall">
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12}>
                                            <h4 className="ColorStyle"><b>About you</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>Beneficiary</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} className="input-fileds align-fileds">
                                        <Col xs={4} md={2} className="input-fileds align-fileds">
                                            <label>What is your average monthly income in South Korea (in South Korean Won)<span className="manatoryfield">*</span></label>
                                        </Col>
                                        <Col xs={4} md={6} className="input-fileds align-fileds">
                                            <TextField hintText="Enter your monthly income"
                                                value={this.state.income}
                                                onChange={this.handleChangeIncome}
                                                errorText={this.state.isValidIncome ? "Please enter Income" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4><b>If there is another family member you believe is eligible for additional pensions, complete the following</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={4} md={4} className="input-fileds align-fileds">
                                            <label>Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter your name"
                                                value={this.state.additionalName}
                                                onChange={this.handleChangeAdditionalName}
                                                errorText={this.state.isValidAdditionalName ? "Please enter name" : null}
                                            />
                                        </Col>
                                        <Col xs={4} md={4} className="input-fileds align-fileds">
                                            <label>Resident registration No<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter your resident registration number"
                                                value={this.state.residentRegNo}
                                                onChange={this.handleChangeResidentRegNo}
                                                errorText={this.state.isValidResidentRegNo ? "Please enter registration number" : null}
                                            />
                                        </Col>
                                        <Col xs={4} md={4} className="input-fileds align-fileds">
                                            <label>Relationship to the beneficiary<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter your relationship"
                                                value={this.state.relationship}
                                                onChange={this.handleChangeRelationship}
                                                errorText={this.state.isValidRelationship ? "Please enter relationship" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} className="input-fileds align-fileds" >
                                        <Col xs={12} md={12}>
                                            <label>What is your chosen date to receive benefits (DD MM YYYY format)<span className="manatoryfield">*</span></label>
                                        </Col>
                                        <Col xs={4} md={6}>
                                            <DatePicker hintText="Choose the date"
                                                value={this.state.livedDate}
                                                onChange={this.handlerWorkedLivedDate}
                                                errorText={this.state.isValidLivedDate ? "Please select date" : null}
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                DateTimeFormat={DateTimeFormat}
                                                formatDate={new DateTimeFormat('en-AU', {
                                                    day: 'numeric',
                                                    month: 'numeric',
                                                    year: 'numeric',
                                                }).format}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={4} md={12} className="checkboxalign">
                                            <Checkbox
                                                checked={this.state.isChecked1}
                                                label="I hereby apply for the Old Age Pension under Article 22(1) of the Enforcement Regulation of the National Pension Act."
                                                value={this.state.accept}
                                                onClick={this.handleChangeAccept.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidAccept ? "Please tik the checkbox" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Date (MM DD YYYY)<span className="manatoryfield">*</span></label>
                                            <DatePicker
                                                hintText="Select the form date"
                                                value={this.state.formDate}
                                                onChange={this.handlerFormDate}
                                                errorText={this.state.isValidFormDate ? "Please select form date" : null}
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                DateTimeFormat={DateTimeFormat}
                                                formatDate={new DateTimeFormat('en-AU', {
                                                    day: 'numeric',
                                                    month: 'numeric',
                                                    year: 'numeric',
                                                }).format}

                                            />
                                        </Col>
                                        <Col xs={12} md={5}>
                                        </Col>
                                        <Col xs={12} md={3} className="input-fileds Sign" >
                                            <label className="TopicAlign"><b>Signature</b></label>
                                            <SignaturePad ref={ref => this.signaturePad1 = ref} />
                                            <Button id="clear" className="ClearBtn" onClick={this.handleSignatureClear.bind(this)}>Clear</Button>
                                            <span className="validationmsg">{this.state.isValidSignature ? "Please sign your signature" : ""}</span>

                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>Consent on Sharing Administrative Information</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={4} md={12} >
                                            <Checkbox
                                                checked={this.state.isChecked2}
                                                label="I hereby agree to the NPS's verification of the Business Registration Certificate in regards to processing work via administrative information sharing under Article 36(2) of the Electronic Government Act."
                                                value={this.state.acceptance}
                                                onClick={this.handleChangeAcceptance.bind(this)}

                                            />
                                            <span className="validationmsg">{this.state.isValidAcceptance ? "Please tik the checkbox" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={5}>
                                        </Col>
                                        <Col xs={12} md={4}>
                                        </Col>
                                        <Col xs={12} md={3} className="input-fileds Sign">
                                            <label className="TopicAlign"><b>Signature</b></label>
                                            <SignaturePad ref={ref => this.signaturePad2 = ref} />
                                            <Button id="clear" className="ClearBtn" onClick={this.handleSignatureClear2.bind(this)}>Clear</Button>
                                            <span className="validationmsg">{this.state.isValidSign ? "Please sign your signature" : ""}</span>
                                        </Col>
                                    </Col>
                                </Col>
                            </Row>
                        </Panel.Body>
                        {ModeEdit == "E" ?
                            <Col xs={12} md={12}>
                                <Col xs={12} md={12} className="input-fields">
                                    <Button onClick={this.handlerSubmit.bind(this)} className="RQ-Add" >Update</Button>
                                    <Notifications />
                                </Col>
                            </Col>
                            : <Col xs={12} md={12}>
                                <Col xs={12} md={12} className="input-fields">
                                    <Button onClick={this.handlerSubmit.bind(this)} className="RQ-Add" >Save</Button>
                                    <Notifications />
                                </Col>
                            </Col>
                        }
                    </Panel>

                    <Col xs={12} md={12}>
                        <BenQusSKBankForm />
                    </Col>
                </Col>

            </div >
        );
    }

    // handle send mail.
    handleSendDocumentMail(e) {
        let OtherDocumentationURL = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let OtherDocumentData = {
            "MailDocName": "OtherDocumentation",
            "EmailTo": emailresult//ramya.s@mitosistech.com
        }
        // if (thisObj.state.ApplicantAge >= 65 && thisObj.state.ApplicantAgeMonth > 6) {
        SaveDataAPICallMailSend(OtherDocumentationURL, OtherDocumentData)
            .then((data) => {
                console.log("Otherdocuments mail has to be sent to user", data);
                notify.show("Required Documents Details email sent Successfully", "success", 3000);
            }).catch((err) => {
                console.log(err);
            });
        //}
    }

    //Save Function
    handlerSubmit(e) {
        var ApplicantSignature1Base64 = this.signaturePad1.toDataURL();
        var ApplicantSignature2Base64 = this.signaturePad2.toDataURL();

        e.preventDefault();
        var thisObj = this;
        var isValid = this.validateFormField();
        console.log("IsValid", isValid);
        if (isValid) {
            let QName;
            if (ModeEdit == "E") {
                QName = "SouthKoreaPart2Update"
            } else {
                QName = "BenQusPart2SaveKR"
            }
            let benQusKRData = {
                QueryName: QName,
                UserID: emailresult,
                PensionFormType: "OAP",
                AppAnsInJsonObj:
                {
                    Name: this.state.name,
                    RegistrationNo: this.state.registrationNo,
                    TelHome: this.state.telHome,
                    TelMobile: this.state.telMobile,
                    MailingAddress: this.state.mailingAddress,
                    Email: this.state.email,
                    DocumentChecked: this.state.documentChecked,
                    EmailChecked: this.state.emailChecked,
                    DocEmailchecked: this.state.docEmailchecked,
                    FinancialIns: this.state.financialIns,
                    FormDate: this.state.formDate,
                    AccountNo: this.state.accountNo,
                    StateOfWork: this.state.stateOfWork,
                    Income: this.state.income,
                    IncomeCategory: this.state.incomeCategory,
                    AdditionalName: this.state.additionalName,
                    ResidentRegNo: this.state.residentRegNo,
                    Relationship: this.state.relationship,
                    FPensionYesChecked: this.state.FPensionYesChecked,
                    FPension: this.state.FPension,
                    FPNation: this.state.FPNation,
                    FPPeriodStart: this.state.FPPeriodStart,
                    Lived: this.state.lived,
                    LivedNation: this.state.livedNation,
                    LivedPeroidStart: this.state.livedPeroidStart,
                    LivedPeroidEnd: this.state.livedPeroidEnd,
                    LivedDate: this.state.livedDate,
                    AgentName: this.state.agentName,
                    AgentRegistNo: this.state.agentRegistNo,
                    AgentTelephone: this.state.agentTelephone,
                    AgentMobile: this.state.agentMobile,
                    AgentRelationship: this.state.agentRelationship,
                    AgentMailingAddress: this.state.agentMailingAddress,
                    VerifiedBeneficiry: this.state.verifiedBeneficiry,
                    ChiefOfficial: this.state.chiefOfficial,
                    Accept: this.state.accept,
                    Acceptance: this.state.acceptance,
                    FPPeriodEnd: this.state.FPPeriodEnd,
                    LastName: this.state.lastName,
                    Signature1Base64: ApplicantSignature1Base64,
                    Signature2Base64: ApplicantSignature2Base64
                },
                CountryCode: "KR",
                BQP2AnsStatus: "C",
            }
            let countryApiUrl = "https://4k73oeispk.execute-api.us-west-2.amazonaws.com/dev/GPA_BenQusDatas_Lambda";
            console.log("Data2", JSON.stringify(benQusKRData));
            axios({
                method: "POST",
                url: countryApiUrl,
                data: JSON.stringify(benQusKRData),
            }).then(({ data }) => {
                console.log("Success", data);
                if (ModeEdit == "E") {
                    notify.show("Updated Successfully", "success", 3000);
                } else {
                    notify.show("Your Part2 Information Saved Successfully", "success", 3000);
                    // this.props.MailSends();
                }
                thisObj.handleSendDocumentMail(this);
                thisObj.handleSavePensionData(this);
            }).catch((err) => {
                console.log("Error", err);
            });
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }
}

////*****call all the API common method****/////
const SaveDataAPICallMailSend = function (mailSendURL, data) {
    var promise = new Promise(function (resolve, reject) {
        axios({
            method: "POST",
            url: mailSendURL,
            data: JSON.stringify(data),

        }).then(({ data }) => {

            resolve(data);
        })
            .catch((err) => {

                reject(err);
            });
    })
    return promise;
}

// react redux
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(BenQusSouthKorean);