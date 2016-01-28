import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter';
import ReportFilter from './ReportFilter';
import filterConfig from '../../meta/filter_config.json';
import reportConfig from '../../meta/report_config.json';
import R from 'ramda';
import SectionHeader from '../SectionHeader';
import { setReport } from '../../redux/actions'
import SecondaryFilter from './SecondaryFilter';
import StartDateFilter from './date/StartDateFilter';
import EndDateFilter from './date/EndDateFilter';

class TertiaryFilters extends Component {

  render() {

    const {dsp, data_level, channel, campaign_state, report, dispatch} = this.props;

    var filterList = <div></div>;

    if (R.has('tertiaryFilters')(report)) {

      filterList = report.tertiaryFilters.map((filterName, index) => {

        return (<div className="col-md-3" key={ index }>
                  <SecondaryFilter name={ filterName } />
                </div>)
        });
      }

      filterList = R.flatten(filterList);

      if (filterList.length == 0)
        return <div></div>;

      return (
        <div className="row">
          <br />
          <SectionHeader title='Optional Filters' />
          { filterList }
        </div>
        )
    }
  }

  TertiaryFilters.propTypes = {
  };

  TertiaryFilters.defaultProps = {
  };


  function select(state) {

    const report = R.pathOr({}, ['standardReport', 'report'], state);

    return {
      report
    };
  }

  export default connect(select)(TertiaryFilters)