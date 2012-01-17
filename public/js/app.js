require.config({
  paths: {
    jquery: 'libs/vendor/jquery/jquery-min',
    underscore: 'libs/vendor/underscore/underscore-min',
    backbone: 'libs/vendor/backbone/backbone-optamd3-min',
    glasses: 'libs/glasses/glasses',
    text: 'libs/vendor/require/text',
    order: "libs/vendor/require/order"
  }

});

require(['views/itemList.view'], function(itemListView){
  var itemList = new itemListView;
});
