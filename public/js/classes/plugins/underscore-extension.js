
define(['underscore'], function(_){

  var keyEvents = ['keypress', 'keydown', 'keyup'];
  var keyMap = {
    enter: 13,
    backspace: 8,
    tab: 9,
    escape: 27,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    'delete': 46
  };

  return _.mixin({

    isKeyEvent: function(event){
      if (keyEvents.indexOf(event) !== -1) return true;
    },

    isKey: function(key){
      if (_.keys(keyMap).indexOf(key) !== -1) return true;
    },

    getKeycode: function(keyname){
      return keyMap[keyname];
    },

    getKey: function(code){
      for (var key in keyMap) {
        if (keyMap[key] === code) return key;
      }
    },

    capitalize : function(string) {
      return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    }
  });

});