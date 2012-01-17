//|===================================================|
//| CHALBERT ~ VIEW
//|===================================================|

define([
  'jquery',
  'underscore',
  'backbone',
  'libs/glasses/glasses.util'
], function($, _, Backbone, util){

  return Backbone.View.extend({

    $el: function(element) {
      if (!element) return $(this.el);
      if (this.elements && this.elements[element]) {
        return $(this.el).find(this.elements[element]);
      }
    },
    //| > Convention based event binding
    generateEvents : function(){
      var eventStack = {};
      if (_.isString(arguments[0])) {
        _.extend(eventStack, this._formatElementEvents('', arguments[0]));
      }
      var childrenEvents = arguments[1] || arguments[0];
      if (_.isObject(childrenEvents)) {
        for (child in childrenEvents) {
          _.extend(eventStack, this._formatElementEvents(child, childrenEvents[child]));
        }
      }

      return eventStack;
    },

    _formatElementEvents: function(element, eventString){
      this._ensureElementExist(element);
      var events = eventString.split(' '),
          eventStack = {};

      for (eventKey in events) {

        var event = events[eventKey];

        util.ensureEventIsValid(event);

        if (util.isSpecificKeyEvent(event)) {
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
      var eventParts = util.getEventParts(event),
          eventName = eventParts[0],
          keyName = eventParts[1],
          data = {
            key: util.getKeycode(keyName),
            keyName: keyName,
            el: element
          },
          router = _.bind(this._keyEventRouter, this);

      this._ensureEventMethodExist(element, eventName, keyName);

      if (element === '') {
        this.$el().bind(eventName, data, router);
      } else {
        this.$el().delegate(this.getElementSelector(element), eventName, data, router);
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
    }
  });
});