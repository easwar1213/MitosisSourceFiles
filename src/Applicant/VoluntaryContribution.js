import React, { Component } from 'react';

//CSS
import '../Style/style.css';

//API Calling Method
import axios from 'axios';
//Bootstrap Component
import { Col, Row, Button, Modal, Form, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import SignaturePad from 'react-signature-pad';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import EmployeeIcon from 'material-ui/svg-icons/action/description';
import BackIcon from 'material-ui/svg-icons/content/reply';

//Notification 
import Notifications, { notify } from 'react-notify-toast';

//Routing
import history from '../Routing/history';

//Google Address 
import Geosuggest from 'react-geosuggest';

const style = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
        marginTop: 8
    },
};
// moment object initialization.

var moment = require('moment')
var current_date;
var emailresult;
var applicantOtherSurname;
var applicantFirstName;
var applicantTitleDropdown;
var applicantmaritalstatus;
var applicantNationalInsno;
var applicantDOB;
var applicantAddress;
var applicant_homeno;
var applicant_mobno;





class Aboutus extends Component {
    constructor() {
        super();
        const maxDate = new Date();
        this.state = {
            BtnName: "Save",
            StartDateState: '',
            AccountholderState: '',
            amountOfVoluntaryContribute: '',
            SocietyaccountnumberState: '',
            BranchcodeState: '',
            BankaddressState: '',
            ReferenceState: '',
            DateState: '',
            PayDebitState: '',
            ChildbenefitState: '',
            maxDate: maxDate,
            isValidStartDate: false,
            isValidAccountholder: false,
            isValidSocietyaccountnumber: false,
            isValidBranchcode: false,
            isValidBankaddress: false,
            isValidReference: false,
            isValidmaxDate: false,
            isValidPayDebit: false,
            isValidChildbenefit: false,
        }

    }
    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
    }

    handleChangeStartDate(e, date) {
        this.setState({ StartDateState: date });
    };
    handleChangeAccountholder(e) {
        // const Financial = e.target.value.replace(/[^A-z]/g, '');
        // if (Financial.length < 25) {
        //     this.setState({ AccountholderState: Financial });
        // }  
        this.setState({ AccountholderState: e.target.value });        
    };
    handleChangeAmtOfVC(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 7) {
            this.setState({ amountOfVoluntaryContribute: onlyNums });
        }        
    };
    handleChangeSocietyaccountnumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            this.setState({ SocietyaccountnumberState: onlyNums });
        }    
        //this.setState({ SocietyaccountnumberState: e.target.value });
    };
    handleChangeBranchcode(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 7) {
            this.setState({ BranchcodeState: onlyNums });
        }   
        //this.setState({ BranchcodeState: e.target.value });
    };
    handleChangeBankaddress=(value) => {
        this.setState({ BankaddressState: value });
    };
    // handleChangeAddress = (value) => {
    //     this.setState({ Address: value })
    // };
    handleSelectSuggest(suggest) {
        if (suggest) {
            this.setState({ BankaddressState: suggest.description })
        }
    };
    handleChangeReference(e) {
        const AnotherPSign = e.target.value.replace(/[^0-9]/g, '');
        if (AnotherPSign.length < 10) {
            this.setState({ ReferenceState: AnotherPSign });
        } 
        //this.setState({ ReferenceState: AnotherPSign });        
    };
    handleSignatureClear = (e) => {
        this.signaturePad.clear();
    };
    // handleChangeDate(e,date){
    //     const { validationError } = this.state;
    //     this.setState({ DateState: date }, function () {
    //         current_date = moment(new Date()).format('MM/DD/YYYY');
    //         alert(current_date);
    //         if (current_date > this.state.DateState||this.state.DateState > current_date) {

    //             this.setState({ ValidateYearWorked1: true });
    //         } else {
    //             this.setState({ ValidateYearWorked1: false });
    //         }
    //     });
    //         this.setState({DateState:date});                
    // };
    handleChangePayDebit(e) {
        this.setState({ PayDebitState: e.target.value });
    };
    handleChangeChildbenefit(e) {
        this.setState({ ChildbenefitState: e.target.value });
    };



    handleValidateForm(e) {
        let validForm = false;
        var validSignatureForm = false;
        var validStartDateForm = false;
        var validAccountholderForm = false;
        var validSocietyaccountnumberForm = false;
        var validBranchcodeForm = false;
        var validBankaddressForm = false;
        var validReferenceForm = false;
        var validPayDebitForm = false;
        var validChildbenefitForm = false;
        var validmaxDateForm = false;
        var validamountOfVform = false;

        if (this.state.StartDateState != "") {
            this.setState({ isValidStartDate: false });
            validStartDateForm = true;
        }
        else {
            this.setState({ isValidStartDate: true });
            validStartDateForm = false;
        }
        if (this.state.amountOfVoluntaryContribute != "") {
            this.setState({ isValidamountOfVC: false });
            validamountOfVform = true;
        }
        else {
            this.setState({ isValidamountOfVC: true });
            validamountOfVform = false;
        }
        if (this.state.AccountholderState != "") {
            this.setState({ isValidAccountholder: false });
            validAccountholderForm = true;
        }
        else {
            this.setState({ isValidAccountholder: true });
            validAccountholderForm = false;
        }
        if (this.state.SocietyaccountnumberState != "") {
            this.setState({ isValidSocietyaccountnumber: false });
            validSocietyaccountnumberForm = true;
        }
        else {
            this.setState({ isValidSocietyaccountnumber: true });
            validSocietyaccountnumberForm = false;
        }
        if (this.state.BranchcodeState != "") {
            this.setState({ isValidBranchcode: false });
            validBranchcodeForm = true;
        }
        else {
            this.setState({ isValidBranchcode: true });
            validBranchcodeForm = false;
        }
        if (this.state.BankaddressState != "") {
            this.setState({ isValidBankaddress: false });
            validBankaddressForm = true;
        }
        else {
            this.setState({ isValidBankaddress: true });
            validBankaddressForm = false;
        }
        if (this.state.ReferenceState != "") {
            this.setState({ isValidReference: false });
            validReferenceForm = true;
        }
        else {
            this.setState({ isValidReference: true });
            validReferenceForm = false;
        }
        if (this.signaturePad.isEmpty()) {
            this.setState({ isValidSignature: true });
            validSignatureForm = false;
        }
        else {
            this.setState({ isValidSignature: false });
            validSignatureForm = true;
        }
        if (this.state.maxDate != "") {
            this.setState({ validmaxDateForm: false });
            validmaxDateForm = true;
        }
        else {
            this.setState({ isValidmaxDate: true });
            validmaxDateForm = false;
        }
        if (this.state.PayDebitState != "") {
            this.setState({ isValidPayDebit: false });
            validPayDebitForm = true;
        }
        else {
            this.setState({ isValidPayDebit: true });
            validPayDebitForm = false;
        }
        if (this.state.ChildbenefitState != "") {
            this.setState({ isValidChildbenefit: false });
            validChildbenefitForm = true;
        }
        else {
            this.setState({ isValidChildbenefit: true });
            validChildbenefitForm = false;
        }


        if (validStartDateForm && validAccountholderForm && validSocietyaccountnumberForm && validBranchcodeForm && validBankaddressForm
            && validReferenceForm && validSignatureForm && validPayDebitForm && validChildbenefitForm && validmaxDateForm) {
            validForm = true;
        } else {
            validForm = false;
        }
        return validForm;
    }

    //Save 
    handleVoluntrySave(e) {
        emailresult = localStorage.getItem('applicant_email');
        var isValid = this.handleValidateForm(this);
        if (isValid) {
            let VolConJSONDataUrl = "https://4k73oeispk.execute-api.us-west-2.amazonaws.com/dev/GPA_BenQusDatas_Lambda";
            let VolConJSONData = {
                QueryName: "VolContributeSave",
                UserID: emailresult,//emailresult,
                CountryCode: "UK", //this.state.CountryCode
                VolAnsInJsonObj: {
                    StartDateState: this.state.StartDateState,
                    AccountholderState: this.state.AccountholderState,
                    SocietyaccountnumberState: this.state.SocietyaccountnumberState,
                    BranchcodeState: this.state.BranchcodeState,
                    BankaddressState: this.state.BankaddressState,
                    ReferenceState: this.state.ReferenceState,
                    DateState: this.state.maxDate, //this.state.DateState,
                    PayDebitState: this.state.PayDebitState,
                    ChildbenefitState: this.state.ChildbenefitState,
                }
            };
            console.log(JSON.stringify(VolConJSONData));           
            SaveDataAPICallMailSend(VolConJSONDataUrl, VolConJSONData)
                .then((data) => {
                    console.log("Data Saved In DB");
                    notify.show("Voluntry Contribution data saved successfully", "success", 3000);
                    let VolContributeUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
                    let VolUpdateJSONData = {
                        QueryName : "UpdateVolContributeStatus",
                        UserID : emailresult
                    }
                    console.log("volupdatedata", JSON.stringify(VolUpdateJSONData));
                    SaveDataAPICallMailSend(VolContributeUrl,VolUpdateJSONData)
                                            .then((data) => {
                                                console.log("Appflow data updated successfully",data);
                                            }).catch((err) => {
                                                console.log(err);
                                            });     
                    let GeneralQuestionariesApi = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
                    let GeneralQuestionnariesData = {
                        UserID : emailresult,
                        QueryName: "GenInfo",               
                    } 
                SaveDataAPICallMailSend(GeneralQuestionariesApi, GeneralQuestionnariesData)
                .then((data) => {
                    data.map((item, key) => {
                                if(item.CountryOfCitizenship=="UK"){                                       
                                             applicantFirstName = item.firstName + "" + item.middleName;
                                             applicantOtherSurname = item.lastName;
                                             applicantTitleDropdown = item.Title;
                                             applicantNationalInsno = item.ninumber;
                                             applicantDOB = item.dateofbirth;
                                             applicantAddress = item.ResAddress;
                                             applicantmaritalstatus = item.maritalstatus;
                                             applicant_mobno = item.PhoneNumber;
                                             applicant_homeno = item.HomeNumber;                                                   
                                    }                                  
                    });
                    let Savevoluntarycontributedata = {
                        "html": "This is test Data",
                        "language": "en",
                        "DocCategory": "VoluntaryContributeForm",
                        "params": {
                            "empId": emailresult,//"spurthi.n@mitosistech.com",
                            "voluntarycontributedata": {
                                "SurName": [applicantOtherSurname],
                                "FirstName": [applicantFirstName],
                                "Title": [applicantTitleDropdown],
                                "MartialStatus": [applicantmaritalstatus],
                                "Address2":[applicantAddress],
                                "NationalInsuranceNumber": [applicantNationalInsno],
                                "DateOfBirth":[applicantDOB],
                                // "Address3":[item.Address],
                                 "PayVoluntaryContribution":[this.state.StartDateState],
                                "Home":[applicant_homeno],
                                "Mobile": [applicant_mobno],
                                "AcctName": [this.state.AccountholderState],
                                "BankSocietyAccNo": [this.state.SocietyaccountnumberState],
                                "BranchSortCode": [this.state.BranchcodeState],
                                // "ServiceUserNumber":[item.ninumber],
                                 "Reference": [this.state.ReferenceState],
                                "SignatureDate":[this.state.maxDate],
                                //"Signature":[item.Address],
                                "BAddr1":[this.state.BankaddressState],
                                // "BAddress2":[item.refid],
                                // "BAddress3":[item.refnumber],
                                // "BPostalCode": [item.lastName],
                                // "EmpFromDate": [item.othersurnames],
                                // "EmpToDate":[item.ninumber],
                                // "SelfEmpFromDate": [item.dateofbirth],
                                // "SelfEmpToDate":[item.yearsincountry],
                                // "UnEmpToDate":[item.Address],
                                // "NonEmpToDate":[item.refid],
                                // "DirectDebitDate":[item.refnumber],
                                // "DirectDebitSignature": [item.lastName],
                                // "IsEmployed": [item.othersurnames],
                                // "IsDirectDebit":[item.ninumber],
                                // "IsSelfEmployed": [item.dateofbirth],
                                // "IsUnemployed":[item.yearsincountry],
                                // "IsChildBenefit":[item.Address],
                                // "IsNonEmployed":[item.refid],                          
                            }
                        }
                    };
                    console.log(JSON.stringify(Savevoluntarycontributedata));
                    let voluntarycontributeURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";
                    
                    
                    SaveDataAPICallMailSend(voluntarycontributeURL, Savevoluntarycontributedata)
                                        .then((data) => {
                                            console.log("voluntary contribution form generated", data);                                              

                                            let VolDocumentCodeApi = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
                                            let VolDocumentCodeInput = 
                                            {
                                                QueryName : "VoluntaryContributeDocGen",
                                                UserID : emailresult,
                                            };
                                            console.log(JSON.stringify(VolDocumentCodeInput));
                                            
                                SaveDataAPICallMailSend(VolDocumentCodeApi, VolDocumentCodeInput)
                                        .then((data) => {
                                            console.log("Document ID generated link stored in DB",data);  
                                            let AppDocUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
                                            let AppDocTrackData = {
                                                QueryName : "VoluntaryContributeAppDocTrackingUpdate",
                                                UserID    : emailresult,
                                                DocumentID : data[0].DocumentID,
                                                DocumentCode :  data[0].VoluntaryEmpID,
                                                CountryCode  :  "UK",//this.state.CountryCode,
                                                IsSend       :   "NR",
                                                SendDate     :   new Date(),
                                                DownloadVolContributeFileLink : "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/"+emailresult+"/"+"voluntarycontribution_en.pdf",
                                            }   
                                            console.log("AppDocTrackData",JSON.stringify(AppDocTrackData));
                                    SaveDataAPICallMailSend(AppDocUrl, AppDocTrackData)
                                        .then((data) => {
                                           // alert("document entry in APPDOC Track");
                                            console.log("Document Entry in App Doc Track Table.",data);
                                            // let VoluntaryContributeApi = " https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda"
                                            // //let DocumentName = this.state.DocumentNameState==62 ?"FCL":"poa"    
                                            // let VoluntaryContributeInput = {
                                            //         "QueryName": "UpdateVCLink",
                                            //        // UserID: this.state.UserIDState,
                                            //         DocumentCode: "VOC-UK-74",                                                
                                            //         DownloadVolContributeFileLink: "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/"+emailresult+"/"+"voluntarycontribution_en.pdf"                  
                                            //     }  
                                        // SaveDataAPICallMailSend(VoluntaryContributeApi, VoluntaryContributeInput)
                                        // .then((data) => {
                                        //     console.log("Voluntary contribution link stored in DB");                                            
                                        // }).catch((err) => {
                                        //     console.log(err);
                                        // });

                                        }).catch((err) => {
                                            console.log(err);
                                        });

                                        }).catch((err) => {
                                            console.log(err);
                                        });                               
                    
                                        //alert("voluntary contribution form generated");
                                            
                                        this.handlereset(this);
                                        history.push('/ApplicantDashboard');
                                        //this.handleRedirect(this);
                                        // SaveDataAPICallMailSend(NotificationAPIurl,NotificationSaveJSONData)
                                        // .then((data) => {
                                        //     console.log("POA letter stored in Notification page",data);
                                        // }).catch((err) => {
                                        //     console.log(err);
                                        // });                                        
                                    }).catch((err) => {
                                        console.log(err);
                                    });
                                    }).catch((err) => {
                                        console.log(err);
                                    });

                                })
                                .catch((err)=>{
                                    console.log(err);
                                })                  
                   
        }

    }
    handlereset() {
        this.setState({
            BtnName: "Save",
            StartDateState: '',
            AccountholderState: '',
            SocietyaccountnumberState: '',
            BranchcodeState: '',
            BankaddressState: '',
            ReferenceState: '',
            DateState: '',
            PayDebitState: '',
            ChildbenefitState: '',
            //maxDate: maxDate,
            isValidStartDate: false,
            isValidAccountholder: false,
            isValidSocietyaccountnumber: false,
            isValidSignature: false,
            isValidBranchcode: false,
            isValidBankaddress: false,
            isValidReference: false,
            isValidmaxDate: false,
            isValidPayDebit: false,
            isValidChildbenefit: false,
            amountOfVoluntaryContribute: '',
        })
    }
    //Page Rendering
    render() {
        const google = window.google;
        return (
            <Paper zDepth={1} className="CommonDiv">
                <h2 className="legendtitle">Voluntary Contribution</h2>
                <div className="fieldstyle">
                    <Row>
                        <Col xs={12} md={12} className="input-fileds align-fileds">
                            <label> What date do you wish to start paying voluntary National Insurance contributions? <span className="manatoryfield">*</span></label>
                            <DatePicker hintText="Enter your start date paying voluntary national insurance contributions"
                                locale="en-US"
                                firstDayOfWeek={0}
                                value={this.state.StartDateState}
                                onChange={this.handleChangeStartDate.bind(this)}
                                errorText={this.state.isValidStartDate ? "Please Select Your national insurance contributions Date" : null}
                            />
                            
                        </Col>
                        <Col xs={12} md={6} className="input-fileds align-fileds">
                            <label> Amount of the voluntary contribution<span className="manatoryfield">*</span></label>
                            <TextField hintText="Enter the amount of the voluntary contribution"
                                errorText={this.state.isValidamountOfVC ? "Please Enter amount of the voluntary contribution" : null}
                                value={this.state.amountOfVoluntaryContribute}
                                onChange={this.handleChangeAmtOfVC.bind(this)}
                            />                           
                            
                        </Col>
                        
                        <Col xs={12} md={6} className="input-fileds align-fileds">
                            <label>Name(s) of bank account holder(s)<span className="manatoryfield">*</span></label>
                            <TextField hintText="Enter the Name(s) of bank account holder(s) "
                                errorText={this.state.isValidAccountholder ? "Please Enter Your Name(s) of bank account holder(s) " : null}

                                value={this.state.AccountholderState}
                                onChange={this.handleChangeAccountholder.bind(this)}
                            />
                        </Col>
                        <Col xs={12} md={6} className="input-fileds align-fileds">
                            <label>Bank/building society account number<span className="manatoryfield">*</span></label>
                            <TextField hintText="Enter the Bank/building society account number"
                                errorText={this.state.isValidSocietyaccountnumber ? "Please Enter the Bank/building society account number" : null}
                                value={this.state.SocietyaccountnumberState}
                                onChange={this.handleChangeSocietyaccountnumber.bind(this)}
                            />
                        </Col>

                   
                        <Col xs={12} md={6} className="input-fileds align-fileds">
                            <label>Branch sort code<span className="manatoryfield">*</span></label>
                            <TextField hintText="Enter the branch sort code"
                                errorText={this.state.isValidBranchcode ? "Please Enter the branch sort code" : null}
                                value={this.state.BranchcodeState}
                                onChange={this.handleChangeBranchcode.bind(this)}
                            />
                        </Col>
                        <Col xs={12} md={6} className="input-fileds align-fileds">
                            <label>Name and full postal address of your bank <span className="manatoryfield">*</span></label>
                            {/* <TextField hintText="Enter the name and full postal address of your bank "
                                errorText={this.state.isValidBankaddress ? "Please Enter the name and full postal address of your bank" : null}
                                value={this.state.BankaddressState}
                                onChange={this.handleChangeBankaddress.bind(this)}
                            /> */}
                            <Geosuggest
                                                placeholder="Enter Your Bank Name and Address"
                                                initialValue={this.state.BankaddressState}
                                                onChange={this.handleChangeBankaddress}
                                                onSuggestSelect={this.handleSelectSuggest.bind(this)}
                                                value={this.state.BankaddressState}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidBankaddress ? "Please Choose Your Bank Name and Address" : null}</span>
                        </Col>
                        <Col xs={12} md={6} className="input-fileds align-fileds">
                            <label>Reference<span className="manatoryfield">*</span></label>
                            <TextField hintText="Enter the reference"
                                errorText={this.state.isValidReference ? "Please Enter the reference" : null}
                                value={this.state.ReferenceState}
                                onChange={this.handleChangeReference.bind(this)}
                            />
                        </Col>
                        <Col xs={12} md={6}></Col>
                        <Col xs={12} md={3} className="input-fileds align-fileds">
                            <label className="TopicAlign">Signature<span className="manatoryfield">*</span></label>
                            <SignaturePad ref={ref => this.signaturePad = ref} />
                            <Button id="clear" className="ClearBtn" onClick={this.handleSignatureClear.bind(this)}>Clear</Button>
                            <span className="validationmsg">{this.state.isValidSignature ? "Please sign your signature" : ""}</span>


                        </Col>
                        <Col xs={12} md={3}></Col>


                        <Col xs={12} md={6} className="input-fileds align-fileds">
                            <label> Date<span className="manatoryfield">*</span></label>
                            <DatePicker hintText="Enter the  Date"
                                locale="en-US"
                                firstDayOfWeek={0}
                                value={this.state.maxDate}
                                //onChange={this.handleChangeDate.bind(this)}
                                errorText={this.state.isValidmaxDate ? "Please Select Your Date" : null}
                            />
                            {/* <span className="validationmsg">{this.state.ValidateYearWorked1 ? "Please Enter the Valid Child Birth Date" : ""}</span> */}
                        </Col>
                        <Col xs={12} md={6} className="Radio_button">
                            <label>I wish to pay by Direct Debit<span className="manatoryfield">*</span></label>
                            <RadioButtonGroup valueSelected={this.state.PayDebitState}
                                onChange={this.handleChangePayDebit.bind(this)}
                                style={{ display: 'flex', flexDirection: 'row' }}>
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
                            <span className="validationmsg">{this.state.isValidPayDebit ? "Please select Pay type in Direct Debit" : null}</span>
                        </Col>
                        <Col xs={12} md={6} className="Radio_button">
                            <label>Do you receive or have received Child Benefit?<span className="manatoryfield">*</span></label>
                            <RadioButtonGroup valueSelected={this.state.ChildbenefitState} onChange={this.handleChangeChildbenefit.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
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
                            <span className="validationmsg">{this.state.isValidChildbenefit ? "Please select  your receive or have received Child Benefit" : null}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Col xs={12} md={12} className="input-fields">
                                <Button onClick={this.handleVoluntrySave.bind(this)} className="RQ-Add" >{this.state.BtnName}</Button>
                                <Notifications />
                                {/* <Button onClick={this.handlereset.bind(this)}>Reset</Button> */}
                            </Col>
                        </Col>

                    </Row>


                </div>
            </Paper>
        );
    }
}


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

export default Aboutus;