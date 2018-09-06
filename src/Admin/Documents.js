import React, { Component } from 'react';

//Material UI Component
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper/Paper';
import MenuItem from 'material-ui/MenuItem';
import EmployeeIcon from 'material-ui/svg-icons/action/description';
import SvgIcon from 'material-ui/SvgIcon';
import BackIcon from 'material-ui/svg-icons/content/reply';

//Bootstrap Component
import { Row, Col, Button } from 'react-bootstrap';

//API Calling Method
import axios from 'axios';

//Bootstrap Table
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

//Flex
import { Flex } from 'react-flex-material';

//Routing
import history from '../Routing/history';

//Notification 
import Notifications, { notify } from 'react-notify-toast';

const DocumentTypes = [];

const Documenttransc = [
	<MenuItem value={"S"} key={1} primaryText={"Send"} />,
	<MenuItem value={"R"} key={2} primaryText={"Recieve"} />,
	<MenuItem value={"B"} key={3} primaryText={"Both"} />,
];

const HomeIcon = (props) => (
	<SvgIcon {...props}>
		<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
	</SvgIcon>
);

const table2Options = {
	sizePerPage: 5,
};

class Documents extends Component {
	constructor() {
		super();

		this.state = {
			BtnName: "Save",
			tableData: [],
			DocumentCode: "",
			DocumentName: '',
			DocumentType: '',
			Description: '',
			IsActive: 'Y',
			DocumentTransactionType: '',
			isValidDocumentCode: false,
			isValidDocumentName: false,
			isValidDocumentType: false,
			isValidDocumentTransactionType: false
		}
		this.handleDocumentRead(this);
		this.handleDocType(this);
	}

	cellButton(cell, row, enumObject, rowIndex) {
		return (
			<div>
				<Button bsStyle="warning" onClick={() => this.handleDocEdit(row.DocumentID)} title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Button>
				<Button bsStyle="danger" onClick={() => this.handledeleteDocument(row.DocumentID)} title="Delete"><i class="fa fa-trash" aria-hidden="true"></i></Button>
			</div>
		)
	}

	handleReset() {
		this.setState({
			DocumentCode: "",
			DocumentName: '',
			DocumentType: '',
			Description: '',
			IsActive: 'Y',
			DocumentTransactionType: '',
			BtnName: "Save",
			isValidDocumentCode: false,
			isValidDocumentName: false,
			isValidDocumentType: false,
			isValidDocumentTransactionType: false,
		})
		this.handleDocumentRead(this);
	}

	handleDocumentCode(e) {
		const onlyNums = e.target.value.replace(/[^A-z]/g, '');
		if (onlyNums.length < 4) {
			this.setState({ DocumentCode: onlyNums });
		}
	}

	handleDocumentName(e) {
		this.setState({ DocumentName: e.target.value });
	}

	handleChangeDocumentType(event, index, value) {
		this.setState({ DocumentType: value });
	};

	// handleChangeDocumentType(e, index, value) {
	//     this.setState({ DocumentType: value },()=>{this.handleDocType(this);});               
	// };

	handleChangeIsActive = (e, index, value) => {
		this.setState({ IsActive: value });
	}

	handleChangeDescription(e) {
		this.setState({ Description: e.target.value });
	}

	handleChangeDocumentTransactionType = (e, index, value) => {
		this.setState({ DocumentTransactionType: value });
	}

