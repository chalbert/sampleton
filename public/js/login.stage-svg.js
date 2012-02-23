define([
  'jquery',
  'underscore',
  '2D',
  'intersection',
  'classes/plugins/jquery.stage'
], function ($, _, twoD, Intersection) {

  return function() {


    var svgns  = "http://www.w3.org/2000/svg",
        points = [],
        $this = $("#stage");

    function start(){

//      var shapes = [
//        new twoD.Rectangle($('#rectangle').get(0)),
//        new twoD.Circle($('#circle').get(0))
//      ];
//      showIntersections(shapes);

//
//      $this.stage({
//        scale:150
//      });

    }

//    function showIntersections(shapes) {
//      if ( shapes.length >= 2 ) {
//        var inter = Intersection.intersectShapes( shapes[0], shapes[1] );
//
//        for ( var i = 0; i < inter.points.length; i++ ) {
//          var coord = inter.points[i];
//
//          if ( i >= points.length ) {
//            var point = document.createElementNS(svgns, "use");
//
//            point.setAttributeNS(
//                "http://www.w3.org/1999/xlink",
//                "href",
//                "#intersection"
//            );
//            $('#svg').append(point);
//            points.push(point);
//          }
//          points[i].setAttributeNS(null, "x", coord.x);
//          points[i].setAttributeNS(null, "y", coord.y);
//          points[i].setAttributeNS(null, "display", "inline");
//        }
//
//        for ( var i = inter.points.length; i < points.length; i++ ) {
//          points[i].setAttributeNS(null, "display", "none");
//        }
//      }
//    }

  }


});
