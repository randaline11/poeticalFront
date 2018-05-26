import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';


// this can be dumb or smart component - connect works with either
class Navbar extends Component {
  constructor(props) {
    super(props);
  }


  render(props) {
    console.log('rendering navbar::');
    return (
      <div>
        <nav className="overArchingNavbar">
          <div className="title">
            <NavLink exact to="/">
              <div className="titleAndSubtitle">
                <div className="nav titleText"> poetry.seen</div>
                <div className="subtitle"> The Publishing Landscape, Visualized </div>
              </div>
            </NavLink>
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
