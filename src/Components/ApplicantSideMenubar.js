import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import SvgIcon from 'material-ui/SvgIcon';
import RemoveRedEye from 'material-ui/svg-icons/action/dashboard';
import { Grid, Row, Col } from 'react-bootstrap';
import '../Style/style.css';
import Menu from 'material-ui/Menu';
import FontIcon from 'material-ui/FontIcon';
import PersonAdd from 'material-ui/svg-icons/social/people';
import ContentLink from 'material-ui/svg-icons/action/question-answer';
import ContentCopy from 'material-ui/svg-icons/action/description';
import Download from 'material-ui/svg-icons/action/settings-phone';
import Delete from 'material-ui/svg-icons/action/settings';
import Upload from 'material-ui/svg-icons/file/file-upload';
import ListItem from 'material-ui/List/ListItem';
import PowerSetting from 'material-ui/svg-icons/action/power-settings-new';
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

class ApplicantSideMenubar extends Component {
    render() {
        return (
            <div>
                <nav className="BasicMenu1">
                    <Menu>
                        <Link to={'/ApplicantDashboard'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Dashboard" leftIcon={<RemoveRedEye />} /></Link>
                        <Link to={'/AboutUS'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="About us" leftIcon={<PersonAdd />} /></Link>
                        <Link to={'/FQA'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="FAQ" leftIcon={<ContentLink />} /></Link>
                        <Link to={'/TC'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Terms & Condtions" leftIcon={<ContentCopy />} /></Link>
                        <Link to={'/ContactUS'} style={{ textDecoration: 'none' }}> <MenuItem style={textStyle} primaryText="Customer Support" leftIcon={<Download />} /> </Link>
                        <Link to={'/DocumentUpload'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="Document Upload" leftIcon={<Upload />} /> </Link>
                        <Link to={'/UserSetting'} style={{ textDecoration: 'none' }}><MenuItem style={textStyle} primaryText="User Settings" leftIcon={<Delete />} /></Link>
                    </Menu>
                    <Menu className="Logout">
                        <MenuItem style={textStyle} primaryText="Logout" leftIcon={<PowerSetting />} />
                    </Menu>
                </nav>
            </div>
        );
    }
}

export default ApplicantSideMenubar;