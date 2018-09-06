import React, { Component } from 'react';
import PropTypes from "prop-types";
//Bootstrap Component
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup, RaisedButton } from 'material-ui';

//API Calling Method
import axios from 'axios';

//Google Address 
import Geosuggest from 'react-geosuggest';

import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, AmazonCognitoIdentity } from 'amazon-cognito-identity-js';

//Notification 
import Notifications, { notify } from 'react-notify-toast';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Routing
import history from '../Routing/history';
var emailresult;
/* User Pool Access Details */
const poolData = {
    UserPoolId: 'us-west-2_wgkaBUmz5',//'us-west-2_kG2V3FBcu', // Your user pool id here
    ClientId: '3ocb7u0422dhf9c38vacc0kfv3',//'4apkr7thetvm981irp8ohsjj1t', // Your client id here 4gjka5ag6svfp0f3c4i2a1r8oo
    identityID: "us-west-2:2cae3c46-6f2b-40dd-a059-5313e2b8b23b",//"us-west-2:746c750e-7185-4675-84c1-95186baed362",//"us-west-2:e2caf986-8e5b-4c17-abe1-362efe0c8960",
    region: "us-west-2",
};

const BenefitStatus = [
    <MenuItem value={"Retirement Benefits"} key={1} primaryText="Retirement/Old-Age" />,
    <MenuItem value={"Previous Employer Benefits"} key={2} primaryText="Disability or Sickness/Invalidity" />,
    <MenuItem value={"Survivor Benefits"} key={3} primaryText="Survivors" />,
    <MenuItem value={"Other"} key={4} primaryText="Other" />,
];

const Benefit1Status = [
    <MenuItem value={"Retirement/Old-Age"} key={1} primaryText="Retirement/Old-Age" />,
    <MenuItem value={"Disability or Sickness/Invalidity"} key={2} primaryText="Disability or Sickness/Invalidity" />,
    <MenuItem value={"Survivors"} key={3} primaryText="Survivors" />,
];

const MonthItems = [
    <MenuItem value={"January"} key={1} primaryText={"January"} />,
    <MenuItem value={"February"} key={2} primaryText={"February"} />,
    <MenuItem value={"March"} key={3} primaryText={"March"} />,
    <MenuItem value={"April"} key={4} primaryText={"April"} />,
    <MenuItem value={"May"} key={5} primaryText={"May"} />,
    <MenuItem value={"June"} key={7} primaryText={"June"} />,
    <MenuItem value={"July"} key={8} primaryText={"July"} />,
    <MenuItem value={"August"} key={9} primaryText={"August"} />,
    <MenuItem value={"September"} key={10} primaryText={"September"} />,
    <MenuItem value={"October"} key={11} primaryText={"October"} />,
    <MenuItem value={"November"} key={12} primaryText={"November"} />,
    <MenuItem value={"December"} key={12} primaryText={"December"} />,
];

const Daystatus = [];
for (let i = 1; i < 32; i++) {
    Daystatus.push(<MenuItem value={i.toString()} key={i.toString()} primaryText={i.toString()} />);
}

const Yearstatus = [];
for (let i = 1930; i < 2019; i++) {
    Yearstatus.push(<MenuItem value={i.toString()} key={i.toString()} primaryText={i.toString()} />);
}

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

const CountryItems = [];

const IndustryItems = [];

const InformationChildren = [];

const InformationChildren1 = [];

const InfoBen = [];

