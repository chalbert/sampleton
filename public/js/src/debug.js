define(['jquery'], function($){
  'use strict';
  var debug;

  debug = {
    init: function(){
      $('body').prepend('<div id="console"></div>').css({color: "white"});
      return this;
    },
    destroy:function(){
      $('#console').remove();
    },
    trace: function(source){
      var log;
      if (typeof source ===  'object') {
        $.each(source, function(i, o){
          log += i + ': ' + o + '<br/>';
        });
      } else {
        log = source;
      }
      $("#console").html(log);
    }
  }.init();

  return debug;

});