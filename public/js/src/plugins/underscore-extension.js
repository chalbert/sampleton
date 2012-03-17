
define(['libs/vendor/underscore/underscore'], function(_){

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
    'delete': 46,
    slash: 191
  };

  return _.mixin({

   //| # Return true if the event is keypress, keydown or keyup.
    isKeyEvent: function(event){
      if (keyEvents.indexOf(event) !== -1) return true;
    },

    //| # Return true if the key argument correspond to the name of a key.
    isKey: function(key){
      if (key.length === 1) return true;
      if (_.keys(keyMap).indexOf(key) !== -1) return true;
    },

    //| # Return the keycode from the name of the key.
    getKeycode: function(key){
      if (key.length === 1) return key.charCodeAt(0);
      return keyMap[key];
    },

    //| # Return the name of the key from the keycode.
    getKey: function(code){
      //| If special char
      for (var key in keyMap) {
        if (keyMap[key] === code) return key;
      }
      //| If no special char
      return String.fromCharCode(key);
    },

    capitalize : function(string) {
      return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
    },

    getDistance: function(el1, el2) {
      var pos1 = el1.offset(),
          pos2 = el2.offset(),
          width = (pos1.left < pos2.left)
            ? pos2.left - (pos1.left + el1.width())
            : pos1.left - (pos2.left + el2.width()),
          height = (pos1.top < pos2.top)
            ? pos2.top - (pos1.top + el1.height())
            : pos1.top - (pos2.top + el2.height()),
          // If the width or height if smaller than 0, the size of the  first element
          // is greater than the distance, so = 0
          distance = Math.sqrt(Math.pow((width > 0 ? width : 0) , 2)
              + Math.pow((height > 0 ? height : 0), 2))

      return distance;
    },

    isScalar: function(value){
      if (_.isString(value) ||
          _.isNumber(value) ||
          _.isBoolean(value) ||
          _.isDate(value) ||
          _.isRegExp(value)
         ) return true;
    },

    same: function(first, second){
      if ((_.isString(first)) && first === second) return true;
      else if (_.isArray(first) && _.isArray(second) && first.length === second.length) {

      }
      return false;
    },

    isInputChar: function(keyCode){
      var char = String.fromCharCode(keyCode),
          arrows = _.range(37, 40);

      if ((char && char.length) || arrows.indexOf(char)) {
        return true;
      }
    }


  });

});