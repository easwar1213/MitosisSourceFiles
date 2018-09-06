import React, { Component } from 'react';
import PropTypes from "prop-types";
//Bootstrap Component
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

//Signature Pad
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

const CountryItems = [];

const InformationChildren = [];

class BenQusQuebec extends Component {
    constructor(props) {
        super(props);
        this.handleLoadCountry(this);
        this.handleBenQusQuebecAuto(this);

        //Field State Values Initialization
        this.state = {
            search: '',
            Csearch: '',
            CPsearch: '',
            AFsearch: '',
            APsearch: '',
            CountryCode: "Quebec",
            SocialNumberState: "",
            GenderState: "",
            FamilynameState: "",
            GivennameState: "",
            DOBState: "",
            FamilynameatbirthState: "",
            GivennameatbirthState: "",
            PlaceofbirthState: "",
            MFnameatbirthState: "",
            MGivennameState: "",
            FFamilyNameState: "",
            FGivennameState: "",
            LanguageCState: "English",
            CityState: "",
            MobilePhoneNumberState: "",
            HomePhoneNumberState: "",
            LiveOSCanadaState: "",
            SSPlanState: "",
            SSPlanCountryState: "",
            CNESSTPensionState: "",
            WClaimDState: "",
            SAAQPensionState: "",
            SAAQFNumberState: "",
            WDDateState: "",
            SWDDateState: "",
            ChildCAgeState: "",
            FamilybenefitsState: "",
            CFNameState: "",
            CGNameState: "",
            CDOBState: "",
            CPBirthState: "",
            DateadoptionState: "",
            CDeathDateState: "",
            DACanadaState: "",
            ArrivalinCanadaState: "",
            FamilybenefitsNPState: "",
            LiveinCanadaState: "",
            WorkinQuebecState: "",
            NWorkinQuebecState: "",
            //retroactivepensionState: "",
            pensionretroactivelyState: "",
            pensionreceivedState: "",
            pensionstartlaterState: "",
            FinancialState: "",
            Paymentdeposit1State: "",
            Paymentdeposit2State: "",
            Paymentdeposit3State: "",
            Paymentdeposit4State: "",
            Paymentdeposit5State: "",
            // DeclarationSignState:"",
            DeclarationSign1State: "",
            AnotherPSignState: "",
            Gender1State: "",
            Familyname1State: "",
            Givenname1State: "",
            Address1State: "",
            MPhoneNumber1State: "",
            HomePhoneNumber1State: "",
            SSNumber1State: "",
            DOB1State: "",
            MFNamebirthState: "",
            SuggestDateState: "",
            PensionStartState: "",

            BtnNameState: "Save",
            DateOfBirth: "",
            ApplicantAge: 0,
            ConditionalState: "",
            isValidSocialNumber: false,
            isValidGender: false,
            isValidFamilyname: false,
            isValidGivenname: false,
            isValidDOB: false,
            isValidFamilynameatbirth: false,
            isValidGivennameatbirth: false,
            isValidPlaceofbirth: false,
            isValidMFnameatbirth: false,
            isValidMGivenname: false,
            isValidFFamilyName: false,
            isValidFGivenname: false,
            isValidLanguageC: false,
            isValidCity: false,
            isValidMobilePhoneNumber: false,
            isValidHomePhoneNumber: false,
            isValidLiveOSCanada: false,
            isValidSSPlan: false,
            isValidSSPlanCountry: false,
            isValidCNESSTPension: false,
            isValidWClaimD: false,
            isValidSAAQPensionState: false,
            isValidSAAQFNumber: false,
            isValidWDDate: false,
            isValidSWDDate: false,
            isValidChildCAge: false,
            isValidbenefits: false,
            isValidCFName: false,
            isValidCGName: false,
            isValidCDOB: false,
            isValidCPBirth: false,
            isValidDateadoption: false,
            isValidCDeathDate: false,
            isValidDACanada: false,
            isValidArrivalinCanada: false,
            isValidFamilybenefitsNP: false,
            isValidLiveinCanada: false,
            isValidWorkinQuebec: false,
            isValidNWorkinQuebec: false,
            isValidretroactivepension: false,
            isValidpensionretroactively: false,
            isValidpensionreceived: false,
            isValidpensionstartlater: false,
            isValidFinancial: false,
            isValidPaymentdeposit1: false,
            isValidPaymentdeposit2: false,
            isValidPaymentdeposit3: false,
            isValidPaymentdeposit4: false,
            isValidPaymentdeposit5: false,
            isValidDeclarationSign1: false,
            isValidAnotherPSign: false,
            isValidGender1: false,
            isValidFamilyname1: false,
            isValidGivenname1: false,
            isValidAddress1: false,
            isValidMPhoneNumber1: false,
            isValidHomePhoneNumber1: false,
            isValidSSNumber1: false,
            isValidDOB1: false,
            isValidMFNamebirth: false,
            isValidSuggestDate: false,
            isValidPensionStart: false,

            isValidFormatSocialNumber: false,
            isValidFormatGender: false,
            isValidFormatFamilyname: false,
            isValidFormatGivenname: false,
            isValidFormatDOB: false,
            isValidFormatFamilynameatbirth: false,
            isValidFormatGivennameatbirth: false,
            isValidFormatPlaceofbirth: false,
            isValidFormatMFnameatbirth: false,
            isValidFormatMGivenname: false,
            isValidFormatFFamilyName: false,
            isValidFormatFGivenname: false,
            isValidFormatLanguageC: false,
            isValidFormatCity: false,
            isValidFormatMobilePhoneNumber: false,
            isValidFormatHomePhoneNumber: false,
            isValidFormatLiveOSCanada: false,
            isValidFormatSSPlan: false,
            isvalidFormatSSPlanCountry: false,
            isValidFormatCNESSTPension: false,
            isValidFormatWClaimD: false,
            isValidFormatSAAQPension: false,
            isValidFormatSAAQFNumber: false,
            isValidFormatWDDate: false,
            isValidFormatSWDDate: false,
            isValidFormatChildCAge: false,
            isValidFormatFamilybenefits: false,
            isValidFormatCFName: false,
            isValidFormatCGName: false,
            isValidFormatCDOB: false,
            isValidFormatCPBirth: false,
            isValidFormatDateadoption: false,
            isValidFormatCDeathDate: false,
            isValidFormatDACanada: false,
            isValidFormatArrivalinCanada: false,
            isValidFormatFamilybenefitsNP: false,
            isValidFormatLiveinCanada: false,
            isValidFormatWorkinQuebec: false,
            isValidFormatNWorkinQuebec: false,
            isValidFormatretroactivepension: false,
            isValidFormatpensionretroactively: false,
            isValidFormatpensionreceived: false,
            isValidFormatpensionstartlater: false,
            isValidFormatFinancial: false,
            isValidFormatPaymentdeposit1: false,
            isValidFormatPaymentdeposit2: false,
            isValidFormatPaymentdeposit3: false,
            isValidFormatPaymentdeposit4: false,
            isValidFormatPaymentdeposit5: false,
            isValidFormatDeclarationSign1: false,
            isValidFormatAnotherPSign: false,
            isValidFormatGender1: false,
            isValidFormFamilyname1: false,
            isValidFormGivenname1: false,
            isValidFormAddress1: false,
            isValidFormatMPhoneNumber1: false,
            isValidFormatHomePhoneNumber1: false,
            isValidFormatSSNumber1: false,
            isValidFormatDOB1: false,
            isValidFormatMFNamebirth: false,

        }
    }
    componentDidMount(){
        emailresult = localStorage.getItem('applicant_email');
    }

