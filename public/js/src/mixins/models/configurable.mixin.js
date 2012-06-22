define([
  'underscore',
  'backbone'
], function (_, Backbone) {

  return  {

    initialize: function(options){
      if (!options) options = {};

      this.url = options.url || this.url;
      if (_.isString(this.url)) this.urlPattern = this.url;

      this._super('initialize', arguments);
    },

    configure: function(attributes){
      this.routeAttributes = _.extend((this.routeAttributes || {}), attributes);
      if (!this.urlPattern) return;

      this.url = this.urlPattern;
      var matches = this.urlPattern.match(/:\w+/g);
      _.forEach(matches, function(match){
        this.url = this.url.replace(match, this.routeAttributes[match.replace(':', '')]);
      }, this);
    }

  }

});