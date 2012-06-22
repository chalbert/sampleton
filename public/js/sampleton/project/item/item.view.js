//|===================================================|
//| VIEW ~ ITEM
//|===================================================|

define([
  'jquery',
  'underscore-extended',
  'backbone-extended',
  'sampleton/records/record.col',
  'filedrop'
], function($, _, Backbone, recordCollection){

  return Backbone.View.extend({

    tagName:  "li",

    elements: {
      'item': '.item',
      'titleField': '.field-title',
      'title': '.title',
      'edit': '.edit',
      'counter': '.counter',
      'dropzone': '.dropzone',
      'history': '.btn-history'
    },

    subscriptions: {
      'recording:start': 'recordingStart',
      'recording:stop': 'recordingStop'
    },

    recordingStart: function(){
      this.$el.tooltip('disable');
      this.unbindFiledrop();
    },

    recordingStop: function(){
      this.$el.tooltip('enable');
      this.bindFiledrop();
    },

    bindFiledrop: function(){
      var imagePath  = '/api/projects/' + this.attributes.project +
                    '/items/' + this.model.id + '/image',
          overTimer,
          _this = this,
          $dropzone = this.$dropzone;

      // just to be sure it's not binded multiple time
      $dropzone.filedrop('unbind');

      $dropzone.filedrop({
        url: imagePath ,
        paramname: 'image',
        error: function(err, file){

        },
        maxfiles: 1,
        maxfilesize: 10,
        dragOver: function(){
          if (!_this.isEditing()) return;
          clearTimeout(overTimer);
          $dropzone.addClass('fileover');
        },
        dragLeave: function(){
          if (!_this.isEditing()) return;
          overTimer = setTimeout(function(){
            $dropzone.removeClass('fileover');
          }, 100);

        },
        drop: function(){
          if (!_this.isEditing()) return;
          $dropzone
              .addClass('uploading')
              .removeClass('fileover');
        },
        uploadStarted: function(i, file, len){
        },
        uploadFinished: function(i, file, response, time) {
          // response is the data you got back from server in json format.
          $dropzone
              .find('img').remove().end()
              .find('span').append('<img src="data:image/png;base64,' + response + '"/>');
        },
        progressUpdated: function(i, file, progress) {
          // this function is used for large files and updates intermittently
          // progress is the integer value of file being uploaded percentage to completion
        },
        speedUpdated: function(i, file, speed) {
          // speed in kb/s
        },
        rename: function(name) {
          return 'image';
        },
        afterAll: function() {
          $dropzone.removeClass('uploading');
        }
      });
    },

    unbindFiledrop: function(){
      this.$dropzone.filedrop('unbind');
    },

    rowName: 'item',
    recordCollection: recordCollection,

    initialize: function(options){

      this.recordCollection = new recordCollection();
      this._super('initialize', arguments);
      this.model.set('records', this.recordCollection);

    },


    open: function(){
      var image,
          $dropzone = this.$dropzone,
          imagePath;

      image = this.model.get('image');
      if (image) {
        imagePath = '/api/projects/' + this.attributes.project +
            '/items/' + this.model.id + '/image';
        $dropzone
            .find('img').remove().end()
            .find('span').append('<img src="' + imagePath + '"/>');
      }

      this.bindFiledrop();

      this.recordCollection.configure({
        project: this.attributes.project,
        item: this.model.id
      });

      this._super('open', arguments);
    },

    close: function(){
      // just to be sure it's not binded multiple time
      this.$dropzone.filedrop('unbind');
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
      if (!this.isEditing() && !this.$item.hasClass('selected')) {
        e.preventDefault();
        e.stopPropagation();

        this.effect_press();
        Backbone.Mediator.publish('item:select', {id: this.model.id, title: this.model.get('title')});
        Backbone.Mediator.subscribeOnce('record:submitted', this.model.addRecord, this.model);
//        Backbone.Mediator.subscribe('item:select', this.unselect, this);
        this.$item.addClass('selected');
        this.$el.clickout($.proxy(this.unselect, this));
        //this.model.increment();
      }
    },

    unselect: function(){
//      Backbone.Mediator.unsubscribe('item:select', this.unselect, this);
      Backbone.Mediator.unsubscribe('record:submitted', this.model.addRecord, this);
      Backbone.Mediator.publish('item:unselect', this.model.id);
      this.$item.removeClass('selected');
      this.$el.off('clickout');
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
      Backbone.Mediator.publish('go:records', this.attributes.project, this.model.id);
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