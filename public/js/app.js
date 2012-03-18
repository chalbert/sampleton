require.config({
  paths: {
    jquery: 'libs/vendor/jquery/jquery',
    jqueryui: 'libs/vendor/jqueryui',
    touchpunch: 'libs/vendor/jqueryui/jquery.ui.touch-punch.min',
    cookie: 'libs/vendor/jquery/jquery.cookie',
    underscore: 'libs/vendor/underscore/underscore-extended',
    backbone: 'libs/vendor/backbone/backbone-extended',
    text: 'libs/vendor/require/text',
    order: "libs/vendor/require/order",
    date: "libs/vendor/date/date",
    modelBinding: "libs/vendor/backbone/backbone.modelbinding",
    handlebars: "libs/vendor/handlebars/handlebars"
  }

});

require([
  'jquery',
  'sampleton/app/app.view',
  'sampleton/app/app.router'
], function($, appView, appRouter){

  var loaded, fetched,
      preload = function(){
        if (!loaded || !fetched) return;
        require(['preload']);
      };
  $(window).bind('load', function(){
    loaded = true;
    preload();
  });

  $('body').ajaxStop(function(){
    fetched = true;
    preload();
  });

  var app = new appView(),
      router = new appRouter();
  app.open();



});
