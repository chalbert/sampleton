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
    jqueryHooksTransform: 'libs/vendor/jquery/jquery-hook-transform'
  }
});

require([
  'jquery',
  'jqueryHooks',
  'jqueryHooksTransform'
], function($){
  'use strict';

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
        center, setCenter;

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

      $login.css({
        transform: 'rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)'
      });

    });
  });

});
