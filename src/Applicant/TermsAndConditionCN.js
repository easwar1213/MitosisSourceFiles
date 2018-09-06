import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import CompanyLogo from '../img/logo.png';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PowerSetting from 'material-ui/svg-icons/action/power-settings-new';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import TermsAndCondition from './TermsAndCondition';
import TermsAndConditionDU from './TermsAndConditionDU';
import TermsAndConditionES from './TermsAndConditionES';
import TermsAndConditionGE from './TermsAndConditionGE';
import TermsAndConditionKR from './TermsAndConditionKR';
import TermsAndConditionNR from './TermsAndConditionNR';
import TermsAndConditionPR from './TermsAndConditionPR';
import './style.css';
import SignaturePad from 'react-signature-pad';
import * as jsPDF from 'jspdf';
import createHistory from 'history/createBrowserHistory';
import S3FSFileUpload from './S3FSFileUpload';
import * as aws from 'aws-sdk';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails, AmazonCognitoIdentity } from 'amazon-cognito-identity-js';
import { CognitoIdentityCredentials } from 'aws-sdk';
import axios from 'axios';

/* User Pool Access Details */
const poolData = {
    UserPoolId: 'us-west-2_wgkaBUmz5',//'us-west-2_kG2V3FBcu', // Your user pool id here
    ClientId: '3ocb7u0422dhf9c38vacc0kfv3',//'4apkr7thetvm981irp8ohsjj1t', // Your client id here 4gjka5ag6svfp0f3c4i2a1r8oo
    identityID: "us-west-2:2cae3c46-6f2b-40dd-a059-5313e2b8b23b",//"us-west-2:746c750e-7185-4675-84c1-95186baed362",//"us-west-2:e2caf986-8e5b-4c17-abe1-362efe0c8960",
    region: "us-west-2",
};

const history = createHistory();
const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

class TermsAndConditionCN extends Component {

    constructor(props) {
		super(props);
		const maxDate = new Date();
		this.handlePoolDataLoad(this);
		this.state = {
		ischecked: false,
		FirstName: '',
		LastName: '',
		maxDate: maxDate,
		Name: '',
		SignedBy: null,
		countries: null,
		signaturePad: false
	
		};
		 this.pdfToHTML = this.pdfToHTML.bind(this);
	 }
	 handleFirstName(e) {
		this.setState({ FirstName: e.target.value });
	 }
	 handleLastName(e) {
		this.setState({ LastName: e.target.value });
	 }
	 handleMiddleName(e) {
		this.setState({ MiddleName: e.target.value });
	 }
	 handleName(e) {
		this.setState({ Name: e.target.value });
	 }
	 // handleSignature(e){
	 // this.setState({ Signature: e.target.value});
	 // }
	
	 handleChangeTitle = (event, index, SignedBy) => this.setState({ SignedBy });
	
	 // handleChange = (event, date) => {
	 // this.setState({
	 // controlledDate: date,
	 // });
	 // }; 
	
	 handleTermsConditionSave(event) {
		let GenQusAPIUrl = "https://dt2fpwxbwa.execute-api.us-west-2.amazonaws.com/Dev/GPA_TermsConditionSave_Lambda";
		let GenQusJSONData = JSON.stringify({
		UserID: localStorage.getItem("LSEmail"), 
		FirstName: this.state.FirstName,
		MiddleName: this.state.MiddleName,
		LastName: this.state.LastName,
		DateOfSigned: this.state.maxDate,
		SignedBy: this.state.SignedBy,
		SignedByName: this.state.Name,
		Signature: "", 
		TCStatus: "C"
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
	 url: GenQusAPIUrl,
	 data: GenQusJSONData,
	 // headers:AxiosHeaderConfig,
	
	 }).then((data) => {
	 console.log(data.error);
	 if(data.data.errorMessage==undefined)
	 {
	 alert("Your Information Saved Successfully");
	 }
	 else
	 {
	 alert("Your Record Already Exists");
	 }
	 
	 }).catch((err) => {
	 alert("Please Fill Mandatory Fields");
	 }) 
	 }
	
	 handlePoolDataLoad(event) {
	
	 var authenticationData = {
	 Username: localStorage.getItem("LSEmail"),
	 Password: localStorage.getItem("LSPwd"),
	 };
	 var authenticationDetails = new AuthenticationDetails(authenticationData);
	
	 var userPool = new CognitoUserPool(poolData);
	 var userData = {
	 Username: localStorage.getItem("LSEmail"),
	 Pool: userPool
	 };
	
	 var cognitoUser = new CognitoUser(userData);
	 var thisObj = this;
	 cognitoUser.authenticateUser(authenticationDetails, {
	 onSuccess: function (result) { 
	 cognitoUser.getUserAttributes(function (err, result) {
	 if (err) {
	 return;
	 }
	 for (var i = 0; i < result.length; i++) {
	 if(result[i].getName()=="given_name")
	 {
	 thisObj.setState({ FirstName: result[i].getValue() });
	 }
	
	 if(result[i].getName()=="middle_name")
	 {
	 thisObj.setState({ MiddleName: result[i].getValue() });
	 }
	
	 if(result[i].getName()=="family_name")
	 {
	 thisObj.setState({ LastName: result[i].getValue() });
	 } 
	 }
	 });
	 },
	 onFailure: function (err) {
	 },
	 });
	
	 }
	
	 handleCheck() {
	 if (this.state.ischecked == false || this.state.ischecked == '') {
	 this.setState({
	 ischecked: true 
	 });
	 this.handleScrollClick(this);
	 }
	 else {
	 this.setState({
	 ischecked: false
	 });
	 this.handleScrollUpClick(this);
	 }
	
	 }
	
