import React, { Component } from 'react';
import PropTypes from "prop-types";

//Bootstrap Component
import { Col, Panel, Row, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

//Google Address
import Geosuggest from 'react-geosuggest';

//API Calling Method
import axios from 'axios';

//Notification 
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

const style = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
        marginTop: 8
    },
};

const IndustryItems = [];

const BenCountryItems = [
    <MenuItem value={"CA"} primaryText="Canada" />,
    <MenuItem value={"DK"} primaryText="Denmark" />,
    <MenuItem value={"FR"} primaryText="France" />,
    <MenuItem value={"IT"} primaryText="Italy" />,
    <MenuItem value={"JP"} primaryText="Japan" />,
    <MenuItem value={"QC"} primaryText="Quebec" />,
    <MenuItem value={"UK"} primaryText="United Kingdom" />,
    <MenuItem value={"NO"} primaryText="Norway" />,
    <MenuItem value={"US"} primaryText="United States of America" />,
    <MenuItem value={"KR"} primaryText="South korea" />,
    <MenuItem value={"KRLS"} primaryText="South korea Lump Sum" />,
    <MenuItem value={"AT"} primaryText="Austria" />,
    <MenuItem value={"BE"} primaryText="Belgium" />,
    <MenuItem value={"DE"} primaryText="Germany" />,
    <MenuItem value={"BR"} primaryText="Brazil" />,
    <MenuItem value={"IE"} primaryText="Ireland" />,
    <MenuItem value={"NL"} primaryText="Netherlands" />,
    <MenuItem value={"PT"} primaryText="Portugal" />
];

const CountryItems = [];

const CompanyItems = [];

class BenefitsQuestionnariePart1 extends Component {
    constructor(props) {
        super(props);

        //Field State Values Initialization 
        this.state = {
            search: "",
            search1: "",
            search2: "",
            value: "",
            BtnSave: "Save",
            HomeAddressState: "",
            PlaceBirthState: "",
            PartnerState: 'No',
            CountryState: "",
            BenefitState: "",
            BenefitsNameState: "",
            ReceivingState: "",
            RefernceState: "",
            SecurityState: "",
            SecurityAddressState: "",
            DateBenefits: "",
            EmployerNameState: "",
            OccupationState: "",
            IndustryState: "",
            EmployerAddressState: "",
            CountryallState: "",
            YouChecked: false,
            PartnerChecked: false,
            GetBenefitsState: "You",
            validationError: {},
            isValidPlaceBirth: false,
            isValidPartner: false,
            isValidCountry: false,
            isValidBenefits: false,
            isValidBenefitsName: false,
            isValidReceiving: false,
            isValidEmployerName: false,
            isValidEmployerAddress: false,
            isValidCountryall: false,
            RedirectState:'',
        }
    }

