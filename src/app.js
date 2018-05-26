// import { DataSet, Network } from 'vis/index-network';
import 'vis/dist/vis.min.css';
import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import dotenv from 'dotenv';
import './style.scss';

import TimelineComponent from './components/timeline';
import Navbar from './components/navbar';
import AboutComponent from './components/about';
import ContactComponent from './components/contact';

dotenv.config({ silent: true });

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={TimelineComponent} container="main" />
            <Route exact path="/about" component={AboutComponent} />
            <Route exact path="/contact" component={ContactComponent} />
            <Route component={FallBack} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
