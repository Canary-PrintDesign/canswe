'use strict';

function toggleFade(position) {
  var el = $('.back-to-top-link');
  position > 800 ? el.fadeIn() : el.fadeOut();
}

function scrollHandler() {
  toggleFade($(this).scrollTop());
}

$(document).ready(scrollHandler);
$(document).scroll(scrollHandler);
"use strict";

var w = 650;
var h = 550;

var svg = d3.select(".map__holder").append("svg").attr("width", w).attr("height", h);

var projection = d3.geo.azimuthalEqualArea().rotate([100, -45]).center([5, 20]).scale(700).translate([w / 2, h / 2]);

var path = d3.geo.path().projection(projection);

var features = svg.append("g");

d3.json("/assets/map/canada-topo.json", function (ca) {
  svg.selectAll("append").data(topojson.feature(ca, ca.objects.canada).features).enter().append("path").attr("d", path).attr("class", function (d, i) {
    return "region" + i;
  });

  d3.json("/assets/map/canswe-retailers.json", function (locations) {
    svg.selectAll("circle").data(locations.features).enter().append("circle").attr("cx", function (d) {
      return projection(d.geometry.coordinates)[0];
    }).attr("cy", function (d) {
      return projection(d.geometry.coordinates)[1];
    }).attr("class", function (d, i) {
      return "point" + i;
    });
  });
});
'use strict';

/* global $ window */
// Select all links with hashes
// /**/
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]').not('[href="#0"]').click(function clickHandler(event) {
  // On-page links
  var isOnPage = window.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '');
  var isSameHost = window.location.hostname === this.hostname;

  if (isOnPage && isSameHost) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top }, 500);
    }
  }
});

//# sourceMappingURL=app.js.map