//|===================================================|
//| VIEW ~ RECORD FORM FIELD
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars'
  ], function($, _, Backbone, Handlebars){

  return Backbone.View.extend({

    tagName:  "tr",

    elements: {
      options: '.options'
    },

//------------------------------------------------------------------------
   //|--------|
   //| EVENTS |
   //|--------|

    events: {},

//------------------------------------------------------------------------
   //|-----------|
   //| RENDERING |
   //|-----------|

    render: function(){
      var template = Handlebars.compile(this.options.html),
          context = {
            id: this.model.id,
            title: this.model.get('title'),
            type: this.model.get('type'),
            options: $.inArray(this.model.get('type'), ['radio', 'checkbox']) !== -1
                ? this.model.get('options')
                : ''
          };

      context[this.model.get('type')] = true;

      this.$el.html(template(context));
      return this;
    }

  });
});