import React, { Component } from 'react';
import PropTypes from "prop-types";
//Bootstrap Component
import { Row, Col, Panel, Button } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { Checkbox } from 'material-ui';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';

//API Calling Method
import axios from 'axios';

//Singature Pad
import SignaturePad from 'react-signature-pad';

//Notification
import Notifications, { notify } from 'react-notify-toast';

//Google Address 
import Geosuggest from 'react-geosuggest';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Routing
import history from '../Routing/history';

var emailresult;
const styles = {
    margin: "10px",
    color: "pink"
}

const style = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

const TitleItems = [
    <MenuItem value={"Mr."} key={1} primaryText={`Mr.`} />,
    <MenuItem value={"Mrs."} key={2} primaryText={`Mrs.`} />,
    <MenuItem value={"Miss."} key={3} primaryText={`Miss.`} />,
    <MenuItem value={"Ms."} key={4} primaryText={`Ms.`} />,
    <MenuItem value={"Dr."} key={5} primaryText={`Dr.`} />
];

class BenQusUK extends Component {
    constructor(props) {
        super(props);
        //Field State Values Initialization
        this.state = {
            BtnNameState: "Save",
            pensionDocumentId: "",
            value: "",
            search: "",
            NationalInsuranceNumber: "",
            NInumber: "",
            Surname: "",
            FirstName: "",
            MiddleName: "",
            Title: "",
            MaidensureNameState: "",
            maidenname: "",
            search1: "",
            Address: "",
            Phonenumber: "",
            Birthcertificate: "Yes",
            Changebenefit: "",
            BenefitClaim: "",
            workuk: "",
            search2: "",
            LastAddress: "",
            servicepartin: "",
            Discharged: "",
            Regiment: "",
            Servicenumber: "",
            rank: "",
            Empnameaddress: "",
            Referencenumber: "",
            contribution: "",
            partnership: "",
            civilpartnersurname: "",
            civilpartnerfirstname: "",
            civilpartnermiddlename: "",
            othername: "",
            civilpartnerNI: "",
            liveUK: "",
            search3: "",
            civilpartneraddress: "",
            sendmarriagecertificate: "",
            annulment: "",
            deathceritificate: "",
            birthdetails: "",
            search4: "",
            birthaddress: "",
            fathersName: "",
            MothersName: "",
            MothersNamebefore: "",
            search5: "",
            partneraddress: "",
            maidensurname: "",
            maidenFullname: "",
            Partnermarried: "",
            partnerdivorce: "",
            petitionername: "",
            Placedeath: "",
            deathregistration: "",
            selfemployed: "",
            reducedrate: "",
            pensionage: "",
            paycontributions: "",
            employersname: "",
            search6: "",
            employersaddress: "",
            benefitpensionage: "",
            benefitname: "",
            receivebenefit: "",
            benefitrefno: "",
            benefituk: "",
            benefitincrease: "",
            Referencenumberbenefit: "",
            childbenefit: "",
            Authority: "",
            benefitauthority: "",
            waiting: "",
            referencebenefit: "",
            namesocial: "",
            search7: "",
            Addresssocial: "",
            Nationality: "",
            liveorwork: "",
            livedCountry: "",
            securityscheme: "",
            SecurityRefno: "",
            socialsecurityname: "",
            search8: "",
            socialsecurityaddress: "",
            Hospital: "",
            hospitaldetails: "",
            bankname: "",
            bankAddress: "",
            Accountholder: "",
            Accountno: "",
            AccountType: "",
            branchcode: "",
            IBAN: "",
            BIC: "",
            paybyweek: "13weeks",
            anythingknow: "",
            Nationalchecked: false,
            Localchecked: false,
            DateofMarriage: "",
            DateofDivorce: "",
            DateofStatePensionFrom: "",
            DateofStartedWork: "",
            DateofStoppedWork: "",
            WorkingOutSideUKFrom: "",
            WorkingOutSideUKTo: "",
            validationGroup: {},
            BenefitWhoClaim: "",
            LivedOrWorkedKingdom: "",
            HMForces: "",
            EmployerUK: "",
            DateOfBirthValue: "",
            LivedUKFrom: "",
            LivedUKTo: "",
            SpentTimeUKFrom: "",
            SpentTimeUKTo: "",
            EnlistedDate: "",
            WorkedEmployerUKFrom: "",
            WorkedEmployerUKTo: "",
            PartnerDateOfBirth: "",
            PartnerDiedDate: "",
            TitleState: "",
            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            MaidenNameState: "",
            DOBState: "",
            CountryState: "",
            MailingAddressState: "",
            PhoneNumState: "",
            HomeNumState: "",
            MaritalStatusState: "",
            PFirstNameState: "",
            PMiddleNameState: "",
            PLastNameState: "",
            PDOBState: "",
            PCountryState: "",
            PMailingAddressState: "",
            payroll: "",
            Authority: "",
            StartAndEndDate: "",
            isValidDateofStatePension: false,
            isValidsecurityscheme: false,
            isValidbankname: false,
            isValidbankAddress: false,
            isValidAccountholder: false,
            isValidAccountno: false,
            isValidAccountType: false,
            isValidbranchcode: false,
            isValidIBAN: false,
            isValidBIC: false,
            isValidDateSigned: false,
            isValidSignature: false,

            GenderState: "",
            YesOrNoState: "",
            CountriesState: "",
            BenefitState: "",
            ConditionalState: '',
            Benefitid: '',
        }
    }
    //Handle Event
    //Handle Event
    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        //this.handleBenQusUKAuto(this);
        var Params = new URLSearchParams(document.location.search);
        let Benefit = Params.get("BenQusCNIGPAID")
        var Mode = Params.get("Mode");
        let Countryvalue = Params.get("CountryCode")
        if (Params != null || Params != "") {
            if (Mode != null || Mode != "") {
                if (Mode == "E") {
                    // alert("enter")
                    this.handleBenQusUKEdit(Benefit);
                }
                else {
                    this.handleBenQusUKGeneralAuto(this);
                    this.handleBenQusUKResidencyAuto(this);
                }
            }
            else {
                this.handleBenQusUKGeneralAuto(this);
                this.handleBenQusUKResidencyAuto(this);
            }
        }
        else {
            this.handleBenQusUKGeneralAuto(this);
            this.handleBenQusUKResidencyAuto(this);
        }
    }
    handlechangeothername = (event) => {
        this.setState({ othername: event.target.value });
    };

    handlechangeCivilpartnerNI = (event) => {
        this.setState({ civilpartnerNI: event.target.value });
    };

    handlerDateofStatePensionFrom = (event, date) => {
        this.setState({ DateofStatePensionFrom: date });
    };

    handlesecurityscheme = (event) => {
        this.setState({ securityscheme: event.target.value });
    };

    handlechangesocialsecurityname = (event) => {
        this.setState({ socialsecurityname: event.target.value });
    };

    handlechangebankname = (event) => {
        this.setState({ bankname: event.target.value });
    };

    handlechangebankAddress = (event) => {
        this.setState({ bankAddress: event.target.value });
    };

    handlechangeAccountholder = (event) => {
        this.setState({ Accountholder: event.target.value });
    };

    handlechangeAccountno = (event) => {
        this.setState({ Accountno: event.target.value });
    };

    handlechangeAccounttype = (event) => {
        this.setState({ AccountType: event.target.value });
    };

    handlechangebranchcode = (event) => {
        this.setState({ branchcode: event.target.value });
    };

    handleChangepayroll = (event) => {
        this.setState({ payroll: event.target.value });
    };

    handlechangeIBAN = (event) => {
        this.setState({ IBAN: event.target.value });
    };

    handlechangeBIC = (event) => {
        this.setState({ BIC: event.target.value });
    };
    handleChangepaybyweek = (event) => {
        this.setState({ paybyweek: event.target.value });
    };

    handlechangeanythingknow = (event) => {
        this.setState({ anythingknow: event.target.value });
    };

    handlerStartAndEndDate = (event, date) => {
        this.setState({ StartAndEndDate: date });
    };

    handleSignatureClear = (e) => {
        this.signaturePad.clear();
    };

    //Validation Function
    validateFormField() {
        const { validationError } = this.state;
        let validForm = false;
        var validDateofStatePensionFrom = false;
        var validsecurityschemeForm = false;
        var validbanknameForm = false;
        var validbankAddressForm = false;
        var validAccountholderForm = false;
        var validAccountnoForm = false;
        var validAccounTypeForm = false;
        var validbranchcodeForm = false;
        var validIBANForm = false;
        var validBICForm = false;
        var validDateSignedForm = false;
        var validSignatureForm = false;

        if (this.state.DateofStatePensionFrom != "") {
            this.setState({ isValidDateofStatePension: false });
            validDateofStatePensionFrom = true;
        } else {
            this.setState({ isValidDateofStatePension: true });
            validDateofStatePensionFrom = false;
        }
        if (this.state.securityscheme != "") {
            this.setState({ isValidsecurityscheme: false });
            validsecurityschemeForm = true;
        }
        else {
            this.setState({ isValidsecurityscheme: true });
            validsecurityschemeForm = false;
        }
        if (this.state.bankname != "") {
            this.setState({ isValidbankname: false });
            validbanknameForm = true;
        } else {
            this.setState({ isValidbankname: true });
            validbanknameForm = false;
        }
        if (this.state.bankAddress != "") {
            this.setState({ isValidbankAddress: false });
            validbankAddressForm = true;
        } else {
            this.setState({ isValidbankAddress: true });
            validbankAddressForm = false;
        }
        if (this.state.Accountholder != "") {
            this.setState({ isValidAccountholder: false });
            validAccountholderForm = true;
        } else {
            this.setState({ isValidAccountholder: true });
            validAccountholderForm = false;
        }
        if (this.state.Accountno != "") {
            this.setState({ isValidAccountno: false });
            validAccountnoForm = true;
        } else {
            this.setState({ isValidAccountno: true });
            validAccountnoForm = false;
        }
        if (this.state.AccountType != "") {
            this.setState({ isValidAccountType: false });
            validAccounTypeForm = true;
        } else {
            this.setState({ isValidAccountType: true });
            validAccounTypeForm = false;
        }
        if (this.state.branchcode != "") {
            this.setState({ isValidbranchcode: false });
            validbranchcodeForm = true;
        } else {
            this.setState({ isValidbranchcode: true });
            validbranchcodeForm = false;
        }
        if (this.state.IBAN != "") {
            this.setState({ isValidIBAN: false });
            validIBANForm = true;
        } else {
            this.setState({ isValidIBAN: true });
            validIBANForm = false;
        }
        if (this.state.BIC != "") {
            this.setState({ isValidBIC: false });
            validBICForm = true;
        } else {
            this.setState({ isValidBIC: true });
            validBICForm = false;
        }
        if (this.state.StartAndEndDate != "") {
            this.setState({ isValidDateSigned: false });
            validDateSignedForm = true;
        }
        else {
            this.setState({ isValidDateSigned: true });
            validDateSignedForm = false;
        }
        if (this.signaturePad.isEmpty()) {
            this.setState({ isValidSignature: true });
            validSignatureForm = false;
        }
        else {
            this.setState({ isValidSignature: false });
            validSignatureForm = true;
        }
        if (validDateofStatePensionFrom && validsecurityschemeForm && validbanknameForm && validbankAddressForm && validAccountholderForm && validAccountnoForm && validAccounTypeForm && validbranchcodeForm && validIBANForm && validBICForm && validDateSignedForm && validSignatureForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }
    handleBenQusUKEdit(event) {
        this.setState({ Benefitid: event })
        var thisObj = this;
        //let DataURLPension = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let DataURLPension = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var dataURL = {
            QueryName: "Pensiondata",
            UserID: emailresult,
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
            this.setState({ showloader: false });
            this.setState({ BtnNameState: "Update" })
            data.map((item, key) => {
                let JSONData = JSON.parse(item.AppAnsInJsonObj);
                thisObj.setState({
                    othername: JSONData.PartnerOtherName,
                    civilpartnerNI: JSONData.PartnerNINo,
                    DateofStatePensionFrom: JSONData.PensionDateFrom,
                    securityscheme: JSONData.DidPaySecuritySchemeCurrentCountry,
                    socialsecurityname: JSONData.WorkingOutSideCountryName,
                    bankname: JSONData.BankName,
                    bankAddress: JSONData.BankAddress,
                    Accountholder: JSONData.BankAccountHolder,
                    Accountno: JSONData.BankAccountNumber,
                    AccountType: JSONData.AccountryType,
                    branchcode: JSONData.BankBanchCode,
                    IBAN: JSONData.InternationalBankAccNo,
                    BIC: JSONData.BankIdentificationCode,
                    paybyweek: JSONData.WouldPayEvery,
                    anythingknow: JSONData.TellUsAnyting,
                });
            }
            );
        }).catch((err) => {

        });
    }

    // Save Pension Data.
    handleSavePensionData(e) {
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
                    SavePensiondata = ({
                        "html": "This is test Data",
                        "language": "en",
                        "DocCategory": "paf",
                        "params": {
                            "empId": emailresult,//"spurthi.n@mitosistech.com",
                            "pensiondata": {
                                "NationalInsuranceNumber": [JSONData.NationalInsuranceNumber],
                                "SurName": [JSONData.SurName],
                                "AllOtherName": [JSONData.FirstName],
                                "Title": [JSONData.Title],
                                "AllOtherSurName": [JSONData.MaidensureName],
                                "PermanentAddress": [JSONData.Address],
                                "PhoneNumber(NationalAndLocalAreaCode)": [JSONData.Phonenumber],
                                "DateOfBirth": [JSONData.DateOfBirth],
                                "ClaimedBenefitDetails": [JSONData.CivilPartnerClaimedBenefit],
                                "Address": [JSONData.Address],
                                "DateFrom": [JSONData.LivedUKFromDate],
                                "DateTo": [JSONData.LivedUKToDate],
                                "Address2": [JSONData.LastAddressUK],
                                "Address2DateFrom": [JSONData.LivedUKFromDate],
                                "Address2DateTo": [JSONData.LivedUKToDate],
                                "TimeSpent1InUKFrom": [JSONData.SpentTimeUKFrom],
                                //"TimeSpent2InUKFrom":[JSONData.SpentTimeUKTo],
                                //"TimeSpent3InUKFrom":[],
                                //"TimeSpent4InUKFrom":[JSONData.LivedUKFromDate],
                                "TimeSpent1InUKTo": [JSONData.SpentTimeUKTo],
                                // "TimeSpent2InUKTo":[JSONData.LivedUKFromDate],
                                // "TimeSpent3InUKTo":[JSONData.LivedUKFromDate],
                                // "TimeSpent4InUKTo":[JSONData.LivedUKFromDate],
                                "DateOfEnlistedInHMForces": [JSONData.HMServiceEnlistedDate],
                                "DateOfDischargedFromHMForces": [JSONData.HMServiceDischarge],  // doubt.
                                "PlaceOfDischarged": [JSONData.HMServiceDischarge],
                                "RegimentOrCorpsYouWereIn": [JSONData.HMServiceRegiment],
                                "ServiceNumber": [JSONData.HMServiceNo],
                                "Rank": [JSONData.HMServiceRank],
                                "Employer1NameAndAddress": [JSONData.WorkedUKEmployerName],  // field name dobut
                                "Employer2NameAndAddress": [JSONData.HMServiceRank],     // dobut
                                "Employer1PayrollOrOtherReferenceNumber": [JSONData.WorkedEmployerReferenceNo],
                                "Employer2PayrollOrOtherReferenceNumber": [JSONData.WorkedUKEmployerName], // dobut
                                "Employer1WorkDateOfStart": [JSONData.WorkedEmployerUKDateFrom],
                                "Employer1WorkDateOfEnd": [JSONData.WorkedEmployerUKDateTo],
                                "Employer2WorkDateOfStart": [JSONData.WorkedEmployerUKDateFrom],  // dobut
                                "Employer2WorkDateOfEnd": [JSONData.WorkedEmployerUKDateTo],      // dobut
                                "PartnerOtherName": [JSONData.PartnerSurName],
                                "PartnerKnownOtherName": [JSONData.PartnerOtherName],
                                "PartnerInsuranceNumber": [JSONData.PartnerNINo],
                                "PartnerAddress": [JSONData.PartnerAddressUK],
                                "PartnerDOB": [JSONData.PartnerDateofBirth],
                                "DateOfMarriageOrCivilPartnershipFormation": [JSONData.PartnerDateofMarriage],
                                "DateOfDivorceOrAnnulmentOrCivilPartnershipDissolution": [JSONData.PartnerDateofDivorce],
                                "WhenPartnerDiedYouAreWidowedOrSurvivingCivilPartner": [JSONData.PartnerDateofBirth],
                                "YourBornAddress": [JSONData.CivilPartnerBirthAddress],
                                "FatherFullName": [JSONData.CivilPartnerFatherName],
                                "MotherFullName": [JSONData.CivilPartnerMotherName],
                                "MotherNameBeforeMarriage": [JSONData.CivilPartnerMotherNameBefore],
                                "MarriedAddress": [JSONData.PartnerMarriedAddress],
                                "WifeMaidenName": [JSONData.CivilPartnerMaidenName],
                                "PartnerFatherFullName": [JSONData.CivilPartnerHusbandFullName],
                                "MarriedAddress1": [JSONData.PartnerMarriedAddress],
                                "DivorcedAddress": [JSONData.PartnerDivorce],
                                "PetitionerFullName": [JSONData.PetitionarName],
                                // start 
                                "PartnerPlaceOfDeathAddress": [JSONData.PartnerDeathPlace],
                                "PartnerDeathRegisteredPlaceAndDate": [JSONData.PartnerDeathRegistration],

                                // insert field partner late husband death date 
                                "StatePensionClaimDate": [JSONData.PensionDateFrom],
                                "Employer1StaffPayrollNumberOrReferenceNumber": [JSONData.PetitionarName],
                                "Employer2StaffPayrollNumberOrReferenceNumber": [JSONData.PetitionarName],
                                "Employer2FirstWorkingDate": [JSONData.PetitionarName],
                                "Employer2LastWorkingDate": [JSONData.PetitionarName],
                                "Employer1FirstWorkingDate": [JSONData.PetitionarName],
                                "Employer1LastWorkingDate": [JSONData.PetitionarName],
                                // 
                                "NameOfBenefit2": [JSONData.PartnerBenefitName],
                                "Benefit2ReferenceNumber": [JSONData.PartnerBenefitRefNo],
                                "NameOfBenefit3": [JSONData.PetitionarName], // dobut.
                                // 
                                "Benefit3ReferenceNumber": [JSONData.PetitionarName], // douvt
                                "BenefitGettingIncreased": [JSONData.PartnerGettingBenefitIncreased],
                                "StateSocialSecurityNameAndAddress": [JSONData.PartnerGettingBenefitRefNo],
                                // 
                                "YourNationality": [JSONData.LivingOrWorkingOutSideUK],
                                "Country1LivedOrWorkedFrom": [JSONData.WorkingOutSideofUKDateFrom],
                                "Country1LivedOrWorkedTo": [JSONData.WorkingOutSideUKTo],
                                "SocialSecurityAuthorityNameAndAddress": [JSONData.WorkingOutSideCountryAddress],
                                ///  

                                // dbout
                                "Country2LivedOrWorkedFrom": [JSONData.WorkingOutSideofUKDateFrom],
                                "Country2LivedOrWorkedTo": [JSONData.WorkingOutSideofUKDateTo],
                                "Country1LivedOrWorkedIn": [JSONData.WorkingOutSideCountryName],
                                "Country2LivedOrWorkedIn": [JSONData.PetitionarName],
                                "NameAndAddressSocialSecurityNumberCountry2": [JSONData.WorkingOutSideCountryName],
                                "SocialSecurityReferenceNumberCountry1": [JSONData.WorkingOutSideCountryRefNo],
                                "SocialSecurityNumberCountry2": [JSONData.PetitionarName],  // refno in country 2

                                /// dobut.  
                                "NameOfHospital": [JSONData.PetitionarName],
                                "AddressAndPincodeOfHospital": [JSONData.PetitionarName],
                                "HospitalPhoneNumberCode": [JSONData.PetitionarName],
                                "HospitalPhoneNumber": [JSONData.PetitionarName],
                                "WardNameOrNumber": [JSONData.PetitionarName],
                                "DateWentToHospital": [JSONData.PetitionarName],
                                "DateCameOutOfHospital": [JSONData.PetitionarName],

                                // bank details 
                                "BankOrFinancialInstitutionFullName": [JSONData.BankName],
                                "BankOrFinancialInstitutionFullAddress": [JSONData.BankAddress],
                                "NameOfAccountHolder": [JSONData.BankAccountHolder],
                                "YourAccountNumber": [JSONData.BankAccountNumber],
                                "YourAccountType": [JSONData.AccountryType],
                                "BankOrBranchCode": [JSONData.PetitionarName],
                                "InternationalBankAccountNumber": [JSONData.BankAccountNumber],
                                "BankIdentificationNumber": [JSONData.BankIdentificationCode],
                                "OtherInformation": [JSONData.PetitionarName],  // dobut
                                "Signature": [JSONData.PetitionarName],   // doubt
                                "NameOfAccountHolderContinued1": [JSONData.BankAccountHolder],
                                "Document_ID": [JSONData.PetitionarName],
                            }
                        }
                    });
                });
                SaveDataAPICallMailSend(SaveDataFormURL, SavePensiondata)
                    .then((data) => {
                        notify.show("Your Pension application generated Successfully", "success", 3000);
                        // this.handleAppProcessFlowUpdate(this);
                        console.log("Pension application saved in s3 buckets", data);
                        let documentIdApi = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
                        let docData = {
                            QueryName: "PensionApplicantionDocGen",
                            UserID: emailresult
                        }
                        SaveDataAPICallMailSend(documentIdApi, docData)
                            .then((data) => {
                                this.setState({
                                    pensionDocumentId: data[0].VoluntaryEmpID
                                })
                                // Pension from link 
                                let AppDocUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
                                let AppDocTrackData = {
                                    QueryName: "CountryBasedDocumentsTrackDoc",
                                    UserID: emailresult,
                                    DocumentID: "75",
                                    DocumentCode: this.state.pensionDocumentId,
                                    CountryCode: "UK",
                                    IsSend: "NR",
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
                                            DownloadPensionAppFileLink: "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/" + emailresult + "/" + "paf_en.pdf"
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

    //Auto-Populated Function
    handleBenQusUKGeneralAuto(event) {
        var thisObj = this;
        let UserID;
        // let BenQusAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
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
            for (var i = 0; i < data.length; i++) {

                thisObj.setState({ Surname: data[i].LastName });
                if (data[i].LastName != "") {
                    thisObj.setState({ hSurename: true });
                }
                thisObj.setState({ FirstName: data[i].FirstName });
                if (data[i].FirstName != "") {
                    thisObj.setState({ hFirstName: true });
                }
                thisObj.setState({ MiddleName: data[i].MiddleName });
                if (data[i].MiddleName != "") {
                    thisObj.setState({ hMiddenName: true });
                }
                thisObj.setState({ Title: data[i].Title });
                if (data[i].Title != "") {
                    thisObj.setState({ hTitle: true });
                }
                var SureName = data[i].BirthName + '' + data[i].MaidenName;
                thisObj.setState({ MaidensureNameState: SureName })
                if (data[i].BirthName != "" || data[i].MaidenName != "") {
                    thisObj.setState({ hMaidensureNameState: true });
                }
                thisObj.setState({ Address: data[i].MailingAddress });
                if (data[i].MailingAddress != "") {
                    thisObj.setState({ hAddress: true });
                }
                thisObj.setState({ Phonenumber: data[i].PhoneNum });
                if (data[i].PhoneNum != "") {
                    thisObj.setState({ hPhonenumber: true });
                    thisObj.setState({ Nationalchecked: true });
                    thisObj.setState({ hCheckbox: true });
                }
                var varDOB = data[i].DOB_Month + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year;
                var DtDOB = new Date(varDOB);
                thisObj.setState({ DateOfBirthValue: DtDOB });
                if (data[i].DOB_Month != "" || data[i].DOB_Day != "" || data[i].DOB_Year != "") {
                    thisObj.setState({ hDateOfBirthValue: true });
                }
                thisObj.setState({ partnership: data[i].MaritalStatus });
                if (this.state.partnership != "S") {
                    thisObj.setState({ civilpartnersurname: data[i].PLastName });
                    thisObj.setState({ civilpartnerfirstname: data[i].PFirstName });
                    thisObj.setState({ civilpartnermiddlename: data[i].PMiddleName });
                    var varPDOB = data[i].PDOB_Month + "/" + data[i].PDOB_Day + "/" + data[i].PDOB_Year;
                    var DtPDOB = new Date(varPDOB);
                    thisObj.setState({ PartnerDateOfBirth: DtPDOB });
                    thisObj.setState({ liveUK: data[i].PMailingAddress });
                    if (this.state.partnership == "M" || this.state.partnership == "C" || this.state.partnership == "D" || this.state.partnership == "W") {
                        var DOM = data[i].DOMCDW_Month + "/" + data[i].DOMCDW_Day + "/" + data[i].DOMCDW_Year;
                        var DateDOM = new Date(DOM);
                        thisObj.setState({ DateofMarriage: DateDOM });
                        thisObj.setState({ sendmarriagecertificate: "Yes" });
                    }
                    if (this.state.partnership == "D") {
                        var DOD = data[i].DOMCDW_Month + "/" + data[i].DOMCDW_Day + "/" + data[i].DOMCDW_Year;
                        var DateDOD = new Date(DOD);
                        thisObj.setState({ DateofDivorce: DateDOD });
                        thisObj.setState({ annulment: "Yes" });
                    }
                    if (this.state.partnership == "W") {
                        var DOW = data[i].DOMCDW_Month + "/" + data[i].DOMCDW_Day + "/" + data[i].DOMCDW_Year;
                        var DateDOW = new Date(DOW);
                        thisObj.setState({ PartnerDiedDate: DateDOW });
                        thisObj.setState({ deathceritificate: "Yes" });
                    }
                }

                thisObj.setState({ Authority: data[i].Partner });
                thisObj.setState({ benefitauthority: data[i].Benefits });
                thisObj.setState({ waiting: data[i].GetBenefits });
                thisObj.setState({ referencebenefit: data[i].ReferenceNum });
                thisObj.setState({ namesocial: data[i].SSSecurity });
                thisObj.setState({ Addresssocial: data[i].SSSecurityAddress });
                thisObj.setState({ MaritalStatusState: data[i].MaritalStatus });
                thisObj.setState({ Nationality: data[i].CountryOfCitizenship });
                thisObj.setState({ livedCountry: data[i].CountryCode });
                thisObj.setState({ SecurityRefno: data[i].ReferenceNum });
                if (data[i].SSSecurity == null || data[i].SSSecurityAddress == null) {
                    thisObj.setState({ socialsecurityname: "" })
                }
                else {
                    thisObj.setState({ socialsecurityname: data[i].SSSecurity + " " + data[i].SSSecurityAddress });
                }
                //Condition
                thisObj.setState({ GenderState: data[i].Gender });
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
                        var kk = new Date(thisObj.state.DBOMonth + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year);
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
                        });
                    }
                );

            }
        }).catch((err) => {

        })
    }
    handleBenQusUKResidencyAuto(event) {
        var thisObj = this;
        let UserID;
        // let BenQusAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let BenQusAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusAutoJSONData = JSON.stringify({
            QueryName: "BenQusResidencyAuto",
            UserID: emailresult,
            CountryCode: "UK"
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
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ NationalInsuranceNumber: data[i].PersonalIDNum });
                if (data[i].PersonalIDNum != "") {
                    thisObj.setState({ hNationalInsuranceNumber: true });
                }
                if (data[i].CountryCode != "UK") {
                    thisObj.setState({ Changebenefit: "No" });
                    if (thisObj.state.Changebenefit == "No") {
                        thisObj.setState({ hChangebenefit: true });
                    }
                }
                else if (data[i].CountryCode == "UK" && data[i].Receiving == "Currently receiving") {
                    thisObj.setState({ Changebenefit: "Yes" });
                    if (thisObj.state.Changebenefit == "Yes") {
                        thisObj.setState({ hChangebenefit: true });
                    }
                    thisObj.setState({ BenefitClaim: data[i].Benefits });
                    if (data[i].Benefits != "") {
                        thisObj.setState({ hBenefitClaim: true });
                    }
                }
                else if (data[i].CountryCode == "UK" && data[i].Receiving == "Waiting to hear about this benefit") {
                    thisObj.setState({ Changebenefit: "" });
                    thisObj.setState({ BenefitWhoClaim: data[i].GetBenefits });
                    if (data[i].GetBenefits != "") {
                        thisObj.setState({ hBenefitWhoClaim: true });
                    }
                }
                else {
                    thisObj.setState({ Changebenefit: "" });
                    thisObj.setState({ BenefitClaim: "" });
                    thisObj.setState({ BenefitWhoClaim: "" });
                }
                if (data[i].ResCountry == "UK") {
                    thisObj.setState({ LivedOrWorkedKingdom: "Yes" })
                }
                if (this.state.LivedOrWorkedKingdom == "Yes") {
                    thisObj.setState({ hLivedOrWorkedKingdom: true });
                    thisObj.setState({ LastAddress: data[i].CurrentAddress });
                    if (data[i].CurrentAddress != "") {
                        thisObj.setState({ hLastAddress: true });
                    }
                    var DtLDOB = new Date(data[i].ResCountryBDate);
                    thisObj.setState({ LivedUKFrom: DtLDOB });
                    var DtTDOB = new Date(data[i].ResCountryEDate);
                    thisObj.setState({ LivedUKTo: DtTDOB })
                }
                if (data[i].ResCountry == "UK") {
                    thisObj.setState({ HMForces: "Yes" });
                }
                if (data[i].CompanyCode != "") {
                    thisObj.setState({ EmployerUK: "Yes" });
                }
                if (this.state.EmployerUK == "Yes") {
                    thisObj.setState({ currentAddress: data[i].CompanyCode + '/' + data[i].CompanyAddress });
                    thisObj.setState({ WorkedEmployerUKFrom: data[i].ResWorkBDate });
                    thisObj.setState({ WorkedEmployerUKTo: data[i].ResWorkEDate });
                }
                if (data[i].CountryCode != "UK") {
                    thisObj.setState({ benefitpensionage: "No" });
                }
                if (data[i].CountryCode == "UK" && data[i].Receiving == "Currently receiving") {
                    thisObj.setState({ benefitpensionage: "Yes" });
                }
                thisObj.setState({ ConditionalState: data[i].CountryCode });
            }
        }).catch((err) => {

        })
    }


    //Page Rendering
    render() {
        const { value, search, currentAddress, search1, Address, search2, LastAddress, search3, civilpartneraddress, search4, birthaddress, search5, partneraddress, search6, employersaddress, search7, Addresssocial, search8, socialsecurityaddress } = this.state
        const google = window.google;
        return (
            <div>
                <Paper>
                    <h2 className="legendtitle">United Kingdom Form</h2>
                    <div className="fieldstyle">
                        <Row className="show-grid" className="overall">
                            <Col xs={12} md={12}>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} >
                                        <h4 className="ColorStyle"><b>About your husband, wife or civil partner</b></h4>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12} >
                                    <Col xs={12} md={12} className="input-fileds align-fileds">
                                        <label>Other than your spouse/partner's present name, please list any other names used in the past (if applicable)</label>
                                        <TextField hintText="Enter the Other than your spouse/partner's name"
                                            value={this.state.othername}
                                            onChange={this.handlechangeothername}
                                        //errorText={this.state.isValidPOtherName ? "Please enter your other name" : ""}
                                        />
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} className="input-fileds align-fileds">
                                        <label>If your spouse/partner previously lived in the U.K., please provide his/her National Insurance number if you know it</label>
                                        <TextField hintText="Enter the spouse/partner national insurance number"
                                            value={this.state.civilpartnerNI}
                                            onChange={this.handlechangeCivilpartnerNI}
                                        // errorText={this.state.isValidNationalInsNum ? "Please enter your national insurance number" : ""} 
                                        />
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} >
                                        <h4 className="ColorStyle"><b>When to claim State Pension</b></h4>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} className="input-fileds align-fileds">
                                        <label>What date do you want to begin claiming your State Pension?<span className="manatoryfield">*</span> </label>
                                        <DatePicker hintText="Enter the date do you want to begin claiming your State Pension"
                                            value={this.state.DateofStatePensionFrom}
                                            onChange={this.handlerDateofStatePensionFrom}
                                            errorText={this.state.isValidDateofStatePension ? "Please select what date do you want to claim your state pension" : null}
                                        />
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} >
                                        <h4 className="ColorStyle"><b>Living or working outside the United Kingdom</b></h4>
                                    </Col>
                                </Col>
                                {(this.state.ConditionalState == "UK") ?
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={8} className="Radio_button">
                                            <label>While you lived or worked in United Kingdom, did you pay into the social security scheme of that country?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.securityscheme} onChange={this.handlesecurityscheme.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidsecurityscheme ? "Please select did you pay into the social security scheme of that country " : null}</span>
                                        </Col>
                                    </Col>
                                    : ""}
                                {this.state.ConditionalState != "UK" ?
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={8} className="Radio_button">
                                            <label>Did you pay into the social security scheme of that country?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.securityscheme} onChange={this.handlesecurityscheme.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidsecurityscheme ? "Please select did you pay into the social security scheme of that country " : null}</span>
                                        </Col>
                                    </Col>
                                    : ""}
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={8} className="input-fileds align-fileds">
                                        <label>Name and Address of Social Security Authority in United Kingdom</label>
                                        <TextField hintText="Enter Name and Address of Social Security Authority"
                                            value={this.state.socialsecurityname}
                                            onChange={this.handlechangesocialsecurityname}
                                        //errorText={this.state.isValidsocialsecurityaddress ? "Please enter name of SSA" : null}
                                        />
                                    </Col>

                                    {/* <Col xs={6} md={6} className="input-fileds align-fileds">
                                        <label>Address of Social Security Authority<span className="manatoryfield">*</span></label>
                                        <Geosuggest
                                            placeholder="Current Mailing Address"
                                            initialValue={this.state.socialsecurityaddress}
                                            onSuggestSelect={this.handleSelectSuggestSocialsecurity.bind(this)}
                                            onChange={this.handlechangesocialsecurityaddress}
                                            value={this.state.socialsecurityaddress}
                                            location={new google.maps.LatLng("", "")}
                                            radius="20"
                                        />
                                        <span className="validationmsg">{this.state.isValidsocialsecurityaddress ? "Please enter the address of social security authority" : null}</span>
                                    </Col> */}
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} >
                                        <h4 className="ColorStyle"><b>Bank Deposit information for the UK asks for in order to pay you</b></h4>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={6} md={6} className="input-fileds align-fileds">
                                        <label>Your bank or financial institution’s full name<span className="manatoryfield">*</span></label>
                                        <TextField hintText="Enter Bank or Financial Insitution Name"
                                            value={this.state.bankname}
                                            onChange={this.handlechangebankname}
                                            errorText={this.state.isValidbankname ? "Please enter the bank or finance institution name" : null}
                                        />
                                    </Col>
                                    <Col xs={6} md={6} className="input-fileds align-fileds">
                                        <label>Your bank or financial institution’s Address<span className="manatoryfield">*</span></label>
                                        <TextField hintText="Enter Bank or Financial Insitution Address"
                                            value={this.state.bankAddress}
                                            onChange={this.handlechangebankAddress}
                                            errorText={this.state.isValidbankAddress ? "Please enter the address" : null}
                                        />
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={6} md={6} className="input-fileds align-fileds">
                                        <label>Name of the account holder<span className="manatoryfield">*</span></label>
                                        <TextField hintText="Enter Account Holder Name"
                                            value={this.state.Accountholder}
                                            onChange={this.handlechangeAccountholder}
                                            errorText={this.state.isValidAccountholder ? "Please enter account holder name" : null}
                                        />
                                    </Col>
                                    <Col xs={6} md={6} className="input-fileds align-fileds">
                                        <label>Account number<span className="manatoryfield">*</span></label>
                                        <TextField hintText="Enter Account Number"
                                            value={this.state.Accountno}
                                            onChange={this.handlechangeAccountno}
                                            errorText={this.state.isValidAccountno ? "Please enter the account number" : null}
                                        />
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={6} md={6} className="input-fileds align-fileds">
                                        <label>Account Type<span className="manatoryfield">*</span></label>
                                        <TextField hintText="Enter Account Type"
                                            value={this.state.AccountType}
                                            onChange={this.handlechangeAccounttype}
                                            errorText={this.state.isValidAccountType ? "Please enter the account type" : null}
                                        />
                                    </Col>
                                    <Col xs={6} md={6} className="input-fileds align-fileds">
                                        <label>Bank/branch code fill in from the left<span className="manatoryfield">*</span></label>
                                        <TextField hintText="Enter branch code"
                                            value={this.state.branchcode}
                                            onChange={this.handlechangebranchcode}
                                            errorText={this.state.isValidbranchcode ? "Please enter branch code" : null}
                                        />
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={6} md={6} className="input-fileds align-fileds">
                                        <label>International Bank Account Number (IBAN)<span className="manatoryfield">*</span></label>
                                        <TextField hintText="Enter International Bank Account Number (IBAN)"
                                            value={this.state.IBAN}
                                            onChange={this.handlechangeIBAN}
                                            errorText={this.state.isValidIBAN ? "Please enter an international bank account number" : null}
                                        />
                                    </Col>
                                    <Col xs={6} md={6} className="input-fileds align-fileds">
                                        <label>Bank Identification Code (BIC)<span className="manatoryfield">*</span></label>
                                        <TextField hintText="Enter Bank Identification Code (BIC)"
                                            value={this.state.BIC}
                                            onChange={this.handlechangeBIC}
                                            errorText={this.state.isValidBIC ? "Please enter the bank identification code" : null}
                                        />
                                    </Col>
                                </Col>

                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} >
                                        <h4 className="ColorStyle"><b>Other information</b></h4>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={6} className="Radio_button">
                                        <label>I would like to be paid at the end of every</label>
                                        <RadioButtonGroup valueSelected={this.state.paybyweek} onChange={this.handleChangepaybyweek.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                            <RadioButton
                                                value="4Weeks"
                                                label="4 Weeks"
                                                style={style.radioButton}
                                            />
                                            <RadioButton
                                                value="13weeks"
                                                label="13 weeks"
                                                style={style.radioButton}
                                            />
                                        </RadioButtonGroup >
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} className="input-fileds align-fileds">
                                        <label>Use this space to tell us anything else you think we might need to know.</label>
                                        <TextField hintText="Enter Anything"
                                            value={this.state.anythingknow}
                                            onChange={this.handlechangeanythingknow}
                                        />
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                        <label>Form Date<span className="manatoryfield">*</span></label>
                                        <DatePicker
                                            hintText="Select the signed date"
                                            value={this.state.StartAndEndDate}
                                            onChange={this.handlerStartAndEndDate}
                                            errorText={this.state.isValidDateSigned ? "Please select from date and to date" : null}
                                        />
                                    </Col>
                                    <Col xs={12} md={5}>
                                    </Col>
                                    <Col xs={12} md={3} className="input-fileds Sign" >
                                        <label className="TopicAlign"><b>Signature</b></label>
                                        <SignaturePad ref={ref => this.signaturePad = ref} />
                                        <Button id="clear" className="ClearBtn" onClick={this.handleSignatureClear.bind(this)}>Clear</Button>
                                        <span className="validationmsg">{this.state.isValidSignature ? "Please sign your signature" : ""}</span>

                                    </Col>
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={12} className="input-fields">
                                    <Button onClick={this.handlerSubmit.bind(this)} className="RQ-Add" >{this.state.BtnNameState}</Button>
                                    <Notifications />
                                </Col>
                            </Col>
                        </Row>
                    </div>
                </Paper>
            </div>
        );
    }

    //Flow Upadte Function
    handleAppProcessFlowUpdate(event) {
        // let AppProFlowAPIUrl = "https://qxredca9lk.execute-api.us-west-2.amazonaws.com/Dev/GPA_AppProcessFlowDatas_Lambda";
        let AppProFlowAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify({
            QueryName: "ApplicantProcessFlowTrackingUpdateBQP2",
            UserID: emailresult,
            BenQusPart2: "C"
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
            history.push('/ApplicantDashboard');
        }).catch((err) => {
            // alert("Please Fill Mandatory Fields");
        })
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
        e.preventDefault();
        var isValid = this.validateFormField();
        let NationalOrLocalCode = "";
        if (this.state.Nationalchecked != "") {
            NationalOrLocalCode = this.state.Nationalchecked;
        } else {
            NationalOrLocalCode = this.state.Localchecked;
        }
        var Queryvalue;
        if (this.state.BtnNameState == "Save") {
            Queryvalue = "BenefitsQuestionnariesPart2Save";
        }
        else {
            Queryvalue = "BenefitsQuestionnariesPart2Update";
        }
        if (isValid) {
            let residendyData = {
                //QueryName: "Save",
                //QueryName: "BenefitsQuestionnariesCountryInGPASave",
                QueryName: Queryvalue,
                UserID: emailresult,
                BenQusCNIGPAID: this.state.Benefitid,
                AppAnsInJsonObj:
                {
                    NationalInsuranceNumber: this.state.NationalInsuranceNumber,
                    NIHaveUsed: this.state.NInumber,
                    SurName: this.state.Surname,
                    FirstName: this.state.FirstName,
                    MiddleName: this.state.MiddleName,
                    Title: this.state.Title,
                    MaidensureName: this.state.MaidensureNameState,
                    Address: this.state.Address,
                    Phonenumber: this.state.Phonenumber,
                    NationalOrLocalNo: NationalOrLocalCode,
                    DateOfBirth: this.state.DateOfBirthValue,
                    SendingBirthCertificateWithThisForm: this.state.Birthcertificate,
                    CivilPartnerClaimedBenefitUK: this.state.Changebenefit,
                    CivilPartnerClaimedBenefit: this.state.BenefitClaim,
                    CivilPartnerClaimedPerson: this.state.BenefitWhoClaim,
                    LivedOrWorkedUK: this.state.LivedOrWorkedKingdom,
                    LastAddressUK: this.state.LastAddress,
                    LivedUKFromDate: this.state.LivedUKFrom,
                    LivedUKToDate: this.state.LivedUKTo,
                    SpentTimeUKFrom: this.state.SpentTimeUKFrom,
                    SpentTimeUKTo: this.state.SpentTimeUKTo,
                    HMForces: this.state.HMForces,
                    HMServices: this.state.servicepartin,
                    HMServiceEnlistedDate: this.state.EnlistedDate,
                    HMServiceDischarge: this.state.discharged,
                    HMServiceRegiment: this.state.Regiment,
                    HMServiceNo: this.state.Servicenumber,
                    HMServiceRank: this.state.rank,
                    WorkedEmployerUK: this.state.EmployerUK,
                    WorkedUKEmployerName: this.state.Empnameaddress,
                    WorkedUKEmployerFrom: this.state.MotherLastName,
                    WorkedEmployerUKDateFrom: this.state.WorkedEmployerUKFrom,
                    WorkedEmployerUKDateTo: this.state.WorkedEmployerUKTo,
                    WorkedEmployerReferenceNo: this.state.Referencenumber,
                    WorkedEmployerContribution: this.state.contribution,
                    MaritalStatus: this.state.partnership,
                    PartnerSurName: this.state.civilpartnersurname,
                    PartnerFirstName: this.state.civilpartnerfirstname,
                    PartnerMiddleName: this.state.civilpartnermiddlename,
                    PartnerOtherName: this.state.othername,
                    PartnerNINo: this.state.civilpartnerNI,
                    PartnerLiveOrWorkUK: this.state.liveUK,
                    PartnerAddressUK: this.state.civilpartneraddress,
                    PartnerDateofBirth: this.state.PartnerDateOfBirth,
                    PartnerDateofMarriage: this.state.DateofMarriage,
                    PartnerDateofDivorce: this.state.DateofDivorce,
                    PartnerDiedDate: this.state.PartnerDiedDate,
                    SendMarriagePartnerCertificateFrom: this.state.sendmarriagecertificate,
                    CivilPartnerDivorceCertificate: this.state.annulment,
                    CivilPartnerDeathCertificate: this.state.deathceritificate,
                    CivilPartnerBirthAddress: this.state.birthaddress,
                    CivilPartnerFatherName: this.state.fathersName,
                    CivilPartnerMotherName: this.state.MothersName,
                    CivilPartnerMotherNameBefore: this.state.MothersNamebefore,
                    CivilPartnerMarriedPlace: this.state.partneraddress,
                    CivilPartnerMaidenName: this.state.maidenname,
                    CivilPartnerMaidenSurName: this.state.maidensurname,
                    CivilPartnerHusbandFullName: this.state.maidenFullname,
                    PartnerMarriedAddress: this.state.Partnermarried,
                    PartnerDivorce: this.state.partnerdivorce,
                    PetitionarName: this.state.petitionername,
                    PartnerDeathPlace: this.state.Placedeath,
                    PartnerDeathRegistration: this.state.deathregistration,
                    PensionDateFrom: this.state.DateofStatePensionFrom,
                    SelfEmployedUK: this.state.selfemployed,
                    PayingReducedRate: this.state.reducedrate,
                    PensionAge: this.state.pensionage,
                    DidPayContributionEmployer: this.state.paycontributions,
                    PayContributionEmployerName: this.state.employersname,
                    PayContributionEmployerAddress: this.state.employersaddress,
                    PayContributionEmployerRefNo: this.state.payroll,
                    PayContributionStartedWork: this.state.DateofStartedWork,
                    PayContributionStoppedWork: this.state.DateofStoppedWork,
                    DidPartnerGettingBenefitUK: this.state.benefitpensionage,
                    PartnerBenefitName: this.state.benefitname,
                    PartnerWhoReceiveBenefit: this.state.receivebenefit,
                    PartnerBenefitRefNo: this.state.benefitrefno,
                    PartnerBenefitUK: this.state.benefituk,
                    PartnerGettingBenefitIncreased: this.state.benefitincrease,
                    PartnerGettingBenefitRefNo: this.state.Referencenumberbenefit,
                    HaveReceivedChildBenefitUK: this.state.childbenefit,
                    WaitingForAnyBenefit: this.state.Authority,
                    WaitingForBenefitAuthorityName: this.state.benefitauthority,
                    WaitingForBenefitPerson: this.state.waiting,
                    WaitingForBenefitPersonRefNo: this.state.referencebenefit,
                    WaitingForBenefitPersonSSA: this.state.namesocial,
                    WaitingForBenefitPersonAddress: this.state.Addresssocial,
                    LivingOrWorkingOutSideUK: this.state.Nationality,
                    CountryLiveOrWork: this.state.liveorwork,
                    LivedCountry: this.state.livedCountry,
                    WorkingOutSideofUKDateFrom: this.state.WorkingOutSideUKFrom,
                    WorkingOutSideofUKDateTo: this.state.WorkingOutSideUKTo,
                    DidPaySecuritySchemeCurrentCountry: this.state.securityscheme,
                    WorkingOutSideCountryRefNo: this.state.SecurityRefno,
                    WorkingOutSideCountryName: this.state.socialsecurityname,
                    WorkingOutSideCountryAddress: this.state.socialsecurityaddress,
                    HospitalINUK: this.state.Hospital,
                    hospitalDetailUK: this.state.hospitaldetails,
                    BankName: this.state.bankname,
                    BankAddress: this.state.bankAddress,
                    BankAccountHolder: this.state.Accountholder,
                    BankAccountNumber: this.state.Accountno,
                    AccountryType: this.state.AccountType,
                    BankBanchCode: this.state.branchcode,
                    InternationalBankAccNo: this.state.IBAN,
                    BankIdentificationCode: this.state.BIC,
                    WouldPayEvery: this.state.paybyweek,
                    TellUsAnyting: this.state.anythingknow,
                    SignDate: this.state.StartAndEndDate,
                },
                CountryCode: "UK",
                BQP2AnsStatus: "C",
            }
            let thisObj = this;
            let tempCountryOutput = [];
            //let countryApiUrl = " https://4k73oeispk.execute-api.us-west-2.amazonaws.com/dev/GPA_BenQusDatas_Lambda";
            let countryApiUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
            //let countryApiUrl = "https://4k73oeispk.execute-api.us-west-2.amazonaws.com/dev/GPA_BenQusDatas_Lambda";
            console.log("Data2", JSON.stringify(residendyData));
            axios({
                method: "POST",
                url: countryApiUrl,
                data: JSON.stringify(residendyData),

            }).then(({ data }) => {
                if (this.state.BtnNameState == "Save") {
                    notify.show("Your Part2 Information Saved Successfully", "success", 3000);
                    //thisObj.handleSendBilateralForms(this);
                    thisObj.handleSendDocumentMail(this);
                    thisObj.handleSavePensionData(this);
                    this.props.MailSends();
                }
                else {
                    notify.show("Updated Successfully", "success", 3000);
                    thisObj.handleRedirect(this);
                }

            }).catch((err) => {

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

export default connect(mapReducerStateToProps, mapDispatchToProps)(BenQusUK);