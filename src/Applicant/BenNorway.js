import React, { Component } from 'react';
import PropTypes from "prop-types";
//Bootstrap Component
import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Checkbox from 'material-ui/Checkbox';

import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
// import MonthPickerInput from 'react-month-picker-input';
import AutoComplete from 'material-ui/AutoComplete';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

//Singature Pad
import SignaturePad from 'react-signature-pad';

//API Calling Method
import axios from 'axios';

//Notification 
import Notifications, { notify } from 'react-notify-toast';

//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Google Address
import Geosuggest from 'react-geosuggest';

//Month Picker
import * as Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

//import { Col, Panel, Row, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
var emailresult;
const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
    checkbox: {
        marginBottom: 16,
    },
};

const newstyle = {
    marginTop: 10,
}

const style = {
    block: {
        maxWidth: 250,
    },

    radioButton: {
        marginBottom: 16,
    },
};
// const OutsidenorwayItems = [
//     <MenuItem value={"Y"} key={1} primaryText={`Yes`} />,
//     <MenuItem value={"N"} key={2} primaryText={`No`} />,
// ];
// const LivingaproadItems = [

//     <MenuItem value={"Y"} key={1} primaryText={`Yes`} />,
//     <MenuItem value={"N"} key={2} primaryText={`No`} />,

// ];
const CountryItems = [

];
const BenCountryItems = [
    <MenuItem value={"AU"} primaryText="Australia" />,
    <MenuItem value={"CA"} primaryText="Canada" />,
    <MenuItem value={"EEA"} primaryText="EEA-EU Countries" />,
    <MenuItem value={"MX"} primaryText="Mexico" />,
    <MenuItem value={"NEEA"} primaryText="Non EEA-EU Countries" />,
    <MenuItem value={"ZA"} primaryText="South Africa" />,
    <MenuItem value={"US"} primaryText="United States" />,
    <MenuItem value={"O"} primaryText="Any other country or region not listed" />,

];

const RetirementItems = [
    <MenuItem value={"Y"} key={1} primaryText={`Yes`} />,
    <MenuItem value={"N"} key={2} primaryText={`No`} />,
]
const MaritalStatusItems = [
    <MenuItem value={"Y"} key={1} primaryText={`Yes`} />,
    <MenuItem value={"N"} key={2} primaryText={`No`} />,
]

const PrivatepensionItems = [
    <MenuItem value={"Y"} key={1} primaryText={`Yes`} />,
    <MenuItem value={"N"} key={2} primaryText={`No`} />,

];
const SpouseItems = [
    <MenuItem value={"Y"} key={1} primaryText={`Yes`} />,
    <MenuItem value={"N"} key={2} primaryText={`No`} />,
    <MenuItem value={"S"} key={3} primaryText={`Spouse/partner/cohabitating partner is deceased`} />,

]

const PensionItems = [
    <MenuItem value={"Y"} key={1} primaryText={`Yes`} />,
    <MenuItem value={"N"} key={2} primaryText={`No`} />,
];
const menuProps = {
    desktop: true,
    disableAutoFocus: true,
};

