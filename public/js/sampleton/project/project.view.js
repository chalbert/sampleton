//|=======================================================================|
//| VIEW ~ ITEM LIST
//|=======================================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'sampleton/project/project.model',
  'sampleton/project/controls.view',
  'src/ui/new.view',
  'sampleton/project/item/item.col',
  'sampleton/project/itemList.view',
  'sampleton/project/form/project.form.view',
  'sampleton/project/templateMenu.view',
  // Template
  'text!../../../templates/app/project/project.html',

  'jqueryui/sortable',
  'touchpunch',
  'jqueryui/effects/core'
], function($, _, Backbone,
            projectModel, controlsView, newView, itemCollection,
            itemListView, formView, templateMenuView,
            projectTemplate){

  //|----------|
  //| CONTROLS |
  //|----------|

  var Items = new itemCollection();

  return Backbone.View.extend({

    className: 'project',
    tagName: 'section',

    elements: {
      newField: '.field-new',
      title: 'h1',
      back: '.btn-back',
      template: '.btn-template'
    },

    views: {
      newField: newView.extend({collection: Items}),
      itemList: itemListView.extend({collection: Items}),
      form: formView,
      templateMenu: templateMenuView,
      controls: controlsView,
      '': {
        records: 'sampleton/records/records.view'
      }
    },

    model: new projectModel(),

    html: projectTemplate,

    pages: {
      records: 'projects/:project/items/:item/records'
    },

    shortcuts: {
      backspace: 'back_click'
    },

    defaultListMessage: "There's not yet any items in this project",

    initialize: function(options) {
      this._super('initialize', arguments);

      Backbone.Mediator.subscribe('recording:stop', this.stopRecording, this);
      Backbone.Mediator.subscribe('recording:start', this.startRecording, this);
      Backbone.Mediator.subscribe('template:use', this.setTemplate, this);

    },

    open: function(projectId){
      Backbone.Mediator.publish('recording:stop', 0);
      this._super('open', arguments);
    },

    setup: function(){
      this._super('setup', arguments);
      this.model.on('change:template', function(model, template){
        var template;
        if (template = this.model.get('template')) {
          this.views.form.open({template: template});
          this.$el.addClass('has-template', 350);
        } else {
          this.$el.removeClass('has-template', 350);
        }
      }, this);
    },

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: {
      title: 'keydown blur',
      newField: 'keydown:escape',
      back: 'click',
      template: 'click'
    },

    title_keydown: function(e) {
      e.stopPropagation();
      if (e.which === _.getKeycode('enter')) {
        e.preventDefault();
        this.$title.blur();
      };
    },

    title_blur: function(e) {
      this.model.save({title: this.$title.text()});
    },


    //| # If the input is not empty, create a new item
    newField_keydown_escape: function(e){
      this.$newField.blur();
    },

    hideInput: function(speed){
      _.defaults(this.$newField, {originalWidth: this.$newField.width()});
      this.$newField.animate({ width: 0 }, speed, function(){
        $(this).hide()
      });
    },

    showInput: function(speed){
      if (!this.$newField.originalWidth) return;
      this.$newField
          .show()
          .animate({ width: this.$newField.originalWidth }, speed);
    },

    back_click: function(e){
      e.stopPropagation();
      Backbone.Mediator.publish('go:projects');
    },

    template_click: function(e) {
      e.stopPropagation();
      this.views.templateMenu.activeTemplate = this.model.get('template');
      this.views.templateMenu.toggleOpen();
    },

//------------------------------------------------------------------------
    //|---------|
    //| ACTIONS |
    //|---------|

    getRecordingAnimSpeed: function(speed){
      return (speed || speed === 0) ? speed : 300;
    },

    stopRecording: function(speed){
      speed = this.getRecordingAnimSpeed(speed);
      this.$el.stop(true, true).addClass('editing');
      this.showInput(speed);
      this.$template.show();
      Backbone.Mediator.publish('item:unselect');
    },

    startRecording: function(speed){
      speed = this.getRecordingAnimSpeed(speed);
      this.$el.stop(true, true).removeClass('editing');
      this.hideInput(speed);
      this.$template.hide();
    },

    setTemplate: function(id){
      (id)
          ? this.model.save({'template': id})
          : this.model.unset('template').save();
    }

  });
});
