require.config({
  paths: {
    jquery: 'libs/vendor/jquery/jquery-min',
    underscore: 'libs/vendor/underscore/underscore-min',
    backbone: 'libs/vendor/backbone/backbone',
    glasses: 'libs/glasses/glasses',
    text: 'libs/vendor/require/text',
    order: "libs/vendor/require/order"
  }

});

require([
  // Item List
  'views/itemList.view',
  'views/item.view',
  'collections/item.col',
  // Searchbox
  'views/searchbox.view'

], function(itemListView, itemView, itemCollection, searchboxView){

  var sampleton = {};

  //|-------|
  //| VIEWS |
  //|-------|
  sampleton.views = {};
  sampleton.views.itemList = new itemListView({
    rowView: itemView,
    collection: new itemCollection()
  });
  sampleton.views.searchbox = new searchboxView(sampleton.views.itemList);


});
