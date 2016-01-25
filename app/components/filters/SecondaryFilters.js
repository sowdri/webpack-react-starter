import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter';
import filterConfig from '../../meta/filterconfig.json';
import R from 'ramda';
import SectionHeader from '../SectionHeader';

class SecondaryFilters extends Component {

  state = {
  };

  render() {

    const dsp = R.find(R.propEq('name', 'dsp'))(filterConfig.filters);
    const dataLevel = R.find(R.propEq('name', 'data_level'))(filterConfig.filters);
    const channel = R.find(R.propEq('name', 'channel'))(filterConfig.filters);
    const campaignState = R.find(R.propEq('name', 'campaign_state'))(filterConfig.filters);

    return (
      <div className="row">
        <SectionHeader title='Mandatory Filters' />
        <div className="col-md-3">
          <Filter {...dsp} />
        </div>
        <div className="col-md-3">
          <Filter {...dataLevel} />
        </div>
        <div className="col-md-3">
          <Filter {...channel} />
        </div>
        <div className="col-md-3">
          <Filter {...campaignState} />
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
  return {
    ...state
  }
}

export default connect(select)(SecondaryFilters)