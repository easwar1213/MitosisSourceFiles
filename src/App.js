import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import RegistrationPage from './Applicant/RegistrationPage';
class App extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <RegistrationPage/> 
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
