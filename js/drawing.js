var d3 = require('d3');
var calc = require('./calculation.js');

module.exports = {
	name: function(name){
		d3.select('#name')
			.text(name);
	},
	stars: function(g, stars, scale){
		var s = g.selectAll('.stars')
			.data(stars)
			.enter()
		draw_star_backings(s, scale);
		draw_main_stars(s, scale);
	},
	connections: function(g, lines, linegen){
		g.selectAll('.connections')
			.data(lines)
			.enter()
			.append('path')
			.attr('class', 'connections')
			.attr('d', linegen)
	}
}

function draw_main_stars(s, scale){
	s.append('circle')
		.attr('class', 'stars')
		.attr('r', function(d){ return scale.mag(d.mag)})
		.attr('cx', function(d){ return scale.x(calc.coordinates(d)[0]) })
		.attr('cy', function(d){ return scale.y(calc.coordinates(d)[1]) })
}
function draw_star_backings(s, scale){
	s.append('circle')
		.attr('class', 'stars-backing')
		.attr('r', function(d){ return scale.mag(d.mag)+3})
		.attr('cx', function(d){ return scale.x(calc.coordinates(d)[0]) })
		.attr('cy', function(d){ return scale.y(calc.coordinates(d)[1]) })
		.on('mouseover', function(d, i){
			d3.select('#index').text(d.proper || d.bf)
		})
}