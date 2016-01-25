import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter';
import ReportFilter from './ReportFilter';
import filterConfig from '../../meta/filter_config.json';
import reportConfig from '../../meta/report_config.json';
import R from 'ramda';
import SectionHeader from '../SectionHeader';
import { setReport } from '../../redux/actions'

class SecondaryFilters extends Component {

  render() {

    const {dsp, data_level, channel, campaign_state, dispatch} = this.props;

    if (!(dsp && data_level && channel && campaign_state))
      return <div className="alert alert-info" role="alert">Please choose all the primary filters above.</div>;

    return (
      <div className="row">
        <br />
        <SectionHeader title='Mandatory Filters' />
        <div className="col-md-3">
          <ReportFilter />
        </div>
      </div>
      )
  }

}

SecondaryFilters.propTypes = {
};

SecondaryFilters.defaultProps = {
};


function select(state) {

  const primaryFilters = R.pathOr({}, ['standardReport', 'filters', 'primary'], state);
  const report = R.pathOr({}, ['standardReport', 'report'], state);

  return {
    ...primaryFilters,
    report
  };
}

export default connect(select)(SecondaryFilters)