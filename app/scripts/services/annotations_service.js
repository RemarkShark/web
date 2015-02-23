'use strict';

/**
 * @ngdoc service
 * @name annotatewithmeApp.AnnotationsService
 * @description
 * # AnnotationsService
 * Service in the annotatewithmeApp.
 */
angular.module('annotatewithmeApp')
  .service('AnnotationsService', function AnnotationsService($routeParams, $rootScope, rfc4122, Storage, Config) {

    var decorateAnnotationObj = function (annotation) {
      annotation.doc_type = Config.document_type_annotation;
      annotation.created_at = annotation.created_at || new Date();
      return annotation;
    }

    this.create = function (annotation) {
      return Storage.db().put(decorateAnnotationObj(annotation), rfc4122.v4());
    };

    this.all = function () {
      var allAnnotations = function (doc, emit) {
        if (doc.doc_type === Config.document_type_annotation) {
          emit(doc.created_at, doc._id);
        }
      };

      return Storage.db().query(allAnnotations, {descending: false, include_docs: true});
    };

    this.update = function (annotation) {
      Storage.db().put(annotation);
    };

    this.remove = function (annotation) {
      Storage.db().remove(annotation)
    };
  });
