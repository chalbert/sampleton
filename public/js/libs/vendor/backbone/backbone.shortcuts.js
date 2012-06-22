define([
  'underscore',
  'backbone',
  'keymaster'
], function(_, Backbone, keymaster) {
  var Shortcuts, delegateEvents, undelegateEvents;

  delegateEvents = Backbone.View.prototype.delegateEvents;
  undelegateEvents = Backbone.View.prototype.undelegateEvents;

  Shortcuts = {
    delegateShortcuts: function(shortcuts, context) {
      var match, method, scope, shortcut, shortcutKey;
      if (window.Touch) return;
      if (!shortcuts) return;

      _.each(shortcuts, function(callback, key){
        method = _.isFunction(callback)
            ? callback
            : context[callback];

        if (!method) throw new Error("Method " + callback + " does not exist");
        match = shortcut.match(/^(\S+)\s*(.*)$/);
        shortcutKey = match[1];
        scope = match[2] === "" ? "all" : match[2];
        keymaster.key(shortcutKey, scope, method);
      }, this);
    },
    undelegateShortcuts: function(){

    }
  };



  Backbone.Shortcuts = Shortcuts;

  _.extend(Backbone.View.prototype, {
    delegateEvents: function(){
      delegateEvents.apply(this, arguments);
      Backbone.Shortcuts.delegateShortcuts(this.shortcuts, this);
    },
    undelegateEvents: function(){
      undelegateEvents.apply(this, arguments);
      Backbone.Shortcuts.undelegateShortcuts(this.shortcuts, this);
    }
  });


  Backbone.Shortcuts.extend = Backbone.View.extend;

});
