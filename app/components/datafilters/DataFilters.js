import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { updateDataFilter } from '../../redux/actions';
import SectionHeader from '../SectionHeader';
import DataFilter from './DataFilter';
import R from 'ramda';

class DataFilters extends Component {

  render() {

    const {dataFilters, metrics, dispatch} = this.props;
    console.log(metrics, dataFilters);

    /**
     * Datafilters are based on metrics that are selected.
     */
    const onChange = (alias, column, selected, operator, value) => {
      dispatch(updateDataFilter(alias, column, selected, operator, value));
    }

    var items = R.values(metrics).map((metric, index) => {

      const {alias, column} = metric;

      // onSelectionChange: R.curry(onChange)(alias, column, R.__, this.operator, this.value),
      //         onOperatorChange: R.curry(onChange)(alias, column, this.selected, R.__, this.value),
      //         onValueChange: R.curry(onChange)(alias, column, this.selected, this.operator, R.__)
      const selected = R.has(alias)(dataFilters);
      const props = {
        alias,
        column,
        selected,
        operator: selected ? dataFilters[alias].operator : 'lt',
        value: selected ? dataFilters[alias].value : 0,
        onChange
      }
      console.log(props);

      return (
        <DataFilter { ...props } key={ index } />
        );
    });

    return (
      <div className="row">
        <br />
        <SectionHeader title='Data Filters' />
        <div className='row'>
          <div className='col-xs-12'>
            <table className='data_filters_table'>
              <tbody>
                { items }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      )
  }
}

DataFilters.propTypes = {
};

DataFilters.defaultProps = {
};


function select(state) {

  const metrics = R.pathOr({}, ['standardReport', 'metrics'], state);
  const dataFilters = R.pathOr({}, ['standardReport', 'dataFilters'], state);

  return {
    metrics,
    dataFilters
  };
}

export default connect(select)(DataFilters)