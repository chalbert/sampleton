//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base.view',
  'date'
  ], function($, _, Backbone, baseView){

  return baseView.extend({

    tagName:  "tr",

    elements: {},

    requirements: ['model', 'html']

  });
});