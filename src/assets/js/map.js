var w = 650;
var h = 550;

var svg = d3.select(".map__holder")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

var projection = d3.geo.azimuthalEqualArea()
  .rotate([100, -45])
  .center([5, 20])
  .scale(700)
  .translate([w/2, h/2]);

var path = d3.geo.path().projection(projection);

var features = svg.append("g")

d3.json("/assets/map/canada-topo.json", function(ca) {
  svg.selectAll("append")
    .data(topojson.feature(ca, ca.objects.canada).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", function(d, i) { return "region" + i; });

  d3.json("/assets/map/canswe-retailers.json", function(locations) {
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
  });
});
