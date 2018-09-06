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

//Signature Pad
import SignaturePad from 'react-signature-pad';

//API Calling Method
import axios from 'axios';

//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Notification
import Notifications, { notify } from 'react-notify-toast';

//Google Address Auto Complete
import Geosuggest from 'react-geosuggest';
var emailresult;
const TypeOfBenefitsItems = [
    <MenuItem value={"Old Age"} key={1} primaryText={`Old Age`} />,
    <MenuItem value={"Disability"} key={2} primaryText={`Disability`} />,
];

const TypeOfPensionItems = [
    <MenuItem value={"Old Age"} key={1} primaryText={`Old Age`} />,
    <MenuItem value={"Disability"} key={2} primaryText={`Disability`} />,
    <MenuItem value={"Survivors "} key={3} primaryText={`Survivors `} />,
];

const TypeOfBankOfficeItems = [
    <MenuItem value={"Head Office"} key={1} primaryText={`Head Office`} />,
    <MenuItem value={"Branch Office"} key={2} primaryText={`Branch Office`} />,
];

const TypeOfPensionCoveredItems = [
    <MenuItem value={"National Pension"} key={1} primaryText={`National Pension`} />,
    <MenuItem value={"Employees Pension Insurance"} key={2} primaryText={`Employees Pension Insurance`} />,
    <MenuItem value={"Employees Pension (Seamen's) Insurance"} key={3} primaryText={`Employees Pension (Seamen's) Insurance`} />,
    <MenuItem value={"Mutual Aid Pension"} key={4} primaryText={`Mutual Aid Pension`} />,
];

const PubPensionCoveredFirstMedExamItems = [
    <MenuItem value={"National Pension"} key={1} primaryText={`National Pension`} />,
    <MenuItem value={"U.S. Social Security"} key={2} primaryText={`U.S. Social Security`} />,
    <MenuItem value={"Employees Pension Insurance"} key={3} primaryText={`Employees Pension Insurance`} />,
    <MenuItem value={"Mutual Aid Pension"} key={4} primaryText={`Mutual Aid Pension`} />,
];

const TypeOfClaimLawsItems = [
    <MenuItem value={"Labour Standards Law"} key={1} primaryText={`Labour Standards Law`} />,
    <MenuItem value={"Workers' Accident Compensation Insurance Law"} key={2} primaryText={`Workers' Accident Compensation Insurance Law`} />,
    <MenuItem value={"National Government Employees' Accident Compensation Insurance Law"} key={3} primaryText={`National Government Employees' Accident Compensation Insurance Law`} />,
    <MenuItem value={"Local Government Employees' Accident Compensation Insurance Law"} key={4} primaryText={`Local Government Employees' Accident Compensation Insurance Law`} />,
    <MenuItem value={"Occupational Accident Compensation Law for Public School Physicians, Dentists, and Pharmacists"} key={3} primaryText={`Occupational Accident Compensation Law for Public School Physicians, Dentists, and Pharmacists`} />,
    <MenuItem value={"Seamen's Insurance Law"} key={4} primaryText={`Seamen's Insurance Law`} />,
];


const TypeOfClaimItems = [
    <MenuItem value={"Claim for benefits due to onset of disability while contributing"} key={1} primaryText={`Claim for benefits due to onset of disability while contributing`} />,
    <MenuItem value={"Claim for benefits due to advanced degree of disability"} key={2} primaryText={`Claim for benefits due to advanced degree of disability`} />,
]

const TypeOfBenEligibleDisItems = [
    <MenuItem value={"Disability Compensation Benefit (Disability Benefit) "} key={1} primaryText={`Disability Compensation Benefit (Disability Benefit)`} />,
    <MenuItem value={"Invalidity Compensation Benefit (Invalidity Pension)"} key={2} primaryText={`Invalidity Compensation Benefit (Invalidity Pension)`} />,
]

const YesNoItems = [
    <MenuItem value={"Yes"} key={1} primaryText={`Yes`} />,
    <MenuItem value={"No"} key={2} primaryText={`No`} />,
]

const SexItems = [
    <MenuItem value={"Male"} key={1} primaryText={`Male`} />,
    <MenuItem value={"Female"} key={2} primaryText={`Female`} />,
];

