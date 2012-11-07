define([
    'knockout'
  ], function(
    Knockout
  ) {
'use strict';
var DishViewModel = function() {
  var self = this;
  self.name = Knockout.observable();
  self.rest = Knockout.observable();
  self.amount = Knockout.observable();
  self.price = Knockout.observable();

  self.equals = function(dish) {
    if (!(dish instanceof DishViewModel)) {
      return false;
    }
    if (self.name() === dish.name() &&
        self.rest() === dish.rest() &&
        self.price() === dish.price()) {
      return true;
    }
    else {
      return false;
    }
  };

  self.toJSON = function() {
    return {
      'name': self.name(),
      'from': self.rest(),
      'number': self.amount(),
      'price': self.price()
    };
  };
};

DishViewModel.filter = function(name, rest, dish) {
  return dish.name() === name && dish.rest() === rest;
};

return DishViewModel;

});