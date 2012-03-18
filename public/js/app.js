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
  'sampleton/app/app.view',
  'sampleton/app/app.router',
  //COMMONS
  'text', 'date',
  'src/mixins/views/searchable.mixin',
  'src/mixins/views/list.mixin',
  'src/mixins/collections/orderable.mixin',
  'src/ui/new.view',
  'js/libs/vendor/jqueryui/core.js',
  'js/libs/vendor/jqueryui/widget.js',
  'js/libs/vendor/jqueryui/mouse.js',
  'js/libs/vendor/jqueryui/draggable.js',
  'js/libs/vendor/jqueryui/droppable.js',
  'js/libs/vendor/jqueryui/sortable.js',
  'touchpunch'
], function(appView, appRouter){

  var app = new appView(),
      router = new appRouter();
  app.open();

});
