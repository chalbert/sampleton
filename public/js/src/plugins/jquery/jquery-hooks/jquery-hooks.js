define(['jquery'], function($){
  'use strict';
  var styles, supportedStyle;

  if ( !$.cssHooks ) {
    throw("jQuery 1.4.3+ is needed for this plugin to work");
    return;
  }

  function styleSupport( prop ) {
    var vendorProp, supportedProp,
        capProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        prefixes = [ "moz", "webkit", "o", "ms" ],
        div = document.createElement( "div" );

    if ( prop in div.style ) {
      supportedProp = prop;
    } else {
      for ( var i = 0; i < prefixes.length; i++ ) {
        vendorProp = prefixes[i] + capProp;
        if ( vendorProp in div.style ) {
          supportedProp = vendorProp;
          break;
        }
      }
    }

    div = null;
    $.support[ prop ] = supportedProp
    return supportedProp;
  }

  styles = ['perspectiveOriginX', 'perspectiveOriginY', 'perspective'];

  $.each(styles, function(i, style){
    supportedStyle = styleSupport(style);
    if (supportedStyle && supportedStyle !== style) {
        (function(style, supportedStyle){
          $.cssHooks[style] = {
            get: function( elem, computed, extra ) {
              return $.css( elem, supportedStyle );
            },
            set: function( elem, value) {
              elem.style[ supportedStyle ] = value;
            }
          };
        })(style, supportedStyle);
    }
  });

});