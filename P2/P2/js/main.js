// **** Your JavaScript code goes here ****
//NOTE: this is the D3 v4 loading syntax. For more details, see https://piazza.com/class/jnzgy0ktwi34lk?cid=75.
var margin = {top: 30, right: 30, bottom: 50, left:80}
var height = 600 - margin.top - margin.bottom,
    width = 760 - margin.left - margin.right;
var x = d3.scaleBand().rangeRound([0, (width / 2) - 40]).padding(0.1);
var y = d3.scaleLinear().range([height, 0]);

var catx = d3.scaleBand().rangeRound([0, (width / 2) - 40]).padding(0.1);
var caty = d3.scaleLinear().range([height, 0]);

var svg = d3.select("#main")
    .append("svg")
    .style("width", (width) + margin.left + margin.right + "px")
    .style("height", height + margin.top + margin.bottom + "px")
    .style("stroke", "black")
    .attr("width", (width) + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("style", "outline: thin solid black;")
    .append("g")
    .attr("transform","translate(" + (margin.left) + "," + margin.top + ")")
    .attr("class", "svg");

var chart2  = d3.select("svg")
    // .append("svg")
    // .style("width", (width/2) + margin.left + margin.right + "px")
    // .style("height", height + margin.top + margin.bottom + "px")
    // //.style("stroke", "black")
    // .attr("width", (width/2) + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    // .attr("style", "outline: thin solid black;")
    .append("g")
    .attr("transform","translate(" + (55 + margin.left + width/2) + "," + margin.top + ")")
    .attr("class","svg");


d3.csv("./data/coffee_data.csv", function(error, data){
    if (error) throw error;

    data.forEach(function(d) {
        d.sales = +d.sales;
        d.region = d.region;
        //d.category = d.category;
    });

    var region_sales = d3.nest()
        .key(function(d) {
            return d.region;
        })
        .rollup(function(leaves) {
            return d3.sum(leaves, function(d) {return (d.sales)});
        })
        .entries(data)

    x.domain(region_sales.map(function(d) { return d.key; }));
    y.domain([0, d3.max(region_sales, function(d) { return d.value; })]);
    caty.domain([0, d3.max(region_sales, function(d) { return d.value; })]);
    
    var xaxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x axis")
        .call(d3.axisBottom(x)
            .tickSize(0, 0)
            .tickSizeInner(0)
            .tickPadding(10));

   var yaxis = svg.append("g")
        .attr("class", "y axis")
        .attr("x", 10)
        .call(d3.axisLeft(y)
            .ticks(10)
            .tickSizeInner(0)
            .tickPadding(6)
            .tickSize(0, 0));

   svg.append("text")
        .attr("y", -25)
        .attr("x", 150)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Coffee Sales By Region (USD)");
   svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 70)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Coffee Sales (USD)")
        .attr("class", "y axis label");
   svg.append("text")
        .attr("y", height + 20)
        .attr("x", 110)
        .attr("dy", "1em")
        .style("text_anchor", "middle")
        .text("Region");

   svg.selectAll(".rect1")
        .data(region_sales)
        .enter()
        .append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("class", "rect1")
            .attr("fill", function(d) {
                if (d.value < 120000) {
                    return "green";
                } else if (d.value < 200000 && d.value > 120000) {
                    return "orange";
                } else if (d.value < 270000 && d.value > 200000) {
                    return "blue";
                } else {
                    return "red";
                }
            });
 });

d3.csv("./data/coffee_data.csv", function(error, data){
    if (error) throw error;

    data.forEach(function(d) {
        d.sales = +d.sales;
        d.category = d.category;
    });

    var category_sales = d3.nest()
        .key(function(d) {
            return d.category;
        })
        .rollup(function(leaves) {
            return d3.sum(leaves, function(d) {return (d.sales)});
        })
        .entries(data)

    catx.domain(category_sales.map(function(d) {return d.key;}));
    //caty.domain([0, d3.max(region_sales, function(d) { return d.value; })]);

    var catxaxis = chart2.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x axis")
        .call(d3.axisBottom(catx)
            .tickSize(0, 0)
            .tickSizeInner(0)
            .tickPadding(10));

    var catyaxis = chart2.append("g")
        .attr("class", "y axis")
        .attr("x", 10)
        .call(d3.axisLeft(caty)
            .ticks(10)
            .tickSizeInner(0)
            .tickPadding(6)
            .tickSize(0, 0));
    chart2.append("text")
        .attr("y", -25)
        .attr("x", 150)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Coffee Sales By Product (USD)");
    chart2.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 70)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Coffee Sales (USD)")
        .attr("class", "y axis label");
    chart2.append("text")
        .attr("y", height + 20)
        .attr("x", 110)
        .attr("dy", "1em")
        .style("text_anchor", "middle")
        .text("Products");
    chart2.selectAll(".rect2")
        .data(category_sales)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return catx(d.key); })
        .attr("y", function(d) { return caty(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - caty(d.value); })
        .attr("class", "rect2")
        .attr("fill", function(d) {
        if (d.value < 180000) {
            return "red";
        } else if (d.value < 210000 && d.value >= 180000) {
            return "olive";
        } else if (d.value < 220000 && d.value >= 210000) {
            return "black";
        } else {
            return "chocolate";
        }
    });
});