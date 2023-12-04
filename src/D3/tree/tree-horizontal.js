/**
 * d3中 tree布局默认是横向布局
 *
 * 本例子是基于nodeSize进行布局的
 *
 * 备注：d3中tree的size方法和nodeSize方法是不能并存的，只能基于其中的一种去做布局
 */
import {data} from './data.js';

let width = 0;
let height = 0;
// node在x方向的大小
let dx = 150;
// node在y方向的大小
let dy = 200;

// 将数据进行层次化
const dataset = d3.hierarchy(data);

// 创建树布局
const tree = d3
    .tree()
    .nodeSize([dx, dy])
    .separation((a, b) => {
        // 去区分同层相邻node之间的距离，该函数是默认值
        return a.parent == b.parent ? 1 : 2;
    });

// 所有节点
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
width = right - left + 2 * dx;
height = bottom - 0 + 2 * dy;

const svg = d3
    .select('#main')
    .attr('width', width)
    .attr('height', height)
    // viewBox相当于去指定了一个映射
    .attr('viewBox', [left, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; user-select: none;');
const group = svg.append('g').attr('transform', `translate(${dx}, ${dy})`);
const color = d3.scaleOrdinal(d3.schemeCategory10);

group
    .selectAll('.link')
    .data(nodes.links())
    .join('path')
    .attr('class', 'link')
    .attr(
        'd',
        d3
            .linkHorizontal()
            .x(d => d.x)
            .y(d => d.y)
    )
    .attr('fill', 'none')
    .attr('stroke', '#ccc');

const nodeGroups = group
    .selectAll('.node')
    .data(nodes.descendants())
    .join('g')
    .attr('class', 'node')
    .attr('transform', d => {
        return `translate(${d.x},${d.y})`;
    });

nodeGroups
    .append('circle')
    .attr('r', 70)
    .attr('fill', (d, i) => color(i));

nodeGroups
    .append('text')
    .attr('dy', '.33em')
    .attr('font-size', '24px')
    .attr('text-anchor', 'middle')
    .attr('fill', '#fff')
    .text(d => d.data.name);
