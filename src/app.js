// import { DataSet, Network } from 'vis/index-network';
import { DataSet, Timeline } from 'vis/index-timeline-graph2d';
import 'vis/dist/vis.min.css';
import moment from 'moment'

import './style.scss'
import * as timelineFunctions from './timelineFormatService.js';

// // create an array with nodes
// var nodes = new DataSet([
//   {id: 1, label: 'Node 1'},
//   {id: 2, label: 'Node 2'},
//   {id: 3, label: 'Node 3'},
//   {id: 4, label: 'Node 4'},
//   {id: 5, label: 'Node 5'}
// ]);
//
// // create an array with edges
// var edges = new DataSet([
//   {from: 1, to: 3},
//   {from: 1, to: 2},
//   {from: 2, to: 4},
//   {from: 2, to: 5},
//   {from: 3, to: 3}
// ]);
//
// // create a network
// var container = document.getElementById('mynetwork');
// var data = {
//   nodes: nodes,
//   edges: edges
// };
// var options = {
//   interaction: {
//     navigationButtons: true
//   }
// };
// var network = new Network(container, data, options);


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
var toAdd = timelineFunctions.createAllTimelineItems().then((stuff) => {
  console.log('retrieved stuff: ', stuff);
  var data = new DataSet(stuff);

  var container = document.getElementById('visualization');

  var groups = [
    {
      id: 1,
      content: 'Group 1'
      // Optional: a field 'className', 'style', 'order', [properties]
    }
    // more groups...
  ];

   var options = {
     verticalScroll: true,
     horizontalScroll: true,
     zoomKey: 'ctrlKey',
     height: 200
   };

  var timeline = new Timeline(container, data, options);
});



timeline.on('select', function (properties) {
  const display = document.getElementById('display').innerHTML=`selected id: ${properties.items}`;

});
