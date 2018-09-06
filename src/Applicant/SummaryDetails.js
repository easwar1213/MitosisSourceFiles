import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import '../Style/style.css';
//bootstrap
import { Grid, Row, Col, FormControl, NavDropdown, PanelGroup, Panel } from 'react-bootstrap';
import axios from 'axios';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import BootstrapTable from 'reactjs-bootstrap-table';
// import {TableHeaderColumn} from 'reactjs-bootstrap-table';
//var ReactBsTable  = require('react-bootstrap-table');
//var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
/* User Pool Access Details */
const poolData = {
    UserPoolId: 'us-west-2_wgkaBUmz5',//'us-west-2_kG2V3FBcu', // Your user pool id here
    ClientId: '3ocb7u0422dhf9c38vacc0kfv3',//'4apkr7thetvm981irp8ohsjj1t', // Your client id here 4gjka5ag6svfp0f3c4i2a1r8oo
    identityID: "us-west-2:2cae3c46-6f2b-40dd-a059-5313e2b8b23b",//"us-west-2:746c750e-7185-4675-84c1-95186baed362",//"us-west-2:e2caf986-8e5b-4c17-abe1-362efe0c8960",
    region: "us-west-2",
};

var emailresult;



class SummaryDetails extends Component {
    constructor(props) {
        super(props);
        this.handleGetGenQusSummary(this);
        /* Field State Values Initialization */
        this.state = {
            value: null,
            PPanelTitleState: "",
            PPanelEnableState: false,
            InquiryState: "",
            AreYouState: "",
            GenderState: "",
            PGenderState: "",
            TitleState: "",
            PTitleState: "",
            FirstNameState: "",
            PFirstNameState: "",
            MiddleNameState: "",
            PMiddleNameState: "",
            LastNameState: "",
            PLastNameState: "",
            SuffixState: "",
            PSuffixState: "",
            BirthNameState: "",
            MaidenNameState: "",
            DOBState: "",
            PDOBState: "",
            DOBMCDWState: "",
            CountryState: "",
            PCountryState: "",
            MailingAddressState: "",
            PMailingAddressState: "",
            PhoneNumState: "",
            HomeNumState: "",
            MaritalStatusState: "",
            CountryInfo: [],
          //  CompanyInfo: [],
        }
        this.state = {
            tempCountryOutput: [
                {
                    Country: "",
                    BeginningMonth: "",
                    BeginningYear: "",
                    EndMonth: "",
                    EndYear: "",
                    PersonalID: "",
                    Address: "",
                }
            ],
            CompanyInfo:[
                {
                    CompanyName:"",
                    Entitle:"" ,
                    EmployeeClosedPlan:"",
                    Knowledge:"",
                    ClosedPlan:"",
                }
            ],
        }
    }

