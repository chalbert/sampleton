//|===================================================|
//| VIEW ~ FORM FOR NEW RECORD
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'src/mixins/views/list.mixin',
  'sampleton/project/form/field/project.form.field.view',
  'sampleton/template/field/template.field.col'
  ], function($, _, Backbone, listMixin, fieldView, fieldCollection){

  return Backbone.View.extend({

    mixins: {
      list: listMixin
    },

    elements: {
      itemTitle: '.item-title',
      message: '.message',
      list: '.list-form',
      rows: '.list-form tr',
      confirm: '.btn-confirm'
    },

    el: '.project-form',
    collection: new fieldCollection(),
    rowView: fieldView,
    rowName: 'field',

    autoOpen: false,

    initialize: function(){
      this._super('initialize', arguments);

      Backbone.Mediator.subscribe('item:select', this.enable, this);
      Backbone.Mediator.subscribe('item:unselect', this.disable, this);

      this.$message.text(this.messages.initial);

    },

    messages: {
      initial: 'Click an item to add a record',
      success: 'New record added'
    },

    show: function(){},

    hide: function(){},

    events: {
      '': 'click keypress:enter',
      confirm: 'click'
    },

    click: function(e){
      e.stopPropagation();
    },

    keypress_enter: function(){
      this.$confirm.trigger('click');
    },

    confirm_click: function(){
      var data = this.$el.serializeArray();
      Backbone.Mediator.publish('record:submitted', data);
      this.success();
      this.$el
          .find('input, textarea').val('')
          .filter('[type=radio], [type=checkbox]').removeAttr('checked');
    },

    disable: function(){
      this.$el.addClass('disabled');
      this.$itemTitle.html('');
    },

    enable: function(item){
      this.item = item.id;
      this.$itemTitle.html(': '+ item.title);
      this.$el.removeClass('disabled');
    },

    success: function(){
      var time = 1000;

      this.$message.text(this.messages.success);

      this.$el.addClass('disabled');
      setTimeout($.proxy(function(){
        this.$el.removeClass('disabled');
        this.$message.text(this.messages.initial);
      }, this), time);

    }


  });

});
