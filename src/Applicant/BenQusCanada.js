import React, { Component } from 'react';
import PropTypes from "prop-types";
//Bootstrap Component
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

//API Calling Methods
import axios from 'axios';

//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Notification 
import Notifications, { notify } from 'react-notify-toast';
var emailresult;
const API_KEY = "AIzaSyADGT_Xy9rtzFPhH-m0VG5cWL-hi0sK5jA";

const BenefitStatus = [
    <MenuItem value={"Retirement/Old-Age"} key={1} primaryText="Retirement/Old-Age" />,
    <MenuItem value={"Disability or Sickness/Invalidity"} key={2} primaryText="Disability or Sickness/Invalidity" />,
    <MenuItem value={"Survivors"} key={3} primaryText="Survivors" />,
    <MenuItem value={"Other"} key={4} primaryText="Other" />,
];

const MaritalStatusItems = [
    <MenuItem value={"S"} key={1} primaryText={`Single`} />,
    <MenuItem value={"M"} key={2} primaryText={`Married`} />,
    <MenuItem value={"C"} key={3} primaryText={`Civil Partnership`} />,
    <MenuItem value={"D"} key={4} primaryText={`Divorced`} />,
    <MenuItem value={"W"} key={5} primaryText={`Widowed`} />,
];

const SuffixItems = [
    <MenuItem value={"Mr."} key={1} primaryText={`Mr.`} />,
    <MenuItem value={"Mrs."} key={2} primaryText={`Mrs.`} />,
    <MenuItem value={"Miss."} key={3} primaryText={`Miss.`} />,
    <MenuItem value={"Ms."} key={4} primaryText={`Ms.`} />,
];

const PensionStart = [
    <MenuItem value={" As soon as I qualify "} key={1} primaryText={` As soon as I qualify `} />,
    <MenuItem value={"As of (indicate a date)"} key={2} primaryText={`As of (indicate a date)`} />,
    <MenuItem value={"YYYY-MM"} key={3} primaryText={`YYYY-MM`} />,
];

const YesOrNo = [
    <MenuItem value={"Yes"} key={1} primaryText={`Yes`} />,
    <MenuItem value={"No"} key={2} primaryText={`No`} />,
];

const Language = [
    <MenuItem value={"English"} key={1} primaryText={`English`} />,
    <MenuItem value={"Canada"} key={2} primaryText={`Canada`} />,
    <MenuItem value={"Chinese"} key={3} primaryText={`Chinese`} />,
    <MenuItem value={"Japnese"} key={4} primaryText={`Japnese`} />,
    <MenuItem value={"Italy"} key={5} primaryText={`Italy`} />,
    <MenuItem value={"Danish"} key={6} primaryText={`Danish`} />,
    <MenuItem value={"France"} key={7} primaryText={`France`} />,
];

const LivingIn = [
    <MenuItem value={"Canadian Citizen"} key={1} primaryText={`Canadian Citizen`} />,
    <MenuItem value={"Temporary residence permit holder"} key={2} primaryText={`Temporary residence permit holder`} />,
    <MenuItem value={"Permenant resident"} key={3} primaryText={`Permenant resident`} />,
    <MenuItem value={"Other"} key={4} primaryText={`Other`} />,
];

const TitleItems = [
    <MenuItem value={"Mr."} key={1} primaryText={`Mr.`} />,
    <MenuItem value={"Mrs."} key={2} primaryText={`Mrs.`} />,
    <MenuItem value={"Miss."} key={3} primaryText={`Miss.`} />,
    <MenuItem value={"Ms."} key={4} primaryText={`Ms.`} />,
    <MenuItem value={"Dr."} key={5} primaryText={`Dr.`} />
];

const Dates = [
    <DatePicker />
]

const newstyle = {
    marginTop: 10,
}

const style = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
        marginTop: 8
    },
};

const ResHistory = [];

const BenefitsCountry = [];

const CountryItems = [];



class BenQusCanada extends Component {
    constructor(props) {
        super(props);
        this.handleLoadCountry(this);
        this.handleBenQusCanadaAuto(this);

        //Field State Values Initialization
        this.state = {
            BtnNameState: "Save",
            CountryCode: "CA",
            validationError: {},
            SINState: '',
            isValidSIN: false,
            SuffixState: '',
            isValidSuffix: false,
            NameState: '',
            NameAtBirthState: '',
            DOBState: '',
            CountryOfBirthState: '',
            ProvinceState: '',
            LanguageState: "English",
            HomeAddressState: '',
            CityState: '',
            TerritoryState: '',
            CountryState: '',
            PostalCodeState: '',
            TelephoneState: '',
            MailingAddressState: '',
            isVallidMailingAddress: false,
            TownState: '',
            ProvinceTerritoryState: '',
            MCountryState: '',
            MPostalState: '',
            ApplicantAge: '',
            ApplicantAgeMonth: '',
            // Payment Information
            BranchNumberState: '',
            isValidBranchNumber: false,
            InstitutionState: '',
            isValidInstitution: false,
            AccountNumberState: '',
            isValidAccountNumber: false,
            NameAccountState: '',
            isValidNameAccount: false,
            TelephoneInstituteState: '',
            isValidTelePhoneInstitution: false,
            //Spouse information
            MaritalStatusState: "",
            SpouseNameState: '',
            SpouseDOBState: "",
            SpouseSINState: 'Unknown',
            isValidSpouseName: false,
            isValidSpouseSIN: false,
            PensionStartState: 'As soon as I qualify',
            isValidPensionStart: false,
            PensionDateState: '',
            AgeSecurityState: 'No',
            YesOrNoState: 'Yes',
            //living info
            livingState: '',
            isValidLiving: false,
            livingOutSideState: '',
            isValidLivingOutSide: false,
            //outside info
            DateEnteredState: '',
            isValidDateEntered: false,
            CityEnteredState: '',
            isValidCityEntered: false,
            //Residency histroy
            PeriodFromState: '',
            PeriodToState: '',
            CountryListState: '',
            //Benefits from other countries
            BenefitCountryState: '',
            LivedFrmState: '',
            LivedToState: '',
            PrdWorkFrmState: '',
            PrdWorkedToState: '',
            InsuranceNumberState: '',
            AnyBenifitsState: '',
            //IncomeTax
            incomeTaxState: '',
            federalState: '',
            TaxState: '',
            TitleState: '',
            ContactNameState: '',
            TelephonenumberState: '',
            ContactMailingAddressState: '',
            CPostalCodeState: '',
            SpecificDate: '',
            isValidIncomeTax: false,
            isValidFederal: false,
            isValidTax: false,
            ConditionState: "",
            OtherState: "",
            OtherOutState: "",
        }
    }

