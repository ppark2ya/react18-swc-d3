import React from 'react';
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';
import randomColor from 'randomcolor';

type DatasetType = {
  name: string;
  value: number;
};

const dataset: DatasetType[] = [
  {
    name: 'SKT',
    value: 9,
  },
  {
    name: 'KT',
    value: 20,
  },
  {
    name: 'DK',
    value: 30,
  },
  {
    name: 'Liiv',
    value: 8,
  },
  {
    name: 'CJ',
    value: 12,
  },
];

const width = 450,
  height = 450,
  margin = 40;

export function Pie() {
  React.useEffect(() => {
    const radius = Math.min(width, height) / 2 - margin;
    const colors = randomColor({
      luminosity: 'dark',
      format: 'rgba',
      // alpha: 0.4,
      count: 5,
    });

    const svg = d3
      .select('#pie')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arc = d3
      .arc<PieArcDatum<DatasetType>>()
      // .innerRadius(100)
      .innerRadius(0)
      .outerRadius(radius - 10);

    // .value(): pie차트의 value 값을 가져오는 callback 정의
    const pie = d3
      .pie<DatasetType>()
      .sort(null)
      .value((data) => data.value);

    const pieData = pie(dataset);

    /**
     * @see https://frhyme.github.io/others/enter_exit_in_d3/
     * @desc enter와 exit 함수
     */
    const g = svg.selectAll('.arc').data(pieData).enter().append('g');

    g.append('path')
      .attr('d', arc)
      .attr('fill', (_, i) => colors[i])
      .attr('stroke', 'black')
      .attr('stroke-width', '2px')
      .style('opacity', 0.7)
      .on('mouseover', function () {
        d3.select(this).transition().duration(200).style('opacity', 1);
      })
      .on('mouseout', function () {
        d3.select(this).transition().duration(200).style('opacity', 0.7);
      });

    g.append('text')
      .attr('transform', function (d: d3.PieArcDatum<DatasetType>) {
        let [x, y] = arc.centroid(d);
        x *= 2.3; //multiply by a constant factor
        y *= 2.3; //multiply by a constant factor
        return `translate(${[x, y]})`;
      })
      .attr('dy', '.50em')
      .style('text-anchor', 'middle')
      .text(function (d) {
        return d.data.value + '%';
      });
  }, []);

  return <div id="pie" style={{ width, height }} />;
}
