// import { DataSet, Network } from 'vis/index-network';
import 'vis/dist/vis.min.css';
import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

import TimelineComponent from './components/timeline';


// var data = new DataSet([
//   {id: 1, content: 'item 1', className:'sampleItem', start: moment('2013-04-20'), end: moment('2013-04-21')},
//   {id: 2, content: 'item 2', className:'sampleItem', start: moment('2013-04-14'), end: moment('2013-04-16')},
//   {id: 3, content: 'item 3', className:'sampleItem', start: moment('2013-04-18'), end: moment('2013-04-20')},
//   {id: 4, content: 'item 4', start: moment('2013-04-16'), end: moment('2013-04-19')},
//   {id: 5, content: 'item 5', start: moment('2013-04-25'), end: moment('2013-04-26')},
//   {id: 6, content: 'item 6', start: moment('2013-04-27'), end: moment('2013-04-28')},
//   {id: 7, content: 'item 7', start: moment('2013-04-17'), end: moment('2013-04-20')},
//   {id: 8, content: 'item 8', start: moment('2013-04-19'), end: moment('2013-04-21')}
// ]);

class App extends Component {
  // here's what our constructor would look like
  constructor(props) {
    super(props);
    this.state = {
      addTerm: '',
    };
  }


  render() {
    return (
      <div className="test">All the React are belong to us!
        <TimelineComponent container="main" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
