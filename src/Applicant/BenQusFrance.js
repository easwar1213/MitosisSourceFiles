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

//Google Address
import Geosuggest from 'react-geosuggest';

//Signature Pad
import SignaturePad from 'react-signature-pad';

//Notification Alert
import Notifications, { notify } from 'react-notify-toast';

//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';
var emailresult;
const newstyle = {
    marginTop: 10,
}

const TitleItems = [
    <MenuItem value={"Mr."} key={1} primaryText={`Mr.`} />,
    <MenuItem value={"Mrs."} key={2} primaryText={`Mrs.`} />
];

const DayItems = [];
for (let i = 1; i < 32; i++) {
    DayItems.push(<MenuItem value={i} key={i} primaryText={i} />);
}

const ClaimantChildrens = [];

const AgencyData = [];

const MonthItems = [
    <MenuItem value={"January"} key={1} primaryText={"January"} />,
    <MenuItem value={"February"} key={2} primaryText={"February"} />,
    <MenuItem value={"March"} key={3} primaryText={"March"} />,
    <MenuItem value={"April"} key={4} primaryText={"April"} />,
    <MenuItem value={"May"} key={5} primaryText={"May"} />,
    <MenuItem value={"June"} key={6} primaryText={"June"} />,
    <MenuItem value={"July"} key={7} primaryText={"July"} />,
    <MenuItem value={"August"} key={8} primaryText={"August"} />,
    <MenuItem value={"September"} key={9} primaryText={"September"} />,
    <MenuItem value={"October"} key={10} primaryText={"October"} />,
    <MenuItem value={"November"} key={11} primaryText={"November"} />,
    <MenuItem value={"December"} key={12} primaryText={"December"} />,
];

const YearItems = [];
for (let i = 1930; i < 2019; i++) {
    YearItems.push(<MenuItem value={i} key={i} primaryText={i} />);
}

const CountryItems = [];
const NationalityItems = [];
const CountryOfBirthItems = [];
const PCountryOfBirthItems = [];
const PNationalityItems = [];
const CountryOfEmploymentItems = [];


const PTitleItems = [
    <MenuItem value={"Ms."} key={1} primaryText={`Ms.`} />,
    <MenuItem value={"Miss."} key={2} primaryText={`Miss.`} />
];

const MaritalStatusItems = [
    <MenuItem value={"S"} key={1} primaryText={`Single`} />,
    <MenuItem value={"M"} key={2} primaryText={`Married`} />,
    <MenuItem value={"D"} key={4} primaryText={`Divorced`} />,
    <MenuItem value={"W"} key={5} primaryText={`Widowed`} />,
];
const MarriedItems = [
    <MenuItem value={"PAC"} key={1} primaryText={`PAC's (civil partnership)`} />,
    <MenuItem value={"C"} key={2} primaryText={`Committed (legally)`} />,
];
const DivorceeItems = [
    <MenuItem value={"S"} key={1} primaryText={`Separated`} />,
    <MenuItem value={"WI"} key={2} primaryText={`Widow`} />,

];
const ResponsibilityItems = [
    <MenuItem value={"Yes"} key={1} primaryText={"Yes"} />,
    <MenuItem value={"No"} key={2} primaryText={"No"} />
];

const BenefitItems = [
    <MenuItem value={"Retirement"} key={1} primaryText={"Retirement"} />,
    <MenuItem value={"Handicap - Disability"} key={2} primaryText={"Handicap - Disability"} />,
    <MenuItem value={"Solidarity"} key={2} primaryText={"Solidarity"} />
];

const style = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

class BenQusFrance extends Component {
    constructor(props) {
        super(props);
        this.handleBenQusFranceAuto(this);
        this.handleLoadCountry(this);
        //Field State Values Initialization
        this.state = {
            CountryCode: "FR",
            SSNumberState: '',
            LastNameState: '',
            OPNameState: '',
            BirthName: '',
            TitleState: '',
            FirstNameState: '',
            DOBState: "",
            PDOB_State: "",
            // DOB_Month: null,
            // DOB_Day: null,
            // DOB_Year: null,
            Country: null,
            BirthPlace: '',
            DepartmentOfBirth: '',
            Address: '',
            search: "",
            Nationality: "",
            EmailState: "",
            ZipCodeState: "",
            CountryOfBirth: null,
            PhoneNum: "",
            MDate: "",
            DDate: "",
            PSSNumberState: "",
            PLastNameState: '',
            POPNameState: "",
            PBirthName: '',
            PFirstNameState: '',
            PTitleState: '',
            PDOB_Month: null,
            PDOB_Day: null,
            PDOB_Year: null,
            PNationality: "",
            PBirthPlace: '',
            PDepartmentOfBirth: '',
            PCountryOfBirth: null,
            validationError: {},
            isValidEmail: false,
            isValidphone: false,
            isValidMonth: false,
            isValidDay: false,
            isValidYear: false,
            isValidEmailFormat: false,
            isValidPhoneFormat: false,
            isValidTitle: false,
            isValidFirstName: false,
            isValidFormatFirstName: false,
            //isValidZipCode: false,
            isValidPMonth: false,
            isValidPDay: false,
            isValidPYear: false,
            isValidPFirstName: false,
            isValidPFormatFirstName: false,
            isValidPTitle: false,
            MaritalStatusState: "S",
            //MarriedState: "Single",
            DivorceeState: "",
            ChildResponsibilityState: "",
            PDayState: "",
            PMonthState: "",
            PYearState: "",
            // Child State.
            CLastNameState: "",
            CFirstNameState: "",
            CRelationship: "",
            // CDOB_Month: null,
            // CDOB_Day: null,
            // CDOB_Year: null,
            CareState: "",
            ReasonState: "",
            ChildSupportState: "",
            SupportReasonState: "",
            PeriodOfSupport: "",
            RetireDate: "",
            AskPensionBase: null,
            PensionPlan: "",
            PensionReversion: "",
            PensionPlanApplied: "",
            EmploymentActivity: "",
            CDOBState: "",
            MaritalDate: "",

            // Termination of Activities
            UnemployableState: null,
            DisabledState: "No",
            OldState: "No",
            LabourState: "No",
            professionalActivityState: "No",
            ProfessionalAccPreState: "No",
            EmployedInOtherCountryState: "Yes",

            // Other Country             
            PeriodCountryFrom: "",
            PeriodCountryTo: "",
            OccupationState: "",
            EmployerName: "",
            CountryOfEmployment: null,

            // Medical Expense Organisation

            CPam: "",
            OrgContractedSSNumberState: "",
            MSAState: "",
            OtherFrenchOrgState: "",
            OtherCountrySSNumberState: "",
            OtherForeignOrgn: "",

            // benefits in france

            BenefitsInFranceState: "No",

            // benefit Providing Agency

            PayingAgencyState: "",
            AgencyAddressState: "",
            PostalCodeState: "",
            PayingCity: "",
            NatureOfService: "",
            NumberOfFile: "",
            GrantDateOfBenefit: "",
            CurrentRequest: "",
            SpouseNameInService: "",
            BenefitsListState: null,

            // Applicant Sign & Date

            ApplicantSignature: "",
            DateOfSignature: "",
            PPOBsearch: "",
            POBsearch: ""
        }
    }

