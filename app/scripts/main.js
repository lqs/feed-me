require.config({
  shim: {
    backbone: {
      deps: ['underscore'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    }
  },

  paths: {
    jquery: 'vendor/jquery.min',
    backbone: 'vendor/backbone',
    underscore: 'vendor/underscore',
    knockout: 'vendor/knockout'
  }
});

require(['app'], function(app) {
  'use strict';
  // use app here
  console.log(app);
});