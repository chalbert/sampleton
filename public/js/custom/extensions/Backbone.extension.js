//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone'
  ], function($, _, Backbone){

  //|----------------|
  //| VIEW EXTENSION |
  //|----------------|

  _.extend(Backbone.View.prototype, {
    //| > Create shortcut to jquery elem using the 'elements' property
    setElements: function() {
      for (el in this.elements) {
        this['$' + el] = $(this.el).find(this.elements[el]);
      }
    },
    //| > Update the default to set elements
    render: function() {
      this.setElements();
      return this;
    },
  });

});