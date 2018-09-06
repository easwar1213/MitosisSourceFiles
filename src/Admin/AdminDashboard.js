import React, { Component } from 'react';
import Paper from 'material-ui/Paper';



//bootstrap
import { Col } from 'react-bootstrap';

import { Flex } from 'react-flex-material';
import BackIcon from 'material-ui/svg-icons/content/reply';
// import FontIcon from 'material-ui/FontIcon';
import ContentLink from 'material-ui/svg-icons/action/question-answer';
import { white } from 'material-ui/styles/colors';



const textStyle = {
  color: white,
}

class AdminDashboard extends Component {
constructor(){
  super();
   
}
  state = {
    finished: false,
    stepIndex: 0,
    isValidMove:false,
    isValidMoveResidency:false,
  };
  

  componentDidMount() {    
    window.Chart_Script();
    window.Chart_pie();
    window.Chart_comparison();
    window.Chart_againcomparison();
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3,
    });
    if(stepIndex==1){
    this.child.handleGenQusSave();
    
    this.setState({isValidMove:localStorage.getItem("isMoveNextForm")});
    }
    if(stepIndex==2){
      this.child.handleSubmit(); 
      let mapPoint = this.handleMoveNextfunc();
      this.setState({isValidMoveResidency:mapPoint});
      
    }

    
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    
  }
  onClick = () => {
    // const {stepIndex} = this.state;
    // this.setState({
    //   stepIndex: stepIndex + 1,
    //   finished: stepIndex >= 3,
    // });
    this.child.handleSubmit(); // do stuff
  }
    render() {

      const {finished, stepIndex} = this.state;
      const contentStyle = {margin: '0 16px'};

        return (
            <div>
              {/* <Col md={11}> */}

              <div className="HeaderTile">                   
                    <Flex className="show-grid" layout="row">
                        <Flex flex="none">
                            <div className="TitleIcon">
                                <h4><span className="TitleIconColor">{<ContentLink />}</span><span className="TitleTexColor">Admin Dashboard</span></h4>
                            </div>
                        </Flex>
                        <Flex flex layout align="end center">
                            <div>
                                <h5><span className="BreadCrumbsClass"><BackIcon /></span>&nbsp;&nbsp;<b><span className="ActiveClass">Home / Admin Dashboard</span></b></h5>
                            </div>
                        </Flex>
                    </Flex>                  
                </div>
                <div>
                <div zDepth={1} className="CommonDiv row-padd mainContainer">
                    <Col md={2} sm={4} xs={12}>
                        <section class="panel panel-featured-left panel-featured-tertiary">
                            <div class="panel-body">
                                <div class="widget-summary">
                                    <div class="widget-summary-col widget-summary-col-icon">
                                        <div class="summary-icon bg-tertiary">
                                            <i class="fa fa-globe"></i>
                                        </div>
                                    </div>
                                    <div class="widget-summary-col">
                                        <div class="summary">
                                            <h4 class="title">Number of Country</h4>
                                            <div class="info">
                                                <strong class="amount">18</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Col>
                    <Col md={2} sm={4} xs={12}>
                        <section class="panel panel-featured-left panel-featured-registered">
                            <div class="panel-body">
                                <div class="widget-summary">
                                    <div class="widget-summary-col widget-summary-col-icon">
                                        <div class="summary-icon bg-registered">
                                            <i class="fa fa-building-o"></i>
                                        </div>
                                    </div>
                                    <div class="widget-summary-col">
                                        <div class="summary">
                                            <h4 class="title">Registered Company</h4>
                                            <div class="info">
                                                <strong class="amount">1286</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Col>
                    <Col md={2} sm={4} xs={12}>
                        <section class="panel panel-featured-left panel-featured-primary">
                            <div class="panel-body">
                                <div class="widget-summary">
                                    <div class="widget-summary-col widget-summary-col-icon">
                                        <div class="summary-icon bg-primary">
                                            <i class="fa fa-file-text-o"></i>
                                        </div>
                                    </div>
                                    <div class="widget-summary-col">
                                        <div class="summary">
                                            <h4 class="title">Applied for Pension</h4>
                                            <div class="info">
                                                <strong class="amount">38,152</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Col>
                    <Col md={2} sm={4} xs={12}>
                        <section class="panel panel-featured-left panel-featured-quartenary">
                            <div class="panel-body">
                                <div class="widget-summary">
                                    <div class="widget-summary-col widget-summary-col-icon">
                                        <div class="summary-icon bg-quartenary">
                                            <i class="fa fa-check-square-o"></i>
                                        </div>
                                    </div>
                                    <div class="widget-summary-col">
                                        <div class="summary">
                                            <h4 class="title">Approved Pension</h4>
                                            <div class="info">
                                                <strong class="amount">3765</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Col>
                    <Col md={2} sm={4} xs={12}>
                        <section class="panel panel-featured-left panel-featured-secondary">
                            <div class="panel-body">
                                <div class="widget-summary">
                                    <div class="widget-summary-col widget-summary-col-icon">
                                        <div class="summary-icon bg-secondary">
                                            <i class="fa fa-times"></i>
                                        </div>
                                    </div>
                                    <div class="widget-summary-col">
                                        <div class="summary">
                                            <h4 class="title">Rejected Pension</h4>
                                            <div class="info">
                                                <strong class="amount">1785</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Col>
                    <Col md={2} sm={4} xs={12}>
                        <section class="panel panel-featured-left panel-featured-forcast">
                            <div class="panel-body">
                                <div class="widget-summary">
                                    <div class="widget-summary-col widget-summary-col-icon">
                                        <div class="summary-icon bg-forcast">
                                            <i class="fa fa-angle-double-right"></i>
                                        </div>
                                    </div>
                                    <div class="widget-summary-col">
                                        <div class="summary">
                                            <h4 class="title">Forecast Application</h4>
                                            <div class="info">
                                                <strong class="amount">765</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Col>
                </div>

                <div zDepth={1} className="CommonDiv row-padd mainContainer">
                    <Col md={6} xs={12}>
                    	<div className="inbox">
	                        <h3 className="ChartHeading">Total Registered Company Details</h3>
	                        <div id="chart-container"></div>
                        </div>
                    </Col>

                    <Col md={6} xs={12}>
                    	<div className="inbox">
                        	<h3 className="ChartHeading">Total Pension Application Details</h3>
                        	<div id="chart-pie"></div>
                        </div>
                    </Col>

                    <Col md={6} xs={12}>
                    	<div className="inbox">
                        	<h3 className="ChartHeading">Year Wise Comparison</h3>
                        	<div id="chart-comparison"></div>
                        </div>
                    </Col>

                    <Col md={6} xs={12}>
                    	<div className="inbox">
                        	<h3 className="ChartHeading">Quarterly Wise Comparison</h3>
                        	<div id="chart-compar"></div>
                        </div>
                    </Col>
                </div>
                </div>	

            </div>
        );
    }
}

export default AdminDashboard;