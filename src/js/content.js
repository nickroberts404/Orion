// content.js
var d3 = require('d3');

function init () {
	var section = d3.select('section.main');
	var header = section.append('header').attr('class', 'title')
	header.append('h2').attr('class', 'name')
	header.append('p').attr('class', 'meaning')
	section.append('p').attr('class', 'content')
}

function update (con) {
	d3.select('h2.name').text(con.name)
	d3.select('p.meaning').text(con.meaning)
	d3.select('p.content').text('This is the content. ')
}

module.exports = {
	init: init,
	update: update
}