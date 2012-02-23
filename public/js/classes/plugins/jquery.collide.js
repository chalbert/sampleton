define([
  'jquery',
  'classes/plugins/jquery.physics'
], function($){

  var FR = $.fx.interval;

  $.fn.collide = function(options, callback){

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    var settings = $.extend({}, options);

    function collision() {

      $(this).siblings().each($.proxy(function(i, el){
        if (intersect(this, el)) {
          console.log('collision!!!');
        }
      }, this));

    }

    function getCoordinates(r){
      var rpos = $(r).offset();
      return {
        left: rpos.left,
        top: rpos.top,
        right: rpos.left + $(r).width(),
        bottom: rpos.top + $(r).height()
      }
    }

    function intersect(r1, r2) {
      var c1 = getCoordinates(r1),
          c2 = getCoordinates(r2);
      return ! ( c2.left > c1.right
          || c2.right < c1.left
          || c2.top > c1.bottom
          || c2.bottom < c1.top
          );
    }

    $.each(this, function(index, el) {
      $(el).physics({collision: collision});
    });

    return this;

  };

  return $;

});