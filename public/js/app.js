require.config({
  paths: {
    jquery: 'libs/vendor/jquery/jquery',
    clickout: 'src/plugins/jquery/jquery-clickout/jquery.clickout',
    tooltip: 'src/plugins/jquery/jquery-tooltip/jquery-tooltip',
    'filedrop': 'libs/vendor/jquery/jquery.filedrop',
    jqueryui: 'libs/vendor/jqueryui',
    touchpunch: 'libs/vendor/jqueryui/jquery.ui.touch-punch.min',
    cookie: 'libs/vendor/jquery/jquery.cookie',
    underscore: 'libs/vendor/underscore/underscore',
    'underscore-extended': 'libs/vendor/underscore/underscore-extended',
    'underscore-keys': 'src/plugins/underscore/underscore-keys/underscore-keys',
    backbone: 'libs/vendor/backbone/backbone',
    'backbone-extended': 'libs/vendor/backbone/backbone-extended',
    'backbone_super': 'libs/vendor/backbone/backbone_super',
    'backbone-mixins': 'src/plugins/backbone/backbone-mixins/backbone-mixins',
    'backbone-elements': 'src/plugins/backbone/backbone-elements/backbone-elements',
    'backbone-keyevents': 'src/plugins/backbone/backbone-keyevents/backbone-keyevents',
    'backbone-multiviews': 'src/plugins/backbone/backbone-multiviews/backbone-multiviews',
    'backbone-multiviews-bindings': 'src/plugins/backbone/backbone-multiviews-bindings',
    'backbone-mediator': 'src/plugins/backbone/backbone-mediator/backbone-mediator',
    'backbone-shortcuts': 'src/plugins/backbone/backbone-shortcuts/backbone-shortcuts',
//    'backbone-shortcuts': 'libs/vendor/backbone/backbone.shortcuts',
    keymaster: 'libs/vendor/keymaster/keymaster',
    text: 'libs/vendor/require/text',
    order: "libs/vendor/require/order",
    date: "libs/vendor/date/date",
    modelBinding: "libs/vendor/backbone/backbone.modelbinding",
    handlebars: "libs/vendor/handlebars/handlebars-1.0.0.beta.6",
    debug: 'src/debug'
  }

});

require([
  'preload',
  'sampleton/app/app.view',
  'sampleton/app/app.router'
], function(preload, AppView, AppRouter){
  var app = new AppView(),
      router = new AppRouter();
  app.open();
});
