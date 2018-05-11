import React, { Component } from 'react';

import '../style.scss';

class BookComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      poet: '',
    };
  }


  render() {
    const toDisplay = this.props.books.map((book) => {
      const url = (book.cover_url) ? book.cover_url : 'https://d30y9cdsu7xlg0.cloudfront.net/png/173841-200.png';
      return (
        <div className="postView">
          <img src={url} alt={book.title} />
          <div className="bold">{book.title}</div>
          <div>first published {book.first_publish_year}</div>
          <div> average rating {book.average_rating}</div>
          <div> (based on {book.reviews} reviews)</div>
        </div>
      );
    });
    return toDisplay;
  }
}

export default BookComponent;
