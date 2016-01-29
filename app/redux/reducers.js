import { combineReducers } from 'redux';
import {  } from './actions';
import R from 'ramda';

function primary(state = {}, action) {

  const {parameter, value, selectionType} = action;

  switch (action.type) {
    case 'UPDATE_PRIMARY_FILTER':
      return {
        ...state,
        ...{
          [parameter]: value
        }
      };
    default:
      return state;
  }
}

function secondary(state = {}, action) {
  const {parameter, value, selectionType} = action;

  switch (action.type) {
    case 'UPDATE_SECONDARY_FILTER':
      return {
        ...state,
        ...{
          [parameter]: value
        }
      };
    default:
      return state;
  }
}

function filters(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_PRIMARY_FILTER':
      return {
        ...state,
        primary: primary(state.primary, action)
      }
    case 'UPDATE_SECONDARY_FILTER':
      return {
        ...state,
        secondary: secondary(state.secondary, action)
      }
    default:
      return state;
  }
}

function dimensions(state = {}, action) {

  switch (action.type) {
    case 'UPDATE_DIMENSION':

      const {dimension, selected} = action;
      const {alias} = dimension;

      // add dimension
      if (selected)
        return {
          ...state,
          ...{
            [alias]: dimension
          }
        }

      // remove dimension
      return R.dissoc(alias, state);

    default:
      return state;
  }
}

function metrics(state = {}, action) {

  switch (action.type) {
    case 'UPDATE_METRIC':

      const {metric, selected} = action;
      const {alias} = metric;

      // add metric
      if (selected)
        return {
          ...state,
          ...{
            [alias]: metric
          }
        }

      // remove metric
      return R.dissoc(alias, state);

    default:
      return state;
  }
}

function dataFilters(state = {}, action) {

  switch (action.type) {
    case 'UPDATE_DATA_FILTER': {

      let {alias, column, selected, operator, value} = action;

      // add 
      if (selected)
        return {
          ...state,
          ...{
            [alias]: {
              alias,
              column,
              operator,
              value
            }
          }
        }

      // remove 
      return R.dissoc(alias, state);
      }
    case 'UPDATE_METRIC': {

      let {metric, selected} = action;
      let {alias} = metric;

      // when a metric is removed, remove the data-filter as well
      if (!selected)
        return R.dissoc(alias, state);

      return state;
      }
    default:
      return state;
  }
}

function report(state = {}, action) {
  switch (action.type) {
    case 'SET_REPORT':
      return action.report;
    default:
      return state;
  }
}

function standardReport(state = {}, action) {

  return {
    ...state,
    filters: filters(state.filters, action),
    report: report(state.report, action),
    dimensions: dimensions(state.dimensions, action),
    metrics: metrics(state.metrics, action),
    dataFilters: dataFilters(state.dataFilters, action)
  }
}

const reducers = {
  standardReport
}

export default reducers