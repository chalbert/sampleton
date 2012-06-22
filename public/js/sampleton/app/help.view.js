define([
  'jquery',
  'underscore-extended',
  'backbone-extended',
  'clickout'
], function($, _, Backbone){
  'use strict';

  return Backbone.View.extend({

    el:  ".nav-top .btn-help",

    elements: {

    },

    events: {
      '': 'click'
    },

    click: function(e){
      e.stopPropagation();
      e.preventDefault();
      this.toggleHelp();
    },

    clickout: function(e){
      if (this.$el.hasClass('active')) {
        this.click(e);
      }
    },

    toggleHelp: function(){
      var remove = function(view){
        this.removeTooltips(view, 0);
      }

      if (this.$el.hasClass('active')) {
        this.$el.removeClass('active');
        Backbone.Mediator.unsubscribe('opened', this.setTooltipsPosition, this);
        //Backbone.Mediator.unsubscribe('closed', remove, this);
        Backbone.Mediator.unsubscribe('rendered', this.addTooltips, this);
        this.removeTooltips();

      } else {
        this.$el.addClass('active');
        this.addTooltips();

        Backbone.Mediator.sub('opened', this.setTooltipsPosition, this);
        //Backbone.Mediator.sub('closed', remove, this);
        Backbone.Mediator.sub('rendered', this.addTooltips, this);
      }
    },



    tooltipClass: 'help-box',
    animSpeed:  250,

    getParent: function(view){
      var parent = 'body';
      if (view) parent = view.$el ? view.$el : view;
      return parent;
    },

    getHavingTooltips: function(view){
      var parent = this.getParent(view);
      return $(parent).find('[data-tooltip]').add($(parent).filter('[data-tooltip]'));
    },

    getTooltips: function(view){
      var parent = this.getParent(view);
      return $(parent).find('.' + this.tooltipClass).add($(parent).next('.' + this.tooltipClass));
    },

    removeTooltips: function(view, speed){

      this.getTooltips(view)
          .fadeOut(speed || this.animSpeed, function(){
            $(this).remove();
          });

    },

    setTooltipsPosition: function(view){

      this.getHavingTooltips(view).each($.proxy(this.setTooltipPosition, this));
    },

    setTooltipPosition: function(i, el){
      var p = $(el).offset(),
          helpBox = $(el).next('.' + this.tooltipClass);

      if (!helpBox.length) return;

      helpBox
          .css({position: 'absolute'})
          .offset({
            left: p.left + ($(el).width() / 2) - (helpBox.width() / 2),
            top: p.top + ($(el).height() / 2) - (helpBox.height() / 2)
          });

    },

    addTooltips: function(view){
      this.removeTooltips(view, 0);
      this.getHavingTooltips(view).each($.proxy(function(i, el){

        $(el).after('<div class="' + this.tooltipClass + '">' + $(el).attr('data-tooltip') + '</div>');
        this.setTooltipPosition(i, el);
        $(el).next('.' + this.tooltipClass)
            .hide()
            .fadeIn(this.animSpeed);

      }, this));

    }


  });
});