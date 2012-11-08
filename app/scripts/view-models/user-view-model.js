define([
    'knockout',
    'jquery',
    'config'
  ], function(
    Knockout,
    jQuery,
    config
  ) {
'use strict';
var UserViewModel = function() {
  var self = this;
  self.id = Knockout.observable();
  self.name = Knockout.observable();

  self.fetch = function() {
    return jQuery.get(config.uri.USER, function(data) {
      self.id(data.id).name(data.name);
    }).pipe(function() {
      return self;
    });
  };

  self.save = function() {
    return jQuery.post(config.uri.USER, {
      id: self.id(),
      name: self.name()
    }).pipe(function() {
      return self;
    });
  };
};

return new UserViewModel();

});