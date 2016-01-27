// telescope.js
// This module acts as an interface with the Telescope API

var request = require('request');

module.exports = {
	get_stars: function(callback){
		request('http://localhost:3000/constellation', function(err, res, body){
			console.log('Err: ', err);
			console.log('Res: ', res);
			console.log('Body: ', body);
		})
	},
	get_constellations: function(callback){
		request('http://localhost:3000/constellation', function(err, res, body){
			if(err) console.error('Error retrieving constellations: ', err);
			callback(JSON.parse(body));
		})
	},
	create_connection: function(callback){

	},
	remove_connection: function(callback){

	}
// Creates a connection

// Removes a connection

// Retrieves constellation information

}