import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter';
import filterConfig from '../../meta/filterconfig.json';
import reportConfig from '../../meta/report_config.json';
import R from 'ramda';
import SectionHeader from '../SectionHeader';
import { setReport } from '../../redux/actions'

class ReportFilter extends Component {

  render() {

    const {dsp, data_level, channel, campaign_state, dispatch} = this.props;

    if (!(dsp && data_level && channel && campaign_state))
      return false;

    const reportFilter = this.getReportFilter(this.props);

    const onChange = (index) => {
      dispatch(setReport(reportConfig.reports[index]));
    }

    return <Filter {...reportFilter} onChange={ onChange } />
  }

  /**
   * Filters the reports that match the primary filter selection, and returns a filterConfig that contains the reports as values.
   */
  getReportFilter({dsp, data_level, channel, campaign_state}) {

    // filter report that matches the above selection
    var predicate = (report) => {

      const dspMatch = R.contains(dsp, report.primaryFilters.dsp);
      const dataLevelMatch = R.contains(data_level, report.primaryFilters.dataLevel);
      const channelMatch = R.contains(channel, report.primaryFilters.channel);
      const campaignStateMatch = R.contains(campaign_state, report.primaryFilters.campaignState);

      return dspMatch && dataLevelMatch && channelMatch && campaignStateMatch;
    };

    const reports = R.filter(predicate, reportConfig.reports);
    const reportNames = R.pluck('name', reports).map((r, i) => {
      return {
        label: r,
        value: i
      }
    });

    // get the reports and create a static filter
    // create callback and render filter.
    return {
      "name": "report",
      "label": "Report",
      "parameter": "report",
      "source": "static",
      "type": "single_select",
      "values": reportNames
    };
  }
}

ReportFilter.propTypes = {
};

ReportFilter.defaultProps = {
};


function select(state) {
  return R.pathOr({}, ['standardReport', 'filters', 'primary'], state);
}

export default connect(select)(ReportFilter)