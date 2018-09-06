import React, { Component } from 'react';
import PropTypes from "prop-types";
//BootStrap Component
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

//Google Address
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";

//API Calling Methods
import axios from 'axios';

//Signature Pad
import SignaturePad from 'react-signature-pad';

//Notification
import Notifications, { notify } from 'react-notify-toast';

//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';
var emailresult;
var email
const API_KEY = "AIzaSyADGT_Xy9rtzFPhH-m0VG5cWL-hi0sK5jA";

const newstyle = {
    marginTop: 10,
}
const MaritalStatusItems = [
    <MenuItem value={"S"} key={1} primaryText={`Single`} />,
    <MenuItem value={"M"} key={2} primaryText={`Married`} />,
    <MenuItem value={"D"} key={3} primaryText={`Divorced`} />,
    <MenuItem value={"W"} key={4} primaryText={`Widowed`} />,
    <MenuItem value={"SP"} key={5} primaryText={`Separated`} />,
];
const CountryItems = [];

const ClaimantFamily = [];

const ClaimantChild = [];

const ClaimantReceiving = [];

const PeriodEmpCoverIns = [];

const PeriodOfMilitary = [];

const USFederalAgency = [];

const EmpCoveredByUSSSSys = [];

const PrevAppUSSSBen = [];

const style = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

class BenQusItaly extends Component {
    constructor(props) {
        super(props);
        this.handleLoadCountry(this);
        this.handleBenQusItalyAuto(this);
        //Field State Values Initialization
        this.state = {
            BtnNameState: "Save",
            CountryCode: "IT",
            BenefitsState: '',
            DateDisabilityState: '',
            DisabilityState: '',
            ApplyBenefitsState: 'No',
            FirstNameState: '',
            LastNameState: '',
            MadienNameState: '',
            BirthNameState: '',
            SSNumberState: '',
            IINumberState: '',
            SexState: '',
            PFirstNameState: '',
            PLastNameState: '',
            PMadienNameState: '',
            RelationshipState: '',
            DateOfBirthState: '',
            search: "",
            value: "",
            PlaceOfBirthState: "",
            CitizenshipState: '',
            CountryResState: '',
            MaritalState: '',
            WeddingDateState: '',
            ClaimState: '',
            BenefitsClaimState: '',
            FullNameState: '',
            WorkerState: '',
            PDateOfBirthState: '',
            DetailsState: '',
            PFullNameState: '',
            search1: "",
            AddressState: '',
            FamilyIncomeState: '',
            CFullNameState: '',
            TypeofIncomeState: '',
            MonthlyAmountState: '',
            WorkingState: '',
            WorkingEmpState: '',
            WorkingDateState: '',
            SpousePensionState: '',
            ChildFullNameState: '',
            InsuranceNameState: '',
            MonthlyBenefitsState: '',
            CDateOfBirthState: '',
            search2: "",
            PPlaceOfBirthState: '',
            PMaritalState: '',
            PCitizenshipState: '',
            search3: "",
            PlaceOfDeathState: '',
            DateOfDeathState: '',
            ReceivingBenefitsState: '',
            TypeBenefitsState: '',
            AccountNumberState: '',
            PayingAgencyState: '',
            ClaimingBenefitsState: '',
            DecreeState: '',
            PClaimingBenefitsState: '',
            SpouseState: '',
            ChildrenState: '',
            PSpouseState: '',
            PChildrenState: '',
            ParentsState: '',
            WorkedFromState: '',
            WorkedToState: '',
            WorkingAddressState: '',
            TypeOfIndustryState: '',
            PaidAgencyState: '',
            InsuranceNumberState: '',
            MilitarySerivceState: '',
            WorkedFromMilitaryState: '',
            WorkedToMilitaryState: '',
            MilitaryBranchState: '',
            CountryServedState: '',
            MFullNameState: '',
            MRelationshipState: '',
            FederalAgencyState: '',
            WorkerEngageState: '',
            WorkedFromUSState: '',
            WorkedToUSState: '',
            search5: "",
            WorkedEngageAddressState: '',
            EmpInfoState: '',
            USBenefitsState: '',
            FFullNameState: '',
            ClaimNumberState: '',
            BenefitsAppliedState: '',
            BenefitsPaidState: '',
            AppBenefitsState: '',
            OldAgeBenefitsState: '',
            RemarkState: '',
            Msearch: "",
            MailingAddressState: '',
            AWsearch: "",
            WitnessAddressState: '',
            AW2search: "",
            Witness2AddressState: '',
            DateSignature: "",
            validationError: {},
            isValidBenefits: false,
            isValidDateDisability: false,
            isValidDisability: false,
            isValidApplyBenefits: false,
            isValidFirstName: false,
            isValidLastName: false,
            isValidMadienName: false,
            isValidBirthName: false,
            isValidSSNumber: false,
            isValidIINumber: false,
            isValidSex: false,
            isValidPFirstName: false,
            isValidPLastName: false,
            isValidPMadienName: false,
            isValidRelationship: false,
            isValidDateOfBirth: false,
            isValidPlaceOfBirth: false,
            isValidCitizenship: false,
            isValidCountryRes: false,
            isValidMarital: false,
            // isValidWeddingDate: false,
            isValidClaim: false,
            isValidFullName: false,
            isValidWorker: false,
            isValidPDateOfBirth: false,
            isValidBenefitsClaim: false,
            isValidPFullName: false,
            isValidAddress: false,
            isValidDetails: false,
            isValidFamilyIncome: false,
            isValidCFullName: false,
            isValidTypeOfIncome: false,
            isValidMonthlyAmount: false,
            isValidWorking: false,
            isValidWorkingEmp: false,
            isValidWorkingDate: false,
            isValidSpousePension: false,
            isValidChildFullName: false,
            isValidInsuranceName: false,
            isValidMonthlyBenefits: false,
            isValidCDateOfBirth: false,
            isValidPPlaceOfBirth: false,
            isValidPMarital: false,
            isValidPCitizenship: false,
            isValidPlaceOfDeath: false,
            isValidDateOfDeath: false,
            isValidReceivingBenefits: false,
            isValidTypeBenefits: false,
            isValidAccountNumber: false,
            isValidPayingAgency: false,
            isValidClaimingBenefits: false,
            isValidDecree: false,
            isValidPClaimingBenefits: false,
            isValidSpouse: false,
            isValidChildren: false,
            isValidPSpouse: false,
            isValidPChildren: false,
            isValidParents: false,
            isValidWorkedFrom: false,
            isValidWorkedTo: false,
            isValidWorkingAddress: false,
            isValidTypeOfIndustry: false,
            isValidPaidAgency: false,
            isValidInsuranceNumber: false,
            isValidMilitarySerivce: false,
            isValidWorkedFromMilitary: false,
            isValidWorkedToMilitary: false,
            isValidMilitaryBranch: false,
            isValidCountryServed: false,
            isValidFormatSSNumber: false,
            isValidFormatIINumber: false,
            isValidMFullName: false,
            isValidMRelationship: false,
            isValidFederalAgency: false,
            isValidWorkerEngage: false,
            isValidWorkedFromUS: false,
            isValidWorkedToUS: false,
            isValidWorkedEngageAddress: false,
            isValidEmpInfo: false,
            isValidFFullName: false,
            isValidClaimNumber: false,
            isValidBenefitsApplied: false,
            isValidBenefitsPaid: false,
            isValidAppBenefits: false,
            isValidOldAgeBenefits: false,
            isValidSignature: false,
        }
    }

    componentDidMount(){
        emailresult = localStorage.getItem('applicant_email');
    }
    //Handle Event
    handleChangeBenefits(e, index, value) {
        this.setState({ BenefitsState: value })
    };

    handleChangeDateDisability(e, date) {
        this.setState({ DateDisabilityState: date });
    };

    handleChangeDisability(e, date) {
        this.setState({ DisabilityState: date });
    };

    handleChangeApplyBenefits(e) {
        this.setState({ ApplyBenefitsState: e.target.value });
    };

    handleChangeFirstName(e) {
        this.setState({ FirstNameState: e.target.value });
    };

    handleChangeLastName(e) {
        this.setState({ LastNameState: e.target.value });
    };

    handleChangeMaidenName(e) {
        this.setState({ MadienNameState: e.target.value });
    };

    handleChangeBirthName(e) {
        this.setState({ BirthNameState: e.target.value });
    };

    handleChangeSSNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            this.setState({ SSNumberState: onlyNums });
        }
    };

    handleChangeIINumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ IINumberState: onlyNums });
        }
    };

    handleChangePFirstName(e) {
        this.setState({ PFirstNameState: e.target.value });
    };

    handleChangePLastName(e) {
        this.setState({ PLastNameState: e.target.value });
    };

    handleChangePMaidenName(e) {
        this.setState({ PMadienNameState: e.target.value });
    };

    handleChangeRelationshiip(e, index, value) {
        this.setState({ RelationshipState: value })
    };

    handleChangeDateOfBirth(e, date) {
        this.setState({ DateOfBirthState: date });
    };

    handleSelectSuggest(suggest) {
        this.setState({ search: "", PlaceOfBirthState: suggest.formatted_address });
    };

    handleChangePlaceOfBirth(e) {
        this.setState({ search: e.target.value, PlaceOfBirthState: e.target.value });
    };

    handleChangeCitizenship(e, index, value) {
        this.setState({ CitizenshipState: value })
    };

    handleChangeCountryRes(e) {
        this.setState({ CountryResState: e.target.value });
    };

    handleChangeMarital(e, index, value) {
        this.setState({ MaritalState: value })
    };

    handleChangeWeddingDate(e, date) {
        this.setState({ WeddingDateState: date });
    };

    handleChangeClaim(e) {
        this.setState({ ClaimState: e.target.value })
    };

    handleChangeBenefitsClaim(e) {
        this.setState({ BenefitsClaimState: e.target.value })
    };

    handleChangeFullName(e) {
        this.setState({ FullNameState: e.target.value });
    };

    handleChangeWorker(e) {
        this.setState({ WorkerState: e.target.value });
    };

    handleChangePDateOfBirth(e, date) {
        this.setState({ PDateOfBirthState: date });
    };

    handleChangePFullName(e) {
        this.setState({ PFullNameState: e.target.value });
    };

    handleSelectAddressSuggest(suggest) {
        this.setState({ search1: "", AddressState: suggest.formatted_address });
    };

    handleChangeAddress(e) {
        this.setState({ search1: e.target.value, AddressState: e.target.value });
    };

    handleChangeDetails(e, index, value) {
        this.setState({ DetailsState: value })
    };

    handleChangeFamilyIncome(e) {
        this.setState({ FamilyIncomeState: e.target.value })
    };

    handleChangeCFullName(e) {
        this.setState({ CFullNameState: e.target.value });
    };

    handleChangeTypeofIncome(e) {
        this.setState({ TypeofIncomeState: e.target.value });
    };

    handleChangeMonthlyAmount(e) {
        this.setState({ MonthlyAmountState: e.target.value });
    };

    handleChangeWorking(e) {
        this.setState({ WorkingState: e.target.value });
    };

    handleChangeWorkingEmp(e, index, value) {
        this.setState({ WorkingEmpState: value });
    };

    handleChangeWorkingDate(e, date) {
        this.setState({ WorkingDateState: date });
    };

    handleChangeSpousePension(e) {
        this.setState({ SpousePensionState: e.target.value });
    };

    handleChangeChildFullName(e) {
        this.setState({ ChildFullNameState: e.target.value });
    };

    handleChangeInsuranceName(e) {
        this.setState({ InsuranceNameState: e.target.value });
    };

    handleChangeMonthlyBenefits(e) {
        this.setState({ MonthlyBenefitsState: e.target.value });
    };

    handleChangeCDateOfBirth(e, date) {
        this.setState({ CDateOfBirthState: date });
    };

    handleSelectPlaceSuggest(suggest) {
        this.setState({ search2: "", PPlaceOfBirthState: suggest.formatted_address });
    };

    handleChangePPlaceOfBirth(e) {
        this.setState({ search2: e.target.value, PPlaceOfBirthState: e.target.value });
    };

    handleChangePMarital(e, index, value) {
        this.setState({ PMaritalState: value });
    };

    handleChangePCitizenship(e, index, value) {
        this.setState({ PCitizenshipState: value });
    };

    handleSelectPlaceDeathSuggest(suggest) {
        this.setState({ search3: "", PlaceOfDeathState: suggest.formatted_address });
    };

    handleChangePlaceOfDeath(e) {
        this.setState({ search3: e.target.value, PlaceOfDeathState: e.target.value });
    };

    handleChangeDateOfDeath(e, date) {
        this.setState({ DateOfDeathState: date });
    };

    handleChangeReceivingBenefits(e) {
        this.setState({ ReceivingBenefitsState: e.target.value });
    };

    handleChangeTypeBenefits(e) {
        this.setState({ TypeBenefitsState: e.target.value });
    };

    handleChangeAccountNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 13) {
            this.setState({ AccountNumberState: onlyNums });
        }
    };

    handleChangePayingAgency(e) {
        this.setState({ PayingAgencyState: e.target.value });
    };

    handleChangeClaimingBenefits(e) {
        this.setState({ ClaimingBenefitsState: e.target.value })
    };

    handleChangeDecree(e) {
        this.setState({ DecreeState: e.target.value })
    };

    handleChangePClaimingBenefits(e) {
        this.setState({ PClaimingBenefitsState: e.target.value })
    };

    handleChangeSpouse(e) {
        this.setState({ SpouseState: e.target.value })
    };

    handleChangeChildren(e) {
        this.setState({ ChildrenState: e.target.value })
    };

    handleChangePSpouse(e) {
        this.setState({ PSpouseState: e.target.value })
    };

    handleChangePChildren(e) {
        this.setState({ PChildrenState: e.target.value })
    };

    handleChangeParents(e) {
        this.setState({ ParentsState: e.target.value })
    };

    handleChangeWorkedFrom(e, date) {
        this.setState({ WorkedFromState: date });
    };

    handleChangeWorkedTo(e, date) {
        const { validationError } = this.state;
        this.setState({ WorkedToState: date }, function () {
            if (this.state.WorkedFromState > this.state.WorkedToState) {
                this.setState({ ValidateWorked: true });
            } else {
                this.setState({ ValidateWorked: false });
            }
        });
    };

    handleSelectWorkAddressSuggest(suggest) {
        this.setState({ search4: "", WorkingAddressState: suggest.formatted_address });
    };

    handleChangeWorkingAddress(e) {
        this.setState({ search4: e.target.value, WorkingAddressState: e.target.value });
    };

    handleChangeTypeOfIndustry(e) {
        this.setState({ TypeOfIndustryState: e.target.value });
    };

    handleChangePaidAgency(e) {
        this.setState({ PaidAgencyState: e.target.value });
    };

    handleChangeInsuranceNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ InsuranceNumberState: onlyNums });
        }
    };

    handleChangeMilitarySerivce(e) {
        this.setState({ MilitarySerivceState: e.target.value })
    };

    handleChangeWorkedFromMilitary(e, date) {
        this.setState({ WorkedFromMilitaryState: date });
    };

    handleChangeWorkedToMilitary(e, date) {
        const { validationError } = this.state;
        this.setState({ WorkedToMilitaryState: date }, function () {
            if (this.state.WorkedFromMilitaryState > this.state.WorkedToMilitaryState) {
                this.setState({ ValidateWorkedMilitary: true });
            } else {
                this.setState({ ValidateWorkedMilitary: false });
            }
        });
    };

    handleChangeMilitaryBranch(e) {
        this.setState({ MilitaryBranchState: e.target.value });
    };

    handleChangeCountryServed(e) {
        this.setState({ CountryServedState: e.target.value });
    };

    handleChangeMFullName(e) {
        this.setState({ MFullNameState: e.target.value });
    };

    handleChangeMRelationship(e) {
        this.setState({ MRelationshipState: e.target.value });
    };

    handleChangeFederalAgency(e) {
        this.setState({ FederalAgencyState: e.target.value });
    };

    handleChangeWorkerEngage(e) {
        this.setState({ WorkerEngageState: e.target.value })
    };

    handleChangeWorkedFromUS(e, date) {
        this.setState({ WorkedFromUSState: date });
    };

    handleChangeWorkedToUS(e, date) {
        const { validationError } = this.state;
        this.setState({ WorkedToUSState: date }, function () {
            if (this.state.WorkedFromUSState > this.state.WorkedToUSState) {
                this.setState({ ValidateWorkedPeriod: true });
            } else {
                this.setState({ ValidateWorkedPeriod: false });
            }
        });
    };

    handleSelectWorkedEngageAddressSuggest(suggest) {
        this.setState({ search5: "", WorkedEngageAddressState: suggest.formatted_address });
    };

    handleChangeWorkedEngageAddress(e) {
        this.setState({ search5: e.target.value, WorkedEngageAddressState: e.target.value });
    };

    handleChangeEmpInfo(e) {
        this.setState({ EmpInfoState: e.target.value });
    };

    handleChangeUSBenefits(e) {
        this.setState({ USBenefitsState: e.target.value });
    };

    handleChangeFFullName(e) {
        this.setState({ FFullNameState: e.target.value });
    };

    handleChangeClaimNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ ClaimNumberState: onlyNums });
        }
    };

    handleChangeBenefitsApplied(e) {
        this.setState({ BenefitsAppliedState: e.target.value });
    };

    handleChangeBenefitsPaid(e) {
        this.setState({ BenefitsPaidState: e.target.value });
    };

    handleChangeAppBenefits(e) {
        this.setState({ AppBenefitsState: e.target.value })
    };

    handleChangeOldAgeBenefits(e, index, value) {
        this.setState({ OldAgeBenefitsState: value })
    };

    handleChangeRemark(e) {
        this.setState({ RemarkState: e.target.value });
    };

    handleSelectMailingAddressSuggest(suggest) {
        this.setState({ Msearch: "", MailingAddressState: suggest.formatted_address });
    };

    handleChangeMailingAddress(e) {
        this.setState({ Msearch: e.target.value, MailingAddressState: e.target.value });
    };

    handleSelectWitnessAddressSuggest(suggest) {
        this.setState({ AWsearch: "", WitnessAddressState: suggest.formatted_address });
    };

    handleChangeWitnessAddress(e) {
        this.setState({ AWsearch: e.target.value, WitnessAddressState: e.target.value });
    };

    handleSelectWitness2AddressSuggest(suggest) {
        this.setState({ AW2search: "", Witness2AddressState: suggest.formatted_address });
    };

    handleChangeWitness2Address(e) {
        this.setState({ AW2search: e.target.value, Witness2AddressState: e.target.value });
    };

    handleChangeSex(e) {
        this.setState({ SexState: e.target.value })
    };

    handleSignatureClear(e) {
        this.signaturePad.clear();
    };

    handleSignatureClear1(e) {
        this.signaturePad1.clear();
    };

    handleSignatureClear2(e) {
        this.signaturePad2.clear();
    };

    handleChangeDateSignature(e, date) {
        this.setState({ DateSignature: date });
    };

    //Validation Function
    handleChangeValidated(e) {
        const { validationError } = this.state;
        let validForm = false;
        var validBenefitsForm = false;
        var validDateDisabilityForm = false;
        var validDisabilityForm = false;
        var validApplyBenefitsForm = false;
        var validFirstNameForm = false;
        var validLastNameForm = false;
        var validMadienNameForm = false;
        var validBirthNameForm = false;
        var validSSNumberForm = false;
        var validIINumberForm = false;
        var validSexForm = false;
        var validPFirstNameForm = false;
        var validPLastNameForm = false;
        var validPMadienNameForm = false;
        var validRelationshipForm = false;
        var validDateOfBirthForm = false;
        var validPlaceOfBirthForm = false;
        var validCitizenshipForm = false;
        var validCountryResForm = false;
        var validMaritalForm = false;
        var validWeddingDateForm = false;
        var validClaimForm = false;
        var validBenefitsClaimForm = false;
        var validWorkingForm = false;
        var validWorkingEmpForm = false;
        var validWorkingDateForm = false;
        var validSpousePensionForm = false;
        var validCDateOfBirthForm = false;
        var validPPlaceOfBirthForm = false;
        var validPMaritalForm = false;
        var validPCitizenshipForm = false;
        var validPlaceOfDeathForm = false;
        var validDateOfDeathForm = false;
        var validReceivingBenefitsForm = false;
        var validTypeBenefitsForm = false;
        var validAccountNumberForm = false;
        var validPayingAgencyForm = false;
        var validClaimingBenefitsForm = false;
        var validDecreeForm = false;
        var validPClaimingBenefitsForm = false;
        var validSpouseForm = false;
        var validChildrenForm = false;
        var validPSpouseForm = false;
        var validPChildrenForm = false;
        var validParentsFrom = false;
        var validMilitarySerivceForm = false;
        var validWorkerEngageForm = false;
        var validUSBenefitsForm = false;
        var validAppBenefitsForm = false;
        var validOldAgeBenefitsForm = false;
        var validSignatureForm = false;
        var validDateSignatureForm = false;
        var validMailingAddressForm = false;

        if (this.state.BenefitsState != "") {
            this.setState({ isValidBenefits: false });
            validBenefitsForm = true;
        }
        else {
            this.setState({ isValidBenefits: true });
            validBenefitsForm = false;
        }
        if (this.state.BenefitsState == "Disability") {
            if (this.state.DateDisabilityState != "") {
                this.setState({ isValidDateDisability: false });
                validDateDisabilityForm = true;
            }
            else {
                this.setState({ isValidDateDisability: true });
                validDateDisabilityForm = false;
            }
            if (this.state.DisabilityState != "") {
                this.setState({ isValidDisability: false });
                validDisabilityForm = true;
            }
            else {
                this.setState({ isValidDisability: true });
                validDisabilityForm = false;
            }
        }
        else {
            this.setState({ isValidDateDisability: false });
            this.setState({ isValidDisability: false });
            validDateDisabilityForm = true;
            validDisabilityForm = true;
        }
        if (this.state.ApplyBenefitsState != "") {
            this.setState({ isValidApplyBenefits: false });
            validApplyBenefitsForm = true;
        }
        else {
            this.setState({ isValidApplyBenefits: true });
            validApplyBenefitsForm = false;
        }
        if (this.state.FirstNameState.length > 0) {
            this.setState({ isValidFirstName: false });
            validFirstNameForm = true;
        }
        else {
            this.setState({ isValidFirstName: true });
            validFirstNameForm = false;
        }
        if (this.state.LastNameState.length > 0) {
            this.setState({ isValidLastName: false });
            validLastNameForm = true;
        }
        else {
            this.setState({ isValidLastName: true });
            validLastNameForm = false;
        }
        if (this.state.MadienNameState != "") {
            this.setState({ isValidMadienName: false });
            validMadienNameForm = true;
        }
        else {
            this.setState({ isValidMadienName: true });
            validMadienNameForm = false;
        }
        if (this.state.BirthNameState.length > 0) {
            this.setState({ isValidBirthName: false });
            validBirthNameForm = true;
        }
        else {
            this.setState({ isValidBirthName: true });
            validBirthNameForm = false;
        }
        if (this.state.SSNumberState != "") {
            this.setState({ isValidSSNumber: false });
            if (this.state.SSNumberState > 0 && this.state.SSNumberState <= 11) {
                this.setState({ isValidFormatSSNumber: false });
                validSSNumberForm = true;
            }
            else {
                this.setState({ isValidFormatSSNumber: true });
                this.setState({ isValidSSNumber: false });
            }
        }
        else {
            this.setState({ isValidSSNumber: true });
            this.setState({ isValidFormatSSNumber: false });
            validSSNumberForm = false;
        }
        if (this.state.IINumberState != "") {
            this.setState({ isValidIINumber: false });
            if (this.state.IINumberState > 0 && this.state.IINumberState <= 12) {
                this.setState({ isValidFormatIINumber: false });
                validIINumberForm = true;
            }
            else {
                this.setState({ isValidFormatIINumber: true });
                this.setState({ isValidIINumber: false });
            }
        }
        else {
            this.setState({ isValidIINumber: true });
            this.setState({ isValidFormatIINumber: false });
            validIINumberForm = false;
        }
        if (this.state.SexState != "") {
            this.setState({ isValidSex: false });
            validSexForm = true;
        }
        else {
            this.setState({ isValidSex: true });
            validSexForm = false;
        }
        if (this.state.PFirstNameState.length > 0) {
            this.setState({ isValidPFirstName: false });
            validPFirstNameForm = true;
        }
        else {
            this.setState({ isValidPFirstName: true });
            validPFirstNameForm = false;
        }
        if (this.state.PLastNameState.length > 0) {
            this.setState({ isValidPLastName: false });
            validPLastNameForm = true;
        }
        else {
            this.setState({ isValidPLastName: true });
            validPLastNameForm = false;
        }
        if (this.state.PMadienNameState != "") {
            this.setState({ isValidPMadienName: false });
            validPMadienNameForm = true;
        }
        else {
            this.setState({ isValidPMadienName: true });
            validPMadienNameForm = false;
        }
        if (this.state.RelationshipState != "") {
            this.setState({ isValidRelationship: false });
            validRelationshipForm = true;
        }
        else {
            this.setState({ isValidRelationship: true });
            validRelationshipForm = false;
        }
        if (this.state.DateOfBirthState != "") {
            this.setState({ isValidDateOfBirth: false });
            validDateOfBirthForm = true;
        }
        else {
            this.setState({ isValidDateOfBirth: true });
            validDateOfBirthForm = false;
        }
        if (this.state.PlaceOfBirthState.length > 0) {
            this.setState({ isValidPlaceOfBirth: false });
            validPlaceOfBirthForm = true;
        }
        else {
            this.setState({ isValidPlaceOfBirth: true });
            validPlaceOfBirthForm = false;
        }
        if (this.state.CitizenshipState != "") {
            this.setState({ isValidCitizenship: false });
            validCitizenshipForm = true;
        }
        else {
            this.setState({ isValidCitizenship: true });
            validCitizenshipForm = false;
        }
        if (this.state.CountryResState.length > 0) {
            this.setState({ isValidCountryRes: false });
            validCountryResForm = true;
        }
        else {
            this.setState({ isValidCountryRes: true });
            validCountryResForm = false;
        }
        if (this.state.MaritalState != "") {
            this.setState({ isValidMarital: false });
            validMaritalForm = true;
        }
        else {
            this.setState({ isValidMarital: true });
            validMaritalForm = false;
        }
        if (this.state.MaritalState == "M" || this.state.MaritalState == "D" || this.state.MaritalState == "W") {
            if (this.state.WeddingDateState != "") {
                this.setState({ isValidWeddingDate: false });
                validWeddingDateForm = true;
            }
            else {
                this.setState({ isValidWeddingDate: true });
                validWeddingDateForm = false;
            }
        }
        else {
            this.setState({ isValidWeddingDate: false });
            validWeddingDateForm = true;
        }
        if (this.state.ClaimState != "") {
            this.setState({ isValidClaim: false });
            validClaimForm = true;
        }
        else {
            this.setState({ isValidClaim: true });
            validClaimForm = false;
        }
        if (this.state.BenefitsClaimState != "") {
            this.setState({ isValidBenefitsClaim: false });
            validBenefitsClaimForm = true;
        }
        else {
            this.setState({ isValidBenefitsClaim: true });
            validBenefitsClaimForm = false;
        }
        if (this.state.BenefitsClaimState == "No" || this.state.FamilyIncomeState == "No") {
            if (this.state.WorkingState != "") {
                this.setState({ isValidWorking: false });
                validWorkingForm = true;
            }
            else {
                this.setState({ isValidWorking: true });
                validWorkingForm = false;
            }
        }
        else {
            this.setState({ isValidWorking: false });
            validWorkingForm = true;
        }
        if (this.state.WorkingState == "Yes") {
            if (this.state.WorkingEmpState.length > 0) {
                this.setState({ isValidWorkingEmp: false });
                validWorkingEmpForm = true;
            }
            else {
                this.setState({ isValidWorkingEmp: true });
                validWorkingEmpForm = false;
            }
        }
        else {
            this.setState({ isValidWorkingEmp: false });
            validWorkingEmpForm = true;
        }
        if (this.state.WorkingState == "No") {
            if (this.state.WorkingDateState != "") {
                this.setState({ isValidWorkingDate: false });
                validWorkingDateForm = true;
            }
            else {
                this.setState({ isValidWorkingDate: true });
                validWorkingDateForm = false;
            }
        }
        else {
            this.setState({ isValidWorkingDate: false });
            validWorkingDateForm = true;
        }
        if (this.state.SpousePensionState != "") {
            this.setState({ isValidSpousePension: false });
            validSpousePensionForm = true;
        }
        else {
            this.setState({ isValidSpousePension: true });
            validSpousePensionForm = false;
        }
        if (this.state.SpousePensionState == "No") {
            if (this.state.CDateOfBirthState != "") {
                this.setState({ isValidCDateOfBirth: false });
                validCDateOfBirthForm = true;
            }
            else {
                this.setState({ isValidCDateOfBirth: true });
                validCDateOfBirthForm = false;
            }
            if (this.state.PPlaceOfBirthState.length > 0) {
                this.setState({ isValidPPlaceOfBirth: false });
                validPPlaceOfBirthForm = true;
            }
            else {
                this.setState({ isValidPPlaceOfBirth: true });
                validPPlaceOfBirthForm = false;
            }
            if (this.state.PMaritalState != "") {
                this.setState({ isValidPMarital: false });
                validPMaritalForm = true;
            }
            else {
                this.setState({ isValidPMarital: true });
                validPMaritalForm = false;
            }
            if (this.state.PCitizenshipState != "") {
                this.setState({ isValidPCitizenship: false });
                validPCitizenshipForm = true;
            }
            else {
                this.setState({ isValidPCitizenship: true });
                validPCitizenshipForm = false;
            }
            if (this.state.PlaceOfDeathState.length > 0) {
                this.setState({ isValidPlaceOfDeath: false });
                validPlaceOfDeathForm = true;
            }
            else {
                this.setState({ isValidPlaceOfDeath: true });
                validPlaceOfDeathForm = false;
            }
            if (this.state.DateOfDeathState != "") {
                this.setState({ isValidDateOfDeath: false });
                validDateOfDeathForm = true;
            }
            else {
                this.setState({ isValidDateOfDeath: true });
                validDateOfDeathForm = false;
            }
            if (this.state.ReceivingBenefitsState != "") {
                this.setState({ isValidReceivingBenefits: false });
                validReceivingBenefitsForm = true;
            }
            else {
                this.setState({ isValidReceivingBenefits: true });
                validReceivingBenefitsForm = false;
            }
        }
        else {
            this.setState({ isValidCDateOfBirth: false });
            this.setState({ isValidPPlaceOfBirth: false });
            this.setState({ isValidPMarital: false });
            this.setState({ isValidPCitizenship: false });
            this.setState({ isValidPlaceOfDeath: false });
            this.setState({ isValidDateOfDeath: false });
            this.setState({ isValidReceivingBenefits: false });
            validCDateOfBirthForm = true;
            validPPlaceOfBirthForm = true;
            validPMaritalForm = true;
            validPCitizenshipForm = true;
            validPlaceOfDeathForm = true;
            validDateOfDeathForm = true;
            validReceivingBenefitsForm = true;
        }
        if (this.state.ReceivingBenefitsState == "No") {
            if (this.state.ClaimingBenefitsState != "") {
                this.setState({ isValidClaimingBenefits: false });
                validClaimingBenefitsForm = true;
            }
            else {
                this.setState({ isValidClaimingBenefits: true });
                validClaimingBenefitsForm = false;
            }
            if (this.state.DecreeState != "") {
                this.setState({ isValidDecree: false });
                validDecreeForm = true;
            }
            else {
                this.setState({ isValidDecree: true });
                validDecreeForm = false;
            }
            if (this.state.PClaimingBenefitsState != "") {
                this.setState({ isValidPClaimingBenefits: false });
                validPClaimingBenefitsForm = true;
            }
            else {
                this.setState({ isValidPClaimingBenefits: true });
                validPClaimingBenefitsForm = false;
            }
            if (this.state.SpouseState != "") {
                this.setState({ isValidSpouse: false });
                validSpouseForm = true;
            }
            else {
                this.setState({ isValidSpouse: true });
                validSpouseForm = false;
            }
            if (this.state.ChildrenState != "") {
                this.setState({ isValidChildren: false });
                validChildrenForm = true;
            }
            else {
                this.setState({ isValidChildren: true });
                validChildrenForm = false;
            }
            if (this.state.PSpouseState != "") {
                this.setState({ isValidPSpouse: false });
                validPSpouseForm = true;
            }
            else {
                this.setState({ isValidPSpouse: true });
                validPSpouseForm = false;
            }
            if (this.state.PChildrenState != "") {
                this.setState({ isValidPChildren: false });
                validPChildrenForm = true;
            }
            else {
                this.setState({ isValidPChildren: true });
                validPChildrenForm = false;
            }
            if (this.state.ParentsState != "") {
                this.setState({ isValidParents: false });
                validParentsFrom = true;
            }
            else {
                this.setState({ isValidParents: true });
                validParentsFrom = false;
            }
        }
        else {
            this.setState({ isValidClaimingBenefits: false });
            this.setState({ isValidPClaimingBenefits: false });
            this.setState({ isValidDecree: false });
            this.setState({ isValidSpouse: false });
            this.setState({ isValidChildren: false });
            this.setState({ isValidPSpouse: false });
            this.setState({ isValidPChildren: false });
            this.setState({ isValidParents: false });
            validClaimingBenefitsForm = true;
            validPClaimingBenefitsForm = true;
            validDecreeForm = true;
            validSpouseForm = true;
            validChildrenForm = true;
            validPSpouseForm = true;
            validPChildrenForm = true;
            validParentsFrom = true;
        }
        if (this.state.MilitarySerivceState != "") {
            this.setState({ isValidMilitarySerivce: false });
            validMilitarySerivceForm = true;
        }
        else {
            this.setState({ isValidMilitarySerivce: true });
            validMilitarySerivceForm = false;
        }
        if (this.state.MilitarySerivceState == "No") {
            if (this.state.WorkerEngageState != "") {
                this.setState({ isValidWorkerEngage: false });
                validWorkerEngageForm = true;
            }
            else {
                this.setState({ isValidWorkerEngage: true });
                validWorkerEngageForm = false;
            }
        }
        else {
            this.setState({ isValidWorkerEngage: false });
            validWorkerEngageForm = true;
        }
        if (this.state.WorkerEngageState == "No") {
            if (this.state.USBenefitsState != "") {
                this.setState({ isValidUSBenefits: false });
                validUSBenefitsForm = true;
            }
            else {
                this.setState({ isValidUSBenefits: true });
                validUSBenefitsForm = false;
            }
        }
        else {
            this.setState({ isValidUSBenefits: false });
            validUSBenefitsForm = true;
        }
        if (this.state.USBenefitsState == "No") {
            if (this.state.AppBenefitsState != "") {
                this.setState({ isValidAppBenefits: false });
                validAppBenefitsForm = true;
            }
            else {
                this.setState({ isValidAppBenefits: true });
                validAppBenefitsForm = false;
            }
        }
        else {
            this.setState({ isValidAppBenefits: false });
            validAppBenefitsForm = true;
        }
        if (this.state.OldAgeBenefitsState != "") {
            this.setState({ isValidOldAgeBenefits: false });
            validOldAgeBenefitsForm = true;
        }
        else {
            this.setState({ isValidOldAgeBenefits: true });
            validOldAgeBenefitsForm = false;
        }
        if (this.signaturePad.isEmpty()) {
            this.setState({ isValidSignature: true });
            validSignatureForm = false;
        }
        else {
            this.setState({ isValidSignature: false });
            validSignatureForm = true;
        }
        if (this.state.DateSignature != "") {
            this.setState({ isValidDateSignature: false });
            validDateSignatureForm = false;
        }
        else {
            this.setState({ isValidDateSignature: true });
            validDateSignatureForm = true;
        }
        if (this.state.MailingAddressState.length > 0) {
            this.setState({ isValidMailingAddress: false });
            validMailingAddressForm = true;
        }
        else {
            this.setState({ isValidMailingAddress: true });
            validMailingAddressForm = false;
        }
        if (validBenefitsForm && validFirstNameForm && validLastNameForm && validLastNameForm && validBirthNameForm && validSSNumberForm && validIINumberForm && validSexForm && validPFirstNameForm && validPLastNameForm && validMadienNameForm && validRelationshipForm && validPlaceOfBirthForm && validCitizenshipForm
            && validCountryResForm && validMaritalForm && validClaimForm && validBenefitsClaimForm && validWorkingForm && validWorkingEmpForm && validWorkingDateForm && validSpousePensionForm && validCDateOfBirthForm && validPPlaceOfBirthForm && validPMaritalForm && validPCitizenshipForm
            && validPlaceOfDeathForm && validDateOfDeathForm && validReceivingBenefitsForm && validClaimingBenefitsForm && validDecreeForm && validPClaimingBenefitsForm && validSpouseForm && validChildrenForm && validPSpouseForm && validPChildrenForm && validParentsFrom && validMilitarySerivceForm
            && validWorkerEngageForm && validAppBenefitsForm && validOldAgeBenefitsForm && validSignatureForm && validDateSignatureForm && validMailingAddressForm && validWeddingDateForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }

        return validForm;
    }

    //Family Validation Function
    handleValidateFamilyForm(e) {
        let validForm = false;
        var validFullNameForm = false;
        var validWorkerForm = false;
        var validPDateOfBirthForm = false;
        var validPFullNameFrom = false;
        var validAddressForm = false;
        var validDetailsForm = false;
        var validFamilyIncomeForm = false;
        var validCFullNameFrom = false;
        var validTypeOfIncomeForm = false;
        var validMonthlyAmountForm = false;
        if (this.state.FullNameState.length > 0) {
            this.setState({ isValidFullName: false });
            validFullNameForm = true;
        }
        else {
            this.setState({ isValidFullName: true });
            validFullNameForm = false;
        }
        if (this.state.WorkerState.length > 0) {
            this.setState({ isValidWorker: false });
            validWorkerForm = true;
        }
        else {
            this.setState({ isValidWorker: true });
            validWorkerForm = false;
        }
        if (this.state.PDateOfBirthState != "") {
            this.setState({ isValidPDateOfBirth: false });
            validPDateOfBirthForm = true;
        }
        else {
            this.setState({ isValidPDateOfBirth: true });
            validPDateOfBirthForm = false;
        }
        if (this.state.PFullNameState.length > 0) {
            this.setState({ isValidPFullName: false });
            validPFullNameFrom = true;
        }
        else {
            this.setState({ isValidPFullName: true });
            validPFullNameFrom = false;
        }
        if (this.state.AddressState.length > 0) {
            this.setState({ isValidAddress: false });
            validAddressForm = true;
        }
        else {
            this.setState({ isValidAddress: true });
            validAddressForm = false;
        }
        if (this.state.DetailsState != "") {
            this.setState({ isValidDetails: false });
            validDetailsForm = true;
        }
        else {
            this.setState({ isValidDetails: true });
            validDetailsForm = false;
        }
        if (this.state.FamilyIncomeState != "") {
            this.setState({ isValidFamilyIncome: false });
            validFamilyIncomeForm = true;
        }
        else {
            this.setState({ isValidFamilyIncome: true });
            validFamilyIncomeForm = false;
        }
        if (this.state.CFullNameState.length > 0) {
            this.setState({ isValidCFullName: false });
            validCFullNameFrom = true;
        }
        else {
            this.setState({ isValidCFullName: true });
            validCFullNameFrom = false;
        }
        if (this.state.TypeofIncomeState.length > 0) {
            this.setState({ isValidTypeOfIncome: false });
            validTypeOfIncomeForm = true;
        }
        else {
            this.setState({ isValidTypeOfIncome: true });
            validTypeOfIncomeForm = false;
        }
        if (this.state.MonthlyAmountState.length > 0) {
            this.setState({ isValidMonthlyAmount: false });
            validMonthlyAmountForm = true;
        }
        else {
            this.setState({ isValidMonthlyAmount: true });
            validMonthlyAmountForm = false;
        }
        if (validFullNameForm && validWorkerForm && validPDateOfBirthForm && validPFullNameFrom && validAddressForm && validDetailsForm
            && validFamilyIncomeForm && validCFullNameFrom && validTypeOfIncomeForm && validMonthlyAmountForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Family Reset Function
    handleFamilyReset(e) {
        this.setState({
            FullNameState: '',
            WorkerState: '',
            PDateOfBirthState: '',
            DetailsState: '',
            PFullNameState: '',
            search1: '',
            AddressState: '',
            FamilyIncomeState: '',
            CFullNameState: '',
            TypeofIncomeState: '',
            MonthlyAmountState: '',
            isValidFullName: false,
            isValidWorker: false,
            isValidPDateOfBirth: false,
            isValidPFullName: false,
            isValidAddress: false,
            isValidDetails: false,
            isValidFamilyIncome: false,
            isValidCFullName: false,
            isValidTypeOfIncome: false,
            isValidMonthlyAmount: false,
        });
    }

    //Family Save Function
    handleBenQusFamilyDatas(event) {
        var valid = this.handleValidateFamilyForm(this);
        if (valid) {
            var FamilyJSONData = {
                FullName: this.state.FullNameState,
                Worker: this.state.WorkerState,
                PDateOfBirth: this.state.PDateOfBirthState,
                Details: this.state.DetailsState,
                PFullName: this.state.PFullNameState,
                Address: this.state.AddressState,
                FamilyIncome: this.state.FamilyIncomeState,
                CFullName: this.state.CFullNameState,
                TypeofIncome: this.state.TypeofIncomeState,
                MonthlyAmount: this.state.MonthlyAmountState,
            }
            if (ClaimantFamily.length < 5) {
                ClaimantFamily.push(FamilyJSONData);
                notify.show("Family Information Added Successfully", "success", 3000);
                this.handleFamilyReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Five Family Member to Add", "warning", 3000);
            }
        }
    }

    //Child validation Function
    handleValidateChildForm(e) {
        let validForm = false;
        var validChildFullNameFrom = false;
        var validInsuranceNameForm = false;
        var validMonthlyBenefitsForm = false;

        if (this.state.ChildFullNameState.length > 0) {
            this.setState({ isValidChildFullName: false });
            validChildFullNameFrom = true;
        }
        else {
            this.setState({ isValidChildFullName: true });
            validChildFullNameFrom = false;
        }
        if (this.state.InsuranceNameState.length > 0) {
            this.setState({ isValidInsuranceName: false });
            validInsuranceNameForm = true;
        }
        else {
            this.setState({ isValidInsuranceName: true });
            validInsuranceNameForm = false;
        }
        if (this.state.MonthlyBenefitsState.length > 0) {
            this.setState({ isValidMonthlyBenefits: false });
            validMonthlyBenefitsForm = true;
        }
        else {
            this.setState({ isValidMonthlyBenefits: true });
            validMonthlyBenefitsForm = false;
        }
        if (validChildFullNameFrom && validInsuranceNameForm && validMonthlyBenefitsForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Child Reset Function
    handleChildReset(e) {
        this.setState({
            ChildFullNameState: '',
            InsuranceNameState: '',
            MonthlyBenefitsState: '',
            isValidChildFullName: false,
            isValidInsuranceName: false,
            isValidMonthlyBenefits: false,
        });
    }

    //Child Save Function
    handleBenQusChildDatas(e) {
        var valid = this.handleValidateChildForm(this);
        if (valid) {
            var ChildJSONData = {
                ChildFullName: this.state.ChildFullNameState,
                InsuranceName: this.state.InsuranceNameState,
                MonthlyBenefits: this.state.MonthlyBenefitsState,
            }
            if (ClaimantChild.length < 3) {
                ClaimantChild.push(ChildJSONData);
                notify.show("Child Information Added Successfully", "success", 3000);
                this.handleChildReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Three Family Member to Add", "warning", 3000);
            }
        }
    }

    //Receiving Benefits Validation Function
    handleValidateReceivingForm(e) {
        let validForm = false;
        var validTypeBenefitsForm = false;
        var validAccountNumberForm = false;
        var validPayingAgencyForm = false;

        if (this.state.TypeBenefitsState.length > 0) {
            this.setState({ isValidTypeBenefits: false });
            validTypeBenefitsForm = true;
        }
        else {
            this.setState({ isValidTypeBenefits: true });
            validTypeBenefitsForm = false;
        }
        if (this.state.AccountNumberState.length > 0) {
            this.setState({ isValidAccountNumber: false });
            validAccountNumberForm = true;
        }
        else {
            this.setState({ isValidAccountNumber: true });
            validAccountNumberForm = false;
        }
        if (this.state.PayingAgencyState.length > 0) {
            this.setState({ isValidPayingAgency: false });
            validPayingAgencyForm = true;
        }
        else {
            this.setState({ isValidPayingAgency: true });
            validPayingAgencyForm = false;
        }
        if (validTypeBenefitsForm && validAccountNumberForm && validPayingAgencyForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Receiving Benefits Reset Function
    handleReceivingReset(e) {
        this.setState({
            TypeBenefitsState: '',
            AccountNumberState: '',
            PayingAgencyState: '',
            isValidTypeBenefits: false,
            isValidAccountNumber: false,
            isValidPayingAgency: false,
        });
    }

    //Receiving Benefits Save Function
    handleBenQusReceivingBenefits(e) {
        var valid = this.handleValidateReceivingForm(this);
        if (valid) {
            var ReceivingJSONData = {
                TypeBenefits: this.state.TypeBenefitsState,
                AccountNumber: this.state.AccountNumberState,
                PayingAgency: this.state.PayingAgencyState,
            }
            if (ClaimantReceiving.length < 2) {
                ClaimantReceiving.push(ReceivingJSONData);
                notify.show("Receiving Benefits Information Added Successfully", "success", 3000);
                this.handleReceivingReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Two Receiving Benefits to Add", "warning", 3000);
            }
        }
    }

    //Insurance Validation Function
    handleValidatePeroidEmpCoverInsForm(e) {
        let validForm = false;
        var validWorkedFromForm = false;
        var validWorkedToForm = false;
        var validWorkingAddressForm = false;
        var validTypeOfIndustryForm = false;
        var validPaidAgencyForm = false;
        var validInsuranceNUmberForm = false;

        if (this.state.WorkedFromState != "") {
            this.setState({ isValidWorkedFrom: false });
            validWorkedFromForm = true;
        }
        else {
            this.setState({ isValidWorkedFrom: true });
            validWorkedFromForm = false;
        }
        if (this.state.WorkedToState != "") {
            this.setState({ isValidWorkedTo: false });
            validWorkedToForm = true;
        }
        else {
            this.setState({ isValidWorkedTo: true });
            validWorkedToForm = false;
        }
        if (this.state.WorkingAddressState.length > 0) {
            this.setState({ isValidWorkingAddress: false });
            validWorkingAddressForm = true;
        }
        else {
            this.setState({ isValidWorkingAddress: true });
            validWorkingAddressForm = false;
        }
        if (this.state.TypeOfIndustryState.length > 0) {
            this.setState({ isValidTypeOfIndustry: false });
            validTypeOfIndustryForm = true;
        }
        else {
            this.setState({ isValidTypeOfIndustry: true });
            validTypeOfIndustryForm = false;
        }
        if (this.state.PaidAgencyState.length > 0) {
            this.setState({ isValidPaidAgency: false });
            validPaidAgencyForm = true;
        }
        else {
            this.setState({ isValidPaidAgency: true });
            validPaidAgencyForm = false;
        }
        if (this.state.InsuranceNumberState.length > 0) {
            this.setState({ isValidInsuranceNumber: false });
            validInsuranceNUmberForm = true;
        }
        else {
            this.setState({ isValidInsuranceNumber: true });
            validInsuranceNUmberForm = false;
        }
        if (validWorkedFromForm && validWorkedToForm && validWorkingAddressForm && validTypeOfIndustryForm && validPaidAgencyForm && validInsuranceNUmberForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Insurance Reset Function
    handlePeriodEmpCoverInsReset(e) {
        this.setState({
            WorkedFromState: '',
            WorkedToState: '',
            WorkingAddressState: '',
            TypeOfIndustryState: '',
            PaidAgencyState: '',
            InsuranceNumberState: '',
            isValidWorkedFrom: false,
            isValidWorkedTo: false,
            isValidWorkingAddress: false,
            isValidTypeOfIndustry: false,
            isValidPaidAgency: false,
            isValidInsuranceNumber: false,
        });
    }

    //Insurance Save Function
    handleBenQusPeriodEmpCoverIns(e) {
        var valid = this.handleValidatePeroidEmpCoverInsForm(this);
        if (valid) {
            var PeriodEmpCoverInsJSONData = {
                WorkedFrom: this.state.WorkedFromState,
                WorkedTo: this.state.WorkedToState,
                WorkingAddress: this.state.WorkingAddressState,
                TypeOfIndustry: this.state.TypeOfIndustryState,
                PaidAgency: this.state.PaidAgencyState,
                InsuranceNumber: this.state.InsuranceNumberState,
            }
            if (PeriodEmpCoverIns.length < 7) {
                PeriodEmpCoverIns.push(PeriodEmpCoverInsJSONData);
                notify.show("Peroid of Employment cover in Insurance Information Added Successfully", "success", 3000);
                this.handlePeriodEmpCoverInsReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Seven Peroid of Employment cover in Insurance to Add", "warning", 3000);
            }
        }
    }

    //Military Validation Function
    handleValidatePeriodOfMilitaryForm(e) {
        let validForm = false;
        var validWorkedFromMilitaryForm = false;
        var validWorkedToMilitaryForm = false;
        var validMilitaryBranchForm = false;
        var validCountryServedForm = false;

        if (this.state.WorkedFromMilitaryState != "") {
            this.setState({ isValidWorkedFromMilitary: false });
            validWorkedFromMilitaryForm = true;
        }
        else {
            this.setState({ isValidWorkedFromMilitary: true });
            validWorkedFromMilitaryForm = false;
        }
        if (this.state.WorkedToMilitaryState != "") {
            this.setState({ isValidWorkedToMilitary: false });
            validWorkedToMilitaryForm = true;
        }
        else {
            this.setState({ isValidWorkedToMilitary: true });
            validWorkedToMilitaryForm = false;
        }
        if (this.state.MilitaryBranchState.length > 0) {
            this.setState({ isValidMilitaryBranch: false });
            validMilitaryBranchForm = true;
        }
        else {
            this.setState({ isValidMilitaryBranch: true });
            validMilitaryBranchForm = false;
        }
        if (this.state.CountryServedState.length > 0) {
            this.setState({ isValidCountryServed: false });
            validCountryServedForm = true;
        }
        else {
            this.setState({ isValidCountryServed: true });
            validCountryServedForm = false;
        }
        if (validWorkedFromMilitaryForm && validWorkedToMilitaryForm && validMilitaryBranchForm && validCountryServedForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Military Reset Function
    handlePeriodOfMilitaryReset(e) {
        this.setState({
            WorkedFromMilitaryState: '',
            WorkedToMilitaryState: '',
            MilitaryBranchState: '',
            CountryServedState: '',
            isValidWorkedFromMilitary: false,
            isValidWorkedToMilitary: false,
            isValidMilitaryBranch: false,
            isValidCountryServed: false,
        });
    }

    //Military Save Function
    handleBenQusPeriodOfMilitary(e) {
        var valid = this.handleValidatePeriodOfMilitaryForm(this);
        if (valid) {
            var PeriodOfMilitaryJSONData = {
                WorkedFromMilitary: this.state.WorkedFromMilitaryState,
                WorkedToMilitary: this.state.WorkedToMilitaryState,
                MilitaryBranch: this.state.MilitaryBranchState,
                CountryServed: this.state.CountryServedState,
            }
            if (PeriodOfMilitary.length < 4) {
                PeriodOfMilitary.push(PeriodOfMilitaryJSONData);
                notify.show("Period of Military Serivce Information Added Successfully", "success", 3000);
                this.handlePeriodOfMilitaryReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Four Peroid of Military Serivce to Add", "warning", 3000);
            }
        }
    }

    //Agency Validation Function
    handleValidateUSFederalAgencyForm(e) {
        let validForm = false;
        var validMFullNameForm = false;
        var validMRelationshipForm = false;
        var validFederalAgencyForm = false;

        if (this.state.MFullNameState.length > 0) {
            this.setState({ isValidMFullName: false });
            validMFullNameForm = true;
        }
        else {
            this.setState({ isValidMFullName: true });
            validMFullNameForm = false;
        }
        if (this.state.MRelationshipState.length > 0) {
            this.setState({ isValidMRelationship: false });
            validMRelationshipForm = true;
        }
        else {
            this.setState({ isValidMRelationship: true });
            validMRelationshipForm = false;
        }
        if (this.state.FederalAgencyState.length > 0) {
            this.setState({ isValidFederalAgency: false });
            validFederalAgencyForm = true;
        }
        else {
            this.setState({ isValidFederalAgency: true });
            validFederalAgencyForm = false;
        }
        if (validMFullNameForm && validMRelationshipForm && validFederalAgencyForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Agency Reset Function
    handleUSFederalAgencyReset(e) {
        this.setState({
            MFullNameState: '',
            MRelationshipState: '',
            FederalAgencyState: '',
            isValidMFullName: false,
            isValidMRelationship: false,
            isValidFederalAgency: false,
        });
    }

    //Agency Save Function
    handleBenQusUSFederalAgency(e) {
        var valid = this.handleValidateUSFederalAgencyForm(this);
        if (valid) {
            var USFederalAgencyJSONData = {
                MFullName: this.state.MFullNameState,
                MRelationship: this.state.MRelationshipState,
                FederalAgency: this.state.FederalAgencyState,
            }
            if (USFederalAgency.length < 5) {
                USFederalAgency.push(USFederalAgencyJSONData);
                notify.show("US Federal Agency Information Added Successfully", "success", 3000);
                this.handleUSFederalAgencyReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Five US Federal Agency to Add", "warning", 3000);
            }
        }
    }

    //Social Security validation Function
    handleValidateEmpCoveredByUSSSSysForm(e) {
        let validForm = false;
        var validWorkedFromUSForm = false;
        var validWorkedToUSForm = false;
        var validWorkedEngageAddressForm = false;
        var validEmpInfoForm = false;

        if (this.state.WorkedFromUSState != "") {
            this.setState({ isValidWorkedFromUS: false });
            validWorkedFromUSForm = true;
        }
        else {
            this.setState({ isValidWorkedFromUS: true });
            validWorkedFromUSForm = false;
        }
        if (this.state.WorkedToUSState != "") {
            this.setState({ isValidWorkedToUS: false });
            validWorkedToUSForm = true;
        }
        else {
            this.setState({ isValidWorkedToUS: true });
            validWorkedToUSForm = false;
        }
        if (this.state.WorkedEngageAddressState.length > 0) {
            this.setState({ isValidWorkedEngageAddress: false });
            validWorkedEngageAddressForm = true;
        }
        else {
            this.setState({ isValidWorkedEngageAddress: true });
            validWorkedEngageAddressForm = false;
        }
        if (this.state.EmpInfoState != "") {
            this.setState({ isValidEmpInfo: false });
            validEmpInfoForm = true;
        }
        else {
            this.setState({ isValidEmpInfo: true });
            validEmpInfoForm = false;
        }
        if (validWorkedFromUSForm && validWorkedToUSForm && validWorkedEngageAddressForm && validEmpInfoForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Soical Security Reset Function
    handleEmpCoveredByUSSSSysReset(e) {
        this.setState({
            WorkedFromUSState: '',
            WorkedToUSState: '',
            WorkedEngageAddressState: '',
            EmpInfoState: '',
            isValidWorkedFromUS: false,
            isValidWorkedToUS: false,
            isValidWorkedEngageAddress: false,
            isValidEmpInfo: false,
        })
    }

    //Social Security Save Function
    handleBenQusEmpCoveredByUSSSSys(e) {
        var valid = this.handleValidateEmpCoveredByUSSSSysForm(this);
        if (valid) {
            var EmpCoveredByUSSSSysJSONData = {
                WorkedFromUS: this.state.WorkedFromUSState,
                WorkedToUS: this.state.WorkedToUSState,
                WorkedEngageAddress: this.state.WorkedEngageAddressState,
                EmpInfo: this.state.EmpInfoState,
            }
            if (EmpCoveredByUSSSSys.length < 4) {
                EmpCoveredByUSSSSys.push(EmpCoveredByUSSSSysJSONData);
                notify.show("Employement Covered By US Social Security System Information Added Successfully", "success", 3000);
                this.handleEmpCoveredByUSSSSysReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Four Employement Covered By US Social Security System to Add", "warning", 3000);
            }
        }
    }

    //Pverious Added Social Security Validation Function
    handleValidatePrevAppUSSSBenForm(e) {
        let validForm = false;
        var validFFullNameForm = false;
        var validClaimNumberForm = false;
        var validBenefitsAppliedForm = false;
        var validBenefitsPaidForm = false;

        if (this.state.FFullNameState.length > 0) {
            this.setState({ isValidFFullName: false });
            validFFullNameForm = true;
        }
        else {
            this.setState({ isValidFFullName: true });
            validFFullNameForm = false;
        }
        if (this.state.ClaimNumberState.length > 0) {
            this.setState({ isValidClaimNumber: false });
            validClaimNumberForm = true;
        }
        else {
            this.setState({ isValidClaimNumber: true });
            validClaimNumberForm = false;
        }
        if (this.state.BenefitsAppliedState.length > 0) {
            this.setState({ isValidBenefitsApplied: false });
            validBenefitsAppliedForm = true;
        }
        else {
            this.setState({ isValidBenefitsApplied: true });
            validBenefitsAppliedForm = false;
        }
        if (this.state.BenefitsPaidState.length > 0) {
            this.setState({ isValidBenefitsPaid: false });
            validBenefitsPaidForm = true;
        }
        else {
            this.setState({ isValidBenefitsPaid: true });
            validBenefitsPaidForm = false;
        }
        if (validFFullNameForm && validClaimNumberForm && validBenefitsAppliedForm && validBenefitsPaidForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Pverious Added Social Security Reset Function
    handlePrevAppUSSSBenReset(e) {
        this.setState({
            FFullNameState: '',
            ClaimNumberState: '',
            BenefitsAppliedState: '',
            BenefitsPaidState: '',
            isValidFFullName: false,
            isValidClaimNumber: false,
            isValidBenefitsApplied: false,
            isValidBenefitsPaid: false,
        })
    }

    //Pverious Added Social Security Save Function
    handleBenQusPrevAppUSSSBen(e) {
        var valid = this.handleValidatePrevAppUSSSBenForm(this);
        if (valid) {
            var PrevAppUSSSBenJSONData = {
                FFullName: this.state.FFullNameState,
                ClaimNumber: this.state.ClaimNumberState,
                BenefitsApplied: this.state.BenefitsAppliedState,
                BenefitsPaid: this.state.BenefitsPaidState,
            }
            if (PrevAppUSSSBen.length < 7) {
                PrevAppUSSSBen.push(PrevAppUSSSBenJSONData);
                notify.show("Perviously Applied US Social Security System Information Added Successfully", "success", 3000);
                this.handlePrevAppUSSSBenReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Seven Perviously Applied US Social Security System to Add", "warning", 3000);
            }
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

    //Auto-Populated Function
    handleBenQusItalyAuto(event) {
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
                this.setState({ BenefitsState: data[i].Benefits });
                this.setState({ FirstNameState: data[i].FirstName + data[i].MiddleName });
                this.setState({ LastNameState: data[i].LastName });
                this.setState({ MadienNameState: data[i].MadienName });
                var varDOB = data[i].DOB_Month + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year;
                var DtDOB = new Date(varDOB);
                this.setState({ DateOfBirthState: DtDOB });
                this.setState({ BirthNameState: data[i].BirthName });
                this.setState({ SSNumberState: data[i].PersonalIDNum });
                this.setState({ IINumberState: data[i].PersonalIDNum });
                this.setState({ SexState: data[i].Gender });
                this.setState({ PFirstNameState: data[i].FirstName + data[i].MiddleName });
                this.setState({ PLastNameState: data[i].LastName });
                this.setState({ PMadienNameState: data[i].MadienName });
                this.setState({ PlaceOfBirthState: data[i].PlaceOfBirth });
                this.setState({ CitizenshipState: data[i].CountryOfCitizenship });
                this.setState({ CountryResState: data[i].CountryOfCitizenship });
                this.setState({ MaritalState: data[i].MaritalStatus });
                var varDOMCDW = data[i].DOMCDW_Month + "/" + data[i].DOMCDW_Day + "/" + data[i].DOMCDW_Year;
                var DtDOMCDW = new Date(varDOMCDW);
                this.setState({ WeddingDateState: DtDOMCDW });
                // this.setState({ DateOfBirthState});
                var varDOB = data[i].DOB_Month + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year;
                var DtDOB = new Date(varDOB);
                this.setState({ CDateOfBirthState: DtDOB });
                this.setState({ PPlaceOfBirthState: data[i].PlaceOfBirth });
                this.setState({ PChildrenState: data[i].CountryOfCitizenship });
                // this.setState({ DateOfDeathState});
                this.setState({ TypeBenefitsState: data[i].IndustryCode });
                this.setState({ MailingAddressState: data[i].MailingAddress });
                this.setState({ WorkedFromState: data[i].WorkedFromDate });
                this.setState({ WorkedToState: data[i].WorkedToDate });
            }
        }).catch((err) => {

        })
    }

  
    //Save Function
    handleBenQusDatas(event) {
        var thisObj = this;
        let BenQusAPIUrl = "https://4k73oeispk.execute-api.us-west-2.amazonaws.com/dev/GPA_BenQusDatas_Lambda";
        let BenQusJapanJSONData = JSON.stringify({
            QueryName: "Save",
            UserID: emailresult,
            CountryCode: this.state.CountryCode,
            AppAnsInJsonObj: {
                Benefits: this.state.BenefitsState,
                DateOfDisability: this.state.DateDisabilityState,
                Disability: this.state.DisabilityState,
                ApplyBenefits: this.state.ApplyBenefitsState,
                FirstName: this.state.FirstNameState,
                LastName: this.state.LastNameState,
                MadienName: this.state.MadienNameState,
                BirthName: this.state.BirthNameState,
                SSNumber: this.state.SSNumberState,
                IINumber: this.state.IINumberState,
                Sex: this.state.SexState,
                PFirstName: this.state.PFirstNameState,
                PLastName: this.state.PLastNameState,
                PMadienName: this.state.PMadienNameState,
                Relationship: this.state.RelationshipState,
                DateOfBirth: this.state.DateOfBirthState,
                PlaceOfBirth: this.state.PlaceOfBirthState,
                Citizenship: this.state.CitizenshipState,
                CountryRes: this.state.CountryResState,
                Marital: this.state.MaritalState,
                WeddingDate: this.state.WeddingDateState,
                Claim: this.state.ClaimState,
                BenefitsClaim: this.state.BenefitsClaimState,
                FamilyMember: ClaimantFamily,
                Working: this.state.WorkingState,
                WorkingEmp: this.state.WorkingEmp,
                WorkingDate: this.state.WorkingDateState,
                SpousePension: this.state.SpousePensionState,
                Child: ClaimantChild,
                CDateOfBirth: this.state.CDateOfBirthState,
                PPlaceOfBirth: this.state.PPlaceOfBirthState,
                PMarital: this.state.PMarital,
                PCitizenship: this.state.PCitizenship,
                PlaceOfDeath: this.state.PlaceOfDeathState,
                DateOfDeath: this.state.DateOfDeathState,
                ReceivingBenefits: this.state.ReceivingBenefitsState,
                Receiving: ClaimantReceiving,
                ClaimingBenefits: this.state.ClaimingBenefitsState,
                Decree: this.state.DecreeState,
                PClaimingBenefits: this.state.PClaimingBenefitsState,
                Spouse: this.state.SpouseState,
                Children: this.state.ChildrenState,
                PSpouse: this.state.PSpouseState,
                PChildren: this.state.PChildrenState,
                Parent: this.state.ParentsState,
                PeriodEmpCoverIns: PeriodEmpCoverIns,
                MilitarySerivce: this.state.MilitarySerivceState,
                PeriodOfMilitary: PeriodOfMilitary,
                USFederalAgency: USFederalAgency,
                WorkerEngage: this.state.WorkerEngageState,
                EmpCoveredByUSSSSys: EmpCoveredByUSSSSys,
                FFullName: this.state.FFullNameState,
                ClaimNumber: this.state.ClaimNumberState,
                BenefitsApplied: this.state.BenefitsAppliedState,
                BenefitsPaid: this.state.BenefitsPaidState,
                AppBenefits: this.state.AppBenefitsState,
                OldAgeBenefits: this.state.OldAgeBenefitsState,
                Remark: this.state.RemarkState,
            },
        });
        let AxiosHeaderConfig = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
        };
        var isValid = this.handleChangeValidated(this);
        if (isValid) {
            axios({
                method: "POST",
                url: BenQusAPIUrl,
                data: BenQusJapanJSONData,
                //headers:AxiosHeaderConfig,

            }).then((data) => {
                notify.show("Your Part2 Information Saved Successfully", "success", 3000);
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

    //Load Country list Function
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

    //Page Redering
    render() {
        const { search, value, PlaceOfBirthState, search1, AddressState, search2, PPlaceOfBirthState, search3, PlaceOfDeathState, search4, WorkingAddressState, search5, WorkedEngageAddressState, Msearch, MailingAddressState, AWsearch, WitnessAddressState, AW2search, Witness2AddressState } = this.state;
        return (
            <div>
                <Col xs={12} md={12} style={newstyle}>
                    <Panel defaultExpanded={true}>
                        <Panel.Heading>
                            <Panel.Title >Italy Form</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Row className="show-grid" className="overall">
                                <Col xs={12} md={12} >
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} >
                                            <h4 className="ColorStyle"><b>Check (V) the type of benefit (s) For which you are applying</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Type Of Benefit <span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the type of benefit"
                                                value={this.state.BenefitsState}
                                                onChange={this.handleChangeBenefits.bind(this)}
                                                errorText={this.state.isValidBenefits ? "Please Select Your Type Of Benefits" : null}
                                            >
                                                <MenuItem value={"Retirement or old-age"} primaryText="Retirement or old-age" />
                                                <MenuItem value={"Disability"} primaryText="Disability" />
                                                <MenuItem value={"Survivors"} primaryText="Survivors" />
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    {(this.state.BenefitsState == "Disability") ?
                                        // <div className="zoomIn">
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={8} className="input-fileds align-fileds">
                                                    <label>If you are applying for disability benefits, enter the date the disability Began. <span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the date of disability began"
                                                        value={this.state.DateDisabilityState}
                                                        onChange={this.handleChangeDateDisability.bind(this)}
                                                        errorText={this.state.isValidDateDisability ? "Please Select Your Date of Disability" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds align-fileds">
                                                    <label>If the application relates to a pension for disability benefits, indicate the date of commencement of the same.<span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the disability benefits date"
                                                        value={this.state.DisabilityState}
                                                        onChange={this.handleChangeDisability.bind(this)}
                                                        errorText={this.state.isValidDisability ? "Please Select Your Disability" : null}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={8} className="Radio_button">
                                            <label>Do you wish to apply for benefits from the United States?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.ApplyBenefitsState} onChange={this.handleChangeApplyBenefits.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidApplyBenefits ? "Please Select Your Any Wish to Apply Benefits in United States" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} >
                                            <h4 className="ColorStyle"><b>INFORMATION ABOUT THE WORKER</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>First name, Middle initial <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your First Name with Middle Name"
                                                value={this.state.FirstNameState}
                                                onChange={this.handleChangeFirstName.bind(this)}
                                                errorText={this.state.isValidFirstName ? "Please Enter Your First Name" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Last Name <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Last Name"
                                                value={this.state.LastNameState}
                                                onChange={this.handleChangeLastName.bind(this)}
                                                errorText={this.state.isValidLastName ? "Please Enter Your Last Name" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Maiden name for married women <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Maiden Name"
                                                value={this.state.MadienNameState}
                                                onChange={this.handleChangeMaidenName.bind(this)}
                                                errorText={this.state.isValidMadienName ? "Please Enter Your Madien Name" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Name of Birth Name (If Different) <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Birth Name"
                                                value={this.state.BirthNameState}
                                                onChange={this.handleChangeBirthName.bind(this)}
                                                errorText={this.state.isValidBirthName ? "Please Enter Your First Name" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>US Social Security Number <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your US Social Security Number"
                                                value={this.state.SSNumberState}
                                                onChange={this.handleChangeSSNumber.bind(this)}
                                                errorText={this.state.isValidSSNumber ? "Please Enter Your First Name" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatSSNumber ? "Please Enter the Valid SSNumber" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Italian Insurance Number <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Italian Insurance Number"
                                                value={this.state.IINumberState}
                                                onChange={this.handleChangeIINumber.bind(this)}
                                                errorText={this.state.isValidIINumber ? "Please Enter Your First Name" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatIINumber ? "Please Enter the Valid IINumber" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label>Sex<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.SexState} onChange={this.handleChangeSex.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidSex ? "Please Select Your Gender" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} >
                                            <h4 className="ColorStyle"><b>INFORMATION ABOUT THE APPLICANT</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>First name, Middle initial <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your First Name with Middle Name"
                                                value={this.state.PFirstNameState}
                                                onChange={this.handleChangePFirstName.bind(this)}
                                                errorText={this.state.isValidPFirstName ? "Please Enter Your First Name" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Last Name <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Last Name"
                                                value={this.state.PLastNameState}
                                                onChange={this.handleChangePLastName.bind(this)}
                                                errorText={this.state.isValidPLastName ? "Please Enter Your Last Name" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Maiden name for married women <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Madien Name"
                                                value={this.state.PMadienNameState}
                                                onChange={this.handleChangePMaidenName.bind(this)}
                                                errorText={this.state.isValidPMadienName ? "Please Enter Your Madien Name" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Relationship to the Worker <span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the relationship to worker"
                                                value={this.state.RelationshipState}
                                                onChange={this.handleChangeRelationshiip.bind(this)}
                                                errorText={this.state.isValidRelationship ? "Please Select Your Relationship to Worker" : null}
                                            >
                                                {(this.state.BenefitsState == "Disability" || this.state.BenefitsState == "Retirement or old-age") ?
                                                    <MenuItem value={"Self"} primaryText="Self" />
                                                    : ''}
                                                <MenuItem value={"Spouse"} primaryText="Spouse" />
                                                <MenuItem value={"Civil Partner"} primaryText="Civil Partner" />
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Date of Birth <span className="manatoryfield">*</span></label>
                                            <DatePicker
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                hintText="Select the date of birth"
                                                value={this.state.DateOfBirthState}
                                                onChange={this.handleChangeDateOfBirth.bind(this)}
                                                errorText={this.state.isValidDateOfBirth ? "Please select your Date of Birth" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds" >
                                            <label>Place of birth <span className="manatoryfield">*</span></label>
                                            <ReactGoogleMapLoader
                                                params={{
                                                    key: API_KEY,
                                                    libraries: "places,geocode",
                                                }}
                                                render={googleMaps =>
                                                    googleMaps && (
                                                        <ReactGooglePlacesSuggest
                                                            autocompletionRequest={{ input: search }}
                                                            googleMaps={googleMaps}
                                                            onSelectSuggest={this.handleSelectSuggest.bind(this)}
                                                        >
                                                            <TextField
                                                                value={this.state.PlaceOfBirthState}
                                                                onChange={this.handleChangePlaceOfBirth.bind(this)}
                                                                hintText=" Enter Your Place of birth "
                                                                errorText={this.state.isValidPlaceOfBirth ? "Please Choose Your Place of Birth" : null}
                                                            />
                                                        </ReactGooglePlacesSuggest>
                                                    )
                                                }
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Citizenship <span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the citizenship"
                                                value={this.state.CitizenshipState}
                                                onChange={this.handleChangeCitizenship.bind(this)}
                                                errorText={this.state.isValidCitizenship ? "Please Select Your Countries" : null}
                                            >
                                                {CountryItems}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Country Of Residence <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Country Of Residence"
                                                value={this.state.CountryResState}
                                                onChange={this.handleChangeCountryRes.bind(this)}
                                                errorText={this.state.isValidCountryRes ? "Please Enter Your Country of Residence" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Marital status <span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the marital status"
                                                value={this.state.MaritalState}
                                                onChange={this.handleChangeMarital.bind(this)}
                                                errorText={this.state.isValidMarital ? "Please Select Your Marital Status" : null}
                                            >
                                                {MaritalStatusItems}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    {(this.state.MaritalState == "M" || this.state.MaritalState == "D" || this.state.MaritalState == "W") ?
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Wedding date (month, day, year), if the / the applicant is the spouse</label>
                                                <DatePicker
                                                    locale="en-US"
                                                    firstDayOfWeek={0}
                                                    hintText="Select the wedding date"
                                                    value={this.state.WeddingDateState}
                                                    onChange={this.handleChangeWeddingDate.bind(this)}
                                                    errorText={this.state.isValidWeddingDate ? "Please Select Your Wedding Date" : null}
                                                />
                                            </Col>
                                        </Col>
                                        : ""}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>REQUEST FOR AUTHORIZATION TO CONTINUE ITALIAN INSURANCE THROUGH VOLUNTARY CONTRIBUTIONS</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>If this claim Should be denied Because of insufficient contributions, do you wish to pay voluntary contributions to Obtain additional credit?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.ClaimState} onChange={this.handleChangeClaim.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidClaim ? "Please Select Your Claim to Pay" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>Are any benefits for family members being claimed (e.g. Spouse or Children)?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.BenefitsClaimState} onChange={this.handleChangeBenefitsClaim.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidBenefitsClaim ? "Please Select Your Benefits For Family Member" : null}</span>
                                        </Col>
                                    </Col>
                                    {this.state.BenefitsClaimState == "Yes" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} >
                                                    <h4 className="ColorStyle"><b>INFORMATION ABOUT FAMILY MEMBERS FOR WHOM FAMILY BENEFITS OR SURVIVOR BENEFIT ARE CLAIMED</b></h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Full Name <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Full Name"
                                                        value={this.state.FullNameState}
                                                        onChange={this.handleChangeFullName.bind(this)}
                                                        errorText={this.state.isValidFullName ? "Please Enter Your Full Name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Relationship To Worker <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Relationship To Worker"
                                                        value={this.state.WorkerState}
                                                        onChange={this.handleChangeWorker.bind(this)}
                                                        errorText={this.state.isValidWorker ? "Please Enter Your Relationship To Worker" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Date of birth (month, day, year)<span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the date of birth"
                                                        value={this.state.PDateOfBirthState}
                                                        onChange={this.handleChangePDateOfBirth.bind(this)}
                                                        errorText={this.state.isValidPDateOfBirth ? "Please Select Date of Birth" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Details About Children <span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the details about children"
                                                        value={this.state.DetailsState}
                                                        onChange={this.handleChangeDetails.bind(this)}
                                                        errorText={this.state.isValidDetails ? "Please Select Your Details about Children" : null}
                                                    >
                                                        <MenuItem value={"Student"} primaryText="Student" />
                                                        <MenuItem value={"Disabled"} primaryText="Disabled" />
                                                    </SelectField>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12}>
                                                    <h4 className="TopicAlign">List the name and address of each family member who is not shown above presently living with the worker or who was not living with the worker at the time of death.</h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Full Name <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Full Name"
                                                        value={this.state.PFullNameState}
                                                        onChange={this.handleChangePFullName.bind(this)}
                                                        errorText={this.state.isValidPFullName ? "Please Enter Your Full Name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Address <span className="manatoryfield">*</span></label>
                                                    <ReactGoogleMapLoader
                                                        params={{
                                                            key: API_KEY,
                                                            libraries: "places,geocode",
                                                        }}
                                                        render={googleMaps =>
                                                            googleMaps && (
                                                                <ReactGooglePlacesSuggest
                                                                    autocompletionRequest={{ input: search1 }}
                                                                    googleMaps={googleMaps}
                                                                    onSelectSuggest={this.handleSelectAddressSuggest.bind(this)}
                                                                >
                                                                    <TextField
                                                                        value={this.state.AddressState}
                                                                        onChange={this.handleChangeAddress.bind(this)}
                                                                        hintText=" Enter Your Address "
                                                                        errorText={this.state.isValidAddress ? "Please Choose Your Address" : null}
                                                                    />
                                                                </ReactGooglePlacesSuggest>
                                                            )
                                                        }
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="Radio_button">
                                                    <label>Do you, or any family members that are listed, now have income from employment, self-employment, a pension, or from any other source? <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.FamilyIncomeState} onChange={this.handleChangeFamilyIncome.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidFamilyIncome ? "Please Select Any Family Member Having Pension" : null}</span>
                                                </Col>
                                            </Col>
                                            {this.state.FamilyIncomeState == "Yes" ?
                                                <div>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={12} className="input-fileds">
                                                            <h5 className="TopicAlign">IF Yes Indicate </h5>
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                                            <label>Full name (first and last name) <span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Your Full Name"
                                                                value={this.state.CFullNameState}
                                                                onChange={this.handleChangeCFullName.bind(this)}
                                                                errorText={this.state.isValidCFullName ? "Please Enter Your Full Name" : null}
                                                            />
                                                        </Col>
                                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                                            <label>Type of income <span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Your Type of income"
                                                                value={this.state.TypeofIncomeState}
                                                                onChange={this.handleChangeTypeofIncome.bind(this)}
                                                                errorText={this.state.isValidTypeOfIncome ? "Please Enter Your Type of Income" : null}
                                                            />
                                                        </Col>
                                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                                            <label>Monthly amount <span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Your Monthly amount"
                                                                value={this.state.MonthlyAmountState}
                                                                onChange={this.handleChangeMonthlyAmount.bind(this)}
                                                                errorText={this.state.isValidMonthlyAmount ? "Please Enter Your Monthly Amount" : null}
                                                            />
                                                        </Col>
                                                    </Col>
                                                </div>
                                                : ''}
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fields">
                                                    <Button onClick={this.handleBenQusFamilyDatas.bind(this)} className="RQ-Add" >Add Another Family Member</Button>
                                                    <Notifications />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>INFORMATION ABOUT THE Claimant'S WORK ACTIVITY</b></h4>
                                        </Col>
                                    </Col>
                                    {(this.state.BenefitsClaimState == "No" || this.state.FamilyIncomeState == "No") ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="Radio_button">
                                                    <label>Are you still working? <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.WorkingState} onChange={this.handleChangeWorking.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidWorking ? "Please Select If Your Still Working" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                {this.state.WorkingState == "Yes" ?
                                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                                        <label>If yes, are you working as 'employee' or 'self-employed'<span className="manatoryfield">*</span></label>
                                                        <SelectField
                                                            hintText="Select the employee or self-employed"
                                                            value={this.state.WorkingEmpState}
                                                            onChange={this.handleChangeWorkingEmp.bind(this)}
                                                            errorText={this.state.isValidWorkingEmp ? "Please Select If Your Still Working" : null}
                                                        >
                                                            <MenuItem value={"Employee"} primaryText="Employee" />
                                                            <MenuItem value={"Self-employed"} primaryText="Self-employed" />
                                                        </SelectField>
                                                    </Col>
                                                    : ''}
                                                {this.state.WorkingState == "No" ?
                                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                                        <label>If 'no', give the date you stopped working <span className="manatoryfield">*</span></label>
                                                        <DatePicker
                                                            locale="en-US"
                                                            firstDayOfWeek={0}
                                                            hintText="Select the date"
                                                            value={this.state.WorkingDateState}
                                                            onChange={this.handleChangeWorkingDate.bind(this)}
                                                            errorText={this.state.isValidWorkingDate ? "Please Select Your Stopped Working Date" : null}
                                                        />
                                                    </Col>
                                                    : ''}
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>If you are married, is your spouse, as the beneficiary of another pension, receiving family benefits for any of the children that are listed? <span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.SpousePensionState} onChange={this.handleChangeSpousePension.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidSpousePension ? "Please Select If any receiving family benefits" : null}</span>
                                        </Col>
                                    </Col>
                                    {this.state.SpousePensionState == "Yes" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <h5 className="TopicAlign">IF Yes Indicate </h5>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Full name of child <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Full Name"
                                                        value={this.state.ChildFullNameState}
                                                        onChange={this.handleChangeChildFullName.bind(this)}
                                                        errorText={this.state.isValidChildFullName ? "Please Enter Your Full Name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Name of insurance institute <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Name of insurance institute"
                                                        value={this.state.InsuranceNameState}
                                                        onChange={this.handleChangeInsuranceName.bind(this)}
                                                        errorText={this.state.isValidInsuranceName ? "Please Enter Your Name of insurance institute " : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Amount of monthly benefits <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Monthly amount"
                                                        value={this.state.MonthlyBenefitsState}
                                                        onChange={this.handleChangeMonthlyBenefits.bind(this)}
                                                        errorText={this.state.isValidMonthlyBenefits ? "Please Enter Your Monthly Amount" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fields">
                                                    <Button onClick={this.handleBenQusChildDatas.bind(this)} className="RQ-Add" >Add Another </Button>
                                                    <Notifications />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <br />
                                    {this.state.SpousePensionState == "No" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} >
                                                    <h4 className="ColorStyle"><b>INFORMATION ABOUT THE WORKER deceased (to be completed if applying for survivors benefits)</b> </h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Birth <span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the date of birth"
                                                        value={this.state.CDateOfBirthState}
                                                        onChange={this.handleChangeCDateOfBirth.bind(this)}
                                                        errorText={this.state.isValidCDateOfBirth ? "Please select your Date of Birth" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Place of birth <span className="manatoryfield">*</span></label>
                                                    <ReactGoogleMapLoader
                                                        params={{
                                                            key: API_KEY,
                                                            libraries: "places,geocode",
                                                        }}
                                                        render={googleMaps =>
                                                            googleMaps && (
                                                                <ReactGooglePlacesSuggest
                                                                    autocompletionRequest={{ input: search2 }}
                                                                    googleMaps={googleMaps}
                                                                    onSelectSuggest={this.handleSelectPlaceSuggest.bind(this)}
                                                                >
                                                                    <TextField
                                                                        value={this.state.PPlaceOfBirthState}
                                                                        onChange={this.handleChangePPlaceOfBirth.bind(this)}
                                                                        hintText=" Enter Your Place of birth "
                                                                        errorText={this.state.isValidPPlaceOfBirth ? "Please Choose Your Place of Birth" : null}
                                                                    />
                                                                </ReactGooglePlacesSuggest>
                                                            )
                                                        }
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Marital status <span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the marital status"
                                                        value={this.state.PMaritalState}
                                                        onChange={this.handleChangePMarital.bind(this)}
                                                        errorText={this.state.isValidPMarital ? "Please Select Your Marital Status" : null}
                                                    >
                                                        {MaritalStatusItems}
                                                    </SelectField>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Citizenship <span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        hintText="Select the citizenship"
                                                        value={this.state.PCitizenshipState}
                                                        onChange={this.handleChangePCitizenship.bind(this)}
                                                        errorText={this.state.isValidPCitizenship ? "Please Select Your Countries" : null}
                                                    >
                                                        {CountryItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Place of Death <span className="manatoryfield">*</span></label>
                                                    <ReactGoogleMapLoader
                                                        params={{
                                                            key: API_KEY,
                                                            libraries: "places,geocode",
                                                        }}
                                                        render={googleMaps =>
                                                            googleMaps && (
                                                                <ReactGooglePlacesSuggest
                                                                    autocompletionRequest={{ input: search3 }}
                                                                    googleMaps={googleMaps}
                                                                    onSelectSuggest={this.handleSelectPlaceDeathSuggest.bind(this)}
                                                                >
                                                                    <TextField
                                                                        value={this.state.PlaceOfDeathState}
                                                                        onChange={this.handleChangePlaceOfDeath.bind(this)}
                                                                        hintText=" Enter Your Place of Death "
                                                                        errorText={this.state.isValidPlaceOfDeath ? "Please Choose Your Place of Death" : null}
                                                                    />
                                                                </ReactGooglePlacesSuggest>
                                                            )
                                                        }
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date of Death <span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the date of death"
                                                        value={this.state.DateOfDeathState}
                                                        onChange={this.handleChangeDateOfDeath.bind(this)}
                                                        errorText={this.state.isValidDateOfDeath ? "Please select your Date of Birth" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={8} className="Radio_button">
                                                    <label>Was the deceased worker receiving benefits from Italy or the United States? <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.ReceivingBenefitsState} onChange={this.handleChangeReceivingBenefits.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidReceivingBenefits ? "Please Select Your If any Receiving benefits from Italy" : null}</span>
                                                </Col>
                                            </Col>
                                            {this.state.ReceivingBenefitsState == "Yes" ?
                                                <div>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={12} className="input-fileds">
                                                            <h5 className="TopicAlign">IF Yes Indicate </h5>
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                                            <label>Type of benefit <span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Your Type of benefit"
                                                                value={this.state.TypeBenefitsState}
                                                                onChange={this.handleChangeTypeBenefits.bind(this)}
                                                                errorText={this.state.isValidTypeBenefits ? "Please Enter Your Type of benefits" : null}
                                                            />
                                                        </Col>
                                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                                            <label>Account number <span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Your Account number"
                                                                value={this.state.AccountNumberState}
                                                                onChange={this.handleChangeAccountNumber.bind(this)}
                                                                errorText={this.state.isValidAccountNumber ? "Please Enter Your Account Number " : null}
                                                            />
                                                        </Col>
                                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                                            <label>Paying agency <span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Your Paying agency"
                                                                value={this.state.PayingAgencyState}
                                                                onChange={this.handleChangePayingAgency.bind(this)}
                                                                errorText={this.state.isValidPayingAgency ? "Please Enter Your Paying Agency" : null}
                                                            />
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <Col xs={12} md={12} className="input-fields">
                                                            <Button onClick={this.handleBenQusReceivingBenefits.bind(this)} className="RQ-Add" >Add Another </Button>
                                                            <Notifications />
                                                        </Col>
                                                    </Col>
                                                </div>
                                                : ''}
                                        </div>
                                        : ''}
                                    {this.state.ReceivingBenefitsState == "No" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} >
                                                    <h4 className="ColorStyle"><b>INFORMATION ABOUT SURVIVING FAMILY MEMBERS (to be completed if applying for survivors benefits)</b> </h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="Radio_button">
                                                    <label>If you are Claiming benefits as the surviving spouse did your marriage to the deceased end divorce or annullement? <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.ClaimingBenefitsState} onChange={this.handleChangeClaimingBenefits.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidClaimingBenefits ? "Please Select Your Claiming Benefits" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={8} className="Radio_button">
                                                    <label>If 'Yes', indicate Whether the decree is final:<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.DecreeState} onChange={this.handleChangeDecree.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidDecree ? "Please Select Your Whether the decree is final" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="Radio_button">
                                                    <label>If you are Claiming benefits as the surviving spouse, have you remarried since the death of the worker? <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.PClaimingBenefitsState} onChange={this.handleChangePClaimingBenefits.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidPClaimingBenefits ? "Please Select Your Claiming Benefits" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <h4 className="TopicAlign"><b>If the claim for benefits is filed by the parent (s) of the deceased worker, indicated Whether the deceased worker is survived by a spouse or children:</b> </h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="Radio_button">
                                                    <label>Spouse <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.SpouseState} onChange={this.handleChangeSpouse.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidSpouse ? "Please Select Your Whether Spouse or not" : null}</span>
                                                </Col>
                                                <Col xs={12} md={6} className="Radio_button">
                                                    <label>Children<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.ChildrenState} onChange={this.handleChangeChildren.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidChildren ? "Please Select Your Whether Children or not" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <h4 className="TopicAlign"><b>If the claim for benefits is filed by an unmarried brother (s) or the sister (s) of the deceased worker, indicated whether the deceased worker is survived by a spouse, children or parents:</b> </h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="Radio_button">
                                                    <label>Spouse <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.PSpouseState} onChange={this.handleChangePSpouse.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidPSpouse ? "Please Select Your Whether Spouse or not" : null}</span>
                                                </Col>
                                                <Col xs={12} md={4} className="Radio_button">
                                                    <label>Children<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.PChildrenState} onChange={this.handleChangePChildren.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidPhildren ? "Please Select Your Whether Children or not" : null}</span>
                                                </Col>
                                                <Col xs={12} md={4} className="Radio_button">
                                                    <label>Parents<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.ParentsState} onChange={this.handleChangeParents.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidParents ? "Please Select Your Whether Parents or not" : null}</span>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>PERIODS OF EMPLOYMENT OR SELF-EMPLOYMENT OF THE WORKER, COVERED BY INSURANCE SYSTEM IN ITALY.</b> </h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds">
                                            <h5 className="TopicAlign">Periods of work covered by Italy</h5>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Worked in Italy (FROM) <span className="manatoryfield">*</span></label>
                                            <DatePicker
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                hintText="Select the worked date in italy(from)"
                                                value={this.state.WorkedFromState}
                                                onChange={this.handleChangeWorkedFrom.bind(this)}
                                                errorText={this.state.isValidWorkedFrom ? "Please select your Date of Worked(From)" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Worked in Italy (TO) <span className="manatoryfield">*</span></label>
                                            <DatePicker
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                hintText="Select the worked date in italy(to)"
                                                value={this.state.WorkedToState}
                                                onChange={this.handleChangeWorkedTo.bind(this)}
                                                errorText={this.state.isValidWorkedTo ? "Please select your Date of Worked(To)" : null}
                                            />
                                            <span className="validationmsg">{this.state.ValidateWorked ? "Please Select Your valid Worked Date" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Name and address (city, province, street, number) of the employer <span className="manatoryfield">*</span></label>
                                            <ReactGoogleMapLoader
                                                params={{
                                                    key: API_KEY,
                                                    libraries: "places,geocode",
                                                }}
                                                render={googleMaps =>
                                                    googleMaps && (
                                                        <ReactGooglePlacesSuggest
                                                            autocompletionRequest={{ input: search4 }}
                                                            googleMaps={googleMaps}
                                                            onSelectSuggest={this.handleSelectWorkAddressSuggest.bind(this)}
                                                        >
                                                            <TextField
                                                                value={this.state.WorkingAddressState}
                                                                onChange={this.handleChangeWorkingAddress.bind(this)}
                                                                hintText=" Enter Your Address of Employer "
                                                                errorText={this.state.isValidWorkingAddress ? "Please Choose Your Address of Employer" : null}
                                                            />
                                                        </ReactGooglePlacesSuggest>
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Type of industry of business <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Type of industry of business"
                                                value={this.state.TypeOfIndustryState}
                                                onChange={this.handleChangeTypeOfIndustry.bind(this)}
                                                errorText={this.state.isValidTypeOfIndustry ? "Please Enter Your Type of benefits" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Italian Agency to Which contributions were paid <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Paid Agency"
                                                value={this.state.PaidAgencyState}
                                                onChange={this.handleChangePaidAgency.bind(this)}
                                                errorText={this.state.isValidPaidAgency ? "Please Enter Your Account Number " : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Account / Insurance number in the Italian social security institute <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Account /Insurance Number"
                                                value={this.state.InsuranceNumberState}
                                                onChange={this.handleChangeInsuranceNumber.bind(this)}
                                                errorText={this.state.isValidInsuranceNumber ? "Please Enter Your Paying Agency" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fields">
                                            <Button onClick={this.handleBenQusPeriodEmpCoverIns.bind(this)} className="RQ-Add" >Add Another</Button>
                                            <Notifications />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} >
                                            <h4 className="ColorStyle"><b>PERIODS OF MILITARY SERVICE</b> </h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>Was the worker in the active military or naval service of Italy or the United States (including US Reserve or US National Guard active duty or active duty for training) after SEP 7, 1939?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.MilitarySerivceState} onChange={this.handleChangeMilitarySerivce.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidMilitarySerivce ? "Please Choose whether worked in military or naval service" : null}</span>
                                        </Col>
                                    </Col>
                                    {this.state.MilitarySerivceState == "Yes" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <h5 className="TopicAlign">If "Yes", indicate dates of active service: </h5>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>From (mm / dd / yyyy) <span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the date of work(From)"
                                                        value={this.state.WorkedFromMilitaryState}
                                                        onChange={this.handleChangeWorkedFromMilitary.bind(this)}
                                                        errorText={this.state.isValidWorkedFromMilitary ? "Please select your Date of Worked(From)" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>To (mm / dd / yyyy) <span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the date of work(To)"
                                                        value={this.state.WorkedToMilitaryState}
                                                        onChange={this.handleChangeWorkedToMilitary.bind(this)}
                                                        errorText={this.state.isValidWorkedToMilitary ? "Please select your Date of Worked(From)" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.ValidateWorkedMilitary ? "Please Select Your valid Worked Military Date" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Military Branch <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Military Branch"
                                                        value={this.state.MilitaryBranchState}
                                                        onChange={this.handleChangeMilitaryBranch.bind(this)}
                                                        errorText={this.state.isValidMilitaryBranch ? "Please Enter Your Type of benefits" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Country served <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Country served"
                                                        value={this.state.CountryServedState}
                                                        onChange={this.handleChangeCountryServed.bind(this)}
                                                        errorText={this.state.isValidCountryServed ? "Please Enter Your Account Number " : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fields">
                                                    <Button onClick={this.handleBenQusPeriodOfMilitary.bind(this)} className="RQ-Add" >Add Another</Button>
                                                    <Notifications />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <h4 className="TopicAlign"><b>Specify Whether anyone (living or deceased) received, or expect to receive, to benefit from any US Federal Agency based on the worker's service. List any such individuals:</b></h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Full Name <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Full Name"
                                                        value={this.state.MFullNameState}
                                                        onChange={this.handleChangeMFullName.bind(this)}
                                                        errorText={this.state.isValidMFullName ? "Please Enter Your Full Name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Relationship <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Relationship"
                                                        value={this.state.MRelationshipState}
                                                        onChange={this.handleChangeMRelationship.bind(this)}
                                                        errorText={this.state.isValidMRelationship ? "Please Enter Your Relationship " : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Federal Agency <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Federal Agency"
                                                        value={this.state.FederalAgencyState}
                                                        onChange={this.handleChangeFederalAgency.bind(this)}
                                                        errorText={this.state.isValidFederalAgency ? "Please Enter Your Federal Agency" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fields">
                                                    <Button onClick={this.handleBenQusUSFederalAgency.bind(this)} className="RQ-Add" >Add Another </Button>
                                                    <Notifications />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    {this.state.MilitarySerivceState == "No" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="Radio_button">
                                                    <label>Did the worker engage in employment or self-employment covered by the US Social Security system during the past 24 months? <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.WorkerEngageState} onChange={this.handleChangeWorkerEngage.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidWorkerEngage ? "Please Select Any Worker engage Past 24 month" : null}</span>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    {this.state.WorkerEngageState == "Yes" ?
                                        // <div className="zoomIn">
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <h5 className="TopicAlign">Periods of work covered by the Social Security System of the US</h5>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>From (mm / dd / yyyy) <span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the date of worked(From)"
                                                        value={this.state.WorkedFromUSState}
                                                        onChange={this.handleChangeWorkedFromUS.bind(this)}
                                                        errorText={this.state.isValidWorkedFromUS ? "Please select your Date of Worked(From)" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>To (mm / dd / yyyy) <span className="manatoryfield">*</span></label>
                                                    <DatePicker
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        hintText="Select the date of worked(To)"
                                                        value={this.state.WorkedToUSState}
                                                        onChange={this.handleChangeWorkedToUS.bind(this)}
                                                        errorText={this.state.isValidWorkedToUS ? "Please select your Date of Worked(To)" : null}
                                                    />
                                                    <span className="validationmsg">{this.state.ValidateWorkedPeriod ? "Please Select Your valid Worked Date" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Name and address (city, province, street, number) of the employer <span className="manatoryfield">*</span></label>
                                                    <ReactGoogleMapLoader
                                                        params={{
                                                            key: API_KEY,
                                                            libraries: "places,geocode",
                                                        }}
                                                        render={googleMaps =>
                                                            googleMaps && (
                                                                <ReactGooglePlacesSuggest
                                                                    autocompletionRequest={{ input: search5 }}
                                                                    googleMaps={googleMaps}
                                                                    onSelectSuggest={this.handleSelectWorkedEngageAddressSuggest.bind(this)}
                                                                >
                                                                    <TextField
                                                                        value={this.state.WorkedEngageAddressState}
                                                                        onChange={this.handleChangeWorkedEngageAddress.bind(this)}
                                                                        hintText=" Enter Your Address of Employer "
                                                                        errorText={this.state.isValidWorkedEngageAddress ? "Please Choose Your Address of Employer" : null}
                                                                    />
                                                                </ReactGooglePlacesSuggest>
                                                            )
                                                        }
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="Radio_button">
                                                    <label>May we ask your employers for wage information needed to process your claim? <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.EmpInfoState} onChange={this.handleChangeEmpInfo.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidEmpInfo ? "Please Select your Employer information to process your claim" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fields">
                                                    <Button onClick={this.handleBenQusEmpCoveredByUSSSSys.bind(this)} className="RQ-Add" >Add Another </Button>
                                                    <Notifications />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    {this.state.WorkerEngageState == "No" ?
                                        // <div className="zoomIn">
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="Radio_button">
                                                    <label>Has the applicant or any of the family members listed, previously applied for US Social Security benefits? <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.USBenefitsState} onChange={this.handleChangeUSBenefits.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidUSBenefits ? "Please Select your Employer information to process your claim" : null}</span>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    {this.state.USBenefitsState == "Yes" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds">
                                                    <h5 className="TopicAlign">If "Yes", indicate </h5>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Full name of family member who previously applied for US Social Security benefits <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Full Name"
                                                        value={this.state.FFullNameState}
                                                        onChange={this.handleChangeFFullName.bind(this)}
                                                        errorText={this.state.isValidFFullName ? "Please Enter Your Full Name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Claim Number <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Claim Number"
                                                        value={this.state.ClaimNumberState}
                                                        onChange={this.handleChangeClaimNumber.bind(this)}
                                                        errorText={this.state.isValidClaimNumber ? "Please Enter Your Relationship " : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Type of benefit applied for (eg old age, disability, widow, etc.) <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Type of Benefits"
                                                        value={this.state.BenefitsAppliedState}
                                                        onChange={this.handleChangeBenefitsApplied.bind(this)}
                                                        errorText={this.state.isValidBenefitsApplied ? "Please Enter Your Full Name" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>If benefits were AWARDED, show amount now being paid <span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Benefits to Paid"
                                                        value={this.state.BenefitsPaidState}
                                                        onChange={this.handleChangeBenefitsPaid.bind(this)}
                                                        errorText={this.state.isValidBenefitsPaid ? "Please Enter Your Relationship " : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fields">
                                                    <Button onClick={this.handleBenQusPrevAppUSSSBen.bind(this)} className="RQ-Add" >Add Another </Button>
                                                    <Notifications />
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    {this.state.USBenefitsState == "No" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="Radio_button">
                                                    <label>May the US furnish to the Italian Agency all the information and evidence in its possession which relates or could relate to this application for benefits? <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.AppBenefitsState} onChange={this.handleChangeAppBenefits.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidAppBenefits ? "Please Select your Employer information to process your claim" : null}</span>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ''}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={8} className="input-fileds align-fileds">
                                            <label>Declaration for persons claiming Italian old-age benefits <span className="manatoryfield">*</span></label>
                                            <SelectField
                                                hintText="Select the declaration for person claiming italian old-age benefits"
                                                value={this.state.OldAgeBenefitsState}
                                                onChange={this.handleChangeOldAgeBenefits.bind(this)}
                                                errorText={this.state.isValidOldAgeBenefits ? "Please Select your Employer information to process your claim" : null}
                                            >
                                                <MenuItem value={"Pensionable age has been reached or necessary requirements"} primaryText="the first day of the month following that in which pensionable age has been reached or necessary requirements have been completed" />
                                                <MenuItem value={"The first day of the month following that in which the claim in question has been submitted"} primaryText="the first day of the month following that in which the claim in question has been submitted" />
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label>REMARK</label>
                                            <TextField hintText="Enter Your Remark"
                                                value={this.state.RemarkState}
                                                onChange={this.handleChangeRemark.bind(this)}
                                            //errorText={this.state.isValidBenefitsPaid ? "Please Enter Your Relationship " : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds">
                                            <h5 className="TextAlign">I hereby delegate the "Patronato" "insert Global Pension Associates" to Represent and assist me free charge for administrative pourposes under D.L.C.P.S. 29.7.1947, No. 804 and successive amendments and integrations. For this pourpose, according to art. 47 on the Italian civil code, my postal address is care of the above named "patronato." This mandate is valid for all administrative operations leading to the achievement of the benefit claimed.</h5>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Date<span className="manatoryfield">*</span></label>
                                            <DatePicker
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                hintText="Select the date of signature"
                                                value={this.state.DateSignature}
                                                onChange={this.handleChangeDateSignature.bind(this)}
                                                errorText={this.state.isValidDateSignature ? "Please select your Date of signature" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={3}></Col>
                                        <Col xs={12} md={3} className="input-fileds">
                                            <label><b>Signature</b></label>
                                            <SignaturePad ref={ref => this.signaturePad = ref} />
                                            <Button id="clear" className="ClearBtn" onClick={this.handleSignatureClear.bind(this)}>Clear</Button>
                                            <span className="validationmsg">{this.state.isValidSignature ? "Please sign your signature" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds">
                                            <h5 className="TextAlign">With respect to my claim for benefits in Italy, I hereby STATE, under civil and penal responsibility, that all the information in the application conforms with the truth, and I pledge myself to report to the competent Insurance Institute, within 30 days from the day it may occurr, any change in the composition of the family, and new pension payment, or any change in one already granted, and any other event which may change the content of the statements above.</h5>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={8} className="input-fileds align-fileds">
                                            <label>Mailing address of the applicant: (street, number, apt., PO box, or rural route)<span className="manatoryfield">*</span></label>
                                            <ReactGoogleMapLoader
                                                params={{
                                                    key: API_KEY,
                                                    libraries: "places,geocode",
                                                }}
                                                render={googleMaps =>
                                                    googleMaps && (
                                                        <ReactGooglePlacesSuggest
                                                            autocompletionRequest={{ input: Msearch }}
                                                            googleMaps={googleMaps}
                                                            onSelectSuggest={this.handleSelectMailingAddressSuggest.bind(this)}
                                                        >
                                                            <TextField
                                                                value={this.state.MailingAddressState}
                                                                onChange={this.handleChangeMailingAddress.bind(this)}
                                                                hintText=" Enter Your Mailing Address "
                                                                errorText={this.state.isValidMailingAddress ? "Please Choose Your Mailing Address" : null}
                                                            />
                                                        </ReactGooglePlacesSuggest>
                                                    )
                                                }
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="input-fileds">
                                            <h5 className="TextAlign"><b>NOTICE:</b> Two witnesses are required only if this application has signed by mark (X). In this case, the witnesses to the signing who know the applicant must sign in the spaces reserved below, giving Their full address.</h5>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={3} className="input-fileds">
                                            <label className="TextAlign"> <b>1.Signature</b></label>
                                            <SignaturePad ref={ref => this.signaturePad1 = ref} />
                                            <Button id="clear" className="ClearBtn" onClick={this.handleSignatureClear1.bind(this)}>Clear</Button>
                                        </Col>
                                        <Col xs={12} md={3} className="input-fileds align-fileds">
                                            <label>Address of witness</label>
                                            <ReactGoogleMapLoader
                                                params={{
                                                    key: API_KEY,
                                                    libraries: "places,geocode",
                                                }}
                                                render={googleMaps =>
                                                    googleMaps && (
                                                        <ReactGooglePlacesSuggest
                                                            autocompletionRequest={{ input: AWsearch }}
                                                            googleMaps={googleMaps}
                                                            onSelectSuggest={this.handleSelectWitnessAddressSuggest.bind(this)}
                                                        >
                                                            <TextField
                                                                value={this.state.WitnessAddressState}
                                                                onChange={this.handleChangeWitnessAddress.bind(this)}
                                                                hintText=" Enter Your Address "
                                                            //errorText={this.state.isValidWorkedEngageAddress ? "Please Choose Your Address of Employer" : null}
                                                            />
                                                        </ReactGooglePlacesSuggest>
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col xs={12} md={3} className="input-fileds">
                                            <label className="TextAlign"><b> 2.Signature</b></label>
                                            <SignaturePad ref={ref => this.signaturePad2 = ref} />
                                            <Button id="clear" className="ClearBtn" onClick={this.handleSignatureClear2.bind(this)}>Clear</Button>
                                        </Col>
                                        <Col xs={12} md={3} className="input-fileds align-fileds">
                                            <label>Address of witness</label>
                                            <ReactGoogleMapLoader
                                                params={{
                                                    key: API_KEY,
                                                    libraries: "places,geocode",
                                                }}
                                                render={googleMaps =>
                                                    googleMaps && (
                                                        <ReactGooglePlacesSuggest
                                                            autocompletionRequest={{ input: AW2search }}
                                                            googleMaps={googleMaps}
                                                            onSelectSuggest={this.handleSelectWitness2AddressSuggest.bind(this)}
                                                        >
                                                            <TextField
                                                                value={this.state.Witness2AddressState}
                                                                onChange={this.handleChangeWitness2Address.bind(this)}
                                                                hintText=" Enter Your Address "
                                                            //errorText={this.state.isValidWorkedEngageAddress ? "Please Choose Your Address of Employer" : null}
                                                            />
                                                        </ReactGooglePlacesSuggest>
                                                    )
                                                }
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
            </div>
        );
    }

    //Reset Function
    handleBenQusReset(e) {
        this.setState({
            BenefitsState: '',
            DateDisabilityState: '',
            DisabilityState: '',
            ApplyBenefitsState: 'No',
            FirstNameState: '',
            LastNameState: '',
            MadienNameState: '',
            BirthNameState: '',
            SSNumberState: '',
            IINumberState: '',
            PFirstNameState: '',
            PLastNameState: '',
            PMadienNameState: '',
            RelationshipState: '',
            DateOfBirthState: '',
            search: "",
            value: "",
            PlaceOfBirthState: "",
            CitizenshipState: '',
            CountryResState: '',
            MaritalState: '',
            WeddingDateState: '',
            ClaimState: '',
            BenefitsClaimState: '',
            FullNameState: '',
            WorkerState: '',
            PDateOfBirthState: '',
            DetailsState: '',
            PFullNameState: '',
            search1: '',
            AddressState: '',
            FamilyIncomeState: '',
            CFullNameState: '',
            TypeofIncomeState: '',
            MonthlyAmountState: '',
            WorkingState: '',
            WorkingEmpState: '',
            WorkingDateState: '',
            SpousePensionState: '',
            ChildFullNameState: '',
            InsuranceNameState: '',
            MonthlyBenefitsState: '',
            CDateOfBirthState: '',
            search2: "",
            PPlaceOfBirthState: '',
            PMaritalState: '',
            PCitizenshipState: '',
            search3: "",
            PlaceOfDeathState: '',
            DateOfDeathState: '',
            ReceivingBenefitsState: '',
            TypeBenefitsState: '',
            AccountNumberState: '',
            PayingAgencyState: '',
            ClaimingBenefitsState: '',
            DecreeState: '',
            PClaimingBenefitsState: '',
            SpouseState: '',
            ChildrenState: '',
            PSpouseState: '',
            PChildrenState: '',
            ParentsState: '',
            WorkedFromState: '',
            WorkedToState: '',
            WorkingAddressState: '',
            TypeOfIndustryState: '',
            PaidAgencyState: '',
            InsuranceNumberState: '',
            MilitarySerivceState: '',
            WorkedFromMilitaryState: '',
            WorkedToMilitaryState: '',
            MilitaryBranchState: '',
            CountryServedState: '',
            MFullNameState: '',
            MRelationshipState: '',
            FederalAgencyState: '',
            WorkerEngageState: '',
            WorkedFromUSState: '',
            WorkedToUSState: '',
            search5: '',
            WorkedEngageAddressState: '',
            EmpInfoState: '',
            USBenefitsState: '',
            FFullNameState: '',
            ClaimNumberState: '',
            BenefitsAppliedState: '',
            BenefitsPaidState: '',
            AppBenefitsState: '',
            OldAgeBenefitsState: '',
            RemarkState: '',
            Msearch: '',
            MailingAddressState: '',
            AWsearch: '',
            WitnessAddressState: '',
            AW2search: '',
            Witness2AddressState: '',
            validationError: {},
            isValidBenefits: false,
            isValidDateDisability: false,
            isValidDisability: false,
            isValidApplyBenefits: false,
            isValidFirstName: false,
            isValidLastName: false,
            isValidMadienName: false,
            isValidBirthName: false,
            isValidSSNumber: false,
            isValidIINumber: false,
            isValidPFirstName: false,
            isValidPLastName: false,
            isValidPMadienName: false,
            isValidRelationship: false,
            isValidDateOfBirth: false,
            isValidPlaceOfBirth: false,
            isValidCitizenship: false,
            isValidCountryRes: false,
            isValidMarital: false,
            // isValidWeddingDate: false,
            isValidClaim: false,
            isValidFullName: false,
            isValidWorker: false,
            isValidPDateOfBirth: false,
            isValidBenefitsClaim: false,
            isValidPFullName: false,
            isValidAddress: false,
            isValidDetails: false,
            isValidFamilyIncome: false,
            isValidCFullName: false,
            isValidTypeOfIncome: false,
            isValidMonthlyAmount: false,
            isValidWorking: false,
            isValidWorkingEmp: false,
            isValidWorkingDate: false,
            isValidSpousePension: false,
            isValidChildFullName: false,
            isValidInsuranceName: false,
            isValidMonthlyBenefits: false,
            isValidCDateOfBirth: false,
            isValidPPlaceOfBirth: false,
            isValidPMarital: false,
            isValidPCitizenship: false,
            isValidPlaceOfDeath: false,
            isValidDateOfDeath: false,
            isValidReceivingBenefits: false,
            isValidTypeBenefits: false,
            isValidAccountNumber: false,
            isValidPayingAgency: false,
            isValidClaimingBenefits: false,
            isValidDecree: false,
            isValidPClaimingBenefits: false,
            isValidSpouse: false,
            isValidChildren: false,
            isValidPSpouse: false,
            isValidPChildren: false,
            isValidParents: false,
            isValidWorkedFrom: false,
            isValidWorkedTo: false,
            isValidWorkingAddress: false,
            isValidTypeOfIndustry: false,
            isValidPaidAgency: false,
            isValidInsuranceNumber: false,
            isValidMilitarySerivce: false,
            isValidWorkedFromMilitary: false,
            isValidWorkedToMilitary: false,
            isValidMilitaryBranch: false,
            isValidCountryServed: false,
            isValidFormatSSNumber: false,
            isValidFormatIINumber: false,
            isValidMFullName: false,
            isValidMRelationship: false,
            isValidFederalAgency: false,
            isValidWorkerEngage: false,
            isValidWorkedFromUS: false,
            isValidWorkedToUS: false,
            isValidWorkedEngageAddress: false,
            isValidEmpInfo: false,
            isValidFFullName: false,
            isValidClaimNumber: false,
            isValidBenefitsApplied: false,
            isValidBenefitsPaid: false,
            isValidAppBenefits: false,
            isValidOldAgeBenefits: false,
            isValidSignature: false,
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

BenQusItaly.propTypes = {
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(BenQusItaly);