// star.js
// This module will control star creation and rendering

var d3 = require('d3');
var draw = require('./draw.js');

module.exports = {

	// Creates the stars
	render: function(stars, scales){
		var g = d3.select('#main-layer').selectAll('.star')
			.data(stars)

		var enter = g.enter();
		var exit = g.exit();

		draw.stars(enter, exit, scales);
	}

}