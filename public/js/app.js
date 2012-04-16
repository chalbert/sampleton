require.config({
  paths: {
    jquery: 'libs/vendor/jquery/jquery',
    clickout: 'src/plugins/jquery/jquery-clickout/jquery.clickout',
    jqueryui: 'libs/vendor/jqueryui',
    touchpunch: 'libs/vendor/jqueryui/jquery.ui.touch-punch.min',
    cookie: 'libs/vendor/jquery/jquery.cookie',
    underscore: 'libs/vendor/underscore/underscore',
    'underscore-keys': 'src/plugins/underscore/underscore-keys/underscore-keys',
    backbone: 'libs/vendor/backbone/backbone',
    'backbone_super': 'libs/vendor/backbone/backbone_super',
    'backbone-mixins': 'src/plugins/backbone/backbone-mixins/backbone-mixins',
    'backbone-elements': 'src/plugins/backbone/backbone-elements/backbone-elements',
    'backbone-keyevents': 'src/plugins/backbone/backbone-keyevents/backbone-keyevents',
    'backbone-multiviews': 'src/plugins/backbone/backbone-multiviews/backbone-multiviews',
    'backbone-multiviews-bindings': 'src/plugins/backbone/backbone-multiviews-bindings',
    'backbone-mediator': 'src/plugins/backbone/backbone-mediator/backbone-mediator',
    'backbone-shortcuts': 'src/plugins/backbone/backbone-shortcuts/backbone-shortcuts',
    text: 'libs/vendor/require/text',
    order: "libs/vendor/require/order",
    date: "libs/vendor/date/date",
    modelBinding: "libs/vendor/backbone/backbone.modelbinding",
    handlebars: "libs/vendor/handlebars/handlebars-1.0.0.beta.6"
  }

});

// PLUGINS
require([
  // BACKBONE
  'backbone_super',
  'backbone-mixins',
  'backbone-mediator',
  'src/plugins/backbone/backbone-baseModel',
  'src/plugins/backbone/backbone-baseCollection',
  'backbone-elements',
  'backbone-keyevents',
  'backbone-multiviews',
  'backbone-multiviews-bindings',
  'backbone-shortcuts',
  // UNDERSCORE
  'src/plugins/underscore/underscore-extension',
  'underscore-keys'
], function(){

  require([
    'preload',
    'sampleton/app/app.view',
    'sampleton/app/app.router'
  ], function($, appView, appRouter){

    var app = new appView(),
        router = new appRouter();
    app.open();

  });

});
