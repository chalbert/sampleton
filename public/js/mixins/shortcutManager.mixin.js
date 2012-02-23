define([
  'backbone',
  'underscore',
  'mediator',
  'classes/plugins/underscore-extension'
], function (Backbone, _, mediator) {

  return {

    initialize: function(){
      mediator.subscribe('shortcut:add', this.addShortcuts, this);
      mediator.subscribe('shortcut:remove', this.removeShortcuts, this);
      $(document).keydown($.proxy(this.document_key, this));
    },

    shortcutsStack: {},
    document_key: function(e){
      var key = _.getKey(e.which);
      if (this.shortcutsStack[key] && this.shortcutsStack[key].length) {
        e.stopPropagation();
        e.preventDefault();
        var shortcut = this.shortcutsStack[key][0];
        shortcut.fn.apply(shortcut.context, arguments);
      }
    },

    addShortcuts: function(shortcuts, context){
      this.removeShortcuts(shortcuts, context);
      _.each(shortcuts, function(shortcut, key) {
        this.shortcutsStack[key] || (this.shortcutsStack[key] = []);
        this.shortcutsStack[key].unshift({
          fn: context[shortcut],
          context: context
        });
      }, this);
    },

    removeShortcuts: function(shortcuts, context) {
      var stack;
      _.each(shortcuts, function(shortcut, key) {
        stack = this.shortcutsStack[key]
        if (stack) {
          for (var n = 0; n < stack.length; n++) {
            if (stack[n].fn === context[shortcut]) stack.splice(n, 1);
          }
        }
      }, this);
    }
  }


});