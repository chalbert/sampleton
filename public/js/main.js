require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-optamd3-min',
    modelbinding: "libs/backbone/backbone.modelbinding.min",
    text: 'libs/require/text',
    order: "libs/require/order"
  }

});

require(['views/app.view'], function(AppView){
  var app_view = new AppView;
});