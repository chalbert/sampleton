//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'src/mixins/views/list.mixin',
  'sampleton/records/record.view',
  'sampleton/records/record.col',
  'handlebars'
  ], function($, _, Backbone, listMixin, recordView, recordCollection, Handlebars){

  var Records = new recordCollection();

  return Backbone.View.extend({

    mixins: {
      list: listMixin
    },

    el: '#list-record',

    rowView: recordView,
    rowName: 'record',
    collection: Records,

    autoOpen: false,

    elements: {
      list: 'tbody',
      listHead: 'thead',
      rows: 'tbody tr',
      row_template: '#template-record',
      tableHead_template: '#template-record-head'
    },

    open: function(){
      this._super('open', arguments);
      // Will don't want the list to render during the opening animation as it lags too much

      var fields = this.fields,
          head = Handlebars.compile(this.$tableHead_template.html()),
          context = {
            fields:fields,
            rowWidth: (80 / fields.length) + '%'
          };
      this.$listHead.html(head(context));

      this.$list.hide();
    },

    setup: function(){

      this.autoRender = false;

      this.collection.on('reset', function(){
        var action = this.collection.length ? 'show' : 'hide';
        this.$listHead[action]();
      }, this);

      // Once extended, if ready to render (synced), add records to view.
      // If not, enable auto-render so it's render once synced
      Backbone.Mediator.subscribeOnce('records:extended', function(){
        this.autoRender = true;
        if (this.preRender) {
          this.addAll();
        }
      }, this);

      // Once render, remove 'loading' message
      this.collection.on('rendered', function(){
        Backbone.Mediator.publish('loaded:recordList');
      }, this);

      this._super('setup', arguments);
    }

  });
});