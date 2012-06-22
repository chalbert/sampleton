//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore-extended',
  'backbone-extended',
  'handlebars',
  'date'
  ], function($, _, Backbone, Handlebars){

  return Backbone.View.extend({

    tagName:  "tr",

    elements: {},

    render: function(){
      var values = [],
          value;
      _.each(this.fields, function(field){
        values.push((this.model.get(field._id) || ''));
      }, this);

      var template = Handlebars.compile(this.options.html),
          context = {
            id: this.model.id,
            date_created: this.model.get('date_created'),
            values: values
          };

      this.$el.html(template(context));
      return this;
    }

  });
});