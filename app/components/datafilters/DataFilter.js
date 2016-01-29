import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateMetric } from '../../redux/actions';

class DataFilter extends Component {

  render() {

    const {alias, column, selected, operator, value, onChange} = this.props;

    const radioOnChangeHandler = (_operator, event) => {

      let _selected = event.target.checked;
      if (!_selected)
        return;

      onChange(alias, column, selected, _operator, value);
    }

    return (
      <tr style={ {  verticalAlign: 'top'} }>
        <td style={ {  minWidth: '130px'} }>
          <label className="checkbox-inline" style={ {  marginTop: '12px'} }>
            <input type="checkbox" checked={ selected } onChange={ (event) => onChange(alias, column, event.target.checked, operator, value) } /> <span>{ alias }</span>
          </label>
        </td>
        <td>
          <div className="well well-sm">
            <label className="radio-inline">
              <input disabled={ !selected } type="radio" name={ alias } value="lt" checked={ operator == 'lt' } onChange={ R.curry(radioOnChangeHandler)('lt', R.__) } /> Less than
            </label>
            <label className="radio-inline">
              <input disabled={ !selected } type="radio" name={ alias } value="gt" checked={ operator == 'gt' } onChange={ R.curry(radioOnChangeHandler)('gt', R.__) } /> Greater than
            </label>
          </div>
        </td>
        <td>
          <div className="form-group">
            <input disabled={ !selected } type='number' style={ {  marginTop: '4px'} } value={ value } className="form-control" onChange={ (event) => onChange(alias, column, selected, operator, event.target.value) }
            />
          </div>
        </td>
      </tr>
      )
  }
}

DataFilter.propTypes = {
  alias: React.PropTypes.string.isRequired,
  column: React.PropTypes.string.isRequired,
  operator: React.PropTypes.string.isRequired,
  value: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
// onSelectionChange: React.PropTypes.func.isRequired,
// onOperatorChange: React.PropTypes.func.isRequired,
// onValueChange: React.PropTypes.func.isRequired
};

DataFilter.defaultProps = {
};

export default DataFilter