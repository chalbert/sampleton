define(["/js/libs/glasses/glasses.js"], function(o_o) {


  //| MIXINS

  var eventsMixin = {
    events: function() {
      return this.mapEvents('click blur keypress');
    }
  };

  var callbackMixin = {
    click: sinon.stub(),
    blur: sinon.stub(),
    keypress: sinon.stub()
  };

  var elementCallbackMixin = {
    title_dblclick:sinon.stub(),
    input_click:sinon.stub(),
    input_blur:sinon.stub()
  }

  var elementsMixin = {
    elements: {
      title:'.title',
      input:'.input'
    }
  };

  var elementsEventsMixin = {
    events:function () {
      return this.mapEvents({
        title:'dblclick',
        input:'click blur'
      })
    }
  };

  //| GLASSES.VIEW
  describe("As a base view extending Backbone.view", function() {

    var view;
    beforeEach(function () {
      $('body').append('<div class="view"><h1 class="title"/><input class="input" /></div>');
      view = o_o.view.extend({
        el: '.view'
      });
    });

    afterEach(function () {
      $('.view').remove();
    });

//------------------------------------------------------------------------

    describe("Given I call the $get() helper", function () {

      describe("And I don't provide any argument", function () {

        it("should return the view base DOM element", function () {
          var myView = new view();
          expect(myView.$get()).toBe($(myView.el));
        });
      });

      describe("And I provide an argument that matches an element", function () {

        var myView;
        beforeEach(function () {
          myView = new (view.extend(elementsMixin));
        });

        it("should return the associated DOM element", function(){
          for (var element in elementsMixin.elements) {
            expect(myView.$get(element)).toExist();
          }
        });
      });

      describe("But if I provide an argument that doesn't match an element", function () {

        it("should throw an error", function () {

          var gettingAnNonExistingElement = function(){
            expect(myView.$get('nonExistingElement'))
          }

          expect(gettingAnNonExistingElement).toThrow();
        });
      });
    });

    //------------------------------------------------------------------------

    describe("Given I use 'mapEvents' method " +
        "as the return value for 'events' property", function () {

      describe("And I pass a list of space-separated events", function () {

        describe("And methods of the same name as the events exist", function () {

          it("should bind the events to the method of the same name", function () {
            var myView = new (view.extend(eventsMixin)
                .extend(callbackMixin));

            myView.$get().click().blur().keypress();

            for (var callback in callbackMixin) {
              expect(myView[callback]).toHaveBeenCalledOnce();
            }
          });
        });

        describe("But if methods of the same name as the events don't exist", function () {

          it("should throw an error", function () {
            var creatingWithoutCallback = function(){
              new (view.extend(eventsMixin));
            }

            expect(creatingWithoutCallback).toThrow();
          });
        });
      });

      describe("And I pass a hash of elements and space-separated events", function () {

        describe("And each element exist in the 'elements' property", function () {

          describe("And 'elementName_event' being a valid method", function () {

            it("should bind the events to the 'elementName_event'", function () {

              var myView = new (view.extend(elementsMixin)
                  .extend(elementsEventsMixin)
                  .extend(elementCallbackMixin));

              myView.$get('title').dblclick();
              myView.$get('input').click().blur();
              for (var callback in elementCallbackMixin) {
                expect(myView[callback]).toHaveBeenCalled();
              }
            });
          });

          describe("But if 'elementName_event' is not a valid method", function () {

            it("should throw an error", function () {

              var creatingWithoutCallback = function(){
                new (view.extend(elementsMixin)
                    .extend(elementsEventsMixin))
              }

              expect(creatingWithoutCallback).toThrow();
            });
          });

          describe("But if not every element exist in the 'elements' property", function () {

            it("should trow an error", function () {

              var creatingWithoutElements = function(){
                new (view.extend(elementsEventsMixin)
                    .extend(elementCallbackMixin))
              }

              expect(creatingWithoutElements).toThrow();

            });
          });
        });
      });
    });

    //------------------------------------------------------------------------

    describe("Given I call _super(methodName, arguments) method", function () {
      it("should return the method of the parent element", function () {

        var parent = view.extend({testMethod: sinon.stub()}),
            child = parent.extend({testMethod: sinon.stub()});

        var myView = new child();
        myView._super('testMethod', 'my value');

        expect(parent.prototype.testMethod).toHaveBeenCalledWith('my value');

      });
    });

    //------------------------------------------------------------------------




  });
});