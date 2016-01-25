import React from 'react';


export default class Nested extends React.Component {
  render() {
    return (
      <div>
        <div>Page 2</div>
        <div>
          { this.props.children }
        </div>
      </div>
      );
  }
}