class BenQusUS extends Component {
    constructor(props) {
        super(props);
        this.handleBenQusUSAuto(this);
        this.handleBenQusUSAutoName(this)
        this.handleLoadIndustry(this);
        this.handleLoadCountry(this);
        //Field State Values Initialization
        this.state = {
            AnotherEmployer: [],
            BtnNameState: "save",
            search2: "",
            search1: "",
            search: "",
            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            SecurityNumberState: "",
            WorkedFromDateState: "",
            WorkedToDateState: "",
            NameEmployerState: "",
            AddressEmployerState: "",
            IndustrylistState: "",
            SocialState: "",
            NameAgencyState: "",
            CoverdFromDateState: "",
            CoverdToDateState: "",
            CoverageState: "",
            SINState: "",
            NameAgency1State: "",
            LastWorkingPlaceNameAgencyState: "",
            MaritalState: "",
            BenefitState: "",
            TypeBenefitsState: "",
            ReceivingState: "",
            Receiving1State: "",
            Receiving2State: "",
            Receiving3State: "",
            BirthNameState: "",
            SIN2State: "",
            MotherFirstNameState: "",
            MotherMiddleNameState: "",
            MotherLastNameState: "",
            FatherFirstNameState: "",
            FatherMiddleNameState: "",
            FatherLastNameState: "",
            NameCountryState: "",
            EligibleState: "",
            WorkerState: "",
            PersonState: "",
            DateRefugeeState: "",
            MonthState: "",
            DayState: "",
            YearState: "",
            ApplyState: "",
            StopWorkMonthState: "",
            StopWorkDayState: "",
            StopWorkYearState: "",
            OccpState: "",
            OccupationState: "",
            CountryState: "",
            FirstName2State: "",
            MiddleName2State: "",
            LastName2State: "",
            SecurityNumber2State: "",
            SIN3State: "",
            AdditionalWorkerMonthState: "",
            AdditionalWorkerDayState: "",
            AdditionalWorkerYearState: "",
            PlaceBirthState: "",
            DeathState: "",
            PlaceDeathState: "",
            ServiceState: "",
            CountryServedState: "",
            MonthServiceState: "",
            DayServiceState: "",
            YearServiceState: "",
            MonthService1State: "",
            DayService1State: "",
            YearService1State: "",
            BenefitServiceState: "",
            RecipientNameState: "",
            USAgencyState: "",
            ClaimNumberState: "",
            RecipientName1State: "",
            USAgency1State: "",
            ClaimNumber1State: "",
            NumberState: "",
            // AddressEmployerState:"",
            AddressEmployer2State: "",
            WorkMonthState: "",
            WorkYearState: "",
            EndedMonthState: "",
            EndedYearState: "",
            EmployerState: "",
            UnderAgeState: "",
            OverAgeState: "",
            ChildState: "",
            RelationshipState: "",
            ChildrenDateofBirthState: "",
            PartnerState: "",
            PartnerDateofBirthState: "",
            PartnerDateMarriageState: "",
            PartnerDateofDivorceState: "",
            CitizenshipState: "",
            SIN4State: "",
            SecurityNumber3State: "",
            FormerState: "",
            PartnerNameState: "",
            PartnerDateofBirth1State: "",
            PartnerDateMarriage1State: "",
            PartnerDateofDivorce1State: "",
            Citizenship1State: "",
            PartnerDateofBirth5State: "",
            SIN5State: "",
            SecurityNumber4State: "",
            Former1State: "",
            PartnerName1State: "",
            PartnerDateofBirth2State: "",
            PartnerDateofMarriage2State: "",
            PartnerDateofDivorce2State: "",
            Citizenship2State: "",
            SIN6State: "",
            SecurityNumber5State: "",
            Number1State: "",
            NameSIN2State: "",
            Benefit1State: "",
            ClaimNumber2State: "",
            AmountBenefitsState: "",
            AgencyClaimState: "",
            RemarkState: "",
            insertCountryState: "United Stated",
            Benefitid:'',

        }
    }

    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
    }

    //Handle Event
    handleChangeFirstName(e) {
        this.setState({ FirstNameState: e.target.value });
    };

    handleChangeMiddleName(e) {
        this.setState({ MiddleNameState: e.target.value });
    };

    handleChangeLastName(e) {
        this.setState({ LastNameState: e.target.value });
    };

    handleChangeSecurityNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 12) {
            this.setState({ SecurityNumberState: onlyNums });
        }
    };

    handleChangeNameEmployer(e) {
        this.setState({ NameEmployerState: e.target.value });
    };

    // handleChangeNameAgency(e) {
    //     this.setState({NameAgencyState:e.target.value});
    // }

    // handleChangeSIN(e) {
    //     this.setState({SINState:e.target.value});
    // }

    handleChangeNameAgency(e) {
        this.setState({ NameAgencyState: e.target.value });
    };

    handleChangeWorkingPlace(e) {
        this.setState({ WorkingPlaceState: e.target.value });
    };

    handleSelectSuggest1(suggest) {
        if (suggest) {
            this.setState({ AddressEmployerState: suggest.description })
        }
    };

    handleChangeAddressEmployer(value) {
        this.setState({ AddressEmployerState: value });
    };

    handleChangeCoverage(e) {
        this.setState({ CoverageState: e.target.value });
    };

    handleChangeSIN(e) {
        this.setState({ SINState: e.target.value });
    };

    handleChangeNameAgency1(e) {
        this.setState({ NameAgency1State: e.target.value });
    };

    handleSelectSuggest(suggest) {
        if (suggest) {
            this.setState({ LastWorkingPlaceNameAgencyState: suggest.description })
        }
    };

    handleChangeLastWorkingPlaceNameAgency(value) {
        this.setState({ LastWorkingPlaceNameAgencyState: value });
    };

    handleChangeBenefit(e, index, value) {
        this.setState({ BenefitState: value });
    };

    handleChangeTypeBenefits(e) {
        this.setState({ TypeBenefitsState: e.target.value });
    };

    handleChangeBirthName(e) {
        this.setState({ BirthNameState: e.target.value });
    };

    handleChangeSIN2(e) {
        this.setState({ SIN2State: e.target.value });
    };

    handleChangeMotherFirstName(e) {
        this.setState({ MotherFirstNameState: e.target.value });
    };

    handleChangeMotherMiddleName(e) {
        this.setState({ MotherMiddleNameState: e.target.value });
    };

    handleChangeMotherLastName(e) {
        this.setState({ MotherLastNameState: e.target.value });
    };

    handleChangeFatherFirstName(e) {
        this.setState({ FatherFirstNameState: e.target.value });
    };

    handleChangeFatherMiddleName(e) {
        this.setState({ FatherMiddleNameState: e.target.value });
    };

    handleChangeFatherLastName(e) {
        this.setState({ FatherLastNameState: e.target.value });
    };

    handleChangeNameCountry(e) {
        this.setState({ NameCountryState: e.target.value });
    };

    handleChangePerson(e) {
        this.setState({ PersonState: e.target.value });
    };

    handleChangeDateRefugee(e) {
        this.setState({ DateRefugeeState: e.target.value });
    };

    handleChangeFirstName2(e) {
        this.setState({ FirstName2State: e.target.value });
    };

    handleChangeSecurityNumber2(e) {
        this.setState({ SecurityNumber2State: e.target.value });
    };

    handleChangeMiddleName2(e) {
        this.setState({ MiddleName2State: e.target.value });
    };

    handleChangeLastName2(e) {
        this.setState({ LastName2State: e.target.value });
    };

    handleChangeRelationship(e) {
        this.setState({ RelationshipState: e.target.value });
    };

    handleChangeSIN3(e) {
        this.setState({ SIN3State: e.target.value });
    };

    handleSelectSuggest2(suggest) {
        if (suggest) {
            this.setState({ PlaceBirthState: suggest.description })
        }
    };

    handleChangePlaceBirth(value) {
        this.setState({ PlaceBirthState: value });
    };

    handleChangeDeath(e, date) {
        this.setState({ DeathState: date });
    };

    handleChangePlaceDeath(e) {
        this.setState({ PlaceDeathState: e.target.value });
    };

    handleChangeService(e) {
        this.setState({ ServiceState: e.target.value });
    };

    handleChangeCountryServed(e) {
        this.setState({ CountryServedState: e.target.value });
    };

    handleChangeRecipientName(e) {
        this.setState({ RecipientNameState: e.target.value });
    };

    handleChangeUSAgency(e) {
        this.setState({ USAgencyState: e.target.value });
    };

    handleChangeClaimNumber(e) {
        this.setState({ ClaimNumberState: e.target.value });
    };

    handleChangeRecipientName1(e) {
        this.setState({ RecipientName1State: e.target.value });
    };

    handleChangeUSAgency1(e) {
        this.setState({ USAgency1State: e.target.value });
    };

    handleChangeClaimNumber1(e) {
        this.setState({ ClaimNumber1State: e.target.value });
    };

    handleChangeAddressEmployer2(e) {
        this.setState({ AddressEmployer2State: e.target.value });
    };

    handleChangeChild(e) {
        this.setState({ ChildState: e.target.value });
    };

    handleChangeRelationship1(e) {
        this.setState({ Relationship1State: e.target.value });
    };

    handleChangePartner(e) {
        this.setState({ PartnerState: e.target.value });
    };

    handleChangeCitizenship(e) {
        this.setState({ CitizenshipState: e.target.value });
    };

    handleChangeSIN4(e) {
        this.setState({ SIN4State: e.target.value });
    };

    handleChangeSecurityNumber3(e) {
        this.setState({ SecurityNumber3State: e.target.value });
    };

    handleChangePartnerName(e) {
        this.setState({ PartnerNameState: e.target.value });
    };

    handleChangeCitizenship1(e) {
        this.setState({ Citizenship1State: e.target.value });
    };

    handleChangeSIN5(e) {
        this.setState({ SIN5State: e.target.value });
    };

    handleChangeSecurityNumber4(e) {
        this.setState({ SecurityNumber4State: e.target.value });
    };

    handleChangePartnerName1(e) {
        this.setState({ PartnerName1State: e.target.value });
    };

    handleChangeCitizenship2(e) {
        this.setState({ Citizenship2State: e.target.value });
    };

    handleChangeSIN6(e) {
        this.setState({ SIN6State: e.target.value });
    };

    handleChangeSecurityNumber5(e) {
        this.setState({ SecurityNumber5State: e.target.value });
    };

    handleChangeNameSIN2(e) {
        this.setState({ NameSIN2State: e.target.value });
    };

    handleChangeBenefit1(e) {
        this.setState({ Benefit1State: e.target.value });
    };

    handleChangeClaimNumber2(e) {
        this.setState({ ClaimNumber2State: e.target.value });
    };

    handleChangeAmountBenefits(e) {
        this.setState({ AmountBenefitsState: e.target.value });
    };

    handleChangeAgencyClaim(e) {
        this.setState({ AgencyClaimState: e.target.value });
    };

    handleChangeRemark(e) {
        this.setState({ RemarkState: e.target.value });
    };

    handleChangeOccupation(e) {
        this.setState({ OccupationState: e.target.value });
    };

    handleChangeCountry(e) {
        this.setState({ CountryState: e.target.value });
    };

    handleChangeWorkedFromDate(e, date) {
        this.setState({ WorkedFromDateState: date });
    };

    handleChangeWorkedToDate(e, date) {
        const { validationError } = this.state;
        this.setState({ WorkedToDateState: date }, function () {
            if (this.state.WorkedFromDateState > this.state.WorkedToDateState) {
                this.setState({ ValidateYearWorked: true });
            } else {
                this.setState({ ValidateYearWorked: false });
            }
        });
    };

    handleChangeIndustrylist(e, index, value) {
        this.setState({ IndustrylistState: value });
    };

    handleChangeSocialState(e) {
        this.setState({ SocialState: e.target.value });
    };

    handleChangeCoverdFromDate(e, date) {
        this.setState({ CoverdFromDateState: date });
    };

    handleChangeCoverdToDate(e, date) {
        const { validationError } = this.state;
        this.setState({ CoverdToDateState: date }, function () {
            if (this.state.CoverdFromDateState > this.state.CoverdToDateState) {
                this.setState({ ValidateYearWorked1: true });
            } else {
                this.setState({ ValidateYearWorked1: false });
            }
        });
        this.setState({ CoverdToDateState: date });
    };

    handleChangeSocialState(e) {
        this.setState({ SocialState: e.target.value });
    };

    handleChangeReceiving(e) {
        this.setState({ ReceivingState: e.target.value });
    };

    handleChangeReceiving1(e) {
        this.setState({ Receiving1State: e.target.value });
    };

    handleChangeReceiving2(e) {
        this.setState({ Receiving2State: e.target.value });
    };

    handleChangeReceiving3(e) {
        this.setState({ Receiving3State: e.target.value });
    };

    handleChangeGender(e) {
        this.setState({ GenderState: e.target.value });
    };

    handleChangeEligible(e) {
        this.setState({ EligibleState: e.target.value });
    };

    handleChangeWorker(e) {
        this.setState({ WorkerState: e.target.value });
    };

    handleChangeMonth(e, index, value) {
        this.setState({ MonthState: value });
    };

    handleChangeDay(e, index, value) {
        this.setState({ DayState: value });
    };

    handleChangeYear(e, index, value) {
        this.setState({ YearState: value });
    };

    handleChangeApply(e) {
        this.setState({ ApplyState: e.target.value });
    };

    handleChangeStopWorkMonth(e, index, value) {
        this.setState({ StopWorkMonthState: value });
    };

    handleChangeStopWorkDay(e, index, value) {
        this.setState({ StopWorkDayState: value });
    };

    handleChangeStopWorkYear(e, index, value) {
        this.setState({ StopWorkYearState: value });
    };

    handleChangeOccp(e) {
        this.setState({ OccpState: e.target.value });
    };

    handleChangeAdditionalWorkerMonth(e, index, value) {
        this.setState({ AdditionalWorkerMonthState: value });
    };

    handleChangeAdditionalWorkerDay(e, index, value) {
        this.setState({ AdditionalWorkerDayState: value });
    };

    handleChangeAdditionalWorkerYear(e, index, value) {
        this.setState({ AdditionalWorkerYearState: value });
    };

    handleChangeSerivce(e, index, value) {
        this.setState({ SerivceState: value });
    };

    handleChangeMonthService(e, index, value) {
        this.setState({ MonthServiceState: value });
    };

    handleChangeDayService(e, index, value) {
        this.setState({ DayServiceState: value });
    };

    handleChangeYearService(e, index, value) {
        this.setState({ YearServiceState: value });
    };

    handleChangeMonthService1(e, index, value) {
        this.setState({ MonthService1State: value });
    };

    handleChangeDayService1(e, index, value) {
        this.setState({ DayService1State: value });
    };

    handleChangeYearService1(e, index, value) {
        const { validationError } = this.state;
        this.setState({ YearService1State: value }, function () {
            if (this.state.YearServiceState > this.state.YearService1State) {
                this.setState({ ValidateYearWorked2: true });
            } else {
                this.setState({ ValidateYearWorked2: false });
            }
        });
        this.setState({ YearService1State: value });
    };

    handleChangeBenefitSerivce(e) {
        this.setState({ BenefitServiceState: e.target.value });
    };

    handleChangeNumber(e) {
        this.setState({ NumberState: e.target.value });
    };

    handleChangeWorkMonth(e, index, value) {
        this.setState({ WorkMonthState: value });
    };

    handleChangeWorkYear(e, index, value) {
        this.setState({ WorkYearState: value });
    };

    handleChangeEndedMonth(e, index, value) {
        this.setState({ EndedMonthState: value });
    };

    handleChangeEndedYear(e, index, value) {
        const { validationError } = this.state;
        this.setState({ EndedYearState: value }, function () {
            if (this.state.WorkYearState > this.state.EndedYearState) {
                this.setState({ ValidateYearWorked2: true });
            } else {
                this.setState({ ValidateYearWorked2: false });
            }
        });
        this.setState({ EndedYearState: value });
    };

    handleChangeEmployer(e) {
        this.setState({ EmployerState: e.target.value });
    };

    handleChangeUnderAge(e) {
        this.setState({ UnderAgeState: e.target.value });
    };

    handleChangeOverAge(e) {
        this.setState({ OverAgeState: e.target.value });
    };

    handleChangeChildrenGender(e, index, value) {
        this.setState({ ChildrenGenderState: value });
    };

    handleChangeChildrenDateofBirth(e, date) {
        this.setState({ ChildrenDateofBirthState: date });
    };

    // handleChangePartnerDateofBirth(e,date) {
    //     this.setState({PartnerDateofBirthState:date});
    // }

    handleChangePartnerDateofBirth5(e, date) {
        this.setState({ PartnerDateofBirth5State: date });
    };

    handleChangePartnerDateMarriage(e, date) {
        this.setState({ PartnerDateMarriageState: date });
    };

    handleChangePartnerDateofDivorce(e, date) {
        this.setState({ PartnerDateofDivorceState: date });
    };

    handleChangeFormer(e) {
        this.setState({ FormerState: e.target.value });
    };

    handleChangePartnerDateofBirth1(e, date) {
        this.setState({ PartnerDateofBirth1State: date });
    };

    handleChangePartnerDateMarriage1(e, date) {
        this.setState({ PartnerDateMarriage1State: date });
    };

    handleChangePartnerDateofDivorce1(e, date) {
        this.setState({ PartnerDateofDivorce1State: date });
    };

    handleChangeFormer1(e) {
        this.setState({ Former1State: e.target.value });
    };

    handleChangePartnerDateofBirth2(e, date) {
        this.setState({ PartnerDateofBirth2State: date });
    };

    handleChangePartnerDateMarriage2(e, date) {
        this.setState({ PartnerDateofMarriage2State: date });
    };

    handleChangePartnerDateofDivorce2(e, date) {
        this.setState({ PartnerDateofDivorce2State: date });
    };

    handleChangeNumber1(e) {
        this.setState({ Number1State: e.target.value });
    };

    //Child Validation Function
    handleValidateChildForm(event) {
        let validForm = false;

        var validWorkedFromDateForm = false;
        var validWorkedToDateForm = false;
        var validNameEmployerForm = false;
        var validAddressEmployerForm = false;
        var validIndustrylistForm = false;
        var validSocialForm = false;
        var validNameAgencyForm = false;

        if (this.state.WorkedFromDateState != "") {
            this.setState({ isValidWorkedFromDate: false });
            validWorkedFromDateForm = true;
        }
        else {
            this.setState({ isValidWorkedFromDate: true });
            validWorkedFromDateForm = false;
        }
        if (this.state.WorkedToDateState != "") {
            this.setState({ isValidWorkedToDate: false });
            validWorkedToDateForm = true;
        }
        else {
            this.setState({ isValidWorkedToDate: true });
            validWorkedToDateForm = false;
        }
        if (this.state.NameEmployerState.length > 0) {
            this.setState({ isValidNameEmployerName: false });
            if (this.state.NameEmployerState.length > 0 && this.state.NameEmployerState.length > 2) {
                this.setState({ isValidFormatNameEmployer: false });
                validNameEmployerForm = true;
            }
            else {
                this.setState({ isValidFormatNameEmployer: true });
                this.setState({ isValidNameEmployer: false });
            }
        }
        else {
            this.setState({ isValidNameEmployer: true });
            this.setState({ isValidFormatNameEmployer: false });
            validNameEmployerForm = false;
        }
        if (this.state.AddressEmployerState.length > 0) {
            this.setState({ isValidAddressEmployer: false });
            if (this.state.AddressEmployerState.length > 0 && this.state.AddressEmployerState.length > 2) {
                this.setState({ isValidFormatAddressEmployer: false });
                validAddressEmployerForm = true;
            }
            else {
                this.setState({ isValidFormatAddressEmployer: true });
                this.setState({ isValidAddressEmployer: false });
            }
        }
        else {
            this.setState({ isValidAddressEmployer: true });
            this.setState({ isValidFormatAddressEmployer: false });
            validAddressEmployerForm = false;
        }
        if (this.state.IndustrylistState != "") {
            this.setState({ isValidIndustrylist: false });
            validIndustrylistForm = true;
        }
        else {
            this.setState({ isValidIndustrylist: true });
            validIndustrylistForm = false;
        }
        // if (this.state.SocialState != "") {
        //     this.setState({ isValidSocial: false });
        //     validSocialForm = true;
        // }
        // else {
        //     this.setState({ isValidSocial: true });
        //     validSocialForm = false;
        // }
        if (this.state.NameAgencyState.length > 0) {
            this.setState({ isValidNameAgency: false });
            if (this.state.NameAgencyState.length > 0 && this.state.NameAgencyState.length > 2) {
                this.setState({ isValidFormatNameAgency: false });
                validNameAgencyForm = true;
            }
            else {
                this.setState({ isValidFormatNameAgency: true });
                this.setState({ isValidNameAgency: false });
            }
        }
        else {
            this.setState({ isValidNameAgency: true });
            this.setState({ isValidFormatNameAgency: false });
            validNameAgencyForm = false;
        }
        if (validWorkedFromDateForm && validWorkedToDateForm && validNameEmployerForm
            && validAddressEmployerForm && validIndustrylistForm &&
            validNameAgencyForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }



        return validForm;
    }
    handleValidateChild1Form(event) {
        let validForm = false;
        var validFirstNameForm = false;
        // var validMiddleNameForm = false;
        var validLastNameForm = false;
        var validSecurityNumberForm = false;
        var validWorkedFromDateForm = false;
        var validWorkedToDateForm = false;
        var validNameEmployerForm = false;
        var validAddressEmployerForm = false;
        var validIndustrylistForm = false;
        var validSocialForm = false;
        var validNameAgencyForm = false;
        var validCoverdFromDateForm = false;
        var validCoverdToDateForm = false;
        var validCoverageForm = false;
        var validSINForm = false;
        var validNameAgency1Form = false;
        var validLastWorkingPlaceNameAgencyForm = false;

        if (this.state.FirstNameState.length > 0) {
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
        if (this.state.LastNameState.length > 0) {
            this.setState({ isValidLastName: false });
            if (this.state.LastNameState.length > 0 && this.state.LastNameState.length > 2) {
                this.setState({ isValidFormatLastName: false });
                validLastNameForm = true;
            }
            else {
                this.setState({ isValidFormatLastName: true });
                this.setState({ isValidLastName: false });
            }
        }
        else {
            this.setState({ isValidLastName: true });
            this.setState({ isValidFormatLastName: false });
            validLastNameForm = false;
        }
        // if (this.state.SecurityNumberState.length > 0) {
        //     this.setState({ isValidSecurityNumber: false });
        //     if (this.state.SecurityNumberState.length > 0 && this.state.SecurityNumberState.length > 2) {
        //         this.setState({ isValidFormatSecurityNumber: false });
        //         validSecurityNumberForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatSecurityNumber: true });
        //         this.setState({ isValidSecurityNumber: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidSecurityNumber: true });
        //     this.setState({ isValidFormatSecurityNumber: false });
        //     validSecurityNumberForm = false;
        // }
        if (this.state.WorkedFromDateState != "") {
            this.setState({ isValidWorkedFromDate: false });
            validWorkedFromDateForm = true;
        }
        else {
            this.setState({ isValidWorkedFromDate: true });
            validWorkedFromDateForm = false;
        }
        if (this.state.WorkedToDateState != "") {
            this.setState({ isValidWorkedToDate: false });
            validWorkedToDateForm = true;
        }
        else {
            this.setState({ isValidWorkedToDate: true });
            validWorkedToDateForm = false;
        }
        if (this.state.NameEmployerState.length > 0) {
            this.setState({ isValidNameEmployer: false });
            if (this.state.NameEmployerState.length > 0 && this.state.NameEmployerState.length > 2) {
                this.setState({ isValidFormatNameEmployer: false });
                validNameEmployerForm = true;
            }
            else {
                this.setState({ isValidFormatNameEmployer: true });
                this.setState({ isValidNameEmployer: false });
            }
        }
        else {
            this.setState({ isValidNameEmployer: true });
            this.setState({ isValidFormatNameEmployer: false });
            validNameEmployerForm = false;
        }
        // if (this.state.AddressEmployerState.length > 0) {
        //     this.setState({ isValidAddressEmployer: false });
        //     if (this.state.AddressEmployerState.length > 0 && this.state.AddressEmployerState.length > 2) {
        //         this.setState({ isValidFormatAddressEmployer: false });
        //         validAddressEmployerForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatAddressEmployer: true });
        //         this.setState({ isValidAddressEmployer: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidAddressEmployer: true });
        //     this.setState({ isValidFormatAddressEmployer: false });
        //     validAddressEmployerForm = false;
        // }
        if (this.state.IndustrylistState != "") {
            this.setState({ isValidIndustrylist: false });
            validIndustrylistForm = true;
        }
        else {
            this.setState({ isValidIndustrylist: true });
            validIndustrylistForm = false;
        }
        // if (this.state.SocialState != "") {
        //     this.setState({ isValidSocial: false });
        //     validSocialForm = true;
        // }
        // else {
        //     this.setState({ isValidSocial: true });
        //     validSocialForm = false;
        // }
        if (this.state.NameAgencyState.length > 0) {
            this.setState({ isValidNameAgency: false });
            if (this.state.NameAgencyState.length > 0 && this.state.NameAgencyState.length > 2) {
                this.setState({ isValidFormatNameAgency: false });
                validNameAgencyForm = true;
            }
            else {
                this.setState({ isValidFormatNameAgency: true });
                this.setState({ isValidNameAgency: false });
            }
        }
        else {
            this.setState({ isValidNameAgency: true });
            this.setState({ isValidFormatNameAgency: false });
            validNameAgencyForm = false;
        }
        if (this.state.CoverdFromDateState != "") {
            this.setState({ isValidCoverdFromDate: false });
            validCoverdFromDateForm = true;
        }
        else {
            this.setState({ isValidCoverdFromDate: true });
            validCoverdFromDateForm = false;
        }
        if (this.state.CoverdToDateState != "") {
            this.setState({ isValidCoverdToDate: false });
            validCoverdToDateForm = true;
        }
        else {
            this.setState({ isValidCoverdToDate: true });
            validCoverdToDateForm = false;
        }
        if (this.state.CoverageState.length > 0) {
            this.setState({ isValidCoverage: false });
            if (this.state.CoverageState.length > 0 && this.state.CoverageState.length > 2) {
                this.setState({ isValidFormatCoverage: false });
                validCoverageForm = true;
            }
            else {
                this.setState({ isValidFormatCoverage: true });
                this.setState({ isValidCoverage: false });
            }
        }
        else {
            this.setState({ isValidCoverage: true });
            this.setState({ isValidFormatCoverage: false });
            validCoverageForm = false;
        }
        if (this.state.SINState.length > 0) {
            this.setState({ isValidSIN: false });
            if (this.state.SINState.length > 0 && this.state.SINState.length > 2) {
                this.setState({ isValidFormatSIN: false });
                validSINForm = true;
            }
            else {
                this.setState({ isValidFormatSIN: true });
                this.setState({ isValidSIN: false });
            }
        }
        else {
            this.setState({ isValidSIN: true });
            this.setState({ isValidFormatSIN: false });
            validSINForm = false;
        }
        if (this.state.NameAgency1State.length > 0) {
            this.setState({ isValidNameAgency1: false });
            if (this.state.NameAgency1State.length > 0 && this.state.NameAgency1State.length > 2) {
                this.setState({ isValidFormatNameAgency1: false });
                validNameAgency1Form = true;
            }
            else {
                this.setState({ isValidFormatNameAgency1: true });
                this.setState({ isValidNameAgency1: false });
            }
        }
        else {
            this.setState({ isValidNameAgency1: true });
            this.setState({ isValidFormatNameAgency1: false });
            validNameAgency1Form = false;
        }
        if (this.state.LastWorkingPlaceNameAgencyState.length > 0) {
            this.setState({ isValidLastWorkingPlaceNameAgency: false });
            if (this.state.LastWorkingPlaceNameAgencyState.length > 0 && this.state.LastWorkingPlaceNameAgencyState.length > 2) {
                this.setState({ isValidFormatLastWorkingPlaceNameAgency: false });
                validLastWorkingPlaceNameAgencyForm = true;
            }
            else {
                this.setState({ isValidFormatLastWorkingPlaceNameAgency: true });
                this.setState({ isValidLastWorkingPlaceNameAgency: false });
            }
        }
        else {
            this.setState({ isValidLastWorkingPlaceNameAgency: true });
            this.setState({ isValidFormatLastWorkingPlaceNameAgency: false });
            validLastWorkingPlaceNameAgencyForm = false;
        }
        if (validFirstNameForm && validLastNameForm &&
            // validSecurityNumberForm && 
            validWorkedFromDateForm && validWorkedToDateForm && validNameEmployerForm
            //&& validAddressEmployerForm 
            && validIndustrylistForm &&
            validNameAgencyForm && validCoverdFromDateForm &&
            validCoverdToDateForm && validCoverageForm && validSINForm &&
            validNameAgency1Form && validLastWorkingPlaceNameAgencyForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }



    handleValidateinformation(e) {
        const { validationGroup } = this.state;
        var isValidForm = false;
        if (this.state.NameState == "") {
            validationGroup["errParnerName4"] = true;
            isValidForm = false;
        } else {
            validationGroup["errParnerName4"] = false;
            isValidForm = true;
        }
        if (this.state.ClaimNumber2 == "") {
            validationGroup["errParnerClaimNo4"] = true;
            isValidForm = false;
        } else {
            validationGroup["errParnerClaimNo4"] = false;
            isValidForm = true;
        }
        return isValidForm;
    }
    // handleInfoReset(e){
    //     this.setState({ 
    //         NameState:"",
    //         BenefitState1:"",
    //         AmountBenefitsState:"",
    //         AgencyClaimState:"",
    //     });
    // }
    handleValidateForm(event) {
        let validForm = false;
        var validFirstNameForm = false;
        // var validMiddleNameForm = false;
        var validLastNameForm = false;
        var validSecurityNumberForm = false;
        var validWorkedFromDateForm = false;
        var validWorkedToDateForm = false;
        var validNameEmployerForm = false;
        var validAddressEmployerForm = false;
        var validIndustrylistForm = false;
        var validSocialForm = false;
        var validNameAgencyForm = false;
        // var validCoverdFromDateForm = false;
        // var validCoverdToDateForm = false;
        // var validCoverageForm = false;
        // var validSINForm = false;
        // var validNameAgency1Form = false;
        // var validLastWorkingPlaceNameAgencyForm = false;
        var validBenefitForm = false;
        var validTypeBenefitsForm = false;
        var validReceivingForm = false;
        var validReceiving1Form = false;
        var validReceiving2Form = false;
        var validReceiving3Form = false;
        var validBirthNameForm = false;
        var validGenderForm = false;
        var validSIN2Form = false;
        var validMotherFirstNameForm = false;
        //var validMotherMiddleNameForm=false;
        var validMotherLastNameForm = false;
        var validFatherFirstNameForm = false;
        // var validFatherMiddleNameForm=false;
        var validFatherLastNameForm = false;
        var validNameCountryForm = false;
        var validEligibleForm = false;
        var validWorkerForm = false;
        var validPersonForm = false;
        var validDateRefugeeForm = false;
        var validMonthForm = false;
        var validDayForm = false;
        var validYearForm = false;
        var validApplyForm = false;
        var validStopWorkMonthForm = false;
        var validStopWorkDayForm = false;
        var validStopWorkYearForm = false;
        var validOccpForm = false;
        var validOccupationForm = false;
        var validCountryForm = false;
        var validFirstName2Form = false;
        //var validMiddleName2Form=false;
        var validLastName2Form = false;
        var validSecurityNumber2Form = false;
        var validSIN3Form = false;
        var validAdditionalWorkerMonthForm = false;
        var validAdditionalWorkerDayForm = false;
        var validAdditionalWorkerYearForm = false;
        var validPlaceBirthForm = false;
        var validDeathForm = false;
        var validPlaceDeathForm = false;
        var validServiceForm = false;
        var validCountryServedForm = false;
        var validMonthServiceForm = false;
        var validDayServiceForm = false;
        var validYearServiceForm = false;
        var validMonthService1Form = false;
        var validDayService1Form = false;
        var validYearService1Form = false;
        var validBenefitServiceForm = false;
        var validRecipientNameForm = false;
        var validUSAgencyForm = false;
        var validClaimNumberForm = false;
        var validRecipientName1Form = false;
        var validUSAgency1Form = false;
        var validClaimNumber1Form = false;
        var validNumberForm = false;
        var validAddressEmployer2Form = false;
        var validWorkMonthForm = false;
        var validWorkYearForm = false;
        var validEndedMonthForm = false;
        var validEndedYearForm = false;
        var validEmployerForm = false;
        var validUnderAgeForm = false;
        var validOverAgeForm = false;
        var validChildForm = false;
        var validRelationship1Form = false;
        var validAgencyClaimForm = false;
        var validChildrenGenderForm = false;
        var validPartnerDateofBirth1Form = false;
        var validRelationshipForm = false;
        var validChildrenDateofBirthForm = false;
        var validPartnerForm = false;
        var validPartnerDateofBirth5Form = false;
        var validPartnerDateMarriageForm = false;
        var validPartnerDateofDivorceForm = false;
        var validCitizenshipForm = false;
        var validSIN4Form = false;
        var validSecurityNumber3Form = false;
        var validFormerForm = false;
        var validPartnerNameForm = false;
        var validPartnerDateofBirth1Form = false;
        var validPartnerDateMarriage1Form = false;
        var validPartnerDateofDivorce1Form = false;
        var validCitizenship1Form = false;
        var validSIN5Form = false;
        var validSecurityNumber4Form = false;
        var validFormer1Form = false;
        var validPartnerName1Form = false;
        var validPartnerDateofBirth2Form = false;
        var validPartnerDateofMarriage2Form = false;
        var validPartnerDateofDivorce2Form = false;
        var validCitizenship2Form = false;
        var validSIN6Form = false;
        var validSecurityNumber5Form = false;
        var validNumber1Form = false;
        var validNameSIN2Form = false;
        var validBenefit1Form = false;
        var validClaimNumber2Form = false;
        var validAmountBenefitsForm = false;
        var validAgencyClaimStateForm = false;
        var validRemarkForm = false;


        if (this.state.FirstNameState.length > 0) {
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
        if (this.state.LastNameState.length > 0) {
            this.setState({ isValidLastName: false });
            if (this.state.LastNameState.length > 0 && this.state.LastNameState.length > 2) {
                this.setState({ isValidFormatLastName: false });
                validLastNameForm = true;
            }
            else {
                this.setState({ isValidFormatLastName: true });
                this.setState({ isValidLastName: false });
            }
        }
        else {
            this.setState({ isValidLastName: true });
            this.setState({ isValidFormatLastName: false });
            validLastNameForm = false;
        }
        if (this.state.SecurityNumberState.length > 0) {
            this.setState({ isValidSecurityNumber: false });
            if (this.state.SecurityNumberState.length > 0 && this.state.SecurityNumberState.length > 2) {
                this.setState({ isValidFormatSecurityNumber: false });
                validSecurityNumberForm = true;
            }
            else {
                this.setState({ isValidFormatSecurityNumber: true });
                this.setState({ isValidSecurityNumber: false });
            }
        }
        else {
            this.setState({ isValidSecurityNumber: true });
            this.setState({ isValidFormatSecurityNumber: false });
            validSecurityNumberForm = false;
        }
        if (this.state.WorkedFromDateState != "") {
            this.setState({ isValidWorkedFromDate: false });
            validWorkedFromDateForm = true;
        }
        else {
            this.setState({ isValidWorkedFromDate: true });
            validWorkedFromDateForm = false;
        }
        if (this.state.WorkedToDateState != "") {
            this.setState({ isValidWorkedToDate: false });
            validWorkedToDateForm = true;
        }
        else {
            this.setState({ isValidWorkedToDate: true });
            validWorkedToDateForm = false;
        }
        if (this.state.NameEmployerState.length > 0) {
            this.setState({ isValidNameEmployer: false });
            if (this.state.NameEmployerState.length > 0 && this.state.NameEmployerState.length > 2) {
                this.setState({ isValidFormatNameEmployer: false });
                validNameEmployerForm = true;
            }
            else {
                this.setState({ isValidFormatNameEmployer: true });
                this.setState({ isValidNameEmployer: false });
            }
        }
        else {
            this.setState({ isValidNameEmployer: true });
            this.setState({ isValidFormatNameEmployer: false });
            validNameEmployerForm = false;
        }
        if (this.state.AddressEmployerState.length > 0) {
            this.setState({ isValidAddressEmployer: false });
            if (this.state.AddressEmployerState.length > 0 && this.state.AddressEmployerState.length > 2) {
                this.setState({ isValidFormatAddressEmployer: false });
                validAddressEmployerForm = true;
            }
            else {
                this.setState({ isValidFormatAddressEmployer: true });
                this.setState({ isValidAddressEmployer: false });
            }
        }
        else {
            this.setState({ isValidAddressEmployer: true });
            this.setState({ isValidFormatAddressEmployer: false });
            validAddressEmployerForm = false;
        }
        if (this.state.IndustrylistState != "") {
            this.setState({ isValidIndustrylist: false });
            validIndustrylistForm = true;
        }
        else {
            this.setState({ isValidIndustrylist: true });
            validIndustrylistForm = false;
        }
        // if (this.state.SocialState != "") {
        //     this.setState({ isValidSocial: false });
        //     validSocialForm = true;
        // }
        // else {
        //     this.setState({ isValidSocial: true });
        //     validSocialForm = false;
        // }
        if (this.state.NameAgencyState.length > 0) {
            this.setState({ isValidNameAgency: false });
            if (this.state.NameAgencyState.length > 0 && this.state.NameAgencyState.length > 2) {
                this.setState({ isValidFormatNameAgency: false });
                validNameAgencyForm = true;
            }
            else {
                this.setState({ isValidFormatNameAgency: true });
                this.setState({ isValidNameAgency: false });
            }
        }
        else {
            this.setState({ isValidNameAgency: true });
            this.setState({ isValidFormatNameAgency: false });
            validNameAgencyForm = false;
        }
        // if (this.state.CoverdFromDateState != "") {
        //     this.setState({ isValidCoverdFromDate: false });
        //     validCoverdFromDateForm = true;
        // }
        // else {
        //     this.setState({ isValidCoverdFromDate: true });
        //     validCoverdFromDateForm = false;
        // }
        // if (this.state.CoverdToDateState != "") {
        //     this.setState({ isValidCoverdToDate: false });
        //     validCoverdToDateForm = true;
        // }
        // else {
        //     this.setState({ isValidCoverdToDate: true });
        //     validCoverdToDateForm = false;
        // }
        // if (this.state.CoverageState.length > 0) {
        //     this.setState({ isValidCoverage: false });
        //     if (this.state.CoverageState.length > 0 && this.state.CoverageState.length > 2) {
        //         this.setState({ isValidFormatCoverage: false });
        //         validCoverageForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatCoverage: true });
        //         this.setState({ isValidCoverage: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidCoverage: true });
        //     this.setState({ isValidFormatCoverage: false });
        //     validCoverageForm = false;
        // }
        // if (this.state.SINState.length > 0) {
        //     this.setState({ isValidSIN: false });
        //     if (this.state.SINState.length > 0 && this.state.SINState.length > 2) {
        //         this.setState({ isValidFormatSIN: false });
        //         validSINForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatSIN: true });
        //         this.setState({ isValidSIN: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidSIN: true });
        //     this.setState({ isValidFormatSIN: false });
        //     validSINForm = false;
        // }
        // if (this.state.NameAgency1State.length > 0) {
        //     this.setState({ isValidNameAgency1: false });
        //     if (this.state.NameAgency1State.length > 0 && this.state.NameAgency1State.length > 2) {
        //         this.setState({ isValidFormatNameAgency1: false });
        //         validNameAgency1Form = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatNameAgency1: true });
        //         this.setState({ isValidNameAgency1: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidNameAgency1: true });
        //     this.setState({ isValidFormatNameAgency1: false });
        //     validNameAgency1Form = false;
        // }
        // if (this.state.LastWorkingPlaceNameAgencyState.length > 0) {
        //     this.setState({ isValidLastWorkingPlaceNameAgency: false });
        //     if (this.state.LastWorkingPlaceNameAgencyState.length > 0 && this.state.LastWorkingPlaceNameAgencyState.length > 2) {
        //         this.setState({ isValidFormatLastWorkingPlaceNameAgency: false });
        //         validLastWorkingPlaceNameAgencyForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatLastWorkingPlaceNameAgency: true });
        //         this.setState({ isValidLastWorkingPlaceNameAgency: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidLastWorkingPlaceNameAgency: true });
        //     this.setState({ isValidFormatLastWorkingPlaceNameAgency: false });
        //     validLastWorkingPlaceNameAgencyForm = false;
        // }
        if (this.state.BenefitState != "") {
            this.setState({ isValidBenefit: false });
            validBenefitForm = true;
        }
        else {
            this.setState({ isValidBenefit: true });
            validBenefitForm = false;
        }

        if (this.state.BenefitState == "Other") {
            if (this.state.TypeBenefitsState != "") {
                this.setState({ isValidTypeBenefits: false });
                validTypeBenefitsForm = true;
            }
            else {
                this.setState({ isValidTypeBenefits: true });
                validTypeBenefitsForm = false;
            }
        }
        else {
            this.setState({ isValidTypeBenefits: false });
            validTypeBenefitsForm = true;
        }
        if (this.state.ReceivingState != "") {
            this.setState({ isValidReceiving: false });
            validReceivingForm = true;
        }
        else {
            this.setState({ isValidReceiving: true });
            validReceivingForm = false;
        }
        if (this.state.ReceivingState == "Yes") {
            if (this.state.Receiving1State != "") {
                this.setState({ isValidReceiving1: false });
                validReceiving1Form = true;
            }
            else {
                this.setState({ isValidReceiving1: true });
                validReceiving1Form = false;
            }
        }
        else {
            this.setState({ isValidReceiving1: false });
            validReceiving1Form = true;
        }
        if (this.state.ReceivingState == "No") {
            if (this.state.Receiving2State != "") {
                this.setState({ isValidReceiving2: false });
                validReceiving2Form = true;
            }
            else {
                this.setState({ isValidReceiving2: true });
                validReceiving2Form = false;
            }
        }
        else {
            this.setState({ isValidReceiving2: false });
            validReceiving2Form = true;
        }

        if (this.state.Receiving1State == "Yes" || this.state.Receiving2State == "Yes") {
            if (this.state.Receiving3State != "") {
                this.setState({ isValidReceiving3: false });
                validReceiving3Form = true;
            }
            else {
                this.setState({ isValidReceiving3: true });
                validReceiving3Form = false;
            }
        }
        else {
            this.setState({ isValidReceiving3: false });
            validReceiving3Form = true;
        }
        if (this.state.Receiving1State == "No" || this.state.Receiving2State == "No") {
            if (this.state.BirthNameState != "") {
                this.setState({ isValidBirthName: false });
                validBirthNameForm = true;
            }
            else {
                this.setState({ isValidBirthName: true });
                validBirthNameForm = false;
            }
        }
        else {
            this.setState({ isValidBirthName: false });
            validBirthNameForm = true;
        }
        if (this.state.GenderState != "") {
            this.setState({ isValidGender: false });
            validGenderForm = true;
        }
        else {
            this.setState({ isValidGender: true });
            validGenderForm = false;
        }
        if (this.state.SIN2State.length > 0) {
            this.setState({ isValidSIN2: false });
            if (this.state.SIN2State.length > 0 && this.state.SIN2State.length > 2) {
                this.setState({ isValidFormatSIN2: false });
                validSIN2Form = true;
            }
            else {
                this.setState({ isValidFormatSIN2: true });
                this.setState({ isValidSIN2: false });
            }
        }
        else {
            this.setState({ isValidSIN2: true });
            this.setState({ isValidFormatSIN2: false });
            validSIN2Form = false;
        }
        if (this.state.SecurityNumberState == "" || this.state.AddressEmployerState == "") {

            if (this.state.MotherFirstNameState.length > 0) {
                this.setState({ isValidMotherFirstName: false });
                if (this.state.MotherFirstNameState.length > 0 && this.state.MotherFirstNameState.length > 2) {
                    this.setState({ isValidFormatMotherFirstName: false });
                    validMotherFirstNameForm = true;
                }
                else {
                    this.setState({ isValidFormatMotherFirstName: true });
                    this.setState({ isValidMotherFirstName: false });
                }
            }
            else {
                this.setState({ isValidMotherFirstName: true });
                this.setState({ isValidFormatMotherFirstName: false });
                validMotherFirstNameForm = false;
            }
            if (this.state.MotherLastNameState.length > 0) {
                this.setState({ isValidMotherLastName: false });
                if (this.state.MotherLastNameState.length > 0 && this.state.MotherLastNameState.length > 2) {
                    this.setState({ isValidFormatMotherLastName: false });
                    validMotherLastNameForm = true;
                }
                else {
                    this.setState({ isValidFormatMotherLastName: true });
                    this.setState({ isValidMotherLastName: false });
                }
            }
            else {
                this.setState({ isValidMotherLastName: true });
                this.setState({ isValidFormatMotherLastName: false });
                validMotherLastNameForm = false;
            }
            if (this.state.FatherFirstNameState.length > 0) {
                this.setState({ isValidFatherFirstName: false });
                if (this.state.FatherFirstNameState.length > 0 && this.state.FatherFirstNameState.length > 2) {
                    this.setState({ isValidFormatFatherFirstName: false });
                    validFatherFirstNameForm = true;
                }
                else {
                    this.setState({ isValidFormatFatherFirstName: true });
                    this.setState({ isValidFatherFirstName: false });
                }
            }
            else {
                this.setState({ isValidFatherFirstName: true });
                this.setState({ isValidFormatFatherFirstName: false });
                validFatherFirstNameForm = false;
            }
            if (this.state.FatherLastNameState.length > 0) {
                this.setState({ isValidFatherLastName: false });
                if (this.state.FatherLastNameState.length > 0 && this.state.FatherLastNameState.length > 2) {
                    this.setState({ isValidFormatFatherLastName: false });
                    validFatherLastNameForm = true;
                }
                else {
                    this.setState({ isValidFormatFatherLastName: true });
                    this.setState({ isValidFatherLastName: false });
                }
            }
            else {
                this.setState({ isValidFatherLastName: true });
                this.setState({ isValidFormatFatherLastName: false });
                validFatherLastNameForm = false;
            }
        }
        else {
            this.setState({ isValidMotherFirstName: false });
            this.setState({ isValidMotherLastName: false });
            this.setState({ isValidFatherFirstName: false });
            this.setState({ isValidFatherLastName: false });
            validMotherFirstNameForm = true;
            validMotherLastNameForm = true;
            validFatherFirstNameForm = true;
            validFatherLastNameForm = true;

        }
        if (this.state.NameCountryState.length > 0) {
            this.setState({ isValidNameCountry: false });
            if (this.state.NameCountryState.length > 0 && this.state.NameCountryState.length > 2) {
                this.setState({ isValidFormatNameCountry: false });
                validNameCountryForm = true;
            }
            else {
                this.setState({ isValidFormatNameCountry: true });
                this.setState({ isValidNameCountry: false });
            }
        }
        else {
            this.setState({ isValidNameCountry: true });
            this.setState({ isValidFormatNameCountry: false });
            validNameCountryForm = false;
        }
        if (this.state.EligibleState != "") {
            this.setState({ isValidEligible: false });
            validEligibleForm = true;
        }
        else {
            this.setState({ isValidEligible: true });
            validEligibleForm = false;
        }
        if (this.state.WorkerState != "") {
            this.setState({ isValidWorker: false });
            validWorkerForm = true;
        }
        else {
            this.setState({ isValidWorker: true });
            validWorkerForm = false;
        }
        if (this.state.WorkerState == "Yes") {
            if (this.state.PersonState.length > 0) {
                this.setState({ isValidPerson: false });
                if (this.state.PersonState.length > 0 && this.state.PersonState.length > 2) {
                    this.setState({ isValidFormatPerson: false });
                    validPersonForm = true;
                }
                else {
                    this.setState({ isValidFormatPerson: true });
                    this.setState({ isValidPerson: false });
                }
            }
            else {
                this.setState({ isValidPerson: true });
                this.setState({ isValidFormatPerson: false });
                validPersonForm = false;
            }
            if (this.state.DateRefugeeState.length > 0) {
                this.setState({ isValidDateRefugee: false });
                if (this.state.DateRefugeeState.length > 0 && this.state.DateRefugeeState.length > 2) {
                    this.setState({ isValidFormatDateRefugee: false });
                    validDateRefugeeForm = true;
                }
                else {
                    this.setState({ isValidFormatDateRefugee: true });
                    this.setState({ isValidDateRefugee: false });
                }
            }
            else {
                this.setState({ isValidDateRefugee: true });
                this.setState({ isValidFormatDateRefugee: false });
                validDateRefugeeForm = false;
            }
        }
        else {
            this.setState({ isValidPerson: false });
            this.setState({ isValidDateRefugee: false });
            validPersonForm = true;
            validDateRefugeeForm = true;
        }
        if (this.state.WorkerState == "No" || this.state.BenefitState == "Disability or Sickness/Invalidity") {
            if (this.state.MonthState != "") {
                this.setState({ isValidMonth: false });
                validMonthForm = true;
            }
            else {
                this.setState({ isValidMonth: true });
                validMonthForm = false;
            }
            if (this.state.DayState != "") {
                this.setState({ isValidDay: false });
                validDayForm = true;
            }
            else {
                this.setState({ isValidDay: true });
                validDayForm = false;
            }
            if (this.state.YearState != "") {
                this.setState({ isValidYear: false });
                validYearForm = true;
            }
            else {
                this.setState({ isValidYear: true });
                validYearForm = false;
            }
        }
        else {
            this.setState({ isValidMonth: false });
            this.setState({ isValidDay: false });
            this.setState({ isValidYear: false });
            validMonthForm = true;
            validDayForm = true;
            validYearForm = true;
        }
        if (this.state.ApplyState != "") {
            this.setState({ isValidApply: false });
            validApplyForm = true;
        }
        else {
            this.setState({ isValidApply: true });
            validApplyForm = false;
        }
        if (this.state.ApplyState == "Yes") {
            if (this.state.StopWorkMonthState != "") {
                this.setState({ isValidStopWorkMonth: false });
                validStopWorkMonthForm = true;
            }
            else {
                this.setState({ isValidStopWorkMonth: true });
                validStopWorkMonthForm = false;
            }
            if (this.state.StopWorkDayState != "") {
                this.setState({ isValidStopWorkDay: false });
                validStopWorkDayForm = true;
            }
            else {
                this.setState({ isValidStopWorkDay: true });
                validStopWorkDayForm = false;
            }
            if (this.state.StopWorkYearState != "") {
                this.setState({ isValidStopWorkYear: false });
                validStopWorkYearForm = true;
            }
            else {
                this.setState({ isValidStopWorkYear: true });
                validStopWorkYearForm = false;
            }
        }
        else {
            this.setState({ isValidStopWorkMonth: false });
            this.setState({ isValidStopWorkDay: false });
            this.setState({ isValidStopWorkYear: false });
            validStopWorkDayForm = true;
            validStopWorkMonthForm = true;
            validStopWorkYearForm = true;

        }
        if (this.state.ApplyState == "No") {
            if (this.state.OccpState != "") {
                this.setState({ isValidOccp: false });
                validOccpForm = true;
            }
            else {
                this.setState({ isValidOccp: true });
                validOccpForm = false;
            }
            if (this.state.OccpState == "Yes") {
                if (this.state.OccupationState.length > 0) {
                    this.setState({ isValidOccupation: false });
                    if (this.state.OccupationState.length > 0 && this.state.OccupationState.length > 2) {
                        this.setState({ isValidFormatOccupation: false });
                        validOccupationForm = true;
                    }
                    else {
                        this.setState({ isValidFormatOccupation: true });
                        this.setState({ isValidOccupation: false });
                    }
                }
                else {
                    this.setState({ isValidOccupation: true });
                    this.setState({ isValidFormatOccupation: false });
                    validOccupationForm = false;
                }
                if (this.state.CountryState != "") {
                    this.setState({ isValidCountry: false });
                    validCountryForm = true;
                }
                else {
                    this.setState({ isValidCountry: true });
                    validCountryForm = false;
                }
            }
            else {
                this.setState({ isValidOccupation: false });
                this.setState({ isValidCountry: false });
                validOccupationForm = true;
                validCountryForm = true;
            }
        }
        else {
            this.setState({ isValidOccupation: false });
            this.setState({ isValidCountry: false });
            this.setState({ isValidOccp: false });
            validOccpForm = true;
            validOccupationForm = true;
            validCountryForm = true;
        }
        if (this.state.BenefitState == "Survivor Benefits") {
            // if (this.state.OccpState == "No") {
            if (this.state.FirstName2State.length > 0) {
                this.setState({ isValidFirstName2: false });
                if (this.state.FirstName2State.length > 0 && this.state.FirstName2State.length > 2) {
                    this.setState({ isValidFormatFirstName2: false });
                    validFirstName2Form = true;
                }
                else {
                    this.setState({ isValidFormatFirstName2: true });
                    this.setState({ isValidFirstName2: false });
                }
            }
            else {
                this.setState({ isValidFirstName2: true });
                this.setState({ isValidFormatFirstName2: false });
                validFirstName2Form = false;
            }
            if (this.state.LastName2State.length > 0) {
                this.setState({ isValidLastName2: false });
                if (this.state.LastName2State.length > 0 && this.state.LastName2State.length > 2) {
                    this.setState({ isValidFormatLastName2: false });
                    validLastName2Form = true;
                }
                else {
                    this.setState({ isValidFormatLastName2: true });
                    this.setState({ isValidLastName2: false });
                }
            }
            else {
                this.setState({ isValidLastName2: true });
                this.setState({ isValidFormatLastName2: false });
                validLastName2Form = false;
            }

            // else {
            //     this.setState({ isValidFirstName2: false });
            //     this.setState({ isValidLastName2: false });
            //     validFirstName2Form = true;
            //     validLastName2Form = true;
            // }
            if (this.state.RelationshipState.length > 0) {
                this.setState({ isValidRelationship: false });
                if (this.state.RelationshipState.length > 0 && this.state.RelationshipState.length > 2) {
                    this.setState({ isValidFormatRelationship: false });
                    validRelationshipForm = true;
                }
                else {
                    this.setState({ isValidRelationship: true });
                    this.setState({ isValidRelationship: false });
                }
            }
            else {
                this.setState({ isValidRelationship: true });
                this.setState({ isValidFormatRelationship: false });
                validRelationshipForm = false;
            }
            if (this.state.SecurityNumber2State.length > 0) {
                this.setState({ isValidSecurityNumber2: false });
                if (this.state.SecurityNumber2State.length > 0 && this.state.SecurityNumber2State.length > 2) {
                    this.setState({ isValidFormatSecurityNumber2: false });
                    validSecurityNumber2Form = true;
                }
                else {
                    this.setState({ isValidSecurityNumber2: true });
                    this.setState({ isValidSecurityNumber2: false });
                }
            }
            else {
                this.setState({ isValidSecurityNumber2: true });
                this.setState({ isValidFormatSecurityNumber2: false });
                validSecurityNumber2Form = false;
            }
            if (this.state.SIN3State.length > 0) {
                this.setState({ isValidSIN3: false });
                if (this.state.SIN3State.length > 0 && this.state.SIN3State.length > 2) {
                    this.setState({ isValidFormatSIN3: false });
                    validSIN3Form = true;
                }
                else {
                    this.setState({ isValidSIN3: true });
                    this.setState({ isValidSIN3: false });
                }
            }
            else {
                this.setState({ isValidSIN3: true });
                this.setState({ isValidFormatSIN3: false });
                validSIN3Form = false;
            }
        }
        else {
            this.setState({ isValidFirstName2: false });
            this.setState({ isValidLastName2: false });
            this.setState({ isValidRelationship: false });
            this.setState({ isValidSecurityNumber2: false });
            this.setState({ isValidSIN3: false });
            validFirstName2Form = true;
            validLastName2Form = true;
            validRelationshipForm = true;
            validSecurityNumber2Form = true;
            validSIN3Form = true;
        }
        if (this.state.AdditionalWorkerMonthState != "") {
            this.setState({ isValidAdditionalWorkerMonth: false });
            validAdditionalWorkerMonthForm = true;
        }
        else {
            this.setState({ isValidAdditionalWorkerMonth: true });
            validAdditionalWorkerMonthForm = false;
        }
        if (this.state.AdditionalWorkerDayState != "") {
            this.setState({ isValidAdditionalWorkerDay: false });
            validAdditionalWorkerDayForm = true;
        }
        else {
            this.setState({ isValidAdditionalWorkerDay: true });
            validAdditionalWorkerDayForm = false;
        }
        if (this.state.AdditionalWorkerYearState != "") {
            this.setState({ isValidAdditionalWorkerYear: false });
            validAdditionalWorkerYearForm = true;
        }
        else {
            this.setState({ isValidAdditionalWorkerYear: true });
            validAdditionalWorkerYearForm = false;
        }
        if (this.state.PlaceBirthState.length > 0) {
            this.setState({ isValidPlaceBirth: false });
            if (this.state.PlaceBirthState.length > 0 && this.state.PlaceBirthState.length > 2) {
                this.setState({ isValidFormatPlaceBirth: false });
                validPlaceBirthForm = true;
            }
            else {
                this.setState({ isValidFormatPlaceBirth: true });
                this.setState({ isValidPlaceBirth: false });
            }
        }
        else {
            this.setState({ isValidPlaceBirth: true });
            this.setState({ isValidFormatPlaceBirth: false });
            validPlaceBirthForm = false;
        }
        if (this.state.DeathState != "") {
            this.setState({ isValidDeath: false });
            validDeathForm = true;
        }
        else {
            this.setState({ isValidDeath: true });
            validDeathForm = false;
        }
        if (this.state.PlaceDeathState.length > 0) {
            this.setState({ isValidPlaceDeath: false });
            if (this.state.PlaceDeathState.length > 0 && this.state.PlaceDeathState.length > 2) {
                this.setState({ isValidFormatPlaceDeath: false });
                validPlaceDeathForm = true;
            }
            else {
                this.setState({ isValidFormatPlaceDeath: true });
                this.setState({ isValidPlaceDeath: false });
            }
        }
        else {
            this.setState({ isValidPlaceDeath: true });
            this.setState({ isValidFormatPlaceDeath: false });
            validPlaceDeathForm = false;
        }
        if (this.state.ServiceState != "") {
            this.setState({ isValidService: false });
            validServiceForm = true;
        }
        else {
            this.setState({ isValidService: true });
            validServiceForm = false;
        }
        if (this.state.ServiceState == "Yes") {
            if (this.state.CountryServedState.length > 0) {
                this.setState({ isValidCountryServed: false });
                if (this.state.CountryServedState.length > 0 && this.state.CountryServedState.length > 2) {
                    this.setState({ isValidFormatCountryServed: false });
                    validCountryServedForm = true;
                }
                else {
                    this.setState({ isValidFormatCountryServed: true });
                    this.setState({ isValidCountryServed: false });
                }
            }
            else {
                this.setState({ isValidCountryServed: true });
                this.setState({ isValidFormatCountryServed: false });
                validCountryServedForm = false;
            }
            if (this.state.MonthServiceState != "") {
                this.setState({ isValidMonthService: false });
                validMonthServiceForm = true;
            }
            else {
                this.setState({ isValidMonthService: true });
                validMonthServiceForm = false;
            }
            if (this.state.DayServiceState != "") {
                this.setState({ isValidDayService: false });
                validDayServiceForm = true;
            }
            else {
                this.setState({ isValidDayService: true });
                validDayServiceForm = false;
            }
            if (this.state.YearServiceState != "") {
                this.setState({ isValidYearService: false });
                validYearServiceForm = true;
            }
            else {
                this.setState({ isValidYearService: true });
                validYearServiceForm = false;
            }
            if (this.state.MonthService1State != "") {
                this.setState({ isValidMonthService1: false });
                validMonthService1Form = true;
            }
            else {
                this.setState({ isValidMonthService1: true });
                validMonthService1Form = false;
            }
            if (this.state.DayService1State != "") {
                this.setState({ isValidDayService1: false });
                validDayService1Form = true;
            }
            else {
                this.setState({ isValidDayService1: true });
                validDayService1Form = false;
            }
            if (this.state.YearService1State != "") {
                this.setState({ isValidYearService1: false });
                validYearService1Form = true;
            }
            else {
                this.setState({ isValidYearService1: true });
                validYearService1Form = false;
            }
            if (this.state.BenefitServiceState != "") {
                this.setState({ isValidBenefitService: false });
                validBenefitServiceForm = true;
            }
            else {
                this.setState({ isValidBenefitService: true });
                validBenefitServiceForm = false;
            }

        }
        else {
            this.setState({ isValidCountryServed: false });
            this.setState({ isValidMonthService: false })
            this.setState({ isValidDayService: false });
            this.setState({ isValidYearService: false });
            this.setState({ isValidMonthService1: false });
            this.setState({ isValidDayService1: false });
            this.setState({ isValidYearService1: false });
            this.setState({ isValidBenefitService: false });
            validCountryServedForm = true;
            validMonthServiceForm = true;
            validDayServiceForm = true;;
            validYearServiceForm = true;
            validMonthService1Form = true;
            validDayService1Form = true;
            validYearService1Form = true;
            validBenefitServiceForm = true;
        }
        if (this.state.BenefitServiceState == "Yes") {
            if (this.state.RecipientNameState != "") {
                this.setState({ isValidRecipientName: false });
                validRecipientNameForm = true;
            }
            else {
                this.setState({ isValidRecipientName: true });
                validRecipientNameForm = false;
            }
            if (this.state.USAgencyState.length > 0) {
                this.setState({ isValidUSAgency: false });
                if (this.state.USAgencyState.length > 0 && this.state.USAgencyState.length > 2) {
                    this.setState({ isValidFormatUSAgency: false });
                    validUSAgencyForm = true;
                }
                else {
                    this.setState({ isValidFormatUSAgency: true });
                    this.setState({ isValidUSAgency: false });
                }
            }
            else {
                this.setState({ isValidUSAgency: true });
                this.setState({ isValidFormatUSAgency: false });
                validUSAgencyForm = false;
            }
            if (this.state.ClaimNumberState.length > 0) {
                this.setState({ isValidClaimNumber: false });
                if (this.state.ClaimNumberState.length > 0 && this.state.ClaimNumberState.length > 2) {
                    this.setState({ isValidFormatClaimNumber: false });
                    validClaimNumberForm = true;
                }
                else {
                    this.setState({ isValidFormatClaimNumber: true });
                    this.setState({ isValidClaimNumber: false });
                }
            }
            else {
                this.setState({ isValidClaimNumber: true });
                this.setState({ isValidFormatClaimNumber: false });
                validClaimNumberForm = false;
            }
        }
        else {
            this.setState({ isValidRecipientName: false });
            this.setState({ isValidUSAgency: false });
            this.setState({ isValidClaimNumber: false });
            validRecipientNameForm = true;
            validUSAgencyForm = true;
            validClaimNumberForm = true;
        }
        if (this.state.RecipientNameState != "" && this.state.USAgencyState != "" && this.state.ClaimNumberState != "") {
            if (this.state.RecipientName1State.length > 0) {
                this.setState({ isValidRecipientName1: false });
                if (this.state.RecipientName1State.length > 0 && this.state.RecipientName1State.length > 2) {
                    this.setState({ isValidFormatRecipientName1: false });
                    validRecipientName1Form = true;
                }
                else {
                    this.setState({ isValidFormatRecipientName1: true });
                    this.setState({ isValidRecipientName1: false });
                }
            }
            else {
                this.setState({ isValidRecipientName1: true });
                this.setState({ isValidFormatRecipientName1: false });
                validRecipientName1Form = false;
            }
            if (this.state.USAgency1State.length > 0) {
                this.setState({ isValidUSAgency1: false });
                if (this.state.USAgency1State.length > 0 && this.state.USAgency1State.length > 2) {
                    this.setState({ isValidFormatUSAgency1: false });
                    validUSAgency1Form = true;
                }
                else {
                    this.setState({ isValidFormatUSAgency1: true });
                    this.setState({ isValidUSAgency1: false });
                }
            }
            else {
                this.setState({ isValidUSAgency1: true });
                this.setState({ isValidFormatUSAgency1: false });
                validUSAgency1Form = false;
            }
            if (this.state.ClaimNumber1State.length > 0) {
                this.setState({ isValidClaimNumber1: false });
                if (this.state.ClaimNumber1State.length > 0 && this.state.ClaimNumber1State.length > 2) {
                    this.setState({ isValidFormatClaimNumber1: false });
                    validClaimNumber1Form = true;
                }
                else {
                    this.setState({ isValidFormatClaimNumber1: true });
                    this.setState({ isValidClaimNumber1: false });
                }
            }
            else {
                this.setState({ isValidClaimNumber1: true });
                this.setState({ isValidFormatClaimNumber1: false });
                validClaimNumber1Form = false;
            }
        }
        else {
            this.setState({ isValidRecipientName1: false });
            this.setState({ isValidUSAgency1: false });
            this.setState({ isValidClaimNumber1: false });
            validRecipientName1Form = true;
            validUSAgency1Form = true;
            validClaimNumber1Form = true;

        }
        if (this.state.ServiceState == "No" || this.state.BenefitServiceState == "No") {
            if (this.state.NumberState != "") {
                this.setState({ isValidNumber: false });
                validNumberForm = true;
            }
            else {
                this.setState({ isValidNumber: true });
                validNumberForm = false;
            }
            if (this.state.NumberState == "Yes") {
                if (this.state.AddressEmployer2State.length > 0) {
                    this.setState({ isValidAddressEmployer2: false });
                    if (this.state.AddressEmployer2State.length > 0 && this.state.AddressEmployer2State.length > 2) {
                        this.setState({ isValidFormatAddressEmployer2: false });
                        validAddressEmployer2Form = true;
                    }
                    else {
                        this.setState({ isValidFormatAddressEmployer2: true });
                        this.setState({ isValidAddressEmployer2: false });
                    }
                }
                else {
                    this.setState({ isValidAddressEmployer2: true });
                    this.setState({ isValidFormatAddressEmployer2: false });
                    validAddressEmployer2Form = false;
                }
                if (this.state.WorkMonthState != "") {
                    this.setState({ isValidWorkMonth: false });
                    validWorkMonthForm = true;
                }
                else {
                    this.setState({ isValidWorkMonth: true });
                    validWorkMonthForm = false;
                }
                if (this.state.WorkYearState != "") {
                    this.setState({ isValidWorkYear: false });
                    validWorkYearForm = true;
                }
                else {
                    this.setState({ isValidWorkYear: true });
                    validWorkYearForm = false;
                }
                if (this.state.EndedMonthState != "") {
                    this.setState({ isValidEndedMonth: false });
                    validEndedMonthForm = true;
                }
                else {
                    this.setState({ isValidEndedMonth: true });
                    validEndedMonthForm = false;
                }
                if (this.state.EndedYearState != "") {
                    this.setState({ isValidEndedYear: false });
                    validEndedYearForm = true;
                }
                else {
                    this.setState({ isValidEndedYear: true });
                    validEndedYearForm = false;
                }
                if (this.state.EmployerState != "") {
                    this.setState({ isValidEmployer: false });
                    validEmployerForm = true;
                }
                else {
                    this.setState({ isValidEmployer: true });
                    validEmployerForm = false;
                }
            }
            else {
                this.setState({ isValidWorkMonth: false });
                this.setState({ isValidWorkYear: false });
                this.setState({ isValidEndedMonth: false });
                this.setState({ isValidEndedYear: false });
                this.setState({ isValidEmployer: false });
                validWorkMonthForm = true;
                validWorkYearForm = true;
                validEndedMonthForm = true;
                validEndedYearForm = true;
                validEmployerForm = true;
            }
        }
        else {
            this.setState({ isValidNumber: false });
            this.setState({ isValidWorkMonth: false });
            this.setState({ isValidWorkYear: false });
            this.setState({ isValidEndedMonth: false });
            this.setState({ isValidEndedYear: false });
            this.setState({ isValidEmployer: false });
            validNumberForm = true;
            validWorkMonthForm = true;
            validWorkYearForm = true;
            validEndedMonthForm = true;
            validEndedYearForm = true;
            validEmployerForm = true;

        }
        if (this.state.NumberState == "No") {
            if (this.state.UnderAgeState != "") {
                this.setState({ isValidUnderAge: false });
                validUnderAgeForm = true;
            }
            else {
                this.setState({ isValidUnderAge: true });
                validUnderAgeForm = false;
            }
            if (this.state.OverAgeState != "") {
                this.setState({ isValidOverAge: false });
                validOverAgeForm = true;
            }
            else {
                this.setState({ isValidOverAge: true });
                validOverAgeForm = false;
            }
        }
        else {
            this.setState({ isValidUnderAge: false });
            this.setState({ isValidOverAge: false });
            validUnderAgeForm = true;
            validOverAgeForm = true;

        }
        if (this.state.UnderAgeState == "Yes" || this.state.OverAgeState == "Yes") {
            if (this.state.ChildState.length > 0) {
                this.setState({ isValidChild: false });
                if (this.state.ChildState.length > 0 && this.state.ChildState.length > 2) {
                    this.setState({ isValidFormatChild: false });
                    validChildForm = true;
                }
                else {
                    this.setState({ isValidFormatChild: true });
                    this.setState({ isValidChild: false });
                }
            }
            else {
                this.setState({ isValidChild: true });
                this.setState({ isValidFormatChild: false });
                validChildForm = false;
            }
            // if (this.state.Relationship1State.length > 0) {
            //     this.setState({ isValidRelationship1: false });
            //     if (this.state.Relationship1State.length > 0 && this.state.Relationship1State.length > 2) {
            //         this.setState({ isValidFormatRelationship1: false });
            //         validRelationship1Form = true;
            //     }
            //     else {
            //         this.setState({ isValidFormatRelationship1: true });
            //         this.setState({ isValidRelationship1: false });
            //     }
            // }
            // else {
            //     this.setState({ isValidRelationship1: true });
            //     this.setState({ isValidFormatRelationship1: false });
            //     validRelationship1Form = false;
            // }
            if (this.state.ChildrenGenderState != "") {
                this.setState({ isValidChildrenGender: false });
                validChildrenGenderForm = true;
            }
            else {
                this.setState({ isValidChildrenGender: true });
                validChildrenGenderForm = false;
            }
            if (this.state.ChildrenDateofBirthState != "") {
                this.setState({ isValidChildrenDateofBirth: false });
                validChildrenDateofBirthForm = true;
            }
            else {
                this.setState({ isValidChildrenDateofBirth: true });
                validChildrenDateofBirthForm = false;
            }

        }
        else {
            this.setState({ isValidChild: false });
            this.setState({ isValidRelationship1: false });
            this.setState({ isValidChildrenGender: false });
            this.setState({ isValidChildrenDateofBirth: false });
            validChildForm = true;
            validRelationship1Form = true;
            validChildrenGenderForm = true;
            validChildrenDateofBirthForm = true;
        }
        if (this.state.PartnerState.length > 0) {
            this.setState({ isValidPartner: false });
            if (this.state.PartnerState.length > 0 && this.state.PartnerState.length > 2) {
                this.setState({ isValidFormatPartner: false });
                validPartnerForm = true;
            }
            else {
                this.setState({ isValidFormatPartner: true });
                this.setState({ isValidPartner: false });
            }
        }
        else {
            this.setState({ isValidPartner: true });
            this.setState({ isValidFormatPartner: false });
            validPartnerForm = false;
        }
        // if (this.state.ChildrenDateofBirthState != "") {
        //     this.setState({ isValidChildrenDateofBirth: false });
        //     validChildrenDateofBirthForm = true;
        // }
        // else {
        //   this.setState({ isValidChildrenDateofBirth: true });
        //   validChildrenDateofBirthForm = false;
        // } 
        if (this.state.PartnerDateMarriageState != "") {
            this.setState({ isValidPartnerDateMarriage: false });
            validPartnerDateMarriageForm = true;
        }
        else {
            this.setState({ isValidPartnerDateMarriage: true });
            validPartnerDateMarriageForm = false;
        }
        if (this.state.PartnerDateofDivorceState != "") {
            this.setState({ isValidPartnerDateofDivorce: false });
            validPartnerDateofDivorceForm = true;
        }
        else {
            this.setState({ isValidPartnerDateofDivorce: true });
            validPartnerDateofDivorceForm = false;
        }
        if (this.state.CitizenshipState.length > 0) {
            this.setState({ isValidCitizenship: false });
            if (this.state.CitizenshipState.length > 0 && this.state.CitizenshipState.length > 2) {
                this.setState({ isValidFormatCitizenship: false });
                validCitizenshipForm = true;
            }
            else {
                this.setState({ isValidFormatCitizenship: true });
                this.setState({ isValidCitizenship: false });
            }
        }
        else {
            this.setState({ isValidCitizenship: true });
            this.setState({ isValidFormatCitizenship: false });
            validCitizenshipForm = false;
        }
        if (this.state.SIN4State.length > 0) {
            this.setState({ isValidSIN4: false });
            if (this.state.SIN4State.length > 0 && this.state.SIN4State.length > 2) {
                this.setState({ isValidFormatSIN4: false });
                validSIN4Form = true;
            }
            else {
                this.setState({ isValidFormatSIN4: true });
                this.setState({ isValidSIN4: false });
            }
        }
        else {
            this.setState({ isValidSIN4: true });
            this.setState({ isValidFormatSIN4: false });
            validSIN4Form = false;
        }
        if (this.state.SecurityNumber3State.length > 0) {
            this.setState({ isValidSecurityNumber3: false });
            if (this.state.SecurityNumber3State.length > 0 && this.state.SecurityNumber3State.length > 2) {
                this.setState({ isValidFormatSecurityNumber3: false });
                validSecurityNumber3Form = true;
            }
            else {
                this.setState({ isValidFormatSecurityNumber3: true });
                this.setState({ isValidSecurityNumber3: false });
            }
        }
        else {
            this.setState({ isValidSecurityNumber3: true });
            this.setState({ isValidFormatSecurityNumber3: false });
            validSecurityNumber3Form = false;
        }
        if (this.state.FormerState != "") {
            this.setState({ isValidFormer: false });
            validFormerForm = true;
        }
        else {
            this.setState({ isValidFormer: true });
            validFormerForm = false;
        }
        if (this.state.FormerState == "Yes") {
            if (this.state.PartnerNameState.length > 0) {
                this.setState({ isValidPartnerName: false });
                if (this.state.PartnerNameState.length > 0 && this.state.PartnerNameState.length > 2) {
                    this.setState({ isValidFormatPartnerName: false });
                    validPartnerNameForm = true;
                }
                else {
                    this.setState({ isValidFormatPartnerName: true });
                    this.setState({ isValidPartnerName: false });
                }
            }
            else {
                this.setState({ isValidPartnerName: true });
                this.setState({ isValidFormatPartnerName: false });
                validPartnerNameForm = false;
            }
            if (this.state.PartnerDateofBirth1State != "") {
                this.setState({ isValidPartnerDateofBirth1: false });
                validPartnerDateofBirth1Form = true;
            }
            else {
                this.setState({ isValidPartnerDateofBirth1: true });
                validPartnerDateofBirth1Form = false;
            }
            if (this.state.PartnerDateMarriage1State != "") {
                this.setState({ isValidPartnerDateMarriage1: false });
                validPartnerDateMarriage1Form = true;
            }
            else {
                this.setState({ isValidPartnerDateMarriage1: true });
                validPartnerDateMarriage1Form = false;
            }
            if (this.state.PartnerDateofDivorce1State != "") {
                this.setState({ isValidPartnerDateofDivorce1: false });
                validPartnerDateofDivorce1Form = true;
            }
            else {
                this.setState({ isValidPartnerDateofDivorce1: true });
                validPartnerDateofDivorce1Form = false;
            }
            if (this.state.Citizenship1State.length > 0) {
                this.setState({ isValidCitizenship1: false });
                if (this.state.Citizenship1State.length > 0 && this.state.Citizenship1State.length > 2) {
                    this.setState({ isValidFormatCitizenship1: false });
                    validCitizenship1Form = true;
                }
                else {
                    this.setState({ isValidFormatCitizenship1: true });
                    this.setState({ isValidCitizenship1: false });
                }
            }
            else {
                this.setState({ isValidCitizenship1: true });
                this.setState({ isValidFormatCitizenship1: false });
                validCitizenship1Form = false;
            }
            if (this.state.SIN5State.length > 0) {
                this.setState({ isValidSIN5: false });
                if (this.state.SIN5State.length > 0 && this.state.SIN5State.length > 2) {
                    this.setState({ isValidFormatSIN5: false });
                    validSIN5Form = true;
                }
                else {
                    this.setState({ isValidFormatSIN5: true });
                    this.setState({ isValidSIN5: false });
                }
            }
            else {
                this.setState({ isValidSIN5: true });
                this.setState({ isValidFormatSIN5: false });
                validSIN5Form = false;
            }
            if (this.state.SecurityNumber4State.length > 0) {
                this.setState({ isValidSecurityNumber4: false });
                if (this.state.SecurityNumber4State.length > 0 && this.state.SecurityNumber4State.length > 2) {
                    this.setState({ isValidFormatSecurityNumber4: false });
                    validSecurityNumber4Form = true;
                }
                else {
                    this.setState({ isValidFormatSecurityNumber4: true });
                    this.setState({ isValidSecurityNumber4: false });
                }
            }
            else {
                this.setState({ isValidSecurityNumber4: true });
                this.setState({ isValidFormatSecurityNumber4: false });
                validSecurityNumber4Form = false;
            }
            if (this.state.Former1State != "") {
                this.setState({ isValidFormer1: false });
                validFormer1Form = true;
            }
            else {
                this.setState({ isValidFormer1: true });
                validFormer1Form = false;
            }

        }
        else {
            this.setState({ isValidPartnerName: false });
            this.setState({ isValidPartnerDateofBirth1: false });
            this.setState({ isValidPartnerDateMarriage1: false });
            this.setState({ isValidPartnerDateofDivorce1: false });
            this.setState({ isValidCitizenship1: false });
            this.setState({ isValidSIN5: false });
            this.setState({ isValidSecurityNumber4: false });
            this.setState({ isValidFormer1: false });
            validPartnerNameForm = true;
            validPartnerDateofBirth1Form = true;
            validPartnerDateMarriage1Form = true;
            validPartnerDateofDivorce1Form = true;
            validCitizenship1Form = true;
            validSIN5Form = true;
            validSecurityNumber4Form = true;
            validFormer1Form = true;
        }
        if (this.state.Former1State == "Yes") {
            if (this.state.PartnerName1State.length > 0) {
                this.setState({ isValidPartnerName1: false });
                if (this.state.PartnerName1State.length > 0 && this.state.PartnerName1State.length > 2) {
                    this.setState({ isValidFormatPartnerName1: false });
                    validPartnerName1Form = true;
                }
                else {
                    this.setState({ isValidFormatPartnerName1: true });
                    this.setState({ isValidPartnerName1: false });
                }
            }
            else {
                this.setState({ isValidPartnerName1: true });
                this.setState({ isValidFormatPartnerName1: false });
                validPartnerName1Form = false;
            }
            if (this.state.PartnerDateofBirth5State != "") {
                this.setState({ isValidPartnerDateofBirth5: false });
                validPartnerDateofBirth5Form = true;
            }
            else {
                this.setState({ isValidPartnerDateofBirth5: true });
                validPartnerDateofBirth5Form = false;
            }
            // if (this.state.PartnerDateofBirth2State != "") {
            //     alert(this.state.PartnerDateofBirth2State);
            //     this.setState({ isValidPartnerDateofBirth2: false });
            //     validPartnerDateofBirth2Form = true;
            // }
            // else {
            //     alert(this.state.PartnerDateofBirth2State);
            //   this.setState({ isValidPartnerDateofBirth2: true });
            //   validPartnerDateofBirth2Form = false;
            // }
            if (this.state.PartnerDateofMarriage2State != "") {
                this.setState({ isValidPartnerDateofMarriage2: false });
                validPartnerDateofMarriage2Form = true;
            }
            else {
                this.setState({ isValidPartnerDateofMarriage2: true });
                validPartnerDateofMarriage2Form = false;
            }
            if (this.state.PartnerDateofDivorce2State != "") {
                this.setState({ isValidPartnerDateofDivorce2: false });
                validPartnerDateofDivorce2Form = true;
            }
            else {
                this.setState({ isValidPartnerDateofDivorce2: true });
                validPartnerDateofDivorce2Form = false;
            }
            if (this.state.Citizenship2State.length > 0) {
                this.setState({ isValidCitizenship2: false });
                if (this.state.Citizenship2State.length > 0 && this.state.Citizenship2State.length > 2) {
                    this.setState({ isValidFormatCitizenship2: false });
                    validCitizenship2Form = true;
                }
                else {
                    this.setState({ isValidFormatCitizenship2: true });
                    this.setState({ isValidCitizenship2: false });
                }
            }
            else {
                this.setState({ isValidCitizenship2: true });
                this.setState({ isValidFormatCitizenship2: false });
                validCitizenship2Form = false;
            }
            if (this.state.SIN6State.length > 0) {
                this.setState({ isValidSIN6: false });
                if (this.state.SIN6State.length > 0 && this.state.SIN6State.length > 2) {
                    this.setState({ isValidFormatSIN6: false });
                    validSIN6Form = true;
                }
                else {
                    this.setState({ isValidFormatSIN6: true });
                    this.setState({ isValidSIN6: false });
                }
            }
            else {
                this.setState({ isValidSIN6: true });
                this.setState({ isValidFormatSIN6: false });
                validSIN6Form = false;
            }
            if (this.state.SecurityNumber5State.length > 0) {
                this.setState({ isValidSecurityNumber5: false });
                if (this.state.SecurityNumber5State.length > 0 && this.state.SecurityNumber5State.length > 2) {
                    this.setState({ isValidFormatSecurityNumber5: false });
                    validSecurityNumber5Form = true;
                }
                else {
                    this.setState({ isValidFormatSecurityNumber5: true });
                    this.setState({ isValidSecurityNumber5: false });
                }
            }
            else {
                this.setState({ isValidSecurityNumber5: true });
                this.setState({ isValidFormatSecurityNumber5: false });
                validSecurityNumber5Form = false;
            }

        }
        else {
            this.setState({ isValidPartnerName1: false });
            this.setState({ isValidPartnerDateofBirth5: false });
            this.setState({ isValidPartnerDateofMarriage2: false });
            this.setState({ isValidPartnerDateofDivorce2: false });
            this.setState({ isValidCitizenship2: false });
            this.setState({ isValidSIN6: false });
            this.setState({ isValidSecurityNumber5: false });
            validPartnerName1Form = true;
            validPartnerDateofBirth5Form = true;
            validPartnerDateofMarriage2Form = true;
            validPartnerDateofDivorce2Form = true;
            validCitizenship2Form = true;
            validSIN6Form = true;
            validSecurityNumber5Form = true;
        }
        if (this.state.Number1State != "") {
            this.setState({ isValidNumber1: false });
            validNumber1Form = true;
        }
        else {
            this.setState({ isValidNumber1: true });
            validNumber1Form = false;
        }
        if (this.state.Number1State == "Yes") {
            if (this.state.NameSIN2State.length > 0) {
                this.setState({ isValidNameSIN2: false });
                if (this.state.NameSIN2State.length > 0 && this.state.NameSIN2State.length > 2) {
                    this.setState({ isValidFormatNameSIN2: false });
                    validNameSIN2Form = true;
                }
                else {
                    this.setState({ isValidFormatNameSIN2: true });
                    this.setState({ isValidNameSIN2: false });
                }
            }
            else {
                this.setState({ isValidNameSIN2: true });
                this.setState({ isValidFormatNameSIN2: false });
                validNameSIN2Form = false;
            }
            if (this.state.Benefit1State.length > 0) {
                this.setState({ isValidBenefit1: false });
                if (this.state.Benefit1State.length > 0 && this.state.Benefit1State.length > 2) {
                    this.setState({ isValidFormatBenefit1: false });
                    validBenefit1Form = true;
                }
                else {
                    this.setState({ isValidFormatBenefit1: true });
                    this.setState({ isValidBenefit1: false });
                }
            }
            else {
                this.setState({ isValidBenefit1: true });
                this.setState({ isValidFormatBenefit1: false });
                validBenefit1Form = false;
            }
            if (this.state.ClaimNumber2State.length > 0) {
                this.setState({ isValidClaimNumber2: false });
                if (this.state.ClaimNumber2State.length > 0 && this.state.ClaimNumber2State.length > 2) {
                    this.setState({ isValidFormatClaimNumber2: false });
                    validClaimNumber2Form = true;
                }
                else {
                    this.setState({ isValidFormatClaimNumber2: true });
                    this.setState({ isValidClaimNumber2: false });
                }
            }
            else {
                this.setState({ isValidClaimNumber2: true });
                this.setState({ isValidFormatClaimNumber2: false });
                validClaimNumber2Form = false;
            }
            if (this.state.AmountBenefitsState.length > 0) {
                this.setState({ isValidAmountBenefits: false });
                if (this.state.AmountBenefitsState.length > 0 && this.state.AmountBenefitsState.length > 2) {
                    this.setState({ isValidFormatAmountBenefits: false });
                    validAmountBenefitsForm = true;
                }
                else {
                    this.setState({ isValidFormatAmountBenefits: true });
                    this.setState({ isValidAmountBenefits: false });
                }
            }
            else {
                this.setState({ isValidAmountBenefits: true });
                this.setState({ isValidFormatAmountBenefits: false });
                validAmountBenefitsForm = false;
            }
            if (this.state.AgencyClaimState.length > 0) {
                this.setState({ isValidAgencyClaim: false });
                if (this.state.AgencyClaimState.length > 0 && this.state.AgencyClaimState.length > 2) {
                    this.setState({ isValidFormatAgencyClaim: false });
                    validAgencyClaimForm = true;
                }
                else {
                    this.setState({ isValidFormatAgencyClaim: true });
                    this.setState({ isValidAgencyClaim: false });
                }
            }
            else {
                this.setState({ isValidAgencyClaim: true });
                this.setState({ isValidFormatAgencyClaim: false });
                validAgencyClaimForm = false;
            }
        }
        else {
            this.setState({ isValidNameSIN2: false });
            this.setState({ isValidBenefit1: false });
            this.setState({ isValidClaimNumber2: false });
            this.setState({ isValidAmountBenefits: false });
            this.setState({ isValidAgencyClaim: false });
            validNameSIN2Form = true;
            validBenefit1Form = true;
            validClaimNumber2Form = true;
            validAmountBenefitsForm = true;
            validAgencyClaimForm = true;
        }
        if (this.state.RemarkState.length > 0) {
            this.setState({ isValidRemark: false });
            if (this.state.RemarkState.length > 0 && this.state.RemarkState.length > 2) {
                this.setState({ isValidFormatRemark: false });
                validRemarkForm = true;
            }
            else {
                this.setState({ isValidFormatRemark: true });
                this.setState({ isValidRemark: false });
            }
        }
        else {
            this.setState({ isValidRemark: true });
            this.setState({ isValidFormatRemark: false });
            validRemarkForm = false;
        }
        if (validFirstNameForm && validLastNameForm && validSecurityNumberForm && validWorkedFromDateForm
            && validWorkedToDateForm && validNameEmployerForm && validAddressEmployerForm && validIndustrylistForm
            && validNameAgencyForm && validBenefitForm && validTypeBenefitsForm && validReceivingForm
            && validReceiving1Form && validReceiving2Form && validReceiving3Form && validBirthNameForm && validGenderForm && validSIN2Form
            && validMotherFirstNameForm && validMotherLastNameForm && validFatherFirstNameForm
            && validFatherLastNameForm && validNameCountryForm && validEligibleForm && validWorkerForm
            && validPersonForm && validDateRefugeeForm && validMonthForm && validDayForm && validYearForm && validApplyForm
            && validStopWorkMonthForm && validStopWorkDayForm && validStopWorkYearForm && validOccpForm && validOccupationForm
            && validCountryForm && validFirstName2Form && validLastName2Form && validSecurityNumber2Form
            && validSIN3Form && validAdditionalWorkerMonthForm && validAdditionalWorkerDayForm && validAdditionalWorkerYearForm
            && validPlaceBirthForm && validDeathForm && validPlaceDeathForm && validServiceForm && validCountryServedForm
            && validMonthServiceForm && validDayServiceForm && validYearServiceForm && validMonthService1Form && validDayService1Form
            && validYearService1Form && validBenefitServiceForm && validRecipientNameForm && validUSAgencyForm && validClaimNumberForm
            && validRecipientName1Form && validUSAgency1Form && validClaimNumber1Form && validNumberForm && validAddressEmployer2Form
            && validWorkMonthForm && validWorkYearForm && validEndedMonthForm && validEndedYearForm && validEmployerForm && validUnderAgeForm
            && validOverAgeForm && validChildForm && validAgencyClaimForm && validChildrenGenderForm
            && validPartnerDateofBirth1Form & validRelationshipForm && validChildrenDateofBirthForm && validPartnerForm
            && validPartnerDateofBirth5Form && validPartnerDateMarriageForm && validPartnerDateofDivorceForm && validCitizenshipForm
            && validSIN4Form && validSecurityNumber3Form && validFormerForm && validPartnerNameForm && validPartnerDateofBirth1Form
            && validPartnerDateMarriage1Form && validPartnerDateofDivorce1Form && validCitizenship1Form && validSIN5Form
            && validSecurityNumber4Form && validFormer1Form && validPartnerName1Form
            && validPartnerDateofMarriage2Form && validPartnerDateofDivorce2Form && validCitizenship2Form && validSIN6Form
            && validSecurityNumber5Form && validNumber1Form && validNameSIN2Form && validBenefit1Form && validClaimNumber2Form
            && validAmountBenefitsForm && validRemarkForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Load Industry List Function
    handleLoadIndustry(event) {
        let LoadIndustryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            { QueryName: "Industries" }
        );
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: LoadIndustryAPIUrl,
            headers: AxiosHeaderConfig,
        }).then(({ data }) => {
            IndustryItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                IndustryItems.push(<MenuItem value={data[i].IndustryCode} key={i} primaryText={data[i].IndustryName} />);
            }
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
    handleBenQusUSAuto(event) {
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
                thisObj.setState({ FirstNameState: data[i].FirstName });
                thisObj.setState({ MiddleNameState: data[i].MiddleName });
                thisObj.setState({ LastNameState: data[i].LastName });
                // SSNumber Pending
                thisObj.setState({ NameEmployerState: data[i].CompanyCode });
                thisObj.setState({ IndustrylistState: data[i].IndustryCode });
                thisObj.setState({ BirthNameState: data[i].BirthName });
                thisObj.setState({ GenderState: data[i].Gender });
                thisObj.setState({ NameCountryState: data[i].CountryOfCitizenship });
                thisObj.setState({ OccupationState: data[i].Occupation });
                thisObj.setState({ AdditionalWorkerMonthState: data[i].DOB_Month });
                thisObj.setState({ AdditionalWorkerDayState: data[i].DOB_Day });
                thisObj.setState({ AdditionalWorkerYearState: data[i].DOB_Year });
                thisObj.setState({ PlaceBirthState: data[i].PlaceOfBirth });
                thisObj.setState({ PartnerState: data[i].PFirstName + '' + data[i].PMiddleName + '' + data[i].PLastName });
                var varPDOB = data[i].PDOB_Month + "/" + data[i].PDOB_Day + "/" + data[i].PDOB_Year;
                var DtPDOB = new Date(varPDOB);
                thisObj.setState({ PartnerDateofBirth5State: DtPDOB });
                var varDOB = data[i].DOMCDW_Month + "/" + data[i].DOMCDW_Day + "/" + data[i].DOMCDW_Year;
                var DPDOM = new Date(varDOB);
                thisObj.setState({ PartnerDateMarriageState: DPDOM });
                thisObj.setState({ CitizenshipState: data[i].PCountryOfCitizenship });
                // thisObj.setState({BenefitState:data[i].InquiryAbout});
                thisObj.setState({ MaritalState: data[i].MaritalStatus })
            }
        }).catch((err) => {

        })
    }
    handleBenQusUSAutoName(event) {
        var thisObj = this;
        let UserID;
        //let BenQusAutoNameAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let BenQusAutoNameAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusAutoNameJSONData = JSON.stringify({
            QueryName: "Names",
            UserID: emailresult,
            CompanyCode: this.props.UserData.CCompanyID,
            // this.props.LoginData.LUserID,
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
            url: BenQusAutoNameAPIUrl,
            data: BenQusAutoNameJSONData,
            //headers:AxiosHeaderConfig,

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ NameEmployer: data[i].CompanyCode });
                thisObj.setState({ NameEmployer1: data[i].CompanyCode });
            }
        }).catch((err) => {
            //alert(err.message);
        })
    }

    handleBenQusChildDatas(event) {
        var valid = this.handleValidateChildForm(this);
        if (valid) {
            var ChildrenJSONData = {
                WorkedFromDate: this.state.WorkedFromDateState,
                WorkedToDate: this.state.WorkedToDateState,
                NameEmployer: this.state.NameEmployerState,
                AddressEmployer: this.state.AddressEmployerState,
                Industrylist: this.state.IndustrylistState,
                Social: this.state.SocialState,
                NameAgency: this.state.NameAgencyState,

            }
            if (InformationChildren.length <= 6) {
                InformationChildren.push(ChildrenJSONData);
                notify.show("Employer Information Added Successfully", "success", 3000);
                this.handleChildReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Seven Employer to Add", "warning", 3000);
            }
        }
    }

    handleChildReset(e) {
        this.setState({
            WorkedFromDateState: "",
            WorkedToDateState: "",
            NameEmployerState: "",
            AddressEmployerState: "",
            IndustrylistState: "",
            SocialState: "",
            NameAgencyState: "",

            isValidWorkedFromDate: false,
            isValidWorkedToDate: false,
            isValidNameEmployer: false,
            isValidAddressEmployer: false,
            isValidIndustrylist: false,
            isValidSocial: false,
            isValidNameAgency: false,

        });
    }

    handleBenQusChild1Datas(event) {
        var valid = this.handleValidateChild1Form(this);
        if (valid) {
            var ChildrenJSONData1 = {
                FirstName: this.state.FirstNameState,
                MiddleName: this.state.MiddleNameState,
                LastName: this.state.LastNameState,
                SecurityNumber: this.state.SecurityNumberState,
                WorkedFromDate: this.state.WorkedFromDateState,
                WorkedToDate: this.state.WorkedToDateState,
                NameEmployer: this.state.NameEmployerState,
                AddressEmployer: this.state.AddressEmployerState,
                Industrylist: this.state.IndustrylistState,
                Social: this.state.SocialState,
                NameAgency: this.state.NameAgencyState,
                CoverdFromDate: this.state.CoverdFromDateState,
                CoverdToDate: this.state.CoverdToDateState,
                Coverage: this.state.CoverageState,
                SIN: this.state.SINState,
                NameAgency1: this.state.NameAgency1State,
                LastWorkingPlaceNameAgency: this.state.LastWorkingPlaceNameAgencyState,

            }
            if (InformationChildren1.length <= 1) {
                InformationChildren1.push(ChildrenJSONData1);
                notify.show("Employee Information Added Successfully", "success", 3000);
                this.handleChild1Reset(this);
            }
            else {
                notify.show("GPA Allow Maximum two Employee to Add", "warning", 3000);
            }
        }
    }
    handleChild1Reset(e) {
        this.setState({
            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            SecurityNumberState: "",
            WorkedFromDateState: "",
            WorkedToDateState: "",
            NameEmployerState: "",
            AddressEmployerState: "",
            IndustrylistState: "",
            SocialState: "",
            NameAgencyState: "",
            CoverdFromDateState: "",
            CoverdToDateState: "",
            CoverageState: "",
            SINState: "",
            NameAgency1State: "",
            LastWorkingPlaceNameAgencyState: "",

            isValidFirstName: false,
            isValidLastName: false,
            // isValidSecurityNumber: false,
            isValidWorkedFromDate: false,
            isValidWorkedToDate: false,
            isValidNameEmployer: false,
            //isValidAddressEmployer: false,
            isValidIndustrylist: false,
            isValidSocial: false,
            isValidNameAgency: false,
            isValidCoverdFromDate: false,
            isValidCoverdToDate: false,
            isValidSIN: false,
            isValidNameAgency1: false,
            isValidLastWorkingPlaceNameAgency: false,

        });
    }

    //Page Rendering
    render() {
        const google = window.google;
        const { SocialState, search, SocialState1, IndustryState, BenefitState, ReceivingState, GenderState, Receiving1State, Receiving2State, SecurityNumber, AddressEmployer, WorkerState, ApplyState, OccpState, ServiceState, BenefitServiceState, RecipientName, USAgency, ClaimNumber, NumberState, UnderAgeState, OverAgeState, FormerState, Former1State, Number1State, search2, search1, LastWorkingPlaceState } = this.state
        return (
            <div >
                <Col xs={12} md={12} style={newstyle}>
                    <Panel eventKey="1" defaultExpanded={true}>
                        <Panel.Heading>
                            <Panel.Title >US  Form</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Row className="show-grid">
                                <Col xs={12} md={12} className="PanelText">
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>First Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your First Name"
                                                value={this.state.FirstNameState}
                                                onChange={this.handleChangeFirstName.bind(this)}
                                                errorText={this.state.isValidFirstName ? "Please Enter Your First Name" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatFirstName ? "Please Enter the Valid First Name " : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Middle Name</label>
                                            <TextField hintText="Enter Your Middle Name"
                                                value={this.state.MiddleNameState}
                                                onChange={this.handleChangeMiddleName.bind(this)}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Last Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Last Name"
                                                value={this.state.LastNameState}
                                                onChange={this.handleChangeLastName.bind(this)}
                                                errorText={this.state.isValidLastName ? "Please Enter Your Last Name" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>U.S Social Security Number</label>
                                            <TextField hintText="Enter Your U.S Social Security Number"
                                                value={this.state.SecurityNumberState}
                                                onChange={this.handleChangeSecurityNumber.bind(this)}
                                            //errorText={this.state.isValidSecurityNumber ? "Please enter your U.S Social Security Number" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={12} className="input-fileds">
                                            <label className="TopicAlign">Provide the following information about the worker's social security credits (coverage) and last place of residence in <b>{this.state.insertCountryState}</b></label>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Dates Worked(FROM)<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter Your Dates Worked(FROM)"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.WorkedFromDateState}
                                                onChange={this.handleChangeWorkedFromDate.bind(this)}
                                                errorText={this.state.isValidWorkedFromDate ? "Please select from date" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Dates Worked(TO)<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter Your Dates Worked(TO)"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.WorkedToDateState}
                                                onChange={this.handleChangeWorkedToDate.bind(this)}
                                                errorText={this.state.isValidWorkedToDate ? "Please select TO date" : null}
                                            />
                                            <span className="validationmsg">{this.state.ValidateYearWorked ? "Please Enter the Valid Dates Worked Date" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Name of employer <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Name of employer "
                                                value={this.state.NameEmployerState}
                                                onChange={this.handleChangeNameEmployer.bind(this)}
                                                errorText={this.state.isValidNameEmployer ? "Please select Name Of Employer" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Address of Employer <span className="manatoryfield">*</span></label>
                                            <Geosuggest
                                                placeholder="Current Mailing Address"
                                                initialValue={this.state.AddressEmployerState}
                                                onSuggestSelect={this.handleSelectSuggest1.bind(this)}
                                                onChange={this.handleChangeAddressEmployer.bind(this)}
                                                value={this.state.AddressEmployerState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidAddressEmployer ? "Please select Address Of Employer" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Type of industry or business<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the type of industry or business"
                                                value={this.state.IndustrylistState}
                                                onChange={this.handleChangeIndustrylist.bind(this)}
                                                errorText={this.state.isValidIndustrylist ? "Please select type of industry or business" : null}
                                            >
                                                {IndustryItems}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Social Insurance number used while working in {this.state.insertCountryState}</label>

                                            <TextField
                                                value={this.state.SocialState}
                                                onChange={this.handleChangeSocialState.bind(this)}
                                                hintText="Social insurance number "
                                            //errorText={this.state.isValidSocial ? "Please select type of industry or business" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Name of Agency to which contributions were paid<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Name of Agency"
                                                value={this.state.NameAgencyState}
                                                onChange={this.handleChangeNameAgency.bind(this)}
                                                errorText={this.state.isValidNameAgency ? "Please enter name of agency" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds">
                                            <Button onClick={this.handleBenQusChildDatas.bind(this)} className="RQ-Add" >Add Another Employer</Button>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds">
                                            <label className="TopicAlign">Worker's periods of coverage under the foreign social insurance system in <b>{this.state.insertCountryState}</b> which are not based on employment (e.g. coverage for voluntary contributions, illness, military service, etc.)</label>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Dates covered (From)</label>
                                            <DatePicker hintText="Enter Your Dates covered (From)"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.CoverdFromDateState}
                                                onChange={this.handleChangeCoverdFromDate.bind(this)}
                                            //errorText={this.state.isValidCoverdFromDate ? "Please select from date" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Dates covered (To)</label>
                                            <DatePicker hintText="Enter Your Dates covered (To)"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.CoverdToDateState}
                                                onChange={this.handleChangeCoverdToDate.bind(this)}
                                            //errorText={this.state.isValidCoverdToDate ? "Please select to date" : null}
                                            />
                                            <span className="validationmsg">{this.state.ValidateYearWorked1 ? "Please select the Valid Dates covered (To)" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Type Of Coverage</label>
                                            <TextField hintText="Enter Your Type of Coverage"
                                                value={this.state.CoverageState}
                                                onChange={this.handleChangeCoverage.bind(this)}
                                            //errorText={this.state.isValidCoverage ? "Please enter types of coverage" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>SIN used (if different from number used for working)</label>
                                            <TextField hintText="Enter Your Social Insurance Number"
                                                value={this.state.SINState}
                                                onChange={this.handleChangeSIN.bind(this)}
                                            //errorText={this.state.isValidSIN ? "Please enter your social insurance number" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Name of agency to which contributions paid (if any)</label>
                                            <TextField hintText="Enter Your Name of agency"
                                                value={this.state.NameAgency1State}
                                                onChange={this.handleChangeNameAgency1.bind(this)}
                                            //errorText={this.state.isValidNameAgency1 ? "Please enter name of agency" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label>Worker's last place of residence in the foreign  country (city & state or province)</label>
                                            <Geosuggest
                                                placeholder="Enter Your Last Working Place"
                                                initialValue={this.state.LastWorkingPlaceNameAgencyState}
                                                onSuggestSelect={this.handleSelectSuggest.bind(this)}
                                                onChange={this.handleChangeLastWorkingPlaceNameAgency.bind(this)}
                                                value={this.state.LastWorkingPlaceNameAgencyState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidLastWorkingPlaceNameAgency ? "Please enter last Worked place" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fields">
                                            <Button onClick={this.handleBenQusChild1Datas.bind(this)} className="RQ-Add" >Add Employee Information</Button>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>First Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your First Name"
                                                value={this.state.FirstNameState}
                                                onChange={this.handleChangeFirstName.bind(this)}
                                                errorText={this.state.isValidFirstName ? "Please Enter Your First Name" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatFirstName ? "Please Enter the Valid First Name " : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Middle Name</label>
                                            <TextField hintText="Enter Your Middle Name"
                                                value={this.state.MiddleNameState}
                                                onChange={this.handleChangeMiddleName.bind(this)}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Last Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Last Name"
                                                value={this.state.LastNameState}
                                                onChange={this.handleChangeLastName.bind(this)}
                                                errorText={this.state.isValidLastName ? "Please Enter Your Last Name" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>U.S Social Security Number</label>
                                            <TextField hintText="Enter Your U.S Social Security Number"
                                                value={this.state.SecurityNumberState}
                                                onChange={this.handleChangeSecurityNumber.bind(this)}
                                            //errorText={this.state.isValidSecurityNumber ? "Please enter your U.S Social Security Number" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={12} className="input-fileds">
                                            <label className="TopicAlign">Provide the following information about the worker's social security credits (coverage) and last place of residence in "insert country"</label>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Dates Worked(FROM)<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter Your Dates Worked(FROM)"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.WorkedFromDateState}
                                                onChange={this.handleChangeWorkedFromDate.bind(this)}
                                                errorText={this.state.isValidWorkedFromDate ? "Please select from date" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Dates Worked(TO)<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter Your Dates Worked(TO)"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.WorkedToDateState}
                                                onChange={this.handleChangeWorkedToDate.bind(this)}
                                                errorText={this.state.isValidWorkedToDate ? "Please select TO date" : null}
                                            />
                                            <span className="validationmsg">{this.state.ValidateYearWorked ? "Please Enter the Valid Dates Worked Date" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Name of employer <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Name of employer "
                                                value={this.state.NameEmployerState}
                                                onChange={this.handleChangeNameEmployer.bind(this)}
                                                errorText={this.state.isValidNameEmployer ? "Please select Name Of Employer" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Address of Employer</label>
                                            <Geosuggest
                                                placeholder="Address of employer"
                                                initialValue={this.state.AddressEmployerState}
                                                onSuggestSelect={this.handleSelectSuggest1.bind(this)}
                                                onChange={this.handleChangeAddressEmployer.bind(this)}
                                                value={this.state.AddressEmployerState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Type of industry or business<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the type of industry or business"
                                                value={this.state.IndustrylistState}
                                                onChange={this.handleChangeIndustrylist.bind(this)}
                                                errorText={this.state.isValidIndustrylist ? "Please select type of industry or business" : null}
                                            >
                                                {IndustryItems}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Social Insurance number used while working<span className="manatoryfield">*</span></label>

                                            <TextField
                                                value={this.state.SocialState}
                                                onChange={this.handleChangeSocialState.bind(this)}
                                                hintText="Social insurance number "
                                            //errorText={this.state.isValidSocial ? "Please select type of industry or business" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Name of Agency to which contributions were paid<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Name of Agency"
                                                value={this.state.NameAgencyState}
                                                onChange={this.handleChangeNameAgency.bind(this)}
                                                errorText={this.state.isValidNameAgency ? "Please enter name of agency" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds">
                                            <label className="TopicAlign">Worker's periods of coverage under the foreign social insurance system in "insert country" which are not based on employment (e.g. coverage for voluntary contributions, illness, military service, etc.)</label>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Dates covered (From)</label>
                                            <DatePicker hintText="Enter Your Dates covered (From)"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.CoverdFromDateState}
                                                onChange={this.handleChangeCoverdFromDate.bind(this)}
                                                errorText={this.state.isValidCoverdFromDate ? "Please select from date" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Dates covered (To)</label>
                                            <DatePicker hintText="Enter Your Dates covered (To)"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.CoverdToDateState}
                                                onChange={this.handleChangeCoverdToDate.bind(this)}
                                                errorText={this.state.isValidCoverdToDate ? "Please select to date" : null}
                                            />
                                            <span className="validationmsg">{this.state.ValidateYearWorked1 ? "Please select the Valid Dates covered (To)" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Type Of Coverage</label>
                                            <TextField hintText="Enter Your Type of Coverage"
                                                value={this.state.CoverageState}
                                                onChange={this.handleChangeCoverage.bind(this)}
                                                errorText={this.state.isValidCoverage ? "Please enter types of coverage" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>SIN used (if different from number used for working)</label>
                                            <TextField hintText="Enter Your Social Insurance Number"
                                                value={this.state.SINState}
                                                onChange={this.handleChangeSIN.bind(this)}
                                                errorText={this.state.isValidSIN ? "Please enter your social insurance number" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Name of agency to which contributions paid (if any)</label>
                                            <TextField hintText="Enter Your Name of agency"
                                                value={this.state.NameAgency1State}
                                                onChange={this.handleChangeNameAgency1.bind(this)}
                                                errorText={this.state.isValidNameAgency1 ? "Please enter name of agency" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label>Worker's last place of residence in the foreign  country (city & state or province)</label>
                                            <Geosuggest
                                                placeholder="Enter Your Last Working Place"
                                                initialValue={this.state.LastWorkingPlaceNameAgencyState}
                                                onSuggestSelect={this.handleSelectSuggest.bind(this)}
                                                onChange={this.handleChangeLastWorkingPlaceNameAgency.bind(this)}
                                                value={this.state.LastWorkingPlaceNameAgencyState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Type of Benefit Claimed From 'insert country<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select type of benefits claimed"
                                                value={this.state.BenefitState}
                                                onChange={this.handleChangeBenefit.bind(this)}
                                                errorText={this.state.isValidBenefit ? "Please select your type of benefit" : null}
                                            >
                                                {BenefitStatus}
                                            </SelectField>
                                        </Col>
                                        {(BenefitState == "Other") ?
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Enter Type of Benefits<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Your Type of Benefits"
                                                    value={this.state.TypeBenefitsState}
                                                    onChange={this.handleChangeTypeBenefits.bind(this)}
                                                    errorText={this.state.isValidTypeBenefits ? "Please enter type of Benefits" : null}
                                                />
                                            </Col>
                                            : ''}
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>Are you presently receiving benefits from the United States?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.ReceivingState} onChange={this.handleChangeReceiving.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidReceiving ? "Please select receiving benefits from the United States" : null}</span>
                                        </Col>
                                    </Col>
                                    {(ReceivingState == "Yes") ?
                                        <Col xs={12} md={12} >
                                            {/* <Col xs={12} md={12} className="input-fileds">
                                                <SelectField
                                                    floatingLabelText={<span>If you are already receiving U.S. benefits, do you wish to file for a different type of U.S. benefit?<span className="manatoryfield">*</span></span>}
                                                    value={this.state.Receiving1State}
                                                    onChange={this.handleChangeReceiving1.bind(this)}
                                                    errorText={this.state.isValidReceiving1 ? "Please select if you are already receiving U.S. benefits" : null}
                                                >
                                                    <MenuItem value={"Yes"} primaryText="Yes" />
                                                    <MenuItem value={"No"} primaryText="No" />
                                                </SelectField>
                                            </Col> */}
                                            <Col xs={12} md={12} className="Radio_button">
                                                <label>If you are already receiving U.S. benefits, do you wish to file for a different type of U.S. benefit?<span className="manatoryfield">*</span></label>
                                                <RadioButtonGroup valueSelected={this.state.Receiving1State} onChange={this.handleChangeReceiving1.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                <span className="validationmsg">{this.state.isValidReceiving1 ? "Please select if you are already receiving U.S. benefits" : null}</span>
                                            </Col>
                                        </Col>
                                        : ''}
                                    {(ReceivingState == "No") ?
                                        <Col xs={12} md={12} >
                                            <Col xs={12} md={12} className="Radio_button">
                                                <label>If you are not presently receiving U.S. benefits, do you wish to file for U.S. benefits at this time?<span className="manatoryfield">*</span></label>
                                                <RadioButtonGroup valueSelected={this.state.Receiving2State} onChange={this.handleChangeReceiving2.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                <span className="validationmsg">{this.state.isValidReceiving2 ? "Please select are you presently receiving U.S. benefit" : null}</span>
                                            </Col>
                                        </Col>
                                        : ''}
                                    {(Receiving1State == "Yes") || (Receiving2State == "Yes") ?
                                        <Col xs={12} md={12} >
                                            <Col xs={12} md={12} className="Radio_button">
                                                <label>Indicate the type of benefit you wish to claim from the United States<span className="manatoryfield">*</span></label>
                                                <RadioButtonGroup valueSelected={this.state.Receiving3State} onChange={this.handleChangeReceiving3.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                <span className="validationmsg">{this.state.isValidReceiving3 ? "Please select the type of benefit you wish to claim from the United States" : null}</span>
                                            </Col>
                                        </Col>
                                        : ''}
                                    <Col xs={12} md={12} >
                                        {(Receiving1State == "No") || (Receiving2State == "No") ?
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Print worker's name at birth (if different than current name)<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Your Birth Name"
                                                    value={this.state.BirthNameState}
                                                    onChange={this.handleChangeBirthName.bind(this)}
                                                    errorText={this.state.isValidBirthName ? "Please enter worker's name at birth" : null}
                                                />
                                            </Col>
                                            : ''}
                                        <Col xs={12} md={6} className="Radio_button" >
                                            <label>Gender  </label>
                                            <RadioButtonGroup valueSelected={this.state.GenderState} onChange={this.handleChangeGender.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label>Enter worker's social insurance number in the foreign country if different from number previously given<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Social Insurance Number"
                                                value={this.state.SIN2State}
                                                onChange={this.handleChangeSIN2.bind(this)}
                                                errorText={this.state.isValidSIN2 ? "Please enter your social insurance number in the foreign country if different from number previously given" : null}
                                            />
                                        </Col>
                                    </Col>
                                    {(this.state.SecurityNumberState == "") || (this.state.AddressEmployerState == "") ?
                                        <div>
                                            <Col xs={12} md={12} >
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign">If the worker's Social Security number in either the United States or the foreign country is not known, enter the worker's parents names</label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Mother's First Name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Mother's First Name"
                                                        Value={this.state.MotherFirstNameState}
                                                        onChange={this.handleChangeMotherFirstName.bind(this)}
                                                        errorText={this.state.isValidMotherFirstName ? "Please enter your mother fistname" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Mother's Middle Name</label>
                                                    <TextField hintText="Enter Your Mother's Middle Name"
                                                        Value={this.state.MotherMiddleNameState}
                                                        onChange={this.handleChangeMotherMiddleName.bind(this)}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Mother's Last Name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Mother'sLast Name"
                                                        Value={this.state.MotherLastNameState}
                                                        onChange={this.handleChangeMotherLastName.bind(this)}
                                                        errorText={this.state.isValidMotherLastName ? "Please enter your mother lastname" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Father's First Name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Father's First Name"
                                                        Value={this.state.FatherFirstNameState}
                                                        onChange={this.handleChangeFatherFirstName.bind(this)}
                                                        errorText={this.state.isValidFatherFirstName ? "Please Enter your Father First Name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Father's Middle Name</label>
                                                    <TextField hintText="Enter Your Father's Middle Name"
                                                        Value={this.state.FatherMiddleNameState}
                                                        onChange={this.handleChangeFatherMiddleName.bind(this)}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Father's Last Name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Father'sLast Name"
                                                        Value={this.state.FatherLastNameState}
                                                        onChange={this.handleChangeFatherLastName.bind(this)}
                                                        errorText={this.state.isValidFatherLastName ? "Please enter your father's lastname" : null}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label>Enter the worker's citizenship (Enter name of country)<span className="manatoryfield">*</span></label>
                                            <SelectField hintText="Enter Name of Country"
                                                Value={this.state.NameCountryState}
                                                onChange={this.handleChangeNameCountry.bind(this)}
                                                errorText={this.state.isValidNameCountry ? "Please enter worker's citizenship" : null}
                                                maxHeight={200}
                                            >
                                                {CountryItems}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>Do you want this application to protect an eligible spouse's and/or child's right to social security benefits?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.EligibleState} onChange={this.handleChangeEligible.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidEligible ? "Please select do you want this application to protect an eligible spouse's right to social security benefits" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>Was the worker or any other person claiming benefits on this application a refugee or stateless person at any time?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.WorkerState} onChange={this.handleChangeWorker.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidWorker ? "Please select was the worker or any other person claiming benefit on this application a refugee or stateless person at any time" : null}</span>
                                        </Col>
                                    </Col>
                                    {(WorkerState == "Yes") ?
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Enter Name of the person<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Name of Person"
                                                    value={this.state.PersonState}
                                                    onChange={this.handleChangePerson.bind(this)}
                                                    errorText={this.state.isValidPerson ? "Please select type of industry or business" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Dates of refugee or stateless status<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Dates of Refugee"
                                                    value={this.state.DateRefugeeState}
                                                    onChange={this.handleChangeDateRefugee.bind(this)}
                                                    errorText={this.state.isValidDateRefugee ? "Please select date of refugee or stateless status" : null}
                                                />
                                            </Col>
                                        </Col>
                                        : ''}
                                    <br />
                                    {(this.state.WorkerState == "No") || (this.state.BenefitState == "Previous Employer Benefits") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign">If you are applying for sickness or disability/invalidity benefits, enter the date you became disabled. Otherwise enter N/A</label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Month<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="select the Month"
                                                        value={this.state.MonthState}
                                                        onChange={this.handleChangeMonth.bind(this)}
                                                        errorText={this.state.isValidMonth ? "Please select Month" : null}
                                                    >
                                                        {MonthItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Day<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the Day"
                                                        value={this.state.DayState}
                                                        onChange={this.handleChangeDay.bind(this)}
                                                        errorText={this.state.isValidDay ? "Please select Day" : null}
                                                    >
                                                        {Daystatus}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Year<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the Year"
                                                        value={this.state.YearState}
                                                        onChange={this.handleChangeYear.bind(this)}
                                                        errorText={this.state.isValidYear ? "Please select Year" : null}
                                                    >
                                                        {Yearstatus}
                                                    </SelectField>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>If you are applying for retirement/old-age benefits, have you stopped or do you plan to stop working?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.ApplyState} onChange={this.handleChangeApply.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidApply ? "Please select you are appliying retirement/old-age benefits, have stopped or do you plan to stop working" : null}</span>
                                        </Col>
                                    </Col>
                                    {(ApplyState == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign">Enter the date you stopped or plan to stop working</label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Month<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the Month"
                                                        value={this.state.StopWorkMonthState}
                                                        onChange={this.handleChangeStopWorkMonth.bind(this)}
                                                        errorText={this.state.isValidStopWorkMonth ? "Please select month" : null}
                                                    >
                                                        {MonthItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Day<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the Day"
                                                        value={this.state.StopWorkDayState}
                                                        onChange={this.handleChangeStopWorkDay.bind(this)}
                                                        errorText={this.state.isValidStopWorkDay ? "Please select day" : null}
                                                    >
                                                        {Daystatus}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Year<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the Year"
                                                        value={this.state.StopWorkYearState}
                                                        onChange={this.handleChangeStopWorkYear.bind(this)}
                                                        errorText={this.state.isValidStopWorkYear ? "Please select year" : null}
                                                    >
                                                        {Yearstatus}
                                                    </SelectField>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    {(ApplyState == "No") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="Radio_button">
                                                    <label>Are you applying for foreign social security benefits under a special system that covers a specific occupation (e.g., miners, seamen, farmers)?<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.OccpState} onChange={this.handleChangeOccp.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidOccp ? "Please select Type Occupation" : null}</span>
                                                </Col>
                                            </Col>
                                            {(OccpState == "Yes") ?
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                                        <label>What was your occupation in 'insert country'?<span className="manatoryfield">*</span></label>
                                                        <TextField hintText="Enter Your Occupation"
                                                            value={this.state.OccupationState}
                                                            onChange={this.handleChangeOccupation.bind(this)}
                                                            errorText={this.state.isValidOccupation ? "Please Enter Your Occupation" : null}
                                                        />
                                                    </Col>
                                                    <Col xs={12} md={6} className="Radio_button">
                                                        <label>Did you perform the same type of work in the U.S?<span className="manatoryfield">*</span></label>
                                                        <RadioButtonGroup valueSelected={this.state.CountryState} onChange={this.handleChangeCountry.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                        <span className="validationmsg">{this.state.isValidCountry ? "Please select did you perform the same type of work in the U.S" : null}</span>
                                                    </Col>
                                                </Col>
                                                : ''}
                                        </div>
                                        : ''}
                                    {(BenefitState == "Survivor Benefits") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign"><b>INFORMATION ABOUT THE APPLICANT</b></label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>First Name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your First Name"
                                                        value={this.state.FirstName2State}
                                                        onChange={this.handleChangeFirstName2.bind(this)}
                                                        errorText={this.state.isValidFirstName2 ? "Please Enter your First Name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Middle Name</label>
                                                    <TextField hintText="Enter Your Middle Name"
                                                        value={this.state.MiddleName2State}
                                                        onChange={this.handleChangeMiddleName2.bind(this)}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Last Name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Last Name"
                                                        value={this.state.LastName2State}
                                                        onChange={this.handleChangeLastName2.bind(this)}
                                                        errorText={this.state.isValidLastName2 ? "Please Enter Your Last Name" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>What is your relationship to the worker?<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Relationship"
                                                        value={this.state.RelationshipState}
                                                        onChange={this.handleChangeRelationship.bind(this)}
                                                        errorText={this.state.isValidRelationship ? "Please Enter Your Relationship" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>U.S. Social Security number"<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter your U.S. Social Security Number"
                                                        value={this.state.SecurityNumber2State}
                                                        onChange={this.handleChangeSecurityNumber2.bind(this)}
                                                        errorText={this.state.isValidSecurityNumber2 ? "Please Enter your U.S. Social Security Number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds align-fileds">
                                                    <label>Enter your social insurance number in the foreign country (if none or unknown, so indicate)<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter your Social Insurance Number"
                                                        value={this.state.SIN3State}
                                                        onChange={this.handleChangeSIN3.bind(this)}
                                                        errorText={this.state.isValidSIN3 ? "Please Enter your Social Insurance Number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds">
                                            <label className="TopicAlign"><b>ADDITIONAL INFORMATION ABOUT THE WORKER</b></label>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Worker's date of birth (Month)<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the worker's data of birth (Month)"
                                                value={this.state.AdditionalWorkerMonthState}
                                                onChange={this.handleChangeAdditionalWorkerMonth.bind(this)}
                                                errorText={this.state.isValidAdditionalWorkerMonth ? "Please select the worker's birth month" : null}
                                            >
                                                {MonthItems}
                                            </SelectField>
                                        </Col>

                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Worker's date of birth (day)<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the worker's data of birth (Day)"
                                                value={this.state.AdditionalWorkerDayState}
                                                onChange={this.handleChangeAdditionalWorkerDay.bind(this)}
                                                errorText={this.state.isValidAdditionalWorkerDay ? "Please select the worker's birth Day" : null}
                                            >
                                                {Daystatus}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Worker's date of birth (year)<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the worker's data of birth (Year)"
                                                value={this.state.AdditionalWorkerYearState}
                                                onChange={this.handleChangeAdditionalWorkerYear.bind(this)}
                                                errorText={this.state.isValidAdditionalWorkerYear ? "Please select the worker's birth year" : null}
                                            >
                                                {Yearstatus}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label>Worker's place of birth (City, state, province, country)<span className="manatoryfield">*</span></label>
                                            <Geosuggest
                                                placeholder="Enter worker's place of birth"
                                                initialValue={this.state.PlaceBirthState}
                                                onSuggestSelect={this.handleSelectSuggest2.bind(this)}
                                                onChange={this.handleChangePlaceBirth.bind(this)}
                                                value={this.state.PlaceBirthState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidPlaceBirth ? "Please enter the worker's place of birth" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>If the worker is deceased, enter the date of death<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter worker's date of death"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.DeathState}
                                                onChange={this.handleChangeDeath.bind(this)}
                                                errorText={this.state.isValidDeath ? "Please Enter the Death Day " : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>If the worker is deceased, enter the place of death<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter worker's place of death"
                                                value={this.state.PlaceDeathState}
                                                onChange={this.handleChangePlaceDeath.bind(this)}
                                                errorText={this.state.isValidPlaceDeath ? "Enter worker's place of death" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>Was the worker in the active military or naval service of the U.S. (including U.S. reserve or U.S. National Guard active duty for training) or a foreign country after September 7 1939?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.ServiceState} onChange={this.handleChangeService.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidService ? "Please select was the worker in the active military or naval service of US" : null}</span>
                                        </Col>
                                    </Col>
                                    {(ServiceState == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds align-fileds">
                                                    <label>Enter the name of country served<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter the name of country served "
                                                        value={this.state.CountryServedState}
                                                        onChange={this.handleChangeCountryServed.bind(this)}
                                                        errorText={this.state.isValidCountryServed ? "Please enter name of country served" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Dates of service (FROM-Month)<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the dates of service (From-Month)"
                                                        value={this.state.MonthServiceState}
                                                        onChange={this.handleChangeMonthService.bind(this)}
                                                        errorText={this.state.isValidMonthService ? "Please enter name of country served" : null}
                                                    >
                                                        {MonthItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Dates of service (FROM-Day)<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the dates of service (From-Day)"
                                                        value={this.state.DayServiceState}
                                                        onChange={this.handleChangeDayService.bind(this)}
                                                        errorText={this.state.isValidDayService ? "Please select month" : null}
                                                    >
                                                        {Daystatus}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Dates of service (FROM-Year)<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the dates of service (From-Year)"
                                                        value={this.state.YearServiceState}
                                                        onChange={this.handleChangeYearService.bind(this)}
                                                        errorText={this.state.isValidYearService ? "Please select year" : null}
                                                    >
                                                        {Yearstatus}
                                                    </SelectField>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Dates of service (TO-Month)<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the dates of service (To-Month)"
                                                        value={this.state.MonthService1State}
                                                        onChange={this.handleChangeMonthService1.bind(this)}
                                                        errorText={this.state.isValidMonthService1 ? "Please select month" : null}
                                                    >
                                                        {MonthItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Dates of service (TO-Day)<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the dates of service (To-Day)"
                                                        value={this.state.DayService1State}
                                                        onChange={this.handleChangeDayService1.bind(this)}
                                                        errorText={this.state.isValidDayService1 ? "Please select day" : null}
                                                    >
                                                        {Daystatus}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Dates of service (TO-Year)<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the dates of service (To-Year)"
                                                        value={this.state.YearService1State}
                                                        onChange={this.handleChangeYearService1.bind(this)}
                                                        errorText={this.state.isValidYearService1 ? "Please select year" : null}
                                                    >
                                                        {Yearstatus}
                                                    </SelectField>
                                                    <span className="validationmsg">{this.state.ValidateYearWorked2 ? "Please select the Valid dates of service (TO-Year)" : ""}</span>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>Has anyone (living or deceased) received, or does anyone expect to receive, a benefit from any  U.S.  Federal  agency  based  on  the  worker's military or naval service?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.BenefitServiceState} onChange={this.handleChangeBenefitSerivce.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidBenefitService ? "Please select whether receive benefits from any U.S Federal agency" : null}</span>
                                        </Col>
                                    </Col>
                                    {(BenefitServiceState == "Yes") ?
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>Recipient's Name<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Recipient's Name"
                                                    value={this.state.RecipientNameState}
                                                    onChange={this.handleChangeRecipientName.bind(this)}
                                                    errorText={this.state.isValidRecipientName ? "Please select recipient's name" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>U.S. Agency<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter U.S. Agency "
                                                    value={this.state.USAgencyState}
                                                    onChange={this.handleChangeUSAgency.bind(this)}
                                                    errorText={this.state.isValidUSAgency ? "Please enter US agency" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>Claim Number<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Claim Number "
                                                    value={this.state.ClaimNumberState}
                                                    onChange={this.handleChangeClaimNumber.bind(this)}
                                                    errorText={this.state.isValidClaimNumber ? "Please enter claim number" : null}
                                                />
                                            </Col>
                                        </Col>
                                        : ''}
                                    {(this.state.RecipientNameState != '') && (this.state.USAgencyState != '') && (this.state.ClaimNumberState != '') ?
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>Recipient's Name <span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Recipient's Name"
                                                    value={this.state.RecipientName1State}
                                                    onChange={this.handleChangeRecipientName1.bind(this)}
                                                    errorText={this.state.isValidRecipientName1 ? "Please Enter Recipient's Name" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>U.S. Agency <span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter U.S. Agency "
                                                    value={this.state.USAgency1State}
                                                    onChange={this.handleChangeUSAgency1.bind(this)}
                                                    errorText={this.state.isValidUSAgency1 ? "Please Enter U.S. Agency" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>Claim Number <span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Claim Number "
                                                    value={this.state.ClaimNumber1State}
                                                    onChange={this.handleChangeClaimNumber1.bind(this)}
                                                    errorText={this.state.isValidClaimNumber1 ? "Please Enter Claim Number" : null}
                                                />
                                            </Col>
                                        </Col>
                                        : ''}
                                    {(ServiceState == "No") || (BenefitServiceState == "No") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="Radio_button">
                                                    <label>During the past 24 months, did the worker engage in employment or self-employment covered by the U.S. Social Security system?<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.NumberState} onChange={this.handleChangeNumber.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidNumber ? "Please Enter the worker engage in employment" : null}</span>
                                                </Col>
                                            </Col>
                                            {(NumberState == "Yes") ?
                                                <div>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                                            <label>Name and address of employer or self-employment activity<span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Address of Employer "
                                                                value={this.state.AddressEmployer2State}
                                                                onChange={this.handleChangeAddressEmployer2.bind(this)}
                                                                errorText={this.state.isValidAddressEmployer2 ? "Please Enter Address of Employer" : null}
                                                            />
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={3} className="input-fileds align-fileds">
                                                            <label>Work Began (Month)<span className="manatoryfield">*</span></label>
                                                            <SelectField
                                                                hintText="Select work month"
                                                                value={this.state.WorkMonthState}
                                                                onChange={this.handleChangeWorkMonth.bind(this)}
                                                                maxHeight={200}
                                                                errorText={this.state.isValidWorkMonth ? "Please Enter the Work Began (Month) " : null}
                                                            >
                                                                {MonthItems}
                                                            </SelectField>
                                                        </Col>
                                                        <Col xs={12} md={3} className="input-fileds align-fileds">
                                                            <label>Work Began (Year)<span className="manatoryfield">*</span></label>
                                                            <SelectField
                                                                hintText="Select work Year"
                                                                value={this.state.WorkYearState}
                                                                onChange={this.handleChangeWorkYear.bind(this)}
                                                                maxHeight={200}
                                                                errorText={this.state.isValidWorkYear ? "Please Enter the Work Began (Year) " : null}
                                                            >
                                                                {Yearstatus}
                                                            </SelectField>
                                                        </Col>
                                                        <Col xs={12} md={3} className="input-fileds align-fileds">
                                                            <label>Work Ended (Month)<span className="manatoryfield">*</span></label>
                                                            <SelectField
                                                                hintText="Select work end month"
                                                                value={this.state.EndedMonthState}
                                                                onChange={this.handleChangeEndedMonth.bind(this)}
                                                                maxHeight={200}
                                                                errorText={this.state.isValidEndedMonth ? "Please Enter the Work Ended (Month)" : null}
                                                            >
                                                                {MonthItems}
                                                            </SelectField>
                                                        </Col>
                                                        <Col xs={12} md={3} className="input-fileds align-fileds">
                                                            <label>Work Ended (Year)<span className="manatoryfield">*</span></label>
                                                            <SelectField
                                                                hintText="Select work end year"
                                                                value={this.state.EndedYearState}
                                                                onChange={this.handleChangeEndedYear.bind(this)}
                                                                maxHeight={200}
                                                                errorText={this.state.isValidEndedYear ? "Please Enter the Work Ended (Year) " : null}
                                                            >
                                                                {Yearstatus}
                                                            </SelectField>
                                                            <span className="validationmsg">{this.state.ValidateYearWorked2 ? "Please Enter the  valid Work Ended (Year)" : ""}</span>
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={12} className="Radio_button">
                                                            <label>May we ask any employer listed above for wage information needed to process this claim?<span className="manatoryfield">*</span></label>
                                                            <RadioButtonGroup valueSelected={this.state.EmployerState} onChange={this.handleChangeEmployer.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                            <span className="validationmsg">{this.state.isValidEmployer ? "Please Select the any employer listed above for wage information" : null}</span>
                                                        </Col>
                                                    </Col>
                                                </div>
                                                : ''}
                                        </div>
                                        : ''}
                                    {(NumberState == "No") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign"><b>INFORMATION ABOUT DEPENDENTS FOR WHOM BENEFITS ARE CLAIMED</b></label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign">Are there any children of the worker who are now, or were in the past 12 months, unmarried and:</label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="Radio_button">
                                                    <label>Under age 18 <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.UnderAgeState} onChange={this.handleChangeUnderAge.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidUnderAge ? "Please Select the Under age 18 " : null}</span>
                                                </Col>
                                                <Col xs={12} md={6} className="Radio_button">
                                                    <label>Age 18 or over and a student or disabled <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.OverAgeState} onChange={this.handleChangeOverAge.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidOverAge ? "Please Enter the Over Age 18" : null}</span>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    {(UnderAgeState == "Yes") || (OverAgeState == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign">If either block is checked "Yes", enter the information for each child. NOTE: Children include natural children, step-children and adopted children plus grandchildren living in the same household as the worker.</label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Name of child<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Name of child "
                                                        value={this.state.ChildState}
                                                        onChange={this.handleChangeChild.bind(this)}
                                                        errorText={this.state.isValidChild ? "Please Enter Your Name of child" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Relationship to Worker<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Relationship to Worker "
                                                        value={this.state.Relationship1State}
                                                        onChange={this.handleChangeRelationship1.bind(this)}
                                                        errorText={this.state.isValidRelationship1 ? "Please Enter Your Relationship to Worker" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="Radio_button" >
                                                    <label>Gender</label>
                                                    <RadioButtonGroup valueSelected={this.state.ChildrenGenderState} onChange={this.handleChangeChildrenGender.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Date of Birth (Month, Day, Year)<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Data of Birth"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.ChildrenDateofBirthState}
                                                        onChange={this.handleChangeChildrenDateofBirth.bind(this)}
                                                        errorText={this.state.isValidChildrenDateofBirth ? "Please Enter Data of Birth " : null}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    {(this.state.MaritalState == "M") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign">The spouse, widow or widower of the worker may be eligible for a benefit. In addition, a former spouse of the worker may be eligible as a divorced spouse, widow or widower. Provide the following information about any spouse  or former spouse  of the worker.</label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Name (including maiden name)<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Partner Name"
                                                        value={this.state.PartnerState}
                                                        onChange={this.handleChangePartner.bind(this)}
                                                        errorText={this.state.isValidPartner ? "Please enter partner name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Birth (if any) (Month, Day, Year)<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Data of Birth"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateofBirth5State}
                                                        onChange={this.handleChangePartnerDateofBirth5.bind(this)}
                                                        errorText={this.state.isValidPartnerDateofBirth5 ? "Please select date of divorce" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Marriage (Month, Day, Year)<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Data of Marriage"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateMarriageState}
                                                        onChange={this.handleChangePartnerDateMarriage.bind(this)}
                                                        errorText={this.state.isValidPartnerDateMarriage ? "Please select date of marriage" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Divorce (if any) (Month, Day, Year)<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Data of Divorce"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateofDivorceState}
                                                        onChange={this.handleChangePartnerDateofDivorce.bind(this)}
                                                        errorText={this.state.isValidPartnerDateofDivorce ? "Please select date of divorce" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Country of Citizenship<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the Country of Citizenship"
                                                        value={this.state.CitizenshipState}
                                                        onChange={this.handleChangeCitizenship.bind(this)}
                                                        errorText={this.state.isValidCitizenship ? "Please enter country of citizenship" : null}
                                                        maxHeight={200}
                                                    >
                                                        {CountryItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Social Insurance Number in foreign country<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Social Insurance Number "
                                                        value={this.state.SIN4State}
                                                        onChange={this.handleChangeSIN4.bind(this)}
                                                        errorText={this.state.isValidSIN4 ? "Please enter social insurance number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>U. S. Social Security Number (if any)<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter U. S. Social Security Number "
                                                        value={this.state.SecurityNumber3State}
                                                        onChange={this.handleChangeSecurityNumber3.bind(this)}
                                                        errorText={this.state.isValidSecurityNumber3 ? "Please enter your social security number" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="Radio_button" >
                                                    <label>Do you have a Former spouse that you wish to provide information for? <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.FormerState} onChange={this.handleChangeFormer.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidFormer ? "Please select do you have a former spouse that you wish to provide information" : null}</span>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    {(FormerState == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign"><b>Former spouse Information</b></label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Name (including maiden name)<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Partner Name"
                                                        value={this.state.PartnerNameState}
                                                        onChange={this.handleChangePartnerName.bind(this)}
                                                        errorText={this.state.isValidPartnerName ? "Please enter partner name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Birth (Month, Day, Year)<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Data of Birth"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateofBirth1State}
                                                        onChange={this.handleChangePartnerDateofBirth1.bind(this)}
                                                        errorText={this.state.isValidPartnerDateofBirth1 ? "Please select date of birth" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Marriage (Month, Day, Year)<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Data of Marriage"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateMarriage1State}
                                                        onChange={this.handleChangePartnerDateMarriage1.bind(this)}
                                                        errorText={this.state.isValidPartnerDateMarriage1 ? "Please select date of marriage" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Divorce (if any) (Month, Day, Year)<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Data of Divorce"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateofDivorce1State}
                                                        onChange={this.handleChangePartnerDateofDivorce1.bind(this)}
                                                        errorText={this.state.isValidPartnerDateofDivorce1 ? "Please select date of Divorce" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Country of Citizenship<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the Country of Citizenship"
                                                        value={this.state.Citizenship1State}
                                                        onChange={this.handleChangeCitizenship1.bind(this)}
                                                        errorText={this.state.isValidCitizenship1 ? "Please enter citizenship" : null}
                                                        maxHeight={200}
                                                    >
                                                        {CountryItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Social Insurance Number in foreign country<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Social Insurance Number "
                                                        value={this.state.SIN5State}
                                                        onChange={this.handleChangeSIN5.bind(this)}
                                                        errorText={this.state.isValidSIN5 ? "Please enter social insurance number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>U. S. Social Security Number (if any)<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter U. S. Social Security Number "
                                                        value={this.state.SecurityNumber4State}
                                                        onChange={this.handleChangeSecurityNumber4.bind(this)}
                                                        errorText={this.state.isValidSecurityNumber4 ? "Please enter social security number" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="Radio_button" >
                                                    <label>Do you have a Former spouse that you wish to provide information for? <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.Former1State} onChange={this.handleChangeFormer1.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidFormer1 ? "Please select do you have a former spouse that you wish to provide information" : null}</span>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    {(Former1State == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign"><b>Former spouse 2 Information</b></label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Name (including maiden name)<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Partner Name"
                                                        value={this.state.PartnerName1State}
                                                        onChange={this.handleChangePartnerName1.bind(this)}
                                                        errorText={this.state.isValidPartnerName1 ? "Please enter your partner name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Birth (Month, Day, Year)<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Data of Birth"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateofBirth2State}
                                                        onChange={this.handleChangePartnerDateofBirth2.bind(this)}
                                                        errorText={this.state.isValidPartnerDateofBirth2 ? "Please select date of birth" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Marriage (Month, Day, Year)<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Data of Marriage"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateofMarriage2State}
                                                        onChange={this.handleChangePartnerDateMarriage2.bind(this)}
                                                        errorText={this.state.isValidPartnerDateofMarriage2 ? "Please Enter Data of Marriage" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Divorce (if any) (Month, Day, Year)<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Data of Divorce"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateofDivorce2State}
                                                        onChange={this.handleChangePartnerDateofDivorce2.bind(this)}
                                                        errorText={this.state.isValidPartnerDateofDivorce2 ? "Please select ParnerDateofDivorce2" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Country of Citizenship<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the Country of Citizenship"
                                                        value={this.state.Citizenship2State}
                                                        onChange={this.handleChangeCitizenship2.bind(this)}
                                                        errorText={this.state.isValidCitizenship2 ? "Please enter country of citizenship" : null}
                                                        maxHeight={200}
                                                    >
                                                        {CountryItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Social Insurance Number in foreign country<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Social Insurance Number "
                                                        value={this.state.SIN6State}
                                                        onChange={this.handleChangeSIN6.bind(this)}
                                                        errorText={this.state.isValidSIN6 ? "Please enter partner insurance number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>U. S. Social Security Number (if any)<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter U. S. Social Security Number "
                                                        value={this.state.SecurityNumber5State}
                                                        onChange={this.handleChangeSecurityNumber5.bind(this)}
                                                        errorText={this.state.isValidSecurityNumber5 ? "Please enter social security number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button" >
                                            <label>Has the worker, or any other person listed on this application, ever previously applied for U.S. Social Security benefits or social insurance benefits from 'insert country'?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.Number1State} onChange={this.handleChangeNumber1.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidNumber1 ? "Please enter the worker ,or anyother" : null}</span>
                                        </Col>
                                    </Col>
                                    {(Number1State == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign">Please enter the information requested for each person.</label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Name "
                                                        value={this.state.NameSIN2State}
                                                        onChange={this.handleChangeNameSIN2.bind(this)}
                                                        errorText={this.state.isValidNameSIN2 ? "Please enter partner name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Type of benefit (e.g., Retirement)<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Type of Benefit "
                                                        value={this.state.Benefit1State}
                                                        onChange={this.handleChangeBenefit1.bind(this)}
                                                        errorText={this.state.isValidBenefit1 ? "Please Enter Your Type of Benefit" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Claim Number<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Claim Number "
                                                        value={this.state.ClaimNumber2State}
                                                        onChange={this.handleChangeClaimNumber2.bind(this)}
                                                        errorText={this.state.isValidClaimNumber2 ? "Please enter claim number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Amount  of  benefit (if  benefit awarded<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Amount of Benefit "
                                                        value={this.state.AmountBenefitsState}
                                                        onChange={this.handleChangeAmountBenefits.bind(this)}
                                                        errorText={this.state.isValidAmountBenefits ? "Please Enter Your Amount of Benefit" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Agency which approved or denied claim<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Any Agency claim "
                                                        value={this.state.AgencyClaimState}
                                                        onChange={this.handleChangeAgencyClaim.bind(this)}
                                                        errorText={this.state.isValidAgencyClaim ? "Please Agency approved or denied claim" : null}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label>Remarks<span className="manatoryfield">*</span></label>
                                            <TextField
                                                hintText="Enter Remarks if any!"
                                                multiLine={true}
                                                Value={this.state.RemarkState}
                                                onChange={this.handleChangeRemark.bind(this)}
                                                errorText={this.state.isValidRemark ? "Please Enter the Remark" : null}
                                            />
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
    handleBenQusDatas(event) {
        var Queryvalue;
        if (this.state.BtnNameState == "Save") {
            Queryvalue = "BenefitsQuestionnariesPart2Save";
        }
        else {
            Queryvalue = "BenefitsQuestionnariesPart2Update";
        }
        let BenQusAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusQuebecJSONData = JSON.stringify({
            QueryName: Queryvalue,
            UserID: emailresult,
            CountryCode: this.state.CountryCode,
            BenQusCNIGPAID: this.state.Benefitid,
            AppAnsInJsonObj: {
                FirstName: this.state.FirstNameState,
                MiddleName: this.state.MiddleNameState,
                LastName: this.state.LastNameState,
                SecurityNumber: this.state.SecurityNumberState,
                WorkedFromDate: this.state.WorkedFromDateState,
                WorkedToDate: this.state.WorkedToDateState,
                NameEmployer: this.state.NameEmployerState,
                AddressEmployer: this.state.AddressEmployerState,
                Industrylist: this.state.IndustrylistState,
                Social: this.state.SocialState,
                NameAgency: this.state.NameAgencyState,
                Children: InformationChildren,
                Childrens: InformationChildren1,
                CoverdFromDate: this.state.CoverdFromDateState,
                CoverdToDate: this.state.CoverdToDateState,
                Coverage: this.state.CoverageState,
                SIN: this.state.SINState,
                NameAgency1: this.state.NameAgency1State,
                LastWorkingPlaceNameAgency: this.state.LastWorkingPlaceNameAgencyState,
                Benefit: this.state.BenefitState,
                TypeBenefits: this.state.TypeBenefitsState,
                Receiving: this.state.ReceivingState,
                Receiving1: this.state.Receiving1State,
                Receiving2: this.state.Receiving2State,
                Receiving3: this.state.Receiving3State,
                BirthName: this.state.BirthNameState,
                Gender: this.state.GenderState,
                SIN2: this.state.SIN2State,
                MotherFirstName: this.state.MotherFirstNameState,
                MotherMiddleName: this.state.MotherMiddleNameState,
                MotherLastName: this.state.MotherLastNameState,
                FatherFirstName: this.state.FatherFirstNameState,
                FatherMiddleName: this.state.FatherMiddleNameState,
                FatherLastName: this.state.FatherLastNameState,
                NameCountry: this.state.NameCountryState,
                Eligible: this.state.EligibleState,
                Worker: this.state.WorkerState,
                Person: this.state.PersonState,
                DateRefugee: this.state.DateRefugeeState,
                Month: this.state.MonthState,
                Day: this.state.DayState,
                Year: this.state.YearState,
                Apply: this.state.ApplyState,
                StopWorkMonth: this.state.StopWorkMonthState,
                StopWorkDay: this.state.StopWorkDayState,
                StopWorkYear: this.state.StopWorkYearState,
                Occp: this.state.OccpState,
                Occupation: this.state.OccupationState,
                Country: this.state.CountryState,
                FirstName2: this.state.FirstName2State,
                MiddleName2: this.state.MiddleName2State,
                LastName2: this.state.LastName2State,
                Relationship: this.state.RelationshipState,
                SecurityNumber2: this.state.SecurityNumber2State,
                SIN3: this.state.SIN3State,
                AdditionalWorkerMonth: this.state.AdditionalWorkerMonthState,
                AdditionalWorkerDay: this.state.AdditionalWorkerDayState,
                AdditionalWorkerYear: this.state.AdditionalWorkerYearState,
                PlaceBirth: this.state.PlaceBirthState,
                Death: this.state.DeathState,
                PlaceDeath: this.state.PlaceDeathState,
                Service: this.state.ServiceState,
                CountryServed: this.state.CountryServedState,
                MonthService: this.state.MonthServiceState,
                DayService: this.state.DayServiceState,
                YearService: this.state.YearServiceState,
                MonthService1: this.state.MonthService1State,
                DayService1: this.state.DayService1State,
                YearService1: this.state.YearService1State,
                BenefitService: this.BenefitServiceState,
                RecipientName: this.state.RecipientNameState,
                USAgency: this.state.USAgencyState,
                ClaimNumber: this.state.ClaimNumberState,
                RecipientName1: this.state.RecipientName1State,
                USAgency1: this.state.USAgency1State,
                ClaimNumber1: this.state.ClaimNumber1State,
                Number: this.state.NumberState,
                AddressEmployer2: this.state.AddressEmployer2State,
                WorkMonth: this.state.WorkMonthState,
                WorkYear: this.state.WorkYearState,
                EndedMonth: this.state.EndedMonthState,
                EndedYear: this.state.EndedYearState,
                Employer: this.state.EmployerState,
                UnderAge: this.state.UnderAgeState,
                OverAge: this.state.OverAgeState,
                Child: this.state.ChildState,
                ChildrenDateofBirth: this.state.ChildrenDateofBirthState,
                Partner: this.state.PartnerState,
                PartnerDateofBirth: this.state.PartnerDateofBirthState,
                PartnerDateMarriage: this.state.PartnerDateMarriageState,
                PartnerDateofDivorce: this.state.PartnerDateofDivorceState,
                Citizenship: this.state.CitizenshipState,
                SIN4: this.state.SIN4State,
                SecurityNumber3: this.state.SecurityNumber3State,
                Former: this.state.FormerState,
                PartnerName: this.state.PartnerNameState,
                PartnerDateofBirth1: this.state.PartnerDateofBirth1State,
                PartnerDateMarriage1: this.state.PartnerDateMarriage1State,
                PartnerDateofDivorce1: this.state.PartnerDateofDivorce1State,
                Citizenship1: this.state.Citizenship1State,
                SIN5: this.state.SIN5State,
                SecurityNumber4: this.state.SecurityNumber4State,
                Former1: this.state.Former1State,
                PartnerName1: this.state.PartnerName1State,
                PartnerDateofBirth2: this.state.PartnerDateofBirth2State,
                PartnerDateofMarriage2: this.state.PartnerDateofMarriage2State,
                PartnerDateofDivorce2: this.state.PartnerDateofDivorce2State,
                Citizenship2: this.state.Citizenship2State,
                SIN6: this.state.SIN6State,
                SecurityNumber5: this.state.SecurityNumber5State,
                Number1: this.state.Number1State,
                NameSIN2: this.state.NameSIN2State,
                Benefit1: this.state.Benefit1State,
                ClaimNumber2: this.state.ClaimNumber2State,
                AmountBenefits: this.state.AmountBenefitsState,
                AgencyClaim: this.state.AgencyClaimState,
                Remark: this.state.RemarkState,
            },
            BQP2AnsStatus: "C",
        });
        let thisObj = this;
        let AxiosHeaderConfig = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
        };
        var isValid = this.handleValidateForm(this);
        // alert(isValid);
        if (isValid) {
            axios({
                method: "POST",
                url: BenQusAPIUrl,
                data: BenQusQuebecJSONData,
                //headers:AxiosHeaderConfig,

            }).then((data) => {
                notify.show("Your Information Saved Successfully", "success", 3000);
                thisObj.handleReset(this);
                thisObj.handleAppProcessFlowUpdate(this);
                //thisObj.handleSendBilateralForms(this);
                //this.props.MailSends();
            }).catch((err) => {

            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }

    handleReset(e) {
        this.setState({
            CountryCode: "US",
            value: "",
            BtnNameState: "Save",

            isValidMFNamebirth: false,

            isValidFormatSocialNumber: false,
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
export default connect(mapReducerStateToProps, mapDispatchToProps)(BenQusUS);