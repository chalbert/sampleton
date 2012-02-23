define([
  'modules/records/record.view',
  'modules/records/records.view',
  'modules/records/records.model',
  'modules/records/record.col',
  'text!/templates/app/item/records.html'
], function(recordView, recordListView, recordsModel, recordCollection, recordsTemplate) {

  return {
    views: {
      records: {
        view: recordListView,
        options: {
          model: new recordsModel(),
          rowView: recordView,
          collection: new recordCollection(),
          html: recordsTemplate
        }
      }
    }
  }

});
