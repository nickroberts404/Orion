var d3 = require('d3');

DECLINATION_RATIO = 5;
ASCENSION_RATIO = 8;

module.exports = {
	coordinates: function(star){
		var a = (star.ra/24)*ASCENSION_RATIO;
		var d = ((star.dec+90)/180)*DECLINATION_RATIO;
		return [a, d];
	},
	distances: function(stars){
		var that = this;
		var x_extent = d3.extent(stars, function(d){ return that.coordinates(d)[0] });
		var y_extent = d3.extent(stars, function(d){ return that.coordinates(d)[1] });
		return {
			x_extent: x_extent,
			x_bound: x_extent[1] - x_extent[0], 
			y_extent: y_extent,
			y_bound: y_extent[1] - y_extent[0]
		};
	},
	offset: function(length, main_bound, secondary_bound){
		var unit = length/main_bound;
		return (unit * secondary_bound) / 2;
	},
	scale: function(domain, range){
		return d3.scale.linear().domain(domain).range(range); 
	},
	line_generator: function(scales, stars){
		return d3.svg.line()
			.x(function(d){ return scales.x(this.coordinates(stars[d])[0])})
			.y(function(d){ return scales.y(this.coordinates(stars[d])[1])})
	}
}