    componentDidMount(){
        emailresult = localStorage.getItem('applicant_email');
    }
    //Handle Event
    handleChangeSIN(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            this.setState({ SINState: onlyNums });
        }
    };

    handleChangeSuffix = (event, index, value) => {
        this.setState({ SuffixState: value });
    };

    handleChangeName(e) {
        this.setState({ NameState: e.target.value });
    };

    handleChangeNameAtBirth(e) {
        this.setState({ NameAtBirthState: e.target.value });
    };

    handleChangeDOB(e, date) {
        this.setState({ DOBState: date });
    };

    handleChangeCountryOfBirth = (event, index, value) => {
        this.setState({ CountryOfBirthState: value });
    };

    handleChangeProvince(e) {
        this.setState({ ProvinceState: e.target.value });
    };

    handleChangeLanguage = (event, index, value) => {
        this.setState({ LanguageState: value });
    };

    handleChangeHomeAddress(e) {
        this.setState({ HomeAddressState: e.target.value });
    };
    
    handleChangeCity(e) {
        this.setState({ CityState: e.target.value });
    };

    handleChangeTerritory(e) {
        this.setState({ TerritoryState: e.target.value });
    };

    handleChangeCountry(e) {
        this.setState({ CountryState: e.target.value });
    };

    handleChangePostalCode(e) {
        this.setState({ PostalCodeState: e.target.value });
    };

    handleChangeTelephone(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ TelephoneState: onlyNums });
        }
    };

    handleChangeMailingAddress(e) {
        this.setState({ MailingAddressState: e.target.value });
    };

    handleChangeTown(e) {
        this.setState({ TownState: e.target.value });
    };

    handleChangeProvinceTerritory(e) {
        this.setState({ ProvinceTerritoryState: e.target.value });
    };

    handleChangeMCountry(e) {
        this.setState({ MCountryState: e.target.value });
    };

    handleChangePostal(e) {
        this.setState({ MPostalState: e.target.value });
    };

    handleChangeBranchNum(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 6) {
            this.setState({ BranchNumberState: onlyNums });
        }
    };

    handleChangeInstitution(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 4) {
            this.setState({ InstitutionState: onlyNums });
        }
    };

    handleChangeAccountNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 13) {
            this.setState({ AccountNumberState: onlyNums });
        }
    };

    handleChangeNameAccount(e) {
        this.setState({ NameAccountState: e.target.value });
    };

    handleChangeTelephoneInstitute(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ TelephoneInstituteState: onlyNums });
        }
    };

    handleChangeSpouse(e) {
        this.setState({ SpouseNameState: e.target.value });
    };

    handleChangeSpouseDOB(e, date) {
        this.setState({ SpouseDOBState: date });
    };

    handleChangeSpouseSIN(e) {
        this.setState({ SpouseSINState: e.target.value });
    };

    handleChangePensionStart = (event) => {
        this.setState({ PensionStartState: event.target.value });
    };

    handleChangePensionDate = (event, date) => {
        this.setState({ PensionDateState: date });
    };

    handleChangeMaritalStatus = (event, index, value) => {
        this.setState({ MaritalStatusState: value });
    };

    handleChangeYesOrNo = (event) => {
        this.setState({ YesOrNoState: event.target.value });
    };

    handleChangeLiving = (event, index, value) => {
        this.setState({ livingState: value });
    };

    handleChangeLivingOutSide = (event, index, value) => {
        this.setState({ livingOutSideState: value });
    };

    handleChangeDateEntered(e, date) {
        this.setState({ DateEnteredState: date });
    };

    handleChangeCityEntered(e) {
        this.setState({ CityEnteredState: e.target.value });
    };

    handleChangePeriodFrom(e, date) {
        this.setState({ PeriodFromState: date });
    };

    handleChangePeriodTo(e, date) {
        const { validationError } = this.state;
        this.setState({ PeriodToState: date }, function () {
            if (this.state.PeriodFromState > this.state.PeriodToState) {
                this.setState({ ValidateYearPeriod: true });
            } else {
                this.setState({ ValidateYearPeriod: false });
            }
        });
    };

    handleChangeCountryList(event, index, value) {
        this.setState({ CountryListState: value });
    };

    handleChangeBenefitCountry(event, index, value) {
        this.setState({ BenefitCountryState: value });
    };

    handleChangeLivedFrm(e, date) {
        this.setState({ LivedFrmState: date });
    };

    handleChangeLivedTo(e, date) {
        const { validationError } = this.state;
        this.setState({ LivedToState: date }, function () {
            if (this.state.LivedFrmState > this.state.LivedToState) {
                this.setState({ ValidateYear: true });
            } else {
                this.setState({ ValidateYear: false });
            }
        });
    };

    handleChangePeriodWorkedFrom(e, date) {
        this.setState({ PrdWorkFrmState: date });
    };

    handleChangePeriodWorkedTo(e, date) {
        const { validationError } = this.state;
        this.setState({ PrdWorkedToState: date }, function () {
            if (this.state.PrdWorkFrmState > this.state.PrdWorkedToState) {
                this.setState({ ValidateYearWorked: true });
            } else {
                this.setState({ ValidateYearWorked: false });
            }
        });
    };

    handleChangeInsuranceNo(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 12) {
            this.setState({ InsuranceNumberState: onlyNums });
        }
    };

    handleChangeAnyBenifits(e) {
        this.setState({ AnyBenifitsState: e.target.value });
    };

    handleChangeIncomeTax = (event) => {
        this.setState({ incomeTaxState: event.target.value });
    };

    handleChangeTax = (event) => {
        this.setState({ TaxState: event.target.value });
    };

    handleChangeTitle = (event, index, value) => {
        this.setState({ TitleState: value });
    };

    handleChangeFederal(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 3) {
            this.setState({ federalState: onlyNums });
        } else if (onlyNums.length === 3) {
            const number = onlyNums.replace(/(\d{2})(\d{1})/, '$1.$2');
            this.setState({ federalState: number + "%"});
        }
    };

    handleChangeContactName(e) {
        this.setState({ ContactNameState: e.target.value });
    };

    handleChangeTelephonenumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ TelephonenumberState: onlyNums });
        }
    };

    handleChangeContactMailingAddress(e) {
        this.setState({ ContactMailingAddressState: e.target.value });
    };

    handleChangeCPostalCode(e) {
        const onlyNums = e.target.value.replace(/(?=.*[A-Z])(?=.*[0-9])/, '');
        if (onlyNums.length < 7) {
            this.setState({ CPostalCodeState: onlyNums.toUpperCase() });
        }
    };

    handleChangeAgeSecurity = (event) => {
        this.setState({ AgeSecurityState: event.target.value });
    };

    handleChangeSpecificDate(e, date) {
        this.setState({ SpecificDate: date });
    };

    handleChangeOther(e) {
        this.setState({ OtherState: e.target.value });
    };

    handleChangeOtherOut(e) {
        this.setState({ OtherOutState: e.target.value });
    };

    //Flow Update Function
    handleAppProcessFlowUpdate(event) {
        let AppProFlowAPIUrl = "https://qxredca9lk.execute-api.us-west-2.amazonaws.com/Dev/GPA_AppProcessFlowDatas_Lambda";
        let JSONData = JSON.stringify({
            QueryName: "UpdateBQP2",
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
            
        })
    }

    //Load Country List Function
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

    //Auto-Populated Function
    handleBenQusCanadaAuto(event) {
        var thisObj = this;
        let UserID;
        //let BenQusAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let BenQusAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusAutoJSONData = JSON.stringify({
            QueryName: "Auto",
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
                thisObj.setState({ SuffixState: data[i].Title });
                thisObj.setState({ NameState: data[i].FirstName + " " + data[i].MiddleName + " " + data[i].LastName });
                thisObj.setState({ NameAtBirthState: data[i].BirthName });
                thisObj.setState({ MailingAddressState: data[i].MailingAddress });
                thisObj.setState({ HomeAddressState: data[i].HomeAddress });
                var varDOB = data[i].DOB_Month + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year;
                var DtDOB = new Date(varDOB);
                thisObj.setState({ DOBState: DtDOB });
                thisObj.setState({ CountryOfBirthState: data[i].CountryOfCitizenship });
                thisObj.setState({ NameAccountState: data[i].FirstName + " " + data[i].MiddleName + " " + data[i].LastName });
                thisObj.setState({ ConditionState: data[i].EligibleCountry });
                thisObj.setState({ MaritalStatusState: data[i].MaritalStatus });
                if (data[i].MaritalStatus == "M") {
                    thisObj.setState({ SpouseNameState: data[i].PFirstName + data[i].PMiddleName + data[i].PLastName });
                    var varDOB = data[i].PDOB_Month + "/" + data[i].PDOB_Day + "/" + data[i].PDOB_Year;
                    var DtPDOB = new Date(varDOB);
                    thisObj.setState({ SpouseDOBState: DtPDOB });
                    // var varSIN = "Unknow"
                    // thisObj.setState({ SpouseSINState : varSIN});
                }
                if (this.state.YesOrNoState != "Yes") {
                    var varFDOB = data[i].ResCountry_BMonth + "/" + "01" + "/" + data[i].ResCountry_BYear;
                    var DtFDOB = new Date(varFDOB);
                    thisObj.setState({ DateEnteredState: DtFDOB });
                    var varLDOB = data[i].ResCountry_BMonth + "/" + "01" + "/" + data[i].ResCountry_BYear;
                    var DtLDOB = new Date(varLDOB);
                    thisObj.setState({ PeriodFromState: DtLDOB });
                    var varEDOB = data[i].ResCountry_EMonth + "/" + "01" + "/" + data[i].ResCountry_EYear;
                    var DtTDOB = new Date(varEDOB);
                    thisObj.setState({ PeriodToState: DtTDOB });
                    thisObj.setState({ CountryListState: data[i].CountryOfCitizenship });
                    var varOLDOB = data[i + 1].ResCountry_BMonth + "/" + "01" + "/" + data[i + 1].ResCountry_BYear;
                    var DtOLDOB = new Date(varOLDOB);
                    thisObj.setState({ LivedFrmState: DtOLDOB });
                    var varOEDOB = data[i + 1].ResCountry_EMonth + "/" + "01" + "/" + data[i + 1].ResCountry_EYear;
                    var DtOTDOB = new Date(varOEDOB);
                    thisObj.setState({ LivedToState: DtOTDOB });
                    thisObj.setState({ BenefitCountryState: data[i + 1].CountryOfCitizenship });
                }
            }
        }).catch((err) => {
            
        })
    }

    //Save Function
    handleBenQusCanadaSave(event) {
        var thisObj = this;
        //let BenQusAPIUrl = "https://4k73oeispk.execute-api.us-west-2.amazonaws.com/dev/GPA_BenQusDatas_Lambda";
        let BenQusAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusCanadaJSONData = JSON.stringify({
            QueryName:"BenefitsQuestionnariesPart2Save",
            //QueryName: "Save",
            UserID: emailresult,
            CountryCode: this.state.CountryCode,
            AppAnsInJsonObj: {

                SIN: this.state.SINState,
                Suffix: this.state.SuffixState,
                Name: this.state.NameState,
                NameAtBirth: this.state.NameAtBirthState,
                DOB: this.state.DOBState,
                CountryOfBirth: this.state.CountryOfBirthState,
                Province: this.state.ProvinceState,
                Language: this.state.LanguageState,
                HomeAddress: this.state.HomeAddressState,
                City: this.state.CityState,
                Territory: this.state.TerritoryState,
                Country: this.state.CountryState,
                PostalCode: this.state.PostalCodeState,
                Telephone: this.state.TelephoneState,
                //Mailing address (if different from Home address)
                MailingAddress: this.state.MailingAddressState,
                Town: this.state.TownState,
                ProvinceTerritory: this.state.ProvinceTerritoryState,
                MCountry: this.state.MCountryState,
                MPostal: this.state.MPostalState,
                //Payment Information
                BranchNumber: this.state.BranchNumberState,
                Institution: this.state.InstitutionState,
                AccountNumber: this.state.AccountNumberState,
                NameOfAccount: this.state.NameAccountState,
                InstituteNumber: this.state.TelephoneInstituteState,
                //Current marital status
                MaritalStatus: this.state.MaritalStatusState,
                SpouseName: this.state.SpouseNameState,
                SpouseDOB: this.state.SpouseDOBState,
                SpouseSIN: this.state.SpouseSINState,
                //Pension info
                PensionStart: this.state.PensionStartState,
                AgeSecurity: this.state.AgeSecurityState,
                YesOrNo: this.state.YesOrNoState,
                //living info
                livingIn: this.state.livingState,
                livingOut: this.state.livingOutSideState,
                //Outside Info
                DateEntered: this.state.DateEnteredState,
                CityEntered: this.state.CityEnteredState,
                //Residency histroy
                ResidencyHistory: ResHistory,
                //Benefits from other countries
                BenefitsCountry: BenefitsCountry,
                IncomeTax: this.state.incomeTaxState,
                Federal: this.state.federalState,
                Tax: this.state.TaxState,
                Title: this.state.TitleState,
                ContactName: this.state.ContactNameState,
                ContactMailingAddress: this.state.ContactMailingAddressState,
                CPostalCode: this.state.CPostalCodeState,
            },
        });
        let AxiosHeaderConfig = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
        };
        var isValid = this.handleValidateForm(this);
        if (isValid) {
            axios({
                method: "POST",
                url: BenQusAPIUrl,
                data: BenQusCanadaJSONData,
                //headers:AxiosHeaderConfig,

            }).then((data) => {
                notify.show("Your Information Saved Successfully", "success", 3000);
                thisObj.handleBenQusReset(this);
                thisObj.handleAppProcessFlowUpdate(this);
                //thisObj.handleSendBilateralForms(this);
                this.props.MailSends();
            }).catch((err) => {
               
            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }

   
    //Validation Function
    handleValidateForm(event) {
        const { validationError } = this.state;
        let validForm = false;
        var validSINForm = false;
        var validSuffixForm = false;
        var validNameStateForm = false;
        var validNameAtBirthForm = false;
        var validDOBForm = false;
        var validCountryOfBirthForm = false;
        var validProvinceForm = false;
        var validLanguageForm = false;
        var validHomeAddressForm = false;
        var validTelephoneForm = false;
        var validMailAddressForm = false;
        var validBranchNumberForm = false;
        var validInstitutionForm = false;
        var validAccountNumberForm = false;
        var validNameAccountForm = false;
        var validTelephoneInstitution = false;
        var validSpouseNameForm = false;
        var validSpouseDOBForm = false;
        var validSpouseSINForm = false;
        var validPensionStartForm = false;
        var validLivingForm = false;
        var validOtherForm = false;
        var validLivingOutsideForm = false;
        var validOtherOutForm = false;
        var validDateEnteredForm = false;
        var vaildCityEnteredFrom = false;
        var validIncomeTaxForm = false;
        var validFederalForm = false;
        var validTaxForm = false;
        if (this.state.SINState.length > 0) {
            this.setState({ isValidSIN: false });
            validSINForm = true;
        }
        else {
            this.setState({ isValidSIN: true });
            validSINForm = false;
        }
        if (this.state.SuffixState != "") {
            this.setState({ isValidSuffix: false });
            validSuffixForm = true;
        }
        else {
            this.setState({ isValidSuffix: true });
            validSuffixForm = false;
        }
        if (this.state.NameState.length > 0) {
            this.setState({ isValidName: false });
            validNameStateForm = true;
        }
        else {
            this.setState({ isValidName: true });
            validNameStateForm = false;
        }
        if (this.state.NameAtBirthState.length > 0) {
            this.setState({ isValidNameAtBirth: false });
            validNameAtBirthForm = true;
        }
        else {
            this.setState({ isValidNameAtBirth: true });
            validNameAtBirthForm = false;
        }
        if (this.state.DOBState != "") {
            this.setState({ isValidDOB: false });
            validDOBForm = true;
        }
        else {
            this.setState({ isValidDOB: true });
            validDOBForm = false;
        }
        if (this.state.CountryOfBirthState != "") {
            this.setState({ isValidCountryOfBirth: false });
            validCountryOfBirthForm = true;
        }
        else {
            this.setState({ isValidCountryOfBirth: true });
            validCountryOfBirthForm = false;
        }
        if (this.state.ProvinceState.length > 0) {
            this.setState({ isValidProvince: false });
            validProvinceForm = true;
        }
        else {
            this.setState({ isValidProvince: true });
            validProvinceForm = false;
        }
        if (this.state.LanguageState != "") {
            this.setState({ isValidLanguage: false });
            validLanguageForm = true;
        }
        else {
            this.setState({ isValidLanguage: true });
            validLanguageForm = false;
        }
        if (this.state.HomeAddressState.length > 0) {
            this.setState({ isValidHomeAddress: false });
            validHomeAddressForm = true;
        }
        else {
            this.setState({ isValidHomeAddress: true });
            validHomeAddressForm = false;
        }
        if (this.state.TelephoneState.length > 0) {
            this.setState({ isValidTelephone: false });
            validTelephoneForm = true;
        }
        else {
            this.setState({ isValidTelephone: true });
            validTelephoneForm = false;
        }
        if (this.state.MailingAddressState.length > 0) {
            this.setState({ isVallidMailingAddress: false });
            validMailAddressForm = true;
        }
        else {
            this.setState({ isVallidMailingAddress: true });
            validMailAddressForm = false;
        }
        if (this.state.ConditionState == "CA") {
            if (this.state.BranchNumberState.length > 0) {
                this.setState({ isValidBranchNumber: false });
                validBranchNumberForm = true;
            }
            else {
                this.setState({ isValidBranchNumber: true });
                validBranchNumberForm = false;
            }
            if (this.state.InstitutionState.length > 0) {
                this.setState({ isValidInstitution: false });
                validInstitutionForm = true;
            }
            else {
                this.setState({ isValidInstitution: true });
                validInstitutionForm = false;
            }
            if (this.state.AccountNumberState.length > 0) {
                this.setState({ isValidAccountNumber: false });
                validAccountNumberForm = true;
            }
            else {
                this.setState({ isValidAccountNumber: true });
                validAccountNumberForm = false;
            }
            if (this.state.NameAccountState.length > 0) {
                this.setState({ isValidNameAccount: false });
                validNameAccountForm = true;
            }
            else {
                this.setState({ isValidNameAccount: true });
                validNameAccountForm = false;
            }
            if (this.state.TelephoneInstituteState.length > 0) {
                this.setState({ isValidTelePhoneInstitution: false });
                validTelephoneInstitution = true;
            }
            else {
                this.setState({ isValidTelePhoneInstitution: true });
                validTelephoneInstitution = false;
            }
        }
        else {
            this.setState({ isValidBranchNumber: false });
            this.setState({ isValidInstitution: false });
            this.setState({ isValidAccountNumber: false });
            this.setState({ isValidNameAccount: false });
            this.setState({ isValidTelePhoneInstitution: false });
            validBranchNumberForm = true;
            validInstitutionForm = true;
            validAccountNumberForm = true;
            validNameAccountForm = true;
            validTelephoneInstitution = true;
        }
        if ((this.state.MaritalStatusState == "Married") || (this.state.MaritalStatusState == "CivilPartnership")) {
            if (this.state.SpouseNameState.length > 0) {
                this.setState({ isValidSpouseName: false });
                validSpouseNameForm = true;
            }
            else {
                this.setState({ isValidSpouseName: true });
                validSpouseNameForm = false;
            }
            if (this.state.SpouseDOBState != "") {
                this.setState({ isValidSpouseDOB: false });
                validSpouseDOBForm = true;
            }
            else {
                this.setState({ isValidSpouseDOB: true });
                validSpouseDOBForm = false;
            }
            if (this.state.SpouseSINState.length > 0) {
                this.setState({ isValidSpouseSIN: false });
                validSpouseSINForm = true;
            }
            else {
                this.setState({ isValidSpouseSIN: true });
                validSpouseSINForm = false;
            }
        }
        else {
            this.setState({ isValidSpouseName: false });
            this.setState({ isValidSpouseDOB: false });
            this.setState({ isValidSpouseSIN: false });
            validSpouseNameForm = true;
            validSpouseDOBForm = true;
            validSpouseSINForm = true;
        }
        if (this.state.PensionStartState != "") {
            this.setState({ isValidPensionStart: false });
            validPensionStartForm = true;
        }
        else {
            this.setState({ isValidPensionStart: true });
            validPensionStartForm = false;
        }
        if (this.state.YesOrNoState != "Yes") {
            if (this.state.livingState != "") {
                this.setState({ isValidLiving: false });
                validLivingForm = true;
            }
            else {
                this.setState({ isValidLiving: true });
                validLivingForm = false;
            }
            if (this.state.livingState == "Other") {
                if (this.state.OtherState.length > 0) {
                    this.setState({ isValidOther: false });
                    validOtherForm = true;
                }
                else {
                    this.setState({ isValidOther: true });
                    validOtherForm = false;
                }
            }
            else {
                this.setState({ isValidOther: false });
                validOtherForm = true;
            }
            if (this.state.livingOutSideState != "") {
                this.setState({ isValidLivingOutSide: false });
                validLivingOutsideForm = true;
            }
            else {
                this.setState({ isValidLivingOutSide: true });
                validLivingOutsideForm = false;
            }
            if (this.state.livingOutSideState == "Other") {
                if (this.state.OtherOutState.length > 0) {
                    this.setState({ isValidOtherOut: false });
                    validOtherOutForm = true;
                }
                else {
                    this.setState({ isValidOtherOut: true });
                    validOtherOutForm = false;
                }
            }
            else {
                this.setState({ isValidOtherOut: false });
                validOtherOutForm = true;
            }
            if (this.state.DateEnteredState != "") {
                this.setState({ isValidDateEntered: false });
                validDateEnteredForm = true;
            }
            else {
                this.setState({ isValidDateEntered: true });
                validDateEnteredForm = false;
            }
            if (this.state.CityEnteredState.length > 0) {
                this.setState({ isValidCityEntered: false });
                vaildCityEnteredFrom = true;
            }
            else {
                this.setState({ isValidCityEntered: true });
                vaildCityEnteredFrom = false;
            }
        }
        else {
            this.setState({ isValidLiving: false });
            this.setState({ isValidOther: false });
            this.setState({ isValidLivingOutSide: false });
            this.setState({ isValidOtherOut: false });
            this.setState({ isValidDateEntered: false });
            this.setState({ isValidCityEntered: false });
            validLivingForm = true;
            validOtherForm = true;
            validLivingOutsideForm = true;
            validOtherOutForm = true;
            validDateEnteredForm = true;
            vaildCityEnteredFrom = true;
        }
        if (this.state.incomeTaxState != "") {
            this.setState({ isValidIncomeTax: false });
            validIncomeTaxForm = true;
        }
        else {
            this.setState({ isValidIncomeTax: true });
            validIncomeTaxForm = false;
        }
        if (this.state.incomeTaxState == "Yes") {
            if (this.state.federalState.length > 0) {
                this.setState({ isValidFederal: false });
                validFederalForm = true;
            }
            else {
                this.setState({ isValidFederal: true });
                validFederalForm = false;
            }
        }
        else {
            this.setState({ isValidFederal: false });
            validFederalForm = true;
        }
        if (this.state.TaxState != "") {
            this.setState({ isValidTax: false });
            validTaxForm = true;
        }
        else {
            this.setState({ isValidTax: true });
            validTaxForm = false;
        }
        if (validSINForm && validSuffixForm && validNameStateForm && validNameAtBirthForm && validDOBForm && validCountryOfBirthForm && validProvinceForm && validLanguageForm && validDateEnteredForm
            && validHomeAddressForm && validTelephoneForm && validMailAddressForm && validBranchNumberForm && validInstitutionForm && validAccountNumberForm && validNameAccountForm && validTelephoneInstitution
            && validSpouseNameForm && validSpouseDOBForm && validSpouseSINForm && validPensionStartForm && validLivingForm && validOtherForm && validLivingOutsideForm && validOtherOutForm && vaildCityEnteredFrom && validIncomeTaxForm
            && validFederalForm && validTaxForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }

        return validForm;
    }

    //Residency Validation Function
    handleValidateBenQusHistoryForm(e) {
        let validForm = false;
        var validPeriodFromForm = false;
        var validPeriodToForm = false;
        var validCountryListForm = false;
        if (this.state.PeriodFromState != "") {
            this.setState({ isValidPeriodFrom: false });
            validPeriodFromForm = true;
        }
        else {
            this.setState({ isValidPeriodFrom: true });
            validPeriodFromForm = false;
        }
        if (this.state.PeriodToState != "") {
            this.setState({ isValidPeriodTo: false });
            validPeriodToForm = true;
        }
        else {
            this.setState({ isValidPeriodTo: true });
            validPeriodToForm = false;
        }
        if (this.state.CountryListState != "") {
            this.setState({ isValidCountryList: false });
            validCountryListForm = true;
        }
        else {
            this.setState({ isValidCountryList: true });
            validCountryListForm = false;
        }
        if (validPeriodFromForm && validPeriodToForm && validCountryListForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Residency Reset Function
    handleResidencyReset(e) {
        this.setState({
            PeriodFromState: '',
            PeriodToState: '',
            CountryListState: '',
            isValidPeriodFrom: false,
            isValidPeriodTo: false,
            isValidCountryList: false,
        });
    }

    //Residency Save Function
    handleBenQusResHistory(e) {
        var valid = this.handleValidateBenQusHistoryForm(this);
        if (valid) {
            var ResHistoryJSONData = {
                PeriodFrom: this.state.PeriodFromState,
                PeriodTo: this.state.PeriodToState,
                CountryList: this.state.CountryListState,
            }
            if (ResHistory.length < 4) {
                ResHistory.push(ResHistoryJSONData);
                notify.show("Residency Information Added Successfully", "success", 3000);
                this.handleResidencyReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Four Residency History to Add", "warning", 3000);
            }
        }
    }

    //Country Validation Function
    handleValidateBenQusBenefitsForm(e) {
        let validForm = false;
        var validBenefitsCountryForm = false;
        var validPeriodLivedFromForm = false;
        var validPeriodLivedToForm = false;
        var validPeriodWorkedFromForm = false;
        var validPeriodWorkedToForm = false;
        var validInsuranceNumberForm = false;
        var validAnyBenefitsForm = false;

        if (this.state.BenefitCountryState != "") {
            this.setState({ isValidBenefitsCountry: false });
            validBenefitsCountryForm = true;
        }
        else {
            this.setState({ isValidBenefitsCountry: true });
            validBenefitsCountryForm = false;
        }
        if (this.state.LivedFrmState != "") {
            this.setState({ isValidPeriodLivedFrom: false });
            validPeriodLivedFromForm = true;
        }
        else {
            this.setState({ isValidPeriodLivedFrom: true });
            validPeriodLivedFromForm = false;
        }
        if (this.state.LivedToState != "") {
            this.setState({ isValidPeriodLivedTo: false });
            validPeriodLivedToForm = true;
        }
        else {
            this.setState({ isValidPeriodLivedTo: true });
            validPeriodLivedToForm = false;
        }
        if (this.state.PrdWorkFrmState != "") {
            this.setState({ isValidPeriodWorkedFrom: false });
            validPeriodWorkedFromForm = true;
        }
        else {
            this.setState({ isValidPeriodWorkedFrom: true });
            validPeriodWorkedFromForm = false;
        }
        if (this.state.PrdWorkedToState != "") {
            this.setState({ isValidPeriodWorkedTo: false });
            validPeriodWorkedToForm = true;
        }
        else {
            this.setState({ isValidPeriodWorkedTo: true });
            validPeriodWorkedToForm = false;
        }
        if (this.state.InsuranceNumberState.length > 0) {
            this.setState({ isValidInsuranceNumber: false });
            validInsuranceNumberForm = true;
        }
        else {
            this.setState({ isValidInsuranceNumber: true });
            validInsuranceNumberForm = false;
        }
        if (this.state.AnyBenifitsState != "") {
            this.setState({ isValidAnyBenefits: false });
            validAnyBenefitsForm = true;
        }
        else {
            this.setState({ isValidAnyBenefits: true });
            validAnyBenefitsForm = false;
        }
        if (validBenefitsCountryForm && validPeriodLivedFromForm && validPeriodLivedToForm && validPeriodWorkedFromForm && validPeriodWorkedToForm && validInsuranceNumberForm && validAnyBenefitsForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Country Reset Function
    handleCountryReset(e) {
        this.setState({
            BenefitCountryState: '',
            LivedFrmState: '',
            LivedToState: '',
            PrdWorkFrmState: '',
            PrdWorkedToState: '',
            InsuranceNumberState: '',
            AnyBenifitsState: '',
            isValidBenefitsCountry: false,
            isValidPeriodLivedFrom: false,
            isValidPeriodLivedTo: false,
            isValidPeriodWorkedFrom: false,
            isValidPeriodWorkedTo: false,
            isValidInsuranceNumber: false,
            isValidAnyBenefits: false,
        });
    }

    //Country Save Function
    handleBenQusBenefitsCountry(e) {
        var valid = this.handleValidateBenQusBenefitsForm(this);
        if (valid) {
            var BenefitsCountryJSONData = {
                BenefitCountry: this.state.BenefitCountryState,
                LivedFrm: this.state.LivedFrmState,
                LivedTo: this.state.LivedToState,
                PrdWorkFrm: this.state.PrdWorkFrmState,
                PrdWorkedTo: this.state.PrdWorkedToState,
                InsuranceNumber: this.state.InsuranceNumberState,
                AnyBenifits: this.state.AnyBenifitsState,
            }
            if (BenefitsCountry.length < 2) {
                BenefitsCountry.push(BenefitsCountryJSONData);
                notify.show("Country Information Added Successfully", "success", 3000);
                this.handleCountryReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Two Country History to Add", "warning", 3000);
            }
        }
    }

    //Rendering Function
    render() {
        return (
            <div>
                <Col xs={12} md={12} style={newstyle}>
                    <Panel eventKey="1" defaultExpanded={true}>
                        <Panel.Heading>
                            <Panel.Title >Canada Form</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Row className="show-grid">
                                <Col xs={12} md={12} className="PanelText">
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>{<span>Social Insurance number<span className="manatoryfield">*</span></span>}</label>
                                            <TextField hintText="Enter Your Social Security number "
                                                value={this.state.SINState}
                                                errorText={this.state.isValidSIN ? "Please enter Social Security Number" : ""}
                                                onChange={this.handleChangeSIN.bind(this)}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>{<span>Suffix<span className="manatoryfield">*</span></span>}</label>
                                            <SelectField
                                                value={this.state.SuffixState}
                                                hintText="Select the suffix"
                                                onChange={this.handleChangeSuffix}
                                                maxHeight={200}
                                                errorText={this.state.isValidSuffix ? "Please Select Your Suffix" : null}
                                            >
                                                {SuffixItems}
                                            </SelectField>
                                        </Col>

                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>{<span>Name<span className="manatoryfield">*</span></span>}</label>
                                            <TextField hintText="Enter Your Name"
                                                value={this.state.NameState}
                                                onChange={this.handleChangeName.bind(this)}
                                                errorText={this.state.isValidName ? "Please Enter Your Name" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>{<span>Name at Birth<span className="manatoryfield">*</span></span>}</label>
                                            <TextField hintText=" Enter Your Name at Birth "
                                                value={this.state.NameAtBirthState}
                                                onChange={this.handleChangeNameAtBirth.bind(this)}
                                                errorText={this.state.isValidNameAtBirth ? "Please Enter Your Name at Birth" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>{<span>Date of Birth<span className="manatoryfield">*</span></span>}</label>
                                            <DatePicker
                                                firstDayOfWeek={0}
                                                hintText="Select the DateOfBirth"
                                                value={this.state.DOBState}
                                                onChange={this.handleChangeDOB.bind(this)}
                                                errorText={this.state.isValidDOB ? "Please Select Your Date of Birth" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>{<span>Country of birth<span className="manatoryfield">*</span></span>}</label>
                                            <SelectField
                                                value={this.state.CountryOfBirthState}
                                                hintText="Select CountyofBirth"
                                                onChange={this.handleChangeCountryOfBirth}
                                                maxHeight={200}
                                                errorText={this.state.isValidCountryOfBirth ? "Please Select Your Language" : null}
                                            >
                                                {CountryItems}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>{<span>Province or Territory<span className="manatoryfield">*</span></span>}</label>
                                            <TextField hintText="Enter Your Province or Territory"
                                                value={this.state.ProvinceState}
                                                onChange={this.handleChangeProvince.bind(this)}
                                                errorText={this.state.isValidProvince ? "Please Enter Your Province" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>{<span>Preferred Language<span className="manatoryfield">*</span></span>}</label>
                                            <SelectField
                                                value={this.state.LanguageState}
                                                hintText="Select the Preffered language"
                                                onChange={this.handleChangeLanguage}
                                                maxHeight={200}
                                                multiple={true}
                                                errorText={this.state.isValidLanguage ? "Please Select Your Language" : null}
                                            >
                                                {Language}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>{<span>Home Address (Number, Street, Apt No., R.R)<span className="manatoryfield">*</span></span>}</label>
                                            <TextField hintText="Enter Your Home Address"
                                                value={this.state.HomeAddressState}
                                                onChange={this.handleChangeHomeAddress.bind(this)}
                                                errorText={this.state.isValidHomeAddress ? "Please Enter Your Address" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>{<span>Telephone number during the day<span className="manatoryfield">*</span></span>}</label>
                                            <TextField hintText="Enter Your Telephone number during the day"
                                                value={this.state.TelephoneState}
                                                onChange={this.handleChangeTelephone.bind(this)}
                                                errorText={this.state.isValidTelephone ? "Please Enter Your Telephone" : ""}
                                            />
                                        </Col>
                                        {/* <Col xs={12} md={6} className="input-fileds">
                                            <TextField hintText="Enter Your City, Town, or Village"
                                                floatingLabelText={<span>City, Town, or Village</span>}
                                                value={this.state.CityState}
                                                onChange={this.handleChangeCity.bind(this)}
                                            />
                                        </Col> */}
                                    </Col>
                                    {/* <Col xs={12} md={12} >
                                        <Col xs={12} md={4} className="input-fileds">
                                            <TextField hintText="Enter Your Province or Territory"
                                                floatingLabelText={<span>Province or Territory</span>}
                                                value={this.state.TerritoryState}
                                                onChange={this.handleChangeTerritory.bind(this)}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds">
                                            <TextField hintText="Enter Your Country"
                                                floatingLabelText={<span>Country</span>}
                                                value={this.state.CountryState}
                                                onChange={this.handleChangeCountry.bind(this)}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds">
                                            <TextField hintText="Enter Your Postal Code"
                                                floatingLabelText={<span>Postal Code</span>}
                                                value={this.state.PostalCodeState}
                                                onChange={this.handleChangePostalCode.bind(this)}
                                            />
                                        </Col>
                                    </Col> */}
                                    <Col xs={12} md={12} >
                                        {/* <Col xs={12} md={4} className="input-fileds">
                                            <TextField hintText="Enter Your Telephone number during the day"
                                                floatingLabelText={<span>Telephone number during the day</span>}
                                                value={this.state.TelephoneState}
                                                onChange={this.handleChangeTelephone.bind(this)}
                                            />
                                        </Col> */}
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>{<span>Mailing address(if different from Home address)<span className="manatoryfield">*</span></span>}</label>
                                            <TextField hintText="Enter Your Mailing address"
                                                value={this.state.MailingAddressState}
                                                onChange={this.handleChangeMailingAddress.bind(this)}
                                                errorText={this.state.isVallidMailingAddress ? "Please Enter Mailing Address" : null}
                                            />
                                        </Col>
                                        {/* <Col xs={12} md={4} className="input-fileds">
                                            <TextField hintText="Enter Your City, Town, or Village"
                                                floatingLabelText={<span>City, Town, or Village</span>}
                                                value={this.state.TownState}
                                                onChange={this.handleChangeTown.bind(this)}
                                            />
                                        </Col> */}
                                    </Col>
                                    {/* <Col xs={12} md={12}>
                                        <Col xs={12} md={4} className="input-fileds">
                                            <TextField hintText="Enter Your Province or Territory"
                                                floatingLabelText={<span>Province or Territory</span>}
                                                value={this.state.ProvinceTerritoryState}
                                                onChange={this.handleChangeProvinceTerritory.bind(this)}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds">
                                            <TextField hintText="Enter Your Country"
                                                floatingLabelText={<span>Country</span>}
                                                value={this.state.MCountryState}
                                                onChange={this.handleChangeMCountry.bind(this)}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds">
                                            <TextField hintText="Enter Your Postal Code"
                                                floatingLabelText={<span>Postal Code</span>}
                                                value={this.state.MPostalState}
                                                onChange={this.handleChangePostal.bind(this)}
                                            />
                                        </Col>
                                    </Col> */}
                                    {this.state.ConditionState == "CA" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12}>
                                                    <h4 className="ColorStyle"><b>Payment Information: Direct deposit in Canada </b></h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>{<span>Branch Number <span className="manatoryfield">*</span></span>}</label>
                                                    <TextField hintText="Enter Your Branch number(5 digits)"
                                                        value={this.state.BranchNumberState}
                                                        onChange={this.handleChangeBranchNum.bind(this)}
                                                        errorText={this.state.isValidBranchNumber ? "Please Enter Branch Number(3digits)" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>{<span>Institution  <span className="manatoryfield">*</span></span>}</label>
                                                    <TextField hintText="Enter Your Institution (3 digits)"
                                                        value={this.state.InstitutionState}
                                                        onChange={this.handleChangeInstitution.bind(this)}
                                                        errorText={this.state.isValidInstitution ? "Please enter Institution Number(3digits)" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>{<span>Account number <span className="manatoryfield">*</span></span>}</label>
                                                    <TextField hintText="Enter Your Account number (up to 12 digits)"
                                                        value={this.state.AccountNumberState}
                                                        onChange={this.handleChangeAccountNumber.bind(this)}
                                                        errorText={this.state.isValidAccountNumber ? "Please Enter Account Number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>{<span>Name (s) of the account<span className="manatoryfield">*</span></span>}</label>
                                                    <TextField hintText="Enter Your Name (s) of the account"
                                                        value={this.state.NameAccountState}
                                                        onChange={this.handleChangeNameAccount.bind(this)}
                                                        errorText={this.state.isValidNameAccount ? "Pleas enter Name of the Account" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>{<span>Telephone number of your financial institution <span className="manatoryfield">*</span></span>}</label>
                                                    <TextField hintText="Enter Your Telephone number"
                                                        value={this.state.TelephoneInstituteState}
                                                        onChange={this.handleChangeTelephoneInstitute.bind(this)}
                                                        errorText={this.state.isValidTelePhoneInstitution ? "Please enter Telephone number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>{<span>Marital Status<span className="manatoryfield">*</span></span>}</label>
                                            <SelectField
                                                value={this.state.MaritalStatusState}
                                                hintText="Select the Marital Status"
                                                onChange={this.handleChangeMaritalStatus}
                                                maxHeight={200}
                                            >
                                                {MaritalStatusItems}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    {(this.state.MaritalStatusState == "M") || (this.state.MaritalStatusState == "C") ?
                                        <Col xs={12} md={12} >
                                            <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                <label>{<span>Name of Your Spouse or Common Law Partner <span className="manatoryfield">*</span></span>}</label>
                                                <TextField hintText="Enter Your Name of your spouse or common law partner"
                                                    value={this.state.SpouseNameState}
                                                    onChange={this.handleChangeSpouse.bind(this)}
                                                    errorText={this.state.isValidSpouseName ? "Please Enter Name of your Spouse or common law partner" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>{<span>Date of Birth <span className="manatoryfield">*</span></span>}</label>
                                                <DatePicker
                                                    value={this.state.SpouseDOBState}
                                                    onChange={this.handleChangeSpouseDOB.bind(this)}
                                                    firstDayOfWeek={0}
                                                    hintText="Select Date of Birth"
                                                    errorText={this.state.isValidSpouseDOB ? "Please Enter your Spouse Date Of Birth" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>{<span>Social Insurance Number (in Canada)<span className="manatoryfield">*</span></span>}</label>
                                                <TextField hintText="Enter Your Social Insurance Number"
                                                    value={this.state.SpouseSINState}
                                                    onChange={this.handleChangeSpouseSIN.bind(this)}
                                                    errorText={this.state.isValidSpouseSIN ? "Please Enter Social Insurance Number(in Canada)" : null}
                                                />
                                            </Col>
                                        </Col>
                                        : ''}
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>When do you want your pension to Start?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.PensionStartState} onChange={this.handleChangePensionStart.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                <RadioButton
                                                    value="As soon as I qualify"
                                                    label="As soon as I qualify"
                                                    style={style.radioButton}
                                                />
                                                <RadioButton
                                                    value="As of (indicate a date)"
                                                    label="As of (indicate a date)"
                                                    style={style.radioButton}
                                                />
                                                <RadioButton
                                                    value="YYYY-MM"
                                                    label="YYYY-MM"
                                                    style={style.radioButton}
                                                />
                                            </RadioButtonGroup >
                                            <span className="validationmsg">{this.state.isValidPensionStart ? "Please select when you want your pension to start" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} hidden={this.state.PensionStartState != "As of (indicate a date)"}>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <DatePicker
                                                value={this.state.PensionDateState}
                                                onChange={this.handleChangePensionDate.bind(this)}
                                                firstDayOfWeek={0}
                                                hintText="Select Date to start pension"
                                                errorText={this.state.isValidPensionDate ? "Please Enter your Pension Date start" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>{<span>If your Old Age Security pension is approved, do you want to apply for the Guaranteed Income Supplement?<span className="manatoryfield">*</span></span>}</label>
                                            <RadioButtonGroup valueSelected={this.state.AgeSecurityState} onChange={this.handleChangeAgeSecurity.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                        </Col>
                                    </Col>
                                    {/* {this.state.ConditionState == "CA" ? */}
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={8} className="Radio_button">
                                            <label>{<span>I am a Canadian Citizen and have lived continuously in Canada since birth<span className="manatoryfield">*</span></span>}</label>
                                            <RadioButtonGroup valueSelected={this.state.YesOrNoState} onChange={this.handleChangeYesOrNo.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                        </Col>
                                    </Col>
                                    {/* : ""} */}
                                    {this.state.YesOrNoState != "Yes" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={8} className="input-fileds align-fileds" >
                                                    <label>{<span>I am living in Canada now and I am a:<span className="manatoryfield">*</span></span>}</label>
                                                    <SelectField
                                                        value={this.state.livingState}
                                                        hintText="Select Your Citizenship"
                                                        onChange={this.handleChangeLiving}
                                                        maxHeight={200}
                                                        errorText={this.state.isValidLiving ? "Please Select Your Living Canada or Not" : null}
                                                    >
                                                        {LivingIn}
                                                    </SelectField>
                                                </Col>
                                                {this.state.livingState == "Other" ?
                                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                                        <label>Other (Pervious Resident)<span className="manatoryfield">*</span></label>
                                                        <TextField
                                                            hintText="Enter Your Pervious Resident"
                                                            value={this.state.OtherState}
                                                            onChange={this.handleChangeOther.bind(this)}
                                                            errorText={this.state.isValidOther ? "Please Enter Your Pervious Resident" : ""}
                                                        />
                                                    </Col>
                                                    : ''}
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={8} className="input-fileds align-fileds" >
                                                    <label>{<span>I am currently living outside of Canada, and immediately before I left Canada I was a: <span className="manatoryfield">*</span></span>}</label>
                                                    <SelectField
                                                        value={this.state.livingOutSideState}
                                                        hintText="Select Your Living Outside Canada or Not"
                                                        onChange={this.handleChangeLivingOutSide}
                                                        maxHeight={200}
                                                        errorText={this.state.isValidLivingOutSide ? "Please Select Your Living Outside Canada or Not" : null}
                                                    >
                                                        {LivingIn}
                                                    </SelectField>
                                                </Col>
                                                {this.state.livingOutSideState == "Other" ?
                                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                                        <label>Other (Pervious Resident)<span className="manatoryfield">*</span></label>
                                                        <TextField
                                                            hintText="Enter Your Pervious Resident"
                                                            value={this.state.OtherOutState}
                                                            onChange={this.handleChangeOtherOut.bind(this)}
                                                            errorText={this.state.isValidOtherOut ? "Please Enter Your Pervious Resident" : ""}
                                                        />
                                                    </Col>
                                                    : ''}
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <h4><b>If you were born outside Canada, please indicate:</b> </h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>{<span>The date you first entered Canada<span className="manatoryfield">*</span></span>}</label>
                                                    <DatePicker hintText="The date you first entered Canada (YYYY-MM-DD) "
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.DateEnteredState}
                                                        onChange={this.handleChangeDateEntered.bind(this)}
                                                        errorText={this.state.isValidDateEntered ? "Please Select Your Date Of Birth" : null}

                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>{<span>The City where you first entered Canada <span className="manatoryfield">*</span></span>}</label>
                                                    <TextField hintText=" The City where you first entered Canada"
                                                        value={this.state.CityEnteredState}
                                                        onChange={this.handleChangeCityEntered.bind(this)}
                                                        errorText={this.state.isValidCityEntered ? "Please enter the city" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12}  >
                                                    <h4 className="ColorStyle"><b> Residence History: List below all of the places you have lived from age 18 to present, both inside and outside of Canada. </b></h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                    <label>{<span>Period From<span className="manatoryfield">*</span></span>}</label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Enter From Date"
                                                        value={this.state.PeriodFromState}
                                                        onChange={this.handleChangePeriodFrom.bind(this)}
                                                        errorText={this.state.isValidPeriodFrom ? "Please Enter Your Residence Period From Date" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                    <label>{<span>Period To<span className="manatoryfield">*</span></span>}</label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PeriodToState}
                                                        hintText="Enter To Date"
                                                        onChange={this.handleChangePeriodTo.bind(this)}
                                                        errorText={this.state.isValidPeriodFrom ? "Please Enter Your Residence Period To Date" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.ValidateYearPeriod ? "Please Select Your valid Residence Date" : null}</span>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                    <label>{<span>Country<span className="manatoryfield">*</span></span>}</label>
                                                    <SelectField
                                                        value={this.state.CountryListState}
                                                        hintText="Enter the Country"
                                                        onChange={this.handleChangeCountryList.bind(this)}
                                                        maxHeight={200}
                                                        errorText={this.state.isValidCountryList ? "Please enter Country" : null}
                                                    >
                                                        {CountryItems}
                                                    </SelectField>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fields">
                                                    <Button onClick={this.handleBenQusResHistory.bind(this)} className="RQ-Add" >Add Another </Button>
                                                    <Notifications />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} >
                                                    <h4 className="ColorStyle"><b>Benefits from other countries</b></h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds " >
                                                    <label>{<span>Country<span className="manatoryfield">*</span></span>}</label>
                                                    <SelectField
                                                        value={this.state.BenefitCountryState}
                                                        hintText="Select the Country"
                                                        onChange={this.handleChangeBenefitCountry.bind(this)}
                                                        maxHeight={200}
                                                        errorText={this.state.isValidBenefitsCountry ? "Please enter Country" : null}
                                                    >
                                                        {CountryItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                    <label>{<span>Period Lived:From<span className="manatoryfield">*</span></span>}</label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the Lived date"
                                                        value={this.state.LivedFrmState}
                                                        onChange={this.handleChangeLivedFrm.bind(this)}
                                                        errorText={this.state.isValidPeriodLivedFrom ? "Please Select your Period Lived From Date" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                    <label>Period Lived: To<span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the Lived date"
                                                        value={this.state.LivedToState}
                                                        onChange={this.handleChangeLivedTo.bind(this)}
                                                        errorText={this.state.isValidPeriodLivedTo ? "Please Select your Period Lived To Date" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.ValidateYear ? "Please Select Your valid Date" : null}</span>
                                                </Col>
                                            </Col>

                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                    <label>Period Worked: From (YYYY-MM-DD)<span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the Worked From"
                                                        value={this.state.PrdWorkFrmState}
                                                        onChange={this.handleChangePeriodWorkedFrom.bind(this)}
                                                        errorText={this.state.isValidPeriodWorkedFrom ? "Please Select your Period Worked From Date" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                    <label>Period Worked: To (YYYY-MM-DD)<span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the Worked to"
                                                        value={this.state.PrdWorkedToState}
                                                        onChange={this.handleChangePeriodWorkedTo.bind(this)}
                                                        errorText={this.state.isValidPeriodWorkedTo ? "Please Select your Period Worked To Date" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.ValidateYearWorked ? "Please Select Your valid Worked Date" : null}</span>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds" >
                                                    <label>Insurance Number (in selected Country)<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Insurance Number"
                                                        value={this.state.InsuranceNumberState}
                                                        onChange={this.handleChangeInsuranceNo.bind(this)}
                                                        errorText={this.state.isValidInsuranceNumber ? "Please Enter Your Insurance Number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={8} className="Radio_button">
                                                    <label>Have you applied for or received a benefit from that country<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.AnyBenifitsState} onChange={this.handleChangeAnyBenifits.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidAnyBenefits ? "Please Select Any Receiving Benefits From Country" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fields">
                                                    <Button onClick={this.handleBenQusBenefitsCountry.bind(this)} className="RQ-Add" >Add Another </Button>
                                                    <Notifications />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>Voluntary Income Tax Deduction (This service is available to Canadian residents only)</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={7} className="Radio_button">
                                            <label>Your Old-Age Pension is taxable income,would you like to deduct Income Tax?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.incomeTaxState} onChange={this.handleChangeIncomeTax.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidIncomeTax ? "Please Select Your Pension is taxable income" : null}</span>
                                        </Col>
                                        {this.state.incomeTaxState == "Yes" ?
                                            <Col xs={12} md={5} className="input-fileds align-fileds" >
                                                <label>Federal Income Tax perentage (%)<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Your Federal Income Tax perentage (%)"
                                                    value={this.state.federalState}
                                                    onChange={this.handleChangeFederal.bind(this)}
                                                    errorText={this.state.isValidFederal ? "Please enter the Federal Income Tax percentage" : null}
                                                />
                                            </Col>
                                            : ''}
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>If you are not considered a resident of Canada for tax purposes, is your net worth for the year 2015 more than $72,809? <span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.TaxState} onChange={this.handleChangeTax.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidTax ? "Please select your tax status" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12}>
                                            <h4 className="ColorStyle"><b>Contact person info.The person must not be related to you</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={4} className="input-fileds align-fileds" >
                                            <label>Title</label>
                                            <SelectField
                                                value={this.state.TitleState}
                                                hintText="Select the title"
                                                onChange={this.handleChangeTitle}
                                                maxHeight={200}
                                            //errorText={this.state.isValidTitle ? "Please select your Title" : null}
                                            >
                                                {TitleItems}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Name</label>
                                            <TextField hintText="Enter Your Name"
                                                value={this.state.ContactNameState}
                                                onChange={this.handleChangeContactName.bind(this)}
                                            //errorText={this.state.isValidContactName ? "Please enter Name" : null}

                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds" >
                                            <label>Telephone number during the day</label>
                                            <TextField hintText="Enter Your Telephone number"
                                                value={this.state.TelephonenumberState}
                                                onChange={this.handleChangeTelephonenumber.bind(this)}
                                            //errorText={this.state.isValidTelephoneNumber ? "Please enter the Telephone number" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>Mailing address(if different from Home address)</label>
                                            <TextField hintText="Enter Your Mailing address"
                                                value={this.state.ContactMailingAddressState}
                                                onChange={this.handleChangeContactMailingAddress.bind(this)}
                                            //errorText={this.state.isValidMailingAddress ? "Please enter the mailing address" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>Postal Code</label>
                                            <TextField hintText="Enter Your Postal Code"
                                                value={this.state.CPostalCodeState}
                                                onChange={this.handleChangeCPostalCode.bind(this)}
                                            //errorText={this.state.isValidPostalCode ? "Please enter the Postal code" : null}
                                            />
                                        </Col>
                                    </Col>
                                </Col>
                            </Row>
                        </Panel.Body>
                        <Col xs={12} md={12}>
                            <Col xs={12} md={12} className="input-fields">
                                <Button onClick={this.handleBenQusCanadaSave.bind(this)} className="RQ-Add" >{this.state.BtnNameState}</Button>
                                <Notifications />
                                {/* <Button onClick={this.MailSend.bind(this)} className="RQ-Add" >Click Me</Button> */}
                            </Col>
                        </Col>
                    </Panel>
                </Col>
            </div>
        );

    }
    
    //Reset Function
    handleBenQusReset(e) {
        this.setState({
            SINState: '',
            SuffixState: '',
            NameState: '',
            NameAtBirthState: '',
            DOBState: '',
            CountryOfBirthState: '',
            ProvinceState: '',
            LanguageState: '',
            HomeAddressState: '',
            CityState: '',
            TerritoryState: '',
            CountryState: '',
            PostalCodeState: '',
            TelephoneState: '',
            MailingAddressState: '',
            isVallidMailingAddress: false,
            TownState: '',
            ProvinceTerritoryState: '',
            MCountryState: '',
            MPostalState: '',
            // Payment Information
            BranchNumberState: '',
            isValidBranchNumber: false,
            InstitutionState: '',
            isValidInstitution: false,
            AccountNumberState: '',
            isValidAccountNumber: false,
            NameAccountState: '',
            isValidNameAccount: false,
            TelephoneInstituteState: '',
            isValidTelePhoneInstitution: false,
            //Spouse information
            MaritalStatusState: "Single",
            SpouseNameState: '',
            SpouseDOBState: "",
            SpouseSINState: '',
            isValidSpouseName: false,
            isValidSpouseSIN: false,
            PensionStartState: '',
            AgeSecurityState: 'No',
            YesOrNoState: 'Yes',
            //living info
            livingState: '',
            isValidLiving: false,
            livingOutSideState: '',
            isValidLivingOutSide: false,
            //outside info
            DateEnteredState: '',
            CityEnteredState: '',
            isValidCityEntered: false,
            //Residency histroy
            PeriodFromState: '',
            PeriodToState: '',
            CountryListState: '',
            //Benefits from other countries
            BenefitCountryState: '',
            LivedFrmState: '',
            LivedToState: '',
            PrdWorkFrmState: '',
            PrdWorkedToState: '',
            InsuranceNumberState: '',
            AnyBenifitsState: '',
            //IncomeTax
            incomeTaxState: '',
            federalState: '',
            TaxState: '',
            TitleState: '',
            ContactNameState: '',
            TelephonenumberState: '',
            ContactMailingAddressState: '',
            CPostalCodeState: '',
            SpecificDate: '',
            isValidIncomeTax: false,
            isValidFederal: false,
            isValidTax: false,
            isValidPeriodFrom: false,
            isValidPeriodTo: false,
            isValidCountryList: false,
            isValidBenefitsCountry: false,
            isValidPeriodLivedFrom: false,
            isValidPeriodLivedTo: false,
            isValidPeriodWorkedFrom: false,
            isValidPeriodWorkedTo: false,
            isValidInsuranceNumber: false,
            isValidAnyBenefits: false,
        });
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

BenQusCanada.propTypes = {
    googleMaps: PropTypes.object,
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
        }
    }
}

export default connect(mapReducerStateToProps, mapDispatchToProps)(BenQusCanada);