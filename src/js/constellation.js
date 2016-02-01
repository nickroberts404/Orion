// draw.js

var d3 = require('d3');
var skyglass = require('skyglass');

var calc = require('./calculation.js');
var scope = require('./scope_variables');
var star = require('./star.js');
var connection = require('./connection.js');
var draw = require('./draw.js');

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
function update(){
	var scales = calc.scales(current_constellation.stars);
	render(current_constellation, scales);
}
function render(con, scales){
	star.render(con.stars, scales, con, update);
	connection.render(con.connections, con.stars, scales);
	draw.label(con.name);
}

module.exports = {
	init: init,
	process: process,
	render: render
}