import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateDimension } from '../../redux/actions';

class Dimension extends Component {

  render() {

    const {label, selected, onChange} = this.props;

    return (
      <label className="checkbox-inline">
        <input type="checkbox" checked={ selected } onChange={ (event) => onChange(event.target.checked) } /> <span>{ label }</span>
      </label>
      )
  }
}

Dimension.propTypes = {
  label: React.PropTypes.string.isRequired,
  selected: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequiredred
};

Dimension.defaultProps = {
};

export default Dimension