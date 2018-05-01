import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';
import moment from 'moment';
import * as timelineFunctions from '../timelineFormatService';
import * as axiosFunctions from '../axios';

import '../style.scss';

class BookComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      poet: '',
    };
    this.formatBookData = this.formatBookData.bind(this);
  }

  formatBookData() {

  }


  render() {
    const toDisplay = this.props.books.map((book) => {
      return (
        <div>
          <img src={book.cover_url} alt={book.title} />
          {book.title}
          {book.first_publish_year}
        </div>
      );
    });
    return toDisplay;
  }
}

export default BookComponent;
