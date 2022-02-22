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

export function Fetches() {
  React.useEffect(() => {
    printJsonPlaceholders();
    printRect();
    printScaleRect();
  }, []);

  return (
    <div className="p-4">
      <div id="fetch-datas"></div>
      <svg id="rect" />
      <svg id="rect-scale" />
    </div>
  );
}
