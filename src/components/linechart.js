import React, { Component } from 'react';
// import Charts from 'react-chartjs';
// const LineChart = require('react-chartjs').Line;
import { LineChart, Line } from 'recharts';


// const LineChart = Charts.Line;

// class LineChartComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       options: [],
//     };
//     this.configureData = this.configureData.bind(this);
//   }
//
//   componentDidMount() {
//     this.configureData();
//   }
//
//   configureData() {
//     const data = {
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//       datasets: [
//         {
//           label: 'My First dataset',
//           fillColor: 'rgba(220,220,220,0.2)',
//           strokeColor: 'rgba(220,220,220,1)',
//           pointColor: 'rgba(220,220,220,1)',
//           pointStrokeColor: '#fff',
//           pointHighlightFill: '#fff',
//           pointHighlightStroke: 'rgba(220,220,220,1)',
//           data: [65, 59, 80, 81, 56, 55, 40],
//         },
//         {
//           label: 'My Second dataset',
//           fillColor: 'rgba(151,187,205,0.2)',
//           strokeColor: 'rgba(151,187,205,1)',
//           pointColor: 'rgba(151,187,205,1)',
//           pointStrokeColor: '#fff',
//           pointHighlightFill: '#fff',
//           pointHighlightStroke: 'rgba(151,187,205,1)',
//           data: [28, 48, 40, 19, 86, 27, 90],
//         },
//       ],
//     };
//     this.setState({ data });
//   }
//
//
//   render() {
//     return <LineChart data={this.state.data} options={this.state.options} width="600" height="250" />;
//   }
// }
class LineChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
    };
    this.configureData = this.configureData.bind(this);
  }

  componentDidMount() {
    this.configureData();
  }

  configureData() {
    const data =
      [{ name: 'a', uv: 12, value: 12 },
        { name: 'b', uv: 14, value: 14 },
        { name: 'c', uv: 16, value: 16 },
        { name: 'd', uv: 18, value: 18 },
        { name: 'e', uv: 24, value: 24 },
      ];
    this.setState({ data });
  }


  render() {
    console.log('made it to graph render');
    console.log('data: ', this.state.data);
    return (
      <LineChart width={200} height={200} data={this.state.data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    );
  }
}

export default LineChartComponent;