	handleValidateForm(event) {
		const { validationError } = this.state;
		let validForm = false;
		var validDocumentCode = false;
		var validDocumentName = false;
		var validDocumentType = false;
		var validDocumentTransactionType = false;

		if (this.state.DocumentCode.length > 0) {
			this.setState({ isValidDocumentCode: false });
			validDocumentCode = true;
		}
		else {
			this.setState({ isValidDocumentCode: true });
			validDocumentCode = false;
		}
		//Start of Document Name validation
		if (this.state.DocumentName.length > 0) {
			this.setState({ isValidDocumentName: false });
			validDocumentName = true;
		}
		else {
			this.setState({ isValidDocumentName: true });
			validDocumentName = false;

		}
		//End od Document Name validation
		//Start of Document type Validation
		if (this.state.DocumentType != "") {
			// alert("qewd");
			this.setState({ isValidDocumentType: false });
			validDocumentType = true;
		}
		else {
			this.setState({ isValidDocumentType: true });
			validDocumentType = false;
		}
		//End of Document Type validation
		//Start of DocumentTransaction Type validation
		if (this.state.DocumentTransactionType != "") {
			// alert("qewd");
			this.setState({ isValidDocumentTransactionType: false });
			validDocumentTransactionType = true;
		}
		else {
			this.setState({ isValidDocumentTransactionType: true });
			validDocumentTransactionType = false;
		}
		//End of DocumentTransaction type validation.
		if (validDocumentCode && validDocumentName && validDocumentType && validDocumentTransactionType) {
			validForm = true;
		}
		else {
			validForm = false;
		}
		return validForm;
	}

	handleSubmit(event) {
		event.preventDefault();
		var QName = (this.state.BtnName) == "Save" ? "DocumentsSave" : "DocumentsUpdate";;
		var thisObj = this;
		var isvalid = this.handleValidateForm(this);
		if (isvalid) {
			// let documentAPIUrl = " https://s5hhbv0h4j.execute-api.us-west-2.amazonaws.com/dev/GPA_DocumentsDetails_Lambda"
			let documentAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda"
			let documentJSONData = JSON.stringify({
				QueryName: QName,
				DocumentID: this.state.DocumentID,
				DocumentName: this.state.DocumentName,
				DocumentCode: this.state.DocumentCode,
				DocumentTypeID: this.state.DocumentType,
				Description: this.state.Description,
				DocTranType: this.state.DocumentTransactionType,
				IsActive: this.state.IsActive

			});
			let AxiosHeaderConfig = {
				"Content-Type": "application/json",
				"Access-Control-Request-Headers": "*",
				"Access-Control-Request-Method": "*",
			}
			axios({
				method: "POST",
				url: documentAPIUrl,
				data: documentJSONData,
				headers: AxiosHeaderConfig,

			}).then((data) => {
				notify.show("Saved Successfully", "success", 3000);
				thisObj.handleReset(this);
			}).catch((err) => {

			})
		}
		else {
			notify.show("Please Fill Mandatory Fields", "error", 3000);
		}
	}
	handleDocEdit(event) {
		this.setState({ BtnName: "Update" });
		this.setState({ DocumentID: event });
		var thisObj = this;
		// let documentEditAPIUrl = "https://s5hhbv0h4j.execute-api.us-west-2.amazonaws.com/dev/GPA_DocumentsDetails_Lambda";
		let documentEditAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
		let documentJSONData = JSON.stringify(
			{
				QueryName: "DocumentsEdit",
				DocumentID: event
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
			url: documentEditAPIUrl,
			data: documentJSONData
			//headers:AxiosHeaderConfig
		}).then(({ data }) => {

			for (var i = 0; i < data.length; i++) {
				thisObj.setState({ DocumentCode: data[i].DocumentCode });
				thisObj.setState({ DocumentType: data[i].DocumentTypeID });
				thisObj.setState({ DocumentName: data[i].DocumentName });
				thisObj.setState({ DocumentType: data[i].DocumentTypeID });
				thisObj.setState({ Description: data[i].Description });
				thisObj.setState({ DocumentTransactionType: data[i].DocTranType });
				thisObj.setState({ IsActive: data[i].IsActive });

			}
			console.log(this.setState.DocumentCode);
		}).catch((err) => {

		})
	}

