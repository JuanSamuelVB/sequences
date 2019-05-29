import React from 'react';
import Widget from './Widget.js'

function getSum(input) {
  return input.reduce((a, b) => a + b, 0);
}

function Sum(props) {
  return <Widget name="Sum" value={getSum(props.input)} />;
}

export default Sum;
