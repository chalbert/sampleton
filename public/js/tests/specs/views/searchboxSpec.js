define(['/js/views/searchbox.view.js'], function(SearchboxView){

  describe("GIVEN I type some text in the field", function () {

    var searchbox, $searchbox, $searchInput, $itemList;
    beforeEach(function() {

      var titles = ['shoes', 'bubbles', 'hair', 'oliver',
        'bracelet', 'elephant', 'moving arrow',
        'bucolic', 'bubonic', 'bubble gum'];

      var searchboxClass = 'searchbox',
          searchInputClass = 'search-input',
          listId = 'item-list';

      $('body')
          .append('<div class="' + searchboxClass + '"><input class="' + searchInputClass + '"/></div>')
          .append('<ul id="' + listId + '"></ul>');

      $searchbox = $('.' + searchboxClass);
      $searchInput = $('.' + searchInputClass);
      $itemList = $('#' + listId);

      for (title in titles) {
        $itemList.append('<li><div class="item-title">' + titles[title] + '</div></li>');
      }

      searchbox = new SearchboxView();

    });

    afterEach(function () {
      searchbox.remove();

      $searchbox.remove();
      $itemList.remove();
    });

    describe("AND the text matches some items' title", function () {

      it("should display only those items", function () {

        var search = 'bu';
        $searchbox.val(search);

        // only containing bu
        var selection = $itemList.find('li:visible');
        expect(selection.length).toBe(4);
        expect(selection.get(0)).toHaveText('bubbles');
        expect(selection.get(1)).toHaveText('bucolic');
        expect(selection.get(2)).toHaveText('bubonic');
        expect(selection.get(3)).toHaveText('bubble gum');

      });

    });

    xdescribe("BUT if the text doesn't match any item's title", function () {

      it("should hide every item", function () {

      })

      it("should display a message", function () {

      });

    });

  });

  describe("GIVEN I click the cancel button", function () {

  });

});