	 handleScrollClick = e => {
	 setTimeout(() => (this.node.scrollTop = 10000)); 
	 };
	
	 
	 handleScrollUpClick = e => {
	 setTimeout(() => (this.node.scrollTop = 0)); 
	 };
	
	
	 canBeSubmitted(e) {
	 const { FirstName, LastName, Name, signaturePad, SignedBy, ischecked } = this.state;
	
	 return (FirstName.length > 0 && LastName.length > 0 && Name.length > 0
	 && SignedBy != null && ischecked == true);
	
	 
	
	 };
	 pdfToHTML(event, context) { 
	 // this.handleTermsConditionSave(this);
	 var specialElementHandlers = {
	 '#myId': function (element, renderer) {
	 return true;
	 },
	
	 };
	
	 let doc = new jsPDF();
	 var sourceEle = document.getElementById('divtoPDF'); //$('#HTMLtoPDF')[0];
	 //var source = sourceEle.cloneNode(true);
	 var svgTags = sourceEle.getElementsByClassName("tc-form");
	 for (var i = 0; i < svgTags.length; i++) {
	 var svgElem = svgTags[i];
	 svgElem.parentNode.removeChild(svgElem);
	 }
	
	 doc.fromHTML(
	 sourceEle, 10, 12, {
	 'width': 150,
	 'elementHandlers': specialElementHandlers
	 },
	
	 );
	 var imgData = this.signaturePad.toDataURL("image/png");
	
	 doc.text(150,258,"Signature");
	 doc.addImage(imgData, 'png', 140, 265, 0, 0);/* x,y,w,h*/
	
	 //console.log(doc.addPage());
	 var userId = 1;
	 var now = Date.now();
	 var fileName = 'tc_' + userId + '_' + now + '.pdf';
	 doc.save(fileName);
	 // var file = new File([doc.output()], 'files/tc/' + fileName, { type: 'application/pdf', lastModified: Date.now() });
	 // var s3 = new S3FSFileUpload();
	 // s3.uploadFile(file);
	 // var matches = doc.output('datauri').match(/base64,(.+)$/);
	 // var fileBase64String = matches[1];
	 // console.log(doc);
	 // var data ={
	 // fileBase64String: fileBase64String,
	 // to:localStorage.getItem("LSEmail"),
	 // }
	 // let emailSendingApiUrl = "https://qrhex3pp85.execute-api.us-west-2.amazonaws.com/dev/";
	 // var header = {
	 // "Content-Type": "application/json",
	 // "Access-Control-Request-Headers": "*",
	 // "Access-Control-Request-Method": "*",
	 // }
	 // axios({
	 // method: "POST",
	 // url: emailSendingApiUrl,
	 // data: JSON.stringify(data),
	 // headers: header,
	 
	 // }).then(({ data }) => {
	 // console.log(data);
	
	 // })
	 // .catch((err) => {
	 // console.log("DATA ", err);
	 // });
	 // //end of email 
	 this.props.history.push('/WelcomePage');
	 }
	
