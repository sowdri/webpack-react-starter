import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SingleSelectFilter from './SingleSelectFilter';
import MultiSelectFilter from './MultiSelectFilter';
import * as QueryIndex from '../../../meta/query';
import R from 'ramda';
import S from 'string';

const rg = /{{\s*(\w+)\s*}}/g;

/**
 * Parses the query and gets the required parameters from the template as an array.
 */
function getRequiredParameterNames(template) {

  const params = [];

  var matches;
  while ((matches = rg.exec(template)) != null) {
    params.push(matches[1]);
  }

  return params;
}

/**
 * Function to take the tempalte and convert to statement that is executable.
 *
 * @return {string} 
 *                  statement if all params are resolved.
 *                  else return undefined.
 */
function getStatement(template, parameters) {

  const required = getRequiredParameterNames(template);

  if (required.length == 0)
    return template;

  // check if all params are present
  for (var i = 0; i < required.length; i++) {
    // if required parameter is not present in parameters, then return undefined.
    if (!R.has(required[i])(parameters))
      return;
  }

  // all required params are present, use handlebars and convert to statement.
  return S(template).template(parameters).s;
}

/**
 * Utility function for fetch request
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

/**
 * Utility function for fetch request
 */
function parseJSON(response) {
  return response.json()
}

class QueryFilter extends Component {

  state = {
    options: [],
    statement: ''
  };

  componentWillMount() {
    this.getOptions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getOptions(nextProps);
  }

  getOptions(props) {

    const {queryName, parameters} = props;

    const template = QueryIndex[queryName];
    const statement = getStatement(template, parameters);

    // if statement is null, return
    if (!statement) {
      console.log(`Waiting for parameters to be resolved for template ${queryName}`);
      return;
    }

    // if statement is same, then no-op
    if (this.state.statement == statement)
      return;

    // clear options before running query
    this.setState({
      options: []
    });

    fetch('./api/filter', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        statement
      })
    }).then(checkStatus)
      .then(parseJSON)
      .then((options) => {
        this.setState({
          options,
          statement
        });
      }).catch(function(error) {
      console.log('request failed', error)
    });
  }

  getFilter(type, props) {
    switch (type) {
      case 'single_select':
        return <SingleSelectFilter {...props} options={ this.state.options } />;
      case 'multi_select':
        return <MultiSelectFilter {...props} options={ this.state.options } />;
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

QueryFilter.propTypes = {
  label: React.PropTypes.string.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array
  ]).isRequired,
  name: React.PropTypes.string.isRequired,
  parameter: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(['single_select', 'multi_select']).isRequired,
  queryName: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

QueryFilter.defaultProps = {
};



function select(state) {
  const parameters = R.pathOr({}, ['standardReport', 'filters', 'secondary'], state);

  return {
    parameters
  };
}

export default connect(select)(QueryFilter)