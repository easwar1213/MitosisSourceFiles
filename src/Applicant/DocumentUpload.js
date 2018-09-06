import React, { Component } from 'react';

//CSS
import '../Style/style.css';

//Bootstrap Component
import { Col, Row, Button } from 'react-bootstrap';

//Material UI Component
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import Paper from 'material-ui/Paper';

//Boostrap Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

//API Calling Method
import axios from 'axios';

//Flex
import { Flex } from 'react-flex-material';

//Image
import NoCmpLogo from '../img/No_Image.png';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Routing
import history from '../Routing/history';

//Notification 
import Notifications, { notify } from 'react-notify-toast';

const table2Options = {
    sizePerPage: 5,
};

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

var emailresult;

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

const DocumentTypeItems = [];

const DocumentItems = [];

var DocDupCheckFlag = true;

class DocumentUpload extends Component {
    constructor(props) {
        super(props);
        //Field State Values Initialization
        this.state = {
            BtnName: "Save",
            DocumentTypeState: "",
            FileName: "",
            DocumentUploadState: "",
            DocumentState: "",
            UploadFile: "",
            tableData: [],
            IsValidDocumentType: false,
            IsValidDocument: false,
            isValidFormatCountryCode: false,
            isValidFormatCountryName: false,
            isValidFormatIsActive: false,
            Fileinput: true,
        }
    }
    //Handle Event
    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        this.handleAppDocumentUploadRead(this);
        this.handleLoadDocumentTypes(this);
    }

    //Load Document Type List Function
    handleLoadDocumentTypes(event) {
        //let LoadCountryAPIUrl = "https://nrgegkfro9.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentsUpload_lambda";
        let LoadCountryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let JSONData = JSON.stringify(
            {
               // QueryName: "LoadDocumentType"
               QueryName:"DocumentTypesLoadDocumentType"
            }
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
            DocumentTypeItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                DocumentTypeItems.push(<MenuItem value={data[i].DocumentTypeID} key={i} primaryText={data[i].DocumentType} />);
            }

        }).catch((err) => {

        })
    }

    //Load Document Name List Function
    handleLoadDocuments(event) {
        //let LoadCountryAPIUrl = "https://nrgegkfro9.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentsUpload_lambda";
        let LoadCountryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let JSONData = JSON.stringify(
            {
               // QueryName: "LoadDocuments",
               QueryName:"DocumentsLoadDocuments",
                DocumentTypeID: this.state.DocumentTypeState
            }
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
            DocumentItems.length = 0;
            for (let i = 0; i < data.length; i++) {
                DocumentItems.push(<MenuItem value={data[i].DocumentID} key={i} primaryText={data[i].DocumentName} />);
            }

        }).catch((err) => {

        })
    }

    handleChangeCountryCode(e) {
        this.setState({ CountryCodeState: e.target.value });
    };

    handleChangeCountryName(e) {
        this.setState({ CountryNameState: e.target.value });
    };

    handleChangeDocumentType(e, index, value) {
        this.setState({ DocumentTypeState: value }, () => { this.handleLoadDocuments(this) });
    };

    handleChangeDocument(e, index, value) {
        this.setState({ DocumentState: value });
    };

    deleteButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="danger" onClick={() => this.handleCountryDelete(row.AppDocumentID, row.FileName)} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></Button>
            </div>
        )
    }

    //Validation Function
    handleValidateForm(e) {
        const { validationError } = this.state;
        let validForm = false;
        var validDocumentTypeForm = false;
        var validDocumentForm = false;
        var validFileForm = false;

        if (this.state.DocumentTypeState != "") {
            this.setState({ IsValidDocumentType: false });
            validDocumentTypeForm = true;
        }
        else {
            this.setState({ IsValidDocumentType: true });
            validDocumentTypeForm = false;
        }
        if (this.state.DocumentState != "") {
            this.setState({ IsValidDocument: false });
            validDocumentForm = true;
        }
        else {
            this.setState({ IsValidDocument: true });
            validDocumentForm = false;
        }
        if (this.state.Fileinput != true && this.state.FileName != "") {
            this.setState({ isValidFile: false })
            validFileForm = true
        }
        else {
            this.setState({ isValidFile: true });
            validFileForm = false;
        }
        if (validDocumentTypeForm && validDocumentForm && validFileForm) {
            validForm = true;
        }
        else {
            validForm = false;
        }
        return validForm;
    }

    //Save Function
    handleCountrySave(e) {
        var QName = this.state.BtnName;
        var RDate = new Date();
        var thisObj = this;
        var isValid = this.handleValidateForm(this);
        if (isValid) {
            let CountrySaveAPIurl = "https://nrgegkfro9.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentsUpload_lambda";

            let CountrySaveJSONData = JSON.stringify({
                QueryName: QName,
                UserID: emailresult,
                DocumentID: this.state.DocumentState,
                CountryCode: "JP",
                FileName: this.state.FileName,
                DocumentUploadFile: this.state.DocumentUploadState,
                ReceivedDate: RDate
            });
            let AxiosHeaderConfig = {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
            axios({
                method: "POST",
                url: CountrySaveAPIurl,
                data: CountrySaveJSONData,
                headers: AxiosHeaderConfig,

            }).then(({ data }) => {
                notify.show("Saved Successfully", "success", 3000);
                thisObj.handleReset(thisObj);
            }).catch((err) => {
                //thisObj.setState({ InvnLinkMsg: false });
            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }

    //Read data Function
    handleAppDocumentUploadRead(e) {
        var thisObj = this;
        //let CountryAPIUrl = "https://nrgegkfro9.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentsUpload_lambda";
        let CountryAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let CJSONData = JSON.stringify(
            {
                QueryName:"ApplicantUploadDocumentsRead",
                //QueryName: "Read",
                UserID: emailresult
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

        }).then((data) => {
            thisObj.setState({ tableData: data.data });
        }).catch((err) => {

        })
    }

    //Duplicate Check Function
    handleAppDocumentDupCheck(e) {
        var thisObj = this;
        var isValid = this.handleValidateForm(this);
        if (isValid) {
            let CountryAPIUrl = "https://nrgegkfro9.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentsUpload_lambda";
            let CJSONData = JSON.stringify(
                {
                    QueryName: "Read",
                    UserID: emailresult
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

            }).then(({ data }) => {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].FileName == this.state.FileName) {
                            DocDupCheckFlag = true;
                            break;
                        }
                        else {
                            DocDupCheckFlag = false;
                        }
                    }
                }
                else {
                    DocDupCheckFlag = false;
                }
                if (DocDupCheckFlag == false) {
                    this.handleCountrySave(this);
                }
                else {
                    notify.show("This File Already Uploaded", "warning", 3000);
                }
            }).catch((err) => {

            })
        }
        else {
            notify.show("Please Fill Mandatory Fields", "error", 3000);
        }
    }

    handleCountryDelete(AppDocumentID, FileName) {
        var thisObj = this;
        //let DocDeleteStatusAPIUrl = "https://nrgegkfro9.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentsUpload_lambda";
        let DocDeleteStatusAPIUrl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let DocDeleteJSONData = JSON.stringify(
            {
               // QueryName: "DeleteDocumentStatus",
                QueryName: "ApplicantUploadDocumentsDeleteDocumentStatus",
                AppDocumentID: AppDocumentID
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
            url: DocDeleteStatusAPIUrl,
            data: DocDeleteJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            data.map((item, key) => {
                if (item.IsApproved == "N") {
                    let CountryDeleteAPIUrl = "https://nrgegkfro9.execute-api.us-west-2.amazonaws.com/Dev/GPA_ApplicantDocumentsUpload_lambda";
                    let CDJSONData = JSON.stringify(
                        {
                            QueryName: "Delete",
                            AppDocumentID: AppDocumentID,
                            UserID: emailresult,
                            FileName: FileName
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
                        url: CountryDeleteAPIUrl,
                        data: CDJSONData
                        //headers:AxiosHeaderConfig

                    }).then(({ data }) => {
                        notify.show("Record Deleted SuccessFully", "success", 3000);
                        thisObj.handleReset(thisObj);
                    }).catch((err) => {
                    })
                }
                else {
                    notify.show("Record Is In Approved Status.You Cannot Delete this file", "warning", 3000);
                }
            });
        }).catch((err) => {
        })
    }

    //Redirect to Dashboard
    handleNavDashboard() {
        history.push('/AdminDashboard');
    }

    //File Reader
    handleDocumentUploadChange = (event, index, Suffix) => {
        let varFileReader = new FileReader();
        let UploadFile = event.target.files[0];
        if (UploadFile.size <= 7340032) {
            varFileReader.onloadend = () => {
                let varReadFile = varFileReader.result;
                let SplittedFile = varReadFile.split(',');
                this.setState({
                    UploadFile: UploadFile,
                    FileName: UploadFile.name,
                    DocumentUploadState: SplittedFile[1],
                    isvalidFile: false,
                    Fileinput: false
                });
            }
            varFileReader.readAsDataURL(UploadFile)
        }
        else {
            notify.show("Please Upload a file Less than 7 MB", "warning", 3000)
        }
    };

    //Page Rendering
    render() {
        const { tableData } = this.state;
        const { DocumentUploadState } = this.state;
        return (
            <div className="main-wrapper">
                <Paper zDepth={1} className="AdminDashboardDiv">
                    <div>
                        <h2 className="legendtitle">Document Upload</h2>
                        <div className="fieldstyle">
                            <Flex layout="row">
                                <Flex flex="100">
                                    <Row>
                                        <Col xs={12} md={12}>
                                            <Col xs={12} md={4} className="input-fileds">
                                                <SelectField
                                                    floatingLabelText={<span>Document Type<span className="manatoryfield">*</span></span>}
                                                    value={this.state.DocumentTypeState}
                                                    onChange={this.handleChangeDocumentType.bind(this)}
                                                    errorText={this.state.IsValidDocumentType ? "Please Select Your Document Type" : null}
                                                >
                                                    {DocumentTypeItems}
                                                </SelectField>
                                            </Col>
                                            <Col xs={12} md={4} className="input-fileds">
                                                <SelectField
                                                    floatingLabelText={<span>Document Name<span className="manatoryfield">*</span></span>}
                                                    value={this.state.DocumentState}
                                                    onChange={this.handleChangeDocument.bind(this)}
                                                    errorText={this.state.IsValidDocument ? "Please Select Your Document" : null}
                                                >
                                                    {DocumentItems}
                                                </SelectField>
                                            </Col>
                                            <Col xs={12} md={2} className="FileUploadSection">
                                                <RaisedButton
                                                    label="Choose an Document"
                                                    labelPosition="before"
                                                    style={style}
                                                    containerElement="label"
                                                >
                                                    <input type="file" onChange={this.handleDocumentUploadChange} style={style.exampleImageInput} ref={ref => this.fileInput = ref} />
                                                </RaisedButton><br />
                                                {this.state.FileName}
                                                {<span className="validationmsg">{this.state.isValidFile ? "Please Choose Your Document File" : null}</span>}
                                            </Col>
                                            <Col xs={12} md={2} className="RegButton" style={styles}>
                                                <Col md={6} xs={6}>
                                                    <Button type="submit" onClick={this.handleAppDocumentDupCheck.bind(this)} className="RegButton2">{this.state.BtnName}</Button>
                                                    <Notifications />
                                                </Col>
                                            </Col>
                                        </Col>
                                    </Row>
                                </Flex>
                            </Flex>
                        </div>
                    </div>
                </Paper>
                <Paper zDepth={1} className="AdminDashboardDiv">
                    <h2 className="legendtitle">Uploaded Document List</h2>
                    <div className="fieldstyle">
                        <Row className="show-grid" className="AdminDashboardTableDivParDiv">
                            <Col xs={12} md={12} className="noPadding">
                                <BootstrapTable className="imgLogoresize"
                                    containerStyle={{ width: '100%' }}
                                    hover={true}
                                    search={true}
                                    searchPlaceholder={'search input'}
                                    keyField='AppDocumentID'
                                    data={tableData}
                                    striped hover
                                    pagination={true}
                                    options={table2Options}
                                    condensed
                                >
                                    <TableHeaderColumn width={"10%"} dataField="DocumentName">Document Name</TableHeaderColumn>
                                    <TableHeaderColumn width={"10%"} dataField="CountryName">Country Name </TableHeaderColumn>
                                    <TableHeaderColumn width={"10%"} dataField="FileName">File Name</TableHeaderColumn>
                                    <TableHeaderColumn width={"15%"} dataField="DocumentType">Document Type</TableHeaderColumn>
                                    <TableHeaderColumn width={"5%"} dataField='button' dataFormat={this.deleteButton.bind(this)}>Delete</TableHeaderColumn>
                                </BootstrapTable>
                            </Col>
                        </Row>
                    </div >
                </Paper>
            </div>
        );
    }

    //Reset Function
    handleReset(e) {
        this.fileInput.value = "";
        this.handleAppDocumentUploadRead(this);
        this.setState({
            BtnName: "Save",
            DocumentTypeState: "",
            FileName: "",
            UploadFile: "",
            DocumentUploadState: "",
            DocumentState: "",
            tableData: [],
            IsValidDocumentType: false,
            IsValidDocument: false,
            isValidFormatCountryCode: false,
            isValidFormatCountryName: false,
            isValidFormatIsActive: false,
            Fileinput: true,
        });

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

export default connect(mapReducerStateToProps, mapDispatchToProps)(DocumentUpload);
