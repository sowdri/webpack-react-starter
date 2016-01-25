import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class SingleSelectFilter extends Component {

  render() {
    const {values, onChange} = this.props;

    const options = values.map(function(item, i) {
      return <option key={ i } value={ item.value }>
               { item.label }
             </option>
    });

    return (
      <div className="form-group">
        <label>
          { this.props.label }
        </label>
        <select className="form-control" onChange={ (event) => onChange(event.target.value) }>
          <option value=''></option>
          { options }
        </select>
      </div>
      )
  }
}

SingleSelectFilter.propTypes = {
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  parameter: React.PropTypes.string.isRequired,
  values: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
};

SingleSelectFilter.defaultProps = {
};


function select(state) {
  return {
    ...state
  }
}

// export default connect(select)(SingleSelectFilter)
export default SingleSelectFilter