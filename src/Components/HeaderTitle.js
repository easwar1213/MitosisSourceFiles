import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import SvgIcon from 'material-ui/SvgIcon';
import RemoveRedEye from 'material-ui/svg-icons/action/dashboard';
import BackIcon from 'material-ui/svg-icons/content/reply';
import { Grid, Row, Col } from 'react-bootstrap';
import '../Style/style.css';

import Menu from 'material-ui/Menu';
import FontIcon from 'material-ui/FontIcon';
import PersonAdd from 'material-ui/svg-icons/social/people';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import ListItem from 'material-ui/List/ListItem';

import { Flex } from 'react-flex-material';

//Routing
import history from '../Routing/history';

const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);

const style = {
    paddingLeft: 0,
};

class AboutHeading extends Component {
    constructor() {
        super();
        this.state = {
            PageTitleState: "Dashboard"
        }
    }
    handleNavDashboard() {
        history.push('/ApplicantDashboard');
    }
    render() {
        return (
            <div>
                <div className="HeaderTile">
                    <Flex className="show-grid" layout="row">
                        <Flex flex="none">
                            <div className="TitleIcon">
                                <h4><span className="TitleIconColor">{<RemoveRedEye />}</span><span className="TitleTexColor">Dashboard</span></h4>
                            </div>
                        </Flex>
                        <Flex flex layout align="end center">
                            <div>
                                <h5><span className="BreadCrumbsClass"><BackIcon /></span>&nbsp;&nbsp;<b><span onClick={this.handleNavDashboard.bind(this)} className="ActiveClass">Home / Dashboard</span></b></h5>
                            </div>
                        </Flex>
                    </Flex>
                </div>
            </div>
        );
    }
}

export default AboutHeading;