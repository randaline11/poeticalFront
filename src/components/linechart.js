import React, { Component } from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import BookComponent from './book';

class LineChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      bookHoveredOver: '',
    };
    this.configureData = this.configureData.bind(this);
    this.sorter = this.sorter.bind(this);
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
  }

  configureData() {
    const sorted = this.props.books.sort(this.sorter);
    let data = sorted.map((book) => {
      console.log('configure book: ', book);
      return {
        name: book.title,
        year: book.first_publish_year,
        rating: book.average_rating,
        cover_url: book.cover_url,
        reviews: book.reviews,
      };
    });
    data = data.filter((book) => {
      return (book.year > 1);
    });
    return data;
  }

  sorter(a, b) {
    return a.first_publish_year - b.first_publish_year;
  }

  mouseOverHandler(e) {
    console.log('mouse over!', e);
    if (e) {
      this.setState({
        hovering: true,
        bookHoveredOver: e.activeLabel,
      });
    }
  }


  render() {
    const toAdd = this.configureData();
    let tile;
    if (this.state.hovering) {
      const bookFound = this.props.books.find((book) => {
        return book.first_publish_year === this.state.bookHoveredOver;
      });
      tile = (<BookComponent book={bookFound} />);
    }
    return (
      <div>
        <LineChart width={1200} height={200} onMouseOver={this.mouseOverHandler} data={toAdd}>
          <XAxis type="number" domain={[toAdd[0].year, toAdd[toAdd.length - 1].year]} dataKey="year" />
          <YAxis />
          <Line type="monotone" dataKey="rating" stroke="#8884d8" />
          <Tooltip />
        </LineChart>
        <div>
          {tile}
        </div>
      </div>
    );
  }
}

export default LineChartComponent;
