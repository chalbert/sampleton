define([
  'jquery',
  'src/plugins/jquery.gravitate',
  'src/plugins/jquery.collide'
], function($){


  $.fn.stage = function(method){

    var settings;

    var methods = {
      init: function(options){
        settings = $.extend({
          scale: 100,
          actors: []
        }, options);
      },
      isOut: function(el){
        return ($(el).offset().top > methods.viewport().height);
      },
      viewport: function(){
        return {
          width: $(window).width(),
          height: $(window).height()
        }
      }
    };

    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    }

//    $.each(settings.actors, function(i, el){
//      $(el).gravitate(function(){
//        onExitStage(this);
//      });
//    });
//
//    $.each(this.children(), function(i, el){
//      if (!el.physics) {
//        $(el).physics();
//      }
//    });

    return this;

  }

});