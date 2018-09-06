import React, { Component } from 'react';

//Bootstrap Component
import { Col, Modal, Table, Panel, Row, Button } from 'react-bootstrap';

//Material UI Component
import Paper from 'material-ui/Paper';

//API Calling Method
import axios from 'axios';

//Country JS Importing
import BenQusCanada from './BenQusCanada';
import BenQusUS from './BenQusUS';
import BenQusUK from './BenQusUK';
import BenQusDenmark from './BenQusDenmark';
import BenQusQuebec from './BenQusQuebec';
import BenQusItaly from './BenQusItaly';
import BenQusFrance from './BenQusFrance';
import BenQusJapan from './BenQusJapan';
import BenQusNorway from './BenQusNorway';
import BenNorway from './BenNorway';
import BenQusSouthKorean from './BenQusSouthKorean';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import BenQusSouthKoreaLumpSum from './BenQusSouthKoreaLumpSum';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//Routing
import history from '../Routing/history';

//Redux Data
import { connect } from 'react-redux';
import * as Action from '../Store/Action';

import BenQusAustria from './BenQusAustria';
import BenQusBelgium from './BenQusBelgium';
import BenQusBrazil from './BenQusBrazil';
import BenQusGermany from './BenQusGermany';
import BenQusIreland from './BenQusIreland';
import BenQusNetherlands from './BenQusNetherlands';
import BenQusPortugal from './BenQusPortugal';
import BenQusCommon from './BenQusCommon';

var emailresult;
const API_KEY = "AIzaSyADGT_Xy9rtzFPhH-m0VG5cWL-hi0sK5jA";

const newstyle = {
    marginTop: 10,
}
const style = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
};

var varCountryCode;

class BenefitsQuestionnariePart2 extends Component {
    constructor(props) {
        super(props);
        /* Field State Values Initialization */
        this.state = {
            value: "",
            ageYears: "",
            ageMonths: "",
            DBOMonth: "",
            ApplicantAge: "",
            ApplicantAgeMonth: "",
            BenQusCountryLoadState: "",
            option: false,
            OptionPopup: true,
            pensionOption: ''
        }
        this.handleClose = this.handleClose.bind(this);

    }
    //Handle Event

    //Intial Loading Function
    componentDidMount() {
        emailresult = localStorage.getItem('applicant_email');
        var Params = new URLSearchParams(document.location.search);
        let Mode = Params.get("mode");
        varCountryCode = Params.get("CountryCode");
        if (Params == null || Params == "") {
            this.handleLoadBenQusPart2Country(this);
        }
        else {
            this.handleDirectLoadBenQusPart2Country(this);
        }
    }

    //Load Country Form Function
    handleDirectLoadBenQusPart2Country(event) {
        var varBenQusCountryLoad = varCountryCode;
        if (varBenQusCountryLoad == "CA") {
            this.setState({ BenQusCountryLoadState: <BenQusCanada /> });
        }
        if (varBenQusCountryLoad == "DK") {
            this.setState({ BenQusCountryLoadState: <BenQusDenmark /> });
        }
        if (varBenQusCountryLoad == "FR") {
            this.setState({ BenQusCountryLoadState: <BenQusFrance /> });
        }
        if (varBenQusCountryLoad == "IT") {
            this.setState({ BenQusCountryLoadState: <BenQusItaly /> });
        }
        if (varBenQusCountryLoad == "JP") {
            this.setState({ BenQusCountryLoadState: <BenQusJapan /> });
        }
        if (varBenQusCountryLoad == "QC") {
            this.setState({ BenQusCountryLoadState: <BenQusQuebec /> });
        }
        if (varBenQusCountryLoad == "UK") {
            this.setState({ BenQusCountryLoadState: <BenQusUK /> });
        }
        if (varBenQusCountryLoad == "US") {
            this.setState({ BenQusCountryLoadState: <BenQusUS /> });
        }
        if (varBenQusCountryLoad == "NO") {
            this.setState({ BenQusCountryLoadState: <BenNorway /> })
        }
        if (varBenQusCountryLoad == "KR") {
            console.log("South korea load1");
            this.loadEligibleStatus();
        }
        if (varBenQusCountryLoad == "KRLS") {
            this.setState({ BenQusCountryLoadState: <BenQusSouthKoreaLumpSum /> })
        }
        if (varBenQusCountryLoad == "AT") {
            this.setState({
                BenQusCountryLoadState: <BenQusCommon
                    ApplyForCountry="Austria" country_code={varBenQusCountryLoad}
                    PensionDocID="AST"
                />
            })
        }
        if (varBenQusCountryLoad == "BE") {
            this.setState({
                BenQusCountryLoadState: <BenQusCommon
                    ApplyForCountry="Belgium" country_code={varBenQusCountryLoad}
                    PensionDocID="BLG"
                />
            })
        }
        if (varBenQusCountryLoad == "DE") {
            this.setState({
                BenQusCountryLoadState: <BenQusCommon
                    ApplyForCountry="Germany" country_code={varBenQusCountryLoad}
                    PensionDocID="PAG"
                />
            })
        }
        if (varBenQusCountryLoad == "BR") {
            this.setState({
                BenQusCountryLoadState: <BenQusCommon
                    ApplyForCountry="Brazil" country_code={varBenQusCountryLoad}
                    PensionDocID="PBZ"
                />
            })
        }
        if (varBenQusCountryLoad == "IE") {
            this.setState({
                BenQusCountryLoadState: <BenQusCommon
                    ApplyForCountry="Ireland" country_code={varBenQusCountryLoad}
                    PensionDocID="IPF"
                />
            })
        }
        if (varBenQusCountryLoad == "NL") {
            this.setState({
                BenQusCountryLoadState: <BenQusCommon
                    ApplyForCountry="Netherlands" country_code={varBenQusCountryLoad}
                    PensionDocID="NPF"
                />
            })
        }
        if (varBenQusCountryLoad == "PT") {
            this.setState({
                BenQusCountryLoadState: <BenQusCommon
                    ApplyForCountry="Portugal" country_code={varBenQusCountryLoad}
                    PensionDocID="PPF"
                />
            })
        }
    }

