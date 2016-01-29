import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateMetric } from '../../redux/actions';

class Metric extends Component {

  render() {

    const {label, selected, onChange} = this.props;

    return (
      <label className="checkbox-inline">
        <input type="checkbox" checked={ selected } onChange={ (event) => onChange(event.target.checked) } /> <span>{ label }</span>
      </label>
      )
  }
}

Metric.propTypes = {
  label: React.PropTypes.string.isRequired,
  selected: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired
};

Metric.defaultProps = {
};

export default Metric