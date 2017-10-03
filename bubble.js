//bubble chart
var diameter = 420;
var format = d3.format(",d");
var color = d3.scale.category10()
 .range( ['#2AA4A9', '#57B28D','#FBAE4B', '#F16045', '#D12258', '#5E4E73', '#C2B49B', '#734743', '#80A464', '#435773']);
var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter * 1.4, diameter]) //size of the bubble chart
    .padding(1);
var svg = d3.select("body").select("#svg_bubble");
var tooltip = d3.select("body") //set the tooltip
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
    {category: "sports", name: "running", alt: "helps me think:)", value: 0.3},
    {category: "sports", name: "swimming", alt: "I enjoy the quietness in the water", value: 0.1},
    {category: "sports", name: "badminton", alt: "sweating and relaxing", value: 0.05},
    {category: "cooking", name: "cooking", alt: "and eating!", value: 0.2},
    {category: "enjoy", name: "piano", alt: "♪♫♬", value: 0.15},
    {category: "enjoy", name: "doodling", alt: "#$#%*&^$#@", value: 0.1},
    {category: "enjoy", name: "shows", alt: "watch with friends:D", value: 0.1}
];
var node = svg.selectAll(".node")
    .data(bubble.nodes({children:habbits}).filter(function(d) { return !d.children; }))
  .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
node.append("circle")
    .attr("r", function(d) { return d.r; })
    .style("fill", function(d) { return color(d.category); })
    .on("mouseover", function(d) {
            //d3.select(this.parentNode).select("text").text(d.alt);
            d3.select(this).style("fill", function(d) { return "rgba(220,220,220,0.8)"; });
            //tooltip.text(d.name + " takes up about " + (d.value*100) + "% of my spare time");
            tooltip.text(d.alt);
            tooltip.style("visibility", "visible");
    })
    .on("mousemove", function() {
        return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
    })
    .on("mouseout", function(){
        //d3.select(this.parentNode).select("text").text(function(d) { return d.name; });
        d3.select(this).style("fill", function(d) { return color(d.category); });
        return tooltip.style("visibility", "hidden");
    });
node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .style("pointer-events", "none")
    .style("font-size", function(d){ return 18/60*d.r + "px"}) //adjust font-size based on node radius
    .text(function(d) { return d.name; });