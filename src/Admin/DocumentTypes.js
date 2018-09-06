import React, { Component } from 'react';
import { Col, Panel, Row, Button, Grid } from 'react-bootstrap';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
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
const table2Options = {
    sizePerPage: 5,
};
const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);
class DocumentTypes extends Component {
    constructor() {
        super();
        this.state = {
            BtnName: "Save",
            DocumentTypeID: "",
            DocumentTypeState: '',
            DescriptionState: '',
            IsActiveState: 'Y',
            tableData: [],
            validationError: {},
            isValidDocumentType: false,
            isValidDescription: false,
            isValidIsActive: false,
            isValidFormatDocumentType: false,
            isValidFormatDescription: false,
            isValidFormatIsActive: false,
        }
        this.handleDocumentTypeRead(this);
    }
    handleChangeDocumentType(e) {
        this.setState({ DocumentTypeState: e.target.value });
    }
    handleChangeDescription(e) {
        this.setState({ DescriptionState: e.target.value });
    }
    handleChangeIsActive(e, index, value) {
        this.setState({ IsActiveState: value });
    };
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="warning" onClick={() => this.handleDocumentTypeEdit(row.DocumentTypeID)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>

            </div>
        )
    }
    deleteButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="danger" onClick={() => this.handleDocumentTypeDelete(row.DocumentTypeID)} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></Button>
            </div>
        )
    }
    handleValidateForm(e) {
        const { validationError } = this.state;
        let validForm = false;
        var validDocumentTypeForm = false;
        var validIsActiveForm = false;
        if (this.state.DocumentTypeState.length > 0) {
            this.setState({ isValidDocumentType: false });
            if (this.state.DocumentTypeState.length > 0 && this.state.DocumentTypeState.length > 2) {
                this.setState({ isValidFormatDocumentType: false });
                validDocumentTypeForm = true;
            }
            else {
                this.setState({ isValidFormatDocumentType: true });
                this.setState({ isValidDDocumentType: false });
            }
        }
        else {
            this.setState({ isValidDocumentType: true });
            this.setState({ isValidFormatDocumentType: false });
            validDocumentTypeForm = false;
        }
        if (this.state.IsActiveState != "") {
            this.setState({ isValidIsActive: false });
            validIsActiveForm = true;
        }
        else {
            this.setState({ isValidIsActive: true });
            validIsActiveForm = false;
        }
        if (validDocumentTypeForm && validIsActiveForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }
    handleDocumentTypeSave(e) {
        //var QName = (this.state.BtnName) == "Save" ?"DocumentTypesSave" :"DocumentTypesUpdate";
        var QName;
        if (this.state.BtnName == "Save") {
            QName = "DocumentTypesSave";
        }
        else {
            QName = "DocumentTypesUpdate";
        }
        var thisObj = this;
        var isValid = this.handleValidateForm(this);
        if (isValid) {
            var thisObj = this;
            // let DocumentTypeSaveAPIurl = "https://cahqhoss7a.execute-api.us-west-2.amazonaws.com/Dev/GPA_DocumentType_Lambda";
            let DocumentTypeSaveAPIurl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
            let DocSaveJSONData = JSON.stringify({
                QueryName: QName,
                DocumentTypeID: this.state.DocumentTypeID,
                DocumentType: this.state.DocumentTypeState,
                Description: this.state.DescriptionState,
                IsActive: this.state.IsActiveState,
            });
            let AxiosHeaderConfig = {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
            axios({
                method: "POST",
                url: DocumentTypeSaveAPIurl,
                data: DocSaveJSONData,
                headers: AxiosHeaderConfig,
            }).then((data) => {
                if (QName == "Save") {
                    notify.show("Save Successfully", "success", 3000);
                    thisObj.handleReset(this);
                }
                else {
                    notify.show("Update Successfully", "success", 3000);
                    thisObj.handleReset(this);
                }
            }).catch((err) => {
                //thisObj.setState({ InvnLinkMsg: false });
            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }
    handleDocumentTypeRead(e) {
        var thisObj = this;
        // let DocumentTypeAPIUrl = "https://cahqhoss7a.execute-api.us-west-2.amazonaws.com/Dev/GPA_DocumentType_Lambda";
        let DocumentTypeAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CJSONData = JSON.stringify(
            {
                QueryName: "DocumentTypesRead"
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
            url: DocumentTypeAPIUrl,
            data: CJSONData
            //headers:AxiosHeaderConfig
        }).then((data) => {
            thisObj.setState({ tableData: data.data });
        }).catch((err) => {
            console.log(err)
        })
    }
    handleDocumentTypeEdit(event) {
        this.setState({ BtnName: "Update" });
        this.setState({ DocumentTypeID: event });
        var thisObj = this;
        // let DocumentTypeEditAPIUrl = "https://cahqhoss7a.execute-api.us-west-2.amazonaws.com/Dev/GPA_DocumentType_Lambda";
        let DocumentTypeEditAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CEJSONData = JSON.stringify(
            {
                QueryName: "DocumentTypesEdit",
                DocumentTypeID: event
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
            url: DocumentTypeEditAPIUrl,
            data: CEJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ DocumentTypeState: data[i].DocumentType });
                thisObj.setState({ DescriptionState: data[i].Description });
                thisObj.setState({ IsActiveState: data[i].IsActive });
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    handleDocumentTypeDelete(event) {
        var thisObj = this;
        // let DocumentTypeDeleteAPIUrl = "https://cahqhoss7a.execute-api.us-west-2.amazonaws.com/Dev/GPA_DocumentType_Lambda";
        let DocumentTypeDeleteAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CDJSONData = JSON.stringify(
            {
                QueryName: "DocumentTypesDelete",
                DocumentTypeID: event
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
            url: DocumentTypeDeleteAPIUrl,
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
                                <h4><span className="TitleIconColor">{<EmployeeIcon />}</span><span className="TitleTexColor">Document Type </span></h4>
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

                    <h2 className="legendtitle">Types Details </h2>
                    <div className="fieldstyle">

                        <Row>
                            <Col xs={12} md={5} className="input-fileds">
                                <TextField hintText="Enter Your Document Type"
                                    floatingLabelText={<span>Document Type<span className="manatoryfield">*</span></span>}
                                    value={this.state.DocumentTypeState}
                                    onChange={this.handleChangeDocumentType.bind(this)}
                                    errorText={this.state.isValidDocumentType ? "Please Enter Your Document Type" : null}
                                />
                            </Col>
                            <Col xs={12} md={5} className="input-fileds">
                                <TextField hintText="Enter Your Description"
                                    floatingLabelText={<span>Description</span>}
                                    value={this.state.DescriptionState}
                                    onChange={this.handleChangeDescription.bind(this)}
                                />
                            </Col>
                            <Col xs={12} md={2} className="input-fileds">
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

                            <Button type="submit" onClick={this.handleDocumentTypeSave.bind(this)} className="RegButton1">{this.state.BtnName}</Button>
                            <Notifications />

                        </div>
                    </div>


                </Paper>
                <Paper zDepth={1} className="AdminDashboardDiv">
                    <h2 className="legendtitle">Document Types List</h2>
                    <div className="fieldstyle">

                        <Row className="show-grid" className="AdminDashboardTableDivParDiv" >
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
                                    <TableHeaderColumn width={"10%"} dataField="DocumentTypeID">Document Type ID</TableHeaderColumn>
                                    <TableHeaderColumn width={"20%"} dataField="DocumentType">Document Type</TableHeaderColumn>
                                    <TableHeaderColumn width={"25%"} dataField="Description">Description</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField="IsActive">Active</TableHeaderColumn>
                                    <TableHeaderColumn width={"8%"} dataField='button' dataFormat={this.cellButton.bind(this)}>Edit</TableHeaderColumn>
                                    <TableHeaderColumn width={"8%"} dataField='button' dataFormat={this.deleteButton.bind(this)}>Delete</TableHeaderColumn>
                                </BootstrapTable>
                            </Col>
                        </Row>
                    </div>
                </Paper>
            </div>
        );
    }
    handleReset(e) {
        this.setState({
            DocumentTypeState: '',
            DescriptionState: '',
            IsActiveState: 'Y',
            BtnName: "Save",
            isValidDocumentType: false,
            isValidDescription: false,
            isValidIsActive: false,
        });
        this.handleDocumentTypeRead(this);
    }
}
export default DocumentTypes;