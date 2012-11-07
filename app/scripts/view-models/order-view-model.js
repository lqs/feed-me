define([
    'knockout',
    'view-models/dish-view-model',
    'underscore'
  ], function(
    Knockout,
    DishViewModel,
    _
  ) {
'use strict';
var OrderViewModel = function() {
  var self = this;
  self.dishes = Knockout.observableArray();

  self.totalPrice = Knockout.computed(function() {
    return self.dishes().reduce(function(sum, dish) {
      return sum + (dish.price() * dish.amount());
    }, 0);
  });

  self.addDish = function(name, rest) {
    var dish = _.find(self.dishes(), );
  };

  self.toJSON = function() {
    return {
      'order': self.dishes().map(function(dish) {
        return dish.toJSON();
      })
    };
  };
};

return OrderViewModel;

});