class BenNorway extends Component {
    constructor(props) {
        super(props);
        this.handleLoadCountry(this);
        // this.handleLoadCompany(this);


        //Field State Values Initialization
        this.state = {
            SpouseNameState1:"",
            CivilStatusState:"",
            SNameState:"",
            NamedeceasedState:"",
            DateFrom1:"",
            DateFrom2:"",
            DateFrom3:"",
            DateFrom4:"",
            DateFrom5:"",
            DateTo1:"",
            DateTo2:"",
            DateTo3:"",
            DateTo4:"",
            DateTo5:"",
            Country1:"",
            Country2:"",
            Counrty3:"",
            Country4:"",
            Country5:"",
            PensionScheme1:"",
            PensionScheme2:"",
            PensionScheme3:"",
            PensionScheme4:"",
            PensionScheme5:"",
            Foreignnationalidentitynumber1:"",
            Foreignnationalidentitynumber2:"",
            Foreignnationalidentitynumber3:"",
            Foreignnationalidentitynumber4:"",
            Foreignnationalidentitynumber5:"",
            Lived1:"",
            Lived2:"",
            Lived3:"",
            Lived4:"",
            Lived5:"",
            Worked1:"",
            Worked2:"",
            Worked3:"",
            Worked4:"",
            Worked5:"",
            BankACNumbers:"",
            OtherCountry1:"",
            OtherCountry2:"",
            OtherCountry3:"",
            OtherCountry4:"",
            Pensionscheme1:"",
            Pensionscheme2:"",
            Pensionscheme3:"",
            Pensionscheme4:"",
            Countrycurrency1:"",
            Countrycurrency2:"",
            Countrycurrency3:"",
            Countrycurrency4:"",
            Currency1:"",
            Currency2:"",
            Currency3:"",
            Currency4:"",
            Dfrom1:"",
            Dfrom2:"",
            Dfrom3:"",
            Dfrom4:"",
            Dfrom5:"",
            DTO1:"",
            DTO2:"",
            DTO3:"",
            DTO4:"",
            DTO5:"",
            Employer1:"",
            Employer2:"",
            Employer3:"",
            Employer4:"",
            Employer5:"",
            Norwegianaddress1:"",
            Norwegianaddress2:"",
            Norwegianaddress3:"",
            Norwegianaddress4:"",
            Norwegianaddress5:"",
            LanguageCState:"English",
            pensionlevelState:"100",
            RetirementState:'',
            GoogleAdrsCountry:'',
            NorwegianAccountnumberState: '',
            ReceivingState: '',
            marriedState: '',
            LiveingState: '',
            ApplypensionState: '',
            NationalidnumberState: '',
            BankAccountnumberState: '',
            NationalidentitynumberState: '',
            ChildrenAgeState: '',
            CountryState: '',
            MailingAddressState: '',
            DateState: '',
            Date1State: '',
            BankNameState: '',
            MailingAddress1State: '',
            BankAcNumberState: '',
            BICCodeState: '',
            BankCodeState: "",
            Date1State: '',
            BtnNameState: "Save",
            MailingAddress2State: '',
            EligibleCountryState: "",
            PensionScheme1:"",
            Benefitid: '',

            isValidBICCode: false,

            isValidFormatBICCode: false,


        }
    }
    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        var Params = new URLSearchParams(document.location.search);
        let Benefit = Params.get("BenQusCNIGPAID")
        var Mode = Params.get("Mode");
        let Countryvalue = Params.get("CountryCode")
        if (Params != null || Params != "") {
            if (Mode != null || Mode != "") {
                if (Mode == "E") {
                    // alert("enter")
                    this.handleBenQusNorwayEdit(Benefit);
                }
                else {
                    this.handleBenQusNorwayAuto(this);
                    this.handleBenQusResNorwayAuto(this);
                }
            }
            else {
                this.handleBenQusNorwayAuto(this);
                    this.handleBenQusResNorwayAuto(this);
            }
        }
        else {
            this.handleBenQusNorwayAuto(this);
            this.handleBenQusResNorwayAuto(this);
        }
      
    }


    //Handle Function


    handleUpdateInput = (searchText) => {
        let len = searchText.length;
        if (len > 5) {
            this.setState({
                viewList: true
            })
        }
        else {
            this.setState({
                viewList: false
            })
        }
        this.setState({
            searchText: searchText,
        });
    };


    // Save Pension Data.
    handleSavePensionData(e) {
        console.log("Pension");
        // alert("savepensiondata");
        let SavePensiondata = "";
        let PensionFormID = {
            UserID: emailresult,
            QueryName: "Pensiondata",
        }
        let DataURLPension = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let SaveDataFormURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";

        SaveDataAPICallMailSend(DataURLPension, PensionFormID)
            .then((data) => {
                console.log("data", data)
                data.map((item, key) => {
                    let JSONData = JSON.parse(item.AppAnsInJsonObj);  

                    let AccNo = JSONData.NorwegianAccountnumber;
                    let Phoneno=this.state.PhonenumberState;
                    let Nationalnumber=this.state.NationalNumberState;
                    let PersonalIDNum =this.state.ForeignState;
                    let NationalityState =this.state.NationalityState;
                    let SNationalityState =this.state.SNationalityState;
                    let CivilStatusState= this.state.CivilStatusState;
                    let SNameState= this.state.SNameState;
                    let SNationality1State=this.state.SNationality1State;
                    let NamedeceasedState=this.state.NamedeceasedState;
                    let EligibleCountryState=this.state.EligibleCountryState;
                    let SpouseDateState=this.state.SpouseDateState;
                    let Dateofdied=this.state.DateofdiedState;
                    let Security= this.state.SecurityState;    
                    let DateS=JSONData.Date;   
                    let ChildrenAge= JSONData.ChildrenAgeState; 
                    let BankACNumbers=JSONData.BankAcNumber;

                   
                    let Dfrom1 =this.state.Dfrom1;
                    let DTO1 = this.state.DTO1;
                    let Employer1=this.state.Employer1;                   
                    let Norwegianaddress1=this.state.Norwegianaddress1;
                    let Livedabroad1 =this.state.Livedabroad1;  
                    let workedabroad1=this.state.workedabroad1; 
                    
                    let Dfrom2 =this.state.Dfrom2;
                    let DTO2 = this.state.DTO2;
                    let Employer2=this.state.Employer2;
                    let Norwegianaddress2=this.state.Norwegianaddress2;
                    let Livedabroad2 =this.state.Livedabroad2;  
                    let workedabroad2=this.state.workedabroad2; 
                    
                    let Dfrom3 =this.state.Dfrom3;
                    let DTO3 = this.state.DTO3;
                    let Employer3=this.state.Employer3;
                    let Norwegianaddress3=this.state.Norwegianaddress3;
                    let Livedabroad3 =this.state.Livedabroad3;  
                    let workedabroad3=this.state.workedabroad3; 
                    
                    let Dfrom4 =this.state.Dfrom4;
                    let DTO4 = this.state.DTO4;
                    let Employer4=this.state.Employer4;
                    let Norwegianaddress4=this.state.Norwegianaddress4;
                    let Livedabroad4 =this.state.Livedabroad4;  
                    let workedabroad4=this.state.workedabroad4; 
                   
                    let Dfrom5 =this.state.Dfrom5;
                    let DTO5 = this.state.DTO5;
                    let Employer5=this.state.Employer5;
                    let Norwegianaddress5=this.state.Norwegianaddress5;
                    let Livedabroad5 =this.state.Livedabroad5;  
                    let workedabroad5=this.state.workedabroad5;

                    let DateFrom1 =this.state.DateFrom1;
                    let DateTo1 = this.state.DateTo1;
                    let Country1=this.state.Country1;
                    let PensionScheme1=this.state.PensionScheme1;
                    let Foreignnationalidentitynumber1;
                    let Lived1 =this.state.Lived1;  
                    let Worked1=this.state.Worked1; 
                    
                    let DateFrom2 =this.state.DateFrom2;
                    let DateTo2 = this.state.DateTo2;
                    let Country2=this.state.Country;
                    let PensionScheme2=this.state.PensionScheme2;
                    let Foreignnationalidentitynumber2;
                    let Lived2 =this.state.Lived2;  
                    let Worked2=this.state.Worked2; 
                    
                    let DateFrom3 =this.state.DateFrom3;
                    let DateTo3 = this.state.DateTo3;
                    let Counrty3=this.state.Country3;
                    let PensionScheme3=this.state.PensionScheme3;
                    let Foreignnationalidentitynumber3;
                    let Lived3 =this.state.Lived3;  
                    let Worked3=this.state.Worked3; 
                    
                    let DateFrom4 =this.state.DateFrom4;
                    let DateTo4 = this.state.DateTo4;
                    let Country4=this.state.Country4;
                    let PensionScheme4=this.state.PensionScheme4;
                    let Foreignnationalidentitynumber4;
                    let Lived4 =this.state.Lived4;  
                    let Worked4=this.state.Worked4; 
                   
                    let DateFrom5 =this.state.DateFrom5;
                    let DateTo5 = this.state.DateTo5;
                    let Country5 = this.state.Country5;
                    let Pensionscheme5=this.state.PensionScheme5;
                    let Foreignnationalidentitynumber5;
                    let Lived5 =this.state.Lived5;  
                    let Worked5=this.state.Worked5;



                    let OtherCountry1 =this.state.Currency1;
                    let Pensionscheme1 = this.state.Pensionscheme1;
                    let Countrycurrency1=this.state.Countrycurrency1;
                    let Currency1 =this.state.Currency1;  

                    let OtherCountry2 =this.state.Country2;
                    let Pensionscheme2 = this.state.Pensionscheme2;
                    let Countrycurrency2=this.state.Countrycurrency2;
                    let Currency2 =this.state.Currency2; 

                    let OtherCountry3 =this.state.Country3;
                    let Pensionscheme3 = this.state.Pensionscheme3;
                    let Countrycurrency3=this.state.Countrycurrency3;
                    let Currency3 =this.state.Currency3;   
                    
                    let OtherCountry4 =this.state.Country4;
                    let Pensionscheme4 = this.state.Pensionscheme4;
                    let Countrycurrency4=this.state.Countrycurrency4;
                    let Currency4 =this.state.Currency4;
                     
                    let BankName=JSONData.BankName+JSONData.MailingAddressState;
                    let Bankcode=JSONData.ZABankCode+JSONData.AUBankCode;
                    let BICcode=JSONData.CABIC;
                    let Accountnumber=JSONData.BankAcNumber+JSONData.ZAAccountnumber;
                    

                    
                        


                    let Receiving1=JSONData.Receiving;
                    let SpouseIDnumber =  this.state.SpouseID ;
                    let RecvPensionDate = JSONData.Receiving;
                    let ApplyPension=JSONData.Applypension;
                    let BankAccountnumber = JSONData.BankAccountnumber;
                    let OutsideNorway=this.state.OutsideNorwayState;
                    let livedorworkNorway=this.state.livedorworkNorwayState;
                    let Namedeceased =this.state.SpouseNameState1;
                    let CohabitatingPartner= "";
                    let CohabitatingPartnerMarried= "";
                    let CohabitatingPartners=this.state.CohabitatingPartners;
                    
                    let Liveing =JSONData.Liveing;
                    let NationaliltyNorway1 = false ;   
                    let NationaliltyNorway2 =false ;
                    let NationaliltyNorway3 = "" ;
                    let AFPage="No";
                    let AbroadYes ="";
                    let AbroadNo="";                   
                    let LivingAbroadNo="";
                    let LivingAbroadYes="";
                    let PensionReceiveYes="";
                    let PensionReceiveNo="";
                    let PartnerlivingYes="";
                    let PartnerlivingNo="";
                  
                    let InformationSpouse=true;
                    let InformationPartner=false;    
                    let InformationCohabitingPartner=false;
                    
                    let CivilState1=false;
                    let CivilState2=false;
                    let CivilState3=false;
                    let CivilState4=false;
                    let CivilState5=false;
                    let CivilState6=false;
                    let CivilState7=false;
                    let SpouseNationalityNorway=false;
                    let SpouseNationalityOther=false;
                    let SpouseNationality =false;
                    let DeceasedNationalityNorway=false;
                    let DeceasedNationalityOther=false;
                    let DeceasedNationality="";
                    let PaymentForeignaccount=false;
                    let MarriedRegisteredpartner=false;
                    let SpousenorwegiannationalityNO=false;
                    let SpousenorwegiannationalityOT=false;
                    let Spousenorwegiannationality="";
                    console.log("DateFrom1",DateFrom1);
                    if(NationalityState === "NO"){
                        NationaliltyNorway1=true;
                    }else{
                        NationaliltyNorway2=true;
                        NationaliltyNorway3=this.state.NationalityState;
                    }
                    if(SNationalityState ==="NO"){
                        SpouseNationalityNorway=true;
                    }else{
                        SpouseNationalityOther=true;
                        SpouseNationality=this.state.SpouseNationality;                                        
                    }
                    if(SNationalityState ==="NO"){
                        SpousenorwegiannationalityNO=true;
                    }else{
                        SpousenorwegiannationalityOT=true;
                        Spousenorwegiannationality=this.state.SpouseNationality;                                        
                    }
                    if(SNationality1State ==="NO"){
                        DeceasedNationalityNorway=true;
                    }else{
                        DeceasedNationalityOther=true;
                        DeceasedNationality=this.state.SNationality1State;
                    }
                    if(EligibleCountryState === "NO"){
                        PaymentForeignaccount=true;
                    }
                    if(CivilStatusState === "M" || CivilStatusState === "C"){       
                        MarriedRegisteredpartner=true;
                    }
                    
                    if(CivilStatusState === "S"){                        
                        CivilState6=true;                       
                    }else if(CivilStatusState === "W"){
                        CivilState7=true;
                    }else if(CivilStatusState === "D"){
                        CivilState5=true;
                    }else if(CivilStatusState === "C"){
                        CivilState1=true;
                    }else if(CivilStatusState === "M"){
                        CivilState2=true;
                    }
                    if(CivilStatusState === "M" || CivilStatusState === "C"){                        
                        InformationSpouse=true;
                        InformationPartner=false;    
                        InformationCohabitingPartner=false;
                    }                  
                    if(ApplyPension === "Y"){
                        PensionReceiveYes="Yes";
                    }else{
                        PensionReceiveNo="No";
                    }
                    console.log("PensionReceiveYes",PensionReceiveYes);
                    console.log("PensionReceiveNo",PensionReceiveNo);

                    console.log("ApplyPension",ApplyPension);
                    console.log(typeof(this.state.NationalityState));
                    console.log("national345346457"+this.state.NationalityState);
                    if(Liveing === "Y"){
                        PartnerlivingNo="No";
                    }else{                        
                        PartnerlivingYes="Yes";
                    }
                    if(OutsideNorway === "NO"){
                         AbroadNo="No";
                    }else{
                         AbroadYes="Yes";
                    }
                    if(livedorworkNorway === "NO"){
                        LivingAbroadNo="No";
                    }else{
                        LivingAbroadYes="Yes";
                    }
                    if(ChildrenAge === "Y"){
                        AFPage="Yes";
                    }
                  
                    SavePensiondata = ({
                        "html": "This is test Data",
                        "language": "en",
                        "DocCategory": "NorPaf",
                        "params": {
                            "empId": emailresult,//"spurthi.n@mitosistech.com",
                            "norwaypensionData": {
                               // "NationIdentityNumber": [JSONData.NorwegianAccountnumber],
                                "Language 1": [JSONData.FirstName + JSONData.Lastname],
                                "Language 2": [JSONData.Address],
                                "Language 3": [this.state.LanguageCState],
                                "Name": [this.state.LastnameState + this.state.FirstNameState],
                                "Address": [this.state.MailingAddress],
                                // "Nationalidentitynumber 1": [Nationalnumber.substr(0,1)],
                                // "Nationalidentitynumber 2": [Nationalnumber.substr(1,1)],
                                // "Nationalidentitynumber 3": [Nationalnumber.substr(2,1)],
                                // "Nationalidentitynumber 4": [Nationalnumber.substr(3,1)],
                                // "Nationalidentitynumber 5": [Nationalnumber.substr(4,1)],
                                // "Nationalidentitynumber 6": [Nationalnumber.substr(5,1)],
                                // "Nationalidentitynumber 7": [Nationalnumber.substr(6,1)],
                                // "Nationalidentitynumber 8": [Nationalnumber.substr(7,1)],
                                // "Nationalidentitynumber 9": [Nationalnumber.substr(8,1)],
                                // "Nationalidentitynumber 10": [Nationalnumber.substr(9,1)],
                                // "Nationalidentitynumber 11": [Nationalnumber.substr(10,1)],                               
                                // "Phonenumber 1": [Phoneno.substr(0,1)],
                                // "Phonenumber 2": [Phoneno.substr(1,1)],
                                // "Phonenumber 3": [Phoneno.substr(2,1)],
                                // "Phonenumber 4": [Phoneno.substr(3,1)],
                                // "Phonenumber 5": [Phoneno.substr(4,1)],
                                // "Phonenumber 6": [Phoneno.substr(5,1)],
                                // "Phonenumber 7": [Phoneno.substr(6,1)],
                                // "Phonenumber 8": [Phoneno.substr(7,1)],
                                // "Phonenumber 9": [Phoneno.substr(8,1)],
                                // "Phonenumber 10": [Phoneno.substr(9,1)],                                
                                // "NAVPaymentnumber 1": [AccNo.substr(0,1)],
                                // "NAVPaymentnumber 2": [AccNo.substr(1,1)],
                                // "NAVPaymentnumber 3": [AccNo.substr(2,1)],
                                // "NAVPaymentnumber 4": [AccNo.substr(3,1)],
                                // "NAVPaymentnumber 5": [AccNo.substr(4,1)],
                                // "NAVPaymentnumber 6": [AccNo.substr(5,1)],
                                // "NAVPaymentnumber 7": [AccNo.substr(6,1)],
                                // "NAVPaymentnumber 8": [AccNo.substr(7,1)],
                                // "NAVPaymentnumber 9": [AccNo.substr(8,1)],
                                // "NAVPaymentnumber 10": [AccNo.substr(9,1)],
                                // "NAVPaymentnumber 11": [AccNo.substr(10,1)],
                                "UDIState": [JSONData.CountryStay],
                                "NationalityNorway": [NationaliltyNorway1],
                                "NationalityOther": [NationaliltyNorway2],
                                "OtherNationality": [NationaliltyNorway3],
                                // "RetirementPensionM1": [Receiving1.substr(0,1)],
                                // "RetirementPensionM2": [Receiving1.substr(1,1)],
                                // "RetirementPensionY1": [Receiving1.substr(5,1)],
                                // "RetirementPensionY2": [Receiving1.substr(6,1)],                             
                                
                            //     "PensionLevel1": [JSONData.pensionlevel],
                            //    "PensionLevel2": [JSONData.pensionlevel],
                            //    "PensionLevel3": [JSONData.pensionlevel],
                            //    "PensionLevel4": [JSONData.pensionlevel],
                                "PensionLevel5": [JSONData.pensionlevel],
                                "CivilState1": [CivilState1],
                                "CivilState2": [CivilState2],
                                "CivilState3": [CivilState3],
                                "CivilState4": [CivilState4],
                                "CivilState5": [CivilState5],
                                "CivilState6": [CivilState6],
                                "CivilState7": [CivilState7],
                                "PartnerlivingYes": [PartnerlivingYes],
                                "PartnerlivingNo": [PartnerlivingNo],
                                "PensionReceiveYes": [PensionReceiveYes],
                                "PensionReceiveNo": [PensionReceiveNo],
                                "AbroadYes": [AbroadYes],
                                "AbroadNo": [AbroadNo],
                                "LivingAbroadYes": [LivingAbroadYes],
                                "LivingAbroadNo": [LivingAbroadNo],
                                "InformationSpouse": [InformationSpouse],
                                "InformationPartner": [InformationPartner],
                                "InformationCohabiting Partner": [InformationCohabitingPartner],
                                // "SpouseIDnumber1": [SpouseIDnumber.substr(0,1)],
                                // "SpouseIDnumber2": [SpouseIDnumber.substr(1,1)],
                                // "SpouseIDnumber3": [SpouseIDnumber.substr(2,1)],
                                // "SpouseIDnumber4": [SpouseIDnumber.substr(3,1)],
                                // "SpouseIDnumber5": [SpouseIDnumber.substr(4,1)],
                                // "SpouseIDnumber6": [SpouseIDnumber.substr(5,1)],
                                // "SpouseIDnumber7": [SpouseIDnumber.substr(6,1)],
                                // "SpouseIDnumber8": [SpouseIDnumber.substr(7,1)],
                                // "SpouseIDnumber9": [SpouseIDnumber.substr(8,1)],
                                // "SpouseIDnumber10": [SpouseIDnumber.substr(9,1)],
                                // "SpouseIDnumber11": [SpouseIDnumber.substr(10,1)],
                                "Partner'sname": [SNameState],
                                "CohabitatingPartner": [CohabitatingPartner],
                                "CohabitatingPartnerMarried": [CohabitatingPartnerMarried],
                                // "CohabitatingPartnersM1": [CohabitatingPartners.substr(0,1)],
                                // "CohabitatingPartnersM2": [CohabitatingPartners.substr(1,1)],
                                // "CohabitatingPartnersY1": [CohabitatingPartners.substr(2,1)],
                                // "CohabitatingPartnersY2": [CohabitatingPartners.substr(3,1)],
                                "SpouseNationalityNorway": [SpouseNationalityNorway],
                                "SpouseNationalityOther": [SpouseNationalityOther],
                                "SpouseNationality": [SpouseNationality],
                                // "DeceasedIDnumber1": [Security.substr(0,1)],
                                // "DeceasedIDnumber2": [Security.substr(1,1)],
                                // "DeceasedIDnumber3": [Security.substr(2,1)],
                                // "DeceasedIDnumber4": [Security.substr(3,1)],
                                // "DeceasedIDnumber5": [Security.substr(4,1)],
                                // "DeceasedIDnumber6": [Security.substr(5,1)],
                                // "DeceasedIDnumber7": [Security.substr(6,1)],
                                // "DeceasedIDnumber8": [Security.substr(7,1)],
                                // "DeceasedIDnumber9": [Security.substr(8,1)],
                                // "DeceasedIDnumber10": [Security.substr(9,1)],
                                // "DeceasedIDnumber11": [Security.substr(10,1)],
                                 "DeceasedName": [NamedeceasedState],
                                // "DeceasedD1": [Dateofdied.substr(0,1)],
                                // "DeceasedD2": [Dateofdied.substr(1,1)],
                                // "DeceasedM1": [Dateofdied.substr(3,1)],
                                // "DeceasedM2": [Dateofdied.substr(4,1)],
                                // "DeceasedY1": [Dateofdied.substr(8,1)],
                                // "DeceasedY2": [Dateofdied.substr(9,1)],
                                "DeceasedNationalityNorway": [DeceasedNationalityNorway],
                                "DeceasedNationalityOther": [DeceasedNationalityOther],
                                "DeceasedNationality": [DeceasedNationality],
                                "ApplyPension": [ApplyPension],
                                "AFPage": [AFPage],
                                "Place": [JSONData.MailingAddress],
                                // "Cdate1": [DateS.substr(0,1)],
                                // "Cdate2": [DateS.substr(1,1)],
                                // "Cmonth1": [DateS.substr(3,1)],
                                // "Cmonth2": [DateS.substr(4,1)],
                                // "Cyear1": [DateS.substr(8,1)],
                                // "Cyear2": [DateS.substr(9,1)],
                                      
                                "DateFrom1": [DateFrom1],
                                "DateFrom2": [DateFrom2],
                                "DateFrom3": [DateFrom3],
                                "DateFrom4": [DateFrom4],
                                "DateFrom5": [DateFrom5],
                                "DateTo1": [DateTo1],
                                "DateTo2": [DateTo2],
                                "DateTo3": [DateTo3],
                                "DateTo4": [DateTo4],
                                "DateTo5": [DateTo5],
                                "Country1":[Country1],
                                "Country2":[Country2],
                                "Country3":[Counrty3],
                                "Country4":[Country4],
                                "Country5": [Country5],
                                "PensionScheme1": [PensionScheme1],
                                "PensionScheme2": [PensionScheme2],
                                "PensionScheme3": [PensionScheme3],
                                "PensionScheme4": [PensionScheme4],
                                "PensionScheme5": [Pensionscheme5],
                                "Foreignnationalidentitynumber1": [Foreignnationalidentitynumber1],
                                "Foreignnationalidentitynumber2": [Foreignnationalidentitynumber2],
                                "Foreignnationalidentitynumber3": [Foreignnationalidentitynumber3],
                                "Foreignnationalidentitynumber4": [Foreignnationalidentitynumber4],
                                "Foreignnationalidentitynumber5": [Foreignnationalidentitynumber5],
                                "Lived1": [Lived1],
                                "Lived2": [Lived2],
                                "Lived3": [Lived3],
                                "Lived4": [Lived4],
                                "Lived5": [Lived5],
                                "Worked1": [Worked1],
                                "Worked2": [Worked2],
                                "Worked3": [Worked3],
                                "Worked4": [Worked4],
                                "Worked5": [Worked5],
                                "PensionNorway": [BankACNumbers],
                                "OtherCountry1":[OtherCountry1],
                                "OtherCountry2":[OtherCountry2],
                                "OtherCountry3":[OtherCountry3],
                                "OtherCountry4":[OtherCountry4],
                                "Pensionscheme1": [Pensionscheme1],
                                "Pensionscheme2": [Pensionscheme2],
                                "Pensionscheme3": [Pensionscheme3],
                                "Pensionscheme4": [Pensionscheme4],
                                "Countrycurrency1": [Countrycurrency1],
                                "Countrycurrency2": [Countrycurrency2],
                                "Countrycurrency3": [Countrycurrency3],
                                "Countrycurrency4": [Countrycurrency4],
                                "Currency1": [Currency1],
                                "Currency2": [Currency2],
                                "Currency3": [Currency3],
                                "Currency4": [Currency4],
                                "Dfrom1": [Dfrom1],
                                "Dfrom2": [Dfrom2],
                                "Dfrom3": [Dfrom3],
                                "Dfrom4": [Dfrom4],
                                "Dfrom5": [Dfrom5],
                                "DTO1": [DTO1],
                                "DTO2": [DTO2],
                                "DTO3": [DTO3],
                                "DTO4": [DTO4],
                                "DTO5": [DTO5],
                                "Employer1": [Employer1],
                                "Employer2": [Employer2],
                                "Employer3": [Employer3],
                                "Employer4": [Employer4],
                                "Employer5": [Employer5],                                
                                "Norwegianaddress1": [Norwegianaddress1],
                                "Norwegianaddress2": [Norwegianaddress2],
                                "Norwegianaddress3": [Norwegianaddress3],
                                "Norwegianaddress4": [Norwegianaddress4],
                                "Norwegianaddress5": [Norwegianaddress5],
                                "Livedabroad1": [Livedabroad1],
                                "Livedabroad2": [Livedabroad2],
                                "Livedabroad3": [Livedabroad3],
                                "Livedabroad4": [Livedabroad4],
                                "Livedabroad5": [Livedabroad5],
                                "workedabroad1": [workedabroad1],
                                "workedabroad2": [workedabroad2],
                                "workedabroad3": [workedabroad3],
                                "workedabroad4": [workedabroad4],
                                "workedabroad5": [workedabroad5], 
                                "PaymentForeignaccount": [PaymentForeignaccount],
                                "MarriedRegisteredpartner": [MarriedRegisteredpartner],
                                "Banknameaddress": [BankName],
                                "Accountnumber": [Accountnumber],
                                // "BICcode1": [BICcode.substr(0,1)],
                                // "BICcode2": [BICcode.substr(1,1)],
                                // "BICcode3": [BICcode.substr(2,1)],
                                // "BICcode4": [BICcode.substr(3,1)],
                                // "BICcode5": [BICcode.substr(4,1)],
                                // "BICcode6": [BICcode.substr(5,1)],
                                // "BICcode7": [BICcode.substr(6,1)],
                                // "BICcode8": [BICcode.substr(7,1)],
                                // "BICcode9": [BICcode.substr(8,1)],
                                // "BICcode10": [BICcode.substr(9,1)],
                                // "BICcode11": [BICcode.substr(10,1)],
                                // "Bankcode1": [Bankcode.substr(0,1)],
                                // "Bankcode2": [Bankcode.substr(1,1)],
                                // "Bankcode3": [Bankcode.substr(2,1)],
                                // "Bankcode4": [Bankcode.substr(3,1)],
                                // "Bankcode5": [Bankcode.substr(4,1)],
                                // "Bankcode6": [Bankcode.substr(5,1)],
                                // "Bankcode7": [Bankcode.substr(6,1)],
                                // "Bankcode8": [Bankcode.substr(7,1)],
                                // "Bankcode9": [Bankcode.substr(8,1)],
                                // "Bankcode10": [Bankcode.substr(9,1)],
                                // "Bankcode11": [Bankcode.substr(10,1)],
                                "Livespousename": [SNameState],
                                "SpousenorwegianidnumberYes": [JSONData.CABIC],
                                "SpousenorwegianidnumberNo": [JSONData.CABIC],
                                // "Spousenorwegianidnumber1": [SpouseIDnumber.substr(0,1)],
                                // "Spousenorwegianidnumber2": [SpouseIDnumber.substr(1,1)],
                                // "Spousenorwegianidnumber3": [SpouseIDnumber.substr(2,1)],
                                // "Spousenorwegianidnumber4": [SpouseIDnumber.substr(3,1)],
                                // "Spousenorwegianidnumber5": [SpouseIDnumber.substr(4,1)],
                                // "Spousenorwegianidnumber6": [SpouseIDnumber.substr(5,1)],
                                // "Spousenorwegianidnumber7": [SpouseIDnumber.substr(6,1)],
                                // "Spousenorwegianidnumber8": [SpouseIDnumber.substr(7,1)],
                                // "Spousenorwegianidnumber9": [SpouseIDnumber.substr(8,1)],
                                // "Spousenorwegianidnumber10": [SpouseIDnumber.substr(9,1)],
                                // "Spousenorwegianidnumber11": [SpouseIDnumber.substr(10,1)],
                                // "SpousenorwegianD1": [SpouseDateState.substr(0,1)],
                                // "SpousenorwegianD2": [SpouseDateState.substr(1,1)],
                                // "SpousenorwegianM1": [SpouseDateState.substr(3,1)],
                                // "SpousenorwegianM2": [SpouseDateState.substr(4,1)],
                                // "SpousenorwegianY1": [SpouseDateState.substr(8,1)],
                                // "SpousenorwegianY2": [SpouseDateState.substr(9,1)],
                                "SpousenorwegiannationalityNO": [SpousenorwegiannationalityNO],
                                "SpousenorwegiannationalityOT": [SpousenorwegiannationalityOT],
                                "Spousenorwegiannationality": [Spousenorwegiannationality],
                                "ID1": [PersonalIDNum],
                                "ID2": [PersonalIDNum],
                                "ID3": [PersonalIDNum],
                                "ID4": [PersonalIDNum],
                                "ID5": [PersonalIDNum],
                                "ID6": [PersonalIDNum],                               
                            }
                        }
                          
                    });
                });
                //console.log(this.state.Nationality);
                console.log("data1jk4sdhfuyksegertyierht",JSON.stringify(SavePensiondata));
                SaveDataAPICallMailSend(SaveDataFormURL, SavePensiondata)
                    .then((data) => {
                        notify.show("Your Pension application generated Successfully", "success", 3000);
                        console.log("Pension application saved in s3 buckets", data);
                        let documentIdApi = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
                        let docData = {
                            QueryName: "NorwayPensionApplicantionDocGen",
                            UserID: emailresult
                        }
                        SaveDataAPICallMailSend(documentIdApi, docData)
                            .then((data) => {
                                this.setState({
                                    pensionDocumentId: data[0].NorwayPensionEmpID
                                })
                                // Pension from link 
                                let AppDocUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
                                let AppDocTrackData = {
                                    QueryName: "CountryBasedDocumentsTrackDoc",
                                    UserID: emailresult,
                                    DocumentID: "79",
                                    DocumentCode: this.state.pensionDocumentId,
                                    CountryCode: "NO",
                                    IsSend: "Y",
                                    SendDate: new Date()
                                }
                                SaveDataAPICallMailSend(AppDocUrl, AppDocTrackData)
                                    .then((data) => {
                                        console.log("DocumentTracking entry", data);
                                        console.log("Document Entry in App Doc Track Table.");
                                        let pafapi = " https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda"
                                        let pafInput = {
                                            "QueryName": "UpdatePAFLink",
                                            DocumentCode: this.state.pensionDocumentId,
                                            DownloadPensionAppFileLink: "https://s3-us-west-2.amazonaws.com/gpa-dev-mitosis/applicant/" + emailresult + "/" + "Nor_paf_en.pdf"
                                        }
                                        console.log("pafinput" + JSON.stringify(pafInput));
                                        SaveDataAPICallMailSend(pafapi, pafInput)
                                            .then((data) => {
                                                this.handleRedirect(this);
                                                console.log("Successfully stored", data);
                                                console.log("Benefits Questionnaires contribution link stored in DB");
                                            }).catch((err) => {
                                                console.log(err);
                                            });
                                    }).catch((err) => {
                                        console.log(err);
                                    });
                            })
                    }).catch((err) => {
                        console.log(err);
                    });
            }).catch((err) => {
                console.log(err);
            });
    }
    handleRedirect(event) {
        history.push('/ApplicantDashboard');
    }
    handleBenQusNorwayEdit(event) {
        this.setState({ Benefitid: event })
        var thisObj = this;
        //let DataURLPension = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let DataURLPension = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        var dataURL = {
            QueryName: "Pensiondata",
            UserID: emailresult,
        }
        // alert(JSON.stringify(dataURL))
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            url: DataURLPension,
            data: JSON.stringify(dataURL),
            headers: AxiosHeaderConfig,

        }).then(({ data }) => {
            this.setState({ showloader: false });
            this.setState({ BtnNameState: "Update" })
            data.map((item, key) => {
                let JSONData = JSON.parse(item.AppAnsInJsonObj);
                thisObj.setState({
                   
                    anythingknow: JSONData.TellUsAnyting,
                    GoogleAdrsCountry:JSONData.GoogleAdrsCountry,
                    Retirement:JSONData.Retirement,
                    NorwegianAccountnumber:JSONData.NorwegianAccountnumber,
                    Receiving:JSONData.Receiving,
                    married: JSONData.married,
                    Liveing:JSONData.Liveing,
                    Applypension:JSONData.Applypension,
                    Nationalidnumber:JSONData.Nationalidnumber,
                    BankAccountnumber:JSONData.BankAccountnumber,
                    Nationalidentitynumber:JSONData.Nationalidentitynumber,
                    ChildrenAge:JSONData.ChildrenAge,
                    MailingAddress:JSONData.MailingAddress,
                    Date:JSONData.Date,
                    Country:JSONData.Country,
                    BankName:JSONData.BankName,
                    MailingAddress1:JSONData.MailingAddress1,
                    BankAcNumber:JSONData.MailingAddress1,
                    Routingnumber:JSONData.Routingnumber,
                    AUBankCode:JSONData.AUBankCode,
                    CADirectPayment:JSONData.CADirectPayment,
                    CABIC:JSONData.CABIC,
                    MXClabenumber:JSONData.MXClabenumber,
                    ZABankCode:JSONData.ZABankCode,
                    ZAAccountnumber:JSONData.ZAAccountnumber,
                    EEABankCode:JSONData.EEABankCode,
                    EEACurrency:JSONData.EEACurrency,
                    MailingAddress2:JSONData.MailingAddress2,
                    Date1:JSONData.Date1,
                    pensionlevel:JSONData.pensionlevel,
                });
            }
            );
        }).catch((err) => {

        });
    }
    handleLoadCompany(event) {
        var thisObj = this;
        let LoadCountryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            {
                QueryName: "ClientCompaniesCB1",
            }
        );
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: LoadCountryAPIUrl,
            headers: AxiosHeaderConfig,
        }).then(({ data }) => {
            console.log("Data length", data.length)
            let len = data.length;
            console.log("Data", data);
            if (len == 0) {
                thisObj.setState({ isEmptyCompanyName: true });
            } else {
                thisObj.setState({ isEmptyCompanyName: false });
            }
            let data1 = [];
            data.forEach(function (res) {
                data1.push(res.CompanyName);
            })
            this.setState({
                Countries: data1
            })
            console.log("State Countries:", data1)

        }).catch((err) => {
            console.log(err)
        })
    }




    //Save Function
    handleBenQusDatas(event) {
        var thisObj = this;
        var Queryvalue;
        if (this.state.BtnNameState == "Save") {
            Queryvalue = "BenefitsQuestionnariesPart2Save";
        }
        else {
            Queryvalue = "BenefitsQuestionnariesPart2Update";
        }
        
        let BenQusAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusQuebecJSONData = JSON.stringify({
            QueryName: Queryvalue,
            UserID: emailresult,
            BenQusCNIGPAID: this.state.Benefitid,
            
            
            AppAnsInJsonObj: {
                GoogleAdrsCountry:this.state.GoogleAdrsCountry,
                Retirement:this.state.RetirementState,
                NorwegianAccountnumber:this.state.NorwegianAccountnumberState,
                Receiving:this.state.ReceivingState,
                married: this.state.marriedState,
                Liveing:this.state.LiveingState,
                Applypension:this.state.ApplypensionState,
                Nationalidnumber:this.state.NationalidnumberState,
                BankAccountnumber:this.state.BankAccountnumberState,
                Nationalidentitynumber:this.state.NationalidentitynumberState,
                ChildrenAge:this.state.ChildrenAgeState,
                MailingAddress:this.state.MailingAddressState,
                Date:this.state.DateState,
                Country:this.state.CountryState,
                BankName:this.state.BankNameState,
                MailingAddress1:this.state.MailingAddress1State,
                BankAcNumber:this.state.BankAcNumberState,
                Routingnumber:this.state.RoutingnumberState,
                AUBankCode:this.state.AUBankCodeState,
                CADirectPayment:this.state.CADirectPaymentState,
                CABIC:this.state.CABICState,
                MXClabenumber:this.state.MXClabenumberState,
                ZABankCode:this.state.ZABankCodeState,
                ZAAccountnumber:this.state.ZAAccountnumberState,
                EEABankCode:this.state.EEABankCodeState,
                EEACurrency:this.state.EEACurrencyState,
                MailingAddress2:this.state.MailingAddress2State,
                Date1:this.state.Date1State,
                pensionlevel:this.state.pensionlevelState,
            },
            CountryCode: "NO",
            BQP2AnsStatus: "C"
        });
        let AxiosHeaderConfig = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
        };
