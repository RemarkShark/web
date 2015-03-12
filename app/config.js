'use strict';

/**
 * @ngdoc service
 * @name annotatewithmeApp.Constants
 * @description
 * # Constants
 * Service in the annotatewithmeApp.
 */
angular.module('annotatewithmeApp')
  .constant('Config',{
    'base_url': "https://remarkshark.herokuapp.com",
    'annotations_db': "annotations",
    "document_type_annotation": "a",
    "couchdb_url": "https://guest:guest@couchdb-f7362a.smileupps.com/"
  });
