import React, { Component } from 'react';

// this can be dumb or smart component - connect works with either
class ContactComponent extends Component {
  constructor(props) {
    super(props);
  }


  render(props) {
    return (
      <div className="aboutOrContactPage" >
        <h1> Contact </h1>
        <h2> The Github Repos: </h2>
        <h3>   <a href="https://github.com/randaline11/poeticalScience"> Backend </a> </h3>
        <h3> <a href="https://github.com/randaline11/poeticalFront"> Frontend </a> </h3>
        <h2> The Creator: </h2>
        <h3> {'Email: abby.e.starr.19@dartmouth.edu'} </h3>
        <h3> <a href="www.linkedin.com/in/abby-starr-1b5092120"> Linkedin </a> </h3>
        <h2> The Advisor: </h2>
        <a href="https://web.cs.dartmouth.edu/people/lorie-loeb"> Dartmouth Profile </a>
        <h2> The Program: </h2>
        <a href="https://students.dartmouth.edu/ugar/research/programs/presidential-scholars"> The James O. Freedman Presidential Scholars Program </a>
      </div>

    );
  }
}

export default ContactComponent;
