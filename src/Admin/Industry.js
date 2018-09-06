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
import General from 'material-ui/svg-icons/action/open-with';
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
const table2Options = {
    sizePerPage: 5,
};
class Country extends Component {
    constructor() {
        super();
        this.state = {
            BtnName: "Save",
            IndustryCodeState: '',
            IndustryNameState: '',
            IsActiveState: 'Y',
            tableData: [],
            isvalidIndustryCode: false,
            isvalidIndustryName: false,
            isValidIsActive: false,
        }
        this.handleIndustryRead(this);
    }
    handleChangeIndustryCode(e) {
        this.setState({ IndustryCodeState: e.target.value });
    };
    handleChangeIndustryName(e) {
        this.setState({ IndustryNameState: e.target.value });
    };
    handleChangeIsActive(e, index, value) {
        this.setState({ IsActiveState: value });
    };
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="warning" onClick={() => this.handleIndustryEdit(row.IndustryID)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
            </div>
        )
    }
    deleteButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="danger" onClick={() => this.handleIndustryDelete(row.IndustryID)} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></Button>
            </div>
        )
    }
    handleValidateForm(e) {
        const { validationError } = this.state;
        let validForm = false;
        var validIndustryCodeStateForm = false;
        var validIndustryNameStateForm = false;
        var validIsActiveForm = false;
        if (this.state.IndustryCodeState.length > 0) {
            this.setState({ isvalidIndustryCode: false });
            validIndustryCodeStateForm = true;
        }
        else {
            this.setState({ isvalidIndustryCode: true });
            validIndustryCodeStateForm = false;
        }
        if (this.state.IndustryNameState.length > 0) {
            this.setState({ isvalidIndustryName: false });
            validIndustryNameStateForm = true;
        }
        else {
            this.setState({ isvalidIndustryName: true });
            validIndustryNameStateForm = false;
        }
        if (this.state.IsActiveState != "") {
            this.setState({ isValidIsActive: false });
            validIsActiveForm = true;
        }
        else {
            this.setState({ isValidIsActive: true });
            validIsActiveForm = false;
        }
        if (validIndustryCodeStateForm && validIndustryNameStateForm && validIsActiveForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }
    handleIndustrySave(e) {
        var QName;
        if(this.state.BtnName=="Save"){
            QName="IndustriesSave"
        }
        else{
            QName="IndustriesUpdate"
        }
        var thisObj = this;
        var isValid = this.handleValidateForm(this);
        if (isValid) {
            var thisObj = this;
            let IndAPIurl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
            let IndSaveJSONData = JSON.stringify({
                QueryName: QName,
                IndustryID: this.state.IndustryID,
                IndustryCode: this.state.IndustryCodeState,
                IndustryName: this.state.IndustryNameState,
                IsActive: this.state.IsActiveState,
            });
            let AxiosHeaderConfig = {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
            axios({
                method: "POST",
                url: IndAPIurl,
                data: IndSaveJSONData,
                headers: AxiosHeaderConfig,

            }).then((data) => {
                notify.show("Saved Successfully","success",3000);
                thisObj.handleReset(this);
            }).catch((err) => {
                //thisObj.setState({ InvnLinkMsg: false });
            })
        }
        else {
            notify.show("Please Fill Mandatory Fields","error",3000);
        }
    }
    handleIndustryRead(e) {
        let IndustryAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CJSONData = JSON.stringify(
            {
                QueryName: "IndustriesRead"
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
            url: IndustryAPIUrl,
            data: CJSONData
            //headers:AxiosHeaderConfig

        }).then((data) => {
            this.setState({ tableData: data.data });
        }).catch((err) => {
            console.log(err)
        })
    }
    handleIndustryEdit(event) {
        this.setState({ BtnName: "Update" });
        this.setState({ IndustryID: event });
        var thisObj = this;
        let CountryEditAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CEJSONData = JSON.stringify(
            {
                QueryName: "IndustriesEdit",
                IndustryID: event
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
                thisObj.setState({ IndustryCodeState: data[i].IndustryCode });
                thisObj.setState({ IndustryNameState: data[i].IndustryName });
                thisObj.setState({ IsActiveState: data[i].IsActive });
                // alert("Record Update SuccessFully");   
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    handleIndustryDelete(event) {
        var thisObj = this;
        let IndustryDeleteAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CDJSONData = JSON.stringify(
            {
                QueryName: "IndustriesDelete",
                IndustryID: event
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
            url: IndustryDeleteAPIUrl,
            data: CDJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            notify.show("Record Deleted SuccessFully","success",3000);
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
                                <h4><span className="TitleIconColor">{<General />}</span><span className="TitleTexColor">Industry</span></h4>
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
                    <h2 className="legendtitle">Industry Details</h2>                  
                    
                                              
                                <div className="fieldstyle">
                                   
                                        <Col xs={12} md={5} className="input-fileds">
                                            <TextField hintText="Enter Your Industry Code"
                                                floatingLabelText={<span>Industry Code<span className="manatoryfield">*</span></span>}
                                                value={this.state.IndustryCodeState}
                                                onChange={this.handleChangeIndustryCode.bind(this)}
                                                errorText={this.state.isvalidIndustryCode ? "Please Enter Your Industry Code" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={5} className="input-fileds">
                                            <TextField hintText="Enter Your Industry Name"
                                                floatingLabelText={<span>Industry Name<span className="manatoryfield">*</span></span>}
                                                value={this.state.IndustryNameState}
                                                onChange={this.handleChangeIndustryName.bind(this)}
                                                errorText={this.state.isvalidIndustryName ? "Please Enter Your Industry Name" : ""}
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
                                        <div className="RegButton btnContPadd">
                                        
                                                <Button onClick={this.handleReset.bind(this)} className="ResetButton" >Reset</Button>
                                        
                                                <Button type="submit" onClick={this.handleIndustrySave.bind(this)} className="RegButton1">{this.state.BtnName}</Button>
                                                <Notifications/>
                                        
                                        </div>
                                    
                                </div>
                                
                                
                   
                </Paper>
                <Paper zDepth={1} className="AdminDashboardDiv">    
                    <h2 className="legendtitle">Industry List</h2>
                    <div className="fieldstyle">
                       
                        <Row className="show-grid" className="AdminDashboardTableDivParDiv">
                            <Col xs={12} md={12} className="noPadding">
                                <BootstrapTable
                                    containerStyle={{ width: '100%' }}
                                    hover={true}
                                    search={true}
                                    searchPlaceholder={'search input'}
                                    keyField='IndustryID'
                                    data={tableData}
                                    striped hover
                                    pagination={true}
                                    options={table2Options}
                                    condensed
                                >
                                    <TableHeaderColumn width={"5%"} dataField="IndustryID">IndustryID</TableHeaderColumn>
                                    <TableHeaderColumn width={"8%"} dataField="IndustryCode">Industry Code</TableHeaderColumn>
                                    <TableHeaderColumn width={"10%"} dataField="IndustryName">Industry Name</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField="IsActive">Active</TableHeaderColumn>
                                    <TableHeaderColumn width={"3%"} dataField='button' dataFormat={this.cellButton.bind(this)}>Edit</TableHeaderColumn>
                                    <TableHeaderColumn width={"3%"} dataField='button' dataFormat={this.deleteButton.bind(this)}>Delete</TableHeaderColumn>
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
            IndustryCodeState: '',
            IndustryNameState: '',
            IsActiveState: 'Y',
            BtnName: "Save",
            isvalidIndustryCode: false,
            isvalidIndustryName: false,
            isValidIsActive: false,
        })
        this.handleIndustryRead(this);
    }
}
export default Country;