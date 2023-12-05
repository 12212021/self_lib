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
        state: 'CA',
        age: '<10',
        population: 5038433
    },
    {
        state: 'TX',
        age: '<10',
        population: 3983091
    },
    {
        state: 'FL',
        age: '<10',
        population: 2211012
    },
    {
        state: 'NY',
        age: '<10',
        population: 2319945
    },
    {
        state: 'IL',
        age: '<10',
        population: 1619682
    },
    {
        state: 'PA',
        age: '<10',
        population: 1458931
    },
    {
        state: 'CA',
        age: '10-19',
        population: 5170341
    },
    {
        state: 'TX',
        age: '10-19',
        population: 3910528
    },
    {
        state: 'FL',
        age: '10-19',
        population: 2331102
    },
    {
        state: 'NY',
        age: '10-19',
        population: 2445591
    },
    {
        state: 'IL',
        age: '10-19',
        population: 1715984
    },
    {
        state: 'PA',
        age: '10-19',
        population: 1608018
    },
    {
        state: 'CA',
        age: '20-29',
        population: 5809455
    },
    {
        state: 'TX',
        age: '20-29',
        population: 3946447
    },
    {
        state: 'FL',
        age: '20-29',
        population: 2597830
    },
    {
        state: 'NY',
        age: '20-29',
        population: 2894266
    },
    {
        state: 'IL',
        age: '20-29',
        population: 1789739
    },
    {
        state: 'PA',
        age: '20-29',
        population: 1712448
    },
    {
        state: 'CA',
        age: '30-39',
        population: 5354112
    },
    {
        state: 'TX',
        age: '30-39',
        population: 3770534
    },
    {
        state: 'FL',
        age: '30-39',
        population: 2416176
    },
    {
        state: 'NY',
        age: '30-39',
        population: 2605355
    },
    {
        state: 'IL',
        age: '30-39',
        population: 1721954
    },
    {
        state: 'PA',
        age: '30-39',
        population: 1520409
    },
    {
        state: 'CA',
        age: '40-49',
        population: 5179258
    },
    {
        state: 'TX',
        age: '40-49',
        population: 3545746
    },
    {
        state: 'FL',
        age: '40-49',
        population: 2575576
    },
    {
        state: 'NY',
        age: '40-49',
        population: 2617327
    },
    {
        state: 'IL',
        age: '40-49',
        population: 1697069
    },
    {
        state: 'PA',
        age: '40-49',
        population: 1645291
    },
    {
        state: 'CA',
        age: '50-59',
        population: 5042094
    },
    {
        state: 'TX',
        age: '50-59',
        population: 3344930
    },
    {
        state: 'FL',
        age: '50-59',
        population: 2762983
    },
    {
        state: 'NY',
        age: '50-59',
        population: 2755620
    },
    {
        state: 'IL',
        age: '50-59',
        population: 1773366
    },
    {
        state: 'PA',
        age: '50-59',
        population: 1881378
    },
    {
        state: 'CA',
        age: '60-69',
        population: 3737461
    },
    {
        state: 'TX',
        age: '60-69',
        population: 2431494
    },
    {
        state: 'FL',
        age: '60-69',
        population: 2404659
    },
    {
        state: 'NY',
        age: '60-69',
        population: 2095207
    },
    {
        state: 'IL',
        age: '60-69',
        population: 1326121
    },
    {
        state: 'PA',
        age: '60-69',
        population: 1491536
    },
    {
        state: 'CA',
        age: '70-79',
        population: 2011678
    },
    {
        state: 'TX',
        age: '70-79',
        population: 1291486
    },
    {
        state: 'FL',
        age: '70-79',
        population: 1615547
    },
    {
        state: 'NY',
        age: '70-79',
        population: 1160055
    },
    {
        state: 'IL',
        age: '70-79',
        population: 728821
    },
    {
        state: 'PA',
        age: '70-79',
        population: 850897
    },
    {
        state: 'CA',
        age: '≥80',
        population: 1311374
    },
    {
        state: 'TX',
        age: '≥80',
        population: 732179
    },
    {
        state: 'FL',
        age: '≥80',
        population: 1019566
    },
    {
        state: 'NY',
        age: '≥80',
        population: 804091
    },
    {
        state: 'IL',
        age: '≥80',
        population: 478948
    },
    {
        state: 'PA',
        age: '≥80',
        population: 615069
    }
];

const states = [...new Set(data.map(e => e.state))];
const ages = [...new Set(data.map(e => e.age))];

// 颜色scale
const colorScale = d3
    .scaleOrdinal()
    .domain(ages)
    .range(d3.schemeSpectral[ages.length])
    .unknown('#ccc');
// 每组group的xScale
const groupXScale = d3
    .scaleBand()
    .domain(states)
    .range([0, innerWidth])
    // 让每个band的开始和结束都是整数，为了抗锯齿？
    .round(true)
    .paddingInner(0.1);

// group的bar的scale
const xScale = d3
    .scaleBand()
    .domain(ages)
    // 是range().round(true)的缩写
    .rangeRound([0, groupXScale.bandwidth()])
    .paddingInner(0.05);
const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.population)])
    .rangeRound([position.top + innerHeight, position.top])
    .nice();

const svg = d3
    .select('#main')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto;');

const group = svg
    .append('g')
    .attr('width', innerWidth)
    .attr('height', innerHeight)
    .attr('transform', `translate(${position.left}, ${position.top})`);
group
    .selectAll()
    .data(d3.group(data, d => d.state))
    .join('g')
    .attr('transform', ([groupKey, list]) => {
        return `translate(${groupXScale(groupKey)},0)`;
    })
    .selectAll()
    // 里面小的bar
    .data(([groupKey, d]) => d)
    .join('rect')
    .attr('x', d => xScale(d.age))
    .attr('width', xScale.bandwidth())
    .attr('y', d => {
        const height = yScale(0) - yScale(d.population);
        return yScale(0) - height - position.bottom;
    })
    .attr('height', d => {
        return yScale(0) - yScale(d.population);
    })
    .attr('fill', d => colorScale(d.age));

svg.append('g')
    .attr(
        'transform',
        `translate(${position.left},${position.top + innerHeight})`
    )
    .call(d3.axisBottom(groupXScale))
    .call(g => g.selectAll('.domain').remove());
svg.append('g')
    .attr('transform', `translate(${position.left},0)`)
    .call(d3.axisLeft(yScale).ticks(null, 's'));
