// Need to implement List mixin -- how could we inforce that?
define(['mediator'], function (mediator) {

  return {

    filterByTitle: function(title){
      this._filterBy('title', title);
    },

    resetFilter: function () {
      this.showAll();
      this.removeListDefault();
    },

    _filterBy: function(attribute, value){
      var matched = this.collection.filterBy(attribute, value);
      this.hideAll();
      if (matched.length === 0) {
        this.setListDefault('No result for this search');
      } else {
        this.removeListDefault();
        _.each(matched, function(item){
          item.view.show();
        });
      }
    },

    showAll: function(){
      this.collection.each(function(item){
        item.view.$el.show();
      });
    },

    hideAll: function(){
      this.collection.each(function(item){
        item.view.$el.hide();
      });
    }

  }

});