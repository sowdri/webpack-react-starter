import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SingleSelectFilter from './SingleSelectFilter';
import MultiSelectFilter from './MultiSelectFilter';

class StaticFilter extends Component {

  getFilter(type, props) {
    switch (type) {
      case 'single_select':
        return <SingleSelectFilter {...props} />;
      case 'multi_select':
        return <MultiSelectFilter {...props} />;
      default:
        throw "Unhandled type " + type;
    }
  }

  render() {
    const {type, ...rest} = this.props;
    const filter = this.getFilter(type, rest);

    return (
      <div>
        { filter }
      </div>
      );
  }
}

StaticFilter.propTypes = {
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  parameter: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(['single_select', 'multi_select']).isRequired,
  values: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
};

StaticFilter.defaultProps = {
};


function select(state) {
  return {
    ...state
  }
}

export default StaticFilter
// export default connect(select)(StaticFilter)