    /* Form Fields Binding Values Handling Events*/
    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        this.handleReadClientCompanyBQ(this);
        this.handleLoadCountry(this);
        this.handleLoadIndustry(this);
        var Params = new URLSearchParams(document.location.search);
        let UserID = Params.get("UserID");
        let Countryvalue = Params.get("CountryCode")
        if (Params == "" || Params == null ) {
            this.handleBenQusAuto(this);
        }
        else if(Countryvalue!=""){
            this.handleBenQusAuto(Countryvalue);
        }
        else{
            this.handleBenQusEdit(this);
        }
    }

    handleSelectSuggest(suggest) {
        if (suggest) {
            this.setState({ HomeAddressState: suggest.description });
        }
    };

    handleSelectSuggest1(suggest) {
        if (suggest) {
            this.setState({ PlaceBirthState: suggest.description });
        }
    };

    handleSelectSuggest2(suggest) {
        if (suggest) {
            this.setState({ EmployerAddressState: suggest.description });
        }
    };

    handleChangeHomeAddress(value) {
        this.setState({ HomeAddressState: value });
    };

    handleChangePlaceBirth(value) {
        this.setState({ PlaceBirthState: value });
    };

    handleChangeEmployerAddressState(value) {
        this.setState({ EmployerAddressState: value });
    };

    handleChangePartner(e) {
        this.setState({ PartnerState: e.target.value });
        if (this.state.PartnerState == "No") {
            this.setState({
                CountryState: "",
                BenefitState: "",
                BenefitsNameState: "",
                ReceivingState: "",
                RefernceState: "",
                SecurityState: "",
                SecurityAddressState: "",
                DateBenefits: "",
                Countryid: "",
            });
        }
    };

    handleChangeCountry(event, index, value) {
        this.setState({ CountryState: value });
        if (this.state.CountryState.length == 0) {
            this.setState({
                BenefitState: "",
                BenefitsNameState: "",
                ReceivingState: "",
                RefernceState: "",
                SecurityState: "",
                SecurityAddressState: "",
                DateBenefits: "",
                Countryid: "",
            });
        }
    };

    handleChangeBenefits(event, index, value) {
        this.setState({ BenefitState: value });
    };

    handleChangeEmployerNameState(event, index, value) {
        this.setState({ EmployerNameState: value });
    };

    handleChangeBenefitsName = (event) => {
        this.setState({ BenefitsNameState: event.target.value });
    };

    handleChangeReceiving(event) {
        this.setState({ ReceivingState: event.target.value });
    };

    handleChangeRefernceState = (event) => {
        this.setState({ RefernceState: event.target.value });
    };

    handleChangeSecurityState = (event) => {
        this.setState({ SecurityState: event.target.value });
    };

    handleChangeSecurityAddressState = (event) => {
        this.setState({ SecurityAddressState: event.target.value });
    };

    handleChangeOccupationState = (event) => {
        this.setState({ OccupationState: event.target.value });
    };

    handleChangeIndustry(event, index, value) {
        this.setState({ IndustryState: value });
    };

    handleChangeCountryall(event, index, value) {
        this.setState({ CountryallState: value });
    };

    handleChangeYouChecked() {
        if (this.state.YouChecked == false || this.state.YouChecked == '') {
            this.setState({
                YouChecked: true,
                GetBenefitsState: "You"
            });
        }
        else {
            this.setState({
                YouChecked: false
            });
        }
    }

    handleChangePartnerChecked() {
        if (this.state.PartnerChecked == false || this.state.PartnerChecked == '') {
            this.setState({
                PartnerChecked: true,
                GetBenefitsState: "You" + "," + "Your Partner"
            });
        }
        else {
            this.setState({
                PartnerChecked: false
            });
        }
    }

    handleChangeDate = (e, date) => {
        this.setState({ DateBenefits: date });
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

    //Load Company List Function
    handleReadClientCompanyBQ(event) {
        emailresult = localStorage.getItem('applicant_email');
        let UserID;
        let ReadCliCompanyAPIUrl = "https://cx1y9bpqe2.execute-api.us-west-2.amazonaws.com/Dev/GPA_ReadClientCompanyDatas_Lambda";
        var JSONData = JSON.stringify({
            QueryName: "BQ",
            UserID: emailresult,
        });
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: ReadCliCompanyAPIUrl,
            headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            CompanyItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                CompanyItems.push(<MenuItem value={data[i].CompanyCode} key={i} primaryText={data[i].CompanyCode} />);
            }
        }).catch((err) => {

        });
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

    //Update Flow Function
    handleAppProcessFlowUpdate(event) {
        var thisObj = this;
        let AppProFlowAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify({
            QueryName: "ApplicantProcessFlowTrackingUpdateBQP1",
            UserID: emailresult,
            BenQusPart1: "C"
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
            history.push('/BenefitsQuestionnariePart2?CountryCode='+this.state.RedirectState);
        }).catch((err) => {

        })
    }

    //Auto-Populated Function
    handleBenQusAuto(event) {
        this.setState({ RedirectState : event})
        var thisObj = this;
        let UserID;
        //let BenAutoAPIUrl = "https://dx6v2vxoik.execute-api.us-west-2.amazonaws.com/Dev/GPA_BenQusSave_Lambda";
        let BenAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var dataAuto = JSON.stringify({
            QueryName: "BQCountryInGPAAuto",
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
            url: BenAutoAPIUrl,
            data: dataAuto,

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ HomeAddressState: data[i].MailingAddress });
                thisObj.setState({ Countryid: data[i].CountryName });
            }
        }).catch((err) => {

        });
    }

    //Save Function
    handleBenQusSave(event) {
        var QName;
        if (this.state.BtnSave == "Save") {
            QName = "BenefitsQuestionnariesCountryInGPASave";
        }
        else {
            QName = "BenefitsQuestionnariesCountryInGPAUpdate"
        }
        var thisObj = this;
        //let BenQusSave = "https://dx6v2vxoik.execute-api.us-west-2.amazonaws.com/Dev/GPA_BenQusSave_Lambda";
        let BenQusSave = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/"
        let BenQusJSONData = JSON.stringify({
            QueryName: QName,
            UserID: emailresult,
            HomeAddress: this.state.HomeAddressState,
            PlaceOfBirth: this.state.PlaceBirthState,
            Partner: this.state.PartnerState,
            CountryCode: this.state.CountryState,
            Benefits: this.state.BenefitState,
            BenefitsName: this.state.BenefitsNameState,
            GetBenefits: this.state.GetBenefitsState,
            Receiving: this.state.ReceivingState,
            ReferenceNum: this.state.RefernceState,
            SSSecurity: this.state.SecurityState,
            SSSecurityAddress: this.state.SecurityAddressState,
            DateOfBenefits: this.state.DateBenefits,
            CompanyCode: this.state.EmployerNameState,
            Occupation: this.state.OccupationState,
            IndustryCode: this.state.IndustryState,
            CompanyAddress: this.state.EmployerAddressState,
            EligibleCountry: this.state.CountryallState,
        });
        let AxiosHeaderConfig = {
            headers: {
                //accept: 'application/json',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
                'Content-Type': 'application/json;charset=UTF-8',
                //"Access-Control-Allow-Origin": "*",
            }
        };
        // var isValid = this.handleChangeValidated(this);
        var isValid = true;
        if (isValid) {
            axios({
                method: "POST",
                url: BenQusSave,
                data: BenQusJSONData,
                // headers:AxiosHeaderConfig,

            }).then((data) => {
                if (QName == "BenefitsQuestionnariesCountryInGPASave") {
                    notify.show("Part-I Information Saved Successfully And Continue Part-II Form", "success", 3000);
                    thisObj.handleAppProcessFlowUpdate(this);
                }
                else {
                    notify.show("Part-I Information Updated Successfully", "success", 3000);
                    history.push('/ApplicantDashboard');
                }

            }).catch((err) => {

            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }

    //Edit Function
    handleBenQusEdit(event) {
        var Params = new URLSearchParams(document.location.search);
        let varUserID = Params.get("UserID");
        var thisObj = this;
        if (varUserID != "") {
            let BenSummaryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
            var BenSummarydata = {
                QueryName: "BenefitsQuestionnariesCountryInGPAEdit",
                UserID: emailresult,
            }
            let AxiosHeaderConfig = {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
            axios({
                method: "POST",
                url: BenSummaryAPIUrl,
                data: JSON.stringify(BenSummarydata),
                headers: AxiosHeaderConfig,

            }).then(({ data }) => {
                thisObj.setState({ BtnSave: "Update" });
                for (var i = 0; i < data.length; i++) {
                    thisObj.setState({ HomeAddressState: data[i].HomeAddress });
                    thisObj.setState({ PlaceBirthState: data[i].PlaceOfBirth });
                    thisObj.setState({ PartnerState: data[i].Partner });
                    if (data[i].Partner == "Yes") {
                        thisObj.setState({ CountryState: data[i].CountryCode });
                        if (this.state.CountryState.length > 1) {
                            thisObj.setState({ BenefitState: data[i].Benefits });
                            thisObj.setState({ BenefitsNameState: data[i].BenefitsName });
                            thisObj.setState({ GetBenefitsState: data[i].GetBenefits });
                            thisObj.setState({ ReceivingState: data[i].Receiving });
                            thisObj.setState({ RefernceState: data[i].ReferenceNum });
                            thisObj.setState({ SecurityState: data[i].SSSecurity });
                            thisObj.setState({ SecurityAddressState: data[i].SSSecurityAddress });
                            thisObj.setState({ DateBenefits: data[i].DateOfBenefits })
                        }
                    }
                    thisObj.setState({ EmployerNameState: data[i].CompanyCode });
                    thisObj.setState({ OccupationState: data[i].Occupation });
                    thisObj.setState({ IndustryState: data[i].IndustryCode });
                    thisObj.setState({ EmployerAddressState: data[i].CompanyAddress });
                    thisObj.setState({ CountryallState: data[i].EligibleCountry });
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    /* Form Fields Validation Handling Event*/
    handleChangeValidated(e) {
        const { validationError } = this.state;
        let validForm = false;
        var validPlaceBirthForm = false;
        var validPartnerForm = false;
        var validCountryForm = false;
        var validBenefitsForm = false;
        var validBenefitsNameForm = false;
        var validReceivingForm = false;
        var validEmployerNameForm = false;
        var validEmployerAddressForm = false;
        var validCountryallForm = false;

        if (this.state.PlaceBirthState.length > 0) {
            validationError['Place of Birth'] = false;
            this.setState({ isValidPlaceBirth: false });
            validPlaceBirthForm = true;
        }
        else {
            validationError['Place of Birth'] = true;
            this.setState({ isValidPlaceBirth: true });
            validPlaceBirthForm = false;
        }
        if (this.state.PartnerState != "") {
            validationError['Partner'] = false;
            this.setState({ isValidPartner: false });
            validPartnerForm = true;
        }
        else {
            validationError['Partner'] = true;
            this.setState({ isValidPartner: true });
            validPartnerForm = false;
        }
        if (this.state.PartnerState != "No") {
            if (this.state.CountryState != "") {
                validationError['Country'] = false;
                this.setState({ isValidCountry: false });
                validCountryForm = true;
            }
            else {
                validationError['Country'] = true;
                this.setState({ isValidCountry: true });
                validCountryForm = false;
            }
            if (this.state.CountryState.length > 1) {

                if (this.state.BenefitState != "") {
                    validationError['Benefits'] = false;
                    this.setState({ isValidBenefits: false });
                    validBenefitsForm = true;
                }
                else {
                    validationError['Benefits'] = true;
                    this.setState({ isValidBenefits: true });
                    validBenefitsForm = false;
                }
                if (this.state.BenefitState == "Other") {
                    if (this.state.BenefitsNameState.length > 0) {
                        this.setState({ isValidBenefitsName: false });
                        validBenefitsNameForm = true;
                    }
                    else {
                        this.setState({ isValidBenefitsName: false });
                        validBenefitsNameForm = true;
                    }
                }
                else {
                    this.setState({ isValidBenefitsName: false });
                    validBenefitsNameForm = true;
                }
                if (this.state.ReceivingState != "") {
                    validationError['Receiving'] = false;
                    this.setState({ isValidReceiving: false });
                    validReceivingForm = true;
                }
                else {
                    validationError['Receiving'] = true;
                    this.setState({ isValidReceiving: true });
                    validReceivingForm = false;
                }
            }
            else {
                this.setState({ isValidBenefits: false });
                validBenefitsForm = true;
                this.setState({ isValidBenefitsName: false });
                validBenefitsNameForm = true;
                this.setState({ isValidReceiving: false });
                validReceivingForm = true;
            }
        }
        else {
            this.setState({ isValidCountry: false });
            validCountryForm = true;
            this.setState({ isValidBenefits: false });
            validBenefitsForm = true;
            this.setState({ isValidReceiving: false });
            validReceivingForm = true;
        }
        if (this.state.EmployerNameState != "") {
            validationError['Employer Name'] = false;
            this.setState({ isValidEmployerName: false });
            validEmployerNameForm = true;
        }
        else {
            validationError['Employer Name'] = true;
            this.setState({ isValidEmployerName: true });
            validEmployerNameForm = false;
        }
        if (this.state.EmployerAddressState.length > 0) {
            validationError['Employer Address'] = false;
            this.setState({ isValidEmployerAddress: false });
            validEmployerAddressForm = true;
        }
        else {
            validationError['Employer Address'] = true;
            this.setState({ isValidEmployerAddress: true });
            validEmployerAddressForm = false;
        }
        if (this.state.CountryallState != "") {
            validationError['Country all'] = false;
            this.setState({ isValidCountryall: false });
            validCountryallForm = true;
        }
        else {
            validationError['Country all'] = true;
            this.setState({ isValidCountryall: true });
            validCountryallForm = false;
        }
        if (this.state.PartnerState != "No") {
            if (validReceivingForm && validBenefitsForm && validBenefitsNameForm && validCountryForm) {
                validForm = true;
            }
            else {
                validForm = false;
            }
        }
        else {
            if (validEmployerNameForm && validPlaceBirthForm && validCountryallForm && validPartnerForm && validEmployerAddressForm) {
                validForm = true;
            }
            else {
                validForm = false;
            }
        }
        return validForm;
    }

    /* Page Rendering */
    render() {
        const tooltip = (
            <Tooltip id="tooltip" >
                Name of State Social Security Authority
            </Tooltip>
        );
        const google = window.google;
        return (
            <Paper zDepth={1} className="AdminDashboardDiv">
                <div>
                    <h2 className="legendtitle">Benefits Questionnaires Part-I</h2>
                    <div className="fieldstyle">
                        <Row className="show-grid">
                            <Col xs={12} md={12} className="PanelText">
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={6} className="input-fileds align-fileds" >
                                        <label>Home Address</label>
                                        <Geosuggest
                                            placeholder="Enter Your Home Address"
                                            initialValue={this.state.HomeAddressState}
                                            onSuggestSelect={this.handleSelectSuggest.bind(this)}
                                            onChange={this.handleChangeHomeAddress.bind(this)}
                                            value={this.state.HomeAddressState}
                                            location={new google.maps.LatLng("", "")}
                                            radius="20"
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds align-fileds" >
                                        <label>Place of Birth<span className="manatoryfield">*</span></label>
                                        <Geosuggest
                                            placeholder="Enter Your Home Address"
                                            initialValue={this.state.PlaceBirthState}
                                            onSuggestSelect={this.handleSelectSuggest1.bind(this)}
                                            onChange={this.handleChangePlaceBirth.bind(this)}
                                            value={this.state.PlaceBirthState}
                                            location={new google.maps.LatLng("", "")}
                                            radius="20"
                                        />
                                        <span className="validationmsg">{this.state.validationError["Place of Birth"] ? "Please Choose Your Place of Birth" : null}</span>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} className="Radio_button">
                                        <label>Are you/your partner: • currently receiving any benefits, or • waiting to hear about a claim for any benefits from Social Security Authorities in any country?<span className="manatoryfield">*</span></label>
                                        <RadioButtonGroup valueSelected={this.state.PartnerState} onChange={this.handleChangePartner.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                                {(this.state.PartnerState == "Yes") ?
                                    <div>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Countries you are receiving benefit or waiting to hear from<span className="manatoryfield">*</span></label>
                                                <SelectField
                                                    hintText="Select the Countries"
                                                    value={this.state.CountryState}
                                                    onChange={this.handleChangeCountry.bind(this)}
                                                    multiple={true}
                                                    maxHeight={200}
                                                    errorText={this.state.validationError["Country"] ? "Please Select Your Countries" : null}
                                                >
                                                    {CountryItems}
                                                </SelectField>
                                            </Col>
                                        </Col>
                                        {this.state.CountryState.length > 1 ?
                                            <div>
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                                        <label>Name of Benefit<span className="manatoryfield">*</span></label>
                                                        <SelectField
                                                            hintText="Select the name of benefits"
                                                            value={this.state.BenefitState}
                                                            onChange={this.handleChangeBenefits.bind(this)}
                                                            errorText={this.state.validationError["Benefits"] ? "Please Select Your Benefits Name" : null}
                                                        >
                                                            <MenuItem value={"Retirement / Old-age"} primaryText="Retirement / Old-age" />
                                                            <MenuItem value={"Survivors"} primaryText="Survivors" />
                                                            <MenuItem value={"Disability"} primaryText="Disability" />
                                                            <MenuItem value={"Other"} primaryText="Other " />
                                                        </SelectField>
                                                        {/* <TextField hintText="Enter Your Name of Benefits"
                                                                    floatingLabelText={<span>Name of benefit<span className="manatoryfield">*</span></span>}
                                                                    value={this.state.BenefitState}
                                                                    onChange={this.handleChangeBenefits.bind(this)}
                                                                    errorText={this.state.validationError["Benefits"] ? "Please Enter Your Benefits Name" : null}
                                                                /> */}
                                                    </Col>
                                                    {(this.state.BenefitState == "Other") ?
                                                        <Col xs={12} md={6} className="input-fileds align-fileds" >
                                                            <label>Name of Other Benefits<span className="manatoryfield">*</span></label>
                                                            <TextField hintText="Enter Your Benefits"
                                                                value={this.state.BenefitsNameState}
                                                                onChange={this.handleChangeBenefitsName}
                                                                errorText={this.state.isValidBenefitsName ? "Please Enter Your Benefits Name" : null}
                                                            />
                                                        </Col>
                                                        : ''}
                                                </Col>
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={6}>
                                                        <label>Who is getting this or waiting to hear about this?</label>
                                                    </Col>
                                                    <Col xs={12} md={6} style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Checkbox
                                                            label="You"
                                                            value={this.state.checked}
                                                            onClick={this.handleChangeYouChecked.bind(this)}
                                                            checked={true}
                                                        />
                                                        <Checkbox
                                                            label="Your Partner"
                                                            value={this.state.checked1}
                                                            onClick={this.handleChangePartnerChecked.bind(this)}
                                                        />
                                                    </Col>
                                                </Col>
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={8} className="Radio_button">
                                                        <label>Are you or your partner currently receiving, or waiting to hear about this benefit?<span className="manatoryfield">*</span></label>
                                                        <RadioButtonGroup valueSelected={this.state.ReceivingState} onChange={this.handleChangeReceiving.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                            <RadioButton
                                                                value="Currently receiving"
                                                                label="Currently receiving"
                                                                style={style.radioButton}
                                                            />
                                                            <RadioButton
                                                                value="Waiting to hear about this benefit"
                                                                label="Waiting to hear about this benefit"
                                                                style={style.radioButton}
                                                            />
                                                        </RadioButtonGroup >
                                                    </Col>
                                                </Col>
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                                        <label>Reference number, if known This is on letters about the benefit.</label>
                                                        <TextField hintText="Enter Your Refernce Number"
                                                            value={this.state.RefernceState}
                                                            onChange={this.handleChangeRefernceState}
                                                        />
                                                    </Col>
                                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                                        <label>Name of State Social Security Authority</label>
                                                        <OverlayTrigger placement="top" overlay={tooltip} className="Reg-Tooltip">
                                                            <TextField hintText="Enter Your Name of State Social Security Authority"
                                                                value={this.state.SecurityState}
                                                                onChange={this.handleChangeSecurityState}
                                                            />
                                                        </OverlayTrigger>
                                                    </Col>
                                                </Col>
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                                        <label>Address of State Social Security Authority</label>
                                                        <TextField hintText="Enter Your Address of State Social Security Authority"
                                                            value={this.state.SecurityAddressState}
                                                            onChange={this.handleChangeSecurityAddressState}
                                                        />
                                                    </Col>
                                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                                        <label>Date benefit began (if applicable)</label>
                                                        <DatePicker hintText="Enter Your Date Benefits "
                                                            value={this.state.DateBenefits}
                                                            onChange={this.handleChangeDate}
                                                        />
                                                    </Col>
                                                </Col>
                                            </div>
                                            : ''}
                                    </div>
                                    : ''}
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                        <label>Your Employer's Name while in <b>{this.state.Countryid}</b> (if applicable).<span className="manatoryfield">*</span></label>
                                        <SelectField
                                            hintText="Select the Employer's Name"
                                            value={this.state.EmployerNameState}
                                            onChange={this.handleChangeEmployerNameState.bind(this)}
                                            errorText={this.state.validationError["Employer Name"] ? "Please Select Your Employer's Name" : null}
                                        >
                                            {CompanyItems}
                                        </SelectField>
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                        <label>What was your occupation while in <b>{this.state.Countryid}</b>?</label>
                                        <TextField hintText="Enter Your Occupation"
                                            value={this.state.OccupationState}
                                            onChange={this.handleChangeOccupationState}
                                        />
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                        <label>What was the type of industry or business?</label>
                                        <SelectField
                                            hintText="Select the Industry or Business"
                                            value={this.state.IndustryState}
                                            onChange={this.handleChangeIndustry.bind(this)}
                                            maxHeight={200}
                                        >
                                            {IndustryItems}
                                        </SelectField>
                                    </Col>
                                    <Col xs={12} md={8} className="input-fileds align-fileds">
                                        <label>Your Employer's Address in <b>{this.state.Countryid}</b> (please provide the City and Country at a minimum)<span className="manatoryfield">*</span></label>
                                        <Geosuggest
                                            placeholder="Enter Your Employer's Address"
                                            initialValue={this.state.EmployerAddressState}
                                            onSuggestSelect={this.handleSelectSuggest2.bind(this)}
                                            onChange={this.handleChangeEmployerAddressState.bind(this)}
                                            value={this.state.EmployerAddressState}
                                            location={new google.maps.LatLng("", "")}
                                            radius="20"
                                        />
                                        <span className="validationmsg">{this.state.validationError["Employer Address"] ? "Please Choose Your Employer's Address" : null}</span>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={8} className="input-fileds align-fileds">
                                        <label>If eligible, where would you like your pension benefits deposited (which country)?<span className="manatoryfield">*</span></label>
                                        <SelectField
                                            hintText="Select the Benefits Country"
                                            value={this.state.CountryallState}
                                            onChange={this.handleChangeCountryall.bind(this)}
                                            errorText={this.state.validationError["Country all"] ? "Please Select Your Benefits Country" : null}
                                            maxHeight={200}
                                        >
                                            {CountryItems}
                                        </SelectField>
                                    </Col>
                                </Col>
                                <Row>
                                    <Col xs={12} md={12} className="RegButton">
                                        <Col xs={12} md={10} >

                                        </Col>
                                        <Col xs={12} md={2} className="input-fileds">
                                            <Button type="submit" onClick={this.handleBenQusSave.bind(this)} className="RegButton1">{this.state.BtnSave}</Button>
                                            <Notifications />
                                        </Col>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Paper>
        );
    }

    //Reset Function
    handleReset(e) {
        this.setState({
            search: "",
            search1: "",
            search2: "",
            value: "",
            HomeAddressState: "",
            PlaceBirthState: "",
            PartnerState: 'No',
            CountryState: "",
            BenefitState: "",
            BenefitsNameState: "",
            ReceivingState: "",
            RefernceState: "",
            SecurityState: "",
            SecurityAddressState: "",
            DateBenefits: "",
            EmployerNameState: "",
            OccupationState: "",
            IndustryState: "",
            EmployerAddressState: "",
            YouChecked: false,
            PartnerChecked: false,
            GetBenefitsState: "You",
            validationError: {},
            isValidPlaceBirth: false,
            isValidPartner: false,
            isValidCountry: false,
            isValidBenefits: false,
            isValidBenefitsName: false,
            isValidReceiving: false,
            isValidEmployerName: false,
            isValidEmployerAddress: false,
            isValidCountryall: false,
        });
    }
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(BenefitsQuestionnariePart1);