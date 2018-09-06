import React, { Component } from 'react';
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Typeahead } from 'react-bootstrap-typeahead';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import axios from 'axios';
import { Flex } from 'react-flex-material';
import Paper from 'material-ui/Paper';
//Routing
import history from '../Routing/history';
import ApplicantDashboard from './ApplicantDashboard';
//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';
//import DecisionTree from './Applicant/DecisionTree';
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import { setCompanyName, setResidencyMove } from '../Store/Action';
import SweetAlert from 'sweetalert2-react';
const API_KEY = "AIzaSyADGT_Xy9rtzFPhH-m0VG5cWL-hi0sK5jA";

const newstyle = {
    marginTop: 10,
}

const MonthItems = [
    <MenuItem value={"January"} key={1} primaryText={"January"} />,
    <MenuItem value={"February"} key={2} primaryText={"February"} />,
    <MenuItem value={"March"} key={3} primaryText={"March"} />,
    <MenuItem value={"April"} key={4} primaryText={"April"} />,
    <MenuItem value={"May"} key={5} primaryText={"May"} />,
    <MenuItem value={"June"} key={6} primaryText={"June"} />,
    <MenuItem value={"July"} key={7} primaryText={"July"} />,
    <MenuItem value={"August"} key={8} primaryText={"August"} />,
    <MenuItem value={"September"} key={9} primaryText={"September"} />,
    <MenuItem value={"October"} key={10} primaryText={"October"} />,
    <MenuItem value={"November"} key={11} primaryText={"November"} />,
    <MenuItem value={"December"} key={12} primaryText={"December"} />,
];

const YearItems = [];
for (let i = 1930; i < 2019; i++) {
    YearItems.push(<MenuItem value={i.toString()} key={i.toString()} primaryText={i.toString()} />);
}
const Knowledgestatus = [
    <MenuItem value={"Company no longer in existence and not acquired by another entity"}
        key={1} primaryText={`Company no longer in existence and not acquired by another entity`} />,
    <MenuItem value={"Company closed their plans"} key={2} primaryText={`Company closed their plans`} />,
    <MenuItem value={"Company acquired from another entity, or merged"} key={3} primaryText={`Company acquired from another entity, or merged`} />,
];
const Teststatus = [
    <MenuItem value={"Yes"} key={1} primaryText={`Yes`} />,
    <MenuItem value={"No"} key={2} primaryText={`No`} />,

];

const CountryItems = [];

const CompanyItems = [];

class ResidencyQuestionnarie extends Component {
    constructor() {
        super();
        // this.handleLoadCountry(this);
        // this.handleLoadCompany(this);
        //this.handleAge();
        this.state = {
            search: "",
            value: "",
            dataOutput: [],
            data: { groups: [] },
            user: {},
            selectedCountry: "",
            selectedCompany: "",
            Monthstate: "",
            Yearstate: "",
            EndMonthstate: "",
            EndYearstate: "",
            CountryState: "",
            CompanyState: "",
            ApplicantAgeMonth: "",
            personalID: "",
            textContent: "",
            currentAddress: "",
            companyName: "",
            CountryNameState: "",
            countrySource: [],
            companySource: [],
            dataSource: [],
            companiesOutput: [],
            validationError: {},
            isEnabledAddNextEmp: false,
            isEnabledAddCountry: false,
            isValidform: false,
            isShowErrCompany: false,
            isShowErrCountry: false,
            isShowPersonalID: false,
            isShowTextContent: false,
            isShowTest1: false,
            isShowTest2: false,
            isShowTest3: false,
            isShowTest4: false,
            isShowTest5: false,
            isShowCurrentAddress: false,
            Test1: 'No',
            Test2: 'No',
            Test3: 'No',
            isMoveNextFormResidency: false,
            ValidateYear: false,
            googleaddress: "",
            searchText: "",
            UserID: "",
            ResStatus: "P",
            ResQusID: "",
            ResidencyCountryID: "",
            errCountry: "",
            errCompany: "",
            errBeginYear: "",
            errEndYear: false,
            errCurrentAddress: "",
            updateStatus: "No",
            residencyStatus: "",
            buttonName: "",
            flag: false,
            errShowEndYear: false,
            DateOfBirth: "",
            DBODay: "",
            DBOMonth: "",
            DBOYear: "",
            ageYears: "",
            ageMonths: "",
            ApplicantAge: 0,
            DocumentID: "",
            InvnLinkMsg: false,
            InvnAddCompanyLinkMsg: false,
            InvnAddCountryLinkMsg: false,
            successmsg: "",
            Knowledgestate: "No",
            EmpCode: "",
            ResCode: "",
            ResCountryCode: "",
            DisableCountryName: false,
            GenQusSelectedCountry: "",
            GenQusSelectedAddress: "",
            WorkingOutSideUKFrom: "",
            WorkingOutSideUKTo: "",
            checkValid: false,
            checkValidFuture: false,
            checkValidFutureFromDate: false,
            ResetAddCountry: false,
            isEmptyCompanyName: false,
            isAddCompany: false,

        }
        this.testnum = 1;
        this.testmove = 0;
    }
    state = {
        multiple: false,
    };

