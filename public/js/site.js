require.config({
  paths: {
    jquery: 'libs/vendor/jquery/jquery',
    jqueryui: 'libs/vendor/jqueryui',
    touchpunch: 'libs/vendor/jqueryui/jquery.ui.touch-punch.min',
    underscore: 'libs/vendor/underscore/underscore',
    backbone: 'libs/vendor/backbone/backbone',
    '2D': 'libs/vendor/intersection/2D',
    intersection: 'libs/vendor/intersection/Intersection',
    jqueryHooks: 'src/plugins/jquery/jquery-hooks/jquery-hooks',
    jqueryHooksTransform: 'libs/vendor/jquery/jquery-hook-transform',
    debug: 'src/debug'
  }
});

require([
  'jquery',
  'jqueryHooks',
  'jqueryHooksTransform'
], function($){
  'use strict';

  window.Text

  $(function(){


    var elements = {
          info: '.info',
          login: '#login',
          content: '#login .content',
          details: '#login .details'
        },
        $info = $(elements.info),
        $login = $(elements.login),
        $content = $(elements.content),
        $details = $(elements.details),
        action = window.Touch ? 'touchstart' : 'click',
        center, setCenter, setRotation, previousCoor,
        threshold, max;

    $login.on(action, elements.info, function(e){
      e.preventDefault();
      e.stopPropagation();
      if ($login.hasClass('flip')) {
        document.location.hash = '';
        $login.removeClass('flip');
        $login.addClass('flap');
      } else {
        $login.attr('style', '');
        document.location.hash = 'info';
        $login.removeClass('flap');
        $login.addClass('flip');
      }
    });

    if (document.location.hash === '#info') $info.click();

    setRotation = function(x, y){
      if ($login.hasClass('flip')) {
        y = y -180;
        x *= -1;
      }

      $login.css({
        transform: 'rotateY(' + y + 'deg) rotateX(' + x + 'deg)'
      });
    };

    // The perspective effect is applied only for mouse devices
    if (!window.Touch) {
      setCenter = function() {
        center = {
          x: $(window).width() / 2,
          y: $(window).height() / 2
        };
      }.call(this);

      $(window).resize(function(){
        setCenter();
      });

      $('body').bind('mousemove', function(e){
        if ($login.hasClass('flip')) return;
        var rotateY = ((e.pageX - center.x) / center.x) * 10,
            rotateX = ((e.pageY - center.y) / center.y) * -10;

        setRotation(rotateX, rotateY);

      });
    }

    if(window.DeviceMotionEvent) {
      previousCoor = {x: 0, y: 0, z: 0};

     max = 15;
     threshold = 0.2;

     $(window).on('devicemotion', function(e) {
       var coor, acc, rotateY, rotateX;

       coor = e.originalEvent.accelerationIncludingGravity;

       if (Math.abs(coor.x - previousCoor.x) < threshold) coor.x = previousCoor.x;
       if (Math.abs(coor.y - previousCoor.y) < threshold) coor.y = previousCoor.y;

       previousCoor = coor;

       if (window.orientation === 0) {
         rotateX = coor.y * 5;
         rotateY = coor.x * 5;
       } else {
         rotateX = coor.x * -5;
         rotateY = coor.y * 5;
       }

       if(rotateX > max) {
         rotateX = max;
       } else if(rotateX < -max) {
         rotateX = -max;
       }
       if(rotateY > max) {
         rotateY = max;
       } else if(rotateY < -max) {
         rotateY = -max;
       }

       setRotation(rotateX, rotateY);

     });
    }
  });

});
