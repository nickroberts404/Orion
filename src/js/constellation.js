// draw.js

var d3 = require('d3');
var skyglass = require('skyglass');

var calc = require('./calculation.js');
var scope = require('./scope_variables');
var star = require('./star.js');
var connection = require('./connection.js');
var draw = require('./draw.js');
var constellationNames = require('./constellationNames.js');
var buttons  = require('./buttons');

var initial_constellation = constellationNames.initial();
var constellation_data;
var current_constellation;

buttons.handleButtons(constellationNames.next, constellationNames.prev, function(name){
	current_constellation = constellation_data[name];
	render(current_constellation);
});

function init(){
	skyglass.getConstellations(process);
}

function process(err, data){
	constellation_data = data;
	current_constellation = data[initial_constellation];
	render(current_constellation);
}

function render(con){
	console.log(con);
	var scales = calc.scales(current_constellation.stars);
	star.render(con.stars, scales, con, init);
	connection.render(con.connections, con, con.stars, scales, init);
	draw.label(con.name);
}

module.exports = {
	init: init,
	process: process,
	render: render
}