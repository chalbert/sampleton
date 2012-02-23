//|===================================================|
//| BASE VIEW
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'modelBinding',
  'mediator',
  'classes/plugins/underscore-extension'
], function($, _, Backbone, ModelBinding, mediator){

  return Backbone.View.extend({

    open: function(){
      mediator.publish('shortcut:add', this.shortcuts, this);
      if (this.model) {
        this.model.clear();
        if (this.model.configure) {
          this.model.configure.apply(this.model, arguments);
        }
        this.model.fetch();
      }
      this.$el.show();
    },

    close: function(){
      mediator.publish('shortcut:remove', this.shortcuts, this);
      if (this.model) {
        this.model.clear();
      }
      this.$el.hide();
    },

    $get: function(element) {
      if (!element) return $(this.el);
      if (this.elements && this.elements[element]) {
        return $(this.el).find(this.elements[element]);
      }
      throw new Error("Element '" + element + "' doesn't exist")
    },
    //| > Convention based event binding
    mapEvents : function(){
      var eventStack = {};
      if (_.isString(arguments[0])) {
        _.extend(eventStack, this._formatElementEvents('', arguments[0]));
      }
      var childrenEvents = arguments[1] || arguments[0];
      if (_.isObject(childrenEvents)) {
        for (var child in childrenEvents) {
          _.extend(eventStack, this._formatElementEvents(child, childrenEvents[child]));
        }
      }

      return eventStack;
    },

    initialize: function(options){
      //|> Add the template
      if (this.options.html) {
        this.$el.html(this.options.html);
      }

      //| > We add the mixins methods, extending current methods if present
      _.each(this.mixins, function(mixin, name){
        // Call method on open and on close
        this.previousMethod || (this.previousMethod = {})
        _.each(mixin, function(method, methodName) {

          if (methodName === 'requirements') {
            if (this.requirements) {
              this.requirements = _.union(this.requirements, mixin[methodName]);
            } else {
              this.requirements = mixin[methodName];
            }
          } else {

            if (this[methodName]) this.previousMethod[methodName] = this[methodName];
            // New method
            if (this.previousMethod[methodName]) {
              this[methodName] = function(){
                this.previousMethod[methodName].apply(this, arguments);
                mixin[methodName].apply(this, arguments);
              }
            } else {
              this[methodName] = mixin[methodName];
            }

          }
        }, this);
        if (mixin.initialize) mixin.initialize.call(this);
      }, this);

      if (this.model) {
        this.$el.find('[data-sync]').each($.proxy(function(index, el){
          this.model.on('change:' + $(el).attr('name'), function(value, options){
            Backbone.sync.call(this, 'update', this.model, options);
          }, this);
        }, this));
        ModelBinding.bind(this, { all: "name" });
      }

      _.each(this.views, function(view, name){
        this.views[name] = new view();
      }, this);

      this.ensureRequirements();
      this.refreshElement();
    },

    refreshElement: function(element){
      var elements = element ? [element] : this.elements;
      for (var element in elements) {
        this['$' + element] = $(this.el).find(this.elements[element]);
      }
    },

    _super: function (funcName){
      var args = _.rest(arguments);
      if (_.isArguments(args[0])) args = args[0];
      return this.constructor.__super__[funcName].apply(this, args);
    },

    ensureRequirements: function(requirements){
      requirements = requirements || this.requirements;
      if (!requirements) return;
      for (var requirement in requirements) {
        if (!this[requirements[requirement]]
            && !this._requirementAsOption(requirements[requirement])
            ) {
          throw new Error('View requires: ' + requirements[requirement].toString());
        }
      }
    },

    _requirementAsOption: function(requirement){
      if (this.options[requirement] || this.options[requirement] === 0) {
        this[requirement] = this.options[requirement];
        return true;
      }
    },

    _formatElementEvents: function(element, eventString){
      this._ensureElementExist(element);
      var events = eventString.split(' '),
          eventStack = {};

      for (var eventKey in events) {

        var event = events[eventKey];
        if (window.Touch) {
          if (event === 'click'){
            event: 'touchstart'
          }
        }

        this._ensureEventIsValid(event);

        if (this._isSpecificKeyEvent(event)) {
          this._bindSpecificKeyEvent(element, event);
        } else {
          this._pushFormattedEvent(eventStack, element, event);
        }
      }
      return eventStack;
    },

    _pushFormattedEvent: function(stack, element, event){
      var selector = this.getElementSelector(element),
          key = (selector !== '') ? event + ' ' + selector : event;

      stack[key] = this._getEventMethod(element, event);

      return stack;
    },

    _bindSpecificKeyEvent: function(element, event) {
      var eventParts = this._getEventParts(event),
          eventName = eventParts[0],
          keyName = eventParts[1],
          data = {
            key: _.getKeycode(keyName),
            keyName: keyName,
            el: element
          },
          router = _.bind(this._keyEventRouter, this);

      this._ensureEventMethodExist(element, eventName, keyName);

      if (element === '') {
        this.$get().bind(eventName, data, router);
      } else {
        this.$get().delegate(this.getElementSelector(element), eventName, data, router);
      }
    },

    isElement: function(element){
      if (element === '') return true;
      return (this.elements) && (this.elements[element]);
    },

    getElementSelector: function(element){
      if (element === '') return '';
      return this.elements[element];
    },

    _ensureElementExist: function(element){
      if (!this.isElement(element)) {
        throw "This element does not exist: " + element;
      }
    },

    _ensureEventMethodExist: function(element, event, attribute){
      var methodName = this._getEventMethod(element, event, attribute),
          method = this[methodName];
      if (!method) throw new Error('Event\'s method "' + methodName + '" does not exist');
    },

    _getEventMethod: function(element, event, attribute){
      var methodPrefix = element ? element + '_' : '',
          methodSuffix = attribute ? '_' + attribute : '';
      return methodPrefix + event + methodSuffix;
    },

    _keyEventRouter: function(e) {
      if (e.data.key === e.which) {
        var method = this._getEventMethod(e.data.el, e.type, e.data.keyName);
        this[method].apply(this);
      }
    },

    _isValidEvent: function(event){
      //| > Only key event take options
      if (this._isEventWithOption(event) && !this._isSpecificKeyEvent(event)) {
        return false;
      }
      return true;
    },

    _ensureEventIsValid: function(event){
      if (!this._isValidEvent(event)) {
        throw "This event does not exist: " + element;
      }
    },

    _isEventWithOption: function(event){
      return (event.indexOf(':') !== -1);
    },

    _isSpecificKeyEvent: function(event){
      if (!this._isEventWithOption(event)) return false;

      var eventParts = this._getEventParts(event);
      return _.isKeyEvent(eventParts[0]) && _.isKey(eventParts[1]);
    },

    _getEventParts: function (event) {
      eventParts = event.split(':');
      return eventParts;
    }


  });
});