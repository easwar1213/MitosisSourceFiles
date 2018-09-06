import React, { Component } from 'react';
import { Col, Panel, Row, Tooltip, OverlayTrigger, Button, Grid } from 'react-bootstrap';
import '../Style/style.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import { Flex } from 'react-flex-material';
import Download from 'material-ui/svg-icons/action/settings-phone';
import SvgIcon from 'material-ui/SvgIcon';
import BackIcon from 'material-ui/svg-icons/content/reply';
import Checkbox from 'material-ui/Checkbox';

//Routing
import history from '../Routing/history';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);

const style = {
    paddingLeft: 0,
};

const table2Options = {
    sizePerPage: 5,
};

class CustomerSupportList extends Component {
    constructor(props) {
        super(props);
        this.handlePageSetupRead(this);
        this.state = {
            tableData: [],
        }        
    }
    handleNavDashboard() {
        history.push('/AdminDashboard');
    }

    handlePageSetupRead(event) {
        //let CountryAPIUrl = "https://z95u0w2el1.execute-api.us-west-2.amazonaws.com/Dev/GPA_DashboardSummary_Lambda";
        let CountryAPIUrl ="https://qdrjxmko84.execute-api.us-west-2.amazonaws.com/default/GPA_ApplicantModule_Lambda";
        let CJSONData = JSON.stringify(
            {
                QueryName: "ApplicantContactSupportRead",
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

        }).then(({data}) => {
          console.log(data)
            this.setState({ tableData: data });
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        const { tableData } = this.state;
        return (
            <div className="main-wrapper">
                <div className="HeaderTile">
                    <Flex className="show-grid" layout="row">
                        <Flex flex="none">
                            <div className="TitleIcon">
                                <h4><span className="TitleIconColor">{<Download />}</span><span className="TitleTexColor">Customer Support List</span></h4>
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
                    <h2 className="legendtitle">Customer Support List</h2>   
                        <div className="fieldstyle"> 
                            <Row className="show-grid" className="AdminDashboardTableDivParDiv">
                                <Col xs={12} md={12} className="noPadding">
                                    <BootstrapTable
                                        containerStyle={{ width: '100%' }}
                                        hover={true}
                                        search={true}
                                        keyField='AppConSupID'
                                        data={tableData}
                                        striped hover
                                        pagination={true}
                                        options={table2Options}
                                        condensed
                                    >
                                        <TableHeaderColumn width={"4%"} dataField="AppConSupID">S.No</TableHeaderColumn>
                                        <TableHeaderColumn width={"20%"} dataField="UserID">UserID</TableHeaderColumn>
                                        <TableHeaderColumn width={"10%"} dataField="FirstName">First Name</TableHeaderColumn>
                                        <TableHeaderColumn width={"8%"} dataField="MiddleName">Middle Name</TableHeaderColumn>
                                        <TableHeaderColumn width={"10%"} dataField="LastName">LastName</TableHeaderColumn>
                                        <TableHeaderColumn width={"10%"} dataField="PhoneNum">Phone Number</TableHeaderColumn>
                                        <TableHeaderColumn width={"10%"} dataField="MailSubject">Mail Subject</TableHeaderColumn>
                                        <TableHeaderColumn width={"14%"} dataField='CountryOfCitizenship'>Country of Citizenship</TableHeaderColumn>
                                        <TableHeaderColumn dataField="Message">Message</TableHeaderColumn>
                                    </BootstrapTable>
                                </Col>
                            </Row>
                        </div>
                </Paper>
            </div>
        );
    }
}
export default CustomerSupportList;