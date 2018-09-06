var AWS = require('aws-sdk');

var minipdf = require('minipdf.js');
var minipdf_js = require('minipdf_js.js');
var pako = require('pako.min.js');
var pdfform = require('pdfform.js');
process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];

// From here on just code for this demo.
// This will not feature in your website
var on_error = function (e) {
	console.error(e, e.stack);  // eslint-disable-line no-console
}

var make_pdfform = function () {
	var lib_name = "pdf.js";
	return pdfform((lib_name === 'minipdf') ? minipdf : minipdf_js);
}

var generatePDF = function (buff, data) {
	var filled_pdf; // Uint8Array
	try {
		filled_pdf = make_pdfform().transform(buff, data);
	} catch (e) {
		console.error('make_pdf:' + e.msg);
		return on_error(e);
	}

	return filled_pdf;

}



exports.handler = function (event, context) {
	var BUCKET_NAME = "gpa-dev-mitosis";
	var TEMPLATE_PATH = "";
	var OUTPUT_PATH = "applicant/";
	var LANGUAGE = event.language;
	var COUNTRYCODE = event.countryCode;
	var KEY_NAME = "";
	var DocCategory = event.DocCategory;
	var FCL_TYPE = event.FCLType;

	if (DocCategory == "tc") {
		TEMPLATE_PATH = "template/termscondition/";
		KEY_NAME = "tc_" + LANGUAGE + ".html";
	}
	else if (DocCategory == "paf") {
		TEMPLATE_PATH = "template/pensionapplication/";
		KEY_NAME = "paf_" + LANGUAGE + ".pdf";
	}
	// else if(DocCategory=="fcl")
	// {		
	// 	TEMPLATE_PATH="template/forecastletter/";
	// 	KEY_NAME ="prefcl_"+LANGUAGE+".html";
	// }
	else if (DocCategory == "poa") {
		TEMPLATE_PATH = "template/poa/";
		KEY_NAME = "poa_" + LANGUAGE + ".pdf";
	}
	else if (DocCategory == 'FCL') {
		TEMPLATE_PATH = "template/forecastletter/";
		KEY_NAME = "FCL_" + COUNTRYCODE + "_" + LANGUAGE + ".pdf";
	}
	else if (DocCategory == 'bankform') {
		TEMPLATE_PATH = "template/bankform/";
		KEY_NAME = "bank_" + COUNTRYCODE + "_" + LANGUAGE + ".pdf";
	}
	else if (DocCategory == 'Privateletter') {
		TEMPLATE_PATH = "template/PrivateEligibleletter/";
		KEY_NAME = "Privateletter_" + LANGUAGE + ".pdf";
		//KEY_NAME = "FCL_" + COUNTRYCODE + "_" + LANGUAGE + ".pdf";
	}
	// else if (DocCategory == 'fclKorea') {
	// 	TEMPLATE_PATH = "template/forecast_letter_korea/";
	// 	KEY_NAME = "fcl_korea_" + LANGUAGE + ".pdf";
	// }
	// else if(DocCategory=='fclnew'){
	// 	TEMPLATE_PATH = "template/forecastletternew/";
	// 	KEY_NAME = "FCL_new" + LANGUAGE + ".pdf";
	// }
	else if (DocCategory == 'dl') {
		TEMPLATE_PATH = "template/decisionletter/";
		KEY_NAME = "decisionletter_" + ".pdf";
	}
	else if (DocCategory == "biltrl") {
		TEMPLATE_PATH = "template/countrypension/";
		KEY_NAME = "PensionApplication";
	}
	else if (DocCategory == "genQuesData") {
		TEMPLATE_PATH = "template/questions/";
		KEY_NAME = "genQuesData_" + LANGUAGE + ".pdf";
	} else if (DocCategory == "benQuesData") {
		TEMPLATE_PATH = "template/questions/";
		KEY_NAME = "benQuesData_" + LANGUAGE + ".pdf";
	} else if (DocCategory == "resQuesData") {
		TEMPLATE_PATH = "template/questions/";
		KEY_NAME = "resQuesData_" + LANGUAGE + ".pdf";
	}
	else if (DocCategory == "VoluntaryContributeForm") {
		TEMPLATE_PATH = "template/voluntarycontributionform/";
		KEY_NAME = "voluntarycontribution_" + LANGUAGE + ".pdf";
	} else if (DocCategory == "pafKorea") {
		TEMPLATE_PATH = "template/pension_application_korea/";
		KEY_NAME = "paf_korea_" + LANGUAGE + ".pdf";
	} else if (DocCategory == "LSAKorea") {
		TEMPLATE_PATH = "template/lump_sum_application_korea/";
		KEY_NAME = "lsa_korea_" + LANGUAGE + ".pdf";
	}
	else if (DocCategory == "NorBNKUS") {
		TEMPLATE_PATH = "template/NorwayBankForms/";
		KEY_NAME = "Nor_US" + LANGUAGE + ".pdf";
	} else if (DocCategory == "NorPaf") {
		TEMPLATE_PATH = "template/pension_application_norway/";
		KEY_NAME = "Nor_paf_" + LANGUAGE + ".pdf";
	}
	var html_utf8 = event.html;
	var inputparam = event.params;
	//TC Params
	var firstName = ""
	var middleName = "";
	var lastName = "";
	var signedBy = "";
	var companyName = "";
	var empSignature = "";
	var empId = "";
	//var lang_locale="en";
	var signedbyname = "";
	//FCL Params
	var ninumber = "";
	var Countrycitizenship = "";
	var lastName = "";
	var firstName = "";
	var middleName = "";
	var othersurnames = "";
	var dateofbirth = "";
	var maritalstatus = "";
	var datemarriagedeath = "";
	var Countryaddress = "";
	var dateleftcountry = "";
	var addressCountry = "";
	var eligibleCountry = "";
	var documentid = "";
	//PAF Params
	var qrcode = "";



	if (typeof inputparam != 'undefined' && DocCategory == "poa" && inputparam.hasOwnProperty("empId")) {
		firstName = inputparam.firstName;
		middleName = inputparam.middleName;
		lastName = inputparam.lastName;
		signedBy = inputparam.signedBy;
		companyName = inputparam.companyName;
		empSignature = inputparam.empSignature;
		empId = inputparam.empId;
		var Documentid = inputparam.Documentid;
		//var lang_locale =  inputparam.lang;
		signedbyname = inputparam.signedbyname;


		//if( typeof LANGUAGE != 'undefined')
		//KEY_NAME = "poa_" + LANGUAGE + ".pdf";


		OUTPUT_PATH = OUTPUT_PATH + empId + "/";

		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');

				//console.log('file :', html_utf8);
				let fields = {
					'ApplicantName': [firstName + ' ' + middleName + ' ' + lastName],
					'Documentid': [Documentid]
				}

				var result = generatePDF(html_utf8, fields);

				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);


				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME + ".pdf",
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"
				}

				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });

					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });

					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}

		});

	}
	// Voluntary Contribution Form PDF Form.
	else if (typeof inputparam != 'undefined' && DocCategory == "VoluntaryContributeForm" && inputparam.hasOwnProperty("empId")) {

		var volcontributeinputdata = inputparam.voluntarycontributedata;

		empId = inputparam.empId;
		OUTPUT_PATH = OUTPUT_PATH + empId + "/";

		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');
				let fields = volcontributeinputdata;
				// Need to form the Array list

				var result = generatePDF(html_utf8, fields);
				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);
				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME,
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"
				}
				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });
					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });
					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}

		});

	}
	// End of VC Form.


	// Norway pension form.


	else if (typeof inputparam != 'undefined' && DocCategory == "NorPaf" && inputparam.hasOwnProperty("empId")) {

		var norwaypensionData = inputparam.norwaypensionData;

		empId = inputparam.empId;
		OUTPUT_PATH = OUTPUT_PATH + empId + "/";

		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');
				let fields = norwaypensionData;
				// Need to form the Array list

				var result = generatePDF(html_utf8, fields);
				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);
				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME,
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"
				}
				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });
					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });
					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}

		});

	}

	// end of Norway pension form.

	// south korea bank Form.
	else if (typeof inputparam != 'undefined' && DocCategory == "bankform" && inputparam.hasOwnProperty("empId")) {

		var bankinputdata = inputparam.bankdata;

		empId = inputparam.empId;
		OUTPUT_PATH = OUTPUT_PATH + empId + "/";

		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');
				let fields = bankinputdata;
				// Need to form the Array list

				var result = generatePDF(html_utf8, fields);
				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);
				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME,
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"
				}
				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });
					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });
					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}

		});

	}
	// End of south korea bank form.


	//Norway US Bank Form
	else if (typeof inputparam != 'undefined' && DocCategory == "NorBNKUS" && inputparam.hasOwnProperty("empId")) {

		var NorwayBankUSinputdata = inputparam.NorwayUSBankData;

		empId = inputparam.empId;
		OUTPUT_PATH = OUTPUT_PATH + empId + "/";

		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');
				let fields = NorwayBankUSinputdata;
				// Need to form the Array list

				var result = generatePDF(html_utf8, fields);
				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);
				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME,
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"
				}
				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });
					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });
					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}

		});

	}
	//End of Norway US Bank Form

	//Pension Application PDF form korea
	else if (typeof inputparam != 'undefined' && DocCategory == "pafKorea" && inputparam.hasOwnProperty("empId")) {

		var pensionDataKorea = inputparam.pensiondata;

		empId = inputparam.empId;
		OUTPUT_PATH = OUTPUT_PATH + empId + "/";

		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');
				let fields = pensionDataKorea;
				// Need to form the Array list
				var result = generatePDF(html_utf8, fields);
				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);
				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME,
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"
				}
				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });
					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });
					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}
		});

	}
	// End of pof form for korea.
	else if (typeof inputparam != 'undefined' && DocCategory == "LSAKorea" && inputparam.hasOwnProperty("empId")) {

		var LumpSumDataKorea = inputparam.pensiondata;

		empId = inputparam.empId;
		OUTPUT_PATH = OUTPUT_PATH + empId + "/";

		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');
				let fields = LumpSumDataKorea;
				// Need to form the Array list
				var result = generatePDF(html_utf8, fields);
				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);
				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME,
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"
				}
				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });
					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });
					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}
		});

	}
	// End of pof form for korea.
	// Pension Application PDF Form.
	else if (typeof inputparam != 'undefined' && DocCategory == "paf" && inputparam.hasOwnProperty("empId")) {

		var pensioninputdata = inputparam.pensiondata;

		empId = inputparam.empId;
		OUTPUT_PATH = OUTPUT_PATH + empId + "/";

		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');
				let fields = pensioninputdata;
				// Need to form the Array list

				var result = generatePDF(html_utf8, fields);
				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);
				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME,
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"
				}
				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });
					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });
					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}

		});

	}
	// End of Pension Application Form.
	else if (typeof inputparam != 'undefined' && DocCategory == "FCL" && inputparam.hasOwnProperty("empId")) {

		var forecastform = inputparam.forecastdata;
		empId = inputparam.empId;

		//if( typeof LANGUAGE != 'undefined')
		//KEY_NAME = "poa_" + LANGUAGE + ".pdf";


		OUTPUT_PATH = OUTPUT_PATH + empId + "/";

		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');

				console.log('input data :', forecastform);
				let fields = forecastform;// {'forecastdata':[firstName + ' ' + middleName + ' ' + lastName]}	

				var result = generatePDF(html_utf8, fields);

				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);


				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME + ".pdf",
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"

				}

				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });

					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });

					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}

		});

	} else if (typeof inputparam != 'undefined' && DocCategory == "Privateletter" && inputparam.hasOwnProperty("empId")) {

		var privateformdata = inputparam.privatetdata;
		empId = inputparam.empId;

		//if( typeof LANGUAGE != 'undefined')
		//KEY_NAME = "poa_" + LANGUAGE + ".pdf";


		OUTPUT_PATH = OUTPUT_PATH + empId + "/";

		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');

				console.log('input data :', privateformdata);
				let fields = privateformdata;// {'forecastdata':[firstName + ' ' + middleName + ' ' + lastName]}    

				var result = generatePDF(html_utf8, fields);

				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);


				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME + ".pdf",
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"

				}

				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });

					} else {
						//context.done(null, { status:'success', filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });

					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}

		});

	}

	else if (typeof inputparam != 'undefined' && DocCategory == "dl" && inputparam.hasOwnProperty("empId")) {

		var first = inputparam.Name;
		var Country = inputparam.Country;
		var Countryaddress = inputparam.Address;
		var eligibleCountry = inputparam.Eligible;
		var Documentid = inputparam.DocumentID;

		empId = inputparam.empId;

		//if( typeof LANGUAGE != 'undefined')
		//KEY_NAME = "poa_" + LANGUAGE + ".pdf";


		OUTPUT_PATH = OUTPUT_PATH + empId + "/" + "DecisionLetter" + "/";

		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');
				let fields = {
					'Name': [first],
					'Country': [Country],
					'Address': [Countryaddress],
					'Eligible': [eligibleCountry],
					'DocumentID': [Documentid]
				}


				var result = generatePDF(html_utf8, fields);

				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);


				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME + ".pdf",
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"
				}

				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });

					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });

					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}

		});

	} else if (typeof inputparam != 'undefined' && DocCategory == "biltrl" && inputparam.hasOwnProperty("empId")) {
		var pensionForm = inputparam.pensionData;
		empId = inputparam.empId;
		countryCode = inputparam.countryCode;
		OUTPUT_PATH = OUTPUT_PATH + empId + "/";
		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');
				let fields = pensionForm;
				// Need to form the Array list
				var result = generatePDF(html_utf8, fields);
				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);
				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME + "_" + countryCode + ".pdf",
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"
				}
				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });
					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });
					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}

		});

	}
	else if (typeof inputparam != 'undefined' && DocCategory == "genQuesData" && inputparam.hasOwnProperty("empId")) {

		var genQuesDt = inputparam.genQuesData;

		empId = inputparam.empId;
		OUTPUT_PATH = OUTPUT_PATH + empId + "/";

		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');
				let fields = genQuesDt;
				// Need to form the Array list

				var result = generatePDF(html_utf8, fields);
				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);
				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME + ".pdf",
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"
				}
				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });
					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });
					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}

		});

	} else if (typeof inputparam != 'undefined' && DocCategory == "benQuesData" && inputparam.hasOwnProperty("empId")) {

		var genQuesDt = inputparam.benQuesData;
		empId = inputparam.empId;
		OUTPUT_PATH = OUTPUT_PATH + empId + "/";
		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');
				let fields = genQuesDt;
				// Need to form the Array list

				var result = generatePDF(html_utf8, fields);
				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);
				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME + ".pdf",
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"
				}
				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });
					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });
					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}

		});

	} else if (typeof inputparam != 'undefined' && DocCategory == "resQuesData" && inputparam.hasOwnProperty("empId")) {
		var resQuesData = inputparam.resQuesData;
		empId = inputparam.empId;
		OUTPUT_PATH = OUTPUT_PATH + empId + "/";
		// read data from s3 bucket 
		var params = { Bucket: BUCKET_NAME, Key: TEMPLATE_PATH + KEY_NAME };
		console.log('params:' + params);
		new AWS.S3().getObject(params, function (err, data) {
			if (!err) {
				html_utf8 = data.Body;//.toString('utf-8');
				let fields = resQuesData;
				// Need to form the Array list
				var result = generatePDF(html_utf8, fields);
				var buff = Buffer.from(result);
				console.log('afterreplace :', buff);
				var s3 = new AWS.S3();
				var params = {
					Bucket: BUCKET_NAME,
					Key: OUTPUT_PATH + KEY_NAME + ".pdf",
					Body: buff,
					ContentType: "application/pdf",
					ContentDisposition: "inline"

				}
				s3.putObject(params, function (err, data) {
					if (err) {
						console.log(err)
						context.done(null, { status: 'error', err: err, msg: 'file write error', filename: params.Key });
						context.done(null, { filename: params.Key, content: buff });
					} else {
						//context.done(null, { status:'success',  filename: html_utf8 });
						context.done(null, { status: 'success', filename: params.Key });
					}
				});
			}
			else {
				console.log('params:' + params);
				console.log('file read error:', err);
				context.done(null, { status: 'error', err: err, msg: 'file read error' });
			}

		});
	}


	else {
		console.log('invalid Input param ');
		context.done(null, { status: 'error', msg: 'invalid input parameter' });

	}

};