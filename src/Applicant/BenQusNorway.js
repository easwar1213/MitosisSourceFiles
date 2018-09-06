import React, { Component } from 'react';
import PropTypes from "prop-types";
//Bootstrap Component
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
// import MonthPickerInput from 'react-month-picker-input';
import AutoComplete from 'material-ui/AutoComplete';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

//Singature Pad
import SignaturePad from 'react-signature-pad';

//API Calling Method
import axios from 'axios';

//Notification 
import Notifications, { notify } from 'react-notify-toast';

//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Google Address
import Geosuggest from 'react-geosuggest';

//Month Picker
import * as Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

//import { Col, Panel, Row, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
var emailresult;
const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
    checkbox: {
        marginBottom: 16,
    },
};

const newstyle = {
    marginTop: 10,
}

const style = {
    block: {
        maxWidth: 250,
    },

    radioButton: {
        marginBottom: 16,
    },
};
// const OutsidenorwayItems = [
//     <MenuItem value={"Y"} key={1} primaryText={`Yes`} />,
//     <MenuItem value={"N"} key={2} primaryText={`No`} />,
// ];
// const LivingaproadItems = [

//     <MenuItem value={"Y"} key={1} primaryText={`Yes`} />,
//     <MenuItem value={"N"} key={2} primaryText={`No`} />,

// ];
const CountryItems = [

];
const BenCountryItems = [
    <MenuItem value={"CA"} primaryText="Canada" />,
    <MenuItem value={"DK"} primaryText="Denmark" />,
    <MenuItem value={"FR"} primaryText="France" />,
    <MenuItem value={"IT"} primaryText="Italy" />,
    <MenuItem value={"JP"} primaryText="Japan" />,
    <MenuItem value={"QC"} primaryText="Quebec" />,
    <MenuItem value={"UK"} primaryText="United Kingdom" />,
    <MenuItem value={"US"} primaryText="United States of America" />,
    <MenuItem value={"NO"} primaryText="Norway" />,
];

const PrivatepensionItems = [
    <MenuItem value={"Y"} key={1} primaryText={`Yes`} />,
    <MenuItem value={"N"} key={2} primaryText={`No`} />,
]

const MaritalStatusItems = [
    <MenuItem value={"S"} key={1} primaryText={`Single`} />,
    <MenuItem value={"M"} key={2} primaryText={`Married`} />,
    <MenuItem value={"C"} key={3} primaryText={`Married`} />,
    <MenuItem value={"D"} key={4} primaryText={`Divorced`} />,
    <MenuItem value={"SP"} key={4} primaryText={`Separated`} />,
    <MenuItem value={"P"} key={4} primaryText={`Partner`} />,
    <MenuItem value={"W"} key={5} primaryText={` Widower, or surviving partner / cohabitating partner`} />,
];
const SpouseItems = [
    <MenuItem value={"M"} key={1} primaryText={`Spouse`} />,
    <MenuItem value={"C"} key={2} primaryText={`Spouse`} />,
    <MenuItem value={"S"} key={3} primaryText={`Single`} />,
    <MenuItem value={"D"} key={4} primaryText={`Divorced`} />,
    <MenuItem value={"W"} key={5} primaryText={` Widower`} />,
]

const PensionItems = [
    <MenuItem value={"Y"} key={1} primaryText={`Yes`} />,
    <MenuItem value={"N"} key={2} primaryText={`No`} />,
];
const menuProps = {
    desktop: true,
    disableAutoFocus: true,
};

