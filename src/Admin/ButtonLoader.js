import React, { Component } from 'react';
import { render } from 'react-dom';
import LoaderButton from 'react-bootstrap-button-loader';

class ButtonLoader extends Component {
  static svgIcon() {
    return (
      <span>
        
      </span>
    );
  }

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      disabled: false,
      forceLoading: false,
      loading: 0,
      showIcon: true,
      spinColor: '#fff',
      style: 'default',
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick() {
    this.setState({ loading: 5 });
    this.interval = setInterval(() => {
      const nextLoading = this.state.loading - 1;

      if (nextLoading <= 0) {
        clearInterval(this.interval);
      }

      this.setState({ loading: Math.max(nextLoading, 0) });

    }, 1000);
  }

  render() {
    return (
      <div>
        <div>
          <LoaderButton className="RegButton1"
            bsStyle={this.state.bsStyle}
            disabled={this.state.disabled}
            icon={this.state.showIcon ? this.constructor.svgIcon() : null}
            loading={this.state.loading || this.state.forceLoading}
            onClick={this.handleClick}
            spinColor={this.state.spinColor}
          >
            Press Me!
          </LoaderButton>
          {!!this.state.loading && <p>I am loading for {this.state.loading} more seconds</p>}
        </div>
      </div>
    );
  }
}

export default ButtonLoader;