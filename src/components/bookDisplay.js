import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';
import moment from 'moment';
import * as timelineFunctions from '../timelineFormatService';
import * as axiosFunctions from '../axios';

import '../style.scss';

class BookDisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      poet: '',
    };
  }

  /*
one component to gather list of books and display, which is this one */


  render() {
    return (
      <div>
        {this.props.cover_url}
        {this.props.book_title}
        {this.props.publish_year}
      </div>
    );
  }
}

export default BookDisplayComponent;