	handleDocumentRead(event) {
		// let documentReadAPIUrl = "https://s5hhbv0h4j.execute-api.us-west-2.amazonaws.com/dev/GPA_DocumentsDetails_Lambda"
		let documentReadAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda"
		let documentJSONData = JSON.stringify({
			QueryName: "DocumentsRead",
			// QueryName: "Read",
		});
		let AxiosHeaderConfig = {
			"Content-Type": "application/json",
			"Access-Control-Request-Headers": "*",
			"Access-Control-Request-Method": "*",
		}
		axios({
			method: "POST",
			url: documentReadAPIUrl,
			data: documentJSONData,
			headers: AxiosHeaderConfig,

		}).then((data) => {
			this.setState({ tableData: data.data });
		}).catch((err) => {

		})
	}

	handleDocType(event) {
		// let documentReadAPIUrl = "https://s5hhbv0h4j.execute-api.us-west-2.amazonaws.com/dev/GPA_DocumentsDetails_Lambda"
		let documentReadAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda"
		let documentJSONData = JSON.stringify({
			QueryName: "DocumentsDocumentType",
		});
		let AxiosHeaderConfig = {
			"Content-Type": "application/json",
			"Access-Control-Request-Headers": "*",
			"Access-Control-Request-Method": "*",
		}
		axios({
			method: "POST",
			url: documentReadAPIUrl,
			data: documentJSONData,
			headers: AxiosHeaderConfig,

		}).then(({ data }) => {
			DocumentTypes.length = 0;
			for (let i = 0; i < data.length; i++) {
				DocumentTypes.push(<MenuItem value={data[i].DocumentTypeID} key={i} primaryText={data[i].DocumentType} />);
			}
		}).catch((err) => {

		})
	}

	handledeleteDocument(event) {
		var thisObj = this;
		// let documentDeleteAPIUrl = "https://s5hhbv0h4j.execute-api.us-west-2.amazonaws.com/dev/GPA_DocumentsDetails_Lambda";
		let documentDeleteAPIUrl = "https://unvzh1qti4.execute-api.us-west-2.amazonaws.com/Dev/GPA_AdminModule_Lambda";
		let documentJSONData = JSON.stringify(
			{
				QueryName: "DocumentsDelete",
				DocumentID: event
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
			url: documentDeleteAPIUrl,
			data: documentJSONData
			//headers:AxiosHeaderConfig

		}).then((data) => {
			notify.show("Record has been deleted successfully", "success", 3000);
			thisObj.handleReset(this);
		}).catch((err) => {

		})
	}

	handleNavDashboard() {
		history.push('/AdminDashboard');
	}

