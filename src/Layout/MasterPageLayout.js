
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RemoveRedEye from 'material-ui/svg-icons/action/dashboard';
import BackIcon from 'material-ui/svg-icons/content/reply';
import SvgIcon from 'material-ui/SvgIcon';
import Paper from 'material-ui/Paper';
import { white } from 'material-ui/styles/colors';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AdminMenuBar from '../Components/AdminMenu';
import PreMenuBar from '../Components/PreMenu';
import MenuBar from '../Components/Menu';
import HeaderTitle from '../Components/HeaderTitle';
import AdminSideMenuBar from '../Components/AdminSideMenubar';
import ApplicantSideMenuBar from '../Components/ApplicantSideMenubar';

//MenuBar Items
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Menu from 'material-ui/Menu';
import CompanyLogo from '../img/logo.png';
import Userpic from '../img/Profile_Img.png';
import CompanyWhiteLogo from '../img/logo_white.png';
import MenuIcon from '../img/menu_icons.png';
import IconMenu from 'material-ui/IconMenu';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import DropDownMenu from 'material-ui/DropDownMenu';

//Side Menu Items Icons
import EmployeeIcon from 'material-ui/svg-icons/action/supervisor-account';
import ArrowDropRight from 'material-ui/svg-icons/navigation/arrow-drop-down';
import General from 'material-ui/svg-icons/action/open-with';
import Document from 'material-ui/svg-icons/action/description';
import NotificationIcon from 'material-ui/svg-icons/social/notifications-active';

import FontIcon from 'material-ui/FontIcon';
import PersonAdd from 'material-ui/svg-icons/social/people';
import ContentLink from 'material-ui/svg-icons/action/question-answer';
import ContentCopy from 'material-ui/svg-icons/action/description';
import Download from 'material-ui/svg-icons/action/settings-phone';
import Delete from 'material-ui/svg-icons/action/settings';
import PowerSetting from 'material-ui/svg-icons/action/power-settings-new';
import ListItem from 'material-ui/List/ListItem';
import Upload from 'material-ui/svg-icons/file/file-upload';

//Style
import '../Style/style.css';

//bootstrap
import { Grid, Row, Col, FormControl, NavDropdown, Button, Glyphicon, Tooltip, OverlayTrigger, striped, bordered, condensed, Table } from 'react-bootstrap';

//Flex
import { Flex } from 'react-flex-material';

//Routing
import history from '../Routing/history';

// axios call 
import axios from 'axios';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

//Badge
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import GoogleTranslate from '../Components/GoogleTranslate';

const iconStyles = {
    marginRight: 24,
};

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

export const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />
)

// Admin Part
export const AdminDashboardLayout = props => (
    <div>
        <MuiThemeProvider>
            {/* Header Top */}
            <div className="HeaderTop" />
            {/* Top Menu */}
            <AdminMenuBar />
            {/* Side Menu */}
            <AdminSideMenuBar/>
            {/* Page Title */}
            {/* <HeaderTitle /> */}
            {/* Render Page */}
            {/* <Paper zDepth={1}> */}
                {props.children}
            {/* </Paper> */}
        </MuiThemeProvider>
    </div>
);

// Applicant Part
export const ApplicantPreDashboardLayout = props => (
    <div>
        <MuiThemeProvider>
            {/* Header Top */}
            <div className="HeaderTop" />
            {/* Top Menu */}
            <PreMenuBar />
            {/* Render Page */}
            <Paper zDepth={1}>
                {props.children}
            </Paper>
        </MuiThemeProvider>
    </div>
);


// Applicant Part
export const ApplicantDashboardLayout = props => (
    <div>
        <MuiThemeProvider>
            {/* Header Top */}
            <div className="HeaderTop" />
            {/* Top Menu */}
            <MenuBar />
            {/* Side Menu */}
            <ApplicantSideMenuBar/>
            {/* Page Title */}
            <HeaderTitle />
            {/* Render Page */}
            {/* <Paper zDepth={1} className="CommonDiv"> */}
                {props.children}
            {/* </Paper> */}
        </MuiThemeProvider>
    </div>
);

