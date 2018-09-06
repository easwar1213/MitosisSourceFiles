import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import SvgIcon from 'material-ui/SvgIcon';
import RemoveRedEye from 'material-ui/svg-icons/action/dashboard';
import '../Style/style.css';
import Menu from 'material-ui/Menu';
import ContentLink from 'material-ui/svg-icons/action/question-answer';
import Document from 'material-ui/svg-icons/action/description';
import NotificationIcon from 'material-ui/svg-icons/social/notifications-active';
import ContentCopy from 'material-ui/svg-icons/action/settings-brightness';
import Download from 'material-ui/svg-icons/action/settings-phone';
import ListItem from 'material-ui/List/ListItem';
import PowerSetting from 'material-ui/svg-icons/action/power-settings-new';
import EmployeeIcon from 'material-ui/svg-icons/action/supervisor-account';
import ArrowDropRight from 'material-ui/svg-icons/navigation/arrow-drop-down';
import General from 'material-ui/svg-icons/action/open-with';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { white } from 'material-ui/styles/colors';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);

const style = {
    paddingLeft: 0,
};

const textStyle = {
    color: white,
}

class AdminSideMenubar extends Component {
    constructor() {
        super();
        this.state = {
            HideState: "false",
            HideGeneralState: "false",
        }
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
    render() {
        return (
            <div>
                <nav className="BasicMenu">
                    <Menu className="Menu-1">
                        <ul className="sidebarNav">
                            <li>
                                <MenuItem style={textStyle} primaryText="General" rightIcon={<ArrowRight />} leftIcon={<General />}/>
                                <ul class="sub-menu">
                                    <li><Link to={'/Country'} style={{ textDecoration: 'none' }}><MenuItem primaryText="Country Entry" /></Link></li>
                                    <li><Link to={'/Industry'} style={{ textDecoration: 'none' }}><MenuItem primaryText="Industry Entry" /></Link></li>
                                </ul>
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
                                <MenuItem style={textStyle} primaryText="Documents" onClick={this.handleChangeHide.bind(this)} rightIcon={<ArrowRight />} leftIcon={<Document />}/>
                                <ul class="sub-menu">
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
                            </li>
                            <li>
                                <Link to={'/Notifications'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Notification" leftIcon={<NotificationIcon />} /></Link>
                            </li>
                            <li>
                                <Link to={'/PageSetting'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Page Settings" leftIcon={<ContentCopy />} /></Link>
                            </li>
                            <li>
                                <Link to={'/CustomerSupportList'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Customer Support" leftIcon={<Download />} /></Link>
                            </li>
                        </ul>
                    </Menu>
                    <Menu className="Logout">
                        <Link to={'/AdminLogin'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Logout" leftIcon={<PowerSetting />} /></Link>
                    </Menu>
                </nav>
            </div>
        );
    }
}
export default AdminSideMenubar;