    handleGetGenQusSummary(event) {
        var thisObj = this;
        let UserID;
        let DasboardSummaryAPIUrl = "https://z95u0w2el1.execute-api.us-west-2.amazonaws.com/Dev/GPA_DashboardSummary_Lambda";
        var data = {
            UserID: emailresult,
        }
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: DasboardSummaryAPIUrl,
            data: JSON.stringify(data),
            headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ InquiryState: data[i].InquiryAbout });
                thisObj.setState({ AreYouState: data[i].AreYou });
                thisObj.setState({ GenderState: data[i].Gender });
                thisObj.setState({ TitleState: data[i].Title });
                thisObj.setState({ FirstNameState: data[i].FirstName });
                thisObj.setState({ MiddleNameState: data[i].MiddleName });
                thisObj.setState({ LastNameState: data[i].LastName });
                thisObj.setState({ SuffixState: data[i].Suffix });
                thisObj.setState({ UserIdState: data[i].UserID });
                thisObj.setState({ BirthNameState: data[i].BirthName });
                thisObj.setState({ MaidenNameState: data[i].MaidenName });
                thisObj.setState({ DOBState: data[i].DOB_Day + " " + data[i].DOB_Month + " " + data[i].DOB_Year });
                thisObj.setState({ CountryState: data[i].CountryOfCitizenship });
                thisObj.setState({ MailingAddressState: data[i].MailingAddress });
                thisObj.setState({ PhoneNumState: data[i].PhoneNum });
                thisObj.setState({ HomeNumState: data[i].HomeNum });
                thisObj.setState({ MaritalStatusState: data[i].MaritalStatus });
                if (data[i].MaritalStatus == "Single") {
                    thisObj.setState({ PPanelEnableState: false });
                }
                else {
                    if (data[i].MaritalStatus == "Married") {
                        thisObj.setState({ PPanelTitleState: "Date of Marriage" });
                        thisObj.setState({ PPanelEnableState: true });
                    }
                    else if (data[i].MaritalStatus == "Civil Partnership") {
                        thisObj.setState({ PPanelTitleState: "Date of Civil Partnetship" });
                        thisObj.setState({ PPanelEnableState: true });
                    }
                    else if (data[i].MaritalStatus == "Divorced") {
                        thisObj.setState({ PPanelTitleState: "Date of Divorced" });
                        thisObj.setState({ PPanelEnableState: true });
                    }
                    else if (data[i].MaritalStatus == "Widowed") {
                        thisObj.setState({ PPanelTitleState: "Date of Windowed" });
                        thisObj.setState({ PPanelEnableState: true });
                    }
                    else {
                        thisObj.setState({ PPanelEnableState: false });
                    }
                }
                thisObj.setState({ DOMCDWState: data[i].DOMCDW_Day + " " + data[i].DOMCDW_Month + " " + data[i].DOMCDW_Year });
                thisObj.setState({ PGenderState: data[i].PGender });
                thisObj.setState({ PTitleState: data[i].PTitle });
                thisObj.setState({ PFirstNameState: data[i].PFirstName });
                thisObj.setState({ PMiddleNameState: data[i].PMiddleName });
                thisObj.setState({ PLastNameState: data[i].PLastName });
                thisObj.setState({ PSuffixState: data[i].PSuffix });
                thisObj.setState({ PDOBState: data[i].PDOB_Day + " " + data[i].PDOB_Month + " " + data[i].PDOB_Year });
                thisObj.setState({ PCountryState: data[i].PCountryOfCitizenship });
                thisObj.setState({ PMailingAddressState: data[i].PMailingAddress });
            }

        }).catch((err) => {
            console.log("DATA ", err);
        });

    }
    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        this.getResidencySummaryData(this);
    }
    getResidencySummaryData(e) {
        // alert("test");
        // e.preventDefault();
        var thisObj = this;

        let residendyData = {
            queryMode: "InitalLoad",
            UserID: "easwaran.k@mitosistech.com",//this.props.LoginData.LUserID
        }
        let countryApiUrl = "https://3hv4utwlf9.execute-api.us-west-2.amazonaws.com/dev/getResidencyData";
        // let countryApiUrl = "https://9s17l62wwg.execute-api.us-west-2.amazonaws.com/dev/insert_Residency_Form_Data";
        axios({
            method: "POST",
            url: countryApiUrl,
            data: JSON.stringify(residendyData),

        }).then(({ data }) => {
            var tempCountryOutputss = [];
            var tempCompanyOutputss = [];
            console.log("Test",data);
            for (let i = 0; data.length > i + 1; i++) {
                data[i].map((item, key) => {

                    tempCountryOutputss.push({
                        Country: item.CountryOfResidency,
                        BeginningMonth: item.ResCountry_BMonth,
                        BeginningYear: item.ResCountry_BYear,
                        EndMonth: item.ResCountry_EMonth,
                        EndYear: item.ResCountry_EYear,
                        PersonalID: item.PersonalIDNum,
                        Address: item.CurrentAddress
                        // "Employer Name": data[countryIndex].value,
                    });
                    tempCompanyOutputss.push({
                        CompanyName: item.CompanyName,
                        Entitle: item.Entitle_GPA_Contact,
                        EmployeeClosedPlan: item.Employee_Closed_Plan,
                        Knowledge: item.Best_Of_Knowledge,
                        ClosedPlan: item.Closed_Plan,
                    });
                    console.log(item.CountryOfResidency);
                    console.log(item.CurrentAddress);
                    console.log(item.Employee_Closed_Plan);
                    console.log(item.Entitle_GPA_Contact);
                    console.log(item.PersonalIDNum);
                    console.log(item.ResCountry_BMonth);
                    console.log(item.ResCountry_BYear);
                    console.log(item.ResCountry_EMonth);
                    console.log(item.ResCountry_EYear);
                    console.log(item.ResQusStatus);

                    /*  console.log(item.UserID);
                      console.log(item.CountryOfResidency);
                      console.log(item.CurrentAddress);
                      console.log(item.Employee_Closed_Plan);
                      console.log(item.Entitle_GPA_Contact);
                      console.log(item.PersonalIDNum);
                      console.log(item.ResCountry_BMonth);
                      console.log(item.ResCountry_BYear);
                      console.log(item.ResCountry_EMonth);
                      console.log(item.ResCountry_EYear);
                      console.log(item.ResQusStatus);*/
                })
            }
            thisObj.setState({ tempCountryOutput: tempCountryOutputss });
            thisObj.setState({ CompanyInfo: tempCompanyOutputss });
         
            console.log("Hey:",this.state.tempCountryOutput[0].Country);
            console.log(data);
            console.log("Your Actual Data:::", thisObj.state.tempCountryOutput);
            console.log("Your Actual Data:", tempCountryOutputss);
            // alert(data.data[0].ResCountry_EMonth);
            //thisObj.setState({CountryInfo:data});
            // var tempCountryOutputss = [];

            // for (let countryIndex = 0; countryIndex < data.length; countryIndex++) {
            //     tempCountryOutputss.push({ 
            //     Country: data[countryIndex].CountryOfResidency, 
            //     BeginningMonth: data[countryIndex].ResCountry_BMonth,
            //     BeginningYear: data[countryIndex].ResCountry_BYear,
            //     EndMonth: data[countryIndex].ResCountry_EMonth,
            //     EndYear: data[countryIndex].ResCountry_EYear,
            //     PersonalID: data[countryIndex].PersonalIDNum,
            //     Address: data[countryIndex].CurrentAddress
            //     // "Employer Name": data[countryIndex].value,
            // });
            // //alert(data[countryIndex]);
            // alert("????"+data.data[countryIndex]);
            // }


            //thisObj.setState({CountryInfo:tempCountryOutput}); 
        })
            .catch((err) => {
                console.log("DATA ", err);
            });
    }

    render() {
        // const tableOptions = {
        //     prePage: <i className='glyphicon glyphicon-chevron-left' />,
        //     nextPage: <i className='glyphicon glyphicon-chevron-right' />,
        //     firstPage: <i className='glyphicon glyphicon-step-backward' />,
        //     lastPage: <i className='glyphicon glyphicon-step-forward' />
        // };
        const countryData = this.state;

        var products = [{

            "id": 1,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 2,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 3,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 4,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 5,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 6,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 7,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 8,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 9,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 10,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 11,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 12,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 13,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 14,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 15,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 16,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 17,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 18,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 19,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 20,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 21,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 22,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 23,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 24,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 25,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 26,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 27,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 28,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 29,
            "name": "Product1",
            "price": 120
        },
        {

            "id": 30,
            "name": "Product1",
            "price": 120
        },
        ];
        const tableOptions = {
            sizePerPageList: [ {
                text: '5', value: 5
              }, {
                text: '10', value: 10
              }, {
                text: 'All', value: products.length
              } ],
              sizePerPage: 3,
          };
          const table2Options = {
         
              sizePerPage: 5,
          };
      /*  const options = {
            page: 2,  // which page you want to show as default
            sizePerPageList: [{
                text: '5', value: 5
            }, {
                text: '5', value: 5
            }, {
                text: 'All', value: 15
            }], // you can change the dropdown list for size per page
            sizePerPage: 5,  // which size per page you want to locate as default
            pageStartIndex: 0, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
            prePage: 'Prev', // Previous page button text
            nextPage: 'Next', // Next page button text
            firstPage: 'First', // First page button text
            lastPage: 'Last', // Last page button text
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'top'  // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
        }; */


        return (

            <div>
                {/* <Col md={11}> */}
                <Paper zDepth={1} className="CommonDiv">
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={12}>
                                <h4 className="HeadingColr">SUMMARY DETAILS:</h4>
                            </Col>
                        </Row>

                        <Row className="Stepdiv2">
                            <Col xs={12} md={12} className="PanelAlign">

                                {/* <PanelGroup
                                    accordion
                                    id="accordion-controlled-example"
                                    activeKey={this.state.activeKey}
                                    onSelect={this.handleSelect}
                                > */}

                                <Panel eventKey="1" defaultExpanded={true}>
                                    <Panel.Heading>
                                        <Panel.Title toggle>General Questionnaire</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row className="show-grid">
                                            <Col xs={12} md={12} className="PanelText">
                                                <Col xs={12} md={12}>
                                                    <p className="HeaderText">Employee Information</p>
                                                </Col>
                                                <Col xs={12} md={12}>
                                                    <p><label>Inquiry About</label>    :      {this.state.InquiryState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Are You </label>         :      {this.state.AreYouState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Gender </label>          :      {this.state.GenderState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Title </label>           :      {this.state.TitleState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>First Name</label>       :      {this.state.FirstNameState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Middle Name</label>      :      {this.state.MiddleNameState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Last Name</label>        :      {this.state.LastNameState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Suffix  </label>         :      {this.state.SuffixState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Email </label>           :      {this.state.UserIdState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Birth Name </label>      :      {this.state.BirthNameState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Madien Name </label>     :      {this.state.MaidenNameState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Date of Birth</label>    :     {this.state.DOBState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Country of Citizenship</label> :   {this.state.CountryState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Current Mailing Address</label> : {this.state.MailingAddressState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Mobile Phone Number</label> :      {this.state.PhoneNumState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Home Phone Number</label>  :      {this.state.HomeNumState}</p>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <p><label>Martial Status</label>  :      {this.state.MaritalStatusState}</p>
                                                </Col>
                                            </Col>
                                        </Row>
                                        <div>
                                            <Panel eventKey="2" defaultExpanded={false}>
                                                <Panel.Heading>
                                                    <Panel.Title toggle>Partner / Spouse Information</Panel.Title>
                                                </Panel.Heading>
                                                <Panel.Body collapsible>
                                                    <Row className="show-grid">
                                                        <Col xs={12} md={12} className="PanelText">
                                                            <Col xs={12} md={6}>
                                                                <p><label>{this.state.PPanelTitleState}</label>         :      {this.state.DOMCDWState}</p>
                                                            </Col>
                                                            <Col xs={12} md={6}>
                                                                <p><label>Partner Gender </label>          :      {this.state.PGenderState}</p>
                                                            </Col>
                                                            <Col xs={12} md={6}>
                                                                <p><label>Partner Title</label>            :      {this.state.PTitleState}</p>
                                                            </Col>
                                                            <Col xs={12} md={6}>
                                                                <p><label>Partner First Name</label>       :      {this.state.PFirstNameState}</p>
                                                            </Col>
                                                            <Col xs={12} md={6}>
                                                                <p><label>Partner Middle Name</label>      :      {this.state.PMiddleNameState}</p>
                                                            </Col>
                                                            <Col xs={12} md={6}>
                                                                <p><label>Partner Last Name </label>           :     {this.state.PLastNameState} </p>
                                                            </Col>
                                                            <Col xs={12} md={6}>
                                                                <p><label>Partner Suffix </label>          :     {this.state.PSuffixState} </p>
                                                            </Col>
                                                            <Col xs={12} md={6}>
                                                                <p><label>Partner Date of Birth </label>           :      {this.state.PDOBState}</p>
                                                            </Col>
                                                            <Col xs={12} md={6}>
                                                                <p><label>Partner Country of Citizenship </label>          :      {this.state.PCountryState}</p>
                                                            </Col>
                                                            <Col xs={12} md={6}>
                                                                <p><label>Partner Current Mailing Address</label>              :      {this.state.PMailingAddressState}</p>
                                                            </Col>
                                                        </Col>
                                                    </Row>

                                                </Panel.Body>
                                            </Panel>
                                        </div>
                                    </Panel.Body>
                                </Panel>

                                <Panel eventKey="3" defaultExpanded={false}>
                                    <Panel.Heading>
                                        <Panel.Title toggle>Residency Questionnaire</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                        <Row className="show-grid">
                                        <Col xs={12} md={12}>
                                                    <p className="HeaderText">Country History</p>
                                                </Col>
                                            <Col xs={12} md={12} className="PanelText">
                                             
                                                <BootstrapTable
                                                 //  data = {products}
                                                    keyField='Country'
                                                    data={this.state.tempCountryOutput}
                                                    striped hover
                                                    pagination={true} 
                                                     options={ tableOptions }
                                                >
                                                    {/* <TableHeaderColumn dataField="id">ID</TableHeaderColumn>
                                                        <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
                                                        <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn> */}

                                                    <TableHeaderColumn dataField="Country">Country of Citizen</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="BeginningMonth">Beginning Month</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="BeginningYear">Beginning Year</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="EndMonth">End Month</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="EndYear">End Year</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="PersonalID">Personal ID</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="Address">Address</TableHeaderColumn>

                                                </BootstrapTable>
                                                {/* <Col xs={12} md={12}>
                                                        <p>Country of Citizenship               :      </p>
                                                    </Col>
                                                    <Col xs={12} md={3}>
                                                        <p>Beginning Month          :      </p>
                                                    </Col>
                                                    <Col xs={12} md={3}>
                                                        <p>Beginning Year           :      </p>
                                                    </Col>
                                                    <Col xs={12} md={3}>
                                                        <p>End Month        :      </p>
                                                    </Col>
                                                    <Col xs={12} md={3}>
                                                        <p>End Year         :      </p>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <p>Personal ID Number(Social Security / National Insurance number)          :      </p>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <p>Address          :      </p>
                                                    </Col>
                                                    <Col xs={12} md={12}>
                                                        <p>Employer Name            :      </p>
                                                    </Col> */}
                                            </Col>
                                            <Col xs={12} md={12}>

                                            </Col>
                                            <Col xs={12} md={12}>
                                                    <p className="HeaderText">Company History</p>
                                                </Col>
                                            <Col xs={12} md={12} className="PanelText">
                                             
                                                <BootstrapTable
                                                   //   data = {products}
                                                    keyField='CompanyName'
                                                    data={this.state.CompanyInfo}
                                                     striped hover
                                                pagination={true} 
                                                options={ table2Options }
                                                >
                                                    {/* <TableHeaderColumn dataField="id">ID</TableHeaderColumn>
                                                        <TableHeaderColumn dataField="name">Product Name</TableHeaderColumn>
                                                        <TableHeaderColumn dataField="price">Product Price</TableHeaderColumn> */}

                                                    <TableHeaderColumn dataField="CompanyName">Company Name</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="Entitle">Pension Benefits given by GPA</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="EmployeeClosedPlan">Having closed plan or acquired by another entity</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="Knowledge">Best of knowledge</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="ClosedPlan">Name of closed plan, when company closed, who acquired them</TableHeaderColumn>
                                                </BootstrapTable>
                                            </Col>
                                        </Row>
                                    </Panel.Body>
                                </Panel>

                                <Panel eventKey="4" defaultExpanded={false}>
                                    <Panel.Heading>
                                        <Panel.Title toggle>Benefits Questionnaire</Panel.Title>
                                    </Panel.Heading>
                                    <Panel.Body collapsible>
                                    </Panel.Body>
                                </Panel>

                                {/* </PanelGroup> */}


                            </Col>
                        </Row>

                    </Grid>
                </Paper>
                {/* </Col> */}
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
        }
    }
}

export default connect(mapReducerStateToProps, mapDispatchToProps)(SummaryDetails);
