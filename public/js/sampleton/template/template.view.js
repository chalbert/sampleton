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
  'jqueryui/draggable',
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
      back: '.btn-back',
      preview: '#template-preview'
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


      if (window.Touch) {

        var o = this.$preview.offset(),
            x = o.left,
            y = o.top;

        this.previewOpenPosition = this.$el.width() - this.$preview.width();
        this.previewClosePosition = x;

        this.$preview.draggable({
          axis: 'x',
          revert: false,
          containment: [this.previewOpenPosition, y, x, y],
          distance: 10
        });
      }

      this.$list.bind('sortstart', $.proxy(this.list_sortstart, this));
      this.$list.bind('sortupdate', $.proxy(this.list_sortupdate, this));
    },

    clean: function(){
      this.$list.unbind();
      if (window.Touch) this.$preview.draggable('destroy');
      this._super('clean', arguments);
    },

//------------------------------------------------------------------------
    //|--------|
    //| EVENTS |
    //|--------|

    events: {
      title: 'keydown blur',
      back: 'click',
      preview: 'mouseup'
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

      this.collection.trigger('reorder', id, position);
      model.save({'order': position});
    },

    preview_mouseup: function(e){
      if (!window.Touch) return;
      var left = this.$preview.offset().left;
      this.$preview.animate(
          {
            left: (left < this.$el.width() / 2)
                ? this.previewOpenPosition
                : this.previewClosePosition
          }
          , 200
      );
    }

  });
});
