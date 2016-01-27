// draw.js

var d3 = require('d3');
// var calc = require('./calc.js');
var scope = require('./scope_variables');
var telescope = require('./telescope.js');
var star = require('./star.js');
// var connection = require('./connection.js');

var initial_constellation = "And";
var current_constellation;

module.exports = {
	
	init: function(dim){
		telescope.get_constellations(this.process)
	},
	process: function(res){
		current_constellation = res[initial_constellation];
		console.log(current_constellation)
		// var scales = calc.scales(current_constellation.stars);
		// this.render(current_constellation);
	},
	render: function(con, scales){
		// star.render(con.stars, scales);
		// connection.render(con.connections, scales);
	}
}