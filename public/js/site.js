require.config({
  paths: {
    jquery: 'libs/vendor/jquery/jquery',
    jqueryui: 'libs/vendor/jqueryui',
    touchpunch: 'libs/vendor/jqueryui/jquery.ui.touch-punch.min',
    underscore: 'libs/vendor/underscore/underscore',
    backbone: 'libs/vendor/backbone/backbone',
    '2D': 'libs/vendor/intersection/2D',
    intersection: 'libs/vendor/intersection/Intersection'
  }
});

require([
  'login.stage'
], function(loginStage){

  var app = new loginStage();

});
