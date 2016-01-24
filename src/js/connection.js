var d3 = require('d3');

var target;
var target_x;
var target_y;

module.exports = {
	handle_star_click: function(d, i){
		if(!target){
			d3.event.stopPropagation()
			target = d3.select('#star'+d.id)[0][0];
			target_x = target.cx.baseVal.value;
			target_y = target.cy.baseVal.value;
			d3.select('#star-space').on('mousemove', visualize_line);
			d3.select('body').on('click', cancel_connection);
		} 
	}
}

function visualize_line(){
	d3.select('.connection-temp').remove();
	draw_line(target_x, target_y, d3.event.offsetX, d3.event.offsetY);
}

function draw_line(x1, y1, x2, y2){
	d3.select('#line-layer')
		.append('line')
		.attr('class', 'connection-temp')
		.attr('x1', x1+50)
		.attr('y1', y1+50)
		.attr('x2', x2)
		.attr('y2', y2)
}

function cancel_connection(){
	d3.select('#star-space').on('mousemove', null);
	d3.select('body').on('click', null);
	d3.select('.connection-temp').remove();
	target = null;

}