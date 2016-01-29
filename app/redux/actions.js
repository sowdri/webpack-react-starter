/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const UPDATE_PRIMARY_FILTER = 'UPDATE_PRIMARY_FILTER';
export const UPDATE_SECONDARY_FILTER = 'UPDATE_SECONDARY_FILTER';

export const SET_REPORT = 'SET_REPORT';
export const UPDATE_DIMENSION = 'UPDATE_DIMENSION';
export const UPDATE_METRIC = 'UPDATE_METRIC';
export const UPDATE_DATA_FILTER = 'UPDATE_DATA_FILTER';

export function updatePrimaryFilter(parameter, value, selectionType) {
  return {
    type: UPDATE_PRIMARY_FILTER,
    parameter,
    value,
    selectionType
  }
}

export function updateSecondaryFilter(parameter, value, selectionType) {
  return {
    type: UPDATE_SECONDARY_FILTER,
    parameter,
    value,
    selectionType
  }
}

export function setReport(report) {
  return {
    type: SET_REPORT,
    report
  }
}

export function updateDimension(dimension, selected) {
  return {
    type: UPDATE_DIMENSION,
    dimension,
    selected
  }
}

export function updateMetric(metric, selected) {
  return {
    type: UPDATE_METRIC,
    metric,
    selected
  }
}

export function updateDataFilter(alias, column, selected, operator, value) {
  return {
    type: UPDATE_DATA_FILTER,
    alias,
    column,
    selected,
    operator,
    value
  }
}