define(['backbone', '/js/models/item.model.js'], function(Backbone, ItemModel){

  describe("As a model for sampling item", function () {

    ItemModel.prototype.defaults.records = new Backbone.Collection();
    var model;
    beforeEach(function () {
      model = new ItemModel();
      model.url = 'test';

      this.addMatchers({
        toBeLessThanOrEqualTo: function(expected) {
          return this.actual <= expected;
        },

        toBeGreaterThanOrEqualTo: function(expected) {
          return this.actual >= expected;
        }
      })

    });

    describe("Given I increment", function () {

      it("should add a new record", function () {
        for (var n = 1; n <= 3; n++){
          model.increment();
        }
        expect(model.get('records').length).toBe(3);

      });
/*
      it("should record the time I increment", function () {
        var now, then;
        now = new Date();
        model.increment();
        then = new Date();
        expect(model.get('records').get(0).date).toBeGreaterThanOrEqualTo(now);
        expect(model.get('records').date).toBeLessThanOrEqualTo(then);
      });
*/
    });

    describe("Given I access the counter", function () {
      it("should return the number of record + the preset counter", function () {
        model.set('counter', 4);
        expect(model.get('counter')).toBe(4);
        model.set('records', [0, 1, 2, 3, 4]);
        expect(model.get('counter')).toBe(9);
      });

    });

  });

});