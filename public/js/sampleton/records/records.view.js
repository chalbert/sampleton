define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'sampleton/records/records.model',
  'text!../../../templates/app/project/records.html',
  'sampleton/records/record.list.view'
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

    openPosition: 120,


    open: function() {
      this.publish('loading', 'recordList', "Loading records...");
      this._super('open', arguments);
    },

    setup: function() {
      // Setup fields based on the selected template of this item
      this.model.on('change', function() {
        if (!this.model.id) return;

        var fields = this.model.get('fields') || [];
        this.views.list.fields = fields;
        this.views.list.rowView.prototype.fields = fields;
        this.views.list.open(this.attributes);

      }, this);

      $(window).bind('click.outsiteRecord', $.proxy(this.back, this));

      this._super('setup', arguments);
    },

    show: function(){
      if (parseInt(this.$el.css('top')) !== this.openPosition) {
        var top = $(window).outerHeight();
        this.$el.stop().show().css({top: top}).animate({
          top: this.openPosition
        }, 350, $.proxy(function(){
          this.publish('records:extended');
        }, this));
      }
    },

    close: function(){
      this.extended = false;
      $(window).unbind('click.outsiteRecord');
      this._super('close', arguments);
    },

    hide: function(){
      this.$el.animate({
        top: $(window).outerHeight()
      }, 300, function(){
        $(this).stop().hide();
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
      '': 'click',
      previous: 'click',
      next: 'click'
    },


    back: function(){
      this.publish('go:project', this.attributes.project);
      this.close();
    },

    click: function(e){
      e.stopPropagation();
    },

    previous_click: function(e){
      e.preventDefault();
      if (this.model.get('previous')) {
        this.publish('go:records', this.attributes.project, this.model.get('previous'));
      }
    },

    next_click: function(e){
      e.preventDefault();
      if (this.model.get('next')) {
        this.publish('go:records', this.attributes.project, this.model.get('next'));
      }
    }

  });
});