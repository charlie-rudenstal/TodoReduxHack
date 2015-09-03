var request = require('superagent');
var baseUrl = 'http://localhost:5000';

module.exports = {
	name: 'taskService',
	read: function(req, resource, params, config, callback) {
		request.get(baseUrl + '/tasks').end(function(err, res) {
			callback(err, res.body);
		});
	},
	create: function(req, resource, params, body, config, callback) {
		request.post(baseUrl + '/tasks')
			.set('Content-Type', 'application/json')
			.send(params)
			.end(function(err, res) {
				if (err) {
					return callback(new Error(res.body.error));
				}
				callback(null, res.body);
			});
	}

};
