/*//map using d3+ (dots)
const points = [
    {id: "Boston", value: 1834, point: [-71.0589, 42.3601], country: "usa"},
    {id: "Champaign", value: 3360, point: [-88.243383, 40.116420], country: "usa"},
    {id: "Hefei", value: 2602, point: [117.227219, 31.820591], country: "china"},
    {id: "Tianjin", value: 4302, point: [117.361648, 39.343357], country: "china"}
];

let geomap = new d3plus.Geomap()
    .select("#svg_map")
    .data(points)
    .ocean("#eef")
    .tiles(true)
    .pointSizeMin(10)
    .render();*/

/*//map using d3+ (color the countries)
var sample_data = [
    {"value": 1992, "country": "aschn", "name": "China"},
    {"value": 2014, "country": "eudeu", "name": "Germany"},
    {"value": 2014, "country": "nausa", "name": "United States"},
    {"value": 2016, "country": "nabhs", "name": "Bahamas"},
    {"value": 2017, "country": "sachl", "name": "Chile"}
]

var visualization = d3plus.viz()
    .container("#svg_map")        // container DIV to hold the visualization
    .data(sample_data)        // data to use with the visualization
    .coords("http://d3plus.org/topojson/countries.json") // pass topojson coordinates
    .type("geo_map")          // visualization type
    .id("country")            // key for which our data is unique on
    .text("name")             // key to use for display text
    .color("value")           // key for coloring countries
    .tooltip("value")         // keys to place in tooltip
    .draw()                   // finally, draw the visualization!
*/

/*//map using d3
var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.name + "<br></span>" + "<strong>Time: </strong><span class='details'>" + d.year +"</span>";
            })

var margin = {top: 20, right: 20, bottom: 30, left: 30},
            width = 1200 - margin.left - margin.right,
            height = 800 - margin.top - margin.bottom;

var color = d3.scale.threshold()
    .domain([10000,100000,500000,1000000,5000000,10000000,50000000,100000000,500000000,1500000000])
    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

var path = d3.geo.path();

var svg = d3.select("body")
            .select("#svg_map")
            .append('g')
            .attr('class', 'map');

var projection = d3.geo.mercator()
                   .scale(130)
                  .translate( [width / 2, height / 1.5]);

var path = d3.geo.path().projection(projection);

svg.call(tip);

var my_data = [
    {"year": "1992 - 2014", "id": "CHN", "name": "China"},
    {"year": "2014", "id": "DEU", "name": "Germany"},
    {"year": "2014 - 2017", "id": "USA", "name": "United States"},
    {"year": "2016", "id": "BHS", "name": "Bahamas"},
    {"year": "2017", "id": "CHL", "name": "Chile"}
]
  
svg.append("g")
    .attr("class", "countries")
  .selectAll("path")
    .data(my_data)
  .enter().append("path")
    .attr("d", path)
    .style("fill", function(d) { return color(0); })
    .style('stroke', 'white')
    .style('stroke-width', 1.5)
    .style("opacity",0.8)
    // tooltips
      .style("stroke","white")
      .style('stroke-width', 0.3)
      .on('mouseover',function(d){
        tip.show(d);

        d3.select(this)
          .style("opacity", 1)
          .style("stroke","white")
          .style("stroke-width",3);
      })
      .on('mouseout', function(d){
        tip.hide(d);

        d3.select(this)
          .style("opacity", 0.8)
          .style("stroke","white")
          .style("stroke-width",0.3);
      });

svg.append("path")
    .datum(topojson.mesh(my_data, function(a, b) { return a.id !== b.id; }))
    .attr("class", "names")
    .attr("d", path);
*/

//datamaps
var basic_choropleth = new Datamap({
  element: document.getElementById("svg_map"),
  projection: 'mercator',
  fills: {
    defaultFill: "#CCCCCC",
    authorHasTraveledTo: "#ABDDA4"
  },
  data: {
    CHN: { fillKey: "authorHasTraveledTo", year: "1992 - 2014" },
    DEU: { fillKey: "authorHasTraveledTo", year: "2014" },
    USA: { fillKey: "authorHasTraveledTo", year: "2014 - 2017" },
    BHS: { fillKey: "authorHasTraveledTo", year: "2016" },
    CHL: { fillKey: "authorHasTraveledTo", year: "2017" }
  },
  geographyConfig: {
    popupTemplate: function(geo, data) {
        return ['<div class="hoverinfo"><strong>',
                'Country: ' + geo.properties.name,
                '<br> Year: ' + data.year,
                '</strong></div>'].join('');
    }
  }
});
