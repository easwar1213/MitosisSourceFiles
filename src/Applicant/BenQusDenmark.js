import React, { Component, isValidElement } from 'react';
import PropTypes from "prop-types";
//Bootstrap Component
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
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

//Routing
import history from '../Routing/history';

//Google Address
import Geosuggest from 'react-geosuggest';
var emailresult;
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
const MaritalStatusItems = [
    <MenuItem value={"S"} key={1} primaryText={"Single"} />,
    <MenuItem value={"M"} key={2} primaryText={"Married"} />,
    <MenuItem value={"SP"} key={3} primaryText={"Separated"} />,
    <MenuItem value={"D"} key={4} primaryText={"Divorced"} />,
    <MenuItem value={"C"} key={5} primaryText={"Cohabiting"} />,
    <MenuItem value={"W"} key={6} primaryText={"Widow / widower"} />,
];

const CountryItems = [];

class BenQusDenmark extends Component {
    constructor(props) {
        super(props);
        this.handleLoadCountry(this);
        this.handleBenQusDenmarkAuto(this);

        //Field State Values Initialization
        this.state = {
            FirstName: '',
            LastName: '',
            BirthName: '',
            PreviousName: '',
            DOB: '',
            PhoneNumber: '',
            BirthCity: '',
            EmailState: '',
            BirthCountry: '',
            CitizenshipState: '',
            Csearch: "",
            PermanentAddress: '',
            CityZipCode: '',
            CountryState: '',
            DigitalState: '',
            RefugeeState: '',
            MaritalStatusState: '',
            PartnerFirstName: '',
            PartnerSurName: '',
            PartnerDOB: '',
            MarriedState: '',
            FirstName1: '',
            LastName1: '',
            DOB1: '',
            FatherFirstName: '',
            FatherLastName: '',
            FatherDOB: '',
            MotherFirstName: '',
            MotherLastName: '',
            MotherDOB: '',
            PensionState: '',
            SecurityNumber: '',
            PensionAuthorityName: '',
            PensionAuthorityAddress: '',
            PensionReceived: '',
            DateState: '',
            AddressState: '',
            CityState: '',
            WorkedState: '',
            AddressState1: '',
            CountryState1: '',
            WorkedState1: '',
            WorkedState2: '',
            EmployerState: '',
            CompanyAddress: '',
            SpouseState: '',
            ValidationGroup: {},
            MarriedDate: "",
            OnlyDenStDate: "",
            OnlyDenEnDate: "",
            DenStDate: "",
            DenEnDate: "",
            AbStDate: "",
            AbEnDate: "",
            StartAndEndDate: "",
            DateOfMarriage: "",
            ConditionState: "",
            isValidEmail: false,
            isValidEmailFormat: false,
            isValidFirstName: false,
            isValidLastName: false,
            //isValidBirthName: false,
            isValidPreviousName: false,
            isValidDOB: false,
            isValidPhoneNumber: false,
            isValidCityOfBirth: false,
            isValidBirthCountry: false,
            isValidCitizenship: false,
            isValidPermanentAddress: false,
            isValidDigital: false,
            isValidRefugee: false,
            isValidMaritalStatus: false,
            isValidMarriageDt: false,
            isValidPartnerFirstName: false,
            isValidPartnerSureName: false,
            isValidpartnerDOB: false,
            isValidMarried: false,
            isValidFirstName1: false,
            isValidLastName1: false,
            isValidDOB1: false,
            isValidDtMarriage: false,
            isValidFatherFirstName: false,
            isValidFatherLastName: false,
            isValidFatherDOB: false,
            isValidMotherFirstName: false,
            isValidMotherLastName: false,
            isValidMotherDOB: false,
            isValidPension: false,
            isValidSecurityNumber: false,
            isValidPensionAuthorityName: false,
            isValidPensionAuthorityAddress: false,
            isValidPensionReceived: false,
            isValidDate: false,
            isValidDenStDate: false,
            isValidDenToDate: false,
            isValidAddress: false,
            isValidCity: false,
            isValidWorked: false,
            isValidDateForm: false,
            isValidDateTo: false,
            isValidAddress1: false,
            isValidCountry1: false,
            isValidWorked1: false,
            isValidWorked2: false,
            isValidDateFromWorked: false,
            isValidDateToWorked: false,
            isValidEmployer: false,
            isValidCompanyAddress: false,
            isValidSpouse: false,
            isValidDateSigned: false,
            validationError: {},

        }
    }

    componentDidMount(){
        emailresult = localStorage.getItem('applicant_email');
    }
    //Handle Event
    handlerDateOfMarriage = (event, date) => {
        this.setState({ DateOfMarriage: date });
    };

    handleChangeFirstName = (event) => {
        this.setState({ FirstName: event.target.value });
    };

    handleChangeLastName = (event) => {
        this.setState({ LastName: event.target.value });
    };

    handleChangeBirthName = (event) => {
        this.setState({ BirthName: event.target.value });
    };

    handleChangePreviousName = (event) => {
        this.setState({ PreviousName: event.target.value });
    };

    handleChangeDOB = (event) => {
        this.setState({ DOB: event.target.value });
    };

    // handleChangePhoneNumber = (event) => {
    // this.setState({ PhoneNumber: event.target.value });
    // };

    handleChangeBirthCity = (event) => {
        this.setState({ BirthCity: event.target.value });
    };

    handleChangeEmailState = (event) => {
        this.setState({ EmailState: event.target.value });
    };

    handleChangeBirthCountry(event, index, value) {
        this.setState({ BirthCountry: value });
    };

    handleChangeCitizenshipState(event, index, value) {
        this.setState({ CitizenshipState: value });
    };

    handleSelectSuggestC(suggest) {
        if(suggest){
            this.setState({ PermanentAddress:suggest.description});
        }
    };

    handleChangePermanentAddress = (value) => {
        this.setState({ PermanentAddress: value });
    };

    handleChangeCityZipCode = (event) => {
        this.setState({ CityZipCode: event.target.value });
    };

    handleChangeCountryState = (event) => {
        this.setState({ CountryState: event.target.value });
    };

    handleChangeDigitalState = (event) => {
        this.setState({ DigitalState: event.target.value });
    };

    handleChangeRefugeeState = (event) => {
        this.setState({ RefugeeState: event.target.value });
    };

    handleChangeMaritalStatus = (event, index, value) => {
        this.setState({ MaritalStatusState: value });
    };

    handleChangePartnerFirstName = (event) => {
        this.setState({ PartnerFirstName: event.target.value });
    };

    handleChangePartnerSurName = (event) => {
        this.setState({ PartnerSurName: event.target.value });
    };

    handleChangePartnerDOB = (event) => {
        this.setState({ PartnerDOB: event.target.value });
    };

    handleChangeMarriedState = (e) => {
        this.setState({ MarriedState: e.target.value });
    };