    // handleAge(){
    //     var bthDate, curDate, days;
    //                     var ageYears, ageMonths, ageDays;
    //                     // bthDate = new Date(data[i].DOB_Year, thisObj.state.DBOMonth-1, data[i].DOB_Day);
    //                     bthDate = new Date(1994, 7-1, 19);
    //                     curDate = new Date();
    //                     if (bthDate>curDate) return;
    //                     days = Math.floor((curDate-bthDate)/(1000*60*60*24));
    //                     ageYears = Math.floor(days/365);
    //                     ageMonths = Math.floor((days%365)/31);
    //                     alert(ageYears);
    //                     alert(ageMonths);
    // }
    handleNavAdminPage() {
        this.setState({ InvnLinkMsg: false }, function () {
            if (this.state.buttonName == "Save & Return to Dashboard") {
                history.push('/BenefitsQuestionnariePart1');
            }
            else {
                history.push('/ApplicantDashboard');
            }
        });
    }
    handleLoadCompany(event) {
        var thisObj = this;
        var companyname = [];
        let LoadCountryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let country_code = event;
        console.log("this.state.CountryState", this.state.CountryState);
        /* if(this.state.CountrySta  te!=null){
             country_code=event;//this.state.CountryState;
         }else{
             country_code=event;
         }*/
        let JSONData = JSON.stringify(
            {
                QueryName: "ClientCompaniesCB",
                CountryCode: country_code
            }

        );
        //  alert(this.state.CountryState);
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: LoadCountryAPIUrl,
            headers: AxiosHeaderConfig
            ,
        }).then(({ data }) => {
            console.log("{}", data);
            CompanyItems.length = 0;
            var CompanyCode = "";
            for (let i = 0; i < data.length; i++) {
                CompanyItems.push(<MenuItem value={data[i].CompanyCode} key={i} primaryText={data[i].CompanyName} />);
                CompanyCode = data[i].CompanyCode;
            }
            if (CompanyCode == null || CompanyCode == "") {
                thisObj.setState({ isEmptyCompanyName: true });
            } else {
                thisObj.setState({ isEmptyCompanyName: false });
            }
            // thisObj.props.setCompanyName(CompanyName);
            // console.log("company name log:::",thisObj.props.UserData.CompanyName);
        }).catch((err) => {
            console.log(err);
        })
    }
    //end here
    componentDidMount() {
        var thisObj = this;
        var Params = new URLSearchParams(document.location.search);
        var EmployeeCode = Params.get("EmployeeCode");
        var ResidencyCode = Params.get("ResidencyID");
        thisObj.setState({ EmpCode: EmployeeCode });
        thisObj.setState({ ResCode: ResidencyCode });
        //CompanyItems.length=0;

        if (ResidencyCode != null && EmployeeCode != null) {
            // get company data
            // alert("first");
            console.log(ResidencyCode + "e:" + ResidencyCode + "d:" + EmployeeCode + "d:" + EmployeeCode);
            let countryApiUrl = "https://n7cv27gqh2.execute-api.us-west-2.amazonaws.com/dev/Initial_Load_Residency";
            let residendyCompanyData = {
                queryMode: "GetCompanyDataByFilter",
                UserID: this.props.LoginData.LUserID,//'easwaran.k@mitosistech.com',//this.props.LoginData.LUserID,
                CompanyID: EmployeeCode,
                ResidencyID: ResidencyCode
            }
            axios({
                method: "POST",
                url: countryApiUrl,
                data: JSON.stringify(residendyCompanyData),

            }).then(({ data }) => {
                var tempCountryOutputss = [];
                var tempCompanyOutputss = [];
                console.log("Test:::<DATA>", data);
                for (let i = 0; data.length > i + 1; i++) {
                    data[i].map((item, key) => {
                        console.log("item.CountryName", item.CountryCode + ":" + item.CountryName);
                        //CountryItems.push(<MenuItem value={item.CountryCode} primaryText={item.CountryName} />);
                        CountryItems.push(<MenuItem value={item.CountryCode} key={i} primaryText={item.CountryName} />);
                        thisObj.setState({ CountryState: item.CountryCode });
                        if (item.Best_Of_Knowledge != "No") {
                            thisObj.setState({ Test2: "Yes" });
                            thisObj.setState({ Knowledgestate: item.Best_Of_Knowledge });
                        }
                        thisObj.setState({ ResCountryCode: item.ResQusCountryID });
                        thisObj.setState({ Monthstate: item.ResCountry_BMonth });
                        thisObj.setState({ Yearstate: item.ResCountry_BYear });
                        thisObj.setState({ EndMonthstate: item.ResCountry_EMonth });
                        thisObj.setState({ EndYearstate: item.ResCountry_EYear });
                        thisObj.setState({ personalID: item.PersonalIDNum });
                        thisObj.setState({ currentAddress: item.CurrentAddress });
                        var DtFrom = new Date(item.WorkedFromDate);
                        var DtTo = new Date(item.WorkedToDate);
                        thisObj.setState({ WorkingOutSideUKFrom: DtFrom });
                        thisObj.setState({ WorkingOutSideUKTo: DtTo });

                        //  CompanyItems CompanyCode
                        CompanyItems.push(<MenuItem value={item.CompanyCode} key={i} primaryText={item.CompanyName} />);
                        thisObj.setState({ CompanyState: item.CompanyCode });
                        thisObj.setState({ Knowledgestate: item.Best_Of_Knowledge });
                        thisObj.setState({ textContent: item.Closed_Plan });
                    })
                }
                var CompanyItemsTemp = Array.from(new Set(CompanyItems));
                console.log("CompanyItemsTemp", CompanyItemsTemp);
                thisObj.setState({ CompanyInfo: tempCompanyOutputss });
                thisObj.handleLoadCompany(thisObj);
            })

                .catch((err) => {
                    console.log("Error ", err);
                });
            thisObj.setState({ buttonName: "Update & Return to Dashboard" });
            thisObj.setState({ DisableCountryName: true });
        } else {
            //alert("second");
            this.handleLoadCountry(this);
            thisObj.setState({ buttonName: "Save & Return to Dashboard" });
            thisObj.setState({ DisableCountryName: false });
        }
        // this.handleLoadCompany(this);
        // this.props.onRef(this);
        this.handleGetGenQusSummary(this);
        // this.handleLoadCompany(this);
        let residendyData = {
            queryMode: "InitalLoad",
            UserID: this.props.LoginData.LUserID,//"easwaran.k@mitosistech.com",//this.props.LoginData.LUserID,
            DocumentName: "Birth"
        }
        var thisObj = this;
        let countryApiUrl = "https://n7cv27gqh2.execute-api.us-west-2.amazonaws.com/dev/Initial_Load_Residency";
        axios({
            method: "POST",
            url: countryApiUrl,
            data: JSON.stringify(residendyData),
        }).then(({ data }) => {
            console.log("KKK::", data);
            data.map((item, key) => {
                console.log("DocumentID:", item.DocumentID);
                thisObj.setState({ DocumentID: item.DocumentID });
            })
            console.log("completed");
            // console.log("PP::", data.body[0].ResQusStatus);
            // console.log("PPP:::", data.body[0]);
            /* if (data.body[0] != null) {
                 if (data.body[0].ResQusStatus == undefined || data.body[0].ResQusStatus == "P" || data.body[0] == null) {
                     thisObj.setState({ buttonName: "Save" });
                     /* console.log("your data is null", data);
                     if (data[1].ResQusID == null) {
                     thisObj.setState({ ResQusID: data[1].ResQusID + 1 });
                     } else {
                     thisObj.setState({ ResQusID: data[1].ResQusID });
                     }
                     console.log("modified on your data", data[1].ResQusID);
                     thisObj.setState({ ResidencyCountryID: data[2].ResQusCountryID + 1 });
                     console.log("Your Data:::", data[2].ResQusCountryID + 1); */
            /*   } else {
                  thisObj.setState({ buttonName: "Update" });
                  /* console.log("REC:", data[0].ResQusID);
                  thisObj.setState({ ResQusID: data[0].ResQusID });
                  thisObj.setState({ ResStatus: data[0].ResQusStatus });
                  thisObj.setState({ ResidencyCountryID: data[1].ResQusCountryID });
                  console.log("Your Data:::", data[1].ResQusCountryID); */
            // console.log("your l::",data[0].ResQusID);
            // console.log("your l::",data[0].ResQusStatus);
            // console.log("your l::",data[0].UserID);
            // console.log("your l::",data[1].countryMaxID+1);
            // thisObj.setState({ResidencyCountryID:data[2].ResQusCountryID+1});
            /*       }
              } else {
                  thisObj.setState({ buttonName: "Save" });
              }  */
        })
            .catch((err) => {
                console.log("DATA ", err);
            });
    }
    componentWillUnmount() {
        // this.props.onRef(undefined)
    }
    handleGetGenQusSummary(event) {
        var thisObj = this;
        let UserID;
        let DasboardSummaryAPIUrl = "https://z95u0w2el1.execute-api.us-west-2.amazonaws.com/Dev/GPA_DashboardSummary_Lambda";
        var data = {
            UserID: this.props.LoginData.LUserID,
            QueryName: "Auto"
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
            console.log(":::", data);
            for (var i = 0; i < data.length; i++) {
                console.log("DOBState:" + data[i].DOB_Day + " " + data[i].DOB_Month + " " + data[i].DOB_Year);
                thisObj.setState({ GenQusSelectedCountry: data[i].CountryOfCitizenship });
                thisObj.setState({ GenQusSelectedAddress: data[i].MailingAddress });

                switch (data[i].DOB_Month) {
                    case "January":
                        thisObj.setState({ DBOMonth: 1 });
                        break;
                    case "February":
                        thisObj.setState({ DBOMonth: 2 });
                        break;
                    case "March":
                        thisObj.setState({ DBOMonth: 3 });
                        break;
                    case "April":
                        thisObj.setState({ DBOMonth: 4 });
                        break;
                    case "May":
                        thisObj.setState({ DBOMonth: 5 });
                        break;
                    case "June":
                        thisObj.setState({ DBOMonth: 6 });
                        break;
                    case "July":
                        thisObj.setState({ DBOMonth: 7 });
                        break;
                    case "August":
                        thisObj.setState({ DBOMonth: 8 });
                        break;
                    case "September":
                        thisObj.setState({ DBOMonth: 9 });
                        break;
                    case "October":
                        thisObj.setState({ DBOMonth: 10 });
                        break;
                    case "November":
                        thisObj.setState({ DBOMonth: 11 });
                        break;
                    case "December":
                        thisObj.setState({ DBOMonth: 12 });
                        break;
                }
                thisObj.setState({ DateOfBirth: data[i].DOB_Day + "/" + thisObj.state.DBOMonth + "/" + data[i].DOB_Year },
                    function () {
                        // console.log("DateOfBirth:data[i].DOB_Day:",data[i].DOB_Day);
                        // console.log("thisObj.state.DBOMonth:",thisObj.state.DBOMonth);
                        // console.log("data[i].DOB_Year:",data[i].DOB_Year);

                        var kk = new Date(thisObj.state.DBOMonth + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year); //thisObj.dateString2Date("12/10/2015");//data[i].DOB_Day+"/"+thisObj.state.DBOMonth+"/"+data[i].DOB_Year);
                        // thisObj.dateString2Date(kk.getDay()+""+kk.getMonth()-1+""+kk.getFullYear);
                        console.log("kk::", kk + "||" + data[i].DOB_Day + "-" + thisObj.state.DBOMonth + "-" + data[i].DOB_Year);
                        //var now = new Date();
                        //var past = new Date(thisObj.state.DBOMonth + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year);

                        var bthDate, curDate, days;
                        var ageYears, ageMonths, ageDays;
                        bthDate = new Date(data[i].DOB_Year, thisObj.state.DBOMonth - 1, data[i].DOB_Day);
                        curDate = new Date();
                        if (bthDate > curDate) return;
                        days = Math.floor((curDate - bthDate) / (1000 * 60 * 60 * 24));
                        ageYears = Math.floor(days / 365);
                        ageMonths = Math.floor((days % 365) / 31);
                        // alert(ageYears);
                        //alert(ageMonths);                              
                        thisObj.setState({ ApplicantAgeMonth: ageMonths });
                        thisObj.setState({ ApplicantAge: ageYears }, function () {
                            console.log("Age:", ageYears);
                            console.log("Months:", ageMonths);
                            // console.log("Month:",m);
                        });
                    }
                );



                // thisObj.setState({ InquiryState: data[i].InquiryAbout });
                // thisObj.setState({ AreYouState: data[i].AreYou });
                // thisObj.setState({ GenderState: data[i].Gender });
                // thisObj.setState({ TitleState: data[i].Title });
                // thisObj.setState({ FirstNameState: data[i].FirstName });
                // thisObj.setState({ MiddleNameState: data[i].MiddleName });
                // thisObj.setState({ LastNameState: data[i].LastName });
                // thisObj.setState({ SuffixState: data[i].Suffix });
                // thisObj.setState({ UserIdState: data[i].UserID });
                // thisObj.setState({ BirthNameState: data[i].BirthName });
                // thisObj.setState({ MaidenNameState: data[i].MaidenName });
                // thisObj.setState({ DOBState: data[i].DOB_Day + " " + data[i].DOB_Month + " " + data[i].DOB_Year });
                // thisObj.setState({ CountryState: data[i].CountryOfCitizenship });
                // thisObj.setState({ MailingAddressState: data[i].MailingAddress });
                // thisObj.setState({ PhoneNumState: data[i].PhoneNum });
                // thisObj.setState({ HomeNumState: data[i].HomeNum });
                // thisObj.setState({ MaritalStatusState: data[i].MaritalStatus });
                // if (data[i].MaritalStatus == "Single") {
                //     thisObj.setState({ PModalEnableState: false });
                //     thisObj.setState({ PartnerInfoShow: true });
                // }
                // else {                    
                //     if (data[i].MaritalStatus == "Married") {
                //         thisObj.setState({ PModalTitleState: "Date of Marriage" });
                //         thisObj.setState({ PModalEnableState: true });
                //         thisObj.setState({ PartnerInfoShow: false });
                //     }
                //     else if (data[i].MaritalStatus == "Civil Partnership") {
                //         thisObj.setState({ PModalTitleState: "Date of Civil Partnetship" });
                //         thisObj.setState({ PModalEnableState: true });
                //         thisObj.setState({ PartnerInfoShow: false });
                //     }
                //     else if (data[i].MaritalStatus == "Divorced") {
                //         thisObj.setState({ PModalTitleState: "Date of Divorced" });
                //         thisObj.setState({ PModalEnableState: true });
                //         thisObj.setState({ PartnerInfoShow: false });
                //     }
                //     else if (data[i].MaritalStatus == "Widowed") {
                //         thisObj.setState({ PModalTitleState: "Date of Windowed" });
                //         thisObj.setState({ PModalEnableState: true });
                //         thisObj.setState({ PartnerInfoShow: false });
                //     }
                //     else {
                //         thisObj.setState({ PModalEnableState: false });
                //         thisObj.setState({ PartnerInfoShow: true });
                //     }
                // }
                // thisObj.setState({ DOMCDWState: data[i].DOMCDW_Day + " " + data[i].DOMCDW_Month + " " + data[i].DOMCDW_Year });
                // thisObj.setState({ PGenderState: data[i].PGender });
                // thisObj.setState({ PTitleState: data[i].PTitle });
                // thisObj.setState({ PFirstNameState: data[i].PFirstName });
                // thisObj.setState({ PMiddleNameState: data[i].PMiddleName });
                // thisObj.setState({ PLastNameState: data[i].PLastName });
                // thisObj.setState({ PSuffixState: data[i].PSuffix });
                // thisObj.setState({ PDOBState: data[i].PDOB_Day + " " + data[i].PDOB_Month + " " + data[i].PDOB_Year });
                // thisObj.setState({ PCountryState: data[i].PCountryOfCitizenship });
                // thisObj.setState({ PMailingAddressState: data[i].PMailingAddress });
            }

        }).catch((err) => {
            console.log("DATA ", err);
        });

    }
    handlerMonthName(MonthName) {
        let MonthNo = 0;
        switch (MonthName) {
            case "January":
                MonthNo = 1;
                //thisObj.setState({ DBOMonth: 1 });
                break;
            case "February":
                MonthNo = 2;
                //thisObj.setState({ DBOMonth: 2 });
                break;
            case "March":
                MonthNo = 3;
                //thisObj.setState({ DBOMonth: 3 });
                break;
            case "April":
                MonthNo = 4;
                //thisObj.setState({ DBOMonth: 4 });
                break;
            case "May":
                MonthNo = 5;
                //thisObj.setState({ DBOMonth: 5 });
                break;
            case "June":
                MonthNo = 6;
                //thisObj.setState({ DBOMonth: 6 });
                break;
            case "July":
                MonthNo = 7;
                //thisObj.setState({ DBOMonth: 7 });
                break;
            case "August":
                MonthNo = 8;
                //thisObj.setState({ DBOMonth: 8 });
                break;
            case "September":
                MonthNo = 9;
                //thisObj.setState({ DBOMonth: 9 });
                break;
            case "October":
                MonthNo = 10;
                //thisObj.setState({ DBOMonth: 10 });
                break;
            case "November":
                MonthNo = 11;
                //thisObj.setState({ DBOMonth: 11 });
                break;
            case "December":
                MonthNo = 12;
                //thisObj.setState({ DBOMonth: 12 });
                break;
        }
        return MonthNo;
    }
    dateString2Date(dateString) {
        var dt = dateString.split(/\-|\s/);
        return new Date(dt.slice(0, 3).reverse().join('-') + ' ' + dt[3]);
    }
    handleChangeMonth = (event, index, value) => {
        this.setState({ InvnLinkMsg: false });
        this.setState({ InvnAddCompanyLinkMsg: false });
        this.setState({ InvnAddCountryLinkMsg: false });
        this.setState({ Monthstate: value });
    };
    handleChangeEndMonth = (event, index, value) => {
        this.setState({ InvnLinkMsg: false });
        this.setState({ InvnAddCompanyLinkMsg: false });
        this.setState({ InvnAddCountryLinkMsg: false });
        this.setState({ EndMonthstate: value });
        // this.handleLoadCompany(this);
    };
    handleChangeCountry = (event, index, value) => {
        let thisObj = this;
        this.setState({ InvnLinkMsg: false });
        this.setState({ InvnAddCompanyLinkMsg: false });
        this.setState({ InvnAddCountryLinkMsg: false });
        this.setState({ CountryState: value }, function () {
            // alert(this.state.GenQusSelectedCountry);
            if (this.state.CountryState == this.state.GenQusSelectedCountry) {
                this.setState({ currentAddress: this.state.GenQusSelectedAddress });
                // thisObj.handleLoadCompany(value);
            }
        });
        thisObj.handleLoadCompany(value);
        //this.handleLoadCompany(this);
        this.setState({ CountryNameState: event.target.innerText })
    };
    handleChangeCompany = (event, index, value) => {
        this.setState({ InvnLinkMsg: false });
        this.setState({ InvnAddCompanyLinkMsg: false });
        this.setState({ InvnAddCountryLinkMsg: false });
        this.setState({ CompanyState: value }, function () {
            //            alert(this.state.InvnAddCompanyLinkMsg);
            // this.setState({InvnAddCompanyLinkMsg:false});
        });
    };
    handleChangeYear = (event, index, value) => {
        this.setState({ InvnLinkMsg: false });
        this.setState({ InvnAddCompanyLinkMsg: false });
        this.setState({ InvnAddCountryLinkMsg: false });
        this.setState({ Yearstate: value });
    };
    handleChangeEndYear = (event, index, value) => {
        this.setState({ InvnLinkMsg: false });
        this.setState({ InvnAddCompanyLinkMsg: false });
        this.setState({ InvnAddCountryLinkMsg: false });
        const { validationError } = this.state;
        this.setState({ EndYearstate: value }, function () {
            // alert(this.state.EndYearstate+"::"+this.state.Yearstate);
            if (this.state.EndYearstate == this.state.Yearstate || this.state.EndYearstate < this.state.Yearstate) {
                this.setState({ ValidateYear: true });
                // validationError['ValidateYear'] = true;
            } else {
                this.setState({ ValidateYear: false });
                // validationError['ValidateYear'] = false;
            }
        });
    };
    handlerDateValidate(fromMonth, fromYear, toMonth, toYear, selectedDate) {

        var flag = false;
        let month = new Date(selectedDate);
        let currMonth = month.getMonth() + 1;
        // let monthNo =  this.handlerMonthName(fromMonth);
        // let endMonthNo =  this.handlerMonthName(toMMonth);
        let selectedYear = month.getFullYear();
        let endYear = month.getFullYear();

        if ((fromYear <= selectedYear) && (toYear >= endYear)) {
            if (fromYear == selectedYear) {
                if (fromMonth <= currMonth) {
                    flag = false;
                    //this.setState({ checkValidFutureFromDate: false });
                } else {
                    flag = true;
                    //this.setState({ checkValidFutureFromDate: true });
                }
            }
            else if (toYear == endYear) {
                if (toMonth >= currMonth) {
                    flag = false;
                    //this.setState({ checkValidFutureFromDate: false });
                } else {
                    flag = true;
                    //this.setState({ checkValidFutureFromDate: true });
                }
            } else {
                flag = false;
                //this.setState({ checkValidFutureFromDate: false });
            }
        } else {
            flag = true;
            //this.setState({ checkValidFutureFromDate: true });
        }
        return flag;
    }
    handlerWorkingOutSideUKFrom = (event, date) => {
        this.setState({ WorkingOutSideUKFrom: date }, function () {
            let month = new Date(this.state.WorkingOutSideUKFrom);
            let currMonth = month.getMonth() + 1;
            let monthNo = this.handlerMonthName(this.state.Monthstate);
            let endMonthNo = this.handlerMonthName(this.state.EndMonthstate);
            let selectedYear = month.getFullYear();
            let endYear = month.getFullYear();
            var isShowErrMsg = this.handlerDateValidate(monthNo, this.state.Yearstate, endMonthNo, this.state.EndYearstate, month);
            if (isShowErrMsg == true) {
                this.setState({ checkValidFutureFromDate: true });
            } else {
                this.setState({ checkValidFutureFromDate: false });
            }
            //if((monthNo<=currMonth)&&(this.state.Yearstate<=selectedYear)&&(endMonthNo>=currMonth)&&(this.state.EndYearstate>=endYear)){
            /*   if((this.state.Yearstate<=selectedYear)&&(this.state.EndYearstate>=endYear)){
                   if(this.state.Yearstate==selectedYear){
                       if(monthNo<=currMonth){
                           this.setState({ checkValidFutureFromDate: false });
                           alert("true="+this.state.Monthstate);
                       }else{
                           this.setState({ checkValidFutureFromDate: true });
                           alert("false"+this.state.Monthstate); 
                       }
                   }
                   else if(this.state.EndYearstate==endYear){
                       if(endMonthNo>=currMonth){
                           this.setState({ checkValidFutureFromDate: false });
                           alert("true="+this.state.Monthstate);
                       }else{
                           this.setState({ checkValidFutureFromDate: true });
                           alert("false"+this.state.Monthstate); 
                       }
                   }else{
                       this.setState({ checkValidFutureFromDate: false });
                       alert("false"+this.state.Monthstate);
                   }
               }else{
                   this.setState({ checkValidFutureFromDate: true });
                   alert("false"+this.state.Monthstate);
               } */
            // if (this.state.WorkingOutSideUKFrom < new Date()) {
            //     this.setState({ checkValidFutureFromDate: false });
            // } else {
            //     this.setState({ checkValidFutureFromDate: true });
            // }
        });
    }
    handlerWorkingOutSideUKTo = (event, date) => {
        this.setState({ WorkingOutSideUKTo: date }, function () {
            let month = new Date(this.state.WorkingOutSideUKTo);
            let currMonth = month.getMonth() + 1;
            let monthNo = this.handlerMonthName(this.state.Monthstate);
            let endMonthNo = this.handlerMonthName(this.state.EndMonthstate);
            let selectedYear = month.getFullYear();
            let endYear = month.getFullYear();
            let isShowErrMsg = this.handlerDateValidate(monthNo, this.state.Yearstate, endMonthNo, this.state.EndYearstate, month);
            if (isShowErrMsg == true) {
                this.setState({ checkValidFuture: true });
            } else {
                this.setState({ checkValidFuture: false });
            }
            // if (this.state.WorkingOutSideUKFrom <= this.state.WorkingOutSideUKTo) {
            //     if (this.state.WorkingOutSideUKTo < new Date()) {
            //         this.setState({ checkValid: false });
            //         this.setState({ checkValidFuture: false });
            //     } else {
            //         this.setState({ checkValidFuture: true });
            //     }
            // } else {
            //     this.setState({ checkValid: true });
            // }
        });
    }
    handleChangeKnowledge = (event, index, value) => {
        this.setState({ InvnLinkMsg: false });
        this.setState({ InvnAddCompanyLinkMsg: false });
        this.setState({ InvnAddCountryLinkMsg: false });
        this.setState({ Knowledgestate: value });
    };
    handleChangeTest1 = (event, index, value) => {
        this.setState({ InvnLinkMsg: false });
        this.setState({ InvnAddCompanyLinkMsg: false });
        this.setState({ InvnAddCountryLinkMsg: false });
        this.setState({ Test1: value });
    };
    handleChangeTest2 = (event, index, value) => {
        this.setState({ InvnLinkMsg: false });
        this.setState({ InvnAddCompanyLinkMsg: false });
        this.setState({ InvnAddCountryLinkMsg: false });
        this.setState({ Test2: value });
    };
    handleChangeTest3 = (event, index, value) => {
        this.setState({ InvnLinkMsg: false });
        this.setState({ InvnAddCompanyLinkMsg: false });
        this.setState({ InvnAddCountryLinkMsg: false });
        this.setState({ Test3: value });
    };
    handleTextContent(e) {
        this.setState({ InvnLinkMsg: false });
        this.setState({ InvnAddCompanyLinkMsg: false });
        this.setState({ InvnAddCountryLinkMsg: false });
        this.setState({ textContent: e.target.value });
    }
    handleChangeSSNumber(e) {

        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            this.setState({ SSNumberState: onlyNums });
        }
    };
    handlePersonalID(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 12) {
            this.setState({ personalID: onlyNums });
        }
    }
    handleNextEmp(e) {
        e.preventDefault();
        this.setState({ isEnabledAddNextEmp: true });
    }
    handleAddCountryEnabled(e) {
        e.preventDefault();
        this.setState({ isEnabledAddCountry: true });
    }
    handleCompanyName(e) {
        // alert(this.state.InvnAddCompanyLinkMsg);
        this.setState({ selectedCompany: e.target.value }, function () {
            // this.setState({InvnLinkMsg:false}); 
            // this.setState({InvnAddCompanyLinkMsg: false});
            // this.setState({InvnAddCountryLinkMsg:false});
        });
    }

    handleSelectSuggest(suggest) {
        this.setState({ search: "", currentAddress: suggest.formatted_address })
    }

    handleAddress(e) {
        this.setState({ search: e.target.value, currentAddress: e.target.value })
    }

    test(e) {
        e.preventDefault();
        // alert(this.state.Monthstate);
    }

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
            headers: AxiosHeaderConfig

        }).then(({ data }) => {
            console.log(")))::", data);
            CountryItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                CountryItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    validateFormField(e) {

        var validForm = false;
        const { validationError } = this.state;
        // if (this.state.selectedCountry!="") {
        // //this.setState({ isShowErrCountry: false });
        // validForm = true;
        // validationError['Country'] = false;
        // } else {
        // //this.setState({ isShowErrCountry: true });
        // validForm = false;
        // validationError['Country'] = true;
        // }
        if (this.state.CountryState != "") {
            validationError['Country'] = false;
            validForm = true;
            this.setState({ errCountry: false });
        }
        else {
            this.setState({ errCountry: true });
            validationError['Country'] = true;
            validForm = false;

        }

        if (this.state.CompanyState != "") {
            validationError['Company'] = false;
            this.setState({ errCompany: false });
            validForm = true;
        }
        else {
            this.setState({ errCompany: true });
            validationError['Company'] = true;
            validForm = false;
        }

        /* if (this.state.personalID.length > 0 && this.state.personalID.length > 9) {
        validationError['personalID'] = false;
        validForm = true;
        }
        else {
        validationError['personalID'] = true;
        validForm = false;
        }
        
        /*if (this.state.Monthstate != "") {
        validForm = true;
        validationError['BeginningMonth'] = false;
        } else {
        validForm = false;
        validationError['BeginningMonth'] = true;
        }*/
        if (this.state.Yearstate != "") {
            validForm = true;
            this.setState({ errBeginYear: false });
            validationError['BeginningYear'] = false;
        } else {
            validForm = false;
            this.setState({ errBeginYear: true });
            validationError['BeginningYear'] = true;
        }
        /*if (this.state.EndMonthstate != "") {
        validForm = true;
        validationError['EndMonth'] = false;
        } else {
        validForm = false;
        validationError['EndMonth'] = true;
        }*/
        if (this.state.EndYearstate == "") {
            validForm = false;
            this.setState({ errEndYear: true });
            // alert("show error:::"+this.state.EndYearstate);
            validationError['EndYear'] = true;
        } else {
            validForm = true;
            // alert("hide error:::"+this.state.EndYearstate);
            this.setState({ errEndYear: false });
            validationError['EndYear'] = false;
        }
        if (this.state.currentAddress != "") {
            // this.setState({ isShowCurrentAddress: false });
            validForm = true;
            this.setState({ errCurrentAddress: false });
            validationError['CurrentAddress'] = false;
        } else {
            // this.setState({ isShowCurrentAddress: true });
            this.setState({ errCurrentAddress: true });
            validForm = false;
            validationError['CurrentAddress'] = true;
        }
        if (this.state.WorkingOutSideUKFrom == "") {
            validationError["errWorkingOutSideUKFrom"] = true;
            validForm = false;
        } else {
            validationError["errWorkingOutSideUKFrom"] = false;
            validForm = true;
        }

        if (this.state.WorkingOutSideUKTo == "") {
            validationError["errWorkingOutSideUKTo"] = true;
            validForm = false;
        } else {
            validationError["errWorkingOutSideUKTo"] = false;
            validForm = true;
        }
        //alert(validationError['Country']);
        return validForm;
    }

    submitResidencyData(e) {
        this.testmove = 1;
        let thisObj = this;
        let Saveforecastdata = "";
        const { validationError } = this.state;
        let QueryMode = "";
        if (this.state.CompanyState.length > 0) {
            if (this.state.buttonName == "Update & Return to Dashboard") {
                QueryMode = "UpdateResidencyData";
            } else {
                QueryMode = "AddCompany";
            }
            let residendyData = {
                "queryMode": QueryMode,
                "UserID": this.props.LoginData.LUserID,
                "companyName": this.state.CompanyState,
                "currentAddress": this.state.currentAddress,
                "companyNameQtns2": this.state.Test1,
                "companyNameQtns1": this.state.Test2,
                "companyNameQtns3": this.state.Knowledgestate,
                "companyNameQtns4": this.state.Test3,
                "companyNameQtns5": this.state.textContent,
                "residencyCountryID": this.state.ResidencyCountryID,
                "residencyQtnsID": this.state.ResQusID,
                "ResStatus": "C",//this.state.ResStatus,
                //edited here
                "ResidencyCountryID": this.state.ResCountryCode,
                "ResidencyID": this.state.ResCode,
                "EmpCompanyID": this.state.EmpCode,
                // country data:
                "Country": this.state.CountryState,//selectedCountry,
                "ResMonth": this.state.Monthstate,
                "ResYear": this.state.Yearstate,
                "ResCountryMonth": this.state.EndMonthstate,
                "ResCountryYear": this.state.EndYearstate,
                "PersonalID": this.state.personalID,
                "UpdatedStatus": this.state.updateStatus,
                "WorkedFromDate": this.state.WorkingOutSideUKFrom,
                "WorkedToDate": this.state.WorkingOutSideUKTo,

            }

            //this.handleAllMailConditions(this);
            //this.handleCallAllCondition();
            let tempCountryOutput = [];

            let counditionUnderGPA = {
                QueryName: "AppDocTracking",
                UserID: this.props.LoginData.LUserID,
            }

            let countryUnderGPAUrl = " https://j508jr42tb.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentTracking_Lambda";


            //get residency data URL:::
            let residendyCountryData = {
                queryMode: "GetCountryData",
                UserID: this.props.LoginData.LUserID
            }
            let countryApiUrl = "https://n7cv27gqh2.execute-api.us-west-2.amazonaws.com/dev/Initial_Load_Residency";

            // let GeneralInputData = {
            //     UserID: this.props.LoginData.LUserID,
            //     QueryName: "GenInfo",
            // }
            // let GeneralDataURL = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";

            // let SaveForecastLetterURl = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/terms_htmlpdfconv";
            // SaveDataAPICallMailSend(GeneralDataURL, GeneralInputData)
            //     .then((data) => {
            //         var forecastdata = "";
            //         console.log("Gendata::", data);
            //         data.map((item, key) => {
            //             console.log("new::", forecastdata)
            //             Saveforecastdata = {
            //                 "html": "Data",
            //                 "language": "en",
            //                 "DocCategory": "fcl",
            //                 "FCLType": "Post",
            //                 "params": {
            //                     "empId": this.props.LoginData.LUserID,//"pitchaimuthu.k@mitosistech.com",
            //                     "ninumber": item.ninumber,
            //                     "Countrycitizenship": item.Countrycitizenship,
            //                     "firstName": item.firstName,
            //                     "middleName": item.middleName,
            //                     "lastName": item.lastName,
            //                     "othersurnames": "Tamil",
            //                     "dateofbirth": item.dateofbirth,
            //                     "maritalstatus": item.maritalstatus,
            //                     "datemarriagedeath": item.datemarriagedeath,
            //                     "Countryaddress": item.Countryaddress,
            //                     "dateleftcountry": item.dateleftcountry
            //                 }
            //             };
            //         });
            //         let forecastletterurl = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
            //         let forecastInputData = {
            //             "MainFolderName": "applicant",
            //             "SubFolderName": this.props.LoginData.LUserID,
            //             "MailDocName": "FCL",
            //             "FCLType": "Post",
            //             "LangCode": "en",
            //             "EmailTo": this.props.LoginData.LUserID,//"pitchaimuthu.k@mitosistech.com"//"easwaran.k@mitosistech.com"
            //         }
            //         if (thisObj.state.ApplicantAge >= 65 && thisObj.state.ApplicantAgeMonth > 6) {
            //             //Save Forecast letter auto populated
            //             SaveDataAPICallMailSend(SaveForecastLetterURl, Saveforecastdata)
            //                 .then((data) => {
            //                     console.log("forecast letter saved in s3 buckets", data);
            //                     SaveDataAPICallMailSend(forecastletterurl, forecastInputData)
            //                         .then((data) => {
            //                             console.log("forecast letter sent successfully", data);
            //                         }).catch((err) => {
            //                         })
            //                     console.log("sending email successfully");
            //                 }).catch((err) => {
            //                     console.log("error sending email");
            //                     console.log("Read::", Saveforecastdata)
            //                 });
            //         }
            //     }).catch((err) => {
            //         console.log(err);
            //     });
            ///////////End*******************//////
            ////sending otherdouments mail to upload for applicant
            // let OtherDocumentationURL = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
            // let OtherDocumentData = {
            //     "MailDocName": "OtherDocumentation",
            //     "EmailTo": this.props.LoginData.LUserID//ramya.s@mitosistech.com
            // }
            // if (thisObj.state.ApplicantAge >= 65 && thisObj.state.ApplicantAgeMonth > 6) {
            //     SaveDataAPICallMailSend(OtherDocumentationURL, OtherDocumentData)
            //         .then((data) => {
            //             console.log("Otherdocuments mail has to be sent to user", data);

            //         }).catch((err) => {
            //             console.log(err);
            //         });
            // }
            ///////////End**************///////
            // let mailSendURL = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
            // let POAField = {
            //     "MainFolderName": "template",
            //     "SubFolderName": "poa",
            //     "MailDocName": "POA",
            //     "LangCode": "en",
            //     "EmailTo": this.props.LoginData.LUserID//"easwaran.k@mitosistech.com"
            // }
            // track user status here
            // let StatusURL = "https://3hv4utwlf9.execute-api.us-west-2.amazonaws.com/dev/UserStatusTracking_Lambda";
            // let StatusInput = {
            //     UserID: this.props.LoginData.LUserID,//"pitchaimuthu.k@mitosistech.com",//this.props.LoginData.LUserID,
            //     AppliedDate: new Date(),
            //     AppliedForm: "Residency Form"
            // }
            // insert and save document send status in database
            // let StatusURL1 = "https://n7cv27gqh2.execute-api.us-west-2.amazonaws.com/dev/Initial_Load_Residency";
            // let StatusInput1 = {
            //     "queryMode": "SaveDocumentSendStatus",
            //     UserID: this.props.LoginData.LUserID,//"pitchaimuthu.k@mitosistech.com",//this.props.LoginData.LUserID,
            //     DocumentName: this.state.DocumentID,
            //     CountryCode: this.state.CountryState,
            //     IsSend: "Y",
            //     IsReceived: "Y",
            //     IsApproved: "N",
            //     SendDate: new Date(),
            //     ReceivedDate: "",
            //     ApprovedDate: "",
            //     NoticeDays: "",
            //     DocStatus: "Y",
            //     IsActive: "Y"
            //     //  CountryCode:
            // }
            // call all the api here   
            SaveDataAPICallMailSend(countryApiUrl, residendyData)
                .then((data) => {
                    console.log("NEWSR_RESIDENCY", data);
                    if (data == "record already existed" && thisObj.state.ResetAddCountry == true) {
                        thisObj.setState({ checkExistCountry: true });
                        thisObj.setState({ checkExistCompany: false });
                        thisObj.setState({ checkExistCountryAll: false });
                    } else if (data == "record already existed" && thisObj.state.flag == true) {
                        //alert("alert");
                        thisObj.setState({ checkExistCountryAll: true });
                        thisObj.setState({ checkExistCountry: false });
                        thisObj.setState({ checkExistCompany: false });
                    }
                    else if (data == "record already existed") {
                        thisObj.setState({ checkExistCountryAll: false });
                        thisObj.setState({ checkExistCountry: false });
                        thisObj.setState({ checkExistCompany: true });
                    }
                    if (data != "record already existed") {
                        SaveDataAPICallMailSend(countryApiUrl, residendyCountryData)
                            .then((data) => {
                                // var CountryName=this.setState.CountryName;
                                console.log("Residency::", data);
                                for (let i = 0; data.length > i + 1; i++) {
                                    data[i].map((item, key) => {
                                        //item.CountryName 
                                        thisObj.setState({ CountryName: item.CountryName });
                                        //console.log("M::",item.CountryName);
                                    })
                                }
                            }).catch(() => {
                            })
                    }
                    console.log(data);
                    if (thisObj.state.flag == true) {
                        var thisobj = this;
                        if (data == "record already existed") {
                            thisObj.setState({ InvnLinkMsg: false });
                            if (thisObj.state.flag == true) {
                                thisObj.setState({ checkExistCountryAll: true });
                                thisObj.setState({ checkExistCompany: false });
                            } else {
                                thisObj.setState({ checkExistCountryAll: false });
                                thisObj.setState({ checkExistCompany: true });

                            }
                        }
                    }
                    console.log(data);
                    if (thisObj.state.flag == true) {
                        ///we need to change the below condition.
                        // if (thisObj.state.ApplicantAge >= 65 && thisObj.state.ApplicantAgeMonth > 6) {
                        //     SaveDataAPICallMailSend(mailSendURL, POAField)
                        //         .then((data) => {
                        //             console.log("()sending email successfully", data);
                        //             SaveDataAPICallMailSend(StatusURL, StatusInput);
                        //             SaveDataAPICallMailSend(StatusURL1, StatusInput1);
                        //             // thisObj.handleAppProcessFlowUpdate(thisObj);
                        //         }).catch((err) => {
                        //             console.log("error sending email");
                        //         })
                        // }
                        // if (thisObj.state.ApplicantAge >=65 && thisObj.state.ApplicantAgeMonth <=6 ) {
                        //     //   alert("checking");  CallAPIFunc(ForecastLetterURl, ForecastLetterData)
                        //     SaveDataAPICallMailSend(countryUnderGPAUrl, counditionUnderGPA)
                        //     .then((data) => {
                        //         console.log("CountryGPA:", data);
                        //         if (data.length > 0) {

                        //             for (let i = 0; i<data.length ; i++) {

                        //                 if (data[i].UnderGPA == "Y") {

                        //                     thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart2?CountryCode="+data[i].CountryCode });
                        //                 }
                        //                 else if (data[i].UnderGPA == "N") {
                        //                     thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart1" });
                        //                 }
                        //             //     else{
                        //             //         thisObj.setState({ BenQusDivVisible: true });
                        //             // thisObj.setState({ BenQusDivStyle: "social-box" });
                        //             // thisObj.setState({ BenQusEditBtnVisible: true });
                        //             // thisObj.setState({ BenQusEditBtnStyle: "btn btn" });
                        //             // thisObj.setState({ NavBenQus: "/ApplicantDashboard" });
                        //             //     }
                        //             }
                        //         }
                        //     }).catch((err) => {
                        //         console.log("Failed to Navigate");
                        //     })
                        //     //thisObj.setState({ NavBenQus: "/BenefitsQuestionnariePart2" });
                        // } 
                        //else{
                        // let ApplicantDenied="https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
                        // let ApplicantDeniedData={
                        //     "MailDocName":"ApplicantDeniedMail",
                        //     "EmailTo":this.props.LoginData.LUserID//ramya.s@mitosistech.com
                        // }

                        // SaveDataAPICallMailSend(ApplicantDenied,ApplicantDeniedData)
                        // .then((data)=>{
                        //     console.log("ApplicantDenied mail has to be sent to user", data);

                        // }).catch((err)=>{
                        //     console.log(err);
                        // });
                        // }
                        thisObj.setState({ InvnLinkMsg: true }, function () {
                            thisObj.setState({ successmsg: "Record Inserted Successfully" });
                        });
                        // thisObj.handleAppProcessFlowUpdate(thisObj);
                    }
                    //} 
                    thisObj.handleAppProcessFlowUpdate(thisObj);
                    thisObj.setState({ InvnAddCompanyLinkMsg: true }, function () {
                        if (thisObj.state.buttonName == "Update & Return to Dashboard") {
                            thisObj.setState({ successmsg: "Record Updated Successfully" });
                        } else {
                            thisObj.setState({ successmsg: "Record Inserted Successfully" });
                        }
                        //this.setState({ successmsg: "Record Inserted Successfully" });
                    });
                    if (thisObj.state.flag == true || thisObj.state.ResetAddCountry == true) {
                        thisObj.setState({ selectedCompany: "" });
                        thisObj.setState({ CompanyState: "" });
                        thisObj.setState({ Test1: "No" });
                        thisObj.setState({ Test2: "No" });
                        thisObj.setState({ Test3: "No" });
                        thisObj.setState({ Knowledgestate: "No" });
                        thisObj.setState({ textContent: "" });
                        thisObj.setState({ selectedCountry: "" });
                        thisObj.setState({ Monthstate: "" });
                        thisObj.setState({ Yearstate: "" });
                        thisObj.setState({ EndMonthstate: "" });
                        thisObj.setState({ EndYearstate: "" });
                        thisObj.setState({ personalID: "" });
                        thisObj.setState({ currentAddress: "" });
                        thisObj.setState({ CountryState: "" });
                        thisObj.setState({ CompanyState: "" });
                        thisObj.setState({ googleaddress: "" });
                        thisObj.setState({ WorkingOutSideUKFrom: "" });
                        thisObj.setState({ WorkingOutSideUKTo: "" });
                        thisObj.setState({ CountryNameState: "" });
                        thisObj.setState({ checkExistCompany: false });
                        thisObj.setState({ checkExistCountryAll: false });
                    } else {
                        //thisObj.setState({checkExistCountryAll:false});
                        thisObj.setState({ checkExistCompany: false });
                        thisObj.setState({ selectedCompany: "" });
                        thisObj.setState({ CompanyState: "" });
                        thisObj.setState({ Test1: "No" });
                        thisObj.setState({ Test2: "No" });
                        thisObj.setState({ Test3: "No" });
                        thisObj.setState({ Knowledgestate: "No" });
                        thisObj.setState({ WorkingOutSideUKFrom: "" });
                        thisObj.setState({ WorkingOutSideUKTo: "" });
                    }
                    thisObj.setState({ InvnAddCountryLinkMsg: true });
                    if (data == "record already existed" && thisObj.state.flag == true) {
                        if (thisObj.state.buttonName == "Save & Return to Dashboard") {
                            history.push('/BenefitsQuestionnariePart1');
                        }
                        else {
                            history.push('/ApplicantDashboard');
                        }
                    }
                    //   if(thisObj.state.isAddCompany)
                }).catch((err) => {
                    console.log(err);
                    thisObj.setState({ InvnLinkMsg: false }, function () {
                        thisObj.setState({ successmsg: "Record Inserted Failed" });
                    });
                    thisObj.setState({ InvnAddCompanyLinkMsg: false });
                    thisObj.setState({ InvnAddCountryLinkMsg: false });
                })
        } else {
            validationError['Company'] = true;
        }
    }

    handleAllMailConditions(event){
        var thisObj = this;
        let SavePOAdata = "";
        let BilateralSendURL = "https://qxredca9lk.execute-api.us-west-2.amazonaws.com/Dev/GPA_AppProcessFlowDatas_Lambda";
        var BilateralMailSendData = {
            UserID: this.props.LoginData.LUserID,
            QueryName: "CountryForm"
        }

        let ApplicantDocumentsGatherTracking = " https://j508jr42tb.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentTracking_Lambda";
        var statusdata = {
            UserID: this.props.LoginData.LUserID,
            QueryName: "AppDocTracking"
        }

        let DasboardSummaryAPIUrl = "https://z95u0w2el1.execute-api.us-west-2.amazonaws.com/Dev/GPA_DashboardSummary_Lambda";
        var data = {
            UserID: this.props.LoginData.LUserID,
            QueryName: "Auto"
        }

        // let mailSendURL = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
        // let POAField = {
        //     "MainFolderName": "template",
        //     "SubFolderName": "poa",
        //     "MailDocName": "POA",
        //     "LangCode": "en",
        //     "EmailTo": this.props.LoginData.LUserID//"easwaran.k@mitosistech.com"
        // }

        let postRetirementEligibiltyLetter = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let postRetirementEligibiltyData = {
            "MailDocName": "postRetirementEligibilityLetter",
            "EmailTo": this.props.LoginData.LUserID
        }

        let preRetirementEligiblityLetter = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let preRetirementEligiblityData = {
            "MailDocName": "preRetirementLetter",
            "EmailTo": this.props.LoginData.LUserID//"spurthi.n@mitosistech.com"
        }

        let notEligibleNoOptions = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let notEligibleNoOptionsdata = {
            "MailDocName": "NotEligibleNoOptions",
            "EmailTo": this.props.LoginData.LUserID//"easwaran.k@mitosistech.com
        }

        let EligibleWithOptions = "https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        let EligibleWithOptionsData = {
            "MailDocName": "EligibleWithOptions",
            "EmailTo": this.props.LoginData.LUserID//"spurthi.n@mitosistech.com"
        }
        
        // let forecastletter=" https://ln3fsp893g.execute-api.us-west-2.amazonaws.com/dev/GPA_MailSending_Lambda";
        // let forecastdata={
        //     "MailDocName":"ForecastLetter",
        //     "EmailTo":this.props.LoginData.LUserID//"spurthi.n@mitosistech.com"
        // }

        let residendyCountryData = {
            queryMode: "GetCountryData",
            UserID: this.props.LoginData.LUserID
        }
        let countryApiUrl = "https://n7cv27gqh2.execute-api.us-west-2.amazonaws.com/dev/Initial_Load_Residency";


        SaveDataAPICallMailSend(DasboardSummaryAPIUrl, data)
            .then((data) => {
                console.log("LL::", data);
                for (var i = 0; i < data.length; i++) {
                    console.log("DOBState:" + data[i].DOB_Day + " " + data[i].DOB_Month + " " + data[i].DOB_Year);
                    switch (data[i].DOB_Month) {
                        case "January":
                            thisObj.setState({ DBOMonth: 1 });
                            break;
                        case "February":
                            thisObj.setState({ DBOMonth: 2 });
                            break;
                        case "March":
                            thisObj.setState({ DBOMonth: 3 });
                            break;
                        case "April":
                            thisObj.setState({ DBOMonth: 4 });
                            break;
                        case "May":
                            thisObj.setState({ DBOMonth: 5 });
                            break;
                        case "June":
                            thisObj.setState({ DBOMonth: 6 });
                            break;
                        case "July":
                            thisObj.setState({ DBOMonth: 7 });
                            break;
                        case "August":
                            thisObj.setState({ DBOMonth: 8 });
                            break;
                        case "September":
                            thisObj.setState({ DBOMonth: 9 });
                            break;
                        case "October":
                            thisObj.setState({ DBOMonth: 10 });
                            break;
                        case "November":
                            thisObj.setState({ DBOMonth: 11 });
                            break;
                        case "December":
                            thisObj.setState({ DBOMonth: 12 });
                            break;
                    }
                    thisObj.setState({ DateOfBirth: data[i].DOB_Day + "/" + thisObj.state.DBOMonth + "/" + data[i].DOB_Year },
                        function () {
                            // console.log("DateOfBirth:data[i].DOB_Day:",data[i].DOB_Day);
                            // console.log("thisObj.state.DBOMonth:",thisObj.state.DBOMonth);
                            // console.log("data[i].DOB_Year:",data[i].DOB_Year);

                            var kk = new Date(thisObj.state.DBOMonth + "/" + data[i].DOB_Day + "/" + data[i].DOB_Year); //thisObj.dateString2Date("12/10/2015");//data[i].DOB_Day+"/"+thisObj.state.DBOMonth+"/"+data[i].DOB_Year);
                            // thisObj.dateString2Date(kk.getDay()+""+kk.getMonth()-1+""+kk.getFullYear);
                            console.log("kk::", kk + "||" + data[i].DOB_Day + "-" + thisObj.state.DBOMonth + "-" + data[i].DOB_Year);
                            //var now = new Date();
                            var bthDate, curDate, days;
                            var ageYears, ageMonths, ageDays;
                            bthDate = new Date(data[i].DOB_Year, thisObj.state.DBOMonth - 1, data[i].DOB_Day);
                            curDate = new Date();
                            if (bthDate > curDate) return;
                            days = Math.floor((curDate - bthDate) / (1000 * 60 * 60 * 24));
                            ageYears = Math.floor(days / 365);
                            ageMonths = Math.floor((days % 365) / 31);

                            thisObj.setState({ ApplicantAgeMonth: ageMonths });
                            thisObj.setState({ ApplicantAge: ageYears }, function () {
                                console.log("Age:", ageYears);
                                console.log("Months:", ageMonths);
                                SaveDataAPICallMailSend(countryApiUrl, residendyCountryData)
                                    .then((data) => {
                                        // var CountryName=this.setState.CountryName;
                                        console.log("Residency::", data);
                                        for (let i = 0; data.length > i + 1; i++) {
                                            data[i].map((item, key) => {
                                                //item.CountryName 
                                                thisObj.setState({ CountryName: item.CountryName });
                                                //console.log("M::",item.CountryName);
                                            })
                                        }
                                    }).catch(() => {
                                    })
                                // console.log("Month:",m);
                            });
                        }
                    );



                      // track user status here
            let StatusURL = "https://3hv4utwlf9.execute-api.us-west-2.amazonaws.com/dev/UserStatusTracking_Lambda";
            let StatusInput = {
                UserID: this.props.LoginData.LUserID,//"pitchaimuthu.k@mitosistech.com",//this.props.LoginData.LUserID,
                AppliedDate: new Date(),
                AppliedForm: "Residency Form"
            }
            // insert and save document send status in database
            let StatusURL1 = "https://n7cv27gqh2.execute-api.us-west-2.amazonaws.com/dev/Initial_Load_Residency";
            let StatusInput1 = {
                "queryMode": "SaveDocumentSendStatus",
                UserID: this.props.LoginData.LUserID,//"pitchaimuthu.k@mitosistech.com",//this.props.LoginData.LUserID,
                DocumentName: this.state.DocumentID,
                CountryCode: this.state.CountryState,
                IsSend: "Y",
                IsReceived: "Y",
                IsApproved: "N",
                SendDate: new Date(),
                ReceivedDate: "",
                ApprovedDate: "",
                NoticeDays: "",
                DocStatus: "Y",
                IsActive: "Y"
                //  CountryCode:
            }
                    

            let GeneralInputData = {
                UserID: this.props.LoginData.LUserID,
                QueryName: "GenInfo",
            }
            let GeneralDataURL = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";

            let SavePOALetterURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";
            SaveDataAPICallMailSend(GeneralDataURL, GeneralInputData)
                .then((data) => {
                    var POAdata = "";
                    console.log("GenPOAdata::", data);
                    data.map((item, key) => {
                        console.log("new::", POAdata)
                        SavePOAdata = {
                            "html": "This is test Data",
                            "language": "en",
                            "DocCategory": "poa",
                            "params": {
                                "empId": this.props.LoginData.LUserID,//"spurthi.n@mitosistech.com",
                                "firstName": item.firstName,
                                "middleName": item.middleName,
                                "lastName": item.lastName,
                            }
                        };
                    });
                    let POAletterurl = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
                    let POAInputData = {
                        "MainFolderName": "applicant",
                        "SubFolderName": this.props.LoginData.LUserID,
                        "MailDocName": "POA",
                        "LangCode": "en",
                        "EmailTo": this.props.LoginData.LUserID,//"spurthi.n@mitosistech.com"//"easwaran.k@mitosistech.com"
                    }
                    if (thisObj.state.ApplicantAge >=56) {
                        //Save Forecast letter auto populated
                        SaveDataAPICallMailSend(SavePOALetterURL, SavePOAdata)
                            .then((data) => {
                                console.log("POA letter saved in s3 buckets", data);
                                SaveDataAPICallMailSend(POAletterurl, POAInputData)
                                    .then((data) => {
                                        SaveDataAPICallMailSend(StatusURL, StatusInput);
                                        SaveDataAPICallMailSend(StatusURL1, StatusInput1);
                                        console.log("POA letter sent successfully", data);
                                    }).catch((err) => {
                                    })
                                console.log("sending email successfully");
                            }).catch((err) => {
                                console.log("error sending email");
                                console.log("Read::", SavePOAdata)
                            });
                    }
                }).catch((err) => {
                    console.log(err);
                });

                  
                    // if(thisObj.state.ApplicantAge>=56  && thisObj.state.ApplicantAge<65){
                    //     SaveDataAPICallMailSend(forecastletter, forecastdata)
                    //         .then((data) => {
                    //             console.log("ForecastData::", data);
                    //         }).catch((err) => {
                    //         })
                    // }


                    //"PRE-retirement eligibiltiy letter (PRE letter)"//
                    if (thisObj.state.ApplicantAge >= 56 && thisObj.state.ApplicantAge <65) {                   
                        SaveDataAPICallMailSend(preRetirementEligiblityLetter, preRetirementEligiblityData)
                            .then((data) => {
                                console.log("CountryGPA:", data);
                                console.log("Pre Retirement letter sent successfully");
                                SaveDataAPICallMailSend(ApplicantDocumentsGatherTracking, statusdata)
                                    .then((data) => {
                                        if (data.length > 0) {
                                            for (let i = 0; i < data.length; i++) {
                                                if (data[i].UnderGPA == "Y" && data[i].LumpSumOption == "N" && data[i].VolContributionOption == "Y" && data[i].Countrycode=='UK') {
                                                    SaveDataAPICallMailSend(EligibleWithOptions, EligibleWithOptionsData)
                                                        .then(() => {
                                                            console.log("Mail sent successfully to all eligible applicant");
                                                        }).catch((error) => {
                                                            console.log("Mail Sending falied to applicant");
                                                        })


                                                }
                                                else if (data[i].UnderGPA == "Y" && data[i].LumpSumOption == "N" && data[i].VolContributionOption == "N" &&  data[i].Countrycode=='CA') {
                                                   alert("Canada");
                                                    SaveDataAPICallMailSend(notEligibleNoOptions, notEligibleNoOptionsdata)
                                                        .then(() => {
                                                            console.log("Mail sent successfully to all the Not Eligible applicant");
                                                        }).catch((error) => {
                                                            console.log("Mail Sending falied to not eligible applicant");
                                                        })
                                                }
                                                else if (data[i].UnderGPA == "Y" && data[i].LumpSumOption == "Y" && data[i].VolContributionOption == "Y" && data[i].Countrycode=='DK') {
                                                    SaveDataAPICallMailSend(EligibleWithOptions, EligibleWithOptionsData)
                                                        .then(() => {
                                                            console.log("Mail sent successfully to eligible applicant ");
                                                        }).catch((error) => {
                                                            console.log("Mail Sending falied ");
                                                        })
                                                }
                                                else if (data[i].UnderGPA == "Y" && data[i].LumpSumOption == "N" && data[i].VolContributionOption == "Y" && data[i].Countrycode=='FR') {
                                                    SaveDataAPICallMailSend(EligibleWithOptions, EligibleWithOptionsData)
                                                        .then(() => {
                                                            console.log("Mail sent successfully to all the Not Eligible and with no buyUpOptions");
                                                        }).catch((error) => {
                                                            console.log("Mail Sending falied  for Not Eligible applicant and with no buyUpOptions");
                                                        })
                                                }
                                                else if (data[i].UnderGPA == "Y" && data[i].LumpSumOption == "N" && data[i].VolContributionOption == "Y" && data[i].Countrycode=='IT') {
                                                    SaveDataAPICallMailSend(EligibleWithOptions, EligibleWithOptionsData)
                                                        .then(() => {
                                                            console.log("Mail sent successfully to all the Not Eligible and with no allOptions");
                                                        }).catch((error) => {
                                                            console.log("Mail Sending falied  for Not Eligible applicant and with no allOptions");
                                                        })
                                                }
                                                
                                                else if (data[i].UnderGPA == "Y" && data[i].LumpSumOption == "Y" && data[i].VolContributionOption == "Y" && data[i].Countrycode=='JP') {
                                                    alert("check");
                                                    SaveDataAPICallMailSend(EligibleWithOptions, EligibleWithOptionsData)
                                                        .then(() => {
                                                            console.log("Mail sent successfully to all the Not Eligible and with no allOptions");
                                                        }).catch((error) => {
                                                            console.log("Mail Sending falied  for Not Eligible applicant and with no allOptions");
                                                        })
                                                }
                                                else if (data[i].UnderGPA == "Y" && data[i].LumpSumOption == "N" && data[i].VolContributionOption == "N" && data[i].Countrycode=='QC') {
                                                    SaveDataAPICallMailSend(notEligibleNoOptions, notEligibleNoOptionsdata)
                                                        .then(() => {
                                                            console.log("Mail sent successfully to all the Not Eligible and with no allOptions");
                                                        }).catch((error) => {
                                                            console.log("Mail Sending falied  for Not Eligible applicant and with no allOptions");
                                                        })
                                                }
                                                else if (data[i].UnderGPA == "Y" && data[i].LumpSumOption == "N" && data[i].VolContributionOption == "N" && data[i].Countrycode=='US') {
                                                    SaveDataAPICallMailSend(notEligibleNoOptions, notEligibleNoOptionsdata)
                                                        .then(() => {
                                                            console.log("Mail sent successfully to all the Not Eligible and with no allOptions");
                                                        }).catch((error) => {
                                                            console.log("Mail Sending falied  for Not Eligible applicant and with no allOptions");
                                                        })
                                                }

                                            }
                                        }

                                    })

                            }).catch((err) => {
                                console.log("Failed to Navigate");
                            })
                    }
                    else if (thisObj.state.ApplicantAge>=65) {                          
                        SaveDataAPICallMailSend(postRetirementEligibiltyLetter, postRetirementEligibiltyData)
                            .then(() => {
                                console.log("Applicant Eligible for Retirement with Post Retirement Eligibility Letter Success");
                            }).catch((error) => {
                                console.log("Applicant Eligible for Retirement with Post Retirement Eligibility Letter failed");
                            })
                    }
                   
                }
            }).catch((err) => {
            })

        }


    submitCompanyData(e) {
        e.preventDefault();
        this.setState({ flag: false });
        this.setState({ ResetAddCountry: false });
        //  thisObj.state.ResetAddCountry==true
        var validForm = this.validateFormField(this);
        // alert(this.state.errEndYear);
        this.setState({ isAddCompany: true });
        //if (validForm) {
        if (validForm == true && this.state.currentAddress != "" && this.state.checkValid == false && this.state.checkValidFuture == false && this.state.checkValidFutureFromDate == false && this.state.CountryState != "") {
            this.submitResidencyData(this);
            /* this.setState({ selectedCompany: "" });
             this.setState({ CompanyState: "" });
             this.setState({ Test1: "" });
             this.setState({ Test2: "" });
             this.setState({ Test3: "" });
             this.setState({ Knowledgestate: "" });
             this.setState({WorkingOutSideUKFrom:""});
             this.setState({WorkingOutSideUKTo:""});*/

        }
        else {
            //this.props.UserData.setResidencyMove("false");
        }
        // call the method for submit the data to Residency method

    }
    submitCountryData(e) {
        e.preventDefault();
        this.setState({ flag: false });
        var validForm = this.validateFormField(this);
        this.setState({ isAddCompany: false });
        //if (validForm) {
        if (validForm == true && this.state.currentAddress != "" && this.state.checkValid == false && this.state.checkValidFuture == false && this.state.checkValidFutureFromDate == false && this.state.CountryState != "") {
            this.setState({ ResetAddCountry: true });
            this.submitResidencyData(this);
            this.handleAppDocGatherTrackSave(this);
            /*   this.setState({ selectedCompany: "" });
               this.setState({ CompanyState: "" });
               this.setState({ Test1: "" });
               this.setState({ Test2: "" });
               this.setState({ Test3: "" });
               this.setState({ Knowledgestate: "" });
               this.setState({ textContent: "" });
               this.setState({ selectedCountry: "" });
               this.setState({ Monthstate: "" });
               this.setState({ Yearstate: "" });
               this.setState({ EndMonthstate: "" });
               this.setState({ EndYearstate: "" });
               this.setState({ personalID: "" });
               this.setState({ currentAddress: "" });
               this.setState({ CountryState: "" });
               this.setState({ CompanyState: "" });
               this.setState({ googleaddress: "" });
               this.setState({WorkingOutSideUKFrom:""});
               this.setState({WorkingOutSideUKTo:""});*/
            //this.props.UserData.setResidencyMove("true");
        }
        else {
            //this.props.UserData.setResidencyMove("false");
        }
    }

    handleAppDocGatherTrackSave(event) {
        let AppDocGatherTrackAPIUrl = "https://j508jr42tb.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentTracking_Lambda";
        let AppDocGatherTrackJSONData = JSON.stringify({
            QueryName: "ADGSave",
            CountryCode: this.state.CountryState,
            UserID: this.props.LoginData.LUserID
        });
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: AppDocGatherTrackJSONData,
            url: AppDocGatherTrackAPIUrl,
            headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            console.log("Error Msg:" + data.error);
        }).catch((err) => {
            // alert("Please Fill Mandatory Fields");
        })
    }

    // below method not used do not delete it
    handleSubmit(event) {
        this.setState({ flag: true });

        this.setState({ ResetAddCountry: false });
        var submitForm = this.validateFormField(this);
        if (submitForm) {
            this.testnum = 2;
            this.setState({ ResStatus: "C" });
            this.submitResidencyData(this);
            localStorage.setItem("isMoveResidency", "true");
            this.props.UserData.setResidencyMove("true");
        } else {

            this.testnum = 1;
            let that = this;
            // let statusInput={
            // queryMode: "CheckStatus",
            // UserID: "easwaran.k@mitosistech.com"//this.props.LoginData.LUserID,
            // }
            let residendyData = {
                queryMode: "CheckStatus",
                UserID: this.props.LoginData.LUserID
            }
            var thisObj = this;
            let countryApiUrl = "https://n7cv27gqh2.execute-api.us-west-2.amazonaws.com/dev/Initial_Load_Residency";
            axios({
                method: "POST",
                url: countryApiUrl,
                data: JSON.stringify(residendyData),


            }).then(({ data }) => {
                console.log(":::", data.ResQusStatus);
                that.setState({ residencyStatus: data.ResQusStatus });
                if (data.ResQusStatus == "P") {
                    this.props.UserData.setResidencyMove("true");
                    // localStorage.setItem("isMoveResidency","false");
                } else {
                    this.props.UserData.setResidencyMove("false");
                    //localStorage.setItem("isMoveResidency","true");
                }
            }).catch((err) => {
                console.log("DATA ", err);
                this.props.UserData.setResidencyMove("false");
                //localStorage.setItem("isMoveResidency","false");
            });
        }
    }
    // below method not used do not delete it
    handleGetChangeCountry(event) {
        var thisObj = this;
        let name = event;
        var arrValue = [];
        let tempCountryOutput = [];
        var data = {
            name: name,
            value: "country",
        }
        let countryApiUrl = "https://nd2le49cm7.execute-api.us-west-2.amazonaws.com/dev/Get_Country_Name";
        var header = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: countryApiUrl,
            data: JSON.stringify(data),
            headers: header,
        }).then(({ data }) => {
            var i = 0;
            let orders = data.map((order) => {
                for (let i = 0; i < order.length; i++) {
                    arrValue.push({ "id": name, "name": order[i].name });
                    // arrValue.push(i,order[i].name);
                }
                arrValue.push(arrValue);
            })
            thisObj.setState({ dataOutput: arrValue });
            // let testSource = [];
            // testSource.push({ "id": "r", "name": "Red" });
            // this.setState({ dataSource: testSource });
            console.log(arrValue);

        })
            .catch((err) => {
                console.log("DATA ", err);
            });
    }
    //below method not used do not delete it
    handleGetChangeCompany(event) {
        var thisObj = this;
        let name = event;
        var arrValue = [];
        this.setState({ searchText: name });
        let tempCountryOutput = [];
        var data = {
            name: name,
            value: "company",
        }
        let countryApiUrl = "https://nd2le49cm7.execute-api.us-west-2.amazonaws.com/dev/Get_Country_Name";
        var header = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: countryApiUrl,
            data: JSON.stringify(data),
            headers: header,
        }).then(({ data }) => {
            var i = 0;
            let orders = data.map((order) => {
                for (let i = 0; i < order.length; i++) {
                    arrValue.push({ "id": name, "name": order[i].name });
                }
                arrValue.push(arrValue);
            })
            thisObj.setState({ companySource: arrValue });
            console.log(arrValue);
        }).catch((err) => {
            console.log("DATA ", err);
        });
    }

    handleAppProcessFlowUpdate(event) {
        let AppProFlowAPIUrl = "https://qxredca9lk.execute-api.us-west-2.amazonaws.com/Dev/GPA_AppProcessFlowDatas_Lambda";
        let JSONData = JSON.stringify({
            QueryName: "UpdateRQ",
            UserID: this.props.LoginData.LUserID,
            ResQus: "C"

        });
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: AppProFlowAPIUrl,
            headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            console.log(data.error);
            // history.push('/MainPage');
        }).catch((err) => {
            // alert("Please Fill Mandatory Fields");
        })
    }
    // Submit functions
    saveResidencyData(e) {
        //alert("Alert check");
        e.preventDefault();
        var thisObj = this;
        var validForm = this.validateFormField(this);
        if (validForm == true && this.state.currentAddress != "" && this.state.checkValid == false && this.state.checkValidFuture == false && this.state.checkValidFutureFromDate == false && this.state.CountryState != "") {//&& this.state.checkExistCompany==false&&this.state.checkExistCountry==false&&this.state.checkExistCountryAll==false&&this.state.isEmptyCompanyName==false) {
            this.setState({ flag: true });
            this.setState({ ResStatus: "C" });
            //alert("Checking ALert");
            this.submitResidencyData(this);
        }
    }
    handlerCompanyMsg(e) {
        this.setState({ InvnAddCompanyLinkMsg: false });
    }
    render() {
        const { CountryState, CompanyState, Monthstate, Yearstate, Knowledgestate, EndMonthstate, EndYearstate, Test1, Test2, Test3 } = this.state;
        const { search, value, currentAddress } = this.state
        const dataSourceConfig = { text: 'name', value: 'id' };
        const { selectedCountry } = this.state;
        // <MenuItem value={"1930"} key={1} primaryText={`1930`} />,
        return (
            <div>
                <Paper zDepth={1} className="CommonDiv">
                    <Row className="show-grid">
                        <Col xs={12} md={12} style={newstyle}>
                            <h4 className="StepperHeading">Residency Questionnaire</h4>
                            <Panel eventKey="1" defaultExpanded>
                                <Panel.Heading>
                                    <Panel.Title toggle>Residency History Questionnarie</Panel.Title>
                                </Panel.Heading>
                                <Panel.Body >
                                    <Row className="show-grid">

                                        <Col xs={12} md={12} className="PanelText">
                                            <fieldset>
                                                <legend className="legendtitle1">Residency Details</legend>
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={4} className="input-fileds" >
                                                        <SelectField
                                                            floatingLabelText={<span>Country of Residency<span className="manatoryfield">*</span></span>}
                                                            value={CountryState}
                                                            onChange={this.handleChangeCountry}
                                                            disabled={this.state.DisableCountryName}
                                                            errorText={this.state.errCountry ? "Please Select Your Country of Residency" : null}
                                                        >
                                                            {CountryItems}
                                                        </SelectField>
                                                    </Col>
                                                    <Col xs={12} md={8}></Col>
                                                </Col>

                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={3} className="input-fileds">
                                                        <SelectField
                                                            value={Monthstate}
                                                            floatingLabelText={<span>Beginning Month (Estimate)</span>}
                                                            onChange={this.handleChangeMonth}
                                                            maxHeight={200}
                                                        // errorText={this.state.validationError["BeginningMonth"] ? "Please Select Your Beginning Month" : null}
                                                        >
                                                            {MonthItems}
                                                        </SelectField>
                                                    </Col>
                                                    <Col xs={12} md={3} className="input-fileds">

                                                        <SelectField
                                                            value={Yearstate}
                                                            floatingLabelText={<span>Beginning Year<span className="manatoryfield">*</span></span>}
                                                            onChange={this.handleChangeYear}
                                                            maxHeight={200}
                                                            errorText={this.state.errBeginYear ? "Please Select Your Beginninng Year" : null}
                                                        >
                                                            {YearItems}
                                                        </SelectField>
                                                    </Col>
                                                    <Col xs={12} md={3} className="input-fileds">
                                                        <SelectField
                                                            value={EndMonthstate}
                                                            // errorText={this.state.validationError["EndMonth"] ? "Please Select End Month" : null}
                                                            floatingLabelText={<span>End Month (Estimate)</span>}
                                                            onChange={this.handleChangeEndMonth}
                                                            maxHeight={200}
                                                        >
                                                            {MonthItems}
                                                        </SelectField>
                                                    </Col>
                                                    <Col xs={12} md={3} className="input-fileds">

                                                        <SelectField
                                                            value={EndYearstate}
                                                            floatingLabelText={<span>End Year<span className="manatoryfield">*</span></span>}
                                                            onChange={this.handleChangeEndYear}
                                                            maxHeight={200}
                                                            errorText={this.state.errEndYear ? "Please Select End Year" : null}
                                                        // errorText={this.state.ValidateYear? "End year should be greater than of start year" : null}
                                                        >
                                                            {YearItems}
                                                        </SelectField>
                                                        {/* <span className="validationmsg">{this.state.ValidateYear ? "End year should be greater than of start year" : null}</span> */}
                                                        <span className="validationmsg">{this.state.ValidateYearValidateYear ? "Not eligible for applying pension. Applicant should stayed selected country atleast 1 year" : null}</span>
                                                    </Col>
                                                </Col>
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={12} className="input-fileds" >
                                                        <TextField
                                                            floatingLabelText={<span>What is your Personal ID number (Social Security / National Insurance number) in <b className="CountryColor">{this.state.CountryNameState}</b> (if known)</span>}
                                                            name={"Personal ID"}
                                                            hintText="Enter Your Personal ID Number"
                                                            value={this.state.personalID}
                                                            onChange={this.handlePersonalID.bind(this)}
                                                        // errorText={this.state.validationError["personalID"] ? "Please Enter Valid Personal ID" : null}
                                                        />
                                                    </Col>
                                                </Col>
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={12} className="input-fileds">
                                                        <h5 className="TopicAlign">Use the permanent address you stayed at the longest from <b className="CountryColor">{this.state.Yearstate}</b> to <b className="CountryColor">{this.state.EndYearstate}</b> while living in <b className="CountryColor">{this.state.CountryNameState}</b>. At a minimum, please provide city and country of residency.</h5>
                                                    </Col>
                                                </Col>
                                                <Col xs={12} md={12}>
                                                    <Col xs={12} md={6} className="input-fileds">
                                                        <ReactGoogleMapLoader
                                                            params={{
                                                                key: API_KEY,
                                                                libraries: "places,geocode",
                                                            }}
                                                            render={googleMaps =>
                                                                googleMaps && (
                                                                    <ReactGooglePlacesSuggest
                                                                        autocompletionRequest={{ input: search }}
                                                                        googleMaps={googleMaps}
                                                                        onSelectSuggest={this.handleSelectSuggest.bind(this)}
                                                                    >
                                                                        <TextField
                                                                            value={this.state.currentAddress}
                                                                            onChange={this.handleAddress.bind(this)}
                                                                            hintText="Enter Your Residency Address"
                                                                            floatingLabelText={<span>Residency Address<span className="manatoryfield">*</span></span>}
                                                                            errorText={this.state.errCurrentAddress ? "Please Enter Your Current Residency Address" : null}
                                                                        />
                                                                    </ReactGooglePlacesSuggest>
                                                                )
                                                            }
                                                        />
                                                    </Col>
                                                </Col>
                                            </fieldset>
                                            <br />
                                            <fieldset>
                                                <fieldset>
                                                    <legend className="legendtitle1">Company Details</legend>
                                                    <Col xs={12} md={12} >
                                                        <Col xs={12} md={12} className="input-fileds" >
                                                            <SelectField
                                                                floatingLabelText={<span>Company Name<span className="manatoryfield">*</span></span>}
                                                                value={CompanyState}
                                                                onChange={this.handleChangeCompany}
                                                                errorText={this.state.errCompany ? "Please Select Your Company Name" : null}
                                                            >
                                                                {CompanyItems}
                                                            </SelectField>
                                                            <span className="error_msg_align validationmsg ">{this.state.isEmptyCompanyName ? "There is no respective company for selected country" : ""}</span>
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12} >
                                                        <Col xs={6} md={6} className="input-fileds">
                                                            <DatePicker hintText="Enter Date"
                                                                floatingLabelText={<span>Date From<span className="manatoryfield">*</span></span>}
                                                                autoOk
                                                                value={this.state.WorkingOutSideUKFrom}
                                                                onChange={this.handlerWorkingOutSideUKFrom}
                                                                errorText={this.state.validationError["errWorkingOutSideUKFrom"] ? "Please select from date" : null}
                                                            />
                                                            <span className="validationmsg">{this.state.checkValidFutureFromDate ? "Please select valid date" : ""}</span>


                                                        </Col>
                                                        <Col xs={6} md={6} className="input-fileds">
                                                            <DatePicker hintText="Enter Date"
                                                                floatingLabelText={<span>Date To<span className="manatoryfield">*</span></span>}
                                                                autoOk
                                                                value={this.state.WorkingOutSideUKTo}
                                                                onChange={this.handlerWorkingOutSideUKTo}
                                                                errorText={this.state.validationError["errWorkingOutSideUKTo"] ? "Please select to date" : null}
                                                            />
                                                            <span className="validationmsg">{this.state.checkValid ? "Selected date must be greater than of from date" : ""}</span>
                                                            <span className="validationmsg">{this.state.checkValidFuture ? "Please select valid date" : ""}</span>
                                                        </Col>
                                                        <Col xs={12} md={12} className="input-fileds" >
                                                            <SelectField
                                                                value={Test1}
                                                                floatingLabelText="Would you like GPA to contact this employer about potential pension benefits you may be entitled?"
                                                                onChange={this.handleChangeTest1.bind(this)}
                                                                maxHeight={200}
                                                            >
                                                                {Teststatus}
                                                            </SelectField>
                                                        </Col>
                                                    </Col>
                                                    <Col xs={12} md={12} >
                                                        <Col xs={12} md={12} className="input-fileds" >
                                                            <SelectField
                                                                // disabled={this.state.Test1? true: null }
                                                                value={Test2}
                                                                floatingLabelText="Are you aware of this employer being no longer in existence, having closed plans, or acquired by another entity?"
                                                                onChange={this.handleChangeTest2}
                                                                maxHeight={200}
                                                            >
                                                                {Teststatus}
                                                            </SelectField>
                                                        </Col>
                                                    </Col>

                                                    {(Test2 == "Yes") ?
                                                        <Col xs={12} md={12}>
                                                            <Col xs={12} md={12} className="input-fileds" >
                                                                <SelectField
                                                                    value={Knowledgestate}
                                                                    floatingLabelText="Best of Your Knowledge"
                                                                    onChange={this.handleChangeKnowledge}
                                                                    maxHeight={200}
                                                                >
                                                                    {Knowledgestatus}
                                                                </SelectField>
                                                            </Col>

                                                            <Col xs={12} md={12} className="input-fileds">
                                                                <TextField floatingLabelText="Please provide any details you may be aware of (name of closed plan, when company closed, who acquired them, etc.)"
                                                                    name={"Text Content"}
                                                                    value={this.state.textContent}
                                                                    onChange={this.handleTextContent.bind(this)}
                                                                />
                                                            </Col>
                                                        </Col>
                                                        : ''}
                                                    <Col xs={12} md={12} >
                                                        <Col xs={12} md={12}>
                                                            <Col md={10}>
                                                            </Col>
                                                            <Col md={2}>
                                                                <Button onClick={this.submitCompanyData.bind(this)} disabled={this.state.DisableCountryName} className="RQ-Add">Add Company</Button>
                                                                {/* <span className="validationmsg">{this.state.checkExistCompany ? "This company already exists in GPA" : ""}</span> */}
                                                                <SweetAlert
                                                                    show={this.state.InvnAddCompanyLinkMsg}
                                                                    title="Success"
                                                                    // text="Record Inserted Successfully"
                                                                    text={this.state.successmsg}
                                                                    onConfirm={() => this.setState({ InvnAddCompanyLinkMsg: false })}
                                                                // onConfirm={this.handlerCompanyMsg.bind(this)}
                                                                />
                                                            </Col>
                                                            <Col md={6}>
                                                                <span className="validationmsg">{this.state.checkExistCompany ? "This company already exists in GPA" : ""}</span>
                                                            </Col>
                                                        </Col>
                                                    </Col><br />
                                                </fieldset>
                                                <Col xs={12} md={12}>
                                                    <Col md={6}>
                                                    </Col>
                                                    <Col md={6}>
                                                        {/* { <Button onClick={this.saveResidencyData.bind(this)} className="RQ-Add" >{this.state.buttonName}</Button> } */}
                                                        <Button onClick={this.submitCountryData.bind(this)} disabled={this.state.DisableCountryName} className="RQ-Add" >Add Country</Button>
                                                        {/* <span className="validationmsg">{this.state.checkExistCountry ? "This country already exists in GPA" : ""}</span> */}
                                                        <SweetAlert
                                                            show={this.state.InvnAddCountryLinkMsg}
                                                            title="Success"
                                                            // text="Record Inserted Successfully"
                                                            text={this.state.successmsg}
                                                            onConfirm={() => this.setState({ InvnAddCountryLinkMsg: false })}
                                                        // onConfirm={this.handleNavAdminPage.bind(this)}
                                                        />

                                                    </Col>
                                                    <Col md={6}>
                                                        <span className="validationmsg">{this.state.checkExistCountry ? "This country already exists in GPA" : ""}</span>
                                                    </Col>
                                                </Col>
                                            </fieldset>
                                            <Col xs={12} md={12}>
                                                <Col md={6}>
                                                </Col>
                                                <Col md={6}>
                                                    <Button onClick={this.saveResidencyData.bind(this)} className="RQ-Add" >{this.state.buttonName}</Button>

                                                    <SweetAlert
                                                        show={this.state.InvnLinkMsg}
                                                        title="Success"
                                                        text={this.state.successmsg}
                                                        //text="Record Inserted Successfully"
                                                        // onConfirm={() => this.setState({ InvnLinkMsg: false  })}
                                                        onConfirm={this.handleNavAdminPage.bind(this)}
                                                    />
                                                    {/* <Button onClick={this.submitCountryData.bind(this)} className="RQ-Add" >Add Country</Button> */}
                                                </Col>
                                                <Col md={6}>
                                                    <span className="validationmsg">{this.state.checkExistCountryAll ? "This country already exists in GPA" : ""}</span>
                                                </Col>
                                            </Col>

                                        </Col>
                                    </Row>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                </Paper>
            </div>
        );
    }
    handleUpdateInput(text) {
        this.setState({
            searchText: text.name
        })
        // alert(text);
        console.log("my text::", text.name);
    }

}
const dataSource = [
    { id: 'r', name: 'Red' },
    { id: 'g', name: 'Green' },
    { id: 'b', name: 'Blue' }
]

const SaveDataAPICallMailSend = function (mailSendURL, data) {
    var promise = new Promise(function (resolve, reject) {
        axios({
            method: "POST",
            url: mailSendURL,
            data: JSON.stringify(data),

        }).then(({ data }) => {
            // console.log("Deva::", data);
            resolve(data);
        })
            .catch((err) => {
                console.log("DATA ", err);
                reject(err);
            });
    })
    return promise;
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
        setCompanyName: (Company) => {
            dispatch(Action.setCompanyName(Company));
        },
        setResidencyMove: (isMoveRec) => {
            dispatch(Action.setResidencyMove(isMoveRec));
        }
    }
}

export default connect(mapReducerStateToProps, mapDispatchToProps)(ResidencyQuestionnarie);