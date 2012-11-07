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

var MenuViewModel = function() {
  var self = this;
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
};

return MenuViewModel;
});