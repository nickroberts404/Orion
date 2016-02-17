// sidebar.js
var d3 = require('d3');

function init (constellations, update) {
	d3.select('.sidebar ul').selectAll('li.con')
		.data(objToArr(constellations))
		.enter()
		.append('li')
		.attr('class', 'con')
		.text(function(d){ return d.name })
		.attr('id', function(d){ return d.abbr })
		.on('click', function(d){
			update(d.abbr);
		})
}

function update (con) {
	d3.selectAll('li.con').classed('active',false)
	d3.select('#'+con.abbr)
		.classed('active', true)
}

module.exports = {
	init: init,
	update: update
}

function objToArr(obj){
	var arr = [];
	for (prop in obj) {
		arr.push(obj[prop]);
	}
	return arr;
}