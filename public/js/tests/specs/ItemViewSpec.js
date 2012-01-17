define(["/js/views/item.view.js", "/js/models/item.model.js"], function(ItemView, Item) {

  describe('Sampling item', function() {
    beforeEach(function() {
      $('body').append('<ul id="item-list"></ul>');
      this.itemView = new ItemView({model: new Item()});

    });

    afterEach(function() {
      this.itemView.remove();
      $('#item-list').remove();
    });

    //|-------|
    //| TESTS |
    //|-------|

    describe('Can use a MODEL', function() {

      it('should have a model', function() {
        expect(this.itemView.model).toBeDefined();
      });
      it('should have an empty title', function() {
        expect(this.itemView.model.get('title')).toMatch('');
      });
      it('should have a counter set to 0', function() {
        expect(this.itemView.model.get('counter')).toBe(0);
      });
    });

    describe('Can RENDER', function(){
      it('should be tied to an DOM element', function() {
        expect(this.itemView.el.tagName.toLowerCase()).toBe('li');
      });

      it('should be in display mode', function() {
        $('#item-list').append(this.itemView.render().el);
        expect(this.itemView.el).not.toHaveClass('editing');
      });

      it('should render its title', function () {
        var title = 'title';
        $('#item-list').append(this.itemView.render().el);

        this.itemView.model.set({title: title});
        expect($(this.itemView.el).find('.item-title')).toHaveText(title);
      });

      it('should render its counter', function () {
        var counter = 24;
        $('#item-list').append(this.itemView.render().el);

        this.itemView.model.set({counter: counter});
        expect($(this.itemView.el).find('.item-counter')).toHaveText(counter);
      });

    });

    describe('Can use EVENTS', function(){

      beforeEach(function () {
        $('#item-list').append(this.itemView.render().el);
        this.itemView.model.url = 'stub';
      });

      it('should increment counter WHEN clicking on the item', function(){
        var item = $(this.itemView.el).find('.item');

        spyOnEvent(item, 'click');
        item.click();
        expect('click').toHaveBeenTriggeredOn(item);
        expect(this.itemView.model.get('counter')).toBe(1);
      });

      describe('Can use EVENTS on its TITLE', function(){

        var title;
        beforeEach(function () {
          title = $(this.itemView.el).find('.item-title');
        });

        it('should go in editing mode WHEN doubleclicking on the title', function(){
          spyOnEvent(title, 'dblclick');
          title.dblclick();
          expect($(this.itemView.el)).toHaveClass('editing');
          expect($(this.itemView.el).find('.item-input')).toBeVisible();
        });

        it('should not increment WHEN clicking on title', function () {
          title.click();
          expect(this.itemView.model.get('counter')).toBe(0);
        });

      });

      describe('Can use EVENTS on its INPUT', function(){

        var input;
        beforeEach(function () {
          input = $(this.itemView.el).find('.item-input');
        });

        it('should save the input WHEN pressing enter', function(){
          var newValue = 'my new value',
              keypress = $.Event('keypress');

          keypress.which = 13;

          $(this.itemView.el).addClass('editing');

          input.val(newValue);
          input.trigger(keypress);

          expect($(this.itemView.el)).not.toHaveClass('editing');
          expect(this.itemView.model.get('title')).toBe(newValue);
        });

        it('should save the input WHEN losing focus', function(){
          var newValue = 'my new value';

          $(this.itemView.el).addClass('editing');

          input.val(newValue);
          input.trigger('blur');

          expect($(this.itemView.el)).not.toHaveClass('editing');
          expect(this.itemView.model.get('title')).toBe(newValue);
        });
      });

    });
  });

});