    handleChangeFirstName1 = (event) => {
        this.setState({ FirstName1: event.target.value });
    };

    handleChangeLastName1 = (event) => {
        this.setState({ LastName1: event.target.value });
    };

    handleChangeDOB1 = (event) => {
        this.setState({ DOB1: event.target.value });
    };

    handleChangeFatherFirstName = (event) => {
        this.setState({ FatherFirstName: event.target.value });
    };

    handleChangeFatherLastName = (event) => {
        this.setState({ FatherLastName: event.target.value });
    };

    handleChangeFatherDOB = (event) => {
        this.setState({ FatherDOB: event.target.value });
    };

    handleChangeMotherFirstName = (event) => {
        this.setState({ MotherFirstName: event.target.value });
    };

    handleChangeMotherLastName = (event) => {
        this.setState({ MotherLastName: event.target.value });
    };

    handleChangeMotherDOB = (event) => {
        this.setState({ MotherDOB: event.target.value });
    };

    handleChangePensionState = (event) => {
        this.setState({ PensionState: event.target.value });
    };

    handleChangeSecurityNumber = (event) => {
        this.setState({ SecurityNumber: event.target.value });
    };

    handleChangePensionAuthorityName = (event) => {
        this.setState({ PensionAuthorityName: event.target.value });
    };

    handleChangePensionAuthorityAddress = (event) => {
        this.setState({ PensionAuthorityAddress: event.target.value });
    };

    handleChangePensionReceived = (event, index, value) => {
        this.setState({ PensionReceived: value });
    };

    handleChangeDateState = (event) => {
        this.setState({ DateState: event.target.value });
    };

    handleChangeAddressState = (event) => {
        this.setState({ AddressState: event.target.value });
    };

    handleChangeCityState = (event) => {
        this.setState({ CityState: event.target.value });
    };

    handleChangeWorkedState = (event) => {
        this.setState({ WorkedState: event.target.value });
    };

    handleChangeAddressState1 = (event) => {
        this.setState({ AddressState1: event.target.value });
    };

    handleChangeCountryState1 = (event) => {
        this.setState({ CountryState1: event.target.value });
    };

    handleChangeWorkedState1 = (event) => {
        this.setState({ WorkedState1: event.target.value });
    };

    handleChangeWorkedState2 = (event) => {
        this.setState({ WorkedState2: event.target.value });
    };

    handleChangeEmployerState = (event, index, value) => {
        this.setState({ EmployerState: value });
    };

    handleChangeCompanyAddress = (event, index, value) => {
        this.setState({ CompanyAddress: value });
    };

    handleChangeSpouseState = (event) => {
        this.setState({ SpouseState: event.target.value });
    };

    handleMarriedDate = (event, date) => {
        this.setState({ MarriedDate: date });
    };

    handleChangePhoneNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ PhoneNumber: onlyNums });
        }
    };

    handleOnlyDenState = (event, date) => {
        this.setState({ OnlyDenStDate: date });
    };

    handleOnlyDenEndDateState = (event, date) => {
        this.setState({ OnlyDenEnDate: date });
    };

    handleDenStDate = (event, date) => {
        this.setState({ DenStDate: date });
    };

    handleDenEnDate = (event, date) => {
        this.setState({ DenEnDate: date });
    };

    handlerAbStDate = (event, date) => {
        this.setState({ AbStDate: date });
    };

    handlerAbEnDate = (event, date) => {
        this.setState({ AbEnDate: date });
    };

    handlerStartAndEndDate = (event, date) => {
        this.setState({ StartAndEndDate: date });
    };

    handleSignatureClear = (e) => {
        this.signaturePad.clear();
    };

    //Validation Function
    validateRequireField() {
        let validForm = false;
        const { validationError } = this.state;
        var validFirstNameForm = false;
        var validLastNameForm = false;
        //var validBirthNameForm = false;
        var validPreviousNameForm = false;
        var validDOBForm = false;
        var validPhoneNumberForm = false;
        var validCityOfBirthForm = false;
        var validBirthCountryForm = false;
        var validCitizenshipForm = false;
        var validPermanentAddressForm = false;
        var varValidateEmail = this.state.EmailState;
        var validEmailStateForm = false;
        var validDigitalForm = false;
        var validRefugeeForm = false;
        var validMaritalForm = false;
        var validPartnerFirstNameForm = false;
        var validPartnerSureNameForm = false;
        var validPartnerDOBForm = false;
        var validDenStDateForm = false;
        var validDenToDateForm = false;
        var ValidAddressForm = false;
        var validCityForm = false;
        var validisMarriageDtForm = false;
        var validMarriedForm = false;
        var validFatherFirstNameForm = false;
        var validFatherLastNameForm = false;
        var validFatherDOBForm = false;
        var validMotherFirstNameForm = false;
        var validMotherLastNameForm = false;
        var validMotherDOBForm = false;
        var validPensionForm = false;
        var validSecurityNumberForm = false;
        var validPensionAuthorityNameForm = false;
        var validPensionAuthorityAddressForm = false;
        var validPensionReceivedForm = false;
        var validDateForm = false;
        var validFirstName1Form = false;
        var validLastName1Form = false;
        var validDOB1Form = false;
        var validMarriedDateForm = false;
        var validWorkedForm = false;
        var validDateFromForm = false;
        var validDateToForm = false;
        var validAddress1Form = false;
        var validCountryForm = false;
        var validWorked1Form = false;
        var validWorked2Form = false;
        var validDateFromworkedForm = false;
        var validDateToWorkedForm = false;
        var validEmployerForm = false;
        var validCompanyAddressForm = false;
        var validSpouseForm = false;
        var validDateSignedForm = false;
        var validSignatureForm = false;

        if (this.state.FirstName.length > 0) {
            this.setState({ isValidFirstName: false });
            validFirstNameForm = true;
        }
        else {
            this.setState({ isValidFirstName: true });
            validFirstNameForm = false;
        }
        if (this.state.LastName.length > 0) {
            this.setState({ isValidLastName: false });
            validLastNameForm = true;
        }
        else {
            this.setState({ isValidLastName: true });
            validLastNameForm = false;
        }
        // if (this.state.BirthName.length > 0) {
        //     this.setState({ isValidBirthName: false });
        //     validBirthNameForm = true;
        // }
        // else {
        //     this.setState({ isValidBirthName: true });
        //     validBirthNameForm = false;
        // }
        if (this.state.PreviousName.length > 0) {
            this.setState({ isValidPreviousName: false });
            validPreviousNameForm = true;
        }
        else {
            this.setState({ isValidPreviousName: true });
            validPreviousNameForm = false;
        }
        if (this.state.DOB.length > 0) {
            this.setState({ isValidDOB: false });
            validDOBForm = true;
        }
        else {
            this.setState({ isValidDOB: true });
            validDOBForm = false;
        }
        if (this.state.PhoneNumber.length > 0) {
            this.setState({ isValidPhoneNumber: false });
            validPhoneNumberForm = true;
        }
        else {
            this.setState({ isValidPhoneNumber: true });
            validPhoneNumberForm = false;
        }
        if (this.state.BirthCity.length > 0) {
            this.setState({ isValidCityOfBirth: false });
            validCityOfBirthForm = true;
        }
        else {
            this.setState({ isValidCityOfBirth: true });
            validCityOfBirthForm = false;
        }
        if (this.state.EmailState.length > 0) {
            validationError['Email'] = false;
            var varEmailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            this.setState({ isValidEmail: false });

            if (varEmailFormat.test(varValidateEmail)) {
                if (varValidateEmail.length > 0) {
                    this.setState({ isValidEmailFormat: false });
                    validEmailStateForm = true;
                }
                else {
                    this.setState({ isValidEmailFormat: false });
                    validEmailStateForm = false;
                }
            }
            else {
                this.setState({ isValidEmailFormat: true });
                validEmailStateForm = false;
            }
        }
        else {
            validationError['Email'] = true;
            this.setState({ isValidEmail: true });
            this.setState({ isValidEmailFormat: false });
            validEmailStateForm = false;
        }
        if (this.state.BirthCountry != "") {
            this.setState({ isValidBirthCountry: false });
            validBirthCountryForm = true;
        }
        else {
            this.setState({ isValidBirthCountry: true });
            validBirthCountryForm = false;
        }
        if (this.state.CitizenshipState != "") {
            this.setState({ isValidCitizenship: false });
            validCitizenshipForm = true;
        }
        else {
            this.setState({ isValidCitizenship: true });
            validCitizenshipForm = false;
        }
        if (this.state.PermanentAddress.length > 0) {
            this.setState({ isValidPermanentAddress: false });
            validPermanentAddressForm = true;
        }
        else {
            this.setState({ isValidPermanentAddress: true });
            validPermanentAddressForm = false;
        }
        if (this.state.DigitalState != "") {
            this.setState({ isValidDigital: false });
            validDigitalForm = true;
        }
        else {
            this.setState({ isValidDigital: true });
            validDigitalForm = false;
        }
        if (this.state.RefugeeState != "") {
            this.setState({ isValidRefugee: false });
            validRefugeeForm = true;
        }
        else {
            this.setState({ isValidRefugee: true });
            validRefugeeForm = false;
        }
        if (this.state.MaritalStatusState != "") {
            this.setState({ isValidMaritalStatus: false });
            validMaritalForm = true;
        }
        else {
            this.setState({ isValidMaritalStatus: true });
            validMaritalForm = false;
        }
        if (this.state.MaritalStatusState != "S") {
            if (this.state.DateOfMarriage != "") {
                this.setState({ isValidMarriageDt: false });
                validisMarriageDtForm = true;
            } else {
                this.setState({ isValidMarriageDt: true });
                validisMarriageDtForm = false;
            }
            if (this.state.PartnerFirstName.length > 0) {
                this.setState({ isValidPartnerFirstName: false });
                validPartnerFirstNameForm = true;
            }
            else {
                this.setState({ isValidPartnerFirstName: true });
                validPartnerFirstNameForm = false;
            }
            if (this.state.PartnerSurName.length > 0) {
                this.setState({ isValidPartnerSureName: false });
                validPartnerSureNameForm = true;
            }
            else {
                this.setState({ isValidPartnerSureName: true });
                validPartnerSureNameForm = false;
            }
            if (this.state.PartnerDOB.length > 0) {
                this.setState({ isValidPartnerDOB: false });
                validPartnerDOBForm = true;
            }
            else {
                this.setState({ isValidPartnerDOB: true });
                validPartnerDOBForm = false;
            }
            if (this.state.MarriedState != "") {
                this.setState({ isValidMarried: false });
                validMarriedForm = true;
            } else {
                this.setState({ isValidMarried: true });
                validMarriedForm = false;
            }
            if (this.state.MarriedState == "Yes") {
                if (this.state.FirstName1 != "") {
                    this.setState({ isValidFirstName1: false });
                    validFirstName1Form = true;
                } else {
                    this.setState({ isValidFirstName1: true });
                    validFirstName1Form = false;
                }
                if (this.state.LastName1 != "") {
                    this.setState({ isValidLastName1: false });
                    validLastName1Form = true;
                } else {
                    this.setState({ isValidLastName1: true });
                    validLastName1Form = false;
                }
                if (this.state.DOB1 != "") {
                    this.setState({ isValidDOB1: false });
                    validDOB1Form = true;
                } else {
                    this.setState({ isValidDOB1: true });
                    validDOB1Form = false;
                }
                if (this.state.MarriedDate != "") {
                    this.setState({ isValidDtMarriage: false });
                    validMarriedDateForm = true;
                } else {
                    this.setState({ isValidDtMarriage: true });
                    validMarriedDateForm = false;
                }
                if (this.state.FatherFirstName.length > 0) {
                    this.setState({ isValidFatherFirstName: false });
                    validFatherFirstNameForm = true;
                }
                else {
                    this.setState({ isValidFatherFirstName: true });
                    validFatherFirstNameForm = false;
                }
                if (this.state.FatherLastName.length > 0) {
                    this.setState({ isValidFatherLastName: false });
                    validFatherLastNameForm = true;
                }
                else {
                    this.setState({ isValidFatherLastName: true });
                    validFatherLastNameForm = false;
                }
                if (this.state.FatherDOB.length > 0) {
                    this.setState({ isValidFatherDOB: false });
                    validFatherDOBForm = true;
                }
                else {
                    this.setState({ isValidFatherDOB: true });
                    validFatherDOBForm = false;
                }
                if (this.state.MotherFirstName.length > 0) {
                    this.setState({ isValidMotherFirstName: false });
                    validMotherFirstNameForm = true;
                }
                else {
                    this.setState({ isValidMotherFirstName: true });
                    validMotherFirstNameForm = false;
                }
                if (this.state.MotherLastName.length > 0) {
                    this.setState({ isValidMotherLastName: false });
                    validMotherLastNameForm = true;
                }
                else {
                    this.setState({ isValidMotherLastName: true });
                    validMotherLastNameForm = false;
                }
                if (this.state.MotherDOB.length > 0) {
                    this.setState({ isValidMotherDOB: false });
                    validMotherDOBForm = true;
                }
                else {
                    this.setState({ isValidMotherDOB: true });
                    validMotherDOBForm = false;
                }

            } else {
                this.setState({ isValidFirstName1: false });
                this.setState({ isValidLastName1: false });
                this.setState({ isValidDOB1: false });
                this.setState({ isValidDtMarriage: false });
                this.setState({ isValidFatherFirstName: false });
                this.setState({ isValidFatherLastName: false });
                this.setState({ isValidFatherDOB: false });
                this.setState({ isValidMotherFirstName: false });
                this.setState({ isValidMotherLastName: false });
                this.setState({ isValidMotherDOB: false });
                validFirstName1Form = true;
                validLastName1Form = true;
                validDOB1Form = true;
                validMarriedDateForm = true;
                validFatherFirstNameForm = true;
                validFatherLastNameForm = true;
                validFatherDOBForm = true;
                validMotherFirstNameForm = true;
                validMotherLastNameForm = true;
                validMotherDOBForm = true;
            }
        }
        else {
            this.setState({ isValidMarriageDt: false });
            this.setState({ isValidPartnerFirstName: false });
            this.setState({ isValidPartnerSureName: false });
            this.setState({ isValidPartnerDOB: false });
            this.setState({ isValidMarried: false });
            this.setState({ isValidFirstName1: false });
            this.setState({ isValidLastName1: false });
            this.setState({ isValidDOB1: false });
            this.setState({ isValidDtMarriage: false });
            this.setState({ isValidFatherFirstName: false });
            this.setState({ isValidFatherLastName: false });
            this.setState({ isValidFatherDOB: false });
            this.setState({ isValidMotherFirstName: false });
            this.setState({ isValidMotherLastName: false });
            this.setState({ isValidMotherDOB: false });
            validisMarriageDtForm = true;
            validPartnerFirstNameForm = true;
            validPartnerSureNameForm = true;
            validPartnerDOBForm = true;
            validMarriedForm = true;
            validFirstName1Form = true;
            validLastName1Form = true;
            validDOB1Form = true;
            validMarriedDateForm = true;
            validFatherFirstNameForm = true;
            validFatherLastNameForm = true;
            validFatherDOBForm = true;
            validMotherFirstNameForm = true;
            validMotherLastNameForm = true;
            validMotherDOBForm = true;
        }
        if (this.state.PensionState != "") {
            this.setState({ isValidPension: false });
            validPensionForm = true;
        }
        else {
            this.setState({ isValidPension: true });
            validPensionForm = false;
        }
        if (this.state.ConditionState != "") {
            if (this.state.SecurityNumber.length > 0) {
                this.setState({ isValidSecurityNumber: false });
                validSecurityNumberForm = true;
            }
            else {
                this.setState({ isValidSecurityNumber: true });
                validSecurityNumberForm = false;
            }
            if (this.state.PensionAuthorityName.length > 0) {
                this.setState({ isValidPensionAuthorityName: false });
                validPensionAuthorityNameForm = true;
            }
            else {
                this.setState({ isValidPensionAuthorityName: true });
                validPensionAuthorityNameForm = false;
            }
            if (this.state.PensionAuthorityAddress.length > 0) {
                this.setState({ isValidPensionAuthorityAddress: false });
                validPensionAuthorityAddressForm = true;
            }
            else {
                this.setState({ isValidPensionAuthorityAddress: true });
                validPensionAuthorityAddressForm = false;
            }
            if (this.state.PensionReceived != "") {
                this.setState({ isValidPensionReceived: false });
                validPensionReceivedForm = true;
            }
            else {
                this.setState({ isValidPensionReceived: true });
                validPensionReceivedForm = false;
            }
        }
        else {
            this.setState({ isValidSecurityNumber: false });
            this.setState({ isValidPensionAuthorityName: false });
            this.setState({ isValidPensionAuthorityAddress: false });
            this.setState({ isValidPensionReceived: false });
            validSecurityNumberForm = true;
            validPensionAuthorityNameForm = true;
            validPensionAuthorityAddressForm = true;
            validPensionReceivedForm = true;
        }
        if (this.state.ConditionState == "Currently receiving") {
            if (this.state.DateState != "") {
                this.setState({ isValidDate: false });
                validDateForm = true;
            }
            else {
                this.setState({ isValidDate: true });
                validDateForm = false;
            }
        }
        else {
            this.setState({ isValidDate: false });
            validDateForm = true;
        }
        if (this.state.OnlyDenStDate != "") {
            this.setState({ isValidDenStDate: false });
            validDenStDateForm = true;
        } else {
            this.setState({ isValidDenStDate: true });
            validDenStDateForm = false;
        }
        if (this.state.OnlyDenEnDate != "") {
            this.setState({ isValidDenToDate: false });
            validDenToDateForm = true;
        } else {
            this.setState({ isValidDenToDate: true });
            validDenToDateForm = false;
        }
        if (this.state.AddressState != "") {
            this.setState({ isValidAddress: false });
            ValidAddressForm = true;
        } else {
            this.setState({ isValidAddress: true });
            ValidAddressForm = false;
        }
        if (this.state.CityState != "") {
            this.setState({ isValidCity: false });
            validCityForm = true;
        } else {
            this.setState({ isValidCity: true });
            validCityForm = false;
        }
        if (this.state.WorkedState != "") {
            this.setState({ isValidWorked: false });
            validWorkedForm = true;
        }
        else {
            this.setState({ isValidWorked: true });
            validWorkedForm = false;
        }
        if (this.state.WorkedState == "Yes") {
            if (this.state.DenStDate != "") {
                this.setState({ isValidDateForm: false });
                validDateFromForm = true;
            }
            else {
                this.setState({ isValidDateForm: true });
                validDateFromForm = false;
            }
            if (this.state.DenEnDate != "") {
                this.setState({ isValidDateTo: false });
                validDateToForm = true;
            }
            else {
                this.setState({ isValidDateTo: true });
                validDateToForm = false;
            }
            if (this.state.AddressState1.length > 0) {
                this.setState({ isValidAddress1: false });
                validAddress1Form = true;
            }
            else {
                this.setState({ isValidAddress1: true });
                validAddress1Form = false;
            }
            if (this.state.CountryState1.length > 0) {
                this.setState({ isValidCountry1: false });
                validCountryForm = true;
            }
            else {
                this.setState({ isValidCountry1: true });
                validCountryForm = false;
            }
        }
        else {
            this.setState({ isValidDateForm: false });
            this.setState({ isValidDateTo: false });
            this.setState({ isValidAddress1: false });
            this.setState({ isValidCountry1: false });
            validDateFromForm = true;
            validDateToForm = true;
            validAddress1Form = true;
            validCountryForm = true;
        }
        if (this.state.WorkedState1 != "") {
            this.setState({ isValidWorked1: false });
            validWorked1Form = true;
        }
        else {
            this.setState({ isValidWorked1: true });
            validWorked1Form = false;
        }
        if (this.state.WorkedState2 != "") {
            this.setState({ isValidWorked2: false });
            validWorked2Form = true;
        }
        else {
            this.setState({ isValidWorked2: true });
            validWorked2Form = false;
        }
        if (this.state.WorkedState2 == "Yes") {
            if (this.state.AbStDate != "") {
                this.setState({ isValidDateFromWorked: false });
                validDateFromworkedForm = true;
            }
            else {
                this.setState({ isValidDateFromWorked: true });
                validDateFromworkedForm = false;
            }
            if (this.state.AbEnDate != "") {
                this.setState({ isValidDateToWorked: false });
                validDateToWorkedForm = true;
            }
            else {
                this.setState({ isValidDateToWorked: true });
                validDateToWorkedForm = false;
            }
            if (this.state.EmployerState.length > 0) {
                this.setState({ isValidEmployer: false });
                validEmployerForm = true;
            }
            else {
                this.setState({ isValidEmployer: true });
                validEmployerForm = false;
            }
            if (this.state.CompanyAddress.length > 0) {
                this.setState({ isValidCompanyAddress: false });
                validCompanyAddressForm = true;
            }
            else {
                this.setState({ isValidCompanyAddress: true });
                validCompanyAddressForm = false;
            }
        }
        else {
            this.setState({ isValidDateFromWorked: false });
            this.setState({ isValidDateToWorked: false });
            this.setState({ isValidEmployer: false });
            this.setState({ isValidCompanyAddress: false });
            validDateFromworkedForm = true;
            validDateToWorkedForm = true;
            validEmployerForm = true;
            validCompanyAddressForm = true;
        }
        if (this.state.SpouseState != "") {
            this.setState({ isValidSpouse: false });
            validSpouseForm = true;
        }
        else {
            this.setState({ isValidSpouse: true });
            validSpouseForm = false;
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
        if (validFirstNameForm && validLastNameForm && validPreviousNameForm && validDOBForm && validPhoneNumberForm && validCityOfBirthForm && validBirthCountryForm && validCitizenshipForm && validPermanentAddressForm && validEmailStateForm && validDigitalForm && validRefugeeForm &&
            validMaritalForm && validPartnerFirstNameForm && validPartnerSureNameForm && validPartnerDOBForm && validDenStDateForm && validDenToDateForm && ValidAddressForm && validCityForm && validisMarriageDtForm && validMarriedForm && validFatherFirstNameForm && validFatherLastNameForm && validFatherDOBForm &&
            validMotherFirstNameForm && validMotherLastNameForm && validMotherDOBForm && validPensionForm && validSecurityNumberForm && validPensionAuthorityNameForm && validPensionAuthorityAddressForm && validPensionReceivedForm && validDateForm && validFirstName1Form && validLastName1Form && validDOB1Form &&
            validMarriedDateForm && validWorkedForm && validDateFromForm && validDateToForm && validAddress1Form && validCountryForm && validWorked1Form && validWorked2Form && validDateFromworkedForm && validDateToWorkedForm && validEmployerForm && validCompanyAddressForm && validSpouseForm && validDateSignedForm && validSignatureForm) {
            validForm = true
        } else {
            validForm = false;
        }
        return validForm;
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
    handleBenQusDenmarkAuto(event) {
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
                thisObj.setState({ FirstName: data[i].FirstName });
                thisObj.setState({ LastName: data[i].LastName });
                thisObj.setState({ BirthName: data[i].BirthName });
                thisObj.setState({ PreviousName: data[i].MaidenName });
                var varDOB = data[i].DOB_Month + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year;
                thisObj.setState({ DOB: varDOB });
                //  thisObj.setState({ BirthCity : data[i].});  
                thisObj.setState({ BirthCountry: data[i].CountryOfCitizenship });
                thisObj.setState({ CitizenshipState: data[i].CountryOfCitizenship });
                thisObj.setState({ PermanentAddress: data[i].MailingAddress });
                thisObj.setState({ MaritalStatusState: data[i].MaritalStatus });
                if (this.state.MaritalStatusState == "M") {
                    var varPMDOB = data[i].DOMCDW_Month + "/" + data[i].DOMCDW_Day + "/" + data[i].DOMCDW_Year;
                    var DtPMDOB = new Date(varPMDOB);
                    thisObj.setState({ DateOfMarriage: DtPMDOB });
                    thisObj.setState({ PartnerFirstName: data[i].PFirstName });
                    thisObj.setState({ PartnerSurName: data[i].PLastName });
                    var varPDOB = data[i].PDOB_Month + "/" + data[i].PDOB_Day + "/" + data[i].PDOB_Year;
                    thisObj.setState({ PartnerDOB: varPDOB });
                }
                if (this.state.MarriedState == "Yes") {
                    thisObj.setState({ FirstName1: data[i].PFirstName });
                    thisObj.setState({ LastName1: data[i].PLastName });
                    var varPBDOB = data[i].PDOB_Month + "/" + data[i].PDOB_Day + "/" + data[i].PDOB_Year;
                    thisObj.setState({ DOB1: varPBDOB });
                    var varPDMDOB = data[i].DOMCDW_Month + "/" + data[i].DOMCDW_Day + "/" + data[i].DOMCDW_Year;
                    var DtPDMDOB = new Date(varPDMDOB);
                    thisObj.setState({ MarriedDate: DtPDMDOB });
                }
                thisObj.setState({ PensionState: data[i].CountryCode });
                thisObj.setState({ SecurityNumber: data[i].PersonalIDNum });
                thisObj.setState({ ConditionState: data[i].Receiving });
                thisObj.setState({ PensionAuthorityName: data[i].SSSecurity });
                thisObj.setState({ PensionAuthorityAddress: data[i].SSSecurityAddress });
                thisObj.setState({ PensionReceived: data[i].Receiving });
                var varLDOB = data[i].ResCountry_BMonth + "/" + "01" + "/" + data[i].ResCountry_BYear;
                var DtLDOB = new Date(varLDOB);
                thisObj.setState({ OnlyDenStDate: DtLDOB });
                var varEDOB = data[i].ResCountry_EMonth + "/" + "01" + "/" + data[i].ResCountry_EYear;
                var DtTDOB = new Date(varEDOB);
                thisObj.setState({ OnlyDenEnDate: DtTDOB });
                thisObj.setState({ AddressState: data[i].CurrentAddress });
                //thisObj.setState({CityState:data[i].});
            }
        }).catch((err) => {

        })
    }

    //Page Rendering
    render() {
        const { Csearch, MarriedState, WorkedState, WorkedState2 } = this.state
        const google = window.google;

        return (
            <div className="overall">
                <Col xs={12} md={12} style={newstyle}>
                    <Panel eventKey="1" defaultExpanded={true}>
                        <Panel.Heading>
                            <Panel.Title toggle>Denmark Form</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Row className="show-grid" className="overall">
                                <Col xs={12} md={12} >
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>APPLICANT</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>First name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your First Name"
                                                value={this.state.FirstName}
                                                onChange={this.handleChangeFirstName}
                                                errorText={this.state.isValidFirstName ? "Please Enter Your First Name" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Last name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Last Name"
                                                value={this.state.LastName}
                                                onChange={this.handleChangeLastName}
                                                errorText={this.state.isValidLastName ? "Please Enter Your Last Name" : ""}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Birth name (if different than current name)</label>
                                            <TextField hintText="Enter Your Birth Name"
                                                value={this.state.BirthName}
                                                onChange={this.handleChangeBirthName}
                                            //errorText={this.state.isValidBirthName ? "Please Enter Your Birth Name" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Previous name (e.g maiden name)<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Previous Name"
                                                value={this.state.PreviousName}
                                                onChange={this.handleChangePreviousName}
                                                errorText={this.state.isValidPreviousName ? "Please Enter Your Previous Name" : ""}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Date of Birth / CPR number<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Date of Birth / CPR number"
                                                value={this.state.DOB}
                                                onChange={this.handleChangeDOB}
                                                errorText={this.state.isValidDOB ? "Please Enter Your Date Of Birth/ CPR Number" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Phone number<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Phone number"
                                                value={this.state.PhoneNumber}
                                                onChange={this.handleChangePhoneNumber.bind(this)}
                                                errorText={this.state.isValidPhoneNumber ? "Please Enter Your Phone Number" : ""}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>City of birth<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your City of birth"
                                                value={this.state.BirthCity}
                                                onChange={this.handleChangeBirthCity}
                                                errorText={this.state.isValidCityOfBirth ? "Please Enter Your City Of Birth" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Email<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Email"
                                                value={this.state.EmailState}
                                                onChange={this.handleChangeEmailState}
                                                errorText={this.state.isValidEmail ? " Please Enter Your Email" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidEmailFormat ? "Please Enter the Valid Mail" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Country of birth<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the Country of birth"
                                                value={this.state.BirthCountry}
                                                onChange={this.handleChangeBirthCountry.bind(this)}
                                                errorText={this.state.isValidBirthCountry ? "Please Select Your Country Of Birth" : ""}
                                            >
                                                {CountryItems}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Citizenship<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the Citizenship"
                                                value={this.state.CitizenshipState}
                                                onChange={this.handleChangeCitizenshipState.bind(this)}
                                                errorText={this.state.isValidCitizenship ? "Please Select Your Citizenship" : ""}
                                            >
                                                {CountryItems}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Current permanent address<span className="manatoryfield">*</span></label>
                                            
                                            <Geosuggest
                                                placeholder="Enter Your Current permanent address"
                                                initialValue={this.state.PermanentAddress}
                                                onSuggestSelect={this.handleSelectSuggestC.bind(this)}
                                                onChange={this.handleChangePermanentAddress}
                                                value={this.state.PermanentAddress}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidPermanentAddress ? "Please Enter Your Permanent Address" : null}</span>
                                        </Col>
                                        {/* <Col xs={12} md={3} className="input-fileds">
                                            <TextField hintText="Enter Your Zip code and city"
                                                floatingLabelText="Zip code and city"
                                                value={this.state.CityZipCode}
                                                onChange={this.handleChangeCityZipCode}
                                            />
                                        </Col>
                                        <Col xs={12} md={3} className="input-fileds">
                                            <TextField hintText="Enter Your Country "
                                                floatingLabelText="Country "
                                                value={this.state.CountryState}
                                                onChange={this.handleChangeCountryState}
                                            />
                                        </Col> */}
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6}>
                                            <h4 className="ColorStyle"><b>DIGITAL POST</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label>Do you have access to digital post?"<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.DigitalState} onChange={this.handleChangeDigitalState.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidDigital ? "Please select do you have access to digital post" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} >
                                            <h4 className="ColorStyle"><b>REFUGEE STATUS</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label>Do you have or have you had refugee status under SS 7 or 8<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.RefugeeState} onChange={this.handleChangeRefugeeState.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidRefugee ? "Please select do you have or have had refugee status under SS 7 or 8" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} >
                                            <h4 className="ColorStyle"><b>FAMILY MATTERS</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={8} className="input-fileds align-fileds">
                                            <label>Current Marital / Civil Status<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                value={this.state.MaritalStatusState}
                                                hintText="Select the Marital Status"
                                                onChange={this.handleChangeMaritalStatus}
                                                errorText={this.state.isValidMaritalStatus ? "Please select current marital or civil status" : null}
                                            >
                                                {MaritalStatusItems}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        {this.state.MaritalStatusState != "S" && this.state.MaritalStatusState != "" ?
                                            <div>
                                                <Col xs={12} md={8} className="input-fileds align-fileds">
                                                    <label>Date of Marriage - From which date?<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Your Dates of Marriage"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.DateOfMarriage}
                                                        onChange={this.handlerDateOfMarriage.bind(this)}
                                                        errorText={this.state.isValidMarriageDt ? "Please select date of marriage" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Wife / partner's first name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Wife / partner's first name "
                                                        value={this.state.PartnerFirstName}
                                                        onChange={this.handleChangePartnerFirstName}
                                                        errorText={this.state.isValidPartnerFirstName ? "Please Enter Your Partner First Name" : ""}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Wife / partner's surname<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Wife / partner's surname "
                                                        value={this.state.PartnerSurName}
                                                        onChange={this.handleChangePartnerSurName}
                                                        errorText={this.state.isValidPartnerSureName ? "Please Enter Your Partner Sure Name" : ""}
                                                    />
                                                </Col>
                                            </div>
                                            : null}
                                    </Col>
                                    <Col xs={12} md={12}>
                                        {this.state.MaritalStatusState != "S" && this.state.MaritalStatusState != "" ?
                                            <div>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Spouse / partner's date of birth / CPR number<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Spouse / partner's date of birth / CPR number"
                                                        value={this.state.PartnerDOB}
                                                        onChange={this.handleChangePartnerDOB}
                                                        errorText={this.state.isValidpartnerDOB ? "Please Enter Your Partner Date Of Birth" : ""}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="Radio_button">
                                                    <label>Have you previously been married while you have lived in Denmark?<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.MarriedState} onChange={this.handleChangeMarriedState.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidMarried ? "Please select have you previously married while you have lived in Denmark" : null}</span>
                                                </Col>
                                            </div>
                                            : null}
                                    </Col>
                                    {this.state.MaritalStatusState != "S" && this.state.MaritalStatusState != "" ?
                                        <div>
                                            {this.state.MarriedState == "Yes" ?
                                                <div>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                                            <label>First name<span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Your First Name"
                                                                value={this.state.FirstName1}
                                                                onChange={this.handleChangeFirstName1}
                                                                errorText={this.state.isValidFirstName1 ? "Please enter firstname" : null}
                                                            />
                                                        </Col>
                                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                                            <label>Last name<span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Your Last Name"
                                                                value={this.state.LastName1}
                                                                onChange={this.handleChangeLastName1}
                                                                errorText={this.state.isValidLastName1 ? "Please enter lastname" : null}
                                                            />
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                                            <label>Date of birth / CPR number.<span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Your Date of birth / CPR number"
                                                                value={this.state.DOB1}
                                                                onChange={this.handleChangeDOB1}
                                                                errorText={this.state.isValidDOB1 ? "Please enter your date of birth or CPR number" : null}
                                                            />
                                                        </Col>
                                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                                            <label>Date of Marriage <span className="manatoryfield">*</span></label>
                                                            <DatePicker hintText="Enter Your Dates of Marriage"
                                                                locale="en-US"
                                                                firstDayOfWeek={0}
                                                                value={this.state.MarriedDate}
                                                                onChange={this.handleMarriedDate}
                                                                errorText={this.state.isValidDtMarriage ? "Please enter your date of marriage" : null}
                                                            />
                                                        </Col>
                                                    </Col>
                                                </div>
                                                : null}
                                        </div>
                                        : null}
                                    {this.state.MarriedState == "Yes" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Father's First name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Father FirstName"
                                                        value={this.state.FatherFirstName}
                                                        onChange={this.handleChangeFatherFirstName}
                                                        errorText={this.state.isValidFatherFirstName ? "Please Enter Your Father First Name" : ""}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Father's Last name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Father LastName"
                                                        value={this.state.FatherLastName}
                                                        onChange={this.handleChangeFatherLastName}
                                                        errorText={this.state.isValidFatherLastName ? "Please Enter Your Father Last Name" : ""}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Father's Date of birth / CPR number<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Father Date of birth / CPR number"
                                                        value={this.state.FatherDOB}
                                                        onChange={this.handleChangeFatherDOB}
                                                        errorText={this.state.isValidFatherDOB ? "Please Enter Your Father Date Of Birth" : ""}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Mother's First name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Mother FirstName"
                                                        value={this.state.MotherFirstName}
                                                        onChange={this.handleChangeMotherFirstName}
                                                        errorText={this.state.isValidMotherFirstName ? "Please Enter Your Mother First Name" : ""}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Mother's Last name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Mother LastName"
                                                        value={this.state.MotherLastName}
                                                        onChange={this.handleChangeMotherLastName}
                                                        errorText={this.state.isValidMotherLastName ? "Please Enter Your Mother Last Name" : ""}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Mother's Date of birth / CPR number<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Mother Date of birth / CPR number"
                                                        value={this.state.MotherDOB}
                                                        onChange={this.handleChangeMotherDOB}
                                                        errorText={this.state.isValidMotherDOB ? "Please Enter Your Mother Date Of Birth" : ""}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} >
                                            <h4 className="ColorStyle"><b>SOCIAL PENSION FROM OTHER COUNTRIES</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Have you earned the right to social pension in another country?<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Any Pension in Another Country"
                                                value={this.state.PensionState}
                                                onChange={this.handleChangePensionState}
                                                errorText={this.state.isValidPension ? "Please Enter Country" : ""}
                                            />
                                        </Col>
                                        {(this.state.ConditionState != "" || this.state.ConditionState == "Currently receiving") ?
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>If yes, provide insurance or social securtiy number in other countries<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Your SS Number in Another Country"
                                                    value={this.state.SecurityNumber}
                                                    onChange={this.handleChangeSecurityNumber}
                                                    errorText={this.state.isValidSecurityNumber ? "Please enter your SS number in another country" : null}
                                                />
                                            </Col>
                                            : ''}
                                    </Col>
                                    {(this.state.ConditionState != "" || this.state.ConditionState == "Currently receiving") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Pension Authority name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Pension Authority name"
                                                        value={this.state.PensionAuthorityName}
                                                        onChange={this.handleChangePensionAuthorityName}
                                                        errorText={this.state.isValidPensionAuthorityName ? "Please enter your pension authority name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Pension Authority Address<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Pension Authority Address"
                                                        value={this.state.PensionAuthorityAddress}
                                                        onChange={this.handleChangePensionAuthorityAddress}
                                                        errorText={this.state.isValidPensionAuthorityAddress ? "Please enter your pension authority address name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Have you received some kind of pension?<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select received any kind of pension"
                                                        value={this.state.PensionReceived}
                                                        onChange={this.handleChangePensionReceived}
                                                        errorText={this.state.isValidPensionReceived ? "Please Select the any received pension" : ""}
                                                    >
                                                        <MenuItem value={"Disability Benefits"} primaryText="Disability Benefits" />
                                                        <MenuItem value={"Age Pension"} primaryText="Age Pension" />
                                                        <MenuItem value={"Widow Pension"} primaryText="Widow Pension" />
                                                    </SelectField>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ""}
                                    {this.state.ConditionState == "Currently receiving" ?
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>If yes, from what date?<span className="manatoryfield">*</span></label>
                                                <DatePicker
                                                    hintText="Select the date"
                                                    value={this.state.DateState}
                                                    onChange={this.handleChangeDateState}
                                                    errorText={this.state.isValidDate ? "Please Select the Date" : ""}
                                                />
                                            </Col>
                                        </Col>
                                        : ""}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>WHERE HAVE YOU LIVED IN DENMARK FROM YOU WERE 15 YEARS AND BEYOND FROM 1971?</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Form Date<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Select the Form Date "
                                                value={this.state.OnlyDenStDate}
                                                onChange={this.handleOnlyDenState}
                                                errorText={this.state.isValidDenStDate ? "Please select start date" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>To Date<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Select the To Date"
                                                value={this.state.OnlyDenEnDate}
                                                onChange={this.handleOnlyDenEndDateState}
                                                errorText={this.state.isValidDenToDate ? "Please select end date" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Address<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Address"
                                                value={this.state.AddressState}
                                                onChange={this.handleChangeAddressState}
                                                errorText={this.state.isValidAddress ? "Please enter address" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>City<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your City"
                                                value={this.state.CityState}
                                                onChange={this.handleChangeCityState}
                                                errorText={this.state.isValidCity ? "Please enter city" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>HAVE YOU LIVED ABROAD AND AT THE SAME TIME WORK IN DENMARK FROM YOU WERE 15 YEARS? </b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>Have you lived abroad, but worked in Denmark at the same time (i.e. Not lived in Denmark at this time)?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.WorkedState} onChange={this.handleChangeWorkedState.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidWorked ? "Please Select wherther lived abroad or not" : null}</span>
                                        </Col>
                                    </Col>
                                    {(WorkedState == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Form Date<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Form Date "
                                                        value={this.state.DenStDate}
                                                        onChange={this.handleDenStDate}
                                                        errorText={this.state.isValidDateForm ? "Please select start date" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>To Date<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="To Date"
                                                        value={this.state.DenEnDate}
                                                        onChange={this.handleDenEnDate}
                                                        errorText={this.state.isValidDateTo ? "Please select end date" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Address<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Address"
                                                        value={this.state.AddressState1}
                                                        onChange={this.handleChangeAddressState1}
                                                        errorText={this.state.isValidAddress1 ? "Please enter address" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Country<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Country"
                                                        value={this.state.CountryState1}
                                                        onChange={this.handleChangeCountryState1}
                                                        errorText={this.state.isValidCountry1 ? "Please enter city" : null}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>WORK IN DENMARK</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label>Have you worked at least 12 months in Denmark?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.WorkedState1} onChange={this.handleChangeWorkedState1.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidWorked1 ? "Please select wherther worked atleast 12 month in denmark" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>HAVE YOU WORKED FOR DANISH EMPLOYERS WHEN YOU HAVE LIVED AND WORKED ABROAD?</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label>Have you lived abroad, while working for a Danish employer?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.WorkedState2} onChange={this.handleChangeWorkedState2.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidWorked2 ? "Please select whether lived abroad working in danish employer" : null}</span>
                                        </Col>
                                    </Col>
                                    {(WorkedState2 == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Form Date<span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        hintText="Select the From Date"
                                                        value={this.state.AbStDate}
                                                        onChange={this.handlerAbStDate}
                                                        errorText={this.state.isValidDateFromWorked ? "Please select from date you have worked" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>To Date<span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        hintText="Select the To Date"
                                                        value={this.state.AbEnDate}
                                                        onChange={this.handlerAbEnDate}
                                                        errorText={this.state.isValidDateToWorked ? "Please select from date you have worked" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Employer / Nature of enterprise<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Employer / Nature of enterprise"
                                                        value={this.state.EmployerState}
                                                        onChange={this.handleChangeEmployerState}
                                                        errorText={this.state.isValidEmployer ? "Please enter your name of enterprise worked in abroad" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Company Address<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Company Address"
                                                        value={this.state.CompanyAddress}
                                                        onChange={this.handleChangeCompanyAddress}
                                                        errorText={this.state.isValidCompanyAddress ? "Please enter your address of enterprise" : null}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12}>
                                            <h4 className="ColorStyle"><b>ACCOMPANYING SPOUSE</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label>Have you lived abroad as an accompanying spouse?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.SpouseState} onChange={this.handleChangeSpouseState.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidSpouse ? "Please select whether lived abroad spouse or not" : null}</span>
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
                            </Row>
                        </Panel.Body>
                        <Col xs={12} md={12}>
                            <Col xs={12} md={12} className="input-fields">
                                <Button onClick={this.submitHandler.bind(this)} className="RQ-Add" >Save</Button>
                                <Notifications />
                            </Col>
                        </Col>
                    </Panel>
                </Col>

            </div>
        );
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

    

    //Save Function
    submitHandler(e) {
        e.preventDefault();
        var isValid = this.validateRequireField();
        if (isValid) {
            let residendyData = {
                "QueryName": "Save",
                "UserID": this.state.EmailState,
                "AppAnsInJsonObj":
                {
                    "queryMode": "DenMarkCountryData",
                    "FirstName": this.state.FirstName,
                    "LastName": this.state.LastName,
                    "BirthName": this.state.BirthName,
                    "PreviousName": this.state.PreviousName,
                    "DOB": this.state.DOB,
                    "PhoneNumber": this.state.PhoneNumber,
                    "BirthCity": this.state.BirthCity,
                    "EmailState": this.state.EmailState,
                    "BirthCountry": this.state.BirthCountry,
                    "CitizenshipState": this.state.CitizenshipState,
                    "PermanentAddress": this.state.PermanentAddress,
                    "CityZipCode": this.state.CityZipCode,
                    "CountryState": this.state.CountryState,
                    "RefugeeState": this.state.RefugeeState,
                    "MaritalStatusState": this.state.MaritalStatusState,
                    "PartnerFirstName": this.state.PartnerFirstName,
                    "PartnerSurName": this.state.PartnerSurName,
                    "PartnerDOB": this.state.PartnerDOB,
                    "MarriedState": this.state.MarriedState,
                    "FirstName1": this.state.FirstName1,
                    "LastName1": this.state.LastName1,
                    "DOB1": this.state.DOB1,
                    "MarriedDate": this.state.MarriedDate,
                    "FatherFirstName": this.state.FatherFirstName,
                    "FatherLastName": this.state.FatherLastName,
                    "FatherDOB": this.state.FatherDOB,
                    "MotherFirstName": this.state.MotherFirstName,
                    "MotherLastName": this.state.MotherLastName,
                    "MotherDOB": this.state.MotherDOB,
                    "PensionState": this.state.PensionState,
                    "SecurityNumber": this.state.SecurityNumber,
                    "PensionAuthorityName": this.state.PensionAuthorityName,
                    "PensionAuthorityAddress": this.state.PensionAuthorityAddress,
                    "PensionReceived": this.state.PensionReceived,
                    "DateState": this.state.DateState,
                    "OnlyDenStDate": this.state.OnlyDenStDate,
                    "OnlyDenEnDate": this.state.OnlyDenEnDate,
                    "AddressState": this.state.AddressState,
                    "CityState": this.state.CityState,
                    "WorkedState": this.state.WorkedState,
                    "DenStDate": this.state.DenStDate,
                    "DenEnDate": this.state.DenEnDate,
                    "AddressState1": this.state.AddressState1,
                    "CountryState1": this.state.CountryState1,
                    "WorkedState1": this.state.WorkedState1,
                    "WorkedState2": this.state.WorkedState2,
                    "AbStDate": this.state.AbStDate,
                    "AbEnDate": this.state.AbEnDate,
                    "EmployerState": this.state.EmployerState,
                    "CompanyAddress": this.state.CompanyAddress,
                    "SpouseState": this.state.SpouseState,
                    "StartAndEndDate": this.state.StartAndEndDate
                },
                "CountryCode": "DK",
                "isActive": "Yes"
            }
            let thisObj = this;
            let tempCountryOutput = [];
            let countryApiUrl = " https://4k73oeispk.execute-api.us-west-2.amazonaws.com/dev/GPA_BenQusDatas_Lambda";
            axios({
                method: "POST",
                url: countryApiUrl,
                data: JSON.stringify(residendyData),

            }).then(({ data }) => {
                notify.show("Your Part2 Information Saved Successfully", "success", 3000);
                thisObj.handleAppProcessFlowUpdate(this);
                //thisObj.handleReset(this);
                //thisObj.handleSendBilateralForms(this);
                this.props.MailSends();
            }).catch((err) => {

            });
        }
        notify.show("Please Fill Mandatory Fields", "error", 3000);
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

BenQusDenmark.propTypes = {
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(BenQusDenmark);