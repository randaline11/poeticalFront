import React, { Component } from 'react';

// this can be dumb or smart component - connect works with either
class AboutComponent extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {
    return (
      <div className="aboutPage">
        <p> Poetry in the United States is significantly more regionalized
      today than it has been historically. Publishing and printing is more
      accessible and citizen literacy is at an all-time high. However,
      as the number of emerging poets increases, the amount of poetry the
      nation reads regularly is low. The average person first encounters poetry
      in elementary school and never revisits it again after their last high
      school English course.
        </p>

        <p> Conversely, the digital space offers more easily accessible
      information now than ever before. Libraries have collections entirely
      digitized, but most of these collections focus specifically on books
      or articles because those are the preferred medium for many people.
        </p>

        <p> poetry.seen was created to digitally visualize the
      poetry landscape of today. In doing so, the site
      attempts to both celebrate this landscape
      and explore the comparisons between proliferation, popularity, and other
      factors that may contrubute to it.
        </p>

        <p>
      This site is the culminating experience
      of two terms of work under the Presidential Scholars Program at Dartmouth
      College. One term of COSC 28, Independent Study in Digital Art, was taken
      for partial fulfillment of the program.
        </p>

        <p> Creator: Abby Starr </p>
        <p> Advisor: Professor Lorie Loeb, Director of Digital Arts at Dartmouth College </p>
        <p> <ul>Source Databases and APIs:
          <li> poet.tips </li>
          <li> Goodreads </li>
          <li> Open Library </li>
          <li> Wikipedia </li>
          <li> The Academy of American Poets </li>
            </ul>
        </p>
      </div>
    );
  }
}

export default AboutComponent;
