import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import StaticFilter from './StaticFilter'
import QueryFilter from './QueryFilter'

class Filter extends Component {

  render() {

    const {source, ...rest} = this.props;
    const filter = this.getFilterBySource(source, rest);

    return (
      <div>
        { filter }
      </div>
      )
  }

  getFilterBySource(source, props) {
    switch (source) {
      case 'static':
        return <StaticFilter {...props} />
      case 'query':
        return <QueryFilter {...props} />
      default:
        throw "Unhandled source " + source
    }
  }
}


Filter.propTypes = {
  value: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    parameter: React.PropTypes.string.isRequired,
    source: React.PropTypes.oneOf(['static', 'query']).isRequired,
    type: React.PropTypes.oneOf(['single_select', 'multi_select']).isRequired,
    values: React.PropTypes.array,
    query: React.PropTypes.string
  }).isRequired
}

Filter.defaultProps = {
  "name": "campaign_state",
  "label": "Campaign State",
  "parameter": "campaign_state",
  "source": "static",
  "type": "single_select",
  "values": [
    {
      "label": "Pre-Campaign",
      "value": "pre_campaign"
    },
    {
      "label": "Mid-Campaign",
      "value": "mid_campaign"
    }
  ]
};


function select(state) {
  return {
    ...state
  }
}

export default connect(select)(Filter)
