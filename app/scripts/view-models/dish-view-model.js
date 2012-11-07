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

  self.toJSON = function() {
    return {
      'name': self.name(),
      'from': self.rest(),
      'number': self.amount(),
      'price': self.price()
    };
  };
};

return DishViewModel;

});