//console.log("Rec",this.state.ReceivingState);
        var isValid = this.handleValidateForm(this);
        
        if (isValid) {
            axios({
                method: "POST",
                url: BenQusAPIUrl,
                data: BenQusQuebecJSONData,
                //headers:AxiosHeaderConfig,

            }).then((data) => {
                notify.show("Your Information Saved Successfully", "success", 3000);
                thisObj.handleSavePensionData(this);
                //thisObj.handleAppProcessFlowUpdate(this);
                // thisObj.handleSendBilateralForms(this);
                // this.props.MailSends();
            }).catch((err) => {
                notify.show("Updated Successfully", "success", 3000);
                thisObj.handleRedirect(this);
            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }






    //Auto-Populated Function
    handleBenQusNorwayAuto(event) {
        var thisObj = this;
        let UserID;
        // let BenQusAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let BenQusAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusAutoJSONData = JSON.stringify({
            QueryName: "BenQusGeneralAuto",
            UserID: emailresult,
        });
        let AxiosHeaderConfig = {
            headers: {
                // accept: 'application/json',
                // "Access-Control-Request-Headers": "*",
                // "Access-Control-Request-Method": "*",
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Origin": "*",
            }
        };
        axios({
            method: "POST",
            url: BenQusAutoAPIUrl,
            data: BenQusAutoJSONData,
            //headers:AxiosHeaderConfig,

        }).then(({ data }) => {
            //console.log("Result" + JSON.stringify(data));
            //console.log("Length", data.length);
            for (var i = 0; i < 1; i++) {
                thisObj.setState({ EligibleCountryState: data[i].EligibleCountry });
                thisObj.setState({ GoogleAdrsCountry: data[i].GoogleAdrsCountry });
                thisObj.setState({ PCountryOfCitizenship: data[i].PCountryOfCitizenship });
                thisObj.setState({ PensionotherCountriesState: data[i].Partner });
                thisObj.setState({ MailingAddress: data[i].MailingAddress });
                thisObj.setState({ Nationality: data[i].CountryOfCitizenship});
                console.log(this.state.GoogleAdrsCountry);
                if (data[i].EligibleCountryState == "NO") {
                    thisObj.setState({ NationalityState: "Norway" });
                }
                else if (data[i].EligibleCountryState != "NO") {
                    thisObj.setState({ NationalityState: "Other" });
                }
                if (data[i].GoogleAdrsCountry != "NO") {                    
                    thisObj.setState({ livedorworkNorwayState: "Yes" });
                }
                else if (data[i].GoogleAdrsCountry == "NO") {                  
                    thisObj.setState({ livedorworkNorwayState: "No" });
                }
                if (data[i].PCountryOfCitizenship == "NO") {
                    thisObj.setState({ CountryStayReason: "Norway" });
                }
                else if (data[i].PCountryOfCitizenship != "NO") {
                    thisObj.setState({ CountryStayReason: "Other" });
                }
                if (data[i].MaritalStatus != "W") {
                    thisObj.setState({ CountryStay: "Norway" });
                }
                else if (data[i].MaritalStatus == "W") {
                    thisObj.setState({ CountryStay: "Other" });
                }
             
                
                thisObj.setState({ LastnameState: data[i].LastName });
                thisObj.setState({ FirstNameState: data[i].FirstName });
                thisObj.setState({ AddressState: data[i].MailingAddress });
                thisObj.setState({ PhonenumberState: data[i].PhoneNum });
                thisObj.setState({ NationalityState: data[i].CountryOfCitizenship });
                thisObj.setState({ CivilStatusState: data[i].MaritalStatus });
                thisObj.setState({ SpouseState: data[i].MaritalStatus });
                var Name = data[i].PFirstName + '' + data[i].PMiddleName + '' + data[i].PLastName;
                thisObj.setState({ SNameState: Name });
                thisObj.setState({ SpouseNationalityState: data[i].PCountryOfCitizenship });
                thisObj.setState({ SNationalityState: data[i].PCountryOfCitizenship });
                thisObj.setState({ CountryReasonState: data[i].PCountryOfCitizenship });
               // thisObj.setState({ MailingAddressState: data[i].MailingAddress });
                
                thisObj.setState({ LiveState: data[i].MailingAddress });
                
                thisObj.setState({ SecurityState: data[i].SSSecurity });
                thisObj.setState({ StayNorwayState: data[i].MailingAddress });
                
                thisObj.setState({ PaymentState: data[i].EligibleCountry });
                var SName = data[i].PFirstName + '' + data[i].PMiddleName + '' + data[i].PLastName;
                thisObj.setState({ SpouseNameState: SName });
                var SpouseDOB = data[i].PDOB_Day + "/" + data[i].PDOB_Month + "/" + data[i].PDOB_Year;
                var DtDOB1 = new Date(SpouseDOB);
                thisObj.setState({ SpouseDateState: DtDOB1 });
                if (data[i].MaritalStatus == "W") {
                    var SName = data[i].PFirstName + '' + data[i].PMiddleName + '' + data[i].PLastName;
                    thisObj.setState({ SpouseNameState1: SName });
                }
              
                if (data[i].MaritalStatus == "W") {
                    var varDOB = data[i].DOMCDW_Year + "/" + data[i].DOMCDW_Month + "/" + data[i].DOMCDW_Day;
                    // alert(varDOB);
                    var DtDOB = new Date(varDOB);
                    // alert(DtDOB);
                    thisObj.setState({ DateofdiedState: DtDOB });
                }
                if (data[i].MaritalStatus == "W") {
                    thisObj.setState({ SNationality1State: data[i].PCountryOfCitizenship });
                }
                if (data[i].MaritalStatus == "W") {
                    var Name = data[i].PFirstName + '' + data[i].PMiddleName + '' + data[i].PLastName;
                    thisObj.setState({ NamedeceasedState: Name });
                }
                thisObj.setState({ SpouseNationality1State: data[i].PCountryOfCitizenship });

            }
           
        }).catch((err) => {

        })
    }
    //Auto-Populated Function
    handleBenQusResNorwayAuto(event) {
        var thisObj = this;
        let UserID;
        // let BenQusAutoAPIUrl = "https://5zykex8q94.execute-api.us-west-2.amazonaws.com/Dev/GPA_AutopopulateData_Lambda";
        let BenQusAutoAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let BenQusAutoJSONData = JSON.stringify({
            QueryName: "BenQusResidencyAuto",
            UserID: emailresult,
            CountryCode: "NO"
        });
        let AxiosHeaderConfig = {
            headers: {
                // accept: 'application/json',
                // "Access-Control-Request-Headers": "*",
                // "Access-Control-Request-Method": "*",
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Origin": "*",
            }
        };
        axios({
            method: "POST",
            url: BenQusAutoAPIUrl,
            data: BenQusAutoJSONData,
            //headers:AxiosHeaderConfig,

        }).then(({ data }) => {
            console.log("Result" + JSON.stringify(data));
            //console.log("Length", data.length);
            for (var i = 0; i < 1; i++) {
                if (data[i].ResCountry != "NO") {
                    thisObj.setState({ OutsideNorwayState: "Yes" });
                }
                else if (data[i].ResCountry == "NO") {
                    thisObj.setState({ OutsideNorwayState: "No" });
                }
                if(data[i].ResCountry =="NO") {
                    thisObj.setState({ResCountryCompany:"Yes"})
                }
                thisObj.setState({ NationalNumberState: data[i].PersonalIDNum });
                thisObj.setState({ ResBeginDateState: data[i].ResCountryBDate });
                thisObj.setState({ ResEndDateState: data[i].ResCountryEDate });
                thisObj.setState({ ResCountryState: data[i].ResAddress });
                thisObj.setState({ ForeignState: data[i].PersonalIDNum });
                thisObj.setState({ SpouseID: data[i].PPersonalIDNum });                
                thisObj.setState({ workedState: data[i].CompanyCode });
                thisObj.setState({ CountryState: data[i].CountryCode });
                thisObj.setState({ DateFromState: data[i].ResCountryBDate });
                thisObj.setState({ DateToState: data[i].ResCountryEDate });
                thisObj.setState({ EmployerState: data[i].CompanyCode });
                thisObj.setState({ NAddressState: data[i].ResAddress });
                thisObj.setState({ LivedState: data[i].ResCountry });
                thisObj.setState({ Worked1State: data[i].CompanyCode });
            }
        if(data[i].ResCountry =="NO"){
            for (let index = 0; index < 6; index++) {
                if (data[index].CountryStayDate == "Work") {
                    this.setCompanyDetails(data, index);                  
                }
            }
        }
        if(data[i].Partner == "Yes") {
            for (let index = 0; index < 5; index++) {
               // if (data[index].CountryStayDate == "Work") {
                    this.setCoverageDetails(data, index);
                //} 
            }
        }  
        if(this.state.GoogleAdrsCountry != "NO") {
            for (let index = 0; index < 6; index++) {
                // if (data[index].CountryStayDate == "Work") {
                    this.setCompanyabroadDetails(data, index);
               // } 
            }
        }    
            //console.log("national",this.state.NationalNumberState);
        }).catch((err) => {
        })
    }
    

