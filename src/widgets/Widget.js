import React from 'react';
import './Widget.css';

function Widget(props) {
  return (
    <div className="Widget">
      <div className="Widget-name">{props.name}</div>
      <div className="Widget-value">{props.value}</div>
    </div>
  );
}

export default Widget;
