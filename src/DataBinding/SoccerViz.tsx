import React from 'react';
import * as d3 from 'd3';
import './soccer.scss';

type WorldCupTeamInfo = {
  team: string;
  region: string;
  win: number;
  loss: number;
  draw: number;
  points: number;
  gf: number;
  ga: number;
  cs: number;
  yc: number;
  rc: number;
};

async function createSoccerViz() {
  const worldcup = await d3.csv('/data/worldcup.csv');

  d3.select('svg')
    .append('g')
    .attr('id', 'teamsG')
    .attr('transform', 'translate(50, 300)')
    .selectAll('g')
    .data(worldcup)
    .enter()
    .append('g')
    .attr('class', 'overallG')
    .attr('transform', (_, index) => `translate(${index * 50}, 0)`);

  const teamG = d3.selectAll('g.overallG');

  function onMouseOver(
    e: React.MouseEvent<SVGAElement>,
    wordcupInfo: WorldCupTeamInfo,
  ) {
    d3.select(this.parentElement)
      .select('text')
      .classed('active', true)
      .attr('y', 10);

    // const teamColor = d3.rgb('pink');
    const teamColor = d3.hsl('pink');

    d3.selectAll('g.overallG')
      .select('circle')
      .each(function (p: WorldCupTeamInfo) {
        if (p.region === wordcupInfo.region) {
          d3.select(this).classed('active', true);
        } else {
          d3.select(this).classed('inactive', true);
        }
      })
      .attr('fill', (p: WorldCupTeamInfo) =>
        p.region === wordcupInfo.region
          ? (teamColor.darker(0.75) as any)
          : (teamColor.brighter(0.1) as any),
      );
  }

  function onMouseOut() {
    d3.selectAll('g.overallG')
      .select('circle')
      .attr('class', '')
      .attr('fill', 'pink');

    d3.selectAll('g.overallG')
      .select('text')
      .classed('active', false)
      .attr('y', 30);
  }

  teamG
    .append('circle')
    .attr('fill', 'pink')
    .style('stroke', 'black')
    .style('stroke-width', '1px')
    .on('mouseover', onMouseOver)
    .attr('r', 0)
    .transition()
    .delay((_, index) => index * 100)
    .duration(500)
    .attr('r', 40)
    .transition()
    .duration(500)
    .attr('r', 20);

  teamG
    .append('text')
    .style('text-anchor', 'middle')
    .attr('y', 30)
    .style('font-size', '10px')
    // 마우스 이벤트 비활성화
    .style('pointer-events', 'none')
    .text((d: WorldCupTeamInfo) => d.team);

  teamG.on('mouseout', onMouseOut);

  const dataKeys = Object.keys(worldcup[0]).filter(
    (el: keyof WorldCupTeamInfo) => el !== 'team' && el !== 'region',
  );

  function onButtonClick(
    e: React.MouseEvent<SVGAElement>,
    datapoint: keyof Omit<WorldCupTeamInfo, 'team' | 'region'>,
  ) {
    const maxValue = d3.max(worldcup, (d) => parseFloat(d[datapoint]));
    const colorScale = d3.scaleOrdinal(
      ['UEFA', 'CONMEBOL', 'CAF', 'AFC'],
      d3.schemeCategory10,
    );
    const radiusScale = d3.scaleLinear([0, maxValue], [2, 20]);
    // const ybRamp = d3
    //   .scaleLinear([0, maxValue], ['yellow', 'blue'])
    //   // HSL, HCL, LAB 등 사용 가능
    //   .interpolate(d3.interpolateLab);

    d3.selectAll('g.overallG')
      .select('circle')
      .transition()
      .duration(500)
      .attr('r', (d) => radiusScale(d[datapoint]))
      // .attr('fill', (d) => ybRamp(d[datapoint]));
      .attr('fill', (d: WorldCupTeamInfo) => colorScale(d.region));
  }

  d3.select('#controls')
    .selectAll('button.teams')
    .data(dataKeys)
    .enter()
    .append('button')
    .attr('class', 'p-2 m-2 border-2 border-solid border-rose-500 rounded')
    .on('click', onButtonClick)
    .html((d: keyof Omit<WorldCupTeamInfo, 'team' | 'region'>) => d);
}

export function SoccerViz() {
  React.useEffect(() => {
    createSoccerViz();
  }, []);

  return (
    <>
      <div id="viz">
        <svg
          width={500}
          height={500}
          style={{ border: '1px lightgray solid' }}
        />
      </div>
      <div id="controls"></div>
    </>
  );
}
