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
import SignaturePad from 'react-signature-pad';
import Checkbox from 'material-ui/Checkbox';
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
    <MenuItem value={"RetirementBenefits"} key={1} primaryText="Retirement/Old-Age" />,
    <MenuItem value={"PreviousEmployerBenefits"} key={2} primaryText="Disability or Sickness/Invalidity" />,
    <MenuItem value={"SurvivorBenefits"} key={3} primaryText="Survivors" />,
    <MenuItem value={"Other"} key={4} primaryText="Other" />,
];

const BenefitCountry = [
    <MenuItem value={"CA"} key={1} primaryText="Canada" />,
    <MenuItem value={"DK"} key={2} primaryText="Denmark" />,
    <MenuItem value={"FR"} key={3} primaryText="France" />,
    <MenuItem value={"IT"} key={4} primaryText="Italy" />,
    <MenuItem value={"JP"} key={5} primaryText="Japan" />,
    <MenuItem value={"QC"} key={6} primaryText="Quebec" />,
    <MenuItem value={"UK"} key={7} primaryText="United Kingdom" />,
    <MenuItem value={"NO"} key={8} primaryText="Norway" />,
    <MenuItem value={"US"} key={9} primaryText="United States of America" />,
    <MenuItem value={"KR"} key={10} primaryText="South korea" />,
    <MenuItem value={"KRLS"} key={11} primaryText="South korea Lump Sum" />,
    <MenuItem value={"AT"} key={12} primaryText="Austria" />,
    <MenuItem value={"BE"} key={13} primaryText="Belgium" />,
    <MenuItem value={"DE"} key={14} primaryText="Germany" />,
    <MenuItem value={"BR"} key={15} primaryText="Brazil" />,
    <MenuItem value={"IE"} key={16} primaryText="Ireland" />,
    <MenuItem value={"NL"} key={17} primaryText="Netherlands" />,
    <MenuItem value={"PT"} key={18} primaryText="Portugal" />
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
    checkbox: {
        marginBottom: 16,
    },
};

const CountryItems = [];

const IndustryItems = [];

const InformationChildren = [];

const InformationChildren1 = [];

const InfoBen = [];

class BenQusPortugal extends Component {
    constructor(props) {
        super(props);
        this.handleLoadIndustry(this);
        this.handleLoadCountry(this);
        //Field State Values Initialization
        this.state = {
            AnotherEmployer: [],
            BtnNameState: "Save",
            search2: "",
            search1: "",
            search: "",

            FirstNameState: "",
            MiddleNameState: "",
            LastNameState: "",
            SecurityNumberState: "",
            GenderState: "",
            WorkedFromDateState: "",
            ischecked: false,
            WorkedToDateState: "",
            NameEmployerState: "",
            AddressEmployerState: "",
            IndustrylistState: "",
            SocialState: "",
            NameAgencyState: "",

            WorkedFromDateState1: "",
            WorkedToDateState1: "",
            NameEmployerState1: "",
            AddressEmployerState1: "",
            IndustrylistState1: "",
            SocialState1: "",
            NameAgencyState1: "",

            WorkedFromDateState2: "",
            WorkedToDateState2: "",
            NameEmployerState2: "",
            AddressEmployerState2: "",
            IndustrylistState2: "",
            SocialState2: "",
            NameAgencyState2: "",

            WorkedFromDateState3: "",
            WorkedToDateState3: "",
            NameEmployerState3: "",
            AddressEmployerState3: "",
            IndustrylistState3: "",
            SocialState3: "",
            NameAgencyState3: "",

            WorkedFromDateState4: "",
            WorkedToDateState4: "",
            NameEmployerState4: "",
            AddressEmployerState4: "",
            IndustrylistState4: "",
            SocialState4: "",
            NameAgencyState4: "",

            WorkedFromDateState5: "",
            WorkedToDateState5: "",
            NameEmployerState5: "",
            AddressEmployerState5: "",
            IndustrylistState5: "",
            SocialState5: "",
            NameAgencyState5: "",

            CoverdFromDateState: "",
            CoverdToDateState: "",
            CoverageState: "",
            SINState: "",
            NameAgency1State: "",

            CoverdFromDateState1: "",
            CoverdToDateState1: "",
            CoverageState1: "",
            SINState1: "",
            NameAgency1Cvr1: "",

            CoverdFromDateState2: "",
            CoverdToDateState2: "",
            CoverageState2: "",
            SINState2: "",
            NameAgency1State2: "",

            LastWorkingPlaceNameAgencyState: "",
            MaritalState: "",
            BenefitState: "",
            TypeBenefitsState: "",

            ReceivingState: "No",
            Receiving1State: "No",
            Receiving2State: "No",
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
            EligibleState: "No",
            WorkerState: "No",
            PersonState: "",
            DateRefugeeState: "",
            MonthState: "",
            DayState: "",
            YearState: "",
            ApplyState: "No",
            StopWorkMonthState: "",
            StopWorkDayState: "",
            StopWorkYearState: "",
            OccpState: "No",
            OccupationState: "",
            CountryState: "No",
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
            ServiceState: "No",
            CountryServedState: "",
            MonthServiceState: "",
            DayServiceState: "",
            YearServiceState: "",
            MonthService1State: "",
            DayService1State: "",
            YearService1State: "",
            BenefitServiceState: "No",
            RecipientNameState: "",
            USAgencyState: "",
            ClaimNumberState: "",
            RecipientName1State: "",
            USAgency1State: "",
            ClaimNumber1State: "",
            NumberState: "No",
            // AddressEmployerState:"",
            AddressEmployer2State: "",
            WorkMonthState: "",
            WorkYearState: "",
            EndedMonthState: "",
            EndedYearState: "",

            AddressEmployer2State1: "",
            WorkMonthState1: "",
            WorkYearState1: "",
            EndedMonthState1: "",
            EndedYearState1: "",

            AddressEmployer2State2: "",
            WorkMonthState2: "",
            WorkYearState2: "",
            EndedMonthState2: "",
            EndedYearState2: "",

            EmployerState: "No",
            UnderAgeState: "No",
            OverAgeState: "No",
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

            FormerState: "No",
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

            Number1State: "No",
            NameSIN2State: "",
            Benefit1State: "",
            ClaimNumber2State: "",
            AmountBenefitsState: "",
            AgencyClaimState: "",

            NameSIN2State1: "",
            Benefit1State1: "",
            ClaimNumber2State1: "",
            AmountBenefitsState1: "",
            AgencyClaimState1: "",

            NameSIN2State2: "",
            Benefit1State2: "",
            ClaimNumber2State2: "",
            AmountBenefitsState2: "",
            AgencyClaimState2: "",


            ApplyBenefits: "",

            AddChild: "",
            ChildState1: "",
            Relationship1State1: "",
            ChildrenGenderState1: "",
            ChildrenDateofBirthState1: "",

            AddChild1: "",
            ChildState2: "",
            Relationship1State2: "",
            ChildrenGenderState2: "",
            ChildrenDateofBirthState2: "",

            AddChild2: "",
            ChildState3: "",
            Relationship1State3: "",
            ChildrenGenderState3: "",
            ChildrenDateofBirthState3: "",

            AddChild3: "",
            ChildState4: "",
            Relationship1State4: "",
            ChildrenGenderState4: "",
            ChildrenDateofBirthState4: "",
            AddChild4: "",
            secondWorker: "",
            thirdWorker: "",
            DateSigned: "",
            TelephoneNumberState: "",
            CurrentMailingAddress: "",
            ZipcodeState: "",
            CityState: "",
            CountryinfoState: '',
            DisableState: true,
            AppSignature: false,
            isEnabled: false,
            Benefitid: "",
            EmployerState: "No",
            NameOfSSecurity: "",
            TypeOfIndustry: "",
            NameOfStateAgency: "",
        }
    }

    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');

