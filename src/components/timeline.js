import React, { Component } from 'react';
import { DataSet, Timeline } from 'vis/index-timeline-graph2d';

import moment from 'moment';
import * as timelineFunctions from '../timelineFormatService';
import * as axiosFunctions from '../axios.js';

class TimelineComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      container: this.props.container,
    };
    this.setupTimeline = this.setupTimeline.bind(this);
  }

  setupTimeline() {
    return new Promise((fulfill, reject) => {
      timelineFunctions.getAllBooksforPoetsWrapper().then((allBooksAllPoets) => {
        timelineFunctions.formatTimelineIntoData(allBooksAllPoets).then((dataset) => {
          console.log(dataset);
          //    // console.log('resulting dataset: ', dataset);
          //
          const mydata = new DataSet(dataset);
          //     // console.log('data12345: ', mydata);
          //    // const container = document.getElementById(this.state.container);
          //
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
            height: 400,
          };
          //
          //     //  return new Timeline(container, data, options);
          const params = {
            //  container,
            data: mydata,
            options,
          };
          //     // console.log('params looks like: ', params.data);
          fulfill(params);
        });
      });
    });
  }

  makeTimeline() {

  }

  render() {
    console.log('rerendering');
    return this.setupTimeline().then((params) => {
      // console.log('setting up params now: ', params);
      console.log(document.getElementById(this.state.container), params.data, params.options);
      const createdTimeline = new Timeline(document.getElementById(this.state.container), params.data, params.options);
      return createdTimeline;
    });
  }
}

export default TimelineComponent;
