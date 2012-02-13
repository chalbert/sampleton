define([
  'jquery',
  'underscore',
  'backbone',
  'glasses',
  'mediator',
  'text!/templates/item/records.html'
], function ($, _, Backbone, o_o, mediator, recordsTemplate) {

  return o_o.view.extend({

    className: 'records',
    tagName: 'section',

    requirements: ['item', 'rowView', 'recordCollection'],

    elements: {
      title: 'h1',
      records: '.list-record'
    },

    initialize: function(){
      this.$el.html(recordsTemplate);
      this.titleTemplate = this.$get('title').text();
      this._super('initialize');
      this.render();
      //this.refreshElement();

//      mediator.subscribe('records:open', this.open, this);
      //mediator.subscribe('records:close', this.close, this);
    },

//------------------------------------------------------------------------

    //|--------|
    //| EVENTS |
    //|--------|

    events: function() {
      return this.mapEvents('click', {
      });
    },

     click: function(e){
       e.stopPropagation();
     },

//------------------------------------------------------------------------

    //|-----------|
    //| RENDERING |
    //|-----------|

    render: function() {

      //| > Render the template with data

      //this.template = this.$el.not('script');
      this.renderTitle();

      return this;
    },

    renderTitle: function() {
      var title = _.template(
          this.titleTemplate,
          { item: this.item.get('title') }
      );

      this.$get('title').text(title);
    },

//------------------------------------------------------------------------

    //|---------|
    //| ACTIONS |
    //|---------|

    //| > Create a new view, and append it to the list
    addOne: function(model) {
      var view = new this.rowView({model: model, row: this.rows++});
      this.$get('records').append(view.render().el);
    },

    //| > Add each item
    addAll: function() {
      this.rows = 1;
      this.$get('records').empty();
      this.collection.each(function(model){
        this.addOne(model);
      }, this);
    },

    open: function(){

      this.collection = new this.recordCollection([], {item: this.item});
      this.collection.bind('add',   this.addOne, this);
      this.collection.bind('reset', this.addAll, this);
      this.collection.bind('reset',   this.render, this);

      this.collection.fetch();

      $('body').click($.proxy(this.close, this));
      var top = this.$el.offset().top;
      this.$el.css({top: top}).animate({
        top: 78
      }, 350);
    },

    close: function(e){
      this.collection.unbind();

      mediator.publish('editing:go');

      $('body').unbind('click', this.close);
      this.$el.animate({
        top: this.$el.outerHeight() + 78
      }, 350);
    }

  });
});