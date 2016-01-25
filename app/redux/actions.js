/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const UPDATE_PRIMARY_FILTER = 'UPDATE_PRIMARY_FILTER';
export const UPDATE_SECONDARY_FILTER = 'UPDATE_SECONDARY_FILTER';
export const UPDATE_TERTIARY_FILTER = 'UPDATE_TERTIARY_FILTER';

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

let nextTodoId = 0;

export function addTodo(text) {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text
  };
}

export function completeTodo(id) {
  return {
    type: COMPLETE_TODO,
    id
  }
}

export function setVisibilityFilter(filter) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}

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

export function updateTertiaryFilter(parameter, value, selectionType) {
  return {
    type: UPDATE_TERTIARY_FILTER,
    parameter,
    value,
    selectionType
  }
}