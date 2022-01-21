import React from 'react';
import * as d3 from 'd3';
import classes from './Svgs.module.scss';

export function Svgs() {
  function createSvg1() {
    d3.select('#svg1')
      .append('line')
      .attr('x1', 20)
      .attr('y1', 20)
      .attr('x2', 400)
      .attr('y2', 400)
      .style('stroke', 'black')
      .style('stroke-width', '2px');

    d3.select('#svg1').append('text').attr('x', 20).attr('y', 20).text('HELLO');

    d3.select('#svg1')
      .append('circle')
      .attr('r', 20)
      .attr('cx', 20)
      .attr('cy', 20)
      .style('fill', 'red');

    d3.select('#svg1')
      .append('circle')
      .attr('r', 100)
      .attr('cx', 400)
      .attr('cy', 400)
      .style('fill', 'lightblue');

    d3.select('svg').append('text').attr('x', 400).attr('y', 400).text('WORLD');
  }

  function createSvg2() {
    d3.select('#svg2')
      .append('circle')
      .attr('r', 20)
      .attr('cx', 20)
      .attr('cy', 20)
      .style('fill', 'red');

    d3.select('#svg2')
      .append('text')
      .attr('id', 'a')
      .attr('x', 20)
      .attr('y', 20)
      .style('opacity', 0)
      .text('HELLO WORLD');

    d3.select('#svg2')
      .append('circle')
      .attr('r', 100)
      .attr('cx', 400)
      .attr('cy', 400)
      .style('fill', 'lightblue');

    d3.select('#svg2')
      .append('text')
      .attr('id', 'b')
      .attr('x', 400)
      .attr('y', 400)
      .style('opacity', 0)
      .text('Uh, hi.');

    d3.select('#a').transition().delay(1000).style('opacity', 1);
    d3.select('#b').transition().delay(3000).style('opacity', 0.75);

    d3.selectAll('circle').transition().duration(2000).attr('cy', 200);
  }

  React.useEffect(() => {
    createSvg1();
    createSvg2();
  }, []);

  return (
    <div>
      <svg id="svg1" className={classes.Svg__Basic} />
      <svg id="svg2" className={classes.Svg__Basic} />
    </div>
  );
}
