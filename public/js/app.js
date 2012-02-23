require.config({
  paths: {
    jquery: 'libs/vendor/jquery/jquery',
    jqueryui: 'libs/vendor/jqueryui',
    touchpunch: 'libs/vendor/jqueryui/jquery.ui.touch-punch.min',
    cookie: 'libs/vendor/jquery/jquery.cookie',
    underscore: 'libs/vendor/underscore/underscore',
    backbone: 'libs/vendor/backbone/backbone',
    text: 'libs/vendor/require/text',
    order: "libs/vendor/require/order",
    date: "libs/vendor/date/date",
    mediator: "classes/mediator",
    modelBinding: "libs/vendor/backbone/backbone.modelBinding"
  }

});

require([
  'views/app.view'
], function(appView){

  var app = new appView();

});
