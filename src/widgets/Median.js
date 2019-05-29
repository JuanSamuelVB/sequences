import React from 'react';
import Widget from './Widget.js'

function getMedian(input) {
  if (!input.length) return '-';

  input = input.slice().sort((a,b) => a - b);

  const index = Math.trunc(input.length / 2);

  if (input.length % 2 === 0) {
    return (input[index - 1] + input[index]) / 2;
  } else {
    return input[index];
  }
}

function Median(props) {
  return <Widget name="Median" value={getMedian(props.input)} />;
}

export default Median;
