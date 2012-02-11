define([
  'jquery',
  'backbone',
  'mediator',
  'cookie'
], function($, Backbone, mediator){

  var levels = {
        anonymous: 0,
        user: 1
      },
      cookie = 'session',
      session = (function(){

        var defaults = {
          level: 0
        }

        if (_isLogged()) {
          return _getSession();
        }

        return defaults;

      })();

  function _isLogged() {
    //return $.cookie(cookie) &&
//    return;
  }

  function _getSession() {

  }

  function control(criteria, method){
    var level = levels[criteria.level] || 0;
    if (session.level < level) {
      mediator.publish('error', "Sorry, you don't have access to this page.");
      mediator.publish('login:go');
    } else {
     method.call();
    }
  };

  return {
    control: control
  }

});