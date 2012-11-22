define([
    'models/user',
    'backbone'
  ], function(
    User,
    Backbone
  ) {

Backbone.emulateHTTP = true;
var user = new User();

window.um = user;

});