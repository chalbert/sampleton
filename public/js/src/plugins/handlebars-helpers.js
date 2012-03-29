define([
  'jquery',
  'handlebars'
], function($, Handlebars){

  Handlebars.registerHelper('options', function() {

    var output = '',
        id, option;
    if ($.inArray(this.type, ['radio', 'checkbox']) !== -1) {
      for(var i = 0, l = this.options.length; i < l; i++) {
        id = this.id + '[' + i + ']';
        option = this.options[i];
        output += '<label for="' + id  + '">';
        output += '<input type="' + this.type + '" value="' + option + '" id="' + id + '" name="' + this.id + '"/>';
        output +=  option + '</label> ';
      }
    }

    return new Handlebars.SafeString(output);;
  });

  return Handlebars;
});