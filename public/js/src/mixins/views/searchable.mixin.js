// Need to implement List mixin -- how could we inforce that?
define(function () {

  return {

    open: function(){
      this._super('open', arguments);
      Backbone.Mediator.subscribe('search' + (this.searchScope ? ':'+ this.searchScope : ''), this.filterByTitle, this);
    },

    close: function(){
      this.resetFilter();
      Backbone.Mediator.unsubscribe('search' + (this.searchScope ? ':'+ this.searchScope : ''), this.filterByTitle, this);
      this._super('close', arguments);
    },

    filterByTitle: function(title){
      this.filterBy('title', title);
    },

    resetFilter: function () {
      this.showAll();
      this.removeListDefault();
    },

    filterBy: function(attribute, value){
      if (!this.collection.length) return;
      if (!value) {
        this.resetFilter();
      } else {
        var matched = this.collection.filterBy(attribute, value);
        this.hideAll();
        if (matched.length === 0) {
          this.addListDefault('No result for this search');
        } else {
          this.removeListDefault();
          _.each(matched, function(item){
            item.view.show();
          });
        }
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