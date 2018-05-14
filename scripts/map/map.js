var w = 800;
var h = 800;

var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

var projection = d3.geo.azimuthalEqualArea()
  .rotate([100, -45])
  .center([5, 20])
  .scale(800)
  .translate([w/2, h/2]);

var div = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

var path = d3.geo.path().projection(projection);

var features = svg.append("g")

d3.json("canada-topo.json", function(ca) {
  svg.selectAll("append")
    .data(topojson.feature(ca, ca.objects.canada).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("stroke", "#fff")
    .attr("class", function(d, i) { return "region" + i; });

  d3.json("geo-json.json", function(locations) {
    svg.selectAll("circle")
      .data(locations.features).enter()
        .append("circle")
          .attr("cx", function(d) {
            return projection(d.geometry.coordinates)[0];
          })
          .attr("cy", function(d) {
            return projection(d.geometry.coordinates)[1];
          })
          .attr("class", function(d, i) { return "point" + i; })
          .on("mouseover", function(d) {
            div.transition()
              .duration(200)
              .style("opacity", 1)
            div.html(d.properties.city)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 14) + "px");
          })
          .on("mouseout", function(d) {
            div.transition()
              .duration(500)
              .style("opacity", 0)
          });
  });
});


