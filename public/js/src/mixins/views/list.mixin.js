define([
  'backbone',
  'modelBinding'
], function (Backbone, ModelBinding) {

  return {

    sync: true,

    initialize: function(options) {
      this._super('initialize', arguments);

      options || (options = {});

      this.elements = _.defaults((this.elements || {}), {
        list: 'table',
        rows: 'tr',
        listDefault: '.list-default'
      });

      this.collection = this.collection || options.collection;

      this.refreshElements();

      var row = this.elements.row_template
          ? this.$get('row_template')
          : this.$get('rows').first();

      this.rowHtml = row.html();
      this.rowView = (this.rowView || options.rowView);
      this.$get('rows').empty();

      this.defaultMessage = options.defaultMessage || ("No " + (options.rowName || this.rowName || 'item') + " have been created yet.");

      if (options.sync) this.sync = options.sync;

    },

    setup: function() {
      this._super('setup', arguments);

      this.collection.bind('add',   this.addOne, this);

      this.collection.bind('destroy reset', function(){
        this.setListDefault();
      }, this);

      this.collection.bind('reset', function(){
        this.addAll();
      }, this);

    },

    open: function(){
      this._super('open', arguments);
      this.collection.configure(this.attributes);
      if (this.sync) this.collection.fetch();
    },

    close: function(){
      this._super('close', arguments);
      this.$get('rows').hide();
      this.removeListDefault();
      this.collection.off();
    },

    //| > Create a new view, and append it to the list
    addOne: function(model) {
      this.removeListDefault();

      model.collection = this.collection;

      var row = new this.rowView({
        model: model,
        html: this.rowHtml
      });
      model.view = row;

      // The id is created by the back-end, so need to update after POST
      model.on('sync', function(){
        row.$el.find('[data-id]').attr('data-id', this.id);
      });

      this.$list.append(row.render().el);
      row.attributes = this.attributes;
      row.open();
      this.trigger('adding', row);
    },

    //| > Add each item
    addAll: function() {

      if (this.autoRender === false) {
        this.preRender = true;
      } else {
        this.preRender = false;

        this.$list
            .empty()
            .show();
        this.collection.each(function(model){
          this.addOne(model);
        }, this);
      }

      this.collection.trigger('rendered');
    },

    setListDefault: function(){
      (!this.collection.length)
          ? this.addListDefault(this.defaultMessage)
          : this.removeListDefault();
    },

    addListDefault: function(text){
      this.$listDefault
          .text(text)
          .show();
    },

    removeListDefault: function(){
      this.$listDefault
          .text('')
          .hide();
    }

  }

});