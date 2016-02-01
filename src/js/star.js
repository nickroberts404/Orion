// star.js
// This module will control star creation and rendering

var d3 = require('d3');
var draw = require('./draw.js');
var interaction = require('./interaction.js');

module.exports = {

	// Creates the stars
	render: function(stars, scales, con, update){
		stars = objToArr(stars);
		var g = d3.select('#main-layer').selectAll('.star')
			.data(stars)

		var enter = g.enter();
		var exit = g.exit();

		draw.stars(enter, exit, scales);

		d3.selectAll('.star').on('click', function(star){
			interaction.handleStarClick(star, con, update);
		});
	}

}

function objToArr(obj){
	var arr = [];
	for (prop in obj) {
		arr.push(obj[prop]);
	}
	return arr;
}