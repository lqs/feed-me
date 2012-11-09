define([
    'knockout',
    'jquery',
    'config',
    'backbone',
    'underscore'
  ], function(
    Knockout,
    jQuery,
    config,
    Backbone,
    _
  ) {
'use strict';

var MenuViewModel = function() {
  var self = this;
  _.extend(self, Backbone.Events);
  self.menu = Knockout.observableArray();
  self.categories = Knockout.computed(function() {
    return self.menu().map(function(group) {
      return group.category;
    });
  });

  self.fetch = function(url) {
    return jQuery.get(config.buildMenuURI(url), self.menu.bind(self)).pipe(function() {
      return self;
    });
  };

  self.order = function(data) {
    self.trigger('order', data.name, data.price);
  };
};

return MenuViewModel;
});