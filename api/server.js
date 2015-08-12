'use strict';

var Hapi = require('hapi');
var dummy = require('hapi-dummy-api');
var server = new Hapi.Server();

// Configure server
server.connection({
  port: 8000,
  routes: {
    cors: {
      additionalHeaders: ['X-Requested-With', 'Access-Control-Allow-Headers']
    },
    jsonp: 'callback'
  }
});

// Super hero route with filter yeh!
server.route([{
  method: 'POST',
  path: '/api/superheroes',
  handler: function(request, reply) {
    var str = request.payload.toLowerCase();
    var heroes = require('./plugins/superheroes').data;
    reply(heroes.filter(function(c) {
      return c.name.toLowerCase().indexOf(str) === 0;
    }));
  }
}]);

// Register server plugins
server.register([],
  function(err) {
    if(err) throw err;
    // Start server
    server.start(function(err) {
      if(err) throw err;
      console.log('Server running at: ', server.info.uri);
    });
  });
