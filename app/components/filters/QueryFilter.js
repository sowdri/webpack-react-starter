import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SingleSelectFilter from './SingleSelectFilter';
import MultiSelectFilter from './MultiSelectFilter';
import * as QueryIndex from '../../meta/query';
import R from 'ramda';
import S from 'string';

const rg = /{{\s*(\w+)\s*}}/g;

class QueryFilter extends Component {

  state = {
    options: [],
    statement: ''
  };

  componentWillMount() {
    // console.log('componentWillMount', this.props);
    this.getOptions();
  }

  componentWillReceiveProps(nextProps) {
    this.getOptions();
  }

  getRequiredParams(template) {

    const params = [];

    var matches;
    while ((matches = rg.exec(template)) != null) {
      params.push(matches[1]);
    }

    return params;
  }

  getStatement(queryTemplate) {

    const {parameters} = this.props;

    console.log(parameters);

    const requiredParams = this.getRequiredParams(queryTemplate);

    if (requiredParams.length == 0)
      return queryTemplate;

    // check if all params are present
    for (var i = 0; i < requiredParams.length; i++) {
      // if required parameter is not present in parameters, then return undefined.
      if (!R.has(requiredParams[0])(parameters))
        return;
    }

    // all required params are present, use handlebars and convert to statement.
    return S(queryTemplate).template(parameters).s;
  }

  getOptions() {

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }

    function parseJSON(response) {
      return response.json()
    }

    const {queryName} = this.props;
    const queryTemplate = QueryIndex[queryName];

    const statement = this.getStatement(queryTemplate);

    if (!statement) {
      console.log(`Waiting for parameters to be resolved for template ${queryName}`);
      return;
    }

    if (this.state.statement == statement) {
      return;
    }

    // clear options
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