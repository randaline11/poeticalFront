import React, { Component } from 'react';
import TextInput from 'react-autocomplete-input';

import '../style.scss';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.beginSetup = this.beginSetup.bind(this);
  }


  changeHandler(e) {
    console.log('e: ', e);
    this.setState({
      searchTerm: e,
    });
  }
  componentDidMount() {
    this.beginSetup();
  }

  beginSetup() {
    // need to arrange all poets by name
    const toStart = this.props.allPoets.map((poet) => {
      return poet.name;
    });
    console.log('tostart is: ', toStart);
    this.setState({ allPoets: toStart });
  }

  render() {
    return (
      <div>
      Search:
        <TextInput Component="Input" onChange={this.changeHandler} defaultValue="Gregory Pardlo" maxOptions={10} trigger="" options={this.state.allPoets} />
      </div>
    );
  }
}

export default SearchComponent;
