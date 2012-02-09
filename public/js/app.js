require.config({
  paths: {
    jquery: 'libs/vendor/jquery/jquery',
    jqueryui: 'libs/vendor/jqueryui',
    underscore: 'libs/vendor/underscore/underscore',
    backbone: 'libs/vendor/backbone/backbone',
    glasses: 'libs/glasses/glasses',
    text: 'libs/vendor/require/text',
    order: "libs/vendor/require/order",
    date: "libs/vendor/date/date",
    mediator: "libs/mediator"
  }

});

require([
  'views/app.view'
], function(appView){

  var app = new appView();

});
