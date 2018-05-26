import React, { Component } from 'react';

// this can be dumb or smart component - connect works with either
class AboutComponent extends Component {
  constructor(props) {
    super(props);
  }


  render(props) {
    return (
      <div> This site is the culminating experience of two terms of work under the Presidential Scholars Program at Dartmouth College. </div>
    );
  }
}

export default AboutComponent;
