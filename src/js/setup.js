var d3 = require('d3');
var $ = require('jquery');

module.exports = {
	// Builds the base SVG for a D3 visualization
	star_space: function(arg_height, arg_width, top, right, bottom, left){
		var margin = {top: top, right: right, bottom: bottom, left: left};
		var height = arg_height - margin.top - margin.bottom;
		var width = arg_width - margin.left - margin.right;
		var svg = d3.select('body').append('svg')
			.attr('height', height + margin.top + margin.bottom)
			.attr('width', width + margin.left + margin.right)
		var g = svg.append('g')
			.attr('transform', 'translate('+margin.left+','+margin.top+')');
		// Sets up text elements for constellation name
		g.append('text')
			.attr('x', width+margin.right-20)
			.attr('y', height+margin.bottom-20)
			.attr('id', 'name')
			.attr('text-anchor', 'end')
		g.append('text')
			.attr('x', -20)
			.attr('y', 0)
			.attr('id', 'index')
		return {g: g, height: height, width: width};
	},
	// Uses AJAX to retrieve a list of constellations from the Starfind API
	constellations: function(callback){
		$.ajax({
			type: 'GET', 
			dataType: 'jsonp', 
			url: 'http://localhost:3000/constellation',
			success: function(data){
				callback(data);
			},
			error: function(e){
				console.log('Error: ',e);
			}
		})
	}
}