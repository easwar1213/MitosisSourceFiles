import React, { Component } from 'react';

//CSS 
import '../Style/style.css';

//Bootstrap Component
import { Row, Col, Button, ModalGroup, Modal } from 'react-bootstrap';

//API Calling Methods
import axios from 'axios';

//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

var emailresult;

class GeneralSummary extends Component {
    constructor(props) {
        super(props);

        /* Field State Values Initialization */
        this.state = {
            value: null,
            PModalTitleState: "",
            PModalEnableState: false,
            InquiryState: "",
            AreYouState: "",
            GenderState: "",
            PGenderState: "",
            TitleState: "",
            PTitleState: "",
            FirstNameState: "",
            PFirstNameState: "",
            MiddleNameState: "",
            PMiddleNameState: "",
            LastNameState: "",
            PLastNameState: "",
            SuffixState: "",
            PSuffixState: "",
            BirthNameState: "",
            MaidenNameState: "",
            DOBState: "",
            PDOBState: "",
            DOBMCDWState: "",
            CountryState: "",
            PCountryState: "",
            MailingAddressState: "",
            PMailingAddressState: "",
            PhoneNumState: "",
            HomeNumState: "",
            MaritalStatusState: "",
            PartnerInfoShow: true,
            DisplayEdit: false,
            CountryInfo: [],
        }
    }

    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        this.handleGetGenQusSummary(this);
    }


    //Handle Event
    handleGetGenQusSummary(event) {
        emailresult = localStorage.getItem('applicant_email');
        var thisObj = this;
        let UserID;
        let DasboardSummaryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var data = {
            QueryName: "Sum",
            UserID: emailresult,
        }

        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: DasboardSummaryAPIUrl,
            data: JSON.stringify(data),
            //headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            if (data.length == 0) {
                this.setState({ DisplayEdit: true });
            }
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ InquiryState: data[i].InquiryAbout });
                thisObj.setState({ AreYouState: data[i].AreYou });
                thisObj.setState({ GenderState: data[i].Gender });
                thisObj.setState({ TitleState: data[i].Title });
                thisObj.setState({ FirstNameState: data[i].FirstName });
                thisObj.setState({ MiddleNameState: data[i].MiddleName });
                thisObj.setState({ LastNameState: data[i].LastName });
                thisObj.setState({ SuffixState: data[i].Suffix });
                thisObj.setState({ UserIdState: data[i].UserID });
                thisObj.setState({ BirthNameState: data[i].BirthName });
                thisObj.setState({ MaidenNameState: data[i].MaidenName });
                thisObj.setState({ DOBState: data[i].DOB_Day + " " + data[i].DOB_Month + " " + data[i].DOB_Year });
                thisObj.setState({ CountryState: data[i].CountryOfCitizenship });
                thisObj.setState({ MailingAddressState: data[i].MailingAddress });
                thisObj.setState({ PhoneNumState: data[i].PhoneNum });
                thisObj.setState({ HomeNumState: data[i].HomeNum });
                thisObj.setState({ MaritalStatusState: data[i].MaritalStatus });
                if (data[i].MaritalStatus == "Single") {
                    thisObj.setState({ PModalEnableState: false });
                    thisObj.setState({ PartnerInfoShow: true });
                }
                else {
                    if (data[i].MaritalStatus == "Married") {
                        thisObj.setState({ PModalTitleState: "Date of Marriage" });
                        thisObj.setState({ PModalEnableState: true });
                        thisObj.setState({ PartnerInfoShow: false });
                    }
                    else if (data[i].MaritalStatus == "Civil Partnership") {
                        thisObj.setState({ PModalTitleState: "Date of Civil Partnetship" });
                        thisObj.setState({ PModalEnableState: true });
                        thisObj.setState({ PartnerInfoShow: false });
                    }
                    else if (data[i].MaritalStatus == "Divorced") {
                        thisObj.setState({ PModalTitleState: "Date of Divorced" });
                        thisObj.setState({ PModalEnableState: true });
                        thisObj.setState({ PartnerInfoShow: false });
                    }
                    else if (data[i].MaritalStatus == "Widowed") {
                        thisObj.setState({ PModalTitleState: "Date of Windowed" });
                        thisObj.setState({ PModalEnableState: true });
                        thisObj.setState({ PartnerInfoShow: false });
                    }
                    else {
                        thisObj.setState({ PModalEnableState: false });
                        thisObj.setState({ PartnerInfoShow: true });
                    }
                }
                thisObj.setState({ DOMCDWState: data[i].DOMCDW_Day + " " + data[i].DOMCDW_Month + " " + data[i].DOMCDW_Year });
                thisObj.setState({ PGenderState: data[i].PGender });
                thisObj.setState({ PTitleState: data[i].PTitle });
                thisObj.setState({ PFirstNameState: data[i].PFirstName });
                thisObj.setState({ PMiddleNameState: data[i].PMiddleName });
                thisObj.setState({ PLastNameState: data[i].PLastName });
                thisObj.setState({ PSuffixState: data[i].PSuffix });
                thisObj.setState({ PDOBState: data[i].PDOB_Day + " " + data[i].PDOB_Month + " " + data[i].PDOB_Year });
                thisObj.setState({ PCountryState: data[i].PCountryOfCitizenship });
                thisObj.setState({ PMailingAddressState: data[i].PMailingAddress });

            }

        }).catch((err) => {
        });


    }

    //Page Rendering
    render() {
        return (
            <div>
                <Modal
                    {...this.props}
                    dialogClassName="custom-modal"
                    bsSize="large"
                    className="ModalAlign"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">General Questionnaire</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ModalScroll">
                        <Row className="show-grid">
                            <Col xs={12} md={12}>
                                <p className="HeaderText">Employee Information</p>
                            </Col>
                            <Col xs={12} md={12} className="ModalText">
                                <Col xs={12} md={6}>
                                    <p><label>Are You </label>         :      {this.state.AreYouState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Gender </label>          :      {this.state.GenderState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Title </label>           :      {this.state.TitleState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>First Name</label>       :      {this.state.FirstNameState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Middle Name</label>      :      {this.state.MiddleNameState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Last Name</label>        :      {this.state.LastNameState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Suffix  </label>         :      {this.state.SuffixState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Email </label>           :      {this.state.UserIdState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Birth Name </label>      :      {this.state.BirthNameState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Maiden Name </label>     :      {this.state.MaidenNameState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Date of Birth</label>    :     {this.state.DOBState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Country of Citizenship</label> :   {this.state.CountryState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Current Mailing Address</label> : {this.state.MailingAddressState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Mobile Phone Number</label> :      {this.state.PhoneNumState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Home Phone Number</label>  :      {this.state.HomeNumState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Martial Status</label>  :      {this.state.MaritalStatusState}</p>
                                </Col>

                            </Col>
                        </Row>
                        <div hidden={this.state.PartnerInfoShow}>
                            <Col xs={12} md={12}>
                                <p className="HeaderText">Partner / Spouse Information</p>
                            </Col>
                            <Row className="show-grid">
                                <Col xs={12} md={12} className="ModalText">
                                    <Col xs={12} md={6}>
                                        <p ><label>{this.state.PModalTitleState}</label>         :      {this.state.DOMCDWState}</p>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <p><label>Partner Gender </label>          :      {this.state.PGenderState}</p>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <p><label>Partner Title</label>            :      {this.state.PTitleState}</p>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <p><label>Partner First Name</label>       :      {this.state.PFirstNameState}</p>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <p><label>Partner Middle Name</label>      :      {this.state.PMiddleNameState}</p>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <p><label>Partner Last Name </label>           :     {this.state.PLastNameState} </p>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <p><label>Partner Suffix </label>          :     {this.state.PSuffixState} </p>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <p><label>Partner Date of Birth </label>           :      {this.state.PDOBState}</p>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <p><label>Partner Country of Citizenship </label>          :      {this.state.PCountryState}</p>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <p><label>Partner Current Mailing Address</label>              :      {this.state.PMailingAddressState}</p>
                                    </Col>
                                </Col>

                            </Row>

                        </div>
                        <Col xs={12} md={12}>
                            <Col xs={12} md={1} className="input-fields">
                                <Button onClick={this.handleGenQuesDataPrint.bind(this)} className="RQ-Add" ><i class="fa fa-print" aria-hidden="true"> </i> Print </Button>
                            </Col>
                            <Col xs={12} md={11} className="input-fields" >
                                <Button onClick={this.handleGenQusEdit.bind(this)} disabled={this.state.DisplayEdit} className="RQ-Add" >Edit Record</Button>
                            </Col>
                        </Col>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    handleGenQusEdit(e) {
        history.push('/GeneralQuestionnarie?UserID=' + emailresult);
    }

    handleGenQuesDataPrint(e) {
        if (this.state.AreYouState === "") {
            var win = window.open("https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/template/questions/genqus.pdf", '_blank');
            win.focus();
        } else {
            let DasboardSummaryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
            emailresult = localStorage.getItem('applicant_email');
            let emailLink = emailresult.replace("@", "%40");
            let genQuestsData = "";
            var Gendata = {
                QueryName: "Sum",
                UserID: emailresult,
            }
            SaveDataAPICallMailSend(DasboardSummaryAPIUrl, Gendata).then((data) => {
                data.map((item, key) => {
                    genQuestsData = {
                        "html": "This is test Data",
                        "language": "en",
                        "DocCategory": "genQuesData",
                        "params": {
                            "empId": emailresult,
                            "genQuesData": {
                                "AreYou": [item.AreYou],
                                "Gender": [item.Gender],
                                "Title": [item.Title],
                                "FirstName": [item.FirstName],
                                "MiddleName": [item.MiddleName],
                                "LastName": [item.LastName],
                                "Suffix": [item.Suffix],
                                "BirthName": [item.BirthName],
                                "MaidenName": [item.MaidenName],
                                "DOB_Day": [item.Day],
                                "DOB_Month": [item.Month],
                                "DOB_Year": [item.Year],
                                "CountryOfCitizenship": [item.CountryOfCitizenship],
                                "MailingAddress": [item.MailingAddress],
                                "PhoneNum": [item.PhoneNum],
                                "HomeNum": [item.HomeNum],
                                "MaritalStatus": [item.MaritalStatus],
                                "DOB_Marri_Death_Divorce_Day": [item.MCDWDay],
                                "DOB_Marri_Death_Divorce_Month": [item.MCDWMonth],
                                "DOB_Marri_Death_Divorce_Year": [item.MCDWYear],
                                "P_Gender": [item.PGender],
                                "P_Title": [item.PTitle],
                                "P_FirstName": [item.PFirstName],
                                "P_MiddleName": [item.PMiddleName],
                                "P_LastName": [item.PLastName],
                                "P_Suffix": [item.PSuffix],
                                "P_DOB_Day": [item.PDay],
                                "P_DOB_Month": [item.PMonth],
                                "P_DOB_Year": [item.PYear],
                                "P_CountryOfCitizenship": [item.PCountryOfCitizenship],
                                "PartnerMAddress": [item.PMailingAddress],
                                "DOB": [item.DOB + "/" + item.Month + "/" + item.Year],
                                "PDOB": [item.PDay + "/" + item.PMonth + "/" + item.PYear],
                                "DMCWD": [item.MCDWDay + "/" + item.MCDWMonth + "/" + item.MCDWYear]
                            }
                        }
                    };
                });
                let genQusURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";
                SaveDataAPICallMailSend(genQusURL, genQuestsData).then((data) => {
                    var p1 = "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/";
                    var p3 = "/genQuesData_en.pdf.pdf";
                    var pdfUrl = p1 + emailresult + p3;
                    var win = window.open(pdfUrl, '_blank');
                    win.focus();
                }).catch((err) => {
                });

            }).catch((err) => {
            });
        }
    }
}

//Redux
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

//Promise Function
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(GeneralSummary);