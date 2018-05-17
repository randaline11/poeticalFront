import React, { Component } from 'react';
import TextInput from 'react-autocomplete-input';
import Autocomplete from 'react-autocomplete';
import '../style.scss';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: 'Gregory Pardlo',
      suggestions: [],
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.changeHandler2 = this.changeHandler2.bind(this);
  }


  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }


  getSuggestions() {
    return this.props.allPoets.map((poet) => {
      return { name: poet };
    });
  }

  searchHandler() {
    this.props.searchHandler(this.state.searchTerm);
  }

  changeHandler(e) {
    console.log('e: ', e);
    this.setState({
      searchTerm: e.target.value,
    });
  }

  changeHandler2(e) {
    console.log('e: ', e);
    this.setState({
      searchTerm: e,
    });
  }

  renderSuggestion(suggestion) {
    return (
      <div>
        {suggestion.name}
      </div>);
  }

  render() {
    console.log('allPoetNames: ', this.props.allPoets);
    const format = this.props.allPoets.map((poet) => {
      return { value: poet, className: 'selectItem', label: poet };
    });
    const format2 = this.props.allPoets.map((poet) => {
      return { id: poet, label: poet };
    });

    return (
      <div>
      Search:
        <TextInput Component="Input" onChange={this.changeHandler} defaultValue="Gregory Pardlo" maxOptions={10} trigger="" options={this.props.allPoets} />
        <button onClick={this.searchHandler}>Submit</button>
        <Autocomplete
          getItemValue={item => item.label}
          items={format2}
          shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
          menuStyle={{
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 0',
  fontSize: '90%',
  position: 'fixed',
  overflow: 'auto',
  height: '50px',
  maxHeight: '25%', // TODO: don't cheat, let it flow to the bottom
  'margin-bottom': '50px',
}}
          renderItem={(item, isHighlighted) =>
    (<div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
      {item.label}
     </div>)
  }
          value={this.state.searchTerm}
          onChange={this.changeHandler}
          onSelect={this.changeHandler2}
        />
      </div>
    );
  }
}

export default SearchComponent;
