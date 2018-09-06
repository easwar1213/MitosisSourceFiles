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
// import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

// import GoogleTranslate from '../Components/GoogleTranslate';

//API Calling Method
import axios from 'axios';
import ContentLink from 'material-ui/svg-icons/action/question-answer';
import ContentCopy from 'material-ui/svg-icons/action/description';
import Download from 'material-ui/svg-icons/action/settings-phone';
import Delete from 'material-ui/svg-icons/action/settings';
import ListItem from 'material-ui/List/ListItem';
import PowerSetting from 'material-ui/svg-icons/action/power-settings-new';
import EmployeeIcon from 'material-ui/svg-icons/action/supervisor-account';
import RemoveRedEye from 'material-ui/svg-icons/action/dashboard';
import { black } from 'material-ui/styles/colors';

import { Flex } from 'react-flex-material';

import { BrowserRouter as Router, Link } from 'react-router-dom';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';
import ArrowDropRight from 'material-ui/svg-icons/navigation/arrow-drop-down';
import General from 'material-ui/svg-icons/action/open-with';
import Document from 'material-ui/svg-icons/action/description';
import NotificationIcon from 'material-ui/svg-icons/social/notifications-active';

const iconStyles = {
    marginRight: 24,
};

const style = {
    paddingLeft: 0,
};

const textStyle = {
    color: black,
}

var nameresult;
var emailresult;


class MenuAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            HideState: "false",
            HideGeneralState: "false",
        }

        this.state = { open: false, imagePreviewUrl: Userpic, file: "", FileExtension: "", imageStateCall: false };
        this.handleLoadProfileImage(this);
    }

    componentDidMount() {
        this.handleLoadProfileImage(this);
    }

    handleChangeHide(e) {
        if (this.state.HideState == "false") {
            this.setState({ HideState: "true" });
        }
        else {
            this.setState({ HideState: "false" });
        }
    }
    handleChangeHideGeneral(e) {
        if (this.state.HideGeneralState == "false") {
            this.setState({ HideGeneralState: "true" });
        }
        else {
            this.setState({ HideGeneralState: "false" });
        }
    }

    UploadProfileImage() {
        if (this.state.imageStateCall == true) {
            // Profile Image Upload API 
            let EmpProfileAPIUrl = "https://48q6lrdip0.execute-api.us-west-2.amazonaws.com/Dev/GPA_EmployeeDatas_Lambda";
            let EmpProfileJSONData = JSON.stringify({
                QueryName: "Upload",
                EmailState: emailresult,
                FileExtension: this.state.FileExtension,
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
                

            }).catch((err) => {
                
            })
        }
    }

    handleLoadProfileImage(e) {
        nameresult = localStorage.getItem('admin_name');
        emailresult = localStorage.getItem('admin_email');
        let LoadProfileImageAPIUrl = "https://48q6lrdip0.execute-api.us-west-2.amazonaws.com/Dev/GPA_EmployeeDatas_Lambda";
        let JSONData = JSON.stringify(
            {
                QueryName: "ReadLogo",
                EmailState: emailresult
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
            
            this.setState({
                file: file,
                filename: file.name,
                imagePreviewUrl: fileinputdata,
                FileExtension: file.name.split('.').pop(),
                imageStateCall: true,
            });
            this.UploadProfileImage();
        }

        reader.readAsDataURL(file);
    }
    handleToggle = () => this.setState({ open: !this.state.open });
    handleClose = () => this.setState({ open: false });
    
    /*Google Translater*/
    googleTranslateElementInit() {
        new window.google.translate.TranslateElement({
          // here is where you change the language
          pageLanguage: '',includedLanguages: 'de,en,es,fr,it,ja,ko,nl,no,pt,zh-CN',defaultLanguage: 'en', multilanguagePage: true
        }, 'google_translate_element_adminmenu');
      }

      componentDidMount() { 
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '/language.js?cb=googleTranslateElementInit');        
        document.body.appendChild(addScript);  
        window.googleTranslateElementInit = this.googleTranslateElementInit;
      }

    render() {

        return (
            <div>
                <Flex layout="row" className="topheader">
                    <Flex flex="none" hide-gt-xs show-xs layout align="center center" >
                        <img src={MenuIcon} alt="Menu" width="40" height="40" onClick={this.handleToggle} className="IconButton" />
                    </Flex>
                    <Flex flex="none">
                        <img src={CompanyLogo} alt="Company Logo" width="130" height="57" className="CompanyIcons" />
                    </Flex>
                    <Flex flex layout align="end center" className="TopHeaderRight">
                        <Flex flex="none">
                            <div id="google_translate_element_adminmenu"></div>
                            {/* <GoogleTranslate />  */}
                        </Flex>
                        {/* <Flex flex="none">
                            <Badge
                                className="Badge"
                                badgeContent={4}
                                secondary={true} >
                                <NotificationsIcon />
                            </Badge>
                        </Flex> */}
                        <Flex flex="none" id="UserSettings">
                            <ListItem
                                className="userprof"
                                disabled={true}
                                leftAvatar={
                                    <Avatar src={(this.state.imageStateCall != false) ? this.state.imagePreviewUrl : Userpic} onClick={this.handleClick.bind(this)} />
                                } >
                                <span className="UserProfilename">{nameresult}</span><br />
                                <input type="file" id="file" ref="fileUploader" style={{ display: "none" }} onChange={this.handleImageChange.bind(this)} />
                                <div class="usermail">{emailresult}</div>
                            </ListItem>
                        </Flex>
                        <Flex flex="none" >
                            <IconMenu className="UsersettingsIcons"
                                iconButtonElement={
                                    <IconButton touch={true}>
                                        <NavigationExpandMoreIcon />
                                    </IconButton>
                                }>
                                <Link to={'/AdminUserSetting'} style={{ textDecoration: 'none' }}><MenuItem primaryText="Settings" leftIcon={<Delete />} /></Link>
                                {/* <MenuItem primaryText="Profile" leftIcon={<PersonAdd />}/> */}
                                <a href='/AdminLogin' className="remove-underline"> <MenuItem primaryText="Logout" leftIcon={<PowerSetting />} /></a>
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

                    <nav className="AdminMenuBar">
                        <Menu className="Menu-1">

                            <ul className="sidebarNav">
                                <li>
                                    <MenuItem style={textStyle} primaryText="General" onClick={this.handleChangeHideGeneral.bind(this)} rightIcon={<ArrowDropRight />} leftIcon={<General />}

                                    />
                                    {this.state.HideGeneralState == "true" ?

                                        <ul>
                                            <li>
                                                <Link to={'/Country'} style={{ textDecoration: 'none' }}><MenuItem primaryText="Country Entry" /></Link>
                                            </li>
                                            <li>
                                                <Link to={'/Industry'} style={{ textDecoration: 'none' }}><MenuItem primaryText="Industry Entry" /></Link>
                                            </li>

                                        </ul>
                                        : ""}
                                </li>
                                <li>
                                    <Link to={'/ClientCompanyList'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Client Company" leftIcon={<RemoveRedEye />} /></Link>
                                </li>
                                <li>
                                    <Link to={'/EmployeeList'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Employee / Applicant" leftIcon={<EmployeeIcon />} /></Link>
                                </li>
                                <li>
                                    <Link to={'/Invitemembers'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Invite Applicants" leftIcon={<ContentLink />} /></Link>
                                </li>
                                <li>
                                    <MenuItem style={textStyle} primaryText="Documents" onClick={this.handleChangeHide.bind(this)} rightIcon={<ArrowDropRight />} leftIcon={<Document />}
                                    />
                                    {this.state.HideState == "true" ?

                                        <ul>
                                            <li>
                                                <Link to={'/DocumentTypes'} style={{ textDecoration: 'none' }}><MenuItem primaryText="Document Types Entry" /></Link>
                                            </li>
                                            <li>
                                                <Link to={'/Documents'} style={{ textDecoration: 'none' }}><MenuItem primaryText="Documents Entry" /></Link>
                                            </li>
                                            <li>
                                                <Link to={'/CountryBasedDocuments'} style={{ textDecoration: 'none' }}><MenuItem primaryText="Country Based Document Mapping" /></Link>
                                            </li>
                                            <li>
                                                <Link to={'/ApplicantDocumentsTracking'} style={{ textDecoration: 'none' }}><MenuItem primaryText="Application Document Tracking" /></Link>
                                            </li>
                                            <li>
                                                <Link to={'/ApplicantDocumentsGathering'} style={{ textDecoration: 'none' }}><MenuItem primaryText="Application Document Gathering" /></Link>
                                            </li>

                                        </ul>
                                        : ""}
                                </li>

                                <li>
                                    <Link to={'/Notifications'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Notification" leftIcon={<NotificationIcon />} /></Link>
                                </li>
                                <li>
                                    <Link to={'/PageSetting'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Page Settings" leftIcon={<ContentCopy />} /></Link>
                                </li>
                                <li>
                                    <MenuItem style={textStyle} primaryText="CRM Integration" leftIcon={<Download />} />
                                </li>
                                <li>
                                    <Link to={'/AdminLogin'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Logout" leftIcon={<PowerSetting />} /></Link>
                                </li>


                            </ul>



                        </Menu>

                    </nav>
                    {/* <Menu className="Menu-1">
                     <Link to={'/AdminDashboardPage'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Client Company" leftIcon={<RemoveRedEye />} /></Link>
                     <Link to={'/EmployeeDashboardPage'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Employee / Applicant" leftIcon={<EmployeeIcon />} /></Link>
                     <Link to={'/InvitememberPage'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Invite Applicants" leftIcon={<ContentLink />} /></Link>                        
                     <MenuItem style={textStyle} primaryText="Page Settings" leftIcon={<ContentCopy />} />
                     <MenuItem style={textStyle} primaryText="CRM Integration" leftIcon={<Download />} />
                 </Menu>

                 <Menu className="Logout">
                 <Link to={'/AdminLogin'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Logout" leftIcon={<PowerSetting />} /></Link>
                 </Menu> */}
                </Drawer>
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(MenuAdmin);