        this.setState({ DateSigned: new Date() });
        // props value
        // this.setState({ ApplyBenefits: this.props.ApplyForCountry });
        this.setState({ ApplyBenefits: "Portugal" });
        var Params = new URLSearchParams(document.location.search);
        let Benefit = Params.get("BenQusCNIGPAID")
        var Mode = Params.get("Mode");
        let Countryvalue = Params.get("CountryCode")
        if (Params != null || Params != "") {
            if (Mode != null || Mode != "") {
                if (Mode == "E") {
                    this.handleBenQusPortugalEdit(Benefit);
                }
                else {
                    this.handleBenQusPortugalAuto(this);
                    this.handleResPortugalAuto(this);
                }
            }
            else {
                this.handleBenQusPortugalAuto(this);
                this.handleResPortugalAuto(this);
            }
        }
        else {
            this.handleBenQusPortugalAuto(this);
            this.handleResPortugalAuto(this);
        }

    }


    handleNameSIN2State2(e) {
        this.setState({ NameSIN2State2: e.target.value });
    };

    handleBenefit1State2(e) {
        this.setState({ Benefit1State2: e.target.value });
    };


    handleClaimNumber2State2(e) {
        this.setState({ ClaimNumber2State2: e.target.value });
    };

    handleAmountBenefitsState2(e) {
        this.setState({ AmountBenefitsState2: e.target.value });
    };


    handleAgencyClaimState2(e) {
        this.setState({ AgencyClaimState2: e.target.value });
    };



    handleNameSIN2State1(e) {
        this.setState({ NameSIN2State1: e.target.value });
    };

    handleBenefit1State1(e) {
        this.setState({ Benefit1State1: e.target.value });
    };


    handleClaimNumber2State1(e) {
        this.setState({ ClaimNumber2State1: e.target.value });
    };

    handleAmountBenefitsState1(e) {
        this.setState({ AmountBenefitsState1: e.target.value });
    };


    handleAgencyClaimState1(e) {
        this.setState({ AgencyClaimState1: e.target.value });
    };

    handleSecondWorker(e) {
        this.setState({ secondWorker: e.target.value });
    };

    handleThirdWorker(e) {
        this.setState({ thirdWorker: e.target.value });
    };

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
    handleCheck() {
        if (this.state.ischecked == false || this.state.ischecked == '') {
            this.setState({
                ischecked: true
            });
            this.setState({ isEnabled: false })
        }
        else {
            this.setState({
                ischecked: false
            });
            this.setState({ isEnabled: true })
        }

    }
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

    handleChangeAddressEmployer(value) {
        this.setState({ CurrentMailingAddress: value });
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
    handleChangeApplyBenefits(e, index, value) {
        this.setState({ ApplyBenefits: value });
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

    handleChangeNameCountry(e, index, value) {
        this.setState({ NameCountryState: value });
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
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');

        if (onlyNums.length < 9) {
            this.setState({ SecurityNumber2State: onlyNums });
            this.setState({ isValidSecurityNumber2: true });
        } else if (onlyNums.length === 9) {
            this.setState({ isValidSecurityNumber2: false });
            const number = onlyNums.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
            this.setState({ SecurityNumber2State: number });

        }
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


    handleChangeCitizenship(e, index, value) {
        this.setState({ CitizenshipState: value });
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


    handleChangeCitizenship1(e, index, value) {
        this.setState({ Citizenship1State: value });
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

    handleChangeCitizenship2(e, index, value) {
        this.setState({ Citizenship2State: value });
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

    handleDateSigned(e, date) {
        this.setState({ DateSigned: date });
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

    handleChangeChildrenGender(e) {
        this.setState({ ChildrenGenderState: e.target.value });
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

    handleAddChild(e) {
        this.setState({ AddChild: e.target.value });
    };

    handleChangeChild1(e) {
        this.setState({ ChildState1: e.target.value });
    };
    handleChangeRelationship11(e) {
        this.setState({ Relationship1State1: e.target.value });
    };
    handleChangeChildrenGender1(e) {
        this.setState({ ChildrenGenderState1: e.target.value });
    };
    handleChangeChildrenDateofBirth1(e, date) {
        this.setState({ ChildrenDateofBirthState1: date });
    };
    handleAddChild1(e) {
        this.setState({ AddChild1: e.target.value });
    };

    handleChangeChild2(e) {
        this.setState({ ChildState2: e.target.value });
    };
    handleChangeRelationship12(e) {
        this.setState({ Relationship1State2: e.target.value });
    };
    handleChangeChildrenGender2(e) {
        this.setState({ ChildrenGenderState2: e.target.value });
    };
    handleChangeChildrenDateofBirth2(e, date) {
        this.setState({ ChildrenDateofBirthState2: date });
    };
    handleAddChild2(e) {
        this.setState({ AddChild2: e.target.value });
    };

    handleChangeChild3(e) {
        this.setState({ ChildState3: e.target.value });
    };
    handleChangeRelationship13(e) {
        this.setState({ Relationship1State3: e.target.value });
    };
    handleChangeChildrenGender3(e) {
        this.setState({ ChildrenGenderState3: e.target.value });
    };
    handleChangeChildrenDateofBirth3(e, date) {
        this.setState({ ChildrenDateofBirthState3: date });
    };
    handleAddChild3(e) {
        this.setState({ AddChild3: e.target.value });
    };

    handleChangeChild4(e) {
        this.setState({ ChildState4: e.target.value });
    };
    handleChangeRelationship14(e) {
        this.setState({ Relationship1State4: e.target.value });
    };
    handleChangeChildrenGender4(e) {
        this.setState({ ChildrenGenderState4: e.target.value });
    };
    handleChangeChildrenDateofBirth4(e, date) {
        this.setState({ ChildrenDateofBirthState4: date });
    };

    handleChangeTelephoneNumber(e) {
        this.setState({ TelephoneNumberState: e.target.value });
    }

    handleChangeCityState(e) {
        this.setState({ CityState: e.target.value });
    }

    handleChangeZipCode(e) {
        this.setState({ ZipcodeState: e.target.value })
    }
    handleChangeCountryinfo(e) {
        this.setState({ CountryinfoState: e.target.value })
    }
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
        if (this.state.NameEmployerState != null) {
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
        var validCountryinfoForm = false;
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
        // if (this.state.NameEmployerState.length > 0) {
        //     this.setState({ isValidNameEmployer: false });
        //     if (this.state.NameEmployerState.length > 0 && this.state.NameEmployerState.length > 2) {
        //         this.setState({ isValidFormatNameEmployer: false });
        //         validNameEmployerForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatNameEmployer: true });
        //         this.setState({ isValidNameEmployer: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidNameEmployer: true });
        //     this.setState({ isValidFormatNameEmployer: false });
        //     validNameEmployerForm = false;
        // }
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
            validWorkedFromDateForm && validWorkedToDateForm &&
            //validNameEmployerForm
            //&& validAddressEmployerForm 
            validIndustrylistForm &&
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
        var validBenefitForm = false;
        var validTypeBenefitsForm = false;
        var validFirstName2Form = false;
        var validLastName2Form = false;
        var validSecurityNumber2Form = false;
        var validSIN3Form = false;
        var validAdditionalWorkerMonthForm = false;
        var validAdditionalWorkerDayForm = false;
        var validAdditionalWorkerYearForm = false;
        var validPlaceBirthForm = false;
        var validDeathForm = false;
        var validPlaceDeathForm = false;
        let validCountryinfoForm = false;

        //Type of Benefit Claimed From Foreign Country
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

        // if (this.state.BenefitState == "Survivor Benefits") {
        //     if (this.state.DeathState != "") {
        //         this.setState({ isValidDeath: false });
        //         validDeathForm = true;
        //     }
        //     else {
        //         this.setState({ isValidDeath: true });
        //         validDeathForm = false;
        //     }
        //     if (this.state.PlaceDeathState.length > 0) {
        //         this.setState({ isValidPlaceDeath: false });
        //         if (this.state.PlaceDeathState.length > 0 && this.state.PlaceDeathState.length > 2) {
        //             this.setState({ isValidFormatPlaceDeath: false });
        //             validPlaceDeathForm = true;
        //         }
        //         else {
        //             this.setState({ isValidFormatPlaceDeath: true });
        //             this.setState({ isValidPlaceDeath: false });
        //         }
        //     }
        //     else {
        //         this.setState({ isValidPlaceDeath: true });
        //         this.setState({ isValidFormatPlaceDeath: false });
        //         validPlaceDeathForm = false;
        //     }
        //     // if (this.state.OccpState == "No") {
        //     if (this.state.FirstName2State.length > 0) {
        //         this.setState({ isValidFirstName2: false });
        //         if (this.state.FirstName2State.length > 0 && this.state.FirstName2State.length > 2) {
        //             this.setState({ isValidFormatFirstName2: false });
        //             validFirstName2Form = true;
        //         }
        //         else {
        //             this.setState({ isValidFormatFirstName2: true });
        //             this.setState({ isValidFirstName2: false });
        //         }
        //     }
        //     else {
        //         this.setState({ isValidFirstName2: true });
        //         this.setState({ isValidFormatFirstName2: false });
        //         validFirstName2Form = false;
        //     }
        //     if (this.state.LastName2State.length > 0) {
        //         this.setState({ isValidLastName2: false });
        //         if (this.state.LastName2State.length > 0 && this.state.LastName2State.length > 2) {
        //             this.setState({ isValidFormatLastName2: false });
        //             validLastName2Form = true;
        //         }
        //         else {
        //             this.setState({ isValidFormatLastName2: true });
        //             this.setState({ isValidLastName2: false });
        //         }
        //     }
        //     else {
        //         this.setState({ isValidLastName2: true });
        //         this.setState({ isValidFormatLastName2: false });
        //         validLastName2Form = false;
        //     }

        //     // else {
        //     //     this.setState({ isValidFirstName2: false });
        //     //     this.setState({ isValidLastName2: false });
        //     //     validFirstName2Form = true;
        //     //     validLastName2Form = true;
        //     // }
        //     if (this.state.RelationshipState.length > 0) {
        //         this.setState({ isValidRelationship: false });
        //         if (this.state.RelationshipState.length > 0 && this.state.RelationshipState.length > 2) {
        //             this.setState({ isValidFormatRelationship: false });
        //             validRelationshipForm = true;
        //         }
        //         else {
        //             this.setState({ isValidRelationship: true });
        //             this.setState({ isValidRelationship: false });
        //         }
        //     }
        //     else {
        //         this.setState({ isValidRelationship: true });
        //         this.setState({ isValidFormatRelationship: false });
        //         validRelationshipForm = false;
        //     }
        //     if (this.state.SecurityNumber2State.length > 0) {
        //         this.setState({ isValidSecurityNumber2: false });
        //         if (this.state.SecurityNumber2State.length > 0 && this.state.SecurityNumber2State.length > 2) {
        //             this.setState({ isValidFormatSecurityNumber2: false });
        //             validSecurityNumber2Form = true;
        //         }
        //         else {
        //             this.setState({ isValidSecurityNumber2: true });
        //             this.setState({ isValidSecurityNumber2: false });
        //         }
        //     }
        //     else {
        //         this.setState({ isValidSecurityNumber2: true });
        //         this.setState({ isValidFormatSecurityNumber2: false });
        //         validSecurityNumber2Form = false;
        //     }
        //     if (this.state.SIN3State.length > 0) {
        //         this.setState({ isValidSIN3: false });
        //         if (this.state.SIN3State.length > 0 && this.state.SIN3State.length > 2) {
        //             this.setState({ isValidFormatSIN3: false });
        //             validSIN3Form = true;
        //         }
        //         else {
        //             this.setState({ isValidSIN3: true });
        //             this.setState({ isValidSIN3: false });
        //         }
        //     }
        //     else {
        //         this.setState({ isValidSIN3: true });
        //         this.setState({ isValidFormatSIN3: false });
        //         validSIN3Form = false;
        //     }
        // }
        // else {
        //     this.setState({ isValidFirstName2: false });
        //     this.setState({ isValidLastName2: false });
        //     this.setState({ isValidRelationship: false });
        //     this.setState({ isValidSecurityNumber2: false });
        //     this.setState({ isValidSIN3: false });
        //     validFirstName2Form = true;
        //     validLastName2Form = true;
        //     validRelationshipForm = true;
        //     validSecurityNumber2Form = true;
        //     validSIN3Form = true;
        // }
        // if (this.state.AdditionalWorkerMonthState != "") {
        //     this.setState({ isValidAdditionalWorkerMonth: false });
        //     validAdditionalWorkerMonthForm = true;
        // }
        // else {
        //     this.setState({ isValidAdditionalWorkerMonth: true });
        //     validAdditionalWorkerMonthForm = false;
        // }
        // if (this.state.AdditionalWorkerDayState != "") {
        //     this.setState({ isValidAdditionalWorkerDay: false });
        //     validAdditionalWorkerDayForm = true;
        // }
        // else {
        //     this.setState({ isValidAdditionalWorkerDay: true });
        //     validAdditionalWorkerDayForm = false;
        // }
        // if (this.state.AdditionalWorkerYearState != "") {
        //     this.setState({ isValidAdditionalWorkerYear: false });
        //     validAdditionalWorkerYearForm = true;
        // }
        // else {
        //     this.setState({ isValidAdditionalWorkerYear: true });
        //     validAdditionalWorkerYearForm = false;
        // }
        // if (this.state.PlaceBirthState != "") {
        //     this.setState({ isValidPlaceBirth: false });
        //     if (this.state.PlaceBirthState != "") {
        //         this.setState({ isValidFormatPlaceBirth: false });
        //         validPlaceBirthForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatPlaceBirth: true });
        //         this.setState({ isValidPlaceBirth: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidPlaceBirth: true });
        //     this.setState({ isValidFormatPlaceBirth: false });
        //     validPlaceBirthForm = false;
        // }

        if (this.state.CountryinfoState != "") {
            this.setState({ isValidCountryinfo: false });
            validCountryinfoForm = true;
        }
        else {
            this.setState({ isValidCountryinfo: true });
            validCountryinfoForm = false;
        }

        // if (this.SignaturePad.isEmpty()) {
        //     this.setState({ isValidSignature: true });
        //     validSignatureForm = false;
        // }
        // else {
        //     this.setState({ isValidSignature: false });
        //     validSignatureForm = true;
        // }
        // && validFirstName2Form && validLastName2Form && validRelationshipForm
        // && validSecurityNumber2Form && validSIN3Form && validAdditionalWorkerMonthForm && validAdditionalWorkerDayForm && validAdditionalWorkerYearForm
        // && validPlaceBirthForm &&

        if (validBenefitForm && validTypeBenefitsForm && validCountryinfoForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    handleSignatureChange = e => {
        this.setState({ DisableState: this.canBeSubmitted(this) });
        this.setState({ isEnabled: true })
    }

    canBeSubmitted() {
        const { AppSignature } = this.state;
        return (this.AppSignature.isEmpty() == true);
    }
    handleSignatureClear = (e) => {
        this.AppSignature.clear();
        this.setState({ DisableState: this.canBeSubmitted(this) });
        this.setState({ isEnabled: false })
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

    setIndex1(event) {

    }

    // Auto populate Residency 
    handleResPortugalAuto(event) {
        var thisObj = this;
        let UserID;
        // let BenQusAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let BenQusAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusAutoJSONData = JSON.stringify({
            QueryName: "BenQusResidencyAuto",
            UserID: emailresult,
            CountryCode: "PT"
        });
        let AxiosHeaderConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        };
        axios({
            method: "POST",
            url: BenQusAutoAPIUrl,
            data: BenQusAutoJSONData,

        }).then(({ data }) => {

            this.setState({ SecurityNumberState: data[0].PersonalIDNum });
            this.setState({ LastWorkingPlaceNameAgencyState: data[0].ResAddress });
            for (let index = 0; index < 5; index++) {
                if (data[index].CountryStayDate == "Work") {
                    this.setCompanyDetails(data, index);
                } else {
                    this.setCoverageDetails(data, index);
                }
            }

        }).catch((err) => {
            console.log(err);
        })
    }


    setCompanyDetails(data, index) {
        switch (index) {
            case 0:
                this.setState({
                    WorkedFromDateState: data[index].ResCountryBDate,
                    WorkedToDateState: data[index].ResCountryEDate,
                    NameEmployerState: data[index].CompanyCode,
                    AddressEmployerState: data[index].ResAddress,
                    IndustrylistState: this.state.TypeOfIndustry,
                    SocialState: data[index].PersonalIDNum,
                    NameAgencyState: this.state.NameOfSSecurity,
                })
                break;
            case 1:
                this.setState({
                    WorkedFromDateState1: data[index].ResCountryBDate,
                    WorkedToDateState1: data[index].ResCountryEDate,
                    NameEmployerState1: data[index].CompanyCode,
                    AddressEmployerState1: data[index].ResAddress,
                    IndustrylistState1: this.state.TypeOfIndustry,
                    SocialState1: data[index].PersonalIDNum,
                    NameAgencyState1: this.state.NameOfSSecurity,
                })
                break;
            case 2:
                this.setState({
                    WorkedFromDateState2: data[index].ResCountryBDate,
                    WorkedToDateState2: data[index].ResCountryEDate,
                    NameEmployerState2: data[index].CompanyCode,
                    AddressEmployerState2: data[index].ResAddress,
                    IndustrylistState2: this.state.TypeOfIndustry,
                    SocialState2: data[index].PersonalIDNum,
                    NameAgencyState2: this.state.NameOfSSecurity,
                })
                break;
            case 3:
                this.setState({
                    WorkedFromDateState3: data[index].ResCountryBDate,
                    WorkedToDateState3: data[index].ResCountryEDate,
                    NameEmployerState3: data[index].CompanyCode,
                    AddressEmployerState3: data[index].ResAddress,
                    IndustrylistState3: this.state.TypeOfIndustry,
                    SocialState3: data[index].PersonalIDNum,
                    NameAgencyState3: this.state.NameOfSSecurity,
                })
                break;
            case 4:
                this.setState({
                    WorkedFromDateState4: data[index].ResCountryBDate,
                    WorkedToDateState4: data[index].ResCountryEDate,
                    NameEmployerState4: data[index].CompanyCode,
                    AddressEmployerState4: data[index].ResAddress,
                    IndustrylistState4: this.state.TypeOfIndustry,
                    SocialState4: data[index].PersonalIDNum,
                    NameAgencyState4: this.state.NameOfSSecurity,
                })
                break;
            case 5:
                this.setState({
                    WorkedFromDateState5: data[index].ResCountryBDate,
                    WorkedToDateState5: data[index].ResCountryEDate,
                    NameEmployerState5: data[index].CompanyCode,
                    AddressEmployerState5: data[index].ResAddress,
                    IndustrylistState5: this.state.TypeOfIndustry,
                    SocialState5: data[index].PersonalIDNum,
                    NameAgencyState5: this.state.NameOfSSecurity,
                })
                break;
            default:
                break;
        }
    }

    setCoverageDetails(data, index) {
        switch (index) {
            case 0:
                this.setState({
                    CoverdFromDateState: data[index].ResCountryBDate,
                    CoverdToDateState: data[index].ResCountryEDate,
                    CoverageState: data[index].CountryStayDate,
                    SINState: data[index].PersonalIDNum,
                    NameAgency1State: this.state.NameOfSSecurity,
                })
                break;
            case 1:
                this.setState({
                    CoverdFromDateState: data[index].ResCountryBDate,
                    CoverdToDateState: data[index].ResCountryEDate,
                    CoverageState: data[index].CountryStayDate,
                    SINState: data[index].PersonalIDNum,
                    NameAgency1State: this.state.NameOfSSecurity,
                })
                break;
            case 2:
                this.setState({
                    CoverdFromDateState: data[index].ResCountryBDate,
                    CoverdToDateState: data[index].ResCountryEDate,
                    CoverageState: data[index].CountryStayDate,
                    SINState: data[index].PersonalIDNum,
                    NameAgency1State: this.state.NameOfSSecurity,
                })
                break;
        }
    }

    //Auto-Populated Function
    handleBenQusPortugalAuto(event) {
        var thisObj = this;
        let UserID;
        //let BenQusAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let BenQusAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusAutoJSONData = JSON.stringify({
            QueryName: "BenQusGeneralAuto",
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
                thisObj.setState({ PartnerState: data[i].PFirstName + '' + data[i].PMiddleName + '' + data[i].PLastName });
                var varPDOB = data[i].PDOB_Month + "/" + data[i].PDOB_Day + "/" + data[i].PDOB_Year;
                var DtPDOB = new Date(varPDOB);
                thisObj.setState({ PartnerDateofBirth5State: DtPDOB });
                thisObj.setState({ PartnerDateofBirthState: DtPDOB });
                var varDOB = data[i].DOMCDW_Month + "/" + data[i].DOMCDW_Day + "/" + data[i].DOMCDW_Year;
                var DPDOM = new Date(varDOB);
                thisObj.setState({ PartnerDateMarriageState: DPDOM });
                thisObj.setState({ CitizenshipState: data[i].PCountryOfCitizenship });
                thisObj.setState({ MaritalState: data[i].MaritalStatus });
                thisObj.setState({ NameOfSSecurity: data[i].SSSecurity });
                thisObj.setState({ TypeOfIndustry: data[i].IndustryName });
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
    EnableSubmit() {
        const { ischecked, AppSignature } = this.state;
        return (
            ischecked == true && this.AppSignature.isEmpty() == false
        )
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
                            <Panel.Title >Portugal Form</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Row className="show-grid">
                                <Col xs={12} md={12} className="PanelText">
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label>I apply for all benefits for which I am eligible under the provisions of the social security agreement between the United States and Portugal</label>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Type of Benefit Claimed From Foreign Country<span className="manatoryfield">*</span></label>
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
                                                <label>Enter Type of Benefits</label>
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
                                                <label>Indicate the type of benefit you wish to claim from the United States</label>
                                                <RadioButtonGroup valueSelected={this.state.Receiving3State} onChange={this.handleChangeReceiving3.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <RadioButton
                                                        value="Retirement/Old-Age"
                                                        label="Retirement/Old-Age"
                                                        style={style.radioButton}
                                                    />
                                                    <RadioButton
                                                        value="Disability or Sickness/Invalidity"
                                                        label="Disability or Sickness/Invalidity"
                                                        style={style.radioButton}
                                                    />
                                                    <RadioButton
                                                        value="Survivors"
                                                        label="Survivors"
                                                        style={style.radioButton}
                                                    />
                                                </RadioButtonGroup >
                                                <span className="validationmsg">{this.state.isValidReceiving3 ? "Please select the type of benefit you wish to claim from the United States" : null}</span>
                                            </Col>
                                        </Col>
                                        : ''}
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
                                                    <label>Month</label>
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
                                                    <label>Day</label>
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
                                                    <label>Year</label>
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
                                    {(this.state.Receiving3State === "Survivors") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign"><b>INFORMATION ABOUT THE APPLICANT</b></label>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>First Name</label>
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
                                                    <label>Last Name</label>
                                                    <TextField hintText="Enter Your Last Name"
                                                        value={this.state.LastName2State}
                                                        onChange={this.handleChangeLastName2.bind(this)}
                                                        errorText={this.state.isValidLastName2 ? "Please Enter Your Last Name" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>What is your relationship to the worker?</label>
                                                    <TextField hintText="Enter Your Relationship"
                                                        value={this.state.RelationshipState}
                                                        onChange={this.handleChangeRelationship.bind(this)}
                                                        errorText={this.state.isValidRelationship ? "Please Enter Your Relationship" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>U.S. Social Security number</label>
                                                    <TextField hintText="Enter your U.S. Social Security Number"
                                                        value={this.state.SecurityNumber2State}
                                                        onChange={this.handleChangeSecurityNumber2.bind(this)}
                                                        errorText={this.state.isValidSecurityNumber2 ? "Please Enter Valid U.S. Social Security Number) " : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds align-fileds">
                                                    <label>Enter your social insurance number in the foreign country (if none or unknown, so indicate)</label>
                                                    <TextField hintText="Enter your Social Insurance Number"
                                                        value={this.state.SIN3State}
                                                        onChange={this.handleChangeSIN3.bind(this)}
                                                        errorText={this.state.isValidSIN3 ? "Please Enter your Social Insurance Number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <label className="TopicAlign"><b>ADDITIONAL INFORMATION ABOUT THE WORKER</b></label>
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
                                        </div>
                                        : ''}
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
                                                    <label>Enter the name of country served</label>
                                                    <TextField hintText="Enter the name of country served "
                                                        value={this.state.CountryServedState}
                                                        onChange={this.handleChangeCountryServed.bind(this)}
                                                        errorText={this.state.isValidCountryServed ? "Please enter name of country served" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Dates of service (FROM-Month)</label>
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
                                                    <label>Dates of service (FROM-Day)</label>
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
                                                    <label>Dates of service (FROM-Year)</label>
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
                                                    <label>Dates of service (TO-Month)</label>
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
                                                    <label>Dates of service (TO-Day)</label>
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
                                                    <label>Dates of service (TO-Year)</label>
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
                                                <label>Recipient's Name</label>
                                                <TextField hintText="Enter Recipient's Name"
                                                    value={this.state.RecipientNameState}
                                                    onChange={this.handleChangeRecipientName.bind(this)}
                                                    errorText={this.state.isValidRecipientName ? "Please select recipient's name" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>U.S. Agency</label>
                                                <TextField hintText="Enter U.S. Agency "
                                                    value={this.state.USAgencyState}
                                                    onChange={this.handleChangeUSAgency.bind(this)}
                                                    errorText={this.state.isValidUSAgency ? "Please enter US agency" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>Claim Number</label>
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
                                                <label>Recipient's Name </label>
                                                <TextField hintText="Enter Recipient's Name"
                                                    value={this.state.RecipientName1State}
                                                    onChange={this.handleChangeRecipientName1.bind(this)}
                                                    errorText={this.state.isValidRecipientName1 ? "Please Enter Recipient's Name" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>U.S. Agency </label>
                                                <TextField hintText="Enter U.S. Agency "
                                                    value={this.state.USAgency1State}
                                                    onChange={this.handleChangeUSAgency1.bind(this)}
                                                    errorText={this.state.isValidUSAgency1 ? "Please Enter U.S. Agency" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds align-fileds">
                                                <label>Claim Number</label>
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
                                                            <label>Name and address of employer or self-employment activity</label>
                                                            <TextField hintText="Enter Address of Employer "
                                                                value={this.state.AddressEmployer2State}
                                                                onChange={this.handleChangeAddressEmployer2.bind(this)}
                                                                errorText={this.state.isValidAddressEmployer2 ? "Please Enter Address of Employer" : null}
                                                            />
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={3} className="input-fileds align-fileds">
                                                            <label>Work Began (Month)</label>
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
                                                            <label>Work Began (Year)</label>
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
                                                            <label>Work Ended (Month)</label>
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
                                                            <label>Work Ended (Year)</label>
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
                                                    <label>Name of child</label>
                                                    <TextField hintText="Enter Your Name of child "
                                                        value={this.state.ChildState}
                                                        onChange={this.handleChangeChild.bind(this)}
                                                        errorText={this.state.isValidChild ? "Please Enter Your Name of child" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Relationship to Worker</label>
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
                                                    <label>Date of Birth (Month, Day, Year)</label>
                                                    <DatePicker hintText="Enter Data of Birth"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.ChildrenDateofBirthState}
                                                        onChange={this.handleChangeChildrenDateofBirth.bind(this)}
                                                        errorText={this.state.isValidChildrenDateofBirth ? "Please Enter Data of Birth " : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="Radio_button" >
                                                    <label>Are there any more children of the worker who are now, or were in the past 12 months, unmarried and under the age of 18 or age 18 and over and a student or disabled?  </label>
                                                    <RadioButtonGroup valueSelected={this.state.AddChild} onChange={this.handleAddChild.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                        </div>
                                        : ''}
                                    {(this.state.AddChild == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Name of child</label>
                                                    <TextField hintText="Enter Your Name of child "
                                                        value={this.state.ChildState1}
                                                        onChange={this.handleChangeChild1.bind(this)}

                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Relationship to Worker</label>
                                                    <TextField hintText="Enter Your Relationship to Worker "
                                                        value={this.state.Relationship1State1}
                                                        onChange={this.handleChangeRelationship11.bind(this)}
                                                        errorText={this.state.isValidRelationship1 ? "Please Enter Your Relationship to Worker" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="Radio_button" >
                                                    <label>Gender</label>
                                                    <RadioButtonGroup valueSelected={this.state.ChildrenGenderState1}
                                                        onChange={this.handleChangeChildrenGender1.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <label>Date of Birth (Month, Day, Year)</label>
                                                    <DatePicker hintText="Enter Data of Birth"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.ChildrenDateofBirthState1}
                                                        onChange={this.handleChangeChildrenDateofBirth1.bind(this)}
                                                        errorText={this.state.isValidChildrenDateofBirth ? "Please Enter Data of Birth " : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="Radio_button" >
                                                    <label>Are there any more children of the worker who are now, or were in the past 12 months, unmarried and under the age of 18 or age 18 and over and a student or disabled?  </label>
                                                    <RadioButtonGroup valueSelected={this.state.AddChild1} onChange={this.handleAddChild1.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                        </div>
                                        : ''}
                                    {(this.state.AddChild1 == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Name of child</label>
                                                    <TextField hintText="Enter Your Name of child "
                                                        value={this.state.ChildState2}
                                                        onChange={this.handleChangeChild2.bind(this)}

                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Relationship to Worker</label>
                                                    <TextField hintText="Enter Your Relationship to Worker "
                                                        value={this.state.Relationship1State2}
                                                        onChange={this.handleChangeRelationship12.bind(this)}
                                                        errorText={this.state.isValidRelationship2 ? "Please Enter Your Relationship to Worker" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="Radio_button" >
                                                    <label>Gender</label>
                                                    <RadioButtonGroup valueSelected={this.state.ChildrenGenderState2}
                                                        onChange={this.handleChangeChildrenGender2.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <label>Date of Birth (Month, Day, Year)</label>
                                                    <DatePicker hintText="Enter Data of Birth"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.ChildrenDateofBirthState2}
                                                        onChange={this.handleChangeChildrenDateofBirth2.bind(this)}
                                                        errorText={this.state.isValidChildrenDateofBirth ? "Please Enter Data of Birth " : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="Radio_button" >
                                                    <label>Are there any more children of the worker who are now, or were in the past 12 months, unmarried and under the age of 18 or age 18 and over and a student or disabled?  </label>
                                                    <RadioButtonGroup valueSelected={this.state.AddChild2} onChange={this.handleAddChild2.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                        </div>
                                        : ''}

                                    {(this.state.AddChild2 == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Name of child</label>
                                                    <TextField hintText="Enter Your Name of child "
                                                        value={this.state.ChildState3}
                                                        onChange={this.handleChangeChild3.bind(this)}

                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Relationship to Worker</label>
                                                    <TextField hintText="Enter Your Relationship to Worker "
                                                        value={this.state.Relationship1State3}
                                                        onChange={this.handleChangeRelationship13.bind(this)}
                                                        errorText={this.state.isValidRelationship3 ? "Please Enter Your Relationship to Worker" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="Radio_button" >
                                                    <label>Gender</label>
                                                    <RadioButtonGroup valueSelected={this.state.ChildrenGenderState3}
                                                        onChange={this.handleChangeChildrenGender3.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <label>Date of Birth (Month, Day, Year)</label>
                                                    <DatePicker hintText="Enter Data of Birth"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.ChildrenDateofBirthState3}
                                                        onChange={this.handleChangeChildrenDateofBirth3.bind(this)}
                                                        errorText={this.state.isValidChildrenDateofBirth ? "Please Enter Data of Birth " : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="Radio_button" >
                                                    <label>Are there any more children of the worker who are now, or were in the past 12 months, unmarried and under the age of 18 or age 18 and over and a student or disabled?  </label>
                                                    <RadioButtonGroup valueSelected={this.state.AddChild3} onChange={this.handleAddChild3.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                        </div>
                                        : ''}
                                    {(this.state.AddChild3 == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Name of child</label>
                                                    <TextField hintText="Enter Your Name of child "
                                                        value={this.state.ChildState4}
                                                        onChange={this.handleChangeChild4.bind(this)}

                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Relationship to Worker</label>
                                                    <TextField hintText="Enter Your Relationship to Worker "
                                                        value={this.state.Relationship1State4}
                                                        onChange={this.handleChangeRelationship14.bind(this)}
                                                        errorText={this.state.isValidRelationship3 ? "Please Enter Your Relationship to Worker" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="Radio_button" >
                                                    <label>Gender</label>
                                                    <RadioButtonGroup valueSelected={this.state.ChildrenGenderState4}
                                                        onChange={this.handleChangeChildrenGender4.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <label>Date of Birth (Month, Day, Year)</label>
                                                    <DatePicker hintText="Enter Data of Birth"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.ChildrenDateofBirthState4}
                                                        onChange={this.handleChangeChildrenDateofBirth4.bind(this)}
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
                                                    <label>Name (including maiden name)</label>
                                                    <TextField hintText="Enter Your Partner Name"
                                                        value={this.state.PartnerState}
                                                        onChange={this.handleChangePartner.bind(this)}
                                                        errorText={this.state.isValidPartner ? "Please enter partner name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Birth (if any) (Month, Day, Year)</label>
                                                    <DatePicker hintText="Enter Data of Birth"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateofBirth5State}
                                                        onChange={this.handleChangePartnerDateofBirth5.bind(this)}
                                                        errorText={this.state.isValidPartnerDateofBirth5 ? "Please select date of divorce" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Marriage (Month, Day, Year)</label>
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
                                                    <label>Date of Divorce (if any) (Month, Day, Year)</label>
                                                    <DatePicker hintText="Enter Data of Divorce"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateofDivorceState}
                                                        onChange={this.handleChangePartnerDateofDivorce.bind(this)}
                                                        errorText={this.state.isValidPartnerDateofDivorce ? "Please select date of divorce" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Country of Citizenship</label>
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
                                                    <label>Social Insurance Number in foreign country</label>
                                                    <TextField hintText="Enter Social Insurance Number "
                                                        value={this.state.SIN4State}
                                                        onChange={this.handleChangeSIN4.bind(this)}
                                                        errorText={this.state.isValidSIN4 ? "Please enter social insurance number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>U. S. Social Security Number (if any)</label>
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
                                                    <label>Name (including maiden name)</label>
                                                    <TextField hintText="Enter Your Partner Name"
                                                        value={this.state.PartnerNameState}
                                                        onChange={this.handleChangePartnerName.bind(this)}
                                                        errorText={this.state.isValidPartnerName ? "Please enter partner name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Birth (Month, Day, Year)</label>
                                                    <DatePicker hintText="Enter Data of Birth"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateofBirth1State}
                                                        onChange={this.handleChangePartnerDateofBirth1.bind(this)}
                                                        errorText={this.state.isValidPartnerDateofBirth1 ? "Please select date of birth" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Marriage (Month, Day, Year)</label>
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
                                                    <label>Date of Divorce (if any) (Month, Day, Year)</label>
                                                    <DatePicker hintText="Enter Data of Divorce"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateofDivorce1State}
                                                        onChange={this.handleChangePartnerDateofDivorce1.bind(this)}
                                                        errorText={this.state.isValidPartnerDateofDivorce1 ? "Please select date of Divorce" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Country of Citizenship</label>
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
                                                    <label>Social Insurance Number in foreign country</label>
                                                    <TextField hintText="Enter Social Insurance Number "
                                                        value={this.state.SIN5State}
                                                        onChange={this.handleChangeSIN5.bind(this)}
                                                        errorText={this.state.isValidSIN5 ? "Please enter social insurance number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>U. S. Social Security Number (if any)</label>
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
                                                    <label>Name (including maiden name)</label>
                                                    <TextField hintText="Enter Your Partner Name"
                                                        value={this.state.PartnerName1State}
                                                        onChange={this.handleChangePartnerName1.bind(this)}
                                                        errorText={this.state.isValidPartnerName1 ? "Please enter your partner name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Birth (Month, Day, Year)</label>
                                                    <DatePicker hintText="Enter Data of Birth"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateofBirth2State}
                                                        onChange={this.handleChangePartnerDateofBirth2.bind(this)}
                                                        errorText={this.state.isValidPartnerDateofBirth2 ? "Please select date of birth" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Marriage (Month, Day, Year)</label>
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
                                                    <label>Date of Divorce (if any) (Month, Day, Year)</label>
                                                    <DatePicker hintText="Enter Data of Divorce"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PartnerDateofDivorce2State}
                                                        onChange={this.handleChangePartnerDateofDivorce2.bind(this)}
                                                        errorText={this.state.isValidPartnerDateofDivorce2 ? "Please select ParnerDateofDivorce2" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Country of Citizenship</label>
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
                                                    <label>Social Insurance Number in foreign country</label>
                                                    <TextField hintText="Enter Social Insurance Number "
                                                        value={this.state.SIN6State}
                                                        onChange={this.handleChangeSIN6.bind(this)}
                                                        errorText={this.state.isValidSIN6 ? "Please enter partner insurance number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>U. S. Social Security Number (if any)</label>
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
                                            <label>Has the worker, or any other person listed on this application, ever previously applied for U.S. Social Security benefits or social insurance benefits from the foreign country <span className="manatoryfield">*</span></label>
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
                                                    <label>Name</label>
                                                    <TextField hintText="Enter Your Name "
                                                        value={this.state.NameSIN2State}
                                                        onChange={this.handleChangeNameSIN2.bind(this)}
                                                        errorText={this.state.isValidNameSIN2 ? "Please enter partner name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Type of benefit (e.g., Retirement)</label>
                                                    <TextField hintText="Enter Your Type of Benefit "
                                                        value={this.state.Benefit1State}
                                                        onChange={this.handleChangeBenefit1.bind(this)}
                                                        errorText={this.state.isValidBenefit1 ? "Please Enter Your Type of Benefit" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Claim Number</label>
                                                    <TextField hintText="Enter Your Claim Number "
                                                        value={this.state.ClaimNumber2State}
                                                        onChange={this.handleChangeClaimNumber2.bind(this)}
                                                        errorText={this.state.isValidClaimNumber2 ? "Please enter claim number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Amount  of  benefit (if  benefit awarded)</label>
                                                    <TextField hintText="Enter Your Amount of Benefit "
                                                        value={this.state.AmountBenefitsState}
                                                        onChange={this.handleChangeAmountBenefits.bind(this)}
                                                        errorText={this.state.isValidAmountBenefits ? "Please Enter Your Amount of Benefit" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Agency which approved or denied claim</label>
                                                    <TextField hintText="Enter Any Agency claim "
                                                        value={this.state.AgencyClaimState}
                                                        onChange={this.handleChangeAgencyClaim.bind(this)}
                                                        errorText={this.state.isValidAgencyClaim ? "Please Agency approved or denied claim" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={12} className="Radio_button" >
                                                    <label> Is there second worker or other person listed on this application, that has ever previously applied for U.S. Social Security benefits or social insurance benefits from this foreign country? </label>
                                                    <RadioButtonGroup valueSelected={this.state.secondWorker} onChange={this.handleSecondWorker.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                        </div>
                                        : ''}
                                    {this.state.secondWorker == "Yes" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Name</label>
                                                    <TextField hintText="Enter Your Name "
                                                        value={this.state.NameSIN2State1}
                                                        onChange={this.handleNameSIN2State1.bind(this)}
                                                        errorText={this.state.isValidNameSIN2 ? "Please enter partner name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Type of benefit (e.g., Retirement)</label>
                                                    <TextField hintText="Enter Your Type of Benefit "
                                                        value={this.state.Benefit1State1}
                                                        onChange={this.handleBenefit1State1.bind(this)}
                                                        errorText={this.state.isValidBenefit1 ? "Please Enter Your Type of Benefit" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Claim Number</label>
                                                    <TextField hintText="Enter Your Claim Number "
                                                        value={this.state.ClaimNumber2State1}
                                                        onChange={this.handleClaimNumber2State1.bind(this)}
                                                        errorText={this.state.isValidClaimNumber2 ? "Please enter claim number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Amount  of  benefit (if  benefit awarded</label>
                                                    <TextField hintText="Enter Your Amount of Benefit "
                                                        value={this.state.AmountBenefitsState1}
                                                        onChange={this.handleAmountBenefitsState1.bind(this)}
                                                        errorText={this.state.isValidAmountBenefits ? "Please Enter Your Amount of Benefit" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Agency which approved or denied claim</label>
                                                    <TextField hintText="Enter Any Agency claim "
                                                        value={this.state.AgencyClaimState1}
                                                        onChange={this.handleAgencyClaimState1.bind(this)}
                                                        errorText={this.state.isValidAgencyClaim ? "Please Agency approved or denied claim" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={12} className="Radio_button" >
                                                    <label> Is there third worker or other person listed on this application, that has ever previously applied for U.S. Social Security benefits or social insurance benefits from this foreign country? </label>
                                                    <RadioButtonGroup valueSelected={this.state.thirdWorker} onChange={this.handleThirdWorker.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                        </div>
                                        : ''}
                                    {this.state.thirdWorker == "Yes" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Name</label>
                                                    <TextField hintText="Enter Your Name "
                                                        value={this.state.NameSIN2State2}
                                                        onChange={this.handleNameSIN2State2.bind(this)}
                                                        errorText={this.state.isValidNameSIN2 ? "Please enter partner name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Type of benefit (e.g., Retirement)</label>
                                                    <TextField hintText="Enter Your Type of Benefit "
                                                        value={this.state.Benefit1State2}
                                                        onChange={this.handleBenefit1State2.bind(this)}
                                                        errorText={this.state.isValidBenefit1 ? "Please Enter Your Type of Benefit" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Claim Number</label>
                                                    <TextField hintText="Enter Your Claim Number "
                                                        value={this.state.ClaimNumber2State2}
                                                        onChange={this.handleClaimNumber2State2.bind(this)}
                                                        errorText={this.state.isValidClaimNumber2 ? "Please enter claim number" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Amount  of  benefit (if  benefit awarded</label>
                                                    <TextField hintText="Enter Your Amount of Benefit "
                                                        value={this.state.AmountBenefitsState2}
                                                        onChange={this.handleAmountBenefitsState2.bind(this)}
                                                        errorText={this.state.isValidAmountBenefits ? "Please Enter Your Amount of Benefit" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Agency which approved or denied claim</label>
                                                    <TextField hintText="Enter Any Agency claim "
                                                        value={this.state.AgencyClaimState2}
                                                        onChange={this.handleAgencyClaimState2.bind(this)}
                                                        errorText={this.state.isValidAgencyClaim ? "Please Agency approved or denied claim" : null}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label>Remarks</label>
                                            <TextField
                                                hintText="Enter Remarks if any!"
                                                multiLine={true}
                                                Value={this.state.RemarkState}
                                                onChange={this.handleChangeRemark.bind(this)}
                                                errorText={this.state.isValidRemark ? "Please Enter the Remark" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>Telephone number (at which you may be contacted during the day)</label>
                                            <TextField hintText="Enter Your Telephone Number"
                                                value={this.state.TelephoneNumberState}
                                                onChange={this.handleChangeTelephoneNumber.bind(this)}
                                            // errorText={this.state.isValidPhoneNum ? "Please Enter Your Telephone Number" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Mailing Address </label>
                                            <Geosuggest placeholder="Current Mailing Address"
                                                initialValue={this.state.CurrentMailingAddress}
                                                onSuggestSelect={this.handleSelectSuggest1.bind(this)}
                                                onChange={this.handleChangeAddressEmployer.bind(this)}
                                                value={this.state.CurrentMailingAddress}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20" />
                                            {/* <span className="validationmsg">{this.state.isValidAddressEmployer ? "Please select Address Of Employer" : null}</span> */}
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} >
                                        <Col xs={12} md={4} className="input-fileds align-fileds" >
                                            <label>City and State</label>
                                            <TextField hintText="Enter Your City and State"
                                                value={this.state.CityState}
                                                onChange={this.handleChangeCityState.bind(this)}
                                            // errorText={this.state.isValidPhoneNum ? "Please Enter Your Telephone Number" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds" >
                                            <label>Zip Code</label>
                                            <TextField hintText="Enter Your Zip Code"
                                                value={this.state.ZipcodeState}
                                                onChange={this.handleChangeZipCode.bind(this)}
                                            // errorText={this.state.isValidPhoneNum ? "Please Enter Your Telephone Number" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds" >
                                            <label>Country<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Country"
                                                value={this.state.CountryinfoState}
                                                onChange={this.handleChangeCountryinfo.bind(this)}
                                                errorText={this.state.isValidCountryinfo ? "Please Enter Your Country" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>

                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Date Signed<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter the Datae"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.DateSigned}
                                                onChange={this.handleDateSigned.bind(this)}
                                                errorText={this.state.isValidWorkedFromDate ? "Please select from date" : null} />
                                        </Col>
                                        <Col xs={12} md={3} />
                                        <Col xs={12} md={3} className="input-fileds Sign">
                                            <label className="LblAlign"> <b>Signature</b></label>
                                            <SignaturePad ref={ref => this.AppSignature = ref} onEnd={this.handleSignatureChange.bind(this)} />
                                            <Button id="clear" className="ClearBtn" onClick={this.handleSignatureClear.bind(this)}>Clear</Button>
                                            <span className="validationmsg">{this.state.isValidSignature ? "Please sign your signature" : ""}</span>
                                        </Col>
                                    </Col>
                                </Col>
                            </Row>
                        </Panel.Body>
                        <Col xs={12} md={12}>
                            <Col xs={12} md={8} className="Checkalign">
                                <Checkbox
                                    label="If you select the check box, Pension Application will be Submitted.You Cannot Edit further . "
                                    disabled={this.state.DisableState}
                                    value={this.state.ischecked}
                                    onClick={this.handleCheck.bind(this)}
                                    style={style.checkbox} />
                            </Col>

                            <Col xs={12} md={4} className="input-fields">
                                <Button disabled={this.state.isEnabled} onClick={(e) => this.handleBenQusdt(this)} className="RQ-Add" >{this.state.BtnNameState}</Button>
                                {/* <Button onClick={this.handleBenQusDatas.bind(this)} className="RQ-Add" >{this.state.BtnNameState}</Button> */}
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
    handleBenQusdt(event) {
        this.handlerSubmit(this);
    }

    handlerSubmit(e) {

        var isValid = this.handleValidateForm(this);
        if (isValid) {
            var EncodedData = '';
            var SignatureBase64 = '';
            var data = this.AppSignature.toDataURL();
            if (data != "") {
                EncodedData = data.split(',');
                SignatureBase64 = EncodedData[1] != "" ? EncodedData[1] : "";
            }
            let query = this.state.BtnNameState === "Save" ? "BenefitsQuestionnariesPart2Save" : "BenefitsQuestionnariesPart2Update";
            let benQuesData = {
                QueryName: query,
                UserID: emailresult,
                BenQusCNIGPAID: this.state.Benefitid,
                BQP2AnsStatus: data != "" ? "C" : "P",
                AppAnsInJsonObj:
                {
                    Name: this.state.FirstNameState + " " + this.state.MiddleNameState + " " + this.state.LastNameState,
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
                    WorkedFromDate1: this.state.WorkedFromDateState1,
                    WorkedToDate1: this.state.WorkedToDateState1,
                    NameEmployer1: this.state.NameEmployerState1,
                    AddressEmployer1: this.state.AddressEmployerState1,
                    Industrylist1: this.state.IndustrylistState1,
                    Social1: this.state.SocialState1,
                    NameAgency1: this.state.NameAgencyState1,
                    WorkedFromDate2: this.state.WorkedFromDateState2,
                    WorkedToDate2: this.state.WorkedToDateState2,
                    NameEmployer2: this.state.NameEmployerState2,
                    AddressEmployer2: this.state.AddressEmployerState2,
                    Industrylist2: this.state.IndustrylistState2,
                    Social2: this.state.SocialState2,
                    NameAgency2: this.state.NameAgencyState2,
                    WorkedFromDate3: this.state.WorkedFromDateState3,
                    WorkedToDate3: this.state.WorkedToDateState3,
                    NameEmployer3: this.state.NameEmployerState3,
                    AddressEmployer3: this.state.AddressEmployerState3,
                    Industrylist3: this.state.IndustrylistState3,
                    Social3: this.state.SocialState3,
                    NameAgency3: this.state.NameAgencyState3,
                    WorkedFromDate4: this.state.WorkedFromDateState4,
                    WorkedToDate4: this.state.WorkedToDateState4,
                    NameEmployer4: this.state.NameEmployerState4,
                    AddressEmployer4: this.state.AddressEmployerState4,
                    Industrylist4: this.state.IndustrylistState14,
                    Social4: this.state.SocialState4,
                    NameAgency4: this.state.NameAgencyState4,
                    WorkedFromDate5: this.state.WorkedFromDateState5,
                    WorkedToDate5: this.state.WorkedToDateState5,
                    NameEmployer5: this.state.NameEmployerState5,
                    AddressEmployer5: this.state.AddressEmployerState5,
                    Industrylist5: this.state.IndustrylistState5,
                    Social5: this.state.SocialState5,
                    NameAgency5: this.state.NameAgencyState5,
                    CoverdFromDate: this.state.CoverdFromDateState,
                    CoverdToDate: this.state.CoverdToDateState,
                    Coverage: this.state.CoverageState,
                    SINState: this.state.SINState,
                    NameAgency1: this.state.NameAgency1State,
                    CoverdFromDate1: this.state.CoverdFromDateState1,
                    CoverdToDate1: this.state.CoverdToDateState1,
                    Coverage1: this.state.CoverageState1,
                    SINState1: this.state.SINState1,
                    NameAgencyCvr1: this.state.NameAgency1State1,
                    CoverdFromDate2: this.state.CoverdFromDateState2,
                    CoverdToDate2: this.state.CoverdToDateState2,
                    Coverage2: this.state.CoverageState2,
                    SINState2: this.state.SINState2,
                    NameAgencyCvr2: this.state.NameAgency1State2,
                    LastWorkingPlaceNameAgency: this.state.LastWorkingPlaceNameAgencyState,
                    ApplyBenefits: this.state.ApplyBenefits,
                    Benefit: this.state.BenefitState,
                    OtherBenefits: this.state.TypeBenefitsState,
                    ReceivingBenefits: this.state.ReceivingState,
                    Receiving1: this.state.Receiving1State,
                    Receiving2: this.state.Receiving2State,
                    Receiving3: this.state.Receiving3State,
                    BirthName: this.state.BirthNameState,
                    Gender: this.state.GenderState,
                    SIN2State: this.state.SIN2State,
                    MotherName: this.state.MotherFirstNameState + " " + this.state.MotherMiddleNameState + " " + this.state.MotherLastNameState,
                    FatherName: this.state.FatherFirstNameState + " " + this.state.FatherMiddleNameState + " " + this.state.FatherLastNameState,
                    MotherFirstName: this.state.MotherFirstNameState,
                    MotherMiddleName: this.state.MotherMiddleNameState,
                    MotherLastName: this.state.MotherLastNameState,
                    FatherFirstName: this.state.FatherFirstNameState,
                    FatherMiddleName: this.state.FatherMiddleNameState,
                    FatherLastName: this.state.FatherLastNameState,
                    NameCountry: this.state.NameCountryState,
                    EligibleSpouse: this.state.EligibleState,
                    IsWorkerClaimingBenefits: this.state.WorkerState,
                    Person: this.state.PersonState,
                    DateRefugee: this.state.DateRefugeeState,
                    Month: this.state.MonthState,
                    Day: this.state.DayState,
                    Year: this.state.YearState,
                    ApplyingForRetirement: this.state.ApplyState,
                    StopWorkMonth: this.state.StopWorkMonthState,
                    StopWorkDay: this.state.StopWorkDayState,
                    StopWorkYear: this.state.StopWorkYearState,
                    Occp: this.state.OccpState,
                    Occupation: this.state.OccupationState,
                    Country: this.state.CountryState,
                    ApplicantName: this.state.FirstName2State + " " +
                        this.state.MiddleName2State + " " + this.state.LastName2State,
                    FirstName2: this.state.FirstName2State,
                    MiddleName2: this.state.MiddleName2State,
                    LastName2: this.state.LastName2State,
                    Relationship: this.state.RelationshipState,
                    SecurityNumber2: this.state.SecurityNumber2State,
                    SIN3State: this.state.SIN3State,
                    WorkerDOB: this.state.AdditionalWorkerMonthState + "-" +
                        this.state.AdditionalWorkerDayState + "-" + this.state.AdditionalWorkerYearState,
                    AdditionalWorkerMonth: this.state.AdditionalWorkerMonthState,
                    AdditionalWorkerDay: this.state.AdditionalWorkerDayState,
                    AdditionalWorkerYear: this.state.AdditionalWorkerYearState,
                    PlaceBirth: this.state.PlaceBirthState,
                    Death: this.state.DeathState,
                    PlaceDeath: this.state.PlaceDeathState,
                    Service: this.state.ServiceState,
                    CountryServed: this.state.CountryServedState,
                    FromService: this.state.MonthServiceState + "-" +
                        this.state.DayServiceState + "-" + this.state.YearServiceState,
                    MonthService: this.state.MonthServiceState,
                    DayService: this.state.DayServiceState,
                    YearService: this.state.YearServiceState,
                    ToService: this.state.MonthServiceState + "-" +
                        this.state.DayServiceState + "-" + this.state.YearServiceState,
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
                    NumberState: this.state.NumberState,
                    NameAddressEmployer: this.state.AddressEmployer2State,
                    WorkBegan: this.state.WorkMonthState + "/" + this.state.WorkYearState,
                    WorkEnd: this.state.EndedMonthState + "/" + this.state.EndedYearState,
                    WorkBeganMonth: this.state.WorkMonthState,
                    WorkBeganYear: this.state.WorkYearState,
                    WorkEndMonth: this.state.EndedMonthState,
                    WorkEndYear: this.state.EndedYearState,
                    NameAddressEmployer1: this.state.AddressEmployer2State1,
                    WorkBegan1: this.state.WorkMonthState1 + "/" + this.state.WorkYearState1,
                    WorkEnd1: this.state.EndedMonthState1 + "/" + this.state.EndedYearState1,
                    WorkBeganMonth1: this.state.WorkMonthState1,
                    WorkBeganYear1: this.state.WorkYearState1,
                    WorkEndMonth1: this.state.EndedMonthState1,
                    WorkEndYear1: this.state.EndedYearState1,
                    NameAddressEmployer2: this.state.AddressEmployer2State2,
                    WorkBegan2: this.state.WorkMonthState2 + "/" + this.state.WorkYearState2,
                    WorkEnd2: this.state.EndedMonthState2 + "/" + this.state.EndedYearState2,
                    WorkBeganMonth2: this.state.WorkMonthState2,
                    WorkBeganYear2: this.state.WorkYearState2,
                    WorkEndMonth2: this.state.EndedMonthState2,
                    WorkEndYear2: this.state.EndedYearState2,
                    Employer: this.state.EmployerState,
                    UnderAge: this.state.UnderAgeState,
                    OverAge: this.state.OverAgeState,
                    ChildName: this.state.ChildState,
                    RelationshipWrk: this.state.Relationship1State,
                    ChildrenGender: this.state.ChildrenGenderState,
                    ChildrenDateofBirth: this.state.ChildrenDateofBirthState,
                    ChildName1: this.state.ChildState1,
                    RelationshipWrk1: this.state.Relationship1State1,
                    ChildrenGender1: this.state.ChildrenGenderState1,
                    ChildrenDateofBirth1: this.state.ChildrenDateofBirthState1,
                    ChildState2: this.state.ChildState2,
                    Relationship1State2: this.state.Relationship1State2,
                    ChildrenGenderState2: this.state.ChildrenGenderState2,
                    ChildrenDateofBirthState2: this.state.ChildrenDateofBirthState2,
                    ChildState3: this.state.ChildState3,
                    Relationship1State3: this.state.Relationship1State3,
                    ChildrenGenderState3: this.state.ChildrenGenderState3,
                    ChildrenDateofBirthState3: this.state.ChildrenDateofBirthState3,
                    ChildState4: this.state.ChildState4,
                    Relationship1State4: this.state.Relationship1State4,
                    ChildrenGenderState4: this.state.ChildrenGenderState4,
                    ChildrenDateofBirthState4: this.state.ChildrenDateofBirthState4,
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
                    SIN5State: this.state.SIN5State,
                    SecurityNumber4: this.state.SecurityNumber4State,
                    Former1: this.state.Former1State,
                    PartnerName1: this.state.PartnerName1State,
                    PartnerDateofBirth2: this.state.PartnerDateofBirth2State,
                    PartnerDateofMarriage2: this.state.PartnerDateofMarriage2State,
                    PartnerDateofDivorce2: this.state.PartnerDateofDivorce2State,
                    Citizenship2: this.state.Citizenship2State,
                    SIN6State: this.state.SIN6State,
                    SecurityNumber5: this.state.SecurityNumber5State,
                    Number1: this.state.Number1State,
                    NameSIN2: this.state.NameSIN2State,
                    Benefit1: this.state.Benefit1State,
                    ClaimNumber2: this.state.ClaimNumber2State,
                    AmountBenefits: this.state.AmountBenefitsState,
                    AgencyClaim: this.state.AgencyClaimState,
                    NameSIN2State1: this.state.NameSIN2State1,
                    Benefit1State1: this.state.Benefit1State1,
                    ClaimNumber2State1: this.state.ClaimNumber2State1,
                    AmountBenefitsState1: this.state.AmountBenefitsState1,
                    AgencyClaimState1: this.state.AgencyClaimState1,
                    NameSIN2State2: this.state.NameSIN2State2,
                    Benefit1State2: this.state.Benefit1State2,
                    ClaimNumber2State2: this.state.ClaimNumber2State2,
                    AmountBenefitsState2: this.state.AmountBenefitsState2,
                    AgencyClaimState2: this.state.AgencyClaimState2,
                    Remark: this.state.RemarkState,
                    DateSigned: this.state.DateSigned,
                    TelephoneNumber: this.state.TelephoneNumberState,
                    CurrentMailingAddress: this.state.CurrentMailingAddress,
                    ZipcodeState: this.state.ZipcodeState,
                    CityState: this.state.CityState,
                    Countryinfo: this.state.CountryinfoState,
                    Signature: SignatureBase64
                },
                CountryCode: "PT",
            }
            let thisObj = this;

            let countryApiUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
            console.log("Data2", JSON.stringify(benQuesData));
            axios({
                method: "POST",
                url: countryApiUrl,
                data: JSON.stringify(benQuesData),

            }).then(({ data }) => {
                notify.show("Your Part2 Information Saved Successfully", "success", 3000);
                thisObj.savePensionForm(this);

            }).catch((err) => {

            });
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }

    // Edit function
    handleBenQusPortugalEdit(event) {
        this.setState({ Benefitid: event })
        var thisObj = this;
        let DataURLPension = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var dataURL = {
            QueryName: "Pensiondata2",
            UserID: emailresult,
            CountryCode: "PT"
        }
        console.log(JSON.stringify(dataURL))
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: DataURLPension,
            data: JSON.stringify(dataURL),
            headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            data.map((item, key) => {
                let JSONData = JSON.parse(item.AppAnsInJsonObj);
                thisObj.setState({ BtnNameState: "Update" });
                thisObj.setState({
                    FirstNameState: JSONData.FirstName,
                    MiddleNameState: JSONData.MiddleName,
                    LastNameState: JSONData.LastName,
                    SecurityNumberState: JSONData.SecurityNumber,
                    WorkedFromDateState: JSONData.WorkedFromDate,
                    WorkedToDateState: JSONData.WorkedToDate,
                    NameEmployerState: JSONData.NameEmployer,
                    AddressEmployerState: JSONData.AddressEmployer,
                    IndustrylistState: JSONData.Industrylist,
                    SocialState: JSONData.Social,
                    NameAgencyState: JSONData.NameAgency,
                    WorkedFromDateState1: JSONData.WorkedFromDate1,
                    WorkedToDateState1: JSONData.WorkedToDate1,
                    NameEmployerState1: JSONData.NameEmployer1,
                    AddressEmployerState1: JSONData.AddressEmployer1,
                    IndustrylistState1: JSONData.Industrylist1,
                    SocialState1: JSONData.Social1,
                    NameAgencyState1: JSONData.NameAgency1,
                    WorkedFromDateState2: JSONData.WorkedFromDate2,
                    WorkedToDateState2: JSONData.WorkedToDate2,
                    NameEmployerState2: JSONData.NameEmployer2,
                    AddressEmployerState2: JSONData.AddressEmployer2,
                    IndustrylistState2: JSONData.Industrylist2,
                    SocialState2: JSONData.Social2,
                    NameAgencyState2: JSONData.NameAgency2,
                    WorkedFromDateState3: JSONData.WorkedFromDate3,
                    WorkedToDateState3: JSONData.WorkedToDate3,
                    NameEmployerState3: JSONData.NameEmployer3,
                    AddressEmployerState3: JSONData.AddressEmployer3,
                    IndustrylistState3: JSONData.Industrylist3,
                    SocialState3: JSONData.Social3,
                    NameAgencyState3: JSONData.NameAgency3,
                    WorkedFromDateState4: JSONData.WorkedFromDate4,
                    WorkedToDateState4: JSONData.WorkedToDate4,
                    NameEmployerState4: JSONData.NameEmployer4,
                    AddressEmployerState4: JSONData.AddressEmployer4,
                    IndustrylistState14: JSONData.Industrylist4,
                    SocialState4: JSONData.Social4,
                    NameAgencyState4: JSONData.NameAgency4,
                    WorkedFromDateState5: JSONData.WorkedFromDate5,
                    WorkedToDateState5: JSONData.WorkedToDate5,
                    NameEmployerState5: JSONData.NameEmployer5,
                    AddressEmployerState5: JSONData.AddressEmployer5,
                    IndustrylistState5: JSONData.Industrylist5,
                    SocialState5: JSONData.Social5,
                    NameAgencyState5: JSONData.NameAgency5,
                    CoverdFromDateState: JSONData.CoverdFromDate,
                    CoverdToDateState: JSONData.CoverdToDate,
                    CoverageState: JSONData.Coverage,
                    SINState: JSONData.SINState,
                    NameAgency1State: JSONData.NameAgency1,
                    CoverdFromDateState1: JSONData.CoverdFromDate1,
                    CoverdToDateState1: JSONData.CoverdToDate1,
                    CoverageState1: JSONData.Coverage1,
                    SINState1: JSONData.SINState1,
                    NameAgency1State1: JSONData.NameAgencyCvr1,
                    CoverdFromDateState2: JSONData.CoverdFromDate2,
                    CoverdToDateState2: JSONData.CoverdToDate2,
                    CoverageState2: JSONData.Coverage2,
                    SINState2: JSONData.SINState2,
                    NameAgency1State2: JSONData.NameAgencyCvr2,
                    LastWorkingPlaceNameAgencyState: JSONData.LastWorkingPlaceNameAgency,
                    ApplyBenefits: JSONData.ApplyBenefits,
                    BenefitState: JSONData.Benefit,
                    TypeBenefitsState: JSONData.OtherBenefits,
                    ReceivingState: JSONData.ReceivingBenefits,
                    Receiving1State: JSONData.Receiving1,
                    Receiving2State: JSONData.Receiving2,
                    Receiving3State: JSONData.Receiving3,
                    BirthNameState: JSONData.BirthName,
                    GenderState: JSONData.Gender,
                    SIN2State: JSONData.SIN2State,
                    MotherFirstNameState: JSONData.MotherFirstName,
                    MotherMiddleNameState: JSONData.MotherMiddleName,
                    MotherLastNameState: JSONData.MotherLastName,
                    FatherFirstNameState: JSONData.FatherFirstName,
                    FatherMiddleNameState: JSONData.FatherMiddleName,
                    FatherLastNameState: JSONData.FatherLastName,
                    NameCountryState: JSONData.NameCountry,
                    EligibleState: JSONData.EligibleSpouse,
                    WorkerState: JSONData.IsWorkerClaimingBenefits,
                    PersonState: JSONData.Person,
                    DateRefugeeState: JSONData.DateRefugee,
                    MonthState: JSONData.Month,
                    DayState: JSONData.Day,
                    YearState: JSONData.Year,
                    ApplyState: JSONData.ApplyingForRetirement,
                    StopWorkMonthState: JSONData.StopWorkMonth,
                    StopWorkDayState: JSONData.StopWorkDay,
                    StopWorkYearState: JSONData.StopWorkYear,
                    OccpState: JSONData.Occp,
                    OccupationState: JSONData.Occupation,
                    CountryState: JSONData.Country,
                    FirstName2State: JSONData.FirstName2,
                    MiddleName2State: JSONData.MiddleName2,
                    LastName2State: JSONData.LastName2,
                    RelationshipState: JSONData.Relationship,
                    SecurityNumber2State: JSONData.SecurityNumber2,
                    SIN3State: JSONData.SIN3State,
                    AdditionalWorkerMonthState: JSONData.AdditionalWorkerMonth,
                    AdditionalWorkerDayState: JSONData.AdditionalWorkerDay,
                    AdditionalWorkerYearState: JSONData.AdditionalWorkerYear,
                    PlaceBirthState: JSONData.PlaceBirth,
                    DeathState: JSONData.Death,
                    PlaceDeathState: JSONData.PlaceDeath,
                    ServiceState: JSONData.Service,
                    CountryServedState: JSONData.CountryServed,
                    MonthServiceState: JSONData.MonthService,
                    DayServiceState: JSONData.DayService,
                    YearServiceState: JSONData.YearService,
                    MonthService1State: JSONData.MonthService1,
                    DayService1State: JSONData.DayService1,
                    YearService1State: JSONData.YearService1,
                    BenefitServiceState: JSONData.BenefitService,
                    RecipientNameState: JSONData.RecipientName,
                    USAgencyState: JSONData.USAgency,
                    ClaimNumberState: JSONData.ClaimNumber,
                    RecipientName1State: JSONData.RecipientName1,
                    USAgency1State: JSONData.USAgency1,
                    ClaimNumber1State: JSONData.ClaimNumber1,
                    NumberState: JSONData.NumberState,
                    AddressEmployer2State: JSONData.NameAddressEmployer,
                    WorkMonthState: JSONData.WorkBeganMonth,
                    WorkYearState: JSONData.WorkBeganYear,
                    EndedMonthState: JSONData.WorkEndMonth,
                    EndedYearState: JSONData.WorkEndYear,
                    AddressEmployer2State1: JSONData.NameAddressEmployer1,
                    WorkMonthState1: JSONData.WorkBeganMonth1,
                    WorkYearState1: JSONData.WorkBeganYear1,
                    EndedMonthState1: JSONData.WorkEndMonth1,
                    EndedYearState1: JSONData.WorkEndYear1,
                    AddressEmployer2State2: JSONData.NameAddressEmployer2,
                    WorkMonthState2: JSONData.WorkBeganMonth2,
                    WorkYearState2: JSONData.WorkBeganYear2,
                    EndedMonthState2: JSONData.WorkEndMonth2,
                    EndedYearState2: JSONData.WorkEndYear2,
                    EmployerState: JSONData.Employer,
                    UnderAgeState: JSONData.UnderAge,
                    OverAgeState: JSONData.OverAge,
                    ChildState: JSONData.ChildName,
                    Relationship1State: JSONData.RelationshipWrk,
                    ChildrenGenderState: JSONData.ChildrenGender,
                    ChildrenDateofBirthState: JSONData.ChildrenDateofBirth,
                    ChildState1: JSONData.ChildName1,
                    Relationship1State1: JSONData.RelationshipWrk1,
                    ChildrenGenderState1: JSONData.ChildrenGender1,
                    ChildrenDateofBirthState1: JSONData.ChildrenDateofBirth1,
                    ChildState2: JSONData.ChildState2,
                    Relationship1State2: JSONData.Relationship1State2,
                    ChildrenGenderState2: JSONData.ChildrenGenderState2,
                    ChildrenDateofBirthState2: JSONData.ChildrenDateofBirthState2,
                    ChildState3: JSONData.ChildState3,
                    Relationship1State3: JSONData.Relationship1State3,
                    ChildrenGenderState3: JSONData.ChildrenGenderState3,
                    ChildrenDateofBirthState3: JSONData.ChildrenDateofBirthState3,
                    ChildState4: JSONData.ChildState4,
                    Relationship1State4: JSONData.Relationship1State4,
                    ChildrenGenderState4: JSONData.ChildrenGenderState4,
                    ChildrenDateofBirthState4: JSONData.ChildrenDateofBirthState4,
                    PartnerState: JSONData.Partner,
                    PartnerDateofBirthState: JSONData.PartnerDateofBirth,
                    PartnerDateMarriageState: JSONData.PartnerDateMarriage,
                    PartnerDateofDivorceState: JSONData.PartnerDateofDivorce,
                    CitizenshipState: JSONData.Citizenship,
                    SIN4State: JSONData.SIN4State,
                    SecurityNumber3State: JSONData.SecurityNumber3,
                    FormerState: JSONData.Former,
                    PartnerNameState: JSONData.PartnerName,
                    PartnerDateofBirth1State: JSONData.PartnerDateofBirth1,
                    PartnerDateMarriage1State: JSONData.PartnerDateMarriage1,
                    PartnerDateofDivorce1State: JSONData.PartnerDateofDivorce1,
                    Citizenship1State: JSONData.Citizenship1,
                    SIN5State: JSONData.SIN5State,
                    SecurityNumber4State: JSONData.SecurityNumber4,
                    Former1State: JSONData.Former1,
                    PartnerName1State: JSONData.PartnerName1,
                    PartnerDateofBirth2State: JSONData.PartnerDateofBirth2,
                    PartnerDateofMarriage2State: JSONData.PartnerDateofMarriage2,
                    PartnerDateofDivorce2State: JSONData.PartnerDateofDivorce2,
                    Citizenship2State: JSONData.Citizenship2,
                    SIN6State: JSONData.SIN6State
                    ,
                    SecurityNumber5State: JSONData.SecurityNumber5,
                    Number1State: JSONData.Number1,
                    NameSIN2State: JSONData.NameSIN2,
                    Benefit1State: JSONData.Benefit1,
                    ClaimNumber2State: JSONData.ClaimNumber2,
                    AmountBenefitsState: JSONData.AmountBenefits,
                    AgencyClaimState: JSONData.AgencyClaim,
                    NameSIN2State1: JSONData.NameSIN2State1,
                    Benefit1State1: JSONData.Benefit1State1,
                    ClaimNumber2State1: JSONData.ClaimNumber2State1,
                    AmountBenefitsState1: JSONData.AmountBenefitsState1,
                    AgencyClaimState1: JSONData.AgencyClaimState1,
                    NameSIN2State2: JSONData.NameSIN2State2,
                    Benefit1State2: JSONData.Benefit1State2,
                    ClaimNumber2State2: JSONData.ClaimNumber2State2,
                    AmountBenefitsState2: JSONData.AmountBenefitsState2,
                    AgencyClaimState2: JSONData.AgencyClaimState2,
                    RemarkState: JSONData.Remark,
                    DateSigned: JSONData.DateSigned,
                    TelephoneNumberState: JSONData.TelephoneNumber,
                    CurrentMailingAddress: JSONData.CurrentMailingAddress,
                    ZipcodeState: JSONData.ZipcodeState,
                    CityState: JSONData.CityState,
                    CountryinfoState: JSONData.Countryinfo,
                });
            }
            );
        }).catch((err) => {
            console.log(err);
        });
    }

    savePensionForm(event) {
        let bilateralInput = {
            UserID: emailresult,
            QueryName: "Pensiondata2",
            CountryCode: "PT"
        }
        let BilateralFormDataSourceUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BilateralFormUrl = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";
        SaveDataAPICallMailSend(BilateralFormDataSourceUrl, bilateralInput)
            .then((data) => {
                console.log(typeof (data));
                let biltrlData = JSON.parse(data[0].AppAnsInJsonObj);
                let BenefitStateRetirementChkYes = "No";
                let BenefitStatePreviousChkYes = "No";
                let BenefitStateSurvivorsChkYes = "No";
                let BenefitStateOtherChkYes = "No";

                switch (biltrlData.Benefit) {
                    case "RetirementBenefits":
                        BenefitStateRetirementChkYes = "Yes";
                        break;
                    case "PreviousEmployerBenefits":
                        BenefitStatePreviousChkYes = "Yes";
                        break;
                    case "SurvivorBenefits":
                        BenefitStateSurvivorsChkYes = "Yes";
                        break;
                    case "Other":
                        BenefitStateOtherChkYes = "Yes";
                        break;
                    default:
                        break;
                }

                let GenderStateChkMale = "No";
                let GenderStateChkFemale = "No";

                if (biltrlData.Gender == "M") {
                    GenderStateChkMale = "Yes";
                } else {
                    GenderStateChkFemale = "Yes";
                }


                let ReceivingBenefitsChkYes = "No";
                let ReceivingBenefitsChkNo = "No";
                if (biltrlData.ReceivingBenefits == "Yes") {
                    ReceivingBenefitsChkYes = "Yes";
                } else {
                    ReceivingBenefitsChkNo = "Yes";
                }

                let Receiving1ChkYes = "No"
                let Receiving1ChkNo = -"No"
                if (biltrlData.Receiving1) {
                    Receiving1ChkYes = "Yes"
                } else {
                    Receiving1ChkNo = "Yes"
                }
                let Receiving2ChkYes = "No"
                let Receiving2ChkNo = -"No"
                if (biltrlData.Receiving2) {
                    Receiving2ChkYes = "Yes"
                } else {
                    Receiving2ChkNo = "Yes"
                }

                let ReceivingRetirementYes = "No";
                let ReceivingDisabilityYes = "No";
                let ReceivingSurvivorsYes = "No";
                switch (biltrlData.Receiving3) {
                    case "Retirement/Old-Age":
                        ReceivingRetirementYes = "Yes";
                        break;
                    case "Disability":
                        ReceivingDisabilityYes = "Yes";
                        break;
                    case "Survivors":
                        ReceivingSurvivorsYes = "Yes";
                        break;
                    // case "Other":
                    //     Survivors = "Yes";
                    //     break;
                    default:
                        break;
                }

                let EligibleSpouseChkYes = "No";
                let EligibleSpouseChkNo = "No";
                if (biltrlData.EligibleSpouse == "Yes") {
                    EligibleSpouseChkYes = "Yes";
                } else {
                    EligibleSpouseChkNo = "Yes";
                }

                let IsWorkerClaimingBenefitsChkYes = "No";
                let IsWorkerClaimingBenefitsChkNo = "No";
                if (biltrlData.IsWorkerClaimingBenefits == "Yes") {
                    IsWorkerClaimingBenefitsChkYes = "Yes";
                } else {
                    IsWorkerClaimingBenefitsChkNo = "Yes";
                }

                let ApplyingForRetirementChkYes = "No";
                let ApplyingForRetirementChkNo = "No";
                if (biltrlData.ApplyingForRetirement == "Yes") {
                    ApplyingForRetirementChkYes = "Yes";
                } else {
                    ApplyingForRetirementChkNo = "Yes";
                }

                let OccpChkYes = "No";
                let OccpChkNo = "No";
                if (biltrlData.Occp == "Yes") {
                    OccpChkYes = "Yes";
                } else {
                    OccpChkNo = "Yes";
                }

                let CountryChkYes = "No";
                let CountryChkNo = "No";
                if (biltrlData.Country == "Yes") {
                    CountryChkYes = "Yes";
                } else {
                    CountryChkNo = "Yes";
                }
                let ServiceChkYes = "No";
                let ServiceChkNo = "No";
                if (biltrlData.Service == "Yes") {
                    ServiceChkYes = "Yes";
                } else {
                    ServiceChkNo = "Yes";
                }
                let BenefitServiceChkYes = "No";
                let BenefitServiceChkNo = "No";
                if (biltrlData.BenefitService == "Yes") {
                    BenefitServiceChkYes = "Yes";
                } else {
                    BenefitServiceChkNo = "Yes";
                }
                let Number1ChkNo = "No";
                let Number1ChkYes = "No";
                if (biltrlData.Number1 == "Yes") {
                    Number1ChkNo = "Yes";
                } else {
                    Number1ChkYes = "Yes";
                }
                let EmployerChkYes = "No";
                let EmployerChkNo = "No";

                if (biltrlData.Employer == "Yes") {
                    EmployerChkYes = "Yes";
                } else {
                    EmployerChkNo = "Yes";
                }
                let UnderAgeChkYes = "No";
                let UnderAgeChkNo = "No";

                if (biltrlData.UnderAge == "Yes") {
                    UnderAgeChkYes = "Yes";
                } else {
                    UnderAgeChkNo = "Yes";
                }
                let OverAgeChkYes = "No";
                let OverAgeChkNo = "No";

                if (biltrlData.OverAge == "Yes") {
                    OverAgeChkYes = "Yes";
                } else {
                    OverAgeChkNo = "Yes";
                }

                let bilateralInputDataObj = {
                    "html": "This is test Data",
                    "language": "en",
                    "DocCategory": "biltrl",
                    "params": {
                        "empId": emailresult,//"spurthi.n@mitosistech.com",
                        "pensionData": {
                            "FirstName": [biltrlData.FirstName],
                            "MiddleName": [biltrlData.MiddleName],
                            "LastName": [biltrlData.LastName],
                            "SecurityNumber": [biltrlData.SecurityNumber],
                            "WorkedFromDate": [biltrlData.WorkedFromDate],
                            "WorkedToDate": [biltrlData.WorkedToDate],
                            "NameEmployer": [biltrlData.NameEmployer],
                            "AddressEmployer": [biltrlData.AddressEmployer],
                            "Industrylist": [biltrlData.Industrylist],
                            "Social": [biltrlData.Social],
                            "NameAgency": [biltrlData.NameAgency],
                            "WorkedFromDate1": [biltrlData.WorkedFromDate1],
                            "WorkedToDate1": [biltrlData.WorkedToDate1],
                            "NameEmployer1": [biltrlData.NameEmployer1],
                            "AddressEmployer1": [biltrlData.AddressEmployer1],
                            "Industrylist1": [biltrlData.Industrylist1],
                            "Social1": [biltrlData.Social1],
                            "NameAgency1": [biltrlData.NameAgency1],
                            "WorkedFromDate2": [biltrlData.WorkedFromDate2],
                            "WorkedToDate2": [biltrlData.WorkedToDate2],
                            "NameEmployer2": [biltrlData.NameEmployer2],
                            "AddressEmployer2": [biltrlData.AddressEmployer2],
                            "Industrylist2": [biltrlData.Industrylist2],
                            "Social2": [biltrlData.Social2],
                            "NameAgency2": [biltrlData.NameAgency2],
                            "WorkedFromDate3": [biltrlData.WorkedFromDate3],
                            "WorkedToDate3": [biltrlData.WorkedToDate3],
                            "NameEmployer3": [biltrlData.NameEmployer3],
                            "AddressEmployer3": [biltrlData.AddressEmployer3],
                            "Industrylist3": [biltrlData.Industrylist3],
                            "Social3": [biltrlData.Social3],
                            "NameAgency3": [biltrlData.NameAgency3],
                            "WorkedFromDate4": [biltrlData.WorkedFromDate4],
                            "WorkedToDate4": [biltrlData.WorkedToDate4],
                            "NameEmployer4": [biltrlData.NameEmployer4],
                            "AddressEmployer4": [biltrlData.AddressEmployer4],
                            "Industrylist4": [biltrlData.Industrylist4],
                            "Social4": [biltrlData.Social4],
                            "NameAgency4": [biltrlData.NameAgency4],
                            "WorkedFromDate5": [biltrlData.WorkedFromDate5],
                            "WorkedToDate5": [biltrlData.WorkedToDate5],
                            "NameEmployer5": [biltrlData.NameEmployer5],
                            "AddressEmployer5": [biltrlData.AddressEmployer5],
                            "Industrylist5": [biltrlData.Industrylist5],
                            "Social5": [biltrlData.Social5],
                            "NameAgency5": [biltrlData.NameAgency5],
                            "WorkedFromDate6": [biltrlData.WorkedFromDate],
                            "WorkedToDate6": [biltrlData.WorkedToDate],
                            "NameEmployer6": [biltrlData.NameEmployer],
                            "AddressEmployer6": [biltrlData.AddressEmployer],
                            "Industrylist6": [biltrlData.Industrylist],
                            "Social6": [biltrlData.Social],
                            "NameAgency6": [biltrlData.NameAgency],
                            "WorkedFromDate7": [biltrlData.WorkedFromDate1],
                            "WorkedToDate7": [biltrlData.WorkedToDate1],
                            "NameEmployer7": [biltrlData.NameEmployer1],
                            "AddressEmployer7": [biltrlData.AddressEmployer1],
                            "Industrylist7": [biltrlData.Industrylist1],
                            "Social7": [biltrlData.Social1],
                            "NameAgency7": [biltrlData.NameAgency1],
                            "WorkedFromDate8": [biltrlData.WorkedFromDate2],
                            "WorkedToDate8": [biltrlData.WorkedToDate2],
                            "NameEmployer8": [biltrlData.NameEmployer2],
                            "AddressEmployer8": [biltrlData.AddressEmployer2],
                            "Industrylist8": [biltrlData.Industrylist2],
                            "Social8": [biltrlData.Social2],
                            "NameAgency8": [biltrlData.NameAgency2],
                            "WorkedFromDate9": [biltrlData.WorkedFromDate3],
                            "WorkedToDate9": [biltrlData.WorkedToDate3],
                            "NameEmployer9": [biltrlData.NameEmployer3],
                            "AddressEmployer9": [biltrlData.AddressEmployer3],
                            "Industrylist9": [biltrlData.Industrylist3],
                            "Social9": [biltrlData.Social3],
                            "NameAgency9": [biltrlData.NameAgency3],
                            "WorkedFromDate10": [biltrlData.WorkedFromDate4],
                            "WorkedToDate10": [biltrlData.WorkedToDate4],
                            "NameEmployer10": [biltrlData.NameEmployer4],
                            "AddressEmployer10": [biltrlData.AddressEmployer4],
                            "Industrylist10": [biltrlData.Industrylist4],
                            "Social10": [biltrlData.Social4],
                            "NameAgency10": [biltrlData.NameAgency4],
                            "WorkedFromDate11": [biltrlData.WorkedFromDate5],
                            "WorkedToDate11": [biltrlData.WorkedToDate5],
                            "NameEmployer11": [biltrlData.NameEmployer5],
                            "AddressEmployer11": [biltrlData.AddressEmployer5],
                            "Industrylist11": [biltrlData.Industrylist5],
                            "Social11": [biltrlData.Social5],
                            "NameAgency11": [biltrlData.NameAgency5],
                            "CoverdFromDate": [biltrlData.CoverdFromDate],
                            "CoverdToDate": [biltrlData.CoverdToDate],
                            "Coverage": [biltrlData.Coverage],
                            "SINState": [biltrlData.SINState],
                            "NameAgencyCvr0": [biltrlData.NameAgency1],
                            "CoverdFromDate1": [biltrlData.CoverdFromDate1],
                            "CoverdToDate1": [biltrlData.CoverdToDate1],
                            "Coverage1": [biltrlData.Coverage1],
                            "SINState1": [biltrlData.SINState1],
                            "NameAgencyCvr1": [biltrlData.NameAgencyCvr1],
                            "CoverdFromDate2": [biltrlData.CoverdFromDate2],
                            "CoverdToDate2": [biltrlData.CoverdToDate2],
                            "Coverage2": [biltrlData.Coverage2],
                            "SINState2": [biltrlData.SINState2],
                            "NameAgencyCvr2": [biltrlData.NameAgencyCvr2],
                            "CoverdFromDate3": [biltrlData.CoverdFromDate],
                            "CoverdToDate3": [biltrlData.CoverdToDate],
                            "Coverage3": [biltrlData.Coverage],
                            "SINState3": [biltrlData.SINState3],
                            "NameAgencyCvr3": [biltrlData.NameAgency1],
                            "CoverdFromDate4": [biltrlData.CoverdFromDate1],
                            "CoverdToDate4": [biltrlData.CoverdToDate1],
                            "Coverage4": [biltrlData.Coverage1],
                            "SINState4": [biltrlData.SINState4],
                            "NameAgencyCvr4": [biltrlData.NameAgencyCvr1],
                            "CoverdFromDate5": [biltrlData.CoverdFromDate2],
                            "CoverdToDate5": [biltrlData.CoverdToDate2],
                            "Coverage5": [biltrlData.Coverage2],
                            "SINState5": [biltrlData.SINState5],
                            "NameAgencyCvr5": [biltrlData.NameAgencyCvr2],
                            "LastWorkingPlaceNameAgency": [biltrlData.LastWorkingPlaceNameAgency],

                            "ApplyBenefits": [biltrlData.ApplyBenefits],
                            "Benefit": [biltrlData.Benefit],
                            "BenefitStateRetirementChkYes": [BenefitStateRetirementChkYes],
                            "BenefitStatePreviousChkYes": [BenefitStatePreviousChkYes],
                            "BenefitStateSurvivorsChkYes": [BenefitStateSurvivorsChkYes],
                            "BenefitStateOtherChkYes": [BenefitStateOtherChkYes],
                            "OtherBenefits": [biltrlData.OtherBenefits],
                            "ReceivingBenefits": [biltrlData.ReceivingBenefits],
                            "ReceivingBenefitsChkNo": [ReceivingBenefitsChkNo],
                            "ReceivingBenefitsChkYes": [ReceivingBenefitsChkNo],
                            "Receiving1": [biltrlData.Receiving1],
                            "Receiving1ChkYes": [Receiving1ChkYes],
                            "Receiving1ChkNo": [Receiving1ChkNo],
                            "Receiving2": [biltrlData.Receiving2],
                            "Receiving2ChkYes": [Receiving2ChkYes],
                            "Receiving2ChkNo": [Receiving2ChkNo],
                            "Receiving3": [biltrlData.Receiving3],
                            "ReceivingRetirementYes": [ReceivingRetirementYes],
                            "ReceivingDisabilityYes": [ReceivingDisabilityYes],
                            "ReceivingSurvivorsYes": [ReceivingSurvivorsYes],

                            "BirthName": [biltrlData.BirthName],
                            "Gender": [biltrlData.Gender],
                            "GenderStateChkMale": [GenderStateChkMale],
                            "GenderStateChkFemale": [GenderStateChkFemale],
                            //Rename Sin
                            "SIN2": [biltrlData.SIN2],
                            "MotherFirstName": [biltrlData.MotherFirstName],
                            "MotherMiddleName": [biltrlData.MotherMiddleName],
                            "MotherLastName": [biltrlData.MotherLastName],
                            "FatherFirstName": [biltrlData.FatherFirstName],
                            "FatherMiddleName": [biltrlData.FatherMiddleName],
                            "FatherLastName": [biltrlData.FatherLastName],
                            "NameCountry": [biltrlData.NameCountry],
                            "EligibleSpouse": [biltrlData.EligibleSpouse],
                            "EligibleSpouseChkYes": [EligibleSpouseChkYes],
                            "EligibleSpouseChkNo": [EligibleSpouseChkNo],
                            "IsWorkerClaimingBenefits": [biltrlData.IsWorkerClaimingBenefits],
                            "IsWorkerClaimingBenefitsChkYes": [IsWorkerClaimingBenefitsChkYes],
                            "IsWorkerClaimingBenefitsChkNo": [IsWorkerClaimingBenefitsChkNo],
                            "Person": [biltrlData.Person],
                            "DateRefugee": [biltrlData.DateRefugee],
                            "SickDate": [biltrlData.Month + "-" + biltrlData.Day + "-" + biltrlData.Year],
                            "Month": [biltrlData.Month],
                            "Day": [biltrlData.Day],
                            "Year": [biltrlData.Year],
                            "ApplyingForRetirement": [biltrlData.ApplyingForRetirement],
                            "ApplyingForRetirementChkYes": [ApplyingForRetirementChkYes],
                            "ApplyingForRetirementChkNo": [ApplyingForRetirementChkNo],
                            "WorkStopped": [biltrlData.StopWorkMonth + "-" + biltrlData.StopWorkDay + "-" + biltrlData.StopWorkYear],
                            "StopWorkMonth": [biltrlData.StopWorkMonth],
                            "StopWorkDay": [biltrlData.StopWorkDay],
                            "StopWorkYear": [biltrlData.StopWorkYear],
                            "Occp": [biltrlData.Occp],
                            "OccpChkYes": [OccpChkYes],
                            "OccpChkNo": [OccpChkNo],
                            "Occupation": [biltrlData.Occupation],
                            "Country": [biltrlData.Country],
                            "CountryChkYes": [CountryChkYes],
                            "CountryChkNo": [CountryChkNo],
                            "FirstName2": [biltrlData.FirstName2],
                            "MiddleName2": [biltrlData.MiddleName2],
                            "LastName2": [biltrlData.LastName2],
                            "Relationship": [biltrlData.Relationship],
                            "SecurityNumber2": [biltrlData.SecurityNumber2],
                            "SIN3": [biltrlData.SIN3],
                            "AdditionalWorkerMonth": [biltrlData.AdditionalWorkerMonth],
                            "AdditionalWorkerDay": [biltrlData.AdditionalWorkerDay],
                            "AdditionalWorkerYear": [biltrlData.AdditionalWorkerYear],
                            "PlaceBirth": [biltrlData.PlaceBirth],
                            "Death": [biltrlData.Death],
                            "PlaceDeath": [biltrlData.PlaceDeath],
                            "Service": [biltrlData.Service],
                            "ServiceChkYes": [ServiceChkYes],
                            "ServiceChkNo": [ServiceChkNo],
                            "CountryServed": [biltrlData.CountryServed],
                            "MonthService": [biltrlData.MonthService],
                            "DayService": [biltrlData.DayService],
                            "YearService": [biltrlData.YearService],
                            "MonthService1": [biltrlData.MonthService1],
                            "DayService1": [biltrlData.DayService1],
                            "YearService1": [biltrlData.YearService1],
                            "BenefitService": [biltrlData.BenefitService],
                            "BenefitServiceChkYes": [BenefitServiceChkYes],
                            "BenefitServiceChkNo": [BenefitServiceChkNo],
                            "RecipientName": [biltrlData.RecipientName],
                            "USAgency": [biltrlData.USAgency],
                            "ClaimNumber": [biltrlData.ClaimNumber],
                            "RecipientName1": [biltrlData.RecipientName1],
                            "USAgency1": [biltrlData.USAgency1],
                            "ClaimNumber1": [biltrlData.ClaimNumber1],
                            "NameAddressEmployer": [biltrlData.NameAddressEmployer],
                            "WorkBeganMonth": [biltrlData.WorkBeganMonth],
                            "WorkBeganYear": [biltrlData.WorkBeganYear],
                            "WorkEndMonth": [biltrlData.WorkEndMonth],
                            "WorkEndYear": [biltrlData.WorkEndYear],
                            "NameAddressEmployer1": [biltrlData.NameAddressEmployer1],
                            "WorkBeganMonth1": [biltrlData.WorkBeganMonth1],
                            "WorkBeganYear1": [biltrlData.WorkBeganYear1],
                            "WorkEndMonth1": [biltrlData.WorkEndMonth1],
                            "WorkEndYear1": [biltrlData.WorkEndYear1],
                            "NameAddressEmployer2": [biltrlData.NameAddressEmployer2],
                            "WorkBeganMonth2": [biltrlData.WorkBeganMonth2],
                            "WorkBeganYear2": [biltrlData.WorkBeganYear2],
                            "WorkEndMonth2": [biltrlData.WorkEndMonth2],
                            "WorkEndYear2": [biltrlData.WorkEndYear2],
                            "Employer": [biltrlData.Employer],
                            "EmployerChkYes": [EmployerChkYes],
                            "EmployerChkNo": [EmployerChkNo],
                            "UnderAge": [biltrlData.UnderAge],
                            "UnderAgeChkYes": [UnderAgeChkYes],
                            "UnderAgeChkNo": [UnderAgeChkNo],
                            "OverAge": [biltrlData.OverAge],
                            "OverAgeChkYes": [OverAgeChkYes],
                            "OverAgeChkNo": [OverAgeChkNo],
                            "ChildName": [biltrlData.ChildName],
                            "RelationshipWrk": [biltrlData.RelationshipWrk],
                            "ChildrenGender": [biltrlData.ChildrenGender],
                            "ChildrenDateofBirth": [biltrlData.ChildrenDateofBirth],
                            "ChildName1": [biltrlData.ChildName1],
                            "RelationshipWrk1": [biltrlData.RelationshipWrk1],
                            "ChildrenGender1": [biltrlData.ChildrenGender1],
                            "ChildrenDateofBirth1": [biltrlData.ChildrenDateofBirth1],
                            "ChildState2": [biltrlData.ChildState2],
                            "Relationship1State2": [biltrlData.Relationship1State2],
                            "ChildrenGenderState2": [biltrlData.ChildrenGenderState2],
                            "ChildrenDateofBirthState2": [biltrlData.ChildrenDateofBirthState2],
                            "ChildState3": [biltrlData.ChildState3],
                            "Relationship1State3": [biltrlData.Relationship1State3],
                            "ChildrenGenderState3": [biltrlData.ChildrenGenderState3],
                            "ChildrenDateofBirthState3": [biltrlData.ChildrenDateofBirthState3],
                            "ChildState4": [biltrlData.ChildState4],
                            "Relationship1State4": [biltrlData.Relationship1State4],
                            "ChildrenGenderState4": [biltrlData.ChildrenGenderState4],
                            "ChildrenDateofBirthState4": [biltrlData.ChildrenDateofBirthState4],
                            "Partner": [biltrlData.Partner],
                            "PartnerDateofBirth": [biltrlData.PartnerDateofBirth],
                            "PartnerDateMarriage": [biltrlData.PartnerDateMarriage],
                            "PartnerDateofDivorce": [biltrlData.PartnerDateofDivorce],
                            "Citizenship": [biltrlData.Citizenship],
                            "SIN4": [biltrlData.SIN4],
                            "SecurityNumber3": [biltrlData.SecurityNumber3],
                            "Former": [biltrlData.Former],
                            "PartnerName": [biltrlData.PartnerName],
                            "PartnerDateofBirth1": [biltrlData.PartnerDateofBirth1],
                            "PartnerDateMarriage1": [biltrlData.PartnerDateMarriage1],
                            "PartnerDateofDivorce1": [biltrlData.PartnerDateofDivorce1],
                            "Citizenship1": [biltrlData.Citizenship1],
                            "SIN5": [biltrlData.SIN5],
                            "SecurityNumber4": [biltrlData.SecurityNumber4],
                            "Former1": [biltrlData.Former1],
                            "PartnerName1": [biltrlData.PartnerName1],
                            "PartnerDateofBirth2": [biltrlData.PartnerDateofBirth2],
                            "PartnerDateofMarriage2": [biltrlData.PartnerDateofMarriage2],
                            "PartnerDateofDivorce2": [biltrlData.PartnerDateofDivorce2],
                            "Citizenship2": [biltrlData.Citizenship2],
                            "SIN6": [biltrlData.SIN6],
                            "SecurityNumber5": [biltrlData.SecurityNumber5],
                            "Number1": [biltrlData.Number1],
                            "Number1ChkYes": [Number1ChkYes],
                            "Number1ChkNo": [Number1ChkNo],
                            "NameSIN2": [biltrlData.NameSIN2],
                            "Benefit1": [biltrlData.Benefit1],
                            "ClaimNumber2": [biltrlData.ClaimNumber2],
                            "AmountBenefits": [biltrlData.AmountBenefits],
                            "AgencyClaim": [biltrlData.AgencyClaim],
                            "NameSIN2State1": [biltrlData.NameSIN2State1],
                            "Benefit1State1": [biltrlData.Benefit1State1],
                            "ClaimNumber2State1": [biltrlData.ClaimNumber2State1],
                            "AmountBenefitsState1": [biltrlData.AmountBenefitsState1],
                            "AgencyClaimState1": [biltrlData.AgencyClaimState1],
                            "NameSIN2State2": [biltrlData.NameSIN2State2],
                            "Benefit1State2": [biltrlData.Benefit1State2],
                            "ClaimNumber2State2": [biltrlData.ClaimNumber2State2],
                            "AmountBenefitsState2": [biltrlData.AmountBenefitsState2],
                            "AgencyClaimState2": [biltrlData.AgencyClaimState2],
                            "Remark": [biltrlData.Remark],
                            "DateSigned": [biltrlData.DateSigned],
                            "TelephoneNumber": [biltrlData.TelephoneNumber],
                            "CurrentMailingAddress": [biltrlData.CurrentMailingAddress],
                            "ZipcodeState": [biltrlData.ZipcodeState],
                            "CityState": [biltrlData.CityState],
                            "Countryinfo": [biltrlData.Countryinfo],
                            "Name": [biltrlData.FirstName + " " + biltrlData.MiddleName + " " + biltrlData.LastName],
                            "MotherName": [biltrlData.MotherFirstName + " " + biltrlData.MotherMiddleName + " " + biltrlData.MotherLastName],
                            "FatherName": [biltrlData.FatherFirstName + " " + biltrlData.FatherMiddleName + " " + biltrlData.FatherLastName],
                            "ApplicantName": [biltrlData.FirstName2 + " " + biltrlData.MiddleName2 + " " + biltrlData.LastName2],
                            "WorkerDOB": [biltrlData.AdditionalWorkerMonth + "-" + biltrlData.AdditionalWorkerDay + "-" + biltrlData.AdditionalWorkerYear],
                            "FromService": [biltrlData.MonthService + "-" + biltrlData.DayService + "-" + biltrlData.YearService],
                            "ToService": [biltrlData.MonthService1 + "-" + biltrlData.DayService1 + "-" + biltrlData.YearService1],
                            "WorkBegan": [biltrlData.WorkMonth + "/" + biltrlData.WorkYear],
                            "WorkEnd": [biltrlData.EndedMonth + "/" + biltrlData.EndedYear],
                            "WorkBegan1": [biltrlData.WorkMonth1 + "/" + biltrlData.WorkYear1],
                            "WorkEnd1": [biltrlData.EndedMonth1 + "/" + biltrlData.EndedYear1],
                            "WorkBegan2": [biltrlData.WorkMonth2 + "/" + biltrlData.WorkYear2],
                            "WorkEnd2": [biltrlData.EndedMonth2 + "/" + biltrlData.EndedYear2]
                        }
                    }
                };
                SaveDataAPICallMailSend(BilateralFormUrl, bilateralInputDataObj)
                    .then((data) => {
                        console.log("Bilateral Form saved in s3 buckets", data);
                        notify.show("Bilateral  form successfully Generated", "success", 3000);
                        this.handlePensionDocId(this);
                    }).catch((err) => {
                        console.log("error sending email");
                    });
            }).catch((err) => {
                console.log(err);
            });
    }
    handlePensionDocId(e) {
        let Docurl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DocIDData = {
            QueryName: "PortugalPensionForm",
            UserID: emailresult,
        };
        SaveDataAPICallMailSend(Docurl, DocIDData)
            .then((data) => {
                console.log("Successfully generated document ID", data);
                this.handleAppDocTrackEntry(data[0].PortugalPensionEmpID, data[0].DocumentID);
            }).catch((err) => {
                console.log(err);
            });
    }

    handleAppDocTrackEntry(PortugalPensionID, DocID) {
        let Docurl = " https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DocIDData = {
            QueryName: "PensionFormAppDocTrackingInsert",
            UserID: emailresult,//"spurthi.n@mitosistech.com",            
            DocumentID: DocID,
            DocumentCode: PortugalPensionID,
            CountryCode: "PT",//this.state.CountryCode,            
            SendDate: new Date(),
            DownloadPensionAppFileLink: "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/" + emailresult + "/" + "PensionApplication.pdf.pdf",
        };
        console.log(JSON.stringify(DocIDData));
        SaveDataAPICallMailSend(Docurl, DocIDData)
            .then((data) => {
                console.log("Successfully inserted in AppDoc Table.", data);
                this.handleRedirect(this);
            }).catch((err) => {
                console.log(err);
            });
    }
    handleReset(e) {
        this.setState({
            CountryCode: "PT",
            value: "",
            BtnNameState: "Save"
        });
    }

    handleRedirect(event) {
        history.push('/ApplicantDashboard');
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
export default connect(mapReducerStateToProps, mapDispatchToProps)(BenQusPortugal);