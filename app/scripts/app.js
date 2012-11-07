define([
    'jquery',
    'knockout',
    'view-models/menu-view-model',
    'view-models/restaurants-view-model',
    'controllers/message-center'
  ], function(
    jQuery,
    Knockout,
    MenuViewModel,
    RestaurantsViewModel,
    MessageCenter
  ) {
'use strict';

// Data logic.
var rests = new RestaurantsViewModel();
var menu = new MenuViewModel();

rests.on('change-menu', function(newURL) {
  menu.fetch(newURL);
});

// Take off!!
rests.fetch();
});