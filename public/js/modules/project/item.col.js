//|===================================================|
//| COLLECTION ~ ITEM
//|===================================================|
define([
  'underscore',
  'backbone',
  'modules/project/item.model'
], function(_, Backbone, Item){

  return Backbone.Collection.extend({

    model: Item,

    initialize: function(){
      this.on('change:order', this.reorder);
    },

    configure: function(projectId){
      this.url = '/api/projects/' + projectId + '/items';
      this.project = projectId;
      Item.prototype.project = projectId;
    },

//------------------------------------------------------------------------

    //|---------|
    //| ACTIONS |
    //|---------|

    //| > We override the create function to add the order of not provided
    //|   We Want this on the collection to abstract the model from it
    create: function(model, options){

      if (model instanceof Backbone.Model) {
        if (!model.get('order')) {
          model.set({order: this.nextOrder()});
        }
      } else if (!model || !model.order) {
        model = model || {};
        model.order = this.nextOrder();
      }

      //model.on('change:order', this.reorder);

      return Backbone.Collection.prototype.create.call(this, model, options);
    },

    //| > Generates next order
    nextOrder: function() {
      if (!this.length) return 1;
      var order = this.last().get('order');
      return order + 1;
    },

    //| > Used by Backbone to sort by order
    comparator: function(item) {
      return item.get('order');
    },

    reorder: function(model, value, options){
      //| > If this change is from the reorder script, stop here
      if (options.reorder) return false;
      var previous = model.previousAttributes().order,
          current = model.changedAttributes().order,
          range = [previous, current].sort(),
          direction = current < previous ? 1 : -1;

      this.each(function(item){
        if (model === item) return false;
        var order = item.get('order');
        if (order >= range[0] && order <= range[1] ) {
          item.save('order', order + direction, {reorder :true});
        }
      });
    },

    //|---------|
    //| ACTIONS |
    //|---------|

    filterBy: function(attribute, value){
      var result = this.filter(function(item){
        var search = new RegExp(value, 'i'),
            target = item.get(attribute).toLowerCase();

        return target.match(search);
      });
      return result;
    }

  });
});