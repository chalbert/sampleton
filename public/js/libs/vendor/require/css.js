define(['text'], function (text) {
  'use strict';

  var css, buildMap = {};

  css = {

    load: function (name, req, onLoad, config) {
      var parsed = text.parseName(name),
          nonStripName = parsed.moduleName + '.' + parsed.ext;

      text.get(req.toUrl(nonStripName), function(data){
        if (config.isBuild) buildMap[name] = data;
        else css.appendStyles(name, data);
        onLoad(data);
      });
    },

    appendStyles: function(name, data){
      var head = document.getElementsByTagName('head')[0],
          content = document.createTextNode(data),
          node = document.createElement('style');

      node.setAttribute('data-requirecss', name);
      node.appendChild(content);

      head.appendChild(node);

    },

    write: function (pluginName, moduleName, write, config) {
      if (buildMap.hasOwnProperty(moduleName)) {
        var content = text.jsEscape(buildMap[moduleName]);
        write.asModule(pluginName + "!" + moduleName,
          "define(function () { return '" +
            content +
            "';});\n");
      }
    }
  };

  return css;

});
