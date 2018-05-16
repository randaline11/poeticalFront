import React, { Component } from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';

class LineChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.configureData = this.configureData.bind(this);
    this.sorter = this.sorter.bind(this);
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
      return (book.year > 0);
    });
    return data;
  }

  sorter(a, b) {
    return a.first_publish_year - b.first_publish_year;
  }


  render() {
    const toAdd = this.configureData();
    return (
      <LineChart width={1000} height={200} data={toAdd}>
        <XAxis type="number" domain={[toAdd[0].year, toAdd[toAdd.length - 1].year]} dataKey="year" />
        <YAxis />
        <Line type="monotone" dataKey="rating" stroke="#8884d8" />
        <Tooltip />
      </LineChart>
    );
  }
}

export default LineChartComponent;
