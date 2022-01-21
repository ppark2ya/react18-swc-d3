import React from 'react';
import * as d3 from 'd3';

export function EventListener() {
  React.useEffect(() => {
    d3.select('div')
      .style('background-color', '#cecece')
      .style('font-size', '24px')
      .attr('id', 'new-div')
      .attr('class', 'd3Div')
      .html('text')
      .on('click', () => console.log('you clicked a div'));
  }, []);

  return <div></div>;
}