class BenQusNorway extends Component {
    constructor(props) {
        super(props);
        this.handleLoadCountry(this);
        // this.handleLoadCompany(this);


        //Field State Values Initialization
        this.state = {
            GoogleAdrsCountry: '',
            LanguageCState: '',
            NationalNumberState: '',
            LastnameState: '',
            FirstNameState: '',
            PhonenumberState: '',
            AddressState: '',
            NorwayacnumberState: '',
            UDINumberState: '',
            NationalityState: '',
            younationalityState: '',
            BeginDateState: '',
            RetirementpensionLevelState: '100',
            CivilStatusState: '',
            PartnerlivingpartState: '',
            contractualpensionState: '',
            USdollarState: '',
            NorwegianKroneState: '',
            OutsideNorwayState: '',
            livedorworkNorwayState: '',
            SpouseState: '',
            SnationalnumberState: '',
            SNameState: '',
            PartnerchildState: '',
            PartnermarriedState: '',
            CohabitatingpartnerState: '',
            CountryStayReason: '',
            SpouseNationalityState: '',
            WNationalitynumberState: '',
            DeceasednationalnumberState: '',
            AFPState: '',
            NamedeceasedState: '',
            DateofdiedState: '',
            CountryStay: '',
            SNationalityState: '',
            PrivatepensionState: '',
            MailingAddressState: '',
            DateState: '',
            ResBeginDateState: '',
            ResEndDateState: '',
            CountryState: '',
            ResCountryState: '',
            ForeignState: '',
            LiveState: '',
            searchText: '',
            CompanyFlag: "CompanySave",
            viewList: false,
            workedState: '',
            PensionState: '',
            PensionotherCountriesState: '',
            SecurityState: '',
            AmountState: '',
            CurrencyState: '',
            StayNorwayState: '',
            DateFromState: '',
            DateToState: '',
            EmployerState: '',
            NAddressState: '',
            LivedState: '',
            Worked1State: '',
            PaymentState: '',
            MCPartnerState: '',
            NorwegianIDnumberState: '',
            BankNameState: '',
            Date1State: '',
            RoutingnumberState: '',
            AccountnumberState: '',
            AUBankCodeState: '',
            AUAccountnumberState: '',
            CADirectPaymentState: '',
            CAAccountnumberState: '',
            CABICState: '',
            MXBICState: '',
            MXClabenumberState: '',
            ZAAccountnumberState: '',
            ZABankCodeState: '',
            MailingAddress1State: '',
            BankAcNumberState: '',
            BICCodeState: '',
            UserNameState: '',
            UserMailingAddressState: '',
            BankCodeState: '',
            SpouseNameState: '',
            SpouseDateState: '',
            CountryReasonState: '',
            SpouseNationality1State: '',
            EligibleCountryState: '',

            BtnNameState: "Save",
            DateOfBirth: "",
            ApplicantAge: 0,
            ConditionalState: "",
            isValidSocialNumber: false,
            isValidLanguageC: false,
            isValidNationalNumber: false,
            isValidLastname: false,
            isValidFirstName: false,
            isValidAddress: false,
            isValidPhonenumber: false,
            isValidNorwayacnumber: false,
            isValidUDINumber: false,
            isValidNationality: false,
            isVAlidRetirementpensionLevel: false,
            isValidCivilStatus: false,
            isValidPartnerlivingpart: false,
            isValidcontractualpension: false,
            isValidOutsideNorway: false,
            isValidlivedorworkNorway: false,
            isValidSpouse: false,
            isValidSnationalnumber: false,
            isValidSnationalnumber1: false,
            isValidSName: false,
            isValidPartnerchild: false,
            isValidPartnermarried: false,
            isValidCohabitatingpartner: false,
            isValidCountryStayReason: false,
            isValidSpouseNationality: false,
            isValidWNationalitynumber: false,
            isValidAFP: false,
            isValidNamedeceased: false,
            isValidDateofdied: false,
            isValidCountryStay: false,
            isValidSNationality: false,
            isValidPrivatepension: false,
            isValidDeceasednationalnumber: false,
            isValidMailingAddress: false,
            isValidDate: false,
            isValidSignature: false,
            isValidResBeginDate: false,
            isValidResEndDate: false,
            isValidCountry: false,
            isValidResCountry: false,
            isValidForeign: false,
            isValidLive: false,
            isValidsearch: false,
            isValidworked: false,
            isValidPension: false,
            isValidPensionotherCountries: false,
            isValidSecurity: false,
            isValidamount: false,
            isValidCurrency: false,
            isValidStayNorway: false,
            isValidDateFrom: false,
            isValidDateTo: false,
            isValidEmployer: false,
            isValidNAddress: false,
            isValidLived: false,
            isVaildWorked: false,
            isValidPayment: false,
            isValidMCPartner: false,
            isValidNorwegianIDnumber: false,
            isValidMailingAddress1: false,
            isValidBankAcNumber: false,
            isValidBICCode: false,
            isValidUserName: false,
            isValidRoutingnumber: false,
            isValidAccountnumber: false,
            isValidAUBankCode: false,
            isValidAUAccountnumber: false,
            isValidCAAccountnumber: false,
            isValidCABIC: false,
            isValidCADirectPayment: false,
            isValidMXBIC: false,
            isValidZAAccountnumber: false,
            isValidZABankCode: false,
            isValidMXClabenumber: false,
            isValidUserMailingAddress: false,
            isValidBankCode: false,
            isValidSpouseName: false,
            isValidSpouseDate: false,
            isValidCountryReason: false,
            isValidSpouseNationality1: false,

            isValidFormateLanguageC: false,
            isValidFormatNationalNumber: false,
            isValidFormatLastname: false,
            isValidFormatFirstName: false,
            isValidFormatPhonenumber: false,
            isValidFormatNorwayacnumber: false,
            isValidFormatUDINumber: false,
            isValidFormateNationality: false,
            isValidFormateRetirementpensionLevel: false,
            isValidFormateCivilStatus: false,
            isValidFormatePartnerlivingpart: false,
            isValidFormatecontractualpension: false,
            isValidFormateOutsideNorway: false,
            isValidFormatelivedorworkNorway: false,
            isValidFormateSpouse: false,
            isValidFormateSnationalnumber: false,
            isValidFormateSName: false,
            isValidFormatePartnerchild: false,
            isValidFormatePartnermarried: false,
            isValidFormateCohabitatingpartner: false,
            isValidFormateCountryStayReason: false,
            isValidFormateSpouseNationality: false,
            isValidFormateWNationalitynumber: false,
            isValidFormateAFP: false,
            isValidFormateNamedeceased: false,
            isValidFormateDateofdied: false,
            isValidFormateCountryStay: false,
            isValidFormateSNationality: false,
            isValidFormatePrivatepension: false,
            isValidFormateDeceasednationalnumber: false,
            isValidFormatMailingAddress: false,
            isValidFormateDate: false,
            isValidFormateResBeginDate: false,
            isValidFormateResEndDate: false,
            isValidFormateCountry: false,
            isValidFormateResCountry: false,
            isValidFormateForeign: false,
            isValidFormateLive: false,
            isValidFormatesearch: false,
            isValidFormateworked: false,
            isValidFormatePension: false,
            isValidFormatePensionotherCountries: false,
            isValidFormateSecurity: false,
            isValidFormateamount: false,
            isValidFormateCurrency: false,
            isValidFormateStayNorway: false,
            isValidFormateDateFrom: false,
            isValidFormateDateTo: false,
            isValidFormateEmployer: false,
            isValidFormateNAddress: false,
            isValidFormateLived: false,
            isValidFormateWorked: false,
            isValidFormatePayment: false,
            isValidFormateMCPartner: false,
            isValidFormateNorwegianIDnumber: false,
            isValidFormateMailingAddress1: false,
            isValidFormateBankAcNumber: false,
            isValidFormateBICCode: false,
            isValidFormateUserMailingAddress: false,
            isValidFormateUserName: false,
            isValidFormateRoutingnumber: false,
            isValidFormateAccountnumber: false,
            isValidFormateAUBankCode: false,
            isValidFormateMXClabenumber: false,
            isvalidFormateMXBIC: false,
            isValidFormateAUAccount: false,
            isvalidFormateBankCode: false,
            isValidFormateSpouseName: false,
            isValidFormateSpouseDate: false,
            isValidFormateCountryReason: false,
            isValidFormateSpouseNationality1: false,

        }
    }
    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        //this.handleBenQusNorwayAuto(this);
    }


    //Handle Function

    handleChangeLanguageC(e, index, value) {
        this.setState({ LanguageCState: value });
    };
    handleChangeNationalNumber(e) {
        const NationalNumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ NationalNumberState: NationalNumber });
    };
    handleChangeLastname(e) {
        const Lastname = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ LastnameState: Lastname });
    };
    handleChangeFirstName(e) {
        const FirstName = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ FirstNameState: FirstName });
    };

    handleChangePhonenumber(e) {
        const Phonenumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ PhonenumberState: Phonenumber });
    };
    handleChangeNorwayacnumber(e) {
        this.setState({ NorwayacnumberState: e.target.value });
    };
    handleChangeUDINumber(e) {
        const UDInumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ UDINumberState: UDInumber });
    };
    handleChangeNationality(e) {
        this.setState({ NationalityState: e.target.value });
    };
    handleChangeyounationality(e) {
        this.setState({ younationalityState: e.target.value });
    };
    handleChangeBeginDate(date) {
        this.setState({ BeginDateState: Datetime.moment(date).format("MM-YYYY") });

    };
    handleChangeRetirementpensionLevel(e) {
        const RDInumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ RetirementpensionLevelState: RDInumber });
    };
    handleChangeCivilStatus(event, index, value) {
        this.setState({ CivilStatusState: value });
    };
    handleChangePartnerlivingpart(e) {
        this.setState({ PartnerlivingpartState: e.target.value });
    };
    handleChangecontractualpension(event, index, value) {
        this.setState({ contractualpensionState: value });
    };
    handleChangeUSdollar(e) {
        this.setState({ USdollarState: e.target.value });
    };
    handleChangeNorwegianKrone(e) {
        this.setState({ NorwegianKroneState: e.target.value });
    };
    handleChangeOutsideNorway(e) {
        this.setState({ OutsideNorwayState: e.target.value });
    };
    handleChangelivedorworkNorway(e) {
        this.setState({ livedorworkNorwayState: e.target.value });
    };
    handleChangeSpouse(event, index, value) {
        this.setState({ SpouseState: value });
    };
    handleChangeSnationalnumber(e) {
        const SNnumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ SnationalnumberState: SNnumber });
    };
    handleChangeSnationalnumber1(e) {
        const Snationalnumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ Snationalnumber1State: Snationalnumber });
    };
    handleChangeSName(e) {
        const SName = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ SNameState: SName });
    };
    handleChangePartnerchild(e) {
        const Partner = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ PartnerchildState: Partner });
    };
    handleChangePartnermarried(e) {
        this.setState({ PartnermarriedState: e.target.value });
    };
    handleChangeCohabitatingpartner(date) {
        this.setState({ CohabitatingpartnerState: Datetime.moment(date).format("MM-YYYY") });
    };
    handleCountryStayReason(e) {
        this.setState({ CountryStayReason: e.target.value });
    };
    handleChangeSpouseNationality(e) {
        const PartnerNationality = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ SpouseNationalityState: PartnerNationality });
    };
    handleChangeWNationalitynumber(e) {
        const WNationNnumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ WNationalitynumberState: WNationNnumber });
    };
    handleChangeDeceasednationalnumber(e) {
        const Deceasednationalnumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ DeceasednationalnumberState: Deceasednationalnumber });
    };
    handleChangeAFP(e) {
        const AFP = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ AFPState: AFP });
    };
    handleChangeNamedeceased(e) {
        const Namedeceased = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ NamedeceasedState: Namedeceased });
    };
    handleChangeDateofdied(event, date) {
        this.setState({ DateofdiedState: date });
    };
    handleCountryStay(e) {
        this.setState({ CountryStay: e.target.value });
    };
    handleChangeSNationality(e) {
        const SNationality = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ SNationalityState: SNationality });
    };
    handleChangePrivatepension(event, index, value) {
        this.setState({ PrivatepensionState: value });
    };
    handleChangeDate(event, date) {
        this.setState({ DateState: date });
    };
    handleSignatureClear = (e) => {
        this.signaturePad.clear();
    };
    handleSignature1Clear = (e) => {
        this.signaturePad1.clear();
    };
    handleChangeResBeginDate(date) {
        this.setState({ ResBeginDateState: Datetime.moment(date).format("MM-YYYY") });
    };
    handleChangeResEndDate(date) {
        this.setState({ ResEndDateState: Datetime.moment(date).format("MM-YYYY") });
    };

    handleChangeCountryName(e, index, value) {
        this.setState({ ResCountryState: value });
        //this.handleLoadCompany(value);
        this.setState({ CountryNameState: e.target.innerText });
    };
    handleChangeForeign(e) {
        const Foreign = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ ForeignState: Foreign });
    };
    handleChangeLive(e) {
        this.setState({ LiveState: e.target.value });
    };
    handleChangeworked(e) {
        this.setState({ workedState: e.target.value });
    };
    handleUpdateInput = (searchText) => {
        let len = searchText.length;
        if (len > 5) {
            this.setState({
                viewList: true
            })
        }
        else {
            this.setState({
                viewList: false
            })
        }
        this.setState({
            searchText: searchText,
        });
    };


    // Save Pension Data.
    handleSavePensionData(e) {
        console.log("Pension");
        // alert("savepensiondata");
        let SavePensiondata = "";
        let PensionFormID = {
            UserID: emailresult,
            QueryName: "Pensiondata",
        }
        let DataURLPension = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let SaveDataFormURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";

        SaveDataAPICallMailSend(DataURLPension, PensionFormID)
            .then((data) => {
                data.map((item, key) => {
                    let JSONData = JSON.parse(item.AppAnsInJsonObj);
                    console.log("data", data)
                    SavePensiondata = ({
                        "html": "This is test Data",
                        "language": "en",
                        "DocCategory": "NorPaf",
                        "params": {
                            "empId": emailresult,//"spurthi.n@mitosistech.com",
                            "pensionData": {
                                "NationIdentityNumber": [JSONData.NationalNumber],
                                "FirstNameLastName": [JSONData.FirstName + JSONData.Lastname],
                                "Address": [JSONData.Address],
                                "TelephoneNumber": [JSONData.Phonenumber],
                                "PaymentAccountNumber": [JSONData.Norwayacnumber],
                                "UDI": [JSONData.UDINumber],
                                "NorwegianYes": [JSONData.Nationality],
                                "Nationality": [JSONData.younationality],
                                "RetirementPension": [JSONData.BeginDate],
                                "PensionLevel": [JSONData.RetirementpensionLevel],//Change
                                "Widow": [JSONData.CivilStatus],//Change
                                "PartnerIncome": [JSONData.Partnerlivingpart],
                                "ContractualPensionYes": [JSONData.contractualpension],
                                "USDollar$": [JSONData.USdollar],
                                "Krone": [JSONData.NorwegianKrone],
                                "AbroadYes": [JSONData.OutsideNorway],
                                "LivingAbroadYes": [JSONData.livedorworkNorway],
                                "Spouse": [JSONData.Spouse],
                                "SpouseNINNumber": [JSONData.Snationalnumber],
                                "SpouseName": [JSONData.SName],
                                "CohabitingPartnerChild": [JSONData.Partnerchild],
                                "CohabitingPartnerMarried": [JSONData.Partnermarried],
                                "CohabatingYear": [JSONData.Cohabitatingpartner],
                                "SpouseNationality": [JSONData.CountryStayReason],
                                "SpouseCohabatingNationality": [JSONData.SpouseNationality],
                                "DeceasedNINNumber": [JSONData.WNationalitynumber],
                                "DeceasedName": [JSONData.Namedeceased],
                                "DateofDeath": [JSONData.Dateofdied],
                                "DeceasedOthers": [JSONData.CountryStay],
                                "DeceasedNationality": [JSONData.SNationality],
                                "AFP": [JSONData.AFP],
                                "ChildAge": [JSONData.Privatepension],
                                "Place": [JSONData.MailingAddress],
                                "Current date": [JSONData.Date],
                                "DateFrom": [JSONData.ResBeginDate],
                                "DateTo": [JSONData.ResEndDate],
                                "Country": [JSONData.Country],
                                "Pension Scheme": [JSONData.ResCountry],
                                "Foreign national identity number": [JSONData.Foreign],
                                "livedinNorway": [JSONData.Live],
                                "WorkedinNorway": [JSONData.worked],
                                "PensionFromNorway": [JSONData.Pension],
                                "PensionCountry": [JSONData.PensionotherCountries],
                                "PaymentForeign": [JSONData.Payment],
                                "WorkedNorway": [JSONData.Worked1],
                                "LivedNorway": [JSONData.Lived],
                                "NorwegianAddress": [JSONData.NAddress],
                                "Employer": [JSONData.Employer],
                                "NorwayDateTo": [JSONData.DateTo],
                                "NorwayDatefrom": [JSONData.DateFrom],
                                "Currency": [JSONData.Currency],
                                "Amountperyear 2": [JSONData.Amount],
                                "RegisteredPartner": [JSONData.MCPartner],
                                "Bank Name": [JSONData.BankName],
                                "AccountNumber": [JSONData.BankAcNumber],
                                "BIC /SWIFT code": [JSONData.BICCode],
                                "Bankcode": [JSONData.BankCode],
                                "LiveAbroadSpousenorwegianIDNumber": [JSONData.NorwegianIDnumber],
                                "LiveAbroadSpouseName": [JSONData.SpouseName],
                                "LiveAbroadSpousedateofbirth": [JSONData.SpouseDate],
                                "SpousePartnerNINumber": [JSONData.NorwegianIDnumber],
                                "PartnerNationalityNorway": [JSONData.CountryReason],
                                "PartnerNationality": [JSONData.SpouseNationality1]
                            }
                        }
                    });
                });
                SaveDataAPICallMailSend(SaveDataFormURL, SavePensiondata)
                    .then((data) => {
                        notify.show("Your Pension application generated Successfully", "success", 3000);
                        console.log("Pension application saved in s3 buckets", data);
                        let documentIdApi = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
                        let docData = {
                            QueryName: "NorwayPensionApplicantionDocGen",
                            UserID: emailresult
                        }
                        SaveDataAPICallMailSend(documentIdApi, docData)
                            .then((data) => {
                                this.setState({
                                    pensionDocumentId: data[0].NorwayPensionEmpID
                                })
                                // Pension from link 
                                let AppDocUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
                                let AppDocTrackData = {
                                    QueryName: "CountryBasedDocumentsTrackDoc",
                                    UserID: emailresult,
                                    DocumentID: "79",
                                    DocumentCode: this.state.pensionDocumentId,
                                    CountryCode: "NO",
                                    IsSend: "Y",
                                    SendDate: new Date()
                                }
                                SaveDataAPICallMailSend(AppDocUrl, AppDocTrackData)
                                    .then((data) => {
                                        console.log("DocumentTracking entry", data);
                                        console.log("Document Entry in App Doc Track Table.");
                                        let pafapi = " https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda"
                                        let pafInput = {
                                            "QueryName": "UpdatePAFLink",
                                            DocumentCode: this.state.pensionDocumentId,
                                            DownloadPensionAppFileLink: "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/" + emailresult + "/" + "Nor_paf_en.pdf"
                                        }
                                        console.log("pafinput" + JSON.stringify(pafInput));
                                        SaveDataAPICallMailSend(pafapi, pafInput)
                                            .then((data) => {
                                                this.handleRedirect(this);
                                                console.log("Successfully stored", data);
                                                console.log("Benefits Questionnaires contribution link stored in DB");
                                            }).catch((err) => {
                                                console.log(err);
                                            });
                                    }).catch((err) => {
                                        console.log(err);
                                    });
                            })
                    }).catch((err) => {
                        console.log(err);
                    });
            }).catch((err) => {
                console.log(err);
            });
    }
    handleRedirect(event) {
        history.push('/ApplicantDashboard');
    }

    handleLoadCompany(event) {
        var thisObj = this;
        let LoadCountryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            {
                QueryName: "ClientCompaniesCB1",
            }
        );
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: LoadCountryAPIUrl,
            headers: AxiosHeaderConfig,
        }).then(({ data }) => {
            console.log("Data length", data.length)
            let len = data.length;
            console.log("Data", data);
            if (len == 0) {
                thisObj.setState({ isEmptyCompanyName: true });
            } else {
                thisObj.setState({ isEmptyCompanyName: false });
            }
            let data1 = [];
            data.forEach(function(res) {
                data1.push(res.CompanyName);
            })
            this.setState({
                Countries: data1
            })
            console.log("State Countries:", data1)

        }).catch((err) => {
            console.log(err)
        })
    }
    handleChangePension(e) {
        this.setState({ PensionState: e.target.value });
    };
    handleChangePensionotherCountries(e) {
        this.setState({ PensionotherCountriesState: e.target.value });
    };
    handleChangeCountry(e, index, value) {
        this.setState({ CountryState: value });
    };
    handleChangeSecurity(e) {
        const Security = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ SecurityState: Security });
    };
    handleChangeAmount(e) {
        this.setState({ AmountState: e.target.value });
    };
    handleChangeCurrency(e) {
        this.setState({ CurrencyState: e.target.value });
    };

    handleChangeDateFrom(date) {
        this.setState({ DateFromState: Datetime.moment(date).format("MM-YYYY") });

    };
    handleChangeDateTo(date) {
        this.setState({ DateToState: Datetime.moment(date).format("MM-YYYY") });
    };
    handleChangeEmployer(e) {
        this.setState({ EmployerState: e.target.value });
    };
    handleChangeNAddress(e) {
        this.setState({ NAddressState: e.target.value });
    };
    handleChangeLived(event, index, value) {
        this.setState({ LivedState: value });
    };
    handleChangeWorked1(e) {
        this.setState({ Worked1State: e.target.value });
    };
    handleChangePayment(event, index, value) {
        this.setState({ PaymentState: value });
    };
    handleChangeMCPartner(e) {
        this.setState({ MCPartnerState: e.target.value });
    };
    handleChangeNorwegianIDnumber(e) {
        const NorwegianIDnumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ NorwegianIDnumberState: NorwegianIDnumber });
    };
    handleChangeBankName(e) {
        const BankName = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ BankNameState: BankName });
    };
    handleChangeDate1(e, date) {
        this.setState({ Date1State: date });
    };
    handleChangeRoutingnumber(e) {
        const Routingnumbe = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ RoutingnumberState: Routingnumbe });
    };
    handleChangeAccountnumber(e) {

        this.setState({ AccountnumberState: e.target.value });
    };
    handleChangeAUBankCode(e) {
        const AUBankCode = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ AUBankCodeState: AUBankCode });
    };
    handleChangeAUAccountnumber(e) {
        const AUAccountnumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ AUAccountnumberState: AUAccountnumber });
    };
    handleChangeCAAccountnumber(e) {
        const CAAccountnumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ CAAccountnumberState: CAAccountnumber });
    };
    handleChangeCADirectPayment(e) {
        this.setState({ CADirectPaymentState: e.target.value });
    };
    handleChangeCABIC(e) {
        this.setState({ CABICState: e.target.value });
    };
    handleChangeMXBIC(e) {
        this.setState({ MXBICState: e.target.value });
    };
    handleChangeZAAccountnumber(e) {
        const ZAAccountnumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ ZAAccountnumberState: ZAAccountnumber });
    };
    handleChangeZABankCode(e) {
        const ZABankCode = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ ZABankCodeState: ZABankCode });
    };
    handleChangeMXClabenumber(e) {
        const MXClabenumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ MXClabenumberState: MXClabenumber });
    };
    handleChangeBankAcNumber(e) {
        const BankAcNumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ BankAcNumberState: BankAcNumber });
    };
    handleChangeBICCode(e) {
        this.setState({ BICCodeState: e.target.value });
    };
    handleChangeUserName(e) {
        const UserName = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ UserNameState: UserName });
    }
    handleChangeBankCode(e) {
        this.setState({ BankCodeState: e.target.value });
    };
    handleChangeSpouseName(e) {
        const SpouseName = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ SpouseNameState: SpouseName });
    };
    handleChangeSpouseDate(event, date) {
        this.setState({ SpouseDateState: date });
    };
    handleChangeCountryReason(e) {
        this.setState({ CountryReasonState: e.target.value });
    };
    handleChangeSpouseNationality1(e) {
        const PartnerNationality1 = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ SpouseNationality1State: PartnerNationality1 });
    };

    //Validation Function
    handleValidateForm(event) {
        let validForm = false;
        var validLanguageCForm = false;
        var validNationalNumberForm = false;
        var validLastnameForm = false;
        var validFirstNameForm = false;
        var validAddressForm = false;
        var validPhonenumberForm = false;
        //var validNorwayacnumberForm = false;
        var validUDINumberForm = false;
        var validNationalityForm = false;
        var validyounationalityForm = false;
        var validBeginDateForm = false;
        var validRetirementpensionLevelForm = false;
        var validCivilStatusForm = false;
        var validPartnerlivingpartForm = false;
        var validcontractualpensionForm = false;
        var validOutsideNorwayForm = false;
        var validlivedorworkNorwayForm = false;
        var validSpouseForm = false;
        var validSnationalnumberForm = false;
        var validSNameForm = false;
        var validPartnerchildForm = false;
        var validPartnermarriedForm = false;
        var validCohabitatingpartnerForm = false;
        var validCountryStayReasonForm = false;
        var validSpouseNationalityForm = false;
        // var validWNationalitynumberForm = false;
        var validDeceasednationalnumberForm = false;
        // var validNamedeceasedForm = false;
        // var validDateofdiedForm = false;
        // var validCountryStayForm = false;
        var validSNationalityForm = false;
        var validPrivatepensionForm = false;
        var validAFPForm = false;
        var validMailingAddressForm = false;
        var validDateForm = false;
        var validResBeginDateForm = false;
        var validResEndDateForm = false;
        var validResCountryForm = false;
        var validForeignForm = false;
        var validLiveForm = false;
        var validworkedForm = false;
        var validPensionForm = false;
        var validSignatureForm = false;
        var validPensionotherCountriesForm = false;
        // var validCountryForm = false;
        // var validSecurityForm = false;
        // var validAmountForm = false;
        // var validCurrencyForm = false;
        var validStayNorwayForm = false;
        var validDateFromForm = false;
        var validDateToForm = false;
        var validEmployerForm = false;
        var validNAddressForm = false;
        var validLivedForm = false;
        var validWorked1Form = false;
        var validPaymentForm = false;
        var validMCPartnerForm = false;
        var validSnationalnumber1Form = false;
        var validNorwegianIDnumberForm = false;
        var validBankNameForm = false;
        var validMailingAddress1Form = false;
        var validBankAcNumberForm = false;
        var validUserNameForm = false;
        var validUserMailingAddressForm = false;
        var validDate1Form = false;
        var validRoutingnumberForm = false;
        var validAccountnumberForm = false;
        var validAUBankCodeForm = false;
        var validAUAccountnumberForm = false;
        var validCAAccountnumberForm = false;
        var validCABICForm = false;
        var validCADirectPaymentForm = false;
        var validBICCodeForm = false;
        var validMXBICForm = false;
        var validZAAccountnumberForm = false;
        var validZABankCodeForm = false;
        var validSignature1Form = false;
        var validMXClabenumberForm = false;
        var validBankCodeForm = false;
        var validSpouseNameForm = false;
        var validSnationalnumberForm = false;
        var validSpouseDateForm = false;
        var validCountryReasonForm = false;
        var validSpouseNationality1Form = false;

        if (this.state.LanguageCState != "") {
            this.setState({ isValidLanguageC: false });
            validLanguageCForm = true;
        }
        else {
            this.setState({ isValidLanguageC: true });
            validLanguageCForm = false;
        }
        if (this.state.NationalNumberState != "") {
            this.setState({ isValidNationalNumber: false });
            if (this.state.NationalNumberState.length > 0 && this.state.NationalNumberState.length > 2) {
                this.setState({ isValidFormatNationalNumber: false });
                validNationalNumberForm = true;
            }
            else {
                this.setState({ isValidFormatNationalNumber: true });
                this.setState({ isValidNationalNumber: false });
            }
        }
        else {
            this.setState({ isValidNationalNumber: true });
            this.setState({ isValidFormatNationalNumber: false });
            validNationalNumberForm = false;
        }
        if (this.state.LastnameState != "") {
            this.setState({ isValidLastname: false });
            if (this.state.LastnameState.length > 0 && this.state.LastnameState.length > 2) {
                this.setState({ isValidFormatLastname: false });
                validLastnameForm = true;
            }
            else {
                this.setState({ isValidFormatLastname: true });
                this.setState({ isValidLastname: false });
            }
        }
        else {
            this.setState({ isValidLastname: true });
            this.setState({ isValidFormatLastname: false });
            validLastnameForm = false;
        }
        if (this.state.FirstNameState != "") {
            this.setState({ isValidFirstName: false });
            if (this.state.FirstNameState.length > 0 && this.state.FirstNameState.length > 2) {
                this.setState({ isValidFormatFirstName: false });
                validFirstNameForm = true;
            }
            else {
                this.setState({ isValidFormatFirstName: true });
                this.setState({ isValidFirstName: false });
            }
        }
        else {
            this.setState({ isValidFirstName: true });
            this.setState({ isValidFormatFirstName: false });
            validFirstNameForm = false;
        }
        // if (this.state.AddressState.length > 0) {
        //     this.setState({ isValidAddress: false });
        //     if (this.state.AddressState.length > 0 && this.state.AddressState.length > 2) {
        //         this.setState({ isValidFormatAddress: false });
        //         validAddressForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatAddress: true });
        //         this.setState({ isValidAddress: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidAddress: true });
        //     this.setState({ isValidFormatAddress: false });
        //     validAddressForm = false;
        // }
        if (this.state.AddressState != "") {
            this.setState({ isValidAddress: false });
            validAddressForm = true;
        }
        else {
            this.setState({ isValidAddress: true });
            validAddressForm = false;
        }

        if (this.signaturePad.isEmpty()) {
            this.setState({ isValidSignature: true });
            validSignatureForm = false;
        }
        else {
            this.setState({ isValidSignature: false });
            validSignatureForm = true;
        }
        if (this.signaturePad1.isEmpty()) {
            this.setState({ isValidSignature1: true });
            validSignature1Form = false;
        }
        else {
            this.setState({ isValidSignature1: false });
            validSignature1Form = true;
        }
        if (this.state.PhonenumberState.length > 0) {
            this.setState({ isValidPhonenumber: false });
            if (this.state.PhonenumberState.length > 0 && this.state.PhonenumberState.length > 2) {
                this.setState({ isValidFormatPhonenumber: false });
                validPhonenumberForm = true;
            }
            else {
                this.setState({ isValidFormatPhonenumber: true });
                this.setState({ isValidPhonenumber: false });
            }
        }
        else {
            this.setState({ isValidPhonenumber: true });
            this.setState({ isValidFormatPhonenumber: false });
            validPhonenumberForm = false;
        }
        // if (this.state.NorwayacnumberState.length > 0) {
        //     this.setState({ isValidNorwayacnumber: false });
        //     if (this.state.NorwayacnumberState.length > 0 && this.state.NorwayacnumberState.length > 2) {
        //         this.setState({ isValidFormatNorwayacnumber: false });
        //         validNorwayacnumberForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatNorwayacnumber: true });
        //         this.setState({ isValidNorwayacnumber: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidNorwayacnumber: true });
        //     this.setState({ isValidFormatNorwayacnumber: false });
        //     validNorwayacnumberForm = false;
        // }
        if (this.state.UDINumberState.length > 0) {
            this.setState({ isValidUDINumber: false });
            if (this.state.UDINumberState.length > 0 && this.state.UDINumberState.length > 2) {
                this.setState({ isValidFormatUDINumber: false });
                validUDINumberForm = true;
            }
            else {
                this.setState({ isValidFormatUDINumber: true });
                this.setState({ isValidUDINumber: false });
            }
        }
        else {
            this.setState({ isValidUDINumber: true });
            this.setState({ isValidFormatUDINumber: false });
            validUDINumberForm = false;
        }
        if (this.state.NationalityState != "") {
            this.setState({ isValidNationality: false });
            validNationalityForm = true;
        }
        else {
            this.setState({ isValidNationality: true });
            validNationalityForm = false;
        }
        if (this.state.NationalityState == "Other") {
            if (this.state.younationalityState.length > 0) {
                this.setState({ isValidyounationality: false });
                validyounationalityForm = true;
            }
            else {
                this.setState({ isValidyounationality: true });
                validyounationalityForm = false;
            }
        } else {
            this.setState({ isValidyounationality: false });
            validyounationalityForm = true;
        }
        if (this.state.BeginDateState != "") {
            this.setState({ isValidBeginDate: false });
            validBeginDateForm = true;
        }
        else {
            this.setState({ isValidBeginDate: true });
            validBeginDateForm = false;
        }
        if (this.state.RetirementpensionLevelState.length > 0) {
            this.setState({ isValidRetirementpensionLevel: false });
            validRetirementpensionLevelForm = true;
        }
        else {
            this.setState({ isValidRetirementpensionLevel: true });
            validRetirementpensionLevelForm = false;
        }
        if (this.state.CivilStatusState != "") {
            this.setState({ isValidCivilStatus: false });
            validCivilStatusForm = true;
        }
        else {
            this.setState({ isValidCivilStatus: true });
            validCivilStatusForm = false;
        }
        if (this.state.PartnerlivingpartState.length > 0) {
            this.setState({ isValidPartnerlivingpart: false });
            validPartnerlivingpartForm = true;
        }
        else {
            this.setState({ isValidPartnerlivingpart: true });
            validPartnerlivingpartForm = false;
        }
        if (this.state.contractualpensionState != "") {
            this.setState({ isValidcontractualpension: false });
            validcontractualpensionForm = true;
        }
        else {
            this.setState({ isValidcontractualpension: true });
            validcontractualpensionForm = false;
        }
        if (this.state.OutsideNorwayState != "") {
            this.setState({ isValidOutsideNorway: false });
            validOutsideNorwayForm = true;
        }
        else {
            this.setState({ isValidOutsideNorway: true });
            validOutsideNorwayForm = false;
        }
        if (this.state.livedorworkNorwayState != "") {
            this.setState({ isValidlivedorworkNorway: false });
            validlivedorworkNorwayForm = true;
        }
        else {
            this.setState({ isValidlivedorworkNorway: true });
            validlivedorworkNorwayForm = false;
        }
        if (this.state.SpouseState != "") {
            this.setState({ isValidSpouse: false });
            validSpouseForm = true;
        }
        else {
            this.setState({ isValidSpouse: true });
            validSpouseForm = false;
        }
        if (this.state.SpouseState == "M" || this.state.SpouseState == "C") {
            if (this.state.Snationalnumber1State != "") {
                this.setState({ isValidSnationalnumber1: false });
                validSnationalnumber1Form = true;
            }
            else {
                this.setState({ isValidSnationalnumber1: true });
                validSnationalnumber1Form = false;
            }
            if (this.state.SNameState.length > 0) {
                this.setState({ isValidSName: false });
                validSNameForm = true;
            }
            else {
                this.setState({ isValidSName: true });
                validSNameForm = false;
            }
            if (this.state.PartnerchildState.length > 0) {
                this.setState({ isValidPartnerchild: false });
                validPartnerchildForm = true;
            }
            else {
                this.setState({ isValidPartnerchild: true });
                validPartnerchildForm = false;
            }
            if (this.state.PartnermarriedState.length > 0) {
                this.setState({ isValidPartnermarried: false });
                validPartnermarriedForm = true;
            }
            else {
                this.setState({ isValidPartnermarried: true });
                validPartnermarriedForm = false;
            }
            if (this.state.CohabitatingpartnerState != "") {
                this.setState({ isValidCohabitatingpartner: false });
                validCohabitatingpartnerForm = true;
            }
            else {
                this.setState({ isValidCohabitatingpartner: true });
                validCohabitatingpartnerForm = false;
            }
            if (this.state.CountryStayReason != "") {
                this.setState({ isValidCountryStayReason: false });
                validCountryStayReasonForm = true;
            }
            else {
                this.setState({ isValidCountryStayReason: true });
                validCountryStayReasonForm = false;
            }
            if (this.state.CountryStayReason == "Other") {
                if (this.state.SpouseNationalityState.length > 0) {
                    this.setState({ isValidSpouseNationality: false });
                    validSpouseNationalityForm = true;
                }
                else {
                    this.setState({ isValidSpouseNationality: true });
                    validSpouseNationalityForm = false;
                }
            }
            else {
                this.setState({ isValidSpouseNationality: false });
                validSpouseNationalityForm = true;
            }
        }
        else {
            this.setState({ isValidSnationalnumber1: false });
            this.setState({ isValidSName: false });
            this.setState({ isValidPartnerchild: false });
            this.setState({ isValidPartnermarried: false });
            this.setState({ isValidCohabitatingpartner: false });
            this.setState({ isValidCountryStayReason: false });
            this.setState({ isValidSpouseNationality: false });
            validSpouseNationalityForm = true;
            validSnationalnumber1Form = true;
            validSNameForm = true;
            validPartnerchildForm = true;
            validPartnermarriedForm = true;
            validCohabitatingpartnerForm = true;
            validCountryStayReasonForm = true;

        }
        // if (this.state.benefitpensionage == "Yes") {
        //     if (this.state.benefitname.length > 0) {
        //         this.setState({ isValidbenefitname: false });
        //         validbenefitnameForm = true;
        //     } else {
        //         this.setState({ isValidbenefitname: true });
        //         validbenefitnameForm = false;
        //     }
        //     if (this.state.receivebenefit.length > 0) {
        //         this.setState({ isValidreceivebenefit: false });
        //         validReceivebenefitForm = true;
        //     } else {
        //         this.setState({ isValidreceivebenefit: true });
        //         validReceivebenefitForm = false;
        //     }
        //     if (this.state.benefitrefno.length > 0) {
        //         this.setState({ isValidbenefitrefno: false });
        //         validBenefitRefnoForm = true;
        //     }
        //     else {
        //         this.setState({ isValidbenefitrefno: true });
        //         validBenefitRefnoForm = false;
        //     }
        // }
        // else {
        //     this.setState({ isValidbenefitname: false });
        //     this.setState({ isValidreceivebenefit: false });
        //     this.setState({ isValidbenefitrefno: false });
        //     validbenefitnameForm = true;
        //     validReceivebenefitForm = true;
        //     validBenefitRefnoForm = true;
        // }
        // if (this.state.WNationalitynumberState.length > 0) {
        //     this.setState({ isValidWNationalitynumber: false });
        //     validWNationalitynumberForm = true;
        // }
        // else {
        //     this.setState({ isValidWNationalitynumber: true });
        //     validWNationalitynumberForm = false;
        // }
        if (this.state.WNationalitynumberState == "Widower") {
            if (this.state.DeceasednationalnumberState.length > 0) {
                this.setState({ isValidDeceasednationalnumber: false });
                validDeceasednationalnumberForm = true;
            } else {
                this.setState({ isValidDeceasednationalnumber: true });
                validDeceasednationalnumberForm = false;
            }
        }
        else {
            this.setState({ isValidDeceasednationalnumber: false });
            validDeceasednationalnumberForm = true;
        }
        // if (this.state.NamedeceasedState.length > 0) {
        //     this.setState({ isValidNamedeceased: false });
        //     validNamedeceasedForm = true;
        // } else {
        //     this.setState({ isValidNamedeceased: true });
        //     validNamedeceasedForm = false;
        // }
        // if (this.state.DateofdiedState != "") {
        //     this.setState({ isValidDateofdied: false });
        //     validDateofdiedForm = true;
        // }
        // else {
        //     this.setState({ isValidDateofdied: true });
        //     validDateofdiedForm = false;
        // }
        // if (this.state.CountryStay != "") {
        //     this.setState({ isValidCountryStay: false });
        //     validCountryStayForm = true;
        // }
        // else {
        //     this.setState({ isValidCountryStay: true });
        //     validCountryStayForm = false;
        // }
        if (this.state.CountryStay == "Other") {
            if (this.state.SNationalityState.length > 0) {
                this.setState({ isValidSNationality: false });
                validSNationalityForm = true;
            } else {
                this.setState({ isValidSNationality: true });
                validSNationalityForm = false;
            }
        }
        else {
            this.setState({ isValidSNationality: false });
            validSNationalityForm = true;
        }
        if (this.state.PrivatepensionState != "") {
            this.setState({ isValidPrivatepension: false });
            validPrivatepensionForm = true;
        }
        else {
            this.setState({ isValidPrivatepension: true });
            validPrivatepensionForm = false;
        }
        if (this.state.AFPState.length > 0) {
            this.setState({ isValidAFP: false });
            validAFPForm = true;
        } else {
            this.setState({ isValidAFP: true });
            validAFPForm = false;
        }
        if (this.state.MailingAddressState != "") {
            this.setState({ isValidMailingAddress: false });
            validMailingAddressForm = true;
        }
        else {
            this.setState({ isValidMailingAddress: true });
            validMailingAddressForm = false;
        }
        if (this.state.DateState != "") {
            this.setState({ isValidDate: false });
            validDateForm = true;
        }
        else {
            this.setState({ isValidDate: true });
            validDateForm = false;
        }
        if (this.state.GoogleAdrsCountry == "NO") {
            if (this.state.ResBeginDateState != "") {
                this.setState({ isValidResBeginDate: false });
                validResBeginDateForm = true;
            }
            else {
                this.setState({ isValidResBeginDate: true });
                validResBeginDateForm = false;
            }
            if (this.state.ResEndDateState != "") {
                this.setState({ isValidResEndDate: false });
                validResEndDateForm = true;
            }
            else {
                this.setState({ isValidResEndDate: true });
                validResEndDateForm = false;
            }
            if (this.state.ResCountryState != "") {
                this.setState({ isValidResCountry: false });
                validResCountryForm = true;
            }
            else {
                this.setState({ isValidResCountry: true });
                validResCountryForm = false;
            }
            if (this.state.ForeignState.length > 0) {
                this.setState({ isValidForeign: false });
                validForeignForm = true;
            } else {
                this.setState({ isValidForeign: true });
                validForeignForm = false;
            }
            if (this.state.LiveState.length > 0) {
                this.setState({ isValidLive: false });
                validLiveForm = true;
            } else {
                this.setState({ isValidLive: true });
                validLiveForm = false;
            }
            if (this.state.workedState.length > 0) {
                this.setState({ isValidworked: false });
                validworkedForm = true;
            } else {
                this.setState({ isValidworked: true });
                validworkedForm = false;
            }

        }
        else {
            this.setState({ isValidResBeginDate: false });
            this.setState({ isValidResEndDate: false });
            this.setState({ isValidResCountry: false });
            this.setState({ isValidForeign: false });
            this.setState({ isValidLive: false });
            this.setState({ isValidworked: false });

            validResBeginDateForm = true;
            validResEndDateForm = true;
            validResCountryForm = true;
            validForeignForm = true;
            validLiveForm = true;
            validworkedForm = true;
        }
        if (this.state.PensionState != "") {
            this.setState({ isValidPension: false });
            validPensionForm = true;
        }
        else {
            this.setState({ isValidPension: true });
            validPensionForm = false;
        }
        if (this.state.PensionotherCountriesState != "") {
            this.setState({ isValidPensionotherCountries: false });
            validPensionotherCountriesForm = true;
        }
        else {
            this.setState({ isValidPensionotherCountries: true });
            validPensionotherCountriesForm = false;
        }
        // if (this.state.CountryState != "") {
        //     this.setState({ isValidCountry: false });
        //     validCountryForm = true;
        // }
        // else {
        //     this.setState({ isValidCountry: true });
        //     validCountryForm = false;
        // }
        // if (this.state.SecurityState.length > 0) {
        //     this.setState({ isValidSecurity: false });
        //     validSecurityForm = true;
        // } else {
        //     this.setState({ isValidSecurity: true });
        //     validSecurityForm = false;
        // }
        // if (this.state.AmountState.length > 0) {
        //     this.setState({ isValidAmount: false });
        //     validAmountForm = true;
        // } else {
        //     this.setState({ isValidAmount: true });
        //     validAmountForm = false;
        // }
        // if (this.state.CurrencyState.length > 0) {
        //     this.setState({ isValidCurrency: false });
        //     validCurrencyForm = true;
        // } else {
        //     this.setState({ isValidCurrency: true });
        //     validCurrencyForm = false;
        // }
        if (this.state.MailingAddress != "NO") {
            if (this.state.StayNorwayState != "") {
                this.setState({ isValidStayNorway: false });
                validStayNorwayForm = true;
            }
            else {
                this.setState({ isValidStayNorway: true });
                validStayNorwayForm = false;
            }
            if (this.state.DateFromState != "") {
                this.setState({ isValidDateFrom: false });
                validDateFromForm = true;
            }
            else {
                this.setState({ isValidDateFrom: true });
                validDateFromForm = false;
            }
            if (this.state.DateToState != "") {
                this.setState({ isValidDateTo: false });
                validDateToForm = true;
            }
            else {
                this.setState({ isValidDateTo: true });
                validDateToForm = false;
            }
            if (this.state.EmployerState.length > 0) {
                this.setState({ isValidEmployer: false });
                validEmployerForm = true;
            } else {
                this.setState({ isValidEmployer: true });
                validEmployerForm = false;
            }
            if (this.state.NAddressState.length > 0) {
                this.setState({ isValidNAddress: false });
                validNAddressForm = true;
            } else {
                this.setState({ isValidNAddress: true });
                validNAddressForm = false;
            }
            if (this.state.LivedState != "") {
                this.setState({ isValidLived: false });
                validLivedForm = true;
            }
            else {
                this.setState({ isValidLived: true });
                validLivedForm = false;
            }
            if (this.state.Worked1State.length > 0) {
                this.setState({ isValidWorked1: false });
                validWorked1Form = true;
            } else {
                this.setState({ isValidWorked1: true });
                validWorked1Form = false;
            }
        }
        else {
            this.setState({ isValidStayNorway: false });
            this.setState({ isValidDateFrom: false });
            this.setState({ isValidDateTo: false });
            this.setState({ isValidEmployer: false });
            this.setState({ isValidNAddress: false });
            this.setState({ isValidLived: false });
            this.setState({ isValidWorked1: false });

            validStayNorwayForm = true;
            validDateFromForm = true;
            validDateToForm = true;
            validEmployerForm = true;
            validNAddressForm = true;
            validLivedForm = true;
            validWorked1Form = true;
        }
        if (this.state.PaymentState != "") {
            this.setState({ isValidPayment: false });
            validPaymentForm = true;
        }
        else {
            this.setState({ isValidPayment: true });
            validPaymentForm = false;
        }
        if (this.state.MCPartnerState.length > 0) {
            this.setState({ isValidMCPartner: false });
            validMCPartnerForm = true;
        } else {
            this.setState({ isValidMCPartner: true });
            validMCPartnerForm = false;
        }
        if (this.state.NorwegianIDnumberState != "") {
            this.setState({ isValidNorwegianIDnumber: false });
            if (this.state.NorwegianIDnumberState.length > 0 && this.state.NorwegianIDnumberState.length > 2) {
                this.setState({ isValidFormatNorwegianIDnumber: false });
                validNorwegianIDnumberForm = true;
            }
            else {
                this.setState({ isValidFormatNorwegianIDnumber: true });
                this.setState({ isValidNorwegianIDnumber: false });
            }
        }
        else {
            this.setState({ isValidNorwegianIDnumber: true });
            this.setState({ isValidFormatNorwegianIDnumber: false });
            validNorwegianIDnumberForm = false;
        }
        if (this.state.BankNameState != "") {
            this.setState({ isValidBankName: false });
            if (this.state.BankNameState.length > 0 && this.state.BankNameState.length > 2) {
                this.setState({ isValidFormatBankName: false });
                validBankNameForm = true;
            }
            else {
                this.setState({ isValidFormatBankName: true });
                this.setState({ isValidBankName: false });
            }
        }
        else {
            this.setState({ isValidBankName: true });
            this.setState({ isValidFormatBankName: false });
            validBankNameForm = false;
        }
        if (this.state.MailingAddress1State != "") {
            this.setState({ isValidMailingAddress1: false });
            validMailingAddress1Form = true;
        }
        else {
            this.setState({ isValidMailingAddress1: true });
            validMailingAddress1Form = false;
        }

        if (this.state.BankAcNumberState.length > 0) {
            this.setState({ isValidBankAcNumber: false });
            validBankAcNumberForm = true;
        } else {
            this.setState({ isValidBankAcNumber: true });
            validBankAcNumberForm = false;
        }
        if (this.state.BICCodeState.length > 0) {
            this.setState({ isValidBICCode: false });
            validBICCodeForm = true;
        } else {
            this.setState({ isValidBICCode: true });
            validBICCodeForm = false;
        }
        if (this.state.UserNameState.length > 0) {
            this.setState({ isValidUserName: false });
            validUserNameForm = true;
        } else {
            this.setState({ isValidUserName: true });
            validUserNameForm = false;
        }
        if (this.state.UserMailingAddressState != "") {
            this.setState({ isValidUserMailingAddress: false });
            validUserMailingAddressForm = true;
        }
        else {
            this.setState({ isValidUserMailingAddress: true });
            validUserMailingAddressForm = false;
        }
        if (this.state.BankCodeState.length > 0) {
            this.setState({ isValidBankCode: false });
            validBankCodeForm = true;
        } else {
            this.setState({ isValidBankCode: true });
            validBankCodeForm = false;
        }
        if (this.state.Date1State != "") {
            this.setState({ isValidDate1: false });
            validDate1Form = true;
        }
        else {
            this.setState({ isValidDate1: true });
            validDate1Form = false;
        }
        if (this.state.EligibleCountryState == "US") {
            if (this.state.RoutingnumberState.length > 0) {
                this.setState({ isValidRoutingnumber: false });
                validRoutingnumberForm = true;
            } else {
                this.setState({ isValidRoutingnumber: true });
                validRoutingnumberForm = false;
            }
            if (this.state.AccountnumberState.length > 0) {
                this.setState({ isValidAccountnumber: false });
                validAccountnumberForm = true;
            } else {
                this.setState({ isValidAccountnumber: true });
                validAccountnumberForm = false;
            }
        }
        else {
            this.setState({ isValidRoutingnumber: false });
            this.setState({ isValidAccountnumber: false });
            validRoutingnumberForm = true;
            validAccountnumberForm = true;
        }
        if (this.state.EligibleCountryState == "AU") {
            if (this.state.AUBankCodeState.length > 0) {
                this.setState({ isValidAUBankCode: false });
                validAUBankCodeForm = true;
            } else {
                this.setState({ isValidAUBankCode: true });
                validAUBankCodeForm = false;
            }
            if (this.state.AUAccountnumberState.length > 0) {
                this.setState({ isValidAUAccountnumber: false });
                validAUAccountnumberForm = true;
            } else {
                this.setState({ isValidAUAccountnumber: true });
                validAUAccountnumberForm = false;
            }
        }
        else {
            this.setState({ isValidAUBankCode: false });
            this.setState({ isValidAUAccountnumber: false });
            validAUBankCodeForm = true;
            validAUAccountnumberForm = true;
        }
        if (this.state.EligibleCountryState == "AU") {
            if (this.state.CADirectPaymentState.length > 0) {
                this.setState({ isValidCADirectPayment: false });
                validCADirectPaymentForm = true;
            } else {
                this.setState({ isValidCADirectPayment: true });
                validCADirectPaymentForm = false;
            }
            if (this.state.CAAccountnumberState.length > 0) {
                this.setState({ isValidCAAccountnumber: false });
                validCAAccountnumberForm = true;
            } else {
                this.setState({ isValidCAAccountnumber: true });
                validCAAccountnumberForm = false;
            }
            if (this.state.CABICState.length > 0) {
                this.setState({ isValidCABIC: false });
                validCABICForm = true;
            } else {
                this.setState({ isValidCABIC: true });
                validCABICForm = false;
            }
        }
        else {
            this.setState({ isValidCADirectPayment: false });
            this.setState({ isValidCAAccountnumber: false });
            this.setState({ isValidCABIC: false });
            validCADirectPaymentForm = true;
            validCAAccountnumberForm = true;
            validCABICForm = true;
        }
        if (this.state.EligibleCountryState == "MX") {
            if (this.state.MXClabenumberState.length > 0) {
                this.setState({ isValidMXClabenumber: false });
                validMXClabenumberForm = true;
            } else {
                this.setState({ isValidMXClabenumber: true });
                validMXClabenumberForm = false;
            }
            if (this.state.MXBICState.length > 0) {
                this.setState({ isValidMXBIC: false });
                validMXBICForm = true;
            } else {
                this.setState({ isValidMXBIC: true });
                validMXBICForm = false;
            }
        }
        else {
            this.setState({ isValidMXClabenumber: false });
            this.setState({ isValidMXBIC: false });
            validMXClabenumberForm = true;
            validMXBICForm = true;
        }
        if (this.state.EligibleCountryState == "ZA") {
            if (this.state.ZABankCodeState.length > 0) {
                this.setState({ isValidZABankCode: false });
                validZABankCodeForm = true;
            } else {
                this.setState({ isValidZABankCode: true });
                validZABankCodeForm = false;
            }
            if (this.state.ZAAccountnumberState.length > 0) {
                this.setState({ isValidZAAccountnumber: false });
                validZAAccountnumberForm = true;
            } else {
                this.setState({ isValidZAAccountnumber: true });
                validZAAccountnumberForm = false;
            }
        }
        else {
            this.setState({ isValidZABankCode: false });
            this.setState({ isValidZAAccountnumber: false });
            validZAAccountnumberForm = true;
            validZABankCodeForm = true;
        }
        if (this.state.SpouseNameState.length > 0) {
            this.setState({ isValidSpouseName: false });
            validSpouseNameForm = true;
        } else {
            this.setState({ isValidSpouseName: true });
            validSpouseNameForm = false;
        }
        if (this.state.SnationalnumberState.length > 0) {
            this.setState({ isValidSnationalnumber: false });
            validSnationalnumberForm = true;
        } else {
            this.setState({ isValidSnationalnumber: true });
            validSnationalnumberForm = false;
        }
        if (this.state.SpouseDateState != "") {
            this.setState({ isValidSpouseDate: false });
            validSpouseDateForm = true;
        }
        else {
            this.setState({ isValidSpouseDate: true });
            validSpouseDateForm = false;
        }
        if (this.state.CountryReasonState != "") {
            this.setState({ isValidCountryReason: false });
            validCountryReasonForm = true;
        }
        else {
            this.setState({ isValidCountryReason: true });
            validCountryReasonForm = false;
        }
        if (this.state.CountryReasonState == "Other") {
            if (this.state.SpouseNationality1State.length > 0) {
                this.setState({ isValidSpouseNationality1: false });
                validSpouseNationality1Form = true;
            } else {
                this.setState({ isValidSpouseNationality1: true });
                validSpouseNationality1Form = false;
            }
        }
        else {
            this.setState({ isValidSpouseNationality1: false });
            validSpouseNationality1Form = true;

        }



        if (validZAAccountnumberForm && validNationalNumberForm && validLastnameForm && validFirstNameForm && validAddressForm && validSignatureForm && validPhonenumberForm
            && validUDINumberForm && validNationalityForm && validBeginDateForm && validRetirementpensionLevelForm && validCivilStatusForm
            && validPartnerlivingpartForm && validcontractualpensionForm && validOutsideNorwayForm && validlivedorworkNorwayForm && validSpouseForm
            && validSnationalnumberForm && validSNameForm && validPartnerchildForm && validPartnermarriedForm && validCohabitatingpartnerForm
            && validCountryStayReasonForm && validSpouseNationalityForm && validDeceasednationalnumberForm
            //&& validNamedeceasedForm && validWNationalitynumberForm&& validNorwayacnumberForm  && validCountryForm   && validSecurityForm && validAmountForm && validCurrencyForm  
            //&& validDateofdiedForm && validCountryStayForm 
            && validSNationalityForm && validPrivatepensionForm
            && validAFPForm && validMailingAddressForm && validDateForm && validResBeginDateForm && validResEndDateForm && validResCountryForm
            && validForeignForm && validLiveForm && validworkedForm && validPensionForm && validPensionotherCountriesForm && validStayNorwayForm && validSnationalnumber1Form && validDateFromForm
            && validDateToForm && validEmployerForm && validNAddressForm && validLivedForm && validWorked1Form && validPaymentForm && validMCPartnerForm
            && validNorwegianIDnumberForm && validBankNameForm && validMailingAddress1Form && validBankAcNumberForm && validyounationalityForm
            && validUserNameForm && validBICCodeForm && validDate1Form && validRoutingnumberForm && validAccountnumberForm && validAUBankCodeForm
            && validAUAccountnumberForm && validCAAccountnumberForm && validCABICForm && validCADirectPaymentForm && validBankCodeForm && validSpouseNameForm
            && validUserMailingAddressForm && validMXBICForm && validSpouseNationality1Form && validMXClabenumberForm
            && validSnationalnumberForm && validSpouseDateForm && validCountryReasonForm && validSignature1Form) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }


    //Save Function
    handleBenQusDatas(event) {
        var thisObj = this;
        let BenQusAPIUrl = "https://4k73oeispk.execute-api.us-west-2.amazonaws.com/dev/GPA_BenQusDatas_Lambda";
        let BenQusQuebecJSONData = JSON.stringify({
            QueryName: "Save",
            UserID: emailresult,
            CountryCode: this.state.CountryCode,
            AppAnsInJsonObj: {
                GoogleAdrsCountry: this.state.GoogleAdrsCountry,
                LanguageC: this.state.LanguageCState,
                NationalNumber: this.state.NationalNumberState,
                Lastname: this.state.LastnameState,
                FirstName: this.state.FirstNameState,
                Phonenumber: this.state.PhonenumberState,
                Address: this.state.AddressState,
                Norwayacnumber: this.state.NorwayacnumberState,
                UDINumber: this.state.UDINumberState,
                Nationality: this.state.NationalityState,
                younationality: this.state.younationalityState,
                BeginDate: this.state.BeginDateState,
                RetirementpensionLevel: this.state.RetirementpensionLevelState,
                CivilStatus: this.state.CivilStatusState,
                Partnerlivingpart: this.state.PartnerlivingpartState,
                contractualpension: this.state.contractualpensionState,
                USdollar: this.state.USdollarState,
                NorwegianKrone: this.state.NorwegianKroneState,
                OutsideNorway: this.state.OutsideNorwayState,
                livedorworkNorway: this.state.livedorworkNorwayState,
                Spouse: this.state.SpouseState,
                Snationalnumber: this.state.SnationalnumberState,
                SName: this.state.SNameState,
                Partnerchild: this.state.PartnerchildState,
                Partnermarried: this.state.PartnermarriedState,
                Cohabitatingpartner: this.state.CohabitatingpartnerState,
                CountryStayReason: this.state.CountryStayReason,
                SpouseNationality: this.state.SpouseNationalityState,
                WNationalitynumber: this.state.WNationalitynumberState,
                Deceasednationalnumber: this.state.DeceasednationalnumberState,
                AFP: this.state.AFPState,
                Namedeceased: this.state.NamedeceasedState,
                Dateofdied: this.state.DateofdiedState,
                CountryStay: this.state.CountryStay,
                SNationality: this.state.SNationalityState,
                Privatepension: this.state.PrivatepensionState,
                MailingAddress: this.state.MailingAddressState,
                Date: this.state.DateState,
                ResBeginDate: this.state.ResBeginDateState,
                ResEndDate: this.state.ResEndDateState,
                Country: this.state.CountryState,
                ResCountry: this.state.ResCountryState,
                Foreign: this.state.ForeignState,
                Live: this.state.LiveState,
                // searchText:this.state.searchText,
                // CompanyFlag: "CompanySave",
                // viewList: false,
                worked: this.state.workedState,
                Pension: this.state.PensionState,
                PensionotherCountries: this.state.PensionotherCountriesState,
                Security: this.state.SecurityState,
                Amount: this.state.AmountState,
                Currency: this.state.CurrencyState,
                StayNorway: this.state.StayNorwayState,
                DateFrom: this.state.DateFromState,
                DateTo: this.state.DateToState,
                Employer: this.state.EmployerState,
                NAddress: this.state.NAddressState,
                Lived: this.state.LivedState,
                Worked1: this.state.Worked1State,
                Payment: this.state.PaymentState,
                MCPartner: this.state.MCPartnerState,
                NorwegianIDnumber: this.state.NorwegianIDnumberState,
                BankName: this.state.BankNameState,
                Date1: this.state.Date1State,
                Routingnumber: this.state.RoutingnumberState,
                Accountnumber: this.state.AccountnumberState,
                AUBankCode: this.state.AUBankCodeState,
                AUAccountnumber: this.state.AUAccountnumberState,
                CADirectPayment: this.state.CADirectPaymentState,
                CAAccountnumber: this.state.CAAccountnumberState,
                CABIC: this.state.CABICState,
                MXBIC: this.state.MXBICState,
                MXClabenumber: this.state.MXClabenumberState,
                ZAAccountnumber: this.state.ZAAccountnumberState,
                ZABankCodeState: this.state.ZABankCode,
                MailingAddress1: this.state.MailingAddress1State,
                BankAcNumber: this.state.BankAcNumberState,
                BICCode: this.state.BICCodeState,
                UserName: this.state.UserNameState,
                UserMailingAddress: this.state.UserMailingAddressState,
                BankCode: this.state.BankCodeState,
                SpouseName: this.state.SpouseNameState,
                SpouseDate: this.state.SpouseDateState,
                CountryReason: this.state.CountryReasonState,
                SpouseNationality1: this.state.SpouseNationality1State,
                EligibleCountry: this.state.EligibleCountry,
            },
            CountryCode: "NO",
        });
        let AxiosHeaderConfig = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
        };
        var isValid = true;// this.handleValidateForm(this);
        if (isValid) {
            axios({
                method: "POST",
                url: BenQusAPIUrl,
                data: BenQusQuebecJSONData,
                //headers:AxiosHeaderConfig,

            }).then((data) => {
                notify.show("Your Information Saved Successfully", "success", 3000);
                thisObj.handleSavePensionData(this);
                //thisObj.handleAppProcessFlowUpdate(this);
                // thisObj.handleSendBilateralForms(this);
                // this.props.MailSends();
            }).catch((err) => {
            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }






    //Auto-Populated Function
    handleBenQusNorwayAuto(event) {

        var thisObj = this;
        let UserID;
        // let BenQusAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let BenQusAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusAutoJSONData = JSON.stringify({
            QueryName: "BenQusGeneralAuto",
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
            url: BenQusAutoAPIUrl,
            data: BenQusAutoJSONData,
            //headers:AxiosHeaderConfig,

        }).then(({ data }) => {
            //console.log("Result" + JSON.stringify(data));
            //console.log("Length", data.length);
            for (var i = 0; i < 1; i++) {
                thisObj.setState({ EligibleCountryState: data[i].EligibleCountry });
                thisObj.setState({ GoogleAdrsCountry: data[i].GoogleAdrsCountry });
                thisObj.setState({ PCountryOfCitizenship: data[i].PCountryOfCitizenship });
                thisObj.setState({ PensionotherCountriesState: data[i].Partner });
                thisObj.setState({ MailingAddress: data[i].MailingAddress });
                console.log(this.state.GoogleAdrsCountry);
                if (data[i].EligibleCountryState == "NO") {
                    thisObj.setState({ NationalityState: "Norway" });
                }
                else if (data[i].EligibleCountryState != "NO") {
                    thisObj.setState({ NationalityState: "Other" });

                }

                if (data[i].GoogleAdrsCountry != "NO") {
                    //alert("NOYes",this.state.OutsideNorwayState);
                    thisObj.setState({ livedorworkNorwayState: "Yes" });
                }
                else if (data[i].GoogleAdrsCountry == "NO") {
                    // alert("NOYe",this.state.OutsideNorwayState);
                    thisObj.setState({ livedorworkNorwayState: "No" });
                }
                if (data[i].PCountryOfCitizenship == "NO") {
                    thisObj.setState({ CountryStayReason: "Norway" });
                }
                else if (data[i].PCountryOfCitizenship != "NO") {
                    thisObj.setState({ CountryStayReason: "Other" });
                }
                if (data[i].MaritalStatus != "W") {
                    thisObj.setState({ CountryStay: "Norway" });
                }
                else if (data[i].MaritalStatus == "W") {
                    thisObj.setState({ CountryStay: "Other" });
                }
                if (data[i].Partner == "Y") {

                }
                
                thisObj.setState({ LastnameState: data[i].LastName });
                thisObj.setState({ FirstNameState: data[i].FirstName });
                thisObj.setState({ AddressState: data[i].MailingAddress });
                thisObj.setState({ PhonenumberState: data[i].PhoneNum });
                thisObj.setState({ NationalityState: data[i].CountryOfCitizenship });
                thisObj.setState({ CivilStatusState: data[i].MaritalStatus });
                thisObj.setState({ SpouseState: data[i].MaritalStatus });
                var Name = data[i].PFirstName + '' + data[i].PMiddleName + '' + data[i].PLastName;
                thisObj.setState({ SNameState: Name });
                thisObj.setState({ SpouseNationalityState: data[i].PCountryOfCitizenship });
                thisObj.setState({ SNationalityState: data[i].PCountryOfCitizenship });
                thisObj.setState({ CountryReasonState: data[i].PCountryOfCitizenship });
                thisObj.setState({ MailingAddressState: data[i].MailingAddress });
                
                thisObj.setState({ LiveState: data[i].MailingAddress });
                
                thisObj.setState({ SecurityState: data[i].SSSecurity });
                thisObj.setState({ StayNorwayState: data[i].MailingAddress });
                
                thisObj.setState({ PaymentState: data[i].EligibleCountry });
                var SName = data[i].PFirstName + '' + data[i].PMiddleName + '' + data[i].PLastName;
                thisObj.setState({ SpouseNameState: SName });
                var SpouseDOB = data[i].PDOB_Day + "/" + data[i].PDOB_Month + "/" + data[i].PDOB_Year;
                var DtDOB1 = new Date(SpouseDOB);
                thisObj.setState({ SpouseDateState: DtDOB1 });

                if (data[i].MaritalStatus == "W") {
                    var varDOB = data[i].DOMCDW_Year + "/" + data[i].DOMCDW_Month + "/" + data[i].DOMCDW_Day;
                    // alert(varDOB);
                    var DtDOB = new Date(varDOB);
                    // alert(DtDOB);
                    thisObj.setState({ DateofdiedState: DtDOB });
                }
                if (data[i].MaritalStatus == "W") {
                    var Name = data[i].PFirstName + '' + data[i].PMiddleName + '' + data[i].PLastName;
                    thisObj.setState({ NamedeceasedState: Name });
                }
                thisObj.setState({ SpouseNationality1State: data[i].PCountryOfCitizenship });
                // if(data[i].MaritalStatus =="M" || data[i].MaritalStatus =="C" && data[i].PCountryOfCitizenship =="NO") {
                //     thisObj.setState({CountryReasonState:data[i].PCountryOfCitizenship});
                // }

            }

        }).catch((err) => {

        })
    }
    //Auto-Populated Function
    handleBenQusResNorwayAuto(event) {
        var thisObj = this;
        let UserID;
        // let BenQusAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let BenQusAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusAutoJSONData = JSON.stringify({
            QueryName: "BenQusResidencyAuto",
            UserID: emailresult,
            CountryCode: "NO"
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
            url: BenQusAutoAPIUrl,
            data: BenQusAutoJSONData,
            //headers:AxiosHeaderConfig,

        }).then(({ data }) => {
            //console.log("Result" + JSON.stringify(data));
            //console.log("Length", data.length);
            for (var i = 0; i < 1; i++) {
                if (data[i].ResCountry != "NO") {
                    thisObj.setState({ OutsideNorwayState: "Yes" });
                }
                else if (data[i].ResCountry == "NO") {
                    thisObj.setState({ OutsideNorwayState: "No" });
                }
                thisObj.setState({ NationalNumberState: data[i].PersonalIDNum });
                thisObj.setState({ ResBeginDateState: data[i].ResCountryBDate });
                thisObj.setState({ ResEndDateState: data[i].ResCountryEDate });
                thisObj.setState({ ResCountryState: data[i].ResAddress });
                thisObj.setState({ ForeignState: data[i].PersonalIDNum });
                thisObj.setState({ workedState: data[i].CompanyCode });
                thisObj.setState({ CountryState: data[i].CountryCode });
                thisObj.setState({ DateFromState: data[i].ResCountryBDate });
                thisObj.setState({ DateToState: data[i].ResCountryEDate });
                thisObj.setState({ EmployerState: data[i].CompanyCode });
                thisObj.setState({ NAddressState: data[i].ResAddress });
                thisObj.setState({ LivedState: data[i].ResCountry });
                thisObj.setState({ Worked1State: data[i].CompanyCode });
            }

        }).catch((err) => {

        })
    }
    handleLoadCountry(event) {
        let LoadCountryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            { QueryName: "Countries" }
        );
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: LoadCountryAPIUrl,
            headers: AxiosHeaderConfig

        }).then(({ data }) => {
            CountryItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                CountryItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
            }
        }).catch((err) => {
        })
    }

    //Rendering Function
    render() {
        const { search, psearch, value, MailingAddressState, AddressState, MailingAddress1State, UserMailingAddressState, CountryState } = this.state
        const google = window.google;

        return (
            <div >
                <Col xs={12} md={12} >
                    <Panel eventKey="1" defaultExpanded={true}>
                        <Panel.Heading>
                            <Panel.Title >Norway Form</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Row >
                                <Col xs={12} md={12} >
                                    <Col xs={12} md={12}>

                                        <h3 className="ColorStyle"><b>Personal data</b></h3>
                                    </Col>


                                    <Col xs={12} md={12} >
                                        {/* <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Language of Correspondence<span className="manatoryfield">*</span></b></label>
                                            <SelectField
                                                hintText="Select Your Language of Correspondence"
                                                value={this.state.LanguageCState}
                                                onChange={this.handleChangeLanguageC.bind(this)}
                                                errorText={this.state.isValidLanguageC ? "Please Select Your Language of Correspondence" : ""}
                                            >
                                                <MenuItem value={"English"} primaryText="English" />
                                                {/* <MenuItem value={"French"} primaryText="French" /> */}
                                        {/* </SelectField>
                                        </Col> */}
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label ><b>Enter your national identity number:</b></label>
                                            <TextField hintText="Enter your national identity number"
                                                errorText={this.state.isValidNationalNumber ? "Please Enter Your national identity number" : ""}
                                                value={this.state.NationalNumberState}
                                                onChange={this.handleChangeNationalNumber.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatNationalNumber ? "Please Enter the Valid national identity number" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label ><b>Surname</b></label>
                                            <TextField hintText="Enter your Lastname"
                                                errorText={this.state.isValidLastname ? "Please Enter Your Lastname" : ""}
                                                value={this.state.LastnameState}
                                                onChange={this.handleChangeLastname.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatLastname ? "Please Enter the Valid Lastname" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label ><b>Forename</b></label>
                                            <TextField hintText="Enter your FirstNamer"
                                                errorText={this.state.isValidFirstName ? "Please Enter Your FirstName" : ""}
                                                value={this.state.FirstNameState}
                                                onChange={this.handleChangeFirstName.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatFirstName ? "Please Enter the Valid FirstName" : ""}</span>
                                        </Col>
                                    </Col>


                                    <Col xs={12} md={12} >

                                        <Col xs={12} md={7} className="input-fileds align-fileds">
                                            <label>Domicile:</label>
                                            <Geosuggest
                                                placeholder="Enter your Address:"
                                                initialValue={this.state.AddressState}
                                                onSuggestAddressSelect={this.onSuggestAddressSelect.bind(this)}
                                                onChange={this.handleChangeAddress}
                                                value={this.state.AddressState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidAddress ? "Please Enter your Address" : null}</span>
                                        </Col>
                                        {/* <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label ><b>Domicile</b></label>
                                            <TextField hintText="Enter your Address"
                                                errorText={this.state.isValidAddress ? "Please Enter your Address" : ""}
                                                value={this.state.AddressState}
                                                onChange={this.handleChangeAddress.bind(this)}
                                            /> 
                                            <span className="validationmsg">{this.state.isValidFormateAddress ? "Please Enter the Valid FirstName" : ""}</span>
                                        </Col> */}
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label ><b>Enter your phone number:</b></label>
                                            <TextField hintText="Enter your phone number"
                                                errorText={this.state.isValidPhonenumber ? "Please Enter your phone number" : ""}
                                                value={this.state.PhonenumberState}
                                                onChange={this.handleChangePhonenumber.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatPhonenumber ? "Please Enter the Valid FirstName" : ""}</span>
                                        </Col>
                                    </Col>

                                    {this.state.EligibleCountryState == "NO" ?
                                        <Col xs={12} md={12} >
                                            <Col xs={12} md={12} className="input-fileds align-fileds">
                                                <label ><b>Enter the Norwegian account number for payments (this account number will also be used for other NAV payments) - enter that account number:</b></label>
                                                <TextField hintText="Enter your Norwegian account number"
                                                    errorText={this.state.isValidNorwayacnumber ? "Please Enter your phone number" : ""}
                                                    value={this.state.NorwayacnumberState}
                                                    onChange={this.handleChangeNorwayacnumber.bind(this)}
                                                />
                                                <span className="validationmsg">{this.state.isValidFormatNorwayacnumber ? "Please Enter the Valid Norwegian account number" : ""}</span>
                                            </Col>
                                        </Col>
                                        : ""}
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label>Tick if the UDI has granted you the status of refugee, and enclose a copy of the UDI's decision about the basis for the stay:</label>
                                            <TextField hintText="Enter your UDI "
                                                value={this.state.UDINumberState}
                                                onChange={this.handleChangeUDINumber.bind(this)}
                                                errorText={this.state.isValidUDINumber ? "Please Enter your Given name " : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatUDINumber ? "Please Enter the Valid Norwegian account number" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={5} className="Radio_button">
                                            <label> Enter your nationality: </label>
                                            <RadioButtonGroup name="RadioStay" valueSelected={this.state.NationalityState} onChange={this.handleChangeNationality.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                <RadioButton
                                                    value="NO"
                                                    label="Norwegian"
                                                    style={style.radioButton}
                                                />
                                                <RadioButton
                                                    value="Other"
                                                    label="Other"
                                                    style={style.radioButton}
                                                />
                                            </RadioButtonGroup >
                                            <span className="validationmsg">{this.state.isValidNationality ? "Please select your nationality. If other than Norwegian, enter the nationality" : null}</span>
                                        </Col>
                                        {this.state.NationalityState == "Other" ?
                                            <Col xs={12} md={3} className="input-fileds align-fileds">
                                                <label> Your nationality:</label>
                                                <TextField hintText="Enter your nationality "
                                                    value={this.state.younationalityState}
                                                    onChange={this.handleChangeyounationality.bind(this)}
                                                    errorText={this.state.isValidyounationality ? "Please Enter your nationality " : null}
                                                />
                                                <span className="validationmsg">{this.state.isValidFormatUDINumber ? "Please Enter the Valid Norwegian account number" : ""}</span>
                                            </Col>
                                            : ""}
                                        {/* <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Enter your nationality:</b></label>
                                            <SelectField
                                                hintText="Select Your enter your nationality:"
                                                value={this.state.NationalityState}
                                                onChange={this.handleChangeNationality.bind(this)}
                                                errorText={this.state.isValidNationality ? "Please Select Your enter your nationality:" : ""}
                                            >
                                                {CountryItems}
                                            </SelectField>
                                        </Col>
                                                                                */}
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={4} className="align-fileds">
                                            <label className="DatepickerLabel">Start receiving a retirement pension (month and year):</label>
                                            <div className="StartOfCountryDatepicker">
                                                <Datetime
                                                    value={this.state.BeginDateState}
                                                    inputProps={{ placeholder: 'Select the Start Month and Year' }}
                                                    dateFormat="MM-YYYY"
                                                    onChange={this.handleChangeBeginDate.bind(this)}

                                                    timeFormat={false}
                                                />
                                            </div>
                                            {/* <div className="MonthlyDatePicker">
                                                <MonthPickerInput
                                                    value={this.state.BeginDateState}
                                                    // year={this.state.ResBeginYearState}
                                                    // month={this.state.ResBeginMonthState}
                                                    onChange={this.handleChangeBeginDate.bind(this)}
                                                    closeOnSelect={true}
                                                />
                                            </div> */}
                                            <span className="validationmsg ">{this.state.isValidBeginDate ? "Please Select Your From Date" : null}</span>
                                        </Col>


                                        <Col xs={12} md={8} className="input-fileds align-fileds">
                                            <label>If you were born in or after 1943, you must select the desired pension level you wish to draw. Tick the box for the desired retirement pension level:</label>
                                            <TextField hintText="Retirement pension level "
                                                value={this.state.RetirementpensionLevelState}
                                                onChange={this.handleChangeRetirementpensionLevel.bind(this)}
                                                errorText={this.state.isValidRetirementpensionLevel ? "Please Enter your Retirement pension level " : null}
                                            />
                                            {/* <span className="validationmsg">{this.state.isValidRetirementpensionLevel ? "Please Enter the Valid Givenname " : ""}</span> */}
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={5} className="input-fileds align-fileds">
                                            <label><b>Enter your Civil status:</b></label>
                                            <SelectField
                                                hintText="Select Your enter your Civil status:"
                                                value={this.state.CivilStatusState}
                                                onChange={this.handleChangeCivilStatus.bind(this)}
                                                errorText={this.state.isValidCivilStatus ? "Please Select Your enter your Civil status" : ""}
                                            >
                                                {MaritalStatusItems}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={7} className="input-fileds align-fileds">
                                            <label>Are you and your spouse/partner/cohabitating partner living apart permanently?</label>
                                            <TextField hintText="Enter Your Partner living apart permanently"
                                                value={this.state.PartnerlivingpartState}
                                                onChange={this.handleChangePartnerlivingpart.bind(this)}
                                                errorText={this.state.isValidPartnerlivingpart ? "Please Enter Your Partner living apart permanently " : null}
                                            />
                                            {/* <span className="validationmsg">{this.state.isValidPartnerlivingpart ? "Please Enter the Valid Givenname " : ""}</span> */}
                                        </Col>
                                    </Col>



                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={5} className="input-fileds align-fileds">
                                            <label><b>Enter your contractualpension status:</b></label>
                                            <SelectField
                                                hintText="Select Your enter your contractualpension status:"
                                                value={this.state.contractualpensionState}
                                                onChange={this.handleChangecontractualpension.bind(this)}
                                                errorText={this.state.isValidcontractualpension ? "Please Select Your enter your contractualpension status" : ""}
                                            >
                                                {PensionItems}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={3} className="input-fileds align-fileds">
                                            <label>US dollar</label>
                                            <TextField hintText="Enter Your US dollar"
                                                value={this.state.USdollarState}
                                                onChange={this.handleChangeUSdollar.bind(this)}
                                            // errorText={this.state.isValidUSdollar ? "Please Enter Your  US dollar" : null}
                                            />
                                            {/* <span className="validationmsg">{this.state.isValidPartnerlivingpart ? "Please Enter the Valid Givenname " : ""}</span> */}
                                        </Col>
                                        <Col xs={12} md={1}>
                                            <h3 ><b>==</b></h3>
                                        </Col>
                                        <Col xs={12} md={3} className="input-fileds align-fileds">
                                            <label>Norwegian Krone</label>
                                            <TextField hintText="Enter Your Norwegian Krone"
                                                value={this.state.NorwegianKroneState}
                                                onChange={this.handleChangeNorwegianKrone.bind(this)}
                                                errorText={this.state.isValidNorwegianKrone ? "Please Enter Your NorwegianKrone" : null}
                                            />
                                            {/* <span className="validationmsg">{this.state.isValidPartnerlivingpart ? "Please Enter the Valid Givenname " : ""}</span> */}
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <h3 className="ColorStyle"><b>Information about stays abroad</b></h3>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label> Have you lived or worked outside Norway after the age of 16? </label>
                                            <RadioButtonGroup name="RadioStay" valueSelected={this.state.OutsideNorwayState} onChange={this.handleChangeOutsideNorway.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                <RadioButton
                                                    value="Yes"
                                                    label="Yes"
                                                    style={style.radioButton}
                                                />
                                                <RadioButton
                                                    value="No"
                                                    label="No"
                                                    style={style.radioButton}
                                                />
                                            </RadioButtonGroup >
                                            <span className="validationmsg">{this.state.isValidOutsideNorway ? "Please Select Your enter your lived or worked outside Norway" : null}</span>
                                        </Col>
                                        {/* <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Have you lived or worked outside Norway after the age of 16? </b></label>
                                            
                                            <SelectField
                                                hintText="Select Your enter your lived or worked outside Norway:"
                                                value={this.state.OutsideNorwayState}
                                                onChange={this.handleChangeOutsideNorway.bind(this)}
                                                errorText={this.state.isValidOutsideNorway ? "Please Select Your enter your lived or worked outside Norway" : ""}
                                            >
                                                {OutsidenorwayItems}

                                            </SelectField>
                                        </Col> */}
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label> If yes, are you living abroad now?: </label>
                                            <RadioButtonGroup name="RadioStay" valueSelected={this.state.livedorworkNorwayState} onChange={this.handleChangelivedorworkNorway.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                <RadioButton
                                                    value="Yes"
                                                    label="Yes"
                                                    style={style.radioButton}
                                                />
                                                <RadioButton
                                                    value="No"
                                                    label="No"
                                                    style={style.radioButton}
                                                />
                                            </RadioButtonGroup >
                                            <span className="validationmsg">{this.state.isValidlivedorworkNorway ? "Please Select Your living abroad now" : null}</span>
                                        </Col>
                                        {/* <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>If yes, are you living abroad now?</b></label>
                                            <SelectField
                                                hintText="Select Your enter your living abroad now?:"
                                                value={this.state.livedorworkNorwayState}
                                                onChange={this.handleChangelivedorworkNorway.bind(this)}
                                                errorText={this.state.isValidlivedorworkNorway ? "Please Select Your living abroad now" : ""}
                                            >
                                                {LivingaproadItems}
                                            </SelectField>
                                        </Col> */}
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <h3 className="ColorStyle"><b> Information on spouse </b></h3>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Enter your spouse:</b></label>
                                            <SelectField
                                                hintText="Select Your enter your spouse:"
                                                value={this.state.SpouseState}
                                                onChange={this.handleChangeSpouse.bind(this)}
                                                errorText={this.state.isValidSpouse ? "Please Select Your enter your spouse:" : ""}
                                            >
                                                {SpouseItems}
                                            </SelectField>
                                        </Col>
                                    </Col>

                                    {(this.state.SpouseState == "M" || this.state.SpouseState == "C") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label ><b>Enter your cohabiting partner's national identity number:</b></label>
                                                    <TextField hintText="Enter your cohabiting partner's national identity number:"
                                                        errorText={this.state.isValidSnationalnumber1 ? "Please Enter your cohabiting partner's national identity number" : ""}
                                                        value={this.state.Snationalnumber1State}
                                                        onChange={this.handleChangeSnationalnumber1.bind(this)}
                                                    />
                                                    {/* <span className="validationmsg">{this.state.isValidFormatNorwayacnumber ? "Please Enter your cohabiting partner's national identity number:" : ""}</span> */}
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label ><b>Enter your cohabitating partner's name:</b></label>
                                                    <TextField hintText="Enter your cohabitating partner's name:"
                                                        errorText={this.state.isValidSName ? "Please Enter your cohabitating partner's name" : ""}
                                                        value={this.state.SNameState}
                                                        onChange={this.handleChangeSName.bind(this)}
                                                    />
                                                    {/* <span className="validationmsg">{this.state.isValidFormatNorwayacnumber ? "Please Enter your cohabitating partner's name:" : ""}</span>*/}
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label ><b>If you and your partner have / have had children together:</b></label>
                                                    <TextField hintText="Enter you and your partner have / have had children together"
                                                        errorText={this.state.isValidPartnerchild ? "Please Enter you and your partner have / have had children together" : ""}
                                                        value={this.state.PartnerchildState}
                                                        onChange={this.handleChangePartnerchild.bind(this)}
                                                    />
                                                    {/* <span className="validationmsg">{this.state.isValidFormatNorwayacnumber ? "Please Enter you and your partner have / have had children together" : ""}</span> */}
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label ><b>if you and your partner have been married to each other.</b></label>
                                                    <TextField hintText="Enter you and your partner have been married to each other"
                                                        errorText={this.state.isValidPartnermarried ? "Please Enter you and your partner have been married to each other" : ""}
                                                        value={this.state.PartnermarriedState}
                                                        onChange={this.handleChangePartnermarried.bind(this)}
                                                    />
                                                    {/* <span className="validationmsg">{this.state.isValidFormatPartnermarried ? "Please Enter you and your partner have been married to each other" : ""}</span> */}
                                                </Col>
                                                <Col xs={12} md={5} className="align-fileds">
                                                    <label className="DatepickerLabel">When did you become cohabitating partners? (Enter month and year):</label>
                                                    <div className="StartOfCountryDatepicker">
                                                        <Datetime
                                                            value={this.state.CohabitatingpartnerState}
                                                            inputProps={{ placeholder: 'Select the Start Month and Year' }}
                                                            dateFormat="MM-YYYY"
                                                            onChange={this.handleChangeCohabitatingpartner.bind(this)}

                                                            timeFormat={false}
                                                        />
                                                    </div>
                                                    {/* <div className="MonthlyDatePicker">
                                                        <MonthPickerInput
                                                            value={this.state.CohabitatingpartnerState}
                                                            // year={this.state.ResBeginYearState}
                                                            // month={this.state.ResBeginMonthState}                                               
                                                            onChange={this.handleChangeCohabitatingpartner.bind(this)}
                                                            closeOnSelect={true}
                                                        />
                                                    </div> */}
                                                    <span className="validationmsg ">{this.state.isValidCohabitatingpartner ? "Please Select Your cohabitating partners  (Enter month and year)" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={7} className="Radio_button">
                                                    <label> your cohabitating partner's nationality. If other than Norwegian, enter the nationality: </label>
                                                    <RadioButtonGroup name="RadioStay" valueSelected={this.state.CountryStayReason} onChange={this.handleCountryStayReason.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <RadioButton
                                                            value="Norway"
                                                            label="Norwegian"
                                                            style={style.radioButton}
                                                        />
                                                        <RadioButton
                                                            value="Other"
                                                            label="Other"
                                                            style={style.radioButton}
                                                        />
                                                    </RadioButtonGroup >
                                                    <span className="validationmsg">{this.state.isValidCountryStayReason ? "Please select your cohabitating partner's nationality. If other than Norwegian, enter the nationality" : null}</span>
                                                </Col>

                                                {this.state.CountryStayReason == "Other" ?
                                                    <Col xs={12} md={3} className="input-fileds align-fileds">
                                                        <label>Spouse Nationality</label>
                                                        <TextField
                                                            hintText="Enter the Spouse Nationality"
                                                            value={this.state.SpouseNationalityState}
                                                            onChange={this.handleChangeSpouseNationality.bind(this)}
                                                            errorText={this.state.isValidSpouseNationality ? "Please Enter Your Spouse Nationality" : ""}
                                                        />
                                                    </Col>
                                                    : ""}

                                            </Col>
                                        </div>
                                        : ""}
                                    {this.state.SpouseState == "W" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <h3 className="ColorStyle"><b>Information about deceased spouse, partner or cohabitating partner</b></h3>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Enter the national identity number of the deceased:</label>
                                                    <TextField
                                                        hintText="Enter the national identity number of the deceased:"
                                                        value={this.state.WNationalitynumberState}
                                                        onChange={this.handleChangeWNationalitynumber.bind(this)}
                                                        errorText={this.state.isValidWNationalitynumber ? "Please Enter the national identity number of the deceased" : ""}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Enter the national identity number of the deceased (if applicable):</label>
                                                    <TextField
                                                        hintText="Enter the national identity number of the deceased:"
                                                        value={this.state.DeceasednationalnumberState}
                                                        onChange={this.handleChangeDeceasednationalnumber.bind(this)}
                                                        errorText={this.state.isValidDeceasednationalnumberState ? "Please Enter the national identity number of the deceased (if applicable):" : ""}
                                                    />
                                                </Col>

                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Enter the name of the deceased:</label>
                                                    <TextField
                                                        hintText="Enter the name of the deceased:"
                                                        value={this.state.NamedeceasedState}
                                                        onChange={this.handleChangeNamedeceased.bind(this)}
                                                        errorText={this.state.isValidNamedeceased ? "Please the name of the deceased" : ""}
                                                    />
                                                </Col>
                                                <Col xs={6} md={6} className="input-fileds align-fileds">
                                                    <label>Select the date of death of the deceased (dd mm yy)</label>

                                                    <DatePicker hintText="Select the date of death of the deceased (dd mm yy)"
                                                        value={this.state.DateofdiedState}
                                                        onChange={this.handleChangeDateofdied.bind(this)}
                                                        errorText={this.state.isValidDateofdied ? "Please Select the date of death of the deceased (dd mm yy)" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="Radio_button">
                                                    <label> The nationality of the deceased. If other than Norwegian, enter the nationality:</label>
                                                    <RadioButtonGroup name="RadioStay" valueSelected={this.state.CountryStay} onChange={this.handleCountryStay.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <RadioButton
                                                            value="Norway"
                                                            label="Norwegian"
                                                            style={style.radioButton}
                                                        />
                                                        <RadioButton
                                                            value="Other"
                                                            label="Other"
                                                            style={style.radioButton}
                                                        />
                                                    </RadioButtonGroup >
                                                    <span className="validationmsg">{this.state.isValidCountryStay ? "Please select The nationality of the deceased. If other than Norwegian, enter the nationality" : null}</span>
                                                </Col>
                                                {this.state.CountryStay == "Other" ?
                                                    <Col xs={12} md={3} className="input-fileds align-fileds">
                                                        <label>Spouse Nationality</label>
                                                        <TextField
                                                            hintText="Enter the Spouse Nationality"
                                                            value={this.state.SNationalityState}
                                                            onChange={this.handleChangeSNationality.bind(this)}
                                                            errorText={this.state.isValidSNationality ? "Please Enter Your Spouse Nationality" : ""}
                                                        />
                                                    </Col>
                                                    : ""}
                                            </Col>
                                        </div>
                                        : ""}
                                    <Col xs={12} md={12}>
                                        <h3 className="ColorStyle"><b>Information about contractual pension (AFP)</b></h3>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>If you want to apply for a contractual pension from the private sector:</label>
                                            <SelectField
                                                hintText="Select Your pension from the private:"
                                                value={this.state.PrivatepensionState}
                                                onChange={this.handleChangePrivatepension.bind(this)}
                                                errorText={this.state.isValidPrivatepension ? "Please Select to apply for a contractual pension from the private sector" : ""}
                                            >
                                                {PrivatepensionItems}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>If you are born in 1948 or later and cared for children under the age of 7 before 1992:</label>
                                            <TextField
                                                hintText="Enter the children age:"
                                                value={this.state.AFPState}
                                                onChange={this.handleChangeAFP.bind(this)}
                                                errorText={this.state.isValidAFP ? "Please Enter the children age" : ""}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <h3 className="ColorStyle"><b>Declaration and signature</b></h3>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="ColorStyle2">
                                            <label>I am aware that NAV can obtain the information necessary to decide your application. The information has been given in good faith, and is as complete as possible. The declaration and signature apply to the entire retirement pension application.</label>
                                        </Col>
                                        <Col xs={12} md={8} className="input-fileds align-fileds">
                                            <label>Current Mailing Address</label>
                                            <Geosuggest
                                                placeholder="Current Mailing Address"
                                                initialValue={this.state.MailingAddressState}
                                                onSuggestSelect={this.onSuggestSelect.bind(this)}
                                                onChange={this.handleChangeMailingAddress}
                                                value={this.state.MailingAddressState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidMailingAddress ? "Please Choose Your Mailing Address" : null}</span>
                                        </Col>
                                        <Col xs={6} md={4} className="input-fileds align-fileds">
                                            <label>Date</label>
                                            <DatePicker hintText="Enter the date "
                                                value={this.state.DateState}
                                                onChange={this.handleChangeDate.bind(this)}
                                                errorText={this.state.isValidDate ? "Please select you date " : null}
                                            />
                                        </Col>
                                        <Col xs={6} md={8} >
                                        </Col>
                                        <Col xs={6} md={4} >
                                            <label className="TopicAlign"><b>Signature</b></label>
                                            <SignaturePad ref={ref => this.signaturePad = ref} />
                                            <Button id="clear" className="ClearBtn" onClick={this.handleSignatureClear.bind(this)}>Clear</Button>
                                            <span className="validationmsg">{this.state.isValidSignature ? "Please sign your signature" : ""}</span>
                                        </Col>
                                    </Col>
                                    {this.state.GoogleAdrsCountry == "NO" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <h3 className="ColorStyle"><b> Information about work and stays abroad if you live in Norway</b></h3>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="ColorStyle2">
                                                    <label>Provide as accurate information as possible about your stay/s abroad.</label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={3} className="align-fileds">
                                                    <label className="DatepickerLabel">Start of Country Residency</label>
                                                    <div className="StartOfCountryDatepicker">
                                                        <Datetime
                                                            value={this.state.ResBeginDateState}
                                                            inputProps={{ placeholder: 'Select the Start Month and Year' }}
                                                            dateFormat="MM-YYYY"
                                                            onChange={this.handleChangeResBeginDate.bind(this)}
                                                            isValidDate={this.handleChangeResBeginDate.bind(this)}
                                                            timeFormat={false}
                                                        />
                                                    </div>
                                                    {/* <div className="MonthlyDatePicker">
                                                        <MonthPickerInput
                                                            value={this.state.ResBeginDateState}
                                                            // year={this.state.ResBeginYearState}
                                                            // month={this.state.ResBeginMonthState}
                                                            onChange={this.handleChangeResBeginDate.bind(this)}
                                                            closeOnSelect={true}
                                                        />
                                                    </div> */}
                                                    <span className="validationmsg ">{this.state.isValidResBeginDate ? "Please Select Your From Date" : null}</span>
                                                </Col>
                                                <Col xs={12} md={3} className="align-fileds">
                                                    <label className="DatepickerLabel">End of Country Residency</label>
                                                    <div className="StartOfCountryDatepicker">
                                                        <Datetime
                                                            value={this.state.ResEndDateState}
                                                            inputProps={{ placeholder: 'Select the Start Month and Year' }}
                                                            dateFormat="MM-YYYY"
                                                            onChange={this.handleChangeResEndDate.bind(this)}

                                                            timeFormat={false}
                                                        />
                                                    </div>
                                                    {/* <div className="MonthlyDatePicker">
                                                        <MonthPickerInput
                                                            value={this.state.ResEndDateState}
                                                            onChange={this.handleChangeResEndDate.bind(this)}
                                                            closeOnSelect={true}
                                                        />
                                                    </div> */}
                                                    <span className="validationmsg ">{this.state.isValidResEndDate ? "Please Select Your To Date" : null}</span>
                                                </Col>

                                                {/* <Col xs={12} md={12} >
                                        <Col xs={12} md={8} className="input-fileds align-fileds">
                                            <label>Country:</label>
                                            <Geosuggest
                                                placeholder="Country:"
                                                initialValue={this.state.CountryState}
                                                onSuggestSelect={this.onSuggestSelect.bind(this)}
                                                onChange={this.handleChangeCountry}
                                                value={this.state.CountryState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidCountry ? "Please Choose Your Country" : null}</span>
                                        </Col>
                                    </Col> */}

                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Country </label>
                                                    <SelectField
                                                        maxHeight={300}
                                                        hintText="Select the Country "
                                                        value={this.state.ResCountryState}
                                                        onChange={this.handleChangeCountryName.bind(this)}
                                                        errorText={this.state.isValidResCountry ? "Please Select Your Country " : null}
                                                    >
                                                        {CountryItems}
                                                    </SelectField>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12} className="ColorStyle2">
                                                <label>Pension scheme (institution, etc.):</label>
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Foreign national identity number:</label>
                                                    <TextField
                                                        hintText="Enter Foreign national identity number"
                                                        value={this.state.ForeignState}
                                                        onChange={this.handleChangeForeign.bind(this)}
                                                        errorText={this.state.isValidForeign ? "Please Enter Foreign national identity number" : ""}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Lived:</label>
                                                    <TextField
                                                        hintText="Lived:"
                                                        value={this.state.LiveState}
                                                        onChange={this.handleChangeLive.bind(this)}
                                                        errorText={this.state.isValidLive ? "Please Enter Lived Place" : ""}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Worked:</label>
                                                    <TextField
                                                        hintText="Worked"
                                                        value={this.state.workedState}
                                                        onChange={this.handleChangeworked.bind(this)}
                                                        errorText={this.state.isValidworked ? "Please Enter worked Place" : ""}
                                                    />
                                                    {/* <AutoComplete
                                                        maxSearchResults={7}
                                                        popoverProps={{ open: this.state.viewList }}
                                                        disabled={this.state.CompanyFlag == "CompanyUpdate"}
                                                        hintText="Type Company Name"
                                                        dataSource={this.state.Countries}
                                                        menuProps={menuProps}
                                                        filter={AutoComplete.caseInsensitiveFilter}
                                                        searchText={this.state.searchText}
                                                        onUpdateInput={this.handleUpdateInput}
                                                        errorText={this.state.isValidCompanyName ? "Please Enter Company Name" : null}
                                                        fullWidth={true}
                                            />
                                            <span className="error_msg_align validationmsg ">{this.state.isEmptyCompanyName ? "There is no respective company for selected country" : ""}</span> */}
                                                </Col>
                                            </Col>
                                        </div> : null}
                                    <Col xs={12} md={12}>
                                        <h3 className="ColorStyle"><b>Pension from Norway and/or abroad</b></h3>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label> Are you applying for a retirement pension from:</label>
                                            <RadioButtonGroup name="RadioStay" valueSelected={this.state.PensionState} onChange={this.handleChangePension.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                <RadioButton
                                                    value="Norway"
                                                    label="Norway and abroad"
                                                    style={style.radioButton}
                                                />
                                                <RadioButton
                                                    value="abroad"
                                                    label="Only abroad"
                                                    style={style.radioButton}
                                                />
                                            </RadioButtonGroup >
                                            <span className="validationmsg">{this.state.isValidPension ? "Please select Why were you in Country during this time" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <h3 className="ColorStyle"><b>Information about pension from other countries than Norway</b></h3>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>Complete if you receive or have applied for pension from other countries than Norway. </label>
                                            <RadioButtonGroup valueSelected={this.state.PensionotherCountriesState} onChange={this.handleChangePensionotherCountries.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                <RadioButton
                                                    value="Yes"
                                                    label="Yes"
                                                    style={style.radioButton}
                                                />
                                                <RadioButton
                                                    value="No"
                                                    label="No"
                                                    style={style.radioButton}
                                                />
                                            </RadioButtonGroup >
                                            <span className="validationmsg">{this.state.isValidPensionotherCountries ? "Please select applied for pension from other countries than Norway. " : null}</span>
                                        </Col>
                                    </Col>
                                    {(this.state.PensionotherCountriesState == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Country:</label>
                                                    <SelectField
                                                        hintText="Country:"
                                                        value={this.state.CountryState}
                                                        onChange={this.handleChangeCountry.bind(this)}
                                                        multiple={true}
                                                        maxHeight={200}
                                                        errorText={this.state.isValidCountry ? "Please Select Your Country " : null}
                                                    >
                                                        {CountryItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Name of the pension scheme:</label>
                                                    <TextField hintText="Enter Your Name of the pension scheme"
                                                        value={this.state.SecurityState}
                                                        onChange={this.handleChangeSecurity.bind(this)}
                                                        errorText={this.state.isValidSecurity ? "Please Enter Your Name of the pension scheme" : ""}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Amount per year in the country's currency (before tax):</label>
                                                    <TextField hintText="Enter Your Amount per year in the country's currency"
                                                        value={this.state.AmountState}
                                                        onChange={this.handleChangeAmount.bind(this)}
                                                        errorText={this.state.isValidAmount ? "Please Enter Your Amount per year in the country's currency" : ""}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Currency:</label>
                                                    <TextField hintText="Enter the Currency"
                                                        value={this.state.CurrencyState}
                                                        onChange={this.handleChangeCurrency.bind(this)}
                                                        errorText={this.state.isValidCurrency ? "Please Enter the Currency" : ""}
                                                    />

                                                </Col>
                                            </Col>
                                        </div>
                                        : ""}


                                    {(this.state.GoogleAdrsCountry != "NO") ?

                                        <div>
                                            <Col xs={12} md={12}>
                                                <h3 className="ColorStyle"><b>Information about work and stays in Norway if you live abroad</b></h3>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Provide as accurate information as possible about your stay/s in Norway.</label>
                                                    <Geosuggest
                                                        placeholder="Information as possible about your stay/s in Norway"
                                                        initialValue={this.state.StayNorwayState}
                                                        onSuggestStayNorwaySelect={this.onSuggestStayNorwaySelect.bind(this)}
                                                        onChange={this.handleChangeStayNorway}
                                                        value={this.state.StayNorwayState}
                                                        location={new google.maps.LatLng("", "")}
                                                        radius="20"
                                                    />
                                                    <span className="validationmsg">{this.state.isValidStayNorway ? "Please Information as possible about your stay/s in Norway" : null}</span>
                                                </Col>
                                                <Col xs={12} md={3} className="align-fileds">
                                                    <label className="DatepickerLabel">Date from </label>
                                                    <div className="StartOfCountryDatepicker">
                                                        <Datetime
                                                            value={this.state.DateFromState}
                                                            inputProps={{ placeholder: 'Select the Start Month and Year' }}
                                                            dateFormat="MM-YYYY"
                                                            onChange={this.handleChangeDateFrom.bind(this)}

                                                            timeFormat={false}
                                                        />
                                                    </div>
                                                    {/* <div className="MonthlyDatePicker">
                                                        <MonthPickerInput
                                                            value={this.state.DateFromState}
                                                            // year={this.state.ResBeginYearState}
                                                            // month={this.state.ResBeginMonthState}
                                                            onChange={this.handleChangeDateFrom.bind(this)}
                                                            closeOnSelect={true}
                                                        />
                                                    </div> */}
                                                    <span className="validationmsg ">{this.state.isValidDateFrom ? "Please Select Your From Date" : null}</span>
                                                </Col>
                                                <Col xs={12} md={3} className="align-fileds">
                                                    <label className="DatepickerLabel">Date To</label>
                                                    <div className="StartOfCountryDatepicker">
                                                        <Datetime
                                                            value={this.state.DateToState}
                                                            inputProps={{ placeholder: 'Select the Start Month and Year' }}
                                                            dateFormat="MM-YYYY"
                                                            onChange={this.handleChangeDateTo.bind(this)}
                                                            timeFormat={false}
                                                        />
                                                    </div>
                                                    {/* <div className="MonthlyDatePicker">
                                                        <MonthPickerInput
                                                            value={this.state.DateToState}
                                                            onChange={this.handleChangeDateTo.bind(this)}
                                                            closeOnSelect={true}
                                                        />
                                                    </div> */}
                                                    <span className="validationmsg ">{this.state.isValidDateTo ? "Please Select Your To Date" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Employer:</label>
                                                    <TextField hintText="Enter the Employer:"
                                                        value={this.state.EmployerState}
                                                        onChange={this.handleChangeEmployer.bind(this)}
                                                        errorText={this.state.isValidEmployer ? "Please Enter the Employer" : ""}
                                                    />

                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Norwegian address:</label>
                                                    <TextField hintText="Enter the Norwegian address:"
                                                        value={this.state.NAddressState}
                                                        onChange={this.handleChangeNAddress.bind(this)}
                                                        errorText={this.state.isValidNAddress ? "Please Enter Your Name of the pension scheme" : ""}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Lived:</label>
                                                    <SelectField
                                                        hintText="Lived:"
                                                        value={this.state.LivedState}
                                                        onChange={this.handleChangeLived.bind(this)}
                                                        multiple={true}
                                                        maxHeight={200}
                                                        errorText={this.state.isValidLived ? "Please Select Your Lived Country " : null}
                                                    >
                                                        {CountryItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Worked: </label>
                                                    <TextField hintText="Enter the Worked: :"
                                                        value={this.state.Worked1State}
                                                        onChange={this.handleChangeWorked1.bind(this)}
                                                        errorText={this.state.isValidWorked1 ? "Please Enter the Worked" : ""}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ""}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>If you want payment to a foreign account:</label>
                                            <SelectField
                                                hintText="If you want payment to a foreign account:"
                                                value={this.state.PaymentState}
                                                onChange={this.handleChangePayment.bind(this)}
                                                multiple={true}
                                                maxHeight={200}
                                                errorText={this.state.isValidPayment ? "Please Select Your payment for foreign account " : null}
                                            >
                                                {BenCountryItems}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>If you are married or have a registered partner: </label>
                                            <TextField hintText="Enter you are married or have a registered partners"
                                                value={this.state.MCPartnerState}
                                                onChange={this.handleChangeMCPartner.bind(this)}
                                                errorText={this.state.isValidSecurity ? "Please Enter Your Name of the pension scheme" : ""}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <h3 className="ColorStyle"><b>Information about foreign bank account</b></h3>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={5} className="input-fileds align-fileds">
                                            <label>Norwegian Identity number (11 digits) or D-number:</label>
                                            <TextField
                                                hintText="Enter the Norwegian Identity number (11 digits) or D-number:"
                                                value={this.state.NorwegianIDnumberState}
                                                onChange={this.handleChangeNorwegianIDnumber.bind(this)}
                                                errorText={this.state.isValidNorwegianIDnumber ? "Please Enter the Norwegian Identity number (11 digits) or D-number" : ""}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={5} className="input-fileds align-fileds">
                                            <label>Name:</label>
                                            <TextField
                                                hintText="Name"
                                                value={this.state.UserNameState}
                                                onChange={this.handleChangeUserName.bind(this)}
                                                errorText={this.state.isValidUserName ? "Please Enter the Name " : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={7} className="input-fileds align-fileds">
                                            <label>The User's address and country:</label>
                                            <Geosuggest
                                                placeholder="The User's address and country:"
                                                initialValue={this.state.UserMailingAddressState}
                                                onSuggestUserSelect={this.onSuggestUserSelect.bind(this)}
                                                onChange={this.handleChangeUserMailingAddress}
                                                value={this.state.UserMailingAddressState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidUserMailingAddress ? "Please Choose Your Mailing Address" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={5} className="input-fileds align-fileds">
                                            <label>The bank's Name:</label>
                                            <TextField
                                                hintText="Enter the bank's Name:"
                                                value={this.state.BankNameState}
                                                onChange={this.handleChangeBankName.bind(this)}
                                                errorText={this.state.isValidBankName ? "Please Enter the bank's Name" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={7} className="input-fileds align-fileds">
                                            <label>The bank's address and country:</label>
                                            <Geosuggest
                                                placeholder="The bank's address and country:"
                                                initialValue={this.state.MailingAddress1State}
                                                onSuggest1Select={this.onSuggest1Select.bind(this)}
                                                onChange={this.handleChangeMailingAddress1}
                                                value={this.state.MailingAddress1State}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidMailingAddress1 ? "Please Choose Your Mailing Address" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Account number or IBAN number:</label>
                                            <TextField
                                                hintText="Enter the Account number or IBAN number:"
                                                value={this.state.BankAcNumberState}
                                                onChange={this.handleChangeBankAcNumber.bind(this)}
                                                errorText={this.state.isValidBankAcNumber ? "Please Enter the  Account number or IBAN number" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>BIC/SWIFT code (8 or 11 characters):</label>
                                            <TextField
                                                hintText="Enter the BIC/SWIFT code (8 or 11 characters):"
                                                value={this.state.BICCodeState}
                                                onChange={this.handleChangeBICCode.bind(this)}
                                                errorText={this.state.isValidBICCode ? "Please Enter the  BIC/SWIFT code (8 or 11 characters)" : ""}
                                            />
                                        </Col>

                                        <Col xs={12} md={5} className="input-fileds align-fileds">
                                            <label>Bank code (8 or 11 characters):</label>
                                            <TextField
                                                hintText="Enter the Bank code :"
                                                value={this.state.BankCodeState}
                                                onChange={this.handleChangeBankCode.bind(this)}
                                                errorText={this.state.isValidBankCode ? "Please Enter the Bank code " : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={3} className="input-fileds align-fileds">
                                            <label>Date</label>
                                            <DatePicker hintText="Enter the date "
                                                value={this.state.Date1State}
                                                onChange={this.handleChangeDate1.bind(this)}
                                                errorText={this.state.isValidDate1 ? "Please select you date " : null}
                                            />
                                        </Col>

                                        <Col xs={12} md={4} >
                                            <label className="TopicAlign"><b>Signature</b></label>
                                            <SignaturePad ref={ref => this.signaturePad1 = ref} />
                                            <Button id="clear" className="ClearBtn" onClick={this.handleSignature1Clear.bind(this)}>Clear</Button>
                                            <span className="validationmsg">{this.state.isValidSignature1 ? "Please sign your signature" : ""}</span>
                                        </Col>
                                    </Col>
                                    {this.state.EligibleCountryState == "UK" ?
                                        <Col xs={12} md={12} >
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Routing number - 9 digits: </label>
                                                <TextField
                                                    hintText="Enter the Routing number - 9 digits: "
                                                    value={this.state.RoutingnumberState}
                                                    onChange={this.handleChangeRoutingnumber.bind(this)}
                                                    errorText={this.state.isValidRoutingnumber ? "Please Enter the Routing number - 9 digits " : ""}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Account number:  </label>
                                                <TextField
                                                    hintText="Enter the Account number:  "
                                                    value={this.state.AccountnumberState}
                                                    onChange={this.handleChangeAccountnumber.bind(this)}
                                                    errorText={this.state.isValidAccountnumber ? "Please Enter the Account number" : ""}
                                                />
                                            </Col>
                                        </Col>
                                        : ""}
                                    {this.state.EligibleCountryState == "AU" ?
                                        <Col xs={12} md={12} >
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Bank code - 6 digits: </label>
                                                <TextField
                                                    hintText="Bank code - 6 digits: "
                                                    value={this.state.AUBankCodeState}
                                                    onChange={this.handleChangeAUBankCode.bind(this)}
                                                    errorText={this.state.isValidAUBankCode ? "Please Bank code - 6 digits:" : ""}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Account number:  </label>
                                                <TextField
                                                    hintText="Enter the Account number:  "
                                                    value={this.state.AUAccountnumberState}
                                                    onChange={this.handleChangeAUAccountnumber.bind(this)}
                                                    errorText={this.state.isValidAUAccountnumber ? "Please Enter the Account number" : ""}
                                                />
                                            </Col>
                                        </Col >
                                        : ""}
                                    {this.state.EligibleCountryState == "CA" ?
                                        <div>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Direct Payment Routing No (9 tall / digits): -- (0) + Inst no (3 tall/digits) + Bank no (5 tall/digits)</label>
                                                    <TextField
                                                        hintText="Direct Payment Routing No"
                                                        value={this.state.CADirectPaymentState}
                                                        onChange={this.handleChangeCADirectPayment.bind(this)}
                                                        errorText={this.state.isValidCADirectPayment ? "Please Direct Payment Routing No" : ""}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Account number:  </label>
                                                    <TextField
                                                        hintText="Enter the Account number:  "
                                                        value={this.state.CAAccountnumberState}
                                                        onChange={this.handleChangeCAAccountnumber.bind(this)}
                                                        errorText={this.state.isValidCAAccountnumber ? "Please Enter the Account number" : ""}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12} >

                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>The bank`s S.W.I.F.T.(BIC) address  </label>
                                                    <TextField
                                                        hintText="Enter The bank`s S.W.I.F.T.(BIC) address  "
                                                        value={this.state.CABICState}
                                                        onChange={this.handleChangeCABIC.bind(this)}
                                                        errorText={this.state.isValidCABIC ? "Please Enter The bank`s S.W.I.F.T.(BIC) address " : ""}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ""}
                                    {this.state.EligibleCountryState == "MX" ?
                                        <div>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Clabe number - 18 digits:  </label>
                                                <TextField
                                                    hintText="Clabe number - 18 digits:  "
                                                    value={this.state.MXClabenumberState}
                                                    onChange={this.handleChangeMXClabenumber.bind(this)}
                                                    errorText={this.state.isValidMXClabenumber ? "Please Enter the Clabe number - 18 digits" : ""}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>The bank`s S.W.I.F.T.(BIC) address  </label>
                                                <TextField
                                                    hintText="Enter The bank`s S.W.I.F.T.(BIC) address  "
                                                    value={this.state.MXBICState}
                                                    onChange={this.handleChangeMXBIC.bind(this)}
                                                    errorText={this.state.isValidMXBIC ? "Please Enter The bank`s S.W.I.F.T.(BIC) address " : ""}
                                                />
                                            </Col>
                                        </div>
                                        : ""}
                                    {this.state.EligibleCountryState == "ZA" ?
                                        <div>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Bank code - 6 digits: </label>
                                                    <TextField
                                                        hintText="Bank code - 6 digits: "
                                                        value={this.state.ZABankCodeState}
                                                        onChange={this.handleChangeZABankCode.bind(this)}
                                                        errorText={this.state.isValidZABankCode ? "Please Bank code - 6 digits:" : ""}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Account number:  </label>
                                                    <TextField
                                                        hintText="Enter the Account number:  "
                                                        value={this.state.ZAAccountnumberState}
                                                        onChange={this.handleChangeZAAccountnumber.bind(this)}
                                                        errorText={this.state.isValidZAAccountnumber ? "Please Enter the Account number" : ""}
                                                    />
                                                </Col>
                                            </Col >
                                        </div>
                                        : ""}
                                    <Col xs={12} md={12}>
                                        <h3 className="ColorStyle"><b>Information about your spouse or partner if you live abroad</b></h3>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={3} className="input-fileds align-fileds">
                                            <label>Enter your spouse's/partner's name:</label>
                                            <TextField
                                                hintText="Enter your spouse's/partner's name:"
                                                value={this.state.SpouseNameState}
                                                onChange={this.handleChangeSpouseName.bind(this)}
                                                errorText={this.state.isValidSpouseName ? "Please Enter your spouse's/partner's name:" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={5} className="input-fileds align-fileds">
                                            <label>Enter your spouse's/partner's Norwegian national identity number:</label>
                                            <TextField
                                                hintText="Enter your spouse's/partner's Norwegian national identity number"
                                                value={this.state.SnationalnumberState}
                                                onChange={this.handleChangeSnationalnumber.bind(this)}
                                                errorText={this.state.isValidSnationalnumber ? "Please Enter your spouse's/partner's Norwegian national identity number" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Enter your spouse's/partner's date of birth:</label>
                                            <DatePicker hintText="Enter your spouse's/partner's date of birth"
                                                value={this.state.SpouseDateState}
                                                onChange={this.handleChangeSpouseDate.bind(this)}
                                                errorText={this.state.isValidSpouseDate ? "Please Enter your spouse's/partner's date of birth" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={7} className="Radio_button">
                                            <label> nationality of your spouse/partner. </label>
                                            <RadioButtonGroup name="RadioStay" valueSelected={this.state.CountryReasonState} onChange={this.handleChangeCountryReason.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                <RadioButton
                                                    value="NO"
                                                    label="Norwegian"
                                                    style={style.radioButton}
                                                />
                                                <RadioButton
                                                    value="Other"
                                                    label="Other"
                                                    style={style.radioButton}
                                                />
                                            </RadioButtonGroup >
                                            <span className="validationmsg">{this.state.isValidCountryReason ? "Please select Why were you in Country during this time" : null}</span>
                                        </Col>

                                        {this.state.CountryReasonState == "Other" ?
                                            <Col xs={12} md={3} className="input-fileds align-fileds">
                                                <label>Spouse Nationality</label>
                                                <TextField
                                                    hintText="Enter the Spouse Nationality"
                                                    value={this.state.SpouseNationality1State}
                                                    onChange={this.handleChangeSpouseNationality1.bind(this)}
                                                    errorText={this.state.isValidSpouseNationality1 ? "Please Enter Your Spouse Nationality" : ""}
                                                />
                                            </Col>
                                            : ""}
                                    </Col>
                                </Col>
                            </Row>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={12} className="input-fields">
                                    <Button onClick={this.handleBenQusDatas.bind(this)} className="RQ-Add" >{this.state.BtnNameState}</Button>
                                    <Notifications />
                                </Col>

                            </Col>
                        </Panel.Body>
                    </Panel>
                </Col>
            </div >
        );
    }
    onSuggestSelect(suggest) {
        if (suggest) {
            // this.setState({ MailingAddressState: suggest.description});
            // var len=suggest.gmaps.address_components.length;            
            // for(let i=0;i<len;i++){
            //      console.log( suggest.gmaps.address_components[i].types[0]);
            //      if(suggest.gmaps.address_components[i].types[0]=='country')
            //      {                    
            //         this.setState({ GoogleAdrsCountry: suggest.gmaps.address_components[i].short_name});
            //         break;
            //      }                 
            //  }         
            // alert(this.state.GoogleAdrsCountry);
            this.setState({ MailingAddressState: suggest.description });
        }
    };
    onSuggest1Select(suggest) {
        if (suggest) {
            this.setState({ MailingAddress1State: suggest.description });
        }
    };
    onSuggestUserSelect(suggest) {
        if (suggest) {
            this.setState({ UserMailingAddressState: suggest.description });
        }
    };
    onSuggestStayNorwaySelect(suggest) {
        if (suggest) {
            this.setState({ StayNorwayState: suggest.description });
        }
    };
    onSuggestAddressSelect(suggest) {
        if (suggest) {
            this.setState({ AddressState: suggest.description });
        }
    };
    handleChangeMailingAddress = (value) => {
        this.setState({ MailingAddressState: value });
    };
    handleChangeMailingAddress1 = (value) => {
        this.setState({ MailingAddress1State: value });
    };
    handleChangeUserMailingAddress = (value) => {
        this.setState({ UserMailingAddressState: value });
    };
    handleChangeStayNorway = (value) => {
        this.setState({ StayNorwayState: value });
    };
    handleChangeAddress = (value) => {
        this.setState({ AddressState: value });
    };
}

////*****call all the API common method****/////
const SaveDataAPICallMailSend = function(mailSendURL, data) {
    var promise = new Promise(function(resolve, reject) {
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

BenQusNorway.propTypes = {
    googleMaps: PropTypes.object,
}

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

export default connect(mapReducerStateToProps, mapDispatchToProps)(BenQusNorway);