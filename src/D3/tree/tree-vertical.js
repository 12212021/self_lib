import {data} from './data.js';
let width = 0;
let height = 0;
let dx = 150;
let dy = 300;
const circleSize = 100;

const dataset = d3.hierarchy(data);
// 反位置信息
const tree = d3.tree().nodeSize([dx, dy]);

const nodes = tree(dataset);
// 计算tree的最左边和最右边
let left = Infinity;
let right = -Infinity;
let bottom = -Infinity;
dataset.each(d => {
    if (d.x > right) {
        right = d.x;
    }
    if (d.x < left) {
        left = d.x;
    }
    if (d.y > bottom) {
        bottom = d.y;
    }
});

// 需要留两侧的node展示大小
height = right - left + circleSize * 2;
width = bottom - 0 + circleSize * 2;

const svg = d3
    .select('#main')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, left, width, height])
    .attr('style', 'max-width: 100%; height: auto; user-select: none;');

const group = svg
    .append('g')
    .attr('transform', `translate(${circleSize}, ${circleSize})`);
const color = d3.scaleOrdinal(d3.schemeCategory10);

// 定义箭头
svg.append('svg:defs')
    .selectAll('marker')
    .data(['end'])
    .join('svg:marker')
    .attr('id', d => d)
    .attr('viewBox', [0, -5, 10, 10])
    .attr('refX', 10)
    .attr('refY', 0)
    .attr('markerWidth', 10)
    .attr('markerHeight', 10)
    .attr('orient', 'auto')
    .attr('fill', '#ccc')
    .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5');

group
    .selectAll('.link')
    .data(nodes.links())
    .join('path')
    .attr('class', 'link')
    .attr(
        'd',
        // 反位置
        d3
            .linkHorizontal()
            .x(d => d.y)
            .y(d => d.x)
    )
    .attr('fill', 'none')
    .attr('stroke', '#ccc')
    // 添加箭头
    .attr('marker-end', 'url(#end)');

const nodeGroups = group
    .selectAll('.node')
    .data(nodes.descendants())
    .join('g')
    .attr('class', 'node')
    .attr('transform', d => {
        return `translate(${d.y},${d.x})`;
    });

nodeGroups
    .append('rect')
    // .attr('r', circleSize)
    .attr('width', circleSize)
    .attr('height', circleSize)
    .attr('y', -circleSize / 2)
    .attr('fill', (d, i) => color(i));

nodeGroups
    .append('text')
    .attr('font-size', '14px')
    .attr('x', circleSize / 2)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('fill', '#000')
    .text(d => d.data.name);
