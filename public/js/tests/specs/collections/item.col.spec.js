define(['backbone', '/js/collections/item.col.js'], function(Backbone, ItemCol){

  var server;
  ItemCol.prototype.model = Backbone.Model;
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

    describe("Given the collection is filtered by title", function () {

      it("should return an array of models that matched the query", function () {

        var titles = ['shoes', 'bubbles', 'baseball',
          'bracelet', 'bucolic', 'bubonic'];

        var collection = new ItemCol();

        for (key in titles){
          var item = new Backbone.Model({id: key, title: titles[key]});
          collection.add(item)
        }

        var result = collection.filterBy('title', 'bu');
        expect(result.length).toBe(3);
        expect(result[0].get('title')).toBe('bubonic');
        expect(result[1].get('title')).toBe('bucolic');
        expect(result[2].get('title')).toBe('bubbles');

      });

    });

  });

});