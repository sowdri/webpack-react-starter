import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select';
import R from 'ramda';

class MultiSelectFilter extends Component {

  render() {
    const {options, onChange, value} = this.props;

    return (
      <div className="form-group">
        <label>
          { this.props.label }
        </label>
        <Select options={ options } multi={ true } onChange={ (selected) => onChange(R.pluck('value')(selected)) } value={ value } />
      </div>
      )
  }
}

MultiSelectFilter.propTypes = {
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.array.isRequired,
  name: React.PropTypes.string.isRequired,
  parameter: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
};

MultiSelectFilter.defaultProps = {
};


function select(state) {
  return {
    ...state
  }
}

export default MultiSelectFilter