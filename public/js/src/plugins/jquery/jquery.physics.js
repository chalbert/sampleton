define(['jquery'], function($){
//|------------------------------------
//|--------|
//| STATIC |
//|--------|
  var FR = $.fx.interval,
      Bodies = [],
      Clock,
      Moving = [],
      scale = 60;

  function AddBody(body){
    Bodies.push(body);
    $.unique(Bodies);
  }

  function StartClock() {
    Clock = $.Event();
    Clock = setInterval(function() {
      $(Bodies).trigger('tick');

      //| > If nothing moves, stop here
      if (!Moving.length) return;

      for (var n = 0, l = Moving.length; n < l; n++) {
        for (var i = 0, l2 = Bodies.length; i < l2; i++) {
          if (Bodies[i].physics.collisionsChecked) continue;
          if (Moving[n] == Bodies[i]) continue;
          if(willBeColliding(Moving[n], Bodies[i])) {
            collide(Moving[n], Bodies[i]);
          }
        }
        Moving[n].physics.collisionsChecked = true;
        $(Moving[n]).offset(Moving[n].physics.nextPosition);
        delete Moving[n].physics.nextPosition;
      }

      Moving = [];

    }, FR);
  };

//  function GetCollisions() {
//    var collisions = [];
//    for (var n = 0, l = Moving.length; n > l; n++) {
//      for (var i = 0, l = Bodies.length; i > l; i++) {
//        if(willBeColliding(Moving[n], Bodies[1])) {
//          collide([Moving[n], Bodies[1]]);
//        }
//      }
//    }
//  }

//|------------------------------------

  $.fn.physics = function(){
    var args = $.makeArray(arguments);
    Clock || (StartClock());
    $.each(this, function(i, body){
      if (!body.physics) {
        init.apply(body, args);
      } else {
        var method = (args.length == 1) ? 'addForces' : args.shift();
        if (methods[method]) methods[method].apply(body, args);
      }
    });
    return this;
  };

  var methods = {
    addForces: addForces,
    removeForces: removeForces,
    setMovement: setMovement,
    applyImpulse: applyImpulse
  };

  function init(options) {

    this.physics = $.extend({
      //| > Mass in kg
      mass: 1,
      //| > Will define the quantity of energy absorbed on impact.
      //|  Low elasticity = high absorption
      elasticity: .6,
      //| > When a body is in contact, the quantity of movement lost
      friction: .05,
      //| > Current change of position in space
      movement: {left:0, top:0}
    }, options);

    // Add to list of physical bodies to account for
    AddBody(this);

    // We need to reset to fix a bug when using percentage positioning
    $(this).css({
      left: $(this).offset().left,
      top: $(this).offset().top,
      right: 'auto',
      bottom: 'auto',
      margin: 0


    });

  }

  function tick(){

    if (this.physics.callback) this.physics.callback.apply(this);

    if (this.physics.stopped) return;

    if (this.physics.forces) {
      $.each(this.physics.forces, $.proxy(function(i, force){
        force.apply(this);
      }, this));
    }

    // If not enough momentum to move the object, it's immobile.
    // But we do not round otherwise to preserve presision
    if (this.physics.movement.left < 1 && this.physics.movement.left > -1) this.physics.movement.left = 0;
    if (this.physics.movement.top < 1 && this.physics.movement.top > -1) this.physics.movement.top = 0;

    if (!this.physics.movement.left && !this.physics.movement.top && !this.physics.forces) {

      //| >  Body has attained inertia and is subject to no force,
      //|     stop listenning until new impulse
      unobserve(this);
      return;
    }


    // After all forces being applied, the resulting movement is computed
    var pos = $(this).offset();
    this.physics.nextPosition = {
      left: pos.left + this.physics.movement.left,
      top: pos.top + this.physics.movement.top
    }

    this.physics.collisionsChecked = false;
    Moving.push(this);

//    $(this).offset({
//      left: pos.left + this.physics.movement.left,
//      top: pos.top + this.physics.movement.top
//    })
  }

  function getVelocity(el) {
    if (!el.physics.nextPosition) return 0;

    var xdiff = el.physics.nextPosition.left - $(el).offset().left,
        ydiff = el.physics.nextPosition.top - $(el).offset().top,
        diagonale = Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2));
    // We want the speed by second
    return byTickToBySecond(diagonale);
  }

  function getDirection(el) {
    if (!el.physics.nextPosition) return;

    var point1 = {x:$(el).offset().left,  y:$(el).offset().top},
        point2 = {x:el.physics.nextPosition.left, y:el.physics.nextPosition.top},
        angle = getAngle(point1, point2);
    return angle;
  }

  //| > To use when an object is given a movement or has forces.
  function observe(el) {
    if (!el.physics.ticking) {
      $(el).bind('tick', $.proxy(tick, el));
      el.physics.ticking = true;
    }
  }

  //| > To stop observe a body, eg. when inertia is attained.
  function unobserve(el) {
    $(el).unbind('tick');
  }

  function setMovement(movement){
    observe(this);

    if (movement.top) this.physics.movement.top = movement.top;
    if (movement.left) this.physics.movement.left = movement.left;
  }

  function applyImpulse(impulse){
    observe(this);

    var pos = $(this).offset();
    this.physics.movement = {
      left: this.physics.movement.left + (impulse.left || 0),
      top: this.physics.movement.top + (impulse.top || 0)
    }
  }

  function addForces(forces){
    if (!this.physics.forces) {
      this.physics.forces = {};
      observe(this);
    }

    $.each(forces, $.proxy(function(i, force){
      this.physics.forces[i] = force;
    }, this))
  };

  function removeForces(forces){
    if (!$.isArray(forces)) forces = [forces];
    $.each(forces, $.proxy(function(i, force){
      delete this.physics.forces[force];
    }, this))
  };

  //|-----------|
  //| COLLISION |
  //|-----------|
  function willBeColliding(el1, el2){
    if (intersect(el1, el2)) {
      return true;
    }
  }

  function collide(el1, el2){
    //| > Masses
    var m1 = el1.physics.mass,
        m2 = el2.physics.mass,
      //| > Velocity before impact
        u1 = getVelocity(el1),
        u2 = getVelocity(el2),
      // momentum
        mom1 = m1 * u1,
        mom2 = m2 * u2,
      //| Direction of the object
        d1 = getDirection(el1),
        d2 = getDirection(el2),
      //| > Velocity after impact
        v1, v2,
      //| Coefficient of restitution (elasticity)
        cor1 = el1.physics.elasticity,
        cor2 = el2.physics.elasticity,
        friction = el1.physics.friction + el2.physics.friction;

    v1 = (u1 * (m1 - m2) + 2 * (m2  * u2)) / (m1 + m2);
    v2 = (u2 * (m2 - m1) + 2 * (m1  * u1)) / (m1 + m2);

    v1 = bySecondToByTick(v1);
    v2 = bySecondToByTick(v2);

    if (cor1 > .9 && v1 < 3 && v1 > -3) {
      cor1 *= .85;
    }

    if (cor1 > .9 && v2 < 3 && v2 > -3) {
      cor2 *= .85;
    }

    v1 *= cor1;
    v2 *= cor2;

    v1 *= 1 -friction;
    v2 *= 1 -friction;


//    d1 = perpendiculaireALimpact();

    // TODO: Add direction

    var intersection = getIntersection(el1, el2),
        left = intersection[0],
        top = intersection[1];

    el1.physics.nextPosition.top = top - $(el1).height();
//    el1.physics.nextPosition.left = left;

    // Will create an impulse for the next tick
    $(el1).physics('setMovement', {top: v1});
    $(el2).physics('setMovement', {top: v2});


//    v1 = ((m1 * u1) + (m2 * u2) + Math.pow((m2 * COR), u2 - u1)) / (m1 + m2);
//    v2 = ((m1 * u1) + (m2 * u2) + Math.pow((m1 * COR), u1 - u2)) / (m1 + m2);

  }

  function bySecondToByTick(value){
    return value * (FR / 1000);
  }

  function byTickToBySecond(value){
    return value * (1000 / FR);
  }

  function meterToPixel(value){
    return value * scale;
  }

  function pixelToMeter(){
    return value / scale;
  }


  function getNextCoordinates(el){
    var pos = el.physics.nextPosition
        ? el.physics.nextPosition
        : $(el).offset();

    return {
      left: pos.left,
      top: pos.top,
      right: pos.left + $(el).width(),
      bottom: pos.top + $(el).height()
    }
  }

  function intersect(el1, el2) {
    var c1 = getNextCoordinates(el1),
        c2 = getNextCoordinates(el2);
    return (! ( c2.left > c1.right
        || c2.right < c1.left
        || c2.top > c1.bottom
        || c2.bottom < c1.top
        ))
  }

  function getIntersection(el1, el2) {
    var c1 = getNextCoordinates(el1),
        c2 = getNextCoordinates(el2);

    return [
      Math.max(c1.left, c2.left),
      Math.max(c1.top, c2.top),
      Math.min( c1.right, c2.right),
      Math.min(c1.bottom, c2.bottom)
    ];
  }

  function degreesToRadians(angle) {
    angle = Math.pi * (angle / 180);
    return angle;
  }

  function radiansToDegrees(angle) {
    angle = angle * (180 / Math.pi);
    return angle;
  }

  function getAngle(point1, point2) {
    var xdiff = point1.x - point2.x,
        ydiff = point1.y - point2.y,
        angle = Math.atan2(xdiff, ydiff);
    return angle;
  }

  // Export back physics to jQuery object
  return $;

});