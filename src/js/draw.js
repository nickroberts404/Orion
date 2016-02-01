// draw.js
// This module will have methods to draw our svg elements.
var d3 = require('d3');
var skyglass = require('skyglass');
var scope = require('./scope_variables.js')
var calc = require('./calculation.js');

module.exports = {
	
	stars: function(enter, exit, scales){
		var star = enter.append('g')
			.attr('class', 'star')
			.attr('id', function(d){ return 'star'+d.id })
			.attr('transform', function(d){
				return 'translate('+ scales.x(calc.coordinates(d)[0]) + ', '+ scales.y(calc.coordinates(d)[1]) +')'; 
			})
		console.log(star);
		append_star_buffer(star, scales.mag);
		append_main_star(star, scales.mag);
	},
	connections: function(enter, exit, stars, scales){
		var linegen =  d3.svg.line()
			.x(function(d){ console.log(d); return scales.x(calc.coordinates(stars[d])[0])})
			.y(function(d){ return scales.y(calc.coordinates(stars[d])[1])})
		enter.append('path')
			.attr('class', 'connection')
			.attr('id', function(d){ return 'connection'+d[0]+'-'+d[1] })
			.attr('d', linegen)
	},
	line: function(x1, y1, x2, y2, line_class){
		console.log('Drawin line!');
		d3.select('#line-layer')
			.append('line')
			.attr('class', line_class)
			.attr('x1', x1)
			.attr('y1', y1)
			.attr('x2', x2 - scope.dim.margins.left)
			.attr('y2', y2 - scope.dim.margins.top)
	},
	label: function(label){
		d3.select('#con-name').text(label);
	}

}

function append_main_star(star, mag_scale){
	star.append('circle')
		.attr('class', 'star-main')
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('r', function(d){ return mag_scale(d.mag)})
}
function append_star_buffer(star, mag_scale){
	star.append('circle')
		.attr('class', 'star-buffer')
		.attr('cx', 0)
		.attr('cy', 0)
		.attr('r', function(d){ return mag_scale(d.mag) + 3})
}

function line(x1, y1, x2, y2, line_class, stars){
	d3.select('#line-layer')
		.append('line')
		.datum({stars: stars})
		.attr('id', 'connection'+stars[0]+stars[1])
		.attr('class', line_class)
		.attr('x1', x1+50)
		.attr('y1', y1+50)
		.attr('x2', x2)
		.attr('y2', y2)
		.on('click', delete_connection)
}