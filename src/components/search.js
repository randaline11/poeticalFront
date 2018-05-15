import React, { Component } from 'react';
import TextInput from 'react-autocomplete-input';

import '../style.scss';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: 'Gregory Pardlo',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }


  changeHandler(e) {
    console.log('e: ', e);
    this.setState({
      searchTerm: e,
    });
  }

  searchHandler() {
    this.props.searchHandler(this.state.searchTerm);
  }

  render() {
    console.log('allPoetNames: ', this.props.allPoets);
    return (
      <div>
      Search:
        <TextInput Component="Input" onChange={this.changeHandler} defaultValue="Gregory Pardlo" maxOptions={10} trigger="" options={this.props.allPoets} />
        <button onClick={this.searchHandler}>Submit</button>
      </div>
    );
  }
}

export default SearchComponent;
