import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Row, Col, Button } from 'react-bootstrap';
import Paper from 'material-ui/Paper/Paper';
import SvgIcon from 'material-ui/SvgIcon';

import ContentCopy from 'material-ui/svg-icons/action/settings-brightness';

import ListIcon from 'material-ui/svg-icons/action/view-list';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';



import SweetAlert from 'sweetalert2-react';
import { Flex } from 'react-flex-material';
import NoCmpLogo from '../img/No_Image.png';
//Notification 
import Notifications, { notify } from 'react-notify-toast';
//Routing
import history from '../Routing/history';
import { BrowserRouter as Router} from 'react-router-dom';
import RichTextEditor from 'react-rte';


const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};
var ImgFlag = 1;
// var editedImgUrl = "";
// const style = {
//     button: {
//         margin: 12,
//         width: 190,
//     },
//     exampleImageInput: {
//         cursor: 'pointer',
//         position: 'absolute',
//         top: 0,
//         bottom: 0,
//         right: 0,
//         left: 0,
//         width: '100%',
//         opacity: 0,
//     },
// };
const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);

class AddPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BtnName: "Save",
            PageTitleState: "",
            PageLinkState: "",
            content: '',
            myTestContent: "",
            IsActive: "",
            value: RichTextEditor.createEmptyValue(),
            validationError: {},
        }
    }
    componentDidMount() {
        let { value } = this.state;
        this.handleEditPageData(this);
        //  this.setState({ value: RichTextEditor.createValueFromString("Content", 'html') });
    }
    handleChangePageTitle(e) {
        this.setState({ PageTitleState: e.target.value });
    };
    handleChangePageLink(e) {
        this.setState({ PageLinkState: e.target.value });
    };
    handleChangeIsActive(e, index, value) {
        this.setState({ IsActive: value });
    };
    handleNavPage() {
        history.push('/PageSetting');
    };

    // handleImageChange = (event, index, Suffix) => {
    //     this.state.imagePreviewUrl = "";
    //     event.preventDefault();
    //     //this.setState({ imagePreviewUrl : ""});
    //     let reader = new FileReader();
    //     let file = event.target.files[0];
    //     ImgFlag = 2;
    //     reader.onloadend = () => {
    //         let read = reader.result;
    //         let variable = read.split(',');
    //         this.setState({
    //             file: file,
    //             isvalidFile: false,
    //             Fileinput: false,
    //             fileimage: variable,
    //             filename: file.name,
    //             imagePreviewUrl: variable
    //         });
    //     }
    //     reader.readAsDataURL(file)
    // };

    handleSubmit(event) {
        event.preventDefault();
        var Params = new URLSearchParams(document.location.search);
        var AppID = Params.get("AppPageSetupID");
        var QName = (this.state.BtnName) == "Save"? "ApplicantPageSetupSave" : "ApplicantPageSetupUpdate";
        var thisObj = this;
        var isvalid = this.handleValidateForm(this);
        if (isvalid) {
            //let pageSetupAPIUrl = "https://xljvq5lh79.execute-api.us-west-2.amazonaws.com/dev/GPA_ApplicantPageSetup"
            let pageSetupAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda"
            let pageSetupJSONData = JSON.stringify({
                QueryName: QName,
                AppPageSetupID: AppID,
                PageTitle: this.state.PageTitleState,
                PageLink: this.state.PageLinkState,
                IsActive: this.state.IsActive,
                Content: this.state.value.toString('html'),
                // //PageIcon: this.state.imagePreviewUrl,
                // imagePreviewUrl: ImgFlag == 1 ? editedImgUrl : this.state.imagePreviewUrl[1],
            });
            let AxiosHeaderConfig = {
                "Content-Type": "text/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
            axios({
                method: "POST",
                url: pageSetupAPIUrl,
                data: pageSetupJSONData,
               // headers: AxiosHeaderConfig,

            }).then((data) => {
                if (QName == "Save") {
                    notify.show("Save Successfully", "success", 500);
                }
                else {
                    notify.show("Update Successfully", "success", 500);
                }
                thisObj.handleReset(this);
            }).catch((err) => {
                console.log(err);
                // thisObj.setState({ InvnLinkMsg: false });
            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }

    handleValidateForm(event) {
        const { validationError } = this.state;
        let validForm = false;
        var validTitleForm = false;
        var validLinkForm = false;
        var validActiveForm = false;
        var validFileForm = false;
        var validContentForm = false;

        if (this.state.PageTitleState != "") {
            this.setState({ isValidTitle: false });
            validTitleForm = true;
        }
        else {
            this.setState({ isValidTitle: true });
            validTitleForm = false;
        }
        if (this.state.PageLinkState != "") {
            this.setState({ isValidLink: false });
            validLinkForm = true;
        }
        else {
            this.setState({ isValidLink: true });
            validLinkForm = false;
        }
        if (this.state.IsActive != "") {
            this.setState({ isValidIsActive: false });
            validActiveForm = true;
        }
        else {
            this.setState({ isValidIsActive: true });
            validActiveForm = false;
        }
        // if (this.state.Fileinput != true) {
        //     this.setState({ isValidFile: false })
        //     validFileForm = true
        // }
        // else {
        //     this.setState({ isValidFile: true });
        //     validFileForm = false;
        // }
        if (this.state.value.toString('html') == "") {
            this.setState({ isValidContent: true });
            validContentForm = false;
        }
        else {
            this.setState({ isValidContent: false });
            validContentForm = true;
        }
        if (validTitleForm && validLinkForm && validActiveForm  && validContentForm) {
            validForm = true;
        } else {
            validForm = false;
        }
        return validForm;
    }
    handleEditPageData(event) {
        var Params = new URLSearchParams(document.location.search);
        var AppID = Params.get("AppPageSetupID");
        var thisObj = this;
        let AppPageID = AppID;

        if (AppPageID != "") {
            //let pageEditAPIUrl = "https://xljvq5lh79.execute-api.us-west-2.amazonaws.com/dev/GPA_ApplicantPageSetup";
            let pageEditAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
            var data = {
                QueryName: "ApplicantPageSetupEdit",
                AppPageSetupID: AppPageID,
            }
            let AxiosHeaderConfig = {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
            axios({
                method: "POST",
                url: pageEditAPIUrl,
                data: JSON.stringify(data),
               // headers: AxiosHeaderConfig,

            }).then(({ data }) => {
                for (var i = 0; i < data.length; i++) {
                    thisObj.setState({ BtnName: "Update" });
                    thisObj.setState({ myTestContent: "mmmm" }, function () {
                    });
                    thisObj.setState({ AppPageSetupID: data[i].AppPageSetupID });
                    thisObj.setState({ PageTitleState: data[i].PageTitle });
                    thisObj.setState({ PageLinkState: data[i].PageLink });
                    thisObj.setState({ IsActive: data[i].IsActive });
                    thisObj.setState({ imagePreviewUrl: data[i].PageIcon });
                    thisObj.setState({ Disabled: true });
                    thisObj.setState({ content: "OOOO" });
                    thisObj.setState({ value: RichTextEditor.createValueFromString(data[i].Content, 'html') });
                    // thisObj.setState({ Fileinput: false });
                    // let url = data[i].PageIcon;
                    // let base64Img = require('base64-img');
                    // base64Img.requestBase64(url, function (err, res, body) {
                    //     let imgbase64 = body.split(',');
                    //     //this.setState({ imagePreviewUrl: imgbase64[1] });
                    //     editedImgUrl = imgbase64[1];
                    // });
                }
            }).catch((err) => {
                
            });
        }
    }

    onChange = (value) => {
        this.setState({ value: value });
        if (this.props.onChange) {
            this.props.onChange(
                value.toString('html')
            );
        }
    }
    render() {
        // const { imagePreviewUrl } = this.state;
        // let imagePreview = "";
        // if (imagePreviewUrl) {
        //     imagePreview = (<img src={this.state.imagePreviewUrl} />);
        // } else {
        //     imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        // }
        return (
            <div>
                <div className="wrapper scrollable">
                    <div className="HeaderTile">
                        <Flex className="show-grid" layout="row" >
                            <Flex flex="none">
                                <div className="TitleIcon">
                                    <h4><span className="TitleIconColor">{<ContentCopy />}</span><span className="TitleTexColor">Add Page</span></h4>
                                </div>
                            </Flex>
                            <Flex flex layout align="end center">
                                <div>
                                    <h5><span className="BreadCrumbsClass"><ListIcon /></span>&nbsp;&nbsp;<b><span className="ActiveClass" onClick={this.handleNavPage.bind(this)}>Page Setting</span></b></h5>
                                </div>
                            </Flex>
                        </Flex>
                    </div>
                    <Paper zDepth={1} className="CommonDiv2">
                        <Row className="show-grid">
                            <fieldset className="fieldstyle">
                                <legend className="legendtitle">Add Page</legend>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={4} className="input-fileds">
                                        <TextField hintText="Enter Your Page Title"
                                            floatingLabelText={<span>Page Title<span className="manatoryfield">*</span></span>}
                                            value={this.state.PageTitleState}
                                            onChange={this.handleChangePageTitle.bind(this)}
                                            errorText={this.state.isValidTitle ? "Please Enter Your Title" : null}
                                        />
                                    </Col>
                                    <Col xs={12} md={4} className="input-fileds">
                                        <TextField hintText="Enter Your Page Link"
                                            floatingLabelText={<span>Page Link<span className="manatoryfield">*</span></span>}
                                            value={this.state.PageLinkState}
                                            onChange={this.handleChangePageLink.bind(this)}
                                            errorText={this.state.isValidLink ? "Please Enter Your Link" : null}
                                        />
                                    </Col>
                                    <Col xs={12} md={4} className="input-fileds">
                                        <SelectField
                                            floatingLabelText={<span>Is Active<span className="manatoryfield">*</span></span>}
                                            value={this.state.IsActive}
                                            onChange={this.handleChangeIsActive.bind(this)}
                                            errorText={this.state.isValidIsActive ? "Please Select your IsActive" : null}
                                        >
                                            <MenuItem value={"Y"} primaryText="Yes" />
                                            <MenuItem value={"N"} primaryText="No" />
                                        </SelectField>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12} >
                                    <Col xs={12} md={12}>
                                        <label>Context</label>
                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    <Col xs={12} md={12} >
                                        <RichTextEditor
                                            className="EditorAlign"
                                            value={this.state.value}
                                            onChange={this.onChange}
                                        />
                                        {<span className="validationmsg">{this.state.isValidContent ? "Please Enter Your Content" : null}</span>}

                                    </Col>
                                </Col>
                                <Col xs={12} md={12}>
                                    {/* <Col xs={12} md={5} className="FileUploadSection">
                                        <label>Page Icon</label>
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
                                    </Col> */}
                                    <Col xs={12} md={7} className="RegButton" style={styles}>
                                        {/* <div id="targetLayer" className="TargetLayerValue">{this.state.filename}</div> */}
                                        <Col md={6} xs={6}>
                                            <Button onClick={this.handleReset.bind(this)} className="ResetButton" >Reset</Button>
                                        </Col>
                                        <Col md={6} xs={6}>
                                            <Button type="submit" onClick={this.handleSubmit.bind(this)} className="RegButton2">{this.state.BtnName}</Button>
                                            <Notifications />
                                        </Col>
                                    </Col>
                                </Col>
                            </fieldset>
                        </Row>
                    </Paper>
                </div>
            </div>
        );
    }
    handleReset(e) {
        this.setState({
            PageTitleState: "",
            PageLinkState: "",
            IsActive: "",
            value: RichTextEditor.createEmptyValue(),
            imagePreviewUrl: "",
            isValidTitle: false,
            isValidLink: false,
            isValidFile: false,
            isValidIsActive: false,
            isValidContent: false,
        });
        this.handleNavPage();
    }
}
// AddPage.prototype={
// onChange: PropTypes.func
// }
export default AddPage;