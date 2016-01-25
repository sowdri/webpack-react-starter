import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter';
import ReportFilter from './ReportFilter';
import filterConfig from '../../meta/filter_config.json';
import reportConfig from '../../meta/report_config.json';
import R from 'ramda';
import SectionHeader from '../SectionHeader';
import { setReport } from '../../redux/actions';
import { updateSecondaryFilter } from '../../redux/actions';

class SecondaryFilter extends Component {

  render() {

    const {name, report, dispatch, ...parameters} = this.props;

    const onChange = (parameter, value, type) => {
      dispatch(updateSecondaryFilter(parameter, value, type));
    }


    // get the filter config
    const config = R.find(R.propEq('name', name))(filterConfig.filters);

    if (!config)
      throw `Cannot find filter ${name}. Check filter_config.json for filter definition`;

    // check if the value is already set in parameters
    const value = parameters[config.parameter];
    console.log(config.parameter, value);

    return <Filter {...config} onChange={ R.curry(onChange)(config.parameter, R.__, config.type) } value={ value } />;
  }

}

SecondaryFilter.propTypes = {
  name: React.PropTypes.string.isRequired
};

SecondaryFilter.defaultProps = {
};


function select(state) {
  const secondaryFilters = R.pathOr({}, ['standardReport', 'filters', 'secondary'], state);
  const report = R.pathOr({}, ['standardReport', 'report'], state);

  return {
    report,
    ...secondaryFilters
  };
}

export default connect(select)(SecondaryFilter)