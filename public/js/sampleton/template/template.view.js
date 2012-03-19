//|=======================================================================|
//| VIEW ~ ITEM LIST
//|=======================================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'src/mixins/views/list.mixin',
  'src/mixins/views/searchable.mixin',
  'sampleton/template/template.model',
  'sampleton/template/template.preview.view',
  'sampleton/template/field/template.field.view',
  'sampleton/template/field/template.field.col',
  'src/ui/new.view',
  'text!../../../templates/app/templates/template.html',
  'jqueryui/sortable',
  'touchpunch'
], function($, _, Backbone, listMixin, searchableMixin,
            templateModel, previewView, fieldView, fieldCollection, newView, templateTemplate){

  var Fields = new fieldCollection();


  return Backbone.View.extend({

    mixins: {
      listMixin: listMixin,
      searchable: searchableMixin
    },

    className: 'template',
    tagName: 'section',

    model: new templateModel(),
    rowView: fieldView,
    rowName: 'field',
    collection: Fields,
    html: templateTemplate,

    views: {
      preview: previewView.extend({collection: Fields}),
      newField: newView.extend({collection: Fields})
    },

    elements: {
      newField: '.field-new',
      title: 'h1 .title',
      list: '#list-fields table',
      rows: '#list-fields tr',
      back: '.btn-back'
    },

    shortcuts: {
      backspace: 'back_click'
    },

    sortableOptions: {
      items: 'tr',
      handle: '.handle',
      placeholder: 'placeholder',
      revert: function(){
        return true;
      },
      scroll: false,
      distance: 5
    },

    setup: function(){
      this._super('setup', arguments);
      this.$list.sortable(this.sortableOptions);
      this.$list.bind('sortstart', $.proxy(this.list_sortstart, this));
      this.$list.bind('sortupdate', $.proxy(this.list_sortupdate, this));
    },

    close: function(){
      this.$list.unbind();
      this._super('close', arguments);
    },

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: {
      title: 'keydown blur',
      back: 'click'
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

    back_click: function(e){
      e.stopPropagation();
      Backbone.Mediator.publish('go:templates');
    },

    list_sortstart: function(e, ui) {
      ui.helper
          .attr('style','');
    },

    list_sortupdate: function(e, ui){
      
      var id = ui.item.find('.id').data('id'),
          position = ui.item.index() + 1,
          model = this.collection.get(id);

      console.log(position);
      

      this.collection.trigger('reorder', id, position);
      model.save({'order': position});
    }

  });
});
