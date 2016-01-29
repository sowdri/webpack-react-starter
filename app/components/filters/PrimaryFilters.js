import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Filter from './core/Filter';
import filterConfig from '../../meta/filter_config.json';
import R from 'ramda';
import SectionHeader from '../SectionHeader';
import { updatePrimaryFilter } from '../../redux/actions'

class PrimaryFilters extends Component {

  state = {
  };

  render() {

    const {dsp, data_level, channel, campaign_state, dispatch} = this.props;

    const dspFilter = R.find(R.propEq('name', 'dsp'))(filterConfig.filters);
    const dataLevelFilter = R.find(R.propEq('name', 'data_level'))(filterConfig.filters);
    const channelFilter = R.find(R.propEq('name', 'channel'))(filterConfig.filters);
    const campaignStateFilter = R.find(R.propEq('name', 'campaign_state'))(filterConfig.filters);

    const onChange = (parameter, value, type) => {
      dispatch(updatePrimaryFilter(parameter, value, type));
    }

    return (
      <div className="row">
        <SectionHeader title='Primary Filters' />
        <div className="col-md-3">
          <Filter {...dspFilter} onChange={ R.curry(onChange)(dspFilter.parameter, R.__, dspFilter.type) } value={ dsp } />
        </div>
        <div className="col-md-3">
          <Filter {...dataLevelFilter} onChange={ R.curry(onChange)(dataLevelFilter.parameter, R.__, dataLevelFilter.type) } value={ data_level } />
        </div>
        <div className="col-md-3">
          <Filter {...channelFilter} onChange={ R.curry(onChange)(channelFilter.parameter, R.__, channelFilter.type) } value={ channel } />
        </div>
        <div className="col-md-3">
          <Filter {...campaignStateFilter} onChange={ R.curry(onChange)(campaignStateFilter.parameter, R.__, campaignStateFilter.type) } value={ campaign_state } />
        </div>
      </div>
      )
  }
}

PrimaryFilters.propTypes = {
};

PrimaryFilters.defaultProps = {
};


function select(state) {
  return R.pathOr({}, ['standardReport', 'filters', 'primary'], state);
}


export default connect(select)(PrimaryFilters)