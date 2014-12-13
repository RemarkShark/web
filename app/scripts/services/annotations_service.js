'use strict';

/**
 * @ngdoc service
 * @name annotatewithmeApp.AnnotationsService
 * @description
 * # AnnotationsService
 * Service in the annotatewithmeApp.
 */
angular.module('annotatewithmeApp')
  .service('AnnotationsService', function AnnotationsService($routeParams, $rootScope, rfc4122, ngPouch, Constants) {

    var decorateAnnotationObj = function (annotation) {
      annotation.doc_type = Constants.document_type_annotation;
      annotation.created_at = annotation.created_at || new Date();
      return annotation;
    }

    this.create = function (annotation) {
      return ngPouch.db.put(decorateAnnotationObj(annotation), rfc4122.v4());
    };

    this.all = function () {
      var allAnnotations = function (doc, emit) {
        if (doc.doc_type === Constants.document_type_annotation) {
          emit(doc.created_at, doc._id);
        }
      };

      return ngPouch.db.query(allAnnotations, {descending: false, include_docs: true});
    };

    this.update = function (annotation) {
      ngPouch.db.put(annotation);
    };

    this.remove = function (annotation) {
      ngPouch.db.remove(annotation)
    };
  });
