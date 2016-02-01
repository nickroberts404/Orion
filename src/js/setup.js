// setup.js
// This module will have methods to create the D3 canvas we'll use for our visualizations.

var d3 = require('d3');
var scope = require('./scope_variables');

module.exports = {
	
	// Initializes main space SVG
	init_space: function(){

		var dim = scope.dim;
		var svg = d3.select('body').append('svg')
			.attr('id', 'space-layer')
			.attr('height', dim.height)
			.attr('width', dim.width)

		appendLayer(svg, 'text-layer');
		appendLayer(svg, 'line-layer', dim);
		appendLayer(svg, 'main-layer', dim);
		
	},

	// Sets up text containers
	init_big_text: function(){

		var dim = scope.dim;
		var layer = d3.select('#text-layer');

		appendText(layer, 'con-name', dim.width-10, dim.height-10)
			.attr('text-anchor', 'end');
		appendText(layer, 'star-name', 10, 40);

	}
}

function appendLayer(target, id, dim){

	var layer = target.append('g')
		.attr('id', id)

	if(dim) {
		var transform_string = 'translate('+dim.margins.left+','+dim.margins.top+')'
		layer.attr('transform', transform_string);
	}

	return layer;

}
function appendText(target, id, x, y){

	var text = target.append('text')
		.attr('id', id)
		.attr('x', x)
		.attr('y', y)

	return text;

}


