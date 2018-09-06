import React from 'react';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/Menu';
import CompanyLogo from '../img/logo.png';
import Userpic from '../img/Profile_Img.png';
import CompanyWhiteLogo from '../img/logo_white.png';
import MenuIcon from '../img/menu_icons.png';
import IconMenu from 'material-ui/IconMenu';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

// Modal Popup.
import { Col, Row, Button, Modal, Form, FormGroup, ControlLabel, FormControl, Checkbox } from 'react-bootstrap';

// import GoogleTranslate from '../Components/GoogleTranslate';

import { Flex } from 'react-flex-material';

// axios call 

import axios from 'axios';

//Routing
import history from '../Routing/history';

import RemoveRedEye from 'material-ui/svg-icons/action/dashboard';
import PersonAdd from 'material-ui/svg-icons/social/people';
import ContentLink from 'material-ui/svg-icons/action/question-answer';
import ContentCopy from 'material-ui/svg-icons/action/description';
import Download from 'material-ui/svg-icons/action/settings-phone';
import Delete from 'material-ui/svg-icons/action/settings';
import PowerSetting from 'material-ui/svg-icons/action/power-settings-new';
import ListItem from 'material-ui/List/ListItem';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//batch
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { white } from 'material-ui/styles/colors';
import Upload from 'material-ui/svg-icons/file/file-upload';

const iconStyles = {
    marginRight: 24,
};

const textStyle = {
    color: white,
}

var nameresult;
var emailresult;
var NotificationDataList;

