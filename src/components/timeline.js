import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';
import moment from 'moment';
import * as timelineFunctions from '../timelineFormatService';
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
            showCurrentTime: true,

            max: moment(2100, 'YYYY'),
            min: moment(1400, 'YYYY'),
          };

          const params = {
            data: dataset,
            options,
          };
          fulfill(params);
        });
      });
    });
  }


  render() {
    return (
      <div>
        <Timeline
          options={this.state.options}
          items={this.state.data}
        />
      </div>);
  }
}

export default TimelineComponent;
