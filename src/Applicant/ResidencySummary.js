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

var emailresult;

class ResidencySummaryOverall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],           
        }
    }
    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        this.handleCompanyRead(this);
    }
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="warning" onClick={() => this.handleCountryEdit(row.ResQusCountryID)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
            </div>
        )
    }
    deleteButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="danger" onClick={() => this.handleCompanyDelete(row.ResQusCountryID)} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></Button>
                <Notifications/>
            </div>
        )
    }
    handleCountryEdit(ResQusCountryID) {
        history.push('/ResidencyQuestionnaries?ResQusCountryID=' + ResQusCountryID);
    }
    handleCompanyDelete(ResQusCountryID) {
        var thisObj = this;
        let DeleteAPIUrl = "https://s54tz3kyzh.execute-api.us-west-2.amazonaws.com/Dev/GPA_ResQusDatas_Lambda";
        let DeleteJSONData = JSON.stringify(
            {
                QueryName: "ResCompanyDelete",
                ResQusCountryID: ResQusCountryID
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
            url: DeleteAPIUrl,
            data: DeleteJSONData
            //headers:AxiosHeaderConfig
        }).then(({ data }) => {
            thisObj.handleCountryDelete(ResQusCountryID);
        }).catch((err) => {
            console.log(err)
        })
    }
    handleCountryDelete(ResQusCountryID) {
        var thisObj = this;
        let DeleteAPIUrl = "https://s54tz3kyzh.execute-api.us-west-2.amazonaws.com/Dev/GPA_ResQusDatas_Lambda";
        let DeleteJSONData = JSON.stringify(
            {
                QueryName: "ResCountryDelete",
                ResQusCountryID: ResQusCountryID
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
            url: DeleteAPIUrl,
            data: DeleteJSONData
            //headers:AxiosHeaderConfig
        }).then(({ data }) => {
            notify.show("Record Deleted SuccessFully", "success", 3000);
        }).catch((err) => {
            console.log(err)
        })
    }
    handleCompanyRead(e) {
        var thisObj = this;
        let CountryAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let CJSONData = JSON.stringify(
            {
                QueryName: "ResCountryRead",
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
            url: CountryAPIUrl,
            data: CJSONData
            //headers:AxiosHeaderConfig

        }).then((data) => {
            thisObj.setState({ tableData: data.data });
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
                        <Modal.Title id="contained-modal-title-lg">Residency Questionnaire</Modal.Title>
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
                                    data={tableData}
                                    striped hover
                                    pagination={true}
                                    options={table2Options}
                                    condensed
                                >
                                    <TableHeaderColumn width={"5%"} dataField="ResCountry">Country</TableHeaderColumn>
                                    <TableHeaderColumn width={"8%"} dataField="ResCountryBDate">Begining Date</TableHeaderColumn>
                                    <TableHeaderColumn width={"8%"} dataField="ResCountryEDate">Ending Date</TableHeaderColumn>
                                    <TableHeaderColumn width={"8%"} dataField="PersonalIDNum">Personal Number</TableHeaderColumn>
                                    <TableHeaderColumn width={"10%"} dataField="ResAddress">Residency Address</TableHeaderColumn>
                                    <TableHeaderColumn width={"5%"} dataField="GetBenefitSpouse">Spouse Benefits</TableHeaderColumn>
                                    <TableHeaderColumn width={"8%"} dataField="PPersonalIDNum">Spouse Personal Number</TableHeaderColumn>
                                    <TableHeaderColumn width={"10%"} dataField="CountryStayDate">Residency Reason</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField='button' dataFormat={this.cellButton.bind(this)}>Edit</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField='button' dataFormat={this.deleteButton.bind(this)}>Delete</TableHeaderColumn>
                                </BootstrapTable>
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
        },
        setResidencyCountry: (Rescountry) => {
            dispatch(Action.setResidencyCountry(Rescountry));
        }
    }
}

export default connect(mapReducerStateToProps)(ResidencySummaryOverall);
//export default ResidencySummary;