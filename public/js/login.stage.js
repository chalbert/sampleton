define([
  'jquery',
  'underscore',
  '2D',
  'intersection',
  'classes/plugins/jquery.stage'
], function ($, _, twoD, Intersection) {

  return function() {

    var $stage = $("#container"),
        $boot = $('#boot');

//
//    $(window).load(function(){
//      $stage.stage({
//        scale:150
//      });
//
//      $stage.append('<div id="frame">' +
//          '<div class="right"/><div class="bottom"/><div class="left"/></div>');
//
//      $boot.physics({mass: 10, callback: function(){
//        if ($stage.stage('isOut', this)) {
//          this.physics.stopped = true;
//        }
//      }}).gravitate();
//
////      $boot.physics('applyImpulse', {left: -1})
//
////      setTimeout(function(){
////        $boot.physics('applyImpulse', {top: -20})
////      }, 3000);
//
//      $('#login').physics({mass: 1000});
//      $('#frame div').physics({mass: 1000});
//
//
//    });


  }

});
