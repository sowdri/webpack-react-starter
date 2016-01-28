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