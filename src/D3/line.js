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
        year: 2020,
        globalsale: 0.29
    },
    {
        year: 2017,
        globalsale: 0.05
    },
    {
        year: 2016,
        globalsale: 70.93
    },
    {
        year: 2015,
        globalsale: 264.44
    },
    {
        year: 2014,
        globalsale: 337.05
    },
    {
        year: 2013,
        globalsale: 368.11
    },
    {
        year: 2012,
        globalsale: 363.54
    },
    {
        year: 2011,
        globalsale: 515.99
    },
    {
        year: 2010,
        globalsale: 600.45
    },
    {
        year: 2009,
        globalsale: 667.3
    },
    {
        year: 2008,
        globalsale: 678.9
    },
    {
        year: 2007,
        globalsale: 611.13
    },
    {
        year: 2006,
        globalsale: 521.04
    },
    {
        year: 2005,
        globalsale: 459.94
    },
    {
        year: 2004,
        globalsale: 419.31
    },
    {
        year: 2003,
        globalsale: 357.85
    },
    {
        year: 2002,
        globalsale: 395.52
    },
    {
        year: 2001,
        globalsale: 331.47
    },
    {
        year: 2000,
        globalsale: 201.56
    },
    {
        year: 1999,
        globalsale: 251.27
    },
    {
        year: 1998,
        globalsale: 256.47
    },
    {
        year: 1997,
        globalsale: 200.98
    },
    {
        year: 1996,
        globalsale: 199.15
    },
    {
        year: 1995,
        globalsale: 88.11
    },
    {
        year: 1994,
        globalsale: 79.17
    },
    {
        year: 1993,
        globalsale: 45.98
    },
    {
        year: 1992,
        globalsale: 76.16
    },
    {
        year: 1991,
        globalsale: 32.23
    },
    {
        year: 1990,
        globalsale: 49.39
    },
    {
        year: 1989,
        globalsale: 73.45
    },
    {
        year: 1988,
        globalsale: 47.22
    },
    {
        year: 1987,
        globalsale: 21.74
    },
    {
        year: 1986,
        globalsale: 37.07
    },
    {
        year: 1985,
        globalsale: 53.94
    },
    {
        year: 1984,
        globalsale: 50.36
    },
    {
        year: 1983,
        globalsale: 16.79
    },
    {
        year: 1982,
        globalsale: 28.86
    },
    {
        year: 1981,
        globalsale: 35.77
    },
    {
        year: 1980,
        globalsale: 11.38
    }
];

data.forEach(e => {
    e.date = new Date(`${e.year}-01-01`);
});
const svg = d3.select('#main');
const mainGroup = svg
    .append('g')
    .attr('transform', `translate(${position.left}, ${position.top})`)
    .attr('width', innerWidth)
    .attr('height', innerHeight);

console.log(d3.extent(data.map(e => new Date(e.year))), data);
const xScale = d3
    .scaleTime()
    .domain(d3.extent(data.map(e => new Date(e.date))))
    .range([0, innerWidth]);
xScale.tickFormat('%Y');
// xScale..ticks(d3.utcYear.every(2))

const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map(e => e.globalsale)))
    .range([innerHeight, 0]);

const xAxis = d3.axisBottom(xScale).ticks(Math.floor(data.length / 2));
const yAxis = d3.axisLeft(yScale);

mainGroup
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(xAxis);
mainGroup.append('g').attr('class', 'y-axis').call(yAxis);

svg.append('text')
    .text('Global Sales')
    .attr('text-anchor', 'middle')
    .attr('transform', `translate(30, ${height / 2}) rotate(90)`);

svg.append('text')
    .text('Year')
    .attr('text-anchor', 'middle')
    .attr('transform', `translate(${width / 2}, ${height - 10})`);

// 描述line数据模型
const line = d3
    .line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.globalsale))
    .curve(d3.curveCardinal.tension(0.99));
mainGroup
    .append('path')
    .attr('d', line(data))
    .attr('fill', 'none')
    .attr('stroke', 'black');

mainGroup
    .selectAll('point-circle')
    .data(data)
    .join('circle')
    .attr('class', 'point-circle')
    .attr('cx', d => xScale(d.date))
    .attr('cy', d => yScale(d.globalsale))
    .attr('r', 10)
    .attr('stroke-width', 2)
    .attr('stroke', '#364747')
    .attr('fill', '#364747')
    .attr('opacity', 0.6);
