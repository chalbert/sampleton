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
  'views/itemList.view',
  'views/item.view',
  'collections/item.col'
], function(itemListView, itemView, itemCollection){

  var itemList = new itemListView({
    rowView: itemView,
    collection: new itemCollection()
  });

});
