//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'sampleton/records/record.col'
  ], function($, _, Backbone, recordCollection){

  return Backbone.View.extend({

    tagName:  "li",

    elements: {
      'item': '.item',
      'titleField': '.field-title',
      'title': '.title',
      'edit': '.edit',
      'counter': '.counter',
      'history': '.btn-history'
    },

    rowName: 'item',
    recordCollection: new recordCollection(),

    initialize: function(options){
      this._super('initialize', arguments);
      this.model.set('records', this.recordCollection);
    },

    open: function(){

      this.recordCollection.configure({
        project: this.attributes.project,
        item: this.model.id
      });

      this._super('open', arguments);
    },

    close: function(){
      this.unselect();
      this._super('close', arguments);
    },


//------------------------------------------------------------------------
   //|--------|
   //| EVENTS |
   //|--------|

    events: {
      item: 'click',
      history: 'click',
      titleField: 'keydown blur'
    },

    item_click: function(e) {
      //| > If not editing, increment
      if (!this.isEditing()) {
        e.preventDefault();
        e.stopPropagation();
        this.effect_press();
        this.publish('item:select', {id: this.model.id, title: this.model.get('title')});
        this.subscribeOnce('record:submitted', this.model.addRecord, this.model);
        this.$item.addClass('selected');
        $(window).bind('click.outsiteRecord', $.proxy(this.unselect, this));
        //this.model.increment();
      }
    },

    unselect: function(){
      this.unsubscribe('record:submitted', this);
      this.publish('item:unselect', this.model.id);
      this.$item.removeClass('selected');
      $(window).unbind('click.outsiteRecord');

    },

    titleField_keydown: function(e) {
      e.stopPropagation();
      if (e.which === _.getKeycode('enter')) {
        e.preventDefault();
        this.$titleField.blur();

      };
    },

    titleField_blur: function(e) {
     this.model.save({title: this.$titleField.text()});//change();
    },

    history_click: function(e){
      e.preventDefault;
      e.stopPropagation();
      this.publish('go:records', this.attributes.project, this.model.id);
    },
    
//------------------------------------------------------------------------
    //|---------|
    //| EFFECTS |
    //|---------|

    //| > Apply the 'pressed' effect
    effect_press: function(){
      clearTimeout(this.pressTimer);
      this.$get().addClass('pressed');
      var that = this.$get();
      this.pressTimer = setTimeout(function(){
        that.removeClass('pressed');
      }, 200);
    },

//------------------------------------------------------------------------
    //|---------|
    //| HELPERS |
    //|---------|

    isEditing: function(){
      return this.$edit.is(':visible');
    }

  });
});