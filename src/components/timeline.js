import React, { Component } from 'react';
import { DataSet } from 'vis/index-timeline-graph2d';
import Timeline from 'react-visjs-timeline';
import moment from 'moment';
import * as timelineFunctions from '../timelineFormatService';
import * as axiosFunctions from '../axios.js';
import '../style.scss';

class TimelineComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      container: this.props.container,
    };
    this.setupTimeline = this.setupTimeline.bind(this);
  }

  componentWillMount() {
    console.log('getInitialState');
    if (this.state.data === undefined || this.state.options === undefined) {
      this.setupTimeline().then((params) => {
        this.setState({
          data: params.data,
          options: params.options,
        });
      });
    }
  }

  setupTimeline() {
    return new Promise((fulfill, reject) => {
      timelineFunctions.getAllBooksforPoetsWrapper().then((allBooksAllPoets) => {
        timelineFunctions.formatTimelineIntoData(allBooksAllPoets).then((dataset) => {
          console.log(dataset);
          //    // console.log('resulting dataset: ', dataset);
          //
          //  const mydata = new DataSet(dataset);

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
            height: 500,

            zoomMin: 259200000000,
            zoomMax: 63072000000000,
            zoomable: true,
            showCurrentTime: false,

            max: moment(2100, 'YYYY'),
            min: moment(1400, 'YYYY'),
          };
          //
          //     //  return new Timeline(container, data, options);
          const params = {
            //  container,
            data: dataset,
            options,
          };
          //     // console.log('params looks like: ', params.data);
          fulfill(params);
        });
      });
    });
  }


  render() {
    console.log('rerendering');
    console.log('options: ', this.state.options);
    console.log('items: ', this.state.data);
    // return this.setupTimeline().then((params) => {
    // console.log('setting up params now: ', params);
    // console.log(document.getElementById(this.state.container), params.data, params.options);
    //  const createdTimeline = new Timeline(document.getElementById(this.state.container), params.data, params.options);
    //  return createdTimeline;
    return (<div><Timeline
      options={this.state.options}
      items={this.state.data}
    />
    </div>);
  //  });
  }
}

export default TimelineComponent;
