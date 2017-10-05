//bubble chart
var diameter = 420;
var format = d3.format(",d");
var colors = ['#2AA4A9', '#57B28D','#FBAE4B', '#F16045', '#D12258', '#5E4E73', '#C2B49B', '#734743', '#80A464', '#435773'];
var color = d3.scale.category10().range(colors);
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
    .style("background-color", "rgba(0, 0, 0, 0.75)")
    .style("border-radius", "6px")
    .style("padding", "5px")
    .style("font", "12px PT Sans")
    .text("tooltip");
var habbits = [
    {category: "sports", name: "running", alt: "helps me think:)", value: 0.3},
    {category: "sports", name: "swimming", alt: "I enjoy the quietness in the water", value: 0.1},
    {category: "sports", name: "badminton", alt: "sweating and relaxing", value: 0.05},
    {category: "food", name: "cooking", alt: "and eating!", value: 0.2},
    {category: "arts", name: "piano", alt: "♪♫♬", value: 0.15},
    {category: "arts", name: "doodling", alt: "#$#%*&^$#@", value: 0.1},
    {category: "arts", name: "shows", alt: "watch with friends:D", value: 0.1}
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

var legend = d3.select("#bubble").append("svg").attr("id", "legend");
legend.append("rect").attr("id", "legend1")
    .attr("x", "380").attr("y", "10").attr("width", "20").attr("height", "20").attr("fill", color("sports"));
legend.append("text").attr("x", "405").attr("y", "24").attr("font-size", "12px").text("Sports");
legend.append("rect").attr("id", "legend2")
    .attr("x", "510").attr("y", "10").attr("width", "20").attr("height", "20").attr("fill", color("food"));
legend.append("text").attr("x", "535").attr("y", "24").attr("font-size", "12px").text("Food");
legend.append("rect").attr("id", "legend3")
    .attr("x", "640").attr("y", "10").attr("width", "20").attr("height", "20").attr("fill", color("arts"));
legend.append("text").attr("x", "665").attr("y", "24").attr("font-size", "12px").text("Arts");

function shuffle(){
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
    }
    shuffle(colors);
    color = d3.scale.category10().range(colors);
    svg.selectAll(".node")
       .select("circle")
       .style("fill", function(d) { return color(d.category); });
    legend.select("#legend1").attr("fill", color("sports"));
    legend.select("#legend2").attr("fill", color("food"));
    legend.select("#legend3").attr("fill", color("arts"));
}

function filter(category){
    d3.select(".dropbtn").text(category);
    switch(category){
        case 'all':
            svg.selectAll(".node")
               .select("circle")
               .attr("opacity", 1);
            svg.selectAll(".node")
               .select("text")
               .attr("opacity", 1);
            break;
        default:
            svg.selectAll(".node")
               .select("circle")
               .attr("opacity", function(d){ return d.category == category? 1:0;});
            svg.selectAll(".node")
               .select("text")
               .attr("opacity", function(d){ return d.category == category? 1:0;});
            break;
    }
}