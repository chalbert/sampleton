//|=======================================================================|
//| VIEW ~ ITEM LIST
//|=======================================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'glasses',
  'mediator',
  'jqueryui/sortable'
], function($, _, Backbone, o_o, mediator){

  return o_o.view.extend({

    el: '.item-list-wrapper',

    elements: {
      'input': '#new-item',
      'list': '#item-list',
      'message': '.messagebox'
    },

    requirements: ['rowView', 'collection'],

    initialize: function() {
      this._super('initialize');

      this.$el.sortable({
        items: 'li',
        placeholder: 'placeholder',
        helper: 'clone',
        revert: true,
        tolerance: 'pointer'
      });

      this.collection.bind('add',   this.addOne, this);
      this.collection.bind('reset', this.addAll, this);
      this.collection.bind('all',   this.render, this);

      this.collection.fetch();

      mediator.subscribe('recording:stop', function() {
        this.startEditing()
        this.showInput();
      }, this);
      mediator.subscribe('recording:start', function(){
        this.stopEditing();
        this.hideInput();
      }, this);

    },

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: function() {
      return this.mapEvents('sortupdate', {
        input: 'keypress:enter'
      });
    },

    sortupdate: function(e, ui){
      var id = ui.item.find('.item').data('id'),
          position = ui.item.index() + 1,
          model = this.collection.getByCid(id);

      model.save({'order': position});
    },

    input_keypress_enter: function(e){
      //| > If the input is not empty, create a new item
      var title = this.$get('input').val();
      if (title) {
        this.collection.create({title: title});
        this.$get('input').val('');
      }
    },

    hideInput: function(){
      this.$get('input').slideUp(150);
    },

    showInput: function(){
      this.$get('input').slideDown(150);
    },

//------------------------------------------------------------------------

    //|---------|
    //| ACTIONS |
    //|---------|


    //| > Create a new view, and append it to the list
    addOne: function(model) {
      var view = new this.rowView({model: model});
      this.$get('list').append(view.render().el);
    },

    //| > Add each item
    addAll: function() {
      this.collection.each(function(model){
        this.addOne(model);
      }, this);
    },

    filterByTitle: function(title){
      this._filterBy('title', title);
    },

    resetFilter: function () {
      this.showAll();
      this.deleteMessage();
    },

    _filterBy: function(attribute, value){
      var matched = this.collection.filterBy(attribute, value);
      this.hideAll();
      if (matched.length === 0) {
        this.writeMessage('No result for this search');
      } else {
        this.deleteMessage();
        _.each(matched, function(item){
          item.view.show();
        });
      }
    },

    showAll: function(){
      this.collection.each(function(item){
        item.view.show();
      });
    },

    hideAll: function(){
      this.collection.each(function(item){
        item.view.hide();
      });
    },

    writeMessage: function(text){
      this.$get('message')
          .text(text)
          .removeClass('hidden');
    },

    deleteMessage: function(){
      this.$get('message')
          .text('')
          .addClass('hidden');
    },

    startEditing: function(){
      this.$el.addClass('editing');
    },

    stopEditing: function(){
      this.$el.removeClass('editing');
    }

  });
});
