import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';


// this can be dumb or smart component - connect works with either
class Navbar extends Component {
  constructor(props) {
    super(props);

  //  this.handleSignout = this.handleSignout.bind(this);
  }


  render(props) {
    console.log('rendering navbar::');
    return (
      <div>
        <nav className="overArchingNavbar">
          <div className="title">
            <NavLink className="nav titleText" exact to="/">poetry.seen</NavLink>
          </div>
          <div className="navbar">
            <NavLink className="nav navButtons" to="/"> <li> Timeline </li></NavLink>
            <div className="separator"> | </div>
            <NavLink className="nav navButtons" to="/about"> <li> About </li></NavLink>
            <div className="separator"> | </div>
            <NavLink className="nav navButtons" to="/contact"> <li> Contact </li></NavLink>
          </div>
        </nav>
        <div className="line" />
      </div>
    );
  }
}


export default Navbar;
