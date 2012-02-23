//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'mediator',
  'views/base.view',
  'date'
], function($, _, Backbone, mediator, baseView){

  return baseView.extend({

    tagName:  "tr",

    elements: {},

    requirements: ['model', 'html'],

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: function() {
      return this.mapEvents('click');
    },

    click: function(e){
      mediator.publish('go:project', this.model.id);
    }

  });
});