define([
  'jquery',
  'underscore',
  'backbone',
  'src/mixins/views/list.mixin',
  'sampleton/project/form/field/project.form.field.view'
], function($, _, Backbone, listMixin, fieldView){

  return Backbone.View.extend({

    mixins: {
      list: listMixin
    },

    el: '#template-preview',

    sync: false,

    rowView: fieldView,

    rowName: 'field',

    open: function(){
      this._super('open', arguments);
    },

    setup: function(){
      this._super('setup', arguments);
      this.on('adding', function(row){
        row.model.on('change', function(){
          row.render();
        }, this);
      }, this);

      this.collection.on('reorder', function(id, order){
        var item = this.$list.find('[data-id="' + id + '"]').parents('tr'),
            target = this.$get('rows').eq(order === 1 ? 0 : order - 1);

        if (item.index() === order - 1) return;

        (order === 1)
            ? target.before(item)
            : target.after(item);

      }, this);

    }

  });


});