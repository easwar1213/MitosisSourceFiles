import React, { Component } from 'react';
import { Col, Panel, Row, Button, Grid } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import '../Style/style.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import { Flex } from 'react-flex-material';
import General from 'material-ui/svg-icons/action/open-with';
import SvgIcon from 'material-ui/SvgIcon';
import BackIcon from 'material-ui/svg-icons/content/reply';
import NoCmpLogo from '../img/No_Image.png';
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
var ImgFlag = 1;
var editedImgUrl = "";
const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};
const style = {
    RaisedButton: {
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
class Country extends Component {
    constructor() {
        super();
        this.state = {
            BtnName: "Save",
            CountryCodeState: '',
            CountryNameState: '',
            UnderGPAState: 'N',
            ForecastLetterState: 'N',
            CountryPensionFormState: 'N',
            CountryBilateralFormState: 'N',
            LumpSumOptionState: 'N',
            VolContributionOptionState: 'N',
            BuyUpOptionState: 'N',
            FileName: "",
            CountryFlagState: NoCmpLogo,
            BeginningAgeState:"",
            EndAgeState:"",
            US_BFState: 'N',
            IsActiveState: 'Y',
            tableData: [],
            isvalidCountryCode: false,
            isValidCountryName: false,
            isValidUnderGPA: false,
            isValidForecastLetter: false,
            isValidCountryPensionForm: false,
            isValidCountryBilateralForm: false,
            isValidLumpSumOption: false,
            isValidVolContributionOption: false,
            isValidBuyUpOption: false,
            isValidIsActive: false,
            isValidFormatCountryCode: false,
            isValidFormatCountryName: false,
            isValidFormatIsActive: false,
            Fileinput: true,
            isValidBeginningAge : false,
            isValidEndAge : false,
            isValidUS_BF: false,
        }
        this.handleCountryRead(this);
    }

    handleChangeCountryCode(e) {
        this.setState({ CountryCodeState: e.target.value });
    };

    handleChangeCountryName(e) {
        this.setState({ CountryNameState: e.target.value });
    };

    handleChangeUnderGPA(e, index, value) {
        this.setState({ UnderGPAState: value });
    };

    handleChangeForecastLetter(e, index, value) {
        this.setState({ ForecastLetterState: value });
    };

    handleChangeCountryPensionForm(e, index, value) {
        this.setState({ CountryPensionFormState: value });
    };

    handleChangeCountryBilateralForm(e, index, value) {
        this.setState({ CountryBilateralFormState: value });
    };

    handleChangeLumpSumOption(e, index, value) {
        this.setState({ LumpSumOptionState: value });
    };

    handleChangeVolContributionOption(e, index, value) {
        this.setState({ VolContributionOptionState: value });
    };

    handleChangeBuyUpOption(e, index, value) {
        this.setState({ BuyUpOptionState: value });
    };

    handleChangeIsActive(e, index, value) {
        this.setState({ IsActiveState: value });
    };

    handleChangeBeginningAge(e) {
        this.setState({ BeginningAgeState : e.target.value});
    };

    handleChangeEndAge(e) {
        this.setState({ EndAgeState : e.target.value});
    };

    handleChangeUs_BF(e, index, value) {
        this.setState({ US_BFState: value });
    };

    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="warning" onClick={() => this.handleCountryEdit(row.CountryID)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>

            </div>
        )
    }
    deleteButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="danger" onClick={() => this.handleCountryDelete(row.CountryID)} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></Button>
            </div>
        )
    }
    handleValidateForm(e) {
        const { validationError } = this.state;
        let validForm = false;
        var validCountryCodeForm = false;
        var validCountryNameForm = false;
        var validUnderGPAForm = false;
        var validForecastLetterForm = false;
        var validCountryPensionForm = false;
        var validCountryBilateralForm = false;
        var validLumpSumOptionForm = false;
        var validVolContributionOptionForm = false;
        var validBuyUpOptionForm = false;
        var validFileForm = false;
        var validIsActiveForm = false;
        var validBeginningAgeForm = false;
        var validEndAgeForm = false;
        var validUS_BFForm = false;
        if (this.state.CountryCodeState.length > 0) {
            this.setState({ isValidCountryCode: false });
            validCountryCodeForm = true;
        }
        else {
            this.setState({ isValidCountryCode: true });
            validCountryCodeForm = false;
        }
        if (this.state.CountryNameState.length > 0) {
            this.setState({ isValidCountryName: false });
            if (this.state.CountryNameState.length > 0 && this.state.CountryNameState.length > 2) {
                this.setState({ isValidFormatCountryName: false });
                validCountryNameForm = true;
            }
            else {
                this.setState({ isValidFormatCountryName: true });
                this.setState({ isValidCountryName: false });
            }
        }
        else {
            this.setState({ isValidCountryName: true });
            this.setState({ isValidFormatCountryName: false });
            validCountryNameForm = false;
        }
        if (this.state.UnderGPAState != "") {
            this.setState({ isValidUnderGPA: false });
            validUnderGPAForm = true;
        }
        else {
            this.setState({ isValidUnderGPA: true });
            validUnderGPAForm = false;
        }
        if (this.state.ForecastLetterState != "") {
            this.setState({ isValidForecastLetter: false });
            validForecastLetterForm = true;
        }
        else {
            this.setState({ isValidForecastLetter: true });
            validForecastLetterForm = false;
        }
        if (this.state.CountryPensionFormState != "") {
            this.setState({ isValidCountryPensionForm: false });
            validCountryPensionForm = true;
        }
        else {
            this.setState({ isValidCountryPensionForm: true });
            validCountryPensionForm = false;
        }
        if (this.state.CountryBilateralFormState != "") {
            this.setState({ isValidCountryBilateralForm: false });
            validCountryBilateralForm = true;
        }
        else {
            this.setState({ isValidCountryBilateralForm: true });
            validCountryBilateralForm = false;
        }
        if (this.state.LumpSumOptionState != "") {
            this.setState({ isValidLumpSumOption: false });
            validLumpSumOptionForm = true;
        }
        else {
            this.setState({ isValidLumpSumOption: true });
            validLumpSumOptionForm = false;
        }
        if (this.state.VolContributionOptionState != "") {
            this.setState({ isValidVolContributionOption: false });
            validVolContributionOptionForm = true;
        }
        else {
            this.setState({ isValidVolContributionOption: true });
            validVolContributionOptionForm = false;
        }
        if (this.state.BuyUpOptionState != "") {
            this.setState({ isValidBuyUpOption: false });
            validBuyUpOptionForm = true;
        }
        else {
            this.setState({ isValidBuyUpOption: true });
            validBuyUpOptionForm = false;
        }
        if (this.state.IsActiveState != "") {
            this.setState({ isValidIsActive: false });
            validIsActiveForm = true;
        }
        else {
            this.setState({ isValidIsActive: true });
            validIsActiveForm = false;
        }
        if (this.state.Fileinput != true) {
            this.setState({ isValidFile: false })
            validFileForm = true
        }
        else {
            this.setState({ isValidFile: true });
            validFileForm = false;
        }
        if (this.state.BeginningAgeState.length > 0) {
            this.setState({ isValidBeginningAge: false });
            validBeginningAgeForm = true;
        }
        else {
            this.setState({ isValidBeginningAge: true });
            validBeginningAgeForm = false;
        }
        if (this.state.EndAgeState.length > 0) {
            this.setState({ isValidEndAge: false });
            validEndAgeForm = true;
        }
        else {
            this.setState({ isValidEndAge: true });
            validEndAgeForm = false;
        }
        if(this.state.US_BFState !=""){
            this.setState({ isValidUS_BF : false});
            validUS_BFForm = true;
        }
        else{
            this.setState({ isValidUS_BF : true});
            validUS_BFForm = false;
        }
        if (validCountryCodeForm && validCountryNameForm && validUnderGPAForm && validForecastLetterForm && validCountryPensionForm && validCountryBilateralForm && validLumpSumOptionForm && validVolContributionOptionForm && validBuyUpOptionForm && validIsActiveForm && validFileForm && validBeginningAgeForm && validEndAgeForm && validUS_BFForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }
    handleCountrySave(e) {
        var QName ;
        if(this.state.BtnName=="Save"){
            QName = "CountriesSave";
        }
        else{
            QName = "CountriesUpdate";
        }        
        var thisObj = this;
        var isValid = this.handleValidateForm(this);
        if (isValid) {
            var thisObj = this;
            //let CountrySaveAPIurl = "https://6vj52ppj8d.execute-api.us-west-2.amazonaws.com/Dev/GPA_Countires_Lambda";
            let CountrySaveAPIurl = "https://d7dr757y78.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModuleS3_Lambda";
            let CountrySaveJSONData = JSON.stringify({
                QueryName: QName,
                CountryID: this.state.CountryID,
                CountryCode: this.state.CountryCodeState,
                CountryName: this.state.CountryNameState,
                UnderGPA: this.state.UnderGPAState,
                ForecastLetter: this.state.ForecastLetterState,
                CountryPensionForm: this.state.CountryPensionFormState,
                CountryBilateralForm: this.state.CountryBilateralFormState,
                LumpSumOption: this.state.LumpSumOptionState,
                VolContributionOption: this.state.VolContributionOptionState,
                BuyUpOption: this.state.BuyUpOptionState,
                BeginAge : this.state.BeginningAgeState,
                EndAge : this.state.EndAgeState,
                USBF : this.state.US_BFState,
                IsActive: this.state.IsActiveState,
                FileName: this.state.FileName,
                CountryFlag: ImgFlag == 1 ? editedImgUrl : this.state.CountryFlagState[1],
            });            
            let AxiosHeaderConfig = {
                "Content-Type": "application/json",
                // "Access-Control-Request-Headers": "*",
                // "Access-Control-Request-Method": "*",
            }
            axios({
                method: "POST",
                url: CountrySaveAPIurl,
                data: CountrySaveJSONData,
                headers: AxiosHeaderConfig,

            }).then((data) => {
                notify.show("Saved Successfully", "success", 3000);
                thisObj.handleReset(this);
            }).catch((err) => {
                //thisObj.setState({ InvnLinkMsg: false });
            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }
    handleCountryRead(e) {
        var thisObj = this;
        //let CountryAPIUrl = "https://6vj52ppj8d.execute-api.us-west-2.amazonaws.com/Dev/GPA_Countires_Lambda";
        let CountryAPIUrl="https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CJSONData = JSON.stringify(
            {
                QueryName: "CountriesRead"
            });
        let AxiosHeaderConfig = {
            headers: {
                // accept: 'application/json',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
                'Content-Type': 'application/json',
                //"Access-Control-Allow-Origin": "*",
            }
        };
        axios({
            method: "POST",
            url: CountryAPIUrl,
            data: CJSONData
            //headers:AxiosHeaderConfig

        }).then((data) => {
            thisObj.setState({ tableData: data.data });
        }).catch((err) => {
            console.log(err)
        })
    }
    handleCountryEdit(event) {
        this.setState({ BtnName: "Update" });
        this.setState({ CountryID: event });
        var thisObj = this;
        //let CountryEditAPIUrl = "https://6vj52ppj8d.execute-api.us-west-2.amazonaws.com/Dev/GPA_Countires_Lambda";
        let CountryEditAPIUrl ="https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CEJSONData = JSON.stringify(
            {
                QueryName: "CountriesEdit",
                CountryID: event
            });
        let AxiosHeaderConfig = {
            headers: {
                // accept: 'application/json',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
                'Content-Type': 'application/json',
                //"Access-Control-Allow-Origin": "*",
            }
        };
        axios({
            method: "POST",
            url: CountryEditAPIUrl,
            data: CEJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            for (var i = 0; i < data.length; i++) {
                thisObj.setState({ CountryCodeState: data[i].CountryCode });
                thisObj.setState({ CountryNameState: data[i].CountryName });
                thisObj.setState({ UnderGPAState: data[i].UnderGPA });
                thisObj.setState({ ForecastLetterState: data[i].ForecastLetter });
                thisObj.setState({ CountryPensionFormState: data[i].CountryPensionForm });
                thisObj.setState({ CountryBilateralFormState: data[i].CountryBilateralForm });
                thisObj.setState({ LumpSumOptionState: data[i].LumpSumOption });
                thisObj.setState({ VolContributionOptionState: data[i].VolContributionOption });
                thisObj.setState({ BuyUpOptionState: data[i].BuyUpOption });
                thisObj.setState({ CountryFlagState: data[i].CountryFlag });
                thisObj.setState({ BeginningAgeState : data[i].BeginAge});
                thisObj.setState({ EndAgeState : data[i].EndAge});
                thisObj.setState({ US_BFState : data[i].USBF});
                thisObj.setState({ IsActiveState: data[i].IsActive });
                thisObj.setState({ Fileinput: false });
                let url = data[i].CountryFlag;
                let base64Img = require('base64-img');
                base64Img.requestBase64(url, function (err, res, body) {
                    let imgbase64 = body.split(',');
                    editedImgUrl = imgbase64[1];
                });

            }
        }).catch((err) => {
            console.log(err)
        })
    }
    handleCountryDelete(event) {
        var thisObj = this;
        //let CountryDeleteAPIUrl = "https://6vj52ppj8d.execute-api.us-west-2.amazonaws.com/Dev/GPA_Countires_Lambda";
        let CountryDeleteAPIUrl ="https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
        let CDJSONData = JSON.stringify(
            {
                QueryName: "CountriesDelete",
                CountryID: event
            });
        let AxiosHeaderConfig = {
            headers: {
                // accept: 'application/json',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
                'Content-Type': 'application/json',
                //"Access-Control-Allow-Origin": "*",
            }
        };
        axios({
            method: "POST",
            url: CountryDeleteAPIUrl,
            data: CDJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            notify.show("Record Deleted SuccessFully", "success", 3000);
            thisObj.handleReset(this);
        }).catch((err) => {
            console.log(err)
        })
    }

    handleNavDashboard() {
        history.push('/AdminDashboard');
    }
    handleImageChange = (event, index, Suffix) => {
        this.state.CountryFlagState = "";
        event.preventDefault();
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
                FileName: file.name,
                CountryFlagState: variable
            });
        }
        reader.readAsDataURL(file)
    };

    imageFormatter(cell, row) {
        return ("<img src='" + row.CountryFlag + "'/>")
    }

    render() {
        const { tableData } = this.state;
        const { CountryFlagState } = this.state;
        let imagePreview = "";
        if (CountryFlagState) {
            imagePreview = (<img src={this.state.CountryFlagState} />);
        } else {
            imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
            <div className="main-wrapper">
                <div className="HeaderTile">
                    <Flex className="show-grid" layout="row">
                        <Flex flex="none">
                            <div className="TitleIcon">
                                <h4><span className="TitleIconColor">{<General />}</span><span className="TitleTexColor">Country</span></h4>
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
                    <div>
                        <h2 className="legendtitle">Country Details</h2>
                        <div className="fieldstyle">
                            <Flex layout="row">
                                <Flex flex="70">
                                    <Row>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <TextField hintText="Enter Your Country Code"
                                                floatingLabelText={<span>Country Code<span className="manatoryfield">*</span></span>}
                                                value={this.state.CountryCodeState}
                                                onChange={this.handleChangeCountryCode.bind(this)}
                                                errorText={this.state.isValidCountryCode ? "Please Enter Your Country Code" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <TextField hintText="Enter Your Country Name"
                                                floatingLabelText={<span>Country Name<span className="manatoryfield">*</span></span>}
                                                value={this.state.CountryNameState}
                                                onChange={this.handleChangeCountryName.bind(this)}
                                                errorText={this.state.isValidCountryName ? "Please Enter Your Country Name" : ""}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <SelectField
                                                floatingLabelText={<span>Under GPA<span className="manatoryfield">*</span></span>}
                                                value={this.state.UnderGPAState}
                                                onChange={this.handleChangeUnderGPA.bind(this)}
                                            >
                                                <MenuItem value={"Y"} primaryText="Yes" />
                                                <MenuItem value={"N"} primaryText="No" />
                                            </SelectField>
                                        </Col>

                                        <Col xs={12} md={6} className="input-fileds">
                                            <SelectField
                                                floatingLabelText={<span>Forecast Letter<span className="manatoryfield">*</span></span>}
                                                value={this.state.ForecastLetterState}
                                                onChange={this.handleChangeForecastLetter.bind(this)}
                                            >
                                                <MenuItem value={"Y"} primaryText="Yes" />
                                                <MenuItem value={"N"} primaryText="No" />
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <SelectField
                                                floatingLabelText={<span>Pension Form<span className="manatoryfield">*</span></span>}
                                                value={this.state.CountryPensionFormState}
                                                onChange={this.handleChangeCountryPensionForm.bind(this)}
                                            >
                                                <MenuItem value={"Y"} primaryText="Yes" />
                                                <MenuItem value={"N"} primaryText="No" />
                                            </SelectField>
                                        </Col>
                                        <Col xs={12} md={6} className="input-fileds">
                                            <SelectField
                                                floatingLabelText={<span>Bilateral Form<span className="manatoryfield">*</span></span>}
                                                value={this.state.CountryBilateralFormState}
                                                onChange={this.handleChangeCountryBilateralForm.bind(this)}
                                            >
                                                <MenuItem value={"Y"} primaryText="Yes" />
                                                <MenuItem value={"N"} primaryText="No" />
                                            </SelectField>
                                        </Col>
                                    </Row>
                                </Flex>

                                <Flex flex="30">
                                    <Row>
                                        <Col xs={12} md={12} className="FileUploadSection">
                                            <label>Country Flag</label>
                                            <br />
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
                                    </Row>
                                </Flex>
                            </Flex>

                            <Row>
                                <Col xs={12} md={3} className="input-fileds">
                                    <SelectField
                                        floatingLabelText={<span>Lump Sum Option<span className="manatoryfield">*</span></span>}
                                        value={this.state.LumpSumOptionState}
                                        onChange={this.handleChangeLumpSumOption.bind(this)}
                                    >
                                        <MenuItem value={"Y"} primaryText="Yes" />
                                        <MenuItem value={"N"} primaryText="No" />
                                    </SelectField>
                                </Col>
                                <Col xs={12} md={3} className="input-fileds">
                                    <SelectField
                                        floatingLabelText={<span>Voluntary Contribution Option<span className="manatoryfield">*</span></span>}
                                        value={this.state.VolContributionOptionState}
                                        onChange={this.handleChangeVolContributionOption.bind(this)}
                                    >
                                        <MenuItem value={"Y"} primaryText="Yes" />
                                        <MenuItem value={"N"} primaryText="No" />
                                    </SelectField>
                                </Col>
                                <Col xs={12} md={3} className="input-fileds">
                                    <SelectField
                                        floatingLabelText={<span>BuyUp Option<span className="manatoryfield">*</span></span>}
                                        value={this.state.BuyUpOptionState}
                                        onChange={this.handleChangeBuyUpOption.bind(this)}
                                    >
                                        <MenuItem value={"Y"} primaryText="Yes" />
                                        <MenuItem value={"N"} primaryText="No" />
                                    </SelectField>
                                </Col>
                                <Col xs={12} md={3} className="input-fileds">
                                    <SelectField
                                        floatingLabelText={<span>Is Active<span className="manatoryfield">*</span></span>}
                                        value={this.state.IsActiveState}
                                        onChange={this.handleChangeIsActive.bind(this)}
                                    >
                                        <MenuItem value={"Y"} primaryText="Yes" />
                                        <MenuItem value={"N"} primaryText="No" />
                                    </SelectField>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={4} className="input-fileds">
                                    <TextField hintText="Enter Your Beginning Age"
                                        floatingLabelText={<span>Beginning Age<span className="manatoryfield">*</span></span>}
                                        value={this.state.BeginningAgeState}
                                        onChange={this.handleChangeBeginningAge.bind(this)}
                                        errorText={this.state.isValidBeginningAge ? "Please Enter Your Beginning Age" : ""}
                                    />
                                </Col>
                                <Col xs={12} md={4} className="input-fileds">
                                    <TextField hintText="Enter Your End Age"
                                        floatingLabelText={<span>End Age<span className="manatoryfield">*</span></span>}
                                        value={this.state.EndAgeState}
                                        onChange={this.handleChangeEndAge.bind(this)}
                                        errorText={this.state.isValidEndAge ? "Please Enter Your Beginning Age" : ""}
                                    />
                                </Col>
                                <Col xs={12} md={4} className="input-fileds">
                                    <SelectField
                                        floatingLabelText={<span>US Bilateral Form<span className="manatoryfield">*</span></span>}
                                        value={this.state.US_BFState}
                                        onChange={this.handleChangeUs_BF.bind(this)}
                                    >
                                        <MenuItem value={"Y"} primaryText="Yes" />
                                        <MenuItem value={"N"} primaryText="No" />
                                    </SelectField>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12} md={12} className="RegButton" style={styles}>

                                    <Button onClick={this.handleReset.bind(this)} className="ResetButton" >Reset</Button>


                                    <Button type="submit" onClick={this.handleCountrySave.bind(this)} className="RegButton2">{this.state.BtnName}</Button>
                                    <Notifications />

                                </Col>
                            </Row>
                        </div>

                    </div>





                </Paper>

                <Paper zDepth={1} className="AdminDashboardDiv">
                    <h2 className="legendtitle">Country List</h2>
                    <div className="fieldstyle">

                        <Row className="show-grid" className="AdminDashboardTableDivPar">

                            <Col xs={12} md={12} className="noPadding">
                                <BootstrapTable className="imgLogoresize"
                                    containerStyle={{ width: '100%' }}
                                    hover={true}
                                    search={true}
                                    searchPlaceholder={'search input'}
                                    keyField='CountryID'
                                    data={tableData}
                                    striped hover
                                    pagination={true}
                                    options={table2Options}
                                    condensed
                                >
                                    <TableHeaderColumn width={"8%"} dataField="CountryID">Country ID</TableHeaderColumn>
                                    <TableHeaderColumn width={"7%"} dataField="CountryCode">Country Code</TableHeaderColumn>
                                    <TableHeaderColumn width={"11%"} dataField="CountryName">Country Name</TableHeaderColumn>
                                    <TableHeaderColumn width={"10%"} dataField="CountryFlag" dataFormat={this.imageFormatter.bind(this)}>Country Flag</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField="UnderGPA">Under GPA</TableHeaderColumn>
                                    <TableHeaderColumn width={"9%"} dataField="ForecastLetter">Forecast Letter</TableHeaderColumn>
                                    <TableHeaderColumn width={"9%"} dataField="CountryPensionForm">Pension Form</TableHeaderColumn>
                                    <TableHeaderColumn width={"9%"} dataField="CountryBilateralForm">Bilateral Form</TableHeaderColumn>
                                    <TableHeaderColumn width={"9%"} dataField="LumpSumOption">LumpSum Option</TableHeaderColumn>
                                    <TableHeaderColumn width={"11%"} dataField="VolContributionOption">Voluntary Contribution Option</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField="BuyUpOption">BuyUp Option</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField="BeginAge">Beignning Age</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField="EndAge">End Age</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField="USBF">US Bilateral Form</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField="IsActive">Active</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField='button' dataFormat={this.cellButton.bind(this)}>Edit</TableHeaderColumn>
                                    <TableHeaderColumn width={"6%"} dataField='button' dataFormat={this.deleteButton.bind(this)}>Delete</TableHeaderColumn>
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
            BtnName: "Save",
            CountryCodeState: '',
            CountryNameState: '',
            UnderGPAState: 'N',
            ForecastLetterState: 'N',
            CountryPensionFormState: 'N',
            CountryBilateralFormState: 'N',
            LumpSumOptionState: 'N',
            VolContributionOptionState: 'N',
            BuyUpOptionState: 'N',
            FileName: "",
            CountryFlagState: NoCmpLogo,
            BeginningAgeState:'',
            EndAgeState:"",
            US_BFState:"N",
            IsActiveState: 'Y',
            tableData: [],
            isvalidCountryCode: false,
            isValidCountryName: false,
            isValidUnderGPA: false,
            isValidForecastLetter: false,
            isValidCountryPensionForm: false,
            isValidCountryBilateralForm: false,
            isValidLumpSumOption: false,
            isValidVolContributionOption: false,
            isValidBuyUpOption: false,
            isValidIsActive: false,
            isValidFormatCountryCode: false,
            isValidFormatCountryName: false,
            isValidFormatIsActive: false,
            Fileinput: true,
        });
        this.handleCountryRead(this);
    }
}
export default Country;