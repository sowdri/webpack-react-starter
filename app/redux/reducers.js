import { combineReducers } from 'redux'
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
import R from 'ramda'

const {SHOW_ALL} = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todo(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case COMPLETE_TODO:
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: true
      }
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ]
    case COMPLETE_TODO:
      return state.map(t => todo(t, action)
      )
    default:
      return state
  }
}

function primary(state = {}, action) {

  const {parameter, value, selectionType} = action;

  switch (action.type) {
    case 'UPDATE_PRIMARY_FILTER':
      return R.set(R.lensProp(parameter), value, state);
    default:
      return state;
  }
}

function secondary(state = {}, action) {
  const {parameter, value, selectionType} = action;

  switch (action.type) {
    case 'UPDATE_SECONDARY_FILTER':
      return R.set(R.lensProp(parameter), value, state);
    default:
      return state;
  }
}

function tertiary(state = {}, action) {

  const {parameter, value, selectionType} = action;

  switch (action.type) {
    case 'UPDATE_TERTIARY_FILTER':
      return R.set(R.lensProp(parameter), value, state);
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
    case 'UPDATE_SECONDARY_FILTERS':
      return {
        secondary: secondary(state.secondary, action),
        ...state
      }
    case 'UPDATE_TERTIARY_FILTER':
      return {
        tertiary: tertiary(state.tertiary, action),
        ...state
      }
    default:
      return state;
  }
}

function standardReport(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_PRIMARY_FILTER':
    case 'UPDATE_SECONDARY_FILTERS':
    case 'UPDATE_TERTIARY_FILTER':
      return {
        ...state,
        'filters': filters(state.filters, action)
      };
    default:
      return state;
  }
}

const reducers = {
  visibilityFilter,
  todos,
  standardReport
}

export default reducers