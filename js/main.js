DECLINATION_RATIO = 5;
ASCENSION_RATIO = 8;
var margin = {top: 50, right: 50, bottom: 50, left: 50};
var height = 500 - margin.top - margin.bottom;
var width = 500 - margin.left - margin.right;
var svg = d3.select('body').append('svg')
	.attr('height', height + margin.top + margin.bottom)
	.attr('width', width + margin.left + margin.right)
var g = svg.append('g')
	.attr('transform', 'translate('+margin.left+','+margin.top+')');

queue()
	.defer(d3.json, '../data/constellations.json')
	.defer(d3.json, '../data/stars.json')
	.await(star_map)

function star_map(err, constellations, star_list){
	// Create dictionary of stars, with the bfID as key
	var star_catalog = build_star_catalog(star_list);
	var current_constellation = 0;
	svg.append('text')
		.attr('x', width + margin.left + margin.right - 20)
		.attr('y', height + margin.top + margin.bottom - 20)
		.attr('id', 'name')
		.attr('text-anchor', 'end')
	// Draws constellation
	draw_constellation(constellations[current_constellation], star_catalog)

	var next_button = document.getElementById('next-con');
	var prev_button = document.getElementById('prev-con');
	next_button.addEventListener('click', function(){
		if(current_constellation == 87) return false;
		current_constellation++;
		console.log(current_constellation);
		draw_constellation(constellations[current_constellation], star_catalog)
	})
	prev_button.addEventListener('click', function(){
		if(current_constellation == 0) return false;
		current_constellation--;
		console.log(current_constellation);
		draw_constellation(constellations[current_constellation], star_catalog)
	})

	
}
function draw_constellation(c, star_catalog){

	d3.select('#name')
		.text(c.Name);

	// Create dictionary of stars in constellation, with their id as key
	if(!c.ordered_stars){
		c.ordered_stars = build_constellation_catalog(c.stars, star_catalog);
	}
	// Change the constellation lines to refrence stars instead of ids
	if( typeof c.lines[0][0] != 'object'){
		c.lines = c.lines.map(function(d){ return [ c.ordered_stars[d[0]], c.ordered_stars[d[1]] ] })
	}
	

	var distances = get_distances(c.stars);
	var y_longest = distances.y_bound/height >= distances.x_bound/width;

	if(y_longest){
		var offset = get_offset(height, distances.y_bound, distances.x_bound);
		y_range = [height, 0];
		x_range = [width/2+offset, width/2-offset]
	} else{
		var offset = get_offset(width, distances.x_bound, distances.y_bound);
		y_range = [height/2+offset, height/2-offset];
		x_range = [width, 0];
	}

	var x_scale = d3.scale.linear().domain(distances.x_extent).range(x_range) 
	var y_scale = d3.scale.linear().domain(distances.y_extent).range(y_range)
	var mag_scale = d3.scale.linear().domain(d3.extent(c.stars,function(d){return d.vmag})).range([5, 1.5]) 
	var linegen = d3.svg.line()
		.x(function(d){ return x_scale(get_coordinates(d)[0])})
		.y(function(d){ return y_scale(get_coordinates(d)[1])})

	// Draw connections
	var connections = g.selectAll('.connections')
		.data(c.lines, function(d){ return d[0].bfID + d[1].bfID })
	connections.enter()
		.append('path')
		.attr('class', 'connections')
		.attr('d', linegen)
	connections.exit().remove();


	// Draw stars
	var stars = g.selectAll('.stars')
		.data(c.stars, function(d){ return d.bfID });
	var stars_enter = stars.enter();
	stars_enter.append('circle')
		.attr('class', 'stars-backing')
		.attr('r', function(d){ return mag_scale(d.vmag)+3})
		.attr('cx', function(d){ return x_scale(get_coordinates(d)[0]) })
		.attr('cy', function(d){ return y_scale(get_coordinates(d)[1]) })
	stars_enter.append('circle')
		.attr('class', 'stars')
		.attr('r', function(d){ return mag_scale(d.vmag)})
		.attr('cx', function(d){ return x_scale(get_coordinates(d)[0]) })
		.attr('cy', function(d){ return y_scale(get_coordinates(d)[1]) })
	stars.exit().remove();

}

function get_coordinates(star){
	var a = (star.RAh/24)*ASCENSION_RATIO;
	var d = ((star.DEd+90)/180)*DECLINATION_RATIO;
	return [a, d];
}

function get_distances(stars){
	var x_extent = d3.extent(stars, function(d){ return get_coordinates(d)[0] });
	var y_extent = d3.extent(stars, function(d){ return get_coordinates(d)[1] });
	return {
		x_extent: x_extent,
		x_bound: x_extent[1] - x_extent[0], 
		y_extent: y_extent,
		y_bound: y_extent[1] - y_extent[0]
	};
}

function get_offset(length, main_bound, secondary_bound){
	var unit = length/main_bound;
	return (unit * secondary_bound) / 2;
}

function build_star_catalog(star_list){
	var catalog = {};
	for(star in star_list){
		var star_data = star_list[star]
		var id = star_data.bfID.replace(/ /g, '');
		catalog[id] = star_data
	}
	return catalog;
}

function build_constellation_catalog(stars, star_catalog){
	var catalog = {};
	for(star in stars){
		var star_data = stars[star];
		star_data.bfID = star_data.bfID.replace(/ /g, '');
		star_data.vmag = star_catalog[star_data.bfID].Vmag;
		catalog[star_data.id] = star_data;
	}
	console.log('Catalog: ', catalog);
	return catalog;
}
