define([
    'jquery',
    'knockout',
    'view-models/menu-view-model',
    'view-models/restaurants-view-model',
    'controllers/message-center',
    'view-models/order-view-model',
    'view-models/user-view-model'
  ], function(
    jQuery,
    Knockout,
    MenuViewModel,
    RestaurantsViewModel,
    MessageCenter,
    OrderViewModel,
    UserViewModel
  ) {
'use strict';

// Data logic.
var rests = new RestaurantsViewModel();
var menu = new MenuViewModel();
var order = new OrderViewModel();
var userInfoModal = jQuery('#userinfo');

UserViewModel.nameAbsent.subscribe(function(value) {
  userInfoModal.modal(value ? 'show' : 'hide');
});

rests.on('change-menu', function(newURL) {
  menu.fetch(newURL);
});

menu.on('order', function(name, price) {
  order.addDish(name, rests.selectedRestName(), 1, price);
});

// Take off!!
UserViewModel.fetch()
  .pipe(function() {
    return rests.fetch();
  },function() {
    bindingContext.needSignIn(true);
  }).
  done(function() {
    bindingContext.loaded(true);
  });


var bindingContext = {
  loaded: Knockout.observable(false),
  needSignIn: Knockout.observable(false),
  user: UserViewModel,
  menu: menu,
  rests: rests,
  order: Knockout.observable(order),
  newOrder: function() {
    this.order(order = new OrderViewModel());
  },
  makeOrder: function() {
    this.order().save();
    this.newOrder();
  }
};

Knockout.applyBindings(bindingContext);

window.user = UserViewModel;
});