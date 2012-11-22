define([
    'config',
    'backbone'
  ], function(
    config,
    Backbone
  ) {
'use strict';

var User = Backbone.Model.extend({
  idAttribute: 'email',
  url: config.uri.USER
});

return User;

});