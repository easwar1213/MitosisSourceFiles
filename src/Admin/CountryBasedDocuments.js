import React, { Component } from 'react';
import { Col, Panel, Row, Button, Grid } from 'react-bootstrap';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import '../Style/style.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import { Flex } from 'react-flex-material';
import EmployeeIcon from 'material-ui/svg-icons/action/description';
import SvgIcon from 'material-ui/SvgIcon';
import BackIcon from 'material-ui/svg-icons/content/reply';
//Routing
import history from '../Routing/history';
//Notification 
import Notifications, { notify } from 'react-notify-toast';

const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);
const CountryItems = [];

const DocumentItems = [];

const DocumentCode = [];
const table2Options = {
    sizePerPage: 5,
};
class CountryBasedDocuments extends Component {
    constructor() {
        super();

        this.handleLoadCountry(this);
        this.state = {
            BtnName: "Save",
            CBDocumentID: "",
            DocumentNameState: '',
            CountryState: '',
            DocumentCodeState: '',
            IsReqState: '',
            IsActiveState: 'Y',
            tableData: [],
            validationError: {},
            isValidDOCName: false,
            isValidCountry: false,
            isValidIsReq: false,
            isValidIsActive: false,
        }
        this.handleCountryBasedDocRead(this);
        this.handleDocNameRead(this);
    }
    handleChangeDocName(e, index, value) {
        this.setState({ DocumentNameState: value });
    };
    handleChangeCountry(e, index, value) {
        this.setState({ CountryState: value });
    };
    handleChangeDocumentCode(e, index, value) {
        this.setState({ DocumentCodeState: value });
    }
    handleChangeIsReq(e, index, value) {
        this.setState({ IsReqState: value });
    };
    handleChangeIsActive(e, index, value) {
        this.setState({ IsActiveState: value });
    };
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="warning" onClick={() => this.handleCountryBasedDocEdit(row.CBDocumentID)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
            </div>
        )
    }
    deleteButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="danger" onClick={() => this.handleCountryBasedDocDelete(row.CBDocumentID)} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></Button>
            </div>
        )
    }
    handleValidateForm(e) {
        const { validationError } = this.state;
        let validForm = false;
        var validDocumentStateForm = false;
        var validCountryStateForm = false;
        var validDocumentCodeForm = false;
        var validIsRequriedForm = false;
        var validIsActiveForm = false;
        if (this.state.DocumentNameState != "") {
            this.setState({ isValidDOCName: false });
            validDocumentStateForm = true;
        }
        else {
            this.setState({ isValidDOCName: true });
            validDocumentStateForm = false;
        }
        if (this.state.CountryState != "") {
            this.setState({ isValidCountry: false });
            validCountryStateForm = true;
        }
        else {
            this.setState({ isValidCountry: true });
            validCountryStateForm = false;
        }
        if (this.state.DocumentCodeState != "") {
            this.setState({ isValidDocumentcode: false });
            validDocumentCodeForm = true;
        }
        else {
            this.setState({ isValidDocumentcode: true });
            validDocumentCodeForm = false;
        }
        if (this.state.IsReqState != "") {
            this.setState({ isValidIsReq: false });
            validIsRequriedForm = true;
        }
        else {
            this.setState({ isValidIsReq: true });
            validIsRequriedForm = false;
        }
        if (this.state.IsActiveState != "") {
            this.setState({ isValidIsActive: false });
            validIsActiveForm = true;
        }
        else {
            this.setState({ isValidIsActive: true });
            validIsActiveForm = false;
        }
        if (validDocumentStateForm && validCountryStateForm && validDocumentCodeForm && validIsRequriedForm && validIsActiveForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
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

    handleCountryAndDoc(e) {
        var thisObj = this;
        //let DocAndCtryAPIUrl = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda";
        let DocAndCtryAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CJSONData = JSON.stringify(
            {
                QueryName: "DocAndCountry",
                DocumentID: this.state.DocumentNameState,
                CountryCode: this.state.CountryState,

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
            url: DocAndCtryAPIUrl,
            data: CJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            if (data == undefined || data.length == 0 || data.length == null) {
                thisObj.handleDupChk(this);
            }
            else {
                notify.show(" Record already exsist", "warning", 3000);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    handleCountryBasedDocSave(e) {
        var isValid = this.handleValidateForm(this);
        if (isValid) {
            this.handleCountryAndDoc(this);
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }
    handleDupChk(e) {
        var QName;
        if (this.state.BtnName == "Save") {
            QName = "CountryBasedDocumentsSave";
        }
        else {
            QName = "CountryBasedDocumentsUpdate";
        }
        var thisObj = this;
        //let DocAPIurl = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda";
        let DocAPIurl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let DocSaveJSONData = JSON.stringify({
            QueryName: QName,
            CBDocumentID: this.state.CBDocumentID,
            DocumentID: this.state.DocumentNameState,
            CountryCode: this.state.CountryState,
            DocumentCode: this.state.DocumentCodeState,
            IsRequired: this.state.IsReqState,
            IsActive: this.state.IsActiveState,
        });
        //alert(DocSaveJSONData);
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: DocAPIurl,
            data: DocSaveJSONData,
            headers: AxiosHeaderConfig,

        }).then((data) => {
            notify.show("Saved Successfully", "success", 3000);
            thisObj.handleReset(this);
        }).catch((err) => {
            //thisObj.setState({ InvnLinkMsg: false });
        })

    }
    handleCountryBasedDocRead(e) {
        //let CountryAPIUrl = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda";
        let CountryAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CJSONData = JSON.stringify(
            {
                QueryName: "CountryBasedDocumentsRead"
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

        }).then(({ data }) => {
            this.setState({ tableData: data });
        }).catch((err) => {
            console.log(err)
        })
    }
    handleDocNameRead(e) {
        //let DocNameAPIUrl = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda";
        let DocNameAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CJSONData = JSON.stringify(
            {
                QueryName: "CountryBasedDocumentsDocName"
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
            url: DocNameAPIUrl,
            data: CJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            DocumentItems.length = 0;
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                DocumentItems.push(<MenuItem value={data[i].DocumentID} key={i} primaryText={data[i].DocumentName} />);
                DocumentCode.push(<MenuItem value={data[i].DocumentCode} key={i} primaryText={data[i].DocumentCode} />);
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    handleCountryBasedDocEdit(event) {
        this.setState({ BtnName: "Update" });
        this.setState({ CBDocumentID: event });
        var thisObj = this;
        //let CountryEditAPIUrl = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda";
        let CountryEditAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CEJSONData = JSON.stringify(
            {
                QueryName: "CountryBasedDocumentsEdit",
                CBDocumentID: event
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
            url: CountryEditAPIUrl,
            data: CEJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ DocumentNameState: data[i].DocumentID });
                thisObj.setState({ CountryState: data[i].CountryCode });
                thisObj.setState({ IsReqState: data[i].IsRequired });
                thisObj.setState({ IsActiveState: data[i].IsActive });
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    handleCountryBasedDocDelete(event) {
        var thisObj = this;
        //let CountryDeleteAPIUrl = "https://cu9jnk7e55.execute-api.us-west-2.amazonaws.com/DEV/GPA_CountryBasedDocument_Lambda";
        let CountryDeleteAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CDJSONData = JSON.stringify(
            {
                QueryName: "CountryBasedDocumentsDelete",
                CBDocumentID: event
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
            url: CountryDeleteAPIUrl,
            data: CDJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            notify.show("Record Deleted SuccessFully", "success", 3000);
            thisObj.handleReset(this);
        }).catch((err) => {
            console.log(err)
        })
    }

    handleNavDashboard() {
        history.push('/AdminDashboard');
    }

    render() {
        const { tableData } = this.state;
        return (
            <div className="main-wrapper">
                <div className="HeaderTile">
                    <Flex className="show-grid" layout="row">
                        <Flex flex="none">
                            <div className="TitleIcon">
                                <h4><span className="TitleIconColor">{<EmployeeIcon />}</span><span className="TitleTexColor">Country Based Documents </span></h4>
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

                    <h2 className="legendtitle">Country Based Documents  </h2>
                    <div className="fieldstyle">

                        <Col xs={12} md={12}>
                            <Col xs={12} md={6} className="input-fileds">
                                <SelectField
                                    floatingLabelText={<span>Document Name<span className="manatoryfield">*</span></span>}
                                    value={this.state.DocumentNameState}
                                    onChange={this.handleChangeDocName.bind(this)}
                                    errorText={this.state.isValidDOCName ? "Please Select Your Document" : null}
                                >
                                    {DocumentItems}
                                </SelectField>
                            </Col>
                            <Col xs={12} md={6} className="input-fileds">
                                <SelectField
                                    floatingLabelText={<span>Country<span className="manatoryfield">*</span></span>}
                                    value={this.state.CountryState}
                                    onChange={this.handleChangeCountry.bind(this)}
                                    errorText={this.state.isValidCountry ? "Please Select Your Country" : null}
                                >
                                    {CountryItems}
                                </SelectField>
                            </Col>
                        </Col>
                        <Col xs={12} md={12}>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText={<span>Document Code<span className="manatoryfield">*</span></span>}
                                    disabled={this.state.BtnName == "Update"}
                                    value={this.state.DocumentCodeState}
                                    onChange={this.handleChangeDocumentCode.bind(this)}
                                    errorText={this.state.isValidDocumentcode ? "Please Select Your Document Code" : null}
                                >
                                    {DocumentCode}
                                </SelectField>
                            </Col>
                            <Col xs={12} md={4} className="input-fileds">
                                <SelectField
                                    floatingLabelText={<span>Is Requried<span className="manatoryfield">*</span></span>}
                                    value={this.state.IsReqState}
                                    onChange={this.handleChangeIsReq.bind(this)}
                                    errorText={this.state.isValidIsReq ? "Please Select Your Is Requried" : null}
                                >
                                    <MenuItem value={"Y"} primaryText="Yes" />
                                    <MenuItem value={"N"} primaryText="No" />
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
                        </Col>
                        <Col className="RegButton btnContPadd">
                            <Button onClick={this.handleReset.bind(this)} className="ResetButton" >Reset</Button>

                            <Button type="submit" onClick={this.handleCountryBasedDocSave.bind(this)} className="RegButton1">{this.state.BtnName}</Button>
                            <Notifications />

                        </Col>
                    </div>
                </Paper>
                <Paper zDepth={1} className="AdminDashboardDiv">

                    <h2 className="legendtitle">Country Based Documents List</h2>
                    <Row className="show-grid" className="AdminDashboardTableDivParDiv">
                        <Col xs={12} md={12} className="noPadding">
                            <BootstrapTable
                                containerStyle={{ width: '100%' }}
                                hover={true}
                                search={true}
                                searchPlaceholder={'search input'}
                                keyField='S.No'
                                data={tableData}
                                striped hover
                                pagination={true}
                                options={table2Options}
                                condensed
                            >
                                <TableHeaderColumn width={"10%"} dataField="CBDocumentID">Country Based Document ID</TableHeaderColumn>
                                <TableHeaderColumn width={"9%"} dataField="DocumentName">Document Name</TableHeaderColumn>
                                <TableHeaderColumn width={"8%"} dataField="DocumentCode">Document Code</TableHeaderColumn>
                                <TableHeaderColumn width={"8%"} dataField="CountryName">Country</TableHeaderColumn>
                                <TableHeaderColumn width={"5%"} dataField="IsRequired">IsRequried</TableHeaderColumn>
                                <TableHeaderColumn width={"5%"} dataField="IsActive">Active</TableHeaderColumn>
                                <TableHeaderColumn width={"4%"} dataField='button' dataFormat={this.cellButton.bind(this)}>Edit</TableHeaderColumn>
                                <TableHeaderColumn width={"4%"} dataField='button' dataFormat={this.deleteButton.bind(this)}>Delete</TableHeaderColumn>
                            </BootstrapTable>
                        </Col>
                    </Row>


                </Paper>
            </div>
        );
    }
    handleReset(e) {
        this.setState({
            DocumentNameState: '',
            CountryState: '',
            IsReqState: '',
            IsActiveState: 'Y',
            BtnName: "Save",
            isValidDOCName: false,
            isValidCountry: false,
            isValidIsReq: false,
            isValidIsActive: false,
        });
        this.handleCountryBasedDocRead(this);
    }
}
export default CountryBasedDocuments;