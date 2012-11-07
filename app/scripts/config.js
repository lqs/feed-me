define([

], function(

) {
  'use strict';

  var host = 'http://fan.wandoulabs.com';

  return {
    'HOST': host,
    uri: {
      'RESTAURANTS': host + '/api/all'
    },

    buildMenuURI: function(url) {
      return this.HOST + '/' + url;
    }
  };

});