    handleClose() {

        this.setState({ option: false });
    }
    handlePensionOption = (event) => {
        this.setState({ pensionOption: event.target.value }, () => {
            if (this.state.pensionOption == "OAP") {
                this.setState({ BenQusCountryLoadState: <BenQusSouthKorean /> })
                this.setState({ option: false })
            } else if (this.state.pensionOption == "LSR") {
                this.setState({ BenQusCountryLoadState: <BenQusSouthKoreaLumpSum /> })
                this.setState({ option: false })
            }
        });
    }
    loadEligibleStatus() {
        console.log("Entry of API------>");
        let Docurl = "https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let DocIDData = {
            QueryName: "OpenBF2EligibleCountry",
            CountryCode: "KR",
            UserID: emailresult,//emailresult,
        };
        console.log("DocIDData", JSON.stringify(DocIDData));
        SaveDataAPICallMailSend(Docurl, DocIDData)
            .then((data) => {
                console.log("Success SK", data);
                for (let i = 0; i < data.length; i++) {
                    if (data[i].Eligible == "Y") {
                        console.log("Pension Yes");
                        this.setState({ option: true })
                        break;
                    }
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    handleLoadBenQusPart2Country(event) {
        let LoadBenQusCountryAPIUrl = " https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let JSONData = JSON.stringify({
            QueryName: "BenefitsQuestionnariesCountryInGPARead",
            UserID: emailresult,
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
            url: LoadBenQusCountryAPIUrl,
            headers: AxiosHeaderConfig,
        }).then(({ data }) => {
            console.log("Part 2 Data", data);
            var varBenQusCountryLoad = data[0].EligibleCountry;
            if (varBenQusCountryLoad == "CA") {
                this.setState({ BenQusCountryLoadState: <BenQusCanada /> });
            }
            if (varBenQusCountryLoad == "DK") {
                this.setState({ BenQusCountryLoadState: <BenQusDenmark /> });
            }
            if (varBenQusCountryLoad == "FR") {
                this.setState({ BenQusCountryLoadState: <BenQusFrance /> });
            }
            if (varBenQusCountryLoad == "IT") {
                this.setState({ BenQusCountryLoadState: <BenQusItaly /> });
            }
            if (varBenQusCountryLoad == "JP") {
                this.setState({ BenQusCountryLoadState: <BenQusJapan /> });
            }
            if (varBenQusCountryLoad == "QC") {
                this.setState({ BenQusCountryLoadState: <BenQusQuebec /> });
            }
            if (varBenQusCountryLoad == "UK") {
                this.setState({ BenQusCountryLoadState: <BenQusUK /> });
            }
            if (varBenQusCountryLoad == "US") {
                this.setState({ BenQusCountryLoadState: <BenQusUS /> });
            }
            if (varBenQusCountryLoad == "NO") {
                this.setState({ BenQusCountryLoadState: <BenNorway /> })
            }
            if (varBenQusCountryLoad == "KR") {
                console.log("South korea load2");
                this.loadEligibleStatus();
            }
            if (varBenQusCountryLoad == "KRLS") {
                this.setState({ BenQusCountryLoadState: <BenQusSouthKoreaLumpSum /> })
            }
            if (varBenQusCountryLoad == "AT") {
                this.setState({
                    BenQusCountryLoadState: <BenQusCommon
                        ApplyForCountry="Austria" country_code={varBenQusCountryLoad}
                        PensionDocID="AST"
                    />
                })
            }
            if (varBenQusCountryLoad == "BE") {
                this.setState({
                    BenQusCountryLoadState: <BenQusCommon
                        ApplyForCountry="Belgium" country_code={varBenQusCountryLoad}
                        PensionDocID="BLG"
                    />
                })
            }
            if (varBenQusCountryLoad == "DE") {
                this.setState({
                    BenQusCountryLoadState: <BenQusCommon
                        ApplyForCountry="Germany" country_code={varBenQusCountryLoad}
                        PensionDocID="PAG"
                    />
                })
            }
            if (varBenQusCountryLoad == "BR") {
                this.setState({
                    BenQusCountryLoadState: <BenQusCommon
                        ApplyForCountry="Brazil" country_code={varBenQusCountryLoad}
                        PensionDocID="PBZ"
                    />
                })
            }
            if (varBenQusCountryLoad == "IE") {
                this.setState({
                    BenQusCountryLoadState: <BenQusCommon
                        ApplyForCountry="Ireland" country_code={varBenQusCountryLoad}
                        PensionDocID="IPF"
                    />
                })
            }
            if (varBenQusCountryLoad == "NL") {
                this.setState({
                    BenQusCountryLoadState: <BenQusCommon
                        ApplyForCountry="Netherlands" country_code={varBenQusCountryLoad}
                        PensionDocID="NPF"
                    />
                })
            }
            if (varBenQusCountryLoad == "PT") {
                this.setState({
                    BenQusCountryLoadState: <BenQusCommon
                        ApplyForCountry="Portugal" country_code={varBenQusCountryLoad}
                        PensionDocID="PPF"
                    />
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    /* Page Rendering */
    render() {
        return (
            <div>
                <Paper zDepth={1} className="CommonDiv">
                    <Col xs={12} md={12} style={newstyle}>
                        <h4 className="StepperHeading">Benefits Questionnaires Part-II</h4>

                        <div hidden={varCountryCode != "KR"} >
                            <label >Do you wish to apply for an Old Age Pension or a Lump Sum Refund of monies paid already?</label>
                            <RadioButtonGroup valueSelected={this.state.pensionOption} onChange={this.handlePensionOption.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                <RadioButton
                                    value="OAP"
                                    label="Old Age Pension"
                                    style={style.radioButton}
                                    checkedIcon={true}
                                />
                                <RadioButton
                                    value="LSR"
                                    label="Lump Sum Refund"
                                    style={style.radioButton}
                                />
                            </RadioButtonGroup >
                        </div>

                        <div hidden={this.state.BenQusCountryLoadState == ""}>
                            {this.state.BenQusCountryLoadState}
                        </div>
                    </Col>

                </Paper>
                <div>

                    {/* <Modal show={this.state.option} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title> Option</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <label>Do you wish to apply for an Old Age Pension or a Lump Sum Refund of monies paid already?</label>
                            <RadioButtonGroup valueSelected={this.state.pensionOption} onChange={this.handlePensionOption.bind(this)} style={{ display: 'flex', flexDirection: 'row' }}>
                                <RadioButton
                                    value="OAP"
                                    label="Old Age Pension"
                                    style={style.radioButton}
                                    checkedIcon={true}
                                />
                                <RadioButton
                                    value="LSR"
                                    label="Lump Sum Refund"
                                    style={style.radioButton}
                                />
                            </RadioButtonGroup >
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>

                    </Modal>*/}
                </div>
            </div>
        );
    }
}

//call all the API common method
const SaveDataAPICallMailSend = function (mailSendURL, data) {
    var promise = new Promise(function (resolve, reject) {
        axios({
            method: "POST",
            url: mailSendURL,
            data: JSON.stringify(data),

        }).then(({ data }) => {
            resolve(data);
        })
            .catch((err) => {
                reject(err);
            });
    })
    return promise;
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

export default connect(mapReducerStateToProps, mapDispatchToProps)(BenefitsQuestionnariePart2);