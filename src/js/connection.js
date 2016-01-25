var d3 = require('d3');

var target;
var target_x;
var target_y;

module.exports = {
	handle_star_click: function(d, i){
		var the_star = d3.select('#star'+d.id)[0][0];
		if(!target){
			d3.event.stopPropagation()
			target = the_star;
			target_x = target.cx.baseVal.value;
			target_y = target.cy.baseVal.value;
			d3.select('#star-space').on('mousemove', visualize_line);
			d3.select('body').on('click', cancel_connection);
		} else if(target.id != 'star'+d.id){
			connect_stars(target, the_star);
			cancel_connection();
		}
	}
}

function visualize_line(){
	d3.select('.connection-temp').remove();
	draw_line(target_x, target_y, d3.event.offsetX, d3.event.offsetY, 'connection-temp');
}

function connect_stars(s1, s2){
	var x1 = s1.cx.baseVal.value;
	var y1 = s1.cy.baseVal.value;
	var x2 = s2.cx.baseVal.value;
	var y2 = s2.cy.baseVal.value;

	draw_line(x1, y1, x2+50, y2+50, 'connections', [s1.id.slice(4), s2.id.slice(4)])
}

function draw_line(x1, y1, x2, y2, line_class, stars){
	d3.select('#line-layer')
		.append('line')
		.datum({stars: stars})
		.attr('id', 'connection'+stars[0]+stars[1])
		.attr('class', line_class)
		.attr('x1', x1+50)
		.attr('y1', y1+50)
		.attr('x2', x2)
		.attr('y2', y2)
		.on('click', delete_connection)
}

function delete_connection(d, i){
	d3.select('#'+d.id).remove();
}

function cancel_connection(){
	d3.select('#star-space').on('mousemove', null);
	d3.select('body').on('click', null);
	d3.select('.connection-temp').remove();
	target = null;
}