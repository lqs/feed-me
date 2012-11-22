define([
    'knockout',
    'jquery',
    'config',
    'knockback'
  ], function(
    Knockout,
    jQuery,
    config,
    kb
  ) {
'use strict';

var UserViewModel = function(model) {
  var self = this;
  self.id = kb.observable(model, 'email');
  self.name = kb.observable(model, 'name');
  self.name.subscribe(function(value) {
    localStorage.setItem('user-display-name', value);
  });
  self.online = Knockout.computed(function() {
    return !!self.id();
  });
  self.nameAbsent = Knockout.computed(function() {
    return self.online() && !self.name();
  });
  self.ready = Knockout.computed(function() {
    return !!(self.id() && self.name());
  });

  self.fetch = function() {
    return model.fetch().pipe(function() {
      return self;
    });
  };

  self.save = function(name) {
    return jQuery.post(config.uri.USER, {
      id: self.id(),
      name: name || self.name()
    }).pipe(function(data) {
      return self.id(data.email).name(data.name);
    });
  };
};

return UserViewModel;

});