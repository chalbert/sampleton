//|===================================================|
//| VIEW ~ TEMPLATE DROP MENU
//|===================================================|

define([
  'jquery',
  'underscore-extended',
  'backbone-extended',
  'src/mixins/views/list.mixin',
  'src/mixins/views/searchable.mixin',
  'sampleton/templates/templates.col',
  'src/ui/searchbox.view',
  'clickout'
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

    shortcuts: {
      escape: 'close'
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
    rowName: 'template',

    autoOpen: false,

    setup: function(){
      this._super('setup', arguments);
      this.collection.on('rendered', this.setActiveState, this);
    },

    show: function(){
      this.$el.fadeIn(350);
    },

    hide: function(){
      this.$el.fadeOut(350);
    },

    toggleOpen: function(){
      this.$el.is(':visible') ? this.close() : this.open();
    },

//------------------------------------------------------------------------
   //|--------|
   //| EVENTS |
   //|--------|

    events: {
      '': 'clickout',
      rows: 'click',
      link: 'click'
    },

    clickout: function(e){
      this.close();
    },

    rows_click: function(e){
      var el = $(e.currentTarget).find('div'),
          id = el.attr('data-id');
      if (el.hasClass('active')) {
        Backbone.Mediator.publish('template:use');
        this.unsetActiveState();
      } else {
        Backbone.Mediator.publish('template:use', id);
        this.setActiveState(id);
      }
    },

    link_click: function(){
      Backbone.Mediator.publish('go:templates');
    },

    unsetActiveState: function(active){
      this.activeTemplate = '';
      this.$get('active').removeClass('active');
    },

    setActiveState: function(active){
      if (!active || typeof active !== 'string') active = this.activeTemplate;
      this.$get('active').removeClass('active');
      this.$el.find('[data-id="' + active + '"]').addClass('active');
    }

  });
});