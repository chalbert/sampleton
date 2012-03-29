// node r.js -o public/js/app.build.js

({
  appDir: "../",
  baseUrl: "js",
  dir: "../../public-build",
  modules: [
    {
      name: "app"
    },
    {
      name: "preload",
      exclude: ["app"]
    },
    {
      name: 'sampleton/projects/projects.view',
      exclude: ["app", "preload"]
    },
    {
      name: 'sampleton/project/project.view',
      exclude: ["app", "preload"]
    },
    {
      name: 'sampleton/records/records.view',
      exclude: ["app", "preload"]
    },
    {
      name: 'sampleton/templates/templates.view',
      exclude: ["app", "preload"]
    },
    {
      name: 'sampleton/template/template.view',
      exclude: ["app", "preload"]
    }
  ],
  paths: {
      jquery: 'libs/vendor/jquery/jquery',
        clickout: 'src/plugins/jquery/jquery-clickout/jquery.clickout',
      jqueryui: 'libs/vendor/jqueryui',
      touchpunch: 'libs/vendor/jqueryui/jquery.ui.touch-punch.min',
      cookie: 'libs/vendor/jquery/jquery.cookie',
      underscore: 'libs/vendor/underscore/underscore-extended',
        'underscore-keys': 'src/plugins/underscore/underscore-keys/underscore-keys',
      backbone: 'libs/vendor/backbone/backbone-extended',
        'backbone-mixins': 'src/plugins/backbone/backbone-mixins/backbone-mixins',
        'backbone-elements': 'src/plugins/backbone/backbone-elements/backbone-elements',
        'backbone-multiviews': 'src/plugins/backbone/backbone-multiviews/backbone-multiviews',
        'backbone-mediator': 'src/plugins/backbone/backbone-mediator/backbone-mediator',
        'backbone-shortcuts': 'src/plugins/backbone/backbone-shortcuts/backbone-shortcuts',
      text: 'libs/vendor/require/text',
      order: "libs/vendor/require/order",
      date: "libs/vendor/date/date",
      modelBinding: "libs/vendor/backbone/backbone.modelbinding",
      handlebars: "libs/vendor/handlebars/handlebars-1.0.0.beta.6"
    }

})