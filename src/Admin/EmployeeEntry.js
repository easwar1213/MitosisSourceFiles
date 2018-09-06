import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Row, Col, Grid, Button } from 'react-bootstrap';
import Paper from 'material-ui/Paper/Paper';
import SvgIcon from 'material-ui/SvgIcon';
import BackIcon from 'material-ui/svg-icons/content/reply';
import RemoveRedEye from 'material-ui/svg-icons/action/dashboard';
import EmployeeIcon from 'material-ui/svg-icons/action/supervisor-account';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';
import RadioButton from 'material-ui/RadioButton/RadioButton';
import DatePicker from 'material-ui/DatePicker/DatePicker';
import SweetAlert from 'sweetalert2-react';
import { Flex } from 'react-flex-material';
import NoCmpLogo from '../img/No_Image.png';

//Routing
import history from '../Routing/history';

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};
const style = {
    button: {
        margin: 12,
        width: 190,
    },
    exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
};
var EmpCode = "";
var EmpMsg = "";
var registerMsg = "Employee has been registered Successfully !";
var updateMsg = "Employee has been updated Successfully !";
var editedImgUrl = "";
var ImgFlag = 1;
const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);
const CompanyItems = [];
const DayItems = [];
for (let i = 1; i < 32; i++) {
    DayItems.push(<MenuItem value={i} key={i} primaryText={i} />);
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
    YearItems.push(<MenuItem value={i} key={i} primaryText={i} />);
}

