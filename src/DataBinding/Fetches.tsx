/**
 * @see https://observablehq.com/@d3/d3v6-migration-guide
 * @desc d3 migration guide
 */
import React from 'react';
import * as d3 from 'd3';

type Placeholder = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

async function printJsonPlaceholders() {
  const data = await d3.json<Placeholder[]>(
    'https://jsonplaceholder.typicode.com/todos',
  );

  d3.select('#fetch-datas')
    .selectAll('.placeholders')
    .data(data)
    .enter()
    .append('p')
    .classed('placeholder', true)
    .html((d: Placeholder, index: number) => (index < 10 ? d.title : null));
}

function printRect() {
  const data = [15, 50, 22, 8, 100, 10];
  // svg는 기본적으로 select로 지정한 dom의 기준으로 오른쪽, 아래로 그린다.
  d3.select('#rect')
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', 10)
    .attr('height', (d: number) => d)
    .attr('fill', 'blue')
    .attr('stroke', 'red')
    .attr('stroke-width', '1px')
    .attr('opacity', '0.25')
    .attr('x', (_, index: number) => index * 10)
    // data의 최대값이 100이므로 y의 위치를 꼭대기에서의 거리로 측정하면 '최대값 - 높이'
    .attr('y', (d: number) => 100 - d);
}

/**
 * @desc 데이터 값의 편차가 심한 경우의 차트
 * scale 함수로 출력값을 정규화해준다.
 */
function printScaleRect() {
  const data = [14, 68, 24500, 430, 19, 1000, 5555];
  /**
   * @desc domain은 입력값의 범위, range()는 매핑한 결괏값의 범위를 지정
   * @case1 const yScale = d3.scaleLinear([0, 24500], [0, 100]);
   *
   * @desc 편차가 심한 값을 사용할 때는 다중선형(polylinear) 스케일을 사용하는 편이 좋다 (domain과 range에 여러 지점을 설정하는 선형 스케일)
   * @case2 const yScale = d3.scaleLinear([0, 100, 1000, 24500], [0, 50, 75, 100]);
   */
  // 최대값이 100보다 크면 100으로 매핑
  const yScale = d3.scaleLinear([0, 100, 500], [0, 50, 100]).clamp(true);

  d3.select('#rect-scale')
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', 10)
    .attr('height', (d: number) => yScale(d))
    .attr('fill', 'blue')
    .attr('stroke', 'red')
    .attr('stroke-width', '1px')
    .attr('opacity', '0.25')
    .attr('x', (_, index: number) => index * 10)
    .attr('y', (d: number) => 100 - yScale(d));
}

type City = {
  label: string;
  population: string;
  country: string;
  x: string;
  y: string;
};

async function printCitiesData() {
  const cities = await d3.csv('/data/cities.csv');
  const maxPopulation = d3.max(cities, (data: City) =>
    parseInt(data.population),
  );
  const yScale = d3.scaleLinear([0, maxPopulation], [0, 460]);
  const tooltip = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  d3.select('#cities')
    .attr('style', 'width: 600px; height: 480px')
    .append('g')
    .selectAll('rect')
    .data(cities)
    .enter()
    .append('rect')
    .attr('width', 50)
    .attr('height', (data: City) => yScale(parseInt(data.population)))
    .attr('x', (_, index: number) => index * 55)
    .attr('y', (data: City) => 480 - yScale(parseInt(data.population)))
    .attr('fill', 'blue')
    .attr('stroke', 'red')
    .attr('stroke-width', '1px')
    .attr('opacity', '0.5')
    .on('mouseover', function (_, data: City) {
      tooltip
        .transition()
        .duration(100)
        .style('opacity', 1)
        .text(`Population: ${parseInt(data.population)}`);
    })
    .on('mousemove', function (event: React.MouseEvent) {
      tooltip
        .style('top', `${event.clientY - 10}px`)
        .style('left', `${event.clientX + 10}px`);
    })
    .on('mouseout', function () {
      tooltip.transition().duration(100).style('opacity', 0);
    });
}

type Tweet = {
  content: string;
  favorites: string[];
  retweets: string[];
  timestamp: string;
  user: string;
  numTweets?: number;
};

async function printTweetData() {
  const { tweets } = await d3.json<{ tweets: Tweet[] }>('/data/tweets.json');

  /**
   * @see https://observablehq.com/@d3/d3v6-migration-guide#group
   * @see https://github.com/d3/d3-array/blob/main/README.md#rollup
   * @see https://observablehq.com/@d3/d3-group
   * @desc nest() -> rollup()
   */
  const nestedTweets = d3.rollup(
    tweets,
    (value: Tweet[]) => ({
      tweets: value,
      numTweets: value.length,
    }),
    (tweet) => tweet.user,
  );
  const maxTweets = d3.max(nestedTweets, ([, tweet]) => tweet.numTweets);
  const yScale = d3.scaleLinear([0, maxTweets], [0, 100]);

  d3.select('#tweets')
    .attr('style', 'width: 600px; height: 480px; margin-top: 20px')
    .append('g')
    .selectAll('rect')
    .data(nestedTweets)
    .enter()
    .append('rect')
    .attr('width', 50)
    .attr('height', ([, tweet]) => yScale(tweet.numTweets))
    .attr('x', (_, index: number) => index * 60)
    .attr('y', ([, tweet]) => 100 - yScale(tweet.numTweets))
    .attr('fill', 'blue')
    .attr('stroke', 'red')
    .attr('stroke-width', '1px')
    .attr('opacity', '0.5');
}

export function Fetches() {
  React.useEffect(() => {
    printJsonPlaceholders();
    printRect();
    printScaleRect();
    printCitiesData();
    printTweetData();
  }, []);

  return (
    <div className="p-4">
      <div id="fetch-datas"></div>
      <svg id="rect" />
      <svg id="rect-scale" />
      <svg id="cities" />
      <svg id="tweets" />
    </div>
  );
}
