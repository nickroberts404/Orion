// draw.js

var d3 = require('d3');

var calc = require('./calculation.js');
var scope = require('./scope_variables');
var star = require('./star.js');
var connection = require('./connection.js');
var draw = require('./draw.js');
var constellationNames = require('./constellationNames.js');
var buttons  = require('./buttons');

var initial_constellation = constellationNames.initial();
var constellation_data = require('../../constellations.json')
var current_constellation;

for(con in constellation_data){
	constellation_data[con].connections = parseConnections(constellation_data[con].connections);
}

buttons.handleButtons(constellationNames.next, constellationNames.prev, update);

function process(){
	current_constellation = constellation_data[initial_constellation];
	render(current_constellation);
}

function update(con){
	if (con) {
		current_constellation = constellation_data[con];
	}
	render(current_constellation);
}

function render(con){
	console.log(con);
	var scales = calc.scales(current_constellation.stars);
	star.render(con.stars, scales, con);
	connection.render(con.connections, con, con.stars, scales);
	draw.label(con.name);
}

function parseConnections(connections){
	return connections.map(function(val){
		val = val.split('-');
		return [parseInt(val[0]), parseInt(val[1])];
	})
}

module.exports = {
	process: process,
	render: render
}