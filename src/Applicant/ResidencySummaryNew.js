import React, { Component } from 'react';

//CSS 
import '../Style/style.css';

//Bootstrap Component
import { Row, Col, Button, ModalGroup, Modal } from 'react-bootstrap';

//API Calling Methods
import axios from 'axios';

//Notification 
import Notifications, { notify } from 'react-notify-toast';

//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Bootstrap Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class ResidencySummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            show: false,
            ConditionState: '',
            CountryNameState: '',
        }
    }

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="warning" disabled={row.disabled} onClick={() => this.handleResView(row.ResQusCountryID, row.CountryStayDate, row.CountryName)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                <Button bsStyle="danger" onClick={() => this.handleCountryDelete(row.ResQusCountryID)} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></Button>
                <Notifications />
            </div>
        )
    }

    ActionButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="warning" disabled={row.disabled} onClick={() => this.handleResidencyEdit(row.EmpCompanyID)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                <Button bsStyle="danger" onClick={() => this.handleCompanyDelete(row.EmpCompanyID)} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></Button>
                <Notifications />
            </div>
        )
    }

    handleHide = () => {
        this.setState({ show: false });
    }

    handleResView(ResQusCountryID, CountryStayDate, CountryName) {
        this.setState({ ConditionState: CountryStayDate }, () => {
            if (this.state.ConditionState == "Work") {
                this.setState({ show: true }, () => {
                    this.handleCompanyRead(ResQusCountryID, CountryName)
                });
            }
            else {
                this.handleCountryEdit(ResQusCountryID);
            }
        });
    }

    handleCountryEdit(ResQusCountryID) {
        history.push('/ResidencyQuestionnaries?ResQusCountryID=' + ResQusCountryID);
    }

    handleResidencyEdit(EmpCompanyID) {
        history.push('/ResidencyQuestionnaries?EmpCompanyID=' + EmpCompanyID);
    }

    handleCountryDelete(ResQusCountryID) {
        let DeleteAPIUrl = "https://9yfzqnwuf8.execute-api.us-west-2.amazonaws.com/Dev/GPA_InitialLoad_Lambda";
        let DeleteJSONData = JSON.stringify(
            {
                QueryName: "Delete",
                CommonData: "Delete",
                User_ID: "",
                Res_Country: "",
                ResCountry_BDate: "",
                ResCountry_EDate: "",
                Personal_IDNum: "",
                Res_Address: "",
                GetBenefit_Spouse: "",
                PPersonal_IDNum: "",
                CountryStay_Date: "",
                Reason_Stay: "",
                Eligiliblity_Option: "",
                Company_Code: "",
                ResWork_BDate: "",
                ResWork_EDate: "",
                Company_Address: "",
                EntitleGPA_Contact: "",
                Employee_ClosedPlan: "",
                BestOf_Knowledge: "",
                Closed_Plan: "",
                ResidencyQuestionCountry_ID: "",
                EmployeeCompany_ID: "",
                ResidencyQuestionCountry_ID: ResQusCountryID
            });
        console.log("Delete" + DeleteJSONData);
        let AxiosHeaderConfig = {
            headers: {
                // accept: 'application/json',
                // "Access-Control-Request-Headers": "*",
                // "Access-Control-Request-Method": "*",
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Origin": "*",
            }
        };
        axios({
            method: "POST",
            url: DeleteAPIUrl,
            data: DeleteJSONData
            //headers:AxiosHeaderConfig
        }).then(({ data }) => {
            console.log("ResponseData" + data);
            notify.show("Country Deleted SuccessFully", "success", 3000);
        }).catch((err) => {
            console.log(err)
        })
    }

    handleCompanyDelete(EmpCompanyID) {
        let DeleteCompanyAPIUrl = "https://9yfzqnwuf8.execute-api.us-west-2.amazonaws.com/Dev/GPA_InitialLoad_Lambda";
        let DeleteCompanyJSONData = JSON.stringify(
            {
                QueryName: "Delete",
                CommonData: "Delete",
                User_ID: "",
                Res_Country: "",
                ResCountry_BDate: "",
                ResCountry_EDate: "",
                Personal_IDNum: "",
                Res_Address: "",
                GetBenefit_Spouse: "",
                PPersonal_IDNum: "",
                CountryStay_Date: "Work",
                Reason_Stay: "",
                Eligiliblity_Option: "",
                Company_Code: "",
                ResWork_BDate: "",
                ResWork_EDate: "",
                Company_Address: "",
                EntitleGPA_Contact: "",
                Employee_ClosedPlan: "",
                BestOf_Knowledge: "",
                Closed_Plan: "",
                ResidencyQuestionCountry_ID: "",
                EmployeeCompany_ID: "",
                EmployeeCompany_ID: EmpCompanyID,
            });
        let AxiosHeaderConfig = {
            headers: {
                // accept: 'application/json',
                // "Access-Control-Request-Headers": "*",
                // "Access-Control-Request-Method": "*",
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Origin": "*",
            }
        };
        axios({
            method: "POST",
            url: DeleteCompanyAPIUrl,
            data: DeleteCompanyJSONData
            //headers:AxiosHeaderConfig
        }).then(({ data }) => {
            notify.show("Company Deleted SuccessFully", "success", 3000);
            this.handleCompanyRead(this);
        }).catch((err) => {
            console.log(err)
        })
    }

    handleCompanyRead(ResQusCountryID, CountryName) {
        this.setState({ CountryNameState: CountryName });
        var thisObj = this;
        //let CountryAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let CountryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/"
        let CJSONData = JSON.stringify(
            {
                QueryName: "ResCompanyRead",
                ResQusCountryID: ResQusCountryID
            });
        let AxiosHeaderConfig = {
            headers: {
                // accept: 'application/json',
                // "Access-Control-Request-Headers": "*",
                // "Access-Control-Request-Method": "*",
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Origin": "*",
            }
        };
        axios({
            method: "POST",
            url: CountryAPIUrl,
            data: CJSONData
            //headers:AxiosHeaderConfig
        }).then(({ data }) => {
            thisObj.setState({ tableData: data });
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        const { tableData } = this.state;
        const table2Options = {
            sizePerPage: 5,
        };
        return (
            <div>
                <Modal {...this.props}
                    dialogClassName="custom-modal"
                    bsSize="large"
                    className="ModalAlign">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Residency Questionnaire - {this.props.CountryselectedName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="show-grid" className="AdminDashboardTableDivPar">
                            <Col xs={12} md={12} className="noPadding">
                                <BootstrapTable
                                    containerStyle={{ width: '100%' }}
                                    hover={true}
                                    search={true}
                                    searchPlaceholder={'search input'}
                                    keyField='ResQusCountryID'
                                    data={this.props.TestData}
                                    striped hover
                                    pagination={true}
                                    options={table2Options}
                                    condensed
                                >
                                    <TableHeaderColumn width={"6%"} dataField='button' dataFormat={this.cellButton.bind(this)}>Action</TableHeaderColumn>
                                    <TableHeaderColumn width={"5%"} dataField="CountryName">Country</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField="CountryStayDate">Residency Reason</TableHeaderColumn>
                                    <TableHeaderColumn width={"5%"} dataField="ResCountryBDate">Begining Date</TableHeaderColumn>
                                    <TableHeaderColumn width={"5%"} dataField="ResCountryEDate">Ending Date</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField="PersonalIDNum">Personal Number</TableHeaderColumn>
                                    <TableHeaderColumn width={"10%"} dataField="ResAddress">Residency Address</TableHeaderColumn>
                                    <TableHeaderColumn width={"5%"} dataField="GetBenefitSpouse">Spouse Benefits</TableHeaderColumn>
                                    <TableHeaderColumn width={"7%"} dataField="PPersonalIDNum">Spouse Personal Number</TableHeaderColumn>
                                </BootstrapTable>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
                <div className="DivAlign">

                    <Modal
                        show={this.state.show}
                        onHide={this.handleHide}
                        dialogClassName="custom-modal"
                        bsSize="large"
                        className="ModalAlign Sub-Modal"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title">
                                Ressidency Questionnaire - {this.state.CountryNameState} Company List
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row className="show-grid" className="AdminDashboardTableDivPar">
                                <Col xs={12} md={12} className="noPadding">
                                    <BootstrapTable
                                        containerStyle={{ width: '100%' }}
                                        hover={true}
                                        search={true}
                                        searchPlaceholder={'search input'}
                                        keyField='EmpCompanyID'
                                        data={tableData}
                                        striped hover
                                        pagination={true}
                                        options={table2Options}
                                        condensed
                                    >
                                        <TableHeaderColumn width={"6%"} dataField='button' dataFormat={this.ActionButton.bind(this)}>Action</TableHeaderColumn>
                                        <TableHeaderColumn width={"5%"} dataField="CompanyCode">Company Name</TableHeaderColumn>
                                        <TableHeaderColumn width={"8%"} dataField="CompanyAddress">Company Address</TableHeaderColumn>
                                        <TableHeaderColumn width={"8%"} dataField="EntitleGPAContact">Entitle GPA Contact</TableHeaderColumn>
                                        <TableHeaderColumn width={"8%"} dataField="EmployeeClosedPlan">Employee Closed Plan</TableHeaderColumn>
                                        <TableHeaderColumn width={"10%"} dataField="BestOfKnowledge">Best Of Knowledge</TableHeaderColumn>
                                        <TableHeaderColumn width={"5%"} dataField="ClosedPlan">Closed Plan</TableHeaderColumn>
                                    </BootstrapTable>
                                </Col>
                            </Row>
                        </Modal.Body>
                    </Modal>
                </div>

            </div>
        );
    }
}
const mapReducerStateToProps = (state) => {
    return {
        UserData: state.User_Reducer,
    }
}

export default connect(mapReducerStateToProps)(ResidencySummary);
//export default ResidencySummary;