import React, { Component } from 'react';

//CSS
import '../Style/style.css';

//Bootstrap Component
import {  Row } from 'react-bootstrap';

//API Calling Methods
import axios from 'axios';

//Material UI Component
import Paper from 'material-ui/Paper';

class FQA extends Component {
    constructor() {
        super();
        
        //Field State Values Initialization
        this.state = {
            PageLoadContent: "",
            PageTitle: "",
        }
    }

    componentDidMount(){
        this.handlePageSetupRead(this);
    }
    //Handle Event
    handlePageSetupRead(event) {
        let CountryAPIUrl = "https://xljvq5lh79.execute-api.us-west-2.amazonaws.com/dev/GPA_ApplicantPageSetup";
        let CJSONData = JSON.stringify(
            {
                QueryName: "Read",
                imagePreviewUrl: "",
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
            url: CountryAPIUrl,
            data: CJSONData
            //headers:AxiosHeaderConfig

        }).then(({ data }) => {
            
            for (var i = 0; i < data.length; i++) {
                var pageLoad = data[i].PageLink;
                if (pageLoad == "FQA") {                 
                    this.setState({ PageLoadContent: data[i].Content});
                    this.setState({ PageTitle: data[i].PageTitle });
                }
            }
        }).catch((err) => {
            
        })
    }

    //Page Rendering
    render() {
        return (
            <Paper zDepth={1} className="CommonDiv">
                <h2 className="legendtitle">FAQ - Question and Answer</h2>   
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

export default FQA;