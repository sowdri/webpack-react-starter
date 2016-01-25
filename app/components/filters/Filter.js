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
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  parameter: React.PropTypes.string.isRequired,
  source: React.PropTypes.oneOf(['static', 'query']).isRequired,
  type: React.PropTypes.oneOf(['single_select', 'multi_select']).isRequired,
  onChange: React.PropTypes.func.isRequired,
  values: React.PropTypes.array,
  query: React.PropTypes.string
}

Filter.defaultProps = {
};


function select(state) {
  return {
    ...state
  }
}

export default Filter
// export default connect(select)(Filter)
