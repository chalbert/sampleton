# Sampleton - Sampling made simpler
### **Pre-release demo**: [sampleton.chalbert.com](http://sampleton.chalbert.com)

Sampleton is a Web App helping in your sampling projects. Its main focus as for now is biological survey but it 
will in time be usable for any type or survey.

### Project

A project is your experiment, your survey. You will define what to count and Sampleton will help 
you streamline the recording process.

A *template* can be associated with a project, providing a way to create a form and to record rich informations 
on each sampling item.

### Item

Represents a type of sampling. It can be a category, a species, etc.

### Record

Represent a specimen, a sample. If you associate a template with your project, rich information can be recorded
for each sample.

### Template

Customized form to be used in your project. The form will be presented for each record so you can add the defined
informations for each specimen.

## Below the Hood

Sampleton is built using some of the latest tools in Web App development.

* **Node.js/express.js**
* **Mongo DB / Mongoose**
* **Jade** for back-end templates
* **Stylus** for CSS
* **Backbone** including custom plugins ([see my repository](https://github.com/chalbert))
* **JQuery** (of course)
* **Require.js** for dependency management & code optimization (r.js)
* **Handlebars** for front-end templating
* Backbone Modelbinding for Model/View syncronization
* JQuery UI for UI interaction (sortable, draggable, etc).

### Custom Backbone plugins

* [Backbone-Mixins](https://github.com/chalbert/Backbone-Mixins)
  **Mixins:** 
  * View: list, searchable
  * Router: slash
  * Model: configurable
  * Collection: orderable
* [Backbone-Elements](https://github.com/chalbert/Backbone-Elements)
* Backbone-Multiviews - Life cycle for views, dynamic view loading & multi-page navigation
* Backbone-Mediator - Pub/Sub
* Backbone-Shortcuts - Shortcuts management with nested/priority support
