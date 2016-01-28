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
// import DatePicker from 'react-datepicker';
import DateRangeFilter from './DateRangeFilter';
import StartDateFilter from './StartDateFilter';
import EndDateFilter from './EndDateFilter';

class SecondaryFilters extends Component {

  render() {

    const {dsp, data_level, channel, campaign_state, report, dispatch} = this.props;

    if (!(dsp && data_level && channel && campaign_state))
      return <div className="alert alert-info" role="alert">Please choose all the primary filters above.</div>;

    var filterList = <div></div>;


    if (R.has('secondaryFilters')(report)) {

      filterList = report.secondaryFilters.map((filterName, index) => {

        if (filterName == 'date_range') {
          return [
            <div className="col-md-3" key='start_date'>
              <StartDateFilter />
            </div>,
            <div className="col-md-3" key='end_date'>
              <EndDateFilter />
            </div>];
        }


        return (<div className="col-md-3" key={ index }>
                  <SecondaryFilter name={ filterName } />
                </div>)
        });
      }

      filterList = R.flatten(filterList);

      return (
        <div className="row">
          <br />
          <SectionHeader title='Mandatory Filters' />
          <div className="col-md-3">
            <ReportFilter />
          </div>
          { filterList }
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