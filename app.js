const data = [
    { name : "Orange", value : 57.3 },
    { name : "MTN", value : 34.7 },
    { name : "Camtel", value : 48.9 },
    { name : "Viettel", value : 47 },
    { name : "Yoomee", value : 65.27 },
]

const margin = 60;
const width = 1000 
const height = 600

const svg = d3.select('#chart')
        .append('svg')
            .attr("width", width)
            .attr("height", height)

const chart = svg.append('g')
.attr('transform','translate(' + margin + ',' + margin +')');

const yScale = d3.scaleLinear()
.range([height - 120, 0])
.domain([0, d3.max(data,(d =>{ return d.value + 10 }))]);

chart.append('g')
.call(d3.axisLeft(yScale));

const xScale = d3.scaleBand()
.range([0, width])
.domain(data.map(d => d.name))
.padding(0.3)

chart.append('g')
.attr('transform','translate(0,' + (height - 120) + ')')
.call(d3.axisBottom(xScale))

chart.append('g')
.attr('class', 'grid')
.call(d3.axisLeft()
    .scale(yScale)
    .tickSize(-width, 0, 0)
    .tickFormat(''))
    svg.append('text')
    .attr('x', -(height / 2) - margin)
    .attr('y', margin / 2.4)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Love meter (%)')

    svg.append('text')
    .attr('x', width / 2 + margin)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text('Companies')    



chart.selectAll()
.data(data)
.enter()
    .append('rect')
        .attr('x', (s) => xScale(s.name))
        .attr('y', (s) => yScale(s.value))
        .attr('height', (s) => height - 120 - yScale(s.value))
        .attr('width', xScale.bandwidth())
        .on('mouseenter', function (actual, i) {
            chart.append('line')
                .attr('x1', 0)
                .attr('y1', yScale(actual.value))
                .attr('x2', width)
                .attr('y2', yScale(actual.value))
                .attr('stroke', 'red')
                .attr('class','line')

        })
        .on('mouseleave', function (actual, i) {
            console.log("out")
            d3.select(".line").remove()
        })

    

        
        

            
    
        