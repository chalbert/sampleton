//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'glasses',
  'date'
  ], function($, _, Backbone, o_o){

  return o_o.view.extend({

    tagName:  "tr",

    elements: {},

    requirements: ['model', 'row'],

    initialize: function(){
      this._super('initialize');

      this.template = _.template($('#template-record').html());
    },

//------------------------------------------------------------------------

   //|--------|
   //| EVENTS |
   //|--------|

//------------------------------------------------------------------------
    //|-----------|
    //| RENDERING |
    //|-----------|

    //| > Render template with data from model
    render: function() {
      //| > Render the template with data
      this.$el.html(this.template({
        date: this.model.get('date').toString('dddd, MMMM, d, yyyy'),
        row: this.row
      }));
      //this.$get().html(this.template());
      return this;
    }


//------------------------------------------------------------------------

    //|---------|
    //| ACTIONS |
    //|---------|

  });
});