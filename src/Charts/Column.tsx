import React from 'react';
import * as d3 from 'd3';
import randomColor from 'randomcolor';

export function Column() {
  function drawChart1() {
    const data = [5, 10, 15, 20, 25, 30, 35, 40];
    const svg = d3.select('#svg1');

    data.forEach((_, i) => {
      svg
        .append('rect')
        .attr('height', data[i])
        .attr('width', 40)
        .transition()
        .duration(2000)
        .attr('x', 50 * i)
        .attr('y', 100 - data[i]);
    });
  }

  function drawChart2() {
    const data = [5, 10, 15, 20, 25, 30, 35, 40];
    const colors = randomColor({
      count: data.length,
    });
    const svg = d3.select('#svg2');

    svg
      .selectAll('bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('fill', (_, i) => colors[i])
      // callback의 첫 번째 인자 d는 data array의 값이다
      .attr('height', (d: number) => d)
      .attr('width', 40)
      .attr('x', (_, i) => 50 * i)
      .attr('y', (d: number) => 100 - d);
  }

  React.useEffect(() => {
    drawChart1();
    drawChart2();
  }, []);

  return (
    <div>
      <svg id="svg1" width="500" height="200"></svg>
      <svg id="svg2" width="500" height="200"></svg>
    </div>
  );
}
