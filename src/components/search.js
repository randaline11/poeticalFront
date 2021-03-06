import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import '../style.scss';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: 'Robert Frost',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.changeHandler2 = this.changeHandler2.bind(this);
  }

  searchHandler() {
    this.props.searchHandler(this.state.searchTerm);
  }

  changeHandler(e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  changeHandler2(e) {
    this.setState({
      searchTerm: e,
    }, () => {
      this.searchHandler();
    });
  }

  render() {
    const format2 = this.props.allPoets.map((poet) => {
      return { id: poet, label: poet };
    });

    return (
      <div className="search">
        <div className="searchTitle">
          <h3> Search for a poet: </h3>
        </div>
        <Autocomplete
          className="autocomplete"
          getItemValue={item => item.label}
          items={format2}
          shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
          menuStyle={{
  borderRadius: '3px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  padding: '2px 0',
  fontSize: '110%',
  position: 'fixed',
  overflow: 'auto',
  height: '50px',
  borderBottom: '50px',
  maxHeight: '25%', // TODO: don't cheat, let it flow to the bottom
  marginBottom: '0px',
  marginLeft: '3px',
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
