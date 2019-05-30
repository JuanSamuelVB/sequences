import React from 'react';
import Sum from './widgets/Sum.js';
import Mean from './widgets/Mean.js';
import Median from './widgets/Median.js';
import LinePlot from './widgets/LinePlot.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';

    if (!event.target.value) {
      this.setState({input: []});
      return;
    }

    const input = event.target.value
      .split(',')
      .map(x => x.replace(/[^0-9exX\-\.]/g, ""))
      .map(x => +x)
      .filter(x => !Number.isNaN(x));

    this.setState({input});
  }

  inputToString(input) {
    if (!input.length) return '{}';

    const s = input.reduce((a, b) => a + ', ' + b);

    return '{' + s + '}';
  }

  render () {
    return (
      <div className="App">
          <textarea className="App-input"
                    autoFocus="true"
                    rows="1"
                    placeholder="e.g. 1, 2, 3, ..."
                    onChange={this.handleChange}></textarea>
          <div>Input: {this.inputToString(this.state.input)}</div>
        <div className="App-widgets">
          <Sum input={this.state.input} />
          <Mean input={this.state.input} />
          <Median input={this.state.input} />
          <LinePlot input={this.state.input} />
        </div>
      </div>
    );
  }
}

export default App;
