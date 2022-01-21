import React from 'react';
import * as d3 from 'd3';

export function Intro() {
  const boxRef = React.useRef(null);
  React.useEffect(() => {
    // d3.selectAll('circle').attr('class', 'active');
    // d3.select('circle').classed('deactive', true);

    // d3.select('body')
    // .selectAll('.box')
    d3.select(boxRef.current)
      .selectAll('.box')
      // data: 셀렉션에 있는 각 요소를 배열에 있는 각 항목에 바인딩하는 함수
      .data([40, 17, 9])
      // enter: 배열 항목 수가 요소의 개수가 많을 때 남은 항목을 어떻게 할 것인지에 대한 정의를 내리는 함수 <-> exit
      .enter()
      .append('div')
      .html((d: any) => d)
      .append('span')
      .html('evan')
      .style('font-weight', '900');

    const dataset = [5, 10, 15, 20, 25];

    d3.select('body') // 1. body 요소를 선택하고,
      .selectAll('p') // 2. 그 아래에서 p요소를 전부 선택한다.
      .data(dataset) // 3. dataset을 이 미리 선택한 selection 객체에 바인드한다.
      .enter() // 4. enter()를 통해서 p 요소에 바인드가 되지 않는, 즉 대응하는 p 요소가 없는 데이터에 대해 새로운 selection을 반환받는다.
      .append('p') // 5. 다음으로 이렇게 선택된 요소들에 대해 실제로 p 태그로 이루어진 문서 요소를 생성한다.
      .text('New paragraph!'); // 6. 이 새로운 p 요소에 “New paragraph!”라는 내용을 쓴다.
  }, [boxRef]);

  return (
    <div
      ref={boxRef}
      className="box"
      style={{ width: '200px', height: '50px', border: '1px solid gray' }}
    >
      <svg style={{ width: '500px', height: '500px' }}>
        <g>
          <circle r="2"></circle>
          <text>this is circle label</text>
        </g>
        <g transform="translate(100, 50)">
          <circle r="2"></circle>
          <text>this is circle label</text>
        </g>
        <g transform="translate(100, 400) scale(3.5)">
          <circle r="2" />
          <text>this is circle label</text>
        </g>
      </svg>
    </div>
  );
}