class MenuAlumno extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            imagePreviewUrl: Userpic,
            file: "",
            FileName: "",
            imageStateCall: false,
            notification_id: "",
            notification_msg: "",
            notification_longmsg: "",
            NotificationCount: "",
            show: false,
            voluntary_notificationstate: "",
            PrivateNotificationState: "",
        };
        this.handleLoadProfileImage(this);
        this.showNotification(this);
        // Popup Script       
        this.handleClose = this.handleClose.bind(this);
    }
    // update notification. 
    handleUpdateNotification = (passdata) => {
        this.setState({
            notification_id: passdata.Notification_ID,
            notification_msg: passdata.Notification_Msg,
            notification_longmsg: passdata.Notification_LongMsg,
            voluntary_notificationstate: passdata.Voluntary_Notification,
            PrivateNotificationState: passdata.Private_Notification,
        });
        let updateNotificationApi = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let NotificationJSONData = JSON.stringify({
            QueryName: "UpdateNotification",
            Notification_ID: passdata.Notification_ID,
        });
        axios({
            method: "POST",
            url: updateNotificationApi,
            data: NotificationJSONData,
            //headers:AxiosHeaderConfig,
        }).then((data) => {
            this.showNotification(this);
        }).catch((err) => {
        })
    }


    handleUpdateNotification = (passdata) => {
        this.setState({
            notification_id: passdata.Notification_ID,
            notification_msg: passdata.Notification_Msg,
            notification_longmsg: passdata.Notification_LongMsg,
            voluntary_notificationstate: passdata.Voluntary_Notification,
            PrivateNotificationState: passdata.Private_Notification,
        });
        let updateNotificationApi = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let NotificationJSONData = JSON.stringify({
            QueryName: "UpdateNotification",
            Notification_ID: passdata.Notification_ID,
        });
        axios({
            method: "POST",
            url: updateNotificationApi,
            data: NotificationJSONData,
            //headers:AxiosHeaderConfig,
        }).then((data) => {
            this.showNotification(this);
        }).catch((err) => {
        })
    }

    handleClose() {
        this.setState({ show: false });
    }
    componentDidMount() {
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '/language.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = this.googleTranslateElementInit;
        this.handleLoadProfileImage(this);
        this.showNotification(this);

    }
    showNotification(e) {
        emailresult = localStorage.getItem('applicant_email');
        var thisObj = this;
        let NotificationApi = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let NotificationJSONData = JSON.stringify({
            QueryName: "NotificationInfo",
            UserID: emailresult
        });
        axios({
            method: "POST",
            url: NotificationApi,
            data: NotificationJSONData,
            //headers:AxiosHeaderConfig,

        }).then((data) => {
            NotificationDataList = data.data.map((notifidata) => <li key={notifidata.Notification_ID} onClick={() => this.setState({ show: true }, () => { thisObj.handleUpdateNotification(notifidata) })}>{notifidata.Notification_Msg}</li>);
            this.setState({ NotificationCount: data.data.length });
        }).catch((err) => {
        })
    }
    UploadProfileImage() {
        if (this.state.imageStateCall == true) {
            // Profile Image Upload API 
            let EmpProfileAPIUrl = "https://48q6lrdip0.execute-api.us-west-2.amazonaws.com/Dev/GPA_EmployeeDatas_Lambda";
            let EmpProfileJSONData = JSON.stringify({
                QueryName: "Upload",
                EmailState: emailresult,
                FileName: this.state.FileName,
                EmployeeImg: this.state.imagePreviewUrl[1]
            });
            // let AxiosHeaderConfig = {
            //     headers: {
            //         "Content-Type": "application/json",
            //         "Access-Control-Request-Headers": "*",
            //         "Access-Control-Request-Method": "*",
            //     }
            // };
            axios({
                method: "POST",
                url: EmpProfileAPIUrl,
                data: EmpProfileJSONData,
                //headers:AxiosHeaderConfig,

            }).then((data) => {
                // thisObj.handleAppProcessFlowUpdate(this);
            }).catch((err) => {
            })
        }
    }

    handleLoadProfileImage(e) {
        nameresult = localStorage.getItem('applicant_name');
        emailresult = localStorage.getItem('applicant_email');
        let LoadProfileImageAPIUrl = "https://48q6lrdip0.execute-api.us-west-2.amazonaws.com/Dev/GPA_EmployeeDatas_Lambda";
        let JSONData = JSON.stringify(
            {
                QueryName: "ReadLogo",
                EmailState: emailresult
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
            url: LoadProfileImageAPIUrl,
            headers: AxiosHeaderConfig,
        }).then(({ data }) => {
            var thisObj = this;
            data.map((item, key) => {

                thisObj.setState({ imagePreviewUrl: item.EmployeeImg });
                thisObj.setState({ imageStateCall: true })
            })
        }).catch((err) => {

        })
    }

    handleClick(e) {
        this.refs.fileUploader.click();
    }
    handleImageChange(e) {
        var file = e.target.files[0];

        let reader = new FileReader();
        reader.onloadend = () => {
            let read = reader.result;
            let fileinputdata = read.split(',');
            //let Extension = file.name.match(/\.[0-9a-z]+$/i);               
            this.setState({
                file: file,
                FileName: file.name,
                imagePreviewUrl: fileinputdata,
                // FileExtension: file.name.split('.').pop(),
                imageStateCall: true,


            });
            this.UploadProfileImage();
        }

        reader.readAsDataURL(file);
    }
    handleToggle = () => this.setState({ open: !this.state.open });

    /*Google Translater*/
    googleTranslateElementInit() {
        new window.google.translate.TranslateElement({
            // here is where you change the language
            pageLanguage: '', includedLanguages: 'de,en,es,fr,it,ja,ko,nl,no,pt,zh-CN', defaultLanguage: 'en', multilanguagePage: true
        }, 'google_translate_element_dashboardmenu');
    }

    //   componentDidMount() { 
    //     var addScript = document.createElement('script');
    //     addScript.setAttribute('src', '/language.js?cb=googleTranslateElementInit');
    //     document.body.appendChild(addScript);  
    //     window.googleTranslateElementInit = this.googleTranslateElementInit;
    //   }

    render() {

        return (
            <div>

                <Flex layout="row" className="topheader">
                    <Flex flex="none" hide-gt-xs="true" show-xs="true" layout align="center center" >
                        <img src={MenuIcon} alt="Menu" width="40" height="40" onClick={this.handleToggle} className="IconButton" />
                    </Flex>
                    <Flex flex="none">
                        <img src={CompanyLogo} alt="Company Logo" width="130" height="57" className="CompanyIcons" />
                    </Flex>

                    <Flex flex layout align="end center" className="TopHeaderRight">
                        <Flex flex="none">
                            <div id="google_translate_element_dashboardmenu"></div>
                            {/* <GoogleTranslate />  */}
                        </Flex>
                        <Flex flex="none">
                            {/* <Badge
                                className="Badge"
                                badgeContent={4}
                                secondary={true} >
                                <NotificationsIcon />
                            </Badge> */}
                            <IconMenu className="UsersettingsIcons"
                                iconButtonElement={
                                    <Badge
                                        className="Badge"
                                        badgeContent={this.state.NotificationCount}
                                        secondary={true} >
                                        <NotificationsIcon />
                                    </Badge>
                                }>
                                <ul className="NotificationList">
                                    {/* <li>Sample NotificationList</li>
                                    <li>Sample NotificationList</li>
                                    <li>Sample NotificationList</li> */}
                                    {NotificationDataList}
                                </ul>
                            </IconMenu>

                        </Flex>
                        <Flex flex="none" id="UserSettings">
                            <ListItem
                                className="userprof"
                                disabled={true}
                                leftAvatar={
                                    <Avatar src={(this.state.imageStateCall != false) ? this.state.imagePreviewUrl : Userpic} onClick={this.handleClick.bind(this)} />
                                } >
                                <span className="UserProfilename">{nameresult}</span><br />
                                <input type="file" id="file" ref="fileUploader" style={{ display: "none" }} onChange={this.handleImageChange.bind(this)} />
                                <div className="usermail">{emailresult}</div>
                            </ListItem>
                        </Flex>
                        <Flex flex="none" >
                            <IconMenu className="UsersettingsIcons"
                                iconButtonElement={
                                    <IconButton touch={true}>
                                        <NavigationExpandMoreIcon />
                                    </IconButton>
                                }>
                                <Link to={'/UserSetting'} style={{ textDecoration: 'none' }}> <MenuItem primaryText="Settings" leftIcon={<Delete />} /></Link>
                                {/* <MenuItem primaryText="Profile" leftIcon={<PersonAdd />}/> */}
                                <a href='/Login' className="remove-underline"> <MenuItem primaryText="Logout" leftIcon={<PowerSetting />} /></a>
                            </IconMenu>
                        </Flex>
                    </Flex>

                </Flex>
                {/* </Grid> */}

                <Drawer className="DrawerStyle"
                    docked={false}
                    width={250}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <AppBar className="Menu_AppBar" showMenuIconButton={false}>
                        <img src={CompanyWhiteLogo} alt="Company Logo" width="130" height="57" />
                    </AppBar>
                    <Menu>
                        <Link to={'/ApplicantDashboard'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Dashboard" leftIcon={<RemoveRedEye />} /></Link>
                        <Link to={'/Aboutus'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="About us" leftIcon={<PersonAdd />} /></Link>
                        <Link to={'/FAQ'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="FAQ" leftIcon={<ContentLink />} /></Link>
                        <Link to={'/TC'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Terms & Condtions" leftIcon={<ContentCopy />} /></Link>
                        {/* <Link to={'/CustomerSupport'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Customer Support" leftIcon={<Download />} /></Link> */}
                        <Link to={'/ContactUS'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Customer Support" leftIcon={<Download />} /></Link>
                        <Link to={'/DocumentUpload'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Document Upload" leftIcon={<Upload />} /> </Link>
                        <Link to={'/UserSetting'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="User Settings" leftIcon={<Delete />} /></Link>
                        <a href='/Login'> <MenuItem primaryText="Logout" leftIcon={<PowerSetting />} /></a>
                    </Menu>
                </Drawer>
                {/* Modal POPUP Content  */}
                {this.state.voluntary_notificationstate == 1 ?

                    <Modal show={this.state.show} onHide={this.handleClose}>

                        <Modal.Header closeButton>
                            <Modal.Title>Notification</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <h4>{this.state.notification_longmsg} <a onClick={() => this.setState({ show: false }, () => history.push('/VoluntaryContribution'))}>Please Click here..</a></h4>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    :
                    <Modal show={this.state.show} onHide={this.handleClose}>

                        <Modal.Header closeButton>
                            <Modal.Title>Notification</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <h4>{this.state.notification_msg}</h4>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                }
                {/* Private MODAL POPUP Content  */}
                {this.state.PrivateNotificationState == 1 ?

                    <Modal show={this.state.show} onHide={this.handleClose}>

                        <Modal.Header closeButton>
                            <Modal.Title>Notification</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <h4>{this.state.notification_longmsg} <a onClick={() => this.setState({ show: false }, () => history.push('/PrivatePensionQuestionnaire'))}>Please Click here..</a></h4>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    :
                    ''
                }

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

export default connect(mapReducerStateToProps, mapDispatchToProps)(MenuAlumno);