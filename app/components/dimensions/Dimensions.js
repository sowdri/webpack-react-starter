import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { updateDimension } from '../../redux/actions';
import SectionHeader from '../SectionHeader';
import Dimension from './Dimension';
import R from 'ramda';

class Dimensions extends Component {

  render() {

    const {dimensions, report, dispatch} = this.props;

    if (!R.has('dimensions')(report))
      return <div></div>;

    const onChange = (dimension, selected) => {
      dispatch(updateDimension(dimension, selected));
    }

    var items = report.dimensions.map((dimension, index) => {
      return (
        <div className="col-sm-2" key={ index }>
          <Dimension label={ dimension.alias } selected={ R.has(dimension.alias)(dimensions) } onChange={ R.curry(onChange)(dimension, R.__) } />
        </div>);
    });

    const dimensionGroups = R.has('dimensionGroups')(report) ? report.dimensionGroups : [];
    console.log(dimensionGroups);
    /**
     * Dimension Groups
     */
    const groups = dimensionGroups.map((group) => {

      const groupOnChange = (dimension, selected) => {

        // update the current dimension
        dispatch(updateDimension(dimension, selected));

        // remove other selected dimension from the group (if any already selected)
        group.dimensions.forEach((dim) => {

          if (dim.alias == dimension.alias)
            return;

          if (R.has(dim.alias)(dimensions))
            dispatch(updateDimension(dim, false));
        });
      }

      const groupItems = group.dimensions.map((dimension, index) => {
        return (
          <div className="col-sm-2" key={ 'dgi' + index }>
            <Dimension label={ dimension.alias } selected={ R.has(dimension.alias)(dimensions) } onChange={ R.curry(groupOnChange)(dimension, R.__) } />
          </div>);
      });

      return groupItems;
    });

    items = R.flatten([items, groups]);

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