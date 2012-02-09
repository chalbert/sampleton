//|===================================================|
//| GLASSES UTIL | o_o.util
//|===================================================|

define(['underscore'], function(_){

  return {

    isValidEvent: function(event){
        //| > Only key event take options
      if (this.isEventWithOption(event) && !this.isSpecificKeyEvent(event)) {
          return false;
      }
      return true;
    },

    ensureEventIsValid: function(event){
      if (!this.isValidEvent(event)) {
        throw "This event does not exist: " + element;
      }
    },

    keyEvents: ['keypress', 'keydown', 'keyup'],
    isKeyEvent: function(event){
      if (this.keyEvents.indexOf(event) !== -1) return true;
    },
    isKey: function(key){
      if (_.keys(this.keyMap).indexOf(key) !== -1) return true;
    },
    isEventWithOption: function(event){
      return (event.indexOf(':') !== -1);
    },
    isSpecificKeyEvent: function(event){
      if (!this.isEventWithOption(event)) return false;

      var eventParts = this.getEventParts(event);
      return this.isKeyEvent(eventParts[0]) && this.isKey(eventParts[1]);
    },
    getEventParts: function (event) {
      eventParts = event.split(':');
      return eventParts;

    },

    getKeycode: function(keyname){
      return this.keyMap[keyname];
    },
    keyMap: {
      enter: 13,
      backspace: 8,
      tab: 9,
      escape: 27,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      'delete': 46
    },

    capitalize : function(string) {
      return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }
  };

});