    render(){
		const isEnabled = this.canBeSubmitted();
		const maxDate = new Date();
        return (
			<div id="myId" className="TC-bg">
 {/* <img className="TC-logo" src={CompanyLogo} width="130" height="53" /> */}
 <Col lg={12} md={12} xs={12} className="CommonHeadingdiv">
    <Col md={9}>
    <img className="TC-logo" src={CompanyLogo} width="130" height="53" />
    </Col>
    <Col md={3} className="Logoutdiv">
    {/* <a href='/Login'> <MenuItem primaryText="Logout" leftIcon={<PowerSetting />} /></a> */}
    <h4><a href='/Login'><span className="LogoutIcon">{<PowerSetting />}</span><span className="LogouTxt">Logout</span></a></h4>
    </Col>
</Col>
            <SelectField className="TC_Select"
            floatingLabelText="Language"
            value={this.state.value}
            onChange={this.handleChange}
          >
            
          <a href='/TermsAndCondition'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndCondition" /></a>
          <a href='/TermsAndConditionDU'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionDU" /></a>
          <a href='/TermsAndConditionES'><MenuItem value={"TermsAndCondition"} primaryText=" TermsAndConditionES" /></a>
          <a href='/TermsAndConditionGE'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionGE" /></a>
          <a href='/TermsAndConditionKR'><MenuItem value={"TermsAndCondition"} primaryText=" TermsAndConditionKR" /></a>
		  <a href='/TermsAndConditionNR'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionNR" /></a>
		  <a href='/TermsAndConditionPR'><MenuItem value={ "TermsAndCondition"} primaryText=" TermsAndConditionPR" /></a>
          </SelectField>
		<div id="divtoPDF">
    	<Grid>
    
    		<div className="TC-header">
				<h3> æ¡æ¬¾å’Œæ¡ä»¶</h3>
			</div>
			<div className="TC-content" id="divTC" ref={node => this.node = node}>
    		<br></br>   
		<Grid> 
            <Row >
            	<Col xs={10} md={11}>
            		<Col xs={8} md={12}>

                   		 <p>è¿™äº›æ–‡ä»¶åˆ—å‡ºäº†æˆ‘ä»¬å¾‹å¸ˆäº‹åŠ¡æ‰€æ®å…¶ä¸ºæ‚¨æä¾›å›½é™…å…»è€é‡‘ç ”ç©¶æœåŠ¡çš„æ¡æ¬¾ã€‚</p>
						<Col xs={8} md={12}>
                    		<p> æ‚¨åº”è¯¥é˜…è¯»è¿™äº›æ–‡ä»¶ï¼Œå¦‚æžœæœ‰ä»»ä½•éœ€è¦æ¾„æ¸…çš„äº‹é¡¹ï¼Œæˆ‘ä»¬å°†å¾ˆä¹æ„æä¾›æ›´è¯¦ç»†çš„è§£é‡Šã€‚</p>
                   		    <p> è¿™äº›æ¡æ¬¾å°†ç»§ç»­æœ‰æ•ˆï¼Œå¹¶é€‚ç”¨äºŽæ‚¨çŽ°åœ¨æˆ–å°†æ¥æä¾›ç»™æ‚¨çš„ä»»ä½•å•†ä¸šæœåŠ¡ã€‚å¦‚æžœæˆ‘ä»¬çš„å…¬å¸å°†æ¥ä¼šæ”¹å˜ä»»ä½•ä¸šåŠ¡æ¡æ¬¾ï¼Œæˆ‘ä»¬ä¼šåœ¨å˜æ›´å‰æå‰ä»¥ä¹¦é¢å½¢å¼é€šçŸ¥æ‚¨ã€‚</p>

                            <p>ä»…ä½œä¸ºæ¦‚è¿°ï¼Œè€Œä¸æ˜¯å®Œæ•´çš„æè¿°ï¼Œæˆ‘ä»¬ä¸ºæ‚¨æä¾›çš„æœåŠ¡çš„æ¡æ¬¾å’Œæ¡ä»¶åŒ…æ‹¬ï¼š</p>
					    </Col><br></br>
                        <Col xs={12} md={12}>

							<ul>
							<li>è¯¥åè®®ç”±å…¨çƒé€€ä¼‘é‡‘åä¼šæœ‰é™å…¬å¸ï¼ˆ&ldquo;GPA&rdquo;ï¼‰å’Œæ‚¨ï¼ˆ&ldquo;ç”³è¯·äºº&rdquo;ï¼‰ç­¾è®¢ã€‚</li>
							<li>GPAå°†æ ¹æ®ç”³è¯·äººåœ¨æœ¬å›½ä»¥å¤–çš„ç”³è¯·äººçš„å°±ä¸šå’Œå±…ç•™æ—¶é—´ååŠ©ç”³è¯·äººå¯»æ‰¾ã€å®šä½ï¼Œå¹¶ååŠ©ç”³è¯·äººä»Žå›½å®¶å’Œ/æˆ–ç§äººé€€ä¼‘é‡‘æä¾›è€…ï¼ˆ&ldquo;å…»è€é‡‘æä¾›è€…&rdquo;ï¼‰èŽ·å¾—é¢å¤–çš„é€€ä¼‘æ”¶ç›Šæ¥ååŠ©ç”³è¯·äººã€‚</li>
							<li>ç”³è¯·äººåŒæ„å¹¶å°†èµ”å¿KBRå…¬å¸ï¼ŒåŒ…æ‹¬å…¶å­å…¬å¸ã€ç›¸å…³å…¬å¸å’ŒåŽ†å²å®žä½“ï¼Œä¸Žç”³è¯·äººæ”¶åˆ°æˆ–æœªæ”¶åˆ°çš„æ”¶ç›Šæœ‰å…³çš„æ‰€æœ‰ç´¢èµ”ã€‚</li>
							<li>å¦‚æžœGPAå¯¹ç”³è¯·äººæ²¡æœ‰ä»»ä½•å¥½å¤„ï¼Œç”³è¯·äººå°†ä¸æ”¶å–ä»»ä½•è´¹ç”¨ã€‚</li>
							<li>GPAä¸ä¿è¯ç”³è¯·äººå¯ä»¥æˆ–å°†è¦èŽ·å¾—çš„æ”¶ç›Šã€‚</li>
							<li>å¦‚æžœGPAä¸ºç”³è¯·äººèŽ·å¾—æ”¶ç›Šï¼Œç”³è¯·äººå°†æ”¯ä»˜ä¸Žç”³è¯·äººæ”¶åˆ°çš„å‰ä¸¤ä¸ªæœˆçš„å…»è€é‡‘æ”¶ç›Šç›¸åŒçš„ä¸€æ¬¡æ€§è´¹ç”¨ã€‚</li>
							<li>> æ¬¾é¡¹æ˜¯åœ¨é¦–æ¬¡æ”¶åˆ°æ”¶ç›ŠåŽä¹åï¼ˆ90ï¼‰å¤©å†…æ”¯ä»˜ã€‚</li>
							<li>GPAï¼ŒKBRå…¬å¸ï¼Œå…»è€é‡‘æä¾›è€…åŠå…¶ä»£ç†äººå’Œå‘˜å·¥ä¸èƒ½ï¼Œä¹Ÿä¸å‘ç”³è¯·äººæä¾›ç¨ŽåŠ¡ã€æ³•å¾‹æˆ–è´¢åŠ¡å’¨è¯¢ã€‚</li>
							<li>GPA ä¸å¯¹ç”³è¯·äººæˆ–å…»è€é‡‘æä¾›è€…æä¾›çš„ä¿¡æ¯çš„å‡†ç¡®æ€§è´Ÿè´£ã€‚</li>
							</ul>
						</Col>
						<Col xs={12} md={12}>
							<div className="TC-content1" id="test1">
                   	        	<h3>â–¡æˆ‘å·²é˜…è¯»ã€ç†è§£å¹¶åŒæ„ä»¥ä¸‹æ¡æ¬¾å’Œæ¡ä»¶ã€‚</h3>
                        	</div>
						</Col>
            			<br></br>
            			<Col xs={12} md={12}>
                   			<p>å§“&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;å&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;æ—¥æœŸ</p>
                    		<p>å…¨çƒé€€ä¼‘é‡‘åä¼šæœ‰é™å…¬å¸ - æ¡æ¬¾å’Œæ¡ä»¶</p>

                    		<p>è¯·é˜…è¯»ä»¥ä¸‹æ¡æ¬¾å’Œæ¡ä»¶ï¼Œä»¥ä½¿ç”¨ å…¨çƒé€€ä¼‘é‡‘åä¼šæœ‰é™å…¬å¸ï¼ˆ&ldquo;GPA&rdquo;ï¼‰å’Œæœ¬è½¯ä»¶ï¼ˆ&ldquo;è½¯ä»¶&rdquo;ï¼‰çš„æœåŠ¡ã€‚é€šè¿‡ä½¿ç”¨è½¯ä»¶ä»¥åŠé€šè¿‡è½¯ä»¶æä¾›çš„ä¿¡æ¯å’ŒæœåŠ¡ï¼Œæ‚¨åŒæ„éµå®ˆå¹¶å—è¿™äº›æ¡æ¬¾å’Œæ¡ä»¶çš„çº¦æŸã€‚</p>
                    		<p> å¦‚æžœæ‚¨ä¸åŒæ„è¿™äº›æ¡æ¬¾å’Œæ¡ä»¶ï¼Œè¯·å‹¿ä½¿ç”¨æœ¬è½¯ä»¶ã€‚GPAæ‹¥æœ‰è½¯ä»¶ï¼Œå¹¶ä¿ç•™éšæ—¶ä¿®æ”¹æœ¬æ¡æ¬¾å’Œæ¡ä»¶çš„æƒåˆ©ï¼Œä»»ä½•æ­¤ç±»ä¿®æ”¹å°†åœ¨å‘å¸ƒä¿®æ”¹åŽç«‹å³ç”Ÿæ•ˆã€‚</p>
                    		<p> æ‚¨åº”å®šæœŸæ£€æŸ¥è¿™äº›æ¡æ¬¾å’Œæ¡ä»¶ä»¥è¿›è¡Œä¿®æ”¹ã€‚å¦‚æžœåœ¨æˆ‘ä»¬å‘å¸ƒè½¯ä»¶ä¿®æ”¹åŽä½¿ç”¨æœ¬è½¯ä»¶ï¼Œé‚£ä¹ˆæ‚¨å°†éµå®ˆè¯¥ç­‰ä¿®æ”¹ã€‚</p>

                    		<p>è¿™äº›æ¡æ¬¾å’Œæ¡ä»¶é™¤äº†æ‚¨ä¸ŽGPAä¹‹é—´çš„ä»»ä½•å…¶ä»–åè®®ä¹‹å¤–ï¼ŒåŒ…æ‹¬ä»»ä½•å®¢æˆ·æˆ–å¸æˆ·åè®®ä»¥åŠç®¡ç†æ‚¨å¯¹æœ¬è½¯ä»¶å¯ç”¨çš„äº§å“ã€æœåŠ¡ã€å†…å®¹ã€å·¥å…·å’Œä¿¡æ¯çš„ä½¿ç”¨çš„ä»»ä½•å…¶ä»–åè®®ã€‚</p>
						</Col>
            			<br/><br/>
           				<Col xs={12} md={12}>
                    		<p><b>ä½¿ç”¨æœ¬è½¯ä»¶</b></p>
							<Col xs={12} md={12}>
                    			<p>æœ¬è½¯ä»¶ä»…ç”¨äºŽæ‚¨çš„ä¸ªäººã€éžå•†ä¸šç”¨é€”å’Œæ˜¾ç¤ºã€‚</p>
                   				<p> åªè¦æ‚¨åŒæ„ä¸åˆ é™¤å…¶ä¸­åŒ…å«çš„ä»»ä½•ç‰ˆæƒã€å•†æ ‡æˆ–å…¶ä»–é€šçŸ¥ï¼Œæ‚¨å¯ä»¥ä»Žè½¯ä»¶ä¸­æŠŠä¿¡æ¯ä¸‹è½½åˆ°è®¡ç®—æœºä¸­ï¼Œå¹¶æ‰“å°å‡ºæ–‡æœ¬ä¾›æ‚¨å‚è€ƒã€‚</p>

                    			<p><b>æ²¡æœ‰æä¾›å»ºè®®</b></p>
                    			<p>GPA æ ¹æ®ç”³è¯·äººçš„æœ¬å›½ä»¥å¤–çš„å·¥ä½œå’Œå°±ä¸šååŠ©ç”³è¯·äººå¯»æ‰¾ã€å®šä½ï¼Œå¹¶ååŠ©ç”³è¯·äººä»¥èŽ·å¾—é¢å¤–çš„å›½é™…é€€ä¼‘æ”¶ç›Šã€‚GPAä¸æä¾›ä»»ä½•å»ºè®®æˆ–æä¾›ä»»ä½•ç±»åž‹çš„æŠ•èµ„å»ºè®®ã€‚</p>

                    			<p>GPAä»…æä¾›ç”¨äºŽä¿¡æ¯ã€æ•™è‚²å’Œéžå•†ä¸šç›®çš„çš„è½¯ä»¶å†…å®¹ã€‚</p>
                    			<p> è™½ç„¶GPAå¯èƒ½æä¾›æœ‰å…³å›½é™…å…»è€é‡‘æœåŠ¡çš„æ•°æ®ã€ä¿¡æ¯å’Œå†…å®¹ï¼Œä½†æ‚¨ä¸åº”è¯¥å°†ä»»ä½•æ­¤ç±»ä¿¡æ¯è§£é‡Šä¸ºæŠ•èµ„ã€è´¢åŠ¡ã€ç¨ŽåŠ¡ã€æ³•å¾‹æˆ–å…¶ä»–å»ºè®®ã€‚</p>
                    			<p> åœ¨æ ¹æ®æ­¤ç±»æ•°æ®ã€ä¿¡æ¯æˆ–å†…å®¹è¿›è¡Œä»»ä½•å†³ç­–ä¹‹å‰ï¼Œæ‚¨å°†ç‹¬è‡ªè´Ÿè´£è¯„ä¼°ä¸Žæœ¬è½¯ä»¶ä¸Šçš„æˆ–ç”±ä»»ä½•å…»è€é‡‘æä¾›è€…æä¾›ç»™æ‚¨çš„ä»»ä½•æ•°æ®ã€ä¿¡æ¯æˆ–å†…å®¹ä½¿ç”¨ç›¸å…³çš„ä¼˜ç‚¹å’Œé£Žé™©ã€‚</p>
                    			<p> ä¸ºäº†äº¤æ¢ä½¿ç”¨è¿™äº›æ•°æ®ã€ä¿¡æ¯æˆ–å†…å®¹ï¼Œæ‚¨åŒæ„ä¸è®©GPAã€KBRå…¬å¸ã€å…»è€é‡‘æä¾›è€…æˆ–å…¶ä»£ç†äººã€å‘˜å·¥å’Œå®˜å‘˜å¯¹æ ¹æ®GPAæˆ–å…»è€é‡‘æä¾›è€…ã€å…¶å­å…¬å¸ã€ç›¸å…³å…¬å¸åŠå…¶åŽ†å²å®žä½“æä¾›ç»™æ‚¨çš„ä¿¡æ¯æ‰€ä½œå‡ºçš„ä»»ä½•å†³å®šæ‰€é€ æˆçš„ä»»ä½•å¯èƒ½çš„æŸå®³ç´¢èµ”è´Ÿè´£ã€‚</p>

                   				<p>GPAå¯¹ç”³è¯·äººæˆ–å…»è€é‡‘æä¾›è€…æä¾›çš„ä¿¡æ¯çš„å‡†ç¡®æ€§ä¸ä½œä»»ä½•ä¿è¯ï¼Œä¹Ÿä¸æ‰¿æ‹…ä»»ä½•è´£ä»»ã€‚</p>

                    			<p><b>è´¹ç”¨</b></p>
                    			<p>GPAåªæœ‰åœ¨æ‚¨èŽ·å¾—å¹¶æ”¶åˆ°å…»è€é‡‘æ”¶ç›Šçš„æƒ…å†µä¸‹æ‰å‘æ‚¨æ”¶å–è´¹ç”¨ã€‚å¦‚æžœGPAä¸ºæ‚¨èŽ·å¾—æ”¶ç›Šï¼Œæ‚¨ç‰¹æ­¤åŒæ„æ”¯ä»˜ä¸Žæ‚¨æ”¶åˆ°çš„å‰ä¸¤ä¸ªæœˆå…»è€é‡‘æ”¶ç›Šç›¸åŒçš„ä¸€æ¬¡æ€§è´¹ç”¨ã€‚</p>
                   				<p> æ¬¾é¡¹æ˜¯åœ¨é¦–æ¬¡æ”¶åˆ°æ”¶ç›ŠåŽä¹åï¼ˆ90ï¼‰å¤©å†…æ”¯ä»˜ã€‚</p>

                    			<p><b>å…è´£å£°æ˜Žå’Œè´£ä»»é™åˆ¶</b></p>
                    			<p>æ‚¨æ˜Žç¡®ç†è§£å¹¶åŒæ„ï¼š</p>

                    			<p>æ‚¨å¯¹è½¯ä»¶çš„ä½¿ç”¨æ˜¯æŒ‰&ldquo;åŽŸæ ·&rdquo;å’Œ&ldquo;å¯ç”¨&rdquo;æä¾›ã€‚</p>
                    			<p> åœ¨é€‚ç”¨æ³•å¾‹å…è®¸çš„æœ€å¤§èŒƒå›´å†…ï¼ŒGPAæ˜Žç¡®è¡¨ç¤ºä¸å¯¹è½¯ä»¶ä»¥åŠè½¯ä»¶ä¸Šæä¾›çš„ä»»ä½•äº§å“æˆ–æœåŠ¡ï¼ˆæ— è®ºæ˜¯æ˜Žç¤ºçš„è¿˜æ˜¯éšå«çš„ï¼‰ï¼ŒåŒ…æ‹¬ä½†ä¸é™äºŽéšå«çš„é€‚é”€æ€§ä¿è¯ï¼Œç‰¹å®šç›®çš„å’Œä¸ä¾µæƒçš„é€‚åˆæ€§ã€‚</p>
                    			<p> GPAä¸ä¿è¯ï¼š</p>
							</Col>
            			</Col>
            			<Col xs={12} md={12}>
							<ol>
								<li>è¯¥è½¯ä»¶å°†æ»¡è¶³æ‚¨çš„è¦æ±‚;</li>
								<li>è¯¥è½¯ä»¶å°†ä¸é—´æ–­ï¼ŒåŠæ—¶ï¼Œæ— ç—…æ¯’ã€é”™è¯¯ã€è •è™«ã€æ—¥æœŸç‚¸å¼¹ã€æ—¶é—´ç‚¸å¼¹æˆ–å…¶ä»–æœ‰å®³ç»„ä»¶;</li>
								<li>å¯ä»¥ä»Žè½¯ä»¶ä½¿ç”¨èŽ·å¾—çš„ç»“æžœå°†æ˜¯å‡†ç¡®æˆ–å¯é çš„;</li>

								<li>æ‚¨é€šè¿‡è½¯ä»¶è´­ä¹°æˆ–èŽ·å¾—çš„ä»»ä½•äº§å“ã€æœåŠ¡ã€ä¿¡æ¯æˆ–å…¶ä»–ææ–™çš„è´¨é‡å°†æ»¡è¶³æ‚¨çš„æœŸæœ›;</li>

								<li>è½¯ä»¶ä¸Šçš„ä»»ä½•é”™è¯¯éƒ½å°†å¾—åˆ°çº æ­£;å’Œ</li>
								<li>åœ¨è½¯ä»¶ä¸Šå‘ˆçŽ°æˆ–æ˜¾ç¤ºçš„æ•°æ®å’Œææ–™æ˜¯æ­£ç¡®çš„ã€å‡†ç¡®çš„æˆ–å¯é çš„ã€‚é€šè¿‡ä½¿ç”¨è½¯ä»¶ä¸‹è½½æˆ–ä»¥å…¶ä»–æ–¹å¼èŽ·å–çš„ä»»ä½•å†…å®¹æˆ–æ•°æ®éƒ½æ˜¯ç”±æ‚¨è‡ªè¡Œå†³å®šå¹¶æ‰¿æ‹…é£Žé™©ã€‚</li>
								<li> æ‚¨å¯¹äºŽè®¡ç®—æœºç³»ç»Ÿçš„ä»»ä½•æŸåæˆ–ä¸‹è½½ä»»ä½•æ­¤ç±»å†…å®¹é€ æˆçš„æ•°æ®ä¸¢å¤±å°†å…¨æƒè´Ÿè´£ã€‚</li>

							</ol>
						</Col>
            			<Col xs={12} md={12}>
                        	<p>æ‚¨åŒæ„ï¼Œåœ¨è½¯ä»¶ä¸Šæˆ–é€šè¿‡è½¯ä»¶å‘æ‚¨æä¾›æœåŠ¡çš„GPAã€KBR Inc.æˆ–ä»»ä½•ç¬¬ä¸‰æ–¹ï¼Œä¸å¯¹ç”±äºŽç›—çªƒã€æœªç»æŽˆæƒçš„è®¿é—®ã€ç³»ç»Ÿæ•…éšœã€é€šä¿¡çº¿è·¯æ•…éšœæˆ–éž GPA æˆ–æ­¤ç±»ç¬¬ä¸‰æ–¹æ‰€èƒ½æŽ§åˆ¶çš„å…¶ä»–äº‹ä»¶å¯¼è‡´çš„ä»»ä½•æŸå¤±è´Ÿè´£ã€‚</p>

                        	<p>æ— è®ºæ˜¯æ‚¨ä»ŽGPAã€GPAå‘˜å·¥æˆ–ä»£ç†å•†ï¼Œè¿˜æ˜¯ä»Žè½¯ä»¶èŽ·å¾—çš„ä»»ä½•å»ºè®®æˆ–ä¿¡æ¯ï¼Œæ— è®ºæ˜¯ä¹¦é¢çš„è¿˜æ˜¯å£å¤´çš„ï¼Œå‡ä¸æž„æˆæœ¬æ¡æ¬¾å’Œæ¡ä»¶ä¸­æœªæ˜Žç¡®è¯´æ˜Žçš„ä»»ä½•ä¿è¯ã€‚GPAä¸å¯¹ä»»ä½•ç›´æŽ¥ã€é—´æŽ¥ã€å¶ç„¶ã€ç‰¹æ®Šã€åŽæžœæ€§æˆ–ç¤ºèŒƒæ€§çš„æŸå®³èµ”å¿è´Ÿè´£ï¼ŒåŒ…æ‹¬ä½†ä¸é™äºŽåˆ©æ¶¦ã€æ”¶ç›Šã€æ”¶å…¥ã€å•†èª‰ã€ä½¿ç”¨ã€æ•°æ®æŸå¤±æˆ–å…¶ä»–æ— å½¢æŸå¤±ï¼Œé€ æˆè¿™ç§åŽæžœçš„åŽŸå› æ˜¯ï¼š</p>
						</Col>
						<Col xs={12} md={12}>
							<ol>
								<li>ä½¿ç”¨æˆ–æ— æ³•ä½¿ç”¨è½¯ä»¶;</li>
								<li>ç”±è´­ä¹°æˆ–èŽ·å¾—çš„ä»»ä½•è´§ç‰©ã€æ•°æ®ã€ä¿¡æ¯æˆ–æœåŠ¡æˆ–æ”¶åˆ°çš„æ¶ˆæ¯æˆ–æ‰€è¾¾æˆçš„ï¼Œé€šè¿‡æˆ–æ¥è‡ªè½¯ä»¶çš„äº¤æ˜“äº§ç”Ÿçš„æ›¿ä»£å•†å“å’ŒæœåŠ¡çš„é‡‡è´­æˆæœ¬;</li>

								<li>ç”±äºŽæ‚¨çš„è¡Œä¸ºã€ä¸ä½œä¸ºæˆ–ç–å¿½è€Œå¯¼è‡´çš„å­˜å–æˆ–æ›´æ”¹æ‚¨çš„ä¼ è¾“æˆ–æ•°æ®;</li>
								<li>ä»»ä½•ç¬¬ä¸‰æ–¹çš„é™ˆè¿°æˆ–è¡Œä¸º;æˆ–è€…</li>
								<li>ä¸Žè½¯ä»¶ç›¸å…³çš„ä»»ä½•å…¶ä»–äº‹é¡¹ã€‚<br /> </li>
							</ol>
						</Col>
						<Col xs={12} md={12}>
                    		<p><b>ä¿éšœ</b></p>
                   			<p>æ‚¨åŒæ„èµ”å¿ï¼Œå¹¶ä½¿GPAã€KBRå…¬å¸ä»¥åŠä»»ä½•å’Œæ‰€æœ‰å…»è€é‡‘æä¾›è€…åŠå…¶å…³è”å…¬å¸ã€é«˜çº§èŒå‘˜ã€è‘£äº‹ã€å‘˜å·¥å’Œä»£ç†äººå…å—ä»»ä½•å’Œæ‰€æœ‰ç´¢èµ”ã€è´£ä»»ã€æŸå®³èµ”å¿ã€æŸå¤±æˆ–è´¹ç”¨ï¼ŒåŒ…æ‹¬ç”±æ‚¨æˆ–ä¸Žæ‚¨è®¿é—®æˆ–ä½¿ç”¨æœ¬è½¯ä»¶çš„ä»»ä½•æ–¹å¼å’Œ/æˆ–æ‚¨èŽ·å¾—æˆ–æ‹’ç»çš„æ”¶ç›Šç›¸å…³è”æ‰€äº§ç”Ÿçš„å¾‹å¸ˆè´¹ç”¨ã€‚</p>
                    			termsandcontionApp
						</Col>
            <br/>
            			<Col xs={12} md={12}>
                    		<p><b>æ•´ä½“æ€§å’Œå¯åˆ†å‰²æ€§</b></p>
                    		<p>å¦‚æžœè¿™äº›æ¡æ¬¾å’Œæ¡ä»¶çš„ä»»ä½•æ¡æ¬¾è¢«è§†ä¸ºéžæ³•ã€æ— æ•ˆæˆ–ç”±äºŽä»»ä½•åŽŸå› ä¸å¯æ‰§è¡Œï¼Œåˆ™è¯¥æ¡æ¬¾å°†è¢«è§†ä¸ºä¸Žæœ¬æ¡æ¬¾å’Œæ¡ä»¶åˆ†å¼€ï¼Œä¸ä¼šå½±å“å…¶ä½™æ¡æ¬¾çš„æœ‰æ•ˆæ€§å’Œå¯æ‰§è¡Œæ€§ã€‚</p>
                    		<p> è¿™äº›æ¡æ¬¾å’Œæ¡ä»¶ä»£è¡¨GPAå’Œç”³è¯·äººä¹‹é—´çš„å…¨éƒ¨åè®®ã€‚</p>
						</Col>
            <br/>
            			<Col xs={12} md={12}>
                		    <p><b>ç¬¬ä¸‰æ–¹</b></p>
                		    <p>ç”³è¯·äººåŒæ„ï¼ŒGPAå¯ä»¥é€šè¿‡ç”µå­é‚®ä»¶æˆ–ç±»ä¼¼çš„ç”µå­é€šä¿¡ä¸Žæ‚¨æ²Ÿé€šï¼Œå…¶ä¸­å¯èƒ½åŒ…æ‹¬æ‚¨å¯èƒ½æ„Ÿå…´è¶£çš„ç¬¬ä¸‰æ–¹ä¿¡æ¯ã€‚</p>
                		    <p> GPAä¸ä¼šä¸Žæ‚¨çš„å…»è€é‡‘è®¡åˆ’ç®¡ç†å‘˜ä»¥å¤–çš„ç¬¬ä¸‰æ–¹å…±äº«æ‚¨çš„ä¿¡æ¯ï¼ŒåŒ…æ‹¬æ‚¨çš„å§“åã€åœ°å€ã€ç”µè¯å·ç æˆ–ç”µå­é‚®ä»¶ã€‚</p>
						</Col>
            <br/>
            			<Col xs={12} md={12}>
                		    <p><b>é€‚ç”¨æ³•å¾‹å’Œåœ°ç‚¹</b></p>
                		    <p>é™¤éžå¦æœ‰è§„å®šï¼ŒGPAå°†ä»Žç¾Žåˆ©åšåˆä¼—å›½çŠ¹ä»–å·žçš„åŠžäº‹å¤„ç®¡ç†å’Œæ“ä½œæœ¬è½¯ä»¶ã€‚</p>
                		    <p> GPAä¸å£°ç§°æœ¬è½¯ä»¶ä¸­çš„ææ–™é€‚åˆæˆ–å¯ç”¨äºŽæ‰€æœ‰åœ°æ–¹ã€‚å¦‚æžœæ‚¨é€‰æ‹©ä»Žå…¶ä»–åœ°æ–¹è®¿é—®æœ¬è½¯ä»¶ï¼Œåˆ™ä¸»åŠ¨è¿›è¡Œæ­¤æ“ä½œï¼Œå¹¶ä¸”æ‚¨æœ‰è´£ä»»éµå®ˆä¸Šè¿°ä»»ä½•é€‚ç”¨çš„å½“åœ°æ³•å¾‹ã€‚</p>
                		    <p> è®¿é—®æœ¬è½¯ä»¶æ—¶ï¼Œæ‚¨åŒæ„ï¼Œä¸è€ƒè™‘æ³•å¾‹å†²çªçš„åŽŸåˆ™ï¼Œç¾Žåˆ©åšåˆä¼—å›½çŠ¹ä»–å·žçš„æ³•å¾‹ï¼Œå°†é€‚ç”¨äºŽæœ¬æ¡æ¬¾å’Œæ¡ä»¶ä»¥åŠæ‚¨ä¸ŽGPAæˆ–å…¶é™„å±žå…¬å¸ä¹‹é—´å¯èƒ½å‡ºçŽ°çš„ä»»ä½•äº‰è®®ã€‚</p>
               			    <p> å¦‚æžœæ‚¨é‡‡å–ä¸Žè¿™äº›æ¡æ¬¾å’Œæ¡ä»¶ç›¸å…³çš„æ³•å¾‹è¡ŒåŠ¨ï¼Œæ‚¨åŒæ„ä»…åœ¨çŠ¹ä»–å·žç¬¬ä¸‰å¸æ³•å·¡å›žæ³•é™¢æˆ–ç¾Žå›½çŠ¹ä»–å·žåœ°åŒºæ³•é™¢æèµ·è¯‰è®¼ï¼Œä¸ºäº†èµ·è¯‰ä»»ä½•æ­¤ç±»è¡Œä¸ºï¼Œæ‚¨åŒæ„å¹¶æœä»Žè¿™äº›æ³•é™¢çš„ä¸“å±žä¸ªäººç®¡è¾–æƒã€‚</p>
						</Col>
            		</Col>
				</Col>
			
            </Row>
        </Grid>
		<Grid className="tc-form-view" id="tc-form-view">
            <Row>
           		<p className="PageAlignpdf1">
            	<Col md={4}>
            		<b><label>First Name: {this.state.FirstName}</label></b>
            	</Col><br />
            	</p>
            	<Col md={4}>
           			 <b><label>First Name: {this.state.FirstName}</label></b>
            	</Col><br />
            	<Col md={4}>
           			 <b><label>Middle Name: {this.state.MiddleName}</label></b>
            	</Col><br />
            	<Col md={4}>
            		<b><label>Last Name: {this.state.LastName}</label></b>
            	</Col><br />
            
            	<Col md={4}>
            		<b><label>Current Date: {maxDate.toDateString()}</label></b>
            	</Col><br />
            	<Col md={4}>
            		<b><label>Signed By: {this.state.SignedBy}</label></b>
            	</Col><br />
            	<Col md={4}>
            		<b><label>Name: {this.state.Name}</label></b>
            	</Col><br /><br /> 
            </Row>
        </Grid>

        <Grid className="tc-form" id="tc-form">
            <Row className="show-grid">
            	<Col xs={2} md={1}>
            	</Col>
            	<Col xs={12} md={10}>
           			<Col xs={12} md={12}>
           				<Col xs={12} md={4} className="input-fileds" >
           					 <TextField className="CS-First" hintText="Enter your First Name" floatingLabelText={<span>First Name<span className="manatoryfield">&nbsp;*</span></span>} value={this.state.FirstName} onChange={this.handleFirstName.bind(this)} />
           				</Col>
            			<Col xs={12} md={4} className="input-fileds" >
            				<TextField className="CS-Middle"
           					hintText="Enter your Middle Name"
            				floatingLabelText="Middle Name"
            				value={this.state.MiddleName}
            				onChange={this.handleMiddleName.bind(this)}
            				/>
            			</Col>
            			<Col xs={12} md={4} className="input-fileds" >
            				<TextField className="CS-Last" hintText="Enter your Last Name" floatingLabelText={<span>Last Name<span className="manatoryfield">&nbsp;*</span></span>} value={this.state.LastName} onChange={this.handleLastName.bind(this)} />
            			</Col>
            		</Col>
           			<Col xs={12} md={12}>
            			<Col xs={12} md={4} className="input-fileds" >
            				<DatePicker className="TC-datepicker" floatingLabelText={<span>Current Date<span className="manatoryfield">&nbsp;*</span></span>}
            				//onChange={this.handleChangeMaxDate}
            				disabled={true}
            				value={this.state.maxDate}
            				locale="en-US"
            				firstDayOfWeek={0}
            				/>
            			</Col>
            			<Col xs={12} md={4} className="input-fileds" >
            				<SelectField
            				className="reg-text"
            				value={this.state.SignedBy}
           					onChange={this.handleChangeTitle}
            				floatingLabelText={<span>SignedBy<span className="manatoryfield">&nbsp;*</span></span>} >
            				<MenuItem value={"Current Employee"} primaryText="Current Employee" />
            				<MenuItem value={"Previous Employee"} primaryText="Previous Employee" />
            				<MenuItem value={"Spouse"} primaryText="Spouse" />
            				</SelectField>
            			</Col>
            			<Col xs={12} md={4} className="input-fileds">
            				<TextField hintText="Enter Your Name" floatingLabelText={<span>Name<span className="manatoryfield">&nbsp;*</span></span>} value={this.state.Name} onChange={this.handleName.bind(this)} />
            			</Col>
            		</Col>
            		<Col xs={12} md={12}>
           				 <Col xs={12} md={4} className="TC-label" >

            			</Col>
            			<Col xs={12} md={4} className="input-fileds Sign" >
            				<label>Signature</label>
           					<SignaturePad clearButton="true" ref={ref => this.signaturePad = ref} />
            			</Col>
            			<Col xs={12} md={4}>
            			</Col>
            		</Col>
            	</Col>
            </Row>
        </Grid>

    </div>
</Grid>        
            </div>
            <Grid>

            <div className="TC-Checkbox" >
            <Row>
                <Col xs={12} md={12}>
                    <Col md={6} className="Checkalign">
                        <Checkbox label="I have read and agree to the Terms and Conditions. " value={this.state.ischecked} onClick={this.handleCheck.bind(this)} style={styles.checkbox} />
                    </Col>

                {/* <a href='/WelcomePage'> <RaisedButton label="Continue" disabled={true} primary={true} disabled={!this.state.code} /></a> */}
                    <Col md={6} className="Checkalign1">
                        <Button className="TC-button" disabled={!isEnabled} onClick={this.pdfToHTML}>CONTINUE </Button>
                    </Col>
                </Col>
            </Row>
        </div>
    </Grid>

    
    </div>
 );
 }
}
export default TermsAndConditionCN;