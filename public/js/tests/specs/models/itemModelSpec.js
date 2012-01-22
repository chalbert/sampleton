define(['/js/models/item.model.js'], function(ItemModel){

  describe("As a model for sampling item", function () {

    describe("Given I increment", function () {

      it("should increase the counter of 1", function () {
        var model = new ItemModel();
        model.url = 'test';

        for (var n = 1; n <= 3; n++){
          model.increment();
          expect(model.get('counter')).toBe(n);
        }

      });

    });

  });

});