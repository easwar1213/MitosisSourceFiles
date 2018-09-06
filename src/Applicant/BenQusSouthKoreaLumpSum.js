import React, { Component } from 'react';

//Bootstrap Component
import { Row, Col, Button } from 'react-bootstrap';

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
import BenQusSKBankForm from './BenQusSKBankForm'

//Google Address 
import Geosuggest from 'react-geosuggest';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Routing
import history from '../Routing/history';

const style = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

const ClaimantChildrens = [];
let ModeEdit = '';

const ReasonItems = [
    <MenuItem value={"Staying abroad"} key={1} primaryText={`Staying abroad`} />,
    <MenuItem value={"Imprisonment"} key={2} primaryText={`Imprisonment`} />,
    <MenuItem value={"Military Service"} key={3} primaryText={`Military Service`} />,
    <MenuItem value={"Other"} key={4} primaryText={`Other`} />,
];

var emailresult;

class BenQusSouthKoreaLumpSum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ApplicationState: '',
            NameState: '',
            RegistrationState: '',
            TelephoneState: '',
            MailingAddressState: '',
            PostalcodeState: '',
            RelationshipState: '',
            BeneficiariesState: '',
            RepresentativeState: '',
            INameState: '',
            IRegistrationNoState: '',
            DateOfDeathState: '',
            AccountNoState: '',
            EntitlementCodeState: '',
            DateofEligibilityState: '',
            EndDateState: '',
            DisabledState: '',
            UnpaidBenefitState: '',
            BNameState: '',
            BRegistrationNoState: '',
            DateState: '',
            disabilityState: '',
            BenefitState: '',
            EligiblebenefitState: '',
            BenefitChosenState: '',
            ReasonState: 'Staying abroad',
            BeneficiaryState: '',
            ApplicationdateState: '',
            BeneficiariesState: '',
            VerifiedState: '',
            ANameState: '',
            ARegistrationState: '',
            ATelephoneState: '',
            AMailingAddressState: '',
            APostalcodeState: '',
            ARelationshipState: '',
            ischecked: false,
            DateSignState: '',


            ischeckedB: false,
            LBeneficiaryState: '',
            isValildApplication: false,
            isValidName: false,
            isValidRegistration: false,
            isValidTelephone: false,
            isValidMailingAddress: false,
            isValidPostalcode: false,
            isValidRelationship: false,
            isValidBeneficiaries: false,
            isValidRepresentative: false,
            isValidIName: false,
            isValidIRegistrationNo: false,
            isValidDateOfDeath: false,
            isValidAccountNo: false,
            isValidEntitlementCode: false,
            isValidDateofEligibility: false,
            isValidEndDate: false,
            isValidDisabled: false,
            isValidUnpaidBenefit: false,
            isValidBName: false,
            isValidBRegistrationNo: false,
            isValidDate: false,
            isValidDisability: false,
            isValidSignature: false,
            isValidbenefit: false,
            isValidEligiblebenefit: false,
            isValidBenefitChosen: false,
            isValidReason: false,
            isValidApplicationdate: false,
            isValidBeneficiary: false,
            isValidVerified: false,
            isValidAName: false,
            isValidARegistration: false,
            isValidATelephone: false,
            isValidAMailingAddress: false,
            isValidAPostalcode: false,
            isValidARelationship: false,
            isValidDateSign: false,
            isValidASignature: false,
            isValidLBeneficiary: false,
            isValidLSignature: false,
            isValidLSignature1: false,
            isValidAccept2: false,
            isValidAccept1: false,
            LumpSumDocId: '',
            checked1: false,
            checked2: false
        }
    }

    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        emailresult = localStorage.getItem('applicant_email');
        var Params = new URLSearchParams(document.location.search);
        var Mode = Params.get("Mode");
        ModeEdit = Mode;
        let Countryvalue = Params.get("CountryCode")
        if (Params != null || Params != "") {
            if (Mode != null || Mode != "") {
                if (Mode == "E" && Countryvalue == "KR") {
                    this.handleBankFormKREdit(this);
                    this.handleChangeAutopopulated(this);
                }
                else {
                    this.handleChangeAutopopulated(this);
                }
            }
            else {
                this.handleChangeAutopopulated(this);
            }
        }
        else {
            this.handleChangeAutopopulated(this);
        }

    }


    handleBankFormKREdit() {
        var thisObj = this;
        let DataURLPension = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var dataURL = {
            QueryName: "Pensiondata1",
            UserID: emailresult,
            CountryCode: "KR",
            PensionFormType: "LS"
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
            console.log('Data for Edit', JSON.stringify(data));
            this.setState({ showloader: false });
            data.map((item, key) => {
                let JSONData = JSON.parse(item.AppAnsInJsonObj);
                let imgURL1 = JSONData.Applicantsignature;
                let imgURL2 = JSONData.LumpSumSignature;
                this.AsignaturePad.fromDataURL(imgURL1),
                    this.LsignaturePad.fromDataURL(imgURL2),
                    thisObj.setState({
                        DateSignState: new Date(JSONData.DateSign),
                        LBeneficiaryState: JSONData.LBeneficiary,
                        checked1: JSONData.Ischecked,
                        checked2: JSONData.IsCheckedB,
                    });
            }
            );
        }).catch((err) => {

        });
    }

    handleChangeApplication = (event) => {
        this.setState({ ApplicationState: event.target.value });
    };

    handleChangeName(event) {
        this.setState({ NameState: event.target.value });
    };

    handleChangeRegistration(event) {
        this.setState({ RegistrationState: event.target.value });
    };

    handleChangeTelephone(event) {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ TelephoneState: onlyNums });
        }
    };

    onSuggestSelect(suggest) {
        if (suggest) {
            this.setState({ MailingAddressState: suggest.description });
        }
    };

    handleChangeMailingAddress = (value) => {
        this.setState({ MailingAddressState: value });
    };

    handleChangePostalcode(event) {
        this.setState({ PostalcodeState: event.target.value });
    };

    handleChangeRelationship(event) {
        this.setState({ RelationshipState: event.target.value });
    };

    handleChangeBeneficiaries = (event) => {
        this.setState({ BeneficiariesState: event.target.value });
    };

    handleChangeRepresentative(event) {
        this.setState({ RepresentativeState: event.target.value });
    };

    handleChangeIName(event) {
        this.setState({ INameState: event.target.value });
    };

    handleChangeIRegistrationNo(event) {
        this.setState({ IRegistrationNoState: event.target.value });
    };

    handleChangeDateOfDeath(event, date) {
        this.setState({ DateOfDeathState: date });
    };

    handleChangeAccountNo(event) {
        this.setState({ AccountNoState: event.target.value });
    };

    handleChangeEntitlementCode(event) {
        this.setState({ EntitlementCodeState: event.target.value });
    };

    handleChangeDateofEligibility(event, date) {
        this.setState({ DateofEligibilityState: date });
    };

    handleChangeEndDate(event, date) {
        this.setState({ EndDateState: date });
    };

    handleChangeDisabled(event) {
        this.setState({ DisabledState: event.target.value });
    };

    handleChangeUnpaidBenefits(event) {
        this.setState({ UnpaidBenefitState: event.target.value });
    };

    handleChangeBName(event) {
        this.setState({ BNameState: event.target.value });
    };

    handleChangeBRegistrationNo(event) {
        this.setState({ BRegistrationNoState: event.target.value });
    };

    handleChangeDate(event, date) {
        this.setState({ DateState: date });
    };

    handleChangeDisability(event) {
        this.setState({ disabilityState: event.target.value });
    };

    handleSignatureClear = (e) => {
        this.signaturePad.clear();
    };

    handleChangebenefit(event) {
        this.setState({ BenefitState: event.target.value });
    };

    handleChangeEligiblebenefit(event, date) {
        this.setState({ EligiblebenefitState: date });
    };

    handleChangeBenefitChosen(event, date) {
        this.setState({ BenefitChosenState: date });
    };

    handleChangeReason(event, index, value) {
        this.setState({ ReasonState: value });
    };

    handleChangeApplicationdate(event, date) {
        this.setState({ ApplicationdateState: date })
    };

    handleChangeBeneficiary(event) {
        this.setState({ BeneficiaryState: event.target.value });
    };

    handleChangeverified(event) {
        this.setState({ VerifiedState: event.target.value });
    };

    handleChangeAName(event) {
        this.setState({ ANameState: event.target.value });
    };

    handleChangeARegistration(event) {
        this.setState({ ARegistrationState: event.target.value });
    };

    handleChangeATelephone(event) {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ ATelephoneState: onlyNums });
        }
    };

    onSuggestSelectAMailingAddress(suggest) {
        if (suggest) {
            this.setState({ AMailingAddressState: suggest.description });
        }
    };

    handleChangeAMailingAddress = (value) => {
        this.setState({ AMailingAddressState: value });
    };

    handleChangeAPostalcode(event) {
        this.setState({ APostalcodeState: event.target.value });
    };

    handleChangeARelationship(event) {
        this.setState({ ARelationshipState: event.target.value });
    };

    handleCheck() {
        if (this.state.ischecked == false || this.state.ischecked == '') {
            this.setState({
                ischecked: true,
                checked1: true
            });
        }
        else {
            this.setState({
                ischecked: false,
                checked1: false
            });

        }
    };

    handleChangeDateSign(event, date) {
        this.setState({ DateSignState: date });
    };

    handleASignatureClear = (e) => {
        this.AsignaturePad.clear();
    };

    handleCheckB() {
        if (this.state.ischeckedB == false || this.state.ischeckedB == '') {
            this.setState({
                ischeckedB: true,
                checked2: true
            });
        }
        else {
            this.setState({
                ischeckedB: false,
                checked2: false
            });
        }
    };

    handleChangeLBeneficiary(event) {
        this.setState({ LBeneficiaryState: event.target.value });
    };

    handleLSignatureClear = (e) => {
        this.LsignaturePad.clear();
    };

    handlevalidation(event) {
        let validForm = false;
        let validApplicationForm = false;
        let validNameForm = false;
        let validRegistrationForm = false;
        let validTelephoneForm = false;
        let validMailingAddressForm = false;
        let validPostalcodeForm = false;
        let validRelationshipForm = false;
        let validBeneficiariesForm = false;
        let validRepresentativeForm = false;
        let validINameForm = false;
        let validIRegistrationNoForm = false;
        let validDateofDeathForm = false;
        let validAccountNoForm = false;
        let validEntitlementcodeForm = false;
        let validDateofEligibilityForm = false;
        let validEndDateForm = false;
        let validDisabledForm = false;
        let validUnpaidbenefitForm = false;
        let validReasonForm = false;
        let validApplicationdateForm = false;
        let validBeneficiaryForm = false;
        let validVerifiedForm = false;
        let validANameForm = false;
        let validARegistrationForm = false;
        let validATelephoneForm = false;
        let validAMailingAddressForm = false;
        let validAPostalcodeForm = false;
        let validARelationshipForm = false;
        let validDateSignForm = false;
        let validASignatureForm = false;
        let validLBeneficiaryForm = false;
        let validLSignatureForm = false;
        let validAccept1 = false;
        let validAccept2 = false;

        if (this.state.ApplicationState != "") {
            this.setState({ isValildApplication: false })
            validApplicationForm = true;
        }
        else {
            this.setState({ isValildApplication: true })
            validApplicationForm = false;
        }
        if (this.state.NameState != "") {
            this.setState({ isValidName: false })
            validNameForm = true;
        }
        else {
            this.setState({ isValidName: true })
            validNameForm = false;
        }
        if (this.state.RegistrationState != "") {
            this.setState({ isValidRegistration: false })
            validRegistrationForm = true;
        }
        else {
            this.setState({ isValidRegistration: true })
            validRegistrationForm = false;
        }
        if (this.state.TelephoneState != "") {
            this.setState({ isValidTelephone: false })
            validTelephoneForm = true;
        }
        else {
            this.setState({ isValidTelephone: true })
            validTelephoneForm = false;
        }
        if (this.state.MailingAddressState != "") {
            this.setState({ isValidMailingAddress: false })
            validMailingAddressForm = true;
        }
        else {
            this.setState({ isValidMailingAddress: true })
            validMailingAddressForm = false;
        }
        if (this.state.PostalcodeState != "") {
            this.setState({ isValidPostalcode: false })
            validPostalcodeForm = true;
        }
        else {
            this.setState({ isValidPostalcode: true })
            validPostalcodeForm = false;
        }
        if (this.state.RelationshipState != "") {
            this.setState({ isValidRelationship: false })
            validRelationshipForm = true;
        }
        else {
            this.setState({ isValidRelationship: true })
            validRelationshipForm = false;
        }
        if (this.state.BeneficiariesState != "") {
            this.setState({ isValidBeneficiaries: false })
            validBeneficiariesForm = true;
        }
        else {
            this.setState({ isValidBeneficiaries: true })
            validBeneficiariesForm = false;
        }
        if (this.state.RepresentativeState != "") {
            this.setState({ isValidRepresentative: false })
            validRepresentativeForm = true;
        }
        else {
            this.setState({ isValidRepresentative: true })
            validRepresentativeForm = false;
        }
        if (this.state.INameState != "") {
            this.setState({ isValidIName: false })
            validINameForm = true;
        }
        else {
            this.setState({ isValidIName: true })
            validINameForm = false;
        }
        if (this.state.IRegistrationNoState != "") {
            this.setState({ isValidIRegistrationNo: false })
            validIRegistrationNoForm = true;
        }
        else {
            this.setState({ isValidIRegistrationNo: true })
            validIRegistrationNoForm = false;
        }
        if (this.state.DateOfDeathState != "") {
            this.setState({ isValidDateOfDeath: false })
            validDateofDeathForm = true;
        }
        else {
            this.setState({ isValidDateOfDeath: true })
            validDateofDeathForm = false;
        }
        if (this.state.AccountNoState != "") {
            this.setState({ isValidAccountNo: false })
            validAccountNoForm = true;
        }
        else {
            this.setState({ isValidAccountNo: true })
            validAccountNoForm = false;
        }
        if (this.state.EntitlementCodeState != "") {
            this.setState({ isValidEntitlementCode: false })
            validEntitlementcodeForm = true;
        }
        else {
            this.setState({ isValidEntitlementCode: true })
            validEntitlementcodeForm = false;
        }
        if (this.state.DateofEligibilityState != "") {
            this.setState({ isValidDateofEligibility: false })
            validDateofEligibilityForm = true;
        }
        else {
            this.setState({ isValidDateofEligibility: true })
            validDateofEligibilityForm = false;
        }
        if (this.state.EndDateState != "") {
            this.setState({ isValidEndDate: false })
            validEndDateForm = true;
        }
        else {
            this.setState({ isValidEndDate: true })
            validEndDateForm = false;
        }
        if (this.state.DisabledState != "") {
            this.setState({ isValidDisabled: false })
            validDisabledForm = true;
        }
        else {
            this.setState({ isValidDisabled: true })
            validDisabledForm = false;
        }
        if (this.state.UnpaidBenefitState != "") {
            this.setState({ isValidUnpaidBenefit: false })
            validUnpaidbenefitForm = true;
        }
        else {
            this.setState({ isValidUnpaidBenefit: true })
            validUnpaidbenefitForm = false;
        }
        if (this.state.ReasonState != "") {
            this.setState({ isValidReason: false })
            validReasonForm = true;
        }
        else {
            this.setState({ isValidReason: true })
            validReasonForm = false;
        }
        if (this.state.ApplicationdateState != "") {
            this.setState({ isValidApplicationdate: false })
            validApplicationdateForm = true;
        }
        else {
            this.setState({ isValidApplicationdate: true })
            validApplicationdateForm = false;
        }
        if (this.state.BeneficiaryState != "") {
            this.setState({ isValidBeneficiary: false })
            validBeneficiaryForm = true;
        }
        else {
            this.setState({ isValidBeneficiary: true })
            validBeneficiaryForm = false;
        }
        if (this.state.VerifiedState != "") {
            this.setState({ isValidVerified: false })
            validVerifiedForm = true;
        }
        else {
            this.setState({ isValidVerified: true })
            validVerifiedForm = false;
        }
        if (this.state.ANameState != "") {
            this.setState({ isValidAName: false })
            validANameForm = true;
        }
        else {
            this.setState({ isValidAName: true })
            validANameForm = false;
        }
        if (this.state.ARegistrationState != "") {
            this.setState({ isValidARegistration: false })
            validARegistrationForm = true;
        }
        else {
            this.setState({ isValidARegistration: true })
            validARegistrationForm = false;
        }
        if (this.state.ATelephoneState != "") {
            this.setState({ isValidATelephone: false })
            validATelephoneForm = true;
        }
        else {
            this.setState({ isValidATelephone: true })
            validATelephoneForm = false;
        }
        if (this.state.AMailingAddressState != "") {
            this.setState({ isValidAMailingAddress: false })
            validAMailingAddressForm = true;
        }
        else {
            this.setState({ isValidAMailingAddress: true })
            validAMailingAddressForm = false;
        }
        if (this.state.APostalcodeState != "") {
            this.setState({ isValidAPostalcode: false })
            validAPostalcodeForm = true;
        }
        else {
            this.setState({ isValidAPostalcode: true })
            validAPostalcodeForm = false;
        }
        if (this.state.ARelationshipState != "") {
            this.setState({ isValidARelationship: false })
            validARelationshipForm = true;
        }
        else {
            this.setState({ isValidARelationship: true })
            validARelationshipForm = false;
        }
        if (this.state.DateSignState != "") {
            this.setState({ isValidDateSign: false })
            validDateSignForm = true;
        }
        else {
            this.setState({ isValidDateSign: true })
            validDateSignForm = false;
        }
        if (this.AsignaturePad.isEmpty()) {
            this.setState({ isValidASignature: true });
            validASignatureForm = false;
        }
        else {
            this.setState({ isValidASignature: false });
            validASignatureForm = true;
        }
        if (this.state.LBeneficiaryState != "") {
            this.setState({ isValidLBeneficiary: false });
            validLBeneficiaryForm = true;
        }
        else {
            this.setState({ isValidLBeneficiary: true });
            validLBeneficiaryForm = false;
        }
        if (this.LsignaturePad.isEmpty()) {
            this.setState({ isValidLSignature: true });
            validLSignatureForm = false;
        }
        else {
            this.setState({ isValidLSignature: false });
            validLSignatureForm = true;
        }

        if (this.state.ischecked != "") {
            this.setState({ isValidAccept1: false })
            validAccept1 = true;
        }
        else {
            this.setState({ isValidAccept1: true })
            validAccept1 = false;
        }

        if (this.state.ischeckedB != "") {
            this.setState({ isValidAccept2: false })
            validAccept2 = true;
        }
        else {
            this.setState({ isValidAccept2: true })
            validAccept2 = false;
        }


        if (validDateSignForm && validASignatureForm && validLBeneficiaryForm && validLSignatureForm && validAccept1 && validAccept2) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    handleValidateChildForm(event) {
        let validForm = false;
        let validBNameForm = false;
        let validBRegistrationNoForm = false;
        let validDateForm = false;
        let validDisabilityForm = false;
        let validSignatureForm = false;
        let validBenefitForm = false;
        let validEligiblebenefitForm = false;
        let validBenefitChosenForm = false;

        if (this.state.BNameState != "") {
            this.setState({ isValidBName: false })
            validBNameForm = true;
        }
        else {
            this.setState({ isValidBName: true })
            validBNameForm = false;
        }
        if (this.state.BRegistrationNoState != "") {
            this.setState({ isValidBRegistrationNo: false })
            validBRegistrationNoForm = true;
        }
        else {
            this.setState({ isValidBRegistrationNo: true })
            validBRegistrationNoForm = false;
        }
        if (this.state.DateState != "") {
            this.setState({ isValidDate: false })
            validDateForm = true;
        }
        else {
            this.setState({ isValidDate: true })
            validDateForm = false;
        }
        if (this.state.disabilityState != "") {
            this.setState({ isValidDisability: false })
            validDisabilityForm = true;
        }
        else {
            this.setState({ isValidDisability: true })
            validDisabilityForm = false;
        }
        if (this.signaturePad.isEmpty()) {
            this.setState({ isValidSignature: true });
            validSignatureForm = false;
        }
        else {
            this.setState({ isValidSignature: false });
            validSignatureForm = true;
        }
        if (this.state.BenefitState != "") {
            this.setState({ isValidbenefit: false })
            validBenefitForm = true;
        }
        else {
            this.setState({ isValidbenefit: true })
            validBenefitForm = false;
        }
        if (this.state.EligiblebenefitState != "") {
            this.setState({ isValidEligiblebenefit: false })
            validEligiblebenefitForm = true;
        }
        else {
            this.setState({ isValidEligiblebenefit: true })
            validEligiblebenefitForm = false;
        }
        if (this.state.BenefitChosenState != "") {
            this.setState({ isValidBenefitChosen: false })
            validBenefitChosenForm = true;
        }
        else {
            this.setState({ isValidBenefitChosen: true })
            validBenefitChosenForm = false;
        }

        if (validBNameForm && validBRegistrationNoForm && validDateForm && validDisabilityForm && validSignatureForm && validBenefitForm && validEligiblebenefitForm && validBenefitChosenForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }

        return validForm;
    }

    handleChildReset(e) {
        this.setState({
            BNameState: '',
            BRegistrationNoState: '',
            DateState: '',
            disabilityState: '',
            BenefitState: '',
            EligiblebenefitState: '',
            BenefitChosenState: '',
            isValidBName: false,
            isValidBRegistrationNo: false,
            isValidDate: false,
            isValidDisability: false,
            isValidSignature: false,
            isValidbenefit: false,
            isValidEligiblebenefit: false,
            isValidBenefitChosen: false,
        });
    }

    handleBenQusChildDatas(event) {
        var Signaturedata = this.signaturePad.toDataURL();
        var EncodedData = Signaturedata.split(',');
        var SignatureBase64 = EncodedData[1];
        var valid = this.handleValidateChildForm(this);
        if (valid) {
            var ChildrenJSONData = {
                BenefitName: this.state.BNameState,
                BenefitRegistration: this.state.BRegistrationNoState,
                SignDate: this.state.DateState,
                Disability: this.state.disabilityState,
                DesignationSignature: SignatureBase64,
                Benefit: this.state.BenefitState,
                EligibleBenefit: this.state.EligiblebenefitState,
                BenefitChosen: this.state.BenefitChosenState,
            }
            if (ClaimantChildrens.length < 3) {
                ClaimantChildrens.push(ChildrenJSONData);
                notify.show("Beneficiaries Information Added Successfully", "success", 3000);
                this.handleChildReset(this);
            }
            else {
                notify.show("GPA Allow Maximum Three Beneficiaries to Add", "warning", 3000);
            }
        }
    }
    handleChangeAutopopulated(e) {
        var thisObj = this;
        let UserID;
        let BenQusAutopopulatedAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusAutopopulatedJSONData = JSON.stringify({
            QueryName: "SouthKoreaLumpSumAutoPopulate",
            UserID: emailresult,
            ResCountry: "KR"
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
            url: BenQusAutopopulatedAPIUrl,
            data: BenQusAutopopulatedJSONData,
            //headers:AxiosHeaderConfig,

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({
                    NameState: data[i].FirstName + " " + data[i].LastName,
                    RegistrationState: data[i].PersonalIDNum,
                    TelephoneState: data[i].HomeNum,
                    MailingAddressState: data[i].MailingAddress,
                    BeneficiaryState: data[i].FirstName + " " + data[i].LastName,
                    ANameState: data[i].FirstName + " " + data[i].LastName,
                    ARegistrationState: data[i].PersonalIDNum,
                    ATelephoneState: data[i].HomeNum,
                    AMailingAddressState: data[i].MailingAddress,
                    LBeneficiaryState: data[i].FirstName + " " + data[i].LastName,
                    DateSignState: new Date()
                })
            }
        }).catch((err) => {

        })
    }

    handleBenQusSave(event) {
        emailresult = localStorage.getItem('applicant_email');
        var ApplicantSignatureBase64 = this.AsignaturePad.toDataURL();
        var LumpSumSignatureBase64 = this.LsignaturePad.toDataURL();
        var thisObj = this;
        let QName;
        if (ModeEdit == "E") {
            QName = "SouthKoreaPart2Update"
        } else {
            QName = "BenQusPart2SaveKR"
        }
        let BenQusSKLumpSumAPIUrl = "https://4k73oeispk.execute-api.us-west-2.amazonaws.com/dev/GPA_BenQusDatas_Lambda";
        let BenQusSKLumpSumJSONData = JSON.stringify({
            QueryName: QName,
            UserID: emailresult,
            CountryCode: "KR",
            BQP2AnsStatus: "C",
            PensionFormType: "LS",
            AppAnsInJsonObj: {
                Application: this.state.ApplicationState,
                Name: this.state.NameState,
                Registration: this.state.RegistrationState,
                Telephone: this.state.TelephoneState,
                MailingAddress: this.state.MailingAddressState,
                Postalcode: this.state.PostalcodeState,
                Relationship: this.state.RelationshipState,
                Beneficiaries: this.state.BeneficiariesState,
                Representative: this.state.RepresentativeState,
                IName: this.state.INameState,
                IRegistrationNo: this.state.IRegistrationNoState,
                DateOfDeath: this.state.DateOfDeathState,
                AccountNo: this.state.AccountNoState,
                EntitlementCode: this.state.EntitlementCodeState,
                DateofEligibility: this.state.DateofEligibilityState,
                EndDate: this.state.EndDateState,
                Disabled: this.state.DisabledState,
                UnpaidBenefit: this.state.UnpaidBenefitState,
                BeneficiaryChild: ClaimantChildrens,
                ReasonState: this.state.ReasonState,
                Beneficiary: this.state.BeneficiaryState,
                Applicationdate: this.state.ApplicationdateState,
                Beneficiaries: this.state.BeneficiariesState,
                Verified: this.state.VerifiedState,
                AName: this.state.ANameState,
                ARegistration: this.state.ARegistrationState,
                ATelephone: this.state.ATelephoneState,
                AMailingAddress: this.state.AMailingAddressState,
                APostalcode: this.state.APostalcodeState,
                ARelationship: this.state.ARelationshipState,
                DateSign: this.state.DateSignState,
                LBeneficiary: this.state.LBeneficiaryState,
                LumpSumSignature: LumpSumSignatureBase64,
                Applicantsignature: ApplicantSignatureBase64,
                IsCheckedB: this.state.ischeckedB,
                Ischecked: this.state.ischecked

            },
        });
        let AxiosHeaderConfig = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        var isValid = this.handlevalidation(this);
        if (isValid) {
            axios({
                method: "POST",
                url: BenQusSKLumpSumAPIUrl,
                data: BenQusSKLumpSumJSONData,
                //headers:AxiosHeaderConfig,

            }).then((data) => {
                console.log("Success Data--->", data);
                if (ModeEdit == "E") {
                    notify.show("Update Successfully", "success", 3000);
                } else {
                    notify.show("Your Part2 Information Saved Successfully", "success", 3000);
                }
                thisObj.handleSendDocumentMail(this);
                thisObj.handleSavePensionData(this);
            }).catch((err) => {

            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }

    // handle send mail.

    handleSendDocumentMail(e) {
        let OtherDocumentationURL = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let OtherDocumentData = {
            "MailDocName": "OtherDocumentation",
            "EmailTo": emailresult//ramya.s@mitosistech.com
        }
        SaveDataAPICallMailSend(OtherDocumentationURL, OtherDocumentData)
            .then((data) => {
                notify.show("Required Documents Details email sent Successfully", "success", 3000);
            }).catch((err) => {
                console.log(err);
            });
    }

    handleSavePensionData(e) {
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
                    // console.log(JSONData)
                    // console.log(JSONData.BeneficiaryChild[0].BenefitName);
                    // console.log("data" + JSONData.BeneficiaryChild.length)
                    // const JSONChildrens = [];
                    // for (let i = 0; i < JSONData.BeneficiaryChild.length; i++) {
                    //     JSONChildrens.push(JSONData.BeneficiaryChild[i])
                    // }
                    //console.log(JSONChildrens[0]);
                    SavePensiondata = ({
                        "html": "This is test Data",
                        "language": "en",
                        "DocCategory": "LSAKorea",
                        "params": {
                            "empId": emailresult,
                            "pensiondata": {
                                "Name": [JSONData.Name],
                                "Registration": [JSONData.Registration],
                                "Tel": [JSONData.Telephone],
                                "MailingAddress": [JSONData.MailingAddress],
                                "Registration": [JSONData.Relationship],
                                "InsuredName": [JSONData.IName],
                                "InsuredRegistrationNo1": [JSONData.IRegistrationNo],
                                "Date of Death": [JSONData.DateOfDeath],
                                "AccountNo": [JSONData.AccountNo],
                                "EntitlementCode": [JSONData.EntitlementCode],
                                "DateofEligiblity": [JSONData.DateofEligibility],
                                "PaymentDate": [JSONData.EndDate],
                                // "BeneficiaryName1": [JSONData.BeneficiaryChild[0].BenefitName],
                                // "BeneficiaryName2": [JSONData.BeneficiaryChild[1].BenefitName],
                                // "BeneficiaryName3": [JSONData.BeneficiaryChild[2].BenefitName],
                                // "ResidentRegNo1": [JSONData.BeneficiaryChild[0].BenefitRegistration],
                                // "ResidentRegNo3": [JSONData.BeneficiaryChild[1].BenefitRegistration],
                                // "ResidentRegNo5": [JSONData.BeneficiaryChild[2].BenefitRegistration],
                                // "Date_1": [JSONData.BeneficiaryChild[0].SignDate],
                                // "Date_2": [JSONData.BeneficiaryChild[1].SignDate],
                                // "Date_3": [JSONData.BeneficiaryChild[2].SignDate],
                                // "DegreeofDisability1": [JSONData.BeneficiaryChild[0].Disability],
                                // "DegreeofDisability2": [JSONData.BeneficiaryChild[1].Disability],
                                // "DegreeofDisability3": [JSONData.BeneficiaryChild[2].Disability],
                                // "EligibleDate1": [JSONData.BeneficiaryChild[0].EligibleBenefit],
                                // "EligibleDate2": [JSONData.BeneficiaryChild[1].EligibleBenefit],
                                // "EligibleDate3": [JSONData.BeneficiaryChild[2].EligibleBenefit],
                                // "BenefitsChoosenDate": [JSONData.BeneficiaryChild[0].BenefitChosen],
                                "DateofApplication": [JSONData.Applicationdate],
                                "ApplicantName": [JSONData.AName],
                                "ApplicantRegNo1": [JSONData.ARegistration],
                                "ApplicantTel": [JSONData.ATelephone],
                                "ApplicantMailingAddress": [JSONData.AMailingAddress],
                                "RelationshiptoBeneficiary": [JSONData.ARelationship],
                                "BeneficiaryName": [JSONData.LBeneficiary],
                            }
                        }
                    });
                });
                SaveDataAPICallMailSend(SaveDataFormURL, SavePensiondata)
                    .then((data) => {
                        notify.show("Your Lump Sum application generated Successfully", "success", 3000);
                        let documentIdApi = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
                        let docData = {
                            QueryName: "SouthKoreaLumpSumDocID",
                            UserID: emailresult
                        }
                        SaveDataAPICallMailSend(documentIdApi, docData)
                            .then((data) => {
                                this.setState({
                                    LumpSumDocId: data[0].LumpSumEmpID
                                })
                                // Lump Sum from link 
                                let AppDocUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
                                let AppDocTrackData = {
                                    QueryName: "CountryBasedDocumentsTrackDoc",
                                    UserID: emailresult,
                                    DocumentID: "77",
                                    DocumentCode: this.state.LumpSumDocId,
                                    CountryCode: "KR",
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
                                            DocumentCode: this.state.LumpSumDocId,
                                            DownloadPensionAppFileLink: "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/" + emailresult + "/" + "lsa_korea_en.pdf"
                                        }
                                        console.log("pafinput" + JSON.stringify(pafInput));
                                        SaveDataAPICallMailSend(pafapi, pafInput)
                                            .then((data) => {
                                                // this.handleRedirect(this);
                                                // history.push('/BenQusSKBankForm');
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

    handleRedirect(e) {
        history.push('/ApplicantDashboard');
    }

    render() {
        const google = window.google;
        let DateTimeFormat = global.Intl.DateTimeFormat;
        return (
            <div>
                <Paper>
                    <h2 className="legendtitle">South Korea Lump Sum Form</h2>
                    <div className="fieldstyle">
                        <Row className="show-grid" className="overall">
                            <Col xs={12} md={12}>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Checkalign">
                                            <Checkbox
                                                checked={this.state.checked1}
                                                label="I hereby apply for a Lump-sum Refund or a Lump-sum Death Payment under Article 31 of the Enforcement Regulation in the National Pension Act."
                                                value={this.state.ischecked}
                                                onClick={this.handleCheck.bind(this)}
                                                style={styles.checkbox} />
                                            <span className="validationmsg">{this.state.isValidAccept1 ? "Please tik the checkbox" : null}</span>
                                        </Col>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                        <label>Date of Application (DD/MM/YYYY):<span className="manatoryfield">*</span></label>
                                        <DatePicker
                                            hintText="Select the date of application"
                                            value={this.state.DateSignState}
                                            onChange={this.handleChangeDateSign.bind(this)}
                                            errorText={this.state.isValidDateSign ? "Please select Date of Application" : null}
                                            locale="en-US"
                                            firstDayOfWeek={0}
                                            DateTimeFormat={DateTimeFormat}
                                            formatDate={new DateTimeFormat('en-AU', {
                                                day: 'numeric',
                                                month: 'numeric',
                                                year: 'numeric',
                                            }).format}
                                        />
                                    </Col>
                                    <Col xs={12} md={5}></Col>
                                    <Col xs={12} md={3} className="input-fileds align-fileds">
                                        <label ><b>Signature</b></label>
                                        <SignaturePad ref={ref => this.AsignaturePad = ref} />
                                        <Button id="clear" className="ClearBtn" onClick={this.handleASignatureClear.bind(this)}>Clear</Button>
                                        <span className="validationmsg">{this.state.isValidASignature ? "Please sign your signature" : ""}</span>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Checkalign">
                                            <Checkbox
                                                checked={this.state.checked2}
                                                label="I apply for a Lump-sum Refund or a Lump-sum Death Payment despite knowing that I can not receive a Special Old-Age, Disability or Survivors Pension if I receive the Lump-sum Refund."
                                                value={this.state.ischeckedB}
                                                onClick={this.handleCheckB.bind(this)}
                                                style={styles.checkbox} />
                                            <span className="validationmsg">{this.state.isValidAccept2 ? "Please tik the checkbox" : null}</span>
                                        </Col>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                        <label>Beneficiary:<span className="manatoryfield">*</span></label>
                                        <TextField hintText="Enter your Beneficiary"
                                            value={this.state.LBeneficiaryState}
                                            onChange={this.handleChangeLBeneficiary.bind(this)}
                                            errorText={this.state.isValidLBeneficiary ? "Please enter your beneficiary" : null}
                                        />
                                    </Col>
                                    <Col xs={12} md={5}></Col>
                                    <Col xs={12} md={3} className="input-fileds align-fileds">
                                        <label ><b>Signature</b></label>
                                        <SignaturePad ref={ref => this.LsignaturePad = ref} />
                                        <Button id="clear" className="ClearBtn" onClick={this.handleLSignatureClear.bind(this)}>Clear</Button>
                                        <span className="validationmsg">{this.state.isValidLSignature ? "Please sign your signature" : ""}</span>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    {ModeEdit == "E" ?
                                        <Col xs={12} md={12} className="input-fields">
                                            <Button onClick={this.handleBenQusSave.bind(this)} className="RQ-Add" >Update</Button>
                                            <Notifications />
                                        </Col>
                                        : <Col xs={12} md={12} className="input-fields">
                                            <Button onClick={this.handleBenQusSave.bind(this)} className="RQ-Add" >Save</Button>
                                            <Notifications />
                                        </Col>
                                    }
                                </Col>
                            </Col>
                        </Row>
                        <Col>
                            <BenQusSKBankForm />
                        </Col>
                    </div>
                </Paper>
            </div >
        )
    }
}

//call all the API common method
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(BenQusSouthKoreaLumpSum);