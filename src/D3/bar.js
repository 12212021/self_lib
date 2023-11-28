const width = 1200;
const height = 800;
const position = {
    left: 100,
    top: 50,
    right: 50,
    bottom: 50
};
const innerWidth = width - position.left - position.right;
const innerHeight = height - position.top - position.bottom;

const data = [
    {
        name: 'xianhe',
        age: 1
    },
    {
        name: 'pipi',
        age: 30
    },
    {
        name: 'feifei',
        age: 30
    },
    {
        name: 'nai',
        age: 54
    },
    {
        name: 'ye',
        age: 54
    },
    {
        name: 'tai',
        age: 72
    }
];

const mainSvg = d3.select('#main').attr('width', width).attr('height', height);
const mainGroup = mainSvg
    .append('g')
    .attr('height', innerHeight)
    .attr('width', innerWidth)
    .attr('transform', `translate(${position.left}, ${position.top})`);
// 设置数据和画布之间的映射关系
const xScale = d3
    .scaleBand()
    .domain(data.map(el => el.name))
    .range([0, innerWidth])
    .padding(0.5);
const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map(el => el.age)))
    .range([innerHeight, 0]);
// 画轴
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);
// 添加轴
mainGroup
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(xAxis);
mainGroup.append('g').attr('class', 'y-axis').call(yAxis);

// 添加数据
// 这里用的坐标轴是数学坐标轴和计算机的坐标轴不一致，大小需要转化
mainGroup
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('fill', 'green')
    .attr('width', xScale.bandwidth())
    .attr('height', d => innerHeight - yScale(d.age))
    .attr('transform', d => `translate(${xScale(d.name)}, ${yScale(d.age)})`);
