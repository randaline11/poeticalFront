import React, { Component } from 'react';
// import Timeline from 'react-visjs-timeline';
import Timeline from 'react-visjs-timeline-randaline-fork';
import moment from 'moment';
import * as timelineFunctions from '../timelineFormatService';
import * as axiosFunctions from '../axios';
import BookComponent from './book';
import SearchComponent from './search';

import '../style.scss';

class TimelineComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      poet: '',
      firstTime: true,
    };
    this.setupTimeline = this.setupTimeline.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.displayPoet = this.displayPoet.bind(this);
    this.timelineRefHandler = this.timelineRefHandler.bind(this);
    this.myCallback = this.myCallback.bind(this);
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
            showTooltip: true,
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

  myCallback() {
    console.log('did we even get here?');
  }
  timelineRefHandler(timeline) {
    console.log('hallo made it here!');
    if (this.state.firstTime === true) {
      console.log('firstTime is true!');
      console.log(timeline.setWindow);
      // timeline.setWindow(moment(1960, 'YYYY'), moment(1970, 'YYYY'));
      //  console.log(timeline.zoomIn());
      console.log(timeline.timeAxis.options.rtl);
      //  timeline.timeAxis.options.rtl = true;
      const theWindow = timeline.getVisibleItems();
      console.log('window: ', theWindow);
      this.setState({
        firstTime: false,
        myTimeline: timeline,
      }, () => {
        console.log('did it succeed? ', this.state);
        setTimeout(() => {
          //    const theWindow = this.state.myTimeline.getVisibleItems();
          //    console.log('window: ', theWindow);
          this.state.myTimeline.setWindow(moment(1960, 'YYYY'), moment(1970, 'YYYY'), { animation: { duration: 1500, easingFunction: 'easeInOutQuad' } });
        }, 500);
      });
    }
  }

  render() {
    console.log('timeline: ', this.state.myTimeline);
    let poetComponent;
    if (this.state.options == undefined || this.state.data == undefined) {
      return <div>Loading... </div>;
    } else {
      if (this.state.hovering) {
        poetComponent = (
          <div>
            <div className="poetDisplayTitle bold black">
              {this.state.poet.name}
            </div>
            <div className="poetDisplay">
              <BookComponent books={this.state.poetsBooks} />
            </div>
          </div>);
      }
      return (
        <div>
          <SearchComponent allPoets={this.state.poets} allBooks={this.state.books} />
          <Timeline
            options={this.state.options}
            items={this.state.data}
            groups={this.state.groups}
            clickHandler={this.onClickHandler}
            timelineRef={this.timelineRefHandler}
          />
          <div className="test">
            Explore up and down, left and right. CTRL to zoom in and out.
          </div>
          <div className="poetDisplay">
            {poetComponent}
          </div>
        </div>);
    }
  }
}

export default TimelineComponent;