    //Handle Function
    handleChangeSocialNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= 9) {
            this.setState({ SocialNumberState: onlyNums });
        }
    };

    handleChangeGender(e, index, value) {
        this.setState({ GenderState: value });
    };

    handleChangeFamilyname(e) {
        const FName = e.target.value.replace(/[^A-z]/g, '');
        if (FName.length < 500) {
            this.setState({ FamilynameState: FName });
        }
    };

    handleChangeGivenname(e) {
        const GName = e.target.value.replace(/[^A-z]/g, '');
        if (GName.length < 500) {
            this.setState({ GivennameState: GName });
        }
    };

    handleChangeDOB(e, date) {
        this.setState({ DOBState: date });
    };

    handleChangeFamilynameatbirth(e) {
        const FatbirthName = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ FamilynameatbirthState: FatbirthName });
    };

    handleChangeGivennameatbirth(e) {
        const GatbirthName = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ GivennameatbirthState: GatbirthName });
    };

    handleSelectSuggest(suggest) {
        if (suggest) {
            this.setState({ PlaceofbirthState: suggest.description });
        }
    };

    handleChangePlaceofbirth(value) {
        this.setState({ PlaceofbirthState: value });
    };

    handleChangeMFnameatbirth(e) {
        const MFNameatbirthName = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ MFnameatbirthState: MFNameatbirthName });
    };

    handleChangeMGivenname(e) {
        const MGivenname = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ MGivennameState: MGivenname });
    };

    handleChangeFFamilyName(e) {
        const FFamilyName = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ FFamilyNameState: FFamilyName });
    };

    handleChangeFGivenname(e) {
        const FGivenname = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ FGivennameState: FGivenname });
    };

    handleChangeLanguageC(e, index, value) {
        this.setState({ LanguageCState: value });
    };

    handleSelectSuggestC(suggest) {
        if (suggest) {
            this.setState({ CityState: suggest.description })
        }
    };

    handleChangeCity(value) {
        this.setState({ CityState: value });
    };

    handleChangeMobilePhoneNumber(e) {
        const Nums = e.target.value.replace(/[^0-9]/g, '');
        if (Nums.length <= 10) {
            this.setState({ MobilePhoneNumberState: Nums });
        }
    };

    handleChangeHomePhoneNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= 10) {
            this.setState({ HomePhoneNumberState: onlyNums });
        }
    };

    handleChangeLiveOSCanada(e) {
        this.setState({ LiveOSCanadaState: e.target.value });
    };

    handleChangeSSPlan(e, index, value) {
        this.setState({ SSPlanState: value });
    };

    handleChangeSSPlanCountry(e, index, value) {
        this.setState({ SSPlanCountryState: value });
    };

    //Load Country List
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
            console.log(err);
        })
    }
    handleSignatureClear = (e) => {
        this.signaturePad.clear();
    };

    handleChangeCNESSTPension(e) {
        this.setState({ CNESSTPensionState: e.target.value });
    };

    handleChangeWClaimD(e, date) {
        this.setState({ WClaimDState: date });
    };

    handleChangeSAAQPension(e) {
        this.setState({ SAAQPensionState: e.target.value });
    };

    handleChangeSAAQFNumber(e) {
        this.setState({ SAAQFNumberState: e.target.value });
    };

    handleChangeWDDate(e, date) {
        this.setState({ WDDateState: date });
    };

    handleChangeSWDDate(e, date) {
        this.setState({ SWDDateState: date });
    };

    handleChangeChildCAge(e) {
        this.setState({ ChildCAgeState: e.target.value });
    };

    handleChangeFamilybenefits(e) {
        this.setState({ FamilybenefitsState: e.target.value });
    };

    handleChangeCFName(e) {
        const CFName = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ CFNameState: CFName });
    };

    handleChangeCGName(e) {
        const CGName = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ CGNameState: CGName });
    };

    handleChangeCDOB(e, date) {
        const { validationError } = this.state;
        this.setState({ CDOBState: date }, function () {
            if (this.state.DOBState > this.state.CDOBState) {
                this.setState({ ValidateYearWorked1: true });
            } else {
                this.setState({ ValidateYearWorked1: false });
            }
        });
        this.setState({ CDOBState: date });
    };

    handleSelectSuggestCP(suggest) {
        if (suggest) {
            this.setState({ CPBirthState: suggest.description });
        }
    };

    handleChangeCPBirth(value) {
        this.setState({ CPBirthState: value });
    };

    handleChangeDateadoption(e, date) {
        const { validationError } = this.state;
        this.setState({ DateadoptionState: date }, function () {
            if (this.state.CDOBState > this.state.DateadoptionState) {
                this.setState({ ValidateYearWorked2: true });
            } else {
                this.setState({ ValidateYearWorked2: false });
            }
        });
        this.setState({ DateadoptionState: date });
    };

    handleChangeCDeathDate(e, date) {
        const { validationError } = this.state;
        this.setState({ CDeathDateState: date }, function () {
            if (this.state.CDOBState > this.state.CDeathDateState) {
                this.setState({ ValidateYearWorked: true });
            } else {
                this.setState({ ValidateYearWorked: false });
            }
        });
    };

    handleChangeDACanada(e, date) {
        const { validationError } = this.state;
        this.setState({ DACanadaState: date }, function () {
            if (this.state.CDOBState > this.state.DACanadaState) {
                this.setState({ ValidateYearWorked3: true });
            } else {
                this.setState({ ValidateYearWorked3: false });
            }
        });
        this.setState({ DACanadaState: date });
    };

    handleChangeArrivalinCanada(e) {
        this.setState({ ArrivalinCanadaState: e.target.value });
    };

    handleChangeFamilybenefitsNP(e) {
        this.setState({ FamilybenefitsNPState: e.target.value });
    };

    handleChangeLiveinCanada(e) {
        this.setState({ LiveinCanadaState: e.target.value });
    };

    handleChangeWorkinQuebec(e) {
        this.setState({ WorkinQuebecState: e.target.value });
    };

    handleChangeNWorkinQuebec(e) {
        this.setState({ NWorkinQuebecState: e.target.value });
    };


    // handleChangeretroactivepension(e) {
    //     this.setState({ retroactivepensionState: e.target.value });
    // }
    handleChangepensionretroactively(e, date) {
        this.setState({ pensionretroactivelyState: date });
    };

    handleChangepensionreceived(e) {
        this.setState({ pensionreceivedState: e.target.value });
    };

    handleChangepensionstartlater(e, date) {
        this.setState({ pensionstartlaterState: date });
    };

    handleChangeFinancial(e) {
        const Financial = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ FinancialState: Financial });
    };

    handleChangePaymentdeposit1(e) {
        const Financial = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ Paymentdeposit1State: e.target.value });
    };

    handleChangePaymentdeposit2(e) {
        this.setState({ Paymentdeposit2State: e.target.value });
    };

    handleChangePaymentdeposit3(e) {
        this.setState({ Paymentdeposit3State: e.target.value });
    };

    handleSelectSuggestAF(suggest) {
        if (suggest) {
            this.setState({ Paymentdeposit4State: suggest.description });
        }
    };

    handleChangePaymentdeposit4(value) {
        this.setState({ Paymentdeposit4State: value });
    };

    handleChangePaymentdeposit5(e) {
        this.setState({ Paymentdeposit5State: e.target.value });
    };

    handleChangeDeclarationSign1(e, date) {
        this.setState({ DeclarationSign1State: date });
    };

    handleChangeAnotherPSign(e) {
        const AnotherPSign = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ AnotherPSignState: AnotherPSign });
    };

    handleChangeGender1(e, index, value) {
        this.setState({ Gender1State: value });
    };

    handleChangeFamilyname1(e) {
        const Familyname1 = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ Familyname1State: Familyname1 });
    };

    handleChangeGivenname1(e) {
        const Givenname1 = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ Givenname1State: Givenname1 });
    };

    handleSelectSuggestAP(suggest) {
        if(suggest){
            this.setState({ Address1State: suggest.description});
        }
    };

    handleChangeAddress1(value) {
        this.setState({ Address1State: value });
    };

    handleChangeMPhoneNumber1(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= 10) {
            this.setState({ MPhoneNumber1State: onlyNums });
        }
    };

    handleChangeHomePhoneNumber1(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= 10) {
            this.setState({ HomePhoneNumber1State: onlyNums });
        }
    };

    handleChangeSSNumber1(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= 9) {
            this.setState({ SSNumber1State: onlyNums });
        }
    };

    handleChangeDOB1(e, date) {
        this.setState({ DOB1State: date });
    };

    handleChangeMFNamebirth(e) {
        const MFNamebirth = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ MFNamebirthState: MFNamebirth });
    };

    handleChangeSuggestDate(e, date) {
        this.setState({ SuggestDateState: date });
    };

    handleChangePensionStart(e) {
        this.setState({ PensionStartState: e.target.value });
    };

    //Child validation Function
    handleValidateChildForm(event) {
        let validForm = false;
        var validCFNameForm = false;
        var validCGNameForm = false;
        var validCDOBForm = false;
        var validCPBirthForm = false;
        var validDateadoptionForm = false;
        var validCDeathDateForm = false;
        var validDACanadaForm = false;
        var validArrivalinCanadaForm = false;
        var validFamilybenefitsNPForm = false;
        var validLiveinCanadaForm = false;

        if (this.state.CFNameState.length > 0) {
            this.setState({ isValidCFName: false });
            if (this.state.CFNameState.length > 0 && this.state.CFNameState.length > 2) {
                this.setState({ isValidFormatCFName: false });
                validCFNameForm = true;
            }
            else {
                this.setState({ isValidFormatCFName: true });
                this.setState({ isValidCFName: false });
            }
        }
        else {
            this.setState({ isValidCFName: true });
            this.setState({ isValidFormatCFName: false });
            validCFNameForm = false;
        }
        if (this.state.CGNameState.length > 0) {
            this.setState({ isValidCGName: false });
            if (this.state.CGNameState.length > 0 && this.state.CGNameState.length > 2) {
                this.setState({ isValidFormatCGName: false });
                validCGNameForm = true;
            }
            else {
                this.setState({ isValidFormatCGName: true });
                this.setState({ isValidCGName: false });
            }
        }
        else {
            this.setState({ isValidCGName: true });
            this.setState({ isValidFormatCGName: false });
            validCGNameForm = false;
        }
        if (this.state.CDOBState != "") {
            this.setState({ isValidCDOB: false });
            validCDOBForm = true;
        }
        else {
            this.setState({ isValidCDOB: true });
            validCDOBForm = false;
        }
        if (this.state.CPBirthState.length > 0) {
            this.setState({ isValidCPBirth: false });
            if (this.state.CPBirthState.length > 0 && this.state.CPBirthState.length > 2) {
                this.setState({ isValidFormatCPBirth: false });
                validCPBirthForm = true;
            }
            else {
                this.setState({ isValidFormatCPBirth: true });
                this.setState({ isValidCPBirth: false });
            }
        }
        else {
            this.setState({ isValidCPBirth: true });
            this.setState({ isValidFormatCPBirth: false });
            validCPBirthForm = false;
        }
        if (this.state.DateadoptionState != "") {
            this.setState({ isValidDateadoption: false });
            validDateadoptionForm = true;
        }
        else {
            this.setState({ isValidDateadoption: true });
            validDateadoptionForm = false;
        }
        if (this.state.CDeathDateState != "") {
            this.setState({ isValidCDeathDate: false });
            validCDeathDateForm = true;
        }
        else {
            this.setState({ isValidCDeathDate: true });
            validCDeathDateForm = false;
        }
        if (this.state.DACanadaState != "") {
            this.setState({ isValidDACanada: false });
            validDACanadaForm = true;
        }
        else {
            this.setState({ isValidDACanada: true });
            validDACanadaForm = false;
        }
        if (this.state.ArrivalinCanadaState.length > 0) {
            this.setState({ isValidArrivalinCanada: false });
            if (this.state.ArrivalinCanadaState.length > 0 && this.state.ArrivalinCanadaState.length > 2) {
                this.setState({ isValidFormatArrivalinCanada: false });
                validArrivalinCanadaForm = true;
            }
            else {
                this.setState({ isValidFormatArrivalinCanada: true });
                this.setState({ isValidArrivalinCanada: false });
            }
        }
        else {
            this.setState({ isValidArrivalinCanada: true });
            this.setState({ isValidFormatArrivalinCanada: false });
            validArrivalinCanadaForm = false;
        }
        if (this.state.FamilybenefitsNPState.length > 0) {
            this.setState({ isValidFamilybenefitsNP: false });
            if (this.state.FamilybenefitsNPState.length > 0 && this.state.FamilybenefitsNPState.length > 2) {
                this.setState({ isValidFormatFamilybenefitsNP: false });
                validFamilybenefitsNPForm = true;
            }
            else {
                this.setState({ isValidFormatFamilybenefitsNP: true });
                this.setState({ isValidFamilybenefitsNP: false });
            }
        }
        else {
            this.setState({ isValidFamilybenefitsNP: true });
            this.setState({ isValidFormatFamilybenefitsNP: false });
            validFamilybenefitsNPForm = false;
        }
        if (this.state.LiveinCanadaState.length > 0) {
            this.setState({ isValidLiveinCanada: false });
            if (this.state.LiveinCanadaState.length > 0 && this.state.LiveinCanadaState.length > 2) {
                this.setState({ isValidFormatLiveinCanada: false });
                validLiveinCanadaForm = true;
            }
            else {
                this.setState({ isValidFormatLiveinCanada: true });
                this.setState({ isValidLiveinCanada: false });
            }
        }
        else {
            this.setState({ isValidLiveinCanada: true });
            this.setState({ isValidFormatLiveinCanada: false });
            validLiveinCanadaForm = false;
        }

        if (validCFNameForm && validCGNameForm && validCDOBForm && validCPBirthForm
            && validDateadoptionForm && validCDeathDateForm && validDACanadaForm &&
            validArrivalinCanadaForm && validFamilybenefitsNPForm && validLiveinCanadaForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Validation Function
    handleValidateForm(event) {
        let validForm = false;
        var validSocialNumberForm = false;
        var validGenderForm = false;
        var validFamilynameForm = false;
        var validGivennameForm = false;
        var validDOBForm = false;
        var validFamilynameatbirthForm = false;
        var validGivennameatbirthForm = false;
        var validPlaceofbirthForm = false;
        var validMFnameatbirthForm = false;
        var validMGivennameForm = false;
        var validFFamilyNameForm = false;
        var validFGivennameForm = false;
        var validLanguageCForm = false;
        var validCityForm = false;
        var validMobilePhoneNumberForm = false;
        var validHomePhoneNumberForm = false;
        var validLiveOSCanadaForm = false;
        var validSSPlanForm = false;
        var validSSPlanCountryForm = false;
        var validCNESSTPensionForm = false;
        var validWClaimDForm = false;
        var validSAAQPensionForm = false;
        var validSAAQFNumberForm = false;
        var validWDDateForm = false;
        var validSWDDateForm = false;
        var validChildCAgeForm = false;
        var validFamilybenefitsForm = false;
        var validCFNameForm = false;
        var validCGNameForm = false;
        var validCDOBForm = false;
        var validCPBirthForm = false;
        var validDateadoptionForm = false;
        var validCDeathDateForm = false;
        var validDACanadaForm = false;
        var validArrivalinCanadaForm = false;
        var validFamilybenefitsNPForm = false;
        var validLiveinCanadaForm = false;
        var validWorkinQuebecForm = false;
        var validNWorkinQuebecForm = false;
        //var validretroactivepensionForm = false;
        var validpensionretroactivelyForm = false;
        //var validpensionreceivedForm = false;
        var validpensionstartlaterForm = false;
        var validFinancialForm = false;
        var validPaymentdeposit1Form = false;
        var validPaymentdeposit2Form = false;
        var validPaymentdeposit3Form = false;
        var validPaymentdeposit4Form = false;
        var validPaymentdeposit5Form = false;
        var validDeclarationSign1Form = false;
        var validAnotherPSignForm = false;
        var validGender1Form = false;
        var validFamilyname1Form = false;
        var validGivenname1Form = false;
        var validAddress1Form = false;
        var validMPhoneNumber1Form = false;
        var validHomePhoneNumber1Form = false;
        var validSSNumber1Form = false;
        var validDOB1Form = false;
        var validMFNamebirthForm = false;
        var validSignatureForm = false;
        var validSuggestDateForm = false;
        var validPensionStartForm = false;

        if (this.state.SocialNumberState.length > 0) {
            this.setState({ isValidSocialNumber: false });
            if (this.state.SocialNumberState.length > 0 && this.state.SocialNumberState.length >= 9) {
                this.setState({ isValidFormatSocialNumber: false });
                validSocialNumberForm = true;
            }
            else {
                this.setState({ isValidFormatSocialNumber: true });
                this.setState({ isValidSocialNumber: false });
            }
        }
        else {
            this.setState({ isValidSocialNumber: true });
            this.setState({ isValidFormatSocialNumber: false });
            validSocialNumberForm = false;
        }

        if (this.state.GenderState != "") {
            this.setState({ isValidGender: false });
            validGenderForm = true;
        }
        else {
            this.setState({ isValidGender: true });
            validGenderForm = false;
        }

        if (this.state.FamilynameState.length > 0) {
            this.setState({ isValidFamilyname: false });
            if (this.state.FamilynameState.length > 0 && this.state.FamilynameState.length > 2) {
                this.setState({ isValidFormatFamilyname: false });
                validFamilynameForm = true;
            }
            else {
                this.setState({ isValidFormatFamilyname: true });
                this.setState({ isValidFamilyname: false });
            }
        }
        else {
            this.setState({ isValidFamilyname: true });
            this.setState({ isValidFormatFamilyname: false });
            validFamilynameForm = false;
        }
        if (this.state.GivennameState.length > 0) {
            this.setState({ isValidGivenname: false });
            if (this.state.GivennameState.length > 0 && this.state.GivennameState.length > 3) {
                this.setState({ isValidFormatGivenname: false });
                validGivennameForm = true;
            }
            else {
                this.setState({ isValidFormatGivenname: true });
                this.setState({ isValidGivenname: false });
            }
        }
        else {
            this.setState({ isValidGivenname: true });
            this.setState({ isValidFormatGivenname: false });
            validGivennameForm = false;
        }

        if (this.state.DOBState != "") {
            this.setState({ isValidDOB: false });
            validDOBForm = true;
        }
        else {
            this.setState({ isValidDOB: true });
            validDOBForm = false;
        }
        if (this.state.FamilynameatbirthState.length > 0) {
            this.setState({ isValidFamilynameatbirth: false });
            if (this.state.FamilynameatbirthState.length > 0 && this.state.FamilynameatbirthState.length > 2) {
                this.setState({ isValidFormatFamilynameatbirth: false });
                validFamilynameatbirthForm = true;
            }
            else {
                this.setState({ isValidFormatFamilynameatbirth: true });
                this.setState({ isValidFamilynameatbirth: false });
            }
        }
        else {
            this.setState({ isValidFamilynameatbirth: true });
            this.setState({ isValidFormatFamilynameatbirth: false });
            validFamilynameatbirthForm = false;
        }
        if (this.state.GivennameatbirthState.length > 0) {
            this.setState({ isValidGivennameatbirth: false });
            if (this.state.GivennameatbirthState.length > 0 && this.state.GivennameatbirthState.length > 2) {
                this.setState({ isValidFormatGivennameatbirth: false });
                validGivennameatbirthForm = true;
            }
            else {
                this.setState({ isValidFormatGivennameatbirth: true });
                this.setState({ isValidGivennameatbirth: false });
            }
        }
        else {
            this.setState({ isValidGivennameatbirth: true });
            this.setState({ isValidFormatGivennameatbirth: false });
            validGivennameatbirthForm = false;
        }
        if (this.state.PlaceofbirthState.length > 0) {
            this.setState({ isValidPlaceofbirth: false });
            if (this.state.PlaceofbirthState.length > 0 && this.state.PlaceofbirthState.length > 2) {
                this.setState({ isValidFormatPlaceofbirth: false });
                validPlaceofbirthForm = true;
            }
            else {
                this.setState({ isValidFormatPlaceofbirth: true });
                this.setState({ isValidPlaceofbirth: false });
            }
        }
        else {
            this.setState({ isValidPlaceofbirth: true });
            this.setState({ isValidFormatPlaceofbirth: false });
            validPlaceofbirthForm = false;
        }
        if (this.state.MFnameatbirthState.length > 0) {
            this.setState({ isValidMFnameatbirth: false });
            if (this.state.MFnameatbirthState.length > 0 && this.state.MFnameatbirthState.length > 2) {
                this.setState({ isValidFormatMFnameatbirth: false });
                validMFnameatbirthForm = true;
            }
            else {
                this.setState({ isValidFormatMFnameatbirth: true });
                this.setState({ isValidMFnameatbirth: false });
            }
        }
        else {
            this.setState({ isValidMFnameatbirth: true });
            this.setState({ isValidFormatMFnameatbirth: false });
            validMFnameatbirthForm = false;
        }
        if (this.state.MGivennameState.length > 0) {
            this.setState({ isValidMGivenname: false });
            if (this.state.MGivennameState.length > 0 && this.state.MGivennameState.length > 2) {
                this.setState({ isValidFormatMGivenname: false });
                validMGivennameForm = true;
            }
            else {
                this.setState({ isValidFormatMGivenname: true });
                this.setState({ isValidMGivenname: false });
            }
        }
        else {
            this.setState({ isValidMGivenname: true });
            this.setState({ isValidFormatMGivenname: false });
            validMGivennameForm = false;
        }

        if (this.state.FFamilyNameState.length > 0) {
            this.setState({ isValidFFamilyName: false });
            if (this.state.FFamilyNameState.length > 0 && this.state.FFamilyNameState.length > 2) {
                this.setState({ isValidFormatFFamilyName: false });
                validFFamilyNameForm = true;
            }
            else {
                this.setState({ isValidFormatFFamilyName: true });
                this.setState({ isValidFFamilyName: false });
            }
        }
        else {
            this.setState({ isValidFFamilyName: true });
            this.setState({ isValidFormatFFamilyName: false });
            validFFamilyNameForm = false;
        }
        if (this.state.FGivennameState.length > 0) {
            this.setState({ isValidFGivenname: false });
            if (this.state.FGivennameState.length > 0 && this.state.FGivennameState.length > 2) {
                this.setState({ isValidFormatFGivenname: false });
                validFGivennameForm = true;
            }
            else {
                this.setState({ isValidFormatFGivenname: true });
                this.setState({ isValidFGivenname: false });
            }
        }
        else {
            this.setState({ isValidFGivenname: true });
            this.setState({ isValidFormatFGivenname: false });
            validFGivennameForm = false;
        }
        if (this.state.LanguageCState != "") {
            this.setState({ isValidLanguageC: false });
            validLanguageCForm = true;
        }
        else {
            this.setState({ isValidLanguageC: true });
            validLanguageCForm = false;
        }

        if (this.state.CityState.length > 0) {
            this.setState({ isValidCity: false });
            if (this.state.CityState.length > 0 && this.state.CityState.length > 2) {
                this.setState({ isValidFormatCity: false });
                validCityForm = true;
            }
            else {
                this.setState({ isValidFormatCity: true });
                this.setState({ isValidCity: false });
            }
        }
        else {
            this.setState({ isValidCity: true });
            this.setState({ isValidFormatCity: false });
            validCityForm = false;
        }
        if (this.state.MobilePhoneNumberState.length > 0) {
            this.setState({ isValidMobilePhoneNumber: false });
            if (this.state.MobilePhoneNumberState.length > 0 && this.state.MobilePhoneNumberState.length >= 10) {
                this.setState({ isValidFormatMobilePhoneNumber: false });
                validMobilePhoneNumberForm = true;
            }
            else {
                this.setState({ isValidFormatMobilePhoneNumber: true });
                this.setState({ isValidMobilePhoneNumber: false });
            }
        }
        else {
            this.setState({ isValidMobilePhoneNumber: true });
            this.setState({ isValidFormatMobilePhoneNumber: false });
            validMobilePhoneNumberForm = false;
        }

        if (this.state.HomePhoneNumberState.length > 0) {
            this.setState({ isValidHomePhoneNumber: false });
            if (this.state.HomePhoneNumberState.length > 0 && this.state.HomePhoneNumberState.length >= 10) {
                this.setState({ isValidFormatHomePhoneNumber: false });
                validHomePhoneNumberForm = true;
            }
            else {
                this.setState({ isValidFormatHomePhoneNumber: true });
                this.setState({ isValidHomePhoneNumber: false });
            }
        }
        else {
            this.setState({ isValidHomePhoneNumber: true });
            this.setState({ isValidFormatHomePhoneNumber: false });
            validHomePhoneNumberForm = false;
        }
        if (this.state.LiveOSCanadaState.length > 0) {
            this.setState({ isValidLiveOSCanada: false });
            if (this.state.LiveOSCanadaState.length > 0 && this.state.LiveOSCanadaState.length > 2) {
                this.setState({ isValidFormatLiveOSCanada: false });
                validLiveOSCanadaForm = true;
            }
            else {
                this.setState({ isValidFormatLiveOSCanada: true });
                this.setState({ isValidLiveOSCanada: false });
            }
        }
        else {
            this.setState({ isValidLiveOSCanada: true });
            this.setState({ isValidFormatLiveOSCanada: false });
            validLiveOSCanadaForm = false;
        }
        if (this.state.SSPlanState != "") {
            this.setState({ isValidSSPlan: false });
            validSSPlanForm = true;
        }
        else {
            this.setState({ isValidSSPlan: true });
            validSSPlanForm = false;
        }
        if (this.state.SSPlanCountryState != "") {
            this.setState({ isValidSSPlanCountry: false });
            validSSPlanCountryForm = true;
        }
        else {
            this.setState({ isValidSSPlanCountry: true });
            validSSPlanCountryForm = false;
        }
        if (this.state.CNESSTPensionState != "") {
            this.setState({ isValidCNESSTPension: false });
            validCNESSTPensionForm = true;
        }
        else {
            this.setState({ isValidCNESSTPension: true });
            validCNESSTPensionForm = false;
        }


        if (this.state.CNESSTPensionState == "No") {
            if (this.state.SAAQPensionState != "") {
                this.setState({ isValidSAAQPension: false });
                validSAAQPensionForm = true;
            }
            else {
                this.setState({ isValidSAAQPension: true });
                validSAAQPensionForm = false;
            }
        }
        else {
            this.setState({ isValidSAAQPensionName: false });
            validSAAQPensionForm = true;
        }
        if (this.state.CNESSTPensionState == "Yes") {
            if (this.state.WClaimDState != "") {
                this.setState({ isValidWClaimD: false });
                validWClaimDForm = true;
            }
            else {
                this.setState({ isValidWClaimD: true });
                validWClaimDForm = false;
            }
        }
        else {
            this.setState({ isValidWClaimD: false });
            validWClaimDForm = true;
        }
        if (this.state.SAAQPensionState == "No") {
            if (this.state.ChildCAgeState != "") {
                this.setState({ isValidChildCAge: false });
                validChildCAgeForm = true;
            }
            else {
                this.setState({ isValidChildCAge: true });
                validChildCAgeForm = false;
            }
        }
        else {
            this.setState({ isValidChildCAge: false });
            validChildCAgeForm = true;
        }
        if (this.state.SAAQPensionState == "Yes") {
            if (this.state.SAAQFNumberState.length > 0) {
                this.setState({ isValidSAAQFNumber: false });
                if (this.state.SAAQFNumberState.length > 0 && this.state.SAAQFNumberState.length > 2) {
                    this.setState({ isValidFormatSAAQFNumber: false });
                    validSAAQFNumberForm = true;
                }
                else {
                    this.setState({ isValidFormatSAAQFNumber: true });
                    this.setState({ isValidSAAQFNumber: false });
                }
            }
            else {
                this.setState({ isValidSAAQFNumber: true });
                this.setState({ isValidFormatSAAQFNumber: false });
                validSAAQFNumberForm = false;
            }
            if (this.state.WDDateState != "") {
                this.setState({ isValidWDDate: false });
                validWDDateForm = true;
            }
            else {
                this.setState({ isValidWDDate: true });
                validWDDateForm = false;
            }
            if (this.state.SWDDateState != "") {
                this.setState({ isValidSWDDate: false });
                validSWDDateForm = true;
            }
            else {
                this.setState({ isValidSWDDate: true });
                validSWDDateForm = false;
            }

        }
        else {
            this.setState({ isValidSAAQFNumber: false });
            this.setState({ isWDDateState: false });
            this.setState({ isValidSWDDate: false });
            validSAAQFNumberForm = true;
            validWDDateForm = true;
            validSWDDateForm = true;
        }
        if (this.state.FamilybenefitsState == "No" || this.state.ChildCAgeState == "No") {
            if (this.state.WorkinQuebecState != "") {
                this.setState({ isValidWorkinQuebec: false });
                validWorkinQuebecForm = true;
            }
            else {
                this.setState({ isValidWorkinQuebec: true });
                validWorkinQuebecForm = false;
            }
            if (this.state.NWorkinQuebecState != "") {
                this.setState({ isValidNWorkinQuebec: false });
                validNWorkinQuebecForm = true;
            }
            else {
                this.setState({ isValidNWorkinQuebec: true });
                validNWorkinQuebecForm = false;
            }

        }
        else {
            this.setState({ isValidWorkinQuebec: false });
            this.setState({ isValidNWorkinQuebec: false });
            validWorkinQuebecForm = true;
            validNWorkinQuebecForm = true;
        }



        if (this.state.FamilybenefitsState != "") {
            this.setState({ isValidFamilybenefits: false });
            validFamilybenefitsForm = true;
        }
        else {
            this.setState({ isValidFamilybenefits: true });
            validFamilybenefitsForm = false;
        }

        // if (this.state.retroactivepensionState.length > 0) {
        //     this.setState({ isValidretroactivepension: false });
        //     if (this.state.retroactivepensionState.length > 0 && this.state.retroactivepensionState.length > 2) {
        //         this.setState({ isValidFormatretroactivepension: false });
        //         validretroactivepensionForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatretroactivepension: true });
        //         this.setState({ isValidretroactivepension: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidretroactivepension: true });
        //     this.setState({ isValidFormatretroactivepension: false });
        //     validretroactivepensionForm = false;
        // }

        // if (this.state.pensionreceivedState.length > 0) {
        //     this.setState({ isValidpensionreceived: false });
        //     if (this.state.pensionreceivedState.length > 0 && this.state.pensionreceivedState.length > 2) {
        //         this.setState({ isValidFormatpensionreceived: false });
        //         validpensionreceivedForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatpensionreceived: true });
        //         this.setState({ isValidpensionreceived: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidpensionreceived: true });
        //     this.setState({ isValidFormatpensionreceived: false });
        //     validpensionreceivedForm = false;
        // }

        if (this.state.FinancialState.length > 0) {
            this.setState({ isValidFinancial: false });
            if (this.state.FinancialState.length > 0 && this.state.FinancialState.length > 2) {
                this.setState({ isValidFormatFinancial: false });
                validFinancialForm = true;
            }
            else {
                this.setState({ isValidFormatFinancial: true });
                this.setState({ isValidFinancial: false });
            }
        }
        else {
            this.setState({ isValidFinancial: true });
            this.setState({ isValidFormatFinancial: false });
            validFinancialForm = false;
        }
        if (this.state.Paymentdeposit1State.length > 0) {
            this.setState({ isValidPaymentdeposit1: false });
            if (this.state.Paymentdeposit1State.length > 0 && this.state.Paymentdeposit1State.length > 2) {
                this.setState({ isValidFormatPaymentdeposit1: false });
                validPaymentdeposit1Form = true;
            }
            else {
                this.setState({ isValidFormatPaymentdeposit1: true });
                this.setState({ isValidPaymentdeposit1: false });
            }
        }
        else {
            this.setState({ isValidPaymentdeposit1: true });
            this.setState({ isValidFormatPaymentdeposit1: false });
            validPaymentdeposit1Form = false;
        }
        if (this.state.Paymentdeposit2State.length > 0) {
            this.setState({ isValidPaymentdeposit2: false });
            if (this.state.Paymentdeposit2State.length > 0 && this.state.Paymentdeposit2State.length > 2) {
                this.setState({ isValidFormatPaymentdeposit2: false });
                validPaymentdeposit2Form = true;
            }
            else {
                this.setState({ isValidFormatPaymentdeposit2: true });
                this.setState({ isValidPaymentdeposit2: false });
            }
        }
        else {
            this.setState({ isValidPaymentdeposit2: true });
            this.setState({ isValidFormatPaymentdeposit2: false });
            validPaymentdeposit2Form = false;
        }
        if (this.state.Paymentdeposit3State.length > 0) {
            this.setState({ isValidPaymentdeposit3: false });
            if (this.state.Paymentdeposit3State.length > 0 && this.state.Paymentdeposit3State.length > 2) {
                this.setState({ isValidFormatPaymentdeposit3: false });
                validPaymentdeposit3Form = true;
            }
            else {
                this.setState({ isValidFormatPaymentdeposit3: true });
                this.setState({ isValidPaymentdeposit3: false });
            }
        }
        else {
            this.setState({ isValidPaymentdeposit3: true });
            this.setState({ isValidFormatPaymentdeposit3: false });
            validPaymentdeposit3Form = false;
        }
        if (this.state.Paymentdeposit4State.length > 0) {
            this.setState({ isValidPaymentdeposit4: false });
            if (this.state.Paymentdeposit4State.length > 0 && this.state.Paymentdeposit4State.length > 2) {
                this.setState({ isValidFormatPaymentdeposit4: false });
                validPaymentdeposit4Form = true;
            }
            else {
                this.setState({ isValidFormatPaymentdeposit4: true });
                this.setState({ isValidPaymentdeposit4: false });
            }
        }
        else {
            this.setState({ isValidPaymentdeposit4: true });
            this.setState({ isValidFormatPaymentdeposit4: false });
            validPaymentdeposit4Form = false;
        }
        if (this.state.Paymentdeposit5State.length > 0) {
            this.setState({ isValidPaymentdeposit5: false });
            if (this.state.Paymentdeposit5State.length > 0 && this.state.Paymentdeposit5State.length > 2) {
                this.setState({ isValidFormatPaymentdeposit5: false });
                validPaymentdeposit5Form = true;
            }
            else {
                this.setState({ isValidFormatPaymentdeposit5: true });
                this.setState({ isValidPaymentdeposit5: false });
            }
        }
        else {
            this.setState({ isValidPaymentdeposit5: true });
            this.setState({ isValidFormatPaymentdeposit5: false });
            validPaymentdeposit5Form = false;
        }

        if (this.state.DeclarationSign1State != "") {
            this.setState({ isValidDeclarationSign1: false });
            validDeclarationSign1Form = true;
        }
        else {
            this.setState({ isValidDeclarationSign1: true });
            validDeclarationSign1Form = false;
        }
        if (this.state.AnotherPSignState.length > 0) {
            this.setState({ isValidAnotherPSign: false });
            if (this.state.AnotherPSignState.length > 0 && this.state.AnotherPSignState.length > 2) {
                this.setState({ isValidFormatAnotherPSign: false });
                validAnotherPSignForm = true;
            }
            else {
                this.setState({ isValidFormatAnotherPSign: true });
                this.setState({ isValidAnotherPSign: false });
            }
        }
        else {
            this.setState({ isValidAnotherPSign: true });
            this.setState({ isValidFormatAnotherPSign: false });
            validAnotherPSignForm = false;
        }
        if (this.state.Gender1State != "") {
            this.setState({ isValidGender1: false });
            validGender1Form = true;
        }
        else {
            this.setState({ isValidGender1: true });
            validGender1Form = false;
        }

        if (this.state.Familyname1State.length > 0) {
            this.setState({ isValidFamilyname1: false });
            if (this.state.Familyname1State.length > 0 && this.state.Familyname1State.length > 2) {
                this.setState({ isValidFormatFamilyname1: false });
                validFamilyname1Form = true;
            }
            else {
                this.setState({ isValidFormatFamilyname1: true });
                this.setState({ isValidFamilyname1: false });
            }
        }
        else {
            this.setState({ isValidFamilyname1: true });
            this.setState({ isValidFormatFamilyname1: false });
            validFamilyname1Form = false;
        }
        if (this.state.Givenname1State.length > 0) {
            this.setState({ isValidGivenname1: false });
            if (this.state.Givenname1State.length > 0 && this.state.Givenname1State.length > 2) {
                this.setState({ isValidFormatGivenname1: false });
                validGivenname1Form = true;
            }
            else {
                this.setState({ isValidFormatGivenname1: true });
                this.setState({ isValidGivenname1: false });
            }
        }
        else {
            this.setState({ isValidGivenname1: true });
            this.setState({ isValidFormatGivenname1: false });
            validGivenname1Form = false;
        }

        if (this.state.Address1State.length > 0) {
            this.setState({ isValidAddress1: false });
            if (this.state.Address1State.length > 0 && this.state.Address1State.length > 2) {
                this.setState({ isValidFormatAddress1: false });
                validAddress1Form = true;
            }
            else {
                this.setState({ isValidFormatAddress1: true });
                this.setState({ isValidAddress1: false });
            }
        }
        else {
            this.setState({ isValidAddress1: true });
            this.setState({ isValidFormatAddress1: false });
            validAddress1Form = false;
        }
        if (this.state.HomePhoneNumber1State.length > 0) {
            this.setState({ isValidHomePhoneNumber1: false });
            if (this.state.HomePhoneNumber1State.length > 0 && this.state.HomePhoneNumber1State.length > 2) {
                this.setState({ isValidFormatHomePhoneNumber1: false });
                validHomePhoneNumber1Form = true;
            }
            else {
                this.setState({ isValidFormatHomePhoneNumber1: true });
                this.setState({ isValidHomePhoneNumber1: false });
            }
        }
        else {
            this.setState({ isValidHomePhoneNumber1: true });
            this.setState({ isValidFormatHomePhoneNumber1: false });
            validHomePhoneNumber1Form = false;
        }
        if (this.state.MPhoneNumber1State.length > 0) {
            this.setState({ isValidMPhoneNumber1: false });
            if (this.state.MPhoneNumber1State.length > 0 && this.state.MPhoneNumber1State.length > 2) {
                this.setState({ isValidFormatMPhoneNumber1: false });
                validMPhoneNumber1Form = true;
            }
            else {
                this.setState({ isValidFormatMPhoneNumber1: true });
                this.setState({ isValidMPhoneNumber1: false });
            }
        }
        else {
            this.setState({ isValidMPhoneNumber1: true });
            this.setState({ isValidFormatMPhoneNumber1: false });
            validMPhoneNumber1Form = false;
        }
        if (this.state.SSNumber1State.length > 0) {
            this.setState({ isValidSSNumber1: false });
            if (this.state.SSNumber1State.length > 0 && this.state.SSNumber1State.length < 11) {
                this.setState({ isValidFormatSSNumber1: false });
                validSSNumber1Form = true;
            }
            else {
                this.setState({ isValidFormatSSNumber1: true });
                this.setState({ isValidSSNumber1: false });
            }
        }
        else {
            this.setState({ isValidSSNumber1: true });
            this.setState({ isValidFormatSSNumber1: false });
            validSSNumber1Form = false;
        }
        if (this.state.DOB1State != "") {
            this.setState({ isValidDOB1: false });
            validDOB1Form = true;
        }
        else {
            this.setState({ isValidDOB1: true });
            validDOB1Form = false;
        }
        if (this.state.MFNamebirthState.length > 0) {
            this.setState({ isValidMFNamebirth: false });
            var varPasswordFormat = /(?=.*[a-z])(?=.*[A-Z])/;
            if (this.state.MFNamebirthState.length > 0 && this.state.MFNamebirthState.length > 2) {
                this.setState({ isValidFormatMFNamebirth: false });
                validMFNamebirthForm = true;
            }
            else {
                this.setState({ isValidFormatMFNamebirth: true });
                this.setState({ isValidMFNamebirth: false });
            }
        }
        else {
            this.setState({ isValidMFNamebirth: true });
            this.setState({ isValidFormatMFNamebirth: false });
            validMFNamebirthForm = false;
        }
        if (this.signaturePad.isEmpty()) {
            this.setState({ isValidSignature: true });
            validSignatureForm = false;
        }
        else {
            this.setState({ isValidSignature: false });
            validSignatureForm = true;
        }
        if (this.state.ApplicantAge >= 56 && this.state.ApplicantAge <= 65) {
            if (this.state.SuggestDateState != "") {
                this.setState({ isValidSuggestDate: false });
                validSuggestDateForm = true;
            }
            else {
                this.setState({ isValidSuggestDate: true });
                validSuggestDateForm = false;
            }
        }
        else {
            this.setState({ isValidSuggestDate: false });
            validSuggestDateForm = true;
        }
        if (this.state.ApplicantAge >= 65) {
            if (this.state.PensionStartState != "") {
                this.setState({ isValidPensionStart: false });
                validPensionStartForm = true;
            }
            else {
                this.setState({ isValidPensionStart: true });
                validPensionStartForm = false;
            }
            if (this.state.pensionretroactivelyState != "") {
                this.setState({ isValidpensionretroactively: false });
                validpensionretroactivelyForm = true;
            }
            else {
                this.setState({ isValidpensionretroactively: true });
                validpensionretroactivelyForm = false;
            }
            if (this.state.pensionstartlaterState != "") {
                this.setState({ isValidpensionstartlater: false });
                validpensionstartlaterForm = true;
            }
            else {
                this.setState({ isValidpensionstartlater: true });
                validpensionstartlaterForm = false;
            }
        }
        else {
            this.setState({ isValidPensionStart: false });
            this.setState({ isValidpensionretroactively: false });
            this.setState({ isValidpensionstartlater: false });
            validPensionStartForm = true;
            validpensionretroactivelyForm = true;
            validpensionstartlaterForm = true;
        }
        if (
            validSocialNumberForm && validGenderForm && validFamilynameForm && validGivennameForm && validDOBForm && validFamilynameatbirthForm && validGivennameatbirthForm && validPlaceofbirthForm && validMFnameatbirthForm &&
            validMGivennameForm && validFFamilyNameForm && validFGivennameForm && validLanguageCForm && validCityForm && validMobilePhoneNumberForm && validHomePhoneNumberForm && validLiveOSCanadaForm && validSSPlanForm &&
            validSSPlanCountryForm && validCNESSTPensionForm && validWClaimDForm && validSAAQPensionForm && validSAAQFNumberForm && validWDDateForm && validSWDDateForm && validChildCAgeForm && validFamilybenefitsForm &&
            validWorkinQuebecForm && validNWorkinQuebecForm && validpensionretroactivelyForm && validpensionstartlaterForm && validFinancialForm && validPaymentdeposit1Form && validPaymentdeposit2Form && validPaymentdeposit3Form &&
            validPaymentdeposit4Form && validPaymentdeposit5Form && validDeclarationSign1Form && validAnotherPSignForm && validGender1Form && validFamilyname1Form && validGivenname1Form && validAddress1Form && validMPhoneNumber1Form &&
            validHomePhoneNumber1Form && validSSNumber1Form && validSignatureForm && validDOB1Form && validMFNamebirthForm && validSuggestDateForm && validPensionStartForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    handleQuebecEdit(event) {
        var thisObj = this;
        let UserID;
        //let DasboardSummaryAPIUrl = "https://z95u0w2el1.execute-api.us-west-2.amazonaws.com/Dev/GPA_DashboardSummary_Lambda";
        let DasboardSummaryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var data = {
            QueryName: "Auto",
            UserID: emailresult,
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
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ InquiryState: data[i].InquiryAbout });
                thisObj.setState({ AreYouState: data[i].AreYou });
                thisObj.setState({ GenderState: data[i].Gender });
                thisObj.setState({ TitleState: data[i].Title });
                thisObj.setState({ FirstNameState: data[i].FirstName });
                thisObj.setState({ MiddleNameState: data[i].MiddleName });
                thisObj.setState({ LastNameState: data[i].LastName });
                thisObj.setState({ SuffixState: data[i].Suffix });
                thisObj.setState({ UserIdState: data[i].UserID });
                thisObj.setState({ BirthNameState: data[i].BirthName });
                thisObj.setState({ MaidenNameState: data[i].MaidenName });
                thisObj.setState({ DayState: data[i].DOB_Day });
                thisObj.setState({ MonthState: data[i].DOB_Month });
                thisObj.setState({ YearState: data[i].DOB_Year });
                thisObj.setState({ CountryState: data[i].CountryOfCitizenship });
                thisObj.setState({ MailingAddressState: data[i].MailingAddress });
                thisObj.setState({ PhoneNumState: data[i].PhoneNum });
                thisObj.setState({ HomeNumState: data[i].HomeNum });
                thisObj.setState({ MaritalStatusState: data[i].MaritalStatus });
                if (data[i].MaritalStatus == "Single") {
                    thisObj.setState({ PModalEnableState: false });
                    thisObj.setState({ PartnerInfoShow: true });
                }
                else {
                    if (data[i].MaritalStatus == "Married") {
                        thisObj.setState({ PModalTitleState: "Date of Marriage" });
                        thisObj.setState({ PModalEnableState: true });
                        thisObj.setState({ PartnerInfoShow: false });
                    }
                    else if (data[i].MaritalStatus == "Civil Partnership") {
                        thisObj.setState({ PModalTitleState: "Date of Civil Partnetship" });
                        thisObj.setState({ PModalEnableState: true });
                        thisObj.setState({ PartnerInfoShow: false });
                    }
                    else if (data[i].MaritalStatus == "Divorced") {
                        thisObj.setState({ PModalTitleState: "Date of Divorced" });
                        thisObj.setState({ PModalEnableState: true });
                        thisObj.setState({ PartnerInfoShow: false });
                    }
                    else if (data[i].MaritalStatus == "Widowed") {
                        thisObj.setState({ PModalTitleState: "Date of Windowed" });
                        thisObj.setState({ PModalEnableState: true });
                        thisObj.setState({ PartnerInfoShow: false });
                    }
                    else {
                        thisObj.setState({ PModalEnableState: false });
                        thisObj.setState({ PartnerInfoShow: true });
                    }
                }
            }
        }).catch((err) => {
        });
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

                SocialNumber: this.state.SocialNumberState,
                Gender: this.state.GenderState,
                Familyname: this.state.FamilynameState,
                Givenname: this.state.GivennameState,
                DOB: this.state.DOBState,
                Familynameatbirth: this.state.FamilynameatbirthState,
                Givennameatbirth: this.state.GivennameatbirthState,
                Placeofbirth: this.state.PlaceofbirthState,
                MFnameatbirth: this.state.MFnameatbirthState,
                MGivenname: this.state.MGivennameState,
                FFamilyName: this.state.FFamilyNameState,
                FGivenname: this.state.FGivennameState,
                LanguageC: this.state.LanguageCState,
                City: this.state.CityState,
                MobilePhoneNumber: this.state.MobilePhoneNumberState,
                HomePhoneNumber: this.state.HomePhoneNumberState,
                LiveOSCanada: this.state.LiveOSCanadaState,
                SSPlan: this.state.SSPlanState,
                SSPlanCountry: this.state.SSPlanCountryState,
                CNESSTPension: this.state.CNESSTPensionState,
                WClaimD: this.state.WClaimDState,
                SAAQPension: this.state.SAAQPensionState,
                SAAQFNumber: this.state.SAAQFNumberState,
                WDDate: this.state.WDDateState,
                SWDDate: this.state.SWDDateState,
                ChildCAge: this.state.ChildCAgeState,
                Familybenefits: this.state.FamilybenefitsState,
                Childrens: InformationChildren,
                WorkinQuebec: this.state.WorkinQuebecState,
                NWorkinQuebec: this.state.NWorkinQuebecState,
                //retroactivepensionState: this.state.retroactivepensionState,
                pensionretroactivelyState: this.state.pensionretroactivelyState,
                //pensionreceivedState: this.state.pensionreceivedState,
                pensionstartlaterState: this.state.pensionstartlaterState,
                Financial: this.state.FinancialState,
                Paymentdeposit1: this.state.Paymentdeposit1State,
                Paymentdeposit2: this.state.Paymentdeposit2State,
                Paymentdeposit3: this.state.Paymentdeposit3State,
                Paymentdeposit4: this.state.Paymentdeposit4State,
                Paymentdeposit5: this.state.Paymentdeposit5State,
                DeclarationSign1: this.state.DeclarationSign1State,
                AnotherPSign: this.state.AnotherPSignState,
                Gender1: this.state.Gender1State,
                Familyname1: this.state.Familyname1State,
                Givenname1: this.state.Givenname1State,
                Address1: this.state.Address1State,
                MPhoneNumber1: this.state.MPhoneNumber1State,
                HomePhoneNumber1: this.state.HomePhoneNumber1State,
                SSNumber1: this.state.SSNumber1State,
                DOB1: this.state.DOB1State,
                MFNamebirth: this.state.MFNamebirthState,

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
                data: BenQusQuebecJSONData,
                //headers:AxiosHeaderConfig,

            }).then((data) => {
                notify.show("Your Information Saved Successfully", "success", 3000);
                thisObj.handleAppProcessFlowUpdate(this);
                thisObj.handleSendBilateralForms(this);
                this.props.MailSends();
            }).catch((err) => {
            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }

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

    //Child Save Function
    handleBenQusChildDatas(event) {
        var valid = this.handleValidateChildForm(this);
        if (valid) {
            var ChildrenJSONData = {
                CFName: this.state.CFNameState,
                CGName: this.state.CGNameState,
                CDOB: this.state.CDOBState,
                CPBirth: this.state.CPBirthState,
                Dateadoption: this.state.DateadoptionState,
                CDeathDate: this.state.DateadoptionState,
                DACanada: this.state.DACanadaState,
                ArrivalinCanada: this.state.ArrivalinCanadaState,
                FamilybenefitsNP: this.state.FamilybenefitsNPState,
                LiveinCanada: this.state.LiveinCanadaState

            }
            if (InformationChildren.length < 5) {
                InformationChildren.push(ChildrenJSONData);
                notify.show("Child Information Added Successfully", "success", 3000);
                this.handleChildReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Four Children to Add", "warning", 3000);
            }
        }
    }

    //Child Reset Function
    handleChildReset(e) {
        this.setState({
            CFNameState: "",
            CGNameState: "",
            CDOBState: "",
            CPBirthState: "",
            DateadoptionState: "",
            CDeathDateState: "",
            DACanadaState: "",
            ArrivalinCanadaState: "",
            FamilybenefitsNPState: "",
            LiveinCanadaState: "",

            isValidCFName: false,
            isValidCGName: false,
            isValidCDOB: false,
            isValidCPBirth: false,
            isValidDateadoption: false,
            isValidDACanada: false,
            isValidCDeathDate: false,
            isValidArrivalinCanada: false,
            isValidFamilybenefitsNP: false,
            isValidLiveinCanada: false,

            isValidFormatCFName: false,
            isValidFormatCGName: false,
            isValidFormatCPBirth: false,
            isValidFormatArrivalinCanada: false,
            ValidateYearWorked: false,
            ValidateYearWorked1: false,
            ValidateYearWorked2: false,
            ValidateYearWorked3: false,
        });
    }

    //Auto-Populated Function
    handleBenQusQuebecAuto(event) {
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
                thisObj.setState({ GenderState: data[i].Gender });
                thisObj.setState({ FamilynameState: data[i].LastName });
                thisObj.setState({ GivennameState: data[i].FirstName });
                var varDOB = data[i].DOB_Month + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year;
                var DtDOB = new Date(varDOB);
                thisObj.setState({ DOBState: DtDOB });
                thisObj.setState({ PlaceofbirthState: data[i].PlaceOfBirth });
                thisObj.setState({ CityState: data[i].MailingAddress });
                thisObj.setState({ MobilePhoneNumberState: data[i].PhoneNum });
                thisObj.setState({ HomePhoneNumberState: data[i].HomeNum });
                thisObj.setState({ ConditionalState: data[i].CountryOfResidency });
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
                        var today = new Date();
                        var birthDate = new Date(thisObj.state.DBOMonth + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year);
                        var age = today.getFullYear() - birthDate.getFullYear();
                        thisObj.setState({ ApplicantAge: age }, function () {
                        });
                    }
                );
            }
        }).catch((err) => {
        })
    }

    //Rendering Function
    render() {
        const { GenderState, search, Csearch, CPsearch, AFsearch, APsearch, PlaceofbirthState } = this.state
        const google = window.google;
        return (
            <div >
                <Col xs={12} md={12} >
                    <Panel eventKey="1" defaultExpanded={true}>
                        <Panel.Heading>
                            <Panel.Title >Quebec Form</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Row >
                                <Col xs={12} md={12} >
                                    <Col xs={12} md={12}>
                                        <h3 className="ColorStyle"><b>Identification</b></h3>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label ><b>Social Security Number<span className="manatoryfield">*</span></b></label>
                                            <TextField hintText="Enter your SS Number"
                                                errorText={this.state.isValidSocialNumber ? "Please Enter Your Social Security Number" : ""}
                                                value={this.state.SocialNumberState}
                                                onChange={this.handleChangeSocialNumber.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatSocialNumber ? "Please Enter the Valid Social Security Number" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Gender<span className="manatoryfield">*</span></b></label>
                                            <SelectField
                                                hintText="Select the gender"
                                                value={this.state.GenderState}
                                                onChange={this.handleChangeGender.bind(this)}
                                                errorText={this.state.isValidGender ? "Please Select Your Gender" : ""}
                                            >
                                                <MenuItem value={"M"} primaryText="Male" />
                                                <MenuItem value={"F"} primaryText="Female" />
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Family Name (last name)<span className="manatoryfield">*</span></b></label>
                                            <TextField hintText="Enter Your Family Name "
                                                errorText={this.state.isValidFamilyname ? "Please Enter Your Family Name" : ""}
                                                value={this.state.FamilynameState} GenderStateFamilynameState
                                                onChange={this.handleChangeFamilyname.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatFamilyname ? "Please Enter the Valid Family Name" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Given Name (First Name)<span className="manatoryfield">*</span></b></label>
                                            <TextField hintText="Enter Your Given Name"
                                                errorText={this.state.isValidGivenname ? "Please Enter Your Given Name" : ""}
                                                value={this.state.GivennameState}
                                                onChange={this.handleChangeGivenname.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatFamilyname ? "Please Enter the Valid Given Name" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Family Name At Birth (If Different)<span className="manatoryfield">*</span></b></label>
                                            <TextField hintText="Enter Your Family Name At Birth"
                                                errorText={this.state.isValidFamilynameatbirth ? "Please Enter Your Family Name At Birth" : ""}
                                                value={this.state.FamilynameatbirthState}
                                                onChange={this.handleChangeFamilynameatbirth.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatFamilynameatbirth ? "Please Enter the Valid Family Name At Birth" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Given Name At birth (If Different)<span className="manatoryfield">*</span></b></label>
                                            <TextField hintText="Enter Your Given Name At Birth "
                                                errorText={this.state.isValidGivennameatbirth ? "Please Enter Your Given Name At Birth  " : ""}
                                                value={this.state.GivennameatbirthState}
                                                onChange={this.handleChangeGivennameatbirth.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatGivennameatbirth ? "Please Enter the Valid Given Name At Birth" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Date of Birth<span className="manatoryfield">*</span></b></label>
                                            <DatePicker hintText="Enter Your Date of Birth"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                errorText={this.state.isValidDOB ? "Please Enter Your Date of Birth" : ""}
                                                value={this.state.DOBState}
                                                onChange={this.handleChangeDOB.bind(this)}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Place of Birth<span className="manatoryfield">*</span></b></label>

                                            <Geosuggest
                                                placeholder="Enter Your Place of Birth (City, Province, Country)"
                                                initialValue={this.state.PlaceofbirthState}
                                                onSuggestSelect={this.handleSelectSuggest.bind(this)}
                                                onChange={this.handleChangePlaceofbirth.bind(this)}
                                                value={this.state.PlaceofbirthState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidPlaceofbirth ? "Please Enter Your Place of Birth (City, Province, Country)" : null}</span>

                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Mother's Family Name At Birth (Last Name)<span className="manatoryfield">*</span></b></label>
                                            <TextField hintText="Enter Your Mother's Family Name At Birth "
                                                errorText={this.state.isValidMFnameatbirth ? "Please Enter Your Mother's Family Name At Birth" : ""}
                                                value={this.state.MFnameatbirthState}
                                                onChange={this.handleChangeMFnameatbirth.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatMFnameatbirth ? "Please Enter the Valid Mother's Family Name At Birth  " : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Mother's Given Name (First Name)<span className="manatoryfield">*</span></b></label>
                                            <TextField hintText="Enter Your Mother's Given Name"
                                                errorText={this.state.isValidMGivenname ? "Please Enter Your Mother's Given Name " : ""}
                                                value={this.state.MGivennameState}
                                                onChange={this.handleChangeMGivenname.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatMGivenname ? "Please Enter the Valid Mother's Given Name   " : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Father's Family Name (Last Name)<span className="manatoryfield">*</span></b></label>
                                            <TextField hintText="Enter Your Father's Family Name"
                                                errorText={this.state.isValidFFamilyName ? "Please Enter Your Father's Family Name " : ""}
                                                value={this.state.FFamilyNameState}
                                                onChange={this.handleChangeFFamilyName.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatFFamilyName ? "Please Enter the Valid Father's Family Name  " : ""}</span>

                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Father's Given Name (First Name)<span className="manatoryfield">*</span></b></label>
                                            <TextField hintText="Enter Your Father's Given Name"
                                                errorText={this.state.isValidFGivenname ? "Please Enter Your Father's Given Name" : ""}
                                                value={this.state.FGivennameState}
                                                onChange={this.handleChangeFGivenname.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatFGivenname ? "Please Enter the Valid Father's Given Name  " : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Language of Correspondence<span className="manatoryfield">*</span></b></label>
                                            <SelectField
                                                hintText="Select Your Language of Correspondence"
                                                value={this.state.LanguageCState}
                                                onChange={this.handleChangeLanguageC.bind(this)}
                                                errorText={this.state.isValidLanguageC ? "Please Select Your Language of Correspondence" : ""}
                                            >
                                                <MenuItem value={"English"} primaryText="English" />
                                                <MenuItem value={"French"} primaryText="French" />
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Your Address<span className="manatoryfield">*</span></b></label>

                                            <Geosuggest
                                                placeholder="Enter Your City"
                                                initialValue={this.state.CityState}
                                                onSuggestSelect={this.handleSelectSuggestC.bind(this)}
                                                onChange={this.handleChangeCity.bind(this)}
                                                value={this.state.CityState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidCity ? "Please Choose Your Address" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Mobile Phone Number<span className="manatoryfield">*</span></b></label>
                                            <TextField hintText="Enter Your Mobile Phone Number"
                                                errorText={this.state.isValidMobilePhoneNumber ? "Please Enter Your Mobile Phone Number" : ""}
                                                value={this.state.MobilePhoneNumberState}
                                                onChange={this.handleChangeMobilePhoneNumber.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatMobilePhoneNumber ? "Please Enter the Valid Mobile Phone Number" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label><b>Home Phone Number<span className="manatoryfield">*</span></b></label>
                                            <TextField hintText="Enter Your Home Phone Number"
                                                errorText={this.state.isValidHomePhoneNumber ? "Please Enter Your Home Phone Number" : ""}
                                                value={this.state.HomePhoneNumberState}
                                                onChange={this.handleChangeHomePhoneNumber.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatHomePhoneNumber ? "Please Enter the Valid Home Phone Number" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={8} className="input-fileds align-fileds">
                                            <label><b>If you live outside Canada, what was your last province of residence in Canada?<span className="manatoryfield">*</span></b></label>
                                            <TextField hintText="Enter Your live Outside Canada"
                                                errorText={this.state.isValidLiveOSCanada ? "Please Enter The Last Province of Residence In Canada" : ""}
                                                value={this.state.LiveOSCanadaState}
                                                onChange={this.handleChangeLiveOSCanada.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatLiveOSCanada ? "Please Enter the Valid Last Province of Residence in Canada" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <h3 className="ColorStyle"><b>Participation in other plans</b></h3>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={8} className="input-fileds align-fileds">
                                            <label>Have You Ever Participated In The Social Security Plan of Another Country?<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the social security plan in another country"
                                                value={this.state.SSPlanState}
                                                errorText={this.state.isValidSSPlan ? "Please Enter The Social Security Plan of Another Country" : ""}
                                                onChange={this.handleChangeSSPlan.bind(this)}

                                            >
                                                <MenuItem value={"Yes"} primaryText="Yes" />
                                                <MenuItem value={"No"} primaryText="No" />

                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>If so, indicated in Which Country or Countries<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the social security plan country"
                                                value={this.state.SSPlanCountryState}
                                                errorText={this.state.isValidSSPlanCountry ? "Please Enter The Social Security Plan  Country" : ""}
                                                onChange={this.handleChangeSSPlanCountry.bind(this)}
                                                multiple={true}
                                                maxHeight={200}
                                            >
                                                {CountryItems}
                                            </SelectField>
                                            <span className="validationmsg">{this.state.isValidFormatSSPlanCountry ? "Please Enter the Valid Social Security Plan  Country" : ""}</span>
                                        </Col>
                                    </Col>
                                    {this.state.ApplicantAge >= 65 ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <h3 className="ColorStyle"><b>Benefits from other agencies in Canada</b></h3>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="Radio_button">
                                                    <label>Are you Currently Receiving an Income Replacement Indemnity From the Commission  Travel (CNESST) Because of a Work Related Accident or Occupational Disease?<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.CNESSTPensionState} onChange={this.handleChangeCNESSTPension.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidCNESSTPension ? "Please Choose Your value" : null}</span>
                                                </Col>
                                            </Col>
                                            {this.state.CNESSTPensionState == "Yes" ?
                                                <div>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                                            <label>I am Waiting for a Reply to a Claim. I filed the Claim On:<span className="manatoryfield">*</span></label>
                                                            <DatePicker
                                                                hintText="Enter Your Waiting Claim Date"
                                                                errorText={this.state.isValidWClaimD ? "Please Enter Your Waiting Claim Date" : ""}
                                                                value={this.state.WClaimDState}
                                                                onChange={this.handleChangeWClaimD.bind(this)}
                                                            />
                                                        </Col>
                                                    </Col>
                                                </div>
                                                : ''}
                                            {this.state.CNESSTPensionState == "No" ?
                                                <div>
                                                    <Col xs={12} md={12} >
                                                        <Col xs={12} md={12} className="Radio_button">
                                                            <label>Are you currently receiving an indemnity from the Société de l’assurance automobile du Québec (SAAQ)?<span className="manatoryfield">*</span></label>
                                                            <RadioButtonGroup valueSelected={this.state.SAAQPensionState} onChange={this.handleChangeSAAQPension.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                            <span className="validationmsg">{this.state.isValidSAAQPension ? "Please Enter the SAAQPension" : null}</span>
                                                        </Col>
                                                    </Col>
                                                </div>
                                                : ''}
                                        </div>
                                        : ""}
                                    {this.state.SAAQPensionState == "No" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <h3 className="ColorStyle"><b>Information about Children</b></h3>
                                            </Col>
                                            <Col xs={12} md={12} className="input-fileds">
                                                <label className="TopicAlign">Certain situations could increase the amount of your retirement pension:    * you received family benefits from the Québec or Canadian Governments for any children; or    * you were entitled to family benefits, but did not receive any because your family income was too high.</label>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="Radio_button">
                                                    <label>Have you ever had, adopted, or become responsible for any children (regardless of their current age)?<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.ChildCAgeState} onChange={this.handleChangeChildCAge.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidChildCAge ? "Please Enter the Children Current Age" : null}</span>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    {this.state.SAAQPensionState == "Yes" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Indicate The File Number: <span className="manatoryfield">*</span></label>
                                                    <TextField
                                                        hintText="Enter the file number"
                                                        errorText={this.state.isValidSAAQFNumber ? "Please Enter The File Number" : ""}
                                                        value={this.state.SAAQFNumberState}
                                                        onChange={this.handleChangeSAAQFNumber.bind(this)}
                                                    />
                                                    <span className="validationmsg">{this.state.isValidFormatSAAQFNumber ? "Please Enter the Valid SAAQFNumber" : ""}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds align-fileds">
                                                    <label>I am Waiting for a Decision on an Application for an indemnity. Date the accident occurred: (yyyy/mm/dd) <span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        hintText="Enter Your Date the accident occurred"
                                                        errorText={this.state.isValidWDDate ? "Please Enter Your  Date the Accident Occurred" : ""}
                                                        value={this.state.WDDateState}
                                                        onChange={this.handleChangeWDDate.bind(this)}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={12} className="input-fileds align-fileds">
                                                    <label>Indicate The Date You Stopped Working, if applicable:  (yyyy/mm/dd)<span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        hintText="Select Your stopped Working Date"
                                                        errorText={this.state.isValidSWDDate ? "Please Enter Your Stopped Working Date" : ""}
                                                        value={this.state.SWDDateState}
                                                        onChange={this.handleChangeSWDDate.bind(this)}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    {this.state.ChildCAgeState == "No" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="Radio_button">
                                                    <label>Did You Receive Family Benefits Paid in Your Name For Any Children or, if you did not, was it because your Family Income was too high? (Benefits are usually paid to the mother.)<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.FamilybenefitsState} onChange={this.handleChangeFamilybenefits.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidFamilybenefits ? "Please Enter the Family Benefits" : null}</span>
                                                </Col>
                                            </Col>
                                            {this.state.FamilybenefitsState == "No" ?
                                                <div>
                                                    <Col xs={12} md={12}>
                                                        <h3 className="ColorStyle"><b>INFORMATION ABOUT CHILDREN</b></h3>
                                                    </Col>
                                                    <Col xs={12} md={12} >
                                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                                            <label>Child's Family Name At Birth (Last Name)<span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Your Child's Family Name At Birth"
                                                                value={this.state.CFNameState}
                                                                onChange={this.handleChangeCFName.bind(this)}
                                                                errorText={this.state.isValidCFName ? "Please Enter Your Child's Family Name At Birth (last name)" : null}
                                                            />
                                                            <span className="validationmsg">{this.state.isValidFormatCFName ? "Please Enter the Valid Child's Family Name At Birth " : ""}</span>
                                                        </Col>
                                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                                            <label>Child's Given Name (First Name)<span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Your Child's Given Name"
                                                                value={this.state.CGNameState}
                                                                onChange={this.handleChangeCGName.bind(this)}
                                                                errorText={this.state.isValidCGName ? "Please Enter Your Child's Given Name (First Name)" : null}
                                                            />
                                                            <span className="validationmsg">{this.state.isValidFormatCGName ? "Please Enter the Valid Child's Given Name" : ""}</span>
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12} >
                                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                                            <label>Child's Date of Birth:  (yyyy/mm/dd)<span className="manatoryfield">*</span></label>
                                                            <DatePicker
                                                                hintText="Select your child's date of birth"
                                                                errorText={this.state.isValidCDOB ? "Please Enter Your Child's Date of Birth" : ""}
                                                                value={this.state.CDOBState}
                                                                onChange={this.handleChangeCDOB.bind(this)}
                                                            />
                                                            <span className="validationmsg">{this.state.ValidateYearWorked1 ? "Please Enter the Valid Child Birth Date" : ""}</span>
                                                        </Col>
                                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                                            <label>Child's Place of birth (Province or city and state, country)<span className="manatoryfield">*</span></label>

                                                            <Geosuggest
                                                                placeholder="Enter Your Child's Place of Birth (Province or city and state, country)"
                                                                initialValue={this.state.CPBirthState}
                                                                onSuggestSelect={this.handleSelectSuggestCP.bind(this)}
                                                                onChange={this.handleChangeCPBirth.bind(this)}
                                                                value={this.state.CPBirthState}
                                                                location={new google.maps.LatLng("", "")}
                                                                radius="20"
                                                            />
                                                            <span className="validationmsg">{this.state.isValidCPBirth ? "Please Enter Your Child's Place of Birth (Province or city and state, country)" : null}</span>
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12} >
                                                        <Col xs={12} md={8} className="input-fileds align-fileds">
                                                            <label>Date of Adoption or Date Child Became Your Dependent (If Applicable)<span className="manatoryfield">*</span></label>
                                                            <DatePicker
                                                                hintText="Enter your date of adoption or date child bacame your dependent"
                                                                errorText={this.state.isValidDateadoption ? "Please Enter Your Date of Adoption or Date Child Became Your Dependent (If Applicable)" : ""}
                                                                value={this.state.DateadoptionState}
                                                                onChange={this.handleChangeDateadoption.bind(this)}
                                                            />
                                                            <span className="validationmsg">{this.state.ValidateYearWorked2 ? "Please Enter the Valid Child Adoption Date" : ""}</span>
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12} >
                                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                                            <label>Date of Death (If the Child Died Before Age 7)<span className="manatoryfield">*</span></label>
                                                            <DatePicker
                                                                hintText="Enter date of death"
                                                                errorText={this.state.isValidCDeathDate ? "Please Enter the Valid Date" : ""}
                                                                value={this.state.CDeathDateState}
                                                                onChange={this.handleChangeCDeathDate.bind(this)}
                                                            />
                                                            <span className="validationmsg">{this.state.ValidateYearWorked ? "Please Enter the Valid Child Died Date" : ""}</span>
                                                        </Col>
                                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                                            <label>Date of Arrival in Canada (If Child Born Outside Canada) <span className="manatoryfield">*</span></label>
                                                            <DatePicker
                                                                hintText="Enter your date of arrival in canada"
                                                                errorText={this.state.isValidDACanada ? "Please Enter Your Date of Arrival in Canada (if child born outside Canada)" : ""}
                                                                value={this.state.DACanadaState}
                                                                onChange={this.handleChangeDACanada.bind(this)}
                                                            />
                                                            <span className="validationmsg">{this.state.ValidateYearWorked3 ? "Please Enter the Valid Child Arrival Date" : ""}</span>
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={8} className="input-fileds align-fileds">
                                                            <label>Province or Residence at Time of Arrival in Canada<span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Your Province or residence at time of arrival in Canada"
                                                                value={this.state.ArrivalinCanadaState}
                                                                onChange={this.handleChangeArrivalinCanada.bind(this)}
                                                                errorText={this.state.isValidArrivalinCanada ? "Please Enter Your Province or Residence at Time of Arrival in Canada" : null}
                                                            />
                                                            <span className="validationmsg">{this.state.isValidFormatArrivalinCanada ? "Please Enter the Valid Province or Residence at Time of Arrival in Canada" : ""}</span>
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12} >
                                                        <Col xs={12} md={12} className="Radio_button">
                                                            <label>Between the birth and the 7th birthday of each of these children, where there any periods in which family benefits were not paid in your name?<span className="manatoryfield">*</span></label>
                                                            <RadioButtonGroup valueSelected={this.state.FamilybenefitsNPState} onChange={this.handleChangeFamilybenefitsNP.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                            <span className="validationmsg">{this.state.isValidFamilybenefitsNP ? "Please Enter the any periods in which family benefits were not paid in your name?" : null}</span>
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12} >
                                                        <Col xs={12} md={12} className="Radio_button">
                                                            <label>Between each child's birth or arrival in Canada and that child's 7th birthday, did each of these children always live with you in Canada?<span className="manatoryfield">*</span></label>
                                                            <RadioButtonGroup valueSelected={this.state.LiveinCanadaState} onChange={this.handleChangeLiveinCanada.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                            <span className="validationmsg">{this.state.isValidLiveinCanada ? "Please Enter the children always live with you in Canada" : null}</span>
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={12} className="input-fields">
                                                            <Button onClick={this.handleBenQusChildDatas.bind(this)} className="RQ-Add" >Add Another Children</Button>
                                                        </Col>
                                                    </Col>
                                                </div>
                                                : ""}
                                        </div>
                                        : ""}
                                    {this.state.FamilybenefitsState == "No" || this.state.ChildCAgeState == "No" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <h3 className="ColorStyle"><b>Your work situation</b></h3>
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={6} className="Radio_button">
                                                    <label>Did You Work In Québec?<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.WorkinQuebecState} onChange={this.handleChangeWorkinQuebec.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidWorkinQuebec ? "Please Enter Work In Québec?" : null}</span>
                                                </Col>
                                                <Col xs={12} md={6} className="Radio_button">
                                                    <label>Did You Work in Canada, but outside Québec<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.NWorkinQuebecState} onChange={this.handleChangeNWorkinQuebec.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidNWorkinQuebec ? "Please Enter You Work In Canada, But Outside Québec" : null}</span>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    {(this.state.ApplicantAge >= 56 && this.state.ApplicantAge <= 65) || (this.state.ApplicantAge >= 65) ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <h3 className="ColorStyle"><b>Starting date of your retirement pension</b></h3>
                                            </Col>
                                            {this.state.ApplicantAge >= 56 && this.state.ApplicantAge <= 65 ?
                                                <div>
                                                    <Col xs={12} md={12} className="input-fileds">
                                                        <label className="TopicAlign">Important: The starting date you choose will have permanent effect on the amount that you will receive. * At age 65, you will receive the full amount (100%) of the pension to which you are entitled based on your contributions. * The amount decreases if your pension begins before age 65 (between 0.5% - 0.6% each month between the starting date of your pension and your 65th birthday - the reduction factor will be determined based on the amount of the retirement pension), but increases if your pension begins after that age.</label>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                                            <label>If you are under age 65, your pension * the month following your 60th birthday; * the month following the one in which we received your application; * or you you would like payment of your pension to begin later than the date suggested above, please indicate when<span className="manatoryfield">*</span></label>
                                                            <DatePicker
                                                                hintText="Date Suggestion for pension payment"
                                                                errorText={this.state.isValidSuggestDate ? "Please Enter the Retroactive Pension to Start Date" : null}
                                                                value={this.state.SuggestDateState}
                                                                onChange={this.handleChangeSuggestDate.bind(this)}
                                                            />
                                                        </Col>
                                                    </Col>
                                                </div>
                                                : ""}

                                            {this.state.ApplicantAge >= 65 ?
                                                <div>
                                                    <Col xs={12} md={12} className="input-fileds">
                                                        <label className="TopicAlign">If are 65 years or older, your pension could begin; * the month following your 65th birthday; or * the 11th month preceding the one in which we received your application.  Therefore, you could receive a retroactive pension covering up to a maximum of 12 months (including the month in which we receive your application). The pension cannot start before your 65th birthday.  After age 65, your retirement pension is increased by 0.7% for each month between your 65th birthday and the starting date of your pension (up to a maximum of 42% at age 70). * Important: If you choose to receive a retroactive pension, it will affect the monthly amount of your pension for as long as it si paid. Therefore, your pension will be lower, but you will receive if for a few additional months.</label>
                                                    </Col>
                                                    <Col xs={12} md={12} >
                                                        <Col xs={12} md={12} className="Radio_button">
                                                            <label>When would you like your pension to start?<span className="manatoryfield">*</span></label>
                                                            <RadioButtonGroup valueSelected={this.state.PensionStartState} onChange={this.handleChangePensionStart.bind(this)} style={{ display: 'block', flexDirection: 'row' }}>
                                                                <RadioButton
                                                                    value="I would like my retroactive pension to begin as early as possible"
                                                                    label="I would like my retroactive pension to begin as early as possible (to cover the entire period for which it can be paid)."
                                                                    style={style.radioButton}
                                                                />
                                                                <RadioButton
                                                                    value="I would like to receive a portion of my pension retroactively. I would like my retroactive pension to start as from: "
                                                                    label="I would like to receive a portion of my pension retroactively. I would like my retroactive pension to start as from: "
                                                                    style={style.radioButton}
                                                                />
                                                                <RadioButton
                                                                    value="I would like my pension to start in the month following the one in which my application is received."
                                                                    label="I would like my pension to start in the month following the one in which my application is received."
                                                                    style={style.radioButton}
                                                                />
                                                                <RadioButton
                                                                    value="I would like my pension to start later. Please indicate when: "
                                                                    label="I would like my pension to start later. Please indicate when: (Note: after age 70, waiting longer does not give you any financial benefit, the maximum increase is reached)."
                                                                    style={style.radioButton}
                                                                />
                                                            </RadioButtonGroup >
                                                            <span className="validationmsg">{this.state.isValidPensionStart ? "Please Choose when pension Start" : null}</span>
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        {this.state.PensionStartState == "I would like to receive a portion of my pension retroactively. I would like my retroactive pension to start as from: " ?
                                                            <Col xs={12} md={6} className="input-fileds">
                                                                <DatePicker
                                                                    hintText="Select the retroactive pension to start date"
                                                                    errorText={this.state.isValidpensionretroactively ? "Please Enter the Retroactive Pension to Start Date" : null}
                                                                    value={this.state.pensionretroactivelyState}
                                                                    onChange={this.handleChangepensionretroactively.bind(this)}
                                                                />
                                                            </Col>
                                                            : ""}
                                                        {this.state.PensionStartState == "I would like my pension to start later. Please indicate when: " ?
                                                            <Col xs={12} md={6} className="input-fileds align-fileds"  >
                                                                <DatePicker
                                                                    hintText="Enter the Pension to start later "
                                                                    errorText={this.state.isValidpensionstartlater ? "Please Enter the Pension to Start Later" : null}
                                                                    value={this.state.pensionstartlaterState}
                                                                    onChange={this.handleChangepensionstartlater.bind(this)}
                                                                />
                                                            </Col>
                                                            : ""}
                                                    </Col>
                                                </div>
                                                : ""}
                                        </div>
                                        : ""}
                                    {this.state.ConditionalState == "CA" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <h3 className="ColorStyle"><b>Payment be direct deposit</b></h3>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign">Please provide your banking information to sign up for direct deposit (<b>only if you have a bank account in Canada</b>).</label>
                                                </Col>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign">If you already receive a pension under the Québec Pension Plan by direct deposit, your benefits will be deposited in the same bank account. If so, you do not need to fill out this section.</label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Name of your Financial Institution.<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Financial Institution"
                                                        value={this.state.FinancialState}
                                                        onChange={this.handleChangeFinancial.bind(this)}
                                                        errorText={this.state.isValidFinancial ? "Please Enter Your Financial Institution" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.isValidFormatFinancial ? "Please Enter the Valid Financial Institution" : ""}</span>
                                                </Col>

                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Branch Number (transit)</label>
                                                    <TextField hintText="Enter Your Branch Number"
                                                        value={this.state.Paymentdeposit1State}
                                                        onChange={this.handleChangePaymentdeposit1.bind(this)}
                                                        errorText={this.state.isValidPaymentdeposit1 ? "Please Enter Your Branch Number" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.isValidFormatPaymentdeposit1 ? "Please Enter the Valid Branch Number" : ""}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Bank or Caisse Number<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Bank or Caisse Number"
                                                        value={this.state.Paymentdeposit2State}
                                                        onChange={this.handleChangePaymentdeposit2.bind(this)}
                                                        errorText={this.state.isValidPaymentdeposit2 ? "Please Enter Your Bank or Caisse Number" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.isValidFormatPaymentdeposit2 ? "Please Enter the Valid Bank or Caisse Number" : ""}</span>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Account Number (folio)<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Account Number"
                                                        value={this.state.Paymentdeposit3State}
                                                        onChange={this.handleChangePaymentdeposit3.bind(this)}
                                                        errorText={this.state.isValidPaymentdeposit3 ? "Please Enter Your Account Number" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.isValidFormatPaymentdeposit3 ? "Please Enter the Valid Account Number " : ""}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Address of Your Financial Institution<span className="manatoryfield">*</span></label>

                                                    <Geosuggest
                                                        placeholder="Enter Your Address of Your Financial Institution"
                                                        initialValue={this.state.Paymentdeposit4State}
                                                        onSuggestSelect={this.handleSelectSuggestAF.bind(this)}
                                                        onChange={this.handleChangePaymentdeposit4.bind(this)}
                                                        value={this.state.Paymentdeposit4State}
                                                        location={new google.maps.LatLng("", "")}
                                                        radius="20"
                                                    />
                                                    <span className="validationmsg">{this.state.isValidPaymentdeposit4 ? "Please Enter Your Address of Your Financial Institution" : null}</span>

                                                </Col>
                                            </Col>
                                        </div>
                                        : ""}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label>Other Information<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Other Information"
                                                value={this.state.Paymentdeposit5State}
                                                onChange={this.handleChangePaymentdeposit5.bind(this)}
                                                errorText={this.state.isValidPaymentdeposit5 ? "Please Enter Your Other Information" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatPaymentdeposit5 ? "Please Enter the Valid Other Information " : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <h3 className="ColorStyle"><b>Declaration and signature</b></h3>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label >I declare that the information provided is true and complete</label>
                                        </Col>
                                        <Col xs={12} md={3} className="input-fileds align-fileds" >
                                            <label>Signature</label>
                                            <SignaturePad ref={ref => this.signaturePad = ref} />
                                            <Button id="clear" className="ClearBtn" onClick={this.handleSignatureClear.bind(this)}>Clear</Button>
                                            <span className="validationmsg">{this.state.isValidSignature ? "Please sign your signature" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={3}>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Date<span className="manatoryfield">*</span></label>
                                            <DatePicker
                                                hintText="Enter Your date signature"
                                                errorText={this.state.isValidDeclarationSign1 ? "Please Enter Date :" : null}
                                                value={this.state.DeclarationSign1State}
                                                onChange={this.handleChangeDeclarationSign1.bind(this)}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds">
                                            <h4 className="TopicAlign ColorStyle">If you are signing this form for another person, please provide the following information.</h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>In what capacity are you signing (guardian, mandatary, etc.)?<span className="manatoryfield">*</span></label>
                                            <TextField hintText=" Enter  you signing (guardian, mandatary, etc.)"
                                                value={this.state.AnotherPSignState}
                                                onChange={this.handleChangeAnotherPSign.bind(this)}
                                                errorText={this.state.isValidAnotherPSign ? "Please Enter  you signing (guardian, mandatary, etc)" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatAnotherPSign ? "Please Enter the Valid sign " : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label><b>Sex</b><span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.Gender1State} onChange={this.handleChangeGender1.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                <RadioButton
                                                    value="M"
                                                    label="Male"
                                                    style={style.radioButton}
                                                />
                                                <RadioButton
                                                    value="F"
                                                    label="Female"
                                                    style={style.radioButton}
                                                />
                                            </RadioButtonGroup >
                                            <span className="validationmsg">{this.state.isValidGender1 ? "Please Choose your Gender" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Family name (Last name)<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter your Family name (Last name)"
                                                value={this.state.Familyname1State}
                                                onChange={this.handleChangeFamilyname1.bind(this)}
                                                errorText={this.state.isValidFamilyname1 ? "Please Enter your Family name" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatFamilyname1 ? "Please Enter the Valid Family name " : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Given name (First name)<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter your Given name (First name)"
                                                value={this.state.Givenname1State}
                                                onChange={this.handleChangeGivenname1.bind(this)}
                                                errorText={this.state.isValidGivenname1 ? "Please Enter your Given name " : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatGivenname1 ? "Please Enter the Valid Givenname " : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={8} className="input-fileds align-fileds">
                                            <label>Address (number, street, apt,City,Province,Country,Postal code)<span className="manatoryfield">*</span></label>
                                            
                                            <Geosuggest
                                                placeholder="Enter Your Address (number, street, apt,City,Province,Country,Postal code)"
                                                initialValue={this.state.Address1State}
                                                onSuggestSelect={this.handleSelectSuggestAP.bind(this)}
                                                onChange={this.handleChangeAddress1.bind(this)}
                                                value={this.state.Address1State}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidAddress1 ? "Please Enter Your Address" : null}</span>
                                            
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds">
                                            <h4 className="TopicAlign ColorStyle">Telephone</h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Mobile Phone Number<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Mobile Phone Number"
                                                value={this.state.MPhoneNumber1State}
                                                onChange={this.handleChangeMPhoneNumber1.bind(this)}
                                                errorText={this.state.isValidMPhoneNumber1 ? "Please Enter  your Mobile Phone Number" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatMPhoneNumber1 ? "Please Enter the Valid Mobile Phone Number " : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Home Phone Number<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Home Phone Number"
                                                value={this.state.HomePhoneNumber1State}
                                                onChange={this.handleChangeHomePhoneNumber1.bind(this)}
                                                errorText={this.state.isValidHomePhoneNumber1 ? "Please Enter  your Home Phone Number" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatHomePhoneNumber1 ? "Please Enter the Valid Home Phone Number " : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds">
                                            <h4 className="TopicAlign ColorStyle">If you are an individual, you must also provide the following information:</h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Social Security Number<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter your Social Security Number"
                                                value={this.state.SSNumber1State}
                                                onChange={this.handleChangeSSNumber1.bind(this)}
                                                errorText={this.state.isValidSSNumber1 ? "Please Enter  your Social Security Number" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatSSNumber1 ? "Please Enter the Valid SSNumber1 " : ""}</span>
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Your date of birth:  (yyyy/mm/dd)<span className="manatoryfield">*</span></label>
                                            <DatePicker
                                                hintText="Enter Your date of birth"
                                                value={this.state.DOB1State}
                                                onChange={this.handleChangeDOB1.bind(this)}
                                                errorText={this.state.isValidDOB1 ? "Please Enter  your date of birth" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Your mother's family name at birth <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your mother's family name at birth "
                                                value={this.state.MFNamebirthState}
                                                onChange={this.handleChangeMFNamebirth.bind(this)}
                                                errorText={this.state.isValidMFNamebirth ? "Please Enter  your mother's family name at birth" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatMFNamebirth ? "Please Enter the Valid mother's family name at birth " : ""}</span>
                                        </Col>
                                    </Col>
                                </Col>
                            </Row>
                        </Panel.Body>
                        <Col xs={12} md={12}>
                            <Col xs={12} md={12} className="input-fields">
                                <Button onClick={this.handleBenQusDatas.bind(this)} className="RQ-Add" >{this.state.BtnNameState}</Button>
                                <Notifications />
                            </Col>
                        </Col>

                    </Panel>
                </Col>
            </div >
        );
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

BenQusQuebec.propTypes = {
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(BenQusQuebec);