// set the dimensions and margins of the graph
var margin4 = {top:10, bottom:30, right:10, left:30};
var height4 = 400 - margin4.top - margin4.bottom;
var width4 = 600 - margin4.right - margin4.left;



var svg4 = d3.select(".fuel")
    .append('svg')
    // .attr("height", height4 + margin4.top + margin4.bottom)
    // .attr("width", width4 + margin4.right + margin4.left)
    .attr('viewBox', [0,0, width4 + margin4.right + margin4.left, height4 + margin4.top + margin4.bottom])
    .append("g")
    .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

// data
d3.csv("FuelData.csv").then(function(data) {

// data format
data.forEach(function(d) {
    d.date = d3.timeParse("%Y-%m-%d")(d.date);
    d.petrol = +d.petrol;
  });

// axes
var x4 = d3.scaleTime()
    .range([0, width4])
    .domain(d3.extent(data, function(d) { return d.date; }));
var y4 = d3.scaleLinear()
    .range([height4, 0])
    .domain([60, d3.max(data, function(d) { return +d.diesel; })]);

svg4.append("g")
    .attr("transform", "translate(0," + height4 + ")")
    .call(d3.axisBottom(x4));
svg4.append("g")
    .call(d3.axisLeft(y4));

  
// draw the first path.
svg4.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) { return x4(d.date) })
        .y(function(d) { return y4(d.petrol) })
    )
    // .on('mouseover', function() {return console.log(data.petrol)});

// draw the second path.
svg4.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
        .x(function(d) { return x4(d.date) })
        .y(function(d) { return y4(d.diesel) })
        );


//legend
svg4.append("circle").attr("cx",350).attr("cy",250).attr("r", 6).style("fill", "steelblue")
svg4.append("circle").attr("cx",430).attr("cy",250).attr("r", 6).style("fill", "grey")
svg4.append("text").attr("x", 365).attr("y", 250).text("Petrol").style("fill", "steelblue").style("font-size", "15px").attr("alignment-baseline","central")
svg4.append("text").attr("x", 445).attr("y", 250).text("Diesel").style("fill", "grey").style("font-size", "15px").attr("alignment-baseline","central")



});