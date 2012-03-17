//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'jqueryui/sortable',
  'touchpunch'
  ], function($, _, Backbone){

  return Backbone.View.extend({

    tagName:  "tr",

    elements: {
      title: '[name=title]',
      type: '[name=type]',
      options: '.options',
      newOption: '[name="new_option"]',
      optionsList: '.options ul',
      optionSorting: '.options .ui-sortable-helper',
      optionDelete: '.options .ui-sortable-helper .delete',
      editOptions: '.edit-options',
      edit: '.edit',
      deleteBtn: '.btn-delete'
    },

    initialize: function(){
      this._super('initialize', arguments);
      this.$optionsList.sortable();
      this.refreshOptions();
    },

    setup: function(){
      this._super('setup', arguments);
      this.model.on('change:options', this.refreshOptions, this);
    },

//------------------------------------------------------------------------
   //|--------|
   //| EVENTS |
   //|--------|

    events: {
      title: 'keypress:enter',
      type: 'keydown:left change',
      newOption: 'keypress:enter',
      optionsList: 'sortstart sortstop sortupdate',
      optionSorting: 'mousemove',
      edit: 'click',
      deleteBtn: 'click'
    },

    title_keypress_enter: function(){
      this.$type.focus();
    },

    type_keydown_left: function(){
      this.$title.focus();
    },

    type_change: function(){
      this.refreshOptions();
    },

    newOption_keypress_enter: function(){
      var option = this.$newOption.val(),
          options;

      if (option) {
        options = this.model.get('options');
        options.push(option);
        this.model.save();
        this.model.trigger('change:options');
        this.model.trigger('change');
        this.$newOption.val('');
      }
    },

    optionsList_sortstop: function(e, ui){
      e.stopPropagation();
      var $delete = this.$optionsList.find('.delete');
      if ($delete.is(':visible')) {
        $(ui.item).remove();
        this.updateOptions();
      }
      $delete.remove();
    },

    optionsList_sortstart: function(e){
      e.stopPropagation();
    },

    optionsList_sortupdate: function(e){
      e.stopPropagation();
      this.updateOptions();
    },

    optionSorting_mousemove: function(e, ui){
      var distance = _.getDistance($(e.currentTarget), this.$optionsList);

      if (!this.$get('optionDelete').length) this.$get('optionSorting').prepend('<div class="delete">Delete</div>');

      if (distance > 50) {
        this.$get('optionDelete').show();
      }  else {
        this.$get('optionDelete').hide();
      }
    },

    showOptions: function(){
      var options = this.model.get('options'),
          type;

      this.$newOption.show();

      this.$optionsList.empty();
      type = this.model.get('type');

      _.each(options, function(option, i){
        this.$optionsList.append('<li><span class="handle"></span>' +
            '<input class="discrete" name="option[' + i + ']" value="'+ option + '"/></li>');
      }, this);
      
      
      this.$options.show();
    },

    hideOptions: function(){
      this.$options.hide();
      this.$newOption.hide();
    },

    refreshOptions: function(){
      if (['radio', 'checkbox'].indexOf(this.model.get('type')) !== -1) {
        this.showOptions();
      } else {
        this.hideOptions();
      }
    },

    updateOptions: function(){
      var options = this.$optionsList.find('input').serializeArray();
      options = _.map(options, function(option){
        return option.value;
      });
      this.model.set('options', _.values(options));
      this.model.save();
    },

    edit_click: function(e){
      e.stopPropagation();
      this.showEditOptions();
    },

    showEditOptions: function(){
      this.$editOptions.toggleClass('open', 250);
      this.$edit.toggleClass('active');
    },

    deleteBtn_click: function(e){
      e.stopPropagation();
      this.publish('confirm', 'Do you want to delete the project: ' + this.model.get('title'), function(){
        this.model.destroy();
        this.remove();
      }, this);
    }

  });
});