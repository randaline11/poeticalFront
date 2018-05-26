import React, { Component } from 'react';

// this can be dumb or smart component - connect works with either
class AboutComponent extends Component {
  constructor(props) {
    super(props);

  //  this.handleSignout = this.handleSignout.bind(this);
  }


  render(props) {
    return (
      <div> About component! </div>
    );
  }
}

export default AboutComponent;
