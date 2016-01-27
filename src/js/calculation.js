// draw.js

var d3 = require('d3');

module.exports = {
	// scales: function(stars){
	// 	var dim = scope.dim;
	// 	var distances = calc.distances(stars);
	// 	var y_longest = distances.y_bound/dim.height >= distances.x_bound/dim.width;

	// 	var offset = y_longest 
	// 		? calc.offset(dim.height, distances.y_bound, distances.x_bound) 
	// 		: calc.offset(space.width, distances.x_bound, distances.y_bound)
	// 	var y_range = y_longest ? [dim.height, 0] : [dim.height/2+offset, dim.height/2-offset]
	// 	var x_range = y_longest ? [dim.width/2+offset, dim.width/2-offset] : [dim.width, 0]

	// 	scales = {
	// 		x: create_scale(distances.x_extent, x_range),
	// 		y: create_scale(distances.y_extent, y_range),
	// 		mag: create_scale(d3.extent(stars, function(d){return d.mag}), [6, 2])
	// 	}
	// }
}

function create_scale(domain, range){
	return d3.scale.linear().domain(domain).range(range); 
}