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
      name: 'sampleton/projects/projects.view',
      exclude: ["app"]
    },
    {
      name: 'sampleton/project/project.view',
      exclude: ["app"]
    },
    {
      name: 'sampleton/records/records.view',
      exclude: ["app"]
    },
    {
      name: 'sampleton/templates/templates.view',
      exclude: ["app"]
    },
    {
      name: 'sampleton/template/template.view',
      exclude: ["app"]
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
    handlebars: "empty:"
  }
})