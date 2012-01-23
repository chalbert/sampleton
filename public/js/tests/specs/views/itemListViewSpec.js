define(['backbone', '/js/views/itemList.view.js'], function(Backbone, ItemListView) {

  //|--------|
  //| STATIC |
  //|--------|

  var pressingEnter = $.Event('keypress');
  pressingEnter.which = 13;

  var emptyString = '',
      nonEmptyString = 'an non empty value';

  var listView, server, collection, rowview;
//------------------------------------------------------------------------

  describe('As a list of sampling items', function() {

    beforeEach(function() {

      loadFixtures('index.html');

      //-----------------------------------

      server = sinon.fakeServer.create();
      collection = new Backbone.Collection();
      collection.url = '/testapi/items';

      rowView = Backbone.View.extend({
        tagName: 'li'
      });

      listView = new ItemListView({
        rowView: rowView,
        collection: collection
      });

    });

    afterEach(function() {
      listView.remove();
      server.restore();
    });

    //|-------|
    //| TESTS |
    //|-------|

    describe('Given 3 items are inserted in the collection', function(){

      var item = [];
      beforeEach(function () {
        for (var n = 1; n <= 3; n++) {
          item[n] = new Backbone.Model({id: n});
          collection.add([item[n]]);
        }
      });

      it("should render three rows", function() {
        expect($('#item-list > li').length).toBe(3);
      });
    });

    describe('Given "enter" is pressed in the "new item" field', function(){

      var spySync;
      beforeEach(function () {
        spySync = sinon.spy(Backbone, 'sync');
      });

      afterEach(function () {
        spySync.restore();
      });

      describe('And the field is not empty', function () {

        beforeEach(function () {
          server.respondWith("POST", collection.url,
              [200, { "Content-Type": "application/json" },
                '[{"title":"' + nonEmptyString + '","counter":0,"order":0,"_id":"12345"}]']);

          $('#new-item').val(nonEmptyString);
          $('#new-item').trigger(pressingEnter);
          server.respond();
        });

        it('should add the item', function () {
          expect(Backbone.sync).toHaveBeenCalledOnce();
          expect($('#item-list > li').length).toBe(1);
        });

        it('should reset the input', function () {
          expect($('#new-item')).toHaveValue('');
        });
      });

      describe('But if the field is empty', function () {

        it('should not add the item', function () {
          $('#new-item').val(emptyString);
          $('#new-item').trigger(pressingEnter);
          expect(spySync).not.toHaveBeenCalled();
          expect($('#item-list > li').length).toBe(0);
        });
      });
    });

    describe("Given I filter the list by title", function () {
      
      beforeEach(function () {

        var titles = ['shoes', 'bubbles', 'baseball',
               'bracelet', 'bucolic', 'bubonic'];

        for (key in titles){
          var item = new Backbone.Model({id: key, title: titles[key]});
          item.view = sinon.stub();
          item.view.show = sinon.stub();
          item.view.hide = sinon.stub();
          collection.add(item)
        }

      });

      describe("AND the text matches some items' title", function () {

        it("should show only matching items", function () {
          collection.filterBy = sinon.stub().returns([
            collection.get(1),
            collection.get(4),
            collection.get(5)
          ]);

          var search = 'bu';
          listView.filterByTitle(search);

          expect(collection.get(0).view.show).not.toHaveBeenCalled();
          expect(collection.get(1).view.show).toHaveBeenCalledOnce();
          expect(collection.get(2).view.show).not.toHaveBeenCalled();
          expect(collection.get(3).view.show).not.toHaveBeenCalled();
          expect(collection.get(4).view.show).toHaveBeenCalledOnce();
          expect(collection.get(5).view.show).toHaveBeenCalledOnce();

        });

      });

     describe("BUT if the text doesn't match any item's title", function () {

       beforeEach(function () {
         collection.filterBy = sinon.stub().returns([]);

         var search = 'unmatching string';
         listView.filterByTitle(search);
       });

       it("should hide every item", function () {
         for (var n = 0; n <= 5; n++) {
           expect(collection.get(n).view.show).not.toHaveBeenCalled();
         }
       })

       it("should display a message", function () {
         expect(listView.$el('message')).not.toHaveClass('hidden');
         expect(listView.$el('message')).not.toBeEmpty();

       });

     });

    });

  });
});