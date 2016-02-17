// app.js
// This module is the entry point of our application and will kick things into action.

var setup = require('./setup.js');
var constellation = require('./constellation.js');
var scope = require('./scope_variables');

setup.init_space();
setup.init_big_text();

constellation.process();

