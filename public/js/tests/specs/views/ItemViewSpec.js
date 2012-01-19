define(["/js/views/item.view.js", "/js/models/item.model.js"], function(ItemView, Item) {

  describe('Sampling item', function() {

    var item;
    beforeEach(function() {
      $('body').append('<ul id="item-list"></ul>');
      item = new ItemView({model: new Item()});

    });

    afterEach(function() {
      item.remove();
      $('#item-list').remove();
    });

    //|-------|
    //| TESTS |
    //|-------|

    describe('Will use a model for its data', function() {

      it('should throw an error WHEN no model', function() {
        var callingItemWithoutModel = function() {
          new ItemView();
        }
        expect(callingItemWithoutModel).toThrow('View requires: model');
      });

//      it('should have an empty title', function() {
//        expect(item.model.get('title')).toMatch('');
//      });
//
//      it('should have a counter set to 0', function() {
//        expect(item.model.get('counter')).toBe(0);
//      });
    });

    describe('Can RENDER', function(){

      beforeEach(function () {
        $('#item-list').append(item.render().el);
      });

      it('should render using the defined tagname', function() {
        expect($('#item-list > li').get(0).tagName.toLowerCase()).toBe('li');
      });

      it('should start in display mode', function() {
        expect(item.el).not.toHaveClass('editing');
      });

      it('should render its title', function () {
        var title = 'title';

        item.model.set({title: title});
        expect($(item.el).find('.item-title')).toHaveText(title);
      });

      it('should render its counter', function () {
        var counter = 24;

        item.model.set({counter: counter});
        expect($(item.el).find('.item-counter')).toHaveText(counter);
      });

      it('should be removed from DOM WHEN the model is destroyed', function () {
        item.model.trigger('destroy');
        expect($('#item-list > li').length).toBe(0);
      });

    });

    describe('Can use EVENTS', function(){

      beforeEach(function () {
        $('#item-list').append(item.render().el);
        item.model.url = 'stub';
        this.clock = sinon.useFakeTimers();
      });

      afterEach(function () {
        this.clock.restore();
      });

      it('should increment counter WHEN clicking on the item', function(){
        var $item = $(item.el).find('.item');

        $item.click();
        expect(item.model.get('counter')).toBe(1);
      });

      it('should have a "pressed" effect WHEN clicked', function () {
        var $item = $(item.el).find('.item');

        $item.click();

        expect($(item.el)).toHaveClass('pressed');

        this.clock.tick(500);

        expect($(item.el)).not.toHaveClass('pressed');
      });

      describe('Can use EVENTS on its TITLE', function(){

        var title;
        beforeEach(function () {
          title = $(item.el).find('.item-title');
        });

        it('should go in editing mode WHEN doubleclicking on the title', function(){
          title.dblclick();
          expect($(item.el)).toHaveClass('editing');
        });

        it('should not increment WHEN clicking on title', function () {
          title.click();
          expect(item.model.get('counter')).toBe(0);
        });

      });

      describe('Can use EVENTS on its INPUT', function(){

        var $input;
        beforeEach(function () {
          $input = $(item.el).find('.item-input');
        });

        it('should save the input WHEN pressing enter', function(){
          var newValue = 'my new value',
              keypress = $.Event('keypress');

          keypress.which = 13;

          $(item.el).addClass('editing');

          $input.val(newValue);
          $input.trigger(keypress);

          expect($(item.el)).not.toHaveClass('editing');
          expect(item.model.get('title')).toBe(newValue);
        });

        it('should save the input WHEN losing focus', function(){
          var newValue = 'my new value';

          $(item.el).addClass('editing');

          $input.val(newValue);
          $input.trigger('blur');

          expect($(item.el)).not.toHaveClass('editing');
          expect(item.model.get('title')).toBe(newValue);
        });
      });

    });
  });

});