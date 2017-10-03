//bubble chart
var diameter = 420;
var format = d3.format(",d");
var color = d3.scale.category10()
 .range( ['#2AA4A9', '#57B28D','#FBAE4B', '#F16045', '#D12258', '#5E4E73', '#C2B49B', '#734743', '#80A464', '#435773']);
var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter * 1.4, diameter])
    .padding(1.5);
var svg = d3.select("body").select("#svg_bubble");
var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("color", "white")
    .style("padding", "8px")
    .style("background-color", "rgba(0, 0, 0, 0.75)")
    .style("border-radius", "6px")
    .style("font", "12px PT Sans")
    .text("tooltip");
var habbits = [
    {category: "sports", name: "running", value: 0.3},
    {category: "sports", name: "swimming", value: 0.1},
    {category: "sports", name: "badminton", value: 0.1},
    {category: "cooking", name: "cooking", value: 0.3},
    {category: "music", name: "piano", value: 0.3}
];
var node = svg.selectAll(".node")
    .data(bubble.nodes({children:habbits}).filter(function(d) { return !d.children; }))
  .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
node.append("circle")
    .attr("r", function(d) { console.log(d);return d.r; })
    .style("fill", function(d) { return color(d.category); })
    .on("mouseover", function(d) {
            tooltip.text(d.name + ": " + (d.value*100) + "%");
            tooltip.style("visibility", "visible");
    })
    .on("mousemove", function() {
        return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
    })
    .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .style("pointer-events", "none")
    .text(function(d) { return d.name.substring(0, d.r / 3); });