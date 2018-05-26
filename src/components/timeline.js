import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline-randaline-fork';
import moment from 'moment';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';

import * as timelineFunctions from '../timelineFormatService';
import * as axiosFunctions from '../axios';
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
      initialStep: 0,
      stepsEnabled: false,
      data: undefined,
      options: undefined,
      poets: undefined,
      books: undefined,
      groups: undefined,
    };
    this.setupTimeline = this.setupTimeline.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickHandlerLocal = this.onClickHandlerLocal.bind(this);
    this.displayPoet = this.displayPoet.bind(this);
    this.timelineRefHandler = this.timelineRefHandler.bind(this);
    this.myCallback = this.myCallback.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.mapPoetNames = this.mapPoetNames.bind(this);
    this.onExitSteps = this.onExitSteps.bind(this);
    this.startSteps = this.startSteps.bind(this);
    this.createSteps = this.createSteps.bind(this);
    this.timePeriodButtonHandler = this.timePeriodButtonHandler.bind(this);
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

  onExitSteps() {
    this.setState({ stepsEnabled: false });
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
              style: 'width: 7px;',

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
            clickToUse: true,
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

  startSteps() {
    this.setState({ stepsEnabled: true });
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

  createSteps() {
    const steps = [
      {
        element: '.timelineWrapper',
        intro: 'Click to use the timeline. Navigate by scrolling up and down, left and right. Pinch in and out to zoom (ctrl on desktop). Click a poet to know more about them.',
      },
      {
        element: '.search',
        intro: 'Type in a poet to search the timeline.',
      },
      {
        element: 'poetComponent',
        intro: 'A poet\'s graphs and additional info will display at the bottom. Hover over the points on the graph to get info on specific books.',
      },
    ];
    return steps;
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

  timePeriodButtonHandler(start, end) {
    this.state.myTimeline.setWindow(moment(start, 'YYYY'), moment(end, 'YYYY'));
  }

  searchHandler(searchTerm) {
    console.log('searchHandler. Searchterm: ', searchTerm);
    const found = this.state.poets.find((e) => {
      return e.name === searchTerm;
    });
    console.log('found: ', found);
    if (found) {
      const selectedItem = this.state.data.find((a) => {
        return a.id === found.id;
      });
      this.state.myTimeline.setWindow(selectedItem.start, selectedItem.end);
      this.state.myTimeline.setSelection(found.id, { focus: true });
      this.onClickHandlerLocal(found);
    }
  }

  render() {
    console.log('timeline: ', this.state.myTimeline);
    let poetComponent;
    let steps;
    if (this.state.options == undefined || this.state.data == undefined) {
      return <div>Loading... </div>;
    } else {
      if (this.state.hovering) {
        const formattedPoetName = this.state.poet.name.replace(/ /g, '-');
        const linkpoet = `https://www.poets.org/poetsorg/poet/${formattedPoetName}`;
        const linkwiki = `https://en.wikipedia.org/wiki/${formattedPoetName}`;
        poetComponent = (
          <div>
            <div className="poetDisplayTitle">
              <h1>{this.state.poet.name}</h1>
              <a href={linkpoet}><img src="https://pbs.twimg.com/profile_images/818597091215716353/5ejD1Ojs_400x400.jpg" style={{ width: '22px', height: '22px' }} /></a>
              <a href={linkwiki}><img src="https://image.flaticon.com/icons/png/512/49/49360.png" style={{ width: '22px', height: '22px' }} /></a>
            </div>
            <LineChartComponent books={this.state.poetsBooks} />
          </div>);
      }

      if (this.state.stepsEnabled) {
        const stepsToAdd = this.createSteps();
        steps = (
          <Steps
            enabled={this.state.stepsEnabled}
            steps={stepsToAdd}
            initialStep={this.state.initialStep}
            onExit={this.onExitSteps}
          />
        );
      } else {
        steps = <div />;
      }
      return (
        <div className="mainFlex">
          {steps}
          <div className="searchFlex">
            <button className="firstTimeButton" onClick={this.startSteps}> Tutorial </button>
            <SearchComponent allPoets={this.state.poetNames} allBooks={this.state.books} searchHandler={this.searchHandler} />
          </div>
          <div className="buttonFlex">
            <h3> Time Periods: </h3>
            <button onClick={() => { this.timePeriodButtonHandler(1400, 1700); }} className="periodButtons"> 1400-1700 </button>
            <button onClick={() => { this.timePeriodButtonHandler(1700, 1800); }} className="periodButtons"> 1700-1800 </button>
            <button onClick={() => { this.timePeriodButtonHandler(1800, 1900); }} className="periodButtons"> 1800-1900 </button>
            <button onClick={() => { this.timePeriodButtonHandler(1900, 1930); }} className="periodButtons"> 1900-1930 </button>
            <button onClick={() => { this.timePeriodButtonHandler(1930, 1960); }} className="periodButtons"> 1930-1960 </button>
            <button onClick={() => { this.timePeriodButtonHandler(1960, 1970); }} className="periodButtons"> 1960-1970 </button>
            <button onClick={() => { this.timePeriodButtonHandler(1970, 1980); }} className="periodButtons"> 1970-1980 </button>
            <button onClick={() => { this.timePeriodButtonHandler(1980, 1990); }} className="periodButtons"> 1980-1990 </button>
            <button onClick={() => { this.timePeriodButtonHandler(1990, 2000); }} className="periodButtons"> 1990-2000 </button>
            <button onClick={() => { this.timePeriodButtonHandler(2000, 1700); }} className="periodButtons"> 2000-today </button>
          </div>
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
            <h3>Click to use. Scroll up and down, left and right with the trackpad. CTRL to zoom in and out. Click on a line to see more info on a poet.</h3>
          </div>
          <div className="poetDisplay">
            {poetComponent}
          </div>
        </div>);
    }
  }
}

export default TimelineComponent;
