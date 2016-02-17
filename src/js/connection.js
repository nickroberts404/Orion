// connection.js
// This module will control connection creation and rendering

var d3 = require('d3');
var draw = require('./draw.js');
var skyglass = require('skyglass');

module.exports = {

	// Creates the stars
	render: function(connections, con, stars, scales, update){
		var g = d3.select('#line-layer').selectAll('.connection')
			.data(connections, function(d){ return d[0]+'-'+d[1];});

		var enter = g.enter();
		var exit = g.exit();

		draw.connections(enter, exit, stars, scales);
	}

}