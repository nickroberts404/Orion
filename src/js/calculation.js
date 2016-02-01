// draw.js

var d3 = require('d3');
var scope = require('./scope_variables');

DECLINATION_RATIO = 5;
ASCENSION_RATIO = 8;

module.exports = {
	scales: function(stars){
		var dim = scope.dim;
		var height = dim.height - dim.margins.top - dim.margins.bottom;
		var width = dim.width - dim.margins.left - dim.margins.right;
		stars = objToArr(stars);
		var distances = this.distances(stars);
		var y_longest = distances.y_bound/height >= distances.x_bound/width;
		var offset = y_longest 
			? this.offset(height, distances.y_bound, distances.x_bound) 
			: this.offset(width, distances.x_bound, distances.y_bound)
		var y_range = y_longest ? [height, 0] : [height/2+offset, height/2-offset];
		var x_range = y_longest ? [width/2+offset, width/2-offset] : [width, 0];
		scales = {
			x: create_scale(distances.x_extent, x_range),
			y: create_scale(distances.y_extent, y_range),
			mag: create_scale(d3.extent(stars, function(d){return d.mag}), [6, 2])
		}
		return scales;
	}, 
	distances: function(stars){
		var that = this;
		console.log(stars);
		var x_extent = d3.extent(stars, function(d){ return that.coordinates(d)[0] });
		var y_extent = d3.extent(stars, function(d){ return that.coordinates(d)[1] });
		return {
			x_extent: x_extent,
			x_bound: x_extent[1] - x_extent[0], 
			y_extent: y_extent,
			y_bound: y_extent[1] - y_extent[0]
		};
	},
	coordinates: function(star){
		var a = (star.ra/24)*ASCENSION_RATIO;
		var d = ((star.dec+90)/180)*DECLINATION_RATIO;
		return [a, d];
	},
	offset: function(length, main_bound, secondary_bound){
		var unit = length/main_bound;
		return (unit * secondary_bound) / 2;
	}
}

function create_scale(domain, range){
	return d3.scale.linear().domain(domain).range(range); 
}

function objToArr(obj){
	var arr = [];
	for (prop in obj) {
		arr.push(obj[prop]);
	}
	return arr;
}