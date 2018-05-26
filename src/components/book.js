import React, { Component } from 'react';

import '../style.scss';

class BookComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log('rendering book: ', this.props.book);
    if (this.props.book) {
      const url = (this.props.book.cover_url) ? this.props.book.cover_url : 'https://d30y9cdsu7xlg0.cloudfront.net/png/173841-200.png';
      return (
        <div className="postView">
          <div className="bold bookTitle">{this.props.book.title}</div>
          <div>first published {this.props.book.first_publish_year}</div>
          <div> average rating {this.props.book.average_rating}</div>
          <div> (based on {this.props.book.reviews} reviews)</div>
          <img src={url} alt={this.props.book.title} />
        </div>
      );
    } else {
      return <div className="postView"> {'No Point to Display.'} </div>;
    }
  }
}


export default BookComponent;
