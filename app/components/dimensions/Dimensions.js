import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { updateDimension } from '../../redux/actions';
import SectionHeader from '../SectionHeader';
import Dimension from './Dimension';
import R from 'ramda';

class Dimensions extends Component {

  state = {
    
  };

  render() {

    const {dimensions, report, dispatch} = this.props;

    if (!R.has('dimensions')(report))
      return <div></div>;

    const onChange = (dimension, selected) => {
      console.log(selected);
      dispatch(updateDimension(dimension, selected));
    }

    const items = report.dimensions.map((dimension, index) => {
      return (
        <div className="col-sm-2" key={ index }>
          <Dimension label={ dimension.alias } selected={ R.has(dimension.alias)(dimensions) } onChange={ R.curry(onChange)(dimension, R.__) } />
        </div>);
    });

    return (
      <div className="row">
        <br />
        <SectionHeader title='Dimensions' />
        { items }
      </div>
      )
  }
}

Dimensions.propTypes = {
};

Dimensions.defaultProps = {
};


function select(state) {

  const report = R.pathOr({}, ['standardReport', 'report'], state);
  const dimensions = R.pathOr({}, ['standardReport', 'dimensions'], state);

  return {
    dimensions,
    report
  };
}

export default connect(select)(Dimensions)