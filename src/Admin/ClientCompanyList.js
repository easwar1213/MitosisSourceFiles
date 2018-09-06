import React, { Component } from 'react';
import { Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../Style/style.css';
import SvgIcon from 'material-ui/SvgIcon';
import BackIcon from 'material-ui/svg-icons/content/reply';
import RemoveRedEye from 'material-ui/svg-icons/action/dashboard';
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
      <strong>Add Clients</strong>
    </Tooltip>
  );

  const table2Options = {
         
    sizePerPage: 5,
};

class ClientCompanyList extends Component {

    constructor () {
        super();
        //this.handleEditCustomerData(this);
        this.state = {
            tableData: []
        };
    }   
   
    cellButton(cell, row, enumObject, rowIndex) {        
        return (
            <Button bsStyle="warning" title="Edit" onClick={() => this.handleCompanyEdit(row.CompanyCode)}>
            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        </Button>
      )     
    }

    handleCompanyEdit(CompanyCode)
    {       
        history.push('/ClientCompanyEntry?CompanyCode='+CompanyCode);
    }
    imageFormatter(cell, row){        
       return ( "<img src='"+row.CompanyLogo+"'/>")
        }        
      
      

    componentDidMount () {
        //let CliAPIUrl = "https://ol7k5jcmac.execute-api.us-west-2.amazonaws.com/Dev/GPA_ClientCompanyDatas_Lambda";
        let CliAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let JSONData = JSON.stringify(
            {
                QueryName: "ClientCompanyRead"
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
            url: CliAPIUrl,
            data: JSONData
            //headers:AxiosHeaderConfig
        }).then((data) => {
             console.log(data);             
            this.setState({ tableData: data.data });
        }).catch((err) => {
            console.log(err)
        })
    }    
    deleteButton(cell, row, enumObject, rowIndex)
    {
    return (
        <Button bsStyle="danger" title="Delete" 
      onClick={() => 
        {if(window.confirm('Delete the item?')) {this.deleteClient(row.CompanyCode)};}}><i class="fa fa-trash" aria-hidden="true"></i></Button>   	  
  )  
}

    deleteClient(CompanyCode)
    {
       //let clientDelAPIUrl = "https://ol7k5jcmac.execute-api.us-west-2.amazonaws.com/Dev/GPA_ClientCompanyDatas_Lambda";
       let clientDelAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
       let clientRegJSONData=JSON.stringify({ 
       QueryName: "ClientCompanyDelete",              
       CompanyCode: CompanyCode,          
        });          
                
        //  let AxiosHeaderConfig = {
        //      headers: {
        //          // accept: 'application/json',
        //          "Access-Control-Request-Headers": "*",
        //          "Access-Control-Request-Method": "*",
        //          'Content-Type': 'application/json;charset=UTF-8',
        //          // "Access-Control-Allow-Origin": "*",
        //      }
        //    };     
         axios({
             method:"POST",
             url:clientDelAPIUrl,
             data:clientRegJSONData,
             // headers:AxiosHeaderConfig,
 
         }).then((data)=>{    
             
             this.componentDidMount();          
             
         }).catch((err)=>{     
            
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
                            <Flex className="show-grid" layout="row" >
                                <Flex flex="none">
                                    <div className="TitleIcon">
                                    <h4><span className="TitleIconColor">{<RemoveRedEye />}</span><span className="TitleTexColor">Client Company Details</span></h4>
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
                        {/* <Grid> */}
                        <h2 className="legendtitle">
                            Client Company Details
                            <div className="AddButton">
                                <OverlayTrigger placement="left" overlay={tooltip} >
                                    <Link to={'/ClientCompanyEntry'}><i class="fa fa-plus" aria-hidden="true"></i></Link>
                                </OverlayTrigger>
                            </div>
                        </h2>  
                        <div className="fieldstyle"> 
                            {/* <Flex className="show-grid gridHeader" layout="row">
                                <Flex flex="none">
                                <span class="TC-header"><h3>Client Company Details</h3></span>
                                </Flex>
                                <Flex flex>
                                   <div className="AddButton">
                                        <OverlayTrigger placement="left" overlay={tooltip} >
                                            <Link to={'/ClientCompanyEntry'}><i class="fa fa-plus" aria-hidden="true"></i></Link>
                                        </OverlayTrigger>
                                   </div>
                                </Flex>
                            </Flex> */}

                            <Row className="show-grid" className="AdminDashboardTableDiv">
                                <Col xs={12} md={12} className="noPadding">                                 
                                    <BootstrapTable className="imgLogoresize"
                                                containerStyle={{width: '100%'}}
                                                //    containerStyle={{width: '160%',overflowX: 'scroll'}}
                                                    keyField='EmployeeID'
                                                    data={tableData}                                                   
                                                     striped hover
                                                pagination={true} 
                                                search={true}                                             
                                                options={ table2Options }
                                                condensed>  
                                                    <TableHeaderColumn dataField="CompanyLogo" dataFormat={this.imageFormatter.bind(this)}>Logo</TableHeaderColumn>                                                 
                                                    <TableHeaderColumn dataField="CompanyCode">Company Code</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="CompanyName">Company Name</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="Address">Address</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="CountryName">Country</TableHeaderColumn>                                                    
                                                    <TableHeaderColumn dataField="ContactPerson1">Contact Person1</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="ContactPerson2">Contact Person2</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="NoOfEmployees">No.Of Employee</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="IndustryName">Industry Type</TableHeaderColumn>                                                    
                                                    <TableHeaderColumn dataField="CompanyProductDesc">Product Description</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="TelePhoneNum">Phone Number</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="Fax">Fax No</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="Website">Company Website</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="Email">Email</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="IsActive">IsActive</TableHeaderColumn>    
                                                    <TableHeaderColumn dataField='button' dataFormat={this.cellButton.bind(this)}>Edit</TableHeaderColumn>
                                                    <TableHeaderColumn dataField='button' dataFormat={this.deleteButton.bind(this)}>Delete</TableHeaderColumn>                                                 
                                                </BootstrapTable>
                                </Col>
                            </Row>
                        </div>
                        {/* </Grid> */}

                    </Paper>
                {/* </Col> */}
            </div>

        );
    }
   }  
   export default ClientCompanyList;