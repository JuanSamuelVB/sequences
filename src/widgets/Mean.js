import React from 'react';
import Widget from './Widget.js'

function getMean(input) {
  if (!input.length) return '-';

  const sum = input.reduce((a, b) => a + b, 0);
  return sum / input.length;
}

function Mean(props) {
  return <Widget name="Mean" value={getMean(props.input)} />;
}

export default Mean;
