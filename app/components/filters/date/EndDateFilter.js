import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Filter from '../Filter';
import ReportFilter from '../ReportFilter';
import filterConfig from '../../../meta/filter_config.json';
import reportConfig from '../../../meta/report_config.json';
import R from 'ramda';
import SectionHeader from '../../SectionHeader';
import { setReport } from '../../../redux/actions';
import { updateSecondaryFilter } from '../../../redux/actions';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const DATE_FORMAT = 'YYYYMMDD';
const DISPLAY_FORMAT = 'Do MMM YYYY';

class EndDateFilter extends Component {

  render() {

    const {dispatch, startDate, endDate} = this.props;

    const startMoment = moment(startDate, DATE_FORMAT);
    const endMoment = moment(endDate, DATE_FORMAT);

    const onChange = (parameter, value, type) => {
      dispatch(updateSecondaryFilter(parameter, value.format(DATE_FORMAT), type));
    }

    return (
      <div className="form-group">
        <label>
          End Date
        </label>
        <DatePicker dateFormat={ DISPLAY_FORMAT } selected={ endMoment } startDate={ startMoment } endDate={ endMoment } onChange={ R.curry(onChange)('end_date', R.__, 'single_select') }
        />
      </div>
      )
  }

}

EndDateFilter.propTypes = {
};

EndDateFilter.defaultProps = {
};


function select(state) {
  const startDate = (R.pathOr(moment(), ['standardReport', 'filters', 'secondary', 'start_date'], state));
  const endDate = (R.pathOr(moment(), ['standardReport', 'filters', 'secondary', 'end_date'], state));

  return {
    startDate,
    endDate
  };
}

export default connect(select)(EndDateFilter)