	render() {
		const { tableData } = this.state;
		return (
			<div className="main-wrapper">
				<div className="HeaderTile">
					<Flex className="show-grid" layout="row">
						<Flex flex="none">
							<div className="TitleIcon">
								<h4><span className="TitleIconColor">{<EmployeeIcon />}</span><span className="TitleTexColor">Document</span></h4>
							</div>
						</Flex>
						<Flex flex layout align="end center">
							<div>
								<h5><span className="BreadCrumbsClass"><BackIcon /></span>&nbsp;&nbsp;<b><span onClick={this.handleNavDashboard.bind(this)} className="ActiveClass">Home / Dashboard</span></b></h5>
							</div>
						</Flex>
					</Flex>
				</div>
				<Paper zDepth={1} className="AdminDashboardDiv">
					<h2 className="legendtitle">Document Details </h2>
					<div className="fieldstyle">
						<Row className="show-grid">
							<Col xs={12} md={12} >
								<Col xs={12} md={4} className="input-fileds">
									<TextField hintText="Enter Document Code"
										disabled={this.state.BtnName == "Update"}
										floatingLabelText={<span>Document Code<span className="manatoryfield">*</span></span>}
										value={this.state.DocumentCode.toUpperCase()}
										onChange={this.handleDocumentCode.bind(this)}
										errorText={this.state.isValidDocumentCode ? "Please Enter Document Code" : null}
									/>
								</Col>
								<Col xs={12} md={4} className="input-fileds">
									<TextField hintText="Enter Document Name"
										floatingLabelText={<span>Document Name<span className="manatoryfield">*</span></span>}
										value={this.state.DocumentName}
										onChange={this.handleDocumentName.bind(this)}
										errorText={this.state.isValidDocumentName ? "Please Enter Document Name" : null}
									/>
								</Col>
								<Col xs={12} md={4} className="input-fileds" >
									<SelectField
										floatingLabelText={<span>Document Type<span className="manatoryfield">*</span></span>}
										value={this.state.DocumentType}
										multiple={false}
										onChange={this.handleChangeDocumentType.bind(this)}
										errorText={this.state.isValidDocumentType ? "Please Select Your Document Type" : null}
									>
										{DocumentTypes}
									</SelectField>
								</Col>
							</Col>
							<Col xs={12} md={12}>
								<Col xs={12} md={4} className="input-fileds">
									<TextField hintText="Description"
										floatingLabelText="Description"
										value={this.state.Description}
										onChange={this.handleChangeDescription.bind(this)}
									/>
								</Col>
								<Col xs={12} md={4} className="input-fileds" >
									<SelectField
										floatingLabelText={<span>Is Active<span className="manatoryfield">*</span></span>} floatingLabelText="IsActive"
										value={this.state.IsActive}
										onChange={this.handleChangeIsActive.bind(this)}
									>
										<MenuItem value={"Y"} primaryText="Yes" />
										<MenuItem value={"N"} primaryText="No" />
									</SelectField>
								</Col>
								<Col xs={12} md={4} className="input-fileds" >
									<SelectField
										floatingLabelText={<span>Document Transaction Type<span className="manatoryfield">*</span></span>}
										value={this.state.DocumentTransactionType}
										onChange={this.handleChangeDocumentTransactionType}
										errorText={this.state.isValidDocumentTransactionType ? "Please Select Document Transaction Type" : null}
									>
										{Documenttransc}
									</SelectField>
								</Col>
							</Col>
							<Col xs={12}>
								<Button onClick={this.handleReset.bind(this)} className="ResetButton" >Reset</Button>
								<Button type="submit" onClick={this.handleSubmit.bind(this)} className="RegButton1">{this.state.BtnName}</Button>
								<Notifications />
							</Col>
						</Row>
					</div>
				</Paper>
				<Paper zDepth={1} className="AdminDashboardDiv">
					<h2 className="legendtitle">Document List</h2>
					<Row className="show-grid" className="AdminDashboardTableDivParDiv">
						<Col xs={12} md={12} className="noPadding">
							<BootstrapTable
								containerStyle={{ width: '100%' }}
								hover={true}
								search={true}
								searchPlaceholder={'search input'}
								keyField='EmployeeID'
								data={tableData}
								striped hover
								pagination={true}
								options={table2Options}
								condensed
							>
								<TableHeaderColumn width={"5%"} dataField="DocumentID">Document ID</TableHeaderColumn>
								<TableHeaderColumn width={"8%"} dataField="DocumentName">Document Name</TableHeaderColumn>
								<TableHeaderColumn width={"5%"} dataField="DocumentCode">Document Code</TableHeaderColumn>
								<TableHeaderColumn width={"5%"} dataField="DocumentType">Document Type</TableHeaderColumn>
								<TableHeaderColumn width={"8%"} dataField="Description">Description</TableHeaderColumn>
								<TableHeaderColumn width={"10%"} dataField="DocTranType">Document Transaction Type</TableHeaderColumn>
								<TableHeaderColumn width={"5%"} dataField="IsActive">IsActive</TableHeaderColumn>
								<TableHeaderColumn width={"5%"} dataField='button' dataFormat={this.cellButton.bind(this)}>Action</TableHeaderColumn>
							</BootstrapTable>
						</Col>
					</Row>
				</Paper>
			</div>
		);
	}
}
export default Documents;