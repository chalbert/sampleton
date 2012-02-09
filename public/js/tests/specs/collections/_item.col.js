define(['backbone', '/js/collections/item.col.js'], function(Backbone, ItemCol){

  var server;
  ItemCol.prototype.model = Backbone.Model;
  describe("As a collection of sampling item", function () {

    describe("Given I create an item", function () {

      //| we need to test because it has been overridden
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

        for (var key in titles){
          var item = new Backbone.Model({id: key, title: titles[key]});
          collection.add(item)
        }

        var result = collection.filterBy('title', 'bu');
        expect(result.length).toBe(3);
        expect(result[0].get('title')).toBe('bubbles');
        expect(result[1].get('title')).toBe('bucolic');
        expect(result[2].get('title')).toBe('bubonic');

      });

    });

    describe("Given I change the order of on item", function () {

      it("should adjust the order of the other to reflect the change", function () {

        var collection = new ItemCol([
          {id: 1, order: 1},
          {id: 2, order: 2},
          {id: 3, order: 3},
          {id: 4, order: 4},
          {id: 5, order: 5}]
        );

        collection.get(1).set('order', 5);
        expect(collection.get(1).get('order')).toBe(5);
        expect(collection.get(2).get('order')).toBe(1);
        expect(collection.get(3).get('order')).toBe(2);
        expect(collection.get(4).get('order')).toBe(3);
        expect(collection.get(5).get('order')).toBe(4);
        collection.get(5).set('order', 2);
        expect(collection.get(1).get('order')).toBe(5);
        expect(collection.get(2).get('order')).toBe(1);
        expect(collection.get(3).get('order')).toBe(3);
        expect(collection.get(4).get('order')).toBe(4);
        expect(collection.get(5).get('order')).toBe(2);

      });
    });

  });

});