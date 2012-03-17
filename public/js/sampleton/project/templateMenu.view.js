//|===================================================|
//| VIEW ~ TEMPLATE DROP MENU
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'src/mixins/views/list.mixin',
  'src/mixins/views/searchable.mixin',
  'sampleton/templates/templates.col',
  'src/ui/searchbox.view'
  ], function($, _, Backbone, listMixin, searchableMixin, templatesCollection, searchboxView){

  return Backbone.View.extend({

    mixins: {
      list: listMixin,
      searchable: searchableMixin
    },

    searchScope: 'templateMenu',

    views: {
      searchbox: searchboxView.extend({scope: 'templateMenu'})
    },

    el:  "#menu-template",

    elements: {
      list: 'ul',
      rows: 'li',
      active: 'li .active',
      link: '.link-templates',
      search: '.search-input'
    },

    collection: new templatesCollection(),

    rowView: Backbone.View.extend({tagName: 'li'}),

    autoOpen: false,

    setup: function(){
      this._super('setup', arguments);
      $(window).bind('click.outsiteTemplate', $.proxy(this.close, this));
      this.collection.on('rendered', this.setActiveState, this);
    },

    show: function(){
      this.$el.fadeIn(350);
    },

    hide: function(){
      this.$el.fadeOut(350);
    },

    close: function(){
      $(window).unbind('click.outsiteTemplate');
      this._super('close', arguments);
    },

    toggleOpen: function(){
      this.$el.is(':visible') ? this.close() : this.open();
    },

//------------------------------------------------------------------------
   //|--------|
   //| EVENTS |
   //|--------|

    events: {
      '': 'click',
      rows: 'click',
      link: 'click'
    },

    click: function(e){
      e.stopPropagation();
    },

    rows_click: function(e){
      var el = $(e.currentTarget).find('div'),
          id = el.attr('data-id');
      if (el.hasClass('active')) {
        this.publish('template:use');
        this.unsetActiveState();
      } else {
        this.publish('template:use', id);
        this.setActiveState(id);
      }
    },

    link_click: function(){
      this.publish('go:templates');
    },

    unsetActiveState: function(active){
      this.activeTemplate = '';
      this.$get('active').removeClass('active');
    },

    setActiveState: function(active){
      (active && typeof active == 'string') || (active = this.activeTemplate);
      this.$get('active').removeClass('active');
      this.$el.find('[data-id="' + active + '"]').addClass('active');
    }

  });
});