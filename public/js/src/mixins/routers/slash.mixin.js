define([
  'underscore',
  'backbone'
], function (_, Backbone) {

  return {

    initialize: function(){
      this._super('initialize', arguments);

      (this.slash)
        ? this.route(/^(.*)[^\/]$/, 'addSlash')
        : this.route(/^(.*)\/$/, 'removeSlash');

    },

    removeSlash: function(route){
      this.navigate(window.location.hash.slice(0, -1));
    },

    addSlash: function(route){
      this.navigate(window.location.hash + '/');
    }

  }
});