    componentDidMount(){
        emailresult = localStorage.getItem('applicant_email');
    }
    //Handle Event
    handleChangeSSNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            this.setState({ SSNumberState: onlyNums });
        }
    };

    handleChangePSSNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            this.setState({ PSSNumberState: onlyNums });
        }
    };

    handleChangeTitle = (event, index, value) => {
        this.setState({ TitleState: value });
    };

    handleChangePTitle = (event, index, value) => {
        this.setState({ PTitleState: value });
    };

    handleChangeBirthName = (event) => {
        this.setState({ BirthName: event.target.value });
    };

    handleChangePBirthName = (event) => {
        this.setState({ PBirthName: event.target.value });
    };

    handleChangeCountryOfBirth = (event, index, Suffix) => {
        this.setState({ CountryOfBirth: Suffix });
    };

    handleChangePCountryOfBirth = (event, index, Suffix) => {
        this.setState({ PCountryOfBirth: Suffix });
    };

    handleChangeLastName = (event) => {
        this.setState({ LastNameState: event.target.value });
    };

    handleChangeOPName = (event) => {
        this.setState({ OPNameState: event.target.value });
    };

    handleChangePLastName = (event) => {
        this.setState({ PLastNameState: event.target.value });
    };

    handleChangePOPName = (event) => {
        this.setState({ POPNameState: event.target.value });
    };

    handleChangeFirstName(e) {
        this.setState({ FirstNameState: e.target.value });
    };

    handleChangeChildFirstName(e) {
        this.setState({ CFirstNameState: e.target.value });
    };

    handleChangeChildLastName(e) {
        this.setState({ CLastNameState: e.target.value });
    };

    handleChangeChildRelationship(e) {
        this.setState({ CRelationship: e.target.value });
    };

    handleChangePDOB = (e, date) => {
        this.setState({ PDOB_State: date }, function () {
            if (this.state.PDOB_State < new Date()) {
                this.setState({ checkValidSpouseDate: false });
            } else {
                this.setState({ checkValidSpouseDate: true });
            }
        });
    };

    handleChangeDOB = (e, date) => {
        this.setState({ DOBState: date }, function () {
            if (this.state.DOBState < new Date()) {
                this.setState({ checkDateofBirth: false });
            } else {
                this.setState({ checkDateofBirth: true });
            }
        });
        //this.setState({ DOBState: date });
    };

    handleChangeMDate = (event, date) => {
        const { validationError } = this.state;
        this.setState({ MDate: date }, function () {
            if ((this.state.DOBState && this.state.PDOB_State) <= this.state.MDate) {
                if (this.state.MDate < new Date()) {
                    this.setState({ checkValid: false });
                    this.setState({ ValidateYearWorked5: false });
                } else {
                    this.setState({ ValidateYearWorked5: true });
                }
            } else {
                this.setState({ checkValid: true });
            }
        });
    };

    handleChangeDDate = (e, date) => {
        const { validationError } = this.state;
        this.setState({ DDate: date }, function () {
            if ((this.state.DOBState && this.state.PDOB_State) <= this.state.DDate) {
                if (this.state.DDate < new Date()) {
                    this.setState({ checkValid1: false });
                    this.setState({ ValidateYearWorked6: false });
                } else {
                    this.setState({ ValidateYearWorked6: true });
                }
            } else {
                this.setState({ checkValid1: true });
            }
        });
    };

    handleChangeDateOfSignature = (e, date) => {
        this.setState({ DateOfSignature: date });
    };

    handleChangeCDOB = (event, date) => {
        const { validationError } = this.state;
        this.setState({ CDOBState: date }, function () {
            if (this.state.DOBState <= this.state.CDOBState) {
                if (this.state.CDOBState < new Date()) {
                    this.setState({ checkValid2: false });
                    this.setState({ ValidateYearWorked1: false });
                } else {
                    this.setState({ ValidateYearWorked1: true });
                }
            } else {
                this.setState({ checkValid2: true });
            }
        });
    };

    handleCChangeMonth = (event, index, value) => {
        this.setState({ CDOB_Month: value });
    };

    handleCChangeDay = (event, index, value) => {
        this.setState({ CDOB_Day: value });
    };

    handleCChangeYear = (event, index, value) => {
        this.setState({ CDOB_Year: value });
    };

    handleChangeCareState(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= 2) {
            this.setState({ CareState: onlyNums });
        }
    };

    handleChangeResponsibility = (event, index, value) => {
        this.setState({ ChildResponsibilityState: value });
    };

    handleChangeSupport = (event) => {
        this.setState({ ChildSupportState: event.target.value });
    };

    handleChangeSupportReason = (event) => {
        this.setState({ SupportReasonState: event.target.value });
    };

    handleChangeReasonState = (event) => {
        this.setState({ ReasonState: event.target.value })
    };

    handleChangePeriodOfSupport = (event) => {
        this.setState({ PeriodOfSupport: event.target.value })
    };

    handleChangeRetireDate = (event, date) => {
        const { validationError } = this.state;
        this.setState({ RetireDateState: date }, function () {
            if (this.state.DOBState <= this.state.RetireDateState) {
                if (this.state.RetireDateState < new Date()) {
                    this.setState({ checkValid3: false });
                    this.setState({ ValidateYearWorked: false });
                } else {
                    this.setState({ ValidateYearWorked: true });
                }
            } else {
                this.setState({ checkValid3: true });
            }
        });
    };

    handleChangeMaritalDate = (e, date) => {
        this.setState({ MaritalDate: date });
    };

    handleChangeAskPensionBase = (event) => {
        this.setState({ AskPensionBase: event.target.value });
    };

    handleChangePensionPlanApplied = (event) => {
        this.setState({ PensionPlanApplied: event.target.value });
    };

    handleChangePensionReversion = (event) => {
        this.setState({ PensionReversion: event.target.value });
    };

    handleChangeRetirementBusiness = (event) => {
        this.setState({ RetirementBusinessState: event.target.value });
    };

    handleChangeEmploymentActivity = (event) => {
        this.setState({ EmploymentActivity: event.target.value });
    };

    handleChangeProfessionalAccPreState = (event) => {
        this.setState({ ProfessionalAccPreState: event.target.value });
    };

    handleChangeEmployedInOtherCountryState = (event) => {
        this.setState({ EmployedInOtherCountryState: event.target.value });
    };

    handleChangePeriodCountryFrom = (event, date) => {
        this.setState({ PeriodCountryFrom: date }, function () {
            if (this.state.PeriodCountryFrom < new Date()) {
                this.setState({ checkValidFutureFromDate: false });
            } else {
                this.setState({ checkValidFutureFromDate: true });
            }
        });
    };

    handleChangePeriodCountryTo = (event, date) => {
        this.setState({ PeriodCountryTo: date }, function () {
            if (this.state.WorkingOutSideUKFrom <= this.state.PeriodCountryTo) {
                if (this.state.PeriodCountryTo < new Date()) {
                    this.setState({ checkValidFutureFromDate2: false });
                    this.setState({ ValidateWorked: false });
                } else {
                    this.setState({ ValidateWorked: true });
                }
            } else {
                this.setState({ checkValidFutureFromDate2: true });
            }
        });
    };

    handleChangeOccupationState = (event) => {
        this.setState({ OccupationState: event.target.value });
    };

    handleChangeEmployerName = (event) => {
        this.setState({ EmployerName: event.target.value });
    };

    handleChangeCountryOfEmployment = (event, index, value) => {
        this.setState({ CountryOfEmployment: value });
    };

    handleChangeOthCountrySSNumberState = (event) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length <= 9) {
            this.setState({ OtherCountrySSNumberState: onlyNums });
        }
    };

    handleChangeCPam = (event) => {
        this.setState({ CPam: event.target.value });
    };

    handleChangeOrgContractedSSN = (event) => {
        this.setState({ OrgContractedSSNumberState: event.target.value });
    };

    handleChangeMSAState = (event) => {
        this.setState({ MSAState: event.target.value });
    };

    handleChangeOtherFrenchOrgState = (event) => {
        this.setState({ OtherFrenchOrgState: event.target.value });
    };

    handleChangeForeignOrganisation = (event) => {
        this.setState({ OtherForeignOrgn: event.target.value });
    };

    handleChangeBenefitsInFranceState = (event) => {
        this.setState({ BenefitsInFranceState: event.target.value });
    }

    handleChangePayingAgencyState = (event) => {
        this.setState({ PayingAgencyState: event.target.value });
    };

    handleChangePostalCodeState = (event) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 7) {
            this.setState({ PostalCodeState: onlyNums });
        }
    };

    handleChangePayingCity = (event) => {
        this.setState({ PayingCity: event.target.value });
    };

    handleChangeNatureOfYourService = (event) => {
        this.setState({ NatureOfService: event.target.value });
    };

    handleChangeNumberOfFile = (event) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 7) {
            this.setState({ NumberOfFile: onlyNums });
        }
    };

    handleChangeGrantDateOfYourBenefit = (event, date) => {
        this.setState({ GrantDateOfBenefit: date }, function () {
            if (this.state.GrantDateOfBenefit < new Date()) {
                this.setState({ checkValidFutureFromDate1: false });
            } else {
                this.setState({ checkValidFutureFromDate1: true });
            }
        });
    };

    handleChangeCurrentRequest = (event) => {
        this.setState({ CurrentRequest: event.target.value });
    };

    handleChangeNameYourSpouse = (event) => {
        this.setState({ SpouseNameInService: event.target.value });
    };

    handleChangeNationality = (event, index, value) => {
        this.setState({ Nationality: value });
    };

    handleChangePFirstName(e) {
        this.setState({ PFirstNameState: e.target.value });
    };

    handleChangePMonth = (event, index, value) => {
        this.setState({ PDOB_Month: value });
    };

    handleChangePDay = (event, index, value) => {
        this.setState({ PDOB_Day: value });
    };

    handleChangePYear = (event, index, value) => {
        this.setState({ PDOB_Year: value });
    };

    handleChangePNationality = (event, index, Suffix) => {
        this.setState({ PNationality: Suffix });
    };

    handleChangePDeptOfBirth(e) {
        this.setState({ PDepartmentOfBirth: e.target.value });
    };

    handleChangeCountry = (event, index, Suffix) => {
        this.setState({ Country: Suffix });
    };

    handleChangeDeptOfBirth(e) {
        this.setState({ DepartmentOfBirth: e.target.value });
    };

    handleSelectSuggest(suggest) {
        if (suggest) {
            this.setState({ Address: suggest.description })
        }
    };

    handle_address(value) {
        this.setState({ Address: value })
    };

    handleSelectSuggestPlaceOfBirth(suggest) {
        if (suggest) {
            this.setState({ PBirthPlace: suggest.description });
        }
    };

    handleChangePPlaceOfBirth(value) {
        this.setState({ PBirthPlace: value })
    };

    handleSelectSuggestYourPlaceOfBirth(suggest) {
        if (suggest) {
            this.setState({ BirthPlace: suggest.description });
        }
    };

    handleChangePlaceOfBirth(value) {
        this.setState({ BirthPlace: value })
    };

    handleSelectAgencySuggest(suggest) {
        if(suggest){
            this.setState({ AgencyAddressState:suggest.description});
        }
    };

    handleChangeAgencyAddressState(value) {
        this.setState({ AgencyAddressState: value })
    };

    handleChangeEmail(e) {
        this.setState({ EmailState: e.target.value });
    };

    handleChangeZipCode(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 7) {
            this.setState({ ZipCodeState: onlyNums });
        }
    };

    handleChangePhoneNum(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ PhoneNum: onlyNums });
        }
    };

    handleChangeUnemployable = (event) => {
        this.setState({ UnemployableState: event.target.value });
    };

    handleChangeDisabledState = (event) => {
        this.setState({ DisabledState: event.target.value });
    };

    handleChangeOldState = (event) => {
        this.setState({ OldState: event.target.value });
    };

    handleChangeLabourState = (event, index, value) => {
        this.setState({ LabourState: value });
    };

    handleChangeprofessionalActivityState = (event, index, suffix) => {
        this.setState({ professionalActivityState: suffix });
    };

    handleChangeBenefitsList(event, index, value) {
        this.setState({ BenefitsListState: value });
    };

    handleSignatureClear = (e) => {
        this.signaturePad.clear();
    };

    handleChangeMaritalStatus = (event, index, value) => {
        this.setState({ MaritalStatusState: value });
    };

    handleChangeMarriedState = (event, index, value) => {
        this.setState({ MarriedState: value });
    };

    handleChangeDivorceeState = (event, index, value) => {
        this.setState({ DivorceeState: value });
    };

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
            for (let i = 0; i < data.length; i++) {
                NationalityItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
                PNationalityItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
                CountryItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
                CountryOfBirthItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
                PCountryOfBirthItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
                CountryOfEmploymentItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    //Validation Function
    handleValidateForm(event) {
        const { validationError } = this.state;
        let validForm = false;
        var validEmailStateForm = false;
        var validFNameForm = false;
        var validPhoneForm = false;
        var validTitleForm = false;
        var validLNameForm = false;
        var varValidateEmail = this.state.EmailState;
        var validDOBForm = false;
        var validPDOBForm = false;
        var validSSnNumberForm = false;
        var validNationalityForm = false;
        var validPlaceOfBirthForm = false;
        var validDeptOfBirthForm = false;
        var validCountryOfBirthForm = false;
        var validAddressForm = false;
        var validCountryForm = false;
        var validEmailStateForm = false;
        var validPhoneForm = false;
        var validMDateForm = false;
        var validDDateForm = false;
        var validPSSnNumberForm = false;
        var validPTitleForm = false;
        var validPLNameForm = false;
        var validPFNameForm = false;
        var validPDOBForm = false;
        var validPNationalityForm = false;
        var validPPlaceOfBirthForm = false;
        var validPDeptOfBirthForm = false;
        var validPCountryOfBirthForm = false;
        var validChildSupportForm = false;
        var validResaonSupportForm = false;
        var validPeriodOfSupportForm = false;
        var validRetireDateForm = false;
        var validAskPensionBaseForm = false;
        var validRetirementBusinessForm = false;
        var validEmploymentActivityForm = false;
        var validUnemployableForm = false;
        var validDisabledForm = false;
        var validOldForm = false;
        var validLabourForm = false;
        var validprofessionalActivityForm = false;
        var validProfessionalAccPreForm = false;
        var validEmployedInOtherCountryForm = false;
        var validPeriodCountryFromForm = false;
        var validPeriodCountryToForm = false;
        var validOccupationStateForm = false;
        var validEmployerNameStateForm = false;
        var validCountryOfEmploymentForm = false;
        var validOtherCountrySSNumberStateForm = false;
        var validCPamForm = false;
        var validOrgContractedSSNumberForm = false;
        var validMSAForm = false;
        var validOtherFrenchOrgForm = false;
        var validotherForeignOrgnForm = false;
        var validBenefitsInFranceForm = false;
        var validPayingAgencyStateForm = false;
        var validAgencyAddressStateForm = false;
        var validPostalCodeStateForm = false;
        var validPayingCityForm = false;
        var ValidNatureOfServiceForm = false;
        var validNumberOfFileForm = false;
        var validGrantDOBForm = false;
        var validCurrentRequestForm = false;
        var validSpouseNameInServiceForm = false;
        var validDateOfSignatureForm = false;
        var validSignatureForm = false;


        if (this.state.SSNumberState.length > 0) {
            this.setState({ isValidSSNumberState: false });
            if (this.state.SSNumberState.length > 0 && this.state.SSNumberState.length > 8) {
                this.setState({ isValidFormatSSNumberState: false });
                validSSnNumberForm = true;
            }
            else {
                this.setState({ isValidFormatSSNumberState: true });
            }
        }
        else {
            this.setState({ isValidSSNumberState: true });
            this.setState({ isValidFormatSSNumberState: false });
            validSSnNumberForm = false;
        }
        if (this.state.TitleState != "") {
            this.setState({ isValidTitle: false });
            validTitleForm = true;
        }
        else {
            this.setState({ isValidTitle: true });
            validTitleForm = false;
        }
        if (this.state.LastNameState.length > 0) {
            this.setState({ isValidLastName: false });
            if (this.state.LastNameState.length > 0 && this.state.LastNameState.length > 2) {
                this.setState({ isValidFormatLastName: false });
                validLNameForm = true;
            }
            else {
                this.setState({ isValidFormatLastName: true });
                this.setState({ isValidLastName: false });
            }
        }
        else {
            this.setState({ isValidLastName: true });
            this.setState({ isValidFormatLastName: false });
            validLNameForm = false;
        }
        if (this.state.FirstNameState.length > 0) {
            this.setState({ isValidFirstName: false });
            if (this.state.FirstNameState.length > 0 && this.state.FirstNameState.length > 2) {
                this.setState({ isValidFormatFirstName: false });
                validFNameForm = true;
            }
            else {
                this.setState({ isValidFormatFirstName: true });
                this.setState({ isValidFirstName: false });
            }
        }
        else {
            this.setState({ isValidFirstName: true });
            this.setState({ isValidFormatFirstName: false });
            validFNameForm = false;
        }
        if (this.state.DOBState != "") {
            this.setState({ isValidDOB: false });
            validDOBForm = true;
        }
        else {
            this.setState({ isValidDOB: true });
            validDOBForm = false;
        }
        if (this.state.Nationality != "") {
            this.setState({ isValidNationality: false });
            validNationalityForm = true;
        }
        else {
            this.setState({ isValidNationality: true });
            validNationalityForm = false;
        }
        if (this.state.BirthPlace.length > 0) {
            this.setState({ isValidBirthPlace: false });
            if (this.state.BirthPlace.length > 0 && this.state.BirthPlace.length > 2) {
                this.setState({ isValidFormatBirthPlace: false });
                validPlaceOfBirthForm = true;
            }
            else {
                this.setState({ isValidFormatBirthPlace: true });
                this.setState({ isValidBirthPlace: false });
            }
        }
        else {
            this.setState({ isValidBirthPlace: true });
            this.setState({ isValidFormatBirthPlace: false });
            validPlaceOfBirthForm = false;
        }
        if (this.state.DepartmentOfBirth.length > 0) {
            this.setState({ isValidDepartmentOfBirth: false });
            if (this.state.DepartmentOfBirth.length > 0 && this.state.DepartmentOfBirth.length > 2) {
                this.setState({ isValidFormatDepartmentOfBirth: false });
                validDeptOfBirthForm = true;
            }
            else {
                this.setState({ isValidFormatDepartmentOfBirth: true });
                this.setState({ isValidDepartmentOfBirth: false });
            }
        }
        else {
            this.setState({ isValidDepartmentOfBirth: true });
            this.setState({ isValidFormatDepartmentOfBirth: false });
            validDeptOfBirthForm = false;
        }
        if (this.state.CountryOfBirth != null) {
            this.setState({ isValidCountryOfBirth: false });
            validCountryOfBirthForm = true;
        }
        else {
            this.setState({ isValidCountryOfBirth: true });
            validCountryOfBirthForm = false;
        }
        if (this.state.Address.length > 0) {
            this.setState({ isValidAddress: false });
            validAddressForm = true;
        }
        else {
            this.setState({ isValidAddress: true });
            validAddressForm = false;
        }
        if (this.state.Country != null) {
            this.setState({ isValidCountry: false });
            validCountryForm = true;
        }
        else {
            this.setState({ isValidCountry: true });
            validCountryForm = false;
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
            //this.setState({ isValidEmail: false });
            validEmailStateForm = false;
        }
        if (this.state.PhoneNum.length > 0) {
            this.setState({ isValidPhoneNum: false });
            if (this.state.PhoneNum.length > 0 && this.state.PhoneNum.length > 9) {
                this.setState({ isValidFormatPhoneNum: false });
                validPhoneForm = true;
            }
            else {
                this.setState({ isValidFormatPhoneNum: true });
            }
        }
        else {
            this.setState({ isValidPhoneNum: true });
            this.setState({ isValidFormatPhoneNum: false });
            validPhoneForm = false;
        }
        if (this.state.MarriedState == "PAC" || this.state.MarriedState == "C") {
            if (this.state.MDate != "") {
                this.setState({ isValidMDate: false });
                validMDateForm = true;
            }
            else {
                this.setState({ isValidMDate: true });
                validMDateForm = false;
            }
        }
        else {
            this.setState({ isValidMDate: false });
            validMDateForm = true;
        }
        if (this.state.DivorceeState == "S" || this.state.DivorceeState == "WI") {
            if (this.state.DDate != "") {
                this.setState({ isValidDDate: false });
                validDDateForm = true;
            }
            else {
                this.setState({ isValidDDate: true });
                validDDateForm = false;
            }
        }
        else {
            this.setState({ isValidDDate: false });
            validDDateForm = true;
        }
        if (this.state.MaritalStatusState == "M" || this.state.MaritalStatusState == "D") {
            if (this.state.PSSNumberState.length > 0) {
                this.setState({ isValidPSSNumberState: false });
                if (this.state.PSSNumberState.length > 0 && this.state.PSSNumberState.length > 8) {
                    this.setState({ isValidFormatPSSNumberState: false });
                    validPSSnNumberForm = true;
                }
                else {
                    this.setState({ isValidFormatPSSNumberState: true });
                }
            }
            else {
                this.setState({ isValidPSSNumberState: true });
                this.setState({ isValidFormatPSSNumberState: false });
                validPSSnNumberForm = false;
            }
            if (this.state.PTitleState != "") {
                this.setState({ isValidPTitle: false });
                validPTitleForm = true;
            }
            else {
                this.setState({ isValidPTitle: true });
                validPTitleForm = false;
            }
            if (this.state.PLastNameState.length > 0) {
                this.setState({ isValidPLastName: false });
                if (this.state.PLastNameState.length > 0 && this.state.PLastNameState.length > 2) {
                    this.setState({ isValidFormatPLastName: false });
                    validPLNameForm = true;
                }
                else {
                    this.setState({ isValidFormatPLastName: true });
                    this.setState({ isValidPLastName: false });
                }
            }
            else {
                this.setState({ isValidPLastName: true });
                this.setState({ isValidFormatPLastName: false });
                validPLNameForm = false;
            }
            if (this.state.PFirstNameState.length > 0) {
                this.setState({ isValidPFirstName: false });
                if (this.state.PFirstNameState.length > 0 && this.state.PFirstNameState.length > 2) {
                    this.setState({ isValidFormatPFirstName: false });
                    validPFNameForm = true;
                }
                else {
                    this.setState({ isValidFormatPFirstName: true });
                    this.setState({ isValidPFirstName: false });
                }
            }
            else {
                this.setState({ isValidPFirstName: true });
                this.setState({ isValidFormatPFirstName: false });
                validPFNameForm = false;
            }
            if (this.state.PDOB_State != "") {
                this.setState({ isValidPDOB: false });
                validPDOBForm = true;
            }
            else {
                this.setState({ isValidPDOB: true });
                validPDOBForm = false;
            }
            if (this.state.PNationality != "") {
                this.setState({ isValidPNationality: false });
                validPNationalityForm = true;
            }
            else {
                this.setState({ isValidPNationality: true });
                validPNationalityForm = false;
            }
            if (this.state.PBirthPlace.length > 0) {
                this.setState({ isValidPBirthPlace: false });
                if (this.state.PBirthPlace.length > 0 && this.state.PBirthPlace.length > 2) {
                    this.setState({ isValidFormatPBirthPlace: false });
                    validPPlaceOfBirthForm = true;
                }
                else {
                    this.setState({ isValidFormatPBirthPlace: true });
                    this.setState({ isValidPBirthPlace: false });
                }
            }
            else {
                this.setState({ isValidPBirthPlace: true });
                this.setState({ isValidFormatPBirthPlace: false });
                validPPlaceOfBirthForm = false;
            }
            if (this.state.PDepartmentOfBirth.length > 0) {
                this.setState({ isValidPDepartmentOfBirth: false });
                if (this.state.PDepartmentOfBirth.length > 0 && this.state.PDepartmentOfBirth.length > 2) {
                    this.setState({ isValidFormatPDepartmentOfBirth: false });
                    validPDeptOfBirthForm = true;
                }
                else {
                    this.setState({ isValidFormatPDepartmentOfBirth: true });
                    this.setState({ isValidPDepartmentOfBirth: false });
                }
            }
            else {
                this.setState({ isValidPDepartmentOfBirth: true });
                this.setState({ isValidFormatPDepartmentOfBirth: false });
                validPDeptOfBirthForm = false;
            }
            if (this.state.PCountryOfBirth != null) {
                this.setState({ isValidPCountryOfBirth: false });
                validPCountryOfBirthForm = true;
            }
            else {
                this.setState({ isValidPCountryOfBirth: true });
                validPCountryOfBirthForm = false;
            }
        }
        else {
            this.setState({ isValidPSSNumberState: false });
            this.setState({ isValidPTitle: false });
            this.setState({ isValidPLastName: false });
            this.setState({ isValidPFirstName: false });
            this.setState({ isValidPDOB: false });
            this.setState({ isValidPNationality: false });
            this.setState({ isValidPNationality: false });
            this.setState({ isValidPBirthPlace: false });
            this.setState({ isValidPDepartmentOfBirth: false });
            this.setState({ isValidPCountryOfBirth: false });
            validPSSnNumberForm = true;
            validPTitleForm = true;
            validPLNameForm = true;
            validPFNameForm = true;
            validPDOBForm = true;
            validPNationalityForm = true;
            validPPlaceOfBirthForm = true;
            validPDeptOfBirthForm = true;
            validPCountryOfBirthForm = true;
        }
        if (this.state.ChildSupportState != "") {
            this.setState({ isValidSupport: false });
            validChildSupportForm = true;
        }
        else {
            this.setState({ isValidSupport: true });
            validChildSupportForm = false;
        }
        if (this.state.ChildSupportState == "Yes") {
            if (this.state.SupportReasonState.length > 0) {
                this.setState({ isValidSupportReason: false });
                validResaonSupportForm = true;
            }
            else {
                this.setState({ isValidSupportReason: true });
                validResaonSupportForm = false;
            }
            if (this.state.PeriodOfSupport.length > 0) {
                this.setState({ isValidPeriodOfSupport: false });
                validPeriodOfSupportForm = true;
            }
            else {
                this.setState({ isValidPeriodOfSupport: true });
                validPeriodOfSupportForm = false;
            }
        }
        else {
            this.setState({ isValidSupportReason: false });
            this.setState({ isValidPeriodOfSupport: false });
            validResaonSupportForm = true;
            validPeriodOfSupportForm = true;
        }
        if (this.state.RetireDateState != "") {
            this.setState({ isValidRetireDate: false });
            validRetireDateForm = true;
        }
        else {
            this.setState({ isValidRetireDate: true });
            validRetireDateForm = false;
        }
        if (this.state.AskPensionBase != null) {
            this.setState({ isValidPensionBase: false });
            validAskPensionBaseForm = true;
        }
        else {
            this.setState({ isValidPensionBase: true });
            validAskPensionBaseForm = false;
        }
        if (this.state.RetirementBusinessState != "") {
            this.setState({ isValidRetirementBusiness: false });
            validRetirementBusinessForm = true;
        }
        else {
            this.setState({ isValidRetirementBusiness: true });
            validRetirementBusinessForm = false;
        }
        if (this.state.RetirementBusinessState == "No") {
            if (this.state.EmploymentActivity.length > 0) {
                this.setState({ isValidEmploymentActivity: false });
                validEmploymentActivityForm = true;
            }
            else {
                this.setState({ isValidEmploymentActivity: true });
                validEmploymentActivityForm = false;
            }
        }
        else {
            this.setState({ isValidEmploymentActivity: false });
            validEmploymentActivityForm = true;
        }
        if (this.state.RetirementBusinessState == "Yes") {
            if (this.state.UnemployableState != "") {
                this.setState({ isValidUnemployableState: false });
                validUnemployableForm = true;
            }
            else {
                this.setState({ isValidUnemployableState: true });
                validUnemployableForm = false;
            }
        }
        else {
            this.setState({ isValidUnemployableState: false });
            validUnemployableForm = true;
        }
        if (this.state.DisabledState != "") {
            this.setState({ isValidDisabledState: false });
            validDisabledForm = true;
        }
        else {
            this.setState({ isValidDisabledState: true });
            validDisabledForm = false;
        }
        if (this.state.OldState != "") {
            this.setState({ isValidOldState: false });
            validOldForm = true;
        }
        else {
            this.setState({ isValidOldState: true });
            validOldForm = false;
        }
        if (this.state.LabourState != "") {
            this.setState({ isValidLabourState: false });
            validLabourForm = true;
        }
        else {
            this.setState({ isValidLabourState: true });
            validLabourForm = false;
        }
        if (this.state.professionalActivityState != "") {
            this.setState({ isValidprofessionalActivityState: false });
            validprofessionalActivityForm = true;
        }
        else {
            this.setState({ isValidprofessionalActivityState: true });
            validprofessionalActivityForm = false;
        }
        if (this.state.ProfessionalAccPreState != "") {
            this.setState({ isValidProfessionalAccPreState: false });
            validProfessionalAccPreForm = true;
        }
        else {
            this.setState({ isValidProfessionalAccPreState: true });
            validProfessionalAccPreForm = false;
        }
        if (this.state.EmployedInOtherCountryState != "") {
            this.setState({ isValidEmployedInOtherCountryState: false });
            validEmployedInOtherCountryForm = true;
        }
        else {
            this.setState({ isValidEmployedInOtherCountryState: true });
            validEmployedInOtherCountryForm = true;
        }
        if (this.state.EmployedInOtherCountryState == "Yes") {
            if (this.state.PeriodCountryFrom != "") {
                this.setState({ isvalidPeriodCountryFrom: false });
                validPeriodCountryFromForm = true;
            }
            else {
                this.setState({ isvalidPeriodCountryFrom: true });
                validPeriodCountryFromForm = false;
            }
            if (this.state.PeriodCountryTo != "") {
                this.setState({ isvalidPeriodCountryTo: false });
                validPeriodCountryToForm = true;
            }
            else {
                this.setState({ isvalidPeriodCountryTo: true });
                validPeriodCountryToForm = false;
            }
            if (this.state.PeriodCountryFrom > this.state.PeriodCountryTo) {
                this.setState({ ValidateWorked: true });
            } else {
                this.setState({ ValidateWorked: false });
            }
            if (this.state.OccupationState.length > 0) {
                this.setState({ isValidOccupationState: false });
                if (this.state.OccupationState.length > 0 && this.state.OccupationState.length > 2) {
                    this.setState({ isValidFormatOccupationState: false });
                    validOccupationStateForm = true;
                }
                else {
                    this.setState({ isValidFormatOccupationState: true });
                    this.setState({ isValidOccupationState: false });
                }
            }
            else {
                this.setState({ isValidOccupationState: true });
                this.setState({ isValidFormatOccupationState: false });
                validOccupationStateForm = false;
            }
            if (this.state.EmployerName.length > 0) {
                this.setState({ isValidEmployerNameState: false });
                if (this.state.EmployerName.length > 0 && this.state.EmployerName.length > 2) {
                    this.setState({ isValidFormatEmployerNameState: false });
                    validEmployerNameStateForm = true;
                }
                else {
                    this.setState({ isValidFormatEmployerNameState: true });
                    this.setState({ isValidEmployerNameState: false });
                }
            }
            else {
                this.setState({ isValidEmployerNameState: true });
                this.setState({ isValidFormatEmployerNameState: false });
                validEmployerNameStateForm = false;
            }
            if (this.state.CountryOfEmployment != null) {
                this.setState({ isValidCountryOfEmployment: false });
                validCountryOfEmploymentForm = true;
            }
            else {
                this.setState({ isValidCountryOfEmployment: true });
                validCountryOfEmploymentForm = false;
            }
            if (this.state.OtherCountrySSNumberState.length > 0) {
                this.setState({ isValidOtherCountrySSNumberState: false });
                if (this.state.OtherCountrySSNumberState.length > 0 && this.state.OtherCountrySSNumberState.length > 8) {
                    this.setState({ isValidFormatOtherCountrySSNumberState: false });
                    validOtherCountrySSNumberStateForm = true;
                }
                else {
                    this.setState({ isValidFormatOtherCountrySSNumberState: true });
                    this.setState({ isValidOtherCountrySSNumberState: false });
                }
            }
            else {
                this.setState({ isValidOtherCountrySSNumberState: true });
                this.setState({ isValidFormatOtherCountrySSNumberState: false });
                validOtherCountrySSNumberStateForm = false;
            }
        }
        else {
            this.setState({ isvalidPeriodCountryFrom: false });
            this.setState({ isvalidPeriodCountryTo: false });
            this.setState({ isValidOccupationState: false });
            this.setState({ isValidEmployerNameState: false });
            this.setState({ isValidCountryOfEmployment: false });
            this.setState({ isValidOtherCountrySSNumberState: false });
            validPeriodCountryFromForm = true;
            validPeriodCountryToForm = true;
            validOccupationStateForm = true;
            validEmployerNameStateForm = true;
            validCountryOfEmploymentForm = true;
            validOtherCountrySSNumberStateForm = true;
        }
        if (this.state.CPam.length > 0) {
            this.setState({ isValidCPam: false });
            validCPamForm = true;
        }
        else {
            this.setState({ isValidCPam: true });
            validCPamForm = false;
        }
        if (this.state.OrgContractedSSNumberState.length > 0) {
            this.setState({ isValidOrgContractedSSNumberState: false });
            validOrgContractedSSNumberForm = true;
        }
        else {
            this.setState({ isValidOrgContractedSSNumberState: true });
            validOrgContractedSSNumberForm = false;
        }
        if (this.state.MSAState.length > 0) {
            this.setState({ isValidMSAState: false });
            validMSAForm = true;
        }
        else {
            this.setState({ isValidMSAState: true });
            validMSAForm = false;
        }
        if (this.state.OtherFrenchOrgState.length > 0) {
            this.setState({ isValidOtherFrenchOrgState: false });
            validOtherFrenchOrgForm = true;
        }
        else {
            this.setState({ isValidOtherFrenchOrgState: true });
            validOtherFrenchOrgForm = false;
        }
        if (this.state.OtherForeignOrgn.length > 0) {
            this.setState({ isValidOtherForeignOrgn: false });
            validotherForeignOrgnForm = true;
        }
        else {
            this.setState({ isValidOtherForeignOrgn: true });
            validotherForeignOrgnForm = false;
        }
        if (this.state.BenefitsInFranceState != "") {
            this.setState({ isValidBenefitsInFranceState: false });
            validBenefitsInFranceForm = true;
        }
        else {
            this.setState({ isValidBenefitsInFranceState: true });
            validBenefitsInFranceForm = false;
        }

        if (this.state.DateOfSignature != "") {
            this.setState({ isValidDateOfSignature: false });
            validDateOfSignatureForm = true;
        }
        else {
            this.setState({ isValidDateOfSignature: true });
            validDateOfSignatureForm = false;
        }
        if (this.signaturePad.isEmpty()) {
            this.setState({ isValidSignature: true });
            validSignatureForm = false;
        }
        else {
            this.setState({ isValidSignature: false });
            validSignatureForm = true;
        }
        if (validSSnNumberForm && validTitleForm && validLNameForm && validFNameForm && validDOBForm && validNationalityForm
            && validPlaceOfBirthForm && validDeptOfBirthForm && validCountryOfBirthForm && validCountryForm && validEmailStateForm && validAddressForm
            && validPhoneForm && validMDateForm && validDDateForm && validPSSnNumberForm && validPTitleForm && validPLNameForm && validPDOBForm
            && validPNationalityForm && validPPlaceOfBirthForm && validPDeptOfBirthForm && validPCountryOfBirthForm && validChildSupportForm
            && validResaonSupportForm && validPeriodOfSupportForm && validRetireDateForm && validAskPensionBaseForm && validRetirementBusinessForm
            && validEmploymentActivityForm && validUnemployableForm && validDisabledForm && validOldForm && validLabourForm && validprofessionalActivityForm
            && validProfessionalAccPreForm && validEmployedInOtherCountryForm && validPeriodCountryFromForm && validPeriodCountryToForm && validOccupationStateForm
            && validEmployerNameStateForm && validCountryOfEmploymentForm && validOtherCountrySSNumberStateForm && validCPamForm && validOrgContractedSSNumberForm
            && validMSAForm && validOtherFrenchOrgForm && validotherForeignOrgnForm && validBenefitsInFranceForm && validDateOfSignatureForm && validSignatureForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Save Children Function
    handleBenQusChildDatas(event) {
        var valid = this.handleValidateChildForm(this);
        if (valid) {
            var ChildrenJSONData = {
                ChildLastName: this.state.CLastNameState,
                ChildFirstName: this.state.CFirstNameState,
                ChildRelationship: this.state.CRelationship,
                CDOBState: this.state.CDOBState,
                ChildYearsOfCareUntilAge16: this.state.CareState,
                ChildResponsibilityState: this.state.ChildResponsibilityState,
                ChildrenSupportSpecification: this.state.ReasonState,
            }
            if (ClaimantChildrens.length < 6) {
                ClaimantChildrens.push(ChildrenJSONData);
                notify.show("Child Information Added Successfully", "success", 3000);
                this.handleChildReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Six Children to Add", "warning", 3000);
            }
        }
    }

    // validation Children Function
    handleValidateChildForm(event) {
        let validForm = false;
        var validCFirstNameStateForm = false;
        var validCLastNameStateForm = false;
        var validCRelationshipForm = false;
        var validCYearForm = false;
        var validCMonthForm = false;
        var validCDayForm = false;
        var validCareForm = false;
        var validResponsibilityForm = false;
        var validReasonForm = false;
        var validSupportForm = false;
        var validSupportReasonForm = false;
        var validCDOBForm = false;

        if (this.state.CFirstNameState.length > 0 && this.state.CFirstNameState.length > 2) {
            this.setState({ isValidFormatCFirstName: false });
            validCFirstNameStateForm = true;
        }
        else {
            this.setState({ isValidFormatCFirstName: true });
            validCFirstNameStateForm = false;
        }
        if (this.state.CLastNameState.length > 0 && this.state.CLastNameState.length > 2) {
            this.setState({ isValidFormatCLastName: false });
            validCLastNameStateForm = true;
        }
        else {
            this.setState({ isValidFormatCLastName: true });
            validCLastNameStateForm = false;
        }
        if (this.state.CRelationship.length > 0 && this.state.CRelationship.length > 2) {
            this.setState({ isValidFormatCRelationship: false });
            validCRelationshipForm = true;
        }
        else {
            this.setState({ isValidFormatCRelationship: true });
            validCRelationshipForm = false;
        }
        if (this.state.ChildResponsibilityState == "Yes") {
            if (this.state.ReasonState.length > 0 && this.state.ReasonState.length > 2) {
                this.setState({ isValidFormatReason: false });
                validReasonForm = true;
            }
            else {
                this.setState({ isValidFormatReason: true });
                validReasonForm = false;
            }
        }
        if (validCFirstNameStateForm && validCLastNameStateForm && validCRelationshipForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }

        return validForm;
    }

    //Reset Children Function 
    handleChildReset(e) {
        this.setState({
            CFirstNameState: "",
            CLastNameState: "",
            CRelationship: "",
            isValidCFirstName: "",
            isValidCLastName: "",
            isValidCRelationship: "",
            ChildSupportState: "",
            ChildResponsibilityState: "",
            ReasonState: "",
            CareState: "",
            CDOBState: "",
            isValidCMonth: false,
            isValidCDay: false,
            isValidCYear: false,
            isValidCare: false,
            isValidResponsibility: false,
            isValidReason: false,
            isValidSupport: false,
            SupportReasonState: "",
            isValidSupportReason: false
        });
    }

    //Save Agency Function
    handleAnotherAgency(event) {
        var valid = this.handleValidateAgencyForm(this);
        if (valid) {
            var AgencyJSONData = {
                PayingAgency: this.state.PayingAgencyState,
                PayingAgencyAddress: this.state.PayingAgencyAddress,
                PostalCode: this.state.PostalCodeState,
                PayingCity: this.state.PayingCity,
                NatureOfService: this.state.NatureOfService,
                NumberOfFile: this.state.NumberOfFile,
                GrantDateOfBenefit: this.state.GrantDateOfBenefit,
                CurrentRequest: this.state.CurrentRequest,
                SpouseNameInService: this.state.SpouseNameInService
            }
            if (AgencyData.length < 2) {
                AgencyData.push(AgencyJSONData);
                notify.show("Agency Information Added Successfully", "success", 3000)
                this.handleAgencyReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Two Agency to Add", "warning", 3000);
            }
        }
    }

    //Validation Agency Form
    handleValidateAgencyForm(event) {
        let validForm = false;
        var validPayingAgencyStateForm = false;
        var validAgencyAddressStateForm = false;
        var validPostalCodeStateForm = false;
        var validPayingCityForm = false;
        var ValidNatureOfServiceForm = false;
        var validCurrentRequestForm = false;
        var validSpouseNameInServiceForm = false;
        var validNumberOfFileForm = false;
        var validGrantDOBForm = false;

        if (this.state.PayingAgencyState.length > 0) {
            this.setState({ isValidPayingAgencyState: false });
            if (this.state.PayingAgencyState.length > 0 && this.state.PayingAgencyState.length > 2) {
                this.setState({ isValidFormatPayingAgencyState: false });
                validPayingAgencyStateForm = true;
            }
            else {
                this.setState({ isValidFormatPayingAgencyState: true });
                this.setState({ isValidPayingAgencyState: false });
            }
        }
        else {
            this.setState({ isValidPayingAgencyState: true });
            this.setState({ isValidFormatPayingAgencyState: false });
            validPayingAgencyStateForm = false;
        }

        if (this.state.AgencyAddressState.length > 0) {
            this.setState({ isValidAgencyAddressState: false });
            validAgencyAddressStateForm = true;
        }
        else {
            this.setState({ isValidAgencyAddressState: true });
            validAgencyAddressStateForm = false;
        }
        if (this.state.PostalCodeState.length > 0) {
            this.setState({ isValidPostalCodeState: false });
            if (this.state.PostalCodeState.length > 0 && this.state.MSAState.length > 2) {
                this.setState({ isValidFormatPostalCodeState: false });
                validPostalCodeStateForm = true;
            }
            else {
                this.setState({ isValidFormatPostalCodeState: true });
                this.setState({ isValidPostalCodeState: false });
            }
        }
        else {
            this.setState({ isValidPostalCodeState: true });
            this.setState({ isValidFormatPostalCodeState: false });
            validPostalCodeStateForm = false;
        }
        if (this.state.PayingCity.length > 0) {
            this.setState({ isValidPayingCity: false });
            if (this.state.PayingCity.length > 0 && this.state.PayingCity.length > 2) {
                this.setState({ isValidFormatPayingCity: false });
                validPayingCityForm = true;
            }
            else {
                this.setState({ isValidFormatPayingCity: true });
                this.setState({ isValidPayingCity: false });
            }
        }
        else {
            this.setState({ isValidPayingCity: true });
            this.setState({ isValidFormatPayingCity: false });
            validPayingCityForm = false;
        }
        if (this.state.NatureOfService.length > 0) {
            this.setState({ isValidNatureOfService: false });
            if (this.state.NatureOfService.length > 0 && this.state.NatureOfService.length > 2) {
                this.setState({ isValidFormatNatureOfService: false });
                ValidNatureOfServiceForm = true;
            }
            else {
                this.setState({ isValidFormatNatureOfService: true });
                this.setState({ isValidNatureOfService: false });
            }
        }
        else {
            this.setState({ isValidNatureOfService: true });
            this.setState({ isValidFormatNatureOfService: false });
            ValidNatureOfServiceForm = false;
        }
        if (this.state.CurrentRequest.length > 0) {
            this.setState({ isValidCurrentRequest: false });
            if (this.state.CurrentRequest.length > 0 && this.state.CurrentRequest.length > 2) {
                this.setState({ isValidFormatCurrentRequest: false });
                validCurrentRequestForm = true;
            }
            else {
                this.setState({ isValidFormatCurrentRequest: true });
                this.setState({ isValidCurrentRequest: false });
            }
        }
        else {
            this.setState({ isValidCurrentRequest: true });
            this.setState({ isValidFormatCurrentRequest: false });
            validCurrentRequestForm = false;
        }
        if (this.state.SpouseNameInService.length > 0) {
            this.setState({ isValidSpouseNameInService: false });
            if (this.state.SpouseNameInService.length > 0 && this.state.SpouseNameInService.length > 2) {
                this.setState({ isValidFormatSpouseNameInService: false });
                validSpouseNameInServiceForm = true;
            }
            else {
                this.setState({ isValidFormatSpouseNameInService: true });
                this.setState({ isValidSpouseNameInService: false });
            }
        }
        else {
            this.setState({ isValidSpouseNameInService: true });
            this.setState({ isValidFormatSpouseNameInService: false });
            validSpouseNameInServiceForm = false;
        }
        if (this.state.NumberOfFile != "") {
            this.setState({ isValidNumberOfFile: false });
            validNumberOfFileForm = true;
        }
        else {
            this.setState({ isValidNumberOfFile: true });
            validNumberOfFileForm = false;
        }
        if (this.state.GrantDateOfBenefit != "") {
            this.setState({ isValidGrantDateOfBenefit: false });
            validGrantDOBForm = true;
        }
        else {
            this.setState({ isValidGrantDateOfBenefit: true });
            validGrantDOBForm = false;
        }
        if (validPayingAgencyStateForm && validAgencyAddressStateForm && validPostalCodeStateForm && validPayingCityForm && ValidNatureOfServiceForm && validNumberOfFileForm && validGrantDOBForm && validCurrentRequestForm && validSpouseNameInServiceForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Agency Reset Function 
    handleAgencyReset(e) {
        this.setState({
            PayingAgencyState: "",
            AgencyAddressState: "",
            PostalCodeState: "",
            PayingCity: "",
            NatureOfService: "",
            NumberOfFile: "",
            GrantDateOfBenefit: "",
            CurrentRequest: "",
            SpouseNameInService: "",
            BenefitsListState: null,
            isValidPayingAgencyState: false,
            isValidAgencyAddressState: false,
            isValidPostalCodeState: false,
            isValidNatureOfService: false,
            isValidNumberOfFile: false,
            isValidGrantDateOfBenefit: false,
            isValidCurrentRequest: false,
            isValidSpouseNameInService: false,
            isValidPayingCity: false
        });
    }

    //Auto-Populate Function
    handleBenQusFranceAuto(event) {
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
                thisObj.setState({ SSNumberState: data[i].SSSecurity });
                thisObj.setState({ LastNameState: data[i].LastName });
                thisObj.setState({ FirstNameState: data[i].FirstName });
                thisObj.setState({ TitleState: data[i].Title });
                var varDOB = data[i].DOB_Month + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year;
                var DtDOB = new Date(varDOB);
                thisObj.setState({ DOBState: DtDOB });
                thisObj.setState({ Nationality: data[i].CountryOfCitizenship });
                thisObj.setState({ BirthPlace: data[i].PlaceOfBirth });
                thisObj.setState({ CountryOfBirth: data[i].CountryOfCitizenship });
                thisObj.setState({ Address: data[i].MailingAddress });
                thisObj.setState({ Country: data[i].CountryOfCitizenship });
                thisObj.setState({ MaritalStatusState: data[i].MaritalStatus });
                if (this.state.MaritalStatusState == "M" || this.state.MaritalStatusState == "D") {
                    thisObj.setState({ PTitleState: data[i].PTitle });
                    thisObj.setState({ PLastNameState: data[i].PLastName });
                    thisObj.setState({ PFirstNameState: data[i].PFirstName });
                    var varPDOB = data[i].PDOB_Month + "/" + data[i].PDOB_Day + "/" + data[i].PDOB_Year;
                    var DtPDOB = new Date(varPDOB);
                    thisObj.setState({ PDOB_State: DtPDOB });
                    thisObj.setState({ PNationality: data[i].PCountryOfCitizenship });
                    //thisObj.setState({PBirthPlace:data[i].PCountryOfCitizenship});
                    thisObj.setState({ PCountryOfBirth: data[i].PCountryOfCitizenship });
                }
                if (this.state.EmployedInOtherCountryState == "Yes") {
                    var varLDOB = data[i].ResCountry_BMonth + "/" + "01" + "/" + data[i].ResCountry_BYear;
                    var DtLDOB = new Date(varLDOB);
                    thisObj.setState({ PeriodCountryFrom: DtLDOB });
                    var varEDOB = data[i].ResCountry_EMonth + "/" + "01" + "/" + data[i].ResCountry_EYear;
                    var DtTDOB = new Date(varEDOB);
                    thisObj.setState({ PeriodCountryTo: DtTDOB });
                    thisObj.setState({ OccupationState: data[i].Occupation });
                    thisObj.setState({ EmployerName: data[i].CompanyCode });
                    thisObj.setState({ CountryOfEmployment: data[i].CountryOfResidency });
                    thisObj.setState({ OtherCountrySSNumberState: data[i].PersonalIDNum });
                }
            }
        }).catch((err) => {

        })
    }

    //Page Rendering
    render() {
        const { POBsearch, search, PPOBsearch, bsearch } = this.state;
        const google = window.google;
        return (
            <div>
                <Col xs={12} md={12} style={newstyle}>
                    <Panel eventKey="1" defaultExpanded={true}>
                        <Panel.Heading>
                            <Panel.Title >France Form</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Row className="show-grid" className="overall">
                                <Col xs={12} md={12} >
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} >
                                            <h4 className="ColorStyle"><b>Applicant Information</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Social Security Number<span className="manatoryfield">&nbsp;*</span></label>
                                            <TextField hintText="Enter your Social Security Number"
                                                errorText={this.state.isValidSSNumberState ? "Please Enter Your Social Security Number" : ""}
                                                value={this.state.SSNumberState}
                                                onChange={this.handleChangeSSNumber.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatSSNumberState ? "Please Enter Valid Social Security Number" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Prefix<span className="manatoryfield">&nbsp;*</span></label>
                                            <SelectField
                                                value={this.state.TitleState}
                                                errorText={this.state.isValidTitle ? "Please Select Your Prefix" : ""}
                                                hintText="Select the Prefix"
                                                onChange={this.handleChangeTitle.bind(this)}
                                                maxHeight={200}
                                            >
                                                {TitleItems}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Last Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Last Name"
                                                value={this.state.LastNameState}
                                                onChange={this.handleChangeLastName.bind(this)}
                                                disabled={false}
                                                errorText={this.state.isValidLastName ? "Please Enter Your Last Name" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatLastName ? "Please Enter the Valid Last Name" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Your name of use (optional, ex Name of the joint)</label>
                                            <TextField hintText="Enter Your name of use(optional) "
                                                value={this.state.OPNameState}
                                                onChange={this.handleChangeOPName.bind(this)}
                                                disabled={false}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatOPName ? "Please Enter the Valid  name of use(optional)" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>First Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your First Name"
                                                errorText={this.state.isValidFirstName ? "Please Enter Your First Name" : ""}
                                                value={this.state.FirstNameState}
                                                onChange={this.handleChangeFirstName.bind(this)}
                                                disabled={false}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatFirstName ? "Please Enter the Valid First Name" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Date Of Birth <span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter Your Date Of Birth"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                hintText="Select the date of birth"
                                                value={this.state.DOBState}
                                                onChange={this.handleChangeDOB.bind(this)}
                                                errorText={this.state.isValidDOB ? "Please Select your date of birth" : null}
                                            />
                                            <span className="validationmsg">{this.state.checkDateofBirth ? "Please select valid date" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Nationality<span className="manatoryfield">&nbsp;*</span></label>
                                            <SelectField
                                                value={this.state.Nationality}
                                                hintText="Select the nationality"
                                                onChange={this.handleChangeNationality.bind(this)}
                                                errorText={this.state.isValidNationality ? "Please Select Your Nationality" : null}
                                                maxHeight={200}
                                            >
                                                {NationalityItems}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Place Of Birth<span className="manatoryfield">*</span></label>

                                            <Geosuggest
                                                placeholder="Enter Your Place Of Birth"
                                                initialValue={this.state.BirthPlace}
                                                onSuggestSelect={this.handleSelectSuggestYourPlaceOfBirth.bind(this)}
                                                onChange={this.handleChangePlaceOfBirth.bind(this)}
                                                value={this.state.BirthPlace}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidBirthPlace ? "Please Enter Your Place Of Birth" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Department Of Birth <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Department Of Birth"
                                                name="DepartmentOfBirth"
                                                value={this.state.DepartmentOfBirth}
                                                errorText={this.state.isValidDepartmentOfBirth ? "Please Enter Your Department" : ""}
                                                onChange={this.handleChangeDeptOfBirth.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatDepartmentOfBirth ? "Please Enter the Valid Department" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Country Of Birth<span className="manatoryfield">&nbsp;*</span></label>
                                            <SelectField
                                                value={this.state.CountryOfBirth}
                                                hintText="Select the Country of birth"
                                                onChange={this.handleChangeCountryOfBirth.bind(this)}
                                                errorText={this.state.isValidCountryOfBirth ? "Please Select Your Country Of Birth" : null}
                                                maxHeight={200}
                                            >
                                                {CountryOfBirthItems}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} >
                                            <h4 className="ColorStyle"><b>Address Details Of Applicant</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Address<span className="manatoryfield">*</span></label>

                                            <Geosuggest
                                                placeholder="Enter Your Client Company Address"
                                                initialValue={this.state.Address}
                                                onSuggestSelect={this.handleSelectSuggest.bind(this)}
                                                onChange={this.handle_address.bind(this)}
                                                value={this.state.Address}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidAddress ? "Please Enter Your Client Company Address" : null}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Country<span className="manatoryfield">&nbsp;*</span></label>
                                            <SelectField
                                                value={this.state.Country}
                                                hintText="Select the country"
                                                onChange={this.handleChangeCountry.bind(this)}
                                                errorText={this.state.isValidCountry ? "Please Select Your Country" : null}
                                                maxHeight={200}
                                            >
                                                {CountryItems}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        {/* <Col xs={12} md={4} className="input-fileds">
                                            <TextField hintText="Enter your Postal Code" floatingLabelText={<span>ZipCode<span className="manatoryfield">&nbsp;*</span></span>}
                                                errorText={this.state.isValidZipCodeState ? "Please Enter Your ZipCode" : ""}
                                                value={this.state.ZipCodeState}
                                                onChange={this.handleChangeZipCode.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatZipCodeState ? "Please Enter the Valid ZipCode" : ""}</span>
                                        </Col> */}
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Email<span className="manatoryfield">&nbsp;*</span></label>
                                            <TextField hintText="Enter your Email"
                                                errorText={this.state.validationError["Email"] ? " Please Enter Your Email" : ""}
                                                type="email"
                                                value={this.state.EmailState}
                                                onChange={this.handleChangeEmail.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidEmailFormat ? "Please Enter the Valid Mail" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Telephone No<span className="manatoryfield">&nbsp;*</span></label>
                                            <TextField hintText="Enter Your Telephone No"
                                                value={this.state.PhoneNum}
                                                onChange={this.handleChangePhoneNum.bind(this)}
                                                errorText={this.state.isValidPhoneNum ? "Please Enter Your Telephone No" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatPhoneNum ? "Please Enter the Valid Phone Number" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} >
                                            <h4 className="ColorStyle"><b>Marital Details Of Applicant</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>Marital Status<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                value={this.state.MaritalStatusState}
                                                hintText="Select the marital status"
                                                onChange={this.handleChangeMaritalStatus.bind(this)}
                                                maxHeight={200}
                                            >
                                                {MaritalStatusItems}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    {this.state.MaritalStatusState == "M" ?
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                <label>Married Status</label>
                                                <SelectField
                                                    value={this.state.MarriedState}
                                                    hintText="Select the married status"
                                                    onChange={this.handleChangeMarriedState.bind(this)}
                                                    maxHeight={200}
                                                >
                                                    {MarriedItems}
                                                </SelectField>
                                            </Col>
                                            {this.state.MarriedState == "PAC" || this.state.MarriedState == "C" ?
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Date Of Married <span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the date of marriage"
                                                        value={this.state.MDate}
                                                        onChange={this.handleChangeMDate}
                                                        errorText={this.state.isValidMDate ? "Please Select the Date Of Married 0r divorce or date of death" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.ValidateYearWorked5 ? "Please select valid date of Married " : ""}</span>
                                                    <span className="validationmsg">{this.state.checkValid ? "Please Enter the Valid Married 0r divorce or date of death " : ""}</span>
                                                </Col>
                                                : ""}
                                        </Col>
                                        : ""}
                                    {this.state.MaritalStatusState == "D" ?
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                <label>Divorcee Status</label>
                                                <SelectField
                                                    value={this.state.DivorceeState}
                                                    hintText="Select the divorcee status"
                                                    onChange={this.handleChangeDivorceeState.bind(this)}
                                                    maxHeight={200}
                                                >
                                                    {DivorceeItems}
                                                </SelectField>
                                            </Col>
                                            {this.state.DivorceeState == "S" || this.state.DivorceeState == "WI" ?
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Date of divorce or date of death<span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the date of divorce"
                                                        value={this.state.DDate}
                                                        onChange={this.handleChangeDDate.bind(this)}
                                                        errorText={this.state.isValidDDate ? "Please Select the Date Of Married 0r divorce or date of death" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.checkValid1 ? "Please select  Valid Married 0r divorce or date of death " : ""}</span>
                                                    <span className="validationmsg">{this.state.ValidateYearWorked6 ? "Please Enter the Valid Married 0r divorce or date of death" : ""}</span>
                                                </Col>
                                                : ""}
                                        </Col>
                                        : ""}
                                    {this.state.MaritalStatusState == "M" || this.state.MaritalStatusState == "D" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12}>
                                                    <h4 className="ColorStyle"><b>Spouse Or Civil Partner Information</b></h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Spouses Social Security Number RSI (in France)<span className="manatoryfield">&nbsp;*</span></label>
                                                    <TextField hintText="Enter your Spouse Social Security Number"
                                                        errorText={this.state.isValidPSSNumberState ? "Please Enter Your Spouse Social Security Number" : ""}
                                                        value={this.state.PSSNumberState}
                                                        onChange={this.handleChangePSSNumber.bind(this)}
                                                    />
                                                    <span className="validationmsg">{this.state.isValidFormatPSSNumberState ? "Please Enter Valid Spouse Social Security Number" : ""}</span>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Spouse Prefix<span className="manatoryfield">&nbsp;*</span></label>
                                                    <SelectField
                                                        value={this.state.PTitleState}
                                                        errorText={this.state.isValidPTitle ? "Please Select Your Title" : ""}
                                                        hintText="Select the Spouse Prefix"
                                                        onChange={this.handleChangePTitle.bind(this)}
                                                        maxHeight={200}
                                                    >
                                                        {PTitleItems}
                                                    </SelectField>
                                                </Col>

                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Spouse Last Name <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Last Name"
                                                        errorText={this.state.isValidPLastName ? "Please Enter Your Partner Last Name" : ""}
                                                        value={this.state.PLastNameState}
                                                        onChange={this.handleChangePLastName.bind(this)}
                                                    />
                                                    <span className="validationmsg">{this.state.isValidFormatPLastName ? "Please Enter the Valid Last Name" : ""}</span>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Spouses name usage (optional)</label>
                                                    <TextField hintText="Enter Your Spouses name usage (optional)"
                                                        //errorText={this.state.isValidPOPName ? "Please Enter Your Spouses name usage (optional)" : ""}
                                                        value={this.state.POPNameState}
                                                        onChange={this.handleChangePOPName.bind(this)}
                                                    />
                                                    <span className="validationmsg">{this.state.isValidFormatPOPName ? "Please Enter the Valid Spouses name usage (optional)" : ""}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Spouse First Name<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Spouse First Name"
                                                        errorText={this.state.isValidPFirstName ? "Please Enter Your Spouse First Name" : ""}
                                                        value={this.state.PFirstNameState}
                                                        onChange={this.handleChangePFirstName.bind(this)}
                                                    />
                                                    <span className="validationmsg">{this.state.isValidFormatPFirstName ? "Please Enter the Valid First Name" : ""}</span>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Date Of Birth <span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter the date of birth"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PDOB_State}
                                                        onChange={this.handleChangePDOB.bind(this)}
                                                        errorText={this.state.isValidPDOB ? "Please Enter Your Spouse Date of Birth" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.checkValidSpouseDate ? "Please select valid Spouse date of birth " : ""}</span>

                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Spouse Nationality<span className="manatoryfield">&nbsp;*</span></label>
                                                    <SelectField
                                                        value={this.state.PNationality}
                                                        hintText="Select the spouse nationality"
                                                        onChange={this.handleChangePNationality.bind(this)}
                                                        errorText={this.state.isValidPNationality ? "Please Select Your Spouse Nationality" : null}
                                                        maxHeight={200}
                                                    >
                                                        {PNationalityItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Spouse  Place Of Birth<span className="manatoryfield">*</span></label>

                                                    <Geosuggest
                                                        placeholder=" Enter Your Spouse Place Of Birth"
                                                        initialValue={this.state.PBirthPlace}
                                                        onSuggestSelect={this.handleSelectSuggestPlaceOfBirth.bind(this)}
                                                        onChange={this.handleChangePPlaceOfBirth.bind(this)}
                                                        value={this.state.PBirthPlace}
                                                        location={new google.maps.LatLng("", "")}
                                                        radius="20"
                                                    />
                                                    <span className="validationmsg">{this.state.isValidPBirthPlace ? "Please Enter Your Spouse Place Of Birth" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Spouse Department Of Birth <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Spouse Department Of Birth"
                                                        name="PDepartmentOfBirth"
                                                        value={this.state.PDepartmentOfBirth}
                                                        errorText={this.state.isValidPDepartmentOfBirth ? "Please Enter Your Spouse Department" : ""}
                                                        onChange={this.handleChangePDeptOfBirth.bind(this)}
                                                    />
                                                    <span className="validationmsg">{this.state.isValidFormatPDepartmentOfBirth ? "Please Enter the Valid Department" : ""}</span>
                                                </Col>
                                                {/* {console.log("isValidPCountryOfBirth=" + this.state.isValidPCountryOfBirth)} */}
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Spouse Country Of Birth<span className="manatoryfield">&nbsp;*</span></label>
                                                    <SelectField
                                                        value={this.state.PCountryOfBirth}
                                                        hintText="Select the country of birth"
                                                        onChange={this.handleChangePCountryOfBirth}
                                                        errorText={this.state.isValidPCountryOfBirth ? "Please Select Your Country Of Birth" : null}
                                                        maxHeight={200}
                                                    >
                                                        {PCountryOfBirthItems}
                                                    </SelectField>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ""}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12}>
                                            <h4 className="ColorStyle"><b>Child Information</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Child Last Name</label>
                                            <TextField hintText="Enter Your  Child Last Name"
                                                value={this.state.CLastNameState}
                                                onChange={this.handleChangeChildLastName.bind(this)}
                                                //errorText={this.state.isValidCLastName ? "Please Enter Your Child Last Name" : ""}
                                                disabled={false}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatCLastName ? "Please Enter the Valid Last Name" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Child First Name</label>
                                            <TextField hintText="Enter Your Child  First Name"
                                                value={this.state.CFirstNameState}
                                                onChange={this.handleChangeChildFirstName.bind(this)}
                                                disabled={false}
                                            //errorText={this.state.isValidCFirstName ? "Please Enter Your Child First Name" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatCFirstName ? "Please Enter the Valid First Name" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Relationship with the Child</label>
                                            <TextField hintText="Enter Your Relationship"
                                                //errorText={this.state.isValidCRelationship ? "Please Enter Your Child Relationship" : ""}
                                                value={this.state.CRelationship}
                                                onChange={this.handleChangeChildRelationship.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatCRelationship ? "Please Enter the Valid Relationship" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Child Date Of Birth</label>
                                            <DatePicker hintText={<span>Enter Your Child Date Of Birth</span>}
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.CDOBState}
                                                onChange={this.handleChangeCDOB.bind(this)}
                                                errorText={this.state.checkValid2 ? "Please select valid Child date of birth " : ""}
                                            />
                                            <span className="validationmsg">{this.state.ValidateYearWorked1 ? "Please Enter the Valid Child Date" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Years Of Care</label>
                                            <TextField hintText="Years of care until age 16 anniversary (number of years, i.e. 16)"
                                                //errorText={this.state.isValidCare ? "Please Enter Your Child Care Of Number Of Years" : ""}
                                                value={this.state.CareState}
                                                onChange={this.handleChangeCareState.bind(this)}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>Have you had your responsibility Have child (s) handicapped?</label>
                                            <SelectField
                                                value={this.state.ChildResponsibilityState}
                                                hintText="Select the child responsibility"
                                                onChange={this.handleChangeResponsibility.bind(this)}
                                                maxHeight={200}
                                            // errorText={this.state.isValidResponsibility ? "Please Enter your Child Responsibility" : null}
                                            >
                                                {ResponsibilityItems}
                                            </SelectField>
                                        </Col>
                                        {(this.state.ChildResponsibilityState == "Yes") ?
                                            <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                <label>Child Support Specification</label>
                                                <TextField hintText="Reason State"
                                                    //errorText={this.state.isValidReason ? "Please Enter Your Child Support Specification" : ""}
                                                    value={this.state.ReasonState}
                                                    onChange={this.handleChangeReasonState.bind(this)} />
                                            </Col>
                                            : ''}
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fields">
                                            <Button onClick={this.handleBenQusChildDatas.bind(this)} className="RQ-Add" >Add Another Children</Button>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} >
                                            <h4 className="ColorStyle"><b>Adults with disabilities that you had your permanent charge</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>Have you had your permanent support one or more adult (s) handicapped (s) ?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.ChildSupportState} onChange={this.handleChangeSupport.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidSupport ? "Please Enter your Child Support" : null}</span>
                                        </Col>
                                    </Col>
                                    {(this.state.ChildSupportState == "Yes") ?
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                <label>Support Specification</label>
                                                <TextField hintText="Please Specify the Support"
                                                    errorText={this.state.isValidSupportReason ? "Please Enter Your Child Support" : ""}
                                                    value={this.state.SupportReasonState}
                                                    onChange={this.handleChangeSupportReason.bind(this)} />
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                <label>Period of Support</label>
                                                <TextField hintText="Please Specify the period of support:"
                                                    errorText={this.state.isValidPeriodOfSupport ? "Please Enter Your Period Of Support" : ""}
                                                    value={this.state.PeriodOfSupport}
                                                    onChange={this.handleChangePeriodOfSupport.bind(this)} />
                                            </Col>
                                        </Col>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>Your retirement date</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>Date Of Retire<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter the date You would like to retire"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.RetireDateState}
                                                onChange={this.handleChangeRetireDate.bind(this)}
                                                errorText={this.state.isValidRetireDate ? "Please Select the date you would like to retire" : null}
                                            />
                                            <span className="validationmsg">{this.state.checkValid3 ? "Please select Valid retire Date" : ""}</span>
                                            <span className="validationmsg">{this.state.ValidateYearWorked ? "Please Enter the Valid retire Date" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>At the time of your retirement, have you asked all your personal pension base and complementary for all of your activities in France and in other countries?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.AskPensionBase} onChange={this.handleChangeAskPensionBase.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidPensionBase ? "Please Enter your Pension Base" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <h4 className="ColorStyle"><b>The termination of your activities</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>At the timing of your retirement, have you or will you stop all your business activities in France?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.RetirementBusinessState} onChange={this.handleChangeRetirementBusiness.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidRetirementBusiness ? "Please Enter your Business at the time of your retirement" : null}</span>
                                        </Col>
                                    </Col>
                                    {(this.state.RetirementBusinessState == "No") ?
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={12} className="input-fileds align-fileds" >
                                                <label>If not, what (s) activity (s) would you like to keep in the employment-retirement accumulation (see your retirement advisor about the possibilities of cumulation)?</label>
                                                <TextField hintText="Please Specify the Activity"
                                                    errorText={this.state.isValidEmploymentActivity ? "Please Specify the business Activity" : ""}
                                                    value={this.state.EmploymentActivity}
                                                    onChange={this.handleChangeEmploymentActivity.bind(this)} />
                                            </Col>
                                        </Col>
                                        : ''}
                                    {(this.state.RetirementBusinessState == "Yes") ?
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="Radio_button">
                                                <label>Please Specify the State Recognized (e) unemployable <span className="manatoryfield">*</span></label>
                                                <RadioButtonGroup valueSelected={this.state.UnemployableState} onChange={this.handleChangeUnemployable.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                <span className="validationmsg">{this.state.isValidUnemployableState ? "Please Enter Your State Recognized (e) unemployable" : null}</span>
                                            </Col>
                                        </Col>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label>Please Specify Disabled (e) (under certain conditions)?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.DisabledState} onChange={this.handleChangeDisabledState.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidDisabledState ? "Please Enter have you been employed  in other countries than France" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={8} className="Radio_button">
                                            <label>Please Specify Old (not) fighter (e) prisoner (e) of war, deported (an) interned or (e):<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.OldState} onChange={this.handleChangeOldState.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidOldState ? "Please Specify Old (not) fighter (e) prisoner (e) of war, deported" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label>Mother of at least three children, have worked in manual labor worker?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.LabourState} onChange={this.handleChangeLabourState.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidLabourState ? "Please Specify mother of at least three children, have worked in manual labor worker" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>Please specify have you interrupted your professional activity as a family caregiver or other person with a disability?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.professionalActivityState} onChange={this.handleChangeprofessionalActivityState.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidprofessionalActivityState ? "Please specify have you interrupted your professional activity as a family caregiver or other person with a disability?" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label>Do you have a professional account of prevention<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.ProfessionalAccPreState} onChange={this.handleChangeProfessionalAccPreState.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidProfessionalAccPreState ? "Please Enter your Professional Account Prevention State" : null}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label>Have you been employed in other countries than France?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.EmployedInOtherCountryState} onChange={this.handleChangeEmployedInOtherCountryState.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidEmployedInOtherCountryState ? "Please Enter have you been employed  in other countries than France" : null}</span>
                                        </Col>
                                    </Col>
                                    {(this.state.EmployedInOtherCountryState == "Yes") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} >
                                                    <h4 className="ColorStyle"><b>Employed Other than France Country Information</b></h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Please Specify Period in this country (FROM)</label>
                                                    <DatePicker hintText="Select Period in this country (FROM)"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PeriodCountryFrom}
                                                        onChange={this.handleChangePeriodCountryFrom.bind(this)}
                                                        errorText={this.state.isvalidPeriodCountryFrom ? "Please Specify Period in this country (FROM)" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.checkValidFutureFromDate ? "Please select valid Period in this country (FROM) Date " : ""}</span>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Please Specify Period in this country (To)</label>
                                                    <DatePicker hintText="Select Period in this country (FROM)"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.PeriodCountryTo}
                                                        onChange={this.handleChangePeriodCountryTo.bind(this)}
                                                        errorText={this.state.isvalidPeriodCountryTo ? "Please Specify Period in this country (To)" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.checkValidFutureFromDate2 ? "Please select valid Period in this country (To) Date " : ""}</span>
                                                    <span className="validationmsg">{this.state.ValidateWorked ? "Please Select Your valid  Date" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Practical activity (occupation) <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Please Specify Practical activity (occupation)"
                                                        errorText={this.state.isValidOccupationState ? "Please Specify Practical activity (occupation)" : ""}
                                                        value={this.state.OccupationState}
                                                        onChange={this.handleChangeOccupationState.bind(this)} />
                                                    <span className="validationmsg">{this.state.isValidFormatOccupationState ? "Please Enter the Valid Occupation" : ""}</span>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Place of employment (employer's name)<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Please Specify Place of employment (employer's name)"
                                                        errorText={this.state.isValidEmployerNameState ? "Please Specify Place of employment (employer's name)" : ""}
                                                        value={this.state.EmployerName}
                                                        onChange={this.handleChangeEmployerName.bind(this)} />
                                                    <span className="validationmsg">{this.state.isValidFormatEmployerNameState ? "Please Enter the Valid Employer Name" : ""}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Please Specify Country of Employment<span className="manatoryfield">&nbsp;*</span></label>
                                                    <SelectField
                                                        value={this.state.CountryOfEmployment}
                                                        hintText="Select the Country of Employment"
                                                        onChange={this.handleChangeCountryOfEmployment.bind(this)}
                                                        errorText={this.state.isValidCountryOfEmployment ? "Please Specify Country of Employment" : null}
                                                        maxHeight={200}
                                                    >
                                                        {CountryOfEmploymentItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Your Social / National Insurance number in this country<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Please Specify Your Social / National Insurance number in this country"
                                                        errorText={this.state.isValidOtherCountrySSNumberState ? "Please Specify Your Social / National Insurance number in this country" : ""}
                                                        value={this.state.OtherCountrySSNumberState}
                                                        onChange={this.handleChangeOthCountrySSNumberState.bind(this)} />
                                                </Col>
                                                <span className="validationmsg">{this.state.isValidFormatOtherCountrySSNumberState ? "Please Enter the Valid SSN Number State" : ""}</span>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>By what social security organization are your medical expenses supported?</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>Enter Cpam <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Please Specify Cpam"
                                                errorText={this.state.isValidCPam ? "Please Specify Cpam" : ""}
                                                value={this.state.CPam}
                                                onChange={this.handleChangeCPam.bind(this)} />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>Organizations contracted independent Social Security <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Please Specify Organizations contracted independent Social Security"
                                                errorText={this.state.isValidOrgContractedSSNumberState ? "Please Specify Organizations contracted independent Social Security" : ""}
                                                value={this.state.OrgContractedSSNumberState}
                                                onChange={this.handleChangeOrgContractedSSN.bind(this)} />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>MSA <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Please Specify MSA"
                                                errorText={this.state.isValidMSAState ? "Please Specify MSA" : ""}
                                                value={this.state.MSAState}
                                                onChange={this.handleChangeMSAState.bind(this)} />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>Specify Other French organization <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Please Specify Other French organization"
                                                errorText={this.state.isValidOtherFrenchOrgState ? "Please Specify Other French organization" : ""}
                                                value={this.state.OtherFrenchOrgState}
                                                onChange={this.handleChangeOtherFrenchOrgState.bind(this)} />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={8} className="input-fileds align-fileds" >
                                            <label>Your Foreign Organisation <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Please Specify  Foreign Organisation (e.g. United States, Medicare at retirement)"
                                                errorText={this.state.isValidOtherForeignOrgn ? "Please Specify Other Foreign Organisation" : ""}
                                                value={this.state.OtherForeignOrgn}
                                                onChange={this.handleChangeForeignOrganisation.bind(this)} />
                                        </Col>
                                    </Col>
                                    {/* <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <h4 className="TopicAlign"><b>Received Benefits While Living In France.</b></h4>
                                        </Col>
                                    </Col> */}
                                    {/* {(EmployedInOtherCountryState = "Yes") ? */}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={8} className="Radio_button">
                                            <label>Have you ever asked for or do you receive one of the following benefits while living in France? <span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.BenefitsInFranceState} onChange={this.handleChangeBenefitsInFranceState.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidBenefitsInFranceState ? "Please specify have you ever asked for or do you receive one of the following benefits while living in France?" : null}</span>
                                        </Col>
                                    </Col>
                                    {/* :""} */}
                                    {(this.state.BenefitsInFranceState == "Yes" && this.state.Nationality != "France") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12}>
                                                    <h4 className="ColorStyle"><b>Pay Details</b></h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Benefits List</label>
                                                    <SelectField
                                                        value={this.state.BenefitsListState}
                                                        hintText="Select the benefits list"
                                                        onChange={this.handleChangeBenefitsList.bind(this)}
                                                        maxHeight={200}
                                                    >
                                                        {BenefitItems}
                                                    </SelectField>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Your Paying Agency </label>
                                                    <TextField hintText="Please Specify  Name of the paying agency:"
                                                        errorText={this.state.isValidPayingAgencyState ? "Please Specify Name of the paying agency:" : ""}
                                                        value={this.state.PayingAgencyState}
                                                        onChange={this.handleChangePayingAgencyState.bind(this)} />
                                                </Col>
                                                {/* <span className="validationmsg">{this.state.isValidFormatPayingAgencyState ? "Please Enter the Valid Name Of the Paying Agency" : ""}</span> */}
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Agency Address</label>
                                                    
                                                    <Geosuggest
                                                        placeholder="Select the Agency Address"
                                                        initialValue={this.state.AgencyAddressState}
                                                        onSuggestSelect={this.handleSelectAgencySuggest.bind(this)}
                                                        onChange={this.handleChangeAgencyAddressState.bind(this)}
                                                        value={this.state.AgencyAddressState}
                                                        location={new google.maps.LatLng("", "")}
                                                        radius="20"
                                                    />
                                                    <span className="validationmsg">{this.state.isValidAgencyAddressState ? "Please Choose Your Agency Address" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Your Postal Code </label>
                                                    <TextField hintText="Please Specify  Postal Code"
                                                        errorText={this.state.isValidPostalCodeState ? "Please Specify Your Postal Code" : ""}
                                                        value={this.state.PostalCodeState}
                                                        onChange={this.handleChangePostalCodeState.bind(this)} />
                                                </Col>
                                                <span className="validationmsg">{this.state.isValidFormatPostalCodeState ? "Please Enter the Valid Name Of the Paying Agency" : ""}</span>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Your Paying City</label>
                                                    <TextField hintText="Please Specify  Paying City"
                                                        errorText={this.state.isValidPayingCity ? "Please Specify Other Paying City" : ""}
                                                        value={this.state.PayingCity}
                                                        onChange={this.handleChangePayingCity.bind(this)} />
                                                </Col>
                                                <span className="validationmsg">{this.state.isValidFormatFirstName ? "Please Enter the Valid First Name" : ""}</span>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Your Nature Of Service </label>
                                                    <TextField hintText="Please Specify  Nature Of Service"
                                                        errorText={this.state.isValidNatureOfService ? "Please Specify Nature Of Service" : ""}
                                                        value={this.state.NatureOfService}
                                                        onChange={this.handleChangeNatureOfYourService.bind(this)} />
                                                </Col>
                                                <span className="validationmsg">{this.state.isValidFormatFirstName ? "Please Enter the Valid First Name" : ""}</span>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Please Specify  Number Of File</label>
                                                    <TextField hintText="Please Specify  Number Of File"
                                                        errorText={this.state.isValidNumberOfFile ? "Please Specify Number Of File" : ""}
                                                        value={this.state.NumberOfFile}
                                                        onChange={this.handleChangeNumberOfFile.bind(this)} />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Grant Date Of Benefit</label>
                                                    <DatePicker hintText="Enter the date You recived Grant Date Of Benefit"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.GrantDateOfBenefit}
                                                        onChange={this.handleChangeGrantDateOfYourBenefit}
                                                        errorText={this.state.isValidGrantDateOfBenefit ? "Please Specify Grant Date Of Benefit" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.checkValidFutureFromDate1 ? "Please select valid Grant Date Of Benefit " : ""}</span>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Specify Current Request</label>
                                                    <TextField hintText="Please Specify Current Request."
                                                        errorText={this.state.isValidCurrentRequest ? "Please Specify Current Request" : ""}
                                                        value={this.state.CurrentRequest}
                                                        onChange={this.handleChangeCurrentRequest.bind(this)} />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Name your deceased spouse</label>
                                                    <TextField hintText="Name your deceased spouse if there is a survivor's pension"
                                                        errorText={this.state.isValidSpouseNameInService ? "Please Name your deceased spouse if there is a survivor's pension" : ""}
                                                        value={this.state.SpouseNameInService}
                                                        onChange={this.handleChangeNameYourSpouse.bind(this)} />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fields">
                                                    <Button onClick={this.handleAnotherAgency.bind(this)} className="RQ-Add" >Add Another Agency</Button>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ""}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Date Of Signature <span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="select the Date Of Signature"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.DateOfSignature}
                                                onChange={this.handleChangeDateOfSignature}
                                                errorText={this.state.isValidDateOfSignature ? "Please Select the date of Signature" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={3}></Col>
                                        <Col xs={12} md={3} className="input-fileds Sign" >
                                            <br />
                                            <label>Signature</label>
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
                                <Button onClick={this.handleSubmit.bind(this)} className="RQ-Add" >Save</Button>
                                <Notifications />
                            </Col>
                        </Col>
                    </Panel>
                </Col>
            </div>
        );
    }

    

    //Save Function
    handleSubmit(event) {
        event.preventDefault();
        var thisObj = this;
        var isValid = this.handleValidateForm(this);
        if (isValid) {
            let clientRegAPIUrl = "https://4k73oeispk.execute-api.us-west-2.amazonaws.com/dev/GPA_BenQusDatas_Lambda";
            let BenQusFranceJSONData = JSON.stringify({
                QueryName: "Save",
                UserID: emailresult,
                CountryCode: this.state.CountryCode,
                AppAnsInJsonObj: {
                    SSNumberState: this.state.SSNumberState,
                    TitleState: this.state.TitleState,
                    FirstName: this.state.FirstNameState,
                    LastName: this.state.LastNameState,
                    DOBState: this.state.DOBState,
                    PDOBState: this.state.PDOB_State,
                    BirthName: this.state.BirthName,
                    Place_Of_Birth: this.state.BirthPlace,
                    DepartmentOfBirth: this.state.DepartmentOfBirth,
                    NativeCountryOfBirth: this.state.CountryOfBirth,
                    Address: this.state.Address,
                    Nationality: this.state.Nationality,
                    Country: this.state.Country,
                    PhoneNum: this.state.PhoneNum,
                    ZipCode: this.state.ZipCodeState,
                    EmailState: this.state.EmailState,
                    PartnerSocialNumber: this.state.PSSNumberState,
                    PartnerTitleState: this.state.PTitleState,
                    PartnerFirstName: this.state.PFirstNameState,
                    PartnerLastName: this.state.PLastNameState,
                    PartnerBirthName: this.state.PBirthName,
                    PartnerPlace_Of_Birth: this.state.PBirthPlace,
                    PartnerDepartmentOfBirth: this.state.PDepartmentOfBirth,
                    PartnerNativeCountryOfBirth: this.state.PCountryOfBirth,
                    ChildSupportState: this.state.ChildSupportState,
                    SupportReasonState: this.state.SupportReasonState,
                    PeriodOfSupport: this.state.PeriodOfSupport,
                    RetireDate: this.state.RetireDate,
                    AskPensionBase: this.state.AskPensionBase,
                    PensionPlan: this.state.PensionPlan,
                    PensionReversion: this.state.PensionReversion,
                    PensionPlanApplied: this.state.PensionPlanApplied,
                    EmploymentActivity: this.state.EmploymentActivity,
                    RetirementBusinessState: this.state.RetirementBusinessState,
                    UnemployableState: this.state.UnemployableState,
                    DisabledState: this.state.DisabledState,
                    OldState: this.state.OldState,
                    LabourState: this.state.LabourState,
                    professionalActivityState: this.state.professionalActivityState,
                    ProfessionalAccPreState: this.state.ProfessionalAccPreState,
                    EmployedInOtherCountryState: this.state.EmployedInOtherCountryState,
                    PeriodCountryFrom: this.state.PeriodCountryFrom,
                    PeriodCountryTo: this.state.PeriodCountryTo,
                    OccupationState: this.state.OccupationState,
                    EmployerName: this.state.EmployerName,
                    CountryOfEmployment: this.state.CountryOfEmployment,
                    OtherCountrySSNumberState: this.state.OtherCountrySSNumberState,
                    CPam: this.state.CPam,
                    OrgContractedSSNumberState: this.state.OrgContractedSSNumberState,
                    MSAState: this.state.MSAState,
                    OtherFrenchOrgState: this.state.OtherFrenchOrgState,
                    //OtherCountrySSNumberState: this.state.OtherCountrySSNumberState,
                    BenefitsInFranceState: this.state.BenefitsInFranceState,
                    Children: ClaimantChildrens,
                    Agency: AgencyData,
                    BenefitsListState: this.state.BenefitsListState,
                    DateOfSignature: this.state.DateOfSignature,
                },
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
                url: clientRegAPIUrl,
                data: BenQusFranceJSONData,
                // headers:AxiosHeaderConfig,
            }).then((data) => {
                notify.show("Your Information Saved Successfully", "success", 3000);
                this.handleReset(this);
                this.handleAppProcessFlowUpdate(this);
               // thisObj.handleSendBilateralForms(this);
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

            history.push('/MainPage');
        }).catch((err) => {

        })
    }
}

BenQusFrance.propTypes = {
    googleMaps: PropTypes.object,
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
export default connect(mapReducerStateToProps, mapDispatchToProps)(BenQusFrance);