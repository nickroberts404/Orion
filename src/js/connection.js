// connection.js
// This module will control connection creation and rendering

var d3 = require('d3');
var draw = require('./draw.js');

module.exports = {

	// Creates the stars
	render: function(connections, stars, scales){
		console.log(connections);
		var g = d3.select('#line-layer').selectAll('.connection')
			.data(connections);

		var enter = g.enter();
		var exit = g.exit();

		draw.connections(enter, exit, stars, scales);

		// d3.selectAll('#connections')
	}

}