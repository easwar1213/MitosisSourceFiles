import React, { Component } from 'react';

//CSS
import '../Style/style.css';

//Bootstrap Component
import { Row, Col, Button, Modal } from 'react-bootstrap';

//API Calling Method
import axios from 'axios';

//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';
var emailresult;
class BenefitsSummary extends Component {
    constructor(props) {
        super(props);
        this.handleGetBenSummary(this);
        /* Field State Values Initialization */
        this.state = {
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
            DisplayEdit: false,
        }
    }

    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
    }
    //Handle Event
    handleGetBenSummary(event) {
        emailresult = localStorage.getItem('applicant_email');
        var thisObj = this;
        let BenSummaryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var Benfitdata = {
            QueryName: "BenefitsSummary",
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
            data: JSON.stringify(Benfitdata),
            //headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            if (data.length == 0) {
                this.setState({ DisplayEdit: true });
            }
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ HomeAddressState: data[i].HomeAddress });
                thisObj.setState({ PlaceBirthState: data[i].PlaceOfBirth });
                thisObj.setState({ PartnerState: data[i].Partner });
                if (data[i].Partner == "Yes") {
                    thisObj.setState({ CountryState: data[i].CountryName });
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
                thisObj.setState({ IndustryState: data[i].IndustryName });
                thisObj.setState({ EmployerAddressState: data[i].CompanyAddress });
                thisObj.setState({ CountryallState: data[i].EligibleCountry });
            }
        }).catch((err) => {
        });
    }

    handleBenQuesDataPrint(e) {
        if (this.state.HomeAddressState === "") {
            var win = window.open("https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/template/questions/benqus.pdf", '_blank');
            win.focus();
        } else {
            let DasboardSummaryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
            emailresult = localStorage.getItem('applicant_email');
            let emailLink = emailresult.replace("@", "%40");
            let benQuestsData = "";
            var bendata = {
                QueryName: "BenefitsSummary",
                UserID: emailresult,
            }
            SaveDataAPICallMailSend(DasboardSummaryAPIUrl, bendata).then((data) => {
                data.map((item, key) => {
                    benQuestsData = {
                        "html": "This is test Data",
                        "language": "en",
                        "DocCategory": "benQuesData",
                        "params": {
                            "empId": emailresult,
                            "benQuesData": {
                                "HomeAddress": [item.HomeAddress],
                                "PlaceOfBirth": [item.PlaceOfBirth],
                                "Partner": [item.Partner],
                                "CountryCode": [item.CountryCode],
                                "Benefits": [item.Benefits],
                                "BenefitsName": [item.BenefitsName],
                                "GetBenefits": [item.GetBenefits],
                                "Receiving": [item.Receiving],
                                "ReferenceNum": [item.ReferenceNum],
                                "SSSecurity": [item.SSSecurity],
                                "SSSecurityAddress": [item.SSSecurityAddress],
                                "DateOfBenefits": [item.DateOfBenefits],
                                "CompanyCode": [item.CompanyCode],
                                "Occupation": [item.Occupation],
                                "IndustryCode": [item.IndustryCode],
                                "CompanyAddress": [item.CompanyAddress],
                                "EligibleCountry": [item.EligibleCountry]
                            }
                        }
                    };
                });
                let benQusURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";
                SaveDataAPICallMailSend(benQusURL, benQuestsData).then((data) => {
                    var p1 = "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/";
                    var p3 = "/benQuesData_en.pdf.pdf";
                    var pdfUrl = p1 + emailresult + p3;
                    var win = window.open(pdfUrl, '_blank');
                    win.focus();
                }).catch((err) => {
                });

            }).catch((err) => {
            });
        }
    }

    //Redirect Page For Editing
    handleBenQusEdit(e) {
        history.push('/BenefitsQuestionnariePart1?UserID=' + emailresult);
    }

    /* Page Rendering */
    render() {
        const countryData = this.state;
        return (
            <div>
                <Modal  {...this.props}
                    dialogClassName="custom-modal"
                    bsSize="large"
                    className="ModalAlign">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Benefits Questionnaire</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="ModalScroll">
                        <Row className="show-grid">
                            <Col xs={12} md={12} className="ModalText">
                                <Col xs={12} md={6}>
                                    <p><label>Home Address</label>    :      {this.state.HomeAddressState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Place of Birth </label>         :      {this.state.PlaceBirthState}</p>
                                </Col>
                                <Col xs={12} md={12}>
                                    <p><label>Are you/your partner: • currently receiving any benefits, or • waiting to hear about a claim for any benefits from Social Security Authorities in another country? </label>          :      {this.state.PartnerState}</p>
                                </Col>
                                {(this.state.PartnerState == "Yes") ?
                                    <div>
                                        <Col xs={12} md={12}>
                                            <p><label>Countries you are receiving benefit or waiting to hear from </label>           :      {this.state.CountryState}</p>
                                        </Col>
                                        {this.state.CountryState.length > 1 ?
                                            <div>
                                                <Col xs={12} md={6}>
                                                    <p><label>Name of benefit</label>       :      {this.state.BenefitState}</p>
                                                </Col>
                                                {(this.state.BenefitState == "Other") ?
                                                    <Col xs={12} md={6}>
                                                        <p><label>Name of New Benefits</label>      :      {this.state.BenefitsNameState}</p>
                                                    </Col>
                                                    : ''}
                                                <Col xs={12} md={12}>
                                                    <p><label>Who is getting this or waiting to hear about this?</label>        :     {this.state.GetBenefitsState} </p>
                                                </Col>
                                                <Col xs={12} md={12}>
                                                    <p><label>Are you or your partner currently receiving, or waiting to hear about this benefit? </label>         :   {this.state.ReceivingState}   </p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Refernce Number</label>           :      {this.state.RefernceState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Name of State Social Security Authority </label>      :      {this.state.SecurityState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Address of State Social Security Authority </label>     :      {this.state.SecurityAddressState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Date benefit began (if applicable)</label>    :     {this.state.DateBenefits}</p>
                                                </Col>
                                            </div>
                                            : ""}
                                    </div>
                                    : ''}
                                <Col xs={12} md={6}>
                                    <p><label>Your Employer's Name</label> :   {this.state.EmployerNameState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Occupation</label> : {this.state.OccupationState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Industry List</label> :      {this.state.IndustryState}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><label>Your Employer's Address</label>  :      {this.state.EmployerAddressState}</p>
                                </Col>
                                <Col xs={12} md={12}>
                                    <p><label>If eligible, where would you like your pension benefits deposited (which country)?</label>  :      {this.state.CountryallState}</p>
                                </Col>
                            </Col>
                            <Col xs={12} md={12}>
                                <Col xs={12} md={2} className="input-fields">
                                    <Button onClick={this.handleBenQuesDataPrint.bind(this)} className="RQ-Add" ><i class="fa fa-print" aria-hidden="true"> </i> Print </Button>
                                </Col>
                                <Col xs={12} md={10} className="input-fields">
                                    <Button onClick={this.handleBenQusEdit.bind(this)} disabled={this.state.DisplayEdit} className="RQ-Add" >Edit Record</Button>
                                </Col>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
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
export default connect(mapReducerStateToProps, mapDispatchToProps)(BenefitsSummary);