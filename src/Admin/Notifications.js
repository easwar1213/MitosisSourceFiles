import React, { Component } from 'react';

//Bootstrap Component
import { Row, Col, Button } from 'react-bootstrap';

//Bootstrap Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

//CSS
import '../Style/style.css';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import BackIcon from 'material-ui/svg-icons/content/reply';
import NotificationIcon from 'material-ui/svg-icons/social/notifications-active';

//API Calling Methods
import axios from 'axios';

//Flex
import { Flex } from 'react-flex-material';

//Routing
import history from '../Routing/history';

//Notification 
import Notifications, { notify } from 'react-notify-toast';

// Moment
import Moment from 'react-moment';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

// var moment = require('moment');
var current_date;
var appn_sentdate;
var days_difference;
var groupExistsInDatabase = false;
var moment = require('moment');


const table2Options = {
    sizePerPage: 10,
};

const CountryItems = [
    <MenuItem value={"CA"} primaryText="Canada" />,
    <MenuItem value={"DK"} primaryText="Denmark" />,
    <MenuItem value={"FR"} primaryText="France" />,
    <MenuItem value={"IT"} primaryText="Italy" />,
    <MenuItem value={"JP"} primaryText="Japan" />,
    <MenuItem value={"QC"} primaryText="Quebec" />,
    <MenuItem value={"UK"} primaryText="United Kingdom" />,
    <MenuItem value={"US"} primaryText="United States of America" />
];
class Notification extends Component {
    constructor() {
        super();
        //Field State Values Initialization
        this.state = {
            CountryState: "",
            DocumentIDState: "",
            SendDateState: "",
            FirstNoticeDaysState: "",
            FirstNoticeDateState: "",
            SecondNoticeDaysState: "",
            SecondNoticeDateState: "",
            ThirdNoticeDaysState: "",
            ThirdNoticeDateState: "",
            NotifyStatusState: "",
            IsActiveState: "Y",
            tableData: []
        };
        this.handleNotificationRead(this);
    }

    //Handle Event 
    handleChangeCountry(e) {
        this.setState({ CountryState: e.target.value });
    };

    handleChangeDocumentID(e) {
        this.setState({ DocumentIDState: e.target.value });
    };

    handleChangeSendDate(e, date) {
        this.setState({ SendDateState: date });
    };

    handleChangeFirstNoticeDays(e) {
        this.setState({ FirstNoticeDaysState: e.target.value });
    };

    handleChangeFirstNoticeDate(e, date) {
        this.setState({ FirstNoticeDateState: date });
    };

    handleChangeSecondNoticeDays(e) {
        this.setState({ SecondNoticeDaysState: e.target.value });
    };

    handleChangeSecondNoticeDate(e, date) {
        this.setState({ SecondNoticeDateState: date });
    };

    handleChangeThirdNoticeDays(e) {
        this.setState({ ThirdNoticeDaysState: e.target.value });
    };

    handleChangeThirdNoticeDate(e, date) {
        this.setState({ ThirdNoticeDateState: date });
    };

    handleChangeNotifyStatus(e) {
        this.setState({ NotifyStatusState: e.target.value });
    };

    handleChangeIsActive(e, index, value) {
        this.setState({ IsActiveState: value });
    };

    ActionButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="warning" className="btnStyle" onClick={() => this.handleNotificationEdit(row.Notificationid)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                <Button bsStyle="danger" onClick={() => this.handleNotificationDelete(row.Notificationid)} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></Button>
            </div>
        )
    }

    ProcessButton(cell, row, enumObject, rowIndex) {
        current_date = moment(new Date()).format('MM/DD/YYYY');
        appn_sentdate = moment(row.SendDate).format('MM/DD/YYYY');
        days_difference = parseInt(moment(current_date).diff(moment(appn_sentdate), 'days'));
        if (days_difference >= row.FirstNoticeDay)   // row.NoticeDays
        {
            return (

                <div>
                    <Button disabled={groupExistsInDatabase} bsStyle="warning" className="btnStyle" onClick={() => this.handleSendMail(row.AppDocTrackID, row.UserID)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Button disabled={!groupExistsInDatabase} bsStyle="warning" className="btnStyle" onClick={() => this.handleSendMail(row.AppDocTrackID, row.UserID)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                </div>
            )
        }
    }
    //Re-direct Function
    handleNavDashboard() {
        history.push('/AdminDashboard');
    }

    // Custom Admin Mail Send Notification Function.
    handleSendMail(event, userEmail) {
        let POAletterurl = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
        let POAInputData = JSON.stringify({
            "MainFolderName": "applicant",
            "SubFolderName": userEmail,  //this.props.LoginData.LUserID,
            "MailDocName": "POA",
            "MailContent": "Please send your signed POA, as early as possible." + "\r\n" + "\r\n" + "This is a notification mail from GPA Team.Please ignore if POA has been already sent.",
            "LangCode": "en",
            "EmailTo": userEmail,
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
            url: POAletterurl,
            data: POAInputData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            notify.show("Mail Sent Successfully", "success", 3000);
        }).catch((err) => {
            alert("Mail sent error");
            console.log(err)
        })
    }

    //Update Function
    handleNotificationUpdate(event) {
        var thisObj = this;
        let NotificationAPIurl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let NotificationSaveJSONData = JSON.stringify({
            QueryName: "NotificationDetailsUpdate",
            Notificationid: this.state.Notificationid,
            Countryid: this.state.CountryState,
            Documentid: this.state.DocumentIDState,
            SendDate: this.state.SendDateState,
            FirstNoticeDay: this.state.FirstNoticeDaysState,
            FirstNoticeDate: this.state.FirstNoticeDateState,
            SecondNoticeDay: this.state.SecondNoticeDaysState,
            SecondNoticeDate: this.state.SecondNoticeDateState,
            ThirdNoticeDay: this.state.ThirdNoticeDaysState,
            ThirdNoticeDate: this.state.ThirdNoticeDateState,
            Status: this.state.NotifyStatusState,
            IsActive: this.state.IsActiveState,
        });
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: NotificationAPIurl,
            data: NotificationSaveJSONData,
            headers: AxiosHeaderConfig,

        }).then((data) => {
            notify.show("Updated Successfully", "success", 3000);
            thisObj.handleReset(this);
        }).catch((err) => {

        })
    }

    //Edit Function
    handleNotificationEdit(event) {
        this.setState({ Notificationid: event });
        var thisObj = this;
        let DocEditAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DEJSONData = JSON.stringify(
            {
                QueryName: "NotificationDetailsEdit",
                Notificationid: event
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
            url: DocEditAPIUrl,
            data: DEJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ CountryState: data[i].Countryid });
                thisObj.setState({ DocumentIDState: data[i].Documentid });
                thisObj.setState({ SendDateState: data[i].SendDate });
                thisObj.setState({ FirstNoticeDaysState: data[i].FirstNoticeDay });
                thisObj.setState({ FirstNoticeDateState: data[i].FirstNoticeDate });
                thisObj.setState({ SecondNoticeDaysState: data[i].SecondNoticeDay });
                thisObj.setState({ SecondNoticeDateState: data[i].SecondNoticeDate });
                thisObj.setState({ ThirdNoticeDaysState: data[i].ThirdNoticeDay });
                thisObj.setState({ ThirdNoticeDateState: data[i].ThirdNoticeDate });
                thisObj.setState({ NotifyStatusState: data[i].Status });
                thisObj.setState({ IsActiveState: data[i].IsActive });
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    //Delete Function
    handleNotificationDelete(event) {
        var thisObj = this;
        let DocDeleteAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DDJSONData = JSON.stringify(
            {
                QueryName: "NotificationDetailsDelete",
                Notificationid: event
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
            url: DocDeleteAPIUrl,
            data: DDJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            notify.show("Record Deleted SuccessFully", "success", 3000);
            thisObj.handleReset(this);
        }).catch((err) => {
            console.log(err)
        })
    }

    //Read Function
    handleNotificationRead(e) {
        let DocAPIurl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DocReadJSONData = JSON.stringify({
            QueryName: "NotificationDetailsRead",
        });
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: DocAPIurl,
            data: DocReadJSONData,
            headers: AxiosHeaderConfig,

        }).then((data) => {
            this.setState({ tableData: data.data });
        }).catch((err) => {

        })
    }

    //Page Rendering
    render() {
        const { tableData } = this.state;
        return (
            <div className="main-wrapper">
                <div className="HeaderTile">
                    <Flex className="show-grid" layout="row" >
                        <Flex flex="none">
                            <div className="TitleIcon">
                                <h4><span className="TitleIconColor">{<NotificationIcon />}</span><span className="TitleTexColor">Notification</span></h4>
                            </div>
                        </Flex>
                        <Flex flex layout align="end center">
                            <div>
                                <h5><span className="BreadCrumbsClass"><BackIcon /></span>&nbsp;&nbsp;<b><span onClick={this.handleNavDashboard.bind(this)} className="ActiveClass">Home / Dashboard</span></b></h5>
                            </div>
                        </Flex>
                    </Flex>
                </div>
                <Paper zDepth={1} className="AdminDashboardDiv">
                    <h2 className="legendtitle">Notification Details </h2>
                    <div className="fieldstyle">
                        <Row>
                            <Col xs={12} md={6} className="input-fileds">
                                <SelectField
                                    floatingLabelText="Country"
                                    value={this.state.CountryState}
                                    onChange={this.handleChangeCountry.bind(this)}
                                >
                                    {CountryItems}
                                </SelectField>
                            </Col>
                            <Col xs={12} md={6} className="input-fileds">
                                <TextField hintText="Enter Your Document ID"
                                    floatingLabelText={<span>Document ID</span>}
                                    value={this.state.DocumentIDState}
                                    onChange={this.handleChangeDocumentID.bind(this)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={4} className="input-fileds">
                                <DatePicker
                                    locale="en-US"
                                    firstDayOfWeek={0}
                                    floatingLabelText={<span>Send Date</span>}
                                    value={this.state.SendDateState}
                                    onChange={this.handleChangeSendDate.bind(this)}
                                />
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <TextField hintText="Enter Your First Notice Days"
                                    floatingLabelText={<span>First Notice Days</span>}
                                    value={this.state.FirstNoticeDaysState}
                                    onChange={this.handleChangeFirstNoticeDays.bind(this)}
                                />
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <DatePicker
                                    locale="en-US"
                                    firstDayOfWeek={0}
                                    floatingLabelText={<span>First Notice Date</span>}
                                    value={this.state.FirstNoticeDateState}
                                    onChange={this.handleChangeFirstNoticeDate.bind(this)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={4} className="input-fileds">
                                <TextField hintText="Enter Your Second Notice Days"
                                    floatingLabelText={<span>Second Notice Days</span>}
                                    value={this.state.SecondNoticeDaysState}
                                    onChange={this.handleChangeSecondNoticeDays.bind(this)}
                                />
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <DatePicker
                                    locale="en-US"
                                    firstDayOfWeek={0}
                                    floatingLabelText={<span>Second Notice Date</span>}
                                    value={this.state.SecondNoticeDateState}
                                    onChange={this.handleChangeSecondNoticeDate.bind(this)}
                                />
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <TextField hintText="Enter Your Third Notice Days"
                                    floatingLabelText={<span>Third Notice Days</span>}
                                    value={this.state.ThirdNoticeDaysState}
                                    onChange={this.handleChangeThirdNoticeDays.bind(this)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={4} className="input-fileds">
                                <DatePicker
                                    locale="en-US"
                                    firstDayOfWeek={0}
                                    floatingLabelText={<span>Third Notice Date</span>}
                                    value={this.state.ThirdNoticeDateState}
                                    onChange={this.handleChangeThirdNoticeDate.bind(this)}
                                />
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText="Notification Status"
                                    value={this.state.NotifyStatusState}
                                    onChange={this.handleChangeNotifyStatus.bind(this)}
                                >
                                    <MenuItem value={"P"} primaryText="Pending" />
                                    <MenuItem value={"R"} primaryText="Reject" />
                                    <MenuItem value={"C"} primaryText="Completed" />
                                </SelectField>
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText={<span>Is Active<span className="manatoryfield">*</span></span>}
                                    value={this.state.IsActiveState}
                                    onChange={this.handleChangeIsActive.bind(this)}
                                >
                                    <MenuItem value={"Y"} primaryText="Yes" />
                                    <MenuItem value={"N"} primaryText="No" />
                                </SelectField>
                            </Col>
                        </Row>
                        <div className="RegButton btnContPadd">
                            <Button onClick={this.handleReset.bind(this)} className="ResetButton" >Reset</Button>
                            <Button type="submit" onClick={this.handleNotificationUpdate.bind(this)} className="RegButton2">Update</Button>
                            <Notifications />
                        </div>
                    </div>
                </Paper>
                <Paper zDepth={1} className="AdminDashboardDiv">
                    <h2 className="legendtitle">Notification List </h2>
                    <div className="fieldstyle">
                        <Row>
                            <Col xs={12} md={12} className="noPadding">
                                <BootstrapTable className="NotificationTable"
                                    keyField='EmployeeID'
                                    data={tableData}
                                    pagination={true}
                                    search={true}
                                    searchPlaceholder={'search input'}
                                    options={table2Options}
                                >
                                    <TableHeaderColumn width={"10%"} dataField="UserID">User ID</TableHeaderColumn>
                                    <TableHeaderColumn width={"5%"} dataField="Countryid">Country</TableHeaderColumn>
                                    <TableHeaderColumn width={"5%"} dataField="Documentid">Document ID</TableHeaderColumn>
                                    <TableHeaderColumn width={"8%"} dataField="SendDate">Send Date</TableHeaderColumn>
                                    <TableHeaderColumn width={"7%"} dataField="FirstNoticeDay">First Notice Day</TableHeaderColumn>
                                    <TableHeaderColumn width={"8%"} dataField="FirstNoticeDate">First Notice Date</TableHeaderColumn>
                                    <TableHeaderColumn width={"7%"} dataField="SecondNoticeDay">Second Notice Day</TableHeaderColumn>
                                    <TableHeaderColumn width={"8%"} dataField="SecondNoticeDate">Second Notice Date</TableHeaderColumn>
                                    <TableHeaderColumn width={"7%"} dataField="ThirdNoticeDay">Third Notice Day</TableHeaderColumn>
                                    <TableHeaderColumn width={"8%"} dataField="ThirdNoticeDate">Third Notice Date</TableHeaderColumn>
                                    <TableHeaderColumn width={"5%"} dataField="Status">Status</TableHeaderColumn>
                                    <TableHeaderColumn width={"5%"} dataField='button' dataFormat={this.ActionButton.bind(this)}>Action</TableHeaderColumn>
                                    <TableHeaderColumn width={"7%"} dataField='button' dataFormat={this.ProcessButton.bind(this)}>Mail Sending</TableHeaderColumn>
                                </BootstrapTable>
                            </Col>
                        </Row>
                    </div>
                </Paper>
            </div>
        );
    }

    //Reset Function
    handleReset(e) {
        this.setState({
            CountryState: "",
            DocumentIDState: "",
            SendDateState: "",
            FirstNoticeDaysState: "",
            FirstNoticeDateState: "",
            SecondNoticeDaysState: "",
            SecondNoticeDateState: "",
            ThirdNoticeDaysState: "",
            ThirdNoticeDateState: "",
            NotifyStatusState: "",
            IsActiveState: "Y",
        })
        this.handleNotificationRead(this);
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
export default connect(mapReducerStateToProps, mapDispatchToProps)(Notification);
//export default Notification;