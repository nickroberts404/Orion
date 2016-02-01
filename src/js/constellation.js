// draw.js

var d3 = require('d3');
var calc = require('./calculation.js');
var scope = require('./scope_variables');
var skyglass = require('skyglass');
var star = require('./star.js');
// var connection = require('./connection.js');

var initial_constellation = "And";
var current_constellation;

function init(dim){
	skyglass.getConstellations(process);
}

function process(err, data){
	current_constellation = data[initial_constellation];
	var scales = calc.scales(current_constellation.stars);
	render(current_constellation, scales);
}

function render(con, scales){
	console.log({con: con, scales: scales});
	star.render(con.stars, scales);
	// connection.render(con.connections, scales);
}

module.exports = {
	init: init,
	process: process,
	render: render
}