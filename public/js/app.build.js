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
    jqueryui: 'libs/vendor/jqueryui',
    touchpunch: 'libs/vendor/jqueryui/jquery.ui.touch-punch.min',
    cookie: 'libs/vendor/jquery/jquery.cookie',
    underscore: 'libs/vendor/underscore/underscore-extended',
    backbone: 'libs/vendor/backbone/backbone-extended',
    text: 'libs/vendor/require/text',
    order: "libs/vendor/require/order",
    date: "libs/vendor/date/date",
    modelBinding: "libs/vendor/backbone/backbone.modelbinding",
    handlebars: "empty:" //libs/vendor/handlebars/handlebars
  }
})