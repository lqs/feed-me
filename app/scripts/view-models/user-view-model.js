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



var userViewModel = function(model) {
  var vm = kb.viewModel(model);
  // alias 'email' as 'id'
  vm.id = vm.email;
  vm.online = Knockout.computed(function() {
    return !!vm.id();
  });
  vm.nameAbsent = Knockout.computed(function() {
    return vm.online() && !vm.name();
  });
  vm.ready = Knockout.computed(function() {
    return !!(vm.id() && vm.name());
  });

  vm.fetch = function() {
    return model.fetch().pipe(function() {
      return vm;
    });
  };

  vm.save = function(name) {
    return jQuery.post(config.uri.USER, {
      id: vm.id(),
      name: name || vm.name()
    }).pipe(function(data) {
      return vm.id(data.email).name(data.name);
    });
  };
  return vm;
};

// return userViewModel;

return kb.ViewModel.extend({
  constructor: function() {
    var self = this;
    kb.ViewModel.prototype.constructor.apply(self, arguments);
    self.id = self.email;
    self.online = Knockout.computed(function() {
      return !!self.id();
    });
    self.nameAbsent = Knockout.computed(function() {
      return self.online() && !self.name();
    });
    self.ready = Knockout.computed(function() {
      return !!(self.id() && self.name());
    });
  },
  fetch: function() {
    return this.model().fetch().pipe(function() {
      return this;
    }.bind(this));
  },
  save: function(name) {
    return jQuery.post(config.uri.USER, {
      id: this.id(),
      name: name || this.name()
    }).pipe(function(data) {
      return this.id(data.email).name(data.name);
    }.bind(this));
  }
});

});