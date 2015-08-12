'use strict';

// all these config items are optionals
module.exports = {
  // Optionally give it some starting data (should be an array)
  // defaults to [];
  data: [{
    id: 0,
    name: 'mary'
  }, {
    id: 1,
    name: 'bob'
  }],
  // the root RESTful resource URL
  rootUrl: '/api/people',
  // specify which property name should be the "id"
  // defaults to "id"
  idProperty: 'id',
  // Optionally give it a delay (in milliseconds) to simulate network latency
  // as you'd have in real clientapp situation.
  delay: 200
};
