define(['backbone', '/js/collections/item.col.js'], function(Backbone, ItemCol){

  var server;
  describe("As a collection of sampling item", function () {

    describe("Given I create an item", function () {

      //| ? default behavior ? no - it has been overridden
      it("should add the model to the collection", function () {

        var collection = new ItemCol(new Backbone.Model());
        expect(collection.length).toBe(1);

      });

    });

    describe("Given I add 3 items", function () {

      it("should add each item an increasing order", function () {
        ItemCol.prototype.model = Backbone.Model;
        var collection = new ItemCol();

        for (var n = 1; n <= 3; n++){
          var server = sinon.fakeServer.create();

          server.respondWith("POST", collection.url,
              [200, { "Content-Type": "application/json" },
                '{"id": ' + n + ', "order": ' + n +'}']);

          collection.create();
          server.respond();
          expect(collection.last().get('order')).toBe(n);

          server.restore();
        }

      });

    });

  });

});