define([
  'jquery',
  'underscore',
  'backbone',
  'mediator',
  'views/base.view',
  'mixins/list.mixin'
], function ($, _, Backbone, mediator, baseView, listMixin) {

  return baseView.extend({

    mixins: {
      list: listMixin
    },

    className: 'records',
    tagName: 'section',

    elements: {
      title: 'h1',
      list: '#list-record',
      rows: '#list-record tr',
      previous: '.btn-previous',
      next: '.btn-next'
    },

    defaultListMessage: "There's not yet any records for this item",

    openPosition: 120,

    open: function(projectId, itemId){

      $(window).bind('click.outsiteRecord', $.proxy(this.back, this));

      if (parseInt(this.$el.css('top')) !== this.openPosition) {
        var top = $(window).outerHeight();
        this.$el.css({top: top}).animate({
          top: this.openPosition
        }, 350);
      }

      this._super('open', arguments);

    },

    back: function(){
      mediator.publish('go:back', 3, this);
      this.close(350);
    },

    close: function(delay){
      delay || (delay = 0);

      $(window).unbind('click.outsiteRecord');
      this.$el.animate({
        top: $(window).outerHeight()
      }, delay);
    },

//------------------------------------------------------------------------
    //|--------|
    //| events |
    //|--------|

    events: function() {
      return this.mapEvents('click', {
        previous: 'click',
        next: 'click'
      });
    },

    shortcuts: {
      left: 'previous_click',
      right: 'next_click',
      escape: 'back',
      backspace: 'back'
    },

    click: function(e){
      e.stopPropagation();
    },

    previous_click: function(e){
      e.preventDefault();
      if (!this.$previous.attr('disabled')) {
        mediator.publish('go:records', this.collection.project, this.model.get('previous'));
      }
    },

    next_click: function(e){
      e.preventDefault();
      if (!this.$next.attr('disabled')) {
        mediator.publish('go:records', this.collection.project, this.model.get('next'));
      }
    }

  });
});