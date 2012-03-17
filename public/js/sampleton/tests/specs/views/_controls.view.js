define(['backbone', 'mediator', '/js/views/controls.view.js'], function(Backbone, mediator, ControlsView) {

  describe('As the view for the controls', function() {

    var controls;
    beforeEach(function () {

      loadFixtures('index.html');

      //-----------------------------------

      server = sinon.fakeServer.create();
      mediator.publish = sinon.stub();

      controls = new ControlsView();

    });

    afterEach(function() {
      controls.remove();
      server.restore();
    });

    describe("Given I click the start control", function () {


      it("should switch to recording mode", function () {
        controls.$get('start').click();
        expect(mediator.publish).toHaveBeenCalledWith('modeChange', 'recording');
      });

    });

    describe("Given I click the pause button", function () {

      it("should switch to the editing mode", function () {
        controls.$get('pause').click();
        expect(mediator.publish).toHaveBeenCalledWith('modeChange', 'editing');
      });

    });


  });

});