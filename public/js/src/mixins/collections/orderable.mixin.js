define(function () {

  return {

    initialize: function(){
      this._super('initialize', arguments);
      this.on('change:order', this.reorder);
    },

    //| # Used by Backbone to sort by order
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

      this.each(function(item) {
        var order = item.get('order'),
            newPosition;
        if (order >= range[0] && order <= range[1] ) {
          if (model !== item) {
            item.save('order', order + direction, {reorder :true});
          }
          item.trigger('change:position', item, item.get('order'));

        }
      });
    }

  }

});