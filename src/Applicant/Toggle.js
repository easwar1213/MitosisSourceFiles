import React, { Component } from 'react';
// import ToggleDisplay from 'react-toggle-display';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
 
class App extends Component {
  constructor() {
    super();
    this.state = { show: false };
  }
 
  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }
 
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          {/* <button onClick={ () => this.handleClick() }>Toggle things</button> */}
          <Badge onClick={ () => this.handleClick() }
                className="Badge"
                badgeContent={4}
                secondary={true} >
                <NotificationsIcon />
            </Badge>
            {/* <ToggleDisplay if={this.state.show}>
                    <ul>
                        <li>Sample</li>
                        <li>Sample</li>
                        <li>Sample</li>
                    </ul>
                </ToggleDisplay> */}
        </p>
 
        
      </div>
    );
  }
}
 
export default App;