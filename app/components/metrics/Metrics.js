import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { updateMetric } from '../../redux/actions';
import SectionHeader from '../SectionHeader';
import Metric from './Metric';
import R from 'ramda';

class Metrics extends Component {

  render() {

    const {metrics, report, dispatch} = this.props;

    if (!R.has('metrics')(report))
      return <div></div>;

    const onChange = (metric, selected) => {
      dispatch(updateMetric(metric, selected));
    }

    var items = report.metrics.map((metric, index) => {
      return (
        <div className="col-sm-2" key={ index }>
          <Metric label={ metric.alias } selected={ R.has(metric.alias)(metrics) } onChange={ R.curry(onChange)(metric, R.__) } />
        </div>);
    });

    return (
      <div className="row">
        <br />
        <SectionHeader title='Metrics' />
        { items }
      </div>
      )
  }
}

Metrics.propTypes = {
};

Metrics.defaultProps = {
};


function select(state) {

  const report = R.pathOr({}, ['standardReport', 'report'], state);
  const metrics = R.pathOr({}, ['standardReport', 'metrics'], state);

  return {
    metrics,
    report
  };
}

export default connect(select)(Metrics)