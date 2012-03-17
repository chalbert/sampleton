define([
  'underscore',
  'libs/vendor/backbone/backbone'
], function(_, Backbone){

  var channels = {};

  function subscribe (channel, subscription, context, once) {
    if (!channels[channel]) channels[channel] = [];
    channels[channel].push({fn: subscription, context: context || this, once: once});
  };

  function publish (channel) {
    if (!channels[channel]) return;
    var args = [].slice.call(arguments, 1);
    for (var i = 0; i < channels[channel].length; i++) {
      var subscription = channels[channel][i];
      subscription.fn.apply(subscription.context, args);
      if (subscription.once) {
        this.unsubscribe(channel, subscription.fn, subscription.context);
        i--;
      }
    }
  };

  function unsubscribe (channel, fn, context){
    if (channels[channel]) {
      for (var i = 0; i < channels[channel].length; i++) {
        var subscription = channels[channel][i];
        if (subscription.fn === fn && subscription.context === context) {
          channels[channel].splice(i, 1);
          i--;
        }
      }
    }
  };

  function subscribeOnce (channel, subscription, context) {
    this.subscribe(channel, subscription, context, true);
  };

  _.each(["Model", "Collection", "View", "Router"], function(klass) {
    Backbone[klass].prototype = _.extend(Backbone[klass].prototype, {
      subscribe: subscribe,
      publish: publish,
      unsubscribe: unsubscribe,
      subscribeOnce: subscribeOnce
    })

  });

  return Backbone;

});