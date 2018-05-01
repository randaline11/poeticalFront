import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';
import moment from 'moment';
import * as timelineFunctions from '../timelineFormatService';
import * as axiosFunctions from '../axios';

import '../style.scss';

class TimelineComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      poet: '',
    };
    this.setupTimeline = this.setupTimeline.bind(this);
    this.onHoverHandler = this.onHoverHandler.bind(this);
    this.displayPoet = this.displayPoet.bind(this);
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
        });
      });
    }
  }

  onHoverHandler(e) {
    if (e.item !== null) {
      console.log('item: ', e);
      console.log('this.state.peots: ', this.state.poets);
      const thisPoet = this.state.poets.find((poet) => { return poet.id === e.item; });
      console.log('thisPoet: ', thisPoet);
      this.setState({
        hovering: true,
        id: e.item,
        poet: thisPoet,
      });
    }
  }

  setupTimeline() {
    return new Promise((fulfill, reject) => {
      timelineFunctions.getAllBooksforPoetsWrapper2().then((allBooksAllPoets) => {
        timelineFunctions.formatTimelineIntoData2(allBooksAllPoets).then((dataset) => {
          console.log(dataset);
          //     const groups = [
          //       {
          //         id: 1,
          //         content: 'Group 1',
          //         // Optional: a field 'className', 'style', 'order', [properties]
          //       },
          //       // more groups...
          //     ];
          //
          const options = {
            verticalScroll: true,
            horizontalScroll: true,
            zoomKey: 'ctrlKey',
            height: 500,
            dataAttributes: 'all',

            zoomMin: 259200000000,
            zoomMax: 63072000000000,
            zoomable: true,
            showCurrentTime: true,

            max: moment(2020, 'YYYY'),
            min: moment(1400, 'YYYY'),
          };

          const params = {
            data: dataset,
            options,
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

  render() {
    let poetComponent;
    if (this.state.options == undefined || this.state.data == undefined) {
      return <div>Loading... </div>;
    } else {
      if (this.state.hovering) {
        poetComponent = (
          <div>
            {this.state.poet.name}
          Books:
            {this.state.poet.books}
          </div>);
      }
      return (
        <div>
          <Timeline
            options={this.state.options}
            items={this.state.data}
            mouseOverHandler={this.onHoverHandler}
          />
          <div className="test">
            Explore up and down, left and right. CTRL to zoom in and out.
          </div>
          {poetComponent}
        </div>);
    }
  }
}

export default TimelineComponent;
