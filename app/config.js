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
    'base_url': "http://localhost:8080",
    'annotations_db': "annotations",
    "document_type_annotation": "a",
    "couchdb_url": "http://localhost:5984/"
  });