setCoverageDetails(data, index) {
    switch (index) {
        case 0:
            this.setState({
                OtherCountry1:data[0].CountryCode,
                Pensionscheme1: data[0].SSSecurity,
                Countrycurrency1: this.state.Countrycurrency1,
                Currency1: this.state.Currency1,                
            })
            break;
        case 1:
            this.setState({
                Country2: data[1].CountryCode,
                Pensionscheme2: data[1].SSSecurity,
                Countrycurrency2: this.state.Countrycurrency1,
                Currency2: this.state.Currency1,              
            })
            break;
        case 2:
            this.setState({
                Country3: data[2].CountryCode,
                Pensionscheme3: data[2].SSSecurity,
                Countrycurrency3: this.state.Countrycurrency1,
                Currency3: this.state.Currency1,              
            })
         break;
        case 3:
                this.setState({
                    Country4: data[3].CountryCode,
                    Pensionscheme4: data[3].SSSecurity,
                    Countrycurrency4: this.state.Countrycurrency1,
                    Currency4: this.state.Currency1,
                })
        break;
        default:
        break;
    }

}
    setCompanyDetails(data, index) {
        switch (index) {
            case 0:    
                this.setState({    
                    DateFrom1: data[0].ResCountryBDate,    
                    DateTo1: data[0].ResCountryEDate,
                    Country1: data[0].ResCountry,
                    PensionScheme1: this.state.PensionScheme1,
                    Foreignnationalidentitynumber1: data[0].PersonalIDNum,
                    Lived1: data[0].ResCountry,
                    Worked1: data[0].CompanyCode,
                })
                break;
            case 1:
                this.setState({
                    DateFrom2: data[1].ResCountryBDate,
                    DateTo2: data[1].ResCountryEDate,
                    Country2: data[1].ResCountry,
                    PensionScheme2: this.state.PensionScheme1,
                    Foreignnationalidentitynumber2: data[1].PersonalIDNum,
                    Lived2: data[1].ResCountry,
                    Worked2: data[1].CompanyCode,
                })
                break;
            case 2:
                this.setState({
                    DateFrom3: data[2].ResCountryBDate,
                    DateTo3: data[2].ResCountryEDate,
                    Country3: data[2].ResCountry,
                    PensionScheme3: this.state.PensionScheme1,
                    Foreignnationalidentitynumber3: data[2].PersonalIDNum,
                    Lived3: data[2].ResCountry,
                    Worked3: data[2].CompanyCode,
                })    
                break;    
            case 3:    
                this.setState({    
                    DateFrom4: data[3].ResCountryBDate,
                    DateTo4: data[3].ResCountryEDate,
                    Country4: data[3].ResCountry,
                    PensionScheme4: this.state.PensionScheme1,
                    Foreignnationalidentitynumber4: data[3].PersonalIDNum,
                    Lived4: data[3].ResCountry,
                    Worked4: data[3].CompanyCode,
                })
                break;
            case 4:
                this.setState({
                    DateFrom5: data[4].ResCountryBDate,
                    DateTo5: data[4].ResCountryEDate,
                    Country5: data[4].ResCountry,
                    PensionScheme5: this.state.PensionScheme1,
                    Foreignnationalidentitynumber5: data[4].PersonalIDNum,
                    Lived5: data[4].ResCountry,
                    Worked5: data[4].CompanyCode,
                })
                break;
            default:
                break;
        }
    }
    setCompanyabroadDetails(data, index) {
        switch (index) {    
            case 0:    
                this.setState({    
                    Dfrom1: data[0].ResCountryBDate,    
                    DTO1: data[0].ResCountryEDate,
                    Employer1: data[0].CompanyCode,    
                    PensionScheme1: this.state.PensionScheme1,
                    Norwegianaddress1: data[0].CompanyAddress,
                    Livedabroad1: this.state.ResCountryCompany,
                    workedabroad1: data[0].CompanyCode,
                })    
                break;
            case 1:
                this.setState({
                    Dfrom2: data[0].ResCountryBDate,    
                    DTO2: data[0].ResCountryEDate,
                    Employer2: data[0].CompanyCode,    
                    PensionScheme2: this.state.PensionScheme1,
                    Norwegianaddress2: data[0].CompanyAddress,
                    Livedabroad2: this.state.ResCountryCompany,
                    workedabroad2: data[0].CompanyCode,
                })    
                break;
            case 2:
                this.setState({
                    Dfrom3: data[0].ResCountryBDate,    
                    DTO3: data[0].ResCountryEDate,
                    Employer3: data[0].CompanyCode,    
                    PensionScheme3: this.state.PensionScheme1,
                    Norwegianaddress3: data[0].CompanyAddress,
                    Livedabroad3: this.state.ResCountryCompany,
                    workedabroad3: data[0].CompanyCode,
                })    
                break;
            case 3:
                this.setState({
                    Dfrom4: data[0].ResCountryBDate,    
                    DTO4: data[0].ResCountryEDate,
                    Employer4: data[0].CompanyCode,    
                    PensionScheme4: this.state.PensionScheme1,
                    Norwegianaddress4: data[0].CompanyAddress,
                    Livedabroad4: this.state.ResCountryCompany,
                    workedabroad4: data[0].CompanyCode,
                })
                break;
            case 4:
                this.setState({
                    Dfrom5: data[0].ResCountryBDate,    
                    DTO5: data[0].ResCountryEDate,
                    Employer5: data[0].CompanyCode,    
                    PensionScheme5: this.state.PensionScheme1,
                    Norwegianaddress5: data[0].CompanyAddress,
                    Livedabroad5: this.state.ResCountryCompany,
                    workedabroad5: data[0].CompanyCode,
                })
                break;                 
            default:
                break;    
        }
    }
    
    handleLoadCountry(event) {
        let LoadCountryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            { QueryName: "Countries" }
        );
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            // "Access-Control-Request-Headers": "*",
            // "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data: JSONData,
            url: LoadCountryAPIUrl,
            headers: AxiosHeaderConfig

        }).then(({ data }) => {
            CountryItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                CountryItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
            }
        }).catch((err) => {
        })
    }

    //Validation Function
    handleValidateForm(event) {
        let validForm = false;


        var validNorwegianAccountnumberForm = false;
        var validReceivingForm = false;
        var validmarriedForm = false;
        var validLiveingForm = false;
        var validApplypensionForm = false;
        var validBankAccountnumberForm = false;
        var validNationalidentitynumberForm = false;
        var validChildrenAgeForm = false;
        var validCountryForm = false;
        var validMailingAddressForm = false;
        var validDateForm = false;
        var validSignatureForm = false;
        var validRetirementForm =false;
        var validBankNameForm = false;
        var validMailingAddress1Form = false;
        var validBankAcNumberForm = false;
        var validBICCodeForm = false;
        var validBankCodeForm = false;
        var validDate1Form = false;
        var validSignature1Form = false;
        var validBankNameForm = false;
        var validBankAcNumberForm = false;
        var validBICCodeForm = false;

        var validRoutingnumberForm = false;
        var validAUBankCodeForm = false;
        var validCADirectPaymentForm = false;
        var validCABICForm = false;
        var validMXClabenumberForm = false;
        var validZAAccountnumberForm = false;
        var validZABankCodeForm = false;
        var validEEABankCodeForm = false;
        var validEEACurrencyForm = false;
        var validMailingAddress2Form = false;
        var validDate1Form = false;
        if (this.state.RetirementState != "") {
            this.setState({ isValidRetirement: false });
            validRetirementForm = true;
        }
        else {
            this.setState({ isValidRetirement: true });
            validRetirementForm = false;
        }
        if(this.state.RetirementState == "Y") {
            if (this.state.NorwegianAccountnumberState.length > 0) {
                this.setState({ isValidNorwegianAccountnumber: false });
                if (this.state.NorwegianAccountnumberState.length > 0 && this.state.NorwegianAccountnumberState.length > 2) {
                    this.setState({ isValidFormatNorwegianAccountnumber: false });
                    validNorwegianAccountnumberForm = true;
                }
                else {
                    this.setState({ isValidFormatNorwegianAccountnumber: true });
                    this.setState({ isValidNorwegianAccountnumber: false });
                }
            }
            else {
                this.setState({ isValidNorwegianAccountnumber: true });
                this.setState({ isValidFormatNorwegianAccountnumber: false });
                validNorwegianAccountnumberForm = false;
            }
        }
        else{
            this.setState({ isValidNorwegianAccountnumber: false });
            this.setState({ isValidFormatNorwegianAccountnumber: false });
            validNorwegianAccountnumberForm = true;
        }
        if(this.state.RetirementState == "N") {
            if (this.state.ReceivingState != "") {
                this.setState({ isValidReceiving: false });
                validReceivingForm = true;
            }
            else {
                this.setState({ isValidReceiving: true });
                validReceivingForm = false;
            }
            // if (this.state.CountryState != "") {
            //     this.setState({ isValidCountry: false });
            //     validCountryForm = true;
            // }
            // else {
            //     this.setState({ isValidCountry: true });
            //     validCountryForm = false;
            // }

        }else{
            this.setState({ isValidReceiving: false });
            //this.setState({ isValidCountry: false });
            //validCountryForm = true;
            validReceivingForm = true;
        }
       
        if (this.state.marriedState != "") {
            this.setState({ isValidmarried: false });
            validmarriedForm = true;
        }
        else {
            this.setState({ isValidmarried: true });
            validmarriedForm = false;
        }



      
        if (this.state.MailingAddressState.length > 0) {
            this.setState({ isValidMailingAddress: false });
            if (this.state.MailingAddressState.length > 0 && this.state.MailingAddressState.length > 2) {
                this.setState({ isValidFormatMailingAddress: false });
                validMailingAddressForm = true;
            }
            else {
                this.setState({ isValidFormatMailingAddress: true });
                this.setState({ isValidMailingAddress: false });
            }
        }
        else {
            this.setState({ isValidMailingAddress: true });
            this.setState({ isValidFormatMailingAddress: false });
            validMailingAddressForm = false;
        }
        if (this.state.DateState != "") {
            this.setState({ isValidDate: false });
            validDateForm = true;
        }
        else {
            this.setState({ isValidDate: true });
            validDateForm = false;
        }
        if (this.signaturePad.isEmpty()) {
            this.setState({ isValidSignature: true });
            validSignatureForm = false;
        }
        else {
            this.setState({ isValidSignature: false });
            validSignatureForm = true;
        }
        // if (this.state.BankNameState.length > 0) {
        //     this.setState({ isValidBankName: false });
        //     if (this.state.BankNameState.length > 0 && this.state.BankNameState.length > 2) {
        //         this.setState({ isValidFormatBankName: false });
        //         validBankNameForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatBankName: true });
        //         this.setState({ isValidBankName: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidBankName: true });
        //     this.setState({ isValidFormatBankName: false });
        //     validBankNameForm = false;
        // }

        // if (this.state.MailingAddress1State.length > 0) {
        //     this.setState({ isValidMailingAddress1: false });
        //     if (this.state.MailingAddress1State.length > 0 && this.state.MailingAddress1State.length > 2) {
        //         this.setState({ isValidFormatMailingAddress1: false });
        //         validMailingAddress1Form = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatMailingAddress1: true });
        //         this.setState({ isValidMailingAddress1: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidMailingAddress1: true });
        //     this.setState({ isValidFormatMailingAddress1: false });
        //     validMailingAddress1Form = false;
        // }

        // if (this.state.isValidBankAcNumber.length > 0) {
        //     this.setState({ isValidBankAcNumber: false });
        //     if (this.state.BankAcNumberState.length > 0 && this.state.BankAcNumberState.length > 2) {
        //         this.setState({ isValidFormatBankAcNumber: false });
        //         validBankAcNumberForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatBankAcNumber: true });
        //         this.setState({ isValidBankAcNumber: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidBankAcNumber: true });
        //     this.setState({ isValidFormatBankAcNumber: false });
        //     validBankAcNumberForm = false;
        // }

        // if (this.state.BICCodeState.length > 0) {
        //     this.setState({ isValidBICCode: false });
        //     if (this.state.BICCodeState.length > 0 && this.state.BICCodeState.length > 2) {
        //         this.setState({ isValidFormatBICCode: false });
        //         validBICCodeForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatBICCode: true });
        //         this.setState({ isValidBICCode: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidBICCode: true });
        //     this.setState({ isValidFormatBICCode: false });
        //     validBICCodeForm = false;
        // }
        // if (this.state.BICCodeState != "") {
        //     this.setState({ isValidBICCode: false });
        //     if (this.state.BICCodeState.length > 8 && this.state.BICCodeState.length < 12) {
        //         this.setState({ isValidForamatBICCode: false });
        //         validBICCodeForm = false;
        //     }
        //     else {
        //         this.setState({ isValidFormatBICCode: true });
        //         this.setState({ isValidBICCode: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidBICCode: true });
        //     this.setState({ isValidFormatBICCode: false });
        //     validBICCodeForm = false;
        // }
        // if (this.state.BankCodeState.length > 0) {
        //     this.setState({ isValidBankCode: false });
        //     if (this.state.BankCodeState.length > 0 && this.state.BankCodeState.length > 2) {
        //         this.setState({ isValidFormatBankCode: false });
        //         validBankCodeForm = true;
        //     }
        //     else {
        //         this.setState({ isValidFormatBankCode: true });
        //         this.setState({ isValidBankCode: false });
        //     }
        // }
        // else {
        //     this.setState({ isValidBankCode: true });
        //     this.setState({ isValidFormatBankCode: false });
        //     validBankCodeForm = false;
        // }
        // if (this.state.BankCodeState != "") {
        //     this.setState({ isValidBankCode: false });
        //     validBankCodeForm = true;
        // }
        // else {
        //     this.setState({ isValidBankCode: true });
        //     validBankCodeForm = false;
        // }
        // if (this.state.Date1State != "") {
        //     this.setState({ isValidDate1: false });
        //     validDate1Form = true;
        // }
        // else {
        //     this.setState({ isValidDate1: true });
        //     validDate1Form = false;
        // }


        if (this.state.marriedState == "Y") {
            if (this.state.LiveingState != "") {
                this.setState({ isValidLiveing: false });
                validLiveingForm = true;
            }
            else {
                this.setState({ isValidLiveing: true });
                validLiveingForm = false;
            }
            if (this.state.ApplypensionState != "") {
                this.setState({ isValidApplypension: false });
                validApplypensionForm = true;
            }
            else {
                this.setState({ isValidApplypension: true });
                validApplypensionForm = false;
            }
        } else {
            this.setState({ isValidLiveing: false });
            this.setState({ isValidApplypension: false });
            validApplypensionForm = true;
            validLiveingForm = true;
        }
        if (this.state.marriedState == "N") {
            if (this.state.BankAccountnumberState.length > 0) {
                this.setState({ isValidBankAccountnumber: false });
                if (this.state.BankAccountnumberState.length > 0 && this.state.BankAccountnumberState.length > 2) {
                    this.setState({ isValidFormatBankAccountnumber: false });
                    validBankAccountnumberForm = true;
                }
                else {
                    this.setState({ isValidFormatBankAccountnumber: true });
                    this.setState({ isValidBankAccountnumber: false });
                }
            }
            else {
                this.setState({ isValidBankAccountnumber: true });
                this.setState({ isValidFormatBankAccountnumber: false });
                validBankAccountnumberForm = false;
            }
        }
        else {
            this.setState({ isValidFormatBankAccountnumber: false });
            validBankAccountnumberForm = true;
        }
        if (this.state.marriedState == "S") {
            if (this.state.NationalidentitynumberState.length > 0) {
                this.setState({ isValidNationalidentitynumber: false });
                if (this.state.NationalidentitynumberState.length > 0 && this.state.NationalidentitynumberState.length > 2) {
                    this.setState({ isValidFormatNationalidentitynumber: false });
                    validNationalidentitynumberForm = true;
                }
                else {
                    this.setState({ isValidFormatNationalidentitynumber: true });
                    this.setState({ isValidNationalidentitynumber: false });
                }
            }
            else {
                this.setState({ isValidNationalidentitynumber: true });
                this.setState({ isValidFormatNationalidentitynumber: false });
                validNationalidentitynumberForm = false;
            }
        }
        else {
            this.setState({ isValidFormatNationalidentitynumber: false });
            validNationalidentitynumberForm = true;
        }
       
        // }
        if (validRetirementForm && validNorwegianAccountnumberForm && validSignatureForm && validDateForm && validReceivingForm && validmarriedForm  && validMailingAddressForm)
         
         {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }


    //Rendering Function
    render() {
        const { search, psearch, value, MailingAddressState, AddressState, MailingAddress1State, MailingAddress2State, UserMailingAddressState, CountryState } = this.state
        const google = window.google;

        return (
            <div >
                <Col xs={12} md={12} >
                    <Panel eventKey="1" defaultExpanded={true}>
                        <Panel.Heading>
                            <Panel.Title >Norway Form</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body collapsible>
                            <Row >
                                <Col xs={12} md={12} >
                                    <Col xs={12} md={12}>

                                        <h3 className="ColorStyle"><b>Personal data</b></h3>
                                    </Col>
                                </Col>
                               
                                    <Col xs={12} md={7} className="input-fileds align-fileds">
                                        <label><b>Will you deposit your retirement pension funds into a bank in Norway:<span className="manatoryfield">*</span></b></label>
                                        <SelectField
                                            hintText="Please select the retirement pension"
                                            value={this.state.RetirementState}
                                            onChange={this.handleChangeRetirement.bind(this)}
                                            errorText={this.state.isValidRetirement ? "Please Select Your Living part" : ""}
                                        >
                                            {RetirementItems}
                                        </SelectField>
                                    </Col>
                                
                                {(this.state.RetirementState == "Y") ?
                                
                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                        <label>Enter your Norwegian bank account number for payments </label>
                                        <TextField
                                            hintText="Enter your Norwegian bank account number for payments"
                                            value={this.state.NorwegianAccountnumberState}
                                            onChange={this.handleChangeNorwegianAccountnumber.bind(this)}
                                            errorText={this.state.isValidNorwegianAccountnumber ? "Please Enter your Norwegian bank account number for payments " : ""}
                                        />
                                    </Col>

                                :""}
                                {(this.state.RetirementState == "N") ?
                                    <Col xs={12} md={6} className="align-fileds">
                                        <label className="DatepickerLabel">Enter when you want to start receiving a retirement pension (month and year)</label>
                                        <div className="StartOfCountryDatepicker">
                                            <Datetime
                                                value={this.state.ReceivingState}
                                                inputProps={{ placeholder: 'Select the Start Month and Year' }}
                                                dateFormat="MM-YYYY"
                                                onChange={this.handleChangeReceiving.bind(this)}
                                                timeFormat={false}
                                            />
                                        </div>
                                        <span className="validationmsg">{this.state.isValidReceiving ? "Please select you date " : null}</span>
                                    </Col>
                                 :""}
                              

                                <Col xs={12} md={12}>
                                    <Col xs={12} md={5} className="input-fileds align-fileds">
                                        <label><b>Do you have a spouse/partner/cohabitating partner?</b></label>
                                        <SelectField
                                            hintText="Select Your Status"
                                            value={this.state.marriedState}
                                            onChange={this.handleChangemarried.bind(this)}
                                            errorText={this.state.isValidmarried ? "Please Select Your enter your spouse:" : ""}
                                        >
                                            {SpouseItems}
                                        </SelectField>
                                    </Col>
                                    {(this.state.marriedState == "Y") ?
                                        <div>
                                            <Col xs={12} md={7} className="input-fileds align-fileds">
                                                <label><b>Are you and your spouse/partner/cohabitating partner living apart permanently?</b></label>
                                                <SelectField
                                                    hintText="Select Your Status"
                                                    value={this.state.LiveingState}
                                                    onChange={this.handleChangeLiveing.bind(this)}
                                                    errorText={this.state.isValidLiveing ? "Please Select Your Living part" : ""}
                                                >
                                                    {MaritalStatusItems}
                                                </SelectField>
                                            </Col>


                                            <Col xs={12} md={12}>
                                                <Col xs={12} md={12} className="input-fileds align-fileds">
                                                    <label><b>Does your spouse/partner/cohabitating partner receive a contractual pension from the Norway private or public sector or is applying for such? </b></label>
                                                    <SelectField
                                                        hintText="Select Your Status"
                                                        value={this.state.ApplypensionState}
                                                        onChange={this.handleChangeApplypension.bind(this)}
                                                        errorText={this.state.isValidApplypension ? "Please Select Your Pension" : ""}
                                                    >
                                                        {PrivatepensionItems}
                                                    </SelectField>
                                                </Col>
                                            </Col>

                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Enter your cohabiting partner's national identity number (optional) </label>
                                                <TextField
                                                    hintText="Enter your cohabiting partner's national identity number"
                                                    value={this.state.NationalidnumberState}
                                                    onChange={this.handleChangeNationalidnumber.bind(this)}

                                                />
                                            </Col>
                                        </div>
                                        : ""}
                                    {(this.state.marriedState == "N") ?
                                        <Col xs={12} md={12} className="input-fileds align-fileds">
                                            <label>What is your spouse/partner/cohabiting partner's total annual income before tax? State income from work, capital, pension and other income. You must include unemployment benefit, work assessment allowance and pension which is not national insurance pension. You must not include national insurance pension from Norway. If your spouse/cohabiting partner has income abroad, this income must be documented." Please state all income in Norwegian Krone and round up to the nearest Kron </label>
                                            <TextField
                                                hintText="Enter your Norwegian bank account number for payments"
                                                value={this.state.BankAccountnumberState}
                                                onChange={this.handleChangeBankAccountnumber.bind(this)}
                                                errorText={this.state.isValidBankAccountnumber ? "Please Enter your Norwegian bank account number for payments " : ""}
                                            />
                                        </Col>
                                        : ""}
                                </Col>
                                <Col xs={12} md={12}>
                                    {(this.state.marriedState == "S") ?
                                        <Col xs={12} md={5} className="input-fileds align-fileds">
                                            <label>Enter the national identity number of the deceased (if applicable) </label>
                                            <TextField
                                                hintText="Enter the national identity number of the deceased (if applicable)"
                                                value={this.state.NationalidentitynumberState}
                                                onChange={this.handleChangeNationalidentitynumber.bind(this)}
                                                errorText={this.state.isValidNationalidentitynumber ? "Please Enter the national identity number of the deceased " : ""}
                                            />
                                        </Col>
                                        : ""}
                                    </Col>
                                    <Col xs={12} md={12}>
                                    <Col xs={12} md={12}>
                                    <Col xs={12} md={7} className="Checkalign">
                                    
                                        <Checkbox
                                                label="Were you born in 1948 or later and cared for children under the age of 7 before 1992  . "
                                                disabled={this.state.ChildrenAgeState}
                                                value={this.state.ischecked}
                                                onClick={this.handleChangeChildrenAge.bind(this)}
                                                style={style.checkbox} />
                                        </Col>
                                       </Col>                                  
                                </Col>
                                
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} className="input-fields align-fileds">
                                        <h4>I am aware that NAV can obtain the information necessary to decide your application. The information has been given in good faith, and is as complete as possible. The declaration and signature apply to the entire retirement pension application</h4>
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                        <label>Place (City where you are currently located)<span className="manatoryfield">*</span></label>
                                        <Geosuggest
                                            placeholder="Enter the Address"
                                            initialValue={this.state.MailingAddressState}
                                            onSuggestSelect={this.onSuggestSelect.bind(this)}
                                            onChange={this.handleChangeMailingAddress}
                                            value={this.state.MailingAddressState}
                                            location={new google.maps.LatLng("", "")}
                                            radius="20"
                                        />
                                        <span className="validationmsg">{this.state.isValidMailingAddress ? "Please Choose Your Mailing Address" : null}</span>
                                    </Col>
                                    <Col xs={12} md={6} className="align-fileds">
                                        <label className="DatepickerLabel">Date<span className="manatoryfield">*</span></label>
                                        <div className="StartOfCountryDatepicker">
                                            <Datetime
                                                value={this.state.DateState}
                                                inputProps={{ placeholder: 'Enter the date' }}
                                                dateFormat="DD-MM-YYYY"
                                                onChange={this.handleChangeDate.bind(this)}
                                                timeFormat={false}
                                            />
                                        </div>
                                        <span className="validationmsg">{this.state.isValidDate ? "Please select you date " : null}</span>

                                    </Col>

                                </Col>
                                <Col xs={12} md={12} >
                                    <Col xs={12} md={9} >
                                    </Col>
                                    <Col xs={12} md={3} >
                                        <label className="TopicAlign"><b>Signature<span className="manatoryfield">*</span></b></label>
                                        <SignaturePad ref={ref => this.signaturePad = ref} />
                                        <Button id="clear" className="ClearBtn" onClick={this.handleSignatureClear.bind(this)}>Clear</Button>
                                        <span className="validationmsg">{this.state.isValidSignature ? "Please sign your signature" : ""}</span>
                                    </Col>
                                </Col>
                              
                              
                                {(this.state.RetirementState =="N")  ?
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                        <label><b>Which country or region will you have your funds deposited (select only one)</b></label>
                                        <SelectField
                                            hintText="Select Your Country Select"
                                            value={this.state.CountryState}
                                            onChange={this.handleChangeCountry.bind(this)}
                                            //errorText={this.state.isValidCountry ? "Please Select country or region will you have your funds deposited" : ""}
                                        >
                                            {BenCountryItems}
                                        </SelectField>
                                    </Col>
                                </Col>
                                
                                :""}
                                 
                                {(this.state.CountryState == "AU" || this.state.CountryState == "CA" || this.state.CountryState == "EEA" || this.state.CountryState == "MX" ||
                                    this.state.CountryState == "MX" || this.state.CountryState == "NEEA" || this.state.CountryState == "ZA" || this.state.CountryState == "US" || this.state.CountryState == "O") ?
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>The Bank's Name:</label>
                                            <TextField
                                                hintText="Enter the bank's Name:"
                                                value={this.state.BankNameState}
                                                onChange={this.handleChangeBankName.bind(this)}
                                                errorText={this.state.isValidBankName ? "Please Enter the bank's Name" : ""}
                                            />
                                        </Col>

                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>The bank's address and country:</label>
                                            <Geosuggest
                                                placeholder="The bank's address and country:"
                                                initialValue={this.state.MailingAddress1State}
                                                onSuggest1Select={this.onSuggest1Select.bind(this)}
                                                onChange={this.handleChangeMailingAddress1}
                                                value={this.state.MailingAddress1State}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidMailingAddress1 ? "Please Choose Your Mailing Address" : null}</span>
                                        </Col>
                                    </Col>
                                    : ""}
                                <Col xs={12} md={12} >
                                    {(this.state.CountryState == "AU" || this.state.CountryState == "CA" || this.state.CountryState == "US" || this.state.CountryState == "O") ?
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Account number or IBAN number:</label>
                                            <TextField
                                                hintText="Enter the Account number or IBAN number:"
                                                value={this.state.BankAcNumberState}
                                                onChange={this.handleChangeBankAcNumber.bind(this)}
                                                errorText={this.state.isValidBankAcNumber ? "Please Enter the  Account number or IBAN number" : ""}
                                            />
                                        </Col>
                                        : ""}
                                   
                                </Col>
                             

                                {this.state.CountryState == "US" ?
                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                        <label>Routing number - 9 digits: </label>
                                        <TextField
                                            hintText="Enter the Routing number - 9 digits: "
                                            value={this.state.RoutingnumberState}
                                            onChange={this.handleChangeRoutingnumber.bind(this)}
                                            errorText={this.state.isValidRoutingnumber ? "Please Enter the Routing number - 9 digits " : ""}
                                        />
                                    </Col>
                                    : ""}
                               
                               


                                <Col xs={12} md={12} >
                                    {this.state.CountryState == "AU" ?
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Bank code - 6 digits: </label>
                                            <TextField
                                                hintText="Bank code - 6 digits: "
                                                value={this.state.AUBankCodeState}
                                                onChange={this.handleChangeAUBankCode.bind(this)}
                                                errorText={this.state.isValidAUBankCode ? "Please Bank code - 6 digits:" : ""}
                                            />
                                        </Col>
                                        : ""}
                                   
                                </Col >



                                
                                {this.state.CountryState == "CA" ?
                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                        <label>Direct Payment Routing No (9 tall / digits): -- (0) + Inst no (3 tall/digits) + Bank no (5 tall/digits)</label>
                                        <TextField
                                            hintText="Direct Payment Routing No"
                                            value={this.state.CADirectPaymentState}
                                            onChange={this.handleChangeCADirectPayment.bind(this)}
                                            errorText={this.state.isValidCADirectPayment ? "Please Direct Payment Routing No" : ""}
                                        />
                                    </Col>
                                    : ""}
                                {this.state.CountryState == "CA" || this.state.CountryState == "EEA" || this.state.CountryState == "MX" || this.state.CountryState == "O" || this.state.CountryState == "NEEA" ?
                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                        <label>The bank`s S.W.I.F.T.(BIC) address  </label>
                                        <TextField
                                            hintText="Enter The bank`s S.W.I.F.T.(BIC) address  "
                                            value={this.state.CABICState}
                                            onChange={this.handleChangeCABIC.bind(this)}
                                            errorText={this.state.isValidCABIC ? "Please Enter The bank`s S.W.I.F.T.(BIC) address " : ""}
                                        />
                                    </Col>
                                    : ""}
                               


                                {this.state.CountryState == "MX" ?

                                    <Col xs={12} md={6} className="input-fileds align-fileds">
                                        <label>Clabe number - 18 digits:  </label>
                                        <TextField
                                            hintText="Clabe number - 18 digits:  "
                                            value={this.state.MXClabenumberState}
                                            onChange={this.handleChangeMXClabenumber.bind(this)}
                                            errorText={this.state.isValidMXClabenumber ? "Please Enter the Clabe number - 18 digits" : ""}
                                        />
                                    </Col>

                                    : ""}
                              


                                {this.state.CountryState == "ZA" ?
                                    <div>
                                        <Col xs={12} md={12} >
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Bank code - 6 digits: </label>
                                                <TextField
                                                    hintText="Bank code - 6 digits: "
                                                    value={this.state.ZABankCodeState}
                                                    onChange={this.handleChangeZABankCode.bind(this)}
                                                    errorText={this.state.isValidZABankCode ? "Please Bank code - 6 digits:" : ""}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Account number:  </label>
                                                <TextField
                                                    hintText="Enter the Account number:  "
                                                    value={this.state.ZAAccountnumberState}
                                                    onChange={this.handleChangeZAAccountnumber.bind(this)}
                                                    errorText={this.state.isValidZAAccountnumber ? "Please Enter the Account number" : ""}
                                                />
                                            </Col>
                                        </Col >
                                    </div>
                                    : ""}
                                {this.state.CountryState == "EEA" || this.state.CountryState == "NEEA" ?
                                    <div>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>IBAN number in Europe </label>
                                            <TextField
                                                hintText="IBAN number in Europe"
                                                value={this.state.EEABankCodeState}
                                                onChange={this.handleChangeEEABankCode.bind(this)}
                                                errorText={this.state.isValidEEABankCode ? "Please Bank code - 6 digits:" : ""}
                                            />
                                        </Col>

                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Currency of country </label>
                                            <TextField
                                                hintText="Currency of country "
                                                value={this.state.EEACurrencyState}
                                                onChange={this.handleChangeEEACurrency.bind(this)}
                                                errorText={this.state.isValidEEACurrency ? "Please Enter the Account number" : ""}
                                            />
                                        </Col>
                                    </div>
                                    : ""}
                                {/* {this.state.CountryState == "NEEA" ?
                                    <div>
                                        <Col xs={12} md={12} >
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>IBAN number in Europe </label>
                                                <TextField
                                                    hintText="IBAN number in Europe"
                                                    value={this.state.NEEABankCodeState}
                                                    onChange={this.handleChangeNEEABankCode.bind(this)}
                                                    errorText={this.state.isValidNEEABankCode ? "Please Bank code - 6 digits:" : ""}
                                                />
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds align-fileds">
                                                <label>Currency of country </label>
                                                <TextField
                                                    hintText="Currency of country "
                                                    value={this.state.NEEACurrencyState}
                                                    onChange={this.handleChangeNEEACurrency.bind(this)}
                                                    errorText={this.state.isValidNEEACurrency ? "Please Enter the Account number" : ""}
                                                />
                                            </Col>
                                        </Col >
                                    </div>
                                    : ""} */}
                                {(this.state.CountryState == "AU" || this.state.CountryState == "CA" || this.state.CountryState == "EEA" || this.state.CountryState == "MX" ||
                                    this.state.CountryState == "MX" || this.state.CountryState == "NEEA" || this.state.CountryState == "ZA" || this.state.CountryState == "US" || this.state.CountryState == "O") ?
                                    <div>
                                    <Col xs={12} md={12}>
                                        <Col xs={12} md={6} className="input-fileds align-fileds">
                                            <label>Place (City where you are currently located):</label>
                                            <Geosuggest
                                                placeholder="Place (City where you are currently located):"
                                                initialValue={this.state.MailingAddress2State}
                                                onSuggest1Select={this.onSuggest2Select.bind(this)}
                                                onChange={this.handleChangeMailingAddress2}
                                                value={this.state.MailingAddress2State}
                                                location={new google.maps.LatLng("", "")}
                                                radius="20"
                                            />
                                            <span className="validationmsg">{this.state.isValidMailingAddress2 ? "Please Choose Your Place" : null}</span>
                                        </Col>
                                        <Col xs={12} md={3} className="align-fileds">
                                            <label className="DatepickerLabel">Date</label>
                                            <div className="StartOfCountryDatepicker">
                                                <Datetime
                                                    value={this.state.Date1State}
                                                    inputProps={{ placeholder: 'Enter the date' }}
                                                    dateFormat="DD-MM-YYYY"
                                                    onChange={this.handleChangeDate1.bind(this)}
                                                    timeFormat={false}
                                                />
                                            </div>
                                            <span className="validationmsg">{this.state.isValidDate1 ? "Please select you date " : null}</span>
                                        </Col>
                                        <Col xs={12} md={3} >
                                            <label className="TopicAlign"><b>Signature</b></label>
                                            <SignaturePad ref={ref => this.signaturePad1 = ref} />
                                            <Button id="clear" className="ClearBtn" onClick={this.handleSignature1Clear.bind(this)}>Clear</Button>
                                            <span className="validationmsg">{this.state.isValidSignature1 ? "Please sign your signature" : ""}</span>
                                        </Col>
                                    </Col>
                                    {/* <Col xs={12} md={12}>
                                    <Col xs={12} md={12} className="input-fields">
                                        <Button onClick={this.handleBenQusDatas.bind(this)} className="RQ-Add" >{this.state.BtnNameState}</Button>
                                        <Notifications />
                                    </Col>
    
                                </Col> */}
                                </div>
                                    : ""}
                                      <Col xs={12} md={12}>
                                <Col xs={12} md={12} className="input-fields">
                                    <Button onClick={this.handleBenQusDatas.bind(this)} className="RQ-Add" >{this.state.BtnNameState}</Button>
                                    <Notifications />
                                </Col>
                            </Col>
                            </Row>
                            
                        </Panel.Body>
                    </Panel>
                </Col>
            </div >
        );
    }
    // handleBenQusSaveBankForm(event) {
    //     var ApplicantSignatureBase64 = this.signaturePad.toDataURL();
    //     emailresult = localStorage.getItem('applicant_email');
    //     //var isValid = this.handleValidation(this);
    //     console.log("Success ", isValid);
    //     if (isValid) {
    //         let QName;
    //         if (ModeEdit == "E") {
    //             QName = "SouthKoreaBankFormUpdate"
    //         } else {
    //             QName = "SouthKoreaBankFormSave"
    //         }
    //         let BankFormDataURL = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
    //         let BankFormJSONData = {
    //             QueryName: QName,
    //             UserID: emailresult,//"spurthi.n@mitosistech.com",
    //             //UserID: emailresult,
    //             CountryCode: "NO",
    //             BankFormInJsonObj: {
    //                 Nationalidnumber:this.state.NationalidnumberState,
    //                 BankAccountnumber:this.state.BankAccountnumberState,
    //                 Nationalidentitynumber:this.state.NationalidentitynumberState,
    //                 ChildrenAge:this.state.ChildrenAgeState,
    //                 MailingAddress:this.state.MailingAddressState,
    //                 Date:this.state.DateState,
    //                 Country:this.state.CountryState,
    //                 BankName:this.state.BankNameState,
    //                 MailingAddress1:this.state.MailingAddress1State,
    //                 BankAcNumber:this.state.BankAcNumberState,
    //                 Routingnumber:this.state.RoutingnumberState,
    //                 AUBankCode:this.state.AUBankCodeState,
    //                 CADirectPayment:this.state.CADirectPaymentState,
    //                 CABIC:this.state.CABICState,
    //                 MXClabenumber:this.state.MXClabenumberState,
    //                 ZABankCode:this.state.ZABankCodeState,
    //                 ZAAccountnumber:this.state.ZAAccountnumberState,
    //                 EEABankCode:this.state.EEABankCodeState,
    //                 EEACurrency:this.state.EEACurrencyState,
    //                 MailingAddress2:this.state.MailingAddress2State,
    //                 Date1:this.state.Date1State,
    //                 pensionlevel:this.state.pensionlevelState,
    //                 Signature: ApplicantSignatureBase64
    //             }
    //         }
    //         console.log(JSON.stringify(BankFormJSONData));

    //         SaveDataAPICallMailSend(BankFormDataURL, BankFormJSONData)
    //             .then((data) => {
    //                 console.log("Bank Form Data Saved In DB", data);
    //                 if (ModeEdit == "E") {
    //                     notify.show("Updated successfully", "success", 3000);
    //                 } else {
    //                     notify.show("Bank Form data saved successfully", "success", 3000);
    //                 }
    //                 this.handleGeneratePdf(this);
    //             }).catch((err) => {
    //                 console.log(err);
    //             });

    //     }
    // }
    //  //  bank form generation.
    // handleGeneratePdf(e) {
    //     let SaveDataFormURL = "https://rfhysxokyb.execute-api.us-west-2.amazonaws.com/dev/GPA_pdfformjs";
    //     let SavePensiondata = ({
    //         "html": "This is test Data",
    //         "DocCategory": "bankform",
    //         "countryCode": "kr", //this.state.CountryCode.toLowerCase()
    //         "language": "ko",
    //         "params": {
    //             "empId": emailresult,
    //             "bankdata": {
    //                 FullName: [this.state.FullName],
    //                 KoreanNationalNumber1: [this.state.KoreanNINNumber],
    //                 KoreanNationalNumber2: [this.state.KoreanNINNumber],
    //                 //SocialSecurityNumber: this.state.SocialSecurityNumber,
    //                 Nationality: [this.state.Nationality],
    //                 MailingAddress: [this.state.MailingAddress],
    //                 ZipCode: [this.state.ZipCode],
    //                 TelephoneNumber: [this.state.TelephoneNumber],
    //                 EmailAddress: [this.state.EmailAddress],
    //                 ApplicantFullName: [this.state.ApplicantFullName],
    //                 ApplicantKoreanNINNumber2: [this.state.ApplicantNINNumber],
    //                 ApplicantKoreanNINNumber1: [this.state.ApplicantNINNumber],
    //                 ApplicantMailingAddress: [this.state.ApplicantMailingAddress],
    //                 ApplicantTelephoneNumber: [this.state.ApplicantTelephoneNumber],
    //                 ApplicantSecurityNumber: [this.state.ApplicantSocialSecurityNumber],
    //                 //PaymentMode: this.state.PaymentMode,
    //                 //BeneficiaryState: this.state.BeneficiaryState,
    //                 Accountholder: [this.state.AccountHolderState],
    //                 Country: [this.state.CountryState],
    //                 BankNameCode: [this.state.BankNameCode],
    //                 BankAddress: [this.state.BankAddressState],
    //                 BNFsAccountNumber: [this.state.BNFAccountNumberState],
    //                 BankName: [this.state.IntermediaryBankNameState],
    //                 BankCode: [this.state.IntermediaryBankCodeState],
    //                 Currency: [this.state.CurrencyState],
    //                 DateofApplication: [this.state.DateofApplicationState],
    //             }
    //         }
    //     });
    //     console.log("SavePensiondata" + JSON.stringify(SavePensiondata));
    //     SaveDataAPICallMailSend(SaveDataFormURL, SavePensiondata)
    //         .then((data) => {
    //             console.log("Successfully PDF generated", data);
    //             this.handleGenerateBankDocID(this);
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    // }
    // // end of bank form generation.







    onSuggestSelect(suggest) {
        if (suggest) {

            this.setState({ MailingAddressState: suggest.description });
        }
    };
    onSuggest1Select(suggest) {
        if (suggest) {
            this.setState({ MailingAddress1State: suggest.description });
        }
    };
    onSuggest2Select(suggest) {
        if (suggest) {
            this.setState({ MailingAddress2State: suggest.description });
        }
    };

    handleChangeMailingAddress = (value) => {
        this.setState({ MailingAddressState: value });
    };
    handleChangeMailingAddress1 = (value) => {
        this.setState({ MaillingAddress1State: value });
    };
    handleChangeMailingAddress2 = (value) => {
        this.setState({ MaillingAddress2State: value });
    };
    handleSignatureClear = (e) => {
        this.signaturePad.clear();
    };
    handleSignature1Clear = (e) => {
        this.signaturePad1.clear();
    };
    handleChangeRetirement(e,index,value) {
        this.setState({RetirementState:value});
    };
    handleChangeNorwegianAccountnumber(e) {
        const NorwegianAccountnumber = e.target.value.replace(/[^0-9]/g, '');
        if (NorwegianAccountnumber.length < 12) {
        this.setState({ NorwegianAccountnumberState: NorwegianAccountnumber });
        }
    };
    handleChangeReceiving(e, date) {
        this.setState({ ReceivingState: Datetime.moment(date).format("MM-YYYY") });
    };
    handleChangemarried(e, index, value) {
        this.setState({ marriedState: value });
    };
    handleChangeLiveing(e, index, value) {
        this.setState({ LiveingState: value });
    };
    handleChangeApplypension(e, index, value) {
        this.setState({ ApplypensionState: value });
    };
    handleChangeNationalidnumber(e) {
        const NorwegianAccountnumber = e.target.value.replace(/[^0-9]/g, '');
        if (NorwegianAccountnumber.length < 12) {
        this.setState({ NationalidnumberState: NorwegianAccountnumber });
        }
    };
    handleChangeBankAccountnumber(e) {
        const BankAccountnumber = e.target.value.replace(/[^0-9]/g, '');
        if (BankAccountnumber.length < 8) {
            this.setState({ BankAccountnumberState: BankAccountnumber });
        }
    };
    handleChangeNationalidentitynumber(e) {
        const National = e.target.value.replace(/[^0-9]/g, '');
        if (National.length < 12) {
        this.setState({ NationalidentitynumberState: National });
        }
    };
    handleChangeChildrenAge() {
        if (this.state.ischecked == false || this.state.ischecked == '') {
            this.setState({
                ischecked: true
            });
            this.setState({ isEnabled: false })
        }
        else {
            this.setState({
                ischecked: false
            });
            this.setState({ isEnabled: true })
        }
    };
    handleChangeCountry(e, index, value) {
        this.setState({ CountryState: value });
    };
    handleChangeDate(e, date) {
        this.setState({ DateState: Datetime.moment(date).format("DD-MM-YYYY") });        
    };
    handleChangeBankName(e) {
        const BankName = e.target.value.replace(/[^A-z]/g, '');
        this.setState({ BankNameState: BankName });
    };
    handleChangeBankAcNumber(e) {
        const BankAcNumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ BankAcNumberState: BankAcNumber });
    };
    handleChangeBICCode(e) {
        const BICCode = e.target.value.replace(/[^0-9]/g, '');
        if (BICCode.length < 12) {
            this.setState({ BICCodeState: BICCode });
        }
    };
    handleChangeBankCode(e) {
        const BICCode = e.target.value;
        if (BICCode.length < 12) {
            this.setState({ BankCodeState: BICCode });
        }
    };
    handleChangeDate1(e, date) {
        this.setState({ Date1State: date });
    };
    handleChangeRoutingnumber(e) {
        const Routingnumber = e.target.value.replace(/[^0-9]/g, '');
        if (Routingnumber.length < 10) {
            this.setState({ RoutingnumberState: Routingnumber });
        }
    };
    handleChangeAccountnumber(e) {
        this.setState({ AccountnumberState: e.target.value });
    };
    handleChangeAUBankCode(e) {
        const AUBankCode = e.target.value.replace(/[^0-9]/g, '');
        if (AUBankCode.length < 7) {
            this.setState({ AUBankCodeState: AUBankCode });
        }
    };
    handleChangeAUAccountnumber(e) {
        const AUAccountnumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ AUAccountnumberState: AUAccountnumber });
    };
    handleChangeCAAccountnumber(e) {
        const CAAccountnumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ CAAccountnumberState: CAAccountnumber });
    };
    handleChangeCADirectPayment(e) {
        this.setState({ CADirectPaymentState: e.target.value });
    };
    handleChangeCABIC(e) {
        this.setState({ CABICState: e.target.value });
    };
    handleChangeMXClabenumber(e) {
        const MXClabenumber = e.target.value.replace(/[^0-9]/g, '');
        if (MXClabenumber.length < 18) {
            this.setState({ MXClabenumberState: MXClabenumber });
        }
    };
    handleChangeMXBIC(e) {
        this.setState({ MXBICState: e.target.value });
    };
    handleChangeZABankCode(e) {
        const ZABankCode = e.target.value.replace(/[^0-9]/g, '');
        if (ZABankCode.length < 7) {
            this.setState({ ZABankCodeState: ZABankCode });
        }
    };
    handleChangeZAAccountnumber(e) {
        const ZAAccountnumber = e.target.value.replace(/[^0-9]/g, '');
        this.setState({ ZAAccountnumberState: ZAAccountnumber });
    };
    handleChangeEEABankCode(e) {
        this.setState({ EEABankCodeState: e.target.value });
    };
    handleChangeEEACurrency(e) {
        this.setState({ EEACurrencyState: e.target.value });
    };
    handleChangeNEEABankCode(e) {
        this.setState({ NEEABankCodeState: e.target.value });
    };
    handleChangeNEEACurrency(e) {
        this.setState({ NEEACurrencyState: e.target.value });
    };

}

////*****call all the API common method****/////
const SaveDataAPICallMailSend = function (mailSendURL, data) {
    var promise = new Promise(function (resolve, reject) {
        axios({
            method: "POST",
            url: mailSendURL,
            data: JSON.stringify(data),

        }).then(({ data }) => {

            resolve(data);
        })
            .catch((err) => {

                reject(err);
            });
    })
    return promise;
}

BenNorway.propTypes = {
    googleMaps: PropTypes.object,
}

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

export default connect(mapReducerStateToProps, mapDispatchToProps)(BenNorway);