const YearItems = [];
for (let i = 1945; i < 2019; i++) {
    YearItems.push(<MenuItem value={i.toString()} key={i.toString()} primaryText={i.toString()} />);
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

const ClaimantChildrens = [];

const HistoryOfCoverage = [];

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

const newstyle = {
    marginTop: 10,
}

class BenQusJapan extends Component {
    constructor(props) {
        super(props);
        this.handleBenQusJpnAuto(this);
        //Field State Values Initialization
        this.state = {
            search: "",
            bsearch: "",
            wsearch: "",
            value: "",
            CountryCode: "JP",
            BtnNameState: "Save",
            //Claimant Information State
            HandBookNumState: "",
            SSNumberState: "",
            TypeOfBenefitsState: "",
            LastNameState: "",
            FirstNameState: "",
            SexState: "",
            DOBState: "",
            AddressState: "",
            PhoneNumState: "",
            //Claimant's Partner Information State  
            PLastNameState: "",
            PFirstNameState: "",
            PSexState: "",
            PDOBState: "",
            PHandBookNumState: "",
            PAnnualIncomeAnsState: "",
            //Claimant's Child Information State  
            CLastNameState: "",
            CFirstNameState: "",
            CSexState: "",
            CDOBState: "",
            ChildDisablityState: "",
            CAnnualIncomeAnsState: "",
            //Claimant Bank Information State
            FinInstitutionState: "",
            BankNameState: "",
            TypeOfBankOfficeState: "",
            BranchOfficeNameState: "",
            BankAccountNumState: "",
            BankAddressState: "",
            //Japanese Claimant Pension Information State
            JapanPubPensionState: "",
            NameOfSystemState: "",
            TypeOfPensionState: "",
            DateOfEntitlementState: "",
            PensionCodeNumState: "",
            //Japanese Claimant's Spouse Pension Information State
            CJapanPubPensionState: "",
            CNameOfSystemState: "",
            CTypeOfPensionState: "",
            CDateOfEntitlementState: "",
            CPensionCodeNumState: "",
            //History Of Coverage Information State  
            PeriodOfCoverageState: "",
            FromDateState: "",
            ToDateState: "",
            WorkplaceNameState: "",
            WorkplaceAddressState: "",
            TypeOfPensionCoveredState: "",
            FormerNameState: "",
            //Workplace State
            LastCompanyNameState: "",
            LastCompanyHealthInsNumState: "",
            UnderSeamenInsState: "",
            InsPerRefCodeNumState: "",
            PeriodOfInsPaidState: "",
            WFromDateState: "",
            WToDateState: "",
            JapanInsBranchNameState: "",
            //Disability Information State
            TypeOfClaimState: "",
            ClaimBenOnsetDisPastState: "",
            RecvJapanPubPenDisState: "",
            NameOfPensionState: "",
            DPensionCodeNumState: "",
            DisInjNameState: "",
            DateOfOnsetState: "",
            FirstMedExamDateState: "",
            PubPensionCoveredFirstMedExamState: "",
            DisInjStableDateState: "",
            DisInjCausedByWorkState: "",
            DisInjTypeOfClaimLawsState: "",
            TypeOfBenEligibleDisState: "",
            DisDateOfEntitlementState: "",
            DisInjCausedByTPartyState: "",
            //Claimant Information Empty Validation
            isValidHandBookNum: false,
            isValidSSNumber: false,
            isValidTypeOfBenefits: false,
            isValidLastName: false,
            isValidFirstName: false,
            isValidSex: false,
            isValidDOB: false,
            isValidAddress: false,
            isValidPhoneNum: false,
            //Claimant's Partner Information Empty Validation
            isValidPLastName: false,
            isValidPFirstName: false,
            isValidPSex: false,
            isValidPDOB: false,
            isValidPHandBookNum: false,
            isValidPAnnualIncomeAns: false,
            //Claimant's Child Information Empty Validation
            isValidCLastName: false,
            isValidCFirstName: false,
            isValidCSex: false,
            isValidCDOB: false,
            isValidChildDisablity: false,
            isValidCAnnualIncomeAns: false,
            //Claimant Bank Information Empty Validation
            isValidFinInstitution: false,
            isValidBankName: false,
            isValidTypeOfBankOffice: false,
            isValidBranchOfficeName: false,
            isValidBankAccountNum: false,
            isValidBankAddress: false,
            //Japaneses Claimant Information Empty Validation
            isValidJapanPubPension: false,
            isValidNameOfSystem: false,
            isValidTypeOfPension: false,
            isValidDateOfEntitlement: false,
            isValidPensionCodeNum: false,
            //Japaneses Claimant's Spouse Information Empty Validation
            isValidCJapanPubPension: false,
            isValidCNameOfSystem: false,
            isValidCTypeOfPension: false,
            isValidCDateOfEntitlement: false,
            isValidCPensionCodeNum: false,
            //History Of Coverage Information Empty Validation
            isValidPeriodOfCoverage: false,
            isValidFromDate: false,
            isValidToDate: false,
            isValidWorkplaceName: false,
            isValidWorkplaceAddress: false,
            isValidTypeOfPensionCovered: false,
            isValidFormerName: false,
            //Hitory of Coverage
            isValidLastCompanyName: false,
            isValidInsPerRefCodeNum: false,
            isValidPeriodOfInsPaid: false,
            isValidWFromDate: false,
            isValidWToDate: false,
            isValidJapanInsBranchName: false,
            //Disability Information Format Validation
            isValidTypeOfClaim: false,
            isValidNameOfPension: false,
            isValidDPensionCodeNum: false,
            isValidDisInjName: false,
            isValidDateOfOnset: false,
            isValidFirstMedExamDate: false,
            isValidPubPensionCoveredFirstMedExam: false,
            isValidDisInjStableDate: false,
            isValidDisInjCausedByWork: false,
            isValidDisInjTypeOfClaimLaws: false,
            isValidTypeOfBenEligibleDis: false,
            isValidDisDateOfEntitlement: false,
            isValidDisInjCausedByTParty: false,
            //Claimant Information Format Validation
            isValidFormatHandBookNum: false,
            isValidFormatSSNumber: false,
            isValidFormatLastName: false,
            isValidFormatFirstName: false,
            isValidFormatPhoneNum: false,
            //Claimant's Partner Information Format Validation
            isValidFormatPLastName: false,
            isValidFormatPFirstName: false,
            isValidFormatPHandBookNum: false,
            //Claimant's Child Information Format Validation
            isValidFormatCLastName: false,
            isValidFormatCFirstName: false,
            isValidFormatCHandBookNum: false,
            //Claimant Bank Information Format Validation
            isValidFormatFinInstitution: false,
            isValidFormatBankName: false,
            isValidFormatBranchOfficeName: false,
            isValidFormatBankAccountNum: false,
            //Japaneses Claimant Information Format Validation
            isValidFormatNameOfSystem: false,
            isValidFormatPensionCodeNum: false,
            //Japaneses Claimant's Spouse Information Format Validation
            isValidFormatCNameOfSystem: false,
            isValidFormatCPensionCodeNum: false,
            //History Of Coverage Information Format Validation
            isValidFormatWorkplaceName: false,
            isValidFormatFormerName: false,
            isValidFormatLastCompanyName: false,
            isValidFormatLastCompanyHealthInsNum: false,
            isValidFormatInsPerRefCodeNum: false,
            isValidFormatJapanInsBranchName: false,
            //Disability Information Format Validataion
            isValidFormatNameOfPension: false,
            isValidFormatDPensionCodeNum: false,
        }
    }

    componentDidMount(){
        emailresult = localStorage.getItem('applicant_email');
    }
    handleReset(e) {
        this.setState({
            search: "",
            bsearch: "",
            value: "",
            CountryCode: "JP",
            BtnNameState: "Save",
            HandBookNumState: "",
            SSNumberState: "",
            TypeOfBenefitsState: "",
            LastNameState: "",
            FirstNameState: "",
            AddressState: "",
            PhoneNumState: "",
            SexState: "",
            DOBState: "",
            isValidHandBookNum: false,
            isValidSSNumber: false,
            isValidTypeOfBenefits: false,
            isValidLastName: false,
            isValidFirstName: false,
            isValidSex: false,
            isValidDOB: false,
            isValidAddress: false,
            isValidPhoneNum: false,
            isValidFormatHandBookNum: false,
            isValidFormatSSNumber: false,
            isValidFormatLastName: false,
            isValidFormatFirstName: false,
            isValidFormatPhoneNum: false
        });
    }

    /***Handle Event ***/
    //Claimant Information Handle Change Events
    handleChangeHandBookNum(e) {
        this.setState({ HandBookNumState: e.target.value });
    }

    handleChangeSSNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            this.setState({ SSNumberState: onlyNums });
        }
    };

    handleChangeTypeOfBenefits = (event, index, value) => {
        this.setState({ TypeOfBenefitsState: value });
    };

    handleChangeLastName(e) {
        this.setState({ LastNameState: e.target.value });
    }

    handleChangeFirstName(e) {
        this.setState({ FirstNameState: e.target.value });
    }

    handleChangeSex = (event) => {
        this.setState({ SexState: event.target.value });
    };

    handleChangeDOB = (e, date) => {
        this.setState({ DOBState: date });
    }

    handleSelectSuggest(suggest) {
        if (suggest) {
            this.setState({ AddressState: suggest.description });
        }
    }

    handleChangeAddress(value) {
        this.setState({ AddressState: value })
    }

    handleChangePhoneNum(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            this.setState({ PhoneNumState: onlyNums });
        }
    }

    //Claimant's Partner Information Handle Change Events 
    handleChangePLastName(e) {
        this.setState({ PLastNameState: e.target.value });
    }

    handleChangePFirstName(e) {
        this.setState({ PFirstNameState: e.target.value });
    }

    handleChangePSex = (event) => {
        this.setState({ PSexState: event.target.value });
    };

    handleChangePDOB = (e, date) => {
        this.setState({ PDOBState: date });
    }

    handleChangePHandBookNum(e) {
        this.setState({ PHandBookNumState: e.target.value });
    }

    handleChangePAnnualIncomeAns = (event) => {
        this.setState({ PAnnualIncomeAnsState: event.target.value });
    };

    //Claimant's Child Information Handle Change Events 
    handleChangeCLastName(e) {
        this.setState({ CLastNameState: e.target.value });
    }

    handleChangeCFirstName(e) {
        this.setState({ CFirstNameState: e.target.value });
    }

    handleChangeCSex = (event) => {
        this.setState({ CSexState: event.target.value });
    };

    handleChangeCDOB = (e, date) => {
        this.setState({ CDOBState: date });
    }

    handleChangeChildDisablity = (event) => {
        this.setState({ ChildDisablityState: event.target.value });
    }

    handleChangeCAnnualIncomeAns = (event) => {
        this.setState({ CAnnualIncomeAnsState: event.target.value });
    };

    //Claimant Bank Information Handle Change Events
    handleChangeFinInstitution(e) {
        this.setState({ FinInstitutionState: e.target.value });
    }

    handleChangeBankName(e) {
        this.setState({ BankNameState: e.target.value });
    }

    handleChangeTypeOfBankOffice = (event, index, value) => {
        this.setState({ TypeOfBankOfficeState: value });
    };

    handleChangeBranchOfficeName(e) {
        this.setState({ BranchOfficeNameState: e.target.value });
    }

    handleChangeBankAccountNum(e) {
        this.setState({ BankAccountNumState: e.target.value });
    }

    handleSelectBankSuggest(suggest) {
        if (suggest) {
            this.setState({ BankAddressState: suggest.description });
        }
    }

    handleChangeBankAddress(value) {
        this.setState({ BankAddressState: value })
    }

    //Japaneses Claimant Information Handle Change Events
    handleChangeJapanPubPension = (event) => {
        this.setState({ JapanPubPensionState: event.target.value });
    }

    handleChangeNameOfSystem(e) {
        this.setState({ NameOfSystemState: e.target.value });
    };

    handleChangeTypeOfPension = (event, index, value) => {
        this.setState({ TypeOfPensionState: value });
    };

    handleChangeDateOfEntitlement = (e, date) => {
        this.setState({ DateOfEntitlementState: date });
    }

    handleChangePensionCodeNum(e) {
        this.setState({ PensionCodeNumState: e.target.value });
    }

    //Japaneses Claimant's Spouse Information Handle Change Events
    handleChangeCJapanPubPension = (event) => {
        this.setState({ CJapanPubPensionState: event.target.value });
    }

    handleChangeCNameOfSystem(e) {
        this.setState({ CNameOfSystemState: e.target.value });
    };

    handleChangeCTypeOfPension = (event, index, value) => {
        this.setState({ CTypeOfPensionState: value });
    };

    handleChangeCDateOfEntitlement = (e, date) => {
        this.setState({ CDateOfEntitlementState: date });
    }

    handleChangeCPensionCodeNum(e) {
        this.setState({ CPensionCodeNumState: e.target.value });
    }

    //History Of Coverage Information Handle Change Events 
    handleChangePeriodOfCoverage = (event, index, value) => {
        this.setState({ PeriodOfCoverageState: value });
    }

    handleChangeWFromDate = (e, date) => {
        this.setState({ WFromDateState: date });
    }

    handleChangeWToDate = (e, date) => {
        this.setState({ WToDateState: date });
    }

    handleChangeWorkplaceName(e) {
        this.setState({ WorkplaceNameState: e.target.value });
    }

    handleSelectWorkSuggest(suggest) {
        if (suggest) {
            this.setState({ WorkplaceAddressState: suggest.description });
        }
    }

    handleChangeWorkplaceAddress(value) {
        this.setState({ WorkplaceAddressState: value })
    }

    handleChangeTypeOfPensionCovered = (event, index, value) => {
        this.setState({ TypeOfPensionCoveredState: value });
    };

    handleChangeFormerName(e) {
        this.setState({ FormerNameState: e.target.value });
    }

    //History Of Coverage
    handleChangeLastCompanyName(e) {
        this.setState({ LastCompanyNameState: e.target.value });
    }

    handleChangeLastCompanyHealthInsNum(e) {
        this.setState({ LastCompanyHealthInsNumState: e.target.value });
    }

    handleChangeUnderSeamenIns = (e) => {
        this.setState({ UnderSeamenInsState: e.target.value });
    };

    handleChangeInsPerRefCodeNum(e) {
        this.setState({ InsPerRefCodeNumState: e.target.value });
    }

    handleChangePeriodOfInsPaid = (event, index, value) => {
        this.setState({ PeriodOfInsPaidState: value });
    };

    handleChangeFromDate = (e, date) => {
        this.setState({ FromDateState: date });
    }

    handleChangeToDate = (e, date) => {
        this.setState({ ToDateState: date });
    }

    handleChangeJapanInsBranchName(e) {
        this.setState({ JapanInsBranchNameState: e.target.value });
    }

    //Disability Handle Events

    handleChangeTypeOfClaim = (event, index, value) => {
        this.setState({ TypeOfClaimState: value });
    };

    handleChangeClaimBenOnsetDisPast = (event) => {
        this.setState({ ClaimBenOnsetDisPastState: event.target.value });
    };

    handleChangeRecvJapanPubPenDis = (event) => {
        this.setState({ RecvJapanPubPenDisState: event.target.value });
    };

    handleChangeNameOfPension(e) {
        this.setState({ NameOfPensionState: e.target.value });
    }

    handleChangeDPensionCodeNum(e) {
        this.setState({ DPensionCodeNumState: e.target.value });
    }

    handleChangeDisInjName(e) {
        this.setState({ DisInjNameState: e.target.value });
    }

    handleChangeDateOfOnset = (e, date) => {
        this.setState({ DateOfOnsetState: date });
    }

    handleChangeFirstMedExamDate = (e, date) => {
        this.setState({ FirstMedExamDateState: date });
    }

    handleChangePubPensionCoveredFirstMedExam = (event, index, value) => {
        this.setState({ PubPensionCoveredFirstMedExamState: value });
    };

    handleChangeDisInjStableDate = (e, date) => {
        this.setState({ DisInjStableDateState: date });
    }

    handleChangeDisInjCausedByWork = (event) => {
        this.setState({ DisInjCausedByWorkState: event.target.value });
    };

    handleChangeDisInjTypeOfClaimLaws = (event, index, value) => {
        this.setState({ DisInjTypeOfClaimLawsState: value });
    };

    handleChangeTypeOfBenEligibleDis = (event, index, value) => {
        this.setState({ TypeOfBenEligibleDisState: value });
    };

    handleChangeDisDateOfEntitlement = (e, date) => {
        this.setState({ DisDateOfEntitlementState: date });
    }

    handleChangeDisInjCausedByTParty = (event) => {
        this.setState({ DisInjCausedByTPartyState: event.target.value });
    };

    handleSignatureClear = (e) => {
        this.signaturePad.clear();
    }
    handleValidateChildForm(event) {
        let validForm = false;
        //Caimant's Child Information Form Validation         
        var validCLNameForm = false;
        var validCFNameForm = false;
        var validCSexForm = false;
        var validCDOBForm = false;
        var validChildDisabilityForm = false;
        var validCAnnualIncomeAnsForm = false;

        //Claimant's Child Information Validation Code 
        if (this.state.CLastNameState.length > 0) {
            this.setState({ isValidCLastName: false });
            if (this.state.CLastNameState.length > 0 && this.state.CLastNameState.length > 2) {
                this.setState({ isValidFormatCLastName: false });
                validCLNameForm = true;
            }
            else {
                this.setState({ isValidFormatCLastName: true });
                this.setState({ isValidCLastName: false });
            }
        }
        else {
            this.setState({ isValidCLastName: true });
            this.setState({ isValidFormatCLastName: false });
            validCLNameForm = false;
        }

        if (this.state.CFirstNameState.length > 0) {
            this.setState({ isValidCFirstName: false });
            if (this.state.CFirstNameState.length > 0 && this.state.CFirstNameState.length > 2) {
                this.setState({ isValidFormatCFirstName: false });
                validCFNameForm = true;
            }
            else {
                this.setState({ isValidFormatCFirstName: true });
                this.setState({ isValidCFirstName: false });
            }
        }
        else {
            this.setState({ isValidCFirstName: true });
            this.setState({ isValidFormatCFirstName: false });
            validCFNameForm = false;
        }

        if (this.state.CSexState != "") {
            this.setState({ isValidCSex: false });
            validCSexForm = true;
        }
        else {
            this.setState({ isValidCSex: true });
            validCSexForm = false;
        }

        if (this.state.CDOBState != "") {
            this.setState({ isValidCDOB: false });
            validCDOBForm = true;
        }
        else {
            this.setState({ isValidCDOB: true });
            validCDOBForm = false;
        }

        if (this.state.ChildDisablityState.length > 0) {
            this.setState({ isValidChildDisablity: false });
            validChildDisabilityForm = true;
        }
        else {
            this.setState({ isValidChildDisablity: true });
            validChildDisabilityForm = false;
        }

        if (this.state.CAnnualIncomeAnsState != "") {
            this.setState({ isValidCAnnualIncomeAns: false });
            validCAnnualIncomeAnsForm = true;
        }
        else {
            this.setState({ isValidCAnnualIncomeAns: true });
            validCAnnualIncomeAnsForm = false;
        }

        if (validCLNameForm && validCFNameForm && validCSexForm && validCDOBForm && validChildDisabilityForm && validCAnnualIncomeAnsForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }

        return validForm;
    }

    handleChildReset(e) {
        this.setState({
            //Claimant's Child State
            CLastNameState: "",
            CFirstNameState: "",
            CSexState: "",
            CDOBState: "",
            ChildDisablityState: "",
            CAnnualIncomeAnsState: "",
            //Claimant's Child Information Empty Validation
            isValidCLastName: false,
            isValidCFirstName: false,
            isValidCSex: false,
            isValidCDOB: false,
            isValidChildDisablity: false,
            isValidCAnnualIncomeAns: false,
            //Claimant's Child Information Format Validation
            isValidFormatCLastName: false,
            isValidFormatCFirstName: false,
            isValidFormatCHandBookNum: false,
        });
    }

    handleBenQusChildDatas(event) {
        var valid = this.handleValidateChildForm(this);
        if (valid) {
            var ChildrenJSONData = {
                CLastName: this.state.CLastNameState,
                CFirstName: this.state.CFirstNameState,
                CSex: this.state.CSexState,
                CDOB: this.state.CDOBState,
                ChildDisablity: this.state.ChildDisablityState,
                CAnnualIncomeAns: this.state.CAnnualIncomeAnsState
            }
            if (ClaimantChildrens.length < 2) {
                ClaimantChildrens.push(ChildrenJSONData);
                notify.show("Child Information Added Successfully", "success", 3000);
                this.handleChildReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Two Children to Add", "warning", 3000);
            }
        }
    }

    handleValidateHistoryOfCoverageForm(event) {
        let validForm = false;
        //History Of Coverage Information Form Validation         
        var validPeriodOfCoverageForm = false;
        var validFromDateForm = false;
        var validToDateForm = false;
        var validWorkplaceNameForm = false;
        var validWorkplaceAddressForm = false;
        var validTypeOfPensionCoveredForm = false;
        var validFormerNameForm = false;

        //History Of Coverage Information Validation Code 
        if (this.state.PeriodOfCoverageState.length > 0) {
            this.setState({ isValidPeriodOfCoverage: false });
            validPeriodOfCoverageForm = true;
        }
        else {
            this.setState({ isValidPeriodOfCoverage: true });
            validPeriodOfCoverageForm = false;
        }

        if (this.state.FromDateState != "") {
            this.setState({ isValidFromDate: false });
            validFromDateForm = true;
        }
        else {
            this.setState({ isValidFromDate: true });
            validFromDateForm = false;
        }

        if (this.state.ToDateState != "") {
            this.setState({ isValidToDate: false });
            validToDateForm = true;
        }
        else {
            this.setState({ isValidToDate: true });
            validToDateForm = false;
        }

        if (this.state.WorkplaceNameState.length > 0) {
            this.setState({ isValidWorkplaceName: false });
            if (this.state.WorkplaceNameState.length > 0 && this.state.WorkplaceNameState.length > 2) {
                this.setState({ isValidFormatWorkplaceName: false });
                validWorkplaceNameForm = true;
            }
            else {
                this.setState({ isValidFormatWorkplaceName: true });
                this.setState({ isValidWorkplaceName: false });
            }
        }
        else {
            this.setState({ isValidWorkplaceName: true });
            this.setState({ isValidFormatWorkplaceName: false });
            validWorkplaceNameForm = false;
        }

        if (this.state.WorkplaceAddressState.length > 0) {
            this.setState({ isValidWorkplaceAddress: false });
            validWorkplaceAddressForm = true;
        }
        else {
            this.setState({ isValidWorkplaceAddress: true });
            validWorkplaceAddressForm = false;
        }

        if (this.state.TypeOfPensionCoveredState.length > 0) {
            this.setState({ isValidTypeOfPensionCovered: false });
            validTypeOfPensionCoveredForm = true;
        }
        else {
            this.setState({ isValidTypeOfPensionCovered: true });
            validTypeOfPensionCoveredForm = false;
        }

        if (this.state.TypeOfPensionCoveredState == "Mutual Aid Pension") {
            if (this.state.FormerNameState.length > 0) {
                this.setState({ isValidFormerName: false });
                if (this.state.FormerNameState.length > 0 && this.state.FormerNameState.length > 2) {
                    this.setState({ isValidFormatFormerName: false });
                    validFormerNameForm = true;
                }
                else {
                    this.setState({ isValidFormatFormerName: true });
                    this.setState({ isValidFormerName: false });
                }
            }
            else {
                this.setState({ isValidFormerName: true });
                this.setState({ isValidFormatFormerName: false });
                validFormerNameForm = false;
            }
        }
        else {
            this.setState({ isValidFormerName: true });
            this.setState({ isValidFormatFormerName: false });
            validFormerNameForm = true;
        }

        if (validPeriodOfCoverageForm && validFromDateForm && validToDateForm && validWorkplaceNameForm && validWorkplaceAddressForm && validTypeOfPensionCoveredForm && validFormerNameForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }

        return validForm;
    }

    handleHistoryOfCoverageReset(e) {
        this.setState({
            //History Of Coverage Information State  
            PeriodOfCoverageState: "",
            FromDateState: "",
            ToDateState: "",
            WorkplaceNameState: "",
            WorkplaceAddressState: "",
            TypeOfPensionCoveredState: "",
            FormerNameState: "",
            //History Of Coverage Information Empty Validation
            isValidPeriodOfCoverage: false,
            isValidFromDate: false,
            isValidToDate: false,
            isValidWorkplaceName: false,
            isValidWorkplaceAddress: false,
            isValidTypeOfPensionCovered: false,
            isValidFormerName: false,
            //History Of Coverage Information Format Validation
            isValidFormatWorkplaceName: false,
            isValidFormatFormerName: false

        });
    }

    handleBenQusHistoryOfCoverageDatas(event) {
        var valid = this.handleValidateHistoryOfCoverageForm(this);
        if (valid) {
            var HistoryOfCoveryJSONData = {
                PeriodOfCoverage: this.state.PeriodOfCoverageState,
                FromDate: this.state.FromDateState,
                ToDate: this.state.ToDateState,
                WorkplaceName: this.state.WorkplaceNameState,
                WorkplaceAddress: this.state.WorkplaceAddressState,
                TypeOfPensionCovered: this.state.TypeOfPensionCoveredState,
                FormerName: this.state.FormerNameState
            }
            if (HistoryOfCoverage.length < 9) {
                HistoryOfCoverage.push(HistoryOfCoveryJSONData);
                notify.show("Your Coverage Information Added Successfully", "error", 3000);
                this.handleHistoryOfCoverageReset(this);
            }
            else {
                notify.show("GPA Allow Maximum 8 Coverages to Add", "warning", 3000);
            }
        }
    }

    handleValidateForm(event) {
        let validForm = false;
        //Caimant Information Form Validation
        var validHandBookNumForm = false;
        var validSSNumberForm = false;
        var validTypeOfBenefitsForm = false;
        var validLNameForm = false;
        var validFNameForm = false;
        var validSexForm = false;
        var validDOBForm = false;
        var validAddressForm = false;
        var validPhoneNumForm = false;
        //Caimant's Partner Information Form Validation         
        var validPLNameForm = false;
        var validPFNameForm = false;
        var validPSexForm = false;
        var validPDOBForm = false;
        var validPHandBookNumForm = false;
        var validPAnnualIncomeAnsForm = false;
        //Caimant Information Form Validation
        var validFinInstitutionForm = false;
        var ValidBankNameForm = false;
        var validTypeOfBankOfficeForm = false;
        var validBranchOfficeNameForm = false;
        var validBankAccountNumForm = false;
        var validBankAddressForm = false;
        //Japanese Caimant Information Form Validation
        var validJapanPubPensionForm = false;
        var validNameOfSystemForm = false;
        var validTypeOfPensionForm = false;
        var validDateOfEntitlementForm = false;
        var validPensionCodeNumForm = false;
        //Japanese Caimant's Spouse Information Form Validation
        var validCJapanPubPensionForm = false;
        var validCNameOfSystemForm = false;
        var validCTypeOfPensionForm = false;
        var validCDateOfEntitlementForm = false;
        var validCPensionCodeNumForm = false;
        //History Of Coverage
        var validLastCompanyNameForm = false;
        var validLastCompanyHealthInsNumForm = false;
        var validInsPerRefCodeNumForm = false;
        var validPeriodOfInsPaidForm = false;
        var validWFromDateForm = false;
        var validWToDateForm = false;
        var validJapanInsBranchNameForm = false;
        //Disability Form Validation
        var validTypeOfClaimForm = false;
        var validClaimBenOnsetDisPastForm = false;
        var validRecvJapanPubPenDisForm = false;
        var validNameOfPensionForm = false;
        var validDPensionCodeNumForm = false;
        var validDisInjNameForm = false;
        var validDateOfOnsetForm = false;
        var validFirstMedExamDateForm = false;
        var validPubPensionCoveredFirstMedExamForm = false;
        var validDisInjStableDateForm = false;
        var validDisInjCausedByWorkForm = false;
        var validDisInjTypeOfClaimLawsForm = false;
        var validTypeOfBenEligibleDisForm = false;
        var validDisDateOfEntitlementForm = false;
        var validDisInjCausedByTPartyForm = false;
        var validSignatureForm = false;

        //Claimant Information Validation Code
        if (this.state.HandBookNumState.length > 0) {
            this.setState({ isValidHandBookNum: false });
            if (this.state.HandBookNumState.length > 0 && this.state.HandBookNumState.length > 2) {
                this.setState({ isValidFormatHandBookNum: false });
                validHandBookNumForm = true;
            }
            else {
                this.setState({ isValidFormatHandBookNum: true });
                this.setState({ isValidHandBookNum: false });
            }
        }
        else {
            this.setState({ isValidHandBookNum: true });
            this.setState({ isValidFormatHandBookNum: false });
            validHandBookNumForm = false;
        }

        if (this.state.SSNumberState.length > 0) {
            this.setState({ isValidSSNumber: false });
            if (this.state.SSNumberState.length > 0 && this.state.SSNumberState.length > 8) {
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

        if (this.state.TypeOfBenefitsState != "") {
            this.setState({ isValidTypeOfBenefits: false });
            validTypeOfBenefitsForm = true;
        }
        else {
            this.setState({ isValidTypeOfBenefits: true });
            validTypeOfBenefitsForm = false;
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

        if (this.state.SexState != "") {
            this.setState({ isValidSex: false });
            validSexForm = true;
        }
        else {
            this.setState({ isValidSex: true });
            validSexForm = false;
        }

        if (this.state.DOBState != "") {
            this.setState({ isValidDOB: false });
            validDOBForm = true;
        }
        else {
            this.setState({ isValidDOB: true });
            validDOBForm = false;
        }

        if (this.state.AddressState.length > 0) {
            this.setState({ isValidAddress: false });
            validAddressForm = true;
        }
        else {
            this.setState({ isValidAddress: true });
            validAddressForm = false;
        }

        if (this.state.PhoneNumState.length > 0) {
            this.setState({ isValidPhoneNum: false });
            if (this.state.PhoneNumState.length > 0 && this.state.PhoneNumState.length > 9) {
                this.setState({ isValidFormatPhoneNum: false });
                validPhoneNumForm = true;
            }
            else {
                this.setState({ isValidFormatPhoneNum: true });
            }
        }
        else {
            this.setState({ isValidPhoneNum: true });
            this.setState({ isValidFormatPhoneNum: false });
            validPhoneNumForm = false;
        }

        //Claimant's Partner Information Validation Code 
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

        if (this.state.PSexState != "") {
            this.setState({ isValidPSex: false });
            validPSexForm = true;
        }
        else {
            this.setState({ isValidPSex: true });
            validPSexForm = false;
        }

        if (this.state.PDOBState != "") {
            this.setState({ isValidPDOB: false });
            validPDOBForm = true;
        }
        else {
            this.setState({ isValidPDOB: true });
            validPDOBForm = false;
        }

        if (this.state.PHandBookNumState.length > 0) {
            this.setState({ isValidPHandBookNum: false });
            if (this.state.PHandBookNumState.length > 0 && this.state.PHandBookNumState.length > 2) {
                this.setState({ isValidFormatPHandBookNum: false });
                validPHandBookNumForm = true;
            }
            else {
                this.setState({ isValidFormatPHandBookNum: true });
                this.setState({ isValidPHandBookNum: false });
            }
        }
        else {
            this.setState({ isValidPHandBookNum: true });
            this.setState({ isValidFormatPHandBookNum: false });
            validPHandBookNumForm = false;
        }

        if (this.state.PAnnualIncomeAnsState != "") {
            this.setState({ isValidPAnnualIncomeAns: false });
            validPAnnualIncomeAnsForm = true;
        }
        else {
            this.setState({ isValidPAnnualIncomeAns: true });
            validPAnnualIncomeAnsForm = false;
        }

        //Claimant Bank Information Validation Code
        if (this.state.FinInstitutionState.length > 0) {
            this.setState({ isValidFinInstitution: false });
            if (this.state.FinInstitutionState.length > 0 && this.state.FinInstitutionState.length > 2) {
                this.setState({ isValidFormatFinInstitution: false });
                validFinInstitutionForm = true;
            }
            else {
                this.setState({ isValidFormatHandBookNum: true });
                this.setState({ isValidFinInstitution: false });
            }
        }
        else {
            this.setState({ isValidFinInstitution: true });
            this.setState({ isValidFormatFinInstitution: false });
            validFinInstitutionForm = false;
        }

        if (this.state.BankNameState.length > 0) {
            this.setState({ isValidBankName: false });
            if (this.state.BankNameState.length > 0 && this.state.BankNameState.length > 2) {
                this.setState({ isValidFormatBankName: false });
                ValidBankNameForm = true;
            }
            else {
                this.setState({ isValidFormatBankName: true });
                this.setState({ isValidBankName: false });
            }
        }
        else {
            this.setState({ isValidBankName: true });
            this.setState({ isValidFormatBankName: false });
            ValidBankNameForm = false;
        }

        if (this.state.TypeOfBankOfficeState != "") {
            this.setState({ isValidTypeOfBankOffice: false });
            validTypeOfBankOfficeForm = true;
        }
        else {
            this.setState({ isValidTypeOfBankOffice: true });
            validTypeOfBankOfficeForm = false;
        }

        if (this.state.TypeOfBankOfficeState == "Branch Office") {
            if (this.state.BranchOfficeNameState.length > 0) {
                this.setState({ isValidBranchOfficeName: false });
                if (this.state.BranchOfficeNameState.length > 0 && this.state.BranchOfficeNameState.length > 2) {
                    this.setState({ isValidFormatBranchOfficeName: false });
                    validBranchOfficeNameForm = true;
                }
                else {
                    this.setState({ isValidFormatBranchOfficeName: true });
                    this.setState({ isValidBranchOfficeName: false });
                }
            }
            else {
                this.setState({ isValidBranchOfficeName: true });
                this.setState({ isValidFormatBranchOfficeName: false });
                validBranchOfficeNameForm = false;
            }
        }
        else {
            this.setState({ isValidBranchOfficeName: false });
        }

        if (this.state.BankAccountNumState.length > 0) {
            this.setState({ isValidBankAccountNum: false });
            if (this.state.BankAccountNumState.length > 0 && this.state.BankAccountNumState.length > 4) {
                this.setState({ isValidFormatBankAccountNum: false });
                validBankAccountNumForm = true;
            }
            else {
                this.setState({ isValidFormatFirstName: true });
                this.setState({ isValidFormatBankAccountNum: false });
            }
        }
        else {
            this.setState({ isValidBankAccountNum: true });
            this.setState({ isValidFormatBankAccountNum: false });
            validBankAccountNumForm = false;
        }

        if (this.state.BankAddressState.length > 0) {
            this.setState({ isValidBankAddress: false });
            validBankAddressForm = true;
        }
        else {
            this.setState({ isValidBankAddress: true });
            validBankAddressForm = false;
        }

        if (this.state.PhoneNumState.length > 0) {
            this.setState({ isValidPhoneNum: false });
            if (this.state.PhoneNumState.length > 0 && this.state.PhoneNumState.length > 9) {
                this.setState({ isValidFormatPhoneNum: false });
                validPhoneNumForm = true;
            }
            else {
                this.setState({ isValidFormatPhoneNum: true });
            }
        }
        else {
            this.setState({ isValidPhoneNum: true });
            this.setState({ isValidFormatPhoneNum: false });
            validPhoneNumForm = false;
        }

        //Japanese Claimant Information Validation Code
        if (this.state.JapanPubPensionState.length > 0) {
            this.setState({ isValidJapanPubPension: false });
            validJapanPubPensionForm = true;
        }
        else {
            this.setState({ isValidJapanPubPension: true });
            validJapanPubPensionForm = false;
        }

        if (this.state.NameOfSystemState.length > 0) {
            this.setState({ isValidNameOfSystem: false });
            if (this.state.NameOfSystemState.length > 0 && this.state.NameOfSystemState.length > 2) {
                this.setState({ isValidFormatNameOfSystem: false });
                validNameOfSystemForm = true;
            }
            else {
                this.setState({ isValidFormatNameOfSystem: true });
                this.setState({ isValidNameOfSystem: false });
            }
        }
        else {
            this.setState({ isValidNameOfSystem: true });
            this.setState({ isValidFormatNameOfSystem: false });
            validNameOfSystemForm = false;
        }

        if (this.state.TypeOfPensionState != "") {
            this.setState({ isValidTypeOfPension: false });
            validTypeOfPensionForm = true;
        }
        else {
            this.setState({ isValidTypeOfPension: true });
            validTypeOfPensionForm = false;
        }

        if (this.state.DateOfEntitlementState != "") {
            this.setState({ isValidDateOfEntitlement: false });
            validDateOfEntitlementForm = true;
        }
        else {
            this.setState({ isValidDateOfEntitlement: true });
            validDateOfEntitlementForm = false;
        }

        if (this.state.PensionCodeNumState.length > 0) {
            this.setState({ isValidPensionCodeNum: false });
            if (this.state.PensionCodeNumState.length > 0 && this.state.PensionCodeNumState.length > 2) {
                this.setState({ isValidFormatPensionCodeNum: false });
                validPensionCodeNumForm = true;
            }
            else {
                this.setState({ isValidFormatPensionCodeNum: true });
                this.setState({ isValidPensionCodeNum: false });
            }
        }
        else {
            this.setState({ isValidPensionCodeNum: true });
            this.setState({ isValidFormatPensionCodeNum: false });
            validPensionCodeNumForm = false;
        }

        if (this.state.JapanPubPensionState == "No") {
            //Japanese Claimant's Spouse Information Validation Code
            if (this.state.CJapanPubPensionState.length > 0) {
                this.setState({ isValidCJapanPubPension: false });
                validCJapanPubPensionForm = true;
            }
            else {
                this.setState({ isValidCJapanPubPension: true });
                validCJapanPubPensionForm = false;
            }

            if (this.state.CNameOfSystemState.length > 0) {
                this.setState({ isValidCNameOfSystem: false });
                if (this.state.CNameOfSystemState.length > 0 && this.state.CNameOfSystemState.length > 2) {
                    this.setState({ isValidFormatCNameOfSystem: false });
                    validCNameOfSystemForm = true;
                }
                else {
                    this.setState({ isValidFormatCNameOfSystem: true });
                    this.setState({ isValidCNameOfSystem: false });
                }
            }
            else {
                this.setState({ isValidCNameOfSystem: true });
                this.setState({ isValidFormatCNameOfSystem: false });
                validCNameOfSystemForm = false;
            }

            if (this.state.CTypeOfPensionState != "") {
                this.setState({ isValidCTypeOfPension: false });
                validCTypeOfPensionForm = true;
            }
            else {
                this.setState({ isValidCTypeOfPension: true });
                validCTypeOfPensionForm = false;
            }

            if (this.state.CDateOfEntitlementState != "") {
                this.setState({ isValidCDateOfEntitlement: false });
                validCDateOfEntitlementForm = true;
            }
            else {
                this.setState({ isValidCDateOfEntitlement: true });
                validCDateOfEntitlementForm = false;
            }

            if (this.state.CPensionCodeNumState.length > 0) {
                this.setState({ isValidCPensionCodeNum: false });
                if (this.state.CPensionCodeNumState.length > 0 && this.state.CPensionCodeNumState.length > 2) {
                    this.setState({ isValidFormatCPensionCodeNum: false });
                    validCPensionCodeNumForm = true;
                }
                else {
                    this.setState({ isValidFormatCPensionCodeNum: true });
                    this.setState({ isValidCPensionCodeNum: false });
                }
            }
            else {
                this.setState({ isValidCPensionCodeNum: true });
                this.setState({ isValidFormatCPensionCodeNum: false });
                validCPensionCodeNumForm = false;
            }
        } else {
            validCJapanPubPensionForm = true;
            validCNameOfSystemForm = true;
            validCTypeOfPensionForm = true;
            validCDateOfEntitlementForm = true;
            validCPensionCodeNumForm = true;
        }

        //Japanese History Of Coverage Information Validation Code      

        if (this.state.LastCompanyNameState.length > 0) {
            this.setState({ isValidLastCompanyName: false });
            if (this.state.LastCompanyNameState.length > 0 && this.state.LastCompanyNameState.length > 2) {
                this.setState({ isValidFormatLastCompanyName: false });
                validLastCompanyNameForm = true;
            }
            else {
                this.setState({ isValidFormatLastCompanyName: true });
                this.setState({ isValidLastCompanyName: false });
            }
        }
        else {
            this.setState({ isValidLastCompanyName: true });
            this.setState({ isValidFormatLastCompanyName: false });
            validLastCompanyNameForm = false;
        }

        if (this.state.LastCompanyHealthInsNumState.length > 0) {
            if (this.state.LastCompanyHealthInsNumState.length > 0 && this.state.LastCompanyHealthInsNumState.length > 2) {
                this.setState({ isValidFormatLastCompanyHealthInsNum: false });
                validLastCompanyHealthInsNumForm = true;
            }
            else {
                this.setState({ isValidFormatLastCompanyHealthInsNum: true });
            }
        }
        else {
            this.setState({ isValidFormatLastCompanyHealthInsNum: false });
            validLastCompanyHealthInsNumForm = false;
        }

        if (this.state.UnderSeamenInsState == "Yes") {
            if (this.state.InsPerRefCodeNumState.length > 0) {
                this.setState({ isValidInsPerRefCodeNum: false });
                if (this.state.InsPerRefCodeNumState.length > 0 && this.state.InsPerRefCodeNumState.length > 2) {
                    this.setState({ isValidFormatInsPerRefCodeNum: false });
                    validInsPerRefCodeNumForm = true;
                }
                else {
                    this.setState({ isValidFormatInsPerRefCodeNum: true });
                    this.setState({ isValidInsPerRefCodeNum: false });
                }
            }
            else {
                this.setState({ isValidInsPerRefCodeNum: true });
                this.setState({ isValidFormatInsPerRefCodeNum: false });
                validInsPerRefCodeNumForm = false;
            }

            if (this.state.PeriodOfInsPaidState != "") {
                this.setState({ isValidPeriodOfInsPaid: false });
                validPeriodOfInsPaidForm = true;
            }
            else {
                this.setState({ isValidPeriodOfInsPaid: true });
                validPeriodOfInsPaidForm = false;
            }

            if (this.state.WFromDateState != "") {
                this.setState({ isValidWFromDate: false });
                validWFromDateForm = true;
            }
            else {
                this.setState({ isValidWFromDate: true });
                validWFromDateForm = false;
            }

            if (this.state.WToDateState != "") {
                this.setState({ isValidWToDate: false });
                validWToDateForm = true;
            }
            else {
                this.setState({ isValidWToDate: true });
                validWToDateForm = false;
            }

            if (this.state.JapanInsBranchNameState.length > 0) {
                this.setState({ isValidJapanInsBranchName: false });
                if (this.state.JapanInsBranchNameState.length > 0 && this.state.JapanInsBranchNameState.length > 2) {
                    this.setState({ isValidFormatJapanInsBranchName: false });
                    validJapanInsBranchNameForm = true;
                }
                else {
                    this.setState({ isValidFormatJapanInsBranchName: true });
                    this.setState({ isValidJapanInsBranchName: false });
                }
            }
            else {
                this.setState({ isValidJapanInsBranchName: true });
                this.setState({ isValidFormatJapanInsBranchName: false });
                validJapanInsBranchNameForm = false;
            }
        }
        else {
            this.setState({ isValidInsPerRefCodeNum: false });
            this.setState({ isValidFormatInsPerRefCodeNum: false });
            this.setState({ isValidPeriodOfInsPaid: false });
            this.setState({ isValidWFromDate: false });
            this.setState({ isValidWToDate: false });
            this.setState({ isValidJapanInsBranchName: false });
            this.setState({ isValidFormatJapanInsBranchName: false });
            validInsPerRefCodeNumForm = true;
            validPeriodOfInsPaidForm = true;
            validWFromDateForm = true;
            validWToDateForm = true;
            validJapanInsBranchNameForm = true;
        }

        //Disability Information Validation Code   

        if (this.state.TypeOfClaimState != "") {
            this.setState({ isValidTypeOfClaim: false });
            validTypeOfClaimForm = true;
        }
        else {
            this.setState({ isValidTypeOfClaim: true });
            validTypeOfClaimForm = false;
        }

        if (this.state.NameOfPensionState.length > 0) {
            this.setState({ isValidNameOfPension: false });
            if (this.state.NameOfPensionState.length > 0 && this.state.NameOfPensionState.length > 2) {
                this.setState({ isValidFormatNameOfPension: false });
                validNameOfPensionForm = true;
            }
            else {
                this.setState({ isValidFormatNameOfPension: true });
                this.setState({ isValidNameOfPension: false });
            }
        }
        else {
            this.setState({ isValidNameOfPension: true });
            this.setState({ isValidFormatNameOfPension: false });
            validNameOfPensionForm = false;
        }

        if (this.state.DPensionCodeNumState.length > 0) {
            this.setState({ isValidDPensionCodeNum: false });
            if (this.state.DPensionCodeNumState.length > 0 && this.state.DPensionCodeNumState.length > 2) {
                this.setState({ isValidDPensionCisValidFormatDPensionCodeNumodeNum: false });
                validDPensionCodeNumForm = true;
            }
            else {
                this.setState({ isValidFormatDPensionCodeNum: false });
                this.setState({ isValidDPensionCodeNum: false });
            }
        }
        else {
            this.setState({ isValidDPensionCodeNum: true });
            this.setState({ isValidFormatDPensionCodeNum: false });
            validDPensionCodeNumForm = false;
        }

        if (this.state.DisInjNameState.length > 0) {
            this.setState({ isValidDisInjName: false });
            if (this.state.DisInjNameState.length > 0 && this.state.DisInjNameState.length > 2) {
                this.setState({ isValidFormatDisInjName: false });
                validDisInjNameForm = true;
            }
            else {
                this.setState({ isValidFormatDisInjName: true });
                this.setState({ isValidDisInjName: false });
            }
        }
        else {
            this.setState({ isValidDisInjName: true });
            this.setState({ isValidFormatDisInjName: false });
            validDisInjNameForm = false;
        }

        if (this.state.DateOfOnsetState != "") {
            this.setState({ isValidDateOfOnset: false });
            validDateOfOnsetForm = true;
        }
        else {
            this.setState({ isValidDateOfOnset: true });
            validDateOfOnsetForm = false;
        }

        if (this.state.FirstMedExamDateState != "") {
            this.setState({ isValidFirstMedExamDate: false });
            validFirstMedExamDateForm = true;
        }
        else {
            this.setState({ isValidFirstMedExamDate: true });
            validFirstMedExamDateForm = false;
        }

        if (this.state.PubPensionCoveredFirstMedExamState != "") {
            this.setState({ isValidPubPensionCoveredFirstMedExam: false });
            validPubPensionCoveredFirstMedExamForm = true;
        }
        else {
            this.setState({ isValidPubPensionCoveredFirstMedExam: true });
            validPubPensionCoveredFirstMedExamForm = false;
        }

        if (this.state.DisInjStableDateState != "") {
            this.setState({ isValidDisInjStableDate: false });
            validDisInjStableDateForm = true;
        }
        else {
            this.setState({ isValidDisInjStableDate: true });
            validDisInjStableDateForm = false;
        }

        if (this.state.DisInjCausedByWorkState != "") {
            this.setState({ isValidDisInjCausedByWork: false });
            validDisInjCausedByWorkForm = true;
        }
        else {
            this.setState({ isValidDisInjCausedByWork: true });
            validDisInjCausedByWorkForm = false;
        }

        if (this.state.DisInjTypeOfClaimLawsState != "") {
            this.setState({ isValidDisInjTypeOfClaimLaws: false });
            validDisInjTypeOfClaimLawsForm = true;
        }
        else {
            this.setState({ isValidDisInjTypeOfClaimLaws: true });
            validDisInjTypeOfClaimLawsForm = false;
        }

        if (this.state.TypeOfBenEligibleDisState != "") {
            this.setState({ isValidTypeOfBenEligibleDis: false });
            validTypeOfBenEligibleDisForm = true;
        }
        else {
            this.setState({ isValidTypeOfBenEligibleDis: true });
            validTypeOfBenEligibleDisForm = false;
        }

        if (this.state.DisInjCausedByTPartyState != "") {
            this.setState({ isValidDisInjCausedByTParty: false });
            validDisInjCausedByTPartyForm = true;
        }
        else {
            this.setState({ isValidDisInjCausedByTParty: true });
            validDisInjCausedByTPartyForm = false;
        }

        if (this.state.DisDateOfEntitlementState != "") {
            this.setState({ isValidDisDateOfEntitlement: false });
            validDisDateOfEntitlementForm = true;
        }
        else {
            this.setState({ isValidDisDateOfEntitlement: true });
            validDisDateOfEntitlementForm = false;
        }

        if (this.signaturePad.isEmpty()) {
            this.setState({ isValidSignature: true });
            validSignatureForm = false;
        }
        else {
            this.setState({ isValidSignature: false });
            validSignatureForm = true;
        }

        if (this.state.TypeOfBankOfficeState == "Branch Office") {
            if (validHandBookNumForm && validSSNumberForm && validTypeOfBenefitsForm && validLNameForm && validFNameForm && validSexForm && validDOBForm && validAddressForm && validPhoneNumForm && validPLNameForm && validPFNameForm && validPSexForm && validPDOBForm && validPHandBookNumForm && validPAnnualIncomeAnsForm && validFinInstitutionForm && ValidBankNameForm && validTypeOfBankOfficeForm && validBranchOfficeNameForm && validBankAccountNumForm && validBankAddressForm) {
                validForm = true;
            }
            else {
                validForm = false;
            }
        }
        else {
            if (validHandBookNumForm && validSSNumberForm && validTypeOfBenefitsForm && validLNameForm && validFNameForm && validSexForm && validDOBForm && validAddressForm && validPhoneNumForm && validPLNameForm && validPFNameForm && validPSexForm && validPDOBForm && validPHandBookNumForm && validPAnnualIncomeAnsForm && validFinInstitutionForm && ValidBankNameForm && validTypeOfBankOfficeForm && validBankAccountNumForm && validBankAddressForm) {
                validForm = true;
            }
            else {
                validForm = false;
            }
        }

        return validForm;
    }
    handleBenQusJpnAuto(event) {
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
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ LastNameState: data[i].LastName });
                thisObj.setState({ FirstNameState: data[i].FirstName });
                thisObj.setState({ SexState: data[i].Gender });
                var varDOB = data[i].DOB_Year + "/" + data[i].DOB_Month + "/" + data[i].DOB_Day;
                var DtDOB = new Date(varDOB);
                thisObj.setState({ DOBState: DtDOB });
                thisObj.setState({ AddressState: data[i].MailingAddress });
                thisObj.setState({ PhoneNumState: data[i].PhoneNum });
                thisObj.setState({ PLastNameState: data[i].PLastName });
                thisObj.setState({ PFirstNameState: data[i].PFirstName });
                thisObj.setState({ PSexState: data[i].PGender });
                var varDOB = data[i].PDOB_Year + "/" + data[i].PDOB_Month + "/" + data[i].PDOB_Day;
                var DtPDOB = new Date(varDOB);
                thisObj.setState({ PDOBState: DtPDOB });
                thisObj.setState({ JapanPubPensionState: data[i].Partner });
                //  thisObj.setState({ NameOfSystemState: data[i]. });
                thisObj.setState({ TypeOfPensionState: data[i].Benefits });
                thisObj.setState({ DateOfEntitlementState: data[i].DateOfBenefits });
                //   thisObj.setState({ PensionCodeNumState: data[i]. });
                thisObj.setState({ CJapanPubPensionState: data[i].Partner });
                //  thisObj.setState({ CNameOfSystemState : data[i].});  
                thisObj.setState({ CTypeOfPensionState: data[i].Benefits });
                thisObj.setState({ CDateOfEntitlementState: data[i].DateOfBenefits });
                // thisObj.setState({ CPensionCodeNumState: data[i]. });
                thisObj.setState({ ConditionalState: data[i].Benefits });
            }
        }).catch((err) => {

        })
    }
    handleBenQusDatas(event) {
        var thisObj = this;
        let BenQusAPIUrl = "https://4k73oeispk.execute-api.us-west-2.amazonaws.com/dev/GPA_BenQusDatas_Lambda";
        let BenQusJapanJSONData = JSON.stringify({
            QueryName: "Save",
            UserID: emailresult,
            CountryCode: this.state.CountryCode,
            AppAnsInJsonObj: {
                //Claimant Information Data
                HandBookNum: this.state.HandBookNumState,
                SSNum: this.state.SSNumberState,
                TypeOfBenefits: this.state.TypeOfBenefitsState,
                LastName: this.state.LastNameState,
                FirstName: this.state.FirstNameState,
                Sex: this.state.SexState,
                DOB: this.state.DOBState,
                Address: this.state.AddressState,
                PhoneNum: this.state.PhoneNumState,
                //Claimant's Partner Information Data
                PLastName: this.state.PLastNameState,
                PFirstName: this.state.PFirstNameState,
                PSex: this.state.PSexState,
                PDOB: this.state.PDOBState,
                PHandBookNum: this.state.PHandBookNumState,
                PAnnualIncomeAns: this.state.PAnnualIncomeAnsState,
                Childrens: ClaimantChildrens,
                FinInstitution: this.state.FinInstitutionState,
                BankName: this.state.BankNameState,
                TypeOfBankOffice: this.state.TypeOfBankOfficeState,
                BranchOfficeName: this.state.BranchOfficeNameState,
                BankAccountNum: this.state.BankAccountNumState,
                BankAddress: this.state.BankAddressState,
                //History Of Coverage Information Data
                JapanPubPension: this.state.JapanPubPensionState,
                NameOfSystem: this.state.NameOfSystemState,
                TypeOfPension: this.state.TypeOfPensionState,
                DateOfEntitlement: this.state.DateOfEntitlementState,
                PensionCodeNum: this.state.PensionCodeNumState,
                CJapanPubPension: this.state.CJapanPubPensionState,
                CNameOfSystem: this.state.CNameOfSystemState,
                CTypeOfPension: this.state.CTypeOfPensionState,
                CDateOfEntitlement: this.state.CDateOfEntitlementState,
                CPensionCodeNum: this.state.CPensionCodeNumState,
                HistotyOfCoverage: HistoryOfCoverage,
                //Disability Information Data
                TypeOfClaim: this.state.TypeOfClaimState,
                ClaimBenOnsetDisPast: this.state.ClaimBenOnsetDisPastState,
                RecvJapanPubPenDis: this.state.RecvJapanPubPenDisState,
                NameOfPension: this.state.NameOfPensionState,
                DPensionCodeNum: this.state.DPensionCodeNumState,
                DisInjName: this.state.DisInjNameState,
                DateOfOnset: this.state.DateOfOnsetState,
                FirstMedExamDate: this.state.FirstMedExamDateState,
                PubPensionCoveredFirstMedExam: this.state.PubPensionCoveredFirstMedExamState,
                DisInjStableDate: this.state.DisInjStableDateState,
                DisInjCausedByWork: this.state.DisInjCausedByWorkState,
                DisInjTypeOfClaimLaws: this.state.DisInjTypeOfClaimLawsState,
                TypeOfBenEligibleDis: this.state.TypeOfBenEligibleDisState,
                DisDateOfEntitlement: this.state.DisDateOfEntitlementState,
                DisInjCausedByTParty: this.state.DisInjCausedByTPartyState
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
                data: BenQusJapanJSONData,
                //headers:AxiosHeaderConfig,

            }).then((data) => {
                notify.show("Your Part2 Information Saved Successfully", "error", 3000);
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

   

    //Flow Upadte Function
    handleAppProcessFlowUpdate(event) {
        let AppProFlowAPIUrl = "https://qxredca9lk.execute-api.us-west-2.amazonaws.com/Dev/GPA_AppProcessFlowDatas_Lambda";
        let JSONData = JSON.stringify({
            QueryName: "UpdateBQP2",
            UserID: this.props.LoginData.LUserID,
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

    //Page Rendering
    render() {
        const google = window.google;
        const { search, bsearch, wsearch, value, AddressState, BankAddressState, WorkplaceAddressState } = this.state
        return (
            <div>
                <Col xs={12} md={12} style={newstyle}>
                    <Panel eventKey="1" defaultExpanded={true}>
                        <Panel.Heading>
                            <Panel.Title>Japan Form</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Row className="show-grid" className="overall">
                                <Col xs={12} md={12} >
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Pension Handbook Number<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Hand Book Number"
                                                value={this.state.HandBookNumState}
                                                onChange={this.handleChangeHandBookNum.bind(this)}
                                                errorText={this.state.isValidHandBookNum ? "Please Enter Your Hand Book Number" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatHandBookNum ? "Please Enter the Valid Hand Book Number" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>U.S. Social Security Number <span className="manatoryfield">&nbsp;*</span></label>
                                            <TextField hintText="Enter Your U.S Social Security Number"
                                                value={this.state.SSNumberState}
                                                onChange={this.handleChangeSSNumber.bind(this)}
                                                errorText={this.state.isValidSSNumber ? "Please Enter Your U.S Social Security Number" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatSSNumber ? "Please Enter Valid U.S Social Security Number" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>Type of Benefits Claimed<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                value={this.state.TypeOfBenefitsState}
                                                hintText="Select the type of benefits claimed"
                                                onChange={this.handleChangeTypeOfBenefits}
                                                errorText={this.state.isValidTypeOfBenefits ? "Please Select Your Type of Benefits" : null}
                                                maxHeight={200}
                                            >
                                                {TypeOfBenefitsItems}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12}>
                                            <h4 className="ColorStyle"><b>Claimant's Information</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Last Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Last Name"
                                                value={this.state.LastNameState}
                                                onChange={this.handleChangeLastName.bind(this)}
                                                errorText={this.state.isValidLastName ? "Please Enter Your Last Name" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatLastName ? "Please Enter the Valid Last Name" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>First Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your First Name"
                                                value={this.state.FirstNameState}
                                                onChange={this.handleChangeFirstName.bind(this)}
                                                errorText={this.state.isValidFirstName ? "Please Enter Your First Name" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatFirstName ? "Please Enter the Valid First Name" : ""}</span>
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
                                            <span className="validationmsg">{this.state.isValidSex ? "Please Select Your Sex" : null}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Date Of Birth<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter Your Date Of Birth"
                                                value={this.state.DOBState}
                                                onChange={this.handleChangeDOB}
                                                errorText={this.state.isValidDOB ? "Please Select Your Date Of Birth" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Address<span className="manatoryfield">*</span></label>

                                            <Geosuggest
                                                placeholder="Enter Your Address"
                                                initialValue={this.state.AddressState}
                                                onSuggestSelect={this.handleSelectSuggest.bind(this)}
                                                onChange={this.handleChangeAddress.bind(this)}
                                                value={this.state.AddressState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidAddress ? "Please Choose Your Address" : null}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>Telephone Number<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Telephone Number"
                                                value={this.state.PhoneNumState}
                                                onChange={this.handleChangePhoneNum.bind(this)}
                                                errorText={this.state.isValidPhoneNum ? "Please Enter Your Telephone Number" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatPhoneNum ? "Please Enter the Valid Telephone Number" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12}>
                                            <h4 className="ColorStyle"><b>Claimant's Spouse/Partner Information</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Last Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Spouse Last Name"
                                                value={this.state.PLastNameState}
                                                onChange={this.handleChangePLastName.bind(this)}
                                                errorText={this.state.isValidPLastName ? "Please Enter Your Spouse Last Name" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatPLastName ? "Please Enter the Valid Spouse Last Name" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>First Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Spouse First Name"
                                                value={this.state.PFirstNameState}
                                                onChange={this.handleChangePFirstName.bind(this)}
                                                errorText={this.state.isValidPFirstName ? "Please Enter Your Spouse First Name" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatPFirstName ? "Please Enter the Valid Spouse First Name" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label>Sex<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.PSexState} onChange={this.handleChangePSex.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidPSex ? "Please Select Your Spouse Sex" : null}</span>
                                        </Col>

                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Date Of Birth<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter Your Spouse Date Of Birth"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.PDOBState}
                                                onChange={this.handleChangePDOB}
                                                errorText={this.state.isValidPDOB ? "Please Select Your Spouse Date Of Birth" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Pension Handbook Number<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Spouse Hand Book Number"
                                                value={this.state.PHandBookNumState}
                                                onChange={this.handleChangePHandBookNum.bind(this)}
                                                errorText={this.state.isValidPHandBookNum ? "Please Enter Your Spouse Hand Book Number" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatPHandBookNum ? "Please Enter the Valid Spouse Hand Book Number" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="Radio_button">
                                            <label>Your Annual Income Under 8.5 Million Yen? <span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.PAnnualIncomeAnsState} onChange={this.handleChangePAnnualIncomeAns.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidPAnnualIncomeAns ? "Please Select Your Annual Income Under 8.5 Million Yen or Not" : null}</span>
                                        </Col>
                                    </Col>
                                    <fieldset>
                                        <legend className="legendtitle">Claimant's Children Information</legend>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Last Name<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Your Child Last Name"
                                                    value={this.state.CLastNameState}
                                                    onChange={this.handleChangeCLastName.bind(this)}
                                                    errorText={this.state.isValidCLastName ? "Please Enter Your Child Last Name" : ""}
                                                />
                                                <span className="validationmsg">{this.state.isValidFormatCLastName ? "Please Enter the Valid Child Last Name" : ""}</span>
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>First Name<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Your Child First Name"
                                                    value={this.state.CFirstNameState}
                                                    onChange={this.handleChangeCFirstName.bind(this)}
                                                    errorText={this.state.isValidCFirstName ? "Please Enter Your Child First Name" : ""}
                                                />
                                                <span className="validationmsg">{this.state.isValidFormatCFirstName ? "Please Enter the Valid Child First Name" : ""}</span>
                                            </Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="Radio_button">
                                                <label>Sex<span className="manatoryfield">*</span></label>
                                                <RadioButtonGroup valueSelected={this.state.CSexState} onChange={this.handleChangeCSex.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                <span className="validationmsg">{this.state.isValidCSex ? "Please Select Your Child Sex" : null}</span>
                                            </Col>

                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Date Of Birth<span className="manatoryfield">*</span></label>
                                                <DatePicker hintText="Enter Your Child Date Of Birth"
                                                    locale="en-US"
                                                    firstDayOfWeek={0}
                                                    value={this.state.CDOBState}
                                                    onChange={this.handleChangeCDOB}
                                                    errorText={this.state.isValidCDOB ? "Please Select Your Child Date Of Birth" : null}
                                                />
                                            </Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="Radio_button">
                                                <label>Your Child with Disability? <span className="manatoryfield">*</span></label>
                                                <RadioButtonGroup valueSelected={this.state.ChildDisablityState} onChange={this.handleChangeChildDisablity.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                <span className="validationmsg">{this.state.isValidChildDisablity ? "Please Select Your Child with Disability" : null}</span>
                                            </Col>
                                            <Col xs={12} md={6} className="Radio_button">
                                                <label>Your Annual Income Under 8.5 Million Yen? <span className="manatoryfield">*</span></label>
                                                <RadioButtonGroup valueSelected={this.state.CAnnualIncomeAnsState} onChange={this.handleChangeCAnnualIncomeAns.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                <span className="validationmsg">{this.state.isValidCAnnualIncomeAns ? "Please Select Your Annual Income Under 8.5 Million Yen or Not" : null}</span>
                                            </Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={12} className="input-fields">
                                                <Button onClick={this.handleBenQusChildDatas.bind(this)} className="RQ-Add" >Add Another Children</Button>
                                                <Notifications />
                                            </Col>
                                        </Col>
                                    </fieldset>
                                    <br />
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12}>
                                            <h4 className="ColorStyle"><b>Claimant's Bank Information</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Nomination of a financial institution to which benefits will be sent <span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Nomination of a Financial Institution "
                                                value={this.state.FinInstitutionState}
                                                onChange={this.handleChangeFinInstitution.bind(this)}
                                                errorText={this.state.isValidFinInstitution ? "Please Enter Your Nomination of a Financial Institution" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatFinInstitution ? "Please Enter the Valid Nomination of a Financial Institution" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Bank Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Bank Name"
                                                value={this.state.BankNameState}
                                                onChange={this.handleChangeBankName.bind(this)}
                                                errorText={this.state.isValidBankName ? "Please Enter Your Bank Name" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatBankName ? "Please Enter the Valid Bank Name" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>Type Of Bank Office <span className="manatoryfield">*</span></label>
                                            <SelectField
                                                value={this.state.TypeOfBankOfficeState}
                                                hintText="Select the type of bank office"
                                                onChange={this.handleChangeTypeOfBankOffice}
                                                errorText={this.state.isValidTypeOfBankOffice ? "Please Select Your Type Of Bank Office" : null}
                                                maxHeight={200}
                                            >
                                                {TypeOfBankOfficeItems}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" hidden={this.state.TypeOfBankOfficeState != "Branch Office"}>
                                            <label>Branch Office Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Branch Office Name"
                                                value={this.state.BranchOfficeNameState}
                                                onChange={this.handleChangeBranchOfficeName.bind(this)}
                                                errorText={this.state.isValidBranchOfficeName ? "Please Enter Your Branch Office Name" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatBranchOfficeName ? "Please Enter the Valid Branch Office Name" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Bank Account Number<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Bank Account Number"
                                                value={this.state.BankAccountNumState}
                                                onChange={this.handleChangeBankAccountNum.bind(this)}
                                                errorText={this.state.isValidBankAccountNum ? "Please Enter Your Bank Account Number" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatBankAccountNum ? "Please Enter the Valid Bank Account Number" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Bank Address<span className="manatoryfield">*</span></label>

                                            <Geosuggest
                                                placeholder="Bank Address"
                                                initialValue={this.state.BankAddressState}
                                                onSuggestSelect={this.handleSelectBankSuggest.bind(this)}
                                                onChange={this.handleChangeBankAddress.bind(this)}
                                                value={this.state.BankAddressState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidBankAddress ? "Please Choose Your Bank Address" : null}</span>
                                        </Col>
                                    </Col>
                                    {/* <fieldset>
                                        <legend className="legendtitle">Japanese Claimant Public Pension Information</legend> */}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12}>
                                            <h4 className="ColorStyle"><b>Japanese Claimant Public Pension Information</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>Is the claimant receiving a Japanese public pension or presently claiming one? <span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.JapanPubPensionState} onChange={this.handleChangeJapanPubPension.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            <span className="validationmsg">{this.state.isValidJapanPubPension ? "Please Select Your Japanese Public Pension" : null}</span>
                                        </Col>
                                    </Col>
                                    <div hidden={this.state.JapanPubPensionState != "Yes"}>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Name of System<span className="manatoryfield">&nbsp;*</span></label>
                                                <TextField hintText="Enter Your Name of System"
                                                    value={this.state.NameOfSystemState}
                                                    onChange={this.handleChangeNameOfSystem.bind(this)}
                                                    errorText={this.state.isValidNameOfSystem ? "Please Enter Your Name of System" : ""}
                                                />
                                                <span className="validationmsg">{this.state.isValidFormatNameOfSystem ? "Please Enter Valid Name of System" : ""}</span>
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                <label>Type of Pension<span className="manatoryfield">*</span></label>
                                                <SelectField
                                                    value={this.state.TypeOfPensionState}
                                                    hintText="Select the type of pension"
                                                    onChange={this.handleChangeTypeOfPension}
                                                    errorText={this.state.isValidTypeOfPension ? "Please Select Your Type of Pension" : null}
                                                    maxHeight={200}
                                                >
                                                    {TypeOfPensionItems}
                                                </SelectField>
                                            </Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Date Of Entitlement<span className="manatoryfield">*</span></label>
                                                <DatePicker hintText="Enter Your Date Of Entitlement"
                                                    locale="en-US"
                                                    firstDayOfWeek={0}
                                                    value={this.state.DateOfEntitlementState}
                                                    onChange={this.handleChangeDateOfEntitlement}
                                                    errorText={this.state.isValidDateOfEntitlement ? "Please Select Your Date Of Entitlement" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                <label>Pension Code or Certificate Number<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Your Pension Code or Pension Certificate Number"
                                                    value={this.state.PensionCodeNumState}
                                                    onChange={this.handleChangePensionCodeNum.bind(this)}
                                                    errorText={this.state.isValidPensionCodeNum ? "Please Enter Your Pension Code or Pension Certificate Number" : ""}
                                                />
                                                <span className="validationmsg">{this.state.isValidFormatPensionCodeNum ? "Please Enter the Valid Pension Code or Pension Certificate Number" : ""}</span>
                                            </Col>
                                        </Col>
                                    </div>
                                    <div hidden={this.state.JapanPubPensionState != "No"}>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={12} className="Radio_button">
                                                <label>Is the claimant spouse receiving a Japanese public pension or presently claiming one? <span className="manatoryfield">*</span></label>
                                                <RadioButtonGroup valueSelected={this.state.CJapanPubPensionState} onChange={this.handleChangeCJapanPubPension.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                <span className="validationmsg">{this.state.isValidCJapanPubPension ? "Please Select Your Spouse Japanese Public Pension" : null}</span>
                                            </Col>
                                        </Col>
                                    </div>
                                    <div hidden={this.state.CJapanPubPensionState != "Yes"}>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Name of System<span className="manatoryfield">&nbsp;*</span></label>
                                                <TextField hintText="Enter Your Spouse Name of System"
                                                    value={this.state.CNameOfSystemState}
                                                    onChange={this.handleChangeCNameOfSystem.bind(this)}
                                                    errorText={this.state.isValidCNameOfSystem ? "Please Enter Your Spouse Name of System" : ""}
                                                />
                                                <span className="validationmsg">{this.state.isValidFormatNameOfSystem ? "Please Enter Valid Spouse Name of System" : ""}</span>
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                <label>Type of Pension<span className="manatoryfield">*</span></label>
                                                <SelectField
                                                    value={this.state.CTypeOfPensionState}
                                                    hintText="Select the type of pension"
                                                    onChange={this.handleChangeCTypeOfPension}
                                                    errorText={this.state.isValidCTypeOfPension ? "Please Select Your Spouse Type of Pension" : null}
                                                    maxHeight={200}
                                                >
                                                    {TypeOfPensionItems}
                                                </SelectField>
                                            </Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Date Of Entitlement<span className="manatoryfield">*</span></label>
                                                <DatePicker hintText="Enter Your Spouse Date Of Entitlement"
                                                    locale="en-US"
                                                    firstDayOfWeek={0}
                                                    value={this.state.CDateOfEntitlementState}
                                                    onChange={this.handleChangeCDateOfEntitlement}
                                                    errorText={this.state.isValidCDateOfEntitlement ? "Please Select Your Spouse Date Of Entitlement" : null}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                <label>Pension Code or Certificate Number<span className="manatoryfield">*</span></label>
                                                <TextField hintText="Enter Your Spouse Pension Code or Pension Certificate Number"
                                                    value={this.state.CPensionCodeNumState}
                                                    onChange={this.handleChangeCPensionCodeNum.bind(this)}
                                                    errorText={this.state.isValidCPensionCodeNum ? "Please Enter Your Pension Code or Pension Certificate Number" : ""}
                                                />
                                                <span className="validationmsg">{this.state.isValidFormatCPensionCodeNum ? "Please Enter the Valid Pension Code or Pension Certificate Number" : ""}</span>
                                            </Col>
                                        </Col>
                                    </div>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} >
                                            <h4 className="ColorStyle"><b>History of Coverage Japanese Pension Systems</b></h4>
                                        </Col>
                                    </Col>

                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>Period of Coverage<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                value={this.state.PeriodOfCoverageState}
                                                hintText="Select the period of coverage"
                                                onChange={this.handleChangePeriodOfCoverage}
                                                maxHeight={200}
                                                errorText={this.state.isValidPeriodOfCoverage ? "Please Select Your Period of Coverage" : null}
                                            >
                                                {YearItems}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>From Date<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter Your From Date"
                                                value={this.state.FromDateState}
                                                onChange={this.handleChangeFromDate}
                                                errorText={this.state.isValidFromDate ? "Please Select Your From Date" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="input-fileds align-fileds">
                                            <label>To Date<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter Your To Date"
                                                value={this.state.ToDateState}
                                                onChange={this.handleChangeToDate}
                                                errorText={this.state.isValidToDate ? "Please Select Your To Date" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Workplace Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Workplace Name"
                                                value={this.state.WorkplaceNameState}
                                                onChange={this.handleChangeWorkplaceName.bind(this)}
                                                errorText={this.state.isValidWorkplaceName ? "Please Enter Your Workplace Name" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatWorkplaceName ? "Please Enter the Valid Workplace Name" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Workplace Address<span className="manatoryfield">*</span></label>
                                            
                                            <Geosuggest
                                                placeholder="Workplace Address"
                                                initialValue={this.state.WorkplaceAddressState}
                                                onSuggestSelect={this.handleSelectWorkSuggest.bind(this)}
                                                onChange={this.handleChangeWorkplaceAddress.bind(this)}
                                                value={this.state.WorkplaceAddressState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidWorkplaceAddress ? "Please Choose Your Workplace Address" : null}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                            <label>Type Of Pension Covered <span className="manatoryfield">*</span></label>
                                            <SelectField
                                                value={this.state.TypeOfPensionCoveredState}
                                                hintText="Select the type of pension covered"
                                                onChange={this.handleChangeTypeOfPensionCovered}
                                                errorText={this.state.isValidTypeOfPensionCovered ? "Please Select Your Type Of Pension Covered" : null}
                                                maxHeight={200}
                                            >
                                                {TypeOfPensionCoveredItems}
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds" hidden={this.state.TypeOfPensionCoveredState != "Mutual Aid Pension"}>
                                            <label>Former Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Former Name"
                                                value={this.state.FormerNameState}
                                                onChange={this.handleChangeFormerName.bind(this)}
                                                errorText={this.state.isValidFormerName ? "Please Enter Your Former Name" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatFormerName ? "Please Enter the Valid Former Name" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={12} className="input-fields">
                                            <Button onClick={this.handleBenQusHistoryOfCoverageDatas.bind(this)} className="RQ-Add" >Add Another Coverage</Button>
                                            <Notifications />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} >
                                            <h4 className="ColorStyle"><b>Workplace Details</b></h4>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Last Company Name<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Last Company Name"
                                                value={this.state.LastCompanyNameState}
                                                onChange={this.handleChangeLastCompanyName.bind(this)}
                                                errorText={this.state.isValidLastCompanyName ? "Please Enter Your Last Company Name" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatLastCompanyName ? "Please Enter the Valid Last Company Name" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Last Company Health Insurance Number</label>
                                            <TextField hintText="Enter Your Last Company Health Insurance Number"
                                                value={this.state.LastCompanyHealthInsNumState}
                                                onChange={this.handleChangeLastCompanyHealthInsNum.bind(this)}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatLastCompanyHealthInsNum ? "Please Enter the Valid Last Company Name" : ""}</span>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Radio_button">
                                            <label>Have you ever been a Type-4 Insured Person under the Employees' Pension Insurance or a Voluntary and Continuous Insured Person under the Seamen's Insurance?<span className="manatoryfield">*</span></label>
                                            <RadioButtonGroup valueSelected={this.state.UnderSeamenInsState} onChange={this.handleChangeUnderSeamenIns.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                            {/* <span className="validationmsg">{this.state.isValidCJapanPubPension ? "Please Select Your Spouse Japanese Public Pension" : null}</span> */}
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} hidden={this.state.UnderSeamenInsState != "Yes"}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Insured Person's Reference Code Number<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Insured Person's Reference Code Number"
                                                value={this.state.InsPerRefCodeNumState}
                                                onChange={this.handleChangeInsPerRefCodeNum.bind(this)}
                                                errorText={this.state.isValidInsPerRefCodeNum ? "Please Enter Your Insured Person's Reference Code Number" : null}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatInsPerRefCodeNum ? "Please Enter the Valid Insured Person's Reference Code Number" : ""}</span>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Period During which the Insurance Contributions were Paid<span className="manatoryfield">*</span></label>
                                            <SelectField
                                                value={this.state.PeriodOfInsPaidState}
                                                hintText="Select the insurance contributions"
                                                onChange={this.handleChangePeriodOfInsPaid}
                                                maxHeight={200}
                                                errorText={this.state.isValidPeriodOfInsPaid ? "Please Select Your Period of Coverage" : null}
                                            >
                                                {YearItems}
                                            </SelectField>
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} hidden={this.state.UnderSeamenInsState != "Yes"}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>From Date<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter Your From Date"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.WFromDateState}
                                                onChange={this.handleChangeWFromDate}
                                                errorText={this.state.isValidWFromDate ? "Please Select Your From Date" : null}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>To Date<span className="manatoryfield">*</span></label>
                                            <DatePicker hintText="Enter Your To Date"
                                                locale="en-US"
                                                firstDayOfWeek={0}
                                                value={this.state.WToDateState}
                                                onChange={this.handleChangeWToDate}
                                                errorText={this.state.isValidWToDate ? "Please Select Your To Date" : null}
                                            />
                                        </Col>
                                    </Col>
                                    <Col xs={12} md={12} hidden={this.state.UnderSeamenInsState != "Yes"}>
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label>Name of the Branch Office of Japan Pension Service (Social Insurance Office) to which the insurance contributions were paid<span className="manatoryfield">*</span></label>
                                            <TextField hintText="Enter Your Japan Insurance Branch Name"
                                                value={this.state.JapanInsBranchNameState}
                                                onChange={this.handleChangeJapanInsBranchName.bind(this)}
                                                errorText={this.state.isValidJapanInsBranchName ? "Please Enter Your Japan Insurance Branch Name" : ""}
                                            />
                                            <span className="validationmsg">{this.state.isValidFormatJapanInsBranchName ? "Please Enter the Valid Japan Insurance Branch Name" : ""}</span>
                                        </Col>
                                    </Col>
                                    {this.state.ConditionalState == "Retirement / Old-age" || this.state.ConditionalState == "Survivors" ?
                                        <div>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} >
                                                    <h4 className="ColorStyle"><b>Claim for disability Benefits Information</b></h4>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Type Of Claim <span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        value={this.state.TypeOfClaimState}
                                                        hintText="Select the type of claim"
                                                        onChange={this.handleChangeTypeOfClaim}
                                                        errorText={this.state.isValidTypeOfClaim ? "Please Select Your Type Of Claim" : null}
                                                        maxHeight={200}
                                                    >
                                                        {TypeOfClaimItems}
                                                    </SelectField>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12} hidden={this.state.TypeOfClaimState != "Claim for benefits due to advanced degree of disability"}>
                                                <Col xs={12} md={8} className="Radio_button">
                                                    <label>Have you claimed for (claim due to onset of disability while contributing) in the past ? <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.ClaimBenOnsetDisPastState} onChange={this.handleChangeClaimBenOnsetDisPast.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    {/* <span className="validationmsg">{this.state.isValidRefugee ? "Please select do you have or have had refugee status under SS 7 or 8" : null}</span> */}
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <div hidden={this.state.TypeOfClaimState != "Claim for benefits due to onset of disability while contributing"}>
                                                    <Col xs={12} md={6} className="Radio_button">
                                                        <label>Have you ever received Japanese public pension for disability? <span className="manatoryfield">*</span></label>
                                                        <RadioButtonGroup valueSelected={this.state.RecvJapanPubPenDisState} onChange={this.handleChangeRecvJapanPubPenDis.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                        {/* <span className="validationmsg">{this.state.isValidRefugee ? "Please select do you have or have had refugee status under SS 7 or 8" : null}</span> */}
                                                    </Col>
                                                </div>
                                                {this.state.RecvJapanPubPenDisState == "Yes" ?
                                                    <Col xs={12} md={6} className="input-fileds align-fileds" hidden={this.state.ClaimBenOnsetDisPastState != "Yes"}>
                                                        <label>Name Of Pension<span className="manatoryfield">*</span></label>
                                                        <TextField hintText="Enter Your Pension Name"
                                                            value={this.state.NameOfPensionState}
                                                            onChange={this.handleChangeNameOfPension.bind(this)}
                                                            errorText={this.state.isValidNameOfPension ? "Please Enter Your Pension Name" : ""}
                                                        />
                                                        <span className="validationmsg">{this.state.isValidFormatNameOfPension ? "Please Enter the Valid Pension Name" : ""}</span>
                                                    </Col>
                                                    : ""}
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                    <label>Pension Code or Certificate Number<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Spouse Pension Code or Pension Certificate Number"
                                                        value={this.state.DPensionCodeNumState}
                                                        onChange={this.handleChangeDPensionCodeNum.bind(this)}
                                                        errorText={this.state.isValidDPensionCodeNum ? "Please Enter Your Pension Code or Pension Certificate Number" : ""}
                                                    />
                                                    <span className="validationmsg">{this.state.isValidFormatDPensionCodeNum ? "Please Enter the Valid Pension Code or Pension Certificate Number" : ""}</span>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                                    <label>Name of Disease / Injury<span className="manatoryfield">*</span></label>
                                                    <TextField hintText="Enter Your Disease/Injury Name"
                                                        value={this.state.DisInjNameState}
                                                        onChange={this.handleChangeDisInjName.bind(this)}
                                                        errorText={this.state.isValidDisInjName ? "Please Enter Your Disease/Injury Name" : ""}
                                                    />
                                                    <span className="validationmsg">{this.state.isValidFormatDisInjName ? "Please Enter the Valid Disease/Injury Name" : ""}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={4} className="input-fileds align-fileds">
                                                    <label>Date Of OnSet<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Your Onset Date"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.DateOfOnsetState}
                                                        onChange={this.handleChangeDateOfOnset}
                                                        errorText={this.state.isValidDateOfOnset ? "Please Select Your Onset Date" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={8} className="input-fileds align-fileds">
                                                    <label>Date of first medical examination (best estimate - provide year if date not known)<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Your First Medical Examination Date"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.FirstMedExamDateState}
                                                        onChange={this.handleChangeFirstMedExamDate}
                                                        errorText={this.state.isValidFirstMedExamDate ? "Please Select First Medical Examination Date" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds align-fileds" >
                                                    <label>Public pension system which you were covered on the date of first medical examination<span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        value={this.state.PubPensionCoveredFirstMedExamState}
                                                        hintText="Select the type of pension covered"
                                                        onChange={this.handleChangePubPensionCoveredFirstMedExam}
                                                        errorText={this.state.isValidPubPensionCoveredFirstMedExam ? "Please Select Your Type Of Pension Covered" : null}
                                                        maxHeight={200}
                                                    >
                                                        {PubPensionCoveredFirstMedExamItems}
                                                    </SelectField>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={8} className="input-fileds align-fileds">
                                                    <label>Date when the state of disease/injury becomes stable and no further recovery by medical treatment is expected <span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Your Disease/Injury Stable Date"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.DisInjStableDateState}
                                                        onChange={this.handleChangeDisInjStableDate}
                                                        errorText={this.state.isValidDisInjStableDate ? "Please Select Your Disease/Injury Stable" : null}
                                                    />
                                                </Col>
                                                <Col xs={12} md={4} className="Radio_button">
                                                    <label>Was the disease/injury caused by work?<span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.DisInjCausedByWorkState} onChange={this.handleChangeDisInjCausedByWork.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidDisInjCausedByWork ? "Please Select Your disease/injury caused by work" : null}</span>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds align-fileds" >
                                                    <label>For this disease/injury, are you eligible or claiming for benefits under any of the systems listed? <span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        multiple={true}
                                                        value={this.state.DisInjTypeOfClaimLawsState}
                                                        hintText="Select the disease injury claim law"
                                                        onChange={this.handleChangeDisInjTypeOfClaimLaws}
                                                        errorText={this.state.isValidDisInjTypeOfClaimLaws ? "Please Select Your Disease Injury Claim Law" : null}
                                                        maxHeight={200}
                                                    >
                                                        {TypeOfClaimLawsItems}
                                                    </SelectField>
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" hidden={this.state.DisInjTypeOfClaimLawsState == ""}>
                                                    <label>Type of benefits if you are eligible for benefits from the system you selected <span className="manatoryfield">*</span></label>
                                                    <SelectField
                                                        value={this.state.TypeOfBenEligibleDisState}
                                                        hintText="Select the type of pension covered"
                                                        onChange={this.handleChangeTypeOfBenEligibleDis}
                                                        errorText={this.state.isValidTypeOfBenEligibleDis ? "Please Select Your Type Of Pension Covered" : null}
                                                        maxHeight={200}
                                                    >
                                                        {TypeOfBenEligibleDisItems}
                                                    </SelectField>
                                                </Col>
                                                <Col xs={12} md={6} className="input-fileds align-fileds" hidden={this.state.DisInjTypeOfClaimLawsState == ""}>
                                                    <label>Date Of Entitlement<span className="manatoryfield">*</span></label>
                                                    <DatePicker hintText="Enter Your Date Of Entitlement"
                                                        locale="en-US"
                                                        firstDayOfWeek={0}
                                                        value={this.state.DisDateOfEntitlementState}
                                                        onChange={this.handleChangeDisDateOfEntitlement}
                                                        errorText={this.state.isValidDisDateOfEntitlement ? "Please Select Your Date Of Entitlement" : null}
                                                    />
                                                </Col>
                                            </Col>
                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={6} className="Radio_button">
                                                    <label>Was the disease/injury caused by a third party? <span className="manatoryfield">*</span></label>
                                                    <RadioButtonGroup valueSelected={this.state.DisInjCausedByTPartyState} onChange={this.handleChangeDisInjCausedByTParty.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                                    <span className="validationmsg">{this.state.isValidDisInjCausedByTParty ? "Please Select Your disease/injury caused by a third party" : null}</span>
                                                </Col>
                                            </Col>
                                        </div>
                                        : ""}
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={9}>
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

BenQusJapan.propTypes = {
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(BenQusJapan);

