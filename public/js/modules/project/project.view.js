//|=======================================================================|
//| VIEW ~ ITEM LIST
//|=======================================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'views/base.view',
  'mixins/list.mixin',
  'mixins/searchable.mixin',
  'mixins/moduleManager.mixin',
  'mediator',
  'jqueryui/sortable',
  'touchpunch',
  'jqueryui/effects/core'
], function($, _, Backbone, baseView, listMixin, searchableMixin, moduleManagerMixin, mediator){

  return baseView.extend({

    mixins: {
      list: listMixin,
      moduleManager: moduleManagerMixin
    },

    className: 'project',
    tagName: 'section',

    elements: {
      'input': '.field-new',
      'title': 'h1',
      'list': '.item-list',
      'rows': '.item-list li',
      'placeholder': '#item-list .placeholder',
      'back': '.btn-back'
    },

    requirements: ['model'],

    modules: {
      records: 'items/:itemId/records'
    },

    shortcuts: {
      backspace: 'back_click'
    },

    defaultListMessage: "There's not yet any items in this project",

    initialize: function() {
      this._super('initialize');
      this.registerModules(this.$el);

      this.sortableOptions = {
        items: 'li',
        placeholder: 'placeholder',
        helper: 'clone',
        revert: function(){
          return true;
        },
        scroll: false,
        cursorAt: {top:6, right: 1},
        distance: 15
      }

      this.$list.sortable(this.sortableOptions);

      $('body').delegate('.item-sorting', 'mouseup', $.proxy(this.itemSorting_mouseup, this));

      mediator.subscribe('recording:stop', this.stopRecording, this);
      mediator.subscribe('recording:start', this.startRecording, this);

      mediator.subscribe('items:stopSorting', $.proxy(this.stopSorting, this));
      mediator.subscribe('items:deleteItem', $.proxy(this.deleteItem, this));

    },

    open: function(){
      this.stopRecording(0);
      this._super('open', arguments);
    },

    close: function(){
      this._super('close');
    },

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: function() {
      return this.mapEvents('sortstart sortupdate', {
        input: 'keypress:enter',
        back: 'click'
      });
    },

    stopSorting: function(){
      this.$list.sortable('cancel');
      this.$list.sortable('destroy');
      this.$list.sortable(this.sortableOptions);
    },

    itemSorting_mouseup: function(e){

      this.$get('placeholder').css('background', 'none').animate({
        width: 140
      }, 500);

      $('.item-sorting')
          .find('.item').animate({
            height: 132
          });
    },

    sortstart: function(e, ui) {
      ui.helper
          .attr('style','')
          .addClass('item-sorting');

      // As the position is fixed, we need to refresh position at start
      this.$list.sortable('refreshPositions');
    },

    sortupdate: function(e, ui){
      var id = ui.item.find('.item').data('id'),
          position = ui.item.index() + 1,
          model = this.collection.get(id);

      model.save({'order': position});
    },

    input_keypress_enter: function(e){
      //| > If the input is not empty, create a new item
      var title = this.$input.val();
      if (title) {
        this.collection.create({title: title});
        this.$input.val('');
      }
    },

    hideInput: function(speed){
      _.defaults(this.$input, {originalWidth: this.$input.width()});
      this.$input
          .animate({ width: 0 }, speed, function(){
        $(this).hide()
      });
    },

    showInput: function(speed){
      if (!this.$input.originalWidth) return;
      this.$input
          .show()
          .animate({ width: this.$input.originalWidth }, speed);
    },

    deleteItem: function(ui){
      var id = ui.helper.find('.item').data('id'),
          model = this.collection.getByCid(id);
      model.destroy();
    },

    back_click: function(e){
      e.stopPropagation();
      mediator.publish('go:projects');
    },

//------------------------------------------------------------------------
    //|---------|
    //| ACTIONS |
    //|---------|
    startEditing: function(speed){
      this.$list.addClass('editing', speed);
    },

    stopEditing: function(speed){
      this.$list.removeClass('editing', speed);
    },

    getRecordingAnimSpeed: function(speed){
      return (!speed && speed !== 0) ? speed : 300;
    },

    isEditing: function(){
      return this.$list.hasClass('editing');
    },

    stopRecording: function(speed){
      speed = this.getRecordingAnimSpeed(speed);
      this.startEditing(speed)
      this.showInput(speed);
    },

    startRecording: function(speed){
      speed = this.getRecordingAnimSpeed(speed);
      this.stopEditing(speed);
      this.hideInput(speed);
    }

  });
});
