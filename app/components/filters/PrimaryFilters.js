import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Filter from './Filter';
import filterConfig from '../../meta/filterconfig.json';
import R from 'ramda';
import SectionHeader from '../SectionHeader';
import { updatePrimaryFilter } from '../../redux/actions'

class PrimaryFilters extends Component {

  state = {
  };

  render() {

    const {dispatch} = this.props;


    const dsp = R.find(R.propEq('name', 'dsp'))(filterConfig.filters);
    const dataLevel = R.find(R.propEq('name', 'data_level'))(filterConfig.filters);
    const channel = R.find(R.propEq('name', 'channel'))(filterConfig.filters);
    const campaignState = R.find(R.propEq('name', 'campaign_state'))(filterConfig.filters);

    const onChange = (parameter, value, type) => {
      dispatch(updatePrimaryFilter(parameter, value, type));
    }

    return (
      <div className="row">
        <SectionHeader title='Primary Filters' />
        <div className="col-md-3">
          <Filter {...dsp} onChange={ R.curry(onChange)(dsp.parameter, R.__, dsp.type) } />
        </div>
        <div className="col-md-3">
          <Filter {...dataLevel} onChange={ R.curry(onChange)(dataLevel.parameter, R.__, dataLevel.type) } />
        </div>
        <div className="col-md-3">
          <Filter {...channel} onChange={ R.curry(onChange)(channel.parameter, R.__, channel.type) } />
        </div>
        <div className="col-md-3">
          <Filter {...campaignState} onChange={ R.curry(onChange)(campaignState.parameter, R.__, campaignState.type) } />
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
  return {
    ...state
  }
}

export default connect(select)(PrimaryFilters)