class EmployeeEntry extends Component {
    constructor() {
        super();
        this.handleLoadCompany(this);
        this.handleEditEmployeeData(this);
        this.state = {
            CompanyID: null,
            EmployeeCode: '',
            EmpFirstName: '',
            EmpMiddleName: '',
            EmpLastName: '',
            EmployeeType: "",
            GenderState: "",
            DOB_Month: null,
            DOB_Day: null,
            DOB_Year: null,
            SSNumberState: '',
            PhoneNum: '',
            HomeNo: '',
            EmailState: '',
            IsActiveState: 'Y',
            InviteStatusState: 'P',
            validationError: {},
            isValidCompany: false,
            isValidEmployeeName: false,
            isValidEmail: false,
            isValidMobile: false,
            isValidphone: false,
            isValidEmployeeCode: false,
            isValidMonth: false,
            isValidDay: false,
            isValidYear: false,
            isValidIsActive: false,
            isValidInviteStatus: false,
            InvnLinkMsg: false,
            isValidEmailFormat: false,
            isValidPhoneFormat: false,
            IsDuplicateEmail: false,
            IsDuplicateEmpCode: false,
            Disabled: false,
            imagePreviewUrl: NoCmpLogo,
            Fileinput: true,
            FileExtension: "",
            FileName: "",
        }
    }
    handleEditEmployeeData(event) {
        var Params = new URLSearchParams(document.location.search);
        EmpCode = Params.get("EmployeeCode");
        var thisObj = this;
        let EmplCode = EmpCode;        
        if (EmplCode != "") {
            //let editEmpDataAPIUrl = "https://48q6lrdip0.execute-api.us-west-2.amazonaws.com/Dev/GPA_EmployeeDatas_Lambda";
            let editEmpDataAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
            var JSONData = JSON.stringify
                ({
                    EmployeeCode: EmplCode,
                    QueryName: "EmployeeEdit"
                });
            let AxiosHeaderConfig = {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
            axios({
                method: "POST",
                url: editEmpDataAPIUrl,
                data: JSONData,
                headers: AxiosHeaderConfig
            }).then(({ data }) => {
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    thisObj.setState({ EmployeeCode: data[i].EmployeeCode });
                    //  thisObj.setState({ EmployeeName: data[i].EmployeeName });
                    // thisObj.setState({ PhoneNum: data[i].PhoneNum });
                    // thisObj.setState({ Email: data[i].Email });
                    thisObj.setState({ CompanyID: data[i].CompanyCode });
                    thisObj.setState({ EmployeeType: data[i].EmployeeType });
                    thisObj.setState({ GenderState: data[i].Gender });
                    thisObj.setState({ DOB_Day: parseInt(data[i].DOB_Day) });
                    thisObj.setState({ DOB_Month: data[i].DOB_Month });
                    thisObj.setState({ DOB_Year: parseInt(data[i].DOB_Year) });
                    thisObj.setState({ SSNumberState: data[i].SSNum });
                    thisObj.setState({ PhoneNum: data[i].PhoneNum });
                    thisObj.setState({ HomeNo: data[i].HomeNum });
                    thisObj.setState({ EmailState: data[i].Email });
                    thisObj.setState({ EmpFirstName: data[i].EmpFirstName });
                    thisObj.setState({ EmpLastName: data[i].EmpLastName });
                    thisObj.setState({ EmpMiddleName: data[i].EmpMiddleName });
                    thisObj.setState({ IsActiveState: data[i].IsActive });
                    thisObj.setState({ InviteStatusState: data[i].InviteStatus });
                    thisObj.setState({ Disabled: true })
                    thisObj.setState({ Fileinput: false });
                    thisObj.setState({ imagePreviewUrl: data[i].EmployeeImg });
                    let url = data[i].EmployeeImg;
                    let base64Img = require('base64-img');
                    base64Img.requestBase64(url, function (err, res, body) {
                        let imgbase64 = body.split(',');
                        //this.setState({ imagePreviewUrl: imgbase64[1] });
                        editedImgUrl = imgbase64[1];                        
                    });
                }
            }).catch((err) => {
                console.log("DATA ", err);
            });
        }
    }
    handleChangeCompany = (e, index, value) => {
        this.setState({ CompanyID: value });
    }
    handle_EmployeeCode(e) {
        this.setState({ EmployeeCode: e.target.value });
    }
    handle_EmpFirstName(e) {
        this.setState({ EmpFirstName: e.target.value });
    }
    handle_EmpMiddleName(e) {
        this.setState({ EmpMiddleName: e.target.value });
    }
    handle_EmpLastName(e) {
        this.setState({ EmpLastName: e.target.value });
    }
    handleChangeEmployeeType(e) {
        this.setState({ EmployeeType: e.target.value });
    }
    handleChangeGender(e) {
        this.setState({ GenderState: e.target.value });
    }
    handleChangeMonth = (event, index, value) => {
        this.setState({ DOB_Month: value });
    };
    handleChangeDay = (event, index, value) => {
        this.setState({ DOB_Day: value });
    };
    handleChangeYear = (event, index, value) => {
        this.setState({ DOB_Year: value });
    };
    handleChangeIsActive = (event, index, value) => {
        this.setState({ IsActiveState: value });
    };
    handleChangeInviteStatus = (event, index, value) => {
        this.setState({ InviteStatusState: value });
    };
    handleChangeSSNumber(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 10) {
            this.setState({ SSNumberState: onlyNums });
        }
    }
    handleChangePhoneNum(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ PhoneNum: onlyNums });
        }
    }
    handleChangeHomeNo(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 12) {
            this.setState({ HomeNo: onlyNums });
        }
    }
    handleChangeEmailState(e) {
        this.setState({ EmailState: e.target.value });
    }
    handleLoadCompany(event) {
        let LoadCountryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            { QueryName: "InviteMembersClientCompanies" }
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
            CompanyItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                CompanyItems.push(<MenuItem value={data[i].CompanyCode} key={i} primaryText={data[i].CompanyName} />);
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    handleImageChange = (event, index, Suffix) => {
        this.state.imagePreviewUrl = "";
        event.preventDefault();
        //this.setState({ imagePreviewUrl : ""});
        let reader = new FileReader();
        let file = event.target.files[0];
        ImgFlag = 2;
        reader.onloadend = () => {
            let read = reader.result;
            let variable = read.split(',');
            this.setState({
                file: file,
                isvalidFile: false,
                Fileinput: false,
                fileimage: variable,
                fileName: file.name,
                imagePreviewUrl: variable,
                FileExtension: file.name.split('.').pop(),
            });
        }
        reader.readAsDataURL(file)
    };

    handleValidateForm(event) {
        const { validationError } = this.state;
        let validForm = false;
        var validEmailStateForm = false;
        var validCompanyForm = false;
        var validCodeForm = false;
        var validPhoneForm = false;
        var validEmpFirstNameForm = false;
        var varValidateEmail = this.state.EmailState;
        // var validMiddlNameForm = false;
        var validEmpLastNameForm = false;
        var validGenderForm = false;
        var validEmpForm = false;
        var validMonthForm = false;
        var validDayForm = false;
        var validYearForm = false;
        var validSSnNumberForm = false;
        var validHomeNoForm = false;
        var validIsActiveForm = false;
        var validInviteStatusForm = false;
        var validFileForm = false;


        // EmpFirst Name Validation.

        if (this.state.EmpFirstName.length > 0) {
            this.setState({ isValidEmpFirstName: false });
            if (this.state.EmpFirstName.length > 0 && this.state.EmpFirstName.length > 2) {
                this.setState({ isValidFormatEmpFirstName: false });
                validEmpFirstNameForm = true;
            }
            else {
                this.setState({ isValidFormatEmpFirstName: true });
                this.setState({ isValidEmpFirstName: false });
            }
        }
        else {
            this.setState({ isValidEmpFirstName: true });
            this.setState({ isValidFormatEmpFirstName: false });
            validEmpFirstNameForm = false;
        }

        // End Of First Name Validation.



        // Profile image validation.

        if (this.state.Fileinput != true) {
            this.setState({ isValidFile: false })
            validFileForm = true
        }
        else {
            this.setState({ isValidFile: true })
        }



        // Last Name Validation.

        if (this.state.EmpLastName.length > 0) {
            this.setState({ isValidEmpLastName: false });
            if (this.state.EmpLastName.length > 0 && this.state.EmpLastName.length > 2) {
                this.setState({ isValidFormatEmpLastName: false });
                validEmpLastNameForm = true;
            }
            else {
                this.setState({ isValidFormatEmpLastName: true });
                this.setState({ isValidEmpLastName: false });
            }
        }
        else {
            this.setState({ isValidEmpLastName: true });
            this.setState({ isValidFormatEmpLastName: false });
            validEmpLastNameForm = false;
        }

        // End Of Last Name Validation.

        // if (this.state.EmpFirstName.length > 0) {
        //     validationError['EmpFirstName '] = false;
        //     validEmpFirstNameForm = true;
        // }
        // else {
        //     validationError['EmpFirstName '] = true;
        // }
        // if (this.state.EmpLastName.length > 0) {
        //     validationError['EmpLastName '] = false;
        //     validEmpLastNameForm = true;
        // }
        // else {
        //     validationError['EmpLastName '] = true;
        // }
        // if (this.state.EmpMiddleName .length > 0) {
        // validationError['EmpMiddleName '] = false;
        // validMiddlNameForm = true;
        // }
        // else {
        // validationError['EmpMiddleName '] = true;
        // } 
        if (this.state.CompanyID != null) {
            this.setState({ isValidCompany: false });
            validCompanyForm = true;
        }
        else {
            this.setState({ isValidCompany: true });
        }
        if (this.state.GenderState != "") {
            validationError['Gender'] = false;
            validGenderForm = true;
        }
        else {
            validationError['Gender'] = true;
            validGenderForm = false;
        }
        if (this.state.EmployeeType != "") {
            validationError['EmployeeType'] = false;
            validEmpForm = true;
        }
        else {
            validationError['EmployeeType'] = true;
            validEmpForm = false;
        }
        // if (this.state.EmailState.length > 0) {
        // this.setState({ isValidEmail: false });
        // validEmailStateForm = true;
        // }
        // else {
        // this.setState({ isValidEmail: true });
        // }
        if (this.state.EmailState.length > 0) {
            validationError['Email'] = false;
            var varEmailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            this.setState({ isValidEmail: false });

            if (varEmailFormat.test(varValidateEmail)) {
                if (varValidateEmail.length > 0) {
                    this.setState({ isValidEmailFormat: false });
                    validEmailStateForm = true;
                }
                else {
                    this.setState({ isValidEmailFormat: false });
                    validEmailStateForm = false;
                }
            }
            else {
                this.setState({ isValidEmailFormat: true });
                validEmailStateForm = false;
            }
        }
        else {
            validationError['Email'] = true;
            this.setState({ isValidEmail: true });
            this.setState({ isValidEmailFormat: false });
            this.setState({ isValidEmail: false });
            validEmailStateForm = false;
        }
        // if (this.state.PhoneNum.length > 0 && this.state.PhoneNum.length > 9) {
        //     this.setState({ isValidphone: false, isValidPhoneFormat: false });
        //     validPhoneForm = true;
        // }
        // else {
        //     validationError['PhoneNum'] = true;
        //     this.setState({ isValidphone: true });
        // }
        // if (this.state.PhoneNum.length > 0 && this.state.PhoneNum.length < 10) {
        //     this.setState({ isValidPhoneFormat: true, isValidphone: false });
        //     validPhoneForm = false;
        // }

        // Phone Number Validation.

        if (this.state.PhoneNum.length > 0) {
            this.setState({ isValidPhoneNumState: false });
            if (this.state.PhoneNum.length > 0 && this.state.PhoneNum.length > 9) {
                this.setState({ isValidFormatPhoneNumState: false });
                validPhoneForm = true;
            }
            else {
                this.setState({ isValidFormatPhoneNumState: true });
            }
        }
        else {
            this.setState({ isValidPhoneNumState: true });
            this.setState({ isValidFormatPhoneNumState: false });
            validPhoneForm = false;
        }
        // End Of Phone Number Validation.




        // if (this.state.SSNumberState.length > 0 && this.state.SSNumberState.length > 8) {
        //     validationError['SSNumber'] = false;
        //     validationError['SSNumberFormat'] = false;
        //     validSSnNumberForm = true;
        // }
        // else {
        //     validationError['SSNumber'] = true;
        // }
        // if (this.state.SSNumberState.length > 0 && this.state.SSNumberState.length < 9) {
        //     validationError['SSNumber'] = false;
        //     validationError['SSNumberFormat'] = true;
        //     validSSnNumberForm = false;
        // }
        // if (validationError['SSNumberFormat'] == true && validationError['SSNumber'] == true) {
        //     validationError['SSNumberFormat'] = false;

        // }
        if (this.state.SSNumberState.length > 0) {
            this.setState({ isValidSSNumberState: false });
            if (this.state.SSNumberState.length > 0 && this.state.SSNumberState.length > 8) {
                this.setState({ isValidFormatSSNumberState: false });
                validSSnNumberForm = true;
            }
            else {
                this.setState({ isValidFormatSSNumberState: true });
            }
        }
        else {
            this.setState({ isValidSSNumberState: true });
            this.setState({ isValidFormatSSNumberState: false });
            validSSnNumberForm = false;
        }
        // if (this.state.HomeNo.length > 0 && this.state.HomeNo.length < 10) {
        //     validationError['HomeNo'] = true;
        //     validHomeNoForm = false;
        // }
        // else {
        //     validationError['HomeNo'] = false;
        //     validHomeNoForm = true;
        // }

        // Home Phone Number

        if (this.state.HomeNo.length > 0) {
            this.setState({ isValidHomeNoState: false });
            if (this.state.HomeNo.length > 0 && this.state.HomeNo.length > 9) {
                this.setState({ isValidFormatHomeNoState: false });
                validHomeNoForm = true;
            }
            else {
                this.setState({ isValidFormatHomeNoState: true });
            }
        }
        else {
            this.setState({ isValidHomeNoState: true });
            this.setState({ isValidFormatHomeNoState: false });
            validHomeNoForm = false;
        }

        // end of Home Phone Number

        // Employee Code Validation.

        if (this.state.EmployeeCode.length > 0) {
            this.setState({ isValidEmployeeCode: false });
            if (this.state.EmployeeCode.length > 0 && this.state.EmployeeCode.length > 2) {
                this.setState({ isValidFormatEmployeeCode: false });
                validCodeForm = true;
            }
            else {
                this.setState({ isValidFormatEmployeeCode: true });
                this.setState({ isValidEmployeeCode: false });
            }
        }
        else {
            this.setState({ isValidEmployeeCode: true });
            this.setState({ isValidFormatEmployeeCode: false });
            validCodeForm = false;
        }

        // end of Employee Code Validation.

        // if (this.state.EmployeeCode.length > 0) {
        //     validationError['Employee Code'] = false;
        //     validCodeForm = true;
        // }
        // else {
        //     validationError['Employee Code'] = true;
        // }

        if (this.state.DOB_Year != null) {
            this.setState({ isValidYear: false });
            validYearForm = true;
        }
        else {
            this.setState({ isValidYear: true });
        }
        if (this.state.DOB_Month != null) {
            this.setState({ isValidMonth: false });
            validMonthForm = true;
        }
        else {
            this.setState({ isValidMonth: true });
        }
        if (this.state.DOB_Day != null) {
            this.setState({ isValidDay: false });
            validDayForm = true;
        }
        else {
            this.setState({ isValidDay: true });
        }

        if (this.state.IsActiveState != null) {
            this.setState({ isValidIsActive: false });
            validIsActiveForm = true;
        }
        else {
            this.setState({ isValidIsActive: true });
            validIsActiveForm = false;
        }

        if (this.state.InviteStatusState != null) {
            this.setState({ isValidInviteStatus: false });
            validInviteStatusForm = true;
        }
        else {
            this.setState({ isValidInviteStatus: true });
            validInviteStatusForm = false;
        }

        if (this.state.HomeNo != "") {            
            if (validEmailStateForm && validCompanyForm && validHomeNoForm && validCodeForm && validEmpFirstNameForm && validPhoneForm && validEmpLastNameForm && validEmpForm && validGenderForm && validSSnNumberForm && validMonthForm && validDayForm && validYearForm && validIsActiveForm && validInviteStatusForm && validFileForm) {
                validForm = true;
            }
            else {
                validForm = false;
            }
        }
        else {            
            if (validEmailStateForm && validCompanyForm && validCodeForm && validEmpFirstNameForm && validPhoneForm && validEmpLastNameForm && validEmpForm && validGenderForm && validSSnNumberForm && validMonthForm && validDayForm && validYearForm && validIsActiveForm && validInviteStatusForm && validFileForm) {
                validForm = true;
            }
            else {
                validForm = false;
            }
        }
        return validForm;
    }

    handleNavPage() {
        history.push('/EmployeeList');
    }

    handleEmpNav() {
        history.push('/EmployeeList');
    }

    render() {
        const { CompanyID, DOB_Day, DOB_Month, DOB_Year, imagePreviewUrl } = this.state;
        let imagePreview = "";
        if (imagePreviewUrl) {
            imagePreview = (<img src={this.state.imagePreviewUrl} />);
        } else {
            imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
            <div className="main-wrapper">
                <div className="HeaderTile">
                    <Flex className="show-grid" layout="row" >
                        <Flex flex="none">
                            <div className="TitleIcon">
                                <h4><span className="TitleIconColor">{<EmployeeIcon />}</span><span className="TitleTexColor">Employee Entry</span></h4>
                            </div>
                        </Flex>
                        <Flex flex layout align="end center">
                            <div>
                                <h5><span className="BreadCrumbsClass"><ListIcon /></span>&nbsp;&nbsp;<b><span className="ActiveClass" onClick={this.handleNavPage.bind(this)}>Employee Details</span></b></h5>
                            </div>
                        </Flex>
                    </Flex>
                </div>

                <Paper zDepth={1} className="CommonDiv">
                    <h2 className="legendtitle">Add Employee</h2>   
                        <div className="fieldstyle"> 
                            <Row className="show-grid">
                                <Col xs={12} md={12} className="PanelText">
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={6} className="input-fileds" >
                                                <SelectField
                                                    floatingLabelText={<span>Company Name<span className="manatoryfield">*</span></span>}
                                                    value={CompanyID}
                                                    onChange={this.handleChangeCompany}
                                                    errorText={this.state.isValidCompany ? "Please Select Your Company Name" : null}
                                                >
                                                    {CompanyItems}
                                                </SelectField>
                                            </Col>

                                            <Col xs={12} md={6} className="input-fileds">
                                                <TextField hintText="Enter Your Employee Code"
                                                    floatingLabelText={<span>Employee Code<span className="manatoryfield">*</span></span>}
                                                    value={this.state.EmployeeCode}
                                                    onChange={this.handle_EmployeeCode.bind(this)}
                                                    errorText={this.state.isValidEmployeeCode ? "Please Enter Your Employee Code" : null}
                                                    disabled={this.state.Disabled}
                                                />
                                                <span className="validationmsg">{this.state.isValidFormatEmployeeCode ? "Please Enter Valid Employee Code" : null}</span>
                                                <span className="validationmsg">{this.state.IsDuplicateEmpCode ? "This EmployeeCode already Exits" : null}</span>
                                            </Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={4} className="input-fileds">
                                                <TextField hintText="Enter Your First Name"
                                                    floatingLabelText={<span>First Name<span className="manatoryfield">*</span></span>}
                                                    value={this.state.EmpFirstName}
                                                    onChange={this.handle_EmpFirstName.bind(this)}
                                                    errorText={this.state.isValidEmpFirstName ? "Please Enter Your First Name" : null}
                                                />
                                                <span className="validationmsg">{this.state.isValidFormatEmpFirstName ? "Please Enter Valid Employee FirstName" : null}</span>
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds">
                                                <TextField hintText="Enter Your Middle Name"
                                                    floatingLabelText="Middle Name"
                                                    value={this.state.EmpMiddleName}
                                                    onChange={this.handle_EmpMiddleName.bind(this)}
                                                />
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds">
                                                <TextField hintText="Enter Your Last Name"
                                                    floatingLabelText={<span>Last Name<span className="manatoryfield">*</span></span>}
                                                    value={this.state.EmpLastName}
                                                    onChange={this.handle_EmpLastName.bind(this)}
                                                    errorText={this.state.isValidEmpLastName ? "Please Enter Your Last Name" : null}
                                                />
                                                <span className="validationmsg">{this.state.isValidFormatEmpLastName ? "Please Enter Valid Employee LastName" : null}</span>
                                            </Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={2}>
                                                <p><label>Employee Type:</label></p>
                                            </Col>

                                            <Col xs={12} md={6} className="Radio_button">
                                                <RadioButtonGroup onChange={this.handleChangeEmployeeType.bind(this)} valueSelected={this.state.EmployeeType} style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <RadioButton
                                                        value="C"
                                                        //disabled={this.state.EmployeeType == "R"}
                                                        label="Current Employee"
                                                        style={styles.radioButton}
                                                    />
                                                    <RadioButton
                                                        value="R"
                                                        //disabled={this.state.EmployeeType == "R"}
                                                        label="Retired"
                                                        style={styles.radioButton}
                                                    />
                                                </RadioButtonGroup >
                                                <span className="validationmsg">{this.state.validationError["EmployeeType"] ? "Please Choose Your Employee Type" : null}</span>
                                            </Col>

                                            <Col xs={12} md={4}></Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={2}>
                                                <p><label>Gender :</label></p>
                                            </Col>
                                            <Col xs={12} md={6} className="Radio_button">
                                                <RadioButtonGroup valueSelected={this.state.GenderState} onChange={this.handleChangeGender.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <RadioButton
                                                        value="M"
                                                        label="Male"
                                                        style={styles.radioButton}
                                                    />
                                                    <RadioButton
                                                        value="F"
                                                        label="Female"
                                                        style={styles.radioButton}
                                                    />
                                                </RadioButtonGroup >
                                                <span className="validationmsg">{this.state.validationError["Gender"] ? "Please Choose Your Gender" : null}</span>
                                            </Col>
                                            <Col xs={12} md={4}></Col>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={4} className="input-fileds">
                                                <SelectField
                                                    value={this.state.DOB_Month}
                                                    floatingLabelText={<span>DOB(Month)<span className="manatoryfield">*</span></span>}
                                                    onChange={this.handleChangeMonth}
                                                    maxHeight={200}
                                                    errorText={this.state.isValidMonth ? "Please Select Your DOB(Month)" : null}
                                                >
                                                    {MonthItems}
                                                </SelectField>
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds">
                                                <SelectField
                                                    value={this.state.DOB_Day}
                                                    floatingLabelText={<span>DOB(Day)<span className="manatoryfield">*</span></span>}
                                                    onChange={this.handleChangeDay}
                                                    maxHeight={200}
                                                    errorText={this.state.isValidDay ? "Please Select Your DOB(Day)" : null}
                                                >
                                                    {DayItems}
                                                </SelectField>
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds">
                                                <SelectField
                                                    value={this.state.DOB_Year}
                                                    floatingLabelText={<span>DOB(Year)<span className="manatoryfield">*</span></span>}
                                                    onChange={this.handleChangeYear}
                                                    maxHeight={200}
                                                    errorText={this.state.isValidYear ? "Please Select Your DOB(Year)" : null}
                                                >
                                                    {YearItems}
                                                </SelectField>
                                            </Col>
                                        </Col>
                                     </Col>
                                     <Col xs={12} md={12}>
                                       
                                        <Col xs={12} sm={6} md={8}>
                                            <Col xs={12} md={6} className="input-fileds">
                                                <TextField hintText="Enter your Social Security Number" floatingLabelText={<span>Social Security Number<span className="manatoryfield">&nbsp;*</span></span>}
                                                    errorText={this.state.isValidSSNumberState ? "Please Enter Your Social Security Number" : ""}
                                                    value={this.state.SSNumberState}
                                                    onChange={this.handleChangeSSNumber.bind(this)}
                                                />
                                                <span className="validationmsg">{this.state.isValidFormatSSNumberState ? "Please Enter Valid Social Security Number" : ""}</span>
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds" >
                                                <TextField hintText="Enter Your Mobile Phone Number" floatingLabelText={<span>Mobile Phone Number<span className="manatoryfield">&nbsp;*</span></span>}
                                                    value={this.state.PhoneNum}
                                                    onChange={this.handleChangePhoneNum.bind(this)}
                                                    errorText={this.state.isValidPhoneNumState ? "Please Enter Your Mobile Phone Number" : ""}
                                                // errorText={this.state.isValidPhoneFormat ? "Please Enter Valid Phone Number" : ""} 

                                                />
                                                <span className="validationmsg">{this.state.isValidFormatPhoneNumState ? "Please Enter Your Valid Mobile Phone Number" : ""}</span>
                                            </Col>

                                        
                                            <Col xs={12} md={6} className="input-fileds" >
                                                <TextField hintText="Enter Your Home Phone Number" floatingLabelText="Home Phone Number"
                                                    value={this.state.HomeNo}
                                                    onChange={this.handleChangeHomeNo.bind(this)}
                                                // errorText={this.state.isValidHomeNoState ? "Please Enter Your Home Phone Number" : ""}
                                                />
                                                <span className="validationmsg">{this.state.isValidFormatHomeNoState ? "Please Enter Your Valid Home Phone Number" : ""}</span>
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds" >
                                                <TextField hintText="Enter Your Email" errorText={this.state.validationError["Email"] ? " Please Enter Your Email" : ""}
                                                    floatingLabelText={<span>Email<span className="manatoryfield">*</span></span>}
                                                    type="email"
                                                    value={this.state.EmailState}
                                                    onChange={this.handleChangeEmailState.bind(this)}
                                                />
                                                <span className="validationmsg">{this.state.isValidEmailFormat ? "Please Enter the Valid Mail" : ""}</span>
                                                <span className="validationmsg">{this.state.IsDuplicateEmail ? "This Email already Exits" : null}</span>
                                            </Col>
                                       
                                            <Col xs={12} md={6} className="input-fileds">
                                                <SelectField
                                                    floatingLabelText={<span>Is Active<span className="manatoryfield">*</span></span>}
                                                    value={this.state.IsActiveState}
                                                    onChange={this.handleChangeIsActive.bind(this)}

                                                >
                                                    <MenuItem value={"Y"} primaryText="Yes" />
                                                    <MenuItem value={"N"} primaryText="No" />
                                                </SelectField>
                                            </Col>
                                            <Col xs={12} md={6} className="input-fileds">
                                                <SelectField
                                                    floatingLabelText={<span>Invite Status<span className="manatoryfield">*</span></span>}
                                                    value={this.state.InviteStatusState}
                                                    onChange={this.handleChangeInviteStatus.bind(this)}

                                                >
                                                    <MenuItem value={"P"} primaryText="Pending" />
                                                    <MenuItem value={"C"} primaryText="Completed" />
                                                </SelectField>
                                            </Col>
                                        </Col>
                                        <Col xs={12} sm={4} md={4} className="FileUploadSection">
		                                        <RaisedButton
		                                        label="Choose an Image"
		                                        labelPosition="before"
		                                        style={style}
		                                        containerElement="label">
		                                        <input type="file" onChange={this.handleImageChange} style={style.exampleImageInput} />
		                                    </RaisedButton>
		                                    {<span className="validationmsg">{this.state.isValidFile ? "Please Select Your Business Logo" : null}</span>}
		                                    <div className="imgPreview">
		                                        {imagePreview}
		                                    </div>
                                        </Col>
                                        <Col xs={12} md={12}>
                                            
                                            <Col xs={12} className="RegButton" style={styles}>
                                                <Col md={6} xs={12}>
                                                    <Button onClick={this.handleReset.bind(this)} className="ResetButton" >Reset</Button>
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    <Button type="submit" className="RegButton2" onClick={this.handleSubmit.bind(this)}>Save</Button>
                                                </Col>
                                                <SweetAlert
                                                    show={this.state.InvnLinkMsg}
                                                    title="Success"
                                                    text={EmpMsg}
                                                    onConfirm={this.handleEmpNav.bind(this)}
                                                />
                                            </Col>
                                        </Col>
                                </Col>
                        </Row>
                        </div>
                </Paper>
            </div>
        );
    }
    handleReset(e) {
        //console.log(EmpCode);
        document.querySelector('input[type=file]').value = '';
        if (EmpCode == null) {
            this.setState({
                CompanyID: null,
                EmployeeCode: '',
                EmpFirstName: '',
                EmpMiddleName: '',
                EmpLastName: '',
                EmployeeType: "",
                GenderState: "",
                DOB_Month: null,
                DOB_Day: null,
                DOB_Year: null,
                SSNumberState: '',
                PhoneNum: '',
                HomeNo: '',
                EmailState: '',
                IsActiveState: "Y",
                InviteStatusState: "P",
                validationError: {},
                isValidCompany: false,
                isValidEmployeeName: false,
                isValidEmail: false,
                //isValidMobile: false,
                //isValidphone: false,
                //isValidEmployeeCode: false,
                isValidMonth: false,
                isValidDay: false,
                isValidYear: false,
                isValidIsActive: false,
                isValidInviteStatus: false,
                InvnLinkMsg: false,
                isValidEmailFormat: false,
                //isValidPhoneFormat: false,
                isValidSSNumberState: false,
                isValidFormatSSNumberState: false,
                isValidFormatHomeNoState: false,
                isValidHomeNoState: false,
                isValidFormatEmployeeCode: false,
                isValidEmployeeCode: false,
                isValidFormatPhoneNumState: false,
                isValidPhoneNumState: false,
                isValidEmpFirstName: false,
                isValidFormatEmpFirstName: false,
                isValidEmpLastName: false,
                isValidFormatEmpLastName: false,
                Fileinput: true,
                imagePreviewUrl: "",
                isValidFile: false,
            })
        }
        else {            
            this.handleEditEmployeeData(this);
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        var thisObj = this;
        var isValid = this.handleValidateForm(this);
        if (isValid) {
            var thisObj = this;
            //let empRegAPIUrl = "https://48q6lrdip0.execute-api.us-west-2.amazonaws.com/Dev/GPA_EmployeeDatas_Lambda";
            let empRegAPIUrl = "https://d7dr757y78.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModuleS3_Lambda";
            let queryString = EmpCode != null ? "EmployeeUpdate" : "EmployeeSave";
            let empRegJSONData = JSON.stringify({
                QueryName: queryString,
                EmpFirstName: this.state.EmpFirstName,
                EmpMiddleName: this.state.EmpMiddleName,
                EmpLastName: this.state.EmpLastName,
                CompanyCode: this.state.CompanyID,
                PhoneNum: this.state.PhoneNum,
                Email: this.state.EmailState,
                Gender: this.state.GenderState,
                EmployeeCode: EmpCode != "" ? this.state.EmployeeCode : "",
                EmployeeType: this.state.EmployeeType,
                DOB_Day: this.state.DOB_Day,
                DOB_Month: this.state.DOB_Month,
                DOB_Year: this.state.DOB_Year,
                SSNumberState: this.state.SSNumberState,
                HomeNum: this.state.HomeNo,
                IsActive: this.state.IsActiveState,
                InviteStatus: this.state.InviteStatusState,
                EmployeeImg: ImgFlag == 1 ? editedImgUrl : this.state.imagePreviewUrl[1],
                MainFolderName: "applicant",
                SubFolderName: this.state.EmailState,
                MailDocName: "ProfileImage",
                FileExtension: this.state.FileExtension,
                FileName: this.state.fileName
            });   
            let AxiosHeaderConfig = {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
            axios({
                method: "POST",
                url: empRegAPIUrl,
                data: empRegJSONData,
                headers: AxiosHeaderConfig,

            }).then((data) => {
                console.log(data);
                if (data.data.errorMessage != undefined) {                    
                    thisObj.setState({ InvnLinkMsg: false });
                    if ((data.data.errorMessage.indexOf("EmployeeCode") != -1) && (data.data.errorMessage.indexOf("Email") != -1)) {
                        thisObj.setState({ IsDuplicateEmpCode: true });
                        thisObj.setState({ IsDuplicateEmail: true });

                    }
                    else if (data.data.errorMessage.indexOf("EmployeeCode") != -1) {
                        thisObj.setState({ IsDuplicateEmpCode: true });
                        thisObj.setState({ IsDuplicateEmail: false });
                    }
                    else {
                        thisObj.setState({ IsDuplicateEmail: true });
                        thisObj.setState({ IsDuplicateEmpCode: false });
                    }
                }
                else {
                    thisObj.setState({ InvnLinkMsg: true });
                    thisObj.setState({ EmployeeCode: "" });
                    thisObj.setState({ EmpFirstName: "" });
                    thisObj.setState({ CompanyID: "" });
                    thisObj.setState({ PhoneNum: "" });
                    thisObj.setState({ EmailState: "" });
                    thisObj.setState({ GenderState: "" });
                    thisObj.setState({ EmployeeType: "" });
                    thisObj.setState({ DOB_Day: "" });
                    thisObj.setState({ DOB_Month: "" });
                    thisObj.setState({ DOB_Year: "" });
                    thisObj.setState({ SSNumberState: "" });
                    thisObj.setState({ HomeNo: "" });
                    thisObj.setState({ EmpLastName: "" })
                    thisObj.setState({ EmpMiddleName: "" });
                    ImgFlag = 1;
                }
                // thisObj.setState({ InvnLinkMsg: true });
                // thisObj.setState({ InvnLinkMsg: true });
                // thisObj.setState({ EmployeeCode: "" });
                // thisObj.setState({ EmpFirstName: "" });
                // thisObj.setState({ CompanyID: "" });
                // thisObj.setState({ PhoneNum: "" });
                // thisObj.setState({ EmailState: "" });
                // thisObj.setState({ GenderState: "" });
                // thisObj.setState({ EmployeeType: "" });
                // thisObj.setState({ DOB_Day: "" });
                // thisObj.setState({ DOB_Month: "" });
                // thisObj.setState({ DOB_Year: "" });
                // thisObj.setState({ SSNumberState: "" });
                // thisObj.setState({ HomeNo: "" });
                // thisObj.setState({ EmpLastName: "" })
                // thisObj.setState({ EmpMiddleName: "" })
            }).catch((err) => {
                thisObj.setState({ InvnLinkMsg: false });
            })
            EmpMsg = EmpCode != null ? updateMsg : registerMsg;
        }
    }
}
export default EmployeeEntry;