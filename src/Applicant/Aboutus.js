import React, { Component } from 'react';

//CSS
import '../Style/style.css';

//Bootstrap Component
import { Row, Col } from 'react-bootstrap';

//Material UI Component
import Paper from 'material-ui/Paper';

//API Calling Method
import axios from 'axios';

class Aboutus extends Component {
    constructor() {
        super();

        //State Initialization
        this.state = {
            PageLoadContent: "",
            PageTitle: "",
        }
    }
    //**Handle Event**//

    componentDidMount(e) {
        this.handlePageSetupRead(this);
    }

    //Read Page Content Function
    handlePageSetupRead(event) {
        //let CountryAPIUrl = "https://xljvq5lh79.execute-api.us-west-2.amazonaws.com/dev/GPA_ApplicantPageSetup";
       let CountryAPIUrl=" https://ch06is45h0.execute-api.us-west-2.amazonaws.com/Dev/";
        let CJSONData = JSON.stringify(
            {
                QueryName:"ApplicantPageSetupRead",
               // QueryName: "Read",
                //QueryName:"ApplicantPageSetupRead",
                imagePreviewUrl: "",
            });
        let AxiosHeaderConfig = {
            headers: {
                // accept: 'application/json',
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
                'Content-Type': 'application/json;charset=UTF-8',
                 //"Access-Control-Allow-Origin": "*",
            }
        };
        axios({
            method: "POST",
            url: CountryAPIUrl,
            data: CJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                var pageLoad = data[i].PageLink;
                if (pageLoad == "AboutUs") {
                    this.setState({ PageLoadContent: data[i].Content });
                    this.setState({ PageTitle: data[i].PageTitle });
                }
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    //Page Rendering
    render() {
        return (
            <Paper zDepth={1} className="CommonDiv">
                <h2 className="legendtitle">{this.state.PageTitle}</h2>   
                    <div className="fieldstyle"> 
                        <Row>
                            <div className="CommonContent">
                                <p dangerouslySetInnerHTML={{ __html: this.state.PageLoadContent }} />
                            </div>
                        </Row>
                    </div>
            </Paper>
        );
    }
}

export default Aboutus;