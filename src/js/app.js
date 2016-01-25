// app.js
// This module is the entry point of our application and will kick things into action.

var setup = require('./setup.js');
var constellation = require('./constellation.js');

var dim = {
	width: 500,
	height: 500,
	margins: {top: 50, right: 50, bottom: 50, left: 50}
}

setup.init_space(dim);
setup.init_big_text(dim);

constellation.init_constellation(dim);

