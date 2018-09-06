import React, { Component } from 'react';
import PropTypes from "prop-types";
import Geosuggest from 'react-geosuggest';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Row, Col, Grid, Button } from 'react-bootstrap';
import Paper from 'material-ui/Paper/Paper';
import SvgIcon from 'material-ui/SvgIcon';
import BackIcon from 'material-ui/svg-icons/content/reply';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import RemoveRedEye from 'material-ui/svg-icons/action/dashboard';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import SweetAlert from 'sweetalert2-react';
import { parse } from 'url';
import NoCmpLogo from '../img/No_Image.png';
import { Flex } from 'react-flex-material';

//Routing
import history from '../Routing/history';

const CountryItems = [];
const IndustrystatusItems = [];
const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);
var Companynumber = "";
var CliMsg = "";
var registerMsg = "Client has been registered Successfully !";
var updateMsg = "Client has been updated Successfully !";
var editedImgUrl = "";
var ImgFlag = 1;

const styles = {
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
class ClientCompanyEntry extends Component {
    constructor() {
        super();
        this.handleLoadCountry(this);
        this.handleEditClientData(this);
        this.handleloadindustry(this);
        this.state = {
            CompanyCode: '',
            CompanyName: '',
            Address: '',
            search: "",
            value: "",
            Country: null,
            isValidCountry: false,
            ContactPerson1: '',
            ContactPerson2: '',
            ContactPerson3: '',
            NoOfEmployee: '',
            IndustryState: null,
            isValidIndustry: false,
            CompanyProductDesc: '',
            PhoneNum: '',
            FaxNo: '',
            CompanyWebsite: '',
            EmailState: '',
            imagePreviewUrl: NoCmpLogo,
            validationError: {},
            isValidphone: false,
            InvnLinkMsg: false,
            Fileinput: true,
            isValidPhoneFormat: false,
            isValidEmailFormat: false,
            IsDuplicateCompanyCode: false,
            Disabled: false,
            IsActiveState: 'Y',
            fileName : "",
        }
    }
    handleNavPage() {
        history.push('/ClientCompanyList');
    }
    handleEditClientData(event) {
        var Params = new URLSearchParams(document.location.search);
        var CompID = Params.get("CompanyCode");
        var thisObj = this;
        let CompanyCode = CompID;
        if (CompanyCode != "") {
            //let editClientDataAPIUrl = "https://ol7k5jcmac.execute-api.us-west-2.amazonaws.com/Dev/GPA_ClientCompanyDatas_Lambda";
            let editClientDataAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
            var data = {
                QueryName: "ClientCompanyEdit",
                CompanyCode: CompanyCode,
            }
            let AxiosHeaderConfig = {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
            axios({
                method: "POST",
                url: editClientDataAPIUrl,
                data: JSON.stringify(data),
                headers: AxiosHeaderConfig,

            }).then(({ data }) => {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    //CountryItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
                    //thisObj.setState({Country:data[i].CountryCode}); 
                    thisObj.setState({ CompanyCode: data[i].CompanyCode });
                    thisObj.setState({ CompanyName: data[i].CompanyName });
                    thisObj.setState({ Address: data[i].Address });
                    thisObj.setState({ Country: data[i].CountryCode });
                    thisObj.setState({ ContactPerson1: data[i].ContactPerson1 });
                    thisObj.setState({ ContactPerson2: data[i].ContactPerson2 });
                    thisObj.setState({ ContactPerson3: data[i].ContactPerson3 });
                    thisObj.setState({ NoOfEmployee: data[i].NoOfEmployees });
                    thisObj.setState({ IndustryState: data[i].IndustryCode });
                    thisObj.setState({ CompanyProductDesc: data[i].CompanyProductDesc });
                    thisObj.setState({ PhoneNum: data[i].TelePhoneNum });
                    thisObj.setState({ FaxNo: data[i].Fax });
                    thisObj.setState({ CompanyWebsite: data[i].Website });
                    thisObj.setState({ EmailState: data[i].Email });
                    thisObj.setState({ imagePreviewUrl: data[i].CompanyLogo });
                    thisObj.setState({ Disabled: true });
                    thisObj.setState({ IsActiveState: data[i].IsActive });
                    thisObj.setState({ Fileinput: false });
                    let url = data[i].CompanyLogo;
                    let base64Img = require('base64-img');
                    base64Img.requestBase64(url, function (err, res, body) {
                        let imgbase64 = body.split(',');
                        //this.setState({ imagePreviewUrl: imgbase64[1] });
                        editedImgUrl = imgbase64[1];
                        //console.log(editedImgUrl)
                    });

                    if (data[i].CompanyID != "") {
                        Companynumber = data[i].CompanyCode;
                    }
                }

            }).catch((err) => {
                //alert("Error");
                //console.log("DATA ", err);
            });
        }
    }
    handle_CompanyCode(e) {
        this.setState({ CompanyCode: e.target.value });
    };
    handle_CompanyName(e) {
        this.setState({ CompanyName: e.target.value });
    };
    handleSelectSuggest(suggest) {
        if(suggest){
            this.setState({ Address:suggest.description});
        }
    };
    handle_address(value) {
        this.setState({ Address: value })
    };
    handleChangeCountry = (event, index, Suffix) => {
        this.setState({ Country: Suffix });
    };
    handle_ContactPerson1(e) {
        this.setState({ ContactPerson1: e.target.value });
    };
    handle_ContactPerson2(e) {
        this.setState({ ContactPerson2: e.target.value });
    };
    handle_ContactPerson3(e) {
        this.setState({ ContactPerson3: e.target.value });
    };
    handle_NoOfEmployee(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 9) {
            this.setState({ NoOfEmployee: onlyNums });
        }
    };
    handleIndustrylist = (event, index, value) => {
        this.setState({ IndustryState: value });
    };
    handle_CompanyProductDesc(e) {
        this.setState({ CompanyProductDesc: e.target.value });
    };
    handleChangePhoneNum(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 11) {
            this.setState({ PhoneNum: onlyNums });
        }
    };
    handleChangeFaxNo(e) {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 14) {
            this.setState({ FaxNo: onlyNums });
        }
    };
    handleChangeCompanyWebsite(e) {
        this.setState({ CompanyWebsite: e.target.value });
    }
    handleChangeEmail(e) {
        this.setState({ EmailState: e.target.value });
    }
    handleChangeIsActive(e, index, value) {
        this.setState({ IsActiveState: value });
    };
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
            headers: AxiosHeaderConfig,
        }).then(({ data }) => {
            for (let i = 0; i < data.length; i++) {
                CountryItems.push(<MenuItem value={data[i].CountryCode} key={i} primaryText={data[i].CountryName} />);
            }

        }).catch((err) => {
            console.log(err);
        })
    }
    handleloadindustry(event) {
        let GenLoadIndustryAPIUrl = "https://yfsrlo44q0.execute-api.us-west-2.amazonaws.com/Dev/GPA_LoadCommonDatas_Lambda";
        let JSONData = JSON.stringify(
            { QueryName: "Industries" }
        );
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
            data: JSONData,
            url: GenLoadIndustryAPIUrl,
            // headers:AxiosHeaderConfig,

        }).then((data) => {
            for (let i = 0; i < data.data.length; i++) {
                IndustrystatusItems.push(<MenuItem value={data.data[i].IndustryCode} key={1} primaryText={data.data[i].IndustryName} />);
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
                imagePreviewUrl: variable
            });
        }
        reader.readAsDataURL(file)
    };

    handleValidateForm(event) {
        const { validationError } = this.state;
        let validForm = false;
        var validCompCodeForm = false;
        var validCompNameForm = false;
        var validAddressForm = false;
        var validCountryForm = false;
        var validContactPerson1Form = false;
        var validEmailStateForm = false;
        var varValidateEmail = this.state.EmailState;
        var validFaxForm = false;
        // var validContactPerson2Form = false;
        // var validContactPerson3Form = false;
        // var validNoofEmpForm = false;
        var validTypeOfIndusForm = false;
        // var validCompanyDescForm = false;
        var validPhoneForm = false;
        // var validFaxForm = false;
        var validCompanyWebsiteForm = false;
        var validEmailForm = false;
        var validFileForm = false;
        var validIsActiveForm = false;


        if (this.state.IsActiveState != "") {
            this.setState({ isValidIsActive: false });
            validIsActiveForm = true;
        }
        else {
            this.setState({ isValidIsActive: true });
            validIsActiveForm = false;
        }

        // Company Code Validation.
        if (this.state.CompanyCode.length > 0) {
            this.setState({ isValidCompanyCode: false });
            if (this.state.CompanyCode.length > 0 && this.state.CompanyCode.length > 2) {
                this.setState({ isValidFormatCompanyCode: false });
                validCompCodeForm = true;
            }
            else {
                this.setState({ isValidFormatCompanyCode: true });
                this.setState({ isValidCompanyCode: false });
            }
        }
        else {
            this.setState({ isValidCompanyCode: true });
            this.setState({ isValidFormatCompanyCode: false });
            validCompCodeForm = false;
        }
        // End Of Company Code Validation.

        // Company Name Validation.
        if (this.state.CompanyName.length > 0) {
            this.setState({ isValidCompanyName: false });
            if (this.state.CompanyName.length > 0 && this.state.CompanyName.length > 2) {
                this.setState({ isValidFormatCompanyName: false });
                validCompNameForm = true;
            }
            else {
                this.setState({ isValidFormatCompanyName: true });
                this.setState({ isValidCompanyName: false });
            }
        }
        else {
            this.setState({ isValidCompanyName: true });
            this.setState({ isValidFormatCompanyName: false });
            validCompNameForm = false;
        }
        // End Of Company Name Validation.

        if (this.state.Address.length > 0) {
            validationError['Address'] = false;
            validAddressForm = true;
        }
        else {
            validationError['Address'] = true;
        }
        if (this.state.Country != null) {
            this.setState({ isValidCountry: false });
            validCountryForm = true;
        }
        else {
            this.setState({ isValidCountry: true });
        }
        if (this.state.ContactPerson1.length > 0) {
            validationError['ContactPerson1'] = false;
            validContactPerson1Form = true;
        }
        else {
            validationError['ContactPerson1'] = true;
        }
        // if (this.state.ContactPerson2.length > 0) {
        //     validationError['ContactPerson2'] = false;
        //     validContactPerson2Form = true;
        // }
        // else {
        //     validationError['ContactPerson2'] = true;
        // }
        // if (this.state.ContactPerson3.length > 0) {
        //     validationError['ContactPerson3'] = false;
        //     validContactPerson3Form = true;
        // }
        // else {
        //     validationError['ContactPerson3'] = true;
        // }       
        // if (this.state.NoOfEmployee.length != '') {            
        //     validationError['NoOfEmployee'] = false;
        //     validNoofEmpForm = true;
        // }
        // else {
        //     validationError['NoOfEmployee'] = true;
        // }
        if (this.state.IndustryState != null) {
            this.setState({ isValidIndustry: false });
            validTypeOfIndusForm = true;
        }
        else {
            this.setState({ isValidIndustry: true });
        }

        if (this.state.PhoneNum.length > 0 && this.state.PhoneNum.length > 9) {
            this.setState({ isValidphone: false, isValidPhoneFormat: false });
            validPhoneForm = true;
        }
        else {
            validationError['PhoneNum'] = true;
            this.setState({ isValidphone: true });
        }
        if (this.state.PhoneNum.length > 0 && this.state.PhoneNum.length < 10) {
            this.setState({ isValidPhoneFormat: true, isValidphone: false });
            validPhoneForm = false;
        }
        if (this.state.FaxNo.length > 0 && this.state.FaxNo.length < 13) {
            validationError['FaxNo'] = true;
            validFaxForm = false;
        }
        else {
            validationError['FaxNo'] = false;
            validFaxForm = true;
        }
        if (this.state.CompanyWebsite.length > 0) {
            validationError['CompanyWebsite'] = false;
            validCompanyWebsiteForm = true;
        }
        else {
            validationError['CompanyWebsite'] = true;
        }
        if (this.state.EmailState.length > 0) {
            validationError['Email'] = false;
            var varEmailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            this.setState({ isValidEmail: false });

            if (varEmailFormat.test(varValidateEmail)) {
                if (varValidateEmail.length > 0) {
                    this.setState({ isValidEmailFormat: false });
                    validEmailForm = true;
                }
                else {
                    this.setState({ isValidEmailFormat: false });
                    validEmailForm = false;
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
        if (this.state.Fileinput != true) {
            this.setState({ isValidFile: false })
            validFileForm = true
        }
        else {
            this.setState({ isValidFile: true })
        }
        //if (validCompCodeForm && validCompNameForm && validAddressForm && validCountryForm && validContactPerson1Form && validContactPerson2Form && validContactPerson3Form && validNoofEmpForm && validTypeOfIndusForm && validCompanyDescForm && validPhoneForm && validFaxForm && validCompanyWebsiteForm && validEmailForm) {
        if (this.state.FaxNo != "") {
            if (validCompCodeForm && validCompNameForm && validFaxForm && validAddressForm && validCountryForm && validContactPerson1Form && validPhoneForm && validCompanyWebsiteForm && validEmailForm && validTypeOfIndusForm && validFileForm && validIsActiveForm) {

                validForm = true;
            }
            else {
                validForm = false;
            }
        }

        else {
            if (validCompCodeForm && validCompNameForm && validAddressForm && validCountryForm && validContactPerson1Form && validPhoneForm && validCompanyWebsiteForm && validEmailForm && validTypeOfIndusForm && validFileForm && validIsActiveForm) {

                validForm = true;
            }
            else {
                validForm = false;
            }
        }
        return validForm;
    }

    handleNavAdminPage() {
        this.setState({ InvnLinkMsg: false });
        history.push('/ClientCompanyList');
    }

    render() {
        const { search, value, Address } = this.state;
        const { imagePreviewUrl, Country } = this.state;
        let imagePreview = "";
        if (imagePreviewUrl) {
            imagePreview = (<img src={this.state.imagePreviewUrl} />);
        } else {
            imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        const google = window.google;
        return (
            <div>
                <div className="wrapper scrollable">
                    <div className="HeaderTile">
                        <Flex className="show-grid" layout="row" >
                            <Flex flex="none">
                                <div className="TitleIcon">
                                    <h4><span className="TitleIconColor">{<RemoveRedEye />}</span><span className="TitleTexColor">Client Company Entry</span></h4>
                                </div>
                            </Flex>
                            <Flex flex layout align="end center">
                                <div>
                                    <h5><span className="BreadCrumbsClass"><ListIcon /></span>&nbsp;&nbsp;<b><span className="ActiveClass" onClick={this.handleNavPage.bind(this)}>Client Company Details</span></b></h5>
                                </div>
                            </Flex>
                        </Flex>
                    </div>
                    {/* <Col xs={12} md={12}> */}
                    <Paper zDepth={1} className="CommonDiv2">
                        <h2 className="legendtitle">Add Client Company</h2>
                        <div className="fieldstyle">
                            <Row className="show-grid">
                                <Col xs={12} sm={8} md={8}>
                                    <Col xs={12} md={6} className="input-fileds">
                                        <TextField hintText="Enter Your Client Company Code" floatingLabelText={<span>Client Company Code<span className="manatoryfield">*</span></span>}
                                            name="CompanyCode"
                                            value={this.state.CompanyCode}
                                            onChange={this.handle_CompanyCode.bind(this)}
                                            errorText={this.state.isValidCompanyCode ? "Please Enter Your Client Company Code" : null}
                                            disabled={this.state.Disabled}
                                        />
                                        <span className="validationmsg">{this.state.isValidFormatCompanyCode ? "Please Enter Valid Company Code" : null}</span>

                                        <span className="validationmsg">{this.state.IsDuplicateCompanyCode ? "This CompanyCode already Exists" : null}</span>
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds">
                                        <TextField hintText="Enter Your Client Company Name" floatingLabelText={<span>Client Company Name<span className="manatoryfield">*</span></span>}
                                            name="CompanyName"
                                            value={this.state.CompanyName}
                                            onChange={this.handle_CompanyName.bind(this)}
                                            errorText={this.state.isValidCompanyName ? "Please Enter Your Client Company Name" : null}
                                        />
                                        <span className="validationmsg">{this.state.isValidFormatCompanyName ? "Please Enter Valid Company Name" : null}</span>
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds">
                                        {/* <ReactGoogleMapLoader
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
                                                                value={this.state.Address}
                                                                onChange={this.handle_address.bind(this)}
                                                                hintText=" Enter Your Client Company Address"
                                                                floatingLabelText={<span>Enter Your Client Company Address<span className="manatoryfield">*</span></span>}
                                                                errorText={this.state.validationError["Address"] ? "Please Enter Your Client Company Address" : null}
                                                            />
                                                        </ReactGooglePlacesSuggest>
                                                    )
                                                }
                                            /> */}
                                        <Geosuggest
                                            placeholder="Enter Your Client Company Address"
                                            initialValue={this.state.Address}
                                            onSuggestSelect={this.handleSelectSuggest.bind(this)}
                                            onChange={this.handle_address.bind(this)}
                                            value={this.state.Address}
                                            location={new google.maps.LatLng("", "")}
                                            radius="20"
                                        />
                                        <span className="validationmsg">{this.state.validationError["Address"] ? "Please Choose Your Mailing Address" : null}</span>
                                    </Col>
                                
                                    <Col xs={12} md={6} className="input-fileds">
                                        <SelectField
                                            value={this.state.Country}
                                            floatingLabelText={<span>Country<span className="manatoryfield">&nbsp;*</span></span>}
                                            onChange={this.handleChangeCountry}
                                            errorText={this.state.isValidCountry ? "Please Select Your Country" : null}
                                            maxHeight={200}
                                        >
                                            {CountryItems}
                                        </SelectField>
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds">
                                        <TextField hintText="Enter Your Contact Person 1" floatingLabelText={<span>Contact Person 1<span className="manatoryfield">*</span></span>}
                                            name="ContactPerson"
                                            value={this.state.ContactPerson1}
                                            onChange={this.handle_ContactPerson1.bind(this)}
                                            errorText={this.state.validationError["ContactPerson1"] ? "Please Enter Your Contact Person 1" : null}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds">
                                        <TextField hintText="Enter Your Contact Person 2" floatingLabelText={<span>Contact Person 2</span>}
                                            name="ContactPerson2"
                                            value={this.state.ContactPerson2}
                                            onChange={this.handle_ContactPerson2.bind(this)}
                                            errorText={this.state.validationError["ContactPerson2"] ? "Please Enter Your Contact Person 2" : null}
                                        />
                                    </Col>
                                
                                    <Col xs={12} md={6} className="input-fileds">
                                        <TextField hintText="Enter Your Contact Person 3" floatingLabelText={<span>Contact Person 3</span>}
                                            name="ContactPerson3"
                                            value={this.state.ContactPerson3}
                                            onChange={this.handle_ContactPerson3.bind(this)}
                                            errorText={this.state.validationError["ContactPerson3"] ? "Please Enter Your Contact Person 3" : null}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds">
                                        <TextField hintText="Enter Your Number Of Employee" floatingLabelText={<span>Number Of Employee</span>}
                                            name="NoOfEmployee"
                                            value={this.state.NoOfEmployee}
                                            onChange={this.handle_NoOfEmployee.bind(this)}
                                            errorText={this.state.validationError["NoOfEmployee"] ? "Please Enter Number Of Employee" : null}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds">
                                        <SelectField
                                            floatingLabelText="Type of industry or business"
                                            value={this.state.IndustryState}
                                            onChange={this.handleIndustrylist.bind(this)}
                                            errorText={this.state.isValidIndustry ? "Please Enter Type of industry or business" : null}
                                        >
                                            {IndustrystatusItems}
                                        </SelectField>
                                    </Col>
                               
                                    <Col xs={12} md={6} className="input-fileds">
                                        <TextField hintText="Enter Your Company Product Description" floatingLabelText={<span>Company Product Description</span>}
                                            name="CompanyProductDesc"
                                            value={this.state.CompanyProductDesc}
                                            onChange={this.handle_CompanyProductDesc.bind(this)}
                                            errorText={this.state.validationError["CompanyProductDesc"] ? "Please Enter Company Product Description" : null}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds" >
                                        <TextField hintText="Enter Your Telephone No" floatingLabelText={<span>Telephone No<span className="manatoryfield">&nbsp;*</span></span>}
                                            value={this.state.PhoneNum}
                                            onChange={this.handleChangePhoneNum.bind(this)}
                                            errorText={this.state.isValidphone ? "Please Enter Your Telephone No" : null}
                                        />
                                        <span className="validationmsg">{this.state.isValidPhoneFormat ? "Please Enter Valid Telephone No" : ""}</span>
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds" >
                                        <TextField hintText="Enter Your Fax No" floatingLabelText="Fax No"
                                            value={this.state.FaxNo}
                                            onChange={this.handleChangeFaxNo.bind(this)}
                                            errorText={this.state.validationError["FaxNo"] ? "Please Enter Valid Fax Number" : null}
                                        />
                                    </Col>
                               
                                    <Col xs={12} md={6} className="input-fileds" >
                                        <TextField hintText="Enter Your Company Website" floatingLabelText={<span>Company Website<span className="manatoryfield">*</span></span>}
                                            value={this.state.CompanyWebsite}
                                            onChange={this.handleChangeCompanyWebsite.bind(this)}
                                            errorText={this.state.validationError["CompanyWebsite"] ? "Please Enter Your Company Website" : null}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds" >
                                        <TextField hintText="Enter your Email" errorText={this.state.validationError["Email"] ? " Please Enter Your Email" : ""}
                                            floatingLabelText={<span>Email<span className="manatoryfield">&nbsp;*</span></span>}
                                            type="email"
                                            value={this.state.EmailState}
                                            onChange={this.handleChangeEmail.bind(this)}
                                        />
                                        <span className="validationmsg">{this.state.isValidEmailFormat ? "Please Enter the Valid Mail" : ""}</span>
                                    </Col>
                                    <Col xs={12} md={6} className="input-fileds" >
                                        <SelectField
                                            floatingLabelText={<span>Is Active<span className="manatoryfield">*</span></span>}
                                            value={this.state.IsActiveState}
                                            onChange={this.handleChangeIsActive.bind(this)}
                                        >
                                            <MenuItem value={"Y"} primaryText="Yes" />
                                            <MenuItem value={"N"} primaryText="No" />
                                        </SelectField>
                                    </Col>
                                </Col>
                                <Col xs={12} sm={4} md={4} className="FileUploadSection">
	
	                                <RaisedButton
	                                    label="Choose an Image"
	                                    labelPosition="before"
	                                    style={styles}
	                                    containerElement="label">
	                                    <input type="file" onChange={this.handleImageChange} style={styles.exampleImageInput} />
	                                </RaisedButton>
	                                {<span className="validationmsg">{this.state.isValidFile ? "Please Select Your Business Logo" : null}</span>}
	                                <div className="imgPreview">
	                                    {imagePreview}
	                                </div>
	                            </Col>
                                <Col xs={12} md={12}>
                                    
                                    <Col xs={12} md={7} className="RegButton" style={styles}>                                        
                                        <Col md={6} xs={6}>
                                            <Button onClick={this.handleReset.bind(this)} className="ResetButton" >Reset</Button>
                                        </Col>
                                        <Col md={6} xs={6}>
                                            <Button type="submit" className="RegButton2" onClick={this.handleRegistration.bind(this)}>Save</Button>
                                        </Col>
                                        <SweetAlert
                                            show={this.state.InvnLinkMsg}
                                            title="Success"
                                            text={CliMsg}
                                            // onConfirm={() => this.setState({ InvnLinkMsg: false  })}
                                            onConfirm={this.handleNavAdminPage.bind(this)}
                                        />
                                    </Col>

                                </Col>
                                {/* </form> */}
                            </Row>
                        </div>

                    </Paper>
                    {/* </Col> */}

                </div>
            </div>
        );
    }
    handleReset(e) {
        document.querySelector('input[type=file]').value = '';        
        if (editedImgUrl == "") {
            this.setState({
                CompanyCode: '',
                CompanyName: '',
                Address: '',
                search: "",
                value: "",
                Country: null,
                isValidCountry: false,
                ContactPerson1: '',
                ContactPerson2: '',
                ContactPerson3: '',
                NoOfEmployee: '',
                IndustryState: null,
                isValidIndustry: false,
                CompanyProductDesc: '',
                PhoneNum: '',
                FaxNo: '',
                CompanyWebsite: '',
                EmailState: '',
                imagePreviewUrl: "",
                validationError: {},
                isValidphone: false,
                InvnLinkMsg: false,
                Fileinput: true,
                isValidPhoneFormat: false,
                isValidEmailFormat: false,
                isValidCompanyCode: false,
                isValidFormatCompanyCode: false,
                isValidCompanyName: false,
                isValidFormatCompanyName: false,
                isValidFile: false,
                IsActiveState: 'Y',
            })
        }
        else {
            this.handleEditClientData(this);
        }
    }
    handleRegistration(event) {
        event.preventDefault();
        var thisObj = this;
        var isValid = this.handleValidateForm(this);
        if (isValid) {
            var thisObj = this;

            //let clientRegAPIUrl = Companynumber != "" ? "https://ol7k5jcmac.execute-api.us-west-2.amazonaws.com/Dev/GPA_ClientCompanyUpdate_Lambda" : "https://ol7k5jcmac.execute-api.us-west-2.amazonaws.com/Dev/GPA_ClientCompanySave_Lambda";
            let clientRegAPIUrl = "https://d7dr757y78.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModuleS3_Lambda";
            let queryString = Companynumber != "" ? "ClientCompanyUpdate" : "ClientCompanySave";
            //let queryString = Companynumber != "" ? "Update" : "Save";
            //alert(this.state.imagePreviewUrl);

            // if(this.state.imagePreviewUrl == NoCmpLogo)
            // {
            //     alert("noimage");
            //     alert(this.state.imagePreviewUrl);                
            //     let base64Img = require('base64-img');
            //     base64Img.requestBase64(NoCmpLogo, function(err, res, body) {
            //     let imgbase64 = body.split(',');
            //     //this.setState({ imagePreviewUrl: imgbase64[1] });
            //     editedImgUrl = imgbase64[1];
            //     alert(editedImgUrl);
            //     //break;
            //     //exit(0);
            //    // process.exit();
            //     //console.log(editedImgUrl)
            //     }); 
            // }
            let clientRegJSONData = JSON.stringify({
                CompanyCode: Companynumber != "" ? Companynumber : "",
                QueryName: queryString,
                CompanyName: this.state.CompanyName,
                CompanyCode: this.state.CompanyCode,
                Address: this.state.Address,
                Country: this.state.Country,
                ContactPerson1: this.state.ContactPerson1,
                ContactPerson2: this.state.ContactPerson2,
                ContactPerson3: this.state.ContactPerson3,
                NoOfEmployee: this.state.NoOfEmployee,
                IndustryState: this.state.IndustryState,
                CompanyProductDesc: this.state.CompanyProductDesc,
                PhoneNum: this.state.PhoneNum,
                FaxNo: this.state.FaxNo,
                CompanyWebsite: this.state.CompanyWebsite,
                EmailState: this.state.EmailState,
                IsActive: this.state.IsActiveState,
                FileName: this.state.fileName,
                imagePreviewUrl: ImgFlag == 1 ? editedImgUrl : this.state.imagePreviewUrl[1]
            });              
            let AxiosHeaderConfig = {
                headers: {
                    accept: 'application/json',
                    
                    "Access-Control-Request-Headers": "*",
                    "Access-Control-Request-Method": "*",
                    'Content-Type': 'application/json;charset=UTF-8',

                    // "Access-Control-Allow-Origin": "*",
                }
            };
            axios({
                method: "POST",
                url: clientRegAPIUrl,
                data: clientRegJSONData,
                //headers:AxiosHeaderConfig,

            }).then((data) => {
                if (data.data.errorMessage != undefined) {
                    thisObj.setState({ InvnLinkMsg: false });
                    if ((data.data.errorMessage.indexOf("CompanyCode") != -1)) {
                        thisObj.setState({ IsDuplicateCompanyCode: true });
                    }
                }
                else {
                    thisObj.setState({ CompanyCode: "" });
                    thisObj.setState({ CompanyName: "" });
                    thisObj.setState({ Address: "" });
                    thisObj.setState({ Country: "" });
                    thisObj.setState({ ContactPerson1: "" });
                    thisObj.setState({ ContactPerson2: "" });
                    thisObj.setState({ ContactPerson3: "" });
                    thisObj.setState({ NoOfEmployee: "" });
                    thisObj.setState({ IndustryState: "" });
                    thisObj.setState({ CompanyProductDesc: "" });
                    thisObj.setState({ PhoneNum: "" });
                    thisObj.setState({ FaxNo: "" });
                    thisObj.setState({ CompanyWebsite: "" });
                    thisObj.setState({ EmailState: "" });
                    thisObj.setState({ InvnLinkMsg: true });
                    thisObj.setState({ imagePreviewUrl: null });
                    thisObj.setState({ fileimage: "" });
                }
            }).catch((err) => {
                console.log(err)
                thisObj.setState({ InvnLinkMsg: false });
            })
            CliMsg = Companynumber != "" ? updateMsg : registerMsg;

        }
    }
}
ClientCompanyEntry.propTypes = {
    googleMaps: PropTypes.object,
}
export default ClientCompanyEntry;