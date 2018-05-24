import React, { Component } from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import BookComponent from './book';

class LineChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      bookHoveredOver: '',
      sortingType: 'popularity',
    };
    this.configureData = this.configureData.bind(this);
    this.sorter = this.sorter.bind(this);
    this.mouseOverHandler = this.mouseOverHandler.bind(this);
    this.timelineSortingHandler = this.timelineSortingHandler.bind(this);
  }

  configureData() {
    const sorted = this.props.books.sort(this.sorter);
    const isOriginal = {};
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
      if (!isOriginal[book.year]) {
        isOriginal[book.year] = book.name;
        return (book.year > 1);
      } else {
        return false;
      }
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

  timelineSortingHandler(e, type) {
    console.log('sorting handler!', e);
    this.setState({ sortingType: e });
  }

  renderActiveButton() {
    if (this.state.sortingType === 'rating') {
      // return (<button type="submit" className={}onClick={() => { this.timelineSortingHandler('rating'); }}>By Rating </button>
      // )
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
    } else {
      tile = (<BookComponent book={undefined} />);
    }
    const yAxis = (this.state.sortingType === 'rating') ? 'rating' : 'reviews';
    const yAxisDomain = (this.state.sortingType === 'rating') ? [0, 5] : null;
    const yAxisLabel = (this.state.sortingType === 'rating') ? 'Avg Rating (out of 5)' : 'Review Count';
    const isRatingHighlighted = (this.state.sortingType === 'rating') ? 'highlightButton' : '';
    const isPopHighlighted = (this.state.sortingType === 'popularity') ? 'highlightButton' : '';

    const options = {
      borderWidth: 3,
      borderColor: '#2E294E',
      backgroundColor: '#000000',
    };
    const chartData = {
      datasets: [{
        data: toAdd,
        backgroundColor: [
          '#8884d8',
        ],
      }],
    };
    return (
      <div className="timelineTile">
        <div>
        Sort:
          <button className={isRatingHighlighted} type="submit" onClick={() => { this.timelineSortingHandler('rating'); }}>By Rating </button>
          <button className={isPopHighlighted} type="submit" onClick={() => { this.timelineSortingHandler('popularity'); }}>By Popularity </button>
          <div>currently displaying {this.state.sortingType} over time</div>

          <div>
            <LineChart width={1200}
              height={200}
              margin={{
 top: 15, right: 30, left: 20, bottom: 5,
}}
              onMouseOver={this.mouseOverHandler}
              data={toAdd}
            >
              <XAxis type="number" label={{ value: 'Time (in Years)', position: 'insideBottom', offset: -5 }} domain={[toAdd[0].year, toAdd[toAdd.length - 1].year]} dataKey="year" />
              <YAxis domain={yAxisDomain}
                label={{
 value: yAxisLabel, angle: -90, offset: 10, position: 'insideBottomLeft',
}}
              />
              <Line type="monotone" dataKey={yAxis} stroke="#8884d8" strokeWidth={2} />
              <Tooltip />
            </LineChart>
          </div>
        </div>
        <div className="tile">
          {tile}
        </div>
      </div>
    );
  }
}

export default LineChartComponent;
