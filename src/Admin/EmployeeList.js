import React, { Component } from 'react';
import { Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../Style/style.css';

import SvgIcon from 'material-ui/SvgIcon';
import BackIcon from 'material-ui/svg-icons/content/reply';

import EmployeeIcon from 'material-ui/svg-icons/action/supervisor-account';
import Paper from 'material-ui/Paper';
import axios from 'axios';


import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import {Flex} from 'react-flex-material';

import { BrowserRouter as Router, Link } from 'react-router-dom';

//Routing
import history from '../Routing/history';

const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);

const style = {
    paddingLeft: 0,
};

const tooltip = (
    <Tooltip id="tooltip1">
        <strong>Add Employee</strong>
    </Tooltip>
);

const table2Options = {
    sizePerPage: 5,
};

class EmployeeList extends Component {

    constructor() {
        super();
        //this.handleEditCustomerData(this);
        this.state = {
            tableData: []
        };
    }

    cellButton(cell, row, enumObject, rowIndex) {        
        return (
            <Button bsStyle="warning" title="Edit" onClick={() => this.handleEmployeeEdit(row.EmployeeCode)}>
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        </Button>
      )     
    }

    handleEmployeeEdit(EmployeeCode)
    {       
        history.push('/EmployeeEntry?EmployeeCode='+EmployeeCode);
    }

    imageFormatter(cell, row){        
        return ( "<img src='"+row.EmployeeImg+"'/>")
         }

    componentDidMount() {  
        //let EmpAPIUrl = "https://48q6lrdip0.execute-api.us-west-2.amazonaws.com/Dev/GPA_EmployeeDatas_Lambda";
        let EmpAPIUrl="https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify(
            {
                QueryName: "EmployeeRead"
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
            url: EmpAPIUrl,
            data: JSONData
            //headers:AxiosHeaderConfig

        }).then((data) => {
             console.log(data);              
            this.setState({ tableData: data.data });                
        }).catch((err) => {
            console.log(err)
        })         
    }


    deleteButton(cell, row, enumObject, rowIndex) {
        return (
            <Button bsStyle="danger" title="Delete"
                onClick={() => { if (window.confirm('Delete the item?')) { this.deleteEmployee(row.EmployeeCode) }; }}><i class="fa fa-trash" aria-hidden="true"></i></Button>

        )
    }

    deleteEmployee(EmployeeCode) {
        //let EmpAPIUrl = "https://48q6lrdip0.execute-api.us-west-2.amazonaws.com/Dev/GPA_EmployeeDatas_Lambda";
        let EmpAPIUrl="https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify(
            {
                QueryName: "EmployeeDelete",
                EmployeeCode: EmployeeCode
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
            url: EmpAPIUrl,
            data: JSONData
            //headers:AxiosHeaderConfig

        }).then((data) => {
            
            this.componentDidMount();

        }).catch((err) => {
            //alert("fail") 
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
                                <h4><span className="TitleIconColor">{<EmployeeIcon />}</span><span className="TitleTexColor">Employee Details</span></h4>
                            </div>
                        </Flex>
                        <Flex flex layout align="end center">
                            <div>
                                <h5><span className="BreadCrumbsClass"><BackIcon /></span>&nbsp;&nbsp;<b><span onClick={this.handleNavDashboard.bind(this)} className="ActiveClass">Home / Dashboard</span></b></h5>
                            </div>
                        </Flex>
                    </Flex>                   
                </div>

                {/* <Col md={11}> */}
                <Paper zDepth={1} className="AdminDashboardDiv">
                    <h2 className="legendtitle">
                        Add Client Company
                        <div className="AddButton">
                            <OverlayTrigger placement="left" overlay={tooltip} >
                                <Link to={'/EmployeeEntry'}><i class="fa fa-plus" aria-hidden="true"></i></Link>
                            </OverlayTrigger>
                        </div>
                    </h2>   
                    <div className="fieldstyle">
                        <Row className="show-grid" className="AdminDashboardTableDiv">
                            <Col xs={12} md={12} className="noPadding">
                                <BootstrapTable
                                    className="imgLogoresize"
                                    containerStyle={{width: '100%'}}
                                    hover={true}                                
                                    search={true} 
                                    keyField='EmployeeID'
                                    data={tableData}
                                    striped hover
                                    pagination={true}
                                    options={table2Options}
                                    condensed
                                >   
                                    <TableHeaderColumn width={"5%"} dataField="EmployeeImg" dataFormat={this.imageFormatter.bind(this)}>Profile Image</TableHeaderColumn>                            
                                    <TableHeaderColumn dataField="EmployeeCode">Employee Code</TableHeaderColumn>
                                    <TableHeaderColumn dataField="CompanyName">Company Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField="EmpFirstName">First Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField="EmpLastName">Last Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField="EmpMiddleName">Middle Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField="EmployeeType">Employee Type</TableHeaderColumn>
                                    <TableHeaderColumn dataField="Gender">Gender</TableHeaderColumn>
                                    <TableHeaderColumn dataField="PhoneNum">Mobile Number</TableHeaderColumn>
                                    <TableHeaderColumn dataField="HomeNum">Home Number</TableHeaderColumn>
                                    <TableHeaderColumn dataField="DateOfBirth">DateOfBirth</TableHeaderColumn>
                                    <TableHeaderColumn dataField="SSNum">Social Security Number</TableHeaderColumn>
                                    <TableHeaderColumn dataField="Email">Email</TableHeaderColumn>
                                    <TableHeaderColumn dataField="IsActive">IsActive</TableHeaderColumn>
                                    <TableHeaderColumn dataField="InviteStatus">InviteStatus</TableHeaderColumn>
                                    <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)}>Edit</TableHeaderColumn>
                                    <TableHeaderColumn dataField='button' dataFormat={this.deleteButton.bind(this)}>Delete</TableHeaderColumn>
                                </BootstrapTable>
                            </Col>
                        </Row>
                    </div>
                   
                </Paper>
                {/* </Col> */}
            </div>

        );
    }

}
export default EmployeeList;

