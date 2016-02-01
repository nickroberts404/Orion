var d3 = require('d3');
var draw = require('./draw.js');
var skyglass = require('skyglass');

var activeStar;
var starDOM;
var targetX; 
var targetY; 

function handleStarClick(star, con, update) {
	var theStar = d3.select('#star'+star.id)[0][0];
	if (!activeStar) {
		activeStar = star
		starDOM = theStar;
		targetX = starDOM.transform.baseVal[0].matrix.e;
		targetY = starDOM.transform.baseVal[0].matrix.f;
		d3.select('#space-layer').on('mousemove', handleTempConnection)
	} else {
		d3.select('.connection-temp').remove();
		d3.select('#space-layer').on('mousemove', null);
		skyglass.addConnection(con.abbr, [activeStar.id, star.id], function(){ 
			activeStar = null;
			starDOM = null;
			update();
		});
	}
}

function handleTempConnection(stars) {
	var e = d3.event;
	d3.select('.connection-temp').remove();
	draw.line(targetX, targetY, e.offsetX, e.offsetY, 'connection-temp');
}

module.exports = {

	handleStarClick: handleStarClick
	// handleTempConnection: handleTempConnection

}