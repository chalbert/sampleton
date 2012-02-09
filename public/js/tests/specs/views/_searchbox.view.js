define(['backbone', '/js/views/searchbox.view.js'], function(Backbone, SearchboxView){

  describe("As the view for a searchbox", function () {

    var searchbox, $searchbox, $searchInput, $itemList, $searchReset, listView;
    beforeEach(function() {

      var searchboxClass = 'searchbox',
          searchInputClass = 'search-input',
          searchResetClass = 'search-reset';

      loadFixtures('searchbox.html');

      $searchbox = $('.' + searchboxClass);
      $searchInput = $('.' + searchInputClass);
      $searchReset = $('.' + searchResetClass);

      listView = new Backbone.View();
      searchbox = new SearchboxView({listView: listView});

    });

    afterEach(function () {
      searchbox.remove();
      $searchbox.remove();
    });

    describe("Given I type some text in the field", function () {


      describe("And the text matches some items' title", function () {

        it("should filter the list of item when the value change", function () {

          var searchOnChange = 'search on change';
          $searchInput.val(searchOnChange);
          listView.filterByTitle = sinon.stub();
          $searchInput.trigger('change');
          expect(listView.filterByTitle).toHaveBeenCalledWith(searchOnChange);
        });

        it("should filter the list of item when a key is pressed", function () {
          var searchOnKeyup = 'search on keyup';
          $searchInput.val(searchOnKeyup);
          listView.filterByTitle = sinon.stub();
          $searchInput.trigger('keyup');
          expect(listView.filterByTitle).toHaveBeenCalledWith(searchOnKeyup);

        });
      });
    });

    describe("Given I click the cancel button", function () {

      beforeEach(function () {
        listView.resetFilter = sinon.stub();
      });

      it("should reset the search input", function () {
        $searchInput.val('a great new search');
        $searchReset.click();
        expect($searchInput).toHaveValue('');
      });

      it("should reset the filtering", function () {
        $searchReset.click();
        expect(listView.resetFilter).toHaveBeenCalledOnce();
      });

    });

  });

});