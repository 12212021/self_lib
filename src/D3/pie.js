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
        city: '沈阳市',
        population: '829.4'
    },
    {
        city: '大连市',
        population: '698.75'
    },
    {
        city: '鞍山市',
        population: '344.0 '
    },
    {
        city: '铁岭市',
        population: '299.8'
    },
    {
        city: '锦州市',
        population: '296.4'
    },
    {
        city: '朝阳市',
        population: '295'
    },
    {
        city: '葫芦岛市',
        population: '277.0'
    },
    {
        city: '营口市',
        population: '243.8'
    },
    {
        city: '丹东市',
        population: '239.5'
    },
    {
        city: '抚顺市',
        population: '210.7'
    },
    {
        city: '阜新市',
        population: '186.2'
    },
    {
        city: '辽阳市',
        population: '183.7'
    },
    {
        city: '本溪市',
        population: '147.63'
    },
    {
        city: '盘锦市',
        population: '143.65'
    }
];

data.forEach(el => {
    el.population = +el.population;
});
const total = data.reduce((sum, each) => {
    return sum + each.population;
}, 0);

const svg = d3.select('#main');
const mainGroup = svg
    .append('g')
    .attr('transform', `translate(${position.left}, ${position.top})`)
    .attr('width', innerWidth)
    .attr('height', innerHeight);

const colorScale = d3
    .scaleOrdinal()
    .domain(data.map(e => e.city))
    .range(d3.schemeSet1.concat(d3.schemeSet3));

const pie = d3
    .pie()
    .value(d => d.population)
    .sort((a, b) => d3.ascending(a.population, b.population));
const arcData = pie(data);
console.log(arcData);
const arc = d3.arc().innerRadius(80).outerRadius(280);

const container = mainGroup
    .append('g')
    .attr('transform', `translate(${innerWidth / 2}, ${innerHeight / 2})`);
container
    .selectAll('pie')
    .data(arcData)
    .join('path')
    .attr('class', 'pie')
    .attr('d', d => arc(d))
    .attr('fill', d => colorScale(d.data.city));

// 饼图上添加比例问题
container
    .selectAll('text')
    .data(arcData)
    .join('text')
    .attr('text-anchor', 'middle')
    .attr('transform', d => {
        const centerId = arc.centroid(d);
        return `translate(${centerId[0]}, ${centerId[1]})`;
    })
    .text(d => {
        const population = d.data.population;
        const proportion = (population / total) * 100;
        if (proportion > 5) {
            return proportion.toFixed(2) + '%';
        }
        return '';
    });
// 这里是arc套arc，外面一层的arc是隐形的，只用来展示文字
const arcLabel = d3.arc().innerRadius(280).outerRadius(350);
container
    .selectAll('text')
    .data(arcData)
    .join('text')
    .attr('transform', d => {
        const centerId = arcLabel.centroid(d);
        return `translate(${centerId[0]},${centerId[1]})`;
    })
    .attr('text-anchor', 'middle')
    .text(d => d.data.city);
