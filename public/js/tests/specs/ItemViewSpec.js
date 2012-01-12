define(["/js/views/item.view.js", "/js/models/item.model.js"], function(ItemView, Item) {

  describe("Tests for ItemView", function() {
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

    it('Should be tied to a DOM element when created, based off the property provided.', function() {
        //what html element tag name represents this view?
        expect(this.itemView.el.tagName.toLowerCase()).toBe('li');
    });

    it('Is backed by a model instance, which provides the data.', function() {

        expect(this.itemView.model).toBeDefined();
        //| > Check that default variables are set
        expect(this.itemView.model.get('title')).toMatch('');
        expect(this.itemView.model.get('counter')).toBe(0);
        expect(this.itemView.model.get('order')).toBe(0);
    });

    it('Can render, after which the DOM representation of the view will be visible.', function() {
      this.itemView.render();
      $("#item-list").append(this.itemView.el);

      expect($('#item-list').find('li').length).toBe(1);
    });

    it('Can use an events hash to wire up view methods to DOM elements.', function() {
        var viewElt;

        runs(function() {
            $('#item-list').append(this.itemView.render().el);
        });

        runs(function() {

          var counter = this.itemView.model.get('counter');

          //| > We need to trick the .sync function
          this.itemView.model.url = 'api/items';

          $(this.itemView.el).find('.item').click();

          expect(this.itemView.model.get('counter')).toBe(counter + 1);
        });
    });

  });

  
	return {
		name: "itemviewspec"
	}
});