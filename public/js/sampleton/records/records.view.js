define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'sampleton/records/records.model',
  'text!../../../templates/app/project/records.html',
  'sampleton/records/record.list.view',
  'clickout',
  'jqueryui/effects/core',
  'jqueryui/draggable',
  'touchpunch'
], function ($, _, Backbone, Handlebars, recordsModel, recordsTemplate, recordListView) {

  return Backbone.View.extend({

    className: 'records',
    tagName: 'section',

    elements: {
      title: 'h1',
      previous: '.btn-previous',
      next: '.btn-next'
    },

    views: {
      list: recordListView
    },

    model: RecordPage = new recordsModel(),
    html: recordsTemplate,

    defaultListMessage: "There's not yet any records for this item",

    open: function() {
      Backbone.Mediator.publish('loading', 'recordList', "Loading records...");
      this._super('open', arguments);
    },

    setup: function() {

      // Allow draggable for closing if touchscreen
      if (window.Touch) this.$el.draggable({
        axis: 'y',
        revert: true,
        containment: [0, 15, 0, 1000],
        distance: 20
      });

      // Setup fields based on the selected template of this item
      this.model.on('change', function() {
        if (!this.model.id) return;

        var fields = this.model.get('fields') || [];
        this.views.list.fields = fields;
        this.views.list.rowView.prototype.fields = fields;
        this.views.list.open(this.attributes);
        if (this.extended) Backbone.Mediator.publish('records:extended');

      }, this);

      this._super('setup', arguments);
    },

    show: function(){
      if (!this.$el.hasClass('opened')) {
        this.$el.stop().show().css('top', '').addClass('opened', 350, $.proxy(function(){
          this.extended = true;
          Backbone.Mediator.publish('records:extended');
        }, this));
      }
    },

    close: function(){
      this.extended = false;

      this._super('close', arguments);
    },

    clean: function(){
      this.$el.draggable('destroy');
      this._super('clean', arguments);
    },

    hide: function(){
      this.$el.stop().animate({top: 1000}, 450, function(){
        $(this).css('top', '').removeClass('opened').hide();
      });
    },

//------------------------------------------------------------------------
    //|--------|
    //| events |
    //|--------|

    shortcuts: {
      left: 'previous_click',
      right: 'next_click',
      escape: 'back',
      backspace: 'back',
      enter: null
    },

    events: {
      '': 'clickout mouseup',
      previous: 'click',
      next: 'click'
    },


    back: function(){
      Backbone.Mediator.publish('go:project', this.attributes.project);
      this.close();
    },

    clickout: function(){
      this.back();
    },

    mouseup: function(){
      if (this.$el.offset().top > 175) {
        this.back();
      }
    },

    previous_click: function(e){
      e.preventDefault();
      if (this.model.get('previous')) {
        Backbone.Mediator.publish('go:records', this.attributes.project, this.model.get('previous'));
      }
    },

    next_click: function(e){
      e.preventDefault();
      if (this.model.get('next')) {
        Backbone.Mediator.publish('go:records', this.attributes.project, this.model.get('next'));
      }
    }

  });
});