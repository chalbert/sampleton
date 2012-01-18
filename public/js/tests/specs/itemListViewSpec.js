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

  describe('Sampling item list', function() {

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

    describe('Given I insert 3 items in the collection', function(){

      var item = [];
      beforeEach(function () {
        for (var n = 1; n <= 3; n++) item[n] = new Backbone.Model({id: n});
        collection.add([item[1], item[2], item[3]]);
      });

      it("should render three rows", function() {
        expect($('#item-list > li').length).toBe(3);
      });
    });

    describe('Given I press "enter" in the field', function(){

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
  });
});