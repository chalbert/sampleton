define(['backbone', 'mediator', '/js/views/item.view.js'], function(Backbone, mediator, ItemView) {

  describe('As the view for a sampling item', function() {

    var item, $list;
    beforeEach(function() {
      $('body').append('<ul id="item-list"></ul>');
      $list =  $('#item-list');
      item = new ItemView({model: new Backbone.Model()});

      mediator.publish = sinon.stub();
    });

    afterEach(function() {
      item.remove();
      $list.remove();
    });

    //|-------|
    //| TESTS |
    //|-------|

    describe('Will use a model for its data', function() {

      it('should throw an error WHEN no model', function() {
        var callingItemWithoutModel = function() {
          new ItemView();
        }
        expect(callingItemWithoutModel).toThrow();
      });
    });

    describe('Can RENDER', function(){

      beforeEach(function () {
        $list.append(item.render().el);
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
        expect(item.$get('title')).toHaveText(title);
      });

      it('should render its counter', function () {
        var counter = 24;

        item.model.set({counter: counter});
        expect($(item.el).find('.counter')).toHaveText(counter);
      });

      it('should be removed from DOM WHEN the model is destroyed', function () {
        item.model.trigger('destroy');
        expect($('#item-list > li').length).toBe(0);
      });

    });

    describe('Can use EVENTS', function(){
      var $item;
      beforeEach(function () {
        $list.append(item.render().el);
        $item = $(item.el).find('.item');
        item.model.url = 'stub';
        item.model.increment = sinon.spy();
        this.clock = sinon.useFakeTimers();
      });

      afterEach(function () {
        this.clock.restore();
      });

      it('should increment counter WHEN clicking on the item', function(){

        $item.click();
        expect(item.model.increment).toHaveBeenCalled();
      });

      it('should have a "pressed" effect WHEN clicked', function () {
        $item.click();
        expect($(item.el)).toHaveClass('pressed');
        this.clock.tick(500);
        expect($(item.el)).not.toHaveClass('pressed');
      });

      describe('Can use EVENTS on its INPUT', function(){

        var $titleField;
        beforeEach(function () {
          $titleField = item.$get('titleField');
        });

        it('should save the input WHEN pressing enter', function(){
          var newValue = 'my new value',
              keypress = $.Event('keypress');

          keypress.which = 13;

          $titleField.val(newValue);
          $titleField.trigger(keypress);

          expect(item.$el).not.toHaveClass('editing');
          expect(item.model.get('title')).toBe(newValue);
        });

        it('should save the input WHEN losing focus', function(){
          var newValue = 'my new value';

          $titleField.val(newValue);
          $titleField.trigger('blur');

          expect(item.model.get('title')).toBe(newValue);
        });
      });

    });
    /*
    Should test router, not view
    describe('Given I click the history button', function() {

      it("should display the item's history", function() {
        item.$get('history').click();
        var cid = item.cid;
        expect(window.location.hash).toBe('#/records/' + cid);
      });

    });
    */

  });

});