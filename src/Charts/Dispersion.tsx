import React from 'react';
import * as d3 from 'd3';

type Tweet = {
  content: string;
  favorites: string[];
  retweets: string[];
  timestamp: string;
  user: string;
  impact?: number;
  tweetTime?: Date;
};

async function printTweetData() {
  const { tweets } = await d3.json<{ tweets: Tweet[] }>('/data/tweets.json');

  const newTweets: Tweet[] = tweets.map((tw) => ({
    ...tw,
    // favorites(관심글)와 retweets의 합계로 영향력 점수를 생성한다.
    impact: tw.favorites.length + tw.retweets.length,
    tweetTime: new Date(tw.timestamp),
  }));
  const maxImpact = d3.max(newTweets, (tw) => tw.impact);
  // Return the min and max simultaneously.
  const [start, end] = d3.extent(newTweets, (tw) => tw.tweetTime);
  const timeRamp = d3.scaleTime([start, end], [20, 480]);
  const yScale = d3.scaleLinear([0, maxImpact], [0, 460]);
  const radiusScale = d3.scaleLinear([0, maxImpact], [1, 20]);
  // 영향력을 흰색과 진한 빨간색 사이의 색으로 대응하는 스케일을 생성한다.
  const colorScale = d3.scaleLinear([0, maxImpact], ['white', '#990000']);

  const svg = d3
    .select('#tweets')
    .selectAll('g')
    // 바인딩 키를 설정해준다. -> data에 다른 객체를 넣었을 때 바인딩키가 없으면 이전 데이터와 비교가 안되서 제대로 동작하지 않는다.
    .data(newTweets, (tw: Tweet) => JSON.stringify(tw))
    .enter()
    .append('g')
    .attr(
      'transform',
      (d) => `translate(${timeRamp(d.tweetTime)}, ${480 - yScale(d.impact)})`,
    );

  svg
    .append('circle')
    .attr('r', (data) => radiusScale(data.impact))
    .attr('fill', (data) => colorScale(data.impact))
    .attr('stroke', 'black')
    .attr('stroke-width', '1px');

  svg
    .append('text')
    .text((data) => `${data.user} - ${data.tweetTime.getHours()}`)
    .attr('transform', () => `translate(0, 30)`)
    .attr('text-anchor', 'middle');

  // d3.selectAll('g').data([1, 2, 3, 4]).exit().remove();
  // d3.selectAll('g')
  //   .select('text')
  //   .text((data: number) => data);

  // 영향력이 없는 트윗은 제거
  const filteredTweets: Tweet[] = newTweets.filter((tw) => tw.impact > 0);
  d3.selectAll('g')
    .data(filteredTweets, (tw: Tweet) => JSON.stringify(tw))
    .exit()
    .remove();
}

export function Dispersion() {
  React.useEffect(() => {
    printTweetData();
  }, []);

  return (
    <div className="p-4">
      <svg id="tweets" width={550} height={550} />
    </div>
  );
}
