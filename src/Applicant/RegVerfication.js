import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import logo from '../img/logo_white.png';
import VerifyIcon from '../img/VerifyIcon.png';

import { Grid, Row, Col, Button } from 'react-bootstrap';


/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
export default class DialogExampleDialogDatePicker extends React.Component {
  state = {
    open: false,
    open1: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  
 
  handleOpen1 = () => {
    this.setState({open: false});
    this.setState({open1: true});
  };

  render() {
    // const actions = [
    //     <FlatButton className="Continuebtn" label="Continue" keyboardFocused={true} onClick={this.handleOpen1} />,
    // ];    

    return (
      <div>
        <RaisedButton label="Before Verification" onClick={this.handleOpen} />
        <Dialog
          title={
              <div className="VerifyDiv">
                  <div className="gpalogo">
                        <img src = {logo} alt="GPA Logo" width="170" height="70"/>
                  </div>
              </div>
          }
        //   actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose} >
          <p className="Verifymsg">The Verification Code is sent to your Email id.  Please enter the Verification Code.</p>
          <TextField className="Verifycode" hintText="Enter Your Verification Code"/>
          <FlatButton className="Continuebtn" label="Continue" keyboardFocused={true} onClick={this.handleOpen1} />
        </Dialog>

          {/* After Verification */}

          
        <Dialog
          title={
              <div className="VerifyDiv">
                  <div className="gpalogo">
                        <Row>
                            <Col md={4} >
                                <div className="logo_div">
                                    <img src = {logo} alt="GPA Logo" width="170" height="70"/>
                                </div>
                            </Col>
                            <Col md={8} >
                                <div className="Thanks_div">
                                    <h4>Thanks for your Registration !</h4>
                                </div>
                            </Col>
                        </Row>
                        
                        
                        
                  </div>
              </div>
          }
        //   actions={actions1}
          modal={false}
          open={this.state.open1}
          onRequestClose={this.handleClose} >
          <span>
                <img className="Verifydone" src = {VerifyIcon} alt="GPA Logo" width="70" height="70"/>
          </span>
          <p className="Verifymsgdone">Please login by clicking on the link below</p>
          <br/>
          <FlatButton className="Continuebtn" label="Continue" keyboardFocused={true} onClick={this.handleOpen1} />
        </Dialog>

      </div>

      
    );
  }
}