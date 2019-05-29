import React from 'react';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import './LinePlot.css';

class LinePlot extends React.Component {
  constructor(props) {
    super(props);
    this.createLinePlot = this.createLinePlot.bind(this);
  }

  componentDidMount() {
    this.createLinePlot();
    window.addEventListener('resize', this.createLinePlot);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.createLinePlot);
  }

  componentDidUpdate() {
    this.createLinePlot();
  }

  getStyle(element, cssRule) {
    var strValue = "";
    if (document.defaultView && document.defaultView.getComputedStyle) {
			strValue = document.defaultView
        .getComputedStyle(element, "")
        .getPropertyValue(cssRule);
    } else if (element.currentStyle) {
			cssRule = cssRule.replace(/-(\w)/g, (strMatch, p1) => p1.toUpperCase());
			strValue = element.currentStyle[cssRule];
    }
    return strValue;
  }

  createLinePlot() {
    let nodeWidth = this.node.getBoundingClientRect().width;
    let nodeHeight = this.node.getBoundingClientRect().height;

    nodeWidth -= parseFloat(this.getStyle(this.node, 'padding-left'));
    nodeWidth -= parseFloat(this.getStyle(this.node, 'padding-right'));

    nodeHeight -= parseFloat(this.getStyle(this.node, 'padding-top'));
    nodeHeight -= parseFloat(this.getStyle(this.node, 'padding-bottom'));

    const node = select(this.node);

    node.selectAll('svg')
      .data([[nodeWidth, nodeHeight]])
      .enter()
      .append('svg');

    node.selectAll('svg')
      .data([[nodeWidth, nodeHeight]])
      .exit()
      .remove();

    node.selectAll('svg')
      .data([[nodeWidth, nodeHeight]])
      .attr('width', d => d[0])
      .attr('height', d => d[1]);

    let xMin, xMax, yMin, yMax;
    if (!this.props.input.length) {
      xMin = 0;
      xMax = 1;
      yMin = 0;
      yMax = 1;
    } else {
      xMin = 0;
      xMax = this.props.input.length - 1;
      yMax = this.props.input.reduce((a,b) => Math.max(a, b));
      yMin = this.props.input.reduce((a,b) => Math.min(a, b));
    }

    const margin = 10;
    const xScale = scaleLinear()
      .domain([xMin, xMax])
      .range([0 + margin, nodeWidth - margin]);
    const yScale = scaleLinear()
      .domain([yMin, yMax])
      .range([nodeHeight - margin, 0 + margin]);
    const lineGenerator = line().x((_, i) => xScale(i)).y(d => yScale(d));

    const svg = node.select('svg');

    svg.selectAll('.LinePlot-line')
      .data([this.props.input])
      .enter()
      .append('path')
      .attr('class', 'LinePlot-line');

    svg.selectAll('.LinePlot-line')
      .data([this.props.input])
      .exit()
      .remove();

    svg.selectAll('.LinePlot-line')
      .data([this.props.input])
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('d', lineGenerator);

    svg.selectAll('.LinePlot-point')
      .data(this.props.input)
      .enter()
      .append('circle')
      .attr('class', 'LinePlot-point');

    svg.selectAll('.LinePlot-point')
      .data(this.props.input)
      .exit()
      .remove();

    svg.selectAll('.LinePlot-point')
      .data(this.props.input)
      .attr('cx', (_, i) => xScale(i))
      .attr('cy', (d) => yScale(d))
      .attr('r', 2);
  }

  render() {
    return <div ref={node => this.node = node}
                className="LinePlot"></div>;
  }
}

export default LinePlot;
