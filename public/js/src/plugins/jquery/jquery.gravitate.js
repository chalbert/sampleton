define([
  'jquery',
  'src/plugins/jquery.physics'
], function($){

  var G = 9.81,
      FR = $.fx.interval;

  $.fn.gravitate = function(options, callback){

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    var settings = $.extend({
      scale: 60,
      resistance: 8.2
    }, options);

    function gravity() {
      this.physics.forces.gravity.duration || (this.physics.forces.gravity.duration = 0);
      var movement;

      this.physics.forces.gravity.duration += FR;
      movement = {
        top: getAcceleration()
      };
      $(this).physics('applyImpulse', movement);

      if (callback) callback.apply(this);
    }

    function getAcceleration(){
      var speed = (G - settings.resistance) * (FR / 1000) * settings.scale;
      return (speed > 0) ? speed : 0;
    }

    $.each(this, function(index, el) {
      $(el).physics({gravity: gravity});
    });

    return this;

  };

  return $;


});