define(function(mediator){

  var channels = {};
  mediator = mediator || {};

  mediator.subscribe = function (channel, subscription, context) {
    if (!channels[channel]) channels[channel] = [];
    channels[channel].push({fn: subscription, context: context || this});
  };

  mediator.publish = function (channel) {
    if (!channels[channel]) return;
    var args = [].slice.call(arguments, 1);
    for (var i = 0, l = channels[channel].length; i < l; i++) {
      var subscription = channels[channel][i];
      subscription.fn.apply(subscription.context, args);
    }
  };

  return mediator;

});