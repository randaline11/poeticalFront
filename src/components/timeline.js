import React, { Component } from 'react';
// import Timeline from 'react-visjs-timeline';
import Timeline from 'react-visjs-timeline-randaline-fork';
import moment from 'moment';
import * as timelineFunctions from '../timelineFormatService';
import * as axiosFunctions from '../axios';
import BookComponent from './book';
import SearchComponent from './search';
import LineChartComponent from './linechart';

import '../style.scss';

class TimelineComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      poet: '',
      firstTime: true,
      poetNames: [],
    };
    this.setupTimeline = this.setupTimeline.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickHandlerLocal = this.onClickHandlerLocal.bind(this);
    this.displayPoet = this.displayPoet.bind(this);
    this.timelineRefHandler = this.timelineRefHandler.bind(this);
    this.myCallback = this.myCallback.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.mapPoetNames = this.mapPoetNames.bind(this);
  }

  componentWillMount() {
    console.log('getInitialState');
    if (this.state.data === undefined || this.state.options === undefined) {
      this.setupTimeline().then((params) => {
        this.setState({
          data: params.data,
          options: params.options,
          poets: params.poets,
          books: params.books,
          groups: params.groups,
        });
      });
    }
  }
  componentDidMount() {
    if (this.state.timeline) {
      console.log('we got the timeline in time!');
    } else {
      console.log('nope');
    }
  }


  onClickHandler(e) {
    if (e.item !== null) {
      console.log('item: ', e);
      console.log('this.state.peots: ', this.state.poets);
      const thisPoet = this.state.poets.find((poet) => { return poet.id === e.item; });

      let i = 0;
      const poetsBooks = [];
      while (i < thisPoet.books.length) {
        const specificBook = this.state.books.find((book) => { return book.id === thisPoet.books[i]; });
        poetsBooks.push(specificBook);
        i += 1;
      }

      console.log('thisPoet: ', thisPoet);
      console.log('poetsBooks: ', poetsBooks);


      const items = this.state.myTimeline.getWindow();
      console.log('items after click: ', items);
      this.setState({
        hovering: true,
        id: e.item,
        poet: thisPoet,
        poetsBooks,
      });
    }
  }

  onClickHandlerLocal(poet) {
    if (poet) {
      console.log('item: ', poet);
      let i = 0;
      const poetsBooks = [];
      while (i < poet.books.length) {
        const specificBook = this.state.books.find((book) => { return book.id === poet.books[i]; });
        poetsBooks.push(specificBook);
        i += 1;
      }
      const items = this.state.myTimeline.getWindow();
      console.log('items after click: ', items);
      this.setState({
        hovering: true,
        id: poet.id,
        poet,
        poetsBooks,
      });
    }
  }

  setupTimeline() {
    return new Promise((fulfill, reject) => {
      timelineFunctions.getAllBooksforPoetsWrapper2().then((allBooksAllPoets) => {
        timelineFunctions.formatTimelineIntoData2(allBooksAllPoets).then((dataset) => {
          console.log(dataset);
          const groups = [
            {
              id: 1,
              content: 'Group 1',
              className: 'sample',
              subgroupStack: 'true',
              style: 'width: 5px;',

              // Optional: a field 'className', 'style', 'order', [properties]
            },
            // more groups...
          ];

          const options = {
            verticalScroll: true,
            horizontalScroll: true,
            zoomKey: 'ctrlKey',
            height: 500,
            dataAttributes: 'all',

            zoomMin: 259200000000,
            zoomMax: 63072000000000,
            zoomable: true,
            showCurrentTime: false,
            showTooltips: true,
            tooltip: {
              followMouse: true,
            },
            stack: true,
            max: moment(2020, 'YYYY'),
            min: moment(1400, 'YYYY'),
          };

          const params = {
            data: dataset,
            options,
            groups,
            poets: allBooksAllPoets.poets.data,
            books: allBooksAllPoets.books.data,
          };
          fulfill(params);
        });
      });
    });
  }

  displayPoet() {
    axiosFunctions.fetchPoetById(this.state.id).then((res, err) => {
      if (res) {
        this.setState({ poet: res.data });
      }
    });
  }

  mapPoetNames() {
    // need to arrange all poets by name
    const toStart = this.state.poets.map((poet) => {
      return poet.name;
    });
    console.log('tostart is: ', toStart);
    this.setState({ poetNames: toStart });
  }

  myCallback() {
    console.log('did we even get here?');
  }

  timelineRefHandler(timeline) {
    if (this.state.firstTime === true) {
      console.log('firstTime is true!');
      const theWindow = timeline.getVisibleItems();
      this.setState({
        firstTime: false,
        myTimeline: timeline,
      }, () => {
        console.log('did it succeed? ', this.state);
        setTimeout(() => {
          //    const theWindow = this.state.myTimeline.getVisibleItems();
          //    console.log('window: ', theWindow);
          this.state.myTimeline.setWindow(moment(1960, 'YYYY'), moment(1970, 'YYYY'), { animation: { duration: 1500, easingFunction: 'easeInOutQuad' } });
          this.mapPoetNames();
        }, 500);
      });
    }
  }

  searchHandler(searchTerm) {
    console.log('searchHandler. Searchterm: ', searchTerm);
    const found = this.state.poets.find((e) => {
      return e.name === searchTerm;
    });
    console.log('found: ', found);
    if (found) {
      this.state.myTimeline.setSelection(found.id, { focus: true });
      this.onClickHandlerLocal(found);
    }
  }

  render() {
    console.log('timeline: ', this.state.myTimeline);
    let poetComponent;
    if (this.state.options == undefined || this.state.data == undefined) {
      return <div>Loading... </div>;
    } else {
      if (this.state.hovering) {
        const formattedPoetName = this.state.poet.name.replace(/ /g, '-');
        const linkpoet = `https://www.poets.org/poetsorg/poet/${formattedPoetName}`;
        const linkpoet2 = `https://www.poetryfoundation.org/poets/${formattedPoetName}`;
        const linkwiki = `https://en.wikipedia.org/wiki/${formattedPoetName}`;
        poetComponent = (
          <div>
            <div className="poetDisplayTitle bold black">
              {this.state.poet.name}
              <a href={linkpoet}> Acad Am Poets </a>
              <a href={linkwiki}> Wikipedia </a>
              <a href={linkpoet2}> Poet Found </a>
            </div>
            <LineChartComponent books={this.state.poetsBooks} />
          </div>);
      }
      return (
        <div>
          <SearchComponent allPoets={this.state.poetNames} allBooks={this.state.books} searchHandler={this.searchHandler} />
          <div className="timelineWrapper">
            <Timeline
              options={this.state.options}
              items={this.state.data}
              groups={this.state.groups}
              clickHandler={this.onClickHandler}
              timelineRef={this.timelineRefHandler}
            />
          </div>
          <div className="test">
            <h3>Explore up and down, left and right. CTRL to zoom in and out.</h3>
          </div>
          <div className="poetDisplay">
            {poetComponent}
          </div>
        </div>);
    }
  }
}

export default TimelineComponent;
