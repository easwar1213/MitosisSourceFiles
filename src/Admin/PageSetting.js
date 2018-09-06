import React, { Component } from 'react';
import { Col, Panel, Row, Tooltip, OverlayTrigger, Button, Grid } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import '../Style/style.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import { Flex } from 'react-flex-material';
import ContentCopy from 'material-ui/svg-icons/action/settings-brightness';
import SvgIcon from 'material-ui/SvgIcon';
import BackIcon from 'material-ui/svg-icons/content/reply';
import Checkbox from 'material-ui/Checkbox';
//Notification 
import Notifications, { notify } from 'react-notify-toast';
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

const tooltip = (
    <Tooltip id="tooltip1">
        <strong>Add Page</strong>
    </Tooltip>
);

const table2Options = {
    sizePerPage: 5,
};

class PageSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
        }        
    }
    
    componentDidMount(){
        this.handlePageSetupRead(this);
    }
    
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="warning" className="btnStyle" onClick={() => this.handlePageEdit(row.AppPageSetupID)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
                <Button bsStyle="danger" onClick={() => this.handlePageDelete(row.AppPageSetupID)} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></Button>
                <Notifications/>
            </div>
        )
    }

    handlePageEdit(AppPageSetupID)
    {       
        history.push('/AddPage?AppPageSetupID='+AppPageSetupID);
    }

    imageFormatter(cell, row) {
        return ("<img src='" + row.PageIcon + "'/>")
    }
    handleNavDashboard() {
        history.push('/AdminDashboard');
    }

    handlePageSetupRead(event) {
        //let CountryAPIUrl  = "https://xljvq5lh79.execute-api.us-west-2.amazonaws.com/dev/GPA_ApplicantPageSetup";
        let CountryAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CJSONData = JSON.stringify(
            {
                // QueryName: "Read",
                QueryName: "ApplicantPageSetupRead",
                imagePreviewUrl:"",
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
          //console.log(data)
            this.setState({ tableData: data });
        }).catch((err) => {
            //console.log(err)
        })    
    }
    handlePageDelete(AppPageSetupID) {
        
        //let DeletePageAPIUrl  = "https://xljvq5lh79.execute-api.us-west-2.amazonaws.com/dev/GPA_ApplicantPageSetup";
        let DeletePageAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let PageJSONData = JSON.stringify(
            {
                //QueryName: "Delete",
                QueryName: "ApplicantPageSetupDelete",
                AppPageSetupID: AppPageSetupID,
                imagePreviewUrl:"",
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
            url: DeletePageAPIUrl,
            data: PageJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            notify.show("Record Deleted SuccessFully","success",1000);
            this.handlePageSetupRead(this);
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
                                <h4><span className="TitleIconColor">{<ContentCopy />}</span><span className="TitleTexColor">Page Details</span></h4>
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
                    <h2 className="legendtitle">
                        Page Details
                        <div className="AddButton">
                            <OverlayTrigger placement="left" overlay={tooltip} >
                                <Link to={'/AddPage'}><i class="fa fa-plus" aria-hidden="true"></i></Link>
                            </OverlayTrigger>
                        </div>
                    </h2>   
                    <div className="fieldstyle"> 
                        <Row className="show-grid" className="AdminDashboardTableDivParDiv">
                            <Col xs={12} md={12} className="noPadding">
                                <BootstrapTable
                                    className="imgLogoresize"
                                    containerStyle={{ width: '100%' }}
                                    hover={true}
                                    search={true}
                                    keyField='AppPageSetupID'
                                    data={tableData}
                                    striped hover
                                    pagination={true}
                                    options={table2Options}
                                    condensed
                                >
                                    <TableHeaderColumn dataField="PageTitle">Page Title</TableHeaderColumn>
                                    <TableHeaderColumn dataField="PageLink">Page Link</TableHeaderColumn>
                                    <TableHeaderColumn dataField="IsActive">IS Active</TableHeaderColumn>
                                    <TableHeaderColumn width={"20%"} dataField='button' dataFormat={this.cellButton.bind(this)}>Action</TableHeaderColumn>
                                </BootstrapTable>
                            </Col>
                        </Row>
                    </div>
                    
                </Paper>
            </div>
        );
    }
}
export default PageSetting;