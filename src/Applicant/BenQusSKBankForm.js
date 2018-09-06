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
let ModeEdit = '';
let CountryItems = [];

const CurrencyItems = [
    <MenuItem value={"CAD"} key={1} primaryText={`CAD`} />,
    <MenuItem value={"USD"} key={2} primaryText={`USD`} />,
    <MenuItem value={"HKD"} key={3} primaryText={`HKD`} />,
    <MenuItem value={"JPY"} key={4} primaryText={`JPY`} />,
    <MenuItem value={"GBP"} key={1} primaryText={`GBP`} />,
    <MenuItem value={"CHF"} key={2} primaryText={`CHF`} />,
    <MenuItem value={"AUD"} key={3} primaryText={`AUD`} />,
    <MenuItem value={"INR"} key={4} primaryText={`INR`} />,
    <MenuItem value={"EUR"} key={1} primaryText={`EUR`} />,
    <MenuItem value={"NZD"} key={2} primaryText={`NZD`} />,
    <MenuItem value={"DKK"} key={3} primaryText={`DKK`} />,
    <MenuItem value={"SEK"} key={4} primaryText={`SEK`} />,
    <MenuItem value={"SGD"} key={1} primaryText={`SGD`} />,
    <MenuItem value={"NOK"} key={2} primaryText={`NOK`} />,
    <MenuItem value={"THB"} key={3} primaryText={`THB`} />,

];

var emailresult;

class BenQusSKBankForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //contributor
            FullName: '',
            KoreanNINNumber: '',
            SocialSecurityNumber: '',
            Nationality: '',
            MailingAddress: '',
            ZipCode: '',
            TelephoneNumber: '',
            EmailAddress: 'govservices@globalpensionassociates.com',
            //Applicant
            ApplicantFullName: '',
            ApplicantNINNumber: '',
            ApplicantMailingAddress: '',
            ApplicantTelephoneNumber: '',
            ApplicantSocialSecurityNumber: '',

            //Method of Payment
            PaymentMode: '',
            TelgraphicTransfer: '',
            DemandDraft: '',

            //Beneficiary
            Contributor: '',
            Applicant: '',
            AccountHolderState: '',
            BeneficiaryState: '',

            //financial institution
            CountryState: '',
            BankNameCode: '',
            BankAddressState: '',
            BNFAccountNumberState: '',

            //intermediary bank
            IntermediaryBankNameState: '',
            IntermediaryBankCodeState: '',
            CurrencyState: '',
            DateofApplicationState: '',
            ApplicantNameState: '',
            Accept: false,

            //bankform Validation 
            isValidFullName: false,
            isValidKoreanNINNumber: false,
            isValidSocialSecurityNumber: false,
            isValidNationality: false,
            isValidMailingAddress: false,
            isValidZipCode: false,
            isValidTelephoneNumber: false,
            isValidEmailAddress: false,
            isValidApplicantFullName: false,
            isValidApplicantNINNumber: false,
            isValidApplicantTelephoneNumber: false,
            isValidApplicantMailingAddress: false,
            isValidApplicantSocialSecurityNumber: false,
            isValidPaymentMode: false,
            isValidBeneficiary: false,
            isValidAccountHolder: false,
            isValidCountry: false,
            isValidBanKName: false,
            isValidBanKAddress: false,
            isValidBNFAccountNumber: false,
            isValidIntermediaryBankName: false,
            isValidCurrency: false,
            isValidDateofApplication: false,
            isValidSignature: false,
            isValidApplicantName: false,
            isValidIntermediaryBankCode: false,
            isValidAcceptance: false,
            isChecked: false



        }
    }

    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');

        var Params = new URLSearchParams(document.location.search);
        var Mode = Params.get("Mode");
        ModeEdit = Mode;
        console.log("ModeEdit------>", ModeEdit);
        let Countryvalue = Params.get("CountryCode")
        if (Params != null || Params != "") {
            if (Mode != null || Mode != "") {
                if (Mode == "E" && Countryvalue == "KR") {
                    this.handleBankFormKREdit(this);
                    this.handleChangeAutopopulated(this);
                    this.handleLoadCountry(this);
                }
                else {
                    this.handleChangeAutopopulated(this);
                    this.handleLoadCountry(this);
                }
            }
            else {
                this.handleChangeAutopopulated(this);
                this.handleLoadCountry(this);
            }
        }
        else {
            this.handleChangeAutopopulated(this);
            this.handleLoadCountry(this);
        }
    }



    handleBankFormKREdit() {
        var thisObj = this;
        let DataURLPension = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var dataURL = {
            QueryName: "SKBankDataAutoPopulate",
            UserID: emailresult,
            CountryCode: "KR"
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
                let JSONData = JSON.parse(item.BankFormInJsonObj);
                let imgURL = JSONData.Signature;
                console.log("Image URL", imgURL);
                this.signaturePad.fromDataURL(imgURL),
                    thisObj.setState({
                        PaymentMode: JSONData.PaymentMode,
                        AccountHolderState: JSONData.AccountHolderState,
                        CountryState: JSONData.CountryState,
                        BankNameCode: JSONData.BankNameCode,
                        BankAddressState: JSONData.BankAddress,
                        BNFAccountNumberState: JSONData.BNFAccountNumberState,
                        IntermediaryBankNameState: JSONData.IntermediaryBankNameState,
                        IntermediaryBankCodeState: JSONData.IntermediaryBankCodeState,
                        CurrencyState: JSONData.CurrencyState,
                        DateofApplicationState: new Date(JSONData.DateofApplicationState),
                        ApplicantNameState: this.state.ApplicantNameState,
                        isChecked: JSONData.Accept
                    });
            }
            );
        }).catch((err) => {

        });
    }




    handleChangePaymentMode = (event) => {
        this.setState({ PaymentMode: event.target.value }, () => { console.log("PaymentMode", this.state.PaymentMode) });
    }

    handleChangeAccountHolder(event) {
        this.setState({ AccountHolderState: event.target.value }, () => { console.log("AccountHolderState", this.state.AccountHolderState) });
    }

    //finincal Institution
    handleChangeCountry(e, index, value) {
        this.setState({ CountryState: value }, () => { console.log("Country state", this.state.CountryState) });
    }

    handleChangeBankName(event) {
        this.setState({ BankNameCode: event.target.value }, () => { console.log("BankNameCode", this.state.BankNameCode) });
    }

    handleChangeBankAddress = (value) => {
        this.setState({ BankAddressState: value }, () => { console.log("BankAddressState", this.state.BankAddressState) });
    };


    handleChangeBNFAccountNumber(event) {
        this.setState({ BNFAccountNumberState: event.target.value }, () => { console.log("BNFAccountNumberState", this.state.BNFAccountNumberState) });
    }


    //Intermediary Bank

    handleChangeIntermediaryBankName(event) {
        this.setState({ IntermediaryBankNameState: event.target.value }, () => { console.log("IntermediaryBankNameState", this.state.IntermediaryBankNameState) });
    }

    handleChangeIntermediaryBankCode(event) {
        this.setState({ IntermediaryBankCodeState: event.target.value }, () => { console.log("IntermediaryBankCodeState", this.state.IntermediaryBankCodeState) });
    }

    //Cuurency

    handleChangeCurrency(event, index, value) {
        this.setState({ CurrencyState: value }, () => { console.log("CurrencyState", this.state.CurrencyState) });
    };

    handleChangeDateofApplication(event, date) {
        this.setState({ DateofApplicationState: date });
    };



    handleChangeApplicantName(event) {
        this.setState({ ApplicantNameState: event.target.value });
    }


    // handleChangeName(event) {
    // this.setState({ NameState: event.target.value });
    // };

    handleCheck() {
        if (this.state.Accept == false || this.state.Accept == '') {
            this.setState({ Accept: true, isChecked: true }, () => { console.log("Ischecked", this.state.Accept) });
        }
        else {
            this.setState({ Accept: false, isChecked: false }, () => { console.log("Ischecked", this.state.Accept) });
        }
    };


    onSuggestSelect(suggest) {
        if (suggest) {
            this.setState({ BankAddressState: suggest.description }, () => { console.log("BankAddressState", this.state.BankAddressState) });
        }
    };


    handleSignatureClear = (e) => {
        this.signaturePad.clear();
    };


    handleValidation(event) {
        let validForm;


        let validPaymentMode = false;
        let validAccountHolder = false;
        let validCountry = false;
        let validBanKName = false;
        let validBanKAddress = false;
        let validBNFAccountNumber = false;
        let validIntermediaryBankName = false;
        let validIntermediaryBankCode = false;
        let validCurrency = false;
        let validDateofApplication = false;
        let validApplicantName = false;
        let validSignature = false;
        let validAcceptance = false;


        if (this.state.Accept == true) {
            this.setState({ isValidAcceptance: false })
            validAcceptance = true;
        }
        else {
            this.setState({ isValidAcceptance: true })
            validAcceptance = false;
        }

        if (this.state.PaymentMode != "") {
            this.setState({ isValidPaymentMode: false })
            validPaymentMode = true;
        }
        else {
            this.setState({ isValidPaymentMode: true })
            validPaymentMode = false;
        }

        if (this.state.AccountHolderState != "") {
            this.setState({ isValidAccountHolder: false })
            validAccountHolder = true;
        }
        else {
            this.setState({ isValidAccountHolder: true })
            validAccountHolder = false;
        }

        if (this.state.CountryState != "") {
            this.setState({ isValidCountry: false })
            validCountry = true;
        }
        else {
            this.setState({ isValidCountry: true })
            validCountry = false;
        }

        if (this.state.BankNameCode != "") {
            this.setState({ isValidBanKName: false })
            validBanKName = true;
        }
        else {
            this.setState({ isValidBanKName: true })
            validBanKName = false;
        }
        if (this.state.BankAddressState != "") {
            this.setState({ isValidBanKAddress: false })
            validBanKAddress = true;
        }
        else {
            this.setState({ isValidBanKAddress: true })
            validBanKAddress = false;
        }

        if (this.state.BNFAccountNumberState != "") {
            this.setState({ isValidBNFAccountNumber: false })
            validBNFAccountNumber = true;
        }
        else {
            this.setState({ isValidBNFAccountNumber: true })
            validBNFAccountNumber = false;
        }


        if (this.state.IntermediaryBankNameState != "") {
            this.setState({ isValidIntermediaryBankName: false })
            validIntermediaryBankName = true;
        }
        else {
            this.setState({ isValidIntermediaryBankName: true })
            validIntermediaryBankName = false;
        }

        if (this.state.IntermediaryBankCodeState != "") {
            this.setState({ isValidIntermediaryBankCode: false })
            validIntermediaryBankCode = true;
        }
        else {
            this.setState({ isValidIntermediaryBankCode: true })
            validIntermediaryBankCode = false;
        }

        if (this.state.CurrencyState != "") {
            this.setState({ isValidCurrency: false })
            validCurrency = true;
        }
        else {
            this.setState({ isValidCurrency: true })
            validCurrency = false;
        }

        if (this.state.ApplicantNameState != "") {
            this.setState({ isValidApplicantName: false })
            validApplicantName = true;
        }
        else {
            this.setState({ isValidApplicantName: true })
            validApplicantName = false;
        }

        if (this.state.DateofApplicationState != "") {
            this.setState({ isValidDateofApplication: false })
            validDateofApplication = true;
        }
        else {
            this.setState({ isValidDateofApplication: true })
            validDateofApplication = false;
        }

        if (this.signaturePad.isEmpty()) {
            console.log("Empty");
            this.setState({ isValidSignature: true });
            validSignature = false;
        }
        else {
            console.log(" Not Empty");
            this.setState({ isValidSignature: false });
            validSignature = true;
        }

        if (validPaymentMode && validAccountHolder && validBanKName && validCountry
            && validBNFAccountNumber && validIntermediaryBankName && validIntermediaryBankCode
            && validDateofApplication && validApplicantName && validSignature && validCurrency
            && validBanKAddress && validAcceptance) {
            validForm = true;
        }
        else {
            validForm = false;
        }

        return validForm;
    }


    handleBenQusSaveBankForm(event) {
        var ApplicantSignatureBase64 = this.signaturePad.toDataURL();
        emailresult = localStorage.getItem('applicant_email');
        var isValid = this.handleValidation(this);
        console.log("Success ", isValid);
        if (isValid) {
            let QName;
            if (ModeEdit == "E") {
                QName = "SouthKoreaBankFormUpdate"
            } else {
                QName = "SouthKoreaBankFormSave"
            }
            let BankFormDataURL = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
            let BankFormJSONData = {
                QueryName: QName,
                UserID: emailresult,//"spurthi.n@mitosistech.com",
                //UserID: emailresult,
                CountryCode: "KR",
                BankFormInJsonObj: {
                    FullName: this.state.FullName,
                    KoreanNINNumber: this.state.KoreanNINNumber,
                    SocialSecurityNumber: this.state.SocialSecurityNumber,
                    Nationality: this.state.Nationality,
                    MailingAddress: this.state.MailingAddress,
                    ZipCode: this.state.ZipCode,
                    TelephoneNumber: this.state.TelephoneNumber,
                    EmailAddress: this.state.EmailAddress,
                    ApplicantFullName: this.state.ApplicantFullName,
                    ApplicantNINNumber: this.state.ApplicantNINNumber,
                    ApplicantMailingAddress: this.state.ApplicantMailingAddress,
                    ApplicantTelephoneNumber: this.state.ApplicantTelephoneNumber,
                    ApplicantSocialSecurityNumber: this.state.ApplicantSocialSecurityNumber,
                    PaymentMode: this.state.PaymentMode,
                    BeneficiaryState: this.state.BeneficiaryState,
                    AccountHolderState: this.state.AccountHolderState,
                    CountryState: this.state.CountryState,
                    BankNameCode: this.state.BankNameCode,
                    BankAddress: this.state.BankAddressState,
                    BNFAccountNumberState: this.state.BNFAccountNumberState,
                    IntermediaryBankNameState: this.state.IntermediaryBankNameState,
                    IntermediaryBankCodeState: this.state.IntermediaryBankCodeState,
                    CurrencyState: this.state.CurrencyState,
                    DateofApplicationState: this.state.DateofApplicationState,
                    Accept: this.state.Accept,
                    Signature: ApplicantSignatureBase64
                }
            }
            console.log(JSON.stringify(BankFormJSONData));

            SaveDataAPICallMailSend(BankFormDataURL, BankFormJSONData)
                .then((data) => {
                    console.log("Bank Form Data Saved In DB", data);
                    if (ModeEdit == "E") {
                        notify.show("Updated successfully", "success", 3000);
                    } else {
                        notify.show("Bank Form data saved successfully", "success", 3000);
                    }
                    this.handleGeneratePdf(this);
                }).catch((err) => {
                    console.log(err);
                });

        }
    }

    // AppDoc Table Insertion.
    handleAppDocTrackEntry(SouthKoreaBankEmpID, DocID, ) {
        let Docurl = " https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DocIDData = {
            QueryName: "BankFormAppDocTrackingInsert",
            UserID: emailresult,//"spurthi.n@mitosistech.com",            
            DocumentID: DocID,
            DocumentCode: SouthKoreaBankEmpID,
            CountryCode: "KR",//this.state.CountryCode,
            //IsSend: "NR",
            SendDate: new Date(),
            DownloadBankFormLink: "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/" + emailresult + "/" + "bank_kr_ko.pdf",
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
    // End Of AppDoc Table Insertion.

    // Redirect Function.
    handleRedirect(e) {
        history.push('/ApplicantDashboard');
    }
    // End Of Redirect Function.

    // Bank Form Document ID Generation.
    handleGenerateBankDocID(e) {
        let Docurl = " https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DocIDData = {
            QueryName: "BankDocIDGenerate",
            UserID: emailresult,//emailresult,
        };
        SaveDataAPICallMailSend(Docurl, DocIDData)
            .then((data) => {
                console.log("Successfully generated document ID", data);
                this.handleAppDocTrackEntry(data[0].SouthKoreaBankEmpID, data[0].DocumentID);
            }).catch((err) => {
                console.log(err);
            });
    }
    // End Of BankForm Generation.


    // bank form generation.
    handleGeneratePdf(e) {
        let SaveDataFormURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";
        let SavePensiondata = ({
            "html": "This is test Data",
            "DocCategory": "bankform",
            "countryCode": "kr", //this.state.CountryCode.toLowerCase()
            "language": "ko",
            "params": {
                "empId": emailresult,
                "bankdata": {
                    FullName: [this.state.FullName],
                    KoreanNationalNumber1: [this.state.KoreanNINNumber],
                    KoreanNationalNumber2: [this.state.KoreanNINNumber],
                    //SocialSecurityNumber: this.state.SocialSecurityNumber,
                    Nationality: [this.state.Nationality],
                    MailingAddress: [this.state.MailingAddress],
                    ZipCode: [this.state.ZipCode],
                    TelephoneNumber: [this.state.TelephoneNumber],
                    EmailAddress: [this.state.EmailAddress],
                    ApplicantFullName: [this.state.ApplicantFullName],
                    ApplicantKoreanNINNumber2: [this.state.ApplicantNINNumber],
                    ApplicantKoreanNINNumber1: [this.state.ApplicantNINNumber],
                    ApplicantMailingAddress: [this.state.ApplicantMailingAddress],
                    ApplicantTelephoneNumber: [this.state.ApplicantTelephoneNumber],
                    ApplicantSecurityNumber: [this.state.ApplicantSocialSecurityNumber],
                    //PaymentMode: this.state.PaymentMode,
                    //BeneficiaryState: this.state.BeneficiaryState,
                    Accountholder: [this.state.AccountHolderState],
                    Country: [this.state.CountryState],
                    BankNameCode: [this.state.BankNameCode],
                    BankAddress: [this.state.BankAddressState],
                    BNFsAccountNumber: [this.state.BNFAccountNumberState],
                    BankName: [this.state.IntermediaryBankNameState],
                    BankCode: [this.state.IntermediaryBankCodeState],
                    Currency: [this.state.CurrencyState],
                    DateofApplication: [this.state.DateofApplicationState],
                }
            }
        });
        console.log("SavePensiondata" + JSON.stringify(SavePensiondata));
        SaveDataAPICallMailSend(SaveDataFormURL, SavePensiondata)
            .then((data) => {
                console.log("Successfully PDF generated", data);
                this.handleGenerateBankDocID(this);
            }).catch((err) => {
                console.log(err);
            });
    }
    // end of bank form generation.

    handleLoadCountry(event) {
        let LoadCountryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            { QueryName: "Countries" }
        );
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: LoadCountryAPIUrl,
            headers: AxiosHeaderConfig

        }).then(({ data }) => {
            CountryItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                CountryItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
            }
        }).catch((err) => {
        })
    }

    handleChangeAutopopulated(e) {
        var thisObj = this;
        let UserID;
        let BenQusAutopopulatedAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusAutopopulatedJSONData = JSON.stringify({
            QueryName: "SouthKoreaLumpSumAutoPopulate",
            UserID: emailresult, //"balakumaran.n@mitosistech.com",
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
                    ApplicantNameState: data[i].FirstName + " " + data[i].LastName,
                    KoreanNINNumber: data[i].PersonalIDNum,
                    SocialSecurityNumber: data[i].PersonalIDNum,
                    Nationality: data[i].CountryOfCitizenship,
                    TelephoneNumber: data[i].HomeNum,
                    MailingAddress: data[i].MailingAddress,
                    ApplicantFullName: data[i].FirstName + " " + data[i].LastName,
                    ApplicantNINNumber: data[i].PersonalIDNum,
                    ApplicantMailingAddress: data[i].MailingAddress,
                    ApplicantTelephoneNumber: data[i].HomeNum,
                    ApplicantSocialSecurityNumber: data[i].PersonalIDNum,

                })

                this.setState({
                    DateofApplicationState: new Date()

                })
            }
        }).catch((err) => {

        })
    }

    render() {
        const google = window.google;
        return (
            <div>
                <Paper zDepth={0} className="CommonDiv3">
                    <h2 className="legendtitle">South Korea Bank Form</h2>
                    <div className="fieldstyle">
                        <Row className="show-grid" className="overall">
                            <Col xs={12} md={12}>
                                <Col xs={12} md={12}>
                                    <h4 className="ColorStyle"><b>Bank Form Details</b></h4>
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="Radio_button ">
                                    <label>What is your preferred method of payment<span className="manatoryfield">*</span></label>
                                    <RadioButtonGroup valueSelected={this.state.PaymentMode} onChange={this.handleChangePaymentMode.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                        <RadioButton
                                            value="Telegraphic Transfer"
                                            label="Telegraphic Trnasfer"
                                            style={style.radioButton}
                                        />
                                        <RadioButton
                                            value="Demand Draft"
                                            label="Demand Draft"
                                            style={style.radioButton}
                                        />
                                    </RadioButtonGroup >
                                    <span className="validationmsg">{this.state.isValidPaymentMode ? "Please select Mode of Payment" : null}</span>
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                    <label>Name of Account Holder<span className="manatoryfield">*</span></label>
                                    <TextField hintText="Enter your Account Holder Name"
                                        value={this.state.AccountHolderState}
                                        onChange={this.handleChangeAccountHolder.bind(this)}
                                        errorText={this.state.isValidAccountHolder ? "Please enter your Account Number" : null}
                                    />
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={12}>
                                    <h4 className="ColorStyle"><b>Financial Institution Details</b></h4>
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                    <label>Country<span className="manatoryfield">*</span></label>
                                    <SelectField
                                        maxHeight={300}
                                        defaultValue={this.state.CountryState}
                                        hintText="Select the Country of Residency"
                                        value={this.state.CountryState}
                                        onChange={this.handleChangeCountry.bind(this)}
                                        errorText={this.state.isValidCountry ? "Please Select Your Country of Residency" : null}
                                    >
                                        {CountryItems}
                                    </SelectField>
                                </Col>
                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                    <label>Bank Name,code (Please include bank's branch name)<span className="manatoryfield">*</span></label>
                                    <TextField hintText="Enter your Bank name"
                                        value={this.state.BankNameCode}
                                        onChange={this.handleChangeBankName.bind(this)}
                                        errorText={this.state.isValidBanKName ? "Please enter your Bank name" : null}
                                    />
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                    <label>Bank Address<span className="manatoryfield">*</span></label>
                                    <Geosuggest
                                        placeholder="Enter your Bank Address"
                                        initialValue={this.state.BankAddressState}
                                        onSuggestSelect={this.onSuggestSelect.bind(this)}
                                        onChange={this.handleChangeBankAddress}
                                        value={this.state.BankAddressState}
                                        location={new google.maps.LatLng("", "")}
                                        radius="20"
                                    />
                                    <span className="validationmsg">{this.state.isValidBanKAddress ? "Please Choose Your Bank Address" : null}</span>
                                </Col>
                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                    <label>BNF's Account Number<span className="manatoryfield">*</span></label>
                                    <TextField hintText="Enter your Account Number"
                                        value={this.state.BNFAccountNumberState}
                                        onChange={this.handleChangeBNFAccountNumber.bind(this)}
                                        errorText={this.state.isValidBNFAccountNumber ? "Please enter your Account Number" : null}
                                    />
                                </Col>
                            </Col>

                            <Col xs={12} md={12}>
                                <Col xs={12} md={12}>
                                    <h4 className="ColorStyle"><b>Intermediary Bank Details</b></h4>
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                    <label>Bank Name<span className="manatoryfield">*</span></label>
                                    <TextField hintText="Enter your Bank name"
                                        value={this.state.IntermediaryBankNameState}
                                        onChange={this.handleChangeIntermediaryBankName.bind(this)}
                                        errorText={this.state.isValidIntermediaryBankName ? "Please enter your account number" : null}
                                    />
                                </Col>
                                <Col xs={12} md={6} className="input-fileds align-fileds">
                                    <label>Bank Code<span className="manatoryfield">*</span></label>
                                    <TextField hintText="Enter your Bank code"
                                        value={this.state.IntermediaryBankCodeState}
                                        onChange={this.handleChangeIntermediaryBankCode.bind(this)}
                                        errorText={this.state.isValidIntermediaryBankCode ? "Please enter your Bank code" : null}
                                    />
                                </Col>
                            </Col>

                            <Col xs={12} md={12}>
                                <Col xs={12} md={12} className="input-fileds align-fileds">
                                    <label>What is your preferred currency for payment (select one below) <i> (In certain circumstances, payment may be made in USD. (If applicant chooses INR(India currency), cross currency fee (per USD 20) will be borne by the applicant.)  </i><span className="manatoryfield">*</span></label>
                                    <SelectField
                                        hintText="Select the Currency"
                                        value={this.state.CurrencyState}
                                        onChange={this.handleChangeCurrency.bind(this)}
                                        maxHeight={200}
                                        errorText={this.state.isValidCurrency ? "Please Select Your Currency" : null}
                                    >
                                        {CurrencyItems}
                                    </SelectField>
                                </Col>

                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={12} className="Checkalign">
                                            <Checkbox
                                                checked={this.state.isChecked}
                                                label="I hereby apply for overseas remittance as above, and hereby declare that I comply with the General Terms and Conditions of Overseas Remittance."
                                                value={this.state.Accept}
                                                onClick={this.handleCheck.bind(this)}
                                                style={styles.checkbox} />
                                        </Col>
                                        <span className="validationmsg">{this.state.isValidAcceptance ? "Please tik the checkbox" : null}</span>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                        <label>Date of Application<span className="manatoryfield">*</span></label>
                                        <DatePicker hintText="Select the Date of Application "
                                            value={this.state.DateofApplicationState}
                                            onChange={this.handleChangeDateofApplication.bind(this)}
                                            errorText={this.state.isValidDateofApplication ? "Please select your date of Appliaction" : null}
                                        />
                                    </Col>
                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                        <label>Aplicant Name<span className="manatoryfield">*</span></label>
                                        <TextField hintText="Enter your Applicant Name"
                                            value={this.state.ApplicantNameState}
                                            onChange={this.handleChangeApplicantName.bind(this)}
                                            errorText={this.state.isValidApplicantName ? "Please enter your Applicant name" : null}
                                        />
                                    </Col>
                                    <Col xs={12} md={4} className="input-fileds align-fileds">
                                        <label ><b>Signature</b></label>
                                        <SignaturePad ref={ref => this.signaturePad = ref} />
                                        <Button id="clear" className="ClearBtn" onClick={this.handleSignatureClear.bind(this)}>Clear</Button>
                                        <span className="validationmsg">{this.state.isValidSignature ? "Please sign your signature" : ""}</span>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    {ModeEdit == 'E' ?
                                        <Col xs={12} md={12} className="input-fields">
                                            <Button onClick={this.handleBenQusSaveBankForm.bind(this)} className="RQ-Add" >Update</Button>
                                            <Notifications />
                                        </Col>
                                        : <Col xs={12} md={12} className="input-fields">
                                            <Button onClick={this.handleBenQusSaveBankForm.bind(this)} className="RQ-Add" >Save</Button>
                                            <Notifications />
                                        </Col>
                                    }
                                </Col>
                            </Col>
                        </Row>
                    </div>
                </Paper>
            </div >
        )
    }
}

const SaveDataAPICallMailSend = function (mailSendURL, data) {
    var promise = new Promise(function (resolve, reject) {
        axios({
            method: "POST",
            url: mailSendURL,
            data: JSON.stringify(data),

        }).then(({ data }) => {
            // console.log("Deva::", data);
            resolve(data);
        })
            .catch((err) => {
                console.log("DATA ", err);
                reject(err);
            });
    })
    return promise;
}
export default BenQusSKBankForm;