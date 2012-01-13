require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-optamd3-min',
    backboneExtension: 'custom/extensions/backbone.extension',
    text: 'libs/require/text',
    order: "libs/require/order"
  }

});

require(['views/app.view'], function(AppView){
  var app_view = new AppView;
});