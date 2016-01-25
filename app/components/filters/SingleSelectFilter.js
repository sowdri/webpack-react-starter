import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select';

class SingleSelectFilter extends Component {

  render() {
    const {options, onChange, value} = this.props;

    return (
      <div className="form-group">
        <label>
          { this.props.label }
        </label>
        <Select options={ options } onChange={ (selected) => onChange(selected.value) } value={ value } />
      </div>
      )
  }
}

SingleSelectFilter.propTypes = {
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  parameter: React.PropTypes.string.isRequired,
  options: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
};

SingleSelectFilter.defaultProps = {
};


function select(state) {
  return {
    ...state
  }
}

export default SingleSelectFilter