var d3 = require('d3');
var setup = require('./setup.js');
var draw = require('./drawing.js');
var calc = require('./calculation.js');

var space = setup.star_space(500, 500, 50, 50, 50, 50);
setup.constellations(star_map);


function star_map(constellations){
	draw_constellation({name: 'Andromeda', stars: constellations["And"]});
}
function draw_constellation(c){

	var distances = calc.distances(c.stars);
	var y_longest = distances.y_bound/space.height >= distances.x_bound/space.width;

	if(y_longest){
		var offset = calc.offset(space.height, distances.y_bound, distances.x_bound);
		y_range = [space.height, 0];
		x_range = [space.width/2+offset, space.width/2-offset]
	} else{
		var offset = calc.offset(space.width, distances.x_bound, distances.y_bound);
		y_range = [space.height/2+offset, space.height/2-offset];
		x_range = [space.width, 0];
	}

	var scales = {
		x: calc.scale(distances.x_extent, x_range),
		y: calc.scale(distances.y_extent, y_range),
		mag: calc.scale(d3.extent(c.stars,function(d){return d.mag}), [6, 2])
	}
	// var linegen = calc.line_generator(scales, c.stars);

	// Draw connections
	// draw.connections(space.g, c.lines, linegen);
	// Draw stars
	draw.stars(space.g, c.stars, scales);
	
	draw.name(c.name);

}



