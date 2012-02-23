define(['mediator'], function (mediator) {

  return {

    requirements: ['rowView', 'collection', 'html'],

    initialize: function() {

      this.$get('list').after('<div class="list-default"></div>');
      this.elements.listDefault = '.list-default';
      this.refreshElement('listDefault');

      this.rowHtml = this.$get('rows').first().html();
      this.$get('rows').empty();

      this.collection.bind('add',   this.addOne, this);
      this.collection.bind('reset', this.addAll, this);

      if (this.defaultListMessage) {
        this.collection.on('reset', function(){
          (!this.collection.length)
              ? this.setListDefault(this.defaultListMessage)
              : this.removeListDefault();
        }, this)
      }
    },

    open: function(){
      //| ? Loading list icon
      if (this.collection.configure) {
        this.collection.configure.apply(this.collection, arguments);
      }
      this.$list.hide();
      this.collection.fetch();
    },

    //| > Create a new view, and append it to the list
    addOne: function(model) {
      this.removeListDefault();
      var row = new this.rowView({
        model: model,
        html: this.rowHtml
      });
      this.$list.append(row.render().el);
    },

    //| > Add each item
    addAll: function() {
      this.$get('list')
          .empty()
          .show();
      this.collection.each(function(model){
        this.addOne(model);
      }, this);
    },

    setListDefault: function(text){
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