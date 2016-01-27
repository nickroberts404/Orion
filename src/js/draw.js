// draw.js
// This module will have methods to draw our svg elements.
var d3 = require('d3');
var calc = require('./calculation.js');

module.exports = {
	
	stars: function(enter, exit, scales){
		var star = enter.append('g')
			.attr('class', 'star')
			.attr('id', function(d){ return 'star'+d.id })
			.attr('transform', function(d){
				return 'translate('+ scales.x(calc.coordinates(d)[0]) + ', '+ scales.y(calc.coordinates(d)[1]) +')'; 
			})
		append_star_buffer(star, scales.mag);
		append